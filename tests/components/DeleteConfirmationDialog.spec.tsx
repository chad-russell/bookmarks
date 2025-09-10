import { render, screen, fireEvent } from '@testing-library/react';
import { DeleteConfirmationDialog } from '@/components/DeleteConfirmationDialog';

describe('DeleteConfirmationDialog', () => {
  it('should display the correct item name', () => {
    render(<DeleteConfirmationDialog itemName="My Test Item" onConfirm={() => {}} onClose={() => {}} />);
    
    expect(screen.getByText('Are you sure you want to delete "My Test Item"?')).toBeInTheDocument();
  });

  it('should call onConfirm when the "Accept" button is clicked', () => {
    const onConfirm = jest.fn();
    render(<DeleteConfirmationDialog itemName="My Test Item" onConfirm={onConfirm} onClose={() => {}} />);
    
    const acceptButton = screen.getByText('Accept');
    fireEvent.click(acceptButton);
    
    expect(onConfirm).toHaveBeenCalled();
  });
});
