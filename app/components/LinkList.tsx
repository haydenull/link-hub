'use client'

import { useQuery } from '@tanstack/react-query'
import { Shell } from 'lucide-react'

import type { Link } from '@/db/schema'
import { getLinkList } from '@/services/actions'

import LinkCard from './LinkCard'

export default function LinkList({ data }: { data: Link[] }) {
  if (data.length <= 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2">
        <Shell className="size-16 text-muted-foreground" />
        <p className="text-center text-sm text-muted-foreground">There are no links yet.</p>
      </div>
    )
  }

  return (
    <div className="m-5 grid grid-cols-[repeat(auto-fill,280px)] justify-center gap-5">
      {data?.map((link) => <LinkCard key={link.id} data={link} />)}
    </div>
  )
}
