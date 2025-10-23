<?php
/**
 * Notification System for CTC Smart-Hands
 *
 * Handles email and SMS notifications for bookings
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

class Notify {

    /**
     * Initialize notification system
     */
    public static function init(): void {
        // Hook into booking creation
        add_action('ctc_booking_created', [self::class, 'on_booking_created'], 10, 1);
    }

    /**
     * Handle new booking creation
     *
     * @param object $booking Booking object
     */
    public static function on_booking_created(object $booking): void {
        // Send all notifications
        self::send_owner_email($booking);
        self::send_owner_sms($booking);
        self::send_dispatcher_email($booking);
    }

    /**
     * Send email to owner
     *
     * @param object $booking Booking object
     * @return bool True if sent successfully
     */
    public static function send_owner_email(object $booking): bool {
        $notify_settings = get_option(Settings::OPTION_NOTIFY);

        if (empty($notify_settings['owner_email'])) {
            Helpers::log('Owner email not configured', ['booking_id' => $booking->id]);
            return false;
        }

        // Get email template
        $template = $notify_settings['owner_email_template'] ?? self::get_default_owner_email_template();

        // Replace tokens
        $message = Helpers::replace_template_tokens($template, $booking);

        // Email headers
        $headers = [
            'Content-Type: text/plain; charset=UTF-8',
            'From: CTC Smart-Hands <' . ($notify_settings['smtp_from'] ?? get_option('admin_email')) . '>',
        ];

        // Subject line
        $subject = sprintf('[CTC] New Booking: %s - %s', $booking->public_id, $booking->company);

        // Send email
        $sent = wp_mail(
            $notify_settings['owner_email'],
            $subject,
            $message,
            $headers
        );

        if ($sent) {
            // Log successful send
            Database::add_booking_note(
                (int)$booking->id,
                sprintf('Owner email sent to: %s', $notify_settings['owner_email']),
                'email',
                null
            );

            Helpers::log('Owner email sent', [
                'booking_id' => $booking->id,
                'public_id' => $booking->public_id,
                'to' => $notify_settings['owner_email'],
            ]);
        } else {
            Helpers::log('Owner email failed', [
                'booking_id' => $booking->id,
                'public_id' => $booking->public_id,
            ]);
        }

        return $sent;
    }

    /**
     * Send SMS to owner via Twilio
     *
     * @param object $booking Booking object
     * @return bool True if sent successfully
     */
    public static function send_owner_sms(object $booking): bool {
        $notify_settings = get_option(Settings::OPTION_NOTIFY);

        // Check if Twilio is configured
        if (empty($notify_settings['owner_phone']) ||
            empty($notify_settings['twilio_sid']) ||
            empty($notify_settings['twilio_token']) ||
            empty($notify_settings['twilio_from'])) {
            Helpers::log('Twilio not fully configured', ['booking_id' => $booking->id]);
            return false;
        }

        // Create SMS message (160 char limit)
        $message = sprintf(
            "New booking %s from %s. PO: %s, Site: %s, SLA: %s",
            $booking->public_id,
            $booking->company,
            $booking->po_number,
            $booking->site_id,
            $booking->sla
        );

        // Truncate if too long
        if (strlen($message) > 160) {
            $message = substr($message, 0, 157) . '...';
        }

        // Send via Twilio
        $sent = self::send_twilio_sms(
            $notify_settings['owner_phone'],
            $message,
            $notify_settings['twilio_sid'],
            $notify_settings['twilio_token'],
            $notify_settings['twilio_from']
        );

        if ($sent) {
            Database::add_booking_note(
                (int)$booking->id,
                sprintf('Owner SMS sent to: %s', $notify_settings['owner_phone']),
                'sms',
                null
            );

            Helpers::log('Owner SMS sent', [
                'booking_id' => $booking->id,
                'public_id' => $booking->public_id,
                'to' => $notify_settings['owner_phone'],
            ]);
        }

        return $sent;
    }

    /**
     * Send confirmation email to dispatcher (customer)
     *
     * @param object $booking Booking object
     * @return bool True if sent successfully
     */
    public static function send_dispatcher_email(object $booking): bool {
        $notify_settings = get_option(Settings::OPTION_NOTIFY);

        if (empty($booking->email)) {
            Helpers::log('Dispatcher email missing', ['booking_id' => $booking->id]);
            return false;
        }

        // Get email template
        $template = $notify_settings['dispatcher_email_template'] ?? self::get_default_dispatcher_email_template();

        // Replace tokens
        $message = Helpers::replace_template_tokens($template, $booking);

        // Email headers
        $headers = [
            'Content-Type: text/plain; charset=UTF-8',
            'From: CTC Smart-Hands <' . ($notify_settings['smtp_from'] ?? get_option('admin_email')) . '>',
        ];

        // Subject line
        $subject = sprintf('Booking Confirmation - %s', $booking->public_id);

        // Send email
        $sent = wp_mail(
            $booking->email,
            $subject,
            $message,
            $headers
        );

        if ($sent) {
            Database::add_booking_note(
                (int)$booking->id,
                sprintf('Dispatcher confirmation sent to: %s', $booking->email),
                'email',
                null
            );

            Helpers::log('Dispatcher email sent', [
                'booking_id' => $booking->id,
                'public_id' => $booking->public_id,
                'to' => $booking->email,
            ]);
        } else {
            Helpers::log('Dispatcher email failed', [
                'booking_id' => $booking->id,
                'to' => $booking->email,
            ]);
        }

        return $sent;
    }

    /**
     * Send ETA notification
     *
     * @param object $booking Booking object
     * @param string $eta Estimated time of arrival
     * @return bool True if sent successfully
     */
    public static function send_eta(object $booking, string $eta): bool {
        $message = sprintf(
            "ETA Update for %s\n\n" .
            "Our technician will arrive at approximately: %s\n\n" .
            "Site: %s\n" .
            "Address: %s\n" .
            "Contact: %s (%s)\n\n" .
            "Complete Tech Care",
            $booking->public_id,
            $eta,
            $booking->site_id,
            $booking->address,
            $booking->onsite_contact,
            $booking->phone
        );

        $headers = [
            'Content-Type: text/plain; charset=UTF-8',
            'From: CTC Smart-Hands <' . get_option('admin_email') . '>',
        ];

        $sent = wp_mail(
            $booking->email,
            sprintf('ETA Update - %s', $booking->public_id),
            $message,
            $headers
        );

        if ($sent) {
            Database::add_booking_note(
                (int)$booking->id,
                sprintf('ETA notification sent: %s', $eta),
                'email',
                null
            );
        }

        return $sent;
    }

    /**
     * Send custom notification
     *
     * @param object $booking Booking object
     * @param string $custom_message Custom message
     * @return bool True if sent successfully
     */
    public static function send_custom(object $booking, string $custom_message): bool {
        $message = sprintf(
            "Update for booking %s\n\n%s\n\nComplete Tech Care",
            $booking->public_id,
            $custom_message
        );

        $headers = [
            'Content-Type: text/plain; charset=UTF-8',
            'From: CTC Smart-Hands <' . get_option('admin_email') . '>',
        ];

        $sent = wp_mail(
            $booking->email,
            sprintf('Update - %s', $booking->public_id),
            $message,
            $headers
        );

        if ($sent) {
            Database::add_booking_note(
                (int)$booking->id,
                sprintf('Custom notification sent: %s', substr($custom_message, 0, 50)),
                'email',
                null
            );
        }

        return $sent;
    }

    /**
     * Send SMS via Twilio API
     *
     * @param string $to Phone number (e.g., +61412345678)
     * @param string $message SMS message
     * @param string $sid Twilio Account SID
     * @param string $token Twilio Auth Token
     * @param string $from Twilio phone number
     * @return bool True if sent successfully
     */
    private static function send_twilio_sms(
        string $to,
        string $message,
        string $sid,
        string $token,
        string $from
    ): bool {
        // Ensure phone number has + prefix
        if (!str_starts_with($to, '+')) {
            // Convert Australian numbers
            if (str_starts_with($to, '0')) {
                $to = '+61' . substr($to, 1);
            } else {
                $to = '+' . $to;
            }
        }

        // Twilio API endpoint
        $url = "https://api.twilio.com/2010-04-01/Accounts/{$sid}/Messages.json";

        // Prepare data
        $data = [
            'From' => $from,
            'To' => $to,
            'Body' => $message,
        ];

        // Make request
        $response = wp_remote_post($url, [
            'headers' => [
                'Authorization' => 'Basic ' . base64_encode($sid . ':' . $token),
                'Content-Type' => 'application/x-www-form-urlencoded',
            ],
            'body' => $data,
            'timeout' => 30,
        ]);

        if (is_wp_error($response)) {
            Helpers::log('Twilio SMS error', [
                'error' => $response->get_error_message(),
                'to' => $to,
            ]);
            return false;
        }

        $status_code = wp_remote_retrieve_response_code($response);
        $body = wp_remote_retrieve_body($response);

        if ($status_code >= 200 && $status_code < 300) {
            return true;
        } else {
            Helpers::log('Twilio SMS failed', [
                'status' => $status_code,
                'response' => $body,
                'to' => $to,
            ]);
            return false;
        }
    }

    /**
     * Get default owner email template
     *
     * @return string Email template
     */
    private static function get_default_owner_email_template(): string {
        return "New Booking Alert - {public_id}\n\n" .
               "Company: {company}\n" .
               "PO: {po}\n" .
               "Site: {site_id}\n" .
               "SLA: {sla}\n" .
               "Contact: {contact} ({phone})\n" .
               "Address: {address}\n" .
               "Access: {access_window}\n" .
               "Work Type: {work_type}\n\n" .
               "View in admin: " . admin_url('admin.php?page=ctc-smart-hands') . "\n\n" .
               "Complete Tech Care\n" .
               "Regional VIC Smart-Hands Services";
    }

    /**
     * Get default dispatcher email template
     *
     * @return string Email template
     */
    private static function get_default_dispatcher_email_template(): string {
        return "Thank you for your booking!\n\n" .
               "Booking Reference: {public_id}\n" .
               "Company: {company}\n" .
               "PO: {po}\n" .
               "Site: {site_id}\n" .
               "SLA: {sla}\n\n" .
               "We will confirm your booking shortly.\n\n" .
               "Complete Tech Care\n" .
               "Regional VIC Smart-Hands Services";
    }

    /**
     * Test notification (for settings page)
     *
     * @return bool True if test successful
     */
    public static function send_test_notification(): bool {
        $notify_settings = get_option(Settings::OPTION_NOTIFY);

        if (empty($notify_settings['owner_email'])) {
            return false;
        }

        $message = "This is a test notification from CTC Smart-Hands.\n\n" .
                   "If you received this email, your SMTP settings are working correctly.\n\n" .
                   "Complete Tech Care";

        return wp_mail(
            $notify_settings['owner_email'],
            '[CTC] Test Notification',
            $message,
            ['From: CTC Smart-Hands <' . ($notify_settings['smtp_from'] ?? get_option('admin_email')) . '>']
        );
    }
}
