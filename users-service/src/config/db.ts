import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

let _db: ReturnType<typeof drizzle> | null = null;
let _pool: Pool | null = null;

export function getPool() {
  if (_pool) return _pool;

  _pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000

  });

  return _pool;
}

export function getDB() {
  if (_db) return _db;

  _db = drizzle(getPool());
  return _db;
}
