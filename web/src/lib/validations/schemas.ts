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
  'wodonga',
  'latrobe',
]);

/**
 * Phone number validation (Australian format)
 * Accepts: 04XX XXX XXX, 614XX XXX XXX, (03) XXXX XXXX, etc.
 */
const phoneRegex = /^(?:\+?61|0)[2-478](?:[ -]?[0-9]){8}$/;

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
