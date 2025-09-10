import { render, screen, fireEvent } from '@testing-library/react';
import { EditBookmarkDialog } from '@/components/EditBookmarkDialog';
import { Bookmark } from '@/lib/types';

describe('EditBookmarkDialog', () => {
  const mockBookmark: Bookmark = {
    id: '1',
    name: 'Test Bookmark',
    url: 'https://example.com',
  };

  it('should pre-populate the form fields with bookmark data', () => {
    render(<EditBookmarkDialog bookmark={mockBookmark} onSave={() => {}} onClose={() => {}} />);
    
    expect(screen.getByLabelText('Name')).toHaveValue('Test Bookmark');
    expect(screen.getByLabelText('URL')).toHaveValue('https://example.com');
  });

  it('should call onSave with the updated data when the form is submitted', () => {
    const onSave = jest.fn();
    render(<EditBookmarkDialog bookmark={mockBookmark} onSave={onSave} onClose={() => {}} />);
    
    const nameInput = screen.getByLabelText('Name');
    fireEvent.change(nameInput, { target: { value: 'Updated Name' } });
    
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);
    
    expect(onSave).toHaveBeenCalledWith({ ...mockBookmark, name: 'Updated Name' });
  });
});
