# Busymate AI plugin for ChatGPT

The OpenAI plugin package for [Busymate AI](https://busymate.ai). It lists Busymate in OpenAI's plugin directory on **ChatGPT and Codex**, connected to the Busymate MCP server, with two skills (inbox triage, knowledge answers).

**Status: draft, not submitted.** The server profile at `https://busymate.ai/mcp/openai` does not exist yet; `node scripts/scan-live.mjs` lists what is missing. See [docs/submission-checklist.md](docs/submission-checklist.md).

## What is in this repo

| Path | Purpose |
|---|---|
| `plugin.json` | Agent Plugins manifest: listing fields under `extensions["com.openai"].interface`, review test cases, publication settings |
| `mcp.json` | The one MCP server: `streamable-http`, OAuth with dynamic client registration, no headers or secrets |
| `assets/` | Square logo and composer icon (both required for Codex) |
| `skills/` | Workflow skills for ChatGPT and Codex; same content as the Claude plugin's skills |
| `review/test-matrix.md` | Every test case on every surface, filled in before submission |
| `review/tools.json` | Declared v1 tool profile: the three hints per tool and the justification for each, pasted into the portal |
| `scripts/validate.mjs` | Offline checks that mirror the portal's submission errors |
| `scripts/scan-live.mjs` | Compares the live `tools/list` with `review/tools.json`; fails closed |
| `scripts/package.sh` | Builds the submission ZIP from an allowlist of files |
| `docs/submission-checklist.md` | Requirements and the steps from draft to published |

## What is not in this repo

The MCP server, its tool definitions, OAuth, the domain-verification route, the privacy policy and the reviewer workspace all live in the Busymate product source. Change tools there; this repo only declares what the listing expects and checks the two agree.

Never commit reviewer credentials, tokens or client secrets. Reviewer access goes into the OpenAI portal form only.

## Commands

```sh
node scripts/validate.mjs                     # offline package checks
BUSYMATE_MCP_TOKEN=... node scripts/scan-live.mjs   # live profile vs declared tools
scripts/package.sh                            # dist/busymate-ai-openai-plugin-<version>.zip
```

## Sibling repos

One repo per directory: `busymate-ai-plugin-openai` (this one), `busymate-ai-plugin-anthropic`, and later ones follow the same `busymate-ai-plugin-<vendor>` pattern.
