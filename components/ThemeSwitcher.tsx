'use client'

import * as React from 'react'
import { Palette } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const THEME_STORAGE_KEY = 'theme-name'

const themes = [
  { id: 'default', label: 'Default' },
  { id: 'ocean', label: 'Ocean' },
  { id: 'rose', label: 'Rose' },
  { id: 'emerald', label: 'Emerald' },
  { id: 'grape', label: 'Grape' },
]

function applyThemeAttribute(themeId: string) {
  const root = document.documentElement
  if (!themeId || themeId === 'default') {
    root.removeAttribute('data-theme')
  } else {
    root.setAttribute('data-theme', themeId)
  }
}

export function ThemeSwitcher() {
  const [current, setCurrent] = React.useState<string>('default')

  React.useEffect(() => {
    // Hydration: read stored theme and apply
    const stored = typeof window !== 'undefined' ? localStorage.getItem(THEME_STORAGE_KEY) : null
    if (stored) {
      setCurrent(stored)
      applyThemeAttribute(stored)
    } else {
      setCurrent('default')
    }
  }, [])

  const onSelect = (id: string) => {
    setCurrent(id)
    try {
      if (!id || id === 'default') {
        localStorage.removeItem(THEME_STORAGE_KEY)
      } else {
        localStorage.setItem(THEME_STORAGE_KEY, id)
      }
    } catch {
      // ignore storage errors (e.g., private mode)
    }
    applyThemeAttribute(id)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Theme palette switcher">
          <Palette className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {themes.map((t) => (
          <DropdownMenuItem key={t.id} onClick={() => onSelect(t.id)}>
            <span className="mr-2 inline-block h-3 w-3 rounded-full border border-border align-middle" style={{ background: `var(--primary)` }} />
            <span className="flex-1">{t.label}</span>
            {current === t.id ? <span className="text-xs text-muted-foreground">(current)</span> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


