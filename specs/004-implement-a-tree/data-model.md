# Data Model

The data model for this feature relies on the existing `Folder` and `Bookmark` types defined in `lib/types.ts`.

## Folder

Represents a folder that can contain other folders and bookmarks.

- `id`: `string` (unique identifier)
- `name`: `string`
- `folders`: `Folder[]` (nested folders)
- `bookmarks`: `Bookmark[]` (bookmarks within the folder)

## Bookmark

Represents a single bookmark.

- `id`: `string` (unique identifier)
- `name`: `string` (optional)
- `url`: `string`
- `imageUrl`: `string` (optional, for favicon)
