<?php
/**
 * Usman Portfolio Theme Functions
 */

function usman_portfolio_setup() {
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'html5', array( 'search-form', 'comment-form', 'gallery', 'caption' ) );
    
    register_nav_menus( array(
        'primary' => __( 'Primary Navigation', 'usman-portfolio' ),
    ) );
}
add_action( 'after_setup_theme', 'usman_portfolio_setup' );

function usman_portfolio_enqueue() {
    // Google Fonts
    wp_enqueue_style(
        'google-fonts',
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap',
        array(),
        null
    );
    
    // Font Awesome
    wp_enqueue_style(
        'font-awesome',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css',
        array(),
        '6.5.0'
    );
    
    // Main stylesheet
    wp_enqueue_style(
        'usman-portfolio-style',
        get_stylesheet_uri(),
        array( 'google-fonts', 'font-awesome' ),
        '1.0.0'
    );
    
    // Main JS
    wp_enqueue_script(
        'usman-portfolio-main',
        get_template_directory_uri() . '/js/main.js',
        array(),
        '1.0.0',
        true
    );
    
    // Pendulum Pull-Cord JS
    wp_enqueue_script(
        'usman-portfolio-pendulum',
        get_template_directory_uri() . '/js/pendulum.js',
        array(),
        '1.0.0',
        true
    );
}
add_action( 'wp_enqueue_scripts', 'usman_portfolio_enqueue' );

// Remove admin bar on front end
add_filter( 'show_admin_bar', '__return_false' );

// Set page title
function usman_portfolio_title( $title ) {
    return $title;
}
