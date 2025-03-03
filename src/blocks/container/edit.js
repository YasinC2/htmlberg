import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const allowedTags = ['div', 'section', 'article', 'header', 'footer', 'aside', 'main', 'nav', 'a'];
const tagAttributes = {
    a: ['id', 'href', 'target', 'rel'],
    div: ['id'],
    section: ['id'],
    article: ['id'],
    header: ['id'],
    footer: ['id'],
    aside: ['id'],
    main: ['id'],
    nav: ['id']
};

const Edit = ({ attributes, setAttributes }) => {
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
            <InspectorControls>
                <PanelBody title={__('Container Tag Settings', 'hbb')} initialOpen={true}>
                    <SelectControl
                        label={__('Select HTML Tag', 'hbb')}
                        value={tag}
                        options={allowedTags.map((t) => ({
                            label: `<${t}>`,
                            value: t,
                        }))}
                        onChange={(value) => setAttributes({ tag: value, attributes: {} })}
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

            {/* Render the selected HTML tag dynamically */}
            {React.createElement(
                tag,
                {
                    className: `hbb-container hbb-tag-${tag}`,
                },
                <InnerBlocks />
            )}
        </>
    );
};

export default Edit;
