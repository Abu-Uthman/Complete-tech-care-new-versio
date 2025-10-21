<?php
/**
 * Downloads Settings View
 */
if (!defined('ABSPATH')) exit;
?>
<div class="wrap">
    <h1><?php esc_html_e('Downloads Settings', 'ctc-smart-hands'); ?></h1>

    <p><?php esc_html_e('Upload compliance documents to the WordPress Media Library, then paste the URLs below.', 'ctc-smart-hands'); ?></p>

    <form method="post" action="">
        <?php wp_nonce_field('ctc_downloads_save', 'ctc_downloads_nonce'); ?>

        <table class="form-table">
            <tr>
                <th><label for="capabilityPdfUrl"><?php esc_html_e('Capability Statement PDF', 'ctc-smart-hands'); ?></label></th>
                <td>
                    <input type="url" name="capabilityPdfUrl" id="capabilityPdfUrl"
                           value="<?php echo esc_url($downloads['capabilityPdfUrl']); ?>"
                           class="large-text" placeholder="https://...">
                    <?php if ($downloads['capabilityPdfUrl']): ?>
                        <p><a href="<?php echo esc_url($downloads['capabilityPdfUrl']); ?>" target="_blank"><?php esc_html_e('View PDF', 'ctc-smart-hands'); ?></a></p>
                    <?php endif; ?>
                </td>
            </tr>
            <tr>
                <th><label for="insurancePdfUrl"><?php esc_html_e('Insurance Certificate of Currency PDF', 'ctc-smart-hands'); ?></label></th>
                <td>
                    <input type="url" name="insurancePdfUrl" id="insurancePdfUrl"
                           value="<?php echo esc_url($downloads['insurancePdfUrl']); ?>"
                           class="large-text" placeholder="https://...">
                    <?php if ($downloads['insurancePdfUrl']): ?>
                        <p><a href="<?php echo esc_url($downloads['insurancePdfUrl']); ?>" target="_blank"><?php esc_html_e('View PDF', 'ctc-smart-hands'); ?></a></p>
                    <?php endif; ?>
                </td>
            </tr>
            <tr>
                <th><label for="swmsPdfUrl"><?php esc_html_e('SWMS Pack PDF', 'ctc-smart-hands'); ?></label></th>
                <td>
                    <input type="url" name="swmsPdfUrl" id="swmsPdfUrl"
                           value="<?php echo esc_url($downloads['swmsPdfUrl']); ?>"
                           class="large-text" placeholder="https://...">
                    <?php if ($downloads['swmsPdfUrl']): ?>
                        <p><a href="<?php echo esc_url($downloads['swmsPdfUrl']); ?>" target="_blank"><?php esc_html_e('View PDF', 'ctc-smart-hands'); ?></a></p>
                    <?php endif; ?>
                </td>
            </tr>
        </table>

        <p class="submit">
            <button type="submit" class="button button-primary"><?php esc_html_e('Save Download URLs', 'ctc-smart-hands'); ?></button>
        </p>
    </form>

    <div class="card">
        <h2><?php esc_html_e('How to Upload PDFs', 'ctc-smart-hands'); ?></h2>
        <ol>
            <li><?php esc_html_e('Go to Media → Add New', 'ctc-smart-hands'); ?></li>
            <li><?php esc_html_e('Upload your PDF file', 'ctc-smart-hands'); ?></li>
            <li><?php esc_html_e('Click on the uploaded file', 'ctc-smart-hands'); ?></li>
            <li><?php esc_html_e('Copy the "File URL" from the right panel', 'ctc-smart-hands'); ?></li>
            <li><?php esc_html_e('Paste the URL in the field above', 'ctc-smart-hands'); ?></li>
        </ol>
    </div>
</div>
