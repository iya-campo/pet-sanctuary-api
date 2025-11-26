const { PrismaClient } = require('@prisma/client');
const { copyFileSync, existsSync } = require('fs');
const { join } = require('path');

let prisma;

// Only do the copy for Vercel deployment
if (process.env.NODE_ENV === 'production') {
  const sourceDb = join(process.cwd(), 'prisma', 'db', 'pets.db');
  const targetDb = '/tmp/pets.db';
  
  // Copy the database to /tmp if not already there
  if (!existsSync(targetDb)) {
    copyFileSync(sourceDb, targetDb);
  }
  
  // Override the DATABASE_URL for production
  process.env.DATABASE_URL = 'file:/tmp/pets.db';
}

prisma = new PrismaClient();

export default prisma;