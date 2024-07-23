'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import ConfirmDialog from '@/components/ConfirmDialog'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import type { Link as TypeLink } from '@/db/schema'
import { deleteLink } from '@/services/actions'
import { queries } from '@/services/queries'

import { UpdateLinkForm } from './LinkForm'

const LinkCard = ({ data }: { data: TypeLink }) => {
  const queryClient = useQueryClient()
  const { mutateAsync } = useMutation({
    mutationFn: () => deleteLink(data.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queries.links._def,
      })
    },
  })
  const [open, setOpen] = useState(false)
  const { url, id, name, remark, tags } = data
  return (
    <div className="group/link-card relative flex h-[120px] flex-col gap-2 rounded-lg border bg-background p-3">
      <a key={url} className="h-full w-full flex-1" href={url} target="_blank">
        <h2 className="mb-2 text-lg font-medium">{name}</h2>
        <p className="text-zinc-500">{remark}</p>
      </a>
      <div className="flex gap-1">
        {tags.map((tag) => (
          <Link
            key={tag.id}
            href={`/tag/${tag.id}`}
            className="inline-flex items-center rounded-full bg-muted px-2 py-1 text-xs font-medium text-muted-foreground"
          >
            {tag.name}
          </Link>
        ))}
      </div>
      <div
        className="invisible absolute right-0 top-0 flex gap-1 rounded-lg border px-2 py-1 text-muted-foreground
          group-hover/link-card:visible"
      >
        <ConfirmDialog
          title="Are you sure you want to delete this link?"
          description="This action cannot be undone."
          onOk={mutateAsync}
        >
          <Trash2 className="size-4 cursor-pointer text-rose-500" />
        </ConfirmDialog>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger>
            <Pencil className="size-4" />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className="mb-8">
              <SheetTitle>Edit</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your account and remove your data from our
                servers.
              </SheetDescription>
            </SheetHeader>
            <UpdateLinkForm linkData={data} onSuccess={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

export default LinkCard
