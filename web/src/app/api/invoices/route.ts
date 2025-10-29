/**
 * Invoice API Route
 * POST /api/invoices - Create a new invoice
 */

import { NextResponse } from 'next/server';
import { wordpressClient } from '@/lib/wordpress/client';
import type { CreateInvoiceRequest } from '@/lib/wordpress/types';

export async function POST(req: Request) {
  try {
    const body: CreateInvoiceRequest = await req.json();

    console.log('[Invoice API] Creating invoice:', {
      booking_id: body.booking_id,
      line_items_count: body.line_items.length,
    });

    const response = await wordpressClient.createInvoice(body);

    if (response.success) {
      console.log('[Invoice API] Invoice created successfully:', response.data?.id);
      return NextResponse.json({
        success: true,
        data: response.data,
      });
    } else {
      console.error('[Invoice API] Failed to create invoice:', response.error);
      return NextResponse.json(
        {
          success: false,
          error: response.error?.message || 'Failed to create invoice',
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('[Invoice API] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
