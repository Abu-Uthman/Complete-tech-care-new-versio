<?php
/**
 * Resend Email Integration
 *
 * Handles email sending via Resend API with HTML templates using WordPress native wp_remote_post()
 * No external dependencies or Composer required.
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

class Resend {

    /**
     * Resend API endpoint
     */
    private const API_ENDPOINT = 'https://api.resend.com/emails';

    /**
     * Send email via Resend API
     *
     * @param string|array $to Recipient email address(es)
     * @param string $subject Email subject
     * @param string $html HTML email content
     * @param array $options Additional options (tags, reply_to, etc.)
     * @return array|false Response with message_id or false on failure
     */
    public static function send_email(
        $to,
        string $subject,
        string $html,
        array $options = []
    ) {
        // Check if Resend is enabled
        if (!defined('RESEND_ENABLED') || !RESEND_ENABLED) {
            Helpers::log('Resend disabled, use wp_mail instead');
            return false;
        }

        // Get Resend API key
        $api_key = defined('RESEND_API_KEY') ? RESEND_API_KEY : '';
        $from_email = defined('RESEND_FROM_EMAIL') ? RESEND_FROM_EMAIL : 'onboarding@resend.dev';

        if (empty($api_key)) {
            Helpers::log('Resend API key not configured');
            return false;
        }

        // Validate email addresses
        $to_array = is_array($to) ? $to : [$to];
        foreach ($to_array as $email) {
            if (!is_email($email)) {
                Helpers::log('Invalid email address', ['email' => $email]);
                return false;
            }
        }

        // Prepare payload
        $payload = [
            'from' => isset($options['from']) ? $options['from'] : "CTC Smart-Hands <{$from_email}>",
            'to' => $to_array,
            'subject' => $subject,
            'html' => $html,
        ];

        // Add optional fields
        if (!empty($options['reply_to'])) {
            $payload['reply_to'] = $options['reply_to'];
        }

        if (!empty($options['tags'])) {
            $payload['tags'] = $options['tags'];
        }

        if (!empty($options['cc'])) {
            $payload['cc'] = is_array($options['cc']) ? $options['cc'] : [$options['cc']];
        }

        if (!empty($options['bcc'])) {
            $payload['bcc'] = is_array($options['bcc']) ? $options['bcc'] : [$options['bcc']];
        }

        // Log request (mask email for privacy)
        $masked_to = is_array($to) ? array_map([self::class, 'mask_email'], $to) : self::mask_email($to);
        Helpers::log('Resend API Request', [
            'to' => $masked_to,
            'subject' => $subject,
            'has_html' => !empty($html),
        ]);

        // Make API request using WordPress HTTP API
        $start_time = microtime(true);
        $response = wp_remote_post(self::API_ENDPOINT, [
            'headers' => [
                'Authorization' => 'Bearer ' . $api_key,
                'Content-Type' => 'application/json',
            ],
            'body' => wp_json_encode($payload),
            'timeout' => 30,
            'sslverify' => true, // Always verify SSL certificates for security
        ]);
        $duration_ms = round((microtime(true) - $start_time) * 1000);

        // Handle errors
        if (is_wp_error($response)) {
            Helpers::log('Resend API error', [
                'error' => $response->get_error_message(),
                'to' => $masked_to,
                'subject' => $subject,
            ]);
            return false;
        }

        $status_code = wp_remote_retrieve_response_code($response);
        $body = wp_remote_retrieve_body($response);
        $data = json_decode($body, true);

        // Check response
        if ($status_code === 200 && isset($data['id'])) {
            Helpers::log('Resend email sent successfully', [
                'message_id' => $data['id'],
                'to' => $masked_to,
                'subject' => $subject,
                'duration_ms' => $duration_ms,
            ]);

            return [
                'success' => true,
                'message_id' => $data['id'],
                'data' => $data,
            ];
        } else {
            // Log failure details
            Helpers::log('Resend API failed', [
                'status' => $status_code,
                'response' => $body,
                'to' => $masked_to,
                'subject' => $subject,
            ]);
            return false;
        }
    }

    /**
     * Render HTML email template
     *
     * @param string $template Template name (owner_notification, dispatcher_confirmation, eta_notification, custom_notification)
     * @param array $data Template variables
     * @return string Rendered HTML
     */
    public static function render_template(string $template, array $data): string {
        // Get template content
        $content = '';
        switch ($template) {
            case 'owner_notification':
                $content = self::get_owner_notification_content($data);
                break;
            case 'dispatcher_confirmation':
                $content = self::get_dispatcher_confirmation_content($data);
                break;
            case 'eta_notification':
                $content = self::get_eta_notification_content($data);
                break;
            case 'custom_notification':
                $content = self::get_custom_notification_content($data);
                break;
            default:
                Helpers::log('Unknown template', ['template' => $template]);
                return '';
        }

        // Wrap in base template
        return self::get_base_template($content);
    }

    /**
     * Mask email address for privacy in logs
     *
     * @param string $email Email address
     * @return string Masked email (e.g., john***@testmsp.com.au)
     */
    private static function mask_email(string $email): string {
        if (empty($email) || strpos($email, '@') === false) {
            return $email;
        }

        [$local, $domain] = explode('@', $email, 2);
        $local_length = strlen($local);

        if ($local_length <= 2) {
            $masked_local = $local[0] . '***';
        } else {
            $masked_local = substr($local, 0, 2) . '***' . substr($local, -1);
        }

        return $masked_local . '@' . $domain;
    }

    /**
     * Get base HTML template structure
     *
     * @param string $content Email content
     * @return string Full HTML email
     */
    private static function get_base_template(string $content): string {
        $current_year = date('Y');

        return <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CTC Smart-Hands</title>
</head>
<body style="margin: 0; padding: 0; font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #F8FAFC;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F8FAFC; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #FFFFFF; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); max-width: 100%;">
                    <!-- Header -->
                    <tr>
                        <td style="background-color: #2563EB; padding: 24px; border-radius: 8px 8px 0 0;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td>
                                        <table cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td style="width: 40px; height: 40px; background-color: #06B6D4; border-radius: 8px; text-align: center; vertical-align: middle; padding-right: 12px;">
                                                    <span style="color: #FFFFFF; font-size: 24px; font-weight: bold;">⚡</span>
                                                </td>
                                                <td>
                                                    <h1 style="color: #FFFFFF; margin: 0; font-size: 20px; font-weight: 600;">CTC Smart-Hands</h1>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding: 32px 24px;">
                            {$content}
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 24px; background-color: #0F172A; border-radius: 0 0 8px 8px;">
                            <p style="margin: 0 0 8px 0; color: #94A3B8; font-size: 14px; text-align: center;">
                                Professional smart-hands services for regional Victoria
                            </p>
                            <p style="margin: 0; color: #94A3B8; font-size: 14px; text-align: center;">
                                <strong style="color: #FFFFFF;">Complete Tech Care</strong> | 4-hour response guarantee
                            </p>
                            <p style="margin: 16px 0 0 0; color: #64748B; font-size: 12px; text-align: center;">
                                © {$current_year} Complete Tech Care. All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
HTML;
    }

    /**
     * Get owner notification template content
     *
     * @param array $data Template data
     * @return string HTML content
     */
    private static function get_owner_notification_content(array $data): string {
        // Sanitize data
        $public_id = esc_html($data['public_id'] ?? '');
        $company = esc_html($data['company'] ?? '');
        $contact_name = esc_html($data['contact_name'] ?? '');
        $email = esc_html($data['email'] ?? '');
        $phone = esc_html($data['phone'] ?? '');
        $work_type = esc_html($data['work_type'] ?? '');
        $location = esc_html($data['location'] ?? '');
        $address = esc_html($data['address'] ?? '');
        $po_number = esc_html($data['po_number'] ?? 'N/A');
        $sla = esc_html($data['sla'] ?? '4H');
        $notes = esc_html($data['notes'] ?? '');
        $admin_url = esc_url($data['admin_url'] ?? '');

        return <<<HTML
<h2 style="color: #0F172A; margin: 0 0 16px 0; font-size: 24px; font-weight: 600;">
    New Booking Alert
</h2>

<div style="background-color: #EFF6FF; border-left: 4px solid #2563EB; padding: 16px; margin-bottom: 24px; border-radius: 4px;">
    <p style="margin: 0; color: #1E40AF; font-size: 16px; font-weight: 600;">
        Booking ID: {$public_id}
    </p>
</div>

<table width="100%" cellpadding="8" cellspacing="0" style="margin-bottom: 24px;">
    <tr>
        <td style="color: #64748B; font-size: 14px; font-weight: 600; width: 140px;">Company:</td>
        <td style="color: #0F172A; font-size: 14px;">{$company}</td>
    </tr>
    <tr>
        <td style="color: #64748B; font-size: 14px; font-weight: 600;">Contact:</td>
        <td style="color: #0F172A; font-size: 14px;">{$contact_name}</td>
    </tr>
    <tr>
        <td style="color: #64748B; font-size: 14px; font-weight: 600;">Email:</td>
        <td style="color: #0F172A; font-size: 14px;"><a href="mailto:{$email}" style="color: #2563EB; text-decoration: none;">{$email}</a></td>
    </tr>
    <tr>
        <td style="color: #64748B; font-size: 14px; font-weight: 600;">Phone:</td>
        <td style="color: #0F172A; font-size: 14px;"><a href="tel:{$phone}" style="color: #2563EB; text-decoration: none;">{$phone}</a></td>
    </tr>
    <tr>
        <td style="color: #64748B; font-size: 14px; font-weight: 600;">Work Type:</td>
        <td style="color: #0F172A; font-size: 14px;">{$work_type}</td>
    </tr>
    <tr>
        <td style="color: #64748B; font-size: 14px; font-weight: 600;">Location:</td>
        <td style="color: #0F172A; font-size: 14px;">{$location}</td>
    </tr>
    <tr>
        <td style="color: #64748B; font-size: 14px; font-weight: 600;">Address:</td>
        <td style="color: #0F172A; font-size: 14px;">{$address}</td>
    </tr>
    <tr>
        <td style="color: #64748B; font-size: 14px; font-weight: 600;">PO Number:</td>
        <td style="color: #0F172A; font-size: 14px;">{$po_number}</td>
    </tr>
    <tr>
        <td style="color: #64748B; font-size: 14px; font-weight: 600;">SLA:</td>
        <td style="color: #0F172A; font-size: 14px;">{$sla}</td>
    </tr>
</table>

<div style="background-color: #F8FAFC; padding: 16px; border-radius: 4px; margin-bottom: 24px;">
    <p style="margin: 0 0 4px 0; color: #64748B; font-size: 12px; font-weight: 600; text-transform: uppercase;">Issue Description</p>
    <p style="margin: 0; color: #0F172A; font-size: 14px; line-height: 1.6;">{$notes}</p>
</div>

<table width="100%" cellpadding="0" cellspacing="0">
    <tr>
        <td align="center">
            <a href="{$admin_url}" style="display: inline-block; background-color: #2563EB; color: #FFFFFF; text-decoration: none; padding: 12px 32px; border-radius: 6px; font-size: 14px; font-weight: 600;">
                View in Admin Dashboard →
            </a>
        </td>
    </tr>
</table>
HTML;
    }

    /**
     * Get dispatcher confirmation template content
     *
     * @param array $data Template data
     * @return string HTML content
     */
    private static function get_dispatcher_confirmation_content(array $data): string {
        // Sanitize data
        $public_id = esc_html($data['public_id'] ?? '');
        $company = esc_html($data['company'] ?? '');
        $work_type = esc_html($data['work_type'] ?? '');
        $location = esc_html($data['location'] ?? '');
        $address = esc_html($data['address'] ?? '');

        return <<<HTML
<h2 style="color: #0F172A; margin: 0 0 16px 0; font-size: 24px; font-weight: 600;">
    Service Request Received
</h2>

<p style="color: #0F172A; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
    Thank you for contacting Complete Tech Care. We've received your service request and will respond within 4 hours to discuss your requirements and next steps.
</p>

<div style="background-color: #ECFDF5; border-left: 4px solid #10B981; padding: 16px; margin-bottom: 24px; border-radius: 4px;">
    <p style="margin: 0 0 8px 0; color: #065F46; font-size: 14px; font-weight: 600;">
        Your Booking Reference
    </p>
    <p style="margin: 0; color: #047857; font-size: 20px; font-weight: 700;">
        {$public_id}
    </p>
</div>

<h3 style="color: #0F172A; margin: 24px 0 12px 0; font-size: 16px; font-weight: 600;">
    Booking Details
</h3>

<table width="100%" cellpadding="8" cellspacing="0" style="margin-bottom: 24px;">
    <tr>
        <td style="color: #64748B; font-size: 14px; font-weight: 600; width: 140px;">Company:</td>
        <td style="color: #0F172A; font-size: 14px;">{$company}</td>
    </tr>
    <tr>
        <td style="color: #64748B; font-size: 14px; font-weight: 600;">Service Type:</td>
        <td style="color: #0F172A; font-size: 14px;">{$work_type}</td>
    </tr>
    <tr>
        <td style="color: #64748B; font-size: 14px; font-weight: 600;">Location:</td>
        <td style="color: #0F172A; font-size: 14px;">{$location}</td>
    </tr>
    <tr>
        <td style="color: #64748B; font-size: 14px; font-weight: 600;">Site Address:</td>
        <td style="color: #0F172A; font-size: 14px;">{$address}</td>
    </tr>
</table>

<div style="background-color: #FEF3C7; border-left: 4px solid #F59E0B; padding: 16px; border-radius: 4px; margin-bottom: 24px;">
    <p style="margin: 0; color: #92400E; font-size: 14px; line-height: 1.6;">
        <strong>What happens next:</strong> Our team will review your request and contact you to discuss the next steps. For urgent matters, please call us directly at <a href="tel:1300CTCNOW" style="color: #92400E; font-weight: 600; text-decoration: none;">1300 CTC NOW</a>.
    </p>
</div>

<p style="color: #64748B; font-size: 14px; line-height: 1.6; margin: 0;">
    If you have any questions or need to make changes to your request, please reply to this email or call us at 1300 CTC NOW.
</p>
HTML;
    }

    /**
     * Get ETA notification template content
     *
     * @param array $data Template data
     * @return string HTML content
     */
    private static function get_eta_notification_content(array $data): string {
        // Sanitize data
        $public_id = esc_html($data['public_id'] ?? '');
        $company = esc_html($data['company'] ?? '');
        $eta = esc_html($data['eta'] ?? '');
        $address = esc_html($data['address'] ?? '');
        $contact_name = esc_html($data['contact_name'] ?? '');
        $phone = esc_html($data['phone'] ?? '');

        return <<<HTML
<h2 style="color: #0F172A; margin: 0 0 16px 0; font-size: 24px; font-weight: 600;">
    Technician ETA Update
</h2>

<div style="background-color: #EFF6FF; border-left: 4px solid #2563EB; padding: 16px; margin-bottom: 24px; border-radius: 4px;">
    <p style="margin: 0 0 4px 0; color: #1E40AF; font-size: 14px; font-weight: 600;">
        Booking: {$public_id}
    </p>
    <p style="margin: 0; color: #1E40AF; font-size: 14px;">
        {$company}
    </p>
</div>

<div style="background-color: #ECFDF5; padding: 20px; border-radius: 8px; margin-bottom: 24px; text-align: center;">
    <p style="margin: 0 0 8px 0; color: #065F46; font-size: 14px; font-weight: 600;">
        Expected Arrival Time
    </p>
    <p style="margin: 0; color: #047857; font-size: 24px; font-weight: 700;">
        {$eta}
    </p>
</div>

<h3 style="color: #0F172A; margin: 24px 0 12px 0; font-size: 16px; font-weight: 600;">
    Site Details
</h3>

<table width="100%" cellpadding="8" cellspacing="0">
    <tr>
        <td style="color: #64748B; font-size: 14px; font-weight: 600; width: 140px;">Address:</td>
        <td style="color: #0F172A; font-size: 14px;">{$address}</td>
    </tr>
    <tr>
        <td style="color: #64748B; font-size: 14px; font-weight: 600;">Contact:</td>
        <td style="color: #0F172A; font-size: 14px;">{$contact_name} - <a href="tel:{$phone}" style="color: #2563EB; text-decoration: none;">{$phone}</a></td>
    </tr>
</table>
HTML;
    }

    /**
     * Get custom notification template content
     *
     * @param array $data Template data
     * @return string HTML content
     */
    private static function get_custom_notification_content(array $data): string {
        // Sanitize data
        $public_id = esc_html($data['public_id'] ?? '');
        $custom_message = esc_html($data['message'] ?? '');

        return <<<HTML
<h2 style="color: #0F172A; margin: 0 0 16px 0; font-size: 24px; font-weight: 600;">
    Booking Update
</h2>

<div style="background-color: #EFF6FF; border-left: 4px solid #2563EB; padding: 16px; margin-bottom: 24px; border-radius: 4px;">
    <p style="margin: 0; color: #1E40AF; font-size: 16px; font-weight: 600;">
        Booking: {$public_id}
    </p>
</div>

<div style="background-color: #F8FAFC; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
    <p style="margin: 0; color: #0F172A; font-size: 16px; line-height: 1.6;">
        {$custom_message}
    </p>
</div>

<p style="color: #64748B; font-size: 14px; line-height: 1.6; margin: 0;">
    If you have any questions, please reply to this email or call us at 1300 CTC NOW.
</p>
HTML;
    }
}
