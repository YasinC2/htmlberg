import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save({ attributes }) {
    const { tag, content, attributes: customAttrs, customAttributes } = attributes;

    // Convert customAttributes string into an object
    const parseCustomAttributes = (customAttrString) => {
        const attributes = {};
        customAttrString.split(',').forEach((attr) => {
            const [key, value] = attr.split('=');
            if (key && value) {
                attributes[key.trim()] = value.trim();
            }
        });
        return attributes;
    };

    const parsedAttributes = parseCustomAttributes(customAttributes);

    return (
        <RichText.Content
            {...useBlockProps.save()}
            tagName={tag}
            value={content}
            {...customAttrs} // Predefined attributes
            {...parsedAttributes} // Custom attributes
        />
    );
}
