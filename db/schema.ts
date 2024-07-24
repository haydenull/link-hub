import { relations, sql } from 'drizzle-orm'
import { integer, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { removeNullableFromObject } from '@/lib/utils'

// MARK: Tag
// Tag 表
export const tagsTable = sqliteTable('tags', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
})
export const tagsRelations = relations(tagsTable, ({ many }) => ({
  linksToTags: many(linksToTagsTable),
}))
// export type Tag = typeof tags.$inferSelect
export const insertTagSchema = createInsertSchema(tagsTable)
export const selectTagSchema = createSelectSchema(tagsTable)
export type Tag = z.infer<typeof selectTagSchema>
export const createTagSchema = insertTagSchema
export type CreateTagParams = z.infer<typeof createTagSchema>

// MARK: Link
// Link 表
export const linksTable = sqliteTable('links', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name'),
  remark: text('remark').notNull(),
  url: text('url').notNull(),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
})
export const linksRelations = relations(linksTable, ({ many }) => ({
  linksToTags: many(linksToTagsTable),
}))
// export type Link = typeof links.$inferSelect
export const insertLinkSchema = createInsertSchema(linksTable)
export const selectLinkSchema = createSelectSchema(linksTable)
export const createLinkSchema = removeNullableFromObject(
  insertLinkSchema.merge(
    z.object({
      tags: z.array(z.number()).optional(),
    }),
  ),
)
export type CreateLinkParams = z.infer<typeof createLinkSchema>
export const linkSchema = selectLinkSchema.merge(z.object({ tags: z.array(selectTagSchema) }))
export type Link = z.infer<typeof linkSchema>

// MARK: linksToTags
// 多对多关联 Link 与 Tag
export const linksToTagsTable = sqliteTable(
  'links_to_tags',
  {
    linkId: integer('link_id')
      .notNull()
      .references(() => linksTable.id),
    tagId: integer('tag_id')
      .notNull()
      .references(() => tagsTable.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.linkId, table.tagId] }),
  }),
)
export const linksToTagsRelations = relations(linksToTagsTable, ({ one }) => ({
  tag: one(tagsTable, {
    fields: [linksToTagsTable.tagId],
    references: [tagsTable.id],
  }),
  link: one(linksTable, {
    fields: [linksToTagsTable.linkId],
    references: [linksTable.id],
  }),
}))
