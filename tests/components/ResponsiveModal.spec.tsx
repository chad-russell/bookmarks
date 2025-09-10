import { render, screen } from '@testing-library/react';
import { ResponsiveModal } from '@/components/ResponsiveModal';

describe('ResponsiveModal', () => {
  it('should render a Dialog on desktop screens', () => {
    // Our jest.setup.js mocks matchMedia to return false (desktop) by default
    render(
      <ResponsiveModal isOpen={true} onClose={() => {}} title="Test Dialog">
        <p>Dialog Content</p>
      </ResponsiveModal>
    );
    expect(screen.getByText('Test Dialog')).toBeInTheDocument();
    expect(screen.getByText('Dialog Content')).toBeInTheDocument();
  });

  it('should render a Drawer on mobile screens', () => {
    // Override the matchMedia mock for this specific test
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: true, // Simulate mobile screen
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    render(
      <ResponsiveModal isOpen={true} onClose={() => {}} title="Test Drawer">
        <p>Drawer Content</p>
      </ResponsiveModal>
    );
    expect(screen.getByText('Test Drawer')).toBeInTheDocument();
    expect(screen.getByText('Drawer Content')).toBeInTheDocument();
  });
});
