# Financial OS

A manual-first personal finance platform. Users enter and organize their own financial data to build awareness — accounts, transactions, recurring rules, and analytical dashboards.

## Tech stack

### Frontend

| Tool | Purpose |
|------|---------|
| **Next.js** | App Router, routing, SSR/SSG |
| **TypeScript** | Type safety across the UI |
| **Tailwind CSS** | Utility-first styling |
| **shadcn/ui** | Accessible component primitives |
| **TanStack Table** | Sortable, filterable data tables |
| **Zustand** | Lightweight client state (UI preferences, filters) |
| **React Query** | Server state, caching, and sync |
| **Recharts** | Dashboard and analytics charts |
| **Supabase SSR** | Auth sessions and route protection |

### Backend

| Tool | Purpose |
|------|---------|
| **FastAPI** | REST API with typed endpoints |
| **SQLAlchemy 2.0** | ORM and query layer |
| **Pydantic** | Request/response validation |
| **PostgreSQL (Supabase)** | Primary database and migrations |

### Auth

| Tool | Purpose |
|------|---------|
| **Supabase Auth** | User authentication and session management |

Sign-in and sign-up run through the **Supabase client on the frontend**. The FastAPI backend validates Supabase JWTs and serves profile data from the `profiles` table.

## Why PostgreSQL (Supabase), not SQLite

SQLite is excellent for local tools, prototypes, and desktop apps. This platform is not one of those — it already requires:

- Auth
- Multi-account data models
- Transaction and transfer logic
- Recurring transaction generation
- Analytics and dashboards
- Room to scale as usage grows

SQLite would be outgrown almost immediately. **PostgreSQL via Supabase** is the better long-term fit because it provides:

- **Managed Postgres** — production-grade relational database without ops overhead
- **Auth** — built-in user management integrated with the database
- **Row-level security** — user data isolation at the database layer
- **Backups** — automatic point-in-time recovery
- **Storage** — file attachments if needed later
- **Realtime** — optional live updates without a separate infra investment
- **Easy deployment** — straightforward path from dev to production

This gives us a serious backend foundation without forcing a heavy self-managed infrastructure setup.

## Project structure

```
frontend/   Next.js app (dashboard, accounts, transactions, etc.)
backend/    FastAPI app (api routes, services, repositories)
supabase/   Local Supabase config and SQL migrations
docs/       Architecture, API, and product documentation
scripts/    Dev startup and utility scripts
docker/     Container definitions
```

## Local development

### Prerequisites

Install these before running the project:

| Tool | Version | Install |
|------|---------|---------|
| **Docker Desktop** | Latest | [docker.com](https://www.docker.com/products/docker-desktop/) |
| **Supabase CLI** | Latest | `brew install supabase/tap/supabase` |
| **Node.js** | 22+ | [nodejs.org](https://nodejs.org/) |
| **uv** | Latest | [docs.astral.sh/uv](https://docs.astral.sh/uv/getting-started/installation/) |

Docker must be running — Supabase local runs Postgres and Auth in Docker containers.

### Quick start

From the repo root:

```bash
chmod +x scripts/dev.sh scripts/stop.sh scripts/sync-supabase-env.sh
./scripts/dev.sh
```

The script will:

1. Start Supabase local (`supabase start`) — Postgres, Auth, Studio
2. Sync `backend/.env` and `frontend/.env.local` from `supabase status`
3. Install backend (uv) and frontend (npm) dependencies
4. Start the FastAPI backend and Next.js frontend with **hot reload enabled**

### Local URLs

| Service | URL |
|---------|-----|
| Frontend | [http://localhost:3000](http://localhost:3000) |
| Backend API | [http://localhost:8000](http://localhost:8000) |
| API docs (Swagger) | [http://localhost:8000/docs](http://localhost:8000/docs) |
| Health check | [http://localhost:8000/api/health](http://localhost:8000/api/health) |
| Supabase Studio | [http://127.0.0.1:54323](http://127.0.0.1:54323) |
| Supabase API | [http://127.0.0.1:54321](http://127.0.0.1:54321) |

### Auth

| Route | Purpose |
|-------|---------|
| `/login` | Sign in with email and password |
| `/signup` | Create account (first name, last name, phone, email, password) |
| `/forgot-password` | **Placeholder — not yet implemented** |

**Account rules:**
- One email address = one account (enforced by Supabase Auth and a unique constraint on `profiles.email`)
- Passwords are managed by Supabase Auth — never stored in the FastAPI backend

**Forgot password** is not implemented yet. The `/forgot-password` page is a placeholder for a future release.

### Hot reload

Both servers auto-reload when you save files — no manual restart needed.

| Layer | Command | What reloads |
|-------|---------|--------------|
| **Frontend** | `next dev --turbopack` | React components, pages, styles (Fast Refresh) |
| **Backend** | `uvicorn --reload --reload-dir app` | Python files under `backend/app/` |

Hot reload applies when using `./scripts/dev.sh` or the manual setup below.

### Stopping services

- **Frontend + backend:** press `Ctrl+C` in the terminal running `./scripts/dev.sh`
- **Supabase local stack:** `./scripts/stop.sh`

Supabase keeps running between dev sessions so you don't lose local data. To reset the database:

```bash
supabase db reset
```

### Environment files

| File | Purpose |
|------|---------|
| `backend/.env.example` | Backend config template |
| `frontend/.env.local.example` | Frontend config template |

After `supabase start`, run `./scripts/sync-supabase-env.sh` to populate secrets automatically, or copy values from `supabase status -o env`:

```
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres
SUPABASE_URL=http://127.0.0.1:54321
SUPABASE_JWT_SECRET=...
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Manual setup

Use this if you prefer separate terminals or the startup script isn't available:

```bash
# 1. Start Supabase
supabase start
./scripts/sync-supabase-env.sh

# 2. Backend
cd backend
uv venv && uv pip install -r requirements.txt
uv run uvicorn app.main:app --reload

# 3. Frontend (new terminal)
cd frontend
npm install
npm run dev
```

### Self-hosting

To run Financial OS from a fresh clone:

1. Install prerequisites (Docker Desktop, Supabase CLI, Node.js, uv)
2. Clone the repository
3. Run `./scripts/dev.sh`

The repo includes Supabase migrations in `supabase/migrations/` for the `profiles` table and auth trigger.

### Troubleshooting

| Problem | Fix |
|---------|-----|
| `Missing required command: supabase` | Install Supabase CLI: `brew install supabase/tap/supabase` |
| Docker not running | Open Docker Desktop and wait until it is ready |
| Supabase not ready | Run `supabase start` and wait for all services |
| `Missing required command: uv` | Install uv: `curl -LsSf https://astral.sh/uv/install.sh \| sh` |
| Port 3000 or 8000 already in use | Stop the other process or change the port in the dev command |
| Frontend can't reach API | Confirm `NEXT_PUBLIC_API_URL=http://localhost:8000` in `frontend/.env.local` |
| Auth fails after restart | Re-run `./scripts/sync-supabase-env.sh` |

## API

All backend endpoints use the `/api` prefix.

| Endpoint | Description |
|----------|-------------|
| `GET /api/health` | Health check |
| `GET /api/auth/health` | Auth subsystem health check |
| `GET /api/auth/me` | Current user profile (requires Bearer JWT) |

See `docs/api/` for full API documentation as it is built out.

## AI development

See [AGENTS.md](./AGENTS.md) for project philosophy, architecture rules, and domain guidance. Cursor-specific rules live in `.cursor/rules/`.

When changing setup scripts, env templates, dependencies, or ports, update this README's **Local development** section in the same change.
