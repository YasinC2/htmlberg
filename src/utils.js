// Handle predefined attribute changes with sanitization
const handlePredefinedChange = (attr, value) => {
    const sanitizedValue = wp.dom.__unstableStripHTML(value || '');
    setAttributes({
        predefinedAttributes: {
            ...predefinedAttributes,
            [attr]: sanitizedValue
        },
    });
};

// Handle custom attributes change (store raw, sanitize on save)
const handleCustomAttributesChange = (value) => {
    setAttributes({
        customAttributes: value
    });
};

// Handle content change (store raw, sanitize on save)
const handleContentChange = (value) => {
    setAttributes({
        content: value
    });
};

export {
    handlePredefinedChange,
    handleCustomAttributesChange,
    handleContentChange
};