import { render, screen } from '@testing-library/react';
import { BookmarkTile } from '@/components/BookmarkTile';
import { Bookmark } from '@/lib/types';

describe('BookmarkTile', () => {
  const mockBookmark: Bookmark = {
    url: 'https://www.example.com',
    imageUrl: 'https://www.example.com/image.png',
  };

  it('should render the bookmark URL', () => {
    render(<BookmarkTile bookmark={mockBookmark} />);
    expect(screen.getByText('https://www.example.com')).toBeInTheDocument();
  });

  it('should display the provided imageUrl', () => {
    render(<BookmarkTile bookmark={mockBookmark} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://www.example.com/image.png');
  });

  it('should display a fallback favicon if imageUrl is not provided', () => {
    const bookmarkWithoutImage: Bookmark = { url: 'https://www.google.com' };
    render(<BookmarkTile bookmark={bookmarkWithoutImage} />);
    const image = screen.getByRole('img');
    // The favicon service will be mocked or tested in integration, here we just check the fallback mechanism
    expect(image).toHaveAttribute('src', expect.stringContaining('google.com'));
  });
});
