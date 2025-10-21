<?php
/**
 * Rates Settings View
 *
 * @package CTC_Smart_Hands
 * @since 1.0.0
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}
?>

<div class="wrap">
    <h1><?php esc_html_e('CTC Smart-Hands - Rates Settings', 'ctc-smart-hands'); ?></h1>

    <form method="post" action="">
        <?php wp_nonce_field('ctc_rates_save', 'ctc_rates_nonce'); ?>

        <table class="form-table">
            <tr>
                <th colspan="2">
                    <h2><?php esc_html_e('Hourly Rates', 'ctc-smart-hands'); ?></h2>
                </th>
            </tr>
            <tr>
                <th scope="row">
                    <label for="bhHourly"><?php esc_html_e('Business Hours Rate (AUD/hour)', 'ctc-smart-hands'); ?></label>
                </th>
                <td>
                    <input type="number" step="0.01" name="bhHourly" id="bhHourly"
                           value="<?php echo esc_attr($rates['bhHourly']); ?>"
                           class="regular-text" required>
                    <p class="description"><?php esc_html_e('Mon-Fri 8am-5pm', 'ctc-smart-hands'); ?></p>
                </td>
            </tr>
            <tr>
                <th scope="row">
                    <label for="ahHourly"><?php esc_html_e('After Hours Rate (AUD/hour)', 'ctc-smart-hands'); ?></label>
                </th>
                <td>
                    <input type="number" step="0.01" name="ahHourly" id="ahHourly"
                           value="<?php echo esc_attr($rates['ahHourly']); ?>"
                           class="regular-text" required>
                    <p class="description"><?php esc_html_e('Weeknights, weekends, public holidays', 'ctc-smart-hands'); ?></p>
                </td>
            </tr>
            <tr>
                <th scope="row">
                    <label for="minHours"><?php esc_html_e('Minimum Hours', 'ctc-smart-hands'); ?></label>
                </th>
                <td>
                    <input type="number" step="0.5" name="minHours" id="minHours"
                           value="<?php echo esc_attr($rates['minHours']); ?>"
                           class="regular-text" required>
                    <p class="description"><?php esc_html_e('Minimum billable time per job', 'ctc-smart-hands'); ?></p>
                </td>
            </tr>
            <tr>
                <th scope="row">
                    <label for="incrementMins"><?php esc_html_e('Billing Increment (minutes)', 'ctc-smart-hands'); ?></label>
                </th>
                <td>
                    <select name="incrementMins" id="incrementMins">
                        <option value="15" <?php selected($rates['incrementMins'], 15); ?>>15 minutes</option>
                        <option value="30" <?php selected($rates['incrementMins'], 30); ?>>30 minutes</option>
                        <option value="60" <?php selected($rates['incrementMins'], 60); ?>>60 minutes</option>
                    </select>
                    <p class="description"><?php esc_html_e('Time rounded up to nearest increment', 'ctc-smart-hands'); ?></p>
                </td>
            </tr>

            <tr>
                <th colspan="2">
                    <h2><?php esc_html_e('Travel Rates', 'ctc-smart-hands'); ?></h2>
                </th>
            </tr>
            <tr>
                <th scope="row">
                    <label for="travelModel"><?php esc_html_e('Travel Billing Model', 'ctc-smart-hands'); ?></label>
                </th>
                <td>
                    <select name="travelModel" id="travelModel">
                        <option value="PER_KM" <?php selected($rates['travelModel'], 'PER_KM'); ?>>Per Kilometer</option>
                        <option value="TRAVEL_TIME" <?php selected($rates['travelModel'], 'TRAVEL_TIME'); ?>>Travel Time</option>
                    </select>
                </td>
            </tr>
            <tr>
                <th scope="row">
                    <label for="perKmRate"><?php esc_html_e('Per KM Rate (AUD/km)', 'ctc-smart-hands'); ?></label>
                </th>
                <td>
                    <input type="number" step="0.01" name="perKmRate" id="perKmRate"
                           value="<?php echo esc_attr($rates['perKmRate']); ?>"
                           class="regular-text">
                    <p class="description"><?php esc_html_e('Rate per kilometer (used if PER_KM model selected)', 'ctc-smart-hands'); ?></p>
                </td>
            </tr>
            <tr>
                <th scope="row">
                    <label for="travelHourly"><?php esc_html_e('Travel Hourly Rate (AUD/hour)', 'ctc-smart-hands'); ?></label>
                </th>
                <td>
                    <input type="number" step="0.01" name="travelHourly" id="travelHourly"
                           value="<?php echo esc_attr($rates['travelHourly']); ?>"
                           class="regular-text">
                    <p class="description"><?php esc_html_e('Rate per hour (used if TRAVEL_TIME model selected)', 'ctc-smart-hands'); ?></p>
                </td>
            </tr>
            <tr>
                <th scope="row">
                    <label for="freeKm"><?php esc_html_e('Free Kilometers', 'ctc-smart-hands'); ?></label>
                </th>
                <td>
                    <input type="number" name="freeKm" id="freeKm"
                           value="<?php echo esc_attr($rates['freeKm']); ?>"
                           class="regular-text">
                    <p class="description"><?php esc_html_e('First X km included at no charge', 'ctc-smart-hands'); ?></p>
                </td>
            </tr>
            <tr>
                <th scope="row">
                    <label for="bendigoCap"><?php esc_html_e('Bendigo Travel Cap (AUD)', 'ctc-smart-hands'); ?></label>
                </th>
                <td>
                    <input type="number" step="0.01" name="bendigoCap" id="bendigoCap"
                           value="<?php echo esc_attr($rates['bendigoCap']); ?>"
                           class="regular-text">
                    <p class="description"><?php esc_html_e('Maximum travel charge for Bendigo jobs', 'ctc-smart-hands'); ?></p>
                </td>
            </tr>

            <tr>
                <th colspan="2">
                    <h2><?php esc_html_e('Tax', 'ctc-smart-hands'); ?></h2>
                </th>
            </tr>
            <tr>
                <th scope="row">
                    <?php esc_html_e('GST', 'ctc-smart-hands'); ?>
                </th>
                <td>
                    <label>
                        <input type="checkbox" name="gstEnabled" value="1"
                               <?php checked($rates['gstEnabled'], true); ?>>
                        <?php esc_html_e('Apply 10% GST to all rates', 'ctc-smart-hands'); ?>
                    </label>
                </td>
            </tr>
        </table>

        <p class="submit">
            <button type="submit" class="button button-primary">
                <?php esc_html_e('Save Rates', 'ctc-smart-hands'); ?>
            </button>
        </p>
    </form>

    <div class="card">
        <h3><?php esc_html_e('Current Rates Summary', 'ctc-smart-hands'); ?></h3>
        <table class="widefat">
            <tr>
                <th><?php esc_html_e('Business Hours', 'ctc-smart-hands'); ?></th>
                <td>$<?php echo esc_html($rates['bhHourly']); ?>/hr</td>
            </tr>
            <tr>
                <th><?php esc_html_e('After Hours', 'ctc-smart-hands'); ?></th>
                <td>$<?php echo esc_html($rates['ahHourly']); ?>/hr</td>
            </tr>
            <tr>
                <th><?php esc_html_e('Travel Model', 'ctc-smart-hands'); ?></th>
                <td><?php echo esc_html($rates['travelModel']); ?></td>
            </tr>
            <tr>
                <th><?php esc_html_e('Bendigo Cap', 'ctc-smart-hands'); ?></th>
                <td>$<?php echo esc_html($rates['bendigoCap']); ?></td>
            </tr>
        </table>
    </div>
</div>
