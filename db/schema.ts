import { integer, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

// MARK: Tag
// Tag 表
export const tagsTable = sqliteTable('tags', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
})
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
})
// export type Link = typeof links.$inferSelect
export const insertLinkSchema = createInsertSchema(linksTable)
export const selectLinkSchema = createSelectSchema(linksTable)
export const createLinkSchema = insertLinkSchema.merge(
  z.object({
    tags: z.array(z.number()).optional(),
  }),
)
export type CreateLinkParams = z.infer<typeof createLinkSchema>
export const linkSchema = selectLinkSchema.merge(z.object({ tags: z.array(selectTagSchema) }))
export type Link = z.infer<typeof linkSchema>

// MARK: linksToTags
// 多对多关联 Link 与 Tag
export const linksToTagsTable = sqliteTable(
  'links_to_tags',
  {
    linkId: integer('link_id').references(() => linksTable.id),
    tagId: integer('tag_id').references(() => tagsTable.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.linkId, table.tagId] }),
  }),
)
