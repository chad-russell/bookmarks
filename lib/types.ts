export interface Bookmark {
  id: string;
  name?: string;
  url: string;
  imageUrl?: string;
}

export interface Folder {
  id: string;
  name: string;
  folders?: Folder[];
  bookmarks?: Bookmark[];
}
