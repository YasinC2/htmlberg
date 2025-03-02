<?php
/*
Plugin Name: HTMLBerg
Description: HTML Tags as Gutenberg Blocks
Version: 1.0.0
Author: YasinC2
*/

if (!defined('ABSPATH')) {
    exit;
}

function hbb_enqueue_block_assets()
{
    wp_enqueue_script(
        'hbb-blocks-js',
        plugins_url('build/index.js', __FILE__),
        ['wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n']
    );

    wp_enqueue_style(
        'hbb-blocks-css',
        plugins_url('build/style.css', __FILE__)
    );
}
add_action('enqueue_block_editor_assets', 'hbb_enqueue_block_assets');
add_action('enqueue_block_assets', 'hbb_enqueue_block_assets');
