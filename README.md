# Spritesheet Webpack Plugin

_Webpack plugin to generate spritesheets_

This plugin automatically generate spritesheets with name of folder and images located inside

## Installation

- Install [ImageMagic V7](https://imagemagick.org/script/download.php).

    **Version `7` is required**. Check it by running `magick --version`

  > I recomend to use [ImageMagick Easy Instal](https://github.com/SoftCreatR/imei/)
  > Some package managers like `brew` can install imagemagick with version 6
  
- Install package: `npm i -D spriteme-webpack-plugin`.

## Usage

Start with creating root direcotry for spritesheets folders.

For every spritesheet create directory in root with name of target spritesheet name and fill it with images.

```
spritesheets/
  sprite1/
    img1.png
    img2.png
```

Then add plugin in webpack config.
```
const SpritemeWebpackPlugin = require('spriteme-webpack-plugin');

new SpritemeWebpackPlugin({
    from: path.resolve(__dirname, './public/spritesheets/'),
    to: 'assets/textures/',
}),

```

## Options

- `from: string` - Root directory where sprite folders is located.
- `to: string` - Path, where generated image and json should be saved.
- `allowedFiles: string[]` - File extensions which will be selected to join in sprite.
  
  Default: `['.png', '.svg', '.jpg', '.jpeg']`.
- `name: string` - Generated image and json name.

  Part with `#name` will be replaced with directory name.

  Default: `'#name.spritesheet'`.
- `format: string` - Output image format. Default: `png`.
-  `gap`: Distance beetween sprites. Default: `10`.
- `format` - default 'png' - format of compiled image.
