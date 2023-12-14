import type { Config } from "drizzle-kit";


export default {
  schema: "./src/db/schema/index.ts",
  out: "./.drizzle/sql_files",
  driver: "mysql2",
  dbCredentials: {
     uri:process.env.DATABASE_URL as string,
    // connectionString: process.env.DATABASE_URL as string
  },
  breakpoints: true,

} satisfies Config;