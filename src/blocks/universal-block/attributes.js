const allowedTags = ["div", "section", "article", "header", "footer", "aside", "main", "nav", "a", "span", "b", "strong", "i", "em", "u", "sub", "sup"];

const tagAttributes = {
    a: ["id", "href", "target", "rel"],
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
    sup: ["id"]
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
    }
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