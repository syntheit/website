#!/usr/bin/env node

import { promises as fs } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PHOTOS_PATH = join(__dirname, '..', 'public', 'data', 'photos.json');

async function fixPhotos(): Promise<void> {
  try {
    console.log('Reading photos.json...');
    const data = await fs.readFile(PHOTOS_PATH, 'utf8');
    const photos = JSON.parse(data);

    console.log(`Processing ${photos.length} photos...`);

    // Remove .jpeg from all image URLs
    const fixedPhotos = photos.map((photo: any) => ({
      ...photo,
      image_url: photo.image_url.replace(/\.jpeg(\?|$)/, '$1')
    }));

    console.log('Writing fixed photos.json...');
    await fs.writeFile(PHOTOS_PATH, JSON.stringify(fixedPhotos, null, 2));

    console.log('Done! All .jpeg extensions have been removed from image URLs.');

  } catch (error) {
    const nodeError = error as Error;
    console.error('Error:', nodeError.message);
    process.exit(1);
  }
}

void fixPhotos();