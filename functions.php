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

add_filter('script_loader_tag', 'load_as_ES6', 10, 3);

function load_as_ES6($tag, $handle, $source)
{
    if ('btg-script' === $handle) {
        $tag = '<script src="' . $source . '" type="module" ></script>';
    }
    return $tag;
};
