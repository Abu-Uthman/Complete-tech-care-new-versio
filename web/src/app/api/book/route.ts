/**
 * Booking API Route - Email Notifications via Resend
 * Complete Tech Care Project
 *
 * Sends email notifications for new contractor service requests
 */

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactInquiryFormSchema } from '@/lib/validations/schemas';
import { ZodError } from 'zod';

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * POST /api/book - Submit contractor inquiry request
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = contactInquiryFormSchema.parse(body);

    // Prepare email content
    const {
      company,
      company_type,
      contact_name,
      contact_email,
      contact_phone,
      preferred_contact,
      inquiry_type,
      regions_of_interest,
      needs_description,
    } = validatedData;

    // Format regions for display
    const regionsFormatted = regions_of_interest.map((r: string) =>
      r.split('_').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    ).join(', ');

    // Format company type for display
    const companyTypeFormatted = company_type.split('_').map((word: string) =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');

    // Send notification to contractor (you)
    await resend.emails.send({
      from: 'Complete Tech Care <onboarding@resend.dev>',
      to: process.env.CONTRACTOR_EMAIL || 'your-email@example.com',
      subject: `🤝 New Partnership Inquiry: ${company} - ${companyTypeFormatted}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #2563EB; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">Complete Tech Care (CTC)</h1>
            <p style="margin: 5px 0 0 0; font-size: 14px;">New Partnership Inquiry</p>
          </div>

          <div style="background: #F8FAFC; padding: 20px; border-radius: 0 0 8px 8px;">
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
              <h3 style="margin-top: 0; color: #0F172A; border-bottom: 2px solid #E2E8F0; padding-bottom: 10px;">Company Information</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #64748B; width: 140px;"><strong>Company:</strong></td><td style="padding: 8px 0;">${company}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748B;"><strong>Company Type:</strong></td><td style="padding: 8px 0;">${companyTypeFormatted}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748B;"><strong>Contact:</strong></td><td style="padding: 8px 0;">${contact_name}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748B;"><strong>Email:</strong></td><td style="padding: 8px 0;"><a href="mailto:${contact_email}" style="color: #2563EB;">${contact_email}</a></td></tr>
                ${contact_phone ? `<tr><td style="padding: 8px 0; color: #64748B;"><strong>Phone:</strong></td><td style="padding: 8px 0;"><a href="tel:${contact_phone}" style="color: #2563EB;">${contact_phone}</a></td></tr>` : ''}
                <tr><td style="padding: 8px 0; color: #64748B;"><strong>Preferred Contact:</strong></td><td style="padding: 8px 0;">${preferred_contact.charAt(0).toUpperCase() + preferred_contact.slice(1)}</td></tr>
              </table>
            </div>

            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
              <h3 style="margin-top: 0; color: #0F172A; border-bottom: 2px solid #E2E8F0; padding-bottom: 10px;">Inquiry Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #64748B; width: 140px;"><strong>Inquiry Type:</strong></td><td style="padding: 8px 0;">${inquiry_type.split('_').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748B;"><strong>Regions of Interest:</strong></td><td style="padding: 8px 0;">${regionsFormatted}</td></tr>
              </table>
              <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #E2E8F0;">
                <p style="margin: 0 0 5px 0; color: #64748B;"><strong>Their Needs:</strong></p>
                <p style="margin: 0; white-space: pre-wrap; background: #F8FAFC; padding: 15px; border-left: 4px solid #2563EB; border-radius: 4px;">${needs_description}</p>
              </div>
            </div>

            <div style="background: #06B6D4; color: white; padding: 15px; border-radius: 8px; text-align: center;">
              <p style="margin: 0; font-size: 16px;"><strong>🤝 Follow up within 30 minutes</strong></p>
              <p style="margin: 10px 0 0 0; font-size: 14px;">Send capabilities pack and schedule discovery call</p>
            </div>

            <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #E2E8F0; color: #64748B; font-size: 13px; text-align: center;">
              <p style="margin: 0;">Complete Tech Care (CTC) | Regional Victoria IT Contractor</p>
              <p style="margin: 5px 0 0 0;">Submitted via website contact form</p>
            </div>
          </div>
        </div>
      `,
    });

    // Send confirmation to partner inquiry
    await resend.emails.send({
      from: 'Complete Tech Care <onboarding@resend.dev>',
      to: contact_email,
      subject: 'Complete Tech Care - Inquiry Received',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #2563EB; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">Complete Tech Care (CTC)</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Regional Victoria Contractor Services</p>
          </div>

          <div style="padding: 30px; background: white;">
            <h2 style="color: #0F172A; margin-top: 0;">Thank You for Your Inquiry</h2>

            <p>Hi ${contact_name},</p>

            <p>Thank you for your interest in partnering with Complete Tech Care. We've received your inquiry and will contact you within 30 minutes during business hours (Mon-Fri, 8am-6pm AEST) to discuss partnership opportunities.</p>

            <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #0F172A; font-size: 16px;">What's Next</h3>
              <ul style="line-height: 1.8; margin: 10px 0; padding-left: 20px;">
                <li>We'll send you our contractor capabilities pack</li>
                <li>Schedule a quick 15-minute discovery call</li>
                <li>Discuss your regional coverage needs for: <strong>${regionsFormatted}</strong></li>
                <li>Review engagement models and pricing</li>
              </ul>
            </div>

            <div style="background: #F0F9FF; border-left: 4px solid #0EA5E9; padding: 15px; margin: 20px 0;">
              <p style="margin: 0;"><strong>📄 Capabilities Pack Includes:</strong></p>
              <ul style="line-height: 1.6; margin: 10px 0; padding-left: 20px;">
                <li>Service capabilities and coverage areas (15 regional VIC hubs)</li>
                <li>Insurance certificates ($20M Public Liability + Professional Indemnity)</li>
                <li>Compliance documents (Police Check, working-with-children clearance, site safety confirmations)</li>
                <li>Rate sheet and engagement models (hourly, retainer, project-based)</li>
              </ul>
            </div>

            <p>We understand the importance of reliable contractor partnerships and look forward to discussing how we can support your regional Victoria needs.</p>

            <p style="margin-top: 30px;">
              Best regards,<br>
              <strong>Abdisalam Awale</strong><br>
              Complete Tech Care (CTC)<br>
              <a href="tel:+61432405388" style="color: #2563EB;">0432 405 388</a><br>
              <a href="mailto:completetechcare@gmail.com" style="color: #2563EB;">completetechcare@gmail.com</a>
            </p>
          </div>

          <div style="background: #F8FAFC; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; border-top: 1px solid #E2E8F0;">
            <p style="margin: 0; color: #64748B; font-size: 14px;">
              Professional On-Site Contractor | Regional Victoria<br>
              15 Hub Locations • White-Label Services • Fully Insured & Compliant
            </p>
          </div>
        </div>
      `,
    });

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Inquiry submitted successfully. We will contact you within 30 minutes during business hours.',
      },
      { status: 201 }
    );
  } catch (error) {
    // Handle validation errors
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: error.issues,
        },
        { status: 400 }
      );
    }

    // Handle Resend API errors
    if (error instanceof Error) {
      console.error('Email sending error:', error.message);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to send notification. Please try again or call 0432 405 388.',
        },
        { status: 500 }
      );
    }

    // Handle unexpected errors
    console.error('Booking API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error. Please contact us directly at 0432 405 388.',
      },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS - CORS preflight
 */
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}
