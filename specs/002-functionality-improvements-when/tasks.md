# Tasks: Core Functionality Improvements

**Input**: Design documents from `/Users/chadrussell/Code/bookmark/specs/002-functionality-improvements-when/`

## Phase 3.1: Setup & Data Model
- [ ] **T001: [P] Update TypeScript types in `lib/types.ts` to add the optional `name` field to the `Bookmark` interface.**
    -   Reference: `data-model.md`
- [ ] **T002: [P] Add `id` fields to `Folder` and `Bookmark` types in `lib/types.ts` for stable keying and state updates.**
- [ ] **T003: Update the `BookmarkContext` in `context/BookmarkContext.tsx` to include functions for updating and deleting bookmarks and folders.**
- [ ] **T004: Add `uuid` package for ID generation (`pnpm add uuid @types/uuid`).**

## Phase 3.2: Tests First (TDD) ⚠️
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [ ] **T005: [P] Create component test for the responsive modal in `tests/components/ResponsiveModal.spec.tsx`.**
    -   Test A: Renders a `Dialog` on desktop screens.
    -   Test B: Renders a `Drawer` on mobile screens.
- [ ] **T006: [P] Create component test for the `EditBookmarkDialog` in `tests/components/EditBookmarkDialog.spec.tsx`.**
    -   Test A: Form fields are pre-populated with bookmark data.
    -   Test B: `onSave` is called with the updated data when the form is submitted.
- [ ] **T007: [P] Create component test for the `DeleteConfirmationDialog` in `tests/components/DeleteConfirmationDialog.spec.tsx`.**
    -   Test A: Displays the correct item name.
    -   Test B: `onConfirm` is called when the "Accept" button is clicked.

## Phase 3.3: Core Implementation (ONLY after tests are failing)
- [ ] **T008: [P] Implement the `ResponsiveModal` component in `components/ResponsiveModal.tsx`.**
- [ ] **T009: [P] Implement the `EditBookmarkDialog` component in `components/EditBookmarkDialog.tsx`.**
- [ ] **T010: [P] Implement the `DeleteConfirmationDialog` component in `components/DeleteConfirmationDialog.tsx`.**
- [ ] **T011: [P] Implement the `EditFolderDialog` component in `components/EditFolderDialog.tsx`.**
- [ ] **T012: Implement the `AddBookmarkForm` component in `components/AddBookmarkForm.tsx`.**

## Phase 3.4: Integration
- [ ] **T013: [P] Add `ContextMenu` from shadcn/ui to the `FileTreeView` items.**
- [ ] **T014: [P] Add `ContextMenu` from shadcn/ui to the `BookmarkTile` component.**
- [ ] **T015: Integrate the `AddBookmarkForm` into the main page layout in `app/page.tsx`.**
- [ ] **T016: Wire up the context menus to open the corresponding edit/delete dialogs.**
- [ ] **T017: Update the `addBookmark` and `addFolder` functions to include unique IDs.**

## Phase 3.5: Polish & Refinement
- [ ] **T018: Refactor the main layout in `app/page.tsx` to use a fixed-width sidebar.**
- [ ] **T019: [P] Perform a general design pass to improve visual appeal, focusing on spacing, typography, and color.**
- [ ] **T020: [P] Ensure all new UI components are fully responsive.**

## Dependencies
-   T001, T002 block T003.
-   Tests (T005-T007) must be written and failing before Core Implementation (T008-T012).
-   Core Implementation blocks Integration (T013-T017).
-   Integration blocks Polish (T018-T020).
