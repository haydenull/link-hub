import { db } from '@/db'
import { links } from '@/db/schema'
import { convertNotionPageToLink } from '@/lib/notion'
import type { Page } from '@/types/notion'

import { notionApi } from './notionApi'

/**
 * 获取 link 列表
 */
export const getLinkList = async () => {
  const { results } = await notionApi.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    // sorts: [
    //   {
    //     property: 'Date',
    //     direction: 'descending',
    //   },
    // ],
  })
  return (results as Page[]).map(convertNotionPageToLink)
}
export const getLinkListFromDrizzle = async () => {
  const res = await db.select().from(links)
  console.log('res', res)
  return res
}
