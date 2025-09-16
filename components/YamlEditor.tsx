'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ResponsiveModal } from './ResponsiveModal'
import { useBookmarks } from '@/context/BookmarkContext'

interface YamlEditorProps {
  isOpen: boolean
  onClose: () => void
}

export const YamlEditor = ({ isOpen, onClose }: YamlEditorProps) => {
  const { yamlContent, saveYamlContent } = useBookmarks()
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      console.log('YamlEditor opened, yamlContent:', yamlContent)
      setContent(yamlContent || '')
      setError(null)
    }
  }, [isOpen, yamlContent])

  const handleSave = async () => {
    setIsLoading(true)
    setError(null)
    try {
      await saveYamlContent(content)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save YAML file')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setContent(yamlContent || '')
    setError(null)
    onClose()
  }

  return (
    <ResponsiveModal isOpen={isOpen} onClose={handleCancel} title="Edit YAML File">
      <div className="flex flex-col gap-4 h-[70vh]">
        {error && (
          <div className="text-sm text-destructive bg-destructive/10 p-3 rounded border">
            {error}
          </div>
        )}
        
        <div className="flex-1 flex flex-col gap-2">
          <label htmlFor="yaml-content" className="text-sm font-medium">
            Raw YAML Content:
          </label>
          <textarea
            id="yaml-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-1 min-h-0 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono resize-none"
            placeholder="# YAML content will appear here..."
            spellCheck={false}
          />
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </ResponsiveModal>
  )
}
