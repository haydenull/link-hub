import { Shell } from 'lucide-react'
import Masonry from 'react-layout-masonry'

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
    <Masonry columns={{ 640: 1, 768: 2, 1024: 3, 1280: 4 }} gap={16}>
      {data?.map((link) => <LinkCard key={link.id} data={link} />)}
    </Masonry>
  )
}
