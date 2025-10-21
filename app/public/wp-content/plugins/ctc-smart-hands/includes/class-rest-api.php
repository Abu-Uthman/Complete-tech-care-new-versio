<?php
/**
 * REST API for CTC Smart-Hands
 *
 * Registers and handles all REST API endpoints
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

class REST_API {

    /**
     * API namespace
     */
    const NAMESPACE = 'ctc/v1';

    /**
     * Initialize REST API
     */
    public static function init(): void {
        add_action('rest_api_init', [self::class, 'register_routes']);

        // Add CORS headers for all ctc/v1 requests
        add_action('rest_pre_serve_request', [self::class, 'add_cors_support'], 10, 4);
    }

    /**
     * Add CORS support
     */
    public static function add_cors_support($served, $result, $request, $server): void {
        // Only add CORS for our namespace
        if (strpos($request->get_route(), '/ctc/v1') === 0) {
            Auth::add_cors_headers();
        }
    }

    /**
     * Register all REST API routes
     */
    public static function register_routes(): void {
        // Public endpoints (no authentication required)

        // GET /rates - Get current rates
        register_rest_route(self::NAMESPACE, '/rates', [
            'methods' => 'GET',
            'callback' => [self::class, 'get_rates'],
            'permission_callback' => [Auth::class, 'public_permission_callback'],
        ]);

        // GET /downloads - Get compliance document URLs
        register_rest_route(self::NAMESPACE, '/downloads', [
            'methods' => 'GET',
            'callback' => [self::class, 'get_downloads'],
            'permission_callback' => [Auth::class, 'public_permission_callback'],
        ]);

        // Authenticated endpoints (HMAC required)

        // POST /bookings - Create new booking
        register_rest_route(self::NAMESPACE, '/bookings', [
            'methods' => 'POST',
            'callback' => [self::class, 'create_booking'],
            'permission_callback' => [Auth::class, 'authenticated_permission_callback'],
            'args' => self::get_booking_args(),
        ]);

        // GET /bookings - List bookings
        register_rest_route(self::NAMESPACE, '/bookings', [
            'methods' => 'GET',
            'callback' => [self::class, 'get_bookings'],
            'permission_callback' => [Auth::class, 'authenticated_permission_callback'],
            'args' => [
                'status' => [
                    'type' => 'string',
                    'enum' => ['new', 'confirmed', 'onsite', 'completed', 'invoiced', 'closed'],
                    'sanitize_callback' => 'sanitize_text_field',
                ],
                'q' => [
                    'type' => 'string',
                    'sanitize_callback' => 'sanitize_text_field',
                ],
                'date_from' => [
                    'type' => 'string',
                    'sanitize_callback' => 'sanitize_text_field',
                ],
                'date_to' => [
                    'type' => 'string',
                    'sanitize_callback' => 'sanitize_text_field',
                ],
                'page' => [
                    'type' => 'integer',
                    'default' => 1,
                    'sanitize_callback' => 'absint',
                ],
                'per_page' => [
                    'type' => 'integer',
                    'default' => 20,
                    'sanitize_callback' => 'absint',
                ],
            ],
        ]);

        // GET /bookings/{id} - Get single booking
        register_rest_route(self::NAMESPACE, '/bookings/(?P<id>\d+)', [
            'methods' => 'GET',
            'callback' => [self::class, 'get_booking'],
            'permission_callback' => [Auth::class, 'authenticated_permission_callback'],
            'args' => [
                'id' => [
                    'type' => 'integer',
                    'required' => true,
                    'sanitize_callback' => 'absint',
                ],
            ],
        ]);

        // PATCH /bookings/{id} - Update booking
        register_rest_route(self::NAMESPACE, '/bookings/(?P<id>\d+)', [
            'methods' => 'PATCH',
            'callback' => [self::class, 'update_booking'],
            'permission_callback' => [Auth::class, 'authenticated_permission_callback'],
            'args' => [
                'id' => [
                    'type' => 'integer',
                    'required' => true,
                    'sanitize_callback' => 'absint',
                ],
            ],
        ]);

        // POST /bookings/{id}/notify - Send notification
        register_rest_route(self::NAMESPACE, '/bookings/(?P<id>\d+)/notify', [
            'methods' => 'POST',
            'callback' => [self::class, 'send_notification'],
            'permission_callback' => [Auth::class, 'authenticated_permission_callback'],
            'args' => [
                'id' => [
                    'type' => 'integer',
                    'required' => true,
                    'sanitize_callback' => 'absint',
                ],
                'type' => [
                    'type' => 'string',
                    'required' => true,
                    'enum' => ['eta', 'custom'],
                ],
                'message' => [
                    'type' => 'string',
                    'sanitize_callback' => 'sanitize_textarea_field',
                ],
                'eta' => [
                    'type' => 'string',
                    'sanitize_callback' => 'sanitize_text_field',
                ],
            ],
        ]);
    }

    /**
     * Get booking validation args
     *
     * @return array Validation arguments
     */
    private static function get_booking_args(): array {
        return [
            'company' => [
                'type' => 'string',
                'required' => true,
                'sanitize_callback' => 'sanitize_text_field',
                'validate_callback' => fn($value) => !empty($value),
            ],
            'contact_name' => [
                'type' => 'string',
                'required' => true,
                'sanitize_callback' => 'sanitize_text_field',
                'validate_callback' => fn($value) => !empty($value),
            ],
            'email' => [
                'type' => 'string',
                'required' => true,
                'sanitize_callback' => 'sanitize_email',
                'validate_callback' => fn($value) => is_email($value),
            ],
            'phone' => [
                'type' => 'string',
                'required' => true,
                'sanitize_callback' => 'sanitize_text_field',
                'validate_callback' => [Helpers::class, 'validate_au_phone'],
            ],
            'po_number' => [
                'type' => 'string',
                'required' => true,
                'sanitize_callback' => 'sanitize_text_field',
                'validate_callback' => fn($value) => !empty($value),
            ],
            'sla' => [
                'type' => 'string',
                'required' => true,
                'enum' => ['4H', 'NBD', 'SCHEDULED'],
            ],
            'work_type' => [
                'type' => 'string',
                'required' => true,
                'sanitize_callback' => 'sanitize_text_field',
                'validate_callback' => fn($value) => !empty($value),
            ],
            'site_id' => [
                'type' => 'string',
                'required' => true,
                'sanitize_callback' => 'sanitize_text_field',
            ],
            'address' => [
                'type' => 'string',
                'required' => true,
                'sanitize_callback' => 'sanitize_textarea_field',
                'validate_callback' => fn($value) => !empty($value),
            ],
            'access_window' => [
                'type' => 'string',
                'required' => true,
                'sanitize_callback' => 'sanitize_text_field',
            ],
            'onsite_contact' => [
                'type' => 'string',
                'required' => true,
                'sanitize_callback' => 'sanitize_text_field',
            ],
            'parts_tracking' => [
                'type' => 'string',
                'sanitize_callback' => 'sanitize_text_field',
            ],
            'notes' => [
                'type' => 'string',
                'sanitize_callback' => 'sanitize_textarea_field',
            ],
            'scheduled_at' => [
                'type' => 'string',
                'sanitize_callback' => 'sanitize_text_field',
            ],
        ];
    }

    /**
     * GET /rates - Get current rates
     *
     * @param \WP_REST_Request $request Request object
     * @return \WP_REST_Response Response object
     */
    public static function get_rates(\WP_REST_Request $request): \WP_REST_Response {
        $rates = get_option(Settings::OPTION_RATES);

        return new \WP_REST_Response($rates, 200);
    }

    /**
     * GET /downloads - Get compliance document URLs
     *
     * @param \WP_REST_Request $request Request object
     * @return \WP_REST_Response Response object
     */
    public static function get_downloads(\WP_REST_Request $request): \WP_REST_Response {
        $downloads = get_option(Settings::OPTION_DOWNLOADS);

        return new \WP_REST_Response($downloads, 200);
    }

    /**
     * POST /bookings - Create new booking
     *
     * @param \WP_REST_Request $request Request object
     * @return \WP_REST_Response|\WP_Error Response object or error
     */
    public static function create_booking(\WP_REST_Request $request): \WP_REST_Response|\WP_Error {
        // Get sanitized data
        $data = Helpers::sanitize_booking_data($request->get_params());

        // Create booking
        $booking_id = Database::create_booking($data);

        if ($booking_id === false) {
            return new \WP_Error(
                'booking_creation_failed',
                __('Failed to create booking', 'ctc-smart-hands'),
                ['status' => 500]
            );
        }

        // Get created booking
        $booking = Database::get_booking($booking_id);

        // Send notifications (will be implemented in Phase 4)
        // For now, we'll add a placeholder
        // Notify::send_owner_email($booking);
        // Notify::send_owner_sms($booking);
        // Notify::send_dispatcher_email($booking);

        // Log booking creation
        Database::add_booking_note(
            $booking_id,
            'Booking created via API',
            'status_change',
            null
        );

        Helpers::log('Booking created', [
            'id' => $booking_id,
            'public_id' => $booking->public_id,
            'company' => $booking->company,
        ]);

        // Return created booking
        return new \WP_REST_Response([
            'id' => $booking->id,
            'public_id' => $booking->public_id,
            'status' => $booking->status,
            'created_at' => $booking->created_at,
        ], 201);
    }

    /**
     * GET /bookings - Get bookings list
     *
     * @param \WP_REST_Request $request Request object
     * @return \WP_REST_Response Response object
     */
    public static function get_bookings(\WP_REST_Request $request): \WP_REST_Response {
        $args = [
            'status' => $request->get_param('status'),
            'q' => $request->get_param('q'),
            'date_from' => $request->get_param('date_from'),
            'date_to' => $request->get_param('date_to'),
            'page' => $request->get_param('page') ?: 1,
            'per_page' => $request->get_param('per_page') ?: 20,
        ];

        $bookings = Database::get_bookings($args);
        $total = Database::count_bookings($args['status']);

        return new \WP_REST_Response([
            'bookings' => $bookings,
            'total' => $total,
            'page' => $args['page'],
            'per_page' => $args['per_page'],
            'total_pages' => ceil($total / $args['per_page']),
        ], 200);
    }

    /**
     * GET /bookings/{id} - Get single booking
     *
     * @param \WP_REST_Request $request Request object
     * @return \WP_REST_Response|\WP_Error Response object or error
     */
    public static function get_booking(\WP_REST_Request $request): \WP_REST_Response|\WP_Error {
        $id = $request->get_param('id');
        $booking = Database::get_booking($id);

        if (!$booking) {
            return new \WP_Error(
                'booking_not_found',
                __('Booking not found', 'ctc-smart-hands'),
                ['status' => 404]
            );
        }

        // Get booking notes
        $notes = Database::get_booking_notes($id);

        return new \WP_REST_Response([
            'booking' => $booking,
            'notes' => $notes,
        ], 200);
    }

    /**
     * PATCH /bookings/{id} - Update booking
     *
     * @param \WP_REST_Request $request Request object
     * @return \WP_REST_Response|\WP_Error Response object or error
     */
    public static function update_booking(\WP_REST_Request $request): \WP_REST_Response|\WP_Error {
        $id = $request->get_param('id');

        // Check if booking exists
        $booking = Database::get_booking($id);
        if (!$booking) {
            return new \WP_Error(
                'booking_not_found',
                __('Booking not found', 'ctc-smart-hands'),
                ['status' => 404]
            );
        }

        // Get update data
        $data = $request->get_params();
        unset($data['id']); // Remove ID from update data

        // Sanitize data
        $sanitized_data = Helpers::sanitize_booking_data($data);

        // Update booking
        $result = Database::update_booking($id, $sanitized_data);

        if ($result === false) {
            return new \WP_Error(
                'booking_update_failed',
                __('Failed to update booking', 'ctc-smart-hands'),
                ['status' => 500]
            );
        }

        // Log status change if status was updated
        if (isset($data['status'])) {
            Database::add_booking_note(
                $id,
                sprintf('Status changed to: %s', ucfirst($data['status'])),
                'status_change',
                null
            );
        }

        // Get updated booking
        $updated_booking = Database::get_booking($id);

        Helpers::log('Booking updated', [
            'id' => $id,
            'public_id' => $updated_booking->public_id,
        ]);

        return new \WP_REST_Response([
            'booking' => $updated_booking,
        ], 200);
    }

    /**
     * POST /bookings/{id}/notify - Send notification
     *
     * @param \WP_REST_Request $request Request object
     * @return \WP_REST_Response|\WP_Error Response object or error
     */
    public static function send_notification(\WP_REST_Request $request): \WP_REST_Response|\WP_Error {
        $id = $request->get_param('id');
        $type = $request->get_param('type');
        $message = $request->get_param('message');
        $eta = $request->get_param('eta');

        // Check if booking exists
        $booking = Database::get_booking($id);
        if (!$booking) {
            return new \WP_Error(
                'booking_not_found',
                __('Booking not found', 'ctc-smart-hands'),
                ['status' => 404]
            );
        }

        // Send notification (will be implemented in Phase 4)
        // For now, just log it
        $note_text = '';
        if ($type === 'eta') {
            $note_text = sprintf('ETA notification sent: %s', $eta);
            // Notify::send_eta($booking, $eta);
        } elseif ($type === 'custom') {
            $note_text = sprintf('Custom notification sent: %s', $message);
            // Notify::send_custom($booking, $message);
        }

        // Log notification
        Database::add_booking_note($id, $note_text, 'email', null);

        Helpers::log('Notification sent', [
            'booking_id' => $id,
            'type' => $type,
        ]);

        return new \WP_REST_Response([
            'success' => true,
            'message' => __('Notification sent successfully', 'ctc-smart-hands'),
        ], 200);
    }
}
