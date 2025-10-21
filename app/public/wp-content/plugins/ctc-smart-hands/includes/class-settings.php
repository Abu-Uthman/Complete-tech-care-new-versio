<?php
/**
 * Settings management for CTC Smart-Hands
 *
 * Handles WordPress Settings API, admin pages, and option storage
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

class Settings {

    /**
     * Option keys
     */
    const OPTION_RATES = 'ctc_rates';
    const OPTION_DOWNLOADS = 'ctc_downloads';
    const OPTION_NOTIFY = 'ctc_notify';
    const OPTION_GENERAL = 'ctc_general';

    /**
     * Initialize default settings on plugin activation
     */
    public static function init_defaults(): void {
        // Rates defaults (from PRD)
        if (!get_option(self::OPTION_RATES)) {
            $default_rates = [
                'bhHourly' => 120,
                'ahHourly' => 170,
                'minHours' => 1.0,
                'incrementMins' => 30,
                'travelModel' => 'PER_KM', // or 'TRAVEL_TIME'
                'perKmRate' => 1.20,
                'travelHourly' => 80,
                'freeKm' => 30,
                'bendigoCap' => 360,
                'gstEnabled' => true,
            ];
            update_option(self::OPTION_RATES, $default_rates);
        }

        // Downloads defaults
        if (!get_option(self::OPTION_DOWNLOADS)) {
            $default_downloads = [
                'capabilityPdfUrl' => '',
                'insurancePdfUrl' => '',
                'swmsPdfUrl' => '',
            ];
            update_option(self::OPTION_DOWNLOADS, $default_downloads);
        }

        // Notifications defaults
        if (!get_option(self::OPTION_NOTIFY)) {
            $default_notify = [
                'owner_email' => get_option('admin_email'),
                'owner_phone' => '',
                'smtp_from' => get_option('admin_email'),
                'twilio_sid' => '',
                'twilio_token' => '',
                'twilio_from' => '',
                'owner_email_template' => self::get_default_owner_email_template(),
                'dispatcher_email_template' => self::get_default_dispatcher_email_template(),
            ];
            update_option(self::OPTION_NOTIFY, $default_notify);
        }

        // General/API defaults
        if (!get_option(self::OPTION_GENERAL)) {
            $default_general = [
                'timezone' => 'Australia/Melbourne',
                'api_key' => self::generate_api_key(),
                'api_secret' => self::generate_api_secret(),
            ];
            update_option(self::OPTION_GENERAL, $default_general);
        }
    }

    /**
     * Add admin menu pages
     */
    public static function add_menu_pages(): void {
        // Main menu
        add_menu_page(
            __('CTC Smart-Hands', 'ctc-smart-hands'),
            __('Smart-Hands', 'ctc-smart-hands'),
            'manage_options',
            'ctc-smart-hands',
            [self::class, 'render_bookings_page'],
            'dashicons-location-alt',
            30
        );

        // Bookings (default page)
        add_submenu_page(
            'ctc-smart-hands',
            __('Bookings', 'ctc-smart-hands'),
            __('Bookings', 'ctc-smart-hands'),
            'manage_options',
            'ctc-smart-hands',
            [self::class, 'render_bookings_page']
        );

        // Settings - Rates
        add_submenu_page(
            'ctc-smart-hands',
            __('Rates Settings', 'ctc-smart-hands'),
            __('Rates', 'ctc-smart-hands'),
            'manage_options',
            'ctc-settings-rates',
            [self::class, 'render_rates_page']
        );

        // Settings - Notifications
        add_submenu_page(
            'ctc-smart-hands',
            __('Notification Settings', 'ctc-smart-hands'),
            __('Notifications', 'ctc-smart-hands'),
            'manage_options',
            'ctc-settings-notify',
            [self::class, 'render_notify_page']
        );

        // Settings - API
        add_submenu_page(
            'ctc-smart-hands',
            __('API Settings', 'ctc-smart-hands'),
            __('API', 'ctc-smart-hands'),
            'manage_options',
            'ctc-settings-api',
            [self::class, 'render_api_page']
        );

        // Settings - Downloads
        add_submenu_page(
            'ctc-smart-hands',
            __('Downloads Settings', 'ctc-smart-hands'),
            __('Downloads', 'ctc-smart-hands'),
            'manage_options',
            'ctc-settings-downloads',
            [self::class, 'render_downloads_page']
        );

        // Booking Detail (hidden from menu)
        add_submenu_page(
            null, // Hidden from menu
            __('Booking Detail', 'ctc-smart-hands'),
            __('Booking Detail', 'ctc-smart-hands'),
            'manage_options',
            'ctc-booking-detail',
            [self::class, 'render_booking_detail_page']
        );

        // Export
        add_submenu_page(
            'ctc-smart-hands',
            __('Export Bookings', 'ctc-smart-hands'),
            __('Export', 'ctc-smart-hands'),
            'manage_options',
            'ctc-export',
            [self::class, 'render_export_page']
        );
    }

    /**
     * Render bookings list page
     */
    public static function render_bookings_page(): void {
        // Load the bookings list table
        require_once CTC_PLUGIN_DIR . 'admin/class-bookings-list.php';

        $bookings_list = new \CTC\SmartHands\Admin\Bookings_List();
        $bookings_list->prepare_items();

        // Show success message if bookings were deleted
        if (isset($_GET['deleted'])) {
            echo '<div class="notice notice-success is-dismissible"><p>';
            printf(
                _n('%d booking deleted.', '%d bookings deleted.', $_GET['deleted'], 'ctc-smart-hands'),
                $_GET['deleted']
            );
            echo '</p></div>';
        }

        ?>
        <div class="wrap ctc-smart-hands">
            <h1 class="wp-heading-inline"><?php _e('Bookings', 'ctc-smart-hands'); ?></h1>
            <hr class="wp-header-end">

            <form method="get">
                <input type="hidden" name="page" value="<?php echo $_REQUEST['page']; ?>">
                <?php
                $bookings_list->search_box(__('Search Bookings', 'ctc-smart-hands'), 'booking');
                $bookings_list->display();
                ?>
            </form>
        </div>
        <?php
    }

    /**
     * Render rates settings page
     */
    public static function render_rates_page(): void {
        // Handle form submission
        if (isset($_POST['ctc_rates_nonce']) && wp_verify_nonce($_POST['ctc_rates_nonce'], 'ctc_rates_save')) {
            $rates = [
                'bhHourly' => (float) ($_POST['bhHourly'] ?? 120),
                'ahHourly' => (float) ($_POST['ahHourly'] ?? 170),
                'minHours' => (float) ($_POST['minHourly'] ?? 1.0),
                'incrementMins' => (int) ($_POST['incrementMins'] ?? 30),
                'travelModel' => sanitize_text_field($_POST['travelModel'] ?? 'PER_KM'),
                'perKmRate' => (float) ($_POST['perKmRate'] ?? 1.20),
                'travelHourly' => (float) ($_POST['travelHourly'] ?? 80),
                'freeKm' => (int) ($_POST['freeKm'] ?? 30),
                'bendigoCap' => (float) ($_POST['bendigoCap'] ?? 360),
                'gstEnabled' => isset($_POST['gstEnabled']),
            ];
            update_option(self::OPTION_RATES, $rates);
            echo '<div class="notice notice-success"><p>' . esc_html__('Rates saved successfully!', 'ctc-smart-hands') . '</p></div>';
        }

        $rates = get_option(self::OPTION_RATES);

        require_once CTC_PLUGIN_DIR . 'admin/views/settings-rates.php';
    }

    /**
     * Render notifications settings page
     */
    public static function render_notify_page(): void {
        // Handle form submission
        if (isset($_POST['ctc_notify_nonce']) && wp_verify_nonce($_POST['ctc_notify_nonce'], 'ctc_notify_save')) {
            $notify = [
                'owner_email' => sanitize_email($_POST['owner_email'] ?? ''),
                'owner_phone' => sanitize_text_field($_POST['owner_phone'] ?? ''),
                'smtp_from' => sanitize_email($_POST['smtp_from'] ?? ''),
                'twilio_sid' => sanitize_text_field($_POST['twilio_sid'] ?? ''),
                'twilio_token' => sanitize_text_field($_POST['twilio_token'] ?? ''),
                'twilio_from' => sanitize_text_field($_POST['twilio_from'] ?? ''),
                'owner_email_template' => wp_kses_post($_POST['owner_email_template'] ?? ''),
                'dispatcher_email_template' => wp_kses_post($_POST['dispatcher_email_template'] ?? ''),
            ];
            update_option(self::OPTION_NOTIFY, $notify);
            echo '<div class="notice notice-success"><p>' . esc_html__('Notification settings saved!', 'ctc-smart-hands') . '</p></div>';
        }

        // Handle test notification
        if (isset($_POST['ctc_test_notification']) && wp_verify_nonce($_POST['ctc_test_nonce'], 'ctc_test_notification')) {
            $sent = \CTC\SmartHands\Notify::send_test_notification();
            if ($sent) {
                echo '<div class="notice notice-success"><p>' . esc_html__('Test email sent! Check your inbox.', 'ctc-smart-hands') . '</p></div>';
            } else {
                echo '<div class="notice notice-error"><p>' . esc_html__('Failed to send test email. Check your SMTP settings.', 'ctc-smart-hands') . '</p></div>';
            }
        }

        $notify = get_option(self::OPTION_NOTIFY);

        require_once CTC_PLUGIN_DIR . 'admin/views/settings-notify.php';
    }

    /**
     * Render API settings page
     */
    public static function render_api_page(): void {
        // Handle API key regeneration
        if (isset($_POST['ctc_api_regenerate']) && wp_verify_nonce($_POST['ctc_api_nonce'], 'ctc_api_regenerate')) {
            $general = get_option(self::OPTION_GENERAL);
            $general['api_key'] = self::generate_api_key();
            $general['api_secret'] = self::generate_api_secret();
            update_option(self::OPTION_GENERAL, $general);
            echo '<div class="notice notice-success"><p>' . esc_html__('API credentials regenerated!', 'ctc-smart-hands') . '</p></div>';
        }

        $general = get_option(self::OPTION_GENERAL);

        require_once CTC_PLUGIN_DIR . 'admin/views/settings-api.php';
    }

    /**
     * Render downloads settings page
     */
    public static function render_downloads_page(): void {
        // Handle form submission
        if (isset($_POST['ctc_downloads_nonce']) && wp_verify_nonce($_POST['ctc_downloads_nonce'], 'ctc_downloads_save')) {
            $downloads = [
                'capabilityPdfUrl' => esc_url_raw($_POST['capabilityPdfUrl'] ?? ''),
                'insurancePdfUrl' => esc_url_raw($_POST['insurancePdfUrl'] ?? ''),
                'swmsPdfUrl' => esc_url_raw($_POST['swmsPdfUrl'] ?? ''),
            ];
            update_option(self::OPTION_DOWNLOADS, $downloads);
            echo '<div class="notice notice-success"><p>' . esc_html__('Download URLs saved!', 'ctc-smart-hands') . '</p></div>';
        }

        $downloads = get_option(self::OPTION_DOWNLOADS);

        require_once CTC_PLUGIN_DIR . 'admin/views/settings-downloads.php';
    }

    /**
     * Render booking detail page
     */
    public static function render_booking_detail_page(): void {
        require_once CTC_PLUGIN_DIR . 'admin/views/booking-detail.php';
    }

    /**
     * Render export page
     */
    public static function render_export_page(): void {
        require_once CTC_PLUGIN_DIR . 'admin/views/export.php';
    }

    /**
     * Generate random API key
     * @return string API key
     */
    private static function generate_api_key(): string {
        return 'ctc_' . bin2hex(random_bytes(16));
    }

    /**
     * Generate random API secret
     * @return string API secret
     */
    private static function generate_api_secret(): string {
        return bin2hex(random_bytes(32));
    }

    /**
     * Get default owner email template
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
               "View in admin: " . admin_url('admin.php?page=ctc-smart-hands');
    }

    /**
     * Get default dispatcher email template
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
}
