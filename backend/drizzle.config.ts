import type { Config } from "drizzle-kit";


export default {
  schema: "./src/db/schema/**",
  out: "./.drizzle/sql_files",
  driver: "mysql2",
  dbCredentials: {
     uri:process.env.DATABASE_URL as string
    // connectionString: process.env.DRIZZLE_DATABASE_CONNECTION_STRING as string,
  },
} satisfies Config;