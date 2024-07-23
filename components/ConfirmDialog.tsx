'use client'

import { Loader2 } from 'lucide-react'
import { useState } from 'react'

import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'

const ConfirmDialog = ({
  children,
  title = 'Are you sure?',
  description,
  onOk,
}: {
  children: React.ReactNode
  title?: string
  description?: string
  onOk?: () => Promise<unknown>
}) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const onConfirm = async () => {
    if (onOk) {
      setLoading(true)
      await onOk()
    }
    setOpen(false)
    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description ? <DialogDescription>{description}</DialogDescription> : null}
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onConfirm}>
            {loading ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmDialog
