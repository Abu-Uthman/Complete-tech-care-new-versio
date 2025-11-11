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
import { contactInquiryFormSchema, type ContactInquiryFormData } from '@/lib/validations/schemas';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export function BookingForm() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const form = useForm<ContactInquiryFormData>({
    resolver: zodResolver(contactInquiryFormSchema),
    defaultValues: {
      company: '',
      company_type: 'msp',
      contact_name: '',
      contact_email: '',
      contact_phone: '',
      preferred_contact: 'phone',
      inquiry_type: 'contractor_partnership',
      regions_of_interest: [],
      needs_description: '',
    },
  });

  const onSubmit = async (data: ContactInquiryFormData) => {
    setFormState('submitting');
    setErrorMessage('');

    try {
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
      } else {
        setFormState('error');
        setErrorMessage(
          result.error || 'Failed to submit inquiry. Please try again.'
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
        <h2 className="text-3xl font-bold text-primary mb-4">Inquiry Received!</h2>
        <p className="text-lg text-text-secondary mb-6">
          Thank you for your interest in partnering with Complete Tech Care. We'll contact you within 30 minutes during business hours to discuss how we can support your regional Victoria needs.
        </p>
        <p className="text-sm text-text-tertiary mb-4">
          You'll receive our contractor capabilities pack including:
        </p>
        <ul className="text-sm text-text-secondary mb-8 inline-block text-left space-y-2">
          <li className="flex items-center gap-2">
            <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Service capabilities and coverage areas
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Insurance certificates and compliance documents
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Rate sheet and engagement models
          </li>
        </ul>
        <Button
          size="lg"
          variant="outline"
          onClick={() => setFormState('idle')}
          className="border-primary text-primary hover:bg-primary hover:text-white"
        >
          Submit Another Inquiry
        </Button>
      </Card>
    );
  }

  return (
    <>
      {/* What to Expect Section */}
      <div className="mb-8 grid md:grid-cols-3 gap-6">
        <Card className="p-6 bg-background border-2">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-1">1. Receive Capabilities Pack</h3>
              <p className="text-sm text-text-secondary">Get our contractor info pack with insurance certificates, service areas, rate sheet, and compliance documents.</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-background border-2">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-1">2. Discovery Call</h3>
              <p className="text-sm text-text-secondary">Quick 15-minute call to discuss your regional coverage needs, service requirements, and engagement models.</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-background border-2">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-1">3. Partnership Setup</h3>
              <p className="text-sm text-text-secondary">Establish partnership agreements, onboarding process, and workflow integration for seamless collaboration.</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-8 md:p-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-primary mb-3">Partner with Complete Tech Care</h2>
          <p className="text-text-secondary mb-4">
            Looking for a reliable contractor partner in regional Victoria? Complete this inquiry form to receive our capabilities pack, insurance documentation, and rate sheet. We'll contact you within 30 minutes during business hours (Mon-Fri, 8am-6pm AEST) to discuss partnership opportunities.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 text-text-secondary">
              <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>15 Regional VIC Hubs</span>
            </div>
            <div className="flex items-center gap-2 text-text-secondary">
              <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Fully Insured & Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-text-secondary">
              <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>White-Label Services</span>
            </div>
          </div>
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
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Acme IT Services Pty Ltd"
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
                name="company_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Type *</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        disabled={formState === 'submitting'}
                        className="w-full h-10 px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                      >
                        <option value="msp">Managed Service Provider (MSP)</option>
                        <option value="retail_vendor">Retail Vendor/Integrator</option>
                        <option value="service_provider">IT Service Provider</option>
                        <option value="smb">Small/Medium Business</option>
                        <option value="other">Other</option>
                      </select>
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
                    <FormLabel>Your Name *</FormLabel>
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
                        placeholder="john.smith@acme.com.au"
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
                    <FormLabel>Phone Number (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="04XX XXX XXX or (03) XXXX XXXX"
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
                name="preferred_contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Contact Method *</FormLabel>
                    <FormControl>
                      <div className="flex gap-4 pt-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            value="phone"
                            checked={field.value === 'phone'}
                            onChange={() => field.onChange('phone')}
                            disabled={formState === 'submitting'}
                            className="w-4 h-4 text-primary border-border focus:ring-2 focus:ring-accent"
                          />
                          <span className="text-sm">Phone</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            value="email"
                            checked={field.value === 'email'}
                            onChange={() => field.onChange('email')}
                            disabled={formState === 'submitting'}
                            className="w-4 h-4 text-primary border-border focus:ring-2 focus:ring-accent"
                          />
                          <span className="text-sm">Email</span>
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Inquiry Details */}
          <div>
            <h3 className="text-xl font-semibold text-primary mb-4 pb-2 border-b border-border">
              Inquiry Details
            </h3>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="inquiry_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What information are you looking for? *</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        disabled={formState === 'submitting'}
                        className="w-full h-10 px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                      >
                        <option value="contractor_partnership">Contractor Partnership Opportunity</option>
                        <option value="pricing_info">Pricing & Rate Information</option>
                        <option value="service_capabilities">Service Capabilities & Coverage</option>
                        <option value="regional_coverage">Regional Coverage Details</option>
                        <option value="insurance_compliance">Insurance & Compliance Documents</option>
                        <option value="general_inquiry">General Inquiry</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="regions_of_interest"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Regions of Interest * (Select all that apply)</FormLabel>
                    <FormControl>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 border border-border rounded-md bg-background">
                        {[
                          { value: 'bendigo', label: 'Bendigo' },
                          { value: 'ballarat', label: 'Ballarat' },
                          { value: 'shepparton', label: 'Shepparton' },
                          { value: 'echuca', label: 'Echuca' },
                          { value: 'wodonga', label: 'Wodonga' },
                          { value: 'wangaratta', label: 'Wangaratta' },
                          { value: 'latrobe', label: 'Latrobe Valley' },
                          { value: 'geelong', label: 'Geelong' },
                          { value: 'warrnambool', label: 'Warrnambool' },
                          { value: 'mildura', label: 'Mildura' },
                          { value: 'horsham', label: 'Horsham' },
                          { value: 'sale', label: 'Sale' },
                          { value: 'bairnsdale', label: 'Bairnsdale' },
                          { value: 'swan_hill', label: 'Swan Hill' },
                          { value: 'melbourne', label: 'Melbourne' },
                        ].map((region) => (
                          <label
                            key={region.value}
                            className="flex items-center gap-2 cursor-pointer text-sm"
                          >
                            <input
                              type="checkbox"
                              value={region.value}
                              checked={field.value?.includes(region.value)}
                              onChange={(e) => {
                                const currentValue = field.value || [];
                                if (e.target.checked) {
                                  field.onChange([...currentValue, region.value]);
                                } else {
                                  field.onChange(
                                    currentValue.filter((val: string) => val !== region.value)
                                  );
                                }
                              }}
                              disabled={formState === 'submitting'}
                              className="w-4 h-4 text-primary border-border focus:ring-2 focus:ring-accent rounded"
                            />
                            <span>{region.label}</span>
                          </label>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="needs_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tell us about your needs *</FormLabel>
                    <FormControl>
                      <textarea
                        placeholder="e.g., 'We're an MSP looking for a reliable contractor partner in Bendigo and Ballarat for break/fix and site audits. We need someone who can respond within 4 hours and integrate with our ticketing system...'"
                        {...field}
                        disabled={formState === 'submitting'}
                        rows={6}
                        className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent resize-y"
                      />
                    </FormControl>
                    <p className="text-xs text-text-tertiary mt-1">
                      Minimum 20 characters. Be specific about your regional coverage needs, service types, and volume expectations.
                    </p>
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
              className="min-w-[200px]"
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
                'Request Information'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
    </>
  );
}
