<?php
/**
 * Bookings List Table
 *
 * Displays bookings in WordPress admin using WP_List_Table
 *
 * @package CTC_Smart_Hands
 * @since 1.0.0
 */

declare(strict_types=1);

namespace CTC\SmartHands\Admin;

use CTC\SmartHands\Database;
use CTC\SmartHands\Helpers;

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

// Load WP_List_Table if not already loaded
if (!class_exists('WP_List_Table')) {
    require_once ABSPATH . 'wp-admin/includes/class-wp-list-table.php';
}

class Bookings_List extends \WP_List_Table {

    /**
     * Constructor
     */
    public function __construct() {
        parent::__construct([
            'singular' => 'booking',
            'plural' => 'bookings',
            'ajax' => false,
        ]);
    }

    /**
     * Get columns
     *
     * @return array Column names
     */
    public function get_columns(): array {
        return [
            'cb' => '<input type="checkbox" />',
            'public_id' => __('Booking ID', 'ctc-smart-hands'),
            'created_at' => __('Date', 'ctc-smart-hands'),
            'company' => __('Company', 'ctc-smart-hands'),
            'site_id' => __('Site ID', 'ctc-smart-hands'),
            'po_number' => __('PO Number', 'ctc-smart-hands'),
            'status' => __('Status', 'ctc-smart-hands'),
            'sla' => __('SLA', 'ctc-smart-hands'),
        ];
    }

    /**
     * Get sortable columns
     *
     * @return array Sortable column names
     */
    public function get_sortable_columns(): array {
        return [
            'public_id' => ['public_id', false],
            'created_at' => ['created_at', true], // true = already sorted
            'company' => ['company', false],
            'status' => ['status', false],
        ];
    }

    /**
     * Column checkbox
     *
     * @param object $item Booking object
     * @return string Checkbox HTML
     */
    public function column_cb($item): string {
        return sprintf('<input type="checkbox" name="booking[]" value="%s" />', $item->id);
    }

    /**
     * Column public_id (with link to detail)
     *
     * @param object $item Booking object
     * @return string Column HTML
     */
    public function column_public_id($item): string {
        $detail_url = add_query_arg([
            'page' => 'ctc-booking-detail',
            'id' => $item->id,
        ], admin_url('admin.php'));

        $actions = [
            'view' => sprintf('<a href="%s">%s</a>', $detail_url, __('View', 'ctc-smart-hands')),
            'edit' => sprintf('<a href="%s">%s</a>', $detail_url, __('Edit', 'ctc-smart-hands')),
        ];

        return sprintf(
            '<strong><a href="%s">%s</a></strong>%s',
            $detail_url,
            esc_html($item->public_id),
            $this->row_actions($actions)
        );
    }

    /**
     * Column created_at
     *
     * @param object $item Booking object
     * @return string Column HTML
     */
    public function column_created_at($item): string {
        return Helpers::format_datetime($item->created_at, 'j M Y, g:ia');
    }

    /**
     * Column company
     *
     * @param object $item Booking object
     * @return string Column HTML
     */
    public function column_company($item): string {
        return esc_html($item->company);
    }

    /**
     * Column site_id
     *
     * @param object $item Booking object
     * @return string Column HTML
     */
    public function column_site_id($item): string {
        return esc_html($item->site_id);
    }

    /**
     * Column po_number
     *
     * @param object $item Booking object
     * @return string Column HTML
     */
    public function column_po_number($item): string {
        return esc_html($item->po_number);
    }

    /**
     * Column status (with badge)
     *
     * @param object $item Booking object
     * @return string Column HTML
     */
    public function column_status($item): string {
        $color = Helpers::get_status_color($item->status);
        return sprintf(
            '<span class="ctc-status-badge status-%s">%s</span>',
            esc_attr($item->status),
            esc_html(ucfirst($item->status))
        );
    }

    /**
     * Column SLA
     *
     * @param object $item Booking object
     * @return string Column HTML
     */
    public function column_sla($item): string {
        return esc_html($item->sla);
    }

    /**
     * Default column
     *
     * @param object $item Booking object
     * @param string $column_name Column name
     * @return string Column HTML
     */
    public function column_default($item, $column_name): string {
        return esc_html($item->$column_name ?? '');
    }

    /**
     * Get bulk actions
     *
     * @return array Bulk actions
     */
    public function get_bulk_actions(): array {
        return [
            'delete' => __('Delete', 'ctc-smart-hands'),
        ];
    }

    /**
     * Process bulk actions
     */
    public function process_bulk_action(): void {
        if ('delete' === $this->current_action()) {
            $booking_ids = $_REQUEST['booking'] ?? [];

            if (!empty($booking_ids)) {
                foreach ($booking_ids as $id) {
                    Database::delete_booking((int) $id);
                }

                wp_redirect(add_query_arg('deleted', count($booking_ids)));
                exit;
            }
        }
    }

    /**
     * Extra table navigation (filters)
     *
     * @param string $which Top or bottom
     */
    protected function extra_tablenav($which): void {
        if ('top' !== $which) {
            return;
        }

        $current_status = $_REQUEST['status'] ?? '';
        ?>
        <div class="alignleft actions">
            <select name="status">
                <option value=""><?php _e('All Statuses', 'ctc-smart-hands'); ?></option>
                <option value="new" <?php selected($current_status, 'new'); ?>><?php _e('New', 'ctc-smart-hands'); ?></option>
                <option value="confirmed" <?php selected($current_status, 'confirmed'); ?>><?php _e('Confirmed', 'ctc-smart-hands'); ?></option>
                <option value="onsite" <?php selected($current_status, 'onsite'); ?>><?php _e('Onsite', 'ctc-smart-hands'); ?></option>
                <option value="completed" <?php selected($current_status, 'completed'); ?>><?php _e('Completed', 'ctc-smart-hands'); ?></option>
                <option value="invoiced" <?php selected($current_status, 'invoiced'); ?>><?php _e('Invoiced', 'ctc-smart-hands'); ?></option>
                <option value="closed" <?php selected($current_status, 'closed'); ?>><?php _e('Closed', 'ctc-smart-hands'); ?></option>
            </select>
            <input type="submit" class="button" value="<?php _e('Filter', 'ctc-smart-hands'); ?>">
        </div>
        <?php
    }

    /**
     * Prepare items for display
     */
    public function prepare_items(): void {
        // Process bulk actions first
        $this->process_bulk_action();

        // Get query parameters
        $per_page = 20;
        $current_page = $this->get_pagenum();
        $status = $_REQUEST['status'] ?? null;
        $search = $_REQUEST['s'] ?? null;

        // Get sorting parameters
        $orderby = $_REQUEST['orderby'] ?? 'created_at';
        $order = $_REQUEST['order'] ?? 'DESC';

        // Get bookings
        $args = [
            'status' => $status,
            'q' => $search,
            'page' => $current_page,
            'per_page' => $per_page,
            'orderby' => $orderby,
            'order' => strtoupper($order),
        ];

        $bookings = Database::get_bookings($args);
        $total_items = Database::count_bookings($status);

        // Set items
        $this->items = $bookings;

        // Set pagination
        $this->set_pagination_args([
            'total_items' => $total_items,
            'per_page' => $per_page,
            'total_pages' => ceil($total_items / $per_page),
        ]);

        // Set columns
        $this->_column_headers = [
            $this->get_columns(),
            [], // Hidden columns
            $this->get_sortable_columns(),
        ];
    }

    /**
     * Display when no items found
     */
    public function no_items(): void {
        _e('No bookings found.', 'ctc-smart-hands');
    }
}
