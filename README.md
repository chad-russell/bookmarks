# Bookmark Manager

A simple, modern, file-based bookmark manager built with Next.js and shadcn/ui. This application allows you to manage a nested structure of bookmarks and folders, with the entire state stored in a single `bookmarks.yml` file for easy backup and portability.

## Features

-   **Nested Folders**: Organize your bookmarks into a hierarchical folder structure.
-   **Dual Views**: View your bookmarks in a traditional file tree or a visual tile grid.
-   **File-Based Storage**: All data is stored in a single `bookmarks.yml` file, making it easy to edit, backup, and version control your bookmarks.
-   **Themeable**: Switch between light, dark, and system themes.
-   **Responsive Design**: The layout adapts to screen sizes from desktop to mobile.
-   **Favicon Fetching**: Automatically fetches favicons for your bookmarks.

## Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (React)
-   **UI**: [shadcn/ui](https://ui.shadcn.com/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Data Format**: YAML
-   **Package Manager**: [pnpm](https://pnpm.io/)

## Getting Started

### Prerequisites

-   Node.js (v18 or later)
-   pnpm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/bookmark.git
    cd bookmark
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

### Configuration

1.  The application's data is stored in `data/bookmarks.yml`. A sample file is created automatically. You can edit this file to add your own bookmarks and folders.

    The structure is as follows:
    ```yaml
    folders:
      - name: "Work"
        bookmarks:
          - url: "https://github.com"
            imageUrl: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
      - name: "Personal"
        folders:
          - name: "Recipes"
            bookmarks:
              - url: "https://www.allrecipes.com"
    ```

### Running the Application

1.  **Start the development server:**
    ```bash
    pnpm dev
    ```

2.  Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## How It Works

The application is a client-side React application that fetches its state from a single YAML file via a Next.js API route.

-   **Data Fetching**: On load, the client requests the bookmark data from the `/api/bookmarks` endpoint.
-   **Data Persistence**: When you add a new bookmark or folder, the client updates its state and sends the entire updated data structure back to the `/api/bookmarks` endpoint via a `POST` request. The server then overwrites the `bookmarks.yml` file.
-   **State Management**: A simple React Context (`BookmarkContext`) is used to manage the state of the bookmarks and folders across the application.