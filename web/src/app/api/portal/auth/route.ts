/**
 * Client Portal Authentication API Route
 * CTC Smart-Hands Project
 *
 * Simple email-based authentication for clients to view their bookings
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const authSchema = z.object({
  email: z.string().email('Invalid email address'),
});

/**
 * POST /api/portal/auth - Authenticate client by email
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate with Zod schema
    const validatedData = authSchema.parse(body);

    // For MVP: Simple email-based authentication
    // In production, this would verify against WordPress user database
    // For now, we'll just create a session token based on the email
    const sessionToken = Buffer.from(validatedData.email).toString('base64');

    return NextResponse.json(
      {
        success: true,
        data: {
          token: sessionToken,
          email: validatedData.email,
        },
        message: 'Authentication successful',
      },
      { status: 200 }
    );
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
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
    console.error('Portal auth error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Authentication failed',
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
