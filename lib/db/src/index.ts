import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

export const isDbConfigured = Boolean(process.env.DATABASE_URL);

export const pool = isDbConfigured
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : null;

export const db = isDbConfigured
  ? drizzle(pool!, { schema })
  : ({
      select: () => Promise.resolve([]),
      insert: () => ({ values: () => ({ returning: () => Promise.resolve([]) }) }),
      update: () => ({ set: () => ({ where: () => Promise.resolve([]) }) }),
      delete: () => ({ where: () => Promise.resolve([]) }),
    } as any);

export * from "./schema";
