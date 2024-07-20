'use server'

import { eq, inArray } from 'drizzle-orm'

import { db } from '@/db'
import {
  linksTable,
  linksToTagsTable,
  tagsTable,
  type CreateLinkParams,
  type CreateTagParams,
  type Link,
  type Tag,
} from '@/db/schema'

// MARK: Tag
/** 获取 Tag 列表 */
export const getTagList = async () => {
  const res = await db.select().from(tagsTable)
  return res
}
/**
 * 创建 Tag
 */
export const createTag = async (params: CreateTagParams) => {
  const res = await db.insert(tagsTable).values(params).returning()
  return res[0]
}
/** 更新 Tag */
export const updateTag = async ({ id, data }: { id: number; data: CreateTagParams }) => {
  const res = await db.update(tagsTable).set(data).where(eq(tagsTable.id, id)).returning()
  return res[0]
}

// MARK: Link
/**
 * 获取 link 列表
 */
export const getLinkList = async (): Promise<Link[]> => {
  const linkList = await db
    .select({
      id: linksTable.id,
      name: linksTable.name,
      remark: linksTable.remark,
      url: linksTable.url,
      tagId: tagsTable.id,
      tagName: tagsTable.name,
    })
    .from(linksTable)
    .leftJoin(linksToTagsTable, eq(linksToTagsTable.linkId, linksTable.id))
    .leftJoin(tagsTable, eq(linksToTagsTable.tagId, tagsTable.id))
    .execute()
  const linkMap = new Map()
  linkList.forEach((link) => {
    const { id, tagId, tagName, ...rest } = link
    if (!linkMap.has(id)) {
      linkMap.set(id, {
        ...rest,
        id,
        tags: [],
      })
    }
    if (tagId) {
      linkMap.get(id).tags.push({
        id: tagId,
        name: tagName,
      })
    }
  })
  return Array.from(linkMap.values())
}
/** 创建 Link */
export const createLink = async (params: CreateLinkParams): Promise<Link> => {
  const link = await db.insert(linksTable).values(params).returning()
  let tags: Tag[] = []
  if (params.tags?.length) {
    const { id: linkId } = link[0]
    const linksToTagsRows = params.tags.map((tagId) => ({
      linkId,
      tagId,
    }))
    await db.insert(linksToTagsTable).values(linksToTagsRows).returning()
    tags = await db.select().from(tagsTable).where(inArray(tagsTable.id, params.tags))
  }

  return {
    ...link[0],
    tags,
  }
}
/** 更新 Link */
export const updateLink = async ({ id, data }: { id: number; data: CreateLinkParams }) => {
  const res = await db.update(linksTable).set(data).where(eq(linksTable.id, id)).returning()
  return res[0]
}
/** 依据 tagId 查询 link */
export const getLinkListByTagId = async (tagId: number): Promise<Link[]> => {
  const linkList = await db
    .select({
      id: linksTable.id,
      name: linksTable.name,
      remark: linksTable.remark,
      url: linksTable.url,
      tagId: tagsTable.id,
      tagName: tagsTable.name,
    })
    .from(linksTable)
    .leftJoin(linksToTagsTable, eq(linksToTagsTable.linkId, linksTable.id))
    .leftJoin(tagsTable, eq(linksToTagsTable.tagId, tagsTable.id))
    .where(eq(tagsTable.id, tagId))
    .execute()
  const linkMap = new Map()
  linkList.forEach((link) => {
    const { id, tagId, tagName, ...rest } = link
    if (!linkMap.has(id)) {
      linkMap.set(id, {
        ...rest,
        id,
        tags: [],
      })
    }
    if (tagId) {
      linkMap.get(id).tags.push({
        id: tagId,
        name: tagName,
      })
    }
  })
  return Array.from(linkMap.values())
}
