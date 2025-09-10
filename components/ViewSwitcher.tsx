'use client'

import * as React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ChevronsUpDown } from 'lucide-react'

type ViewMode = 'grid' | 'tree'

interface ViewSwitcherProps {
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
}

export function ViewSwitcher({ viewMode, setViewMode }: ViewSwitcherProps) {
  const viewOptions = [
    { value: 'grid', label: 'Grid' },
    { value: 'tree', label: 'Tree' },
  ]

  const selectedView =
    viewOptions.find((option) => option.value === viewMode) || viewOptions[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-[120px] justify-between"
        >
          {selectedView.label}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[120px]">
        {viewOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onSelect={() => setViewMode(option.value as ViewMode)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
