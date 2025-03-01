# FlexiSite Blocks

**FlexiSite Blocks** is a versatile WordPress plugin that enhances the Gutenberg editor with a collection of flexible, powerful blocks designed to simplify website building. Whether you’re creating custom layouts, managing dynamic content, or adding advanced functionality, FlexiSite Blocks has you covered. Built with developers and content creators in mind, this plugin offers a growing suite of tools for any website.

## Features

- **Universal Tag Block**: Render any HTML tag (e.g., `div`, `span`, `section`) with customizable attributes and WordPress styling support (colors, spacing, borders).  
- **Future Blocks (Planned)**:  
  - ACF Pro Repeater Query Loop: Display dynamic content from ACF repeaters with ease.  
  - Tab Container: Organize multi-section content in interactive tabs.  
  - More to come—stay tuned!  
- **Seamless Integration**: Leverages Gutenberg’s native styling options for consistent design in the editor and front-end.  
- **Extensible**: Modular architecture makes it easy to add new blocks and features.

## Installation

### Option 1: Download from GitHub
1. Download the latest release from the [GitHub Releases page](https://github.com/YasinC2/my-gutenberg-blocks/releases) or clone the repository:
   ```bash
   git clone https://github.com/YasinC2/my-gutenberg-blocks
   ```
2. Move the `flexisite-blocks` folder to your WordPress plugins directory (`wp-content/plugins/`).
3. Activate the plugin via the WordPress admin panel (**Plugins > Installed Plugins**).

### Option 2: Build from Source
See the [Building the Plugin](#building-the-plugin) section below to compile the plugin yourself.

## Usage

1. After activation, go to the WordPress block editor (Gutenberg).
2. Add the **FlexiSite Universal Block** (or other available blocks) from the block inserter.
3. Customize the block settings in the inspector panel:
   - **HTML Tag**: Choose the tag to render (e.g., `div`, `span`).
   - **Attributes**: Add predefined (e.g., `id`, `class`) or custom attributes (e.g., `data-id="123"`).
   - **Styling**: Use WordPress’s built-in options for colors, spacing, and borders.
4. Save your page and preview the front-end result.

## Building the Plugin

FlexiSite Blocks uses JavaScript (React) and PHP to deliver its functionality. To build the plugin from source, follow these steps:

### Prerequisites
- **Node.js** and **npm**: Ensure you have Node.js (version 16+ recommended) and npm installed. [Download here](https://nodejs.org/).
- **WordPress Environment**: A local or remote WordPress installation for testing.
- **Composer** (optional): For managing PHP dependencies, if added later.

### Setup
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/YasinC2/my-gutenberg-blocks
   cd flexisite-blocks
   ```

2. **Install Dependencies**:
   Run the following command to install JavaScript dependencies (e.g., `@wordpress/scripts`):
   ```bash
   npm install
   ```
   If you’ve added a `package.json` file (see below), this will set up the build tools.


### Build Process
1. **Compile the Blocks**:
   Use `@wordpress/scripts` to build the JavaScript files:
   ```bash
   npm run build
   ```
   - This compiles `src/edit.js` and `src/save.js` into a `build/` folder (e.g., `build/index.js`).

2. **Test Locally**:
   - Move the `flexisite-blocks` folder to your WordPress `wp-content/plugins/` directory.
   - Activate the plugin and test in the block editor.


## Contributing

We welcome contributions! To get involved:
1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes and push to your fork.
4. Open a pull request with a clear description of your changes.

Please follow WordPress coding standards for PHP and JavaScript.

## License

This plugin is licensed under the [GPLv2 or later](https://www.gnu.org/licenses/gpl-2.0.html), in line with WordPress.

## Roadmap

- Add ACF Pro Repeater Query Loop block.  
- Implement Tab Container block for multi-section content.  
- Expand with more utility blocks based on community feedback.

## Support

For issues, feature requests, or questions, please open an [issue on GitHub](https://github.com/YasinC2/my-gutenberg-blocks/issues).

