'use client'

import { useQuery } from '@tanstack/react-query'

import type { Link } from '@/db/schema'
import { getLinkList } from '@/services/queries'

import LinkCard from './LinkCard'

export default function LinkList({ data }: { data: Link[] }) {
  return (
    <div className="grid-ro grid grid-cols-6 gap-4 p-4">
      {data?.map((link) => <LinkCard key={link.id} data={link} />)}
    </div>
  )
}
