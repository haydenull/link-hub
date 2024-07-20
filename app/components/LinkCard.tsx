'use client'

import { Pencil } from 'lucide-react'
import { useState } from 'react'

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import type { Link } from '@/db/schema'

import { UpdateLinkForm } from './LinkForm'

const LinkCard = ({ data }: { data: Link }) => {
  const [open, setOpen] = useState(false)
  const { url, id, name, remark, tags } = data
  return (
    <div className="relative h-[120px] rounded-lg border bg-background p-3">
      <a key={url} className="h-full w-full" href={url} target="_blank">
        <h2 className="mb-2 text-lg font-medium">{name}</h2>
        <p className="text-zinc-500">{remark}</p>
      </a>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Pencil className="absolute right-1 top-1 size-4" />
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
  )
}

export default LinkCard
