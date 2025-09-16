import { NextResponse } from 'next/server';
import { readBookmarks } from '@/lib/file-io';
import path from 'path';
import fs from 'fs/promises';
import yaml from 'js-yaml';

const bookmarksFilePath = path.join(process.cwd(), 'data', 'bookmarks.yml');

export async function POST(request: Request) {
  try {
    const yamlContent = await request.text();
    
    // Validate YAML syntax
    try {
      yaml.load(yamlContent);
    } catch (yamlError) {
      return NextResponse.json({ 
        error: `Invalid YAML syntax: ${yamlError instanceof Error ? yamlError.message : 'Unknown error'}` 
      }, { status: 400 });
    }
    
    // Write the raw YAML content
    await fs.writeFile(bookmarksFilePath, yamlContent, 'utf-8');
    
    // Read back the parsed data to return to the client
    const data = await readBookmarks(bookmarksFilePath);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to save YAML content:', error);
    return NextResponse.json({ error: 'Failed to save YAML content' }, { status: 500 });
  }
}
