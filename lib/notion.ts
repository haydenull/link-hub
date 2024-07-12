import type { Link } from '@/types/link'
import type { Page } from '@/types/notion'

/** 转换 notion page 为 */
export const convertNotionPageToLink = (page: Page): Link => {
  const { properties } = page
  return {
    name: properties.Name.title?.[0]?.plain_text,
    tags: properties.Tags.multi_select,
    url: properties.URL.url,
    date: properties.Date.date.start,
    remark: properties.Remark.rich_text?.[0]?.plain_text,
  }
}
