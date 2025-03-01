import {
    registerBlockType
} from '@wordpress/blocks';
import './style.css';
import Edit from './edit';
import Save from './save';
import metadataTextTag from './block.json';

registerBlockType(metadataTextTag.name, {
    ...metadataTextTag,
    edit: Edit,
    save: Save,
});