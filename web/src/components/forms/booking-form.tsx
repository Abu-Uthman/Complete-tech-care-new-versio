'use client';

/**
 * Booking Form Component
 * CTC Smart-Hands Project
 */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { bookingFormSchema, type BookingFormData } from '@/lib/validations/schemas';
import { wordpressClient } from '@/lib/wordpress/client';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export function BookingForm() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      company: '',
      contact_name: '',
      contact_email: '',
      contact_phone: '',
      service_type: 'break_fix',
      location: 'bendigo',
      site_address: '',
      description: '',
      scheduled_date: '',
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    setFormState('submitting');
    setErrorMessage('');

    try {
      const response = await wordpressClient.createBooking(data);

      if (response.success) {
        setFormState('success');
        form.reset();
      } else {
        setFormState('error');
        setErrorMessage(
          response.error?.message || 'Failed to submit booking. Please try again.'
        );
      }
    } catch (error) {
      setFormState('error');
      setErrorMessage('An unexpected error occurred. Please try again later.');
    }
  };

  if (formState === 'success') {
    return (
      <Card className="p-8 md:p-12 text-center border-2 border-success">
        <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-primary mb-4">Booking Submitted!</h2>
        <p className="text-lg text-text-secondary mb-6">
          Thank you for your service request. We'll contact you within 4 hours to confirm
          the details and schedule your on-site visit.
        </p>
        <p className="text-sm text-text-tertiary mb-8">
          You should receive a confirmation email shortly at the address you provided.
        </p>
        <Button
          size="lg"
          variant="outline"
          onClick={() => setFormState('idle')}
          className="border-primary text-primary hover:bg-primary hover:text-white"
        >
          Submit Another Booking
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-8 md:p-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-primary mb-3">Request Smart-Hands Service</h2>
        <p className="text-text-secondary">
          Fill out the form below and we'll respond within 4 hours to confirm your booking.
        </p>
      </div>

      {formState === 'error' && (
        <div className="mb-6 p-4 bg-error/10 border-2 border-error rounded-lg">
          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-error mt-0.5 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <p className="font-semibold text-error">Submission Failed</p>
              <p className="text-sm text-error/80">{errorMessage}</p>
            </div>
          </div>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Company Information */}
          <div>
            <h3 className="text-xl font-semibold text-primary mb-4 pb-2 border-b border-border">
              Company Information
            </h3>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Acme IT Services"
                        {...field}
                        disabled={formState === 'submitting'}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold text-primary mb-4 pb-2 border-b border-border">
              Contact Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="contact_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Smith"
                        {...field}
                        disabled={formState === 'submitting'}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contact_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john@acme.com.au"
                        {...field}
                        disabled={formState === 'submitting'}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contact_phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="04XX XXX XXX"
                        {...field}
                        disabled={formState === 'submitting'}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Service Details */}
          <div>
            <h3 className="text-xl font-semibold text-primary mb-4 pb-2 border-b border-border">
              Service Details
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="service_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Type *</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        disabled={formState === 'submitting'}
                        className="w-full h-10 px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                      >
                        <option value="break_fix">Break/Fix Support</option>
                        <option value="rollout">Equipment Rollout</option>
                        <option value="pos_support">POS/SCO Support</option>
                        <option value="site_audit">Site Audit</option>
                        <option value="parts_logistics">Parts Logistics</option>
                        <option value="other">Other</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location *</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        disabled={formState === 'submitting'}
                        className="w-full h-10 px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                      >
                        <option value="bendigo">Bendigo</option>
                        <option value="ballarat">Ballarat</option>
                        <option value="shepparton">Shepparton</option>
                        <option value="wodonga">Wodonga</option>
                        <option value="latrobe">Latrobe Valley</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="site_address"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Site Address *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="123 Main Street, Bendigo VIC 3550"
                        {...field}
                        disabled={formState === 'submitting'}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Service Description *</FormLabel>
                    <FormControl>
                      <textarea
                        placeholder="Please describe the issue or service required in detail..."
                        {...field}
                        disabled={formState === 'submitting'}
                        rows={4}
                        className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent resize-y"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between pt-6 border-t border-border">
            <p className="text-sm text-text-tertiary">* Required fields</p>
            <Button
              type="submit"
              size="lg"
              disabled={formState === 'submitting'}
              className="min-w-[160px]"
            >
              {formState === 'submitting' ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit Request'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}
