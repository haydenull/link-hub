'use server'

import { and, eq, inArray, like, notInArray, or } from 'drizzle-orm'

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
/** 依据关键字查询 tag */
export const getTagListByKeyword = async (keyword: string) => {
  if (!keyword) return []
  const res = await db.query.tagsTable.findMany({
    where: like(tagsTable.name, `%${keyword}%`),
  })
  return res
}

// MARK: Link
/**
 * 获取 link 列表
 */
export const getLinkList = async (): Promise<Link[]> => {
  const linkList = await db.query.linksTable.findMany({
    with: {
      linksToTags: {
        with: {
          tag: true,
        },
      },
    },
  })
  return linkList.map(({ linksToTags, ...link }) => ({ ...link, tags: linksToTags.map((linkToTag) => linkToTag.tag) }))
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
    await db.insert(linksToTagsTable).values(linksToTagsRows)
    tags = await db.select().from(tagsTable).where(inArray(tagsTable.id, params.tags))
  }

  return {
    ...link[0],
    tags,
  }
}
/** 更新 Link */
export const updateLink = async ({ id, data }: { id: number; data: CreateLinkParams }) => {
  if (data.tags?.length) {
    const currentTags = await db.query.linksToTagsTable.findMany({
      where: eq(linksToTagsTable.linkId, id),
      columns: {
        tagId: true,
      },
    })
    const currentTagIds = currentTags.map((linkToTag) => linkToTag.tagId)
    const newTagIds = data.tags

    const addTagIds = newTagIds.filter((tagId) => !currentTagIds.includes(tagId))
    const deleteTagIds = currentTagIds.filter((tagId) => !newTagIds.includes(tagId))
    if (addTagIds.length) {
      const linksToTagsRows = addTagIds.map((tagId) => ({
        linkId: id,
        tagId,
      }))
      await db.insert(linksToTagsTable).values(linksToTagsRows)
    }
    if (deleteTagIds.length) {
      await db
        .delete(linksToTagsTable)
        .where(and(eq(linksToTagsTable.linkId, id), inArray(linksToTagsTable.tagId, deleteTagIds)))
    }
  }

  const res = await db.update(linksTable).set(data).where(eq(linksTable.id, id)).returning()
  return res[0]
}
/** 依据 tagId 查询 link */
export const getLinkListByTagId = async (tagId: number): Promise<Link[]> => {
  const linkIds = await db.query.linksToTagsTable.findMany({
    where: eq(linksToTagsTable.tagId, tagId),
    columns: {
      linkId: true,
    },
  })
  if (!linkIds.length) return []
  const linkList = await db.query.linksTable.findMany({
    where: inArray(
      linksTable.id,
      linkIds.map((linkToTag) => linkToTag.linkId),
    ),
    with: {
      linksToTags: {
        with: {
          tag: true,
        },
      },
    },
  })
  return linkList.map(({ linksToTags, ...link }) => ({ ...link, tags: linksToTags.map((linkToTag) => linkToTag.tag) }))
}
/** 查询没有 tag 的 link */
export const getLinkListWithoutTag = async (): Promise<Link[]> => {
  const linkIds = await db.query.linksToTagsTable.findMany({
    columns: {
      linkId: true,
    },
  })
  if (!linkIds.length) return getLinkList()
  const linkList = await db.query.linksTable.findMany({
    where: notInArray(
      linksTable.id,
      linkIds.map((link) => link.linkId),
    ),
  })
  return linkList.map((link) => ({ ...link, tags: [] }))
}
/** 删除 Link */
export const deleteLink = async (id: number) => {
  return db.batch([
    db.delete(linksTable).where(eq(linksTable.id, id)),
    db.delete(linksToTagsTable).where(eq(linksToTagsTable.linkId, id)),
  ])
}
/** 依据关键字查询 link */
export const getLinkListByKeyword = async (keyword: string): Promise<Link[]> => {
  if (!keyword) return []
  const linkList = await db.query.linksTable.findMany({
    where: or(
      like(linksTable.name, `%${keyword}%`),
      like(linksTable.url, `%${keyword}%`),
      like(linksTable.remark, `%${keyword}%`),
    ),
    with: {
      linksToTags: {
        with: {
          tag: true,
        },
      },
    },
  })
  return linkList.map(({ linksToTags, ...link }) => ({ ...link, tags: linksToTags.map((linkToTag) => linkToTag.tag) }))
}
