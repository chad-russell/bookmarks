# Feature Specification: Core Functionality Improvements

**Feature Branch**: `002-functionality-improvements-when`
**Created**: 2025-09-09
**Status**: Draft
**Input**: User description: "Functionality improvements. When creating a new folder, the user should be presented with a modal (dialog) to give it an initial name. There should be two options, accept and cancel. Accept should create the folder, cancel should not create anything and simply dismiss the dialog. Folders in their current state should be able to be renamed. There is no obvious way currently to create a bookmark in the UI. There should be an input box in the main area of the page, where a user can input a URL and then click a button to create a bookmark in the current folder. Users should be able to rename folders. There should be a 3-dot context menu available on the folder component, and it should bring up an edit modal which allows the user to set both the URL and image URLs Users should be able to edit bookmarks in a similar way, through 3-dot context menu. They should be able to give each bookmark a human-readable name in addition to the URL and image URLs. So, we will need to change the data format of bookmarks to add this new name field. Users should be able to delete bookmarks and folders. This functionality should be available through the same 3-dot context menus, as another option for both bookmarks and folders. It should bring up a confirmation dialog, with accept and cancel buttons Get rid of the variable-width sidebar, keep it a fixed width for now. Generally, the app should look more visually appealing than it currently does. I want a v0-worthy design, something that is minimal but still beautiful. Leave this design pass for last. Make more use of shadcn/ui components, doing research on which ones would be good to use."

---

## User Scenarios & Testing *(mandatory)*

### Primary User Story
As a user, I want a more intuitive and complete experience for managing my bookmarks. I want to easily create, rename, and delete both folders and bookmarks. I also want to give my bookmarks memorable names and edit their details, all within a visually appealing, fixed-layout interface.

### Acceptance Scenarios
1.  **Given** I am viewing the folder tree, **When** I click the "Add Folder" button, **Then** a modal appears asking for a folder name.
2.  **Given** the "Add Folder" modal is open, **When** I enter a name and click "Accept", **Then** a new folder with that name is created.
3.  **Given** I am viewing a folder's content, **When** I enter a URL in the input box and click "Add Bookmark", **Then** a new bookmark is created in that folder.
4.  **Given** I am viewing a folder or a bookmark, **When** I click its 3-dot context menu and select "Rename" or "Edit", **Then** a modal appears allowing me to change its name and other details.
5.  **Given** I am viewing a folder or a bookmark, **When** I click its 3-dot context menu and select "Delete", **Then** a confirmation dialog appears.
6.  **Given** the delete confirmation dialog is open, **When** I click "Accept", **Then** the item is permanently deleted.
7.  **Given** I am viewing the application, **Then** the sidebar has a fixed width and does not resize.

### Edge Cases
-   What happens if a user tries to create a folder or bookmark with an empty name/URL?
-   What happens if a user tries to create a folder with a name that already exists in the same location?
-   How does the system handle very long names or URLs in the UI?

---

## Requirements *(mandatory)*

### Functional Requirements
-   **FR-014**: System MUST present a modal dialog for naming when creating a new folder.
-   **FR-015**: System MUST provide a visible input field and button to add a bookmark to the currently selected folder.
-   **FR-016**: Bookmarks and folders MUST have a 3-dot context menu.
-   **FR-017**: The context menu for folders MUST provide options to "Rename" and "Delete".
-   **FR-018**: The context menu for bookmarks MUST provide options to "Edit" and "Delete".
-   **FR-019**: Selecting "Delete" for any item MUST trigger a confirmation dialog before proceeding.
-   **FR-020**: The data format for bookmarks MUST be updated to include a `name` field for a human-readable title.
-   **FR-021**: The main sidebar containing the folder tree MUST have a fixed width.
-   **FR-022**: The overall application UI MUST be updated to a minimal, modern, and visually appealing design.

### Key Entities *(include if feature involves data)*
-   **Folder**: Represents a container for bookmarks and other folders. It has a name.
-   **Bookmark**: Represents a link to a web page. It has a **`name`** (new), a `url`, and an optional `imageUrl`.

---

## Review & Acceptance Checklist
*GATE: Automated checks run during main() execution*

### Content Quality
- [ ] No implementation details (languages, frameworks, APIs)
- [ ] Focused on user value and business needs
- [ ] Written for non-technical stakeholders
- [ ] All mandatory sections completed

### Requirement Completeness
- [ ] No [NEEDS CLARIFICATION] markers remain
- [ ] Requirements are testable and unambiguous
- [ ] Success criteria are measurable
- [ ] Scope is clearly bounded
- [ ] Dependencies and assumptions identified