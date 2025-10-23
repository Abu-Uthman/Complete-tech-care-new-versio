/**
 * Booking API Route
 * CTC Smart-Hands Project
 *
 * Proxies booking requests to WordPress backend with HMAC authentication
 */

import { NextRequest, NextResponse } from 'next/server';
import { wordpressClient } from '@/lib/wordpress/client';
import { bookingFormSchema } from '@/lib/validations/schemas';
import { ZodError } from 'zod';

/**
 * POST /api/book - Create a new booking
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate with Zod schema
    const validatedData = bookingFormSchema.parse(body);

    // Send to WordPress via HMAC-authenticated client
    const response = await wordpressClient.createBooking(validatedData);

    if (response.success) {
      return NextResponse.json(
        {
          success: true,
          data: response.data,
          message: 'Booking submitted successfully',
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          error: response.error?.message || 'Failed to create booking',
        },
        { status: response.error?.code === 'HTTP_401' ? 401 : 500 }
      );
    }
  } catch (error) {
    // Handle validation errors
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    // Handle other errors
    console.error('Booking API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
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
