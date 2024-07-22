'use client'

import { ChevronDown, ChevronRight, Pencil } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

import type { Tag } from '@/db/schema'

import { UpdateTagForm } from './TagForm'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'

interface TreeTag {
  id: number
  name: string
  fullPath: string
  children?: TreeTag[]
}

interface TagTreeProps {
  tags: TreeTag[]
}

const TagTree: React.FC<TagTreeProps> = ({ tags }) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const toggleExpand = (fullPath: string) => {
    setExpanded((prev) => ({ ...prev, [fullPath]: !prev[fullPath] }))
  }

  const renderTree = (nodes: TreeTag[] = []) => {
    return (
      <ul className="pl-4">
        {nodes.map((node) => {
          const hasChildren = node.children && node.children.length > 0

          return (
            <li key={node.fullPath} className="my-2">
              <div className="group/tag-item flex items-center justify-between text-foreground hover:bg-muted-foreground">
                <div className="flex flex-1">
                  {hasChildren ? (
                    <button onClick={() => toggleExpand(node.fullPath)} className="mr-1 focus:outline-none">
                      {expanded[node.fullPath] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </button>
                  ) : (
                    <span className="mr-1 h-4 w-4"></span>
                  )}
                  <Link href={`/tag/${node.id}`} className="flex-1">
                    <span>{node.name}</span>
                    {/* {node.id >= 0 && <span className="ml-2 text-sm text-gray-500">(ID: {node.id})</span>} */}
                  </Link>
                </div>
                <EditTagButton tagData={node} />
              </div>
              {hasChildren && expanded[node.fullPath] && renderTree(node.children)}
            </li>
          )
        })}
      </ul>
    )
  }

  return <div className="font-sans">{renderTree(tags)}</div>
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

export default TagTree
