'use client'

import { useQuery } from '@tanstack/react-query'

import LinkList from '@/app/components/LinkList'
import { getLinkListByTagId } from '@/services/actions'
import { queries } from '@/services/queries'

export const runtime = 'edge'

const TagDetail = ({ params }: { params: { tagId: string } }) => {
  const tagId = params.tagId
  const { data } = useQuery(queries.links.byTagId(Number(tagId)))
  if (!data) return null
  return <LinkList data={data} />
}

export default TagDetail
