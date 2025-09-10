# Quickstart

This guide provides the steps to set up and run the application with the new functionality.

## Prerequisites
-   Node.js and pnpm installed.

## Setup
1.  Clone the repository and switch to the `002-functionality-improvements-when` branch.
2.  Install the dependencies:
    ```bash
    pnpm install
    ```
3.  Ensure the `data/bookmarks.yml` file exists.

## Running the Application
```bash
pnpm dev
```

## Testing the New Features

1.  **Create a Folder**: Click the "+" button in the folder sidebar, enter a name in the dialog, and click "Save".
2.  **Add a Bookmark**: Select a folder, type a URL into the input box at the top of the main view, and click "Add".
3.  **Edit an Item**: Hover over a folder or bookmark and click the 3-dot context menu that appears. Select "Edit" or "Rename" to open a dialog and make changes.
4.  **Delete an Item**: Use the context menu to select "Delete" and confirm the action in the subsequent dialog.
