import { relations } from "drizzle-orm";
import { downloadedSongs, users } from "..";
import { PrimaryKey, mysqlTable, primaryKey, serial } from "drizzle-orm/mysql-core";


export const usersRelation  = relations(users,({many})=>({
  UserDownloadedSongs:many(UserDownloadedSongs)
}))


export const downloadedSongRelation  = relations(downloadedSongs,({many})=>({
  UserDownloadedSongs:many(UserDownloadedSongs)
}))


export const UserDownloadedSongs = mysqlTable('userDownloadedSongs', {
  userId: serial('user_id').references(() => users.id),
  songId: serial('song_id').references(() => downloadedSongs.id),
})

export const userDownloadedSongsRelation = relations(UserDownloadedSongs,({one})=>({
  downloadedSong: one(downloadedSongs, {
    fields: [UserDownloadedSongs.songId],
    references: [downloadedSongs.id],
  }),
  user: one(users, {
    fields: [UserDownloadedSongs.userId],
    references: [users.id],
  }),
}))