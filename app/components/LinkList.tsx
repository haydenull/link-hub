'use client'

import { useQuery } from '@tanstack/react-query'

import type { Link } from '@/db/schema'
import { getLinkList } from '@/services/actions'

import LinkCard from './LinkCard'

export default function LinkList({ data }: { data: Link[] }) {
  return (
    <div className="m-5 grid grid-cols-[repeat(auto-fill,280px)] justify-center gap-5">
      {data?.map((link) => <LinkCard key={link.id} data={link} />)}
    </div>
  )
}
