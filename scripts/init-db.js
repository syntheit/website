#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');
const prismaSchemaPath = join(projectRoot, 'prisma', 'schema.prisma');

// Get database URL from environment or use default
const databaseUrl = process.env.DATABASE_URL || 'file:./dev.db';

// Extract file path from DATABASE_URL
const dbPath = databaseUrl.replace('file:', '').replace(/^\/+/, '');
const fullDbPath = join(projectRoot, dbPath);

console.log('🔧 Initializing database...');
console.log(`Database path: ${fullDbPath}`);
console.log(`Prisma schema path: ${prismaSchemaPath}`);

try {
  // Check if Prisma schema exists
  if (!existsSync(prismaSchemaPath)) {
    throw new Error(`Prisma schema not found at: ${prismaSchemaPath}`);
  }
  console.log('✅ Prisma schema found');

  // Check if database file exists
  if (!existsSync(fullDbPath)) {
    console.log('📁 Database file does not exist, creating...');
    
    // Create the directory if it doesn't exist
    const dbDir = dirname(fullDbPath);
    if (!existsSync(dbDir)) {
      console.log(`📁 Creating directory: ${dbDir}`);
      execSync(`mkdir -p "${dbDir}"`, { stdio: 'inherit' });
    }
    
    // Create empty database file
    execSync(`touch "${fullDbPath}"`, { stdio: 'inherit' });
    console.log('✅ Database file created');
  } else {
    console.log('✅ Database file already exists');
  }

  // Generate Prisma client
  console.log('🔧 Generating Prisma client...');
  execSync(`npx prisma generate --schema="${prismaSchemaPath}"`, { 
    cwd: projectRoot, 
    stdio: 'inherit' 
  });

  // Check if migrations directory exists, if not create initial migration
  const migrationsDir = join(projectRoot, 'prisma', 'migrations');
  if (!existsSync(migrationsDir)) {
    console.log('🔄 No migrations found, creating initial migration...');
    execSync(`npx prisma migrate dev --name init --schema="${prismaSchemaPath}"`, { 
      cwd: projectRoot, 
      stdio: 'inherit' 
    });
  } else {
    // Run migrations
    console.log('🔄 Running database migrations...');
    execSync(`npx prisma migrate deploy --schema="${prismaSchemaPath}"`, { 
      cwd: projectRoot, 
      stdio: 'inherit' 
    });
  }

  console.log('🎉 Database initialization complete!');
  
} catch (error) {
  console.error('❌ Error initializing database:', error instanceof Error ? error.message : String(error));
  process.exit(1);
}
