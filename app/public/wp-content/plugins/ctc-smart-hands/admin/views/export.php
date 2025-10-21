<?php
/**
 * Export Bookings View
 */

use CTC\SmartHands\Database;
use CTC\SmartHands\Helpers;

if (!defined('ABSPATH')) exit;

// Handle CSV export
if (isset($_POST['export_csv']) && wp_verify_nonce($_POST['export_nonce'], 'export_bookings')) {
    $status = sanitize_text_field($_POST['status'] ?? '');
    $date_from = sanitize_text_field($_POST['date_from'] ?? '');
    $date_to = sanitize_text_field($_POST['date_to'] ?? '');

    // Get bookings
    $args = [
        'status' => $status ?: null,
        'date_from' => $date_from ?: null,
        'date_to' => $date_to ?: null,
        'per_page' => 9999, // Get all matching bookings
    ];

    $bookings = Database::get_bookings($args);

    if (empty($bookings)) {
        echo '<div class="notice notice-warning"><p>' . __('No bookings found for export.', 'ctc-smart-hands') . '</p></div>';
    } else {
        // Set headers for CSV download
        header('Content-Type: text/csv; charset=utf-8');
        header('Content-Disposition: attachment; filename=ctc-bookings-' . date('Y-m-d') . '.csv');
        header('Pragma: no-cache');
        header('Expires: 0');

        // Open output stream
        $output = fopen('php://output', 'w');

        // CSV headers
        fputcsv($output, [
            'Booking ID',
            'Created',
            'Status',
            'Company',
            'Contact Name',
            'Email',
            'Phone',
            'PO Number',
            'SLA',
            'Site ID',
            'Address',
            'Access Window',
            'Onsite Contact',
            'Work Type',
            'Parts Tracking',
            'Notes',
        ]);

        // CSV rows
        foreach ($bookings as $booking) {
            fputcsv($output, [
                $booking->public_id,
                $booking->created_at,
                $booking->status,
                $booking->company,
                $booking->contact_name,
                $booking->email,
                $booking->phone,
                $booking->po_number,
                $booking->sla,
                $booking->site_id,
                $booking->address,
                $booking->access_window,
                $booking->onsite_contact,
                $booking->work_type,
                $booking->parts_tracking ?? '',
                $booking->notes ?? '',
            ]);
        }

        fclose($output);
        exit;
    }
}
?>

<div class="wrap ctc-smart-hands">
    <h1><?php _e('Export Bookings', 'ctc-smart-hands'); ?></h1>

    <div class="card" style="max-width: 600px;">
        <h2><?php _e('Export to CSV', 'ctc-smart-hands'); ?></h2>
        <p><?php _e('Export bookings to a CSV file for analysis or reporting.', 'ctc-smart-hands'); ?></p>

        <form method="post">
            <?php wp_nonce_field('export_bookings', 'export_nonce'); ?>

            <table class="form-table">
                <tr>
                    <th scope="row">
                        <label for="status"><?php _e('Status', 'ctc-smart-hands'); ?></label>
                    </th>
                    <td>
                        <select name="status" id="status">
                            <option value=""><?php _e('All Statuses', 'ctc-smart-hands'); ?></option>
                            <option value="new"><?php _e('New', 'ctc-smart-hands'); ?></option>
                            <option value="confirmed"><?php _e('Confirmed', 'ctc-smart-hands'); ?></option>
                            <option value="onsite"><?php _e('Onsite', 'ctc-smart-hands'); ?></option>
                            <option value="completed"><?php _e('Completed', 'ctc-smart-hands'); ?></option>
                            <option value="invoiced"><?php _e('Invoiced', 'ctc-smart-hands'); ?></option>
                            <option value="closed"><?php _e('Closed', 'ctc-smart-hands'); ?></option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <label for="date_from"><?php _e('From Date', 'ctc-smart-hands'); ?></label>
                    </th>
                    <td>
                        <input type="date" name="date_from" id="date_from" class="regular-text">
                        <p class="description"><?php _e('Leave empty for all dates', 'ctc-smart-hands'); ?></p>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <label for="date_to"><?php _e('To Date', 'ctc-smart-hands'); ?></label>
                    </th>
                    <td>
                        <input type="date" name="date_to" id="date_to" class="regular-text">
                        <p class="description"><?php _e('Leave empty for all dates', 'ctc-smart-hands'); ?></p>
                    </td>
                </tr>
            </table>

            <p class="submit">
                <button type="submit" name="export_csv" class="button button-primary">
                    📥 <?php _e('Download CSV', 'ctc-smart-hands'); ?>
                </button>
            </p>
        </form>
    </div>

    <div class="card" style="max-width: 600px; margin-top: 20px;">
        <h2><?php _e('Quick Export Options', 'ctc-smart-hands'); ?></h2>
        <form method="post" style="margin-bottom: 10px;">
            <?php wp_nonce_field('export_bookings', 'export_nonce'); ?>
            <input type="hidden" name="date_from" value="<?php echo date('Y-m-d', strtotime('-7 days')); ?>">
            <button type="submit" name="export_csv" class="button">
                <?php _e('Last 7 Days', 'ctc-smart-hands'); ?>
            </button>
        </form>

        <form method="post" style="margin-bottom: 10px;">
            <?php wp_nonce_field('export_bookings', 'export_nonce'); ?>
            <input type="hidden" name="date_from" value="<?php echo date('Y-m-d', strtotime('-30 days')); ?>">
            <button type="submit" name="export_csv" class="button">
                <?php _e('Last 30 Days', 'ctc-smart-hands'); ?>
            </button>
        </form>

        <form method="post">
            <?php wp_nonce_field('export_bookings', 'export_nonce'); ?>
            <input type="hidden" name="date_from" value="<?php echo date('Y-m-01'); ?>">
            <button type="submit" name="export_csv" class="button">
                <?php _e('This Month', 'ctc-smart-hands'); ?>
            </button>
        </form>
    </div>

    <div class="card" style="max-width: 600px; margin-top: 20px;">
        <h2><?php _e('Current Statistics', 'ctc-smart-hands'); ?></h2>
        <table class="widefat">
            <tr>
                <th><?php _e('Total Bookings', 'ctc-smart-hands'); ?></th>
                <td><?php echo Database::count_bookings(); ?></td>
            </tr>
            <tr>
                <th><?php _e('New', 'ctc-smart-hands'); ?></th>
                <td><?php echo Database::count_bookings('new'); ?></td>
            </tr>
            <tr>
                <th><?php _e('Confirmed', 'ctc-smart-hands'); ?></th>
                <td><?php echo Database::count_bookings('confirmed'); ?></td>
            </tr>
            <tr>
                <th><?php _e('Completed', 'ctc-smart-hands'); ?></th>
                <td><?php echo Database::count_bookings('completed'); ?></td>
            </tr>
        </table>
    </div>
</div>
