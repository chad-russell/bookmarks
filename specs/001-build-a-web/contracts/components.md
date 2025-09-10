# Component Contracts

This document defines the props for the main React components in the application.

## FileTreeView
```typescript
interface FileTreeViewProps {
  folders: Folder[];
  onSelectFolder: (folder: Folder) => void;
}
```

## TileView
```typescript
interface TileViewProps {
  bookmarks: Bookmark[];
}
```

## BookmarkTile
```typescript
interface BookmarkTileProps {
  bookmark: Bookmark;
}
```
