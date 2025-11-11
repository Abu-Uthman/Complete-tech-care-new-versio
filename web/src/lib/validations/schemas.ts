/**
 * Zod Validation Schemas
 * CTC Smart-Hands Project
 */

import { z } from 'zod';

/**
 * Service type validation
 */
export const serviceTypeSchema = z.enum([
  'break_fix',
  'rollout',
  'pos_support',
  'site_audit',
  'parts_logistics',
  'other',
]);

/**
 * Location validation
 */
export const locationSchema = z.enum([
  'bendigo',
  'ballarat',
  'shepparton',
  'echuca',
  'wodonga',
  'wangaratta',
  'latrobe',
  'geelong',
  'warrnambool',
  'mildura',
  'horsham',
  'sale',
  'bairnsdale',
  'swan_hill',
  'other_regional',
]);

/**
 * Phone number validation (Australian format)
 * Accepts: 04XX XXX XXX, 614XX XXX XXX, (03) XXXX XXXX, etc.
 */
const phoneRegex = /^(?:\+?61|0)[2-478](?:[ -]?[0-9]){8}$/;

/**
 * Urgency level validation
 */
export const urgencySchema = z.enum(['asap', 'same_day', 'scheduled']);

/**
 * Preferred contact method validation
 */
export const preferredContactSchema = z.enum(['phone', 'email']);

/**
 * Booking form validation schema
 */
export const bookingFormSchema = z.object({
  // Company Information
  company: z
    .string()
    .min(2, 'Company name must be at least 2 characters')
    .max(100, 'Company name must be less than 100 characters')
    .trim(),

  // Contact Information
  contact_name: z
    .string()
    .min(2, 'Contact name must be at least 2 characters')
    .max(100, 'Contact name must be less than 100 characters')
    .trim(),

  contact_email: z
    .string()
    .email('Invalid email address')
    .toLowerCase()
    .trim(),

  contact_phone: z
    .string()
    .regex(phoneRegex, 'Invalid Australian phone number format')
    .transform((val) => val.replace(/[\s-]/g, '')), // Remove spaces and hyphens

  preferred_contact: preferredContactSchema.optional(),

  // Service Details
  service_type: serviceTypeSchema,

  location: locationSchema,

  site_address: z
    .string()
    .min(10, 'Site address must be at least 10 characters')
    .max(200, 'Site address must be less than 200 characters')
    .trim(),

  description: z
    .string()
    .min(20, 'Description must be at least 20 characters')
    .max(1000, 'Description must be less than 1000 characters')
    .trim(),

  // MSP Workflow Fields
  urgency: urgencySchema.default('asap'),

  po_number: z
    .string()
    .max(50, 'PO number must be less than 50 characters')
    .trim()
    .optional()
    .or(z.literal('')),

  ticket_reference: z
    .string()
    .max(100, 'Ticket reference must be less than 100 characters')
    .trim()
    .optional()
    .or(z.literal('')),

  equipment_details: z
    .string()
    .max(500, 'Equipment details must be less than 500 characters')
    .trim()
    .optional()
    .or(z.literal('')),

  site_access_info: z
    .string()
    .max(500, 'Access information must be less than 500 characters')
    .trim()
    .optional()
    .or(z.literal('')),

  // Optional scheduled date
  scheduled_date: z
    .string()
    .datetime()
    .optional()
    .or(z.literal('')),
});

/**
 * Type inference from schema
 */
export type BookingFormData = z.infer<typeof bookingFormSchema>;

/**
 * Admin update booking schema
 */
export const updateBookingSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'in_progress', 'completed', 'cancelled']).optional(),
  scheduled_date: z.string().datetime().optional(),
  completed_date: z.string().datetime().optional(),
  notes: z.string().max(1000, 'Notes must be less than 1000 characters').optional(),
});

export type UpdateBookingData = z.infer<typeof updateBookingSchema>;

/**
 * Contact form schema (for general inquiries)
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .trim(),

  email: z
    .string()
    .email('Invalid email address')
    .toLowerCase()
    .trim(),

  phone: z
    .string()
    .regex(phoneRegex, 'Invalid Australian phone number format')
    .optional()
    .or(z.literal('')),

  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters')
    .trim(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * Company type validation
 */
export const companyTypeSchema = z.enum([
  'msp',
  'retail_vendor',
  'service_provider',
  'smb',
  'other',
]);

/**
 * Inquiry type validation
 */
export const inquiryTypeSchema = z.enum([
  'contractor_partnership',
  'pricing_info',
  'service_capabilities',
  'regional_coverage',
  'insurance_compliance',
  'general_inquiry',
]);

/**
 * Regional coverage multi-select validation
 */
export const regionalCoverageSchema = z.array(z.string()).min(1, 'Please select at least one region');

/**
 * Contact Inquiry Form Schema (for B2B partnership inquiries)
 */
export const contactInquiryFormSchema = z.object({
  // Company Information
  company: z
    .string()
    .min(2, 'Company name must be at least 2 characters')
    .max(100, 'Company name must be less than 100 characters')
    .trim(),

  company_type: companyTypeSchema,

  // Contact Information
  contact_name: z
    .string()
    .min(2, 'Contact name must be at least 2 characters')
    .max(100, 'Contact name must be less than 100 characters')
    .trim(),

  contact_email: z
    .string()
    .email('Invalid email address')
    .toLowerCase()
    .trim(),

  contact_phone: z
    .string()
    .regex(phoneRegex, 'Invalid Australian phone number format')
    .transform((val) => val.replace(/[\s-]/g, ''))
    .optional()
    .or(z.literal('')),

  preferred_contact: preferredContactSchema,

  // Inquiry Details
  inquiry_type: inquiryTypeSchema,

  regions_of_interest: regionalCoverageSchema,

  needs_description: z
    .string()
    .min(20, 'Please provide at least 20 characters describing your needs')
    .max(1000, 'Description must be less than 1000 characters')
    .trim(),
});

export type ContactInquiryFormData = z.infer<typeof contactInquiryFormSchema>;
