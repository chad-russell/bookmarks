# Tasks: Implement a tree view for bookmarks and folders

**Input**: Design documents from `/specs/004-implement-a-tree/`

## Phase 3.1: Setup
- [ ] T001 Install `shadcn-tree-view` component using `npx shadcn add "https://mrlightful.com/registry/tree-view"`.

## Phase 3.2: Core Component Creation
- [ ] T002 [P] Create the `ViewSwitcher.tsx` component file in `components/ViewSwitcher.tsx`.
- [ ] T003 [P] Create the `TreeView.tsx` component file in `components/TreeView.tsx`.

## Phase 3.3: Tests First (TDD)
- [ ] T004 [P] Create `ViewSwitcher.spec.tsx` in `tests/components/ViewSwitcher.spec.tsx` to test that the component renders and calls the `setViewMode` prop correctly.
- [ ] T005 [P] Create `TreeView.spec.tsx` in `tests/components/TreeView.spec.tsx` to test that the component renders the tree structure correctly based on the `folders` and `bookmarks` props.

## Phase 3.4: Core Implementation
- [ ] T006 Implement the `ViewSwitcher` component in `components/ViewSwitcher.tsx` using the `Combobox` from shadcn/ui.
- [ ] T007 Implement the `TreeView` component in `components/TreeView.tsx`, mapping the `folders` and `bookmarks` props to the `TreeDataItem` format and handling the `onFolderClick` callback.

## Phase 3.5: Integration
- [ ] T008 Update `app/page.tsx` to import and use the new `ViewSwitcher` and `TreeView` components. Add state to manage the view mode and conditionally render the correct view.

## Dependencies
- T001 must be completed before T007.
- T002 and T003 can be run in parallel.
- T004 and T005 can be run in parallel after T002 and T003 are complete.
- T006 must be completed after T004.
- T007 must be completed after T005.
- T008 must be completed after T006 and T007.

## Parallel Example
```
# Launch T002-T005 together:
Task: "Create the ViewSwitcher.tsx component file in components/ViewSwitcher.tsx"
Task: "Create the TreeView.tsx component file in components/TreeView.tsx"
Task: "Create ViewSwitcher.spec.tsx in tests/components/ViewSwitcher.spec.tsx to test that the component renders and calls the setViewMode prop correctly."
Task: "Create TreeView.spec.tsx in tests/components/TreeView.spec.tsx to test that the component renders the tree structure correctly based on the folders and bookmarks props."
```
