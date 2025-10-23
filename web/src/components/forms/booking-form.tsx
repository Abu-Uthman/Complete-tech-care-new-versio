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

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export function BookingForm() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    // Limit to 5 files, max 10MB each
    const validFiles = files.filter(
      (file) => file.size <= 10 * 1024 * 1024 && file.type.startsWith('image/')
    ).slice(0, 5);
    setSelectedFiles(validFiles);
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: BookingFormData) => {
    setFormState('submitting');
    setErrorMessage('');

    try {
      // TODO: In future phase, upload files to WordPress media library first
      // For now, submit booking without file attachments
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setFormState('success');
        form.reset();
        setSelectedFiles([]);
      } else {
        setFormState('error');
        setErrorMessage(
          result.error || 'Failed to submit booking. Please try again.'
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
        <h2 className="text-3xl font-bold text-primary mb-4">Service Request Received!</h2>
        <p className="text-lg text-text-secondary mb-6">
          Thank you for contacting Complete Tech Care. We've received your service request and will respond within 4 hours.
        </p>
        <p className="text-sm text-text-tertiary mb-8">
          Our team will review your request and contact you to discuss the next steps. For urgent matters, please call us directly.
        </p>
        <Button
          size="lg"
          variant="outline"
          onClick={() => setFormState('idle')}
          className="border-primary text-primary hover:bg-primary hover:text-white"
        >
          Submit Another Request
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-8 md:p-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-primary mb-3">Request Service</h2>
        <p className="text-text-secondary">
          Need technical support in regional Victoria? Fill out this form and our team will respond within 4 hours to discuss your requirements and next steps.
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
                    <FormLabel>What type of support do you need? *</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        disabled={formState === 'submitting'}
                        className="w-full h-10 px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                      >
                        <option value="break_fix">Equipment Break/Fix</option>
                        <option value="rollout">Equipment Installation/Rollout</option>
                        <option value="pos_support">POS/Retail Systems Support</option>
                        <option value="site_audit">Site Survey/Audit</option>
                        <option value="parts_logistics">Parts Delivery/Logistics</option>
                        <option value="other">Other/General Support</option>
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
                    <FormLabel>Service Location *</FormLabel>
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
                    <FormLabel>Full Site Address *</FormLabel>
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
                    <FormLabel>Describe the issue or service required *</FormLabel>
                    <FormControl>
                      <textarea
                        placeholder="Please provide as much detail as possible about the issue or service you need..."
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

              {/* Photo Upload */}
              <div className="md:col-span-2">
                <Label htmlFor="photos" className="mb-2 block">
                  Add Photos (Optional)
                </Label>
                <p className="text-sm text-text-secondary mb-3">
                  Upload photos of the issue or equipment (max 5 photos, 10MB each)
                </p>
                <input
                  type="file"
                  id="photos"
                  accept="image/*"
                  multiple
                  onChange={handleFileSelect}
                  disabled={formState === 'submitting'}
                  className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
                />
                {selectedFiles.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {selectedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-bg-secondary rounded-md"
                      >
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-5 h-5 text-accent"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="text-sm text-text-primary truncate max-w-xs">
                            {file.name}
                          </span>
                          <span className="text-xs text-text-secondary">
                            ({(file.size / 1024).toFixed(0)}KB)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-error hover:text-error/80"
                          aria-label="Remove file"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                    <p className="text-xs text-text-tertiary">
                      Note: Photo upload will be available after initial submission. Our team will contact you to collect photos if needed.
                    </p>
                  </div>
                )}
              </div>
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
