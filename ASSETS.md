# Asset provenance

## Owner-supplied brand

All `nandlab-*.png` files in `public/assets/` are copied from the v2 package's `brand_assets/website_ready/` directory. No logo geometry, letterforms, aspect ratio or artwork color was changed in this build. The package documents the white variants as faithful alpha/pixel derivatives of the owner's transparent black originals, not original designer-issued white vector files.

Used: horizontal white header, stacked white footer, symbol-only white studio graphic, 32 px favicon and 180 px Apple touch icon. Black counterparts and the other favicon sizes remain available for future approved placements. Black-backed legacy white files and ambiguous `-W` files are not used.

## Font

Inter Variable from the official rsms/inter repository: https://github.com/rsms/inter. Downloaded `docs/font-files/InterVariable.woff2`; the accompanying SIL Open Font License is saved as `public/assets/Inter-LICENSE.txt`. Served locally. Social artwork uses Inter Regular from Google Fonts' Inter distribution during build preparation; no external font request is made by the site.

## Original artwork

- `forma-1.svg`, `forma-2.svg`, `forma-3.svg`: original vector compositions for a fictional brand concept, created for this site. Arial is explicitly used inside the fixed vector artworks; all website interface type remains Inter. These are editable SVG source, not third-party mockups.
- Web and data portfolio card compositions: original HTML/CSS in `src/components.mjs` and `src/style.css`.
- Fieldwork illustration: original CSS geometric rings in the fictional standalone demo.
- `og.png`: 1200 × 630 social composition using the exact supplied horizontal logo and Inter text on the approved palette. It is not a modified logo asset.

No stock photography, team portraits, client logos, external design screenshots or generated client evidence is used.
