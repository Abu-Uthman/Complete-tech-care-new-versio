/**
 * Rates API Route
 * CTC Smart-Hands Project
 *
 * Fetches current rates from WordPress backend
 */

import { NextResponse } from 'next/server';
import { wordpressClient } from '@/lib/wordpress/client';

/**
 * GET /api/rates - Fetch current rates
 */
export async function GET() {
  try {
    const response = await wordpressClient.getRates();

    if (response.success) {
      return NextResponse.json(
        {
          success: true,
          data: response.data,
        },
        {
          status: 200,
          headers: {
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
          },
        }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          error: response.error?.message || 'Failed to fetch rates',
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Rates API error:', error);
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
