import { __ } from "@wordpress/i18n";
import { useBlockProps, RichText, InspectorControls } from "@wordpress/block-editor";
import { PanelBody, SelectControl, TextControl } from "@wordpress/components";
import { allowedTags, tagAttributes, attributes } from "./attributes";

const Edit = ({ attributes, setAttributes }) => {
    const { tag, predefinedAttributes, customAttributes, content, style = {} } = attributes;

    const blockProps = useBlockProps({
        className: `mgb-tag-${tag}`,
    });
    // const blockProps = useBlockProps({
    //     className: `mgb-${tag}`,
    //     as: tag,
    // });

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

    return (
        <>
            <InspectorControls>
                <PanelBody title={__("Block Settings", "mgb")}>
                    {/* Tag Selection */}
                    <SelectControl
                        label={__("HTML Tag", "mgb")}
                        value={tag}
                        options={tagOptions}
                        onChange={(value) => setAttributes({ tag: value })}
                    />

                    {/* Predefined Attributes Inputs */}
                    {tagAttributes[tag]?.map((attr) => (
                        <TextControl
                            key={attr}
                            label={__(`${attr} Attribute`, 'mgb')}
                            // label={attr.charAt(0).toUpperCase() + attr.slice(1)}
                            value={predefinedAttributes[attr] || ""}
                            onChange={(value) => handlePredefinedChange(attr, value)}
                        />
                    ))}

                    {/* Custom Attributes */}
                    <TextControl
                        label={__("Custom Attributes (comma-separated)", "mgb")}
                        help={__('Example: data-id=123, title="My Title"', 'mgb')}
                        value={customAttributes}
                        onChange={(value) => setAttributes({ customAttributes: value })}
                    />
                </PanelBody>
            </InspectorControls>

            <RichText
                // {...blockProps}
                tagName={tag}
                value={content}
                onChange={(value) => setAttributes({ content: value })}
                placeholder={__("Type something...", "mgb")}
                className={`mgb-tag-${tag}`}
                style={style} // Apply styles here
            />

        </>
    );
};

export default Edit;
