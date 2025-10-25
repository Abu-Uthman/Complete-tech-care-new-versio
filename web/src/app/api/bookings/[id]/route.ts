/**
 * Booking Update API Route
 * CTC Smart-Hands Project
 *
 * PATCH endpoint for updating booking details (status, notes, assigned tech)
 */

import { NextRequest, NextResponse } from 'next/server';
import { wordpressClient } from '@/lib/wordpress/client';

/**
 * PATCH /api/bookings/[id] - Update booking
 */
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const bookingId = parseInt(params.id, 10);

    if (isNaN(bookingId)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid booking ID',
        },
        { status: 400 }
      );
    }

    // Parse request body
    const body = await request.json();

    // Validate allowed fields
    const allowedFields = ['status', 'internal_notes', 'assigned_tech'];
    const updates: Record<string, unknown> = {};

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updates[field] = body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'No valid fields to update',
        },
        { status: 400 }
      );
    }

    // Send to WordPress via HMAC-authenticated client
    const response = await wordpressClient.updateBooking(bookingId, updates);

    if (response.success) {
      return NextResponse.json(
        {
          success: true,
          data: response.data,
          message: 'Booking updated successfully',
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          error: response.error?.message || 'Failed to update booking',
        },
        { status: response.error?.code === 'HTTP_401' ? 401 : 500 }
      );
    }
  } catch (error) {
    console.error('Booking update API error:', error);
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
        'Access-Control-Allow-Methods': 'PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}
