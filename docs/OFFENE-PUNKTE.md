# Offene Punkte

Die offenen Punkte stehen als GitHub Issues: https://github.com/ttrabold/Rittermanager/issues

Labels: `zufallsbeute`, `i18n`, `balance`, `idee`, dazu `bug`, `enhancement`, `documentation`.

- Übersicht: `gh issue list`
- Neuen Punkt anlegen: `gh issue create --title "…" --label balance`
- Erledigt: Issue schließen (im Commit mit `Fixes #N`)

## Hinweise zum Arbeiten

- Größere Änderungen erst ins Test-Repo: `git push test <branch>:main`, Vorschau unter https://ttrabold.github.io/Rittermanager-test/.
- Tests: `tests/index.html` im Browser öffnen. Balance: `tests/sim.js` auf der Testseite laden und `simRun(400)` aufrufen.
- Nach Änderungen die Version erhöhen (Semantic Versioning, `?v=X.Y.Z` in `index.html` und `CACHE` in `sw.js`, siehe AGENTS.md).
