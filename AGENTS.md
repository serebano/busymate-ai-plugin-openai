# Agent instructions

This repo is the OpenAI (ChatGPT/Codex) directory listing for Busymate AI. It owns the plugin manifest, assets, review package and the checks around them. It does not own the MCP server.

- Server changes (tools, descriptions, annotations, OAuth, `/.well-known/openai-apps-challenge`, privacy page, reviewer workspace) belong in the Busymate product source repo. Do not copy server code here.
- `review/tools.json` must match the live server exactly. Change the server first, then this file, then run `node scripts/scan-live.mjs`.
- OpenAI hint rules: `readOnlyHint` false for any state change, including log writes; `destructiveHint` false only for purely additive writes; `openWorldHint` false for the user's own bounded workspace. Every hint needs a justification.
- The MCP origin `https://busymate.ai` cannot change after approval. Paths can.
- Never commit secrets, tokens, reviewer credentials, `test_credentials` or `reviewer_instructions`. No `headers`, `clientSecret`, hooks or `.app.json` in the package.
- Every package change goes through full review again: bump `version` in `plugin.json` and add a `CHANGELOG.md` entry.
- Run `node scripts/validate.mjs` before every commit. Work on a branch and land through a PR.
