import { Skeleton } from '@/components/ui/skeleton'

const Loading = () => {
  return (
    <div className="m-5 grid grid-cols-[repeat(auto-fill,280px)] justify-center gap-5">
      {[...new Array(6)].map((_, i) => (
        <div key={i} className="flex h-[140px] flex-col gap-2 rounded-lg border bg-background p-3">
          <Skeleton className="h-5" />
          <div className="my-3 space-y-2">
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
          </div>
          <Skeleton className="h-3 w-[50px]" />
        </div>
      ))}
    </div>
  )
}

export default Loading
