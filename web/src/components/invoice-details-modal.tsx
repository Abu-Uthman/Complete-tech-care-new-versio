'use client';

/**
 * Invoice Details Modal Component
 * Professional modal for viewing and managing invoice details
 * Follows the same structure as BookingDetailsModal for consistency
 */

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { InvoiceStatusBadge } from '@/components/invoice-status-badge';
import type { Invoice } from '@/lib/wordpress/types';

type InvoiceDetailsModalProps = {
  invoice: Invoice | null;
  open: boolean;
  onClose: () => void;
  onMarkAsPaid?: (id: number, paymentDetails: { payment_method?: string; payment_reference?: string }) => Promise<void>;
  onDelete?: (id: number) => Promise<void>;
};

export function InvoiceDetailsModal({
  invoice,
  open,
  onClose,
  onMarkAsPaid,
  onDelete,
}: InvoiceDetailsModalProps) {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentReference, setPaymentReference] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatCurrency = (amount: string) => {
    const num = parseFloat(amount);
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
    }).format(num);
  };

  const handleMarkAsPaid = async () => {
    if (!invoice || !onMarkAsPaid) return;

    setIsProcessing(true);
    try {
      await onMarkAsPaid(invoice.id, {
        payment_method: paymentMethod || undefined,
        payment_reference: paymentReference || undefined,
      });
      setShowPaymentForm(false);
      setPaymentMethod('');
      setPaymentReference('');
    } catch (error) {
      console.error('Failed to mark invoice as paid:', error);
      alert('Failed to mark invoice as paid. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async () => {
    if (!invoice || !onDelete) return;

    setIsDeleting(true);
    try {
      await onDelete(invoice.id);
      setShowDeleteConfirm(false);
      onClose();
    } catch (error) {
      console.error('Failed to delete invoice:', error);
      alert('Failed to delete invoice. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  if (!invoice) return null;

  const isPaid = invoice.status === 'paid';
  const canMarkAsPaid = invoice.status !== 'paid' && invoice.status !== 'cancelled';
  const canDelete = true; // Invoices can always be deleted (soft delete in backend)

  return (
    <>
      <Dialog open={open && !showDeleteConfirm} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary flex items-center justify-between">
              <span>Invoice {invoice.invoice_number}</span>
              <InvoiceStatusBadge status={invoice.status} />
            </DialogTitle>
            <DialogDescription>
              Booking ID: #{invoice.booking_id}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* Invoice Dates */}
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label className="text-xs text-text-secondary">Issue Date</Label>
                <p className="text-sm font-medium">{formatDate(invoice.issue_date)}</p>
              </div>
              <div>
                <Label className="text-xs text-text-secondary">Due Date</Label>
                <p className="text-sm font-medium">{formatDate(invoice.due_date)}</p>
              </div>
              {invoice.paid_date && (
                <div>
                  <Label className="text-xs text-text-secondary">Paid Date</Label>
                  <p className="text-sm font-medium text-success">{formatDate(invoice.paid_date)}</p>
                </div>
              )}
            </div>

            {/* Line Items */}
            <div>
              <Label className="text-sm font-semibold mb-3 block">Line Items</Label>
              <div className="border border-border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-bg-secondary">
                    <tr>
                      <th className="text-left p-3 font-medium">Description</th>
                      <th className="text-right p-3 font-medium">Qty</th>
                      <th className="text-right p-3 font-medium">Rate</th>
                      <th className="text-right p-3 font-medium">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.line_items.map((item, index) => (
                      <tr key={index} className="border-t border-border">
                        <td className="p-3">{item.description}</td>
                        <td className="text-right p-3">{item.quantity}</td>
                        <td className="text-right p-3">{formatCurrency(item.rate.toString())}</td>
                        <td className="text-right p-3 font-medium">{formatCurrency(item.amount.toString())}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="border-t-2 border-border bg-bg-secondary">
                    <tr>
                      <td colSpan={3} className="text-right p-3 font-medium">Subtotal</td>
                      <td className="text-right p-3 font-medium">{formatCurrency(invoice.subtotal)}</td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="text-right p-3 text-sm">Tax ({invoice.tax_rate}%)</td>
                      <td className="text-right p-3">{formatCurrency(invoice.tax_amount)}</td>
                    </tr>
                    <tr className="font-bold text-lg">
                      <td colSpan={3} className="text-right p-3">Total</td>
                      <td className="text-right p-3 text-primary">{formatCurrency(invoice.total_amount)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Payment Details (if paid) */}
            {isPaid && (
              <div className="p-4 bg-success/10 border border-success rounded-lg">
                <h4 className="font-semibold text-success mb-2">Payment Received</h4>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="font-medium">Payment Date:</span> {formatDate(invoice.paid_date!)}
                  </div>
                  {invoice.payment_method && (
                    <div>
                      <span className="font-medium">Method:</span> {invoice.payment_method}
                    </div>
                  )}
                  {invoice.payment_reference && (
                    <div className="md:col-span-2">
                      <span className="font-medium">Reference:</span> {invoice.payment_reference}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Payment Form (when marking as paid) */}
            {showPaymentForm && canMarkAsPaid && (
              <div className="p-4 bg-bg-secondary border border-border rounded-lg space-y-4">
                <h4 className="font-semibold">Payment Details</h4>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="payment-method">Payment Method</Label>
                    <Input
                      id="payment-method"
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      placeholder="e.g., Bank Transfer, Credit Card"
                    />
                  </div>
                  <div>
                    <Label htmlFor="payment-reference">Payment Reference (Optional)</Label>
                    <Input
                      id="payment-reference"
                      value={paymentReference}
                      onChange={(e) => setPaymentReference(e.target.value)}
                      placeholder="e.g., Transaction ID, Check number"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Notes */}
            {invoice.notes && (
              <div>
                <Label className="text-sm font-semibold mb-2 block">Notes</Label>
                <p className="text-sm p-3 bg-bg-secondary rounded-md">{invoice.notes}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between gap-3 pt-4 border-t border-border">
              <div>
                {canDelete && onDelete && (
                  <Button
                    variant="outline"
                    onClick={() => setShowDeleteConfirm(true)}
                    className="text-error border-error hover:bg-error/10"
                  >
                    Delete Invoice
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
                {canMarkAsPaid && onMarkAsPaid && (
                  <>
                    {showPaymentForm ? (
                      <>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setShowPaymentForm(false);
                            setPaymentMethod('');
                            setPaymentReference('');
                          }}
                          disabled={isProcessing}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleMarkAsPaid}
                          disabled={isProcessing}
                          className="bg-success hover:bg-success/90 text-white"
                        >
                          {isProcessing ? 'Processing...' : 'Confirm Payment'}
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => setShowPaymentForm(true)}
                        className="bg-success hover:bg-success/90 text-white"
                      >
                        Mark as Paid
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-error">
              Delete Invoice?
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete invoice {invoice.invoice_number}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-end gap-3 mt-4">
            <Button
              variant="outline"
              onClick={() => setShowDeleteConfirm(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-error hover:bg-error/90 text-white"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
