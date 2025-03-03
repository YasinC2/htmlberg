import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const allowedTags = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
const tagAttributes = {
    p: ['id'],
    h1: ['id'],
    h2: ['id'],
    h3: ['id'],
    h4: ['id'],
    h5: ['id'],
    h6: ['id'],
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

    const blockProps = useBlockProps({
        className: `hbb-tag-${tag}`,
    });

    return (
        <>
            {/* Sidebar Settings */}
            <InspectorControls>
                <PanelBody title={__('Block Text Tag Settings', 'hbb')}>
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
                onChange={handleContentChange}
                placeholder={__('Enter text...', 'hbb')}
                className={`hbb-tag-${tag}`}
            />
        </>
    );
}
