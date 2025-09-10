# API Contracts

This document defines the contracts for the `/api/bookmarks` endpoint.

## `GET /api/bookmarks`
-   **Description**: Retrieves the entire bookmark data structure.
-   **Response Body**: `application/json`
    ```json
    {
      "folders": [
        // Array of Folder objects
      ]
    }
    ```

## `POST /api/bookmarks`
-   **Description**: Overwrites the entire bookmark data structure. Used for all create, update, and delete operations initiated by the client.
-   **Request Body**: `application/json`
    ```json
    {
      "folders": [
        // Array of Folder objects
      ]
    }
    ```
-   **Response**: `200 OK` with a success message.
