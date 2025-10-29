/**
 * Invoice Status Badge Component
 * Color-coded status indicators for invoices
 * Follows WCAG AA compliance (4.5:1 contrast ratios)
 */

import type { InvoiceStatus } from '@/lib/wordpress/types';

interface InvoiceStatusBadgeProps {
  status: InvoiceStatus;
  className?: string;
}

export function InvoiceStatusBadge({ status, className = '' }: InvoiceStatusBadgeProps) {
  const getStatusClass = (status: InvoiceStatus): string => {
    switch (status) {
      case 'draft':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'sent':
        return 'bg-accent/10 text-accent border-accent';
      case 'paid':
        return 'bg-success/10 text-success border-success';
      case 'overdue':
        return 'bg-error/10 text-error border-error';
      case 'cancelled':
        return 'bg-slate-100 text-slate-600 border-slate-300';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-300';
    }
  };

  const getStatusLabel = (status: InvoiceStatus): string => {
    return status.toUpperCase().replace('_', ' ');
  };

  return (
    <span
      className={`px-3 py-1 text-xs font-semibold border rounded-full ${getStatusClass(
        status
      )} ${className}`}
    >
      {getStatusLabel(status)}
    </span>
  );
}
