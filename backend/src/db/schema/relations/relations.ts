import { relations } from "drizzle-orm";
import { downloadSongsSchema as downloadedSongs } from "../downloadedSong.schema";
import { userSchema as users } from "../user.schema";
import {  bigint, mysqlTable } from "drizzle-orm/mysql-core";


export const usersRelation  = relations(users,({many})=>({
  UserDownloadedSongs:many(UserDownloadedSongs)
}))


export const downloadedSongRelation  = relations(downloadedSongs,({many})=>({
  UserDownloadedSongs:many(UserDownloadedSongs)
}))


export const UserDownloadedSongs = mysqlTable('userDownloadedSongs', {
  userId: bigint('user_id',{mode:"bigint"}),
  songId: bigint('song_id',{mode:"bigint"}),
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