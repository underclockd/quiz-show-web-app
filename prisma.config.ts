import "node:process";
import { loadEnvFile } from "node:process";
import { defineConfig } from "prisma/config";

try { loadEnvFile(".env"); } catch { }

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url:
      process.env["DATABASE_URL"] ??
      "postgresql://postgres:postgres@localhost:5432/quiz_show",
  },
});
