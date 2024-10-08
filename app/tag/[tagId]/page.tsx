'use client'

import { useQuery } from '@tanstack/react-query'

import LinkList from '@/app/components/LinkList'
import { getLinkListByTagId } from '@/services/actions'
import { queries } from '@/services/queries'

export const runtime = 'edge'

const TagDetail = ({ params }: { params: { tagId: string } }) => {
  const tagId = params.tagId
  const { data: tag } = useQuery(queries.tags.byId(Number(tagId)))
  const { data, isLoading } = useQuery(queries.links.byTagId(Number(tagId)))

  return (
    <div className="h-full px-5 py-2">
      {tag ? <div className="mb-5 text-sm text-muted-foreground">#{tag.name}</div> : null}
      {isLoading ? null : <LinkList data={data ?? []} />}
    </div>
  )
}

export default TagDetail
