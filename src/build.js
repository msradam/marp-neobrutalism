'use strict';

const fs   = require('fs');
const path = require('path');

// Neobrutalism design tokens — defined here, no upstream npm package.
// The aesthetic: thick borders, offset box-shadows with zero blur,
// flat fills, near-monochromatic with one bold accent, zero border-radius.

const LIGHT = {
  bg:           '#ffffff',
  layer:        '#f2f2f2',
  text:         '#000000',
  textSecondary:'#333333',
  border:       '#000000',
  borderWidth:  '2px',
  shadow:       '4px 4px 0 #000000',
  shadowSm:     '2px 2px 0 #000000',
  accent:       '#f5c842',   // classic neobrutalist yellow
  accentText:   '#000000',
  error:        '#ff3333',
  success:      '#00cc44',
  warning:      '#ff8800',
  info:         '#0066ff',
};

const DARK = {
  bg:           '#0a0a0a',
  layer:        '#1a1a1a',
  text:         '#ffffff',
  textSecondary:'#cccccc',
  border:       '#ffffff',
  borderWidth:  '2px',
  shadow:       '4px 4px 0 #ffffff',
  shadowSm:     '2px 2px 0 #ffffff',
  accent:       '#f5c842',
  accentText:   '#000000',
  error:        '#ff6666',
  success:      '#33ff77',
  warning:      '#ffaa33',
  info:         '#4499ff',
};

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');`;

const FONT_SANS = `'Space Grotesk', 'DM Sans', system-ui, sans-serif`;
const FONT_MONO = `'Space Mono', 'DM Mono', ui-monospace, monospace`;

function cssVars(t, prefix) {
  return `
  --${prefix}-bg:            ${t.bg};
  --${prefix}-layer:         ${t.layer};
  --${prefix}-text:          ${t.text};
  --${prefix}-text-secondary:${t.textSecondary};
  --${prefix}-border:        ${t.border};
  --${prefix}-border-width:  ${t.borderWidth};
  --${prefix}-shadow:        ${t.shadow};
  --${prefix}-shadow-sm:     ${t.shadowSm};
  --${prefix}-accent:        ${t.accent};
  --${prefix}-accent-text:   ${t.accentText};
  --${prefix}-error:         ${t.error};
  --${prefix}-success:       ${t.success};
  --${prefix}-warning:       ${t.warning};
  --${prefix}-info:          ${t.info};
  --${prefix}-font:          ${FONT_SANS};
  --${prefix}-mono:          ${FONT_MONO};
  --${prefix}-pad:           60px;`.trimStart();
}

// Shared structural CSS — same for both themes, references vars.
const STRUCTURE = `
section {
  font-family: var(--nb-font);
  font-size: 22px;
  line-height: 1.5;
  font-weight: 400;
  background: var(--nb-bg);
  color: var(--nb-text);
  padding: var(--nb-pad);
  box-sizing: border-box;
  width: 1280px;
  height: 720px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
  border-top: 6px solid var(--nb-border);
}

/* Headings */
h1 {
  font-size: 2.8em;
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.02em;
  margin: 0 0 0.3em;
}
h2 {
  font-size: 1.9em;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin: 0 0 0.4em;
}
h3 {
  font-size: 1.4em;
  font-weight: 600;
  margin: 0 0 0.35em;
}
h4, h5, h6 {
  font-size: 0.85em;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin: 0 0 0.3em;
}

p, ul, ol {
  font-size: 0.88em;
  margin: 0 0 0.5em;
}
ul, ol { padding-left: 1.4em; }
li + li { margin-top: 0.2em; }
li > ul, li > ol { margin-top: 0.2em; margin-bottom: 0; }

strong { font-weight: 700; }
em { font-style: italic; }

a {
  color: var(--nb-text);
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 3px;
}
a:hover { background: var(--nb-accent); }

/* Blockquote */
blockquote {
  border-left: var(--nb-border-width) solid var(--nb-border);
  margin: 0.5em 0;
  padding: 0.5em 0 0.5em 1em;
  background: var(--nb-layer);
  box-shadow: var(--nb-shadow-sm);
}
blockquote p { margin: 0; font-size: inherit; font-weight: 500; }

/* Code */
code {
  font-family: var(--nb-mono);
  font-size: 0.82em;
  background: var(--nb-layer);
  border: var(--nb-border-width) solid var(--nb-border);
  padding: 0.1em 0.35em;
  border-radius: 0;
}

pre {
  background: var(--nb-layer);
  border: var(--nb-border-width) solid var(--nb-border);
  box-shadow: var(--nb-shadow);
  border-radius: 0;
  padding: 0.75em 1em;
  margin: 0.5em 0;
  overflow: hidden;
}
pre code {
  font-size: 0.78em;
  padding: 0;
  background: transparent;
  border: none;
  line-height: 1.55;
  white-space: pre;
}

/* Syntax */
.hljs-keyword,
.hljs-selector-tag,
.hljs-built_in  { font-weight: 700; }
.hljs-string,
.hljs-attr      { font-style: italic; }
.hljs-comment,
.hljs-quote     { opacity: 0.6; }
.hljs-deletion  { color: var(--nb-error); }
.hljs-addition  { color: var(--nb-success); }

/* Tables */
table {
  border-collapse: collapse;
  width: 100%;
  font-size: 0.82em;
  margin: 0.5em 0;
  border: var(--nb-border-width) solid var(--nb-border);
  box-shadow: var(--nb-shadow);
}
th {
  background: var(--nb-accent);
  color: var(--nb-accent-text);
  font-weight: 700;
  text-align: left;
  padding: 0.5em 0.75em;
  border-bottom: var(--nb-border-width) solid var(--nb-border);
  text-transform: uppercase;
  font-size: 0.85em;
  letter-spacing: 0.06em;
}
td {
  padding: 0.4em 0.75em;
  border-bottom: 1px solid var(--nb-border);
}
tr:last-child td { border-bottom: none; }
tr:nth-child(even) td { background: var(--nb-layer); }

/* Mark */
mark {
  background: var(--nb-accent);
  color: var(--nb-accent-text);
  padding: 0 0.2em;
  border-radius: 0;
}

/* Mermaid */
.mermaid {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5em 0;
}
.mermaid svg {
  max-width: 100%;
  height: auto;
  font-family: var(--nb-font) !important;
}

/* Header / footer */
header, footer {
  position: absolute;
  left: var(--nb-pad);
  right: var(--nb-pad);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--nb-text-secondary);
  font-family: var(--nb-font);
  padding: 0;
  height: auto;
  line-height: 1.4;
}
header { top: 20px; }
footer { bottom: 20px; }

section::after {
  position: absolute;
  right: var(--nb-pad);
  bottom: 20px;
  left: auto;
  top: auto;
  width: auto;
  height: auto;
  padding: 0;
  font-family: var(--nb-mono);
  font-size: 11px;
  font-weight: 700;
  color: var(--nb-text-secondary);
}

/* ── Class variants ──────────────────────────────────── */

/* lead: accent background, giant text */
section.lead {
  justify-content: flex-end;
  background: var(--nb-accent);
  color: var(--nb-accent-text);
  border-top: none;
  padding-bottom: calc(var(--nb-pad) + 8px);
}
section.lead h1 {
  font-size: 4em;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 0.95;
  color: var(--nb-accent-text);
  margin: 0 0 0.2em;
  border-bottom: 4px solid var(--nb-accent-text);
  padding-bottom: 0.25em;
}
section.lead h2 {
  font-size: 1em;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--nb-accent-text);
  margin: 0;
}
section.lead header,
section.lead footer,
section.lead::after { color: var(--nb-accent-text); opacity: 0.6; }

/* invert / dark */
section.dark,
section.invert {
  background: var(--nb-bg-dark, #0a0a0a);
  color: #fff;
  --nb-border: #fff;
  --nb-shadow: 4px 4px 0 #fff;
  --nb-shadow-sm: 2px 2px 0 #fff;
  --nb-layer: #1a1a1a;
  --nb-text-secondary: #ccc;
  border-top-color: #fff;
}

/* split */
section.split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr;
  column-gap: 48px;
}
section.split h1,
section.split h2,
section.split h3 { grid-column: 1 / -1; }

/* accent: yellow background content slide */
section.accent {
  background: var(--nb-accent);
  color: var(--nb-accent-text);
  border-top-color: var(--nb-accent-text);
}
section.accent code,
section.accent pre { border-color: var(--nb-accent-text); }
`.trim();

function buildLight() {
  return `/*!
 * @theme neobrutalism
 * @auto-scaling true
 * @size 16:9 1280px 720px
 * @size 4:3 960px 720px
 *
 * Marp theme in the neobrutalist style.
 * Thick borders, offset box-shadows, flat fills, Space Grotesk.
 *
 * Run \`npm run build\` to regenerate.
 */

${FONT_IMPORT}

section {
  ${cssVars(LIGHT, 'nb')}
}

/* light-specific overrides */
section.dark,
section.invert {
  ${cssVars(DARK, 'nb')}
  color-scheme: dark;
}

${STRUCTURE}
`;
}

function buildDark() {
  return `/*!
 * @theme neobrutalism-dark
 * @auto-scaling true
 * @size 16:9 1280px 720px
 * @size 4:3 960px 720px
 *
 * Marp theme in the neobrutalist style — dark default.
 * Thick white borders, offset white shadows, Space Grotesk.
 *
 * Run \`npm run build\` to regenerate.
 */

${FONT_IMPORT}

section {
  ${cssVars(DARK, 'nb')}
  color-scheme: dark;
}

section.light {
  ${cssVars(LIGHT, 'nb')}
  color-scheme: light;
}

${STRUCTURE}
`;
}

const OUT = path.resolve(__dirname, '..', 'themes');
fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, 'neobrutalism.css'), buildLight());
fs.writeFileSync(path.join(OUT, 'neobrutalism-dark.css'), buildDark());

console.log('Generated themes/neobrutalism.css and themes/neobrutalism-dark.css');
