# Data Model

The entire application state is stored in a single YAML file, `data/bookmarks.yml`. The schema for this file is as follows:

```yaml
folders:
  - name: Folder Name
    folders:
      - name: Nested Folder Name
        bookmarks:
          - url: https://example.com
            imageUrl: https://example.com/image.png
    bookmarks:
      - url: https://anotherexample.com
```

## Entities

### Folder
-   `name`: The name of the folder (string, required).
-   `folders`: A list of nested folders (list of Folder objects, optional).
-   `bookmarks`: A list of bookmarks in the folder (list of Bookmark objects, optional).

### Bookmark
-   `url`: The URL of the bookmark (string, required).
-   `imageUrl`: The URL of an image for the bookmark (string, optional). If not provided, the application will attempt to fetch the favicon of the URL.
