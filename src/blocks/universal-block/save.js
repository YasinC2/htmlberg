import { useBlockProps, RichText } from "@wordpress/block-editor";

const Save = ({ attributes }) => {
    const { tag, predefinedAttributes, customAttributes, content, style = {} } = attributes;

    const blockProps = useBlockProps.save({
        className: `mgb-tag-${tag}`,
        style: style, // Include styles here
    });

    // Convert custom attributes string into an object
    const customAttrsObject = customAttributes
        .split(/[|,]/)
        .map((attr) => attr.trim().split("="))
        .filter(([key, value]) => key && value)
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    // Merge predefined and custom attributes
    const finalAttributes = { ...predefinedAttributes, ...customAttrsObject };

    return (
        <RichText.Content
            tagName={tag}
            {...blockProps}
            {...finalAttributes}
            value={content}
        />
    );
};

export default Save;
