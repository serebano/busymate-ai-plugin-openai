#!/usr/bin/env node
// Static checks for the OpenAI plugin package, mirroring the portal's
// submission errors we can test offline. Exits non-zero on any violation.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const fail = (msg) => errors.push(msg);
const read = (rel) => JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'));

const CATEGORIES = [
  'Productivity', 'Creativity', 'Developer Tools', 'Business & Operations', 'Data & Analytics',
  'Communication', 'Education & Research', 'Security', 'Finance', 'Healthcare', 'Travel',
  'Entertainment', 'Other',
];

const plugin = read('plugin.json');
const mcp = read('mcp.json');
const tools = read('review/tools.json');

if (plugin.$schema !== 'https://agent-plugins.org/schemas/1.0.0/plugin.schema.json') fail('plugin.json: wrong $schema');
if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(plugin.name ?? '')) fail('plugin.json: name must be kebab-case');
if (/\b(mcp|plugin|app)\b/i.test(plugin.extensions?.['com.openai']?.interface?.displayName ?? '')) fail('displayName must not append MCP/Plugin/App');

const oa = plugin.extensions?.['com.openai'] ?? {};
const ui = oa.interface ?? {};
const maxLen = (field, n) => {
  const v = ui[field];
  if (typeof v !== 'string' || !v.trim()) return fail(`interface.${field}: required`);
  if (v.length > n) fail(`interface.${field}: ${v.length} > ${n} characters`);
};
maxLen('displayName', 30);
maxLen('shortDescription', 30);
maxLen('longDescription', 4000);
maxLen('developerName', 80);
if (/\n/.test(ui.displayName ?? '') || /\n/.test(ui.shortDescription ?? '')) fail('displayName/shortDescription must be one line');
if (!CATEGORIES.includes(ui.category)) fail(`interface.category: "${ui.category}" is not an allowed category`);

for (const f of ['websiteURL', 'supportURL', 'privacyPolicyURL', 'termsOfServiceURL']) {
  const v = ui[f];
  if (typeof v !== 'string' || !v.startsWith('https://') || v.length > 1024 || /@/.test(new URL(v).host)) fail(`interface.${f}: must be an HTTPS URL without credentials`);
}

const caps = ui.capabilities ?? [];
if (!Array.isArray(caps) || caps.length === 0 || caps.length > 20) fail('interface.capabilities: 1-20 entries required (Codex)');
caps.forEach((c) => c.length > 120 && fail(`capability over 120 chars: ${c}`));

const prompts = ui.defaultPrompt ?? [];
if (prompts.length > 3) fail('interface.defaultPrompt: at most 3');
if (new Set(prompts).size !== prompts.length) fail('interface.defaultPrompt: must be unique');
prompts.forEach((p) => {
  if (p.length > 128) fail(`defaultPrompt over 128 chars: ${p}`);
  if (/@\w/.test(p)) fail(`defaultPrompt must not @mention: ${p}`);
});

for (const f of ['logo', 'composerIcon', 'logoDark', 'composerIconDark']) {
  const v = ui[f];
  if (v === undefined) { if (f === 'logo' || f === 'composerIcon') fail(`interface.${f}: required`); continue; }
  if (!v.startsWith('./')) fail(`interface.${f}: path must start with ./`);
  const abs = path.join(ROOT, v);
  if (!fs.existsSync(abs)) { fail(`interface.${f}: ${v} missing`); continue; }
  const buf = fs.readFileSync(abs);
  if (buf.length > 5 * 1024 * 1024) fail(`${v}: over 5 MiB`);
  if (buf.subarray(1, 4).toString() === 'PNG') {
    const w = buf.readUInt32BE(16), h = buf.readUInt32BE(20);
    if (w !== h) fail(`${v}: must be square (${w}x${h})`);
    if (w < 48 || w > 4096) fail(`${v}: side must be 48-4096 px (${w})`);
  } else if (!v.endsWith('.svg')) fail(`${v}: expected PNG`);
}

const tc = oa.review?.test_cases ?? {};
if ((tc.positive ?? []).length !== 5) fail('review.test_cases.positive: exactly 5 required');
if ((tc.negative ?? []).length !== 3) fail('review.test_cases.negative: exactly 3 required');
(tc.positive ?? []).forEach((c, i) => ['description', 'prompt', 'tools_triggered', 'expected_behavior'].forEach((k) => !c[k] && fail(`positive[${i}].${k}: required`)));
if (!oa.review?.demo_recording_url?.startsWith('https://')) fail('review.demo_recording_url: HTTPS URL required');
if (!oa.publication?.release_notes) fail('publication.release_notes: required');
for (const k of ['test_credentials', 'reviewer_instructions']) if (k in (oa.review ?? {})) fail(`review.${k}: never put this in the package; use the portal form`);
if (oa.apps || oa.hooks) fail('extensions.com.openai: apps/hooks are not allowed in a submission package');

// Codex is a selected surface, so the fields the Codex format requires are mandatory.
if (!/^\d+\.\d+\.\d+$/.test(plugin.version ?? '')) fail('version: explicit semver required (Codex)');
if (!plugin.description?.trim() || plugin.description.length > 4000) fail('description: required, at most 4000 characters (Codex)');
if (!plugin.author?.name?.trim() || plugin.author.name.length > 120) fail('author.name: required, at most 120 characters (Codex)');
if (plugin.author?.url && !plugin.author.url.startsWith('https://')) fail('author.url: must be HTTPS');

// The listed tools must exist in the declared profile.
const declared = new Set(tools.tools.map((t) => t.name));

// Skills: immediate children of skills/, front matter with name = folder and a
// string description, and only tools from the declared profile.
const skillsDir = path.join(ROOT, 'skills');
for (const s of fs.existsSync(skillsDir) ? fs.readdirSync(skillsDir).filter((n) => n !== '.DS_Store') : []) {
  if (s.startsWith('.')) { fail(`skills/${s}: hidden skill directory`); continue; }
  const file = path.join(skillsDir, s, 'SKILL.md');
  if (!fs.existsSync(file)) { fail(`skills/${s}: SKILL.md missing`); continue; }
  const md = fs.readFileSync(file, 'utf8');
  const fm = md.match(/^---\n([\s\S]*?)\n---/);
  if (!fm) { fail(`skills/${s}: front matter missing`); continue; }
  if (fm[1].match(/^name:\s*(.+)$/m)?.[1] !== s) fail(`skills/${s}: name must match its folder`);
  if (!fm[1].match(/^description:\s*\S.+$/m)) fail(`skills/${s}: description required`);
  for (const m of md.matchAll(/`([a-z]+(?:_[a-z]+)+)`/g)) if (!declared.has(m[1])) fail(`skills/${s}: uses undeclared tool ${m[1]}`);
}
(tc.positive ?? []).forEach((c, i) => c.tools_triggered.split(',').map((s) => s.trim()).forEach((t) => !declared.has(t) && fail(`positive[${i}] uses undeclared tool ${t}`)));

const servers = Object.entries(mcp.mcpServers ?? {});
if (mcp.$schema !== 'https://agent-plugins.org/schemas/1.0.0/mcp.schema.json') fail('mcp.json: wrong $schema');
if (servers.length !== 1) fail('mcp.json: exactly one MCP server per plugin');
for (const [name, s] of servers) {
  if (s.type !== 'streamable-http') fail(`mcp.json ${name}: type must be streamable-http`);
  if (!s.url?.startsWith('https://')) fail(`mcp.json ${name}: url must be HTTPS`);
  if (s.url !== tools.serverUrl) fail(`mcp.json ${name}: url differs from review/tools.json serverUrl`);
  if (s.headers && Object.keys(s.headers).length) fail(`mcp.json ${name}: headers must be empty`);
  const auth = s.extensions?.['com.openai']?.auth;
  if (!auth) fail(`mcp.json ${name}: extensions.com.openai.auth required for a protected server`);
  if (auth?.client?.clientSecret) fail(`mcp.json ${name}: clientSecret is not allowed`);
  if (['dcr', 'cimd'].includes(auth?.client?.mode) && auth.client.clientId) fail(`mcp.json ${name}: no clientId with ${auth.client.mode}`);
}

// Every declared tool carries all three hints and a justification for each.
for (const t of tools.tools) {
  for (const h of ['readOnlyHint', 'destructiveHint', 'openWorldHint']) {
    if (typeof t.annotations?.[h] !== 'boolean') fail(`tools.json ${t.name}: ${h} must be a boolean`);
    if (!t.justifications?.[h]?.trim()) fail(`tools.json ${t.name}: ${h} needs a justification`);
  }
  if (t.annotations?.readOnlyHint && t.annotations?.destructiveHint) fail(`tools.json ${t.name}: read-only tools cannot be destructive`);
}

// Nothing that looks like a secret anywhere in the package.
const SECRET = /(sk-[A-Za-z0-9]{20,}|-----BEGIN [A-Z ]*PRIVATE KEY-----|"(password|client_secret|clientSecret|api_key)"\s*:)/;
for (const rel of ['plugin.json', 'mcp.json', 'review/tools.json']) if (SECRET.test(fs.readFileSync(path.join(ROOT, rel), 'utf8'))) fail(`${rel}: looks like it contains a secret`);

if (errors.length) {
  console.error(`validate: ${errors.length} problem(s)\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log(`validate: ok (${tools.tools.length} tools, ${prompts.length} starter prompts, 5+3 test cases)`);
