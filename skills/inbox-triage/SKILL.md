---
name: inbox-triage
description: Work through a Busymate AI workspace's open handoff requests, where the assistant asked for a person. Use when the user asks what needs attention, wants to clear their support queue, or asks to reply to customers in Busymate.
---

# Inbox triage

1. Find the workspace. If the user has more than one, list them with `list_tenants` and the open counts from `get_tenant_inbox_counts`, then ask which one to work on.
2. Gather the queue with `list_tenant_interventions`: the open handoff requests.
3. Present a short list, oldest first: customer first name, topic, how long they have waited. Do not show internal IDs.
4. For each item the user picks, read the full context with `get_tenant_intervention`, and the whole conversation with `get_tenant_conversation_transcript` when the request alone is not enough.
5. Draft the reply in the business's voice, using `search_knowledge` for facts such as policies, prices or delivery times. Never invent a policy; if the knowledge does not cover it, say so and ask the user.
6. Show the draft and wait for the user's approval. Then send it with `reply_tenant_intervention`. A sent reply cannot be recalled.
7. Resolve the handoff with `resolve_tenant_intervention` only when the user confirms the customer's question is settled. Use `add_tenant_intervention_note` for internal context the team should see; customers never see notes.
8. Finish with a summary: what was answered, what is still open, and anything the knowledge base could not answer.
