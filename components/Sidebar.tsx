'use client'

import { useQuery } from '@tanstack/react-query'
import { Plus, Pencil } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import type { Tag } from '@/db/schema'
import { queries } from '@/services/queries'

import { CreateTagForm } from './TagForm'
import { UpdateTagForm } from './TagForm'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'

const Sidebar = () => {
  const { data: tagList } = useQuery(queries.tags.all)

  if (!tagList) return null

  return (
    <div className="h-screen w-[240px] border-r">
      {/* MARK: Dashboard */}
      <div className="my-2 flex flex-col">
        <Link className="px-2 py-1 text-foreground hover:bg-muted-foreground" href="/dashboard">
          Dashboard
        </Link>
        <Link className="px-2 py-1 text-foreground hover:bg-muted-foreground" href="/inbox">
          Inbox
        </Link>
      </div>
      {/* MARK: Tag Tree */}
      <div className="group my-2 flex flex-col border-t">
        <h2 className="flex h-5 justify-between px-2 text-sm font-medium text-foreground">
          <span>Tag Tree</span>
          <CreateTagButton />
        </h2>
        {tagList.map((tag) => (
          <div key={tag.id} className="group/tag-item flex px-2 py-1 text-foreground hover:bg-muted-foreground">
            <Link className="flex-1" href={`/tag/${tag.id}`}>
              {tag.name}
            </Link>
            <EditTagButton tagData={tag} />
          </div>
        ))}
      </div>
    </div>
  )
}

function CreateTagButton() {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Plus className="invisible w-4 cursor-pointer group-hover:visible" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Tag</DialogTitle>
        </DialogHeader>
        <CreateTagForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
function EditTagButton({ tagData }: { tagData: Tag }) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Pencil className="invisible w-4 cursor-pointer group-hover/tag-item:visible" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Tag</DialogTitle>
        </DialogHeader>
        <UpdateTagForm tagData={tagData} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}

export default Sidebar
