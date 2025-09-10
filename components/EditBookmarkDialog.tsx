"use client";

import { useState, useEffect } from 'react';
import { Bookmark } from '@/lib/types';
import { ResponsiveModal } from './ResponsiveModal';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface EditBookmarkDialogProps {
  bookmark: Bookmark;
  onSave: (updatedBookmark: Bookmark) => void;
  onClose: () => void;
}

export const EditBookmarkDialog = ({ bookmark, onSave, onClose }: EditBookmarkDialogProps) => {
  const [name, setName] = useState(bookmark.name || '');
  const [url, setUrl] = useState(bookmark.url);

  useEffect(() => {
    setName(bookmark.name || '');
    setUrl(bookmark.url);
  }, [bookmark]);

  const handleSave = () => {
    onSave({ ...bookmark, name, url });
  };

  return (
    <ResponsiveModal isOpen={true} onClose={onClose} title="Edit Bookmark">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="url">URL</Label>
          <Input id="url" value={url} onChange={(e) => setUrl(e.target.value)} />
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </ResponsiveModal>
  );
};
