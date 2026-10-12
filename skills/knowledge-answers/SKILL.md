---
name: knowledge-answers
description: Answer questions from a Busymate AI workspace's knowledge base with sources, and find gaps worth adding. Use when the user asks what their knowledge base, help content or website says about a topic.
---

# Knowledge answers

1. Search with `search_knowledge` using the user's words, then one or two rephrasings if the first search is thin.
2. Answer only from what the results say. Quote the key sentence and name each source.
3. If sources disagree, show both and say which looks newer.
4. If nothing covers the question, say so plainly. Offer to add a public page that does cover it with `add_tenant_knowledge_source`; Busymate fetches and indexes that page. Only add a page after the user approves the exact URL.
5. To see what the assistant can draw on, list the current sources with `list_tenant_knowledge_sources`.
