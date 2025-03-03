export const sanitizeHTML = (input) => {
    const element = document.createElement('div');
    element.innerText = input;
    return element.innerHTML;
};

export const escapeHTML = (input) => {
    return input.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
};

// New function to sanitize input only once per change event
export const sanitizeOnce = (input) => {
    const element = document.createElement('div');
    element.innerText = input;
    const sanitized = element.innerHTML;

    // Check if the input was already sanitized
    if (sanitized === input) {
        return input;
    }

    return sanitized;
};