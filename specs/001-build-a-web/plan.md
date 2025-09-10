# Implementation Plan: Bookmark Manager Web App

**Branch**: `001-build-a-web` | **Date**: 2025-09-09 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/Users/chadrussell/Code/bookmark/specs/001-build-a-web/spec.md`

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input path
   → If not found: ERROR "No feature spec at {path}"
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → Detect Project Type from context (web=frontend+backend, mobile=app+api)
   → Set Structure Decision based on project type
3. Evaluate Constitution Check section below
   → If violations exist: Document in Complexity Tracking
   → If no justification possible: ERROR "Simplify approach first"
   → Update Progress Tracking: Initial Constitution Check
4. Execute Phase 0 → research.md
   → If NEEDS CLARIFICATION remain: ERROR "Resolve unknowns"
5. Execute Phase 1 → contracts, data-model.md, quickstart.md, agent-specific template file (e.g., `CLAUDE.md` for Claude Code, `.github/copilot-instructions.md` for GitHub Copilot, or `GEMINI.md` for Gemini CLI).
6. Re-evaluate Constitution Check section
   → If new violations: Refactor design, return to Phase 1
   → Update Progress Tracking: Post-Design Constitution Check
7. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
8. STOP - Ready for /tasks command
```

## Summary
This plan outlines the implementation of a bookmark manager web application. The application will feature a nested folder structure for organizing bookmarks, with both a file tree and a tile view for display. The entire state will be managed in a single YAML file, which can be edited directly by the user or through the application's UI. The frontend will be a modern, responsive, and themeable Next.js application using shadcn/ui and Tailwind CSS.

## Technical Context
**Language/Version**: TypeScript (Next.js)
**Primary Dependencies**: Next.js, React, shadcn/ui, Tailwind CSS, Vite, pnpm
**Storage**: Single YAML file
**Testing**: Jest, React Testing Library
**Target Platform**: Web (Desktop and Mobile)
**Project Type**: Web application
**Performance Goals**: Fast page loads and UI interactions
**Constraints**: The single YAML file is the source of truth for all data.
**Scale/Scope**: Single-user application, running locally or as a container.

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Simplicity**:
- Projects: 1 (Next.js app)
- Using framework directly? Yes
- Single data model? Yes
- Avoiding patterns? Yes

**Architecture**:
- EVERY feature as library? N/A (single project)
- Libraries listed: N/A
- CLI per library: N/A
- Library docs: N/A

**Testing (NON-NEGOTIABLE)**:
- RED-GREEN-Refactor cycle enforced? Yes
- Git commits show tests before implementation? Yes
- Order: Contract→Integration→E2E→Unit strictly followed? Yes
- Real dependencies used? Yes (real file system for tests)
- Integration tests for: File I/O, UI interactions
- FORBIDDEN: Implementation before test, skipping RED phase

**Observability**:
- Structured logging included? Yes
- Frontend logs → backend? N/A (local app)
- Error context sufficient? Yes

**Versioning**:
- Version number assigned? 0.1.0
- BUILD increments on every change? Yes
- Breaking changes handled? N/A

## Project Structure

### Documentation (this feature)
```
specs/001-build-a-web/
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command)
├── quickstart.md        # Phase 1 output (/plan command)
├── contracts/           # Phase 1 output (/plan command)
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)
```
# Option 2: Web application (when "frontend" + "backend" detected)
# In this case, it's a single Next.js app, so we'll use a modified structure.
app/
├── (pages)/
│   ├── page.tsx
│   └── layout.tsx
├── components/
├── lib/
└── styles/

public/
data/
  bookmarks.yml
```

**Structure Decision**: Web application (single Next.js project)

## Phase 0: Outline & Research
1.  **Research shadcn/ui components**: Identify the best components for the file tree view, tile view, and overall layout.
2.  **YAML parsing in TypeScript**: Investigate the best library for parsing and serializing YAML in a Next.js application.
3.  **Favicon fetching**: Determine a reliable method for fetching favicons from URLs.

**Output**: `research.md` with decisions on the above points.

## Phase 1: Design & Contracts
*Prerequisites: research.md complete*

1.  **Data Model**: Define the YAML schema for folders and bookmarks in `data-model.md`.
2.  **API Contracts**: Define the shape of the data passed between the UI components and the file I/O layer in `contracts/`.
3.  **Component Contracts**: Define the props for each React component.
4.  **Quickstart**: Write a `quickstart.md` with steps to set up and run the application.

**Output**: `data-model.md`, `/contracts/*`, `quickstart.md`

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do - DO NOT execute during /plan*

**Task Generation Strategy**:
-   Create tasks for setting up the Next.js project with shadcn/ui.
-   Generate tasks for creating the UI components (file tree, tile view, etc.).
-   Create tasks for implementing the file I/O logic (reading and writing the YAML file).
-   Generate tasks for the favicon fetching logic.
-   Create tasks for writing tests for all of the above.

**Ordering Strategy**:
-   TDD order: Tests before implementation.
-   Dependency order: Data model and file I/O first, then UI components.

**Estimated Output**: 20-25 numbered, ordered tasks in `tasks.md`.

## Phase 3+: Future Implementation
*These phases are beyond the scope of the /plan command*

**Phase 3**: Task execution (/tasks command creates `tasks.md`)
**Phase 4**: Implementation (execute `tasks.md` following constitutional principles)
**Phase 5**: Validation (run tests, execute `quickstart.md`, performance validation)

## Complexity Tracking
*Fill ONLY if Constitution Check has violations that must be justified*

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A       | N/A        | N/A                                 |

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
