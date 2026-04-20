#!/usr/bin/env node

import { config } from 'dotenv';
import { promises as fs } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config();

interface PexelsPhotoResponse {
  id: number;
  url: string;
  alt?: string;
  width: number;
  height: number;
  src: {
    large2x: string;
    [key: string]: string;
  };
}

interface PhotoData {
  id: number;
  pexels_url: string;
  description: string;
  image_url: string;
  width: number;
  height: number;
}

const RAW_IDS_PATH = join(__dirname, '..', 'public', 'data', 'raw-ids.json');
const PHOTOS_PATH = join(__dirname, '..', 'public', 'data', 'photos.json');
const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

if (!PEXELS_API_KEY) {
  console.error('Error: PEXELS_API_KEY environment variable is required.');
  console.error('Please add it to your .env file.');
  process.exit(1);
}

// Type assertion since we've verified it exists above
const API_KEY: string = PEXELS_API_KEY;

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchPhotoData(id: number): Promise<PexelsPhotoResponse> {
  const response = await fetch(`https://api.pexels.com/v1/photos/${id}`, {
    headers: {
      'Authorization': API_KEY
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch photo ${id}: ${response.status} ${response.statusText}`);
  }

  const data = await response.json() as PexelsPhotoResponse;
  return data;
}

async function main(): Promise<void> {
  try {
    // Read raw IDs
    console.log('Reading raw IDs from data/raw-ids.json...');
    const rawIdsData = await fs.readFile(RAW_IDS_PATH, 'utf8');
    const ids: unknown = JSON.parse(rawIdsData);

    if (!Array.isArray(ids)) {
      throw new Error('raw-ids.json should contain an array of photo IDs');
    }

    // Convert and filter IDs to ensure all are valid numbers
    const photoIds = ids
      .map((id): number | null => {
        if (typeof id === 'string') {
          const parsed = parseInt(id, 10);
          return isNaN(parsed) ? null : parsed;
        }
        return typeof id === 'number' ? id : null;
      })
      .filter((id): id is number => id !== null);

    console.log(`Found ${photoIds.length} photo IDs to process`);

    // Read existing photos data if it exists
    let existingPhotos: PhotoData[] = [];
    try {
      const existingData = await fs.readFile(PHOTOS_PATH, 'utf8');
      if (existingData.trim()) {
        const parsedData: unknown = JSON.parse(existingData);
        if (Array.isArray(parsedData)) {
          existingPhotos = parsedData as PhotoData[];
        }
        console.log(`Found ${existingPhotos.length} existing photos`);
      }
    } catch (error) {
      const nodeError = error as NodeJS.ErrnoException;
      if (nodeError.code !== 'ENOENT') {
        throw error;
      }
      console.log('No existing photos data found, starting fresh');
    }

    // Create a set of existing IDs for deduplication
    const existingIds = new Set(existingPhotos.map((photo: PhotoData) => photo.id));
    const newIds = photoIds.filter(id => !existingIds.has(id));

    console.log(`${newIds.length} new photos to fetch (${ids.length - newIds.length} already exist)`);

    if (newIds.length === 0) {
      console.log('No new photos to fetch. All done!');
      return;
    }

    // Fetch new photo data
    const newPhotos: PhotoData[] = [];
    let processedCount = 0;
    for (const id of newIds) {
      try {
        processedCount++;
        console.log(`Fetching photo ${processedCount}/${newIds.length}: ID ${id}`);
        const data = await fetchPhotoData(id);

        const photo: PhotoData = {
          id: data.id,
          pexels_url: data.url,
          description: data.alt ?? '',
          image_url: data.src.large2x.replace(/\.jpeg(\?|$)/, '$1'),
          width: data.width,
          height: data.height
        };

        newPhotos.push(photo);

        // Rate limiting: wait 200ms between requests
        if (processedCount < newIds.length) {
          await sleep(200);
        }
      } catch (error) {
        const nodeError = error as Error;
        console.error(`Error fetching photo ${id}:`, nodeError.message);
        // Continue with other photos
      }
    }

    // Combine existing and new photos
    const allPhotos = [...existingPhotos, ...newPhotos];

    // Sort by ID for consistency
    allPhotos.sort((a, b) => a.id - b.id);

    // Write to file
    console.log(`\nSaving ${allPhotos.length} photos to data/photos.json...`);
    await fs.writeFile(PHOTOS_PATH, JSON.stringify(allPhotos, null, 2));

    console.log('Done! Photo metadata has been hydrated.');

  } catch (error) {
    const nodeError = error as Error;
    console.error('Error:', nodeError.message);
    process.exit(1);
  }
}

void main();
