#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

log() { printf '==> %s\n' "$*"; }
die() { printf 'error: %s\n' "$*" >&2; exit 1; }

require_cmd() {
  command -v "$1" >/dev/null 2>&1 || die "Missing required command: $1"
}

resolve_docker_compose() {
  if docker compose version >/dev/null 2>&1; then
    DOCKER_COMPOSE=(docker compose)
  elif command -v docker-compose >/dev/null 2>&1; then
    DOCKER_COMPOSE=(docker-compose)
  else
    die "Docker Compose is not available (install Docker Desktop and open the app)"
  fi
}

require_docker_daemon() {
  if ! docker info >/dev/null 2>&1; then
    die "Docker is installed but not running — open Docker Desktop from Applications and wait until it is ready"
  fi
}

wait_for_postgres() {
  log "Waiting for Postgres..."
  for _ in $(seq 1 30); do
    if "${DOCKER_COMPOSE[@]}" exec -T db pg_isready -U postgres -d financial_os >/dev/null 2>&1; then
      log "Postgres is ready"
      return 0
    fi
    sleep 1
  done
  die "Postgres did not become ready in time"
}

log "Checking prerequisites"
require_cmd docker
require_cmd node
require_cmd npm
require_cmd uv
resolve_docker_compose
require_docker_daemon

log "Starting Postgres (Docker)"
"${DOCKER_COMPOSE[@]}" up db -d
wait_for_postgres

if [[ ! -f backend/.env ]]; then
  log "Creating backend/.env from .env.example"
  cp backend/.env.example backend/.env
fi

if [[ ! -f frontend/.env.local ]]; then
  log "Creating frontend/.env.local from .env.local.example"
  cp frontend/.env.local.example frontend/.env.local
fi

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
log "  API docs: http://localhost:8000/docs"
log "Press Ctrl+C to stop frontend and backend (Postgres keeps running)"

wait "$BACKEND_PID" "$FRONTEND_PID"
