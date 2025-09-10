# Quickstart

This guide provides the steps to set up and run the Bookmark Manager application locally.

## Prerequisites
-   Node.js and pnpm installed.

## Setup
1.  Clone the repository.
2.  Install the dependencies:
    ```bash
    pnpm install
    ```
3.  Create the data file:
    ```bash
    mkdir data
    touch data/bookmarks.yml
    ```
4.  Add some initial data to `data/bookmarks.yml` (see `data-model.md` for the schema).

## Running the Application
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.
