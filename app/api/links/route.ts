import { NextResponse } from 'next/server'

import { getLinkListFromDrizzle } from '@/services/queries'

export const runtime = 'edge'

export const GET = async () => {
  const res = await getLinkListFromDrizzle()
  return NextResponse.json(res)
}
