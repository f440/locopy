# Locopy

Your handy tool for copying code locations with line numbers in VS Code.

## Features

Locopy allows you to copy file paths, line numbers, and selected text in customizable formats. Perfect for code reviews, documentation, or sharing code references.

### Key Features

- **Multiple Format Support**: Configure custom copy formats with template variables
- **Smart Line Number Detection**: Automatically handles single line, multi-line, and cursor-only selections
- **Flexible Path Options**: Choose between absolute paths, relative paths, or just filenames
- **Quick Access**: Two commands for different workflows - format selection or instant copy
- **Configurable Notifications**: Toggle success messages on/off

## Commands

Access these commands via the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`):

- **Locopy: Copy with Format Selection** - Choose from your configured formats
- **Locopy: Copy Quick (First Format)** - Instantly copy using your first format

## Extension Settings

This extension contributes the following settings:

### `locopy.formats`
Array of custom copy formats. Each format has:
- `name`: Display name for the format
- `format`: Template string with variables

**Default formats:**
```json
[
  {
    "name": "Path with line number",
    "format": "%p:%l"
  },
  {
    "name": "Relative path with line number", 
    "format": "%r:%l"
  },
  {
    "name": "Markdown link with selection",
    "format": "[%s](%r)"
  }
]
```

### `locopy.showSuccessMessage`
- Type: `boolean`
- Default: `true`
- Description: Show success message when text is copied to clipboard

## Template Variables

Use these variables in your format templates:

- `%p` - Absolute file path
- `%r` - Relative path from workspace root
- `%s` - Selected text (empty if no selection)
- `%n` - Filename only
- `%l` - Line number(s)
  - Single line or cursor: `42`
  - Multi-line selection: `10-15`
- `%%` - Escaped % character (to prevent variable expansion)

## Examples

### Basic Usage
1. Place cursor on line 25 of `src/utils.ts`
2. Run "Locopy: Copy Quick"
3. Result: `/path/to/project/src/utils.ts:25`

### Multi-line Selection
1. Select lines 10-12 in `README.md`
2. Choose format "Relative path with line number"
3. Result: `README.md:10-12`

### Markdown Documentation
1. Select function name `calculateTotal`
2. Use format `[%s](%r:%l)`
3. Result: `[calculateTotal](src/calculator.js:42)`

## Custom Format Examples

```json
{
  "locopy.formats": [
    {
      "name": "GitHub URL style",
      "format": "%r#L%l"
    },
    {
      "name": "Code comment",
      "format": "// %r:%l"
    },
    {
      "name": "Escaped percentage",
      "format": "File: %r (%%completion: %l%%)"
    }
  ]
}
```

## Release Notes

See [CHANGELOG.md](CHANGELOG.md) for detailed release notes.
