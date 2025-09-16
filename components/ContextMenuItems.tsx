'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface MenuItemsProps {
  onEdit: () => void
  onDelete: () => void
}

const CustomMenuItem = ({ 
  children, 
  onClick,
  variant = "default"
}: { 
  children: React.ReactNode
  onClick: () => void
  variant?: "default" | "destructive"
}) => {
  return (
    <div
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        variant === "destructive" && "text-destructive hover:bg-destructive/10 hover:text-destructive"
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export const FolderContextMenuItems = ({ onEdit, onDelete }: MenuItemsProps) => {
  return (
    <>
      <CustomMenuItem onClick={onEdit}>Edit</CustomMenuItem>
      <CustomMenuItem onClick={onDelete} variant="destructive">Delete</CustomMenuItem>
    </>
  )
}

export const BookmarkContextMenuItems = ({
  onEdit,
  onDelete,
}: MenuItemsProps) => {
  return (
    <>
      <CustomMenuItem onClick={onEdit}>Edit</CustomMenuItem>
      <CustomMenuItem onClick={onDelete} variant="destructive">Delete</CustomMenuItem>
    </>
  )
}

