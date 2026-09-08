# Admin Automation System

A modular admin automation platform (Giveaways, Grocery & Cleaning Inventory,
Generator Management, Attendance & Overtime, Reports, Notifications) built
module-by-module, end-to-end (frontend → API → database → tested feature)
per module.

## Status

**Phase 0 — Project Foundation: complete.**
**Module 1 — Authentication & Database-Driven RBAC: complete.**

- `frontend/` — React + Vite + Tailwind app shell: design system/tokens,
  reusable component library, sidebar/header layout, routing, Axios API
  client, plus real Login/Register pages, `AuthContext` (JWT session,
  `hasPermission(...)`), and `ProtectedRoute`. Builds cleanly (`npm run build`).
- `backend/` — Express + Mongoose API: config, error handling, health check,
  security middleware, logging, **plus** the full RBAC data model
  (`users`, `roles`, `permissions`, `user_roles`, `role_permissions`),
  `POST /auth/register`, `POST /auth/login`, `GET /auth/me`, a database-driven
  `requirePermission(...)` authorization middleware, RBAC admin endpoints
  under `/rbac`, and an idempotent seeder (`npm run seed`) for default
  roles/permissions and a starter admin account.

Verified in this environment: all files pass syntax checks, the Express app
boots and every auth/RBAC route was exercised over real HTTP (validation
errors, 401s on missing/invalid tokens, correct error envelopes), and
password hashing / JWT sign-verify were unit-tested directly. Full
register → login → permission-gated request flow needs a live MongoDB to
verify end-to-end, which isn't reachable from this sandbox — connect your
own `MONGO_URI` and run `npm run seed` then `npm run dev` to complete that
verification.

No further business modules (giveaways, inventory, generator, attendance,
dashboard, reports) are implemented yet — that starts with Module 2.

### Default seeded roles

Running `npm run seed` (after setting `MONGO_URI`) creates:
- **admin** — every permission
- **manager** — inventory/generator/giveaways management + attendance/leave/overtime approval
- **staff** — read-only + submit leave/attendance (the default role for new registrations)
- A starter admin login: `admin@admin-automation.local` / `ChangeMe123!` — change this immediately.

Roles and permissions live entirely in the database — there is no
`if (role === "admin")` anywhere in the codebase. Adding a role or granting
a permission is a data change via the `/rbac` endpoints, not a code change.

## Prerequisites

- Node.js 18+
- A MongoDB connection string (local MongoDB or a free MongoDB Atlas
  cluster). The backend cannot start without one.

## Running the frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on http://localhost:5173.

## Running the backend

```bash
cd backend
npm install
cp .env.example .env   # then set MONGO_URI to your own MongoDB connection string
npm run dev
```

Runs on http://localhost:5000. Health check:
`GET http://localhost:5000/api/v1/health`

## Project structure

```text
admin-automation-system/
├── frontend/   React + Vite + Tailwind UI
└── backend/    Express + Mongoose API
```

See `frontend/src` and `backend/src` for the internal folder layout — both
follow the structure specified in the project plan (components/pages/mock
for frontend; controllers/services/repositories/models/routes/middleware for
backend).

## Development approach

Each module (starting with Module 1 — Authentication & RBAC) is built
vertically: UI → API → database → business logic → verification, so the
app is always in a working, demonstrable state, rather than building the
entire frontend or entire backend in isolation.

Authorization throughout the system is database-driven RBAC
(`users → user_roles → roles → role_permissions → permissions`) — never
hardcoded `role === "admin"` checks.
