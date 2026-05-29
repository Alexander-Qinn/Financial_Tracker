#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

log() { printf '==> %s\n' "$*"; }
die() { printf 'error: %s\n' "$*" >&2; exit 1; }

resolve_docker_compose() {
  if docker compose version >/dev/null 2>&1; then
    DOCKER_COMPOSE=(docker compose)
  elif command -v docker-compose >/dev/null 2>&1; then
    DOCKER_COMPOSE=(docker-compose)
  else
    die "Docker Compose is not available"
  fi
}

resolve_docker_compose

log "Stopping Postgres container"
"${DOCKER_COMPOSE[@]}" stop db

log "Stopped. To remove the Postgres volume as well, run: ${DOCKER_COMPOSE[*]} down -v"
