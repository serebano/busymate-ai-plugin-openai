#!/usr/bin/env bash
# Builds the submission ZIP from an explicit allowlist of files, after validation.
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
node "$ROOT/scripts/validate.mjs"
VERSION="$(node -p "require('$ROOT/plugin.json').version")"
OUT="$ROOT/dist/busymate-ai-openai-plugin-$VERSION.zip"
mkdir -p "$ROOT/dist"
rm -f "$OUT"
(cd "$ROOT" && zip -q -X -r "$OUT" plugin.json mcp.json assets/logo.png assets/composer-icon.png skills LICENSE -x "*.DS_Store")
echo "package: $OUT"
