"use client";

import { ResponsiveModal } from './ResponsiveModal';
import { Button } from './ui/button';

import { DialogFooter } from './ui/dialog';

interface DeleteConfirmationDialogProps {
  itemName: string;
  onConfirm: () => void;
  onClose: () => void;
}

export const DeleteConfirmationDialog = ({ itemName, onConfirm, onClose }: DeleteConfirmationDialogProps) => {
  return (
    <ResponsiveModal isOpen={true} onClose={onClose} title="Confirm Deletion">
      <div className="grid gap-4">
        <p>Are you sure you want to delete "{itemName}"?</p>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button variant="destructive" onClick={onConfirm}>Accept</Button>
      </DialogFooter>
    </ResponsiveModal>
  );
};
