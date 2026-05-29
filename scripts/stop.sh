#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

log() { printf '==> %s\n' "$*"; }

log "Stopping Postgres container"
docker compose stop db

log "Stopped. To remove the Postgres volume as well, run: docker compose down -v"
