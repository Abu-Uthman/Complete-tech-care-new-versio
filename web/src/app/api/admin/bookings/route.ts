/**
 * Admin Bookings API Route
 * CTC Smart-Hands Project
 *
 * Fetch and manage bookings from WordPress backend
 */

import { NextRequest, NextResponse } from 'next/server';
import { wordpressClient } from '@/lib/wordpress/client';

/**
 * GET /api/admin/bookings - Fetch bookings list
 */
export async function GET(request: NextRequest) {
  try {
    // Check authentication (simple cookie check for MVP)
    const cookies = request.cookies;
    const adminSession = cookies.get('admin_session');

    if (!adminSession || adminSession.value !== 'authenticated') {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized',
        },
        { status: 401 }
      );
    }

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const location = searchParams.get('location');
    const page = parseInt(searchParams.get('page') || '1');
    const per_page = parseInt(searchParams.get('per_page') || '50');

    // Fetch from WordPress
    const response = await wordpressClient.getBookings({
      page,
      per_page,
      status: status || undefined,
      location: location || undefined,
    });

    if (response.success) {
      return NextResponse.json(
        {
          success: true,
          data: response.data,
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
    console.error('Bookings API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
