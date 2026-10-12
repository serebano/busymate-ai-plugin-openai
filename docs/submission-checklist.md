# OpenAI plugin submission checklist

Checked against OpenAI's developer docs on 2026-10-12. OpenAI now calls ChatGPT apps **plugins**. The docs carry no "last updated" dates, so recheck the linked pages before each submission.

Sources:
- [Plugin guidelines](https://developers.openai.com/plugins/plugin-guidelines)
- [Submission](https://developers.openai.com/plugins/deploy/submission)
- [App review](https://developers.openai.com/plugins/deploy/app-review)
- [Submission errors](https://developers.openai.com/plugins/deploy/submission-errors)
- [Auth](https://developers.openai.com/apps-sdk/build/auth)
- [MCP server](https://developers.openai.com/apps-sdk/build/mcp-server)
- [Reference](https://developers.openai.com/apps-sdk/reference)
- [Build plugins](https://developers.openai.com/plugins/build/plugins)

`H` = hard requirement (rejection or submission error). `S` = quality expectation.

## Account and identity

- [ ] H Verified developer identity on the OpenAI platform. The portal shows the verified name as `developerName`, whatever the ZIP says. To show "Busymate AI", verify the business.
- [ ] H Global data-residency project. EU-residency projects cannot submit MCP plugins.
- [ ] H The submitter is an org owner or has the Apps Management Write role.
- [ ] H Website, support, privacy and terms URLs all identify the same publisher as the verified identity.

## Server (in the Busymate product repo)

- [ ] H Streamable HTTP at a public HTTPS URL. The origin is permanent once approved; only the path can change.
- [ ] H OAuth 2.1 with PKCE `S256`, protected-resource metadata (RFC 9728), and authorization-server metadata whose `issuer` matches `authorization_servers`.
- [ ] H Tokens are bound to the resource (`aud` or `resource` claim) and verified on every request. Failures return 401 with `WWW-Authenticate: Bearer resource_metadata=…`.
- [ ] H The redirect `https://chatgpt.com/connector_platform_oauth_redirect` is accepted. DCR clients stay valid for the life of the connection.
- [ ] H `/.well-known/openai-apps-challenge` serves the exact token as `text/plain`.
- [ ] H One focused purpose. `tools/list` returns only tools the reviewer can call. No admin, billing, checkout or credential-collecting tools.
- [ ] H Every tool has explicit boolean `readOnlyHint`, `destructiveHint` and `openWorldHint` values that match its real behaviour. Each hint has a justification in the portal (`justification_required`).
- [ ] H Descriptions are accurate and complete. They contain no instructions to the model about other tools or products, no promotion, and no internal references. Server `instructions` are scanned too.
- [ ] H Inputs collect only what the task needs: no passwords, tokens or opaque IDs the user cannot know.
- [ ] H Outputs carry only relevant data: no trace or session IDs or internal timestamps. Every tool that returns `structuredContent` declares an `outputSchema`.
- [ ] H Errors come back as clear tool results (`isError`), not transport errors.
- [ ] S Per-tool `securitySchemes`, and `_meta["mcp/www_authenticate"]` on auth-error results, so ChatGPT can offer sign-in.
- [ ] S OIDC `openid` + `email` scopes and a UserInfo endpoint returning `email_verified: true`. Business and Enterprise workspaces with domain restrictions need this.
- [ ] S Rate limits and timeouts on expensive tools. No tokens or sensitive results in logs.
- [ ] H If UI ships: `_meta.ui.domain` is unique to this plugin, CSP lists every fetched domain, and nested frames are justified. v1 ships without UI.

## Privacy and policy

- [ ] H The privacy policy covers data shared with ChatGPT through tool results, metadata such as IP and user agent, retention and revocation.
- [ ] H No sale of digital goods or subscriptions inside the plugin. Plan changes stay in the Busymate Console.
- [ ] H Not a demo or trial plugin. No comparisons or unverifiable claims in the listing.

## Package (this repo)

- [ ] H `node scripts/validate.mjs` passes.
- [ ] H `displayName` and `shortDescription` are 30 characters or fewer; `longDescription` is 4000 or fewer; the category is from the allowed list.
- [ ] H The name does not append "MCP", "Plugin" or "App".
- [ ] H The square `logo` and `composerIcon` are under `./assets/`.
- [ ] H There are exactly 5 positive and 3 negative test cases. Each is run with the reviewer account on every selected surface: ChatGPT web, iOS and Android, plus Codex if selected.
- [ ] H The demo video covers the OAuth connect flow and every test case on every selected surface.
- [ ] H The package contains no credentials, `headers`, `clientSecret`, hooks or `.app.json`.
- [ ] H `publication.countries` lists only countries where the plugin is intended to be public. `[]` means unrestricted.

## Reviewer account (portal form only)

- [ ] H A fully featured workspace with sample data. The account is a workspace owner, uses password login, has no MFA, email code or magic link, needs no sign-up step, and never expires.
- [ ] H Outbound replies and email from the demo workspace go to a sink, never to real people.
- [ ] S The demo workspace is reseeded nightly and stays available for rescans and re-reviews.

## Submission steps

1. Deploy the server profile and confirm `scan-live.mjs` is green with the reviewer token.
2. In the OpenAI platform dashboard, create the plugin and complete domain verification.
3. Run **Scan Tools**. Paste each justification from `review/tools.json`.
4. Upload the ZIP from `scripts/package.sh`. Enter reviewer credentials and instructions in the form.
5. Complete the policy attestations and submit. Only one review can be active at a time; feedback arrives by email.
6. After approval, publish when ready. Server changes to tools, `_meta`, CSP or instructions go through continuous review after a rescan. Package changes need a new version and full review.
