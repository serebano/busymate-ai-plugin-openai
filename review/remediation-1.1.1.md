# Busymate AI 1.1.1: response to the 1.0.0 review

Review finding (1.0.0): "Your plugin returns user-related data not disclosed in your privacy policy. Remove unnecessary fields or clearly disclose each category, including nested and debug data."

We did both: removed every field the task does not need, and disclosed each remaining category.

## What changed

1. **Fewer tools.** A ChatGPT connection is offered only the 14 tools of this plugin. Any other tool of the Busymate AI server is not listed and is refused if called.
2. **A fixed list of fields per tool.** Each of the 14 tools returns only the fields on its allowlist. Everything else is removed on our server before the result is sent, including nested objects and debugging data. `review/tools.json` lists each tool's categories and exact field paths (`dataReturned`).
3. **Disclosure.** The privacy policy at https://busymate.ai/apps/privacy has a new section, "Data returned by the ChatGPT and Claude apps". For each category it lists what the category holds, its purpose, the tools that return it, its source and its retention. That section is generated from the same allowlists, and a test fails if the two ever differ.

## Removed, by category

- **Team members' contact data.** Phone numbers and user IDs of the workspace's operators (the operator roster in the handoff list) and the user IDs of message senders and assignees.
- **Delivery and debug records.** Notification delivery records, delivery evidence, deduplication keys, notification IDs, assignment-decision evidence, raw conversation event views and raw transcript documents.
- **Customer location and device data.** Customer city, country and platform fields on handoff requests.
- **Internal identifiers.** Support session IDs, agent run IDs, knowledge memory IDs, search IDs and translation records. The IDs that remain are only the workspace, conversation and handoff-request IDs that the next tool call needs.
- **Account and configuration data.** The workspace's billing plan, settings, branding, feature flags and limits, and knowledge-source configuration and credential hints.
- **Error text.** Error and refusal messages no longer carry email addresses, phone numbers, IP addresses or IDs.

## What remains, and is disclosed

| Category | Returned by |
|---|---|
| Record identifiers (workspace, conversation and handoff-request IDs, Console links) | list_tenants, get_tenant, list_tenant_conversations, get_tenant_conversation_transcript, list_tenant_interventions, get_tenant_intervention, get_install_snippet |
| Workspace details (name, slug, status, web addresses, member count, your role) | list_tenants, get_tenant, list_tenant_conversations |
| Inbox counts (numbers only) | get_tenant_inbox_counts |
| Conversation records (channel, start and last-active time, live, test) | list_tenant_conversations |
| Conversation content (author role, text, time; credential-like values masked) | get_tenant_conversation_transcript |
| Handoff requests (number, title, summary, status, priority, channel, language, times, messages, notes) | list_tenant_interventions, get_tenant_intervention |
| Knowledge content (search results with answer and source; knowledge-source status) | list_tenant_knowledge_sources, search_knowledge |
| Install snippet | get_install_snippet |
| Action results (success and new status of an approved change) | reply_tenant_intervention, resolve_tenant_intervention, add_tenant_intervention_note, add_tenant_knowledge_source |
| Status and error messages | all 14 tools |

## How to check

Connect with the reviewer account (workspace "Demo Bakery") and run the test cases in `plugin.json`. Every result contains only the fields in `review/tools.json` → `dataReturned.fields`.
