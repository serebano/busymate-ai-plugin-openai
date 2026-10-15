# Changelog

## 1.1.0

- One server for every AI assistant: the package connects to `https://busymate.ai/mcp`. Connections on `https://busymate.ai/mcp/openai` keep working; that address is the same server.
- `review/tools.json` is the server's full list for a workspace admin (359 tools), generated from the server: every tool carries readOnlyHint, destructiveHint and openWorldHint with a justification, and per-tool securitySchemes (15 public tools work before sign-in). Every tool that changes data is destructive, so ChatGPT and Codex ask before it runs.
- A package change: this version goes through full review.

## 1.0.0 (unreleased)

- v1 scope is 14 tools: the email tools return in a later version once the reviewer workspace has a mailbox.
- Publisher is EFIRITY PTE. LTD.; privacy, terms and support point at busymate.ai/apps/.
- Surfaces: ChatGPT and Codex. Added the inbox-triage and knowledge-answers skills, Codex manifest checks and the test matrix.
- Email replies use `send_email_reply`.
- Initial package draft: manifest, MCP config, v1 tool profile with annotation justifications, review test cases.
