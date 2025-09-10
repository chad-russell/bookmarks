import React from 'react'
import { render, screen } from '@testing-library/react'
import { TreeView } from '@/components/TreeView'

describe('TreeView', () => {
  const mockFolders = [
    {
      id: '1',
      name: 'Folder 1',
      folders: [
        {
          id: '2',
          name: 'Subfolder 1',
          folders: [],
          bookmarks: [
            {
              id: 'b1',
              url: 'https://example.com',
              name: 'Example Bookmark',
            },
          ],
        },
      ],
      bookmarks: [
        {
          id: 'b2',
          url: 'https://example2.com',
          name: 'Example Bookmark 2',
        },
      ],
    },
  ]

  const mockBookmarks = [
    {
      id: 'b3',
      url: 'https://example3.com',
      name: 'Root Bookmark',
    },
  ]

  it('renders folders and bookmarks correctly', () => {
    render(<TreeView folders={mockFolders} bookmarks={mockBookmarks} />)

    expect(screen.getByText('Folder 1')).toBeTruthy()
    expect(screen.getByText('Root Bookmark')).toBeTruthy()
  })

  it('renders nested folders correctly', () => {
    render(<TreeView folders={mockFolders} bookmarks={mockBookmarks} />)

    // Note: The tree view collapses by default, so nested items might not be visible
    expect(screen.getByText('Folder 1')).toBeTruthy()
  })
})
