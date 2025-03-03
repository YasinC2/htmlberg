import { RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const allowedTags = ['span', 'b', 'strong', 'i', 'em', 'u', 'a', 'sub', 'sup'];
const tagAttributes = {
    a: ['id', 'href', 'target', 'rel'],
    span: ['id'],
    b: ['id'],
    strong: ['id'],
    i: ['id'],
    em: ['id'],
    u: ['id'],
    sub: ['id'],
    sup: ['id']
};

export default function Edit({ attributes, setAttributes }) {
    const { tag, content, attributes: customAttrs, customAttributes } = attributes;

    // Update predefined attributes with sanitization
    const updateCustomAttribute = (attr, value) => {
        const sanitizedValue = wp.dom.__unstableStripHTML(value || '');
        setAttributes({ attributes: { ...customAttrs, [attr]: sanitizedValue } });
    };

    // Handle custom attributes change (store raw, sanitize on save)
    const handleCustomAttributesChange = (value) => {
        setAttributes({ customAttributes: value });
    };

    // Handle content change (store raw, sanitize on save)
    const handleContentChange = (value) => {
        setAttributes({ content: value });
    };

    return (
        <>
            {/* Sidebar Settings */}
            <InspectorControls>
                <PanelBody title={__('Inline Text Tag Settings', 'hbb')}>
                    <SelectControl
                        label={__('Select HTML Tag', 'hbb')}
                        value={tag}
                        options={allowedTags.map((t) => ({
                            label: `<${t}>`,
                            value: t,
                        }))}
                        onChange={(newTag) => setAttributes({ tag: newTag, attributes: {} })}
                    />
                    
                    {/* Show attribute fields dynamically */}
                    {tagAttributes[tag] &&
                        tagAttributes[tag].map((attr) => (
                            <TextControl
                                key={attr}
                                label={__(`${attr} Attribute`, 'hbb')}
                                value={customAttrs[attr] || ''}
                                onChange={(value) => updateCustomAttribute(attr, value)}
                            />
                        ))}

                    {/* Custom Attributes Field */}
                    <TextControl
                        label={__('Custom Attributes (comma-separated)', 'hbb')}
                        help={__('Example: data-id=123, title="My Title"', 'hbb')}
                        value={customAttributes}
                        onChange={handleCustomAttributesChange}
                    />
                </PanelBody>
            </InspectorControls>

            {/* Block Editor */}
            <RichText
                tagName={tag}
                value={content}
                allowedFormats={['core/bold', 'core/italic']}
                onChange={handleContentChange}
                placeholder={__('Enter text...', 'hbb')}
                className={`hbb-tag-${tag}`}
            />
        </>
    );
}
