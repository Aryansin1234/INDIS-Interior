#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────
#  deploy.sh — Build & deploy INDIS Interiors to GitHub Pages
#
#  Usage:
#    chmod +x deploy.sh          # first time only
#    ./deploy.sh                 # deploy with auto-detected repo name
#    ./deploy.sh my-repo-name    # pass repo name explicitly
#    ./deploy.sh ""              # deploy as user page (no basePath)
# ─────────────────────────────────────────────────────────────

set -euo pipefail

BOLD="\033[1m"
GREEN="\033[0;32m"
CYAN="\033[0;36m"
YELLOW="\033[0;33m"
RED="\033[0;31m"
RESET="\033[0m"

log()  { echo -e "${CYAN}▸ $*${RESET}"; }
ok()   { echo -e "${GREEN}✓ $*${RESET}"; }
warn() { echo -e "${YELLOW}⚠ $*${RESET}"; }
die()  { echo -e "${RED}✗ $*${RESET}"; exit 1; }

echo ""
echo -e "${BOLD}  INDIS Interiors — GitHub Pages Deploy${RESET}"
echo "  ────────────────────────────────────────"
echo ""

# ── 1. Resolve repo name ──────────────────────────────────────
if [[ "${1-UNSET}" != "UNSET" ]]; then
  REPO_NAME="$1"
  log "Using provided repo name: '${REPO_NAME}'"
else
  REMOTE_URL=$(git remote get-url origin 2>/dev/null || echo "")
  if [[ -z "$REMOTE_URL" ]]; then
    warn "No git remote found. Deploying without basePath (user page mode)."
    REPO_NAME=""
  else
    # Extract repo name from SSH or HTTPS URL
    REPO_NAME=$(basename -s .git "$REMOTE_URL")
    log "Auto-detected repo name: '${REPO_NAME}'"
  fi
fi

# ── 2. Confirm ────────────────────────────────────────────────
if [[ -n "$REPO_NAME" ]]; then
  echo -e "  basePath will be: ${BOLD}/${REPO_NAME}${RESET}"
  echo -e "  Site URL:         ${BOLD}https://<user>.github.io/${REPO_NAME}/${RESET}"
else
  echo -e "  basePath will be: ${BOLD}(none — user page)${RESET}"
fi
echo ""
read -r -p "  Proceed? [y/N] " confirm
[[ "$confirm" =~ ^[Yy]$ ]] || { echo "Cancelled."; exit 0; }
echo ""

# ── 3. Install deps if needed ────────────────────────────────
if [[ ! -d node_modules ]]; then
  log "Installing dependencies..."
  npm install
fi

if ! npx --yes gh-pages --version &>/dev/null; then
  log "Installing gh-pages..."
  npm install --save-dev gh-pages
fi

# ── 4. Build ─────────────────────────────────────────────────
log "Building static export..."
GITHUB_PAGES=true REPO_NAME="$REPO_NAME" npm run build
ok "Build complete → out/"

# ── 5. Add .nojekyll (required for GitHub Pages) ─────────────
touch out/.nojekyll
ok "Added .nojekyll"

# ── 6. Deploy to gh-pages branch ─────────────────────────────
log "Deploying to gh-pages branch..."

DEPLOY_MSG="Deploy: $(date '+%Y-%m-%d %H:%M:%S') — $(git log -1 --pretty=format:'%s' 2>/dev/null || echo 'manual deploy')"

npx gh-pages \
  --dist out \
  --dotfiles \
  --message "$DEPLOY_MSG"

echo ""
ok "Deployed!"
echo ""
if [[ -n "$REPO_NAME" ]]; then
  echo -e "  ${BOLD}View your site:${RESET}"
  GITHUB_USER=$(git remote get-url origin 2>/dev/null | sed -E 's|.*[:/]([^/]+)/.*|\1|' || echo "<user>")
  echo -e "  → https://${GITHUB_USER}.github.io/${REPO_NAME}/"
else
  echo -e "  → Check your GitHub Pages settings for the URL."
fi
echo ""
echo -e "  ${YELLOW}Note:${RESET} GitHub Pages may take 1-2 minutes to update."
echo ""
