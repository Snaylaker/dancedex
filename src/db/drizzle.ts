import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

if (!process.env.DRIZZLE_CONNECTION_STRING) {
  throw "Missing Drizzle connection string";
}

const client = postgres(process.env.DRIZZLE_CONNECTION_STRING, {
  prepare: false,
});
export const db = drizzle(client);
