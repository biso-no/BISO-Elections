import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";

export { schema };

const sql = postgres(process.env.POSTGRES_URL!);

export * from "drizzle-orm";

export const db = drizzle(sql, { schema });
