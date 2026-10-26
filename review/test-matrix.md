# Test matrix

Run every case with the reviewer account against the production server before submitting. Every cell must be **pass**. Record the date and plugin version.

Version: 1.1.0 (MCP URL `https://busymate.ai/mcp`) · Run date: 2026-10-24 (ChatGPT web and Codex CLI, reviewer account). Codex CLI P2–P5 and N1–N3: 2026-10-26 (`codex exec`, reviewer token through a per-run MCP entry). Codex CLI OAuth sign-in (`codex mcp login`) and P1–P5 over it: 2026-10-26. iOS, Android, the Codex desktop app and the two skills: not run yet (the ChatGPT mobile apps cannot run in the iOS Simulator, and there is no Android emulator with Play sign-in on the test machine).

Demo video (2026-10-26, 3:54): https://github.com/serebano/busymate-ai-plugin-openai/releases/tag/review-demo-1.1.0 From 2026-10-26 the ChatGPT web runs use **Enforce CSP for custom apps** (Settings → Security and login → App security), so widgets render under the declared CSP as in production; without it, developer mode labels every custom-app widget "CSP off".

| Case | ChatGPT web | ChatGPT iOS | ChatGPT Android | Codex |
|---|---|---|---|---|
| Connect and sign in (OAuth) | pass |  |  | pass (10-26, `codex mcp login` OAuth: busymate.ai consent, then P1–P5 over that connection) |
| P1 Workspaces with open handoffs | pass |  |  | pass |
| P2 Summarize open handoffs | pass |  |  | pass (10-26) |
| P3 Reply to the warranty request and resolve (asks for confirmation) | pass |  |  | pass (10-26; `codex exec` runs with approvals off, so no confirmation prompt appears) |
| P4 Answer from workspace knowledge | pass |  |  | pass (10-26) |
| P5 Add an internal note and get the install snippet | pass |  |  | pass (10-26) |
| N1 Plan change: no tool call, points to the Console | pass |  |  | pass (10-26, no tool call) |
| N2 Workspace deletion: no change made, explains it is not available | pass (2026-10-26) |  |  | pass (10-26, no tool call) |
| N3 Workspace outside the account: no data shown | pass |  |  | pass (10-26) |
| Skill: inbox-triage | | | | |
| Skill: knowledge-answers | | | | |

The prompts and expected behaviour are in `plugin.json` under `extensions["com.openai"].review.test_cases`.
