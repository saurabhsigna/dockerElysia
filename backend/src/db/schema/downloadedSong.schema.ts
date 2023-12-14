import { int,  mysqlTable, serial, text,  varchar } from "drizzle-orm/mysql-core";


export const downloadSongsSchema = mysqlTable('downloadedSongs',{
    id: serial("id").primaryKey().notNull(),
    name: varchar("name", { length: 256 }),
    genre:varchar("genre",{length:32}),
    duration: int('duration'),
    image:text("image")
})