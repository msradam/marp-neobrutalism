'use strict';

const { Marp } = require('@marp-team/marp-core');
const mermaidThemes = require('../mermaid');

const MERMAID_CDN = 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js';

function buildMermaidScript(hasMermaid) {
  if (!hasMermaid) return '';

  const lightVars = JSON.stringify(mermaidThemes.light.themeVariables, null, 0);
  const darkVars  = JSON.stringify(mermaidThemes.dark.themeVariables, null, 0);

  return `
<script src="${MERMAID_CDN}"></script>
<script>
(function () {
  var DARK = new Set(['dark', 'invert']);
  var BASE = { startOnLoad: false, securityLevel: 'loose' };
  var LIGHT_VARS = ${lightVars};
  var DARK_VARS  = ${darkVars};

  function sectionIsDark(el) {
    var sec = el.closest('section');
    return sec && Array.from(sec.classList).some(function (c) { return DARK.has(c); });
  }

  async function renderAll() {
    if (typeof mermaid === 'undefined') return;
    var divs = Array.from(document.querySelectorAll('.mermaid'));
    var light = [], dark = [];
    divs.forEach(function (div) {
      (sectionIsDark(div) ? dark : light).push(div);
    });

    var uid = 0;
    function nextId() { return 'nb-' + (uid++); }

    if (dark.length) {
      mermaid.initialize(Object.assign({}, BASE, { theme: 'base', themeVariables: DARK_VARS }));
      for (var i = 0; i < dark.length; i++) {
        try {
          var res = await mermaid.render(nextId(), dark[i].textContent.trim());
          dark[i].innerHTML = res.svg;
        } catch (e) {}
      }
    }

    if (light.length) {
      mermaid.initialize(Object.assign({}, BASE, { theme: 'base', themeVariables: LIGHT_VARS }));
      for (var i = 0; i < light.length; i++) {
        try {
          var res = await mermaid.render(nextId(), light[i].textContent.trim());
          light[i].innerHTML = res.svg;
        } catch (e) {}
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderAll);
  } else {
    renderAll();
  }
})();
</script>`.trim();
}

class NeobrutalistMarp extends Marp {
  constructor(opts) {
    super(opts);
    this._hasMermaid = false;

    const md = this.markdown;
    const defaultFence = md.renderer.rules.fence.bind(md.renderer);

    md.renderer.rules.fence = (tokens, idx, options, env, self) => {
      const token = tokens[idx];
      if (token.info.trim() === 'mermaid') {
        this._hasMermaid = true;
        return `<div class="mermaid">${token.content.trim()}</div>\n`;
      }
      return defaultFence(tokens, idx, options, env, self);
    };
  }

  render(markdown, env) {
    this._hasMermaid = false;
    const result = super.render(markdown, env);

    if (this._hasMermaid) {
      const script = buildMermaidScript(true);
      result.html = result.html.replace(/(<\/section>\s*<script)/, `${script}\n$1`);
      if (!result.html.includes(MERMAID_CDN)) {
        result.html = result.html.replace('</foreignObject>', `${script}\n</foreignObject>`);
      }
    }

    return result;
  }
}

module.exports = NeobrutalistMarp;
