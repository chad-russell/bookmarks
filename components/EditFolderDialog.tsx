"use client";

import { useState, useEffect } from 'react';
import { Folder } from '@/lib/types';
import { ResponsiveModal } from './ResponsiveModal';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface EditFolderDialogProps {
  folder: Folder;
  onSave: (updatedFolder: Folder) => void;
  onClose: () => void;
}

export const EditFolderDialog = ({ folder, onSave, onClose }: EditFolderDialogProps) => {
  const [name, setName] = useState(folder.name);

  useEffect(() => {
    setName(folder.name);
  }, [folder]);

  const handleSave = () => {
    onSave({ ...folder, name });
  };

  return (
    <ResponsiveModal isOpen={true} onClose={onClose} title="Edit Folder">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </ResponsiveModal>
  );
};
