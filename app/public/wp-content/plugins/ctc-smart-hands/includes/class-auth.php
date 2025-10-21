<?php
/**
 * HMAC Authentication for CTC Smart-Hands API
 *
 * Handles HMAC SHA-256 signature verification for secure server-to-server communication
 *
 * @package CTC_Smart_Hands
 * @since 1.0.0
 */

declare(strict_types=1);

namespace CTC\SmartHands;

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

class Auth {

    /**
     * Maximum allowed timestamp skew in seconds (5 minutes)
     */
    const MAX_TIMESTAMP_SKEW = 300;

    /**
     * Verify HMAC authentication headers
     *
     * @param \WP_REST_Request $request REST API request object
     * @return bool|\WP_Error True if authenticated, WP_Error if failed
     */
    public static function verify_hmac(\WP_REST_Request $request): bool|\WP_Error {
        // Get authentication headers
        $api_key = $request->get_header('X-CTC-Key');
        $timestamp = $request->get_header('X-CTC-Timestamp');
        $signature = $request->get_header('X-CTC-Signature');

        // Check if all required headers are present
        if (empty($api_key) || empty($timestamp) || empty($signature)) {
            Helpers::log('HMAC auth failed: Missing headers', [
                'has_key' => !empty($api_key),
                'has_timestamp' => !empty($timestamp),
                'has_signature' => !empty($signature),
            ]);

            return new \WP_Error(
                'missing_auth_headers',
                __('Missing authentication headers (X-CTC-Key, X-CTC-Timestamp, X-CTC-Signature)', 'ctc-smart-hands'),
                ['status' => 401]
            );
        }

        // Verify API key matches
        $general = get_option(Settings::OPTION_GENERAL);
        if ($api_key !== $general['api_key']) {
            Helpers::log('HMAC auth failed: Invalid API key', [
                'provided_key' => substr($api_key, 0, 10) . '...',
            ]);

            return new \WP_Error(
                'invalid_api_key',
                __('Invalid API key', 'ctc-smart-hands'),
                ['status' => 401]
            );
        }

        // Verify timestamp is not too old or too far in future
        $current_time = time();
        $timestamp_int = (int) $timestamp;
        $time_diff = abs($current_time - $timestamp_int);

        if ($time_diff > self::MAX_TIMESTAMP_SKEW) {
            Helpers::log('HMAC auth failed: Timestamp too old/new', [
                'current_time' => $current_time,
                'request_timestamp' => $timestamp_int,
                'difference_seconds' => $time_diff,
                'max_allowed' => self::MAX_TIMESTAMP_SKEW,
            ]);

            return new \WP_Error(
                'invalid_timestamp',
                sprintf(
                    __('Request timestamp too old or too far in future. Max skew: %d seconds', 'ctc-smart-hands'),
                    self::MAX_TIMESTAMP_SKEW
                ),
                ['status' => 401]
            );
        }

        // Get request body
        $body = $request->get_body();

        // Calculate expected signature
        $expected_signature = self::calculate_signature($timestamp, $body, $general['api_secret']);

        // Verify signature matches
        if (!hash_equals($expected_signature, $signature)) {
            Helpers::log('HMAC auth failed: Signature mismatch', [
                'expected' => substr($expected_signature, 0, 20) . '...',
                'provided' => substr($signature, 0, 20) . '...',
                'timestamp' => $timestamp,
                'body_length' => strlen($body),
            ]);

            return new \WP_Error(
                'invalid_signature',
                __('Invalid HMAC signature', 'ctc-smart-hands'),
                ['status' => 401]
            );
        }

        // Authentication successful
        Helpers::log('HMAC auth successful', [
            'timestamp' => $timestamp,
            'time_diff_seconds' => $time_diff,
        ]);

        return true;
    }

    /**
     * Calculate HMAC signature
     *
     * @param string $timestamp Unix timestamp
     * @param string $body Request body (JSON)
     * @param string $secret API secret
     * @return string HMAC SHA-256 signature (hex)
     */
    public static function calculate_signature(string $timestamp, string $body, string $secret): string {
        // Concatenate timestamp and body
        $message = $timestamp . $body;

        // Calculate HMAC SHA-256
        $signature = hash_hmac('sha256', $message, $secret);

        return $signature;
    }

    /**
     * Permission callback for public endpoints (always allow)
     *
     * @return bool Always true
     */
    public static function public_permission_callback(): bool {
        return true;
    }

    /**
     * Permission callback for authenticated endpoints (HMAC required)
     *
     * @param \WP_REST_Request $request REST API request
     * @return bool|\WP_Error True if authorized, WP_Error if not
     */
    public static function authenticated_permission_callback(\WP_REST_Request $request): bool|\WP_Error {
        return self::verify_hmac($request);
    }

    /**
     * Generate test signature (for documentation/testing purposes)
     *
     * @param string $timestamp Timestamp
     * @param array $data Request data
     * @return array Array with signature details
     */
    public static function generate_test_signature(string $timestamp, array $data): array {
        $general = get_option(Settings::OPTION_GENERAL);
        $body = wp_json_encode($data);
        $signature = self::calculate_signature($timestamp, $body, $general['api_secret']);

        return [
            'api_key' => $general['api_key'],
            'timestamp' => $timestamp,
            'body' => $body,
            'signature' => $signature,
            'headers' => [
                'X-CTC-Key' => $general['api_key'],
                'X-CTC-Timestamp' => $timestamp,
                'X-CTC-Signature' => $signature,
            ],
        ];
    }

    /**
     * Add CORS headers (allow Next.js frontend to access API)
     */
    public static function add_cors_headers(): void {
        // Allow requests from localhost (development)
        header('Access-Control-Allow-Origin: http://localhost:3000');
        header('Access-Control-Allow-Methods: GET, POST, PATCH, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: X-CTC-Key, X-CTC-Timestamp, X-CTC-Signature, Content-Type');
        header('Access-Control-Allow-Credentials: true');
    }

    /**
     * Handle OPTIONS preflight requests
     *
     * @return \WP_REST_Response Empty response with CORS headers
     */
    public static function handle_preflight(): \WP_REST_Response {
        self::add_cors_headers();
        return new \WP_REST_Response(null, 200);
    }
}
