# Component Contracts

This document defines the props for the new UI components.

## ResponsiveModal
```typescript
interface ResponsiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}
```

## EditBookmarkDialog
```typescript
interface EditBookmarkDialogProps {
  bookmark: Bookmark;
  onSave: (updatedBookmark: Bookmark) => void;
  onClose: () => void;
}
```

## EditFolderDialog
```typescript
interface EditFolderDialogProps {
  folder: Folder;
  onSave: (updatedFolder: Folder) => void;
  onClose: () => void;
}
```

## DeleteConfirmationDialog
```typescript
interface DeleteConfirmationDialogProps {
  itemName: string;
  onConfirm: () => void;
  onClose: () => void;
}
```
