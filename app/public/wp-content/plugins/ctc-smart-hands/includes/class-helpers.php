<?php
/**
 * Helper functions for CTC Smart-Hands
 *
 * Utility functions and helpers
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

class Helpers {

    /**
     * Format Australian phone number
     * @param string $phone Phone number
     * @return string Formatted phone number
     */
    public static function format_phone(string $phone): string {
        // Remove all non-numeric characters
        $phone = preg_replace('/[^0-9]/', '', $phone);

        // Format based on length
        if (strlen($phone) === 10 && str_starts_with($phone, '0')) {
            // 0X XXXX XXXX format
            return substr($phone, 0, 2) . ' ' . substr($phone, 2, 4) . ' ' . substr($phone, 6);
        } elseif (strlen($phone) === 11 && str_starts_with($phone, '61')) {
            // +61 X XXXX XXXX format
            return '+' . substr($phone, 0, 2) . ' ' . substr($phone, 2, 1) . ' ' .
                   substr($phone, 3, 4) . ' ' . substr($phone, 7);
        }

        return $phone; // Return as-is if format unknown
    }

    /**
     * Calculate service rate based on hours and settings
     * @param float $hours Number of hours
     * @param bool $is_after_hours Whether after hours rate applies
     * @return float Total rate (excluding GST)
     */
    public static function calculate_service_rate(float $hours, bool $is_after_hours = false): float {
        $rates = get_option(Settings::OPTION_RATES);

        $hourly_rate = $is_after_hours ? (float)$rates['ahHourly'] : (float)$rates['bhHourly'];
        $min_hours = (float)$rates['minHours'];

        // Apply minimum hours
        $billable_hours = max($hours, $min_hours);

        // Round up to increment (e.g., 30 mins = 0.5 hours)
        $increment = (int)$rates['incrementMins'] / 60;
        $billable_hours = ceil($billable_hours / $increment) * $increment;

        return $billable_hours * $hourly_rate;
    }

    /**
     * Calculate travel cost
     * @param float $distance_km Distance in kilometers
     * @param float|null $travel_time_hours Travel time in hours (for TRAVEL_TIME model)
     * @return float Travel cost
     */
    public static function calculate_travel_cost(float $distance_km, ?float $travel_time_hours = null): float {
        $rates = get_option(Settings::OPTION_RATES);

        $travel_model = $rates['travelModel'];
        $free_km = (int)$rates['freeKm'];

        // Apply free kilometers
        $billable_km = max(0, $distance_km - $free_km);

        if ($travel_model === 'PER_KM') {
            $cost = $billable_km * (float)$rates['perKmRate'];
        } elseif ($travel_model === 'TRAVEL_TIME' && $travel_time_hours !== null) {
            $cost = $travel_time_hours * (float)$rates['travelHourly'];
        } else {
            $cost = 0;
        }

        return $cost;
    }

    /**
     * Apply Bendigo cap if applicable
     * @param string $address Service address
     * @param float $calculated_travel_cost Calculated travel cost
     * @return float Travel cost with cap applied
     */
    public static function apply_location_cap(string $address, float $calculated_travel_cost): float {
        $rates = get_option(Settings::OPTION_RATES);

        // Check if address contains "Bendigo"
        if (stripos($address, 'Bendigo') !== false) {
            $bendigo_cap = (float)$rates['bendigoCap'];
            return min($calculated_travel_cost, $bendigo_cap);
        }

        return $calculated_travel_cost;
    }

    /**
     * Calculate GST
     * @param float $amount Amount excluding GST
     * @return float GST amount (10%)
     */
    public static function calculate_gst(float $amount): float {
        $rates = get_option(Settings::OPTION_RATES);

        if ($rates['gstEnabled']) {
            return round($amount * 0.1, 2);
        }

        return 0;
    }

    /**
     * Replace template tokens with booking data
     * @param string $template Template string with {tokens}
     * @param object $booking Booking object
     * @return string Template with tokens replaced
     */
    public static function replace_template_tokens(string $template, object $booking): string {
        $tokens = [
            '{public_id}' => $booking->public_id ?? '',
            '{company}' => $booking->company ?? '',
            '{po}' => $booking->po_number ?? '',
            '{site_id}' => $booking->site_id ?? '',
            '{sla}' => $booking->sla ?? '',
            '{contact}' => $booking->contact_name ?? '',
            '{phone}' => $booking->phone ?? '',
            '{email}' => $booking->email ?? '',
            '{address}' => $booking->address ?? '',
            '{access_window}' => $booking->access_window ?? '',
            '{onsite_contact}' => $booking->onsite_contact ?? '',
            '{work_type}' => $booking->work_type ?? '',
            '{parts_tracking}' => $booking->parts_tracking ?? '',
            '{notes}' => $booking->notes ?? '',
            '{created_at}' => isset($booking->created_at) ?
                self::format_datetime($booking->created_at) : '',
            '{status}' => isset($booking->status) ?
                ucfirst($booking->status) : '',
        ];

        return str_replace(array_keys($tokens), array_values($tokens), $template);
    }

    /**
     * Format datetime for Australian timezone
     * @param string $datetime MySQL datetime string
     * @param string $format PHP date format
     * @return string Formatted datetime
     */
    public static function format_datetime(string $datetime, string $format = 'j M Y, g:i a'): string {
        $general = get_option(Settings::OPTION_GENERAL);
        $timezone = new \DateTimeZone($general['timezone'] ?? 'Australia/Melbourne');

        $dt = new \DateTime($datetime, new \DateTimeZone('UTC'));
        $dt->setTimezone($timezone);

        return $dt->format($format);
    }

    /**
     * Validate Australian phone number
     * @param string $phone Phone number
     * @return bool True if valid
     */
    public static function validate_au_phone(string $phone): bool {
        // Remove all non-numeric characters
        $phone = preg_replace('/[^0-9]/', '', $phone);

        // Must be 10 digits starting with 0, or 11 digits starting with 61
        if (strlen($phone) === 10 && str_starts_with($phone, '0')) {
            return true;
        }

        if (strlen($phone) === 11 && str_starts_with($phone, '61')) {
            return true;
        }

        return false;
    }

    /**
     * Sanitize booking data for database insertion
     * Supports both full MSP schema and simplified lead-gen schema
     * @param array $data Raw booking data
     * @return array Sanitized booking data
     */
    public static function sanitize_booking_data(array $data): array {
        // Map lead-gen fields to MSP schema
        $email = $data['email'] ?? $data['contact_email'] ?? '';
        $phone = $data['phone'] ?? $data['contact_phone'] ?? '';
        $address = $data['address'] ?? $data['site_address'] ?? '';
        $notes = $data['notes'] ?? $data['description'] ?? '';
        $work_type = $data['work_type'] ?? $data['service_type'] ?? 'General Inquiry';

        // Generate defaults for lead-gen forms
        $is_leadgen = !isset($data['po_number']) || empty($data['po_number']);
        $location = $data['location'] ?? '';

        return [
            'company' => sanitize_text_field($data['company'] ?? ''),
            'contact_name' => sanitize_text_field($data['contact_name'] ?? ''),
            'email' => sanitize_email($email),
            'phone' => sanitize_text_field($phone),

            // Lead-gen: Use "PENDING" as placeholder, MSP: Actual PO number
            'po_number' => sanitize_text_field($data['po_number'] ?? 'LEADGEN-' . time()),

            // Lead-gen: Default to "SCHEDULED" for info requests
            'sla' => in_array($data['sla'] ?? '', ['4H', 'NBD', 'SCHEDULED']) ?
                $data['sla'] : ($is_leadgen ? 'SCHEDULED' : '4H'),

            'scheduled_at' => isset($data['scheduled_at']) ?
                sanitize_text_field($data['scheduled_at']) :
                (isset($data['scheduled_date']) ? sanitize_text_field($data['scheduled_date']) : null),

            // Work type from service_type (lead-gen) or work_type (MSP)
            'work_type' => sanitize_text_field($work_type),

            // Lead-gen: Use location as site_id, MSP: Actual site ID
            'site_id' => sanitize_text_field($data['site_id'] ?? $location),

            'address' => sanitize_textarea_field($address),

            // Lead-gen: Defaults for info requests
            'access_window' => sanitize_text_field($data['access_window'] ?? 'Business Hours (8am-6pm)'),
            'onsite_contact' => sanitize_text_field($data['onsite_contact'] ?? $data['contact_name'] ?? ''),

            'parts_tracking' => sanitize_text_field($data['parts_tracking'] ?? ''),
            'notes' => sanitize_textarea_field($notes),
            'links' => isset($data['links']) && is_array($data['links']) ?
                array_map('esc_url_raw', $data['links']) : [],

            // Admin-only fields for booking management
            'assigned_tech' => isset($data['assigned_tech']) ?
                sanitize_text_field($data['assigned_tech']) : null,
            'internal_notes' => isset($data['internal_notes']) ?
                sanitize_textarea_field($data['internal_notes']) : null,
            'preferred_date' => isset($data['preferred_date']) ?
                sanitize_text_field($data['preferred_date']) : null,
            'preferred_time' => isset($data['preferred_time']) ?
                sanitize_text_field($data['preferred_time']) : null,

            // Status updates (allow admin to change status via API)
            'status' => isset($data['status']) && in_array($data['status'], ['new', 'confirmed', 'onsite', 'completed', 'invoiced', 'closed']) ?
                $data['status'] : null,
        ];
    }

    /**
     * Format work type for display
     * @param string $work_type Work type
     * @return string Formatted work type
     */
    public static function format_work_type(string $work_type): string {
        // Handle empty values
        if (empty($work_type)) {
            return 'General Support';
        }

        // Already formatted (contains spaces or slashes)
        if (str_contains($work_type, ' ') || str_contains($work_type, '/')) {
            return $work_type;
        }

        // Convert underscores/hyphens to spaces and title case
        $formatted = str_replace(['_', '-'], ' ', $work_type);
        return ucwords(strtolower($formatted));
    }

    /**
     * Get status badge color
     * @param string $status Booking status
     * @return string CSS color class
     */
    public static function get_status_color(string $status): string {
        $colors = [
            'new' => 'blue',
            'confirmed' => 'green',
            'onsite' => 'orange',
            'completed' => 'teal',
            'invoiced' => 'purple',
            'closed' => 'gray',
        ];

        return $colors[$status] ?? 'gray';
    }

    /**
     * Log debug message (if WP_DEBUG is enabled)
     * @param string $message Message to log
     * @param mixed $data Additional data to log
     */
    public static function log(string $message, mixed $data = null): void {
        if (defined('WP_DEBUG') && WP_DEBUG) {
            $log_message = 'CTC Smart-Hands: ' . $message;

            if ($data !== null) {
                $log_message .= ' | Data: ' . print_r($data, true);
            }

            error_log($log_message);
        }
    }
}
