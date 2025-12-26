#!/bin/bash

# Script to view contact messages and resource suggestions from the database
# Usage: ./view-db.sh [database_file] (for SQLite) or ./view-db.sh (for PostgreSQL)

if [ $# -eq 1 ]; then
    # SQLite mode
    DB_FILE="$1"
    
    if [ ! -f "$DB_FILE" ]; then
        echo "Error: Database file '$DB_FILE' not found!"
        exit 1
    fi
    
    echo "=== CONTACT MESSAGES ==="
    sqlite3 "$DB_FILE" "SELECT id, message, ipAddress, isSpam, createdAt FROM ContactMessage ORDER BY createdAt DESC;"
    
    echo ""
    echo "=== RESOURCE SUGGESTIONS ==="
    sqlite3 "$DB_FILE" "SELECT id, title, description, url, category, isSpam, isApproved, createdAt FROM ResourceSuggestion ORDER BY createdAt DESC;"
    
else
    # PostgreSQL mode - use environment DATABASE_URL
    if [ -z "$DATABASE_URL" ]; then
        echo "Error: DATABASE_URL environment variable not set!"
        echo "Usage: ./view-db.sh [sqlite_file] or set DATABASE_URL for PostgreSQL"
        exit 1
    fi
    
    echo "=== CONTACT MESSAGES ==="
    psql "$DATABASE_URL" -c "SELECT id, message, \"ipAddress\", \"isSpam\", \"createdAt\" FROM \"ContactMessage\" ORDER BY \"createdAt\" DESC;"
    
    echo ""
    echo "=== RESOURCE SUGGESTIONS ==="
    psql "$DATABASE_URL" -c "SELECT id, title, description, url, category, \"isSpam\", \"isApproved\", \"createdAt\" FROM \"ResourceSuggestion\" ORDER BY \"createdAt\" DESC;"
fi