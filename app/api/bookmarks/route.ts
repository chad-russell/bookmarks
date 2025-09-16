import { NextResponse } from 'next/server';
import { readBookmarks, writeBookmarks } from '@/lib/file-io';
import path from 'path';
import fs from 'fs/promises';
import { Folder, Bookmark } from '@/lib/types';

const bookmarksFilePath = path.join(process.cwd(), 'data', 'bookmarks.yml');

export async function GET() {
  try {
    const data = await readBookmarks(bookmarksFilePath);
    const rawYaml = await fs.readFile(bookmarksFilePath, 'utf-8');
    return NextResponse.json({ ...data, rawYaml });
  } catch (error) {
    console.error('Failed to read bookmarks:', error);
    return NextResponse.json({ error: 'Failed to load bookmarks' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body: { folders: Folder[], bookmarks: Bookmark[] } = await request.json();
    await writeBookmarks(body, bookmarksFilePath);
    return NextResponse.json({ message: 'Bookmarks saved successfully' });
  } catch (error) {
    console.error('Failed to save bookmarks:', error);
    return NextResponse.json({ error: 'Failed to save bookmarks' }, { status: 500 });
  }
}