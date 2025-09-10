'use client'

import { useState } from 'react'
import { ResponsiveModal } from './ResponsiveModal'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { DialogFooter } from './ui/dialog'
import { Bookmark } from '@/lib/types'

interface AddBookmarkDialogProps {
  onSave: (bookmark: Omit<Bookmark, 'id'>) => void
  onClose: () => void
}

export const AddBookmarkDialog = ({
  onSave,
  onClose,
}: AddBookmarkDialogProps) => {
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')

  const handleSave = () => {
    if (url.trim()) {
      onSave({ name: name.trim() || undefined, url: url.trim() })
    }
  }

  return (
    <ResponsiveModal isOpen={true} onClose={onClose} title="Add Bookmark">
      <div className="grid gap-4">
        <div className="mt-4 grid gap-2 md:grid-cols-4 md:items-center md:gap-4">
          <Label htmlFor="name" className="md:text-right">
            Name
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="md:col-span-3"
          />
        </div>
        <div className="grid gap-2 md:grid-cols-4 md:items-center md:gap-4">
          <Label htmlFor="url" className="md:text-right">
            URL
          </Label>
          <Input
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="md:col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogFooter>
    </ResponsiveModal>
  )
}
