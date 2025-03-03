import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save({ attributes }) {
    const { tag, content, attributes: predefinedAttributes, customAttributes } = attributes;

    // Convert customAttributes string into an object
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

    // Use wp.dom.safeHTML for content sanitization
    const sanitizedContent = wp.dom.safeHTML(content, {
        allowedTags: ['span', 'b', 'strong', 'i', 'em', 'u', 'a', 'sub', 'sup'],
        allowedAttributes: {
            '*': ['class', 'style', 'id', 'aria-*', 'data-*', 'role', 'tabindex'],
            'a': ['href', 'target', 'rel'],
        },
    });

    return (
        <RichText.Content
            {...useBlockProps.save()}
            tagName={tag}
            value={sanitizedContent}
            {...sanitizedPredefinedAttributes} // Predefined attributes
            {...parsedAttributes} // Custom attributes
        />
    );
}
