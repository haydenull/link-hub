'use client'

import { useQuery } from '@tanstack/react-query'

import { getLinkList } from '@/services/actions'
import { queries } from '@/services/queries'

import LinkList from '../components/LinkList'

export const runtime = 'edge'

const Inbox = () => {
  const { data } = useQuery(queries.links.noTag)
  if (!data) return null
  return (
    <div className="h-full px-5 py-2">
      <LinkList data={data} />
    </div>
  )
}

export default Inbox
