import { NextRequest, NextResponse } from 'next/server'

import { createLinkSchema } from '@/db/schema'
import { createLink, getLinkList } from '@/services/queries'

export const runtime = 'edge'

export const GET = async () => {
  const res = await getLinkList()
  return NextResponse.json(res)
}

export const POST = async (req: NextRequest) => {
  const params = await req.json()
  const { success, data, error } = createLinkSchema.safeParse(params)
  if (!success) {
    return NextResponse.json({ success: false, message: '参数错误', data: error }, { status: 400 })
  }
  const link = await createLink(data)
  return NextResponse.json({
    success: true,
    message: '创建成功',
    data: link,
  })
}
