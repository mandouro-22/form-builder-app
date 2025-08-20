### Form Builder Project Tasks

#### Tasks Completed

- [x] Set up routing using `@tanstack/react-router` and link master pages — True
- [x] Create a landing page with a feature preview and a start building button — True
- [x] Builder Page: Drag and drop support using `@dnd-kit` — True
- [x] Dragable Element Panel (Input, Textarea, Checkbox, Radio, Select, Date, Email, Button) — True
- [x] Dropdown Area that displays elements by type with specialized components — True
- [x] Select and visually highlight elements in the panel — True
- [x] Properties Panel for Elements: Edit label, name, placeholder, and is_required — True
- [x] Manage Element Options (Select / Radio / Checkbox): Add, Edit, Delete — True
- [x] Delete an element from the panel using action buttons — True
- [x] App State Using `zustand`: `addElement`, `selectElement`, `updateElement`, `removeElement`, `clearElements`, `setProperties` — True
- [x] DragOverlay to show the active element — True
- [x] Authentication pages (login/signup) with `react-hook-form` and `zod` for validation — True (Interface only)
- [x] Configure Firebase App and Analytics (run analytics when supported) — True
- [x] Templates page with demo cards and a delete form (Modal) — True (static data)

#### Planned/Unfinished Tasks

- [x] Bind actual authentication using Firebase Auth (register/signup/signout) and bind buttons in the interface
- [x] Save form as a template from the Create page and store it in a database
- [ ] Templates page: Read templates from the database, enable search, delete/modify Actual
- [ ] Open a template for editing in the builder page (Edit existing template)
- [ ] Export the template: as a JSON file and generate a PDF
- [ ] Reorder elements within the canvas by dragging (Sort/Reorder within Canvas)
- [ ] Toggle the "Preview/Properties" mode if `is_preview` is intended, and show the full preview of the template
- [ ] A button to clear the entire canvas with a confirmation, and a button to deselect the element
- [ ] Make the template counter in the `Navbar` dynamic instead of `0`
- [ ] Make template search efficient in the templates page
- [ ] Improve accessibility (labels, aria-\*, color contrast)
- [ ] Set up a local and secure `.env` environment for Firebase values and document it in the `README`
- [ ] Core tests for the repository, critical components, and CI setup
- [ ] Stable deployment and production (Vercel) settings with environment keys

#### Notes

- Tasks tagged with "(interface "Only") or "(Static Data)" are formal and require connection to real services.
- This list can be moved to Issues later for better tracking.
