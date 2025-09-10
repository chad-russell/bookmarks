'use client'

import React from 'react'
import {
  TreeView as ShadcnTreeView,
  TreeDataItem,
} from '@/components/tree-view'
import { Folder, Bookmark } from '@/lib/types'
import { FolderIcon, FileIcon } from 'lucide-react'
import { getFaviconUrl } from '@/lib/favicon'

// Custom component for bookmark favicons
const BookmarkIcon = ({ bookmark }: { bookmark: Bookmark }) => {
  return (
    <img
      src={bookmark.imageUrl || getFaviconUrl(bookmark.url)}
      alt={`Favicon for ${bookmark.name || bookmark.url}`}
      className="mr-2 h-4 w-4 shrink-0 rounded-sm"
    />
  )
}

interface TreeViewProps {
  folders: Folder[]
  bookmarks: Bookmark[]
}

export function TreeView({ folders, bookmarks }: TreeViewProps) {
  const convertToTreeData = (
    folders: Folder[],
    bookmarks: Bookmark[],
  ): TreeDataItem[] => {
    const folderItems: TreeDataItem[] = folders.map((folder) => ({
      id: folder.id,
      name: folder.name,
      icon: FolderIcon,
      children: [
        ...convertToTreeData(folder.folders || [], []),
        ...(folder.bookmarks || []).map((bookmark) => ({
          id: bookmark.id,
          name: bookmark.name || bookmark.url,
          icon: <BookmarkIcon bookmark={bookmark} />,
        })),
      ],
    }))

    const bookmarkItems: TreeDataItem[] = bookmarks.map((bookmark) => ({
      id: bookmark.id,
      name: bookmark.name || bookmark.url,
      icon: <BookmarkIcon bookmark={bookmark} />,
    }))

    return [...folderItems, ...bookmarkItems]
  }

  const treeData = convertToTreeData(folders, bookmarks)

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
    </div>
  )
}
