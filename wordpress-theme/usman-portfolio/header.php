<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Syed Usman Fazal - Odoo Developer & Web Developer based in Rawalpindi, Pakistan. Expert in Odoo customization, Python, WordPress, and ERP solutions.">
    <meta name="author" content="Syed Usman Fazal">
    
    <!-- Open Graph -->
    <meta property="og:title" content="Syed Usman Fazal | Odoo & Web Developer">
    <meta property="og:description" content="Odoo Developer with 2+ years of experience in ERP solutions, module development, and web technologies.">
    <meta property="og:type" content="website">
    
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>

<!-- Pendulum Pull-Cord -->
<canvas id="pendulum-canvas"></canvas>

<!-- Navigation -->
<header class="site-header" id="site-header">
    <nav class="nav-container">
        <a href="#hero" class="nav-logo">Usman<span>.</span></a>
        
        <ul class="nav-menu" id="nav-menu">
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#education">Education</a></li>
            <li><a href="#contact" class="nav-cta">Hire Me</a></li>
        </ul>
        
        <button class="hamburger" id="hamburger" aria-label="Menu">
            <span></span>
            <span></span>
            <span></span>
        </button>
    </nav>
</header>

<!-- Mobile Menu -->
<div class="mobile-menu-overlay" id="mobile-menu">
    <button class="mobile-close" id="mobile-close" aria-label="Close">✕</button>
    <ul class="mobile-nav-menu">
        <li><a href="#about" class="mobile-nav-link">About</a></li>
        <li><a href="#skills" class="mobile-nav-link">Skills</a></li>
        <li><a href="#experience" class="mobile-nav-link">Experience</a></li>
        <li><a href="#projects" class="mobile-nav-link">Projects</a></li>
        <li><a href="#education" class="mobile-nav-link">Education</a></li>
        <li><a href="#contact" class="mobile-nav-link">Contact</a></li>
    </ul>
</div>
