import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/phase-7/schema.ts',
  out: './src/phase-7/migrations',
  dbCredentials: {
    url: process.env.DATABASE_URL || '',
  },
});
