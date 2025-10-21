<?php
/**
 * API Settings View
 */
if (!defined('ABSPATH')) exit;
?>
<div class="wrap">
    <h1><?php esc_html_e('API Settings', 'ctc-smart-hands'); ?></h1>

    <div class="card">
        <h2><?php esc_html_e('API Credentials', 'ctc-smart-hands'); ?></h2>
        <table class="widefat">
            <tr>
                <th><?php esc_html_e('API Key', 'ctc-smart-hands'); ?></th>
                <td><code><?php echo esc_html($general['api_key']); ?></code></td>
            </tr>
            <tr>
                <th><?php esc_html_e('API Secret', 'ctc-smart-hands'); ?></th>
                <td><code><?php echo esc_html($general['api_secret']); ?></code></td>
            </tr>
            <tr>
                <th><?php esc_html_e('REST API Base URL', 'ctc-smart-hands'); ?></th>
                <td><code><?php echo esc_url(rest_url('ctc/v1')); ?></code></td>
            </tr>
        </table>

        <form method="post" action="">
            <?php wp_nonce_field('ctc_api_regenerate', 'ctc_api_nonce'); ?>
            <p>
                <button type="submit" name="ctc_api_regenerate" class="button button-secondary">
                    <?php esc_html_e('Regenerate API Credentials', 'ctc-smart-hands'); ?>
                </button>
            </p>
            <p class="description">
                <?php esc_html_e('Warning: Regenerating will invalidate existing credentials. Update your Next.js .env.local file after regenerating.', 'ctc-smart-hands'); ?>
            </p>
        </form>
    </div>

    <div class="card">
        <h2><?php esc_html_e('HMAC Authentication', 'ctc-smart-hands'); ?></h2>
        <p><?php esc_html_e('All authenticated API requests must include these headers:', 'ctc-smart-hands'); ?></p>
        <pre><code>X-CTC-Key: <?php echo esc_html($general['api_key']); ?>
X-CTC-Timestamp: <?php echo time(); ?> (Unix timestamp)
X-CTC-Signature: HMAC_SHA256(secret, timestamp + request_body)</code></pre>
    </div>

    <div class="card">
        <h2><?php esc_html_e('Available Endpoints', 'ctc-smart-hands'); ?></h2>
        <table class="widefat striped">
            <thead>
                <tr>
                    <th><?php esc_html_e('Method', 'ctc-smart-hands'); ?></th>
                    <th><?php esc_html_e('Endpoint', 'ctc-smart-hands'); ?></th>
                    <th><?php esc_html_e('Auth', 'ctc-smart-hands'); ?></th>
                    <th><?php esc_html_e('Description', 'ctc-smart-hands'); ?></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><code>GET</code></td>
                    <td><code>/rates</code></td>
                    <td><?php esc_html_e('Public', 'ctc-smart-hands'); ?></td>
                    <td><?php esc_html_e('Get current rates', 'ctc-smart-hands'); ?></td>
                </tr>
                <tr>
                    <td><code>GET</code></td>
                    <td><code>/downloads</code></td>
                    <td><?php esc_html_e('Public', 'ctc-smart-hands'); ?></td>
                    <td><?php esc_html_e('Get compliance document URLs', 'ctc-smart-hands'); ?></td>
                </tr>
                <tr>
                    <td><code>POST</code></td>
                    <td><code>/bookings</code></td>
                    <td><?php esc_html_e('HMAC', 'ctc-smart-hands'); ?></td>
                    <td><?php esc_html_e('Create new booking', 'ctc-smart-hands'); ?></td>
                </tr>
                <tr>
                    <td><code>GET</code></td>
                    <td><code>/bookings</code></td>
                    <td><?php esc_html_e('HMAC', 'ctc-smart-hands'); ?></td>
                    <td><?php esc_html_e('List bookings (paginated)', 'ctc-smart-hands'); ?></td>
                </tr>
                <tr>
                    <td><code>GET</code></td>
                    <td><code>/bookings/{id}</code></td>
                    <td><?php esc_html_e('HMAC', 'ctc-smart-hands'); ?></td>
                    <td><?php esc_html_e('Get booking detail', 'ctc-smart-hands'); ?></td>
                </tr>
                <tr>
                    <td><code>PATCH</code></td>
                    <td><code>/bookings/{id}</code></td>
                    <td><?php esc_html_e('HMAC', 'ctc-smart-hands'); ?></td>
                    <td><?php esc_html_e('Update booking', 'ctc-smart-hands'); ?></td>
                </tr>
                <tr>
                    <td><code>POST</code></td>
                    <td><code>/bookings/{id}/notify</code></td>
                    <td><?php esc_html_e('HMAC', 'ctc-smart-hands'); ?></td>
                    <td><?php esc_html_e('Send notification', 'ctc-smart-hands'); ?></td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
