import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
    const { tag, customAttributes, attributes: customAttrs } = attributes;

    // Convert customAttributes string into an object
    const parseCustomAttributes = (customAttrString) => {
        const attributes = {};
        customAttrString.split(',').forEach((attr) => {
            const [key, value] = attr.split('=');
            if (key && value) {
                attributes[key.trim()] = value.trim().replace(/^"|"$/g, ''); // Remove surrounding quotes
            }
        });
        return attributes;
    };

    const parsedAttributes = parseCustomAttributes(customAttributes);

    const blockProps = useBlockProps.save({
        className: `hbb-container hbb-tag-${tag}`,
        ...customAttrs, // Predefined attributes
        ...parsedAttributes, // Custom attributes
    });

    return React.createElement(
        tag,
        blockProps,
        <InnerBlocks.Content />
    );
};

export default Save;