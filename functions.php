<?php

add_theme_support('post-thumbnails');
add_theme_support('title-tag');

if (function_exists('acf_add_options_page')) {
    acf_add_options_page(array(
        'page_title' => 'Theme General Settings',
        'menu_title' => 'Theme Settings',
        'menu_slug' => 'theme-general-settings',
        'capability' => 'edit_posts',
        'redirect' => false,
        'position' => '2'
    ));
}

register_nav_menus(array(
    'main-menu' => 'Menu Principal',
));

add_filter('show_admin_bar', '__return_false');
