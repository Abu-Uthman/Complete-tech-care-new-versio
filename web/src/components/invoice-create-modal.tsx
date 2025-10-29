'use client';

/**
 * Invoice Create Modal Component
 * Professional modal for creating new invoices
 * Auto-calculates totals and supports manual line item editing
 */

import { useState, useEffect } from 'react';
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
import type { CreateInvoiceRequest, InvoiceLineItem, Booking } from '@/lib/wordpress/types';

type InvoiceCreateModalProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (data: CreateInvoiceRequest) => Promise<void>;
  booking?: Booking | null; // Pre-selected booking
  bookings?: Booking[]; // List of bookings for dropdown
};

const DEFAULT_TAX_RATE = 10; // 10% GST
const DEFAULT_DUE_DAYS = 7;

export function InvoiceCreateModal({
  open,
  onClose,
  onCreate,
  booking,
  bookings = [],
}: InvoiceCreateModalProps) {
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(
    booking?.id || null
  );
  const [lineItems, setLineItems] = useState<InvoiceLineItem[]>([
    { description: '', quantity: 1, rate: 0, amount: 0 },
  ]);
  const [dueDays, setDueDays] = useState(DEFAULT_DUE_DAYS);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (open) {
      setSelectedBookingId(booking?.id || null);
      setLineItems([{ description: '', quantity: 1, rate: 0, amount: 0 }]);
      setDueDays(DEFAULT_DUE_DAYS);
      setNotes('');

      // Auto-populate line items if booking is provided
      if (booking) {
        const serviceDescription = getServiceDescription(booking.service_type);
        const estimatedRate = 150; // Default hourly rate (can be enhanced later)
        setLineItems([
          {
            description: serviceDescription,
            quantity: 1,
            rate: estimatedRate,
            amount: estimatedRate,
          },
        ]);
      }
    }
  }, [open, booking]);

  const getServiceDescription = (serviceType: string): string => {
    const descriptions: Record<string, string> = {
      break_fix: 'Break/Fix Service',
      rollout: 'Equipment Rollout',
      pos_support: 'POS Support Service',
      site_audit: 'Site Audit',
      parts_logistics: 'Parts Logistics',
      other: 'Professional Services',
    };
    return descriptions[serviceType] || 'Professional Services';
  };

  const updateLineItem = (index: number, field: keyof InvoiceLineItem, value: string | number) => {
    const updated = [...lineItems];
    updated[index] = { ...updated[index], [field]: value } as InvoiceLineItem;

    // Auto-calculate amount when quantity or rate changes
    if (field === 'quantity' || field === 'rate') {
      const quantity = field === 'quantity' ? Number(value) : (updated[index].quantity || 0);
      const rate = field === 'rate' ? Number(value) : (updated[index].rate || 0);
      updated[index].amount = quantity * rate;
    }

    setLineItems(updated);
  };

  const addLineItem = () => {
    setLineItems([
      ...lineItems,
      { description: '', quantity: 1, rate: 0, amount: 0 },
    ]);
  };

  const removeLineItem = (index: number) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter((_, i) => i !== index));
    }
  };

  const calculateSubtotal = (): number => {
    return lineItems.reduce((sum, item) => sum + item.amount, 0);
  };

  const calculateTax = (subtotal: number): number => {
    return (subtotal * DEFAULT_TAX_RATE) / 100;
  };

  const calculateTotal = (): number => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    return subtotal + tax;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
    }).format(amount);
  };

  const handleSubmit = async () => {
    // Validation
    if (!selectedBookingId) {
      alert('Please select a booking');
      return;
    }

    if (lineItems.some((item) => !item.description || item.quantity <= 0 || item.rate <= 0)) {
      alert('Please fill in all line items with valid quantities and rates');
      return;
    }

    setIsSubmitting(true);
    try {
      await onCreate({
        booking_id: selectedBookingId,
        line_items: lineItems,
        due_days: dueDays,
        notes: notes || undefined,
        tax_rate: DEFAULT_TAX_RATE,
      });
      onClose();
    } catch (error) {
      console.error('Failed to create invoice:', error);
      alert('Failed to create invoice. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedBooking = booking || bookings.find((b) => b.id === selectedBookingId);
  const subtotal = calculateSubtotal();
  const tax = calculateTax(subtotal);
  const total = calculateTotal();

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">
            Create New Invoice
          </DialogTitle>
          <DialogDescription>
            Generate an invoice for a completed booking with line items and tax calculation.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Booking Selection */}
          {!booking && bookings.length > 0 && (
            <div>
              <Label htmlFor="booking-select" className="text-sm font-semibold mb-2 block">
                Select Booking *
              </Label>
              <select
                id="booking-select"
                value={selectedBookingId || ''}
                onChange={(e) => setSelectedBookingId(Number(e.target.value))}
                className="w-full p-2 border border-border rounded-md bg-bg-primary text-text-primary"
              >
                <option value="">-- Select a booking --</option>
                {bookings.map((b) => (
                  <option key={b.id} value={b.id}>
                    #{b.id} - {b.company} - {b.service_type} ({b.location})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Booking Info (when pre-selected or selected) */}
          {selectedBooking && (
            <div className="p-4 bg-bg-secondary rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Booking Details</h4>
              <div className="grid md:grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="font-medium">Company:</span> {selectedBooking.company}
                </div>
                <div>
                  <span className="font-medium">Service:</span> {selectedBooking.service_type}
                </div>
                <div>
                  <span className="font-medium">Location:</span> {selectedBooking.location}
                </div>
                <div>
                  <span className="font-medium">Status:</span> {selectedBooking.status}
                </div>
              </div>
            </div>
          )}

          {/* Line Items */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-sm font-semibold">Line Items *</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addLineItem}
                className="text-primary"
              >
                + Add Line Item
              </Button>
            </div>

            <div className="space-y-3">
              {lineItems.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-12 gap-3 p-3 border border-border rounded-lg bg-bg-primary"
                >
                  <div className="col-span-12 md:col-span-5">
                    <Label htmlFor={`desc-${index}`} className="text-xs">
                      Description
                    </Label>
                    <Input
                      id={`desc-${index}`}
                      value={item.description}
                      onChange={(e) => updateLineItem(index, 'description', e.target.value)}
                      placeholder="Service description"
                      className="mt-1"
                    />
                  </div>
                  <div className="col-span-4 md:col-span-2">
                    <Label htmlFor={`qty-${index}`} className="text-xs">
                      Qty
                    </Label>
                    <Input
                      id={`qty-${index}`}
                      type="number"
                      min="1"
                      step="1"
                      value={item.quantity}
                      onChange={(e) => updateLineItem(index, 'quantity', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div className="col-span-4 md:col-span-2">
                    <Label htmlFor={`rate-${index}`} className="text-xs">
                      Rate
                    </Label>
                    <Input
                      id={`rate-${index}`}
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.rate}
                      onChange={(e) => updateLineItem(index, 'rate', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div className="col-span-3 md:col-span-2">
                    <Label className="text-xs">Amount</Label>
                    <div className="mt-1 p-2 bg-bg-secondary rounded-md text-sm font-medium">
                      {formatCurrency(item.amount)}
                    </div>
                  </div>
                  <div className="col-span-1 flex items-end">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeLineItem(index)}
                      disabled={lineItems.length === 1}
                      className="text-error border-error hover:bg-error/10"
                    >
                      ×
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals Summary */}
          <div className="border border-border rounded-lg p-4 bg-bg-secondary">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-medium">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (GST {DEFAULT_TAX_RATE}%):</span>
                <span className="font-medium">{formatCurrency(tax)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t border-border pt-2">
                <span>Total:</span>
                <span className="text-primary">{formatCurrency(total)}</span>
              </div>
            </div>
          </div>

          {/* Due Days */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="due-days" className="text-sm font-semibold mb-2 block">
                Payment Terms (Due Days)
              </Label>
              <Input
                id="due-days"
                type="number"
                min="1"
                max="90"
                value={dueDays}
                onChange={(e) => setDueDays(Number(e.target.value))}
              />
              <p className="text-xs text-text-secondary mt-1">
                Invoice will be due {dueDays} days after issue date
              </p>
            </div>
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes" className="text-sm font-semibold mb-2 block">
              Notes (Optional)
            </Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional notes or payment instructions..."
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
            <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !selectedBookingId}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              {isSubmitting ? 'Creating...' : 'Create Invoice'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
