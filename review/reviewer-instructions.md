Busymate AI — reviewer access

1. Connect the Busymate AI plugin from the plugin directory (ChatGPT or Codex). If asked for a server URL, use https://busymate.ai/mcp/openai.
2. When asked to sign in, you land on https://busymate.ai/login. Enter the reviewer email and password provided in this submission. It is email and password only: no MFA, no email code, no sign-up. Then approve the consent screen.
3. The account owns the workspace "Demo Bakery", a fictional bakery that also sells baking equipment. All customers, addresses and orders in it are invented.
4. Things to try:
   - "Which of my workspaces have open handoff requests?" (list_tenants, get_tenant_inbox_counts)
   - "Show recent customer conversations and open one transcript" (list_tenant_conversations, get_tenant_conversation_transcript)
   - "List the open handoff requests in Demo Bakery." Five customers asked for a person, including a warranty claim for a replacement DB-500 dough hook (list_tenant_interventions, get_tenant_intervention)
   - "Reply to the dough hook warranty request saying a replacement ships on Monday", then "add an internal note", then "resolve it" (reply_tenant_intervention, add_tenant_intervention_note, resolve_tenant_intervention). Replies appear only in the customer's website chat; nothing is emailed or texted to anyone.
   - "What is the returns policy?" and "How long does delivery take?" (search_knowledge, list_tenant_knowledge_sources). "Add https://example.com as a knowledge source" (add_tenant_knowledge_source)
   - "Give me the install snippet for the chat widget" (get_install_snippet)
5. To create a fresh handoff, chat as a customer at https://demo-bakery.busymate.ai/ and ask for a human. The request appears in the tools above within seconds.
6. The workspace is safe to change. If it looks different from this description, another review session may have resolved items; create new ones as in step 5.
