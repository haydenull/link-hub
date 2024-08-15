import { Feed } from 'feed'
import { NextResponse } from 'next/server'

import { getLinkListWithoutTag } from '@/services/actions'

const SITE_URL = 'https://linkhub.haydenhayden.com'

export const runtime = 'edge'

export const GET = async () => {
  const links = await getLinkListWithoutTag()

  const feed = new Feed({
    title: 'Link Hub Inbox RSS Feed',
    description: 'RSS feed for links without tags',
    id: SITE_URL,
    link: SITE_URL,
    language: 'zh-CN',
    image: `${SITE_URL}/favicon.ico`,
    favicon: `${SITE_URL}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    feedLinks: {
      rss2: `${SITE_URL}/rss/inbox/feed.xml`,
    },
  })

  links.forEach((link) => {
    feed.addItem({
      title: link.name || link.remark,
      id: link.id.toString(),
      link: link.url,
      description: link.remark,
      date: new Date(link.updatedAt),
      content: `${link.remark || ''}

<p><a href="${link.url}">点击阅读全文</a></p>`,
    })
  })

  const rss = feed.rss2()

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
