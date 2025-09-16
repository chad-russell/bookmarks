
'use client'

import React, { useState } from 'react'
import {
  TreeView as ShadcnTreeView,
  TreeDataItem,
} from '@/components/tree-view'
import { Folder, Bookmark } from '@/lib/types'
import { FolderIcon, FileIcon } from 'lucide-react'
import { getFaviconUrl } from '@/lib/favicon'
import { FolderContextMenuItems, BookmarkContextMenuItems } from './ContextMenuItems'
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

export function TreeView({ folders, bookmarks, onSelectedFolderChange }: TreeViewProps & { onSelectedFolderChange?: (folderId: string | null) => void }) {
  const { updateBookmark, deleteBookmark, updateFolder, deleteFolder, moveBookmark, moveFolder } =
    useBookmarks()
  const [editingBookmark, setEditingBookmark] = useState<Bookmark | null>(null)
  const [deletingBookmark, setDeletingBookmark] = useState<Bookmark | null>(
    null,
  )
  const [editingFolder, setEditingFolder] = useState<Folder | null>(null)
  const [deletingFolder, setDeletingFolder] = useState<Folder | null>(null)
  const [dragError, setDragError] = useState<string | null>(null)

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
      data: { kind: 'folder', id: folder.id },
      draggable: true,
      droppable: true,
      contextMenu: (
        <FolderContextMenuItems
          onEdit={() => setEditingFolder(folder)}
          onDelete={() => setDeletingFolder(folder)}
        />
      ),
      children: [
        ...convertDataToTree(folder.folders || [], folder.bookmarks || []),
      ],
    }))

    const bookmarkItems: TreeDataItem[] = bookmarks.map((bookmark) => ({
      id: bookmark.id,
      name: bookmark.name || bookmark.url,
      icon: <BookmarkIcon bookmark={bookmark} />,
      data: { kind: 'bookmark', id: bookmark.id },
      draggable: true,
      droppable: false, // Bookmarks can't have items dropped on them
      contextMenu: (
        <BookmarkContextMenuItems
          onEdit={() => setEditingBookmark(bookmark)}
          onDelete={() => setDeletingBookmark(bookmark)}
        />
      ),
      onClick: () => {
        window.open(bookmark.url, '_blank', 'noopener,noreferrer')
      },
    }))

    return [...folderItems, ...bookmarkItems]
  }

  const handleDocumentDrag = async (sourceItem: TreeDataItem, targetItem: TreeDataItem) => {
    const sourceData = sourceItem.data as { kind: string; id: string }
    const targetData = targetItem.data as { kind: string; id: string }

    // Clear any previous error
    setDragError(null)

    if (!sourceData) {
      setDragError('Invalid drag operation: missing source item data')
      return
    }

    try {
      // Handle drop on the root level (empty space at bottom)
      if (!targetData || targetItem.name === 'parent_div') {
        // Move to root level
        if (sourceData.kind === 'bookmark') {
          await moveBookmark(sourceData.id, null)
        } else if (sourceData.kind === 'folder') {
          await moveFolder(sourceData.id, null)
        }
        return
      }

      // Prevent dropping on bookmarks (they can't contain other items)
      if (targetData.kind === 'bookmark') {
        setDragError('Cannot drop items on bookmarks. Drop on folders or empty space instead.')
        return
      }

      // Determine if this is a re-parenting operation (dropping ON a folder)
      if (targetData.kind === 'folder') {
        // Re-parenting: move the item into the target folder
        if (sourceData.kind === 'bookmark') {
          await moveBookmark(sourceData.id, targetData.id)
        } else if (sourceData.kind === 'folder') {
          await moveFolder(sourceData.id, targetData.id)
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      setDragError(errorMessage)
      console.error('Drag operation failed:', error)
    }
  }

  const treeData = convertDataToTree(folders, bookmarks)

  return (
    <div className="w-full">
      {dragError && (
        <div className="mb-4 rounded-md border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
          <div className="flex items-center justify-between">
            <span>{dragError}</span>
            <button
              onClick={() => setDragError(null)}
              className="text-destructive hover:text-destructive/80"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {treeData.length > 0 ? (
        <ShadcnTreeView
          data={treeData}
          defaultLeafIcon={FileIcon}
          defaultNodeIcon={FolderIcon}
          onSelectChange={(item) => {
            if (!onSelectedFolderChange) return
            const data = item?.data as { kind?: string; id?: string } | undefined
            onSelectedFolderChange(data?.kind === 'folder' ? data.id ?? null : null)
          }}
          onDocumentDrag={handleDocumentDrag}
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
