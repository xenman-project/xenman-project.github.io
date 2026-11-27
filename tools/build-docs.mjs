// Builds docs/*.html from tools/docs-content.mjs: the same frame for every
// page -- top bar, navigation, breadcrumbs, "In this article", previous and
// next topic. Run from the repository root: node tools/build-docs.mjs
import { writeFileSync, mkdirSync } from "node:fs";
import { pages, VERSION } from "./docs-content.mjs";

const SITE = "https://xenman-project.github.io";
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const strip = (s) => s.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&#39;|&apos;/g, "'");
const LOGO = `<svg class="logo" viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>`;

const href = (p) => (p.slug === "index" ? "./" : `${p.slug}.html`);

function nav(current) {
  return pages
    .map((p) => `<li><a href="${href(p)}"${p === current ? ' aria-current="page"' : ""}>${esc(p.nav)}</a></li>`)
    .join("\n          ");
}

function toc(body) {
  const items = [...body.matchAll(/<h2 id="([^"]+)">(.*?)<\/h2>/g)].map(([, id, text]) => `<li><a href="#${id}">${text}</a></li>`);
  return items.length ? `<nav class="doc-toc" aria-label="In this article"><p class="doc-toc-title">In this article</p><ul>${items.join("")}</ul></nav>` : "";
}

function page(p, i) {
  const prev = pages[i - 1], next = pages[i + 1];
  const title = p.slug === "index" ? "XenMan documentation" : `${p.title} | XenMan documentation`;
  const crumbs = p.slug === "index"
    ? `<a href="../">Home</a> / <span>Documentation</span>`
    : `<a href="../">Home</a> / <a href="./">Documentation</a> / <span>${esc(p.title)}</span>`;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(p.description)}">
  <link rel="canonical" href="${SITE}/docs/${p.slug === "index" ? "" : p.slug + ".html"}">
  <meta name="theme-color" content="#0b3a47">
  <link rel="icon" href="../favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="../style.css">
  <link rel="stylesheet" href="docs.css">
</head>
<body class="docs">
  <header class="topbar">
    <div class="wrap topbar-inner">
      <a class="brand" href="../" aria-label="XenMan home">${LOGO}<span>xenman</span></a>
      <nav class="nav" aria-label="Site">
        <a href="../">Home</a>
        <a href="./" aria-current="${p.slug === "index" ? "page" : "false"}">Documentation</a>
        <a href="https://github.com/xenman-project/xenman/releases">Releases</a>
        <a class="nav-github" href="https://github.com/xenman-project/xenman">GitHub</a>
      </nav>
    </div>
  </header>

  <div class="wrap doc-layout">
    <aside class="doc-nav">
      <details open>
        <summary>XenMan ${VERSION}</summary>
        <ul>
          ${nav(p)}
        </ul>
      </details>
    </aside>

    <main class="doc-main" id="content">
      <p class="breadcrumbs">${crumbs}</p>
      <h1>${esc(p.title)}</h1>
      ${p.body.trim()}
      <nav class="doc-pager" aria-label="Topic navigation">
        ${prev ? `<a class="prev" href="${href(prev)}"><span>Previous topic</span>${esc(prev.title)}</a>` : "<span></span>"}
        ${next ? `<a class="next" href="${href(next)}"><span>Next topic</span>${esc(next.title)}</a>` : "<span></span>"}
      </nav>
    </main>

    ${toc(p.body)}
  </div>

  <footer class="footer">
    <div class="wrap footer-inner">
      <div>
        <a class="brand" href="../">${LOGO}<span>xenman</span></a>
        <p class="small">Documentation for XenMan ${VERSION}. Licensed under MIT with Commons Clause. See <a href="https://github.com/xenman-project/xenman/blob/main/LICENSE">LICENSE</a>.</p>
      </div>
      <nav class="footer-links" aria-label="Project links">
        <a href="https://github.com/xenman-project/xenman">Source code</a>
        <a href="https://github.com/xenman-project/xenman/releases">Releases</a>
        <a href="https://github.com/xenman-project/xenman/issues">Issues</a>
        <a href="https://github.com/xenman-project/xenman/blob/main/CHANGELOG.md">Changelog</a>
      </nav>
      <p class="small trademark">XenMan is an independent project and is not affiliated with, endorsed by or sponsored by Cloud Software Group, Inc. or Citrix. Citrix, XenServer and XenCenter are trademarks of Cloud Software Group, Inc. or its subsidiaries. Xen is a trademark of the Linux Foundation.</p>
    </div>
  </footer>
  <script>if (matchMedia("(max-width: 800px)").matches) document.querySelector(".doc-nav details").open = false;</script>
</body>
</html>
`;
}

mkdirSync("docs", { recursive: true });
pages.forEach((p, i) => {
  writeFileSync(`docs/${p.slug}.html`, page(p, i));
  console.log(`docs/${p.slug}.html  (${strip(p.title)})`);
});
