/**
 * Invoice List Item Component
 * Displays invoice summary in a card format
 * Matches the style of booking cards for consistency
 */

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InvoiceStatusBadge } from '@/components/invoice-status-badge';
import type { Invoice } from '@/lib/wordpress/types';

interface InvoiceListItemProps {
  invoice: Invoice;
  onViewDetails: (invoice: Invoice) => void;
  onMarkAsPaid?: (invoice: Invoice) => void;
}

export function InvoiceListItem({ invoice, onViewDetails, onMarkAsPaid }: InvoiceListItemProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      day: 'numeric',
      month: 'short',
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

  const isPaid = invoice.status === 'paid';
  const canMarkAsPaid = invoice.status !== 'paid' && invoice.status !== 'cancelled';

  return (
    <Card className="p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-primary">
                {invoice.invoice_number}
              </h3>
              <p className="text-sm text-text-secondary">
                Booking ID: #{invoice.booking_id}
              </p>
            </div>
            <InvoiceStatusBadge status={invoice.status} />
          </div>

          <div className="grid md:grid-cols-3 gap-3 text-sm">
            <div>
              <span className="font-medium text-secondary">Amount:</span>{' '}
              <span className="text-lg font-semibold text-primary">
                {formatCurrency(invoice.total_amount)}
              </span>
            </div>
            <div>
              <span className="font-medium text-secondary">Issue Date:</span>{' '}
              {formatDate(invoice.issue_date)}
            </div>
            <div>
              <span className="font-medium text-secondary">Due Date:</span>{' '}
              {formatDate(invoice.due_date)}
            </div>
          </div>

          {invoice.paid_date && (
            <div className="text-sm">
              <span className="font-medium text-success">Paid on:</span>{' '}
              {formatDate(invoice.paid_date)}
              {invoice.payment_method && ` via ${invoice.payment_method}`}
            </div>
          )}

          {invoice.notes && (
            <div className="text-sm">
              <span className="font-medium text-secondary">Notes:</span>{' '}
              {invoice.notes}
            </div>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-border">
            <span className="text-xs text-text-secondary">
              Line items: {invoice.line_items.length} • Tax: {formatCurrency(invoice.tax_amount)} ({invoice.tax_rate}%)
            </span>
            <div className="flex items-center gap-2">
              {canMarkAsPaid && onMarkAsPaid && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onMarkAsPaid(invoice)}
                  className="text-success border-success hover:bg-success/10"
                >
                  Mark as Paid
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewDetails(invoice)}
              >
                View Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
