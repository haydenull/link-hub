import { integer, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core'

// 标签表
export const tags = sqliteTable('tags', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
})
export type Tag = typeof tags.$inferSelect

// Link 表
export const links = sqliteTable('links', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name'),
  remark: text('remark').notNull(),
  url: text('url').notNull(),
})
export type Link = typeof links.$inferSelect

// 多对多关联 Link 与 Tag
export const linksToTags = sqliteTable(
  'links_to_tags',
  {
    linkId: integer('link_id').references(() => links.id),
    tagId: integer('tag_id').references(() => tags.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.linkId, table.tagId] }),
  }),
)
