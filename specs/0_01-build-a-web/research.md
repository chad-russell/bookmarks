# Research & Decisions

## shadcn/ui Components
-   **Decision**: We will use the following shadcn/ui components:
    -   `Tree` for the file tree view.
    -   `Card` for the tile view.
    -   `Button` for UI interactions.
    -   `Input` for forms.
    -   `Dialog` for modals.
    -   `Resizable` for the main layout.
-   **Rationale**: These components provide the necessary functionality and are highly customizable to fit the desired modern and minimal aesthetic.
-   **Alternatives considered**: Building components from scratch (too time-consuming), other component libraries (shadcn/ui is a better fit for the desired style).

## YAML Parsing in TypeScript
-   **Decision**: We will use the `js-yaml` library.
-   **Rationale**: It is a popular, well-maintained, and feature-complete library for parsing and serializing YAML.
-   **Alternatives considered**: `yaml` (another good option, but `js-yaml` is more widely used).

## Favicon Fetching
-   **Decision**: We will use the Google Favicon API (`https://www.google.com/s2/favicons?domain=`).
-   **Rationale**: It is a simple and reliable way to get favicons without having to implement complex logic for parsing HTML and finding the favicon URL.
-   **Alternatives considered**: A more complex solution involving fetching the HTML of the page and parsing it to find the favicon URL (overkill for this project).
