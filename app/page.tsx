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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  Plus, 
  FolderPlus, 
  Settings,
  Bookmark as BookmarkIcon,
  Loader2
} from 'lucide-react'

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
    return (
      <main className="flex h-screen flex-col items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          <span className="text-lg text-muted-foreground">Loading your bookmarks...</span>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="flex h-screen flex-col items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-destructive mb-2">Something went wrong</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </main>
    )
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
    <main className="flex h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <BookmarkIcon className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold">My Bookmarks</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <ViewSwitcher viewMode={viewMode} setViewMode={setViewMode} />
            
            {/* Settings Menu (with Edit YAML) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="h-4 w-4" />
                  <span className="sr-only">Settings</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsEditingYaml(true)}>
                  <Settings className="mr-2 h-4 w-4" />
                  Edit YAML
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <ModeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto max-w-7xl p-6">
          {/* Navigation */}
          <div className="mb-8">
            <Breadcrumb className="mb-6">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink 
                    onClick={() => setCurrentPath([])}
                    className="flex items-center gap-2 text-lg font-medium"
                  >
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {currentPath.map((folder, index) => (
                  <React.Fragment key={`path-${index}`}>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem key={folder.id}>
                      <BreadcrumbLink
                        onClick={() => handleBreadcrumbClick(index)}
                        className="text-lg font-medium"
                      >
                        {folder.name}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button onClick={handleAddBookmarkClick} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Bookmark
              </Button>
              <Button onClick={handleAddFolderClick} variant="outline" className="gap-2">
                <FolderPlus className="h-4 w-4" />
                Add Folder
              </Button>
            </div>
          </div>

          {/* Content Area */}
          <div className="min-h-[400px]">
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
        </div>
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
