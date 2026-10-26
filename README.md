# NAND Lab website

A working, static-first B2B website with original NAND Lab logos, self-hosted Inter, three service pathways, a filterable portfolio, three concept case studies and a local project brief builder.

## Run locally

Requires Node.js 20 or newer. There are no npm dependencies and no install step.

```sh
node scripts/build.mjs
node scripts/check.mjs
node scripts/serve.mjs
```

Open http://127.0.0.1:4173. Stop the server with Ctrl+C. `npm run build`, `npm test`, and `npm run dev` are equivalent. Rebuild after editing source or content; refresh the browser. Do not open the HTML directly with file:// because root-relative URLs require an HTTP server.

## Source architecture

- `content/site.json`: identity, canonical domain, indexing switch and unresolved contact fields.
- `content/services.json`: service descriptions, fit, deliverables and approach.
- `content/projects.json`: case-study content. Unapproved entries have `status: "needs-verification"` and `published: false`.
- `src/components.mjs`: reusable page shell, header, footer, cards and process section.
- `src/pages.mjs`: page compositions and demonstration markup.
- `src/style.css`: design tokens, layout, responsive breakpoints and reduced-motion support.
- `src/app.js`: menu, work filtering, dashboard, gallery and brief builder. No third-party JavaScript.
- `public/assets`: supplied logo variants, locally hosted licensed Inter, original concept artwork and social preview.
- `public/demos/fieldwork`: standalone responsive fictional web concept.
- `scripts/build.mjs`: generates crawlable HTML into `dist/`.
- `scripts/check.mjs`: checks headings, local destinations, image alternatives, portfolio labels and primary text contrast.
- `.openai/hosting.json`: registered Sites identity and static deployment directory. Preserve its project ID.

The static HTML approach avoids a framework runtime, dependency installation and a server for presentation content. Source templates keep shared elements consistent. It can migrate to Astro if the editorial workflow grows; it does not require that complexity for this scope.

## Pages

`/`, `/services/`, `/services/web/`, `/services/data/`, `/services/creative/`, `/work/`, `/work/fieldwork/`, `/work/operations-pulse/`, `/work/forma/`, `/about/`, `/start-project/`, `/privacy/`, `/terms/`, `/academy/`.

The standalone demonstration is `/demos/fieldwork/`. `404.html` is the not-found page. `dist/sitemap.xml` contains the 14 main routes. Configure the static host to serve directory `index.html` files and return `404.html` with HTTP 404 for missing routes.

## Editing case studies

1. Add an object to `content/projects.json` using an existing entry as the schema. Use a unique lowercase hyphenated slug and category `Web`, `Data` or `Creative`.
2. Supply truthful context, goal, approach, deliverables, technology and outcome. Use "Not measured" unless you have evidence.
3. For actual client work, record written publication permission and approved attribution in your private project records. Only publish approved public material.
4. The initial demos are selected by category in `src/pages.mjs`; add a project-specific renderer or supplied screenshots for a new actual project. Do not display these fictional demos as another project's evidence.
5. Category counts are generated from published entries. Rebuild and run checks.

## Brand system

Canvas `#080808`; panel `#111110`; primary text `#F7F6F2`; body `#BDBDB6`; muted `#AAA9A3`; gold `#C9973A`; light gold `#E0B960`; light chapter `#F7F6F2`; light text `#151515`; accessible dark gold `#805910`.

All interface typography uses self-hosted Inter. Header uses the supplied white horizontal lockup. Footer uses the supplied white stacked logo. Fixed logo lettering remains untouched. The large geometric mark uses the supplied symbol-only image. Light chapter backgrounds do not contain white logos.

## Inquiry behavior and production integration

**Current mode is deliberately local-only.** Required fields, email validity, minimum description length, a honeypot, review, edit and text-file download work. No request is sent, no server stores an inquiry, and nothing is retained in localStorage. This is stated before the form and again in its output. A honeypot is not a substitute for server-side spam protection.

`content/site.json` reserves contact fields but changing `mode` or `endpoint` alone does not activate sending. Before production:

1. Confirm a public business destination and legal entity. Do not assume the contacts in the old education HTML are approved for the B2B site.
2. Select a form backend or a same-origin server endpoint. Keep mail/API secrets in the hosting secret manager, never this repository or browser JavaScript.
3. Implement a POST handler that validates all fields and lengths server-side, rejects honeypot spam, rate-limits submissions and checks origin. Add appropriate bot protection if required.
4. Configure delivery and retention, update the privacy notice, and add a fetch-based submission path in `src/app.js` only after the endpoint is working. Check `response.ok`, show real errors, prevent duplicate submits and retain form values on failure.
5. Replace preview-mode copy and acknowledgment with the approved production privacy wording. Do not claim receipt until the server accepts it.
6. Test valid, invalid, spam, duplicate, offline and delivery-failure cases, plus an actual inbox receipt. Current tests do not verify production delivery.

## Deployment and Sites

This build is registered with Sites. It is not authorized to replace nandlab.in or publish to a production URL yet; the supplied master specification requires owner approval. The local source is complete, but the Sites source save did not succeed: the registered Site is still version 0 with no live deployment. The execution environment blocked Git/source synchronization. Do not treat registration as a saved website.

After approval, use the Sites skill to obtain a current source credential, push this exact source, package the matching `dist/` and `.openai/hosting.json`, then save/deploy the version through Sites. The private audience should stay private unless the owner explicitly approves a change. Do not manually edit the project ID or reuse another site's credential. Credentials must never be saved in the project.

For an ordinary static host, run `node scripts/build.mjs` and upload the contents of `dist/`. No server runtime is required. Deployment is an action requiring the owner's approval in this project. See `MIGRATION.md` before changing the existing domain.

Canonical links currently target the intended `https://nandlab.in` domain. Indexing is disabled with noindex and robots Disallow. For a separate approved public hostname, change `canonicalOrigin`. Enable `indexable` only after the content, destination and public launch are approved. Rebuild so sitemap and page metadata agree.

## Remaining owner inputs

Verified inquiry phone, legal business identity, approved founder/contributor biographies, actual project material and permissions, service capacity confirmation, approved process/commercial terms, WordPress backups and URL inventory, and final domain/hosting approval. Legal pages are conspicuous review drafts. The Academy route is an honest holding page, not a course catalogue or launched learning platform.

See `SOURCE-AUDIT.md`, `ASSETS.md`, `QA.md`, and `MIGRATION.md` for evidence and boundaries.

## Owner confirmation — 24 October 2026

Owner authorized public deployment to nandlab.in. Domain registrar: GoDaddy. Existing hosting: Razorhost. Verified inquiry email: nandlab.in@gmail.com. The contact page now provides a direct mailto link; the brief builder still does not automatically send email. Hosting login, backup and deployment remain pending. Previous no-publication wording is superseded by this explicit owner authorization.
