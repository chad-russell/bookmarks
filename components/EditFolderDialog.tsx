'use client'

import { useState, useEffect } from 'react'
import { Folder } from '@/lib/types'
import { ResponsiveModal } from './ResponsiveModal'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'

import { DialogFooter } from './ui/dialog'

interface EditFolderDialogProps {
  folder: Folder
  onSave: (updatedFolder: Folder) => void
  onClose: () => void
}

export const EditFolderDialog = ({
  folder,
  onSave,
  onClose,
}: EditFolderDialogProps) => {
  const [name, setName] = useState(folder.name)

  useEffect(() => {
    setName(folder.name)
  }, [folder])

  const handleSave = () => {
    onSave({ ...folder, name })
  }

  return (
    <ResponsiveModal isOpen={true} onClose={onClose} title="Edit Folder">
      <div className="mb-6 grid gap-4">
        DialogHeader, DialogTitle, DialogDescription, DialogContent
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
