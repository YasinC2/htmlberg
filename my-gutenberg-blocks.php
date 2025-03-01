<?php
/*
Plugin Name: My Gutenberg Blocks
Description: Custom Gutenberg Blocks Plugin
Version: 1.0.0
Author: Radman
*/

if (!defined('ABSPATH')) {
    exit;
}

function mgb_enqueue_block_assets()
{
    wp_enqueue_script(
        'mgb-blocks-js',
        plugins_url('build/index.js', __FILE__),
        ['wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n']
    );

    wp_enqueue_style(
        'mgb-blocks-css',
        plugins_url('build/style.css', __FILE__)
    );
}
add_action('enqueue_block_editor_assets', 'mgb_enqueue_block_assets');
add_action('enqueue_block_assets', 'mgb_enqueue_block_assets');
