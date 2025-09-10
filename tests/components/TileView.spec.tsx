import { render, screen } from '@testing-library/react';
import { TileView } from '@/components/TileView';
import { Bookmark } from '@/lib/types';

describe('TileView', () => {
  const mockBookmarks: Bookmark[] = [
    { url: 'https://www.google.com' },
    { url: 'https://www.github.com' },
  ];

  it('should render a grid of bookmark tiles', () => {
    render(<TileView bookmarks={mockBookmarks} />);
    
    // Assuming BookmarkTile renders a link with the URL
    expect(screen.getByText('https://www.google.com')).toBeInTheDocument();
    expect(screen.getByText('https://www.github.com')).toBeInTheDocument();
  });
});
