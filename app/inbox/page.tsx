'use client'

import { useQuery } from '@tanstack/react-query'

import { getLinkList } from '@/services/actions'
import { queries } from '@/services/queries'

import LinkList from '../components/LinkList'

export const runtime = 'edge'

const Inbox = () => {
  const { data } = useQuery(queries.links.noTag)
  if (!data) return null
  return <LinkList data={data} />
}

export default Inbox
