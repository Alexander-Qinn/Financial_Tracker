#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

log() { printf '==> %s\n' "$*"; }
die() { printf 'error: %s\n' "$*" >&2; exit 1; }

require_cmd() {
  command -v "$1" >/dev/null 2>&1 || die "Missing required command: $1"
}

require_cmd supabase

if ! supabase status >/dev/null 2>&1; then
  die "Supabase is not running — run: supabase start"
fi

eval "$(supabase status -o env)"

: "${API_URL:?Missing API_URL from supabase status}"
: "${ANON_KEY:?Missing ANON_KEY from supabase status}"
: "${SERVICE_ROLE_KEY:?Missing SERVICE_ROLE_KEY from supabase status}"
: "${JWT_SECRET:?Missing JWT_SECRET from supabase status}"
: "${DB_URL:?Missing DB_URL from supabase status}"

BACKEND_ENV="$ROOT/backend/.env"
FRONTEND_ENV="$ROOT/frontend/.env.local"

write_backend_env() {
  cat > "$BACKEND_ENV" <<EOF
APP_NAME="Financial OS"
DATABASE_URL=${DB_URL}
SUPABASE_URL=${API_URL}
SUPABASE_JWT_SECRET=${JWT_SECRET}
SUPABASE_SERVICE_ROLE_KEY=${SERVICE_ROLE_KEY}
EOF
}

write_frontend_env() {
  cat > "$FRONTEND_ENV" <<EOF
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SUPABASE_URL=${API_URL}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${ANON_KEY}
EOF
}

if [[ -f "$BACKEND_ENV" ]]; then
  log "Updating Supabase keys in backend/.env"
else
  log "Creating backend/.env from Supabase status"
fi
write_backend_env

if [[ -f "$FRONTEND_ENV" ]]; then
  log "Updating Supabase keys in frontend/.env.local"
else
  log "Creating frontend/.env.local from Supabase status"
fi
write_frontend_env

log "Environment files synced from local Supabase"
