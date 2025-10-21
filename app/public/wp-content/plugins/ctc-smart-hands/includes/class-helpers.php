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
     * @param array $data Raw booking data
     * @return array Sanitized booking data
     */
    public static function sanitize_booking_data(array $data): array {
        return [
            'company' => sanitize_text_field($data['company'] ?? ''),
            'contact_name' => sanitize_text_field($data['contact_name'] ?? ''),
            'email' => sanitize_email($data['email'] ?? ''),
            'phone' => sanitize_text_field($data['phone'] ?? ''),
            'po_number' => sanitize_text_field($data['po_number'] ?? ''),
            'sla' => in_array($data['sla'] ?? '', ['4H', 'NBD', 'SCHEDULED']) ?
                $data['sla'] : '4H',
            'scheduled_at' => isset($data['scheduled_at']) ?
                sanitize_text_field($data['scheduled_at']) : null,
            'work_type' => sanitize_text_field($data['work_type'] ?? ''),
            'site_id' => sanitize_text_field($data['site_id'] ?? ''),
            'address' => sanitize_textarea_field($data['address'] ?? ''),
            'access_window' => sanitize_text_field($data['access_window'] ?? ''),
            'onsite_contact' => sanitize_text_field($data['onsite_contact'] ?? ''),
            'parts_tracking' => sanitize_text_field($data['parts_tracking'] ?? ''),
            'notes' => sanitize_textarea_field($data['notes'] ?? ''),
            'links' => isset($data['links']) && is_array($data['links']) ?
                array_map('esc_url_raw', $data['links']) : [],
        ];
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
