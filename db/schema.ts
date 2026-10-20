import { sqliteTable, text, primaryKey } from 'drizzle-orm/sqlite-core';
export const libraryItems = sqliteTable('library_items', {
 userId:text('user_id').notNull(),kind:text('kind').notNull(),itemKey:text('item_key').notNull(),data:text('data').notNull(),updatedAt:text('updated_at').notNull(),
},t=>[primaryKey({columns:[t.userId,t.kind,t.itemKey]})]);
export const dailyOpens=sqliteTable('daily_opens',{
 day:text('day').notNull(),userId:text('user_id').notNull(),trackId:text('track_id').notNull(),createdAt:text('created_at').notNull(),
},t=>[primaryKey({columns:[t.day,t.userId,t.trackId]})]);
