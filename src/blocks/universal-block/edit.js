import { __ } from "@wordpress/i18n";
import { useBlockProps, RichText, InspectorControls, InnerBlocks, BlockControls } from "@wordpress/block-editor";
import { PanelBody, SelectControl, TextControl, ToggleControl, ToolbarGroup, ToolbarButton } from "@wordpress/components";
import { useEffect } from "@wordpress/element";
import { allowedTags, tagAttributes } from "./attributes";

const Edit = ({ attributes, setAttributes, clientId }) => {
    const { tag, predefinedAttributes, customAttributes, content, enableInnerBlocks } = attributes;

    const blockProps = useBlockProps({
        className: `hbb-tag-${tag}`,
    });

    // Convert tag options for dropdown
    const tagOptions = allowedTags.map((t) => ({
        label: `<${t}>`,
        value: t,
    }));

    // Function to handle predefined attribute changes
    const handlePredefinedChange = (attr, value) => {
        setAttributes({
            predefinedAttributes: { ...predefinedAttributes, [attr]: value }
        });
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

    return (
        <>
            <InspectorControls>
                <PanelBody title={__("Block Settings", "hbb")}>
                    {/* Tag Selection */}
                    <SelectControl
                        label={__("HTML Tag", "hbb")}
                        value={tag}
                        options={tagOptions}
                        onChange={(value) => setAttributes({ tag: value })}
                    />

                    {/* Predefined Attributes Inputs */}
                    {tagAttributes[tag]?.map((attr) => (
                        <TextControl
                            key={attr}
                            label={__(`${attr} Attribute`, 'hbb')}
                            // label={attr.charAt(0).toUpperCase() + attr.slice(1)}
                            value={predefinedAttributes[attr] || ""}
                            onChange={(value) => handlePredefinedChange(attr, value)}
                        />
                    ))}

                    {/* Custom Attributes */}
                    <TextControl
                        label={__("Custom Attributes (comma-separated)", "hbb")}
                        help={__('Example: data-id=123, title="My Title"', 'hbb')}
                        value={customAttributes}
                        onChange={(value) => setAttributes({ customAttributes: value })}
                    />
                    
                    {/* Toggle InnerBlocks */}
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
                        // ...blockProps,
                        className: `hbb-tag-${tag}`,
                    },
                    <InnerBlocks />
                )
            ) : (
                <RichText
                    tagName={tag}
                    value={content}
                    onChange={(value) => setAttributes({ content: value })}
                    placeholder={__("Type something...", "hbb")}
                    className={`hbb-tag-${tag}`}
                />
            )}

        </>
    );
};

export default Edit;
