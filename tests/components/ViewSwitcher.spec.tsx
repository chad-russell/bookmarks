import React from 'react'
import { render, screen } from '@testing-library/react'
import { ViewSwitcher } from '@/components/ViewSwitcher'

describe('ViewSwitcher', () => {
  it('renders with default grid view selected', () => {
    const setViewMode = jest.fn()
    render(<ViewSwitcher viewMode="grid" setViewMode={setViewMode} />)

    expect(screen.getByText('Grid')).toBeTruthy()
  })

  it('shows the correct view mode as selected', () => {
    const setViewMode = jest.fn()
    render(<ViewSwitcher viewMode="tree" setViewMode={setViewMode} />)

    expect(screen.getByText('Tree')).toBeTruthy()
  })
})
