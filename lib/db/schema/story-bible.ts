import { pgTable, text, jsonb, timestamp, uuid, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './users';

export const storyBibles = pgTable('story_bibles', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  title: text('title').notNull(),
  genre: text('genre'),
  seriesName: text('series_name'),
  description: text('description'),
  characters: jsonb('characters').default([]),
  worldLore: jsonb('world_lore').default({}),
  timeline: jsonb('timeline').default([]),
  consistencyRules: jsonb('consistency_rules').default([]),
  tags: text('tags').array(),
  currentWordCount: integer('current_word_count').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const storyBiblesRelations = relations(storyBibles, ({ one }) => ({
  user: one(users, {
    fields: [storyBibles.userId],
    references: [users.id],
  }),
}));
