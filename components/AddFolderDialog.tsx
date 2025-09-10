"use client";

import { useState } from 'react';
import { ResponsiveModal } from './ResponsiveModal';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { DialogFooter } from './ui/dialog';

interface AddFolderDialogProps {
  onSave: (name: string) => void;
  onClose: () => void;
}

export const AddFolderDialog = ({ onSave, onClose }: AddFolderDialogProps) => {
  const [name, setName] = useState('');

  const handleSave = () => {
    if (name.trim()) {
      onSave(name.trim());
    }
  };

  return (
    <ResponsiveModal isOpen={true} onClose={onClose} title="Add Folder">
      <div className="grid gap-4">
        <div className="grid gap-2 md:grid-cols-4 md:items-center md:gap-4">
          <Label htmlFor="name" className="md:text-right">Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="md:col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogFooter>
    </ResponsiveModal>
  );
};
