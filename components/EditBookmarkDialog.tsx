'use client'

import { useState, useEffect } from 'react'
import { Bookmark } from '@/lib/types'
import { ResponsiveModal } from './ResponsiveModal'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'

import { DialogFooter } from './ui/dialog'

interface EditBookmarkDialogProps {
  bookmark: Bookmark
  onSave: (updatedBookmark: Bookmark) => void
  onClose: () => void
}

export const EditBookmarkDialog = ({
  bookmark,
  onSave,
  onClose,
}: EditBookmarkDialogProps) => {
  const [name, setName] = useState(bookmark.name || '')
  const [url, setUrl] = useState(bookmark.url)
  const [imageUrl, setImageUrl] = useState(bookmark.imageUrl || '')

  useEffect(() => {
    setName(bookmark.name || '')
    setUrl(bookmark.url)
    setImageUrl(bookmark.imageUrl || '')
  }, [bookmark])

  const handleSave = () => {
    onSave({ ...bookmark, name, url, imageUrl })
  }

  return (
    <ResponsiveModal isOpen={true} onClose={onClose} title="Edit Bookmark">
      <div className="mb-6 grid gap-4">
        <div className="grid gap-2 md:grid-cols-4 md:items-center md:gap-4">
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
        <div className="grid gap-2 md:grid-cols-4 md:items-center md:gap-4">
          <Label htmlFor="imageUrl" className="md:text-right">
            Image URL
          </Label>
          <Input
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
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
