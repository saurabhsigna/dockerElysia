import {  sql } from "drizzle-orm";
import { boolean, datetime, int, json, mysqlTable, serial, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const userSchema = mysqlTable("users", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 256 }),
  email: varchar("email", { length: 256 }).unique().notNull(),
  locations: json('locations').$type<{ time_at: string; location: string }[]>().default([]),
  isVerified: boolean('isVerified').notNull().default(false),
  hashed_password: varchar("hashed_password", { length: 256 }).notNull(),
  createdAt: timestamp("createdAt", { mode: "string" }).defaultNow(),
  profilePic:text('profile_pic'),
  updatedAt: datetime("updated_at")
        .default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`)
        .notNull(),
  

});



