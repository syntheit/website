# Website Scripts

This directory contains utility scripts for the website project.

## Scripts

### `setup-env.js`
Creates a `.env` file with default configuration if it doesn't exist.

**Usage:**
```bash
node scripts/setup-env.js
```

### `init-db.js`
Initializes the database by:
1. Creating the database file if it doesn't exist
2. Generating the Prisma client
3. Creating initial migration if none exist
4. Running migrations

**Usage:**
```bash
node scripts/init-db.js
```

### Combined Setup
You can run both scripts together using the npm script:
```bash
pnpm run setup
```

## Recent Fixes

### Prisma Schema Location Issue
- **Problem**: Prisma couldn't find the schema file during Docker builds
- **Solution**: Updated `init-db.js` to explicitly specify the schema path using `--schema` argument

### Docker Build Issues
- **Problem**: `postinstall` script was running before Prisma schema was copied
- **Solution**: Added `--ignore-scripts` flag to `pnpm install` in Dockerfile
- **Problem**: `pnpm` not available in builder stage
- **Solution**: Added `npm install -g pnpm` in builder stage
- **Problem**: Next.js standalone output not configured
- **Solution**: Added `output: 'standalone'` to `next.config.js`

### Database Migration Issues
- **Problem**: Schema drift between database and migration history
- **Solution**: Added logic to detect missing migrations and create initial migration if needed

## Environment Variables

The following environment variables are required:

- `DATABASE_URL`: SQLite database URL (defaults to `file:./dev.db`)
- `NODE_ENV`: Environment mode (defaults to `development`)

## Database Setup

1. Run the setup script: `pnpm run setup`
2. This will create the `.env` file and initialize the database
3. The database will be created at `./dev.db` (relative to project root)

## Docker Deployment

The Docker build process:
1. Installs dependencies with scripts ignored
2. Copies all source files
3. Installs pnpm in builder stage
4. Generates Prisma client
5. Builds the Next.js application
6. Creates a minimal production image with standalone output
