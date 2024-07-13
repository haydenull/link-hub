import { NextResponse, type NextRequest } from 'next/server'

import { createTagSchema } from '@/db/schema'
import { createTag } from '@/services/queries'

export const runtime = 'edge'

export const POST = async (req: NextRequest) => {
  const params = await req.json()
  const { success, data, error } = createTagSchema.safeParse(params)
  if (!success) {
    return NextResponse.json({ success: false, message: '参数错误', data: error }, { status: 400 })
  }
  const tag = await createTag(data)
  return NextResponse.json({ success: true, message: '创建成功', data: tag })
}
