# Test matrix

Run every case with the reviewer account against the production server before submitting. Every cell must be **pass**. Record the date and plugin version.

Version: 1.0.0 · Run date: _not run_

| Case | ChatGPT web | ChatGPT iOS | ChatGPT Android | Codex |
|---|---|---|---|---|
| Connect and sign in (OAuth) | | | | |
| P1 Workspaces with open handoffs | | | | |
| P2 Summarize open handoffs | | | | |
| P3 Reply to the warranty request and resolve (asks for confirmation) | | | | |
| P4 Answer from workspace knowledge | | | | |
| P5 Add an internal note and get the install snippet | | | | |
| N1 Plan change: no tool call, points to the Console | | | | |
| N2 Bulk deletion: no tool call, explains it is not available | | | | |
| N3 Workspace outside the account: no data shown | | | | |
| Skill: inbox-triage | | | | |
| Skill: knowledge-answers | | | | |

The prompts and expected behaviour are in `plugin.json` under `extensions["com.openai"].review.test_cases`.
