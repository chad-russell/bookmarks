"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Folder, Bookmark } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';

interface BookmarkContextType {
  folders: Folder[];
  loading: boolean;
  error: string | null;
  addBookmark: (folderId: string, bookmark: Omit<Bookmark, 'id'>) => Promise<void>;
  updateBookmark: (bookmarkId: string, updates: Partial<Bookmark>) => Promise<void>;
  deleteBookmark: (bookmarkId: string) => Promise<void>;
  addFolder: (parentId: string | null, folder: Omit<Folder, 'id'>) => Promise<void>;
  updateFolder: (folderId: string, updates: Partial<Folder>) => Promise<void>;
  deleteFolder: (folderId: string) => Promise<void>;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

// Helper functions to recursively find and update data
const findAndDelete = (items: (Folder | Bookmark)[], id: string) => {
  return items.filter(item => {
    if ('folders' in item && item.folders) {
      item.folders = findAndDelete(item.folders, id) as Folder[];
    }
    if ('bookmarks' in item && item.bookmarks) {
      item.bookmarks = findAndDelete(item.bookmarks, id) as Bookmark[];
    }
    return item.id !== id;
  });
};

const findAndUpdate = (items: (Folder | Bookmark)[], id: string, updates: Partial<Folder | Bookmark>) => {
  return items.map(item => {
    if (item.id === id) {
      return { ...item, ...updates };
    }
    if ('folders' in item && item.folders) {
      item.folders = findAndUpdate(item.folders, id, updates) as Folder[];
    }
    if ('bookmarks' in item && item.bookmarks) {
      item.bookmarks = findAndUpdate(item.bookmarks, id, updates) as Bookmark[];
    }
    return item;
  });
};

const findAndAdd = (items: Folder[], parentId: string, newItem: Folder | Bookmark) => {
    return items.map(item => {
        if (item.id === parentId) {
            if ('url' in newItem) { // It's a bookmark
                item.bookmarks = [...(item.bookmarks || []), newItem];
            } else { // It's a folder
                item.folders = [...(item.folders || []), newItem];
            }
        } else if (item.folders) {
            item.folders = findAndAdd(item.folders, parentId, newItem);
        }
        return item;
    });
};


// Helper function to recursively assign IDs to folders and bookmarks
const assignIds = (items: (Folder | Bookmark)[]): any[] => {
  return items.map(item => {
    const newItem = { id: item.id || uuidv4(), ...item };
    if ('folders' in newItem && newItem.folders) {
      newItem.folders = assignIds(newItem.folders);
    }
    if ('bookmarks' in newItem && newItem.bookmarks) {
      newItem.bookmarks = assignIds(newItem.bookmarks);
    }
    return newItem;
  });
};

export const BookmarkProvider = ({ children }: { children: ReactNode }) => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/bookmarks');
        if (!response.ok) {
          throw new Error('Failed to fetch bookmarks');
        }
        const data = await response.json();
        const migratedData = assignIds(data.folders || []) as Folder[];
        setFolders(migratedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadBookmarks();
  }, []);

  const saveBookmarks = async (updatedFolders: Folder[]) => {
    try {
      const response = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folders: updatedFolders }),
      });
      if (!response.ok) {
        throw new Error('Failed to save bookmarks');
      }
      setFolders(updatedFolders);
    } catch (err) {
      setError(err.message);
    }
  };

  const addBookmark = async (folderId: string, bookmark: Omit<Bookmark, 'id'>) => {
    const newBookmark = { ...bookmark, id: uuidv4() };
    const updatedFolders = findAndAdd(folders, folderId, newBookmark);
    await saveBookmarks(updatedFolders);
  };

  const updateBookmark = async (bookmarkId: string, updates: Partial<Bookmark>) => {
    const updatedFolders = findAndUpdate(folders, bookmarkId, updates) as Folder[];
    await saveBookmarks(updatedFolders);
  };

  const deleteBookmark = async (bookmarkId: string) => {
    const updatedFolders = findAndDelete(folders, bookmarkId) as Folder[];
    await saveBookmarks(updatedFolders);
  };

  const addFolder = async (parentId: string | null, folder: Omit<Folder, 'id'>) => {
    const newFolder = { ...folder, id: uuidv4(), folders: [], bookmarks: [] };
    let updatedFolders;
    if (parentId) {
        updatedFolders = findAndAdd(folders, parentId, newFolder);
    } else {
      updatedFolders = [...folders, newFolder];
    }
    await saveBookmarks(updatedFolders);
  };

  const updateFolder = async (folderId: string, updates: Partial<Folder>) => {
    const updatedFolders = findAndUpdate(folders, folderId, updates) as Folder[];
    await saveBookmarks(updatedFolders);
  };

  const deleteFolder = async (folderId: string) => {
    const updatedFolders = findAndDelete(folders, folderId) as Folder[];
    await saveBookmarks(updatedFolders);
  };

  const value = { folders, loading, error, addBookmark, updateBookmark, deleteBookmark, addFolder, updateFolder, deleteFolder };

  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};
