# Feature Specification: Implement a tree view for bookmarks and folders, with a view switcher.

**Feature Branch**: `003-implement-a-tree-view-for-bookmarks-and-folders-with-a-view-switcher`
**Created**: 2025-09-10
**Status**: Draft
**Input**: User description: "Implement a tree view for bookmarks and folders, with a view switcher.

**Detailed Feature Description:**

1.  **Install Tree View Component:** Integrate the `shadcn-tree-view` component from this URL: `https://github.com/MrLightful/shadcn-tree-view`. Follow its installation instructions, including adding any necessary dependencies (like `lucide-react`, `cmdk`, etc., if not already present) and updating `tailwind.config.js`.

2.  **Create `ViewSwitcher` Component:**
    *   Build a new component, `ViewSwitcher.tsx`, using the `Combobox` component from shadcn/ui.
    *   It should present two options: "Grid" (the default) and "Tree".
    *   This component will manage the selection state and pass the chosen view back to the main page.

3.  **Create `TreeView` Component:**
    *   Develop a new component, `TreeView.tsx`, that utilizes the installed `shadcn-tree-view`.
    *   It should accept the same `folders` and `bookmarks` props as the `TileView`.
    *   The component must recursively render the nested data structure, showing folders and bookmarks with appropriate icons (e.g., `Folder` and `File` icons from `lucide-react`).
    *   Clicking a folder in the tree should provide the same navigation functionality as clicking a folder in the `TileView`.

4.  **Integrate into Main Page (`page.tsx`):**
    *   Add state to the `Home` component to manage the current view mode (e.g., `const [viewMode, setViewMode] = useState('grid')`).
    *   Place the new `ViewSwitcher` component in the header area, next to the existing `ModeToggle` component.
    *   Conditionally render either the existing `TileView` or the new `TreeView` component based on the `viewMode` state."

---

## User Scenarios & Testing *(mandatory)*

### Primary User Story
As a user, I want to be able to switch between a grid view and a tree view for my bookmarks and folders, so that I can choose the layout that best suits my needs for browsing and organization.

### Acceptance Scenarios
1.  **Given** I am on the main page, **When** I click the view switcher, **Then** I should see options for "Grid" and "Tree".
2.  **Given** the view is set to "Grid", **When** I select "Tree" from the view switcher, **Then** the view should change to a tree layout.
3.  **Given** the view is set to "Tree", **When** I select "Grid" from the view switcher, **Then** the view should change to a grid layout.
4.  **Given** I am in the tree view, **When** I click on a folder, **Then** the application should navigate into that folder, showing its contents.

### Edge Cases
- What happens when a folder is empty in the tree view?
- How does the tree view handle deeply nested folders?

## Requirements *(mandatory)*

### Functional Requirements
- **FR-001**: The system MUST provide a view switcher to select between "Grid" and "Tree" layouts.
- **FR-002**: The system MUST display bookmarks and folders in a grid layout by default.
- **FR-003**: The system MUST display bookmarks and folders in a hierarchical tree layout when the "Tree" view is selected.
- **FR-004**: The tree view MUST support nested folders and bookmarks.
- **FR-005**: Clicking on a folder in the tree view MUST navigate into that folder.
- **FR-006**: The selected view mode MUST be preserved during the session. [NEEDS CLARIFICATION: Should the view mode persist across sessions?]

---
