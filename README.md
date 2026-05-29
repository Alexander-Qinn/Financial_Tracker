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

### Backend

| Tool | Purpose |
|------|---------|
| **FastAPI** | REST API with typed endpoints |
| **SQLAlchemy 2.0** | ORM and query layer |
| **Alembic** | Database migrations |
| **Pydantic** | Request/response validation |
| **PostgreSQL (Supabase)** | Primary database |

### Auth

| Tool | Purpose |
|------|---------|
| **Supabase Auth** | User authentication and session management |

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
| **Node.js** | 22+ | [nodejs.org](https://nodejs.org/) |
| **uv** | Latest | [docs.astral.sh/uv](https://docs.astral.sh/uv/getting-started/installation/) |

Docker must be running — open **Docker Desktop** from Applications and wait until the menu bar whale icon is ready. The startup script supports both `docker compose` and `docker-compose`.

### Quick start

From the repo root:

```bash
chmod +x scripts/dev.sh scripts/stop.sh   # first time only
./scripts/dev.sh
```

The script will:

1. Start Postgres via Docker Compose
2. Create `backend/.env` and `frontend/.env.local` from examples (if missing)
3. Install backend (uv) and frontend (npm) dependencies
4. Start the FastAPI backend and Next.js frontend with **hot reload enabled**

### Hot reload

Both servers auto-reload when you save files — no manual restart needed.

| Layer | Command | What reloads |
|-------|---------|--------------|
| **Frontend** | `next dev --turbopack` | React components, pages, styles (Fast Refresh) |
| **Backend** | `uvicorn --reload --reload-dir app` | Python files under `backend/app/` |

Edit a page in `frontend/app/` and the browser updates instantly. Edit a route or service in `backend/app/` and Uvicorn restarts the API process automatically.

Hot reload applies when using `./scripts/dev.sh` or the manual setup below. The Docker backend/frontend images are for deployment only — use the startup script for local development.

### Local URLs

| Service | URL |
|---------|-----|
| Frontend | [http://localhost:3000](http://localhost:3000) |
| Backend API | [http://localhost:8000](http://localhost:8000) |
| API docs (Swagger) | [http://localhost:8000/docs](http://localhost:8000/docs) |
| Health check | [http://localhost:8000/api/health](http://localhost:8000/api/health) |

### Stopping services

- **Frontend + backend:** press `Ctrl+C` in the terminal running `./scripts/dev.sh`
- **Postgres container:** `./scripts/stop.sh`

Postgres keeps running between dev sessions so you don't lose local data. To wipe the database volume:

```bash
docker compose down -v
```

### Environment files

| File | Purpose |
|------|---------|
| `backend/.env.example` | Backend config template (copy to `backend/.env`) |
| `frontend/.env.local.example` | Frontend config template (copy to `frontend/.env.local`) |

Local defaults point at the Docker Postgres instance:

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/financial_os
NEXT_PUBLIC_API_URL=http://localhost:8000
```

For production, replace `DATABASE_URL` with your Supabase Postgres connection string.

### Manual setup

Use this if you prefer separate terminals or the startup script isn't available:

```bash
# 1. Start Postgres
docker compose up db -d

# 2. Backend
cd backend
cp .env.example .env
uv venv && uv pip install -r requirements.txt
uv run uvicorn app.main:app --reload

# 3. Frontend (new terminal)
cd frontend
cp .env.local.example .env.local
npm install
npm run dev
```

### Troubleshooting

| Problem | Fix |
|---------|-----|
| `Missing required command: docker` | Install Docker Desktop and open the app |
| Docker installed but script fails | Open Docker Desktop and wait until it is fully started |
| `Missing required command: uv` | Install uv: `curl -LsSf https://astral.sh/uv/install.sh \| sh` |
| Port 3000 or 8000 already in use | Stop the other process or change the port in the dev command |
| Postgres not ready | Wait a few seconds and re-run `./scripts/dev.sh`, or run `docker compose logs db` |
| Frontend can't reach API | Confirm `NEXT_PUBLIC_API_URL=http://localhost:8000` in `frontend/.env.local` |

## API

All backend endpoints use the `/api` prefix.

| Endpoint | Description |
|----------|-------------|
| `GET /api/health` | Health check |

See `docs/api/` for full API documentation as it is built out.

## AI development

See [AGENTS.md](./AGENTS.md) for project philosophy, architecture rules, and domain guidance. Cursor-specific rules live in `.cursor/rules/`.

When changing setup scripts, env templates, dependencies, or ports, update this README's **Local development** section in the same change.
