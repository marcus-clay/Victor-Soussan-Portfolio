#!/usr/bin/env bash
# Rebuild http://localhost:3002 with the work of every worktree of this repo.
#
#   scripts/refresh-preview.sh          merge, build, restart 3002
#   scripts/refresh-preview.sh --dry    merge only, report conflicts, no build
#
# How it works
#   1. Every worktree (committed work AND uncommitted changes) is snapshotted
#      through a temporary index. Branches, indexes and working folders of the
#      worktrees are never modified. Snapshots live under refs/preview/<name>.
#   2. A dedicated worktree (<repo>-integration, branch integration/3002) is reset
#      to origin/main, then each snapshot is merged into it.
#   3. A source that conflicts is skipped and reported, never half-merged.
#      To keep a manual resolution for the next runs, merge it once by hand:
#        git -C <repo>-integration -c rerere.enabled=true merge refs/preview/<name>
#      then resolve and commit. Later runs replay the same resolution.
#   4. The integration worktree is built. Only if the build succeeds is the
#      process listening on the port replaced; otherwise the old server stays.
#
# Only one refresh runs at a time (lock in /tmp), so parallel conversations
# can all call this same script.
set -euo pipefail

REPO="${REPO:-/Users/condamine/Documents/GitHub/Victor-Soussan-Portfolio}"
INTEG="${INTEG:-${REPO}-integration}"
PORT="${PORT:-3002}"
BRANCH="integration/3002"
EXCLUDE_NAMES=("$(basename "$INTEG")" "Victor-Soussan-Portfolio-v2")
LOCK=/tmp/refresh-preview.lock
DRY=0
[ "${1:-}" = "--dry" ] && DRY=1

# --- lock ---------------------------------------------------------------
if ! mkdir "$LOCK" 2>/dev/null; then
  other=$(cat "$LOCK/pid" 2>/dev/null || true)
  if [ -n "$other" ] && kill -0 "$other" 2>/dev/null; then
    echo "Un refresh est deja en cours (pid $other). Relancez quand il est termine."
    exit 1
  fi
  rm -rf "$LOCK"
  mkdir "$LOCK"
fi
echo $$ > "$LOCK/pid"
trap 'rm -rf "$LOCK"' EXIT

# --- base ---------------------------------------------------------------
git -C "$REPO" fetch -q origin main 2>/dev/null || echo "(fetch impossible, base locale)"
if git -C "$REPO" rev-parse -q --verify origin/main >/dev/null; then BASE=origin/main; else BASE=main; fi

# --- integration worktree -----------------------------------------------
if [ ! -e "$INTEG/.git" ]; then
  git -C "$REPO" worktree add -q -f -B "$BRANCH" "$INTEG" "$BASE"
fi
cd "$INTEG"
git checkout -q -f -B "$BRANCH" "$BASE"
git clean -fdq

# Snapshot of a worktree without touching it: HEAD plus every uncommitted and
# untracked (non ignored) file, built in a throwaway index.
snapshot() {
  local wt="$1" head tmp tree
  head=$(git -C "$wt" rev-parse -q --verify HEAD) || return 1
  tmp=$(mktemp -u /tmp/preview-index.XXXXXX)
  GIT_INDEX_FILE="$tmp" git -C "$wt" read-tree HEAD
  GIT_INDEX_FILE="$tmp" git -C "$wt" add -A -- . ':(exclude)*.mov'
  tree=$(GIT_INDEX_FILE="$tmp" git -C "$wt" write-tree)
  rm -f "$tmp"
  if [ "$tree" = "$(git -C "$wt" rev-parse "${head}^{tree}")" ]; then
    echo "$head"
  else
    git -C "$wt" commit-tree "$tree" -p "$head" -m "preview snapshot of $(basename "$wt")"
  fi
}

is_excluded() {
  local n="$1" e
  for e in "${EXCLUDE_NAMES[@]}"; do [ "$n" = "$e" ] && return 0; done
  return 1
}

# Main folder first, then the others in alphabetical order.
WTS=("$REPO")
while IFS= read -r p; do
  [ "$p" = "$REPO" ] || WTS+=("$p")
done < <(git -C "$REPO" worktree list --porcelain | awk '/^worktree /{print substr($0,10)}' | sort)

MERGED=()
NOOP=()
SKIPPED=()

for wt in "${WTS[@]}"; do
  name=$(basename "$wt")
  is_excluded "$name" && continue
  if ! sha=$(snapshot "$wt"); then
    SKIPPED+=("$name: HEAD illisible")
    continue
  fi
  git update-ref "refs/preview/$name" "$sha"
  label=$(git -C "$wt" branch --show-current)
  [ -n "$label" ] || label="detached"

  if git merge-base --is-ancestor "$sha" HEAD; then
    NOOP+=("$name [$label]")
    continue
  fi

  if git -c rerere.enabled=true -c rerere.autoupdate=true merge --no-ff --no-edit -q \
      -m "preview: $name ($label)" "$sha" >/dev/null 2>&1; then
    MERGED+=("$name [$label]")
    continue
  fi

  # A merge that stops can still be fully resolved by rerere: commit it.
  unresolved=$(git diff --name-only --diff-filter=U || true)
  if git rev-parse -q --verify MERGE_HEAD >/dev/null && [ -z "$unresolved" ]; then
    git commit -q --no-edit
    MERGED+=("$name [$label] (conflits rejoues par rerere)")
  else
    git merge --abort 2>/dev/null || true
    files=$(printf '%s' "$unresolved" | head -6 | tr '\n' ' ')
    SKIPPED+=("$name [$label]: conflits sur ${files:-fusion impossible}")
  fi
done

report() {
  echo
  echo "Base      : $BASE ($(git rev-parse --short "$BASE"))"
  echo "Integration: $(git rev-parse --short HEAD) dans $INTEG"
  echo "Fusionnes (${#MERGED[@]}):"
  [ "${#MERGED[@]}" -gt 0 ] && printf '  + %s\n' "${MERGED[@]}"
  echo "Deja inclus ou identiques a la base (${#NOOP[@]}):"
  [ "${#NOOP[@]}" -gt 0 ] && printf '  = %s\n' "${NOOP[@]}"
  echo "Ignores (${#SKIPPED[@]}):"
  [ "${#SKIPPED[@]}" -gt 0 ] && printf '  ! %s\n' "${SKIPPED[@]}"
  return 0
}

if [ "$DRY" = 1 ]; then
  echo "Mode --dry : aucun build, aucun redemarrage."
  report
  exit 0
fi

# --- dependencies and build ----------------------------------------------
cp -f "$REPO/.env.local" .env.local 2>/dev/null || true
[ -d node_modules ] || cp -cR "$REPO/node_modules" node_modules
if ! git diff --quiet "$BASE" HEAD -- package-lock.json; then
  echo "package-lock.json a change: npm ci"
  npm ci --no-audit --no-fund >/dev/null 2>&1
fi

echo "Build en cours (quelques minutes)..."
if ! npm run build > .preview-build.log 2>&1; then
  tail -40 .preview-build.log
  echo
  echo "BUILD ECHOUE. Le serveur actuel sur $PORT est conserve."
  report
  exit 1
fi

# --- restart only the listener on this port -----------------------------
old=$(lsof -tiTCP:"$PORT" -sTCP:LISTEN -n -P || true)
if [ -n "$old" ]; then
  kill $old
  for _ in $(seq 1 20); do
    lsof -tiTCP:"$PORT" -sTCP:LISTEN -n -P >/dev/null 2>&1 || break
    sleep 0.5
  done
fi

# New session so the server outlives this script and the caller's shell.
INTEG="$INTEG" PORT="$PORT" python3 - <<'PY'
import os, subprocess
log = open(os.path.join(os.environ["INTEG"], ".preview.log"), "ab")
subprocess.Popen(
    ["npx", "next", "start", "-p", os.environ["PORT"]],
    cwd=os.environ["INTEG"], stdout=log, stderr=subprocess.STDOUT,
    stdin=subprocess.DEVNULL, start_new_session=True,
)
PY

code=000
for _ in $(seq 1 30); do
  code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 3 "http://localhost:$PORT/fr" || true)
  [ "$code" = 200 ] && break
  sleep 1
done
report
echo
echo "http://localhost:$PORT  (HTTP $code)"
