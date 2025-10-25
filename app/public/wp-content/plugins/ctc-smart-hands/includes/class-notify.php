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
        // Use Business Email constant if available, otherwise fallback to settings
        $owner_email = defined('BUSINESS_EMAIL') ? BUSINESS_EMAIL : '';

        if (empty($owner_email)) {
            $notify_settings = get_option(Settings::OPTION_NOTIFY);
            $owner_email = $notify_settings['owner_email'] ?? '';
        }

        if (empty($owner_email)) {
            Helpers::log('Owner email not configured', ['booking_id' => $booking->id]);
            return false;
        }

        // Prepare template data
        $template_data = [
            'public_id' => $booking->public_id,
            'company' => $booking->company,
            'contact_name' => $booking->contact_name,
            'email' => $booking->email,
            'phone' => $booking->phone,
            'work_type' => Helpers::format_work_type($booking->work_type ?? ''),
            'location' => ucfirst($booking->site_id ?? ''),
            'address' => $booking->address,
            'po_number' => $booking->po_number ?? 'N/A',
            'sla' => $booking->sla ?? '4H',
            'notes' => $booking->notes ?? 'No additional notes',
            'admin_url' => admin_url('admin.php?page=ctc-smart-hands&booking=' . $booking->id),
        ];

        // Render HTML template
        $html = Resend::render_template('owner_notification', $template_data);

        // Subject line
        $subject = sprintf('[CTC] New Booking: %s - %s', $booking->public_id, $booking->company);

        // Send via Resend
        $result = Resend::send_email(
            $owner_email,
            $subject,
            $html,
            [
                'tags' => [
                    ['name' => 'type', 'value' => 'owner-notification'],
                    ['name' => 'booking_id', 'value' => $booking->public_id],
                ],
            ]
        );

        if ($result && isset($result['message_id'])) {
            // Log successful send with Resend message ID
            Database::add_booking_note(
                (int)$booking->id,
                sprintf('Owner email sent via Resend (ID: %s) to: %s', $result['message_id'], $owner_email),
                'email',
                null
            );

            Helpers::log('Owner email sent via Resend', [
                'booking_id' => $booking->id,
                'public_id' => $booking->public_id,
                'to' => $owner_email,
                'message_id' => $result['message_id'],
            ]);

            return true;
        } else {
            // Fallback to wp_mail if Resend fails
            Helpers::log('Resend failed, attempting wp_mail fallback', [
                'booking_id' => $booking->id,
            ]);

            $text_message = strip_tags(str_replace('<br>', "\n", $html));
            $headers = [
                'Content-Type: text/plain; charset=UTF-8',
                'From: CTC Smart-Hands <' . get_option('admin_email') . '>',
            ];

            $sent = wp_mail($owner_email, $subject, $text_message, $headers);

            if ($sent) {
                Database::add_booking_note(
                    (int)$booking->id,
                    sprintf('Owner email sent via wp_mail fallback to: %s', $owner_email),
                    'email',
                    null
                );
            }

            return $sent;
        }
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
        if (empty($booking->email)) {
            Helpers::log('Dispatcher email missing', ['booking_id' => $booking->id]);
            return false;
        }

        // Prepare template data
        $template_data = [
            'public_id' => $booking->public_id,
            'company' => $booking->company,
            'work_type' => Helpers::format_work_type($booking->work_type ?? ''),
            'location' => ucfirst($booking->site_id ?? ''),
            'address' => $booking->address,
        ];

        // Render HTML template
        $html = Resend::render_template('dispatcher_confirmation', $template_data);

        // Subject line
        $subject = sprintf('Booking Confirmation - %s', $booking->public_id);

        // Send via Resend
        $result = Resend::send_email(
            $booking->email,
            $subject,
            $html,
            [
                'tags' => [
                    ['name' => 'type', 'value' => 'dispatcher-confirmation'],
                    ['name' => 'booking_id', 'value' => $booking->public_id],
                ],
            ]
        );

        if ($result && isset($result['message_id'])) {
            // Log successful send with Resend message ID
            Database::add_booking_note(
                (int)$booking->id,
                sprintf('Dispatcher confirmation sent via Resend (ID: %s) to: %s', $result['message_id'], $booking->email),
                'email',
                null
            );

            Helpers::log('Dispatcher email sent via Resend', [
                'booking_id' => $booking->id,
                'public_id' => $booking->public_id,
                'to' => $booking->email,
                'message_id' => $result['message_id'],
            ]);

            return true;
        } else {
            // Fallback to wp_mail if Resend fails
            Helpers::log('Resend failed for dispatcher email, attempting wp_mail fallback', [
                'booking_id' => $booking->id,
            ]);

            $text_message = strip_tags(str_replace('<br>', "\n", $html));
            $headers = [
                'Content-Type: text/plain; charset=UTF-8',
                'From: CTC Smart-Hands <' . get_option('admin_email') . '>',
            ];

            $sent = wp_mail($booking->email, $subject, $text_message, $headers);

            if ($sent) {
                Database::add_booking_note(
                    (int)$booking->id,
                    sprintf('Dispatcher confirmation sent via wp_mail fallback to: %s', $booking->email),
                    'email',
                    null
                );
            } else {
                Helpers::log('Dispatcher email failed completely', [
                    'booking_id' => $booking->id,
                    'to' => $booking->email,
                ]);
            }

            return $sent;
        }
    }

    /**
     * Send ETA notification
     *
     * @param object $booking Booking object
     * @param string $eta Estimated time of arrival
     * @return bool True if sent successfully
     */
    public static function send_eta(object $booking, string $eta): bool {
        if (empty($booking->email)) {
            Helpers::log('Customer email missing for ETA notification', ['booking_id' => $booking->id]);
            return false;
        }

        // Prepare template data
        $template_data = [
            'public_id' => $booking->public_id,
            'company' => $booking->company,
            'eta' => $eta,
            'address' => $booking->address,
            'contact_name' => $booking->onsite_contact ?? $booking->contact_name,
            'phone' => $booking->phone,
        ];

        // Render HTML template
        $html = Resend::render_template('eta_notification', $template_data);

        // Subject line
        $subject = sprintf('ETA Update - %s', $booking->public_id);

        // Send via Resend
        $result = Resend::send_email(
            $booking->email,
            $subject,
            $html,
            [
                'tags' => [
                    ['name' => 'type', 'value' => 'eta-notification'],
                    ['name' => 'booking_id', 'value' => $booking->public_id],
                ],
            ]
        );

        if ($result && isset($result['message_id'])) {
            // Log successful send with Resend message ID
            Database::add_booking_note(
                (int)$booking->id,
                sprintf('ETA notification sent via Resend (ID: %s): %s', $result['message_id'], $eta),
                'email',
                null
            );

            Helpers::log('ETA email sent via Resend', [
                'booking_id' => $booking->id,
                'public_id' => $booking->public_id,
                'to' => $booking->email,
                'eta' => $eta,
                'message_id' => $result['message_id'],
            ]);

            return true;
        } else {
            // Fallback to wp_mail if Resend fails
            Helpers::log('Resend failed for ETA email, attempting wp_mail fallback', [
                'booking_id' => $booking->id,
            ]);

            $text_message = strip_tags(str_replace('<br>', "\n", $html));
            $headers = [
                'Content-Type: text/plain; charset=UTF-8',
                'From: CTC Smart-Hands <' . get_option('admin_email') . '>',
            ];

            $sent = wp_mail($booking->email, $subject, $text_message, $headers);

            if ($sent) {
                Database::add_booking_note(
                    (int)$booking->id,
                    sprintf('ETA notification sent via wp_mail fallback: %s', $eta),
                    'email',
                    null
                );
            }

            return $sent;
        }
    }

    /**
     * Send custom notification
     *
     * @param object $booking Booking object
     * @param string $custom_message Custom message
     * @return bool True if sent successfully
     */
    public static function send_custom(object $booking, string $custom_message): bool {
        if (empty($booking->email)) {
            Helpers::log('Customer email missing for custom notification', ['booking_id' => $booking->id]);
            return false;
        }

        // Prepare template data
        $template_data = [
            'public_id' => $booking->public_id,
            'company' => $booking->company,
            'message' => $custom_message,
            'contact_name' => $booking->contact_name,
        ];

        // Render HTML template
        $html = Resend::render_template('custom_notification', $template_data);

        // Subject line
        $subject = sprintf('Update - %s', $booking->public_id);

        // Send via Resend
        $result = Resend::send_email(
            $booking->email,
            $subject,
            $html,
            [
                'tags' => [
                    ['name' => 'type', 'value' => 'custom-notification'],
                    ['name' => 'booking_id', 'value' => $booking->public_id],
                ],
            ]
        );

        if ($result && isset($result['message_id'])) {
            // Log successful send with Resend message ID
            Database::add_booking_note(
                (int)$booking->id,
                sprintf('Custom notification sent via Resend (ID: %s): %s', $result['message_id'], substr($custom_message, 0, 50)),
                'email',
                null
            );

            Helpers::log('Custom notification sent via Resend', [
                'booking_id' => $booking->id,
                'public_id' => $booking->public_id,
                'to' => $booking->email,
                'message_preview' => substr($custom_message, 0, 50),
                'message_id' => $result['message_id'],
            ]);

            return true;
        } else {
            // Fallback to wp_mail if Resend fails
            Helpers::log('Resend failed for custom notification, attempting wp_mail fallback', [
                'booking_id' => $booking->id,
            ]);

            $text_message = strip_tags(str_replace('<br>', "\n", $html));
            $headers = [
                'Content-Type: text/plain; charset=UTF-8',
                'From: CTC Smart-Hands <' . get_option('admin_email') . '>',
            ];

            $sent = wp_mail($booking->email, $subject, $text_message, $headers);

            if ($sent) {
                Database::add_booking_note(
                    (int)$booking->id,
                    sprintf('Custom notification sent via wp_mail fallback: %s', substr($custom_message, 0, 50)),
                    'email',
                    null
                );
            } else {
                Helpers::log('Custom notification failed completely', [
                    'booking_id' => $booking->id,
                    'to' => $booking->email,
                ]);
            }

            return $sent;
        }
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
