import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
    const { tag, customAttributes, attributes: predefinedAttributes } = attributes;

    // Convert and sanitize customAttributes string into an object
    const parseCustomAttributes = (customAttrString) => {
        const attributes = {};
        const unsafeAttributes = ['onload', 'onclick', 'onerror', 'onmouseover', 'onfocus', 'onblur'];

        customAttrString.split(',').forEach((attr) => {
            const [key, value] = attr.split('=');
            if (key && value) {
                const trimmedKey = key.trim();
                if (unsafeAttributes.includes(trimmedKey) || trimmedKey.match(/^on[a-z]+$/i)) {
                    return;
                }
                let sanitizedValue = wp.dom.__unstableStripHTML(value.trim().replace(/^"|"$/g, ''));
                if (trimmedKey === 'style' || trimmedKey === 'src' || trimmedKey === 'href') {
                    sanitizedValue = sanitizedValue.replace(/javascript:/gi, '');
                }
                attributes[trimmedKey] = sanitizedValue;
            }
        });
        return attributes;
    };

    const parsedAttributes = parseCustomAttributes(customAttributes);

    // Sanitize predefined attributes
    const sanitizedPredefinedAttributes = Object.fromEntries(
        Object.entries(predefinedAttributes).map(([key, value]) => {
            let sanitizedValue = wp.dom.__unstableStripHTML(value || '');
            if (key === 'style' || key === 'src' || key === 'href') {
                sanitizedValue = sanitizedValue.replace(/javascript:/gi, '');
            }
            return [key, sanitizedValue];
        })
    );

    const blockProps = useBlockProps.save({
        className: `hbb-container hbb-tag-${tag}`,
        ...sanitizedPredefinedAttributes, // Predefined attributes
        ...parsedAttributes, // Custom attributes
    });

    return React.createElement(
        tag,
        blockProps,
        <InnerBlocks.Content />
    );
};

export default Save;