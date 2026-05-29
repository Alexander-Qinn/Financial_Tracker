#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

log() { printf '==> %s\n' "$*"; }
die() { printf 'error: %s\n' "$*" >&2; exit 1; }

require_cmd() {
  command -v "$1" >/dev/null 2>&1 || die "Missing required command: $1"
}

wait_for_supabase() {
  log "Waiting for Supabase..."
  for _ in $(seq 1 60); do
    if supabase status >/dev/null 2>&1; then
      log "Supabase is ready"
      return 0
    fi
    sleep 2
  done
  die "Supabase did not become ready in time"
}

log "Checking prerequisites"
require_cmd supabase
require_cmd node
require_cmd npm
require_cmd uv

if ! supabase status >/dev/null 2>&1; then
  log "Starting Supabase (Postgres + Auth)"
  supabase start
fi
wait_for_supabase

log "Syncing environment from Supabase"
chmod +x scripts/sync-supabase-env.sh
./scripts/sync-supabase-env.sh

log "Setting up backend"
(
  cd backend
  if [[ ! -d .venv ]]; then
    uv venv
  fi
  uv pip install -r requirements.txt
)

log "Setting up frontend"
(
  cd frontend
  npm install
)

cleanup() {
  log "Stopping dev servers"
  [[ -n "${BACKEND_PID:-}" ]] && kill "$BACKEND_PID" 2>/dev/null || true
  [[ -n "${FRONTEND_PID:-}" ]] && kill "$FRONTEND_PID" 2>/dev/null || true
}

trap cleanup EXIT INT TERM

log "Starting backend on http://localhost:8000"
(
  cd backend
  uv run uvicorn app.main:app --reload --reload-dir app --host 0.0.0.0 --port 8000
) &
BACKEND_PID=$!

log "Starting frontend on http://localhost:3000"
(
  cd frontend
  npm run dev
) &
FRONTEND_PID=$!

log "Financial OS is running (hot reload enabled)"
log "  Frontend: http://localhost:3000  (Next.js Fast Refresh)"
log "  Backend:  http://localhost:8000  (Uvicorn --reload)"
log "  Supabase Studio: http://127.0.0.1:54323"
log "  API docs: http://localhost:8000/docs"
log "Press Ctrl+C to stop frontend and backend (Supabase keeps running)"

wait "$BACKEND_PID" "$FRONTEND_PID"
