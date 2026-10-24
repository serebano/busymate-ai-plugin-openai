# Test matrix

Run every case with the reviewer account against the production server before submitting. Every cell must be **pass**. Record the date and plugin version.

Version: 1.1.0 (MCP URL `https://busymate.ai/mcp`) · Run date: 2026-10-24 (ChatGPT web and Codex CLI, reviewer account). iOS, Android and the Codex app: not run yet.

| Case | ChatGPT web | ChatGPT iOS | ChatGPT Android | Codex |
|---|---|---|---|---|
| Connect and sign in (OAuth) | pass |  |  | pass (bearer token, not the Codex OAuth flow) |
| P1 Workspaces with open handoffs | pass |  |  | pass |
| P2 Summarize open handoffs | pass |  |  |  |
| P3 Reply to the warranty request and resolve (asks for confirmation) | pass |  |  |  |
| P4 Answer from workspace knowledge | pass |  |  |  |
| P5 Add an internal note and get the install snippet | pass |  |  |  |
| N1 Plan change: no tool call, points to the Console | pass |  |  |  |
| N2 Bulk deletion: no tool call, explains it is not available | partial: no tool call, but asked a clarifying question; server fix pending |  |  |  |
| N3 Workspace outside the account: no data shown | pass |  |  |  |
| Skill: inbox-triage | | | | |
| Skill: knowledge-answers | | | | |

The prompts and expected behaviour are in `plugin.json` under `extensions["com.openai"].review.test_cases`.
