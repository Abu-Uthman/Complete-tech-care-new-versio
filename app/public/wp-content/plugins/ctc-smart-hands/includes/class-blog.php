<?php
declare(strict_types=1);

namespace CTC\SmartHands;

/**
 * Blog Post Type Handler
 * Enables WordPress blog posts with custom fields for SEO
 */
class Blog {

    public function __construct() {
        add_action('init', [$this, 'register_post_type']);
        add_action('rest_api_init', [$this, 'register_rest_fields']);
        add_action('add_meta_boxes', [$this, 'add_seo_meta_box']);
        add_action('save_post', [$this, 'save_seo_meta']);
    }

    /**
     * Register custom blog post type (optional - using default WordPress posts)
     * This enables additional customization if needed
     */
    public function register_post_type(): void {
        // Using default WordPress 'post' type is recommended
        // This function is here for future customization if needed

        // Add category for CTC blog posts
        if (!term_exists('IT Support Tips', 'category')) {
            wp_insert_term('IT Support Tips', 'category', [
                'description' => 'Tips and guides for IT support professionals',
                'slug' => 'it-support-tips'
            ]);
        }

        if (!term_exists('Smart Hands', 'category')) {
            wp_insert_term('Smart Hands', 'category', [
                'description' => 'Smart-hands contractor insights and best practices',
                'slug' => 'smart-hands'
            ]);
        }

        if (!term_exists('Regional IT', 'category')) {
            wp_insert_term('Regional IT', 'category', [
                'description' => 'Regional Victoria IT support topics',
                'slug' => 'regional-it'
            ]);
        }
    }

    /**
     * Add SEO meta box to post editor
     */
    public function add_seo_meta_box(): void {
        add_meta_box(
            'ctc_seo_meta',
            'SEO Settings',
            [$this, 'render_seo_meta_box'],
            'post',
            'normal',
            'high'
        );
    }

    /**
     * Render SEO meta box
     */
    public function render_seo_meta_box($post): void {
        wp_nonce_field('ctc_seo_meta', 'ctc_seo_nonce');

        $meta_description = get_post_meta($post->ID, '_ctc_meta_description', true);
        $meta_keywords = get_post_meta($post->ID, '_ctc_meta_keywords', true);
        $focus_keyword = get_post_meta($post->ID, '_ctc_focus_keyword', true);

        ?>
        <div style="margin: 15px 0;">
            <label for="ctc_meta_description" style="display: block; margin-bottom: 5px; font-weight: 600;">
                Meta Description (155 characters recommended)
            </label>
            <textarea
                id="ctc_meta_description"
                name="ctc_meta_description"
                rows="3"
                style="width: 100%;"
                maxlength="160"
            ><?php echo esc_textarea($meta_description); ?></textarea>
            <p class="description">This will appear in search engine results.</p>
        </div>

        <div style="margin: 15px 0;">
            <label for="ctc_focus_keyword" style="display: block; margin-bottom: 5px; font-weight: 600;">
                Focus Keyword
            </label>
            <input
                type="text"
                id="ctc_focus_keyword"
                name="ctc_focus_keyword"
                value="<?php echo esc_attr($focus_keyword); ?>"
                style="width: 100%;"
            />
            <p class="description">Main keyword to optimize this post for.</p>
        </div>

        <div style="margin: 15px 0;">
            <label for="ctc_meta_keywords" style="display: block; margin-bottom: 5px; font-weight: 600;">
                Additional Keywords (comma-separated)
            </label>
            <input
                type="text"
                id="ctc_meta_keywords"
                name="ctc_meta_keywords"
                value="<?php echo esc_attr($meta_keywords); ?>"
                style="width: 100%;"
            />
            <p class="description">E.g., IT support, smart hands, regional Victoria</p>
        </div>
        <?php
    }

    /**
     * Save SEO meta data
     */
    public function save_seo_meta($post_id): void {
        // Check nonce
        if (!isset($_POST['ctc_seo_nonce']) || !wp_verify_nonce($_POST['ctc_seo_nonce'], 'ctc_seo_meta')) {
            return;
        }

        // Check autosave
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }

        // Check permissions
        if (!current_user_can('edit_post', $post_id)) {
            return;
        }

        // Save meta description
        if (isset($_POST['ctc_meta_description'])) {
            update_post_meta(
                $post_id,
                '_ctc_meta_description',
                sanitize_textarea_field($_POST['ctc_meta_description'])
            );
        }

        // Save focus keyword
        if (isset($_POST['ctc_focus_keyword'])) {
            update_post_meta(
                $post_id,
                '_ctc_focus_keyword',
                sanitize_text_field($_POST['ctc_focus_keyword'])
            );
        }

        // Save keywords
        if (isset($_POST['ctc_meta_keywords'])) {
            update_post_meta(
                $post_id,
                '_ctc_meta_keywords',
                sanitize_text_field($_POST['ctc_meta_keywords'])
            );
        }
    }

    /**
     * Register custom fields in REST API
     */
    public function register_rest_fields(): void {
        register_rest_field('post', 'ctc_seo', [
            'get_callback' => function($post) {
                return [
                    'meta_description' => get_post_meta($post['id'], '_ctc_meta_description', true),
                    'focus_keyword' => get_post_meta($post['id'], '_ctc_focus_keyword', true),
                    'keywords' => get_post_meta($post['id'], '_ctc_meta_keywords', true),
                ];
            },
            'schema' => [
                'description' => 'SEO metadata',
                'type' => 'object',
            ],
        ]);
    }
}
