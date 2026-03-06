import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema/index';

let db: ReturnType<typeof drizzle> | null = null;

export function getDb(connectionString?: string) {
    if (db) return db;

    const url = connectionString ?? process.env.DATABASE_URL;
    if (!url) throw new Error('DATABASE_URL is not set');

    const client = postgres(url, {
        max: Number(process.env.DATABASE_POOL_MAX ?? 10),
        idle_timeout: 20,
    });

    db = drizzle(client, { schema });
    return db;
}

export type Database = ReturnType<typeof getDb>;
