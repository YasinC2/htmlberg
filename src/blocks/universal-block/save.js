import { useBlockProps, RichText, InnerBlocks } from '@wordpress/block-editor';
import { allowedTags, tagAttributes } from './attributes';

export default function Save({ attributes }) {
    const { tag, content, predefinedAttributes, customAttributes, enableInnerBlocks, value } = attributes;

    // Use wp.dom.safeHTML for content sanitization
    const sanitizedContent = enableInnerBlocks
        ? content
        : wp.dom.safeHTML(content, {
              allowedTags,
              allowedAttributes: {
                  ...tagAttributes,
                  '*': ['class', 'style', 'id', 'aria-*', 'data-*', 'role', 'tabindex']
              },
          });

    // Use wp.dom.__unstableStripHTML for value sanitization
    const sanitizedValue = wp.dom.__unstableStripHTML(value || '');

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

    const blockProps = useBlockProps.save({
        className: `hbb-tag-${tag}`,
        ...sanitizedPredefinedAttributes,
        ...parsedAttributes,
    });

    return enableInnerBlocks ? (
        React.createElement(
            tag,
            blockProps,
            <InnerBlocks.Content />
        )
    ) : (
        ['input', 'meter', 'progress', 'option', 'button'].includes(tag) ? (
            React.createElement(
                tag,
                {
                    ...blockProps,
                    value: sanitizedValue || '',
                }
            )
        ) : (
            <RichText.Content
                {...blockProps}
                tagName={tag}
                value={sanitizedContent}
            />
        )
    );
}