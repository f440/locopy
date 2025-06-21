# Change Log

All notable changes to the "locopy" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]

### Added

### Changed

### Fixed

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