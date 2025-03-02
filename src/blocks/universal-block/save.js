import { useBlockProps, RichText, InnerBlocks } from '@wordpress/block-editor';

export default function Save({ attributes }) {
    const { tag, content, predefinedAttributes, customAttributes, enableInnerBlocks } = attributes;

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
        className: `hbb-tag-${tag}`,
        ...predefinedAttributes,
        ...parsedAttributes,
    });

    return enableInnerBlocks ? (
        React.createElement(
            tag,
            blockProps,
            <InnerBlocks.Content />
        )
    ) : (
        <RichText.Content
            {...blockProps}
            tagName={tag}
            value={content}
        />
    );
}