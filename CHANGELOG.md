# Changelog

## 1.1.1 (unreleased)

Remediation of the 1.0.0 review ("Your plugin returns user-related data not disclosed in your privacy policy. Remove unnecessary fields or clearly disclose each category, including nested and debug data."):

- The server offers a ChatGPT client only the 14 app tools, and each returns only the fields on its allowlist (busymate-ai-src#3207). `review/tools.json` lists those 14 tools with `dataReturned` (categories and exact field paths).
- The apps privacy policy has a new section, "Data returned by the ChatGPT and Claude apps", generated from the same allowlists: each category with what it holds, purpose, the tools that return it, source and retention.
- Removed from results: team members' phone numbers and user ids, notification delivery records, customer location fields, assignment evidence, internal session and run ids, billing plan, workspace settings, knowledge memory ids, search ids, raw transcript documents and event views. Error text no longer carries emails, phone numbers, IP addresses or ids.
- Server URL is `https://busymate.ai/mcp/openai` again: on that path every connection (ChatGPT and Codex) gets the app's 14 tools and allowlisted fields. `https://busymate.ai/mcp` stays the general server for other clients.
- `review/remediation-1.1.1.md`: the reply to the reviewer, category by category.
- Listing long description states what the tools do and their limits, without promises the plugin cannot keep (platform metadata check: "Remove or revise promises and guarantees").

## 1.1.0 (unreleased)

- Server URL is `https://busymate.ai/mcp`, the one Busymate AI server for every AI assistant. `https://busymate.ai/mcp/openai` remains a permanent alias.
- Listing name, taglines and descriptions use the official copy from busymate.ai/connectors/chatgpt.
- `review/tools.json` lists the tools a signed-in workspace admin gets from ChatGPT or Codex (282). It is generated from the live server by `scripts/gen-tools.mjs`. Plans, prices, checkout, billing and tools that take or return credentials are not offered to ChatGPT.
- Negative case N2 asks to delete the workspace instead of bulk-deleting conversations. With the 282-tool profile, `delete_tenant_conversation` can delete conversations one at a time, so bulk deletion is no longer out of scope; workspace deletion is.
- New review demo video for 1.1.0 (release `review-demo-1.1.0`): ChatGPT web OAuth connect, P1–P5 and N1–N3, and Codex OAuth connect with P1–P5.

## 1.0.0 (unreleased)

- v1 scope is 14 tools: the email tools return in a later version once the reviewer workspace has a mailbox.
- Publisher is EFIRITY PTE. LTD.; privacy, terms and support point at busymate.ai/apps/.
- Surfaces: ChatGPT and Codex. Added the inbox-triage and knowledge-answers skills, Codex manifest checks and the test matrix.
- Email replies use `send_email_reply`.
- Initial package draft: manifest, MCP config, v1 tool profile with annotation justifications, review test cases.
