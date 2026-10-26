# Test matrix

Run every case with the reviewer account against the production server before submitting. Every cell must be **pass**. Record the date and plugin version.

Version: 1.1.0 (MCP URL `https://busymate.ai/mcp`) · Run date: 2026-10-24 (ChatGPT web and Codex CLI, reviewer account). iOS, Android and the Codex app: not run yet. From 2026-10-26 the ChatGPT web runs use **Enforce CSP for custom apps** (Settings → Security and login → App security), so widgets render under the declared CSP as in production; without it, developer mode labels every custom-app widget "CSP off".

| Case | ChatGPT web | ChatGPT iOS | ChatGPT Android | Codex |
|---|---|---|---|---|
| Connect and sign in (OAuth) | pass |  |  | pass (bearer token, not the Codex OAuth flow) |
| P1 Workspaces with open handoffs | pass |  |  | pass |
| P2 Summarize open handoffs | pass |  |  |  |
| P3 Reply to the warranty request and resolve (asks for confirmation) | pass |  |  |  |
| P4 Answer from workspace knowledge | pass |  |  |  |
| P5 Add an internal note and get the install snippet | pass |  |  |  |
| N1 Plan change: no tool call, points to the Console | pass |  |  |  |
| N2 Workspace deletion: no change made, explains it is not available | pass (2026-10-26) |  |  |  |
| N3 Workspace outside the account: no data shown | pass |  |  |  |
| Skill: inbox-triage | | | | |
| Skill: knowledge-answers | | | | |

The prompts and expected behaviour are in `plugin.json` under `extensions["com.openai"].review.test_cases`.
