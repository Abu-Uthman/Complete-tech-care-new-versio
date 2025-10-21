<?php
/**
 * Booking Detail View
 */

use CTC\SmartHands\Database;
use CTC\SmartHands\Helpers;

if (!defined('ABSPATH')) exit;

$booking_id = $_GET['id'] ?? 0;
$booking = Database::get_booking((int)$booking_id);

if (!$booking) {
    echo '<div class="wrap"><div class="notice notice-error"><p>' . __('Booking not found.', 'ctc-smart-hands') . '</p></div></div>';
    return;
}

// Handle status update
if (isset($_POST['update_status']) && wp_verify_nonce($_POST['status_nonce'], 'update_status_' . $booking->id)) {
    $new_status = sanitize_text_field($_POST['status']);
    Database::update_booking($booking->id, ['status' => $new_status]);
    Database::add_booking_note($booking->id, sprintf('Status changed to: %s', ucfirst($new_status)), 'status_change', get_current_user_id());
    wp_redirect(add_query_arg('updated', '1'));
    exit;
}

$notes = Database::get_booking_notes($booking->id);
?>

<div class="wrap ctc-smart-hands">
    <h1><?php echo esc_html($booking->public_id); ?> - <?php echo esc_html($booking->company); ?></h1>

    <?php if (isset($_GET['updated'])): ?>
        <div class="notice notice-success is-dismissible">
            <p><?php _e('Booking updated successfully.', 'ctc-smart-hands'); ?></p>
        </div>
    <?php endif; ?>

    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 20px; margin-top: 20px;">
        <!-- Main Details -->
        <div>
            <div class="card">
                <h2><?php _e('Booking Details', 'ctc-smart-hands'); ?></h2>
                <table class="widefat">
                    <tr>
                        <th style="width: 200px;"><?php _e('Booking ID', 'ctc-smart-hands'); ?></th>
                        <td><strong><?php echo esc_html($booking->public_id); ?></strong></td>
                    </tr>
                    <tr>
                        <th><?php _e('Status', 'ctc-smart-hands'); ?></th>
                        <td>
                            <span class="ctc-status-badge status-<?php echo esc_attr($booking->status); ?>">
                                <?php echo esc_html(ucfirst($booking->status)); ?>
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <th><?php _e('Created', 'ctc-smart-hands'); ?></th>
                        <td><?php echo Helpers::format_datetime($booking->created_at); ?></td>
                    </tr>
                    <tr>
                        <th><?php _e('SLA', 'ctc-smart-hands'); ?></th>
                        <td><?php echo esc_html($booking->sla); ?></td>
                    </tr>
                </table>
            </div>

            <div class="card" style="margin-top: 20px;">
                <h2><?php _e('Company Details', 'ctc-smart-hands'); ?></h2>
                <table class="widefat">
                    <tr>
                        <th style="width: 200px;"><?php _e('Company', 'ctc-smart-hands'); ?></th>
                        <td><?php echo esc_html($booking->company); ?></td>
                    </tr>
                    <tr>
                        <th><?php _e('Contact Name', 'ctc-smart-hands'); ?></th>
                        <td><?php echo esc_html($booking->contact_name); ?></td>
                    </tr>
                    <tr>
                        <th><?php _e('Email', 'ctc-smart-hands'); ?></th>
                        <td><a href="mailto:<?php echo esc_attr($booking->email); ?>"><?php echo esc_html($booking->email); ?></a></td>
                    </tr>
                    <tr>
                        <th><?php _e('Phone', 'ctc-smart-hands'); ?></th>
                        <td><a href="tel:<?php echo esc_attr($booking->phone); ?>"><?php echo esc_html($booking->phone); ?></a></td>
                    </tr>
                    <tr>
                        <th><?php _e('PO Number', 'ctc-smart-hands'); ?></th>
                        <td><?php echo esc_html($booking->po_number); ?></td>
                    </tr>
                </table>
            </div>

            <div class="card" style="margin-top: 20px;">
                <h2><?php _e('Site Details', 'ctc-smart-hands'); ?></h2>
                <table class="widefat">
                    <tr>
                        <th style="width: 200px;"><?php _e('Site ID', 'ctc-smart-hands'); ?></th>
                        <td><?php echo esc_html($booking->site_id); ?></td>
                    </tr>
                    <tr>
                        <th><?php _e('Address', 'ctc-smart-hands'); ?></th>
                        <td><?php echo esc_html($booking->address); ?></td>
                    </tr>
                    <tr>
                        <th><?php _e('Access Window', 'ctc-smart-hands'); ?></th>
                        <td><?php echo esc_html($booking->access_window); ?></td>
                    </tr>
                    <tr>
                        <th><?php _e('Onsite Contact', 'ctc-smart-hands'); ?></th>
                        <td><?php echo esc_html($booking->onsite_contact); ?></td>
                    </tr>
                </table>
            </div>

            <div class="card" style="margin-top: 20px;">
                <h2><?php _e('Job Details', 'ctc-smart-hands'); ?></h2>
                <table class="widefat">
                    <tr>
                        <th style="width: 200px;"><?php _e('Work Type', 'ctc-smart-hands'); ?></th>
                        <td><?php echo esc_html($booking->work_type); ?></td>
                    </tr>
                    <?php if ($booking->parts_tracking): ?>
                    <tr>
                        <th><?php _e('Parts Tracking', 'ctc-smart-hands'); ?></th>
                        <td><?php echo esc_html($booking->parts_tracking); ?></td>
                    </tr>
                    <?php endif; ?>
                    <?php if ($booking->notes): ?>
                    <tr>
                        <th><?php _e('Notes', 'ctc-smart-hands'); ?></th>
                        <td><?php echo nl2br(esc_html($booking->notes)); ?></td>
                    </tr>
                    <?php endif; ?>
                </table>
            </div>

            <!-- Booking Notes -->
            <div class="card" style="margin-top: 20px;">
                <h2><?php _e('Activity Notes', 'ctc-smart-hands'); ?></h2>
                <?php if (!empty($notes)): ?>
                    <div style="max-height: 400px; overflow-y: auto;">
                        <?php foreach ($notes as $note): ?>
                            <div style="padding: 10px; border-bottom: 1px solid #eee;">
                                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                                    <strong><?php echo ucfirst($note->type); ?></strong>
                                    <small style="color: #666;">
                                        <?php echo Helpers::format_datetime($note->created_at); ?>
                                    </small>
                                </div>
                                <div><?php echo nl2br(esc_html($note->note)); ?></div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                <?php else: ?>
                    <p><?php _e('No activity notes yet.', 'ctc-smart-hands'); ?></p>
                <?php endif; ?>
            </div>
        </div>

        <!-- Sidebar Actions -->
        <div>
            <div class="card">
                <h3><?php _e('Update Status', 'ctc-smart-hands'); ?></h3>
                <form method="post">
                    <?php wp_nonce_field('update_status_' . $booking->id, 'status_nonce'); ?>
                    <p>
                        <label for="status"><?php _e('Change Status', 'ctc-smart-hands'); ?></label>
                        <select name="status" id="status" style="width: 100%;">
                            <option value="new" <?php selected($booking->status, 'new'); ?>><?php _e('New', 'ctc-smart-hands'); ?></option>
                            <option value="confirmed" <?php selected($booking->status, 'confirmed'); ?>><?php _e('Confirmed', 'ctc-smart-hands'); ?></option>
                            <option value="onsite" <?php selected($booking->status, 'onsite'); ?>><?php _e('Onsite', 'ctc-smart-hands'); ?></option>
                            <option value="completed" <?php selected($booking->status, 'completed'); ?>><?php _e('Completed', 'ctc-smart-hands'); ?></option>
                            <option value="invoiced" <?php selected($booking->status, 'invoiced'); ?>><?php _e('Invoiced', 'ctc-smart-hands'); ?></option>
                            <option value="closed" <?php selected($booking->status, 'closed'); ?>><?php _e('Closed', 'ctc-smart-hands'); ?></option>
                        </select>
                    </p>
                    <p>
                        <button type="submit" name="update_status" class="button button-primary" style="width: 100%;">
                            <?php _e('Update Status', 'ctc-smart-hands'); ?>
                        </button>
                    </p>
                </form>
            </div>

            <div class="card" style="margin-top: 20px;">
                <h3><?php _e('Quick Info', 'ctc-smart-hands'); ?></h3>
                <p><strong><?php _e('Company:', 'ctc-smart-hands'); ?></strong><br><?php echo esc_html($booking->company); ?></p>
                <p><strong><?php _e('PO:', 'ctc-smart-hands'); ?></strong><br><?php echo esc_html($booking->po_number); ?></p>
                <p><strong><?php _e('Site:', 'ctc-smart-hands'); ?></strong><br><?php echo esc_html($booking->site_id); ?></p>
            </div>

            <div class="card" style="margin-top: 20px;">
                <h3><?php _e('Actions', 'ctc-smart-hands'); ?></h3>
                <p>
                    <a href="<?php echo admin_url('admin.php?page=ctc-smart-hands'); ?>" class="button" style="width: 100%; text-align: center;">
                        &larr; <?php _e('Back to Bookings', 'ctc-smart-hands'); ?>
                    </a>
                </p>
            </div>
        </div>
    </div>
</div>
