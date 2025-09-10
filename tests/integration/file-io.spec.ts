import fs from 'fs/promises';
import path from 'path';
import { readBookmarks, writeBookmarks } from '@/lib/file-io';
import { Folder } from '@/lib/types';

const TEST_FILE_PATH = path.join(process.cwd(), 'data', 'test-bookmarks.yml');

describe('File I/O Service', () => {
  beforeEach(async () => {
    // Ensure the file doesn't exist before a test
    await fs.rm(TEST_FILE_PATH, { force: true });
  });

  afterAll(async () => {
    // Clean up the test file after all tests are done
    await fs.rm(TEST_FILE_PATH, { force: true });
  });

  it('should read and parse a YAML file into bookmark data', async () => {
    const yamlContent = `
folders:
  - name: "Work"
    bookmarks:
      - url: "https://github.com"
`;
    await fs.writeFile(TEST_FILE_PATH, yamlContent, 'utf8');

    const data = await readBookmarks(TEST_FILE_PATH);
    expect(data.folders).toHaveLength(1);
    expect(data.folders[0].name).toBe('Work');
    expect(data.folders[0].bookmarks).toHaveLength(1);
    expect(data.folders[0].bookmarks[0].url).toBe('https://github.com');
  });

  it('should write bookmark data to a YAML file', async () => {
    const data: { folders: Folder[] } = {
      folders: [
        {
          name: 'Personal',
          folders: [],
          bookmarks: [{ url: 'https://www.google.com' }],
        },
      ],
    };

    await writeBookmarks(data, TEST_FILE_PATH);

    const fileContent = await fs.readFile(TEST_FILE_PATH, 'utf8');
    expect(fileContent).toContain('name: Personal');
    expect(fileContent).toContain('url: https://www.google.com');
  });
});
