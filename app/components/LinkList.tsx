'use client'

import { useQuery } from '@tanstack/react-query'

import { getLinkList } from '@/services/queries'

export default function LinkList() {
  const { data: linkList } = useQuery({
    queryKey: ['links'],
    queryFn: getLinkList,
  })

  return (
    <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-4 lg:grid-cols-6">
      {linkList?.map((link) => (
        <a key={link.url} className="rounded-lg border bg-background p-3" href={link.url} target="_blank">
          <h2 className="mb-2 text-lg font-medium">{link.name}</h2>
          <p className="text-zinc-500">{link.remark}</p>
        </a>
      ))}
    </div>
  )
}
