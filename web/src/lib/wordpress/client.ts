/**
 * WordPress REST API Client with HMAC Authentication
 * CTC Smart-Hands Project
 */

import type {
  Booking,
  CreateBookingRequest,
  UpdateBookingRequest,
  RatesResponse,
  ApiResponse,
  PaginatedResponse,
} from './types';

/**
 * WordPress API Client Configuration
 */
interface WordPressClientConfig {
  apiBase: string;
  apiKey: string;
  apiSecret: string;
}

/**
 * HMAC Authentication Headers
 */
interface HMACHeaders {
  'X-CTC-Key': string;
  'X-CTC-Timestamp': string;
  'X-CTC-Signature': string;
  'Content-Type': string;
}

/**
 * WordPress API Client
 */
export class WordPressClient {
  private config: WordPressClientConfig;

  constructor(config?: Partial<WordPressClientConfig>) {
    this.config = {
      apiBase: config?.apiBase || process.env.CTC_WP_API_BASE || '',
      apiKey: config?.apiKey || process.env.CTC_API_KEY || '',
      apiSecret: config?.apiSecret || process.env.CTC_API_SECRET || '',
    };

    // Validate configuration
    if (!this.config.apiBase || !this.config.apiKey || !this.config.apiSecret) {
      console.warn(
        'WordPress API credentials not fully configured. Check environment variables.'
      );
    }
  }

  /**
   * Generate HMAC SHA-256 signature
   */
  private async generateSignature(
    timestamp: string,
    body: string
  ): Promise<string> {
    const message = timestamp + body;
    const encoder = new TextEncoder();
    const keyData = encoder.encode(this.config.apiSecret);
    const messageData = encoder.encode(message);

    // Import key for HMAC
    const key = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    // Generate signature
    const signature = await crypto.subtle.sign('HMAC', key, messageData);

    // Convert to hex string
    return Array.from(new Uint8Array(signature))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }

  /**
   * Generate authentication headers
   */
  private async generateHeaders(body: string = ''): Promise<HMACHeaders> {
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const signature = await this.generateSignature(timestamp, body);

    return {
      'X-CTC-Key': this.config.apiKey,
      'X-CTC-Timestamp': timestamp,
      'X-CTC-Signature': signature,
      'Content-Type': 'application/json',
    };
  }

  /**
   * Make authenticated API request
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const body = options.body ? String(options.body) : '';
      const headers = await this.generateHeaders(body);

      const response = await fetch(`${this.config.apiBase}${endpoint}`, {
        ...options,
        headers: {
          ...headers,
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: {
            code: `HTTP_${response.status}`,
            message: data.message || 'Request failed',
          },
        };
      }

      return {
        success: true,
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: error instanceof Error ? error.message : 'Unknown error',
        },
      };
    }
  }

  /**
   * Create a new booking
   */
  async createBooking(
    data: CreateBookingRequest
  ): Promise<ApiResponse<Booking>> {
    return this.request<Booking>('/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * Get all bookings (paginated)
   */
  async getBookings(params?: {
    page?: number;
    per_page?: number;
    status?: string;
    location?: string;
  }): Promise<ApiResponse<PaginatedResponse<Booking>>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.set('page', params.page.toString());
    if (params?.per_page) queryParams.set('per_page', params.per_page.toString());
    if (params?.status) queryParams.set('status', params.status);
    if (params?.location) queryParams.set('location', params.location);

    const query = queryParams.toString();
    const endpoint = query ? `/bookings?${query}` : '/bookings';

    return this.request<PaginatedResponse<Booking>>(endpoint);
  }

  /**
   * Get a single booking by ID
   */
  async getBooking(id: number): Promise<ApiResponse<Booking>> {
    return this.request<Booking>(`/bookings/${id}`);
  }

  /**
   * Update a booking
   */
  async updateBooking(
    id: number,
    data: UpdateBookingRequest
  ): Promise<ApiResponse<Booking>> {
    return this.request<Booking>(`/bookings/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  /**
   * Get current rates
   */
  async getRates(): Promise<ApiResponse<RatesResponse>> {
    return this.request<RatesResponse>('/rates');
  }

  /**
   * Send notification for a booking
   */
  async sendNotification(
    id: number,
    message: string
  ): Promise<ApiResponse<{ sent: boolean }>> {
    return this.request<{ sent: boolean }>(`/bookings/${id}/notify`, {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  }
}

/**
 * Default client instance
 * Uses environment variables for configuration
 */
export const wordpressClient = new WordPressClient();
