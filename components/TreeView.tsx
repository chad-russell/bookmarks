
'use client'

import React, { useState } from 'react'
import {
  TreeView as ShadcnTreeView,
  TreeDataItem,
} from '@/components/tree-view'
import { Folder, Bookmark } from '@/lib/types'
import { FolderIcon, FileIcon } from 'lucide-react'
import { getFaviconUrl } from '@/lib/favicon'
import { ContextMenuItem } from '@/components/ui/context-menu'
import { EditBookmarkDialog } from './EditBookmarkDialog'
import { DeleteConfirmationDialog } from './DeleteConfirmationDialog'
import { useBookmarks } from '@/context/BookmarkContext'
import { EditFolderDialog } from './EditFolderDialog'

const BookmarkIcon = ({ bookmark }: { bookmark: Bookmark }) => (
  <img
    src={bookmark.imageUrl || getFaviconUrl(bookmark.url)}
    alt={`Favicon for ${bookmark.name || bookmark.url}`}
    className="mr-2 h-4 w-4 shrink-0 rounded-sm"
  />
)

interface TreeViewProps {
  folders: Folder[]
  bookmarks: Bookmark[]
}

export function TreeView({ folders, bookmarks }: TreeViewProps) {
  const { updateBookmark, deleteBookmark, updateFolder, deleteFolder } =
    useBookmarks()
  const [editingBookmark, setEditingBookmark] = useState<Bookmark | null>(null)
  const [deletingBookmark, setDeletingBookmark] = useState<Bookmark | null>(
    null,
  )
  const [editingFolder, setEditingFolder] = useState<Folder | null>(null)
  const [deletingFolder, setDeletingFolder] = useState<Folder | null>(null)

  const handleSaveBookmark = async (updatedBookmark: Bookmark) => {
    await updateBookmark(updatedBookmark.id, { ...updatedBookmark })
    setEditingBookmark(null)
  }

  const handleConfirmDeleteBookmark = async () => {
    if (deletingBookmark) {
      await deleteBookmark(deletingBookmark.id)
      setDeletingBookmark(null)
    }
  }

  const handleSaveFolder = async (updatedFolder: Folder) => {
    await updateFolder(updatedFolder.id, { name: updatedFolder.name })
    setEditingFolder(null)
  }

  const handleConfirmDeleteFolder = async () => {
    if (deletingFolder) {
      await deleteFolder(deletingFolder.id)
      setDeletingFolder(null)
    }
  }

  const convertDataToTree = (
    folders: Folder[],
    bookmarks: Bookmark[],
  ): TreeDataItem[] => {
    const folderItems: TreeDataItem[] = folders.map((folder) => ({
      id: folder.id,
      name: folder.name,
      icon: FolderIcon,
      contextMenu: (
        <>
          <ContextMenuItem onSelect={() => setEditingFolder(folder)}>
            Edit
          </ContextMenuItem>
          <ContextMenuItem onSelect={() => setDeletingFolder(folder)}>
            Delete
          </ContextMenuItem>
        </>
      ),
      children: [
        ...convertDataToTree(folder.folders || [], folder.bookmarks || []),
      ],
    }))

    const bookmarkItems: TreeDataItem[] = bookmarks.map((bookmark) => ({
      id: bookmark.id,
      name: bookmark.name || bookmark.url,
      icon: <BookmarkIcon bookmark={bookmark} />,
      contextMenu: (
        <>
          <ContextMenuItem onSelect={() => setEditingBookmark(bookmark)}>
            Edit
          </ContextMenuItem>
          <ContextMenuItem onSelect={() => setDeletingBookmark(bookmark)}>
            Delete
          </ContextMenuItem>
        </>
      ),
      onClick: () => {
        window.open(bookmark.url, '_blank', 'noopener,noreferrer')
      },
    }))

    return [...folderItems, ...bookmarkItems]
  }

  const treeData = convertDataToTree(folders, bookmarks)

  return (
    <div className="w-full">
      {treeData.length > 0 ? (
        <ShadcnTreeView
          data={treeData}
          defaultLeafIcon={FileIcon}
          defaultNodeIcon={FolderIcon}
        />
      ) : (
        <p className="text-muted-foreground">
          No folders or bookmarks to display
        </p>
      )}

      {editingBookmark && (
        <EditBookmarkDialog
          bookmark={editingBookmark}
          onSave={handleSaveBookmark}
          onClose={() => setEditingBookmark(null)}
        />
      )}
      {deletingBookmark && (
        <DeleteConfirmationDialog
          itemName={deletingBookmark.name || deletingBookmark.url}
          onConfirm={handleConfirmDeleteBookmark}
          onClose={() => setDeletingBookmark(null)}
        />
      )}
      {editingFolder && (
        <EditFolderDialog
          folder={editingFolder}
          onSave={handleSaveFolder}
          onClose={() => setEditingFolder(null)}
        />
      )}
      {deletingFolder && (
        <DeleteConfirmationDialog
          itemName={deletingFolder.name}
          onConfirm={handleConfirmDeleteFolder}
          onClose={() => setDeletingFolder(null)}
        />
      )}
    </div>
  )
}
