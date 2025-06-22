# Contributing to Locopy

Thank you for your interest in contributing to Locopy! This VS Code extension helps developers copy file paths and line numbers in customizable formats.

## Prerequisites

- **Node.js 22.x** or later
- **VS Code** for testing the extension
- **Git** for version control

## Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/f440/locopy.git
   cd locopy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Compile TypeScript**
   ```bash
   npm run compile
   ```

4. **Open in VS Code**
   ```bash
   code .
   ```

5. **Test the extension**
   - Press `F5` to open a new VS Code window with the extension loaded
   - Test the commands: `Ctrl+Shift+P` → "Locopy:"

## Development Commands

- `npm run compile` - Compile TypeScript to JavaScript
- `npm run watch` - Watch for changes and auto-compile
- `npm run lint` - Run ESLint
- `npm run pretest` - Run lint and compile (used in CI)
- `npm test` - Run full test suite (requires GUI environment)

## Feature Development

### Before You Start

1. Check existing [issues](https://github.com/f440/locopy/issues) and [pull requests](https://github.com/f440/locopy/pulls)
2. Create an issue to discuss major changes
3. Fork the repository and create a feature branch

### Development Guidelines

1. **Follow existing code style**
   - Use ESLint configuration
   - Follow TypeScript best practices
   - Match existing naming conventions

2. **Test your changes**
   - Use `F5` to launch extension host for testing
   - Test all affected commands and configurations
   - Verify both single-line and multi-line selections

3. **Update documentation**
   - Update README.md if adding user-facing features
   - Add JSDoc comments for new functions
   - Update configuration schema descriptions

4. **Update CHANGELOG.md**
   - **REQUIRED**: Add your changes to the `## [Unreleased]` section
   - Use format: `- Description of change (#PR-number)`
   - Categories: `Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, `Security`

### Pull Request Process

1. Create a pull request with:
   - Clear title describing the change
   - Description of what was changed and why
   - Reference to related issues

2. Ensure CI passes:
   - All linting checks pass
   - TypeScript compiles without errors
   - No breaking changes to existing functionality

## Architecture Overview

### Key Files

- `src/extension.ts` - Main extension logic and command handlers
- `package.json` - Extension manifest and configuration schema
- `.github/workflows/` - CI/CD automation

### Template System

The extension uses Handlebars templating for flexible format customization:

**Variables:**
- `{{absolutePath}}` - Absolute file path
- `{{relativePath}}` - Relative path from workspace root
- `{{fileName}}` - Filename only
- `{{selectedText}}` - Selected text
- `{{startLine}}` - Starting line number
- `{{endLine}}` - Ending line number (for multi-line selections)

**Helper Functions:**
- `{{replace "pattern" "replacement" string}}` - Regular expression replacement
- `{{encodeURIComponent string}}` - URL encoding

To extend this system:
1. Add new helper functions in `registerHandlebarsHelpers()` function
2. Update configuration schema description
3. Add examples to README.md
4. Write tests for new functionality

### Configuration Schema

Extension settings are defined in `package.json` under `contributes.configuration`. When adding new settings:
1. Define the JSON schema
2. Add TypeScript interfaces in `extension.ts`
3. Update README.md with usage examples

## Release Process (Maintainers)

### Preparing a Release

1. **Update CHANGELOG.md**
   ```bash
   # Change from:
   ## [Unreleased]
   ### Added
   - New feature (#123)
   
   # To:
   ## [0.0.2] - 2025-06-22
   ### Added
   - New feature (#123)
   
   ## [Unreleased]
   ```

2. **Update package.json version**
   ```bash
   npm version patch  # for bug fixes
   npm version minor  # for new features
   npm version major  # for breaking changes
   ```

3. **Commit and push changes**
   ```bash
   git add CHANGELOG.md package.json package-lock.json
   git commit -m "Prepare release v0.0.2"
   git push origin main
   ```

### Creating a Release

4. **Create release**
   ```bash
   # Extract release notes from CHANGELOG.md
   gh release create v0.0.2 --notes "
   ### Added
   - New feature description
   
   ### Fixed  
   - Bug fix description
   "
   ```

5. **Automatic publishing**
   - GitHub Actions will automatically publish to VS Code Marketplace
   - Monitor the Actions tab for publishing status

### Automatic Publishing

- Tags matching `v*` pattern trigger automatic publishing
- CI runs tests before publishing
- Requires `VSCE_PAT` secret in repository settings
- Publishing only happens after manual release approval on GitHub

## Getting Help

- **Issues**: Report bugs or request features in [GitHub Issues](https://github.com/f440/locopy/issues)
- **VS Code Extension API**: Refer to [VS Code Extension API](https://code.visualstudio.com/api)

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/). Please be respectful and inclusive in all interactions.

---

Thank you for contributing to Locopy! 🚀