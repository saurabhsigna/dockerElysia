import { relations, sql } from "drizzle-orm";
import { boolean, datetime, json, mysqlTable, serial, text, timestamp, varchar } from "drizzle-orm/mysql-core";
import { downloadSongsSchema as downloadedSongs } from "./downloadedSong.schema";

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






export const usersRelation  = relations(userSchema,({many})=>({
  UserDownloadedSongs:many(UserDownloadedSongs)
}))


export const downloadedSongRelation  = relations(downloadedSongs,({many})=>({
  UserDownloadedSongs:many(UserDownloadedSongs)
}))


export const UserDownloadedSongs = mysqlTable('userDownloadedSongs', {
  userId: serial('user_id').references(() => userSchema.id),
  songId: serial('song_id').references(() => downloadedSongs.id),
})

export const userDownloadedSongsRelation = relations(UserDownloadedSongs,({one})=>({
  downloadedSong: one(downloadedSongs, {
    fields: [UserDownloadedSongs.songId],
    references: [downloadedSongs.id],
  }),
  user: one(userSchema, {
    fields: [UserDownloadedSongs.userId],
    references: [userSchema.id],
  }),
}))