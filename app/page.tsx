import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

import { getLinkList } from '@/services/queries'

import LinkList from './components/LinkList'

export default async function Home() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['links'],
    queryFn: getLinkList,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LinkList />
    </HydrationBoundary>
  )
}
