const fs = require('fs');
const path = require('path');
const spriteMe = require('sprite-me');

const defaultOptions = {
  from: '',
  to: '',
  allowedFiles: ['.png', '.svg', '.jpg', '.jpeg'],
  name: '#name.spritesheet',
  format: 'png',
  gap: 10,
};

class SpritesheetWebpackPlugin {
  constructor (options) {
    this.options = { ...defaultOptions, ...options };
  }

  apply (compiler) {
    const { webpack } = compiler;
    const { RawSource } = webpack.sources;

    compiler.hooks.make.tapAsync(
      'SpritesheetWebpackPlugin',
      async (compilation, callback) => {
        const innerDirs = fs.readdirSync(this.options.from);
        const { from, to, format, gap, name, allowedFiles } = this.options;
        compilation.contextDependencies.add(this.options.from);

        await Promise.all(innerDirs.map(async dir => {
          const group = path.join(from, dir);

          if (fs.lstatSync(group).isDirectory()) {
            const images = fs.readdirSync(group).filter(img => {
              const ext = path.extname(img);

              return allowedFiles.includes(ext);
            }).map(img => path.join(group, img));

            const {
              image, meta, frames,
            } = await spriteMe(images, { format, gap });

            const baseName = name.replace('#name', dir);
            const imgName = `${baseName}.${format}`;
            const jsonName = `${baseName}.json`;

            const json = JSON.stringify(
              { meta: { ...meta, image: imgName }, frames },
            );

            compilation.emitAsset(path.join(to, imgName), new RawSource(image));
            compilation.emitAsset(path.join(to, jsonName), new RawSource(json));
          }
        }));

        callback();
      },
    );
  }
}

module.exports = SpritesheetWebpackPlugin;
