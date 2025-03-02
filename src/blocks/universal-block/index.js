import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import Edit from './edit';
import Save from './save';
import { attributes, supports } from "./attributes";
import './style.css';

registerBlockType("hbb/universal-block", {
    title: __("Universal Block", "hbb"),
    category: "hbb-blocks",
    icon: "admin-generic",
    "description": "All the HTML tags available in HTMLBerg and more, in one block.",
    attributes,
    supports,
    "editorStyle": "file:./editor.css",
    edit: Edit,
    save: Save,
});
