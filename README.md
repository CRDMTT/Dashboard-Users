# Dashboard-Users





## Accessibility changes
This project received a focused accessibility review and a set of fixes while developing the dashboard UI components. The main accessibility work completed so far includes:

- Marked decorative SVG icons as non-interactive for assistive technologies (added `aria-hidden="true"` and `focusable="false"` where appropriate). Files affected: `src/components/ui/svg/*` (SearchIcon, ArrowIcon, ThemeIcon, EditIcon, TrashIcon).
- Ensured interactive SVGs used inside buttons remain decorative so they do not create additional noise for screen readers (icons still display visually but are hidden from AT).
- Improved form control accessibility:
	- `UIInput` supports `label` and generates accessible `id` values via `React.useId()`; inputs used in pages include `aria-label` where a visible label is not desired.
- Table accessibility improvements:
	- `UserTable` includes a visually-hidden `<caption>` and uses `th scope="col"` for headers. Accordion toggles expose `aria-expanded` and `aria-controls`.
- Buttons and toggles:
	- Theme toggle exposes `role="switch"` and `aria-checked`.
	- Action buttons (edit/delete) include `aria-label` and `title` attributes.

Notes and next steps:

- A full project-wide a11y audit is in progress: remaining tasks include a systematic check for missing labels on all form controls, keyboard focus styles, contrast checks for dark mode, adding a skip-to-content link, and integrating automated accessibility tests (axe/jest or cypress-axe) in CI.
- Please review the `src/components/ui/svg` folder if you plan to add new icons: follow the existing pattern and add `aria-hidden="true"` and `focusable="false"` for decorative icons, and provide an accessible name for informative/informative icons.

If you'd like, I can continue and apply the remaining high-priority fixes (labels and live regions) and add automated tests.