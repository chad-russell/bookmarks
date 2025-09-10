"use client";

import { ResponsiveModal } from './ResponsiveModal';
import { Button } from './ui/button';

interface DeleteConfirmationDialogProps {
  itemName: string;
  onConfirm: () => void;
  onClose: () => void;
}

export const DeleteConfirmationDialog = ({ itemName, onConfirm, onClose }: DeleteConfirmationDialogProps) => {
  return (
    <ResponsiveModal isOpen={true} onClose={onClose} title="Confirm Deletion">
      <div className="space-y-4">
        <p>Are you sure you want to delete "{itemName}"?</p>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="destructive" onClick={onConfirm}>Accept</Button>
        </div>
      </div>
    </ResponsiveModal>
  );
};
