import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

export async function compress({
  src,
  dest,
  options,
}: {
  src: string;
  dest: string;
  options: { target: 'webp' | 'avif'; quality: number };
}) {
  const { name } = path.parse(src);
  const outputPath = path.format({
    dir: dest,
    name,
    ext: `.${options.target}`,
  });

  await fs.mkdir(dest, { recursive: true });

  return await sharp(src)
    .toFormat(options.target, { quality: options.quality })
    .toFile(outputPath)
    .then((info) => {
      return {
        ...info,
        path: outputPath,
      };
    });
}
