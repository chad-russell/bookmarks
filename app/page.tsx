'use client'

import { useState, useEffect } from 'react'
import { FileTreeView } from '@/components/FileTreeView'
import { TileView } from '@/components/TileView'
import { Folder } from '@/lib/types'
import { useBookmarks } from '@/context/BookmarkContext'
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable'

import { AddBookmarkForm } from '@/components/AddBookmarkForm'
import { ModeToggle } from '@/components/theme-toggle'

export default function Home() {
  const { folders, loading, error, addBookmark, addFolder } = useBookmarks()
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null)

  // Effect to select the first folder once data is loaded
  useEffect(() => {
    if (folders.length > 0 && !selectedFolder) {
      setSelectedFolder(folders[0])
    }
  }, [folders])

  const handleSelectFolder = (folder: Folder) => {
    setSelectedFolder(folder)
  }

  const handleAddBookmark = () => {
    if (selectedFolder) {
      const newBookmark = { url: `https://www.new-bookmark.com/${Date.now()}` }
      addBookmark(selectedFolder.id, newBookmark)
    }
  }

  const handleAddFolder = () => {
    const newFolder = {
      name: `New Folder ${Date.now()}`,
      bookmarks: [],
      folders: [],
    }
    // For simplicity, this adds a root folder. A real implementation would handle nesting.
    addFolder(null, newFolder)
  }

  const bookmarksToShow = selectedFolder?.bookmarks || []

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <main>
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <main className="flex h-screen">
        <div className="w-72 border-r p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">Folders</h2>
            <button
              onClick={handleAddFolder}
              className="rounded bg-gray-200 px-2 py-1 text-xs"
            >
              +
            </button>
          </div>
          <FileTreeView folders={folders} onSelectFolder={handleSelectFolder} />
        </div>
        <div className="flex-1 p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">
              {selectedFolder ? selectedFolder.name : 'Select a folder'}
            </h2>
          </div>
          {selectedFolder && (
            <div className="mb-4">
              <AddBookmarkForm
                folderId={selectedFolder.id}
                onClose={() => {}}
              />
            </div>
          )}
          <TileView bookmarks={bookmarksToShow} />
        </div>
      </main>
    </main>
  )
}
