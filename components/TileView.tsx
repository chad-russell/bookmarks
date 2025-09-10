"use client";

import { Bookmark } from "@/lib/types";
import { BookmarkTile } from "./BookmarkTile";

interface TileViewProps {
  bookmarks: Bookmark[];
}

export const TileView = ({ bookmarks }: TileViewProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {bookmarks.map((bookmark) => (
        <BookmarkTile key={bookmark.id} bookmark={bookmark} />
      ))}
    </div>
  );
};
