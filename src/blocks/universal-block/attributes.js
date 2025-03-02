const allowedTags = ["div", "section", "article", "header", "footer", "aside", "main", "nav", "a", 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', "span", "b", "strong", "i", "em", "u", "sub", "sup", "ul", "ol", "li", "blockquote", "figure", "figcaption", "code", "button", "time", "picture", "img", "source", "progress", "meter", "canvas", "form", "input", "textarea", "label", "select", "option", "fieldset", "legend", "table", "th", "tr", "td"];

const tagAttributes = {
    a: ["id", "href", "target", "rel"],
    img: ['src', 'alt', 'width', 'height'],
    source: ['src', 'media', 'sizes', 'srcset', 'type'],
    picture: ['id'],
    div: ["id"],
    section: ["id"],
    article: ["id"],
    header: ["id"],
    footer: ["id"],
    aside: ["id"],
    main: ["id"],
    nav: ["id"],
    span: ["id"],
    b: ["id"],
    strong: ["id"],
    i: ["id"],
    em: ["id"],
    u: ["id"],
    sub: ["id"],
    sup: ["id"],
    p: ['id'],
    h1: ['id'],
    h2: ['id'],
    h3: ['id'],
    h4: ['id'],
    h5: ['id'],
    h6: ['id'],
    ul: ['id'],
    ol: ['id'],
    li: ['id'],
    blockquote: ['id', 'cite'],
    figcaption: ['id'],
    figure: ['id'],
    code: ['id'],
    time: ['id', 'datetime'],
    progress: ['id', 'max', 'value'],
    meter: ['id', "value", "low", "high", "min", 'max'],
    canvas: ['id', 'height', 'width'],
    button: ['id', 'name', 'disabled', 'type', 'value'],
    form: ['id', 'action', 'method'],
    input: ['id', 'name', 'type', 'value', 'required', 'readonly', 'disabled', 'checked', 'placeholder'],
    textarea: ['id', 'name', 'cols', 'rows', 'placeholder', 'required', 'readonly', 'disabled'],
    label: ['id', 'for'],
    select: ['id', 'name', 'required', 'disabled', 'multiple', 'size'],
    option: ['id', 'value', 'selected', 'label', 'disabled'],
    fieldset: ['id', 'name', 'disabled'],
    legend: ['id', 'height', 'width'],
};

const attributes = {
    tag: {
        type: "string",
        default: "div"
    },
    predefinedAttributes: {
        type: "object",
        default: {}
    },
    customAttributes: {
        type: "string",
        default: ""
    },
    content: {
        type: "string",
        default: ""
    },
    "style": {
        "type": "object",
        "default": {}
    },
    enableInnerBlocks: {
        type: 'boolean',
        default: false,
    },
};

const supports = {
    "align": true,
    "spacing": {
        "margin": true,
        "padding": true,
        "blockGap": true
    },
    "color": {
        "gradients": true,
        "background": true,
        "text": true,
        "link": true,
        "button": true,
        "enableContrastChecker": true
    },
    "typography": {
        "fontSize": true,
        "lineHeight": true,
        "textAlign": true,
        "__experimentalFontFamily": true,
        "__experimentalFontWeight": true,
        "__experimentalFontStyle": true,
        "__experimentalTextTransform": true,
        "__experimentalTextDecoration": true,
        "__experimentalLetterSpacing": true,
        "__experimentalDefaultControls": {
            "fontSize": true
        }
    },
    "__experimentalBorder": {
        "color": true,
        "radius": true,
        "style": true,
        "width": true,
        "__experimentalDefaultControls": {
            "color": true,
            "radius": true,
            "style": true,
            "width": true
        }
    },
    "background": {
        "backgroundImage": true,
        "backgroundSize": true,
        "__experimentalDefaultControls": {
            "backgroundImage": true
        }
    },
    "shadow": true,
    "dimensions": {
        "minHeight": true
    },
    "layout": true,
    "anchor": true,
    "alignWide": true,
    "ariaLabel": true,
    "html": false
};

export {
    allowedTags,
    tagAttributes,
    attributes,
    supports
};