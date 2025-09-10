'use client'

import { useState } from 'react'
import { Folder } from '@/lib/types'
import { useBookmarks } from '@/context/BookmarkContext'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { EditFolderDialog } from './EditFolderDialog'
import { DeleteConfirmationDialog } from './DeleteConfirmationDialog'

interface FileTreeViewProps {
  folders: Folder[]
  onSelectFolder: (folder: Folder) => void
}

export const FileTreeView = ({
  folders,
  onSelectFolder,
}: FileTreeViewProps) => {
  const { updateFolder, deleteFolder } = useBookmarks()
  const [editingFolder, setEditingFolder] = useState<Folder | null>(null)
  const [deletingFolder, setDeletingFolder] = useState<Folder | null>(null)

  const handleRename = (folder: Folder) => {
    setEditingFolder(folder)
  }

  const handleDelete = (folder: Folder) => {
    setDeletingFolder(folder)
  }

  return (
    <>
      <ul>
        {folders.map((folder) => (
          <li key={folder.id}>
            <ContextMenu>
              <ContextMenuTrigger>
                <div onClick={() => onSelectFolder(folder)}>{folder.name}</div>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem onClick={() => handleRename(folder)}>
                  Rename
                </ContextMenuItem>
                <ContextMenuItem onClick={() => handleDelete(folder)}>
                  Delete
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
            {folder.folders && folder.folders.length > 0 && (
              <FileTreeView
                folders={folder.folders}
                onSelectFolder={onSelectFolder}
              />
            )}
          </li>
        ))}
      </ul>
      {editingFolder && (
        <EditFolderDialog
          folder={editingFolder}
          onSave={(updatedFolder) => {
            updateFolder(updatedFolder.id, updatedFolder)
            setEditingFolder(null)
          }}
          onClose={() => setEditingFolder(null)}
        />
      )}
      {deletingFolder && (
        <DeleteConfirmationDialog
          itemName={deletingFolder.name}
          onConfirm={() => {
            deleteFolder(deletingFolder.id)
            setDeletingFolder(null)
          }}
          onClose={() => setDeletingFolder(null)}
        />
      )}
    </>
  )
}

