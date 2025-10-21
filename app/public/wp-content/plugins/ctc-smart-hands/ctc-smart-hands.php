<?php
/**
 * Plugin Name: CTC Smart-Hands
 * Plugin URI: https://completetechcare.com.au
 * Description: Smart-hands booking and management system for Complete Tech Care regional VIC services
 * Version: 1.0.0
 * Author: Abdisalam Awale (Complete Tech Care)
 * Author URI: https://completetechcare.com.au
 * License: Proprietary
 * Text Domain: ctc-smart-hands
 * Domain Path: /languages
 * Requires at least: 6.6
 * Requires PHP: 8.2
 */

declare(strict_types=1);

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

// Plugin constants
define('CTC_VERSION', '1.0.0');
define('CTC_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('CTC_PLUGIN_URL', plugin_dir_url(__FILE__));
define('CTC_PLUGIN_BASENAME', plugin_basename(__FILE__));

// Autoloader
spl_autoload_register(function ($class) {
    // Only autoload classes in our namespace
    if (strpos($class, 'CTC\\SmartHands\\') !== 0) {
        return;
    }

    // Convert namespace to file path
    $class = str_replace('CTC\\SmartHands\\', '', $class);
    $class = str_replace('\\', DIRECTORY_SEPARATOR, $class);
    $file = CTC_PLUGIN_DIR . 'includes/class-' . strtolower($class) . '.php';

    if (file_exists($file)) {
        require_once $file;
    }
});

// Core plugin class
final class CTC_Smart_Hands {

    /**
     * Singleton instance
     * @var CTC_Smart_Hands|null
     */
    private static ?CTC_Smart_Hands $instance = null;

    /**
     * Get singleton instance
     * @return CTC_Smart_Hands
     */
    public static function get_instance(): CTC_Smart_Hands {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * Constructor - initialize plugin
     */
    private function __construct() {
        $this->load_dependencies();
        $this->init_hooks();
    }

    /**
     * Load required files
     */
    private function load_dependencies(): void {
        // Core classes
        require_once CTC_PLUGIN_DIR . 'includes/class-database.php';
        require_once CTC_PLUGIN_DIR . 'includes/class-settings.php';
        require_once CTC_PLUGIN_DIR . 'includes/class-helpers.php';
        require_once CTC_PLUGIN_DIR . 'includes/class-auth.php';
        require_once CTC_PLUGIN_DIR . 'includes/class-rest-api.php';
        require_once CTC_PLUGIN_DIR . 'includes/class-notify.php';
    }

    /**
     * Initialize WordPress hooks
     */
    private function init_hooks(): void {
        // Activation/Deactivation hooks
        register_activation_hook(__FILE__, [$this, 'activate']);
        register_deactivation_hook(__FILE__, [$this, 'deactivate']);

        // Admin init
        add_action('admin_init', [$this, 'check_requirements']);
        add_action('admin_menu', [CTC\SmartHands\Settings::class, 'add_menu_pages']);
        add_action('admin_enqueue_scripts', [$this, 'enqueue_admin_assets']);

        // Plugin initialization
        add_action('plugins_loaded', [$this, 'init_plugin']);
    }

    /**
     * Plugin activation
     */
    public function activate(): void {
        // Check requirements
        if (version_compare(PHP_VERSION, '8.2', '<')) {
            deactivate_plugins(CTC_PLUGIN_BASENAME);
            wp_die('CTC Smart-Hands requires PHP 8.2 or higher. Please upgrade PHP.');
        }

        if (version_compare(get_bloginfo('version'), '6.6', '<')) {
            deactivate_plugins(CTC_PLUGIN_BASENAME);
            wp_die('CTC Smart-Hands requires WordPress 6.6 or higher. Please upgrade WordPress.');
        }

        // Create database tables
        CTC\SmartHands\Database::create_tables();

        // Initialize default settings
        CTC\SmartHands\Settings::init_defaults();

        // Flush rewrite rules (for REST API)
        flush_rewrite_rules();
    }

    /**
     * Plugin deactivation
     */
    public function deactivate(): void {
        // Flush rewrite rules
        flush_rewrite_rules();
    }

    /**
     * Check plugin requirements
     */
    public function check_requirements(): void {
        // Check PHP version
        if (version_compare(PHP_VERSION, '8.2', '<')) {
            add_action('admin_notices', function() {
                echo '<div class="error"><p><strong>CTC Smart-Hands:</strong> Requires PHP 8.2+. Current version: ' . PHP_VERSION . '</p></div>';
            });
            deactivate_plugins(CTC_PLUGIN_BASENAME);
            return;
        }

        // Check WordPress version
        if (version_compare(get_bloginfo('version'), '6.6', '<')) {
            add_action('admin_notices', function() {
                echo '<div class="error"><p><strong>CTC Smart-Hands:</strong> Requires WordPress 6.6+. Current version: ' . get_bloginfo('version') . '</p></div>';
            });
            deactivate_plugins(CTC_PLUGIN_BASENAME);
            return;
        }
    }

    /**
     * Initialize plugin components
     */
    public function init_plugin(): void {
        // Load text domain for translations
        load_plugin_textdomain('ctc-smart-hands', false, dirname(CTC_PLUGIN_BASENAME) . '/languages');

        // Initialize REST API
        CTC\SmartHands\REST_API::init();

        // Initialize notifications
        CTC\SmartHands\Notify::init();
    }

    /**
     * Enqueue admin assets
     * @param string $hook Current admin page hook
     */
    public function enqueue_admin_assets(string $hook): void {
        // Only load on our plugin pages
        if (strpos($hook, 'ctc-smart-hands') === false) {
            return;
        }

        // Admin CSS
        wp_enqueue_style(
            'ctc-admin',
            CTC_PLUGIN_URL . 'assets/css/admin.css',
            [],
            CTC_VERSION
        );
    }
}

// Initialize plugin
function ctc_smart_hands(): CTC_Smart_Hands {
    return CTC_Smart_Hands::get_instance();
}

// Kickoff!
ctc_smart_hands();
