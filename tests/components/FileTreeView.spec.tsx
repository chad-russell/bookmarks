import { render, screen, fireEvent } from '@testing-library/react';
import { FileTreeView } from '@/components/FileTreeView';
import { Folder } from '@/lib/types';

describe('FileTreeView', () => {
  const mockFolders: Folder[] = [
    {
      name: 'Folder 1',
      folders: [
        { name: 'Subfolder 1.1', folders: [], bookmarks: [] },
      ],
      bookmarks: [],
    },
    {
      name: 'Folder 2',
      folders: [],
      bookmarks: [],
    },
  ];

  it('should render a nested list of folders', () => {
    render(<FileTreeView folders={mockFolders} onSelectFolder={() => {}} />);
    
    expect(screen.getByText('Folder 1')).toBeInTheDocument();
    expect(screen.getByText('Subfolder 1.1')).toBeInTheDocument();
    expect(screen.getByText('Folder 2')).toBeInTheDocument();
  });

  it('should call onSelectFolder when a folder is clicked', () => {
    const onSelectFolder = jest.fn();
    render(<FileTreeView folders={mockFolders} onSelectFolder={onSelectFolder} />);
    
    const folderElement = screen.getByText('Folder 2');
    fireEvent.click(folderElement);
    
    expect(onSelectFolder).toHaveBeenCalledWith(mockFolders[1]);
  });
});
