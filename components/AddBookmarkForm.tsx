'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { useBookmarks } from '@/context/BookmarkContext'

interface AddBookmarkFormProps {
  folderId: string
  onClose: () => void
}

export const AddBookmarkForm = ({
  folderId,
  onClose,
}: AddBookmarkFormProps) => {
  const { addBookmark } = useBookmarks()
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (url.trim()) {
      addBookmark(folderId, { name: name.trim() || undefined, url: url.trim() })
      setName('')
      setUrl('')
      onClose()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name (optional)</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter bookmark name"
        />
      </div>
      <div>
        <Label htmlFor="url">URL</Label>
        <Input
          id="url"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
          required
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Add Bookmark</Button>
      </div>
    </form>
  )
}
