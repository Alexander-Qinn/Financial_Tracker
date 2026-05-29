# Financial OS — Agent Guide

Global guidance for AI coding agents working in this repository.

## Project vision

Financial OS is a **manual-first personal finance platform**. Users enter and organize their own financial data to build awareness, not to automate banking. The product helps people see where money lives, how it moves, and what patterns emerge over time.

## Product philosophy

This application is a manual-first financial operating system. The platform prioritizes:

- Manual financial awareness
- Account-centric organization
- Clear financial visibility
- Fast transaction entry
- Strong analytical dashboards

### Avoid

- Overengineering
- Premature automation
- Bank-sync assumptions
- Heavy fintech abstractions

## Domain terminology

| Term | Meaning |
|------|---------|
| **Account** | A container for money (checking, savings, credit card, cash, investment) |
| **Transaction** | A single money movement tied to exactly one account |
| **Expense** | Money leaving an account for consumption |
| **Income** | Money entering an account from earnings or inflows |
| **Transfer** | Money moving between two accounts; net worth unchanged |
| **Recurring** | A template that generates transactions on a schedule |
| **Category** | A label grouping expenses/income for analysis |
| **Tag** | A flexible secondary label on transactions |
| **Net worth** | Sum of all account balances at a point in time |
| **Cash flow** | Net income minus expenses over a period (transfers excluded) |

## Architecture constraints

### Stack

- **Frontend:** Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui
- **Backend:** FastAPI, SQLAlchemy, Pydantic, Supabase migrations
- **Database:** PostgreSQL

### Layering

```
Routes  →  Services  →  Repositories  →  Database
```

- **Routes** (`backend/app/api/routes/`): HTTP handling only — parse input, call services, return responses
- **Services** (`backend/app/services/`): Business logic, orchestration, validation of domain rules
- **Repositories** (`backend/app/repositories/`): Database queries and persistence
- **Models** (`backend/app/models/`): SQLAlchemy table definitions
- **Schemas** (`backend/app/schemas/`): Pydantic request/response shapes

### Frontend organization

```
frontend/
  app/           Route pages (thin — compose components)
  components/    Reusable UI by domain (ui/, dashboard/, transactions/, etc.)
  lib/           API clients, auth, utils, formatters, validations
  hooks/         Custom React hooks
  store/         Client state
  types/         Shared TypeScript types
```

### Rules

- Frontend uses Next.js App Router
- Backend uses FastAPI
- Business logic belongs in `services/`
- Database access belongs in `repositories/`
- UI components must remain reusable
- Prefer composition over inheritance
- Avoid massive React components (split at ~200 lines)
- Keep database models normalized
- All backend endpoints use the `/api` prefix

## Important business rules

### Transaction rules

- Every transaction belongs to an account
- Transaction types: `expense`, `income`, `transfer`
- Transfers must preserve balance consistency (debit one account, credit the other)
- Credit card payments are **transfers**, NOT expenses
- Transaction history should be immutable where possible (edit via adjustment entries, not silent overwrites)

### Account rules

- Each account has a type: checking, savings, credit_card, cash, investment, other
- Credit card balances represent liability (negative net worth contribution)
- Account balance is derived from transaction history, not stored independently without reconciliation

### Recurring rules

- Recurring templates generate concrete transactions on schedule
- Generated transactions are normal transactions (editable individually after generation)
- Skipping a period does not retroactively alter past generated entries

### Analytics rules

- Net worth = sum of all account balances
- Cash flow = income − expenses over a period (exclude transfers)
- Forecasting extrapolates from recurring templates and recent averages — always label as projected

## UX expectations

- Prioritize speed of manual entry
- Minimize clicks
- Optimize keyboard workflows (Tab, Enter, Escape, shortcuts)
- Avoid modal overload — prefer inline editing and slide-over panels
- Design for power users who enter many transactions quickly
- Show account context everywhere money is displayed
- Use consistent number formatting (currency, dates, percentages)

## Coding standards

### General

- Minimize scope — smallest correct diff
- Match existing conventions in the file you edit
- Keep imports at the top of files; no inline imports
- Use exhaustive switch handling for TypeScript unions and enums
- Comments only for non-obvious business logic

### Frontend

- Use shadcn/ui components from `components/ui/`
- Use Tailwind utility classes; avoid deeply nested custom CSS
- Pages are thin — logic in hooks, presentation in components
- Forms use shared validation schemas from `lib/validations/`
- API calls go through `lib/api/` — never fetch directly from components

### Backend

- Keep services stateless
- Validate using Pydantic schemas
- Use typed responses on all endpoints
- Keep endpoints RESTful
- Avoid business logic in routes
- Use `logger.exception` instead of `logger.error` or `logger.warn`
- Run Python commands with `uv` from `backend/`
- Auth: Supabase handles credentials on the frontend; backend validates Supabase JWTs via `SUPABASE_JWT_SECRET`
- Profile data lives in `public.profiles` (one row per user, unique email)

### Database

- Use UUIDs for primary keys
- Include `created_at` / `updated_at` on all tables
- Use soft deletes sparingly (prefer immutable history)
- Normalize models; avoid duplicating denormalized data without reason

## Styling rules

- Use shadcn/ui as the component foundation
- Use Tailwind utility classes
- Avoid deeply nested styling
- Prefer a calm fintech aesthetic — muted tones, clear hierarchy, generous whitespace
- Support dark mode on all new UI

## Repository layout

```
frontend/   Next.js app
backend/    FastAPI app
docs/       Architecture, API, product, decisions
scripts/    Dev and ops scripts
docker/     Container definitions
```

## Common commands

```bash
# Full local stack (Supabase + backend + frontend)
./scripts/dev.sh

# Stop Supabase local stack
./scripts/stop.sh

# Sync env files from running Supabase instance
./scripts/sync-supabase-env.sh

# Backend only
cd backend && uv run uvicorn app.main:app --reload

# Frontend only
cd frontend && npm run dev

# Database migrations (Supabase)
supabase migration new my_change
supabase db reset   # local: apply all migrations fresh
```

## Related rule files

Domain-specific guidance lives in `.cursor/rules/`:

- `frontend.mdc` — Component, state, form, and table patterns
- `backend.mdc` — Service, repository, API, and error handling
- `database.mdc` — Schema design, indexing, consistency
- `ui-design.mdc` — Visual design and layout consistency
- `financial-domain.mdc` — Financial logic and accounting rules
