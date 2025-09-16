'use client'

import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from 'react'
import { Folder, Bookmark } from '@/lib/types'
import { v4 as uuidv4 } from 'uuid'

interface BookmarkContextType {
  folders: Folder[]
  bookmarks: Bookmark[]
  loading: boolean
  error: string | null
  yamlContent: string | null
  addBookmark: (
    folderId: string | null,
    bookmark: Omit<Bookmark, 'id'>,
  ) => Promise<void>
  updateBookmark: (
    bookmarkId: string,
    updates: Partial<Bookmark>,
  ) => Promise<void>
  deleteBookmark: (bookmarkId: string) => Promise<void>
  addFolder: (
    parentId: string | null,
    folder: Omit<Folder, 'id'>,
  ) => Promise<void>
  updateFolder: (folderId: string, updates: Partial<Folder>) => Promise<void>
  deleteFolder: (folderId: string) => Promise<void>
  moveBookmark: (
    bookmarkId: string,
    targetFolderId: string | null,
    newIndex?: number,
  ) => Promise<void>
  moveFolder: (
    folderId: string,
    targetFolderId: string | null,
    newIndex?: number,
  ) => Promise<void>
  saveYamlContent: (content: string) => Promise<void>
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(
  undefined,
)

// Helper functions to recursively find and update data
const findAndDelete = (items: (Folder | Bookmark)[], id: string) => {
  return items.filter((item) => {
    if ('folders' in item && item.folders) {
      item.folders = findAndDelete(item.folders, id) as Folder[]
    }
    if ('bookmarks' in item && item.bookmarks) {
      item.bookmarks = findAndDelete(item.bookmarks, id) as Bookmark[]
    }
    return item.id !== id
  })
}

const findAndUpdate = (
  items: (Folder | Bookmark)[],
  id: string,
  updates: Partial<Folder | Bookmark>,
) => {
  return items.map((item) => {
    if (item.id === id) {
      return { ...item, ...updates }
    }
    if ('folders' in item && item.folders) {
      item.folders = findAndUpdate(item.folders, id, updates) as Folder[]
    }
    if ('bookmarks' in item && item.bookmarks) {
      item.bookmarks = findAndUpdate(item.bookmarks, id, updates) as Bookmark[]
    }
    return item
  })
}

const findAndAdd = (
  items: Folder[],
  parentId: string,
  newItem: Folder | Bookmark,
) => {
  return items.map((item) => {
    if (item.id === parentId) {
      if ('url' in newItem) {
        // It's a bookmark
        item.bookmarks = [...(item.bookmarks || []), newItem]
      } else {
        // It's a folder
        item.folders = [...(item.folders || []), newItem]
      }
    } else if (item.folders) {
      item.folders = findAndAdd(item.folders, parentId, newItem)
    }
    return item
  })
}

// Helper function to recursively assign IDs to folders and bookmarks
const assignIds = (items: (Folder | Bookmark)[]): any[] => {
  return items.map((item) => {
    const newItem = { ...item, id: item.id || uuidv4() }
    if ('folders' in newItem && newItem.folders) {
      newItem.folders = assignIds(newItem.folders)
    }
    if ('bookmarks' in newItem && newItem.bookmarks) {
      newItem.bookmarks = assignIds(newItem.bookmarks)
    }
    return newItem
  })
}

// Helper function to find an item's location (parent and index)
const findItemLocation = (
  folders: Folder[],
  bookmarks: Bookmark[],
  itemId: string,
): { parentId: string | null; index: number; type: 'folder' | 'bookmark' } | null => {
  // Check root level bookmarks
  const bookmarkIndex = bookmarks.findIndex((b) => b.id === itemId)
  if (bookmarkIndex !== -1) {
    return { parentId: null, index: bookmarkIndex, type: 'bookmark' }
  }

  // Check root level folders
  const folderIndex = folders.findIndex((f) => f.id === itemId)
  if (folderIndex !== -1) {
    return { parentId: null, index: folderIndex, type: 'folder' }
  }

  // Check nested folders recursively
  for (const folder of folders) {
    const result = findItemLocationInFolder(folder, itemId)
    if (result) return result
  }

  return null
}

const findItemLocationInFolder = (
  folder: Folder,
  itemId: string,
): { parentId: string; index: number; type: 'folder' | 'bookmark' } | null => {
  // Check bookmarks in this folder
  if (folder.bookmarks) {
    const bookmarkIndex = folder.bookmarks.findIndex((b) => b.id === itemId)
    if (bookmarkIndex !== -1) {
      return { parentId: folder.id, index: bookmarkIndex, type: 'bookmark' }
    }
  }

  // Check subfolders in this folder
  if (folder.folders) {
    const folderIndex = folder.folders.findIndex((f) => f.id === itemId)
    if (folderIndex !== -1) {
      return { parentId: folder.id, index: folderIndex, type: 'folder' }
    }

    // Check nested folders recursively
    for (const subfolder of folder.folders) {
      const result = findItemLocationInFolder(subfolder, itemId)
      if (result) return result
    }
  }

  return null
}

// Helper function to remove an item from its current location
const removeItem = (
  folders: Folder[],
  bookmarks: Bookmark[],
  itemId: string,
): { 
  updatedFolders: Folder[]; 
  updatedBookmarks: Bookmark[]; 
  removedItem: Folder | Bookmark | null 
} => {
  let removedItem: Folder | Bookmark | null = null

  // Try to remove from root bookmarks
  const bookmarkIndex = bookmarks.findIndex((b) => b.id === itemId)
  if (bookmarkIndex !== -1) {
    removedItem = bookmarks[bookmarkIndex]
    return {
      updatedFolders: [...folders],
      updatedBookmarks: bookmarks.filter((b) => b.id !== itemId),
      removedItem,
    }
  }

  // Try to remove from root folders
  const folderIndex = folders.findIndex((f) => f.id === itemId)
  if (folderIndex !== -1) {
    removedItem = folders[folderIndex]
    return {
      updatedFolders: folders.filter((f) => f.id !== itemId),
      updatedBookmarks: [...bookmarks],
      removedItem,
    }
  }

  // Remove from nested folders
  const updatedFolders = folders.map((folder) => removeItemFromFolder(folder, itemId, (item) => {
    removedItem = item
  }))

  return {
    updatedFolders,
    updatedBookmarks: [...bookmarks],
    removedItem,
  }
}

const removeItemFromFolder = (
  folder: Folder,
  itemId: string,
  onRemoved: (item: Folder | Bookmark) => void,
): Folder => {
  const updatedFolder = { ...folder }

  // Remove from bookmarks
  if (updatedFolder.bookmarks) {
    const bookmarkIndex = updatedFolder.bookmarks.findIndex((b) => b.id === itemId)
    if (bookmarkIndex !== -1) {
      onRemoved(updatedFolder.bookmarks[bookmarkIndex])
      updatedFolder.bookmarks = updatedFolder.bookmarks.filter((b) => b.id !== itemId)
      return updatedFolder
    }
  }

  // Remove from subfolders
  if (updatedFolder.folders) {
    const folderIndex = updatedFolder.folders.findIndex((f) => f.id === itemId)
    if (folderIndex !== -1) {
      onRemoved(updatedFolder.folders[folderIndex])
      updatedFolder.folders = updatedFolder.folders.filter((f) => f.id !== itemId)
      return updatedFolder
    }

    // Recursively remove from nested folders
    updatedFolder.folders = updatedFolder.folders.map((subfolder) =>
      removeItemFromFolder(subfolder, itemId, onRemoved)
    )
  }

  return updatedFolder
}

// Helper function to insert an item at a specific location
const insertItem = (
  folders: Folder[],
  bookmarks: Bookmark[],
  item: Folder | Bookmark,
  targetFolderId: string | null,
  index?: number,
): { updatedFolders: Folder[]; updatedBookmarks: Bookmark[] } => {
  if (targetFolderId === null) {
    // Insert at root level
    if ('url' in item) {
      // It's a bookmark
      const updatedBookmarks = [...bookmarks]
      if (index !== undefined && index >= 0 && index <= updatedBookmarks.length) {
        updatedBookmarks.splice(index, 0, item)
      } else {
        updatedBookmarks.push(item)
      }
      return { updatedFolders: [...folders], updatedBookmarks }
    } else {
      // It's a folder
      const updatedFolders = [...folders]
      if (index !== undefined && index >= 0 && index <= updatedFolders.length) {
        updatedFolders.splice(index, 0, item)
      } else {
        updatedFolders.push(item)
      }
      return { updatedFolders, updatedBookmarks: [...bookmarks] }
    }
  } else {
    // Insert into a specific folder
    const updatedFolders = folders.map((folder) =>
      insertItemIntoFolder(folder, item, targetFolderId, index)
    )
    return { updatedFolders, updatedBookmarks: [...bookmarks] }
  }
}

const insertItemIntoFolder = (
  folder: Folder,
  item: Folder | Bookmark,
  targetFolderId: string,
  index?: number,
): Folder => {
  if (folder.id === targetFolderId) {
    const updatedFolder = { ...folder }
    
    if ('url' in item) {
      // It's a bookmark
      updatedFolder.bookmarks = updatedFolder.bookmarks || []
      if (index !== undefined && index >= 0 && index <= updatedFolder.bookmarks.length) {
        updatedFolder.bookmarks.splice(index, 0, item)
      } else {
        updatedFolder.bookmarks.push(item)
      }
    } else {
      // It's a folder
      updatedFolder.folders = updatedFolder.folders || []
      if (index !== undefined && index >= 0 && index <= updatedFolder.folders.length) {
        updatedFolder.folders.splice(index, 0, item)
      } else {
        updatedFolder.folders.push(item)
      }
    }
    
    return updatedFolder
  }

  // Recursively search in subfolders
  if (folder.folders) {
    return {
      ...folder,
      folders: folder.folders.map((subfolder) =>
        insertItemIntoFolder(subfolder, item, targetFolderId, index)
      ),
    }
  }

  return folder
}

// Helper function to check if moving a folder would create a circular dependency
const wouldCreateCircularDependency = (
  folders: Folder[],
  folderId: string,
  targetFolderId: string,
): boolean => {
  if (folderId === targetFolderId) return true

  const findFolder = (folders: Folder[], id: string): Folder | null => {
    for (const folder of folders) {
      if (folder.id === id) return folder
      if (folder.folders) {
        const found = findFolder(folder.folders, id)
        if (found) return found
      }
    }
    return null
  }

  const isDescendant = (folders: Folder[], ancestorId: string, descendantId: string): boolean => {
    const ancestor = findFolder(folders, ancestorId)
    if (!ancestor || !ancestor.folders) return false

    for (const subfolder of ancestor.folders) {
      if (subfolder.id === descendantId) return true
      if (isDescendant([subfolder], subfolder.id, descendantId)) return true
    }
    return false
  }

  return isDescendant(folders, folderId, targetFolderId)
}

export const BookmarkProvider = ({ children }: { children: ReactNode }) => {
  const [folders, setFolders] = useState<Folder[]>([])
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [yamlContent, setYamlContent] = useState<string | null>(null)

  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/bookmarks')
        if (!response.ok) {
          throw new Error('Failed to fetch bookmarks')
        }
        const data = await response.json()
        const migratedFolders = assignIds(data.folders || []) as Folder[]
        const migratedBookmarks = assignIds(data.bookmarks || []) as Bookmark[]
        setFolders(migratedFolders)
        setBookmarks(migratedBookmarks)
        console.log('Setting yamlContent:', data.rawYaml)
        setYamlContent(data.rawYaml || null)
      } catch (err: unknown) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }
    loadBookmarks()
  }, [])

  const saveBookmarks = async (updatedData: {
    folders: Folder[]
    bookmarks: Bookmark[]
  }) => {
    try {
      const response = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      })
      if (!response.ok) {
        throw new Error('Failed to save bookmarks')
      }
      setFolders(updatedData.folders)
      setBookmarks(updatedData.bookmarks)
    } catch (err: unknown) {
      setError((err as Error).message)
    }
  }

  const addBookmark = async (
    folderId: string | null,
    bookmark: Omit<Bookmark, 'id'>,
  ) => {
    const newBookmark = { ...bookmark, id: uuidv4() }
    let updatedFolders = [...folders]
    let updatedBookmarks = [...bookmarks]

    if (folderId) {
      updatedFolders = findAndAdd(folders, folderId, newBookmark)
    } else {
      updatedBookmarks.push(newBookmark)
    }
    await saveBookmarks({
      folders: updatedFolders,
      bookmarks: updatedBookmarks,
    })
  }

  const updateBookmark = async (
    bookmarkId: string,
    updates: Partial<Bookmark>,
  ) => {
    let updatedFolders = findAndUpdate(folders, bookmarkId, updates) as Folder[]
    let updatedBookmarks = findAndUpdate(
      bookmarks,
      bookmarkId,
      updates,
    ) as Bookmark[]
    await saveBookmarks({
      folders: updatedFolders,
      bookmarks: updatedBookmarks,
    })
  }

  const deleteBookmark = async (bookmarkId: string) => {
    const updatedFolders = findAndDelete(folders, bookmarkId) as Folder[]
    const updatedBookmarks = bookmarks.filter((b) => b.id !== bookmarkId)
    await saveBookmarks({
      folders: updatedFolders,
      bookmarks: updatedBookmarks,
    })
  }

  const addFolder = async (
    parentId: string | null,
    folder: Omit<Folder, 'id'>,
  ) => {
    const newFolder = { ...folder, id: uuidv4(), folders: [], bookmarks: [] }
    let updatedFolders
    if (parentId) {
      updatedFolders = findAndAdd(folders, parentId, newFolder)
    } else {
      updatedFolders = [...folders, newFolder]
    }
    await saveBookmarks({ folders: updatedFolders, bookmarks })
  }

  const updateFolder = async (folderId: string, updates: Partial<Folder>) => {
    const updatedFolders = findAndUpdate(folders, folderId, updates) as Folder[]
    await saveBookmarks({ folders: updatedFolders, bookmarks })
  }

  const deleteFolder = async (folderId: string) => {
    const updatedFolders = findAndDelete(folders, folderId) as Folder[]
    await saveBookmarks({ folders: updatedFolders, bookmarks })
  }

  const moveBookmark = async (
    bookmarkId: string,
    targetFolderId: string | null,
    newIndex?: number,
  ) => {
    // Remove the bookmark from its current location
    const { updatedFolders, updatedBookmarks, removedItem } = removeItem(
      folders,
      bookmarks,
      bookmarkId,
    )

    if (!removedItem || 'folders' in removedItem) {
      throw new Error('Bookmark not found or invalid item type')
    }

    // Insert the bookmark at the new location
    const { updatedFolders: finalFolders, updatedBookmarks: finalBookmarks } =
      insertItem(updatedFolders, updatedBookmarks, removedItem, targetFolderId, newIndex)

    await saveBookmarks({
      folders: finalFolders,
      bookmarks: finalBookmarks,
    })
  }

  const moveFolder = async (
    folderId: string,
    targetFolderId: string | null,
    newIndex?: number,
  ) => {
    // Check for circular dependencies if moving into another folder
    if (targetFolderId && wouldCreateCircularDependency(folders, folderId, targetFolderId)) {
      throw new Error('Cannot move folder: would create circular dependency')
    }

    // Remove the folder from its current location
    const { updatedFolders, updatedBookmarks, removedItem } = removeItem(
      folders,
      bookmarks,
      folderId,
    )

    if (!removedItem || 'url' in removedItem) {
      throw new Error('Folder not found or invalid item type')
    }

    // Insert the folder at the new location
    const { updatedFolders: finalFolders, updatedBookmarks: finalBookmarks } =
      insertItem(updatedFolders, updatedBookmarks, removedItem, targetFolderId, newIndex)

    await saveBookmarks({
      folders: finalFolders,
      bookmarks: finalBookmarks,
    })
  }

  const saveYamlContent = async (content: string) => {
    try {
      const response = await fetch('/api/bookmarks/yaml', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: content,
      })
      if (!response.ok) {
        throw new Error('Failed to save YAML content')
      }
      const data = await response.json()
      const migratedFolders = assignIds(data.folders || []) as Folder[]
      const migratedBookmarks = assignIds(data.bookmarks || []) as Bookmark[]
      setFolders(migratedFolders)
      setBookmarks(migratedBookmarks)
      setYamlContent(content)
    } catch (err: unknown) {
      throw new Error((err as Error).message)
    }
  }

  const value = {
    folders,
    bookmarks,
    loading,
    error,
    yamlContent,
    addBookmark,
    updateBookmark,
    deleteBookmark,
    addFolder,
    updateFolder,
    deleteFolder,
    moveBookmark,
    moveFolder,
    saveYamlContent,
  }

  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  )
}

export const useBookmarks = () => {
  const context = useContext(BookmarkContext)
  if (context === undefined) {
    throw new Error('useBookmarks must be used within a BookmarkProvider')
  }
  return context
}
