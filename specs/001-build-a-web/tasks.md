# Tasks: Bookmark Manager Web App

**Input**: Design documents from `/Users/chadrussell/Code/bookmark/specs/001-build-a-web/`

**Important**: Whenever a task has been completed, check it off this list!

## Phase 3.1: Setup
- [x] **T001: Create Next.js project structure.** (Status: Done)
- [x] **T002: Initialize Next.js project with `pnpm create next-app`.** (Status: Done)
- [x] **T003: [P] Install and configure shadcn/ui, Tailwind CSS, and `js-yaml`.** (Status: Done)
- [x] **T004: [P] Configure linting and formatting tools (ESLint, Prettier).** (Status: Done)
- [x] **T005: Create `data/bookmarks.yml` file.** (Status: Done)
- [x] **T006: Set up Jest and React Testing Library for testing.** (Status: Done)

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
- [x] **T007: [P] Create integration test for file I/O service in `tests/integration/file-io.spec.ts`.** (Status: Done)
- [x] **T008: [P] Create component test for `FileTreeView` in `tests/components/FileTreeView.spec.tsx`.** (Status: Done)
- [x] **T009: [P] Create component test for `TileView` in `tests/components/TileView.spec.tsx`.** (Status: Done)
- [x] **T010: [P] Create component test for `BookmarkTile` in `tests/components/BookmarkTile.spec.tsx`.** (Status: Done)

## Phase 3.3: Core Implementation (ONLY after tests are failing)
- [x] **T011: [P] Define TypeScript types for `Folder` and `Bookmark` in `lib/types.ts`.** (Status: Done)
- [x] **T012: Implement the file I/O service in `lib/file-io.ts` to make the tests in T007 pass.** (Status: Done)
- [x] **T013: Implement the `FileTreeView` component in `components/FileTreeView.tsx` to make the tests in T008 pass.** (Status: Done)
- [x] **T014: Implement the `TileView` component in `components/TileView.tsx` to make the tests in T009 pass.** (Status: Done)
- [x] **T015: Implement the `BookmarkTile` component in `components/BookmarkTile.tsx` to make the tests in T010 pass.** (Status: Done)
- [x] **T016: Implement the main page layout in `app/page.tsx` using a resizable layout.** (Status: Done)
- [x] **T017: Implement favicon fetching logic in `lib/favicon.ts`.** (Status: Done)

## Phase 3.4: Integration
- [x] **T018: Create a React Context provider in `context/BookmarkContext.tsx` to manage application state.** (Status: Done)
- [x] **T019: Implement functions within the context to handle creating, updating, and deleting bookmarks/folders.** (Status: Done for 'create')
- [x] **T020: Connect the `FileTreeView` and `TileView` components to the `BookmarkContext` to receive and display data.** (Status: Done)
- [x] **T021: Implement theme switching functionality using the capabilities of shadcn/ui.** (Status: Done)

## Phase 3.5: Polish
- [x] **T022: [P] Add unit tests for all utility functions (e.g., in `lib/favicon.ts`).** (Status: Done)
- [x] **T023: [P] Ensure the application is fully responsive across desktop, tablet, and mobile screen sizes.** (Status: Done)
- [x] **T024: [P] Add a selection of pre-defined themes.** (Status: Done)
- [x] **T025: [P] Write comprehensive documentation for the project in a `README.md` file.** (Status: Done)

## Dependencies
-   T006 (Testing Setup) blocks T007-T010.
-   Tests (T007-T010) must be written and failing before Core Implementation (T011-T017).
-   T011 (Types) blocks most of the core implementation tasks.
-   T012 (File I/O) blocks T019.
-   Core Implementation (T011-T017) blocks Integration (T018-T021).