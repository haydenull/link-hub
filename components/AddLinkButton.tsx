'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'

import { CreateLinkForm } from '@/app/components/LinkForm'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Button } from './ui/button'

const AddLinkButton = () => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-1 w-4" />
          Add Link
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new link</DialogTitle>
        </DialogHeader>
        <CreateLinkForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}

export default AddLinkButton
