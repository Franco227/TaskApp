# TaskApp

A full-stack task and category manager built with NestJS and React. This project was originally completed as a technical assessment for a full-stack JS/NestJS/React developer position, and is shared here as a portfolio piece.

## Context

The brief provided a starter repo with a working `Task` entity (backend CRUD and a basic frontend list with delete) and asked to extend it with:

- A `Category` entity with a many-to-one, optional relation to `Task`, plus a full CRUD API and filtering tasks by category.
- A task creation form, a done/to-do toggle, category management UI, and category-based filtering on the frontend.
- Bonus items to attempt time permitting: unit tests, pagination, search by title, task editing, and general UX polish.

The goal was to demonstrate structuring a NestJS/React codebase, using Prisma correctly, and staying consistent with the existing patterns rather than introducing a different style.

## Features

**Tasks**
- Create, edit, and delete tasks (title, description, optional category).
- Toggle a task between done and to-do.
- Search tasks by title and filter by category.

**Categories**
- Create, rename, and delete categories.
- Filter the task list by category directly from the category list.

**Cross-cutting**
- Server-side validation with `class-validator` and a global `ValidationPipe` (whitelist, forbid unknown properties, auto-transform).
- Consistent error handling: 404s for missing resources, toast notifications on the frontend.
- Delete confirmation modal shared between tasks and categories.
- Loading and error states on data fetches.

## Tech stack

- **Backend**: NestJS 10, Prisma, SQLite, class-validator
- **Frontend**: React 18, Vite, TypeScript

## Technical choices

### Backend

- Each domain (`tasks`, `categories`, `prisma`) is its own Nest module with its own controller, service, and DTOs, mirroring the structure already in place for `Task`. This keeps responsibilities separated and makes the codebase predictable to navigate.
- Prisma is the single point of access to the database; no query logic lives in controllers, and `include: { category: true }` is used on task reads to avoid N+1 queries when a task's category is needed.
- DTOs validate input at the boundary (`create-task.dto.ts`, `update-task.dto.ts`, `get-tasks.dto.ts`, and their category equivalents), so invalid payloads are rejected before reaching a service.
- The category relation on `Task` is optional (`categoryId Int?`), matching the requirement that a task does not need a category.

### Frontend

- Dependencies were kept intentionally minimal: `lucide-react` for icons, `sonner` for toast notifications, and `react-modal` for modals. No UI kit or state management library was pulled in, since the app's state is small enough to manage with hooks.
- Components are split by domain (`components/tasks/`, `components/categories/`), with `DeleteElementModal` kept outside both since it is shared by tasks and categories.
- Data fetching and state for each domain live in dedicated hooks (`useTasks`, `useCategories`) rather than in the components themselves, keeping components focused on rendering.
- `useCategories` is called once in `App.tsx` and its state is passed down, so both the category list and the task form stay in sync when a category is added, renamed, or removed.
- `AddOrUpdateTaskModal` is a single component used for both creating and editing a task, since the two forms are otherwise identical.
- `useEffect` usage is kept to a minimum (only for the initial data fetches) to avoid unnecessary re-renders; filtering and sorting are derived with `useMemo` instead.

## Getting started

### Backend

```bash
cd backend
npm install
npx prisma migrate dev
npm run start:dev
```

The API runs on `http://localhost:3000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The app runs on `http://localhost:5173` and proxies `/api` calls to the backend (see `vite.config.ts`).

## What I would do with more time

- Cover the remaining bonus items: unit tests for the Nest services, and pagination.
- Replace the boolean `done` field with a dedicated, user-customizable status entity (for example: to do, in progress, done, cancelled), with its own CRUD and dynamic filter tabs generated from the user's statuses.
- Add a "no category" filter option to let users see tasks that have no category assigned.
- Let users choose how the task list is sorted (title, creation date, status).
- Spend more time on visual design and add a dark theme.

## Known limitations

- No authentication: this was out of scope for the assessment, and all data is shared across a single, unauthenticated user.
- Search and category filtering happen client-side against the full task list, which is fine at this scale but would need to move server-side (with pagination) for larger datasets.
