'use client';

/**
 * Admin Invoices Page
 * Main interface for managing invoices with list, filters, and pagination
 */

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { InvoiceListItem } from '@/components/invoice-list-item';
import { InvoiceDetailsModal } from '@/components/invoice-details-modal';
import { InvoiceCreateModal } from '@/components/invoice-create-modal';
import { wordpressClient } from '@/lib/wordpress/client';
import type { Invoice, Booking, InvoiceStatus, CreateInvoiceRequest } from '@/lib/wordpress/types';

export default function AdminInvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const perPage = 10;

  // Filters
  const [statusFilter, setStatusFilter] = useState<InvoiceStatus | 'all'>('all');

  // Modals
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Fetch invoices
  const fetchInvoices = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await wordpressClient.getInvoices({
        page: currentPage,
        per_page: perPage,
        status: statusFilter !== 'all' ? statusFilter : undefined,
      });

      if (response.success && response.data) {
        setInvoices(response.data.invoices);
        setTotal(response.data.total);
        setTotalPages(response.data.total_pages);
      } else {
        setError(response.error?.message || 'Failed to load invoices');
      }
    } catch (err) {
      console.error('Error fetching invoices:', err);
      setError('Network error while loading invoices');
    } finally {
      setLoading(false);
    }
  };

  // Fetch completed bookings for invoice creation
  const fetchBookings = async () => {
    try {
      const response = await wordpressClient.getBookings({
        status: 'completed',
        per_page: 100,
      });

      if (response.success && response.data) {
        setBookings(response.data.bookings);
      }
    } catch (err) {
      console.error('Error fetching bookings:', err);
    }
  };

  // Initial load
  useEffect(() => {
    fetchInvoices();
    fetchBookings();
  }, [currentPage, statusFilter]);

  // Handle view details
  const handleViewDetails = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowDetailsModal(true);
  };

  // Handle mark as paid
  const handleMarkAsPaid = async (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowDetailsModal(true);
  };

  // Handle mark as paid (from modal)
  const handleMarkAsPaidSubmit = async (
    id: number,
    paymentDetails: { payment_method?: string; payment_reference?: string }
  ) => {
    try {
      const response = await wordpressClient.updateInvoice(id, {
        status: 'paid',
        paid_date: new Date().toISOString(),
        payment_method: paymentDetails.payment_method,
        payment_reference: paymentDetails.payment_reference,
      });

      if (response.success) {
        // Refresh invoice list
        await fetchInvoices();
        setShowDetailsModal(false);
        setSelectedInvoice(null);
      } else {
        throw new Error(response.error?.message || 'Failed to update invoice');
      }
    } catch (error) {
      console.error('Error marking invoice as paid:', error);
      throw error;
    }
  };

  // Handle delete invoice
  const handleDeleteInvoice = async (id: number) => {
    try {
      const response = await wordpressClient.deleteInvoice(id);

      if (response.success) {
        // Refresh invoice list
        await fetchInvoices();
        setShowDetailsModal(false);
        setSelectedInvoice(null);
      } else {
        throw new Error(response.error?.message || 'Failed to delete invoice');
      }
    } catch (error) {
      console.error('Error deleting invoice:', error);
      throw error;
    }
  };

  // Handle create invoice
  const handleCreateInvoice = async (data: CreateInvoiceRequest) => {
    try {
      const response = await wordpressClient.createInvoice(data);

      if (response.success) {
        // Refresh invoice list
        await fetchInvoices();
        setShowCreateModal(false);
      } else {
        throw new Error(response.error?.message || 'Failed to create invoice');
      }
    } catch (error) {
      console.error('Error creating invoice:', error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-bg-secondary">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">Invoices</h1>
            <p className="text-text-secondary mt-1">
              Manage invoices, track payments, and generate new invoices
            </p>
          </div>
          <Button
            onClick={() => setShowCreateModal(true)}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            + Create Invoice
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-border">
            <p className="text-sm text-text-secondary">Total Invoices</p>
            <p className="text-2xl font-bold text-primary">{total}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-border">
            <p className="text-sm text-text-secondary">Paid</p>
            <p className="text-2xl font-bold text-success">
              {invoices.filter((i) => i.status === 'paid').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-border">
            <p className="text-sm text-text-secondary">Overdue</p>
            <p className="text-2xl font-bold text-error">
              {invoices.filter((i) => i.status === 'overdue').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-border">
            <p className="text-sm text-text-secondary">Draft</p>
            <p className="text-2xl font-bold text-text-primary">
              {invoices.filter((i) => i.status === 'draft').length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg border border-border">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-text-primary">
              Filter by Status:
            </label>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as InvoiceStatus | 'all');
                setCurrentPage(1); // Reset to first page
              }}
              className="p-2 border border-border rounded-md bg-bg-primary text-text-primary"
            >
              <option value="all">All Statuses</option>
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Invoice List */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-text-secondary">Loading invoices...</p>
          </div>
        ) : error ? (
          <div className="bg-error/10 border border-error rounded-lg p-6 text-center">
            <p className="text-error font-medium">{error}</p>
            <Button
              variant="outline"
              onClick={() => fetchInvoices()}
              className="mt-4"
            >
              Retry
            </Button>
          </div>
        ) : invoices.length === 0 ? (
          <div className="bg-white border border-border rounded-lg p-12 text-center">
            <p className="text-text-secondary mb-4">
              {statusFilter === 'all'
                ? 'No invoices found. Create your first invoice to get started.'
                : `No ${statusFilter} invoices found.`}
            </p>
            {statusFilter === 'all' && (
              <Button
                onClick={() => setShowCreateModal(true)}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Create First Invoice
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <InvoiceListItem
                key={invoice.id}
                invoice={invoice}
                onViewDetails={handleViewDetails}
                onMarkAsPaid={handleMarkAsPaid}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 pt-6">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm text-text-secondary">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>

      {/* Invoice Details Modal */}
      <InvoiceDetailsModal
        invoice={selectedInvoice}
        open={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedInvoice(null);
        }}
        onMarkAsPaid={handleMarkAsPaidSubmit}
        onDelete={handleDeleteInvoice}
      />

      {/* Invoice Create Modal */}
      <InvoiceCreateModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateInvoice}
        bookings={bookings}
      />
    </div>
  );
}
