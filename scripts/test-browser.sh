#!/bin/bash
# Testseite (de und en) mit Chrome im Hintergrund laden, ❌-Zeilen ausgeben; Exit 1 bei Fehlern. Nur macOS (Pfad zu Google Chrome).
# Aufruf aus dem Projektordner: scripts/test-browser.sh
R="$(cd "$(dirname "$0")/.." && pwd)"; CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"; T="${TMPDIR:-/tmp}/rm-chrome-test"; fail=0
for q in "" "?lang=en"; do
 out=$("$CH" --headless=new --disable-gpu --no-first-run --user-data-dir="$T" --virtual-time-budget=30000 --dump-dom "file://$R/tests/index.html$q" 2>/dev/null | sed -n '/<pre id="out"/,/<\/pre>/p')
 ok=$(echo "$out" | grep -c "✅"); bad=$(echo "$out" | grep "❌")
 echo "lang${q:-=de}: $ok ok"; [ -n "$bad" ] && { echo "$bad" | cut -c1-400; fail=1; }
 [ "$ok" -lt 10 ] && { echo "Testseite lief nicht"; exit 1; }
done
node "$R/scripts/i18n-check.js" >/dev/null || { node "$R/scripts/i18n-check.js" | tail -5; exit 1; }
echo "i18n ok"; exit $fail
