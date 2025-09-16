'use client'

import { useState } from 'react'
import { Bookmark } from '@/lib/types'
import { getFaviconUrl } from '@/lib/favicon'
import { useBookmarks } from '@/context/BookmarkContext'
import {
  Card,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu'
import { EditBookmarkDialog } from './EditBookmarkDialog'
import { DeleteConfirmationDialog } from './DeleteConfirmationDialog'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface BookmarkTileProps {
  bookmark: Bookmark
}

export const BookmarkTile = ({ bookmark }: BookmarkTileProps) => {
  const { updateBookmark, deleteBookmark } = useBookmarks()
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleEdit = (updatedBookmark: Bookmark) => {
    updateBookmark(updatedBookmark.id, { ...updatedBookmark })
    setIsEditing(false)
  }

  const handleDelete = () => {
    deleteBookmark(bookmark.id)
    setIsDeleting(false)
  }

  return (
    <>
      <ContextMenu open={menuOpen} onOpenChange={setMenuOpen}>
        <ContextMenuTrigger asChild>
          <Card className="hover:bg-accent h-full w-full max-w-sm cursor-pointer transition-colors">
            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full"
            >
              <CardHeader className="flex h-full items-center px-3">
                <div className="flex w-full items-center gap-3">
                  <img
                    src={bookmark.imageUrl || getFaviconUrl(bookmark.url)}
                    alt={`Favicon for ${bookmark.name || bookmark.url}`}
                    className="h-8 w-8 flex-shrink-0 rounded-md"
                  />
                  <div className="min-w-0 flex-1">
                    <TooltipProvider delayDuration={500}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div>
                            <CardTitle className="truncate text-sm leading-none font-medium">
                              {bookmark.name || bookmark.url}
                            </CardTitle>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{bookmark.url}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </CardHeader>
            </a>
          </Card>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onSelect={() => { setMenuOpen(false); setIsEditing(true) }}>Edit</ContextMenuItem>
          <ContextMenuItem onSelect={() => { setMenuOpen(false); setIsDeleting(true) }} variant="destructive">Delete</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      {isEditing && (
        <EditBookmarkDialog
          bookmark={bookmark}
          onSave={handleEdit}
          onClose={() => setIsEditing(false)}
        />
      )}
      {isDeleting && (
        <DeleteConfirmationDialog
          itemName={bookmark.name || bookmark.url}
          onConfirm={handleDelete}
          onClose={() => setIsDeleting(false)}
        />
      )}
    </>
  )
}
