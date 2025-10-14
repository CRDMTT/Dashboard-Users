Dashboard-Users
## How to Run the Project

This project is a React-based dashboard that integrates a mock REST API to display, search, and filter user data.
To run the project locally, make sure you have Node.js (v18 or higher) and npm or yarn installed.

Installation
# Clone the repository
git clone https://github.com/CRDMTT/Dashboard-Users.git

# Navigate to the project directory
cd my-app

# Install dependencies
npm install

# Start the development server
npm run dev

The app will be available at http://localhost:5173
 (or another port if specified).


## UX / UI Design
The design inspiration is available in public/UI-Mockup.webp.
Development began by implementing the static layout and core UI components, including:
- Primary and secondary buttons
- Color palette and typography
- Dark mode toggle
- Search bar input field

After defining the layout, a user table was created using mock data to design and test the grid structure and responsive behavior.
Accessibility improvements were later applied to enhance semantic markup, screen reader support, and keyboard navigation consistency.

## Accessibility Improvements
Key accessibility updates include:
Icons: 
- Decorative SVG icons marked as non-interactive (aria-hidden="true", focusable="false").

Forms: 
- UIInput supports labels and generates accessible IDs using React.useId().

Tables: 
- UserTable includes a visually hidden <caption> and uses th scope="col" for headers. Accordion toggles expose aria-expanded and aria-controls.

Buttons and Toggles:
- Theme toggle exposes role="switch" and aria-checked.
- Action buttons (edit/delete) include aria-label and title attributes.

## API Integration and Configuration
To simulate a real data source, a JSON file was generated using Mockaroo
and then uploaded to myjson.online, allowing the app to connect to the mock dataset via REST API (GET method).

The communication logic with the external service is centralized in src/api/ to keep the rest of the app clean and easily testable.

Main modules:
    - src/api/apiClient.ts — Lightweight HTTP client with reusable functions (apiFetch, fetchRecord(id)), and React hooks (useFetchRecord, useFetchUsers) handling loading, errors, and parsing.

    - src/utils/mapApiDataToUsers.ts — Normalizes varying JSON field names into the standard User model (e.g., first_name, job_title, etc.).

    - src/utils/useDebouncedValue.ts — Reusable debounce hook returning a debounced version of a value.
    - src/utils/useSearch.ts — Higher-level hook that encapsulates search state (query, activeRole), uses `useDebouncedValue`, and returns `filteredUsers` plus helpers (toggleRole, resetFilters).
    - src/utils/useUserActions.ts — Encapsulates edit/delete actions (optimistic updates, patch/update calls and rollback on failure) for easier reuse and testing.

    - src/api/config.ts — Contains demo constants (base URL, paths, sample IDs) for easier setup without .env configuration.

⚠️ Note: Since this is a demo, API credentials are stored in plain text.

## How It Works
Data Fetching: 
- The app sends a GET request to the mock API endpoint (hosted on myjson.online) via apiFetch.

Data Mapping: 
- The response is normalized by mapApiDataToUsers, ensuring consistent field names and structure.

Rendering: 
- The normalized data is stored in state and rendered dynamically within the Users Table.

Search, Filter & Pagination:
- Users can search, filter by role (Admin, Editor, Viewer), and navigate paginated results (20 users per page by default).

## Search and Filtering Logic
The search and filter features are designed for clarity and performance:

Debounce:
- 250 ms delay reduces redundant API calls during typing.

Pure Logic: 
- Implemented in src/utils/filterUsers.ts as filterUsers(users, { query, activeRole }), making it reusable and easily testable.

Matching Fields: 
- The query matches name, email, phone, jobTitle, companyName, username, location, and ipAddress.

Role Filter: 
- If a role (Admin/Editor/Viewer) is selected, only users of that role are shown.

## Logic Testing
This project uses Jest + ts-jest for unit tests.
Tests are located under src/utils/__tests__/ and focus on pure logic to ensure fast and stable results.

# Enter the app folder
cd my-app

# Install dependencies (if needed)
npm install

# Run all tests
npm test

# Watch mode
npm run test:watch

Test Coverage:
useDebouncedValue.test.ts — debounce hook behavior
useUsersList.test.ts — pagination and spinner timing
filterUsers.test.ts — search & role filtering logic
mapApiDataToUsers.test.ts — API mapping utility
useSearch.test.ts — tests for `useSearch` (query state, debouncedQuery behavior, role toggling and reset)
useUserActions.test.ts — tests for `useUserActions` (edit/delete success and failure flows, optimistic updates and rollback)

Tip: If you see TypeScript warnings from ts-jest, enable esModuleInterop: true in your tsconfig.json.

## Frontend Testing Checklist
Initial Load:
- Spinner appears briefly, then renders the user table.

Search:
- Debounce works smoothly; pagination resets on new queries or filters.
- Search-bar parameter: name, email, phone, jobTitle, companyName, username, location, ipAddress

Role Filters:
- Admin/Editor/Viewer buttons apply filters correctly.
- “Clear filter” (X badge) and aria-pressed behavior are preserved.

Pagination:
- Displays correct items per page (pageSize = 20 in this PR).
- Prev/Next buttons function correctly.

Component Variants:
You can preview and test component variants in the UI, including:
- Buttons: Primary, Secondary, Theme, Delete, Edit
- Inputs and Toggles: check hover/focus states and consistency with design system

## Bonus: Edit/Delete Demo Behavior ##
As a small bonus, edit and delete actions were added to each row. These trigger optimistic updates (UI updates immediately) and then attempt to persist changes to the demo API.
Because the demo API is read-only, write requests fail — but the app handles rollback gracefully.