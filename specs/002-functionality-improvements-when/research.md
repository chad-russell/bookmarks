# Research & Decisions

## Responsive Modals (Dialog/Drawer)
-   **Decision**: We will create a single, responsive modal component that internally renders either a `Dialog` or a `Drawer` based on the screen size. We can use a custom hook like `useMediaQuery` to detect the screen size and switch between the two components.
-   **Rationale**: This approach encapsulates the responsive logic, keeping the call sites clean and simple. It avoids duplicating logic for handling modals on different screen sizes.
-   **Alternatives considered**:
    -   Using CSS media queries to restyle the `Dialog` for mobile. This is possible but can be complex to maintain.
    -   Creating two separate components and conditionally rendering them in the main view. This would clutter the main component with responsive logic.

## Visual Design Inspiration
-   **Decision**: The design will be guided by the principles of minimalism and clarity. We will draw inspiration from modern productivity tools and dashboards like Vercel's dashboard, Linear, and Notion.
-   **Rationale**: These applications are known for their clean, intuitive, and aesthetically pleasing interfaces, which aligns with the project's goals.
-   **Key Elements**:
    -   Generous use of whitespace.
    -   A clear visual hierarchy.
    -   Subtle animations and transitions to provide feedback.
    -   A refined color palette.

## Data Migration for Bookmarks
-   **Decision**: The `name` field will be added to the `Bookmark` type as an optional string (`name?: string`). The application will be updated to handle cases where the name is missing.
-   **Rationale**: This approach ensures backward compatibility with existing `bookmarks.yml` files. Users can gradually add names to their bookmarks without the application breaking.
-   **Fallback Behavior**: When a bookmark's `name` is not present, the UI will display the `url` instead.
