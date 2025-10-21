<?php
/**
 * Notification Settings View
 */
if (!defined('ABSPATH')) exit;
?>
<div class="wrap">
    <h1><?php esc_html_e('Notification Settings', 'ctc-smart-hands'); ?></h1>

    <form method="post" action="">
        <?php wp_nonce_field('ctc_notify_save', 'ctc_notify_nonce'); ?>

        <table class="form-table">
            <tr><th colspan="2"><h2><?php esc_html_e('Owner Notifications', 'ctc-smart-hands'); ?></h2></th></tr>
            <tr>
                <th><label for="owner_email"><?php esc_html_e('Owner Email', 'ctc-smart-hands'); ?></label></th>
                <td><input type="email" name="owner_email" id="owner_email" value="<?php echo esc_attr($notify['owner_email']); ?>" class="regular-text" required></td>
            </tr>
            <tr>
                <th><label for="owner_phone"><?php esc_html_e('Owner Phone (SMS)', 'ctc-smart-hands'); ?></label></th>
                <td><input type="tel" name="owner_phone" id="owner_phone" value="<?php echo esc_attr($notify['owner_phone']); ?>" class="regular-text" placeholder="+61412345678"></td>
            </tr>

            <tr><th colspan="2"><h2><?php esc_html_e('Email Configuration', 'ctc-smart-hands'); ?></h2></th></tr>
            <tr>
                <th><label for="smtp_from"><?php esc_html_e('From Email', 'ctc-smart-hands'); ?></label></th>
                <td><input type="email" name="smtp_from" id="smtp_from" value="<?php echo esc_attr($notify['smtp_from']); ?>" class="regular-text"></td>
            </tr>

            <tr><th colspan="2"><h2><?php esc_html_e('Twilio SMS Configuration', 'ctc-smart-hands'); ?></h2></th></tr>
            <tr>
                <th><label for="twilio_sid"><?php esc_html_e('Twilio Account SID', 'ctc-smart-hands'); ?></label></th>
                <td><input type="text" name="twilio_sid" id="twilio_sid" value="<?php echo esc_attr($notify['twilio_sid']); ?>" class="regular-text"></td>
            </tr>
            <tr>
                <th><label for="twilio_token"><?php esc_html_e('Twilio Auth Token', 'ctc-smart-hands'); ?></label></th>
                <td><input type="password" name="twilio_token" id="twilio_token" value="<?php echo esc_attr($notify['twilio_token']); ?>" class="regular-text"></td>
            </tr>
            <tr>
                <th><label for="twilio_from"><?php esc_html_e('Twilio From Number', 'ctc-smart-hands'); ?></label></th>
                <td><input type="tel" name="twilio_from" id="twilio_from" value="<?php echo esc_attr($notify['twilio_from']); ?>" class="regular-text" placeholder="+61..."></td>
            </tr>

            <tr><th colspan="2"><h2><?php esc_html_e('Email Templates', 'ctc-smart-hands'); ?></h2></th></tr>
            <tr>
                <th><label for="owner_email_template"><?php esc_html_e('Owner Email Template', 'ctc-smart-hands'); ?></label></th>
                <td>
                    <textarea name="owner_email_template" id="owner_email_template" rows="10" class="large-text code"><?php echo esc_textarea($notify['owner_email_template']); ?></textarea>
                    <p class="description"><?php esc_html_e('Tokens: {public_id}, {company}, {po}, {site_id}, {sla}, {contact}, {phone}, {address}, {work_type}', 'ctc-smart-hands'); ?></p>
                </td>
            </tr>
            <tr>
                <th><label for="dispatcher_email_template"><?php esc_html_e('Dispatcher Email Template', 'ctc-smart-hands'); ?></label></th>
                <td>
                    <textarea name="dispatcher_email_template" id="dispatcher_email_template" rows="10" class="large-text code"><?php echo esc_textarea($notify['dispatcher_email_template']); ?></textarea>
                </td>
            </tr>
        </table>

        <p class="submit">
            <button type="submit" class="button button-primary"><?php esc_html_e('Save Settings', 'ctc-smart-hands'); ?></button>
        </p>
    </form>

    <div class="card" style="margin-top: 20px;">
        <h2><?php esc_html_e('Test Notifications', 'ctc-smart-hands'); ?></h2>
        <p><?php esc_html_e('Send a test email to verify your SMTP settings are working correctly.', 'ctc-smart-hands'); ?></p>
        <form method="post" action="">
            <?php wp_nonce_field('ctc_test_notification', 'ctc_test_nonce'); ?>
            <button type="submit" name="ctc_test_notification" class="button button-secondary">
                <?php esc_html_e('Send Test Email', 'ctc-smart-hands'); ?>
            </button>
        </form>
    </div>
</div>
