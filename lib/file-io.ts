import fs from 'fs/promises';
import yaml from 'js-yaml';
import { Folder } from './types';

interface BookmarkData {
  folders: Folder[];
}

export async function readBookmarks(filePath: string): Promise<BookmarkData> {
  try {
    const fileContent = await fs.readFile(filePath, 'utf8');
    const data = yaml.load(fileContent) as BookmarkData;
    return data || { folders: [] };
  } catch (error) {
    if (error.code === 'ENOENT') {
      // File doesn't exist, return empty data
      return { folders: [] };
    }
    // For other errors, re-throw
    throw error;
  }
}

export async function writeBookmarks(data: BookmarkData, filePath: string): Promise<void> {
  const yamlContent = yaml.dump(data);
  await fs.writeFile(filePath, yamlContent, 'utf8');
}
