# Change Log

All notable changes to the "locopy" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [0.1.0] - 2025-06-22

### Changed
- **BREAKING**: Migrated from simple variable templates to Handlebars templating system
- Template syntax changed from `%variable` to `{{variable}}` format
- Line numbers now provided as separate `startLine` and `endLine` variables instead of combined `lineNumber`
- Updated default format templates to use new Handlebars syntax
- Enhanced template system with conditional logic and helper functions

### Added
- Handlebars templating engine for powerful format customization
- Helper functions: `replace` for regex replacement, `encodeURIComponent` for URL encoding
- Conditional template logic support (e.g., `{{#if endLine}}`)
- Comprehensive test suite for template functionality
- Improved error handling for malformed templates

### Migration Guide
If you have custom formats in your settings, update them as follows:

**Old format (no longer supported):**
```json
{
  "name": "Path with line",
  "format": "%r:%l"
}
```

**New format:**
```json
{
  "name": "Path with line",
  "format": "{{relativePath}}:{{startLine}}{{#if endLine}}-{{endLine}}{{/if}}"
}
```

**Variable mapping:**
- `%p` → `{{absolutePath}}`
- `%r` → `{{relativePath}}`
- `%n` → `{{fileName}}`
- `%s` → `{{selectedText}}`
- `%l` → `{{startLine}}{{#if endLine}}-{{endLine}}{{/if}}`
- `%%` → No longer needed (use literal `%` character)

## [Unreleased]

## [0.0.7] - 2025-06-21

### Fixed
- Add .github/ to .vscodeignore to exclude CI/CD files from extension package
- Reduce package size by excluding unnecessary GitHub Actions workflows

## [0.0.6] - 2025-06-21

### Changed
- Removed GitHub Discussions reference from CONTRIBUTING.md
- Simplified support channels to focus on GitHub Issues

## [0.0.5] - 2025-06-21

### Changed
- Reordered default formats to prioritize relative path (more common use case)
- Relative path with line number is now the first/default format
- Absolute path with line number is now the second format

## [0.0.4] - 2025-06-21

### Added
- Extension icon for better visibility in VS Code Marketplace

## [0.0.3] - 2025-06-21

### Changed
- Improved CONTRIBUTING.md release process with git push step
- Simplified release workflow by removing draft requirement

## [0.0.2] - 2025-06-21

### Added
- CONTRIBUTING.md with development setup, guidelines, and release process
- Contributing section in README.md

## [0.0.1] - 2025-06-21

### Added
- Custom format configuration with template variables
- Template variable system supporting:
  - `%p` - Absolute file path
  - `%r` - Relative path from workspace root
  - `%s` - Selected text
  - `%n` - Filename only
  - `%l` - Line number(s) with smart multi-line detection
  - `%%` - Escaped % character
- Smart line number detection for single line, multi-line, and cursor-only selections
- Two copy commands:
  - "Copy with Format Selection" - Choose from configured formats
  - "Copy Quick (First Format)" - Instant copy using first format
- Configurable success notifications (`locopy.showSuccessMessage`)
- Default format presets:
  - Path with line number (`%p:%l`)
  - Relative path with line number (`%r:%l`)
  - Markdown link with selection (`[%s](%r)`)

### Features
- Commands appear in Command Palette under "Locopy:" category
- Workspace-aware relative path calculation
- Proper handling of multi-line selections ending at line start