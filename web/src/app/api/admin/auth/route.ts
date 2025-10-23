/**
 * Admin Authentication API Route
 * CTC Smart-Hands Project
 *
 * Simple password-based authentication for admin dashboard
 */

import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/admin/auth - Authenticate admin user
 */
export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    // For MVP, use a simple password comparison
    // In production, use bcrypt hash comparison
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

    if (password === ADMIN_PASSWORD) {
      return NextResponse.json(
        {
          success: true,
          message: 'Authentication successful',
        },
        {
          status: 200,
          headers: {
            'Set-Cookie': `admin_session=authenticated; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`,
          },
        }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid credentials',
        },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Auth API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Authentication failed',
      },
      { status: 500 }
    );
  }
}
