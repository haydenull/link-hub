import { Client } from '@notionhq/client'

export const notionApi = new Client({ auth: process.env.NOTION_ACCESS_TOKEN })
