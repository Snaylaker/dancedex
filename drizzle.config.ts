import type { Config } from "drizzle-kit";
import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd();
console.log(loadEnvConfig(projectDir));

export default {
  schema: "./src/db/schema/*",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL!,
  },
} satisfies Config;
