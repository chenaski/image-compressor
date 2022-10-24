# Image Compressor

Demo project that accomplish image conversion and compression.

[Whiteboard](https://app.excalidraw.com/l/3r74dmVCrO4/8RbPSRPrBX0) |
[Figma](https://www.figma.com/file/UbwDUsrxDyrCPuIZ5LLEs1/%D0%A1%D0%B6%D0%B8%D0%BC%D0%B0%D0%BB%D0%BA%D0%B0?node-id=0%3A1) |
[Demo](https://image-compressor.ga/)

## Features

- Bunch processing (you can upload multiple images)
- Multiple targets (for selecting multiple output formats)
- Advanced options (to find a balance between image size and quality)
- Persistence (reopening tab without loosing all your data)

## Motivation

- Current apps provide a minimal set of options or most often don't provide any options at all
- Mostly it's one-to-one processing with a predefined target codec: `JPEG` to `WebP`, `JPEG` to `AVIF`, but not both at once
- Modern tools like [Squoosh](https://squoosh.app/) don't fit when you need to process a lot of images
