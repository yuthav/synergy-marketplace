import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: './src/schema/index.ts',
    out: './drizzle',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL ?? 'postgresql://synergetics:synergetics@localhost:5432/synergetics_marketplace',
    },
});
