# HTMLBerg

**HTML Tags as Gutenberg Blocks**

**HTMLBerg** is a WordPress plugin that brings the power of HTML tags to the Gutenberg editor. Create and customize any HTML tag as a block, with full support for WordPress styling options like colors, spacing, and borders. Perfect for developers and content creators who want precise control over their markup within the block editor.

## Features

- **Universal Tag Block**: Render any HTML tag (e.g., `div`, `span`, `section`) with custom attributes and native Gutenberg styling.  
- **Lightweight & Focused**: Designed exclusively for HTML tag blocks, keeping it simple and efficient.  
- **Seamless Styling**: Matches editor and front-end appearances using WordPress’s built-in style supports.

## Installation

### Option 1: Download from GitHub
1. Download the latest release from the [GitHub Releases page](https://github.com/YasinC2/htmlberg/releases) or clone the repository:
   ```bash
   git clone https://github.com/YasinC2/htmlberg.git
   ```
2. Move the `htmlberg` folder to your WordPress plugins directory (`wp-content/plugins/`).
3. Activate the plugin via the WordPress admin panel (**Plugins > Installed Plugins**).

### Option 2: Build from Source
See the [Building the Plugin](#building-the-plugin) section below to compile the plugin yourself.

## Usage

1. After activation, open the WordPress block editor (Gutenberg).
2. Add the **HTMLBerg Universal Block** from the block inserter.
3. Customize the block in the inspector panel:
   - **HTML Tag**: Select the tag to render (e.g., `div`, `span`).  
   - **Attributes**: Add predefined (e.g., `id`, `class`) or custom attributes (e.g., `data-id="123"`).  
   - **Styling**: Use Gutenberg’s built-in options for colors, spacing, and borders.
4. Save your page and check the front-end result.

## Security and Risks
HTMLBerg offers powerful flexibility, including support for form elements and custom attributes, but this comes with security responsibilities. We’ve implemented sanitization (e.g., `wp.dom.safeHTML`, `__unstableStripHTML`) to mitigate risks like XSS, but improper use—especially with functional forms—could expose vulnerabilities (e.g., CSRF, phishing). For a detailed breakdown of risks, safe usage guidelines, and form element considerations, see our [Full Documentation](https://github.com/YasinC2/htmlberg/wiki).

## Building the Plugin

HTMLBerg uses JavaScript (React) and PHP to deliver its functionality. To build it from source, follow these steps:

### Prerequisites
- **Node.js** and **npm**: Install Node.js (version 16+ recommended) and npm. [Download here](https://nodejs.org/).  
- **WordPress Environment**: A local or remote WordPress installation for testing.

### Setup
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/YasinC2/htmlberg.git
   cd htmlberg
   ```

2. **Install Dependencies**:
   Run this command to install JavaScript dependencies:
   ```bash
   npm install
   ```


### Build Process
1. **Compile the Blocks**:
   Use `@wordpress/scripts` to build the JavaScript:
   ```bash
   npm run build
   ```
   - This compiles `src/edit.js` and `src/save.js` into a `build/` folder (e.g., `build/index.js`).

2. **Test Locally**:
   - Move the `htmlberg` folder to your WordPress `wp-content/plugins/` directory.  
   - Activate the plugin and test in the block editor.


## Contributing

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a branch for your changes.
3. Commit and push your changes, then open a pull request.

Follow WordPress coding standards for PHP and JavaScript.

## License

Licensed under the [GPLv2 or later](https://www.gnu.org/licenses/gpl-2.0.html), per WordPress guidelines.

## Support

For issues or suggestions, open an [issue on GitHub](https://github.com/YasinC2/htmlberg/issues).
