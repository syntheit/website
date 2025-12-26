#!/usr/bin/env node

import { existsSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');
const envPath = join(projectRoot, '.env');

console.log('🔧 Setting up environment...');

try {
  if (!existsSync(envPath)) {
    console.log('📝 Creating .env file...');
    const envContent = `DATABASE_URL="file:./dev.db"
NODE_ENV="development"
`;
    writeFileSync(envPath, envContent);
    console.log('✅ .env file created');
  } else {
    console.log('✅ .env file already exists');
  }
  
  console.log('🎉 Environment setup complete!');
  
} catch (error) {
  console.error('❌ Error setting up environment:', error instanceof Error ? error.message : String(error));
  process.exit(1);
}
