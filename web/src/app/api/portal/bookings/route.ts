/**
 * Client Portal Bookings API Route
 * CTC Smart-Hands Project
 *
 * Fetch bookings for authenticated client
 */

import { NextRequest, NextResponse } from 'next/server';
import { wordpressClient } from '@/lib/wordpress/client';

/**
 * GET /api/portal/bookings - Get bookings for authenticated client
 */
export async function GET(request: NextRequest) {
  try {
    // Get email from query parameter
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email parameter is required',
        },
        { status: 400 }
      );
    }

    // Fetch all bookings from WordPress
    const response = await wordpressClient.getBookings({
      page: 1,
      per_page: 100,
    });

    if (response.success && response.data) {
      // Filter bookings by email on the client side
      // In production, WordPress API should support email filtering
      const clientBookings = response.data.bookings.filter(
        (booking) => booking.email?.toLowerCase() === email.toLowerCase()
      );

      return NextResponse.json(
        {
          success: true,
          data: {
            bookings: clientBookings,
            total: clientBookings.length,
          },
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          error: response.error?.message || 'Failed to fetch bookings',
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Portal bookings error:', error);
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
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}
