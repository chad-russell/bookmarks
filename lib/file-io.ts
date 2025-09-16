import fs from 'fs/promises';
import yaml from 'js-yaml';
import { Folder, Bookmark } from './types';

interface BookmarkData {
	folders: Folder[];
	bookmarks: Bookmark[];
}

function hasCodeProperty(value: unknown): value is { code: unknown } {
	return typeof value === 'object' && value !== null && 'code' in value;
}

export async function readBookmarks(filePath: string): Promise<BookmarkData> {
	try {
		const fileContent = await fs.readFile(filePath, 'utf8');
		const data = yaml.load(fileContent) as BookmarkData;
		return data || { folders: [], bookmarks: [] };
	} catch (error: unknown) {
		if (hasCodeProperty(error) && error.code === 'ENOENT') {
			// File doesn't exist, return empty data
			return { folders: [], bookmarks: [] };
		}
		// For other errors, re-throw
		throw error;
	}
}

export async function writeBookmarks(data: BookmarkData, filePath: string): Promise<void> {
	const yamlContent = yaml.dump(data);
	await fs.writeFile(filePath, yamlContent, 'utf8');
}
