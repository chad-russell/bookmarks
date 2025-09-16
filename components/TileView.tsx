'use client'

import { Folder as FolderType, Bookmark } from '@/lib/types'
import { BookmarkTile } from './BookmarkTile'
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu'
import { EditFolderDialog } from './EditFolderDialog'
import { DeleteConfirmationDialog } from './DeleteConfirmationDialog'
import { useBookmarks } from '@/context/BookmarkContext'
import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Folder } from 'lucide-react'

interface TileViewProps {
  folders?: FolderType[]
  bookmarks?: Bookmark[]
  onFolderClick?: (folder: FolderType) => void
}

export const TileView = ({
  folders,
  bookmarks,
  onFolderClick,
}: TileViewProps) => {
  const { updateFolder, deleteFolder } = useBookmarks()
  const [editFolder, setEditFolder] = useState<FolderType | null>(null)
  const [deleteFolderId, setDeleteFolderId] = useState<string | null>(null)

  const handleEditFolder = (folder: FolderType) => {
    setEditFolder(folder)
  }

  const handleDeleteFolder = (folderId: string) => {
    setDeleteFolderId(folderId)
  }

  const handleCloseEdit = () => {
    setEditFolder(null)
  }

  const handleCloseDelete = () => {
    setDeleteFolderId(null)
  }

  const handleSaveFolder = async (updatedFolder: FolderType) => {
    if (editFolder) {
      await updateFolder(editFolder.id, { name: updatedFolder.name })
    }
    handleCloseEdit()
  }

  const handleConfirmDelete = async () => {
    if (deleteFolderId) {
      await deleteFolder(deleteFolderId)
    }
    handleCloseDelete()
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {folders?.map((folder) => (
          <ContextMenu key={folder.id}>
            <ContextMenuTrigger asChild>
              <Card
                className="hover:bg-accent h-full w-full max-w-sm cursor-pointer transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  onFolderClick?.(folder)
                }}
              >
                <div className="flex h-full items-center px-4">
                  <div className="flex w-full flex-row items-center space-x-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100">
                      <Folder className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm leading-none font-bold">
                        {folder.name}
                      </h3>
                      <p className="truncate text-xs text-gray-500">Folder</p>
                    </div>
                  </div>
                </div>
              </Card>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem onSelect={() => handleEditFolder(folder)}>Edit</ContextMenuItem>
              <ContextMenuItem onSelect={() => handleDeleteFolder(folder.id)} variant="destructive">Delete</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        ))}
        {bookmarks?.map((bookmark) => (
          <BookmarkTile key={bookmark.id} bookmark={bookmark} />
        ))}
      </div>
      {editFolder && (
        <EditFolderDialog
          folder={editFolder}
          onSave={handleSaveFolder}
          onClose={handleCloseEdit}
        />
      )}
      {deleteFolderId && (
        <DeleteConfirmationDialog
          itemName="Folder"
          onConfirm={handleConfirmDelete}
          onClose={handleCloseDelete}
        />
      )}
    </>
  )
}
