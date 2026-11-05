<?php
/**
 * Template Name: Home
 */
get_header(); ?>
<!-- This template redirects to index.php for single-page portfolio -->
<?php
wp_redirect(home_url('/'));
exit;
