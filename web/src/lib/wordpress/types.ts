/**
 * WordPress API Type Definitions
 * CTC Smart-Hands Project
 */

// Booking status enum (matching WordPress database)
export type BookingStatus =
  | 'new'
  | 'confirmed'
  | 'onsite'
  | 'completed'
  | 'invoiced'
  | 'closed';

// Service type enum
export type ServiceType =
  | 'break_fix'
  | 'rollout'
  | 'pos_support'
  | 'site_audit'
  | 'parts_logistics'
  | 'other';

// Location enum (regional hubs)
export type Location =
  | 'bendigo'
  | 'ballarat'
  | 'shepparton'
  | 'wodonga'
  | 'latrobe';

/**
 * Booking record from WordPress database
 */
export interface Booking {
  id: number;
  company: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  service_type: ServiceType;
  location: Location;
  site_address: string;
  description: string;
  status: BookingStatus;
  created_at: string;
  updated_at: string;
  scheduled_date?: string;
  completed_date?: string;
  notes?: BookingNote[];
}

/**
 * Booking note/update
 */
export interface BookingNote {
  id: number;
  booking_id: number;
  note: string;
  created_by: string;
  created_at: string;
}

/**
 * Create booking request payload
 */
export interface CreateBookingRequest {
  company: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  service_type: ServiceType;
  location: Location;
  site_address: string;
  description: string;
  scheduled_date?: string;
}

/**
 * Update booking request payload
 */
export interface UpdateBookingRequest {
  status?: BookingStatus;
  scheduled_date?: string;
  completed_date?: string;
  notes?: string;
  internal_notes?: string;
  assigned_tech?: string;
  preferred_date?: string;
  preferred_time?: string;
}

/**
 * Rates response
 */
export interface RatesResponse {
  hourly_rate: number;
  callout_fee: number;
  travel_caps: {
    bendigo: number;
    ballarat: number;
    shepparton: number;
    wodonga: number;
    latrobe: number;
  };
  updated_at: string;
}

/**
 * API Response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

/**
 * Paginated response (matching WordPress API response)
 */
export interface PaginatedResponse<T> {
  bookings: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

// ============================================================================
// INVOICE TYPES
// ============================================================================

/**
 * Invoice status enum (matching WordPress database)
 */
export type InvoiceStatus =
  | 'draft'
  | 'sent'
  | 'paid'
  | 'overdue'
  | 'cancelled';

/**
 * Invoice line item
 */
export interface InvoiceLineItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

/**
 * Invoice record from WordPress database
 */
export interface Invoice {
  id: number;
  invoice_number: string;
  booking_id: number;
  issue_date: string;
  due_date: string;
  paid_date: string | null;
  status: InvoiceStatus;
  subtotal: string;
  tax_rate: string;
  tax_amount: string;
  total_amount: string;
  line_items: InvoiceLineItem[];
  notes: string | null;
  pdf_url: string | null;
  sent_at: string | null;
  payment_method: string | null;
  payment_reference: string | null;
  created_by: number | null;
  updated_at: string;
}

/**
 * Create invoice request payload
 */
export interface CreateInvoiceRequest {
  booking_id: number;
  line_items: InvoiceLineItem[];
  due_days?: number;
  notes?: string;
  tax_rate?: number;
}

/**
 * Update invoice request payload
 */
export interface UpdateInvoiceRequest {
  status?: InvoiceStatus;
  paid_date?: string;
  payment_method?: string;
  payment_reference?: string;
  notes?: string;
}

/**
 * Paginated invoice response
 */
export interface PaginatedInvoiceResponse {
  invoices: Invoice[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}
