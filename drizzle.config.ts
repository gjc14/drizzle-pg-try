import "dotenv/config";

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./app/lib/db/schema",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
