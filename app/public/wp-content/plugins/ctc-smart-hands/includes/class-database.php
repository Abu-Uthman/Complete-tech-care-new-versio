<?php
/**
 * Database operations for CTC Smart-Hands
 *
 * Handles database table creation, schema, and database operations
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

class Database {

    /**
     * Table names
     */
    const TABLE_BOOKINGS = 'ctc_bookings';
    const TABLE_BOOKING_NOTES = 'ctc_booking_notes';

    /**
     * Create database tables
     * Called on plugin activation
     */
    public static function create_tables(): void {
        global $wpdb;

        $charset_collate = $wpdb->get_charset_collate();
        $table_prefix = $wpdb->prefix;

        // SQL for bookings table
        $bookings_table = "CREATE TABLE {$table_prefix}" . self::TABLE_BOOKINGS . " (
            id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
            public_id varchar(24) NOT NULL,
            created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
            status enum('new','confirmed','onsite','completed','invoiced','closed') NOT NULL DEFAULT 'new',
            company varchar(160) NOT NULL,
            contact_name varchar(120) NOT NULL,
            email varchar(160) NOT NULL,
            phone varchar(60) NOT NULL,
            po_number varchar(80) NOT NULL,
            sla enum('4H','NBD','SCHEDULED') NOT NULL,
            scheduled_at datetime NULL DEFAULT NULL,
            work_type varchar(160) NOT NULL,
            site_id varchar(120) NOT NULL,
            address varchar(255) NOT NULL,
            access_window varchar(160) NOT NULL,
            onsite_contact varchar(160) NOT NULL,
            parts_tracking varchar(160) NULL DEFAULT NULL,
            notes text NULL DEFAULT NULL,
            assigned_tech varchar(255) NULL DEFAULT NULL,
            internal_notes text NULL DEFAULT NULL,
            preferred_date datetime NULL DEFAULT NULL,
            preferred_time varchar(50) NULL DEFAULT NULL,
            attachments text NULL DEFAULT NULL,
            links_json longtext NULL DEFAULT NULL,
            evidence_received tinyint(1) NOT NULL DEFAULT 0,
            signoff_name varchar(160) NULL DEFAULT NULL,
            signoff_time datetime NULL DEFAULT NULL,
            meta_json longtext NULL DEFAULT NULL,
            PRIMARY KEY  (id),
            UNIQUE KEY public_id (public_id),
            KEY status (status),
            KEY created_at (created_at),
            KEY company (company),
            KEY sla (sla),
            KEY assigned_tech (assigned_tech),
            KEY preferred_date (preferred_date)
        ) $charset_collate;";

        // SQL for booking notes table
        $notes_table = "CREATE TABLE {$table_prefix}" . self::TABLE_BOOKING_NOTES . " (
            id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
            booking_id bigint(20) UNSIGNED NOT NULL,
            created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
            author_id bigint(20) UNSIGNED NULL DEFAULT NULL,
            note text NOT NULL,
            type enum('internal','email','sms','status_change') NOT NULL DEFAULT 'internal',
            PRIMARY KEY  (id),
            KEY booking_id (booking_id),
            KEY created_at (created_at),
            KEY type (type),
            CONSTRAINT fk_booking_note FOREIGN KEY (booking_id)
                REFERENCES {$table_prefix}" . self::TABLE_BOOKINGS . " (id)
                ON DELETE CASCADE
        ) $charset_collate;";

        // Include WordPress upgrade functions
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');

        // Create tables using dbDelta
        dbDelta($bookings_table);
        dbDelta($notes_table);

        // Store database version
        update_option('ctc_db_version', CTC_VERSION);
    }

    /**
     * Get full table name with prefix
     * @param string $table Table name constant
     * @return string Full table name with WordPress prefix
     */
    public static function get_table_name(string $table): string {
        global $wpdb;
        return $wpdb->prefix . $table;
    }

    /**
     * Create a new booking
     * @param array $data Booking data
     * @return int|false Booking ID on success, false on failure
     */
    public static function create_booking(array $data): int|false {
        global $wpdb;

        $table = self::get_table_name(self::TABLE_BOOKINGS);

        // Generate public ID
        $public_id = self::generate_public_id();

        // Prepare data with defaults
        $booking_data = [
            'public_id' => $public_id,
            'created_at' => current_time('mysql'),
            'status' => 'new',
            'company' => $data['company'] ?? '',
            'contact_name' => $data['contact_name'] ?? '',
            'email' => $data['email'] ?? '',
            'phone' => $data['phone'] ?? '',
            'po_number' => $data['po_number'] ?? '',
            'sla' => $data['sla'] ?? '4H',
            'scheduled_at' => $data['scheduled_at'] ?? null,
            'work_type' => $data['work_type'] ?? '',
            'site_id' => $data['site_id'] ?? '',
            'address' => $data['address'] ?? '',
            'access_window' => $data['access_window'] ?? '',
            'onsite_contact' => $data['onsite_contact'] ?? '',
            'parts_tracking' => $data['parts_tracking'] ?? null,
            'notes' => $data['notes'] ?? null,
            'assigned_tech' => $data['assigned_tech'] ?? null,
            'internal_notes' => $data['internal_notes'] ?? null,
            'preferred_date' => $data['preferred_date'] ?? null,
            'preferred_time' => $data['preferred_time'] ?? null,
            'attachments' => isset($data['attachments']) ? wp_json_encode($data['attachments']) : null,
            'links_json' => isset($data['links']) ? wp_json_encode($data['links']) : null,
            'evidence_received' => $data['evidence_received'] ?? 0,
            'signoff_name' => $data['signoff_name'] ?? null,
            'signoff_time' => $data['signoff_time'] ?? null,
            'meta_json' => isset($data['meta']) ? wp_json_encode($data['meta']) : null,
        ];

        // Format array for wpdb->insert
        $formats = [
            '%s', // public_id
            '%s', // created_at
            '%s', // status
            '%s', // company
            '%s', // contact_name
            '%s', // email
            '%s', // phone
            '%s', // po_number
            '%s', // sla
            '%s', // scheduled_at
            '%s', // work_type
            '%s', // site_id
            '%s', // address
            '%s', // access_window
            '%s', // onsite_contact
            '%s', // parts_tracking
            '%s', // notes
            '%s', // assigned_tech
            '%s', // internal_notes
            '%s', // preferred_date
            '%s', // preferred_time
            '%s', // attachments
            '%s', // links_json
            '%d', // evidence_received
            '%s', // signoff_name
            '%s', // signoff_time
            '%s', // meta_json
        ];

        // Insert into database
        $result = $wpdb->insert($table, $booking_data, $formats);

        if ($result === false) {
            error_log('CTC Smart-Hands: Failed to create booking - ' . $wpdb->last_error);
            return false;
        }

        return $wpdb->insert_id;
    }

    /**
     * Generate unique public booking ID
     * Format: CTC-YYYYMMDD-####
     * @return string Public booking ID
     */
    private static function generate_public_id(): string {
        global $wpdb;

        $table = self::get_table_name(self::TABLE_BOOKINGS);
        $date_prefix = 'CTC-' . gmdate('Ymd');

        // Get the highest number for today
        $query = $wpdb->prepare(
            "SELECT public_id FROM {$table} WHERE public_id LIKE %s ORDER BY id DESC LIMIT 1",
            $wpdb->esc_like($date_prefix) . '-%'
        );

        $last_id = $wpdb->get_var($query);

        if ($last_id) {
            // Extract number and increment
            $last_number = (int) substr($last_id, -4);
            $new_number = $last_number + 1;
        } else {
            // First booking today
            $new_number = 1;
        }

        // Format with leading zeros (4 digits)
        return $date_prefix . '-' . str_pad((string)$new_number, 4, '0', STR_PAD_LEFT);
    }

    /**
     * Get booking by ID
     * @param int $id Booking ID
     * @return object|null Booking object or null if not found
     */
    public static function get_booking(int $id): ?object {
        global $wpdb;

        $table = self::get_table_name(self::TABLE_BOOKINGS);

        $query = $wpdb->prepare("SELECT * FROM {$table} WHERE id = %d", $id);
        $booking = $wpdb->get_row($query);

        if ($booking) {
            // Decode JSON fields
            $booking->links = $booking->links_json ? json_decode($booking->links_json, true) : [];
            $booking->meta = $booking->meta_json ? json_decode($booking->meta_json, true) : [];
            $booking->attachments = $booking->attachments ? json_decode($booking->attachments, true) : [];

            // Remove JSON fields from response
            unset($booking->links_json);
            unset($booking->meta_json);
        }

        return $booking ?? null;
    }

    /**
     * Get bookings with filters and pagination
     * @param array $args Query arguments
     * @return array Array of booking objects
     */
    public static function get_bookings(array $args = []): array {
        global $wpdb;

        $table = self::get_table_name(self::TABLE_BOOKINGS);

        // Default arguments
        $defaults = [
            'status' => null,
            'q' => null,
            'date_from' => null,
            'date_to' => null,
            'page' => 1,
            'per_page' => 20,
            'orderby' => 'created_at',
            'order' => 'DESC',
        ];

        $args = wp_parse_args($args, $defaults);

        // Build WHERE clause
        $where = ['1=1'];
        $prepare_args = [];

        if ($args['status']) {
            $where[] = 'status = %s';
            $prepare_args[] = $args['status'];
        }

        if ($args['q']) {
            $where[] = '(company LIKE %s OR site_id LIKE %s OR po_number LIKE %s OR public_id LIKE %s)';
            $search_term = '%' . $wpdb->esc_like($args['q']) . '%';
            $prepare_args[] = $search_term;
            $prepare_args[] = $search_term;
            $prepare_args[] = $search_term;
            $prepare_args[] = $search_term;
        }

        if ($args['date_from']) {
            $where[] = 'created_at >= %s';
            $prepare_args[] = $args['date_from'];
        }

        if ($args['date_to']) {
            $where[] = 'created_at <= %s';
            $prepare_args[] = $args['date_to'];
        }

        $where_clause = implode(' AND ', $where);

        // Build ORDER BY clause
        $orderby = sanitize_sql_orderby($args['orderby'] . ' ' . $args['order']);
        if (!$orderby) {
            $orderby = 'created_at DESC';
        }

        // Calculate pagination
        $offset = ($args['page'] - 1) * $args['per_page'];
        $limit = $args['per_page'];

        // Build query
        $query = "SELECT * FROM {$table} WHERE {$where_clause} ORDER BY {$orderby} LIMIT {$offset}, {$limit}";

        if (!empty($prepare_args)) {
            $query = $wpdb->prepare($query, $prepare_args);
        }

        $bookings = $wpdb->get_results($query);

        // Decode JSON fields for each booking
        foreach ($bookings as $booking) {
            $booking->links = $booking->links_json ? json_decode($booking->links_json, true) : [];
            $booking->meta = $booking->meta_json ? json_decode($booking->meta_json, true) : [];
            $booking->attachments = $booking->attachments ? json_decode($booking->attachments, true) : [];
            unset($booking->links_json);
            unset($booking->meta_json);
        }

        return $bookings;
    }

    /**
     * Update booking
     * @param int $id Booking ID
     * @param array $data Data to update
     * @return bool True on success, false on failure
     */
    public static function update_booking(int $id, array $data): bool {
        global $wpdb;

        $table = self::get_table_name(self::TABLE_BOOKINGS);

        // Prepare update data
        $update_data = [];
        $formats = [];

        $allowed_fields = [
            'status', 'scheduled_at', 'company', 'contact_name', 'email', 'phone',
            'po_number', 'sla', 'work_type', 'site_id', 'address', 'access_window',
            'onsite_contact', 'parts_tracking', 'notes', 'assigned_tech', 'internal_notes',
            'preferred_date', 'preferred_time', 'evidence_received', 'signoff_name', 'signoff_time'
        ];

        foreach ($allowed_fields as $field) {
            if (array_key_exists($field, $data)) {
                $update_data[$field] = $data[$field];
                $formats[] = is_int($data[$field]) ? '%d' : '%s';
            }
        }

        // Handle JSON fields
        if (isset($data['links'])) {
            $update_data['links_json'] = wp_json_encode($data['links']);
            $formats[] = '%s';
        }

        if (isset($data['meta'])) {
            $update_data['meta_json'] = wp_json_encode($data['meta']);
            $formats[] = '%s';
        }

        if (isset($data['attachments'])) {
            $update_data['attachments'] = wp_json_encode($data['attachments']);
            $formats[] = '%s';
        }

        if (empty($update_data)) {
            return false;
        }

        // Update database
        $result = $wpdb->update(
            $table,
            $update_data,
            ['id' => $id],
            $formats,
            ['%d']
        );

        return $result !== false;
    }

    /**
     * Add note to booking
     * @param int $booking_id Booking ID
     * @param string $note Note content
     * @param string $type Note type (internal, email, sms, status_change)
     * @param int|null $author_id Author user ID
     * @return int|false Note ID on success, false on failure
     */
    public static function add_booking_note(
        int $booking_id,
        string $note,
        string $type = 'internal',
        ?int $author_id = null
    ): int|false {
        global $wpdb;

        $table = self::get_table_name(self::TABLE_BOOKING_NOTES);

        $data = [
            'booking_id' => $booking_id,
            'created_at' => current_time('mysql'),
            'author_id' => $author_id,
            'note' => $note,
            'type' => $type,
        ];

        $formats = ['%d', '%s', '%d', '%s', '%s'];

        $result = $wpdb->insert($table, $data, $formats);

        return $result !== false ? $wpdb->insert_id : false;
    }

    /**
     * Get notes for a booking
     * @param int $booking_id Booking ID
     * @return array Array of note objects
     */
    public static function get_booking_notes(int $booking_id): array {
        global $wpdb;

        $table = self::get_table_name(self::TABLE_BOOKING_NOTES);

        $query = $wpdb->prepare(
            "SELECT * FROM {$table} WHERE booking_id = %d ORDER BY created_at DESC",
            $booking_id
        );

        return $wpdb->get_results($query);
    }

    /**
     * Get booking count by status
     * @param string|null $status Status to filter by (null for all)
     * @return int Count of bookings
     */
    public static function count_bookings(?string $status = null): int {
        global $wpdb;

        $table = self::get_table_name(self::TABLE_BOOKINGS);

        if ($status) {
            $query = $wpdb->prepare("SELECT COUNT(*) FROM {$table} WHERE status = %s", $status);
        } else {
            $query = "SELECT COUNT(*) FROM {$table}";
        }

        return (int) $wpdb->get_var($query);
    }

    /**
     * Delete booking (soft delete - not used in MVP, but included for completeness)
     * Note: In production, consider soft deletes by adding a 'deleted_at' column
     *
     * @param int $id Booking ID
     * @return bool True on success, false on failure
     */
    public static function delete_booking(int $id): bool {
        global $wpdb;

        $table = self::get_table_name(self::TABLE_BOOKINGS);

        // Notes will be deleted automatically via CASCADE
        $result = $wpdb->delete($table, ['id' => $id], ['%d']);

        return $result !== false;
    }
}
