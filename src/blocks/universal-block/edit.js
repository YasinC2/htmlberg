import { __ } from "@wordpress/i18n";
import { RichText, InspectorControls, InnerBlocks, BlockControls } from "@wordpress/block-editor";
import { PanelBody, SelectControl, TextControl, ToggleControl, ToolbarGroup, ToolbarButton } from "@wordpress/components";
import { useEffect } from "@wordpress/element";
import { allowedTags, tagAttributes } from "./attributes";
// import { handlePredefinedChange, handleCustomAttributesChange, handleContentChange } from "../../utils";

const Edit = ({ attributes, setAttributes, clientId }) => {
    const { tag, predefinedAttributes, customAttributes, content, enableInnerBlocks, value, style = {} } = attributes;

    // Convert tag options for dropdown using allowedTags from attributes.js
    const tagOptions = allowedTags.map((t) => ({
        label: `<${t}>`,
        value: t,
    }));

    // Handle predefined attribute changes with sanitization
    const handlePredefinedChange = (attr, value) => {
        const sanitizedValue = wp.dom.__unstableStripHTML(value || '');
        setAttributes({
            predefinedAttributes: { ...predefinedAttributes, [attr]: sanitizedValue },
        });
    };

    // Handle custom attributes change (store raw, sanitize on save)
    const handleCustomAttributesChange = (value) => {
        setAttributes({ customAttributes: value });
    };

    // Handle content change (store raw, sanitize on save)
    const handleContentChange = (value) => {
        setAttributes({ content: value });
    };

    // Clear inner blocks when enableInnerBlocks is toggled off
    useEffect(() => {
        if (!enableInnerBlocks) {
            const { innerBlocks } = wp.data.select('core/block-editor').getBlock(clientId);
            if (innerBlocks.length > 0) {
                wp.data.dispatch('core/block-editor').replaceInnerBlocks(clientId, []);
            }
        }
    }, [enableInnerBlocks, clientId]);

    // Ensure the value attribute is set for form elements
    useEffect(() => {
        if (['input', 'meter', 'progress', 'option', 'button'].includes(tag)) {
            const sanitizedValue = wp.dom.__unstableStripHTML(predefinedAttributes.value || '');
            setAttributes({ value: sanitizedValue });
        } else {
            setAttributes({ value: '' }); // Clear value for non-form tags
        }
    }, [tag, predefinedAttributes.value]);

    return (
        <>
            <InspectorControls>
                <PanelBody title={__("Block Settings", "hbb")}>
                    <SelectControl
                        label={__("HTML Tag", "hbb")}
                        value={tag}
                        options={tagOptions}
                        onChange={(value) => setAttributes({ tag: value })}
                    />
                    {tagAttributes[tag]?.map((attr) => (
                        <TextControl
                            key={attr}
                            label={__(`${attr} Attribute`, 'hbb')}
                            value={predefinedAttributes[attr] || ""}
                            onChange={(value) => handlePredefinedChange(attr, value)}
                        />
                    ))}
                    <TextControl
                        label={__("Custom Attributes (comma-separated)", "hbb")}
                        help={__('Example: data-id=123, title="My Title"', 'hbb')}
                        value={customAttributes}
                        onChange={handleCustomAttributesChange}
                    />
                    <ToggleControl
                        label={__("Enable InnerBlocks", "hbb")}
                        help={__('Enable this option to allow adding other blocks inside this block.', 'hbb')}
                        checked={enableInnerBlocks}
                        onChange={(value) => setAttributes({ enableInnerBlocks: value })}
                    />
                </PanelBody>
            </InspectorControls>

            <BlockControls>
                <ToolbarGroup>
                    <ToolbarButton>
                        {__("HTML Tag: ", "hbb")}{tag}
                    </ToolbarButton>
                </ToolbarGroup>
            </BlockControls>

            {enableInnerBlocks ? (
                React.createElement(
                    tag,
                    {
                        className: `hbb-tag-${tag}`,
                    },
                    <InnerBlocks />
                )
            ) : (
                ['input', 'meter', 'progress', 'option', 'button'].includes(tag) ? (
                    React.createElement(
                        tag,
                        {
                            className: `hbb-tag-${tag}`,
                            value: predefinedAttributes.value || '',
                        }
                    )
                ) : (
                    <RichText
                        tagName={tag}
                        value={content}
                        onChange={handleContentChange}
                        placeholder={__("Type something...", "hbb")}
                        className={`hbb-tag-${tag}`}
                        style={style}
                    />
                )
            )}
        </>
    );
};

export default Edit;