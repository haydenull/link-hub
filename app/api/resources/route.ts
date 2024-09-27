import { NextRequest, NextResponse } from 'next/server'

import { getLinkListByKeyword, getTagListByKeyword } from '@/services/actions'

export const runtime = 'edge'

export const GET = async (req: NextRequest) => {
  const keyword = new URL(req.url).searchParams.get('keyword')

  if (!keyword) {
    return NextResponse.json({ success: false, message: '参数错误', data: null }, { status: 400 })
  }

  const [links, tags] = await Promise.all([getLinkListByKeyword(keyword), getTagListByKeyword(keyword)])

  return NextResponse.json({ success: true, data: { links, tags } })
}
