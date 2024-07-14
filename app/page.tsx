import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

import Sidebar from '@/components/Sidebar'
import { getLinkList } from '@/services/queries'

import LinkList from './components/LinkList'

export const runtime = 'edge'

export default async function Home() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['links'],
    queryFn: getLinkList,
  })
  // const { data: linkList } = useQuery({
  //   queryKey: ['links'],
  //   queryFn: getLinkList,
  // })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>Home</div>
    </HydrationBoundary>
  )
}
