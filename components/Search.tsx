'use client'

import { useDebouncedState } from '@react-hookz/web'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { queries } from '@/services/queries'

import { Button } from './ui/button'

export default function Search() {
  const [open, setOpen] = useState(false)
  const [keyword, setKeyword] = useDebouncedState('', 800, 2000)
  const { data: linkList, isLoading: isLinkListLoading } = useQuery(queries.links.byKeyword(keyword))
  const { data: tagList, isLoading: isTagListLoading } = useQuery(queries.tags.byKeyword(keyword))
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="flex justify-between bg-muted text-muted-foreground"
        onClick={() => setOpen(true)}
      >
        Search link or tag...
        <kbd
          className="pointer-events-none ml-3 inline-flex h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono
            text-[10px] font-medium text-foreground opacity-100"
        >
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen} commandProps={{ shouldFilter: false }}>
        <CommandInput placeholder="Type a keyword..." onValueChange={setKeyword} />
        <CommandList>
          {isLinkListLoading || isTagListLoading ? (
            <Loader2 className="mx-auto my-4 size-4 animate-spin text-muted-foreground" />
          ) : (
            <CommandEmpty>No results found.</CommandEmpty>
          )}
          {tagList?.length ? (
            <>
              <CommandGroup heading="Tags">
                {tagList?.map(({ id, name }) => (
                  <CommandItem
                    key={id}
                    onSelect={() => {
                      router.push(`/tag/${id}`)
                      setOpen(false)
                    }}
                  >
                    {name}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </>
          ) : null}
          {linkList?.length ? (
            <CommandGroup heading="Links">
              {linkList?.map(({ id, name, url, remark, tags }) => (
                <CommandItem key={id} onSelect={() => window.open(url)}>
                  <div>
                    <h2 className="line-clamp-1 font-medium">{name ?? url}</h2>
                    <p className="line-clamp-2 text-muted-foreground">{remark}</p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          ) : null}
        </CommandList>
      </CommandDialog>
    </>
  )
}
