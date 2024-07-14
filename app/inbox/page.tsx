'use client'

import { useQuery } from '@tanstack/react-query'

import { getLinkList } from '@/services/queries'

import LinkList from '../components/LinkList'

export const runtime = 'edge'

const Inbox = () => {
  const { data } = useQuery({
    queryKey: ['links'],
    queryFn: getLinkList,
  })
  const linkListWithoutTag = data?.filter((link) => link.tags?.length === 0)
  if (!linkListWithoutTag) return null
  return <LinkList data={linkListWithoutTag} />
}

export default Inbox
