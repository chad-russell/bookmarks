'use client'

import React, { useState } from 'react'
import { Folder, Bookmark } from '@/lib/types'
import { useBookmarks } from '@/context/BookmarkContext'
import { TileView } from '@/components/TileView'
import { TreeView } from '@/components/TreeView'
import { ViewSwitcher } from '@/components/ViewSwitcher'
import { AddBookmarkDialog } from '@/components/AddBookmarkDialog'
import { AddFolderDialog } from '@/components/AddFolderDialog'
import { YamlEditor } from '@/components/YamlEditor'
import { ModeToggle } from '@/components/theme-toggle'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'

export default function Home() {
  const { folders, bookmarks, loading, error, addFolder, addBookmark } =
    useBookmarks()
  const [isAddingBookmark, setIsAddingBookmark] = useState(false)
  const [isAddingFolder, setIsAddingFolder] = useState(false)
  const [isEditingYaml, setIsEditingYaml] = useState(false)
  const [currentPath, setCurrentPath] = useState<Folder[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'tree'>('grid')
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null)

  const handleAddBookmarkClick = () => {
    setIsAddingBookmark(true)
  }

  const handleAddFolderClick = () => {
    setIsAddingFolder(true)
  }

  const handleCloseDialogs = () => {
    setIsAddingBookmark(false)
    setIsAddingFolder(false)
    setIsEditingYaml(false)
  }

  const handleSaveFolder = (name: string) => {
    const newFolder = {
      name,
      bookmarks: [],
      folders: [],
    }
    const parentId =
      viewMode === 'tree'
        ? selectedFolderId
        : currentPath.length > 0
          ? currentPath[currentPath.length - 1].id
          : null
    addFolder(parentId, newFolder)
    handleCloseDialogs()
  }

  const handleSaveBookmark = (bookmark: Omit<Bookmark, 'id'>) => {
    const parentId =
      viewMode === 'tree'
        ? selectedFolderId
        : currentPath.length > 0
          ? currentPath[currentPath.length - 1].id
          : null
    addBookmark(parentId, bookmark)
    handleCloseDialogs()
  }

  const handleFolderClick = (folder: Folder) => {
    setCurrentPath([...currentPath, folder])
  }

  const handleBreadcrumbClick = (index: number) => {
    setCurrentPath(currentPath.slice(0, index + 1))
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  const currentFolder =
    currentPath.length > 0 ? currentPath[currentPath.length - 1] : null
  const currentContents = currentFolder
    ? {
        folders: currentFolder.folders || [],
        bookmarks: currentFolder.bookmarks || [],
      }
    : { folders, bookmarks }

  return (
    <main className="flex h-screen flex-col">
      <div className="absolute top-4 right-4 flex gap-2">
        <ViewSwitcher viewMode={viewMode} setViewMode={setViewMode} />
        <ModeToggle />
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="mb-6">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink onClick={() => setCurrentPath([])}>
                  Bookmarks
                </BreadcrumbLink>
              </BreadcrumbItem>
              {currentPath.map((folder, index) => (
                <React.Fragment key={`path-${index}`}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem key={folder.id}>
                    <BreadcrumbLink
                      onClick={() => handleBreadcrumbClick(index)}
                    >
                      {folder.name}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>

          <div className="mb-4 flex gap-2">
            <Button onClick={handleAddBookmarkClick}>Add Bookmark</Button>
            <Button onClick={handleAddFolderClick} variant="outline">
              Add Folder
            </Button>
            <Button onClick={() => setIsEditingYaml(true)} variant="secondary">
              Edit YAML
            </Button>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <TileView
            folders={currentContents.folders}
            bookmarks={currentContents.bookmarks}
            onFolderClick={handleFolderClick}
          />
        ) : (
          <TreeView
            folders={currentContents.folders}
            bookmarks={currentContents.bookmarks}
            onSelectedFolderChange={setSelectedFolderId}
          />
        )}
      </div>
      {isAddingBookmark && (
        <AddBookmarkDialog
          onSave={handleSaveBookmark}
          onClose={handleCloseDialogs}
        />
      )}
      {isAddingFolder && (
        <AddFolderDialog
          onSave={handleSaveFolder}
          onClose={handleCloseDialogs}
        />
      )}
      {isEditingYaml && (
        <YamlEditor
          isOpen={isEditingYaml}
          onClose={handleCloseDialogs}
        />
      )}
    </main>
  )
}
