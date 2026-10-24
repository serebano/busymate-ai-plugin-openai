# Changelog

## 1.1.0 (unreleased)

- Server URL is `https://busymate.ai/mcp`, the one Busymate AI server for every AI assistant. `https://busymate.ai/mcp/openai` remains a permanent alias.
- Listing name, taglines and descriptions use the official copy from busymate.ai/connectors/chatgpt.
- `review/tools.json` lists the tools a signed-in workspace admin gets from ChatGPT or Codex (282). It is generated from the live server by `scripts/gen-tools.mjs`. Plans, prices, checkout, billing and tools that take or return credentials are not offered to ChatGPT.

## 1.0.0 (unreleased)

- v1 scope is 14 tools: the email tools return in a later version once the reviewer workspace has a mailbox.
- Publisher is EFIRITY PTE. LTD.; privacy, terms and support point at busymate.ai/apps/.
- Surfaces: ChatGPT and Codex. Added the inbox-triage and knowledge-answers skills, Codex manifest checks and the test matrix.
- Email replies use `send_email_reply`.
- Initial package draft: manifest, MCP config, v1 tool profile with annotation justifications, review test cases.
