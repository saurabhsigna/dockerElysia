import { migrate } from "drizzle-orm/mysql2/migrator";
import { drizzle } from "drizzle-orm/mysql2";
import mysql2 from "mysql2/promise";
import path from "path";

const doMigrate = async () => {
  const {DATABASE_HOST,DATABASE_PASSWORD,DATABASE_USERNAME}= process.env
  try {
    const dbConnection = await mysql2.createConnection({
    host:DATABASE_HOST,
    user:DATABASE_USERNAME,
    password:DATABASE_PASSWORD,
      ssl:{
        rejectUnauthorized:true
      }
    });
    const dbMigrator = drizzle(dbConnection);

    await migrate(dbMigrator, {
      migrationsFolder: path.resolve(".drizzle", "sql_files"),
    });
    console.log("migration done");
    process.exit(0);
  } catch (e) {
    console.log("migration error: ", e);
    process.exit(0);
  }
};
doMigrate();
















