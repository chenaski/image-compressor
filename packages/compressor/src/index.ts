import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

export async function compress({ src, dest }: { src: string; dest: string }) {
  const { name } = path.parse(src);
  const outputExt = '.webp';
  const outputPath = path.format({
    dir: dest,
    name,
    ext: outputExt,
  });

  await fs.mkdir(dest, { recursive: true });

  return await sharp(src)
    .toFormat('webp')
    .toFile(outputPath)
    .then((info) => {
      return {
        ...info,
        path: outputPath,
      };
    });
}
