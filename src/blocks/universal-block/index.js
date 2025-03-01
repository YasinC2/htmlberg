import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import Edit from './edit';
import Save from './save';
import { attributes, supports } from "./attributes";
import './style.css';

registerBlockType("mgb/universal-block", {
    title: __("Universal Block", "mgb"),
    category: "mgb-blocks",
    icon: "admin-generic",
    "description": "A description of your block.",
    attributes,
    supports,
    "editorStyle": "file:./editor.css",
    edit: Edit,
    save: Save,
});
