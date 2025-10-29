<?php
/**
 * Invoice Management for CTC Smart-Hands
 *
 * Handles invoice generation, PDF creation, and invoice operations
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

class Invoice {

    /**
     * Table name for invoices
     */
    const TABLE_INVOICES = 'ctc_invoices';

    /**
     * Initialize invoice system
     */
    public static function init(): void {
        // Hook into booking status changes to auto-generate invoices
        add_action('ctc_booking_status_changed', [__CLASS__, 'auto_generate_invoice'], 10, 3);
    }

    /**
     * Create invoices database table
     * Called during plugin activation
     */
    public static function create_table(): void {
        global $wpdb;

        $charset_collate = $wpdb->get_charset_collate();
        $table_prefix = $wpdb->prefix;
        $table_name = $table_prefix . self::TABLE_INVOICES;

        $sql = "CREATE TABLE {$table_name} (
            id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
            invoice_number varchar(24) NOT NULL,
            booking_id bigint(20) UNSIGNED NOT NULL,
            issue_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
            due_date datetime NOT NULL,
            paid_date datetime NULL DEFAULT NULL,
            status enum('draft','sent','paid','overdue','cancelled') NOT NULL DEFAULT 'draft',
            subtotal decimal(10,2) NOT NULL DEFAULT 0.00,
            tax_rate decimal(5,2) NOT NULL DEFAULT 10.00,
            tax_amount decimal(10,2) NOT NULL DEFAULT 0.00,
            total_amount decimal(10,2) NOT NULL DEFAULT 0.00,
            line_items_json longtext NOT NULL,
            notes text NULL DEFAULT NULL,
            pdf_url varchar(255) NULL DEFAULT NULL,
            sent_at datetime NULL DEFAULT NULL,
            payment_method varchar(50) NULL DEFAULT NULL,
            payment_reference varchar(100) NULL DEFAULT NULL,
            created_by bigint(20) UNSIGNED NULL DEFAULT NULL,
            updated_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY  (id),
            UNIQUE KEY invoice_number (invoice_number),
            KEY booking_id (booking_id),
            KEY status (status),
            KEY issue_date (issue_date),
            KEY due_date (due_date)
        ) $charset_collate;";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }

    /**
     * Generate invoice number
     * Format: INV-YYYYMMDD-XXXX
     *
     * @return string Invoice number
     */
    public static function generate_invoice_number(): string {
        global $wpdb;
        $table_name = $wpdb->prefix . self::TABLE_INVOICES;

        $date_prefix = 'INV-' . date('Ymd');

        // Get the last invoice number for today
        $last_invoice = $wpdb->get_var($wpdb->prepare(
            "SELECT invoice_number FROM {$table_name}
             WHERE invoice_number LIKE %s
             ORDER BY id DESC LIMIT 1",
            $date_prefix . '%'
        ));

        if ($last_invoice) {
            // Extract sequence number and increment
            $sequence = (int) substr($last_invoice, -4);
            $sequence++;
        } else {
            $sequence = 1;
        }

        return $date_prefix . '-' . str_pad((string)$sequence, 4, '0', STR_PAD_LEFT);
    }

    /**
     * Create invoice for a booking
     *
     * @param int $booking_id Booking ID
     * @param array $line_items Array of line items
     * @param array $options Optional settings (due_days, notes, etc.)
     * @return int|false Invoice ID or false on failure
     */
    public static function create_invoice(int $booking_id, array $line_items, array $options = []) {
        global $wpdb;

        // Get booking details
        $booking = Database::get_booking($booking_id);
        if (!$booking) {
            return false;
        }

        // Calculate totals
        $subtotal = 0;
        foreach ($line_items as $item) {
            $subtotal += $item['amount'];
        }

        $tax_rate = $options['tax_rate'] ?? 10.00; // Default 10% GST for Australia
        $tax_amount = round($subtotal * ($tax_rate / 100), 2);
        $total_amount = $subtotal + $tax_amount;

        // Generate invoice number
        $invoice_number = self::generate_invoice_number();

        // Calculate due date (default 7 days)
        $due_days = $options['due_days'] ?? 7;
        $due_date = date('Y-m-d H:i:s', strtotime("+{$due_days} days"));

        // Prepare data
        $data = [
            'invoice_number' => $invoice_number,
            'booking_id' => $booking_id,
            'issue_date' => current_time('mysql'),
            'due_date' => $due_date,
            'status' => 'draft',
            'subtotal' => $subtotal,
            'tax_rate' => $tax_rate,
            'tax_amount' => $tax_amount,
            'total_amount' => $total_amount,
            'line_items_json' => json_encode($line_items),
            'notes' => $options['notes'] ?? null,
            'created_by' => get_current_user_id() ?: null,
        ];

        $table_name = $wpdb->prefix . self::TABLE_INVOICES;
        $inserted = $wpdb->insert($table_name, $data, [
            '%s', // invoice_number
            '%d', // booking_id
            '%s', // issue_date
            '%s', // due_date
            '%s', // status
            '%f', // subtotal
            '%f', // tax_rate
            '%f', // tax_amount
            '%f', // total_amount
            '%s', // line_items_json
            '%s', // notes
            '%d', // created_by
        ]);

        if ($inserted === false) {
            error_log('CTC Invoice Creation Error: ' . $wpdb->last_error);
            return false;
        }

        return (int) $wpdb->insert_id;
    }

    /**
     * Get invoice by ID
     *
     * @param int $invoice_id Invoice ID
     * @return object|null Invoice object or null
     */
    public static function get_invoice(int $invoice_id): ?object {
        global $wpdb;
        $table_name = $wpdb->prefix . self::TABLE_INVOICES;

        $invoice = $wpdb->get_row($wpdb->prepare(
            "SELECT * FROM {$table_name} WHERE id = %d",
            $invoice_id
        ));

        if ($invoice && $invoice->line_items_json) {
            $invoice->line_items = json_decode($invoice->line_items_json, true);
        }

        return $invoice ?: null;
    }

    /**
     * Get invoice by booking ID
     *
     * @param int $booking_id Booking ID
     * @return object|null Invoice object or null
     */
    public static function get_invoice_by_booking(int $booking_id): ?object {
        global $wpdb;
        $table_name = $wpdb->prefix . self::TABLE_INVOICES;

        $invoice = $wpdb->get_row($wpdb->prepare(
            "SELECT * FROM {$table_name} WHERE booking_id = %d ORDER BY id DESC LIMIT 1",
            $booking_id
        ));

        if ($invoice && $invoice->line_items_json) {
            $invoice->line_items = json_decode($invoice->line_items_json, true);
        }

        return $invoice ?: null;
    }

    /**
     * Get all invoices with optional filters
     *
     * @param array $args Query arguments
     * @return array Array of invoice objects
     */
    public static function get_invoices(array $args = []): array {
        global $wpdb;
        $table_name = $wpdb->prefix . self::TABLE_INVOICES;

        $where = [];
        $params = [];

        // Filter by status
        if (!empty($args['status'])) {
            $where[] = 'status = %s';
            $params[] = $args['status'];
        }

        // Filter by booking ID
        if (!empty($args['booking_id'])) {
            $where[] = 'booking_id = %d';
            $params[] = $args['booking_id'];
        }

        // Filter by date range
        if (!empty($args['from_date'])) {
            $where[] = 'issue_date >= %s';
            $params[] = $args['from_date'];
        }

        if (!empty($args['to_date'])) {
            $where[] = 'issue_date <= %s';
            $params[] = $args['to_date'];
        }

        // Build WHERE clause
        $where_sql = !empty($where) ? ' WHERE ' . implode(' AND ', $where) : '';

        // Pagination
        $per_page = isset($args['per_page']) ? (int) $args['per_page'] : 50;
        $page = isset($args['page']) ? (int) $args['page'] : 1;
        $offset = ($page - 1) * $per_page;

        $limit_sql = $wpdb->prepare(' LIMIT %d OFFSET %d', $per_page, $offset);

        // Build query
        $sql = "SELECT * FROM {$table_name}{$where_sql} ORDER BY issue_date DESC{$limit_sql}";

        if (!empty($params)) {
            $sql = $wpdb->prepare($sql, $params);
        }

        $invoices = $wpdb->get_results($sql);

        // Decode line items
        foreach ($invoices as $invoice) {
            if ($invoice->line_items_json) {
                $invoice->line_items = json_decode($invoice->line_items_json, true);
            }
        }

        return $invoices;
    }

    /**
     * Update invoice status
     *
     * @param int $invoice_id Invoice ID
     * @param string $status New status
     * @param array $additional_data Additional data to update
     * @return bool Success
     */
    public static function update_status(int $invoice_id, string $status, array $additional_data = []): bool {
        global $wpdb;
        $table_name = $wpdb->prefix . self::TABLE_INVOICES;

        $data = ['status' => $status];
        $format = ['%s'];

        // If marking as paid, record paid date
        if ($status === 'paid' && empty($additional_data['paid_date'])) {
            $data['paid_date'] = current_time('mysql');
            $format[] = '%s';
        }

        // Merge additional data
        $data = array_merge($data, $additional_data);

        $updated = $wpdb->update(
            $table_name,
            $data,
            ['id' => $invoice_id],
            $format,
            ['%d']
        );

        return $updated !== false;
    }

    /**
     * Mark invoice as sent
     *
     * @param int $invoice_id Invoice ID
     * @return bool Success
     */
    public static function mark_as_sent(int $invoice_id): bool {
        global $wpdb;
        $table_name = $wpdb->prefix . self::TABLE_INVOICES;

        $updated = $wpdb->update(
            $table_name,
            [
                'status' => 'sent',
                'sent_at' => current_time('mysql')
            ],
            ['id' => $invoice_id],
            ['%s', '%s'],
            ['%d']
        );

        return $updated !== false;
    }

    /**
     * Auto-generate invoice when booking status changes to completed
     *
     * @param int $booking_id Booking ID
     * @param string $old_status Old status
     * @param string $new_status New status
     */
    public static function auto_generate_invoice(int $booking_id, string $old_status, string $new_status): void {
        // Only generate invoice when status changes to completed
        if ($new_status !== 'completed') {
            return;
        }

        // Check if invoice already exists for this booking
        $existing_invoice = self::get_invoice_by_booking($booking_id);
        if ($existing_invoice) {
            return; // Invoice already exists
        }

        // Get booking details
        $booking = Database::get_booking($booking_id);
        if (!$booking) {
            return;
        }

        // Build line items based on booking
        $line_items = self::build_line_items_from_booking($booking);

        // Create invoice
        $invoice_id = self::create_invoice($booking_id, $line_items);

        if ($invoice_id) {
            error_log("CTC: Auto-generated invoice #{$invoice_id} for booking #{$booking_id}");
        }
    }

    /**
     * Build line items from booking data
     *
     * @param object $booking Booking object
     * @return array Line items array
     */
    private static function build_line_items_from_booking(object $booking): array {
        $line_items = [];

        // Get service rate from settings or use default
        $service_rates = [
            'break_fix' => 150.00,
            'rollout' => 200.00,
            'pos_support' => 175.00,
            'site_audit' => 180.00,
            'parts_logistics' => 120.00,
        ];

        // Get travel rates by region
        $travel_rates = [
            'bendigo' => 80.00,
            'ballarat' => 100.00,
            'shepparton' => 120.00,
            'wodonga' => 150.00,
            'latrobe' => 140.00,
            'melbourne' => 0.00, // No travel for Melbourne
        ];

        // Add service line item
        $work_type = strtolower(str_replace(' ', '_', $booking->work_type ?? 'break_fix'));
        $service_rate = $service_rates[$work_type] ?? 150.00;

        $line_items[] = [
            'description' => Helpers::format_work_type($booking->work_type),
            'quantity' => 1,
            'rate' => $service_rate,
            'amount' => $service_rate,
        ];

        // Add travel line item if applicable
        $site_id = strtolower($booking->site_id ?? '');
        if (isset($travel_rates[$site_id]) && $travel_rates[$site_id] > 0) {
            $travel_rate = $travel_rates[$site_id];
            $line_items[] = [
                'description' => 'Travel - ' . ucfirst($site_id),
                'quantity' => 1,
                'rate' => $travel_rate,
                'amount' => $travel_rate,
            ];
        }

        return $line_items;
    }

    /**
     * Delete invoice
     *
     * @param int $invoice_id Invoice ID
     * @return bool Success
     */
    public static function delete_invoice(int $invoice_id): bool {
        global $wpdb;
        $table_name = $wpdb->prefix . self::TABLE_INVOICES;

        // Get invoice to delete PDF if exists
        $invoice = self::get_invoice($invoice_id);
        if ($invoice && $invoice->pdf_url) {
            // Delete PDF file from WordPress media library
            $attachment_id = attachment_url_to_postid($invoice->pdf_url);
            if ($attachment_id) {
                wp_delete_attachment($attachment_id, true);
            }
        }

        $deleted = $wpdb->delete($table_name, ['id' => $invoice_id], ['%d']);

        return $deleted !== false;
    }
}
