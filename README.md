# Locopy

Your handy tool for copying code locations with line numbers in VS Code.

## Features

Locopy allows you to copy file paths, line numbers, and selected text in customizable formats. Perfect for code reviews, documentation, or sharing code references.

### Key Features

- **Handlebars Template Support**: Configure custom copy formats using powerful Handlebars templating
- **Smart Line Number Detection**: Automatically handles single line, multi-line, and cursor-only selections
- **Flexible Path Options**: Choose between absolute paths, relative paths, or just filenames
- **Helper Functions**: Built-in helpers for text manipulation and encoding
- **Quick Access**: Two commands for different workflows - format selection or instant copy
- **Configurable Notifications**: Toggle success messages on/off

## Commands

Access these commands via the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`):

- **Locopy: Copy with Format Selection** - Choose from your configured formats
- **Locopy: Copy Quick (First Format)** - Instantly copy using your first format

## Extension Settings

This extension contributes the following settings:

### `locopy.formats`
Array of custom copy formats using Handlebars templates. Each format has:
- `name`: Display name for the format
- `format`: Handlebars template string

**Default formats:**
```json
[
  {
    "name": "Relative path with line number",
    "format": "{{relativePath}}:{{startLine}}{{#if endLine}}-{{endLine}}{{/if}}"
  },
  {
    "name": "Path with line number",
    "format": "{{absolutePath}}:{{startLine}}{{#if endLine}}-{{endLine}}{{/if}}"
  },
  {
    "name": "Markdown link with selection",
    "format": "[{{#if selectedText}}{{selectedText}}{{else}}{{fileName}}{{/if}}]({{relativePath}})"
  }
]
```

### `locopy.showSuccessMessage`
- Type: `boolean`
- Default: `true`
- Description: Show success message when text is copied to clipboard

## Template Variables

Use these variables in your Handlebars templates:

- `{{absolutePath}}` - Absolute file path
- `{{relativePath}}` - Relative path from workspace root
- `{{fileName}}` - Filename only
- `{{selectedText}}` - Selected text (empty if no selection)
- `{{startLine}}` - Starting line number (1-based)
- `{{endLine}}` - Ending line number for multi-line selections (undefined for single line)

## Helper Functions

Locopy provides built-in Handlebars helper functions:

### `replace`
Replace text using regular expressions:
```handlebars
{{replace "pattern" "replacement" string}}
```

### `encodeURIComponent`  
URL-encode text:
```handlebars
{{encodeURIComponent string}}
```

## Examples

### Basic Usage
1. Place cursor on line 25 of `src/utils.ts`
2. Run "Locopy: Copy Quick"
3. Result: `src/utils.ts:25`

### Multi-line Selection
1. Select lines 10-12 in `README.md`
2. Choose format "Relative path with line number"
3. Result: `README.md:10-12`

### Markdown Documentation
1. Select function name `calculateTotal`
2. Use template `[{{selectedText}}]({{relativePath}}:{{startLine}})`
3. Result: `[calculateTotal](src/calculator.js:42)`

## Custom Format Examples

```json
{
  "locopy.formats": [
    {
      "name": "GitHub URL style", 
      "format": "{{relativePath}}#L{{startLine}}{{#if endLine}}-L{{endLine}}{{/if}}"
    },
    {
      "name": "Code comment",
      "format": "// {{relativePath}}:{{startLine}}"
    },
    {
      "name": "URL-safe path",
      "format": "{{encodeURIComponent relativePath}}:{{startLine}}"
    },
    {
      "name": "Clean filename",
      "format": "{{replace \"[^a-zA-Z0-9_]\" \"_\" fileName}}:{{startLine}}"
    },
    {
      "name": "Conditional selection display",
      "format": "{{relativePath}}:{{startLine}}{{#if selectedText}} - {{selectedText}}{{/if}}"
    }
  ]
}
```

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for development setup, guidelines, and release process.

## Release Notes

See [CHANGELOG.md](CHANGELOG.md) for detailed release notes.
