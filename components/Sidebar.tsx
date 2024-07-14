import { QueryClient } from '@tanstack/react-query'
import Link from 'next/link'

import type { Tag } from '@/db/schema'
import { getTagList } from '@/services/queries'

const Sidebar = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['tags'],
    queryFn: getTagList,
  })
  const tagList = queryClient.getQueryData<Tag[]>(['tags'])

  if (!tagList) return null

  return (
    <div className="h-screen w-[240px] border-r">
      {/* MARK: Dashboard */}
      <div className="my-2 flex flex-col">
        <Link className="px-2 py-1 text-foreground hover:bg-muted-foreground" href="/dashboard">
          Dashboard
        </Link>
        <Link className="px-2 py-1 text-foreground hover:bg-muted-foreground" href="/inbox">
          Inbox
        </Link>
      </div>
      {/* MARK: Tag Tree */}
      <div className="my-2 flex flex-col border-t">
        <h2 className="px-2 text-sm font-medium text-foreground">Tag Tree</h2>
        {tagList.map((tag) => (
          <Link key={tag.id} className="px-2 py-1 text-foreground hover:bg-muted-foreground" href={`/tag/${tag.id}`}>
            {tag.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
