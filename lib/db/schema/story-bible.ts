import { pgTable, uuid, text, jsonb, timestamp, boolean } from 'drizzle-orm/pg-core';
import { users } from './users';

export const storyBibles = pgTable('story_bibles', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  title: text('title').notNull(),
  genre: text('genre'),
  seriesName: text('series_name'),
  description: text('description'),
  characters: jsonb('characters').default([]),
  worldLore: jsonb('world_lore').default({}),
  timeline: jsonb('timeline').default([]),
  consistencyRules: jsonb('consistency_rules').default([]),
  isPublic: boolean('is_public').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const characters = pgTable('characters', {
  id: uuid('id').primaryKey().defaultRandom(),
  storyBibleId: uuid('story_bible_id').references(() => storyBibles.id, { onDelete: 'cascade' }).notNull(),
  name: text('name').notNull(),
  role: text('role'),
  age: text('age'),
  appearance: text('appearance'),
  personality: jsonb('personality').default({}),
  background: text('background'),
  arcs: jsonb('arcs').default([]),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
});
