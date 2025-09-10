# Implementation Plan: Core Functionality Improvements

**Branch**: `002-functionality-improvements-when` | **Date**: 2025-09-09 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/Users/chadrussell/Code/bookmark/specs/002-functionality-improvements-when/spec.md`

## Summary
This plan outlines the implementation of core functionality improvements for the bookmark manager application. The feature adds create, rename, and delete operations for both bookmarks and folders, managed through context menus and dialogs. The bookmark data model will be updated to include a `name` field. The UI will be enhanced with a fixed-width sidebar and a new form for adding bookmarks directly. A final design pass will ensure the application is visually appealing.

## Technical Context
**Language/Version**: TypeScript (Next.js)
**Primary Dependencies**: Next.js, React, shadcn/ui, Tailwind CSS, pnpm
**Storage**: Single YAML file
**Testing**: Jest, React Testing Library
**Target Platform**: Web (Desktop and Mobile)
**Project Type**: Web application
**UI Components**:
-   **Modals**: `Dialog` (desktop), `Drawer` (mobile)
-   **Menus**: `ContextMenu`
-   **Forms**: `Input`, `Button`
**Architecture**:
-   State management will be enhanced within the existing `BookmarkContext`.
-   The `/api/bookmarks` API route will be updated to handle `POST`, `PUT`, and `DELETE` methods for full CRUD functionality.

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Simplicity**:
- Projects: 1 (Next.js app)
- Using framework directly? Yes
- Single data model? Yes
- Avoiding patterns? Yes

**Architecture**:
- EVERY feature as library? N/A (single project)

**Testing (NON-NEGOTIABLE)**:
- RED-GREEN-Refactor cycle enforced? Yes
- Git commits show tests before implementation? Yes
- Real dependencies used? Yes (real file system for tests)
- Integration tests for: API route CRUD operations, UI interactions for modals and context menus.

## Project Structure
**Structure Decision**: Web application (single Next.js project) - No changes to the existing structure.

## Phase 0: Outline & Research
1.  **Responsive Modals**: Research the best practice for implementing responsive dialogs that use the `Dialog` on desktop and `Drawer` on mobile with shadcn/ui.
2.  **Visual Design**: Research modern, minimal UI patterns for inspiration for the final design pass.
3.  **Data Migration**: Since we are adding a `name` field to bookmarks, consider how to handle existing bookmarks that don't have this field. Decision: The application will treat the `name` field as optional and fall back to displaying the `url` if the name is not present.

**Output**: `research.md` with decisions on the above points.

## Phase 1: Design & Contracts
*Prerequisites: research.md complete*

1.  **Data Model**: Update `data-model.md` to include the new `name` field for the Bookmark entity.
2.  **API Contracts**: Update `contracts/api.md` to define the `PUT` and `DELETE` methods for the `/api/bookmarks` endpoint.
3.  **Component Contracts**: Update `contracts/components.md` to define props for the new `EditBookmarkDialog`, `EditFolderDialog`, and `DeleteConfirmationDialog` components.
4.  **Quickstart**: Update `quickstart.md` to reflect the new UI interactions.

**Output**: Updated `data-model.md`, `contracts/api.md`, `contracts/components.md`, and `quickstart.md`.

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do - DO NOT execute during /plan*

**Task Generation Strategy**:
-   Create tasks for updating the data model and context.
-   Generate tasks for creating the new UI components (dialogs, context menus, forms).
-   Create tasks for updating the API route to handle the new methods.
-   Generate tasks for integrating the new components into the main UI.
-   Create tasks for the final design pass and visual polish.

**Ordering Strategy**:
-   TDD order: Tests before implementation.
-   Dependency order: Data model -> API route -> Context -> UI components.

**Estimated Output**: 25-30 numbered, ordered tasks in `tasks.md`.

## Progress Tracking
*This checklist is updated during execution flow*

**Phase Status**:
- [X] Phase 0: Research complete (/plan command)
- [X] Phase 1: Design complete (/plan command)
- [X] Phase 2: Task planning complete (/plan command - describe approach only)
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [X] Initial Constitution Check: PASS
- [X] Post-Design Constitution Check: PASS
- [X] All NEEDS CLARIFICATION resolved
- [X] Complexity deviations documented
