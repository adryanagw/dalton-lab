# Dalton Lab — Chapter Content Generation Guide

## What this file is

A distilled, Dalton-Lab-specific operating guide for the agent that writes chapter content (the `dalton-lab-chapter-builder` skill, run locally). It adapts the general-purpose methodology in `docs/content-engine/` (`CLAUDE.md`, `CURRICULUM_MAPPING.md`, `CONTENT_GENERATION.md`) to this project's actual architecture and audience. Read those three for the full reasoning; read this one for what to actually do.

**Scope of this file:** chapter *content* generation only — HTML lesson + PDF companion for a topic that's already been decided (subject, class, chapter, topic name). Curriculum ingestion/mapping from Notion is a separate, earlier phase and isn't covered here.

## The one thing that's different from the uploaded docs

Those docs assume a presentation-independent JSON schema rendered by a generic engine. **This project doesn't do that, and this pass doesn't change it.** Chapters are hand-authored HTML files (`content-private/{subject}/babN-slug.html`) plus a sibling quiz JSON file, served only through authenticated `/api/content` calls — never as static files. The web-shell (`public/`, `api/*`) is built and maintained in a separate session; this guide and the local chapter-builder agent never touch it.

**What's new:** every chapter also gets a PDF companion, generated from the same content spec. See §5 — its scope has grown since this guide was first written (originally "extra formulas/worked examples", now "the sole home for entire non-interactive reference content"), so read §5 in full even if you've built a PDF companion before.

**Division of labor, precisely:** the chapter-builder agent owns the HTML lesson, quiz JSON, the PDF spec (`.pdf-spec.md`), and the *filled* PDF page source (`.pdf-pages.html`) — all of it is chapter *content*. Turning that `.pdf-pages.html` into the actual served PNG page images (headless-Chromium rendering, overflow-checking, committing the images) is a mechanical, deterministic step with no content judgment left in it — it can be done by either side, but if the chapter-builder agent has the means to run a headless-Chromium screenshot script, doing it itself (see §5) avoids a round-trip. What the chapter-builder never does is touch the *serving/display* layer — `api/pdf-content.js`, `initPdfViewers()`/watermark logic in `app.js`, `.pdf-viewer*` CSS — that's web-shell, already built, and stable.

## 1. Audience and voice

Indonesian SMA (senior high) students prepping for UTBK/Ujian Sekolah. Not curious hobbyists — they came for a specific test.

- **Language:** casual, informal Bahasa Indonesia ("santai, nggak kaku"), same register as the existing chapters (`bab1-eksponen-logaritma.html`, `bab1-sel.html`, `bab1-badan-usaha.html` are the voice reference — read one before writing).
- **Depth over breadth.** One deep, comprehensive practice-question bank per bab is the actual differentiator (see PRODUCT.md) — don't write a shallow summary chapter to cover more ground faster.
- Never invent statistics, testimonials, or citations. If a claim needs a source, say so instead of fabricating one.
- **Use an analogy once, not as a running metaphor.** One orienting analogy per section (e.g. "sel = kota kecil" as a one-time framing sentence) helps intuition. Carrying it literally into every following sentence doesn't — a real bug from this session: a membrane section said "pagar" instead of "membran," "pos satpam" instead of "protein," "penghuni pagar," "papan pengumuman," "KTP sel," "udara & jalanan kota," in nearly every card, which read as over-styled rather than informative and forced the reader to keep translating metaphor back to the real term. State the analogy once for intuition, then describe the actual structure/process directly using its real name.

## 2. Content structure per topic

Not a rigid template — sections below are typical, not mandatory. Skip what a simple topic doesn't need; expand what an advanced one does.

```
1. Hook / quick intuition           (1-2 sentences before any formalism)
2. Core concept, plain language
3. Formal definition / formula      (LaTeX where applicable — see §4)
4. Worked example(s)                (progressing basic → exam-style)
5. Common mistakes / misconceptions (❌ salah paham → ✅ paham yang benar)
6. Quiz                             (one flat set per chapter — see §3/§4;
                                      no separate leveled-exercise sections)
```

For every topic, before writing prose, sketch a short spec — this is the planning step, keep it to a few lines, not a document:

```
Topic:
Prerequisites:
Core formula(s) / concept(s):
Worked examples needed (how many, what progression):
Likely misconceptions:
PDF-worthy content: (formulas, advanced derivation, extra worked examples)
```

Distinguish FACT / INFERENCE / RECOMMENDATION when a curriculum source is ambiguous — don't silently guess at scope.

## 3. HTML chapter — real conventions to match

Ground every new chapter in these exact patterns (see `content-private/matematika/bab1-eksponen-logaritma.html` for a live example of all of them):

- **Sections:** `<section id="slug" data-nav="Label">` — `data-nav` drives the sticky in-page navigation; give every major section one.
- **Section head pattern:** `.eyebrow` (small label, e.g. `01 · Bilangan Berpangkat`) + `<h2>` + intro `<p>`.
- **Math:** inline KaTeX via `\( ... \)`. Never hand-roll fractions/exponents in Unicode when there's real math — that's what LaTeX is for, even inline.
- **Cards:** reuse existing card classes for content boxes (`.organel-card`, `.jenis-box`, `.law-strip`, `.role-cards`, `.compare-table` for tabular comparisons). Don't invent a new card class per chapter — check what's already used across the three existing chapters first.
- **Accordion** (for FAQ-style or collapsible detail): `[data-accordion]` wrapper > `.acc-item` > `.acc-q` + `.acc-a`.
- **Tab-switch** (for toggling between representations, e.g. two solution methods): `[data-tabswitch][data-tabswitch-group="name"]` wrapper, trigger buttons `[data-tab]`, panels `[data-tabpanel][data-tabswitch-group="name"]`.
- **Quiz mount point — exactly one per chapter now:**
  ```html
  <div class="quiz-root" data-quiz-subject="matematika" data-quiz-bab="bab1-eksponen-logaritma"></div>
  ```
  There used to be a separate chapter quiz plus one `exercise-root`/`.{topic}.exercise.json` pair per topic (basic/intermediate/advanced tiers) — that split was retired in favor of one flat, mixed-difficulty `.quiz.json` per chapter covering everything (foundational through exam-style, no difficulty labels). Do not add `exercise-root` mounts or `.exercise.json` files to a new chapter — the engine that read them (`initExercises`/`/api/exercise`) no longer exists. Every quiz automatically gets a "Unduh Soal (PDF)" button (`downloadQuizAsPdf()` in `app.js`) that generates a blank practice worksheet + answer key live from the quiz JSON — no extra markup needed for that, it's baked into the quiz mount.

**Do not invent new generic engines.** If a chapter seems to need one (e.g. a new interaction type), that's a web-shell change — flag it for the other session rather than hacking it into chapter HTML.

**Layout discipline — learned the hard way on Ekonomi/Biologi bab1, verify every new chapter against these:**

- **Box width must match the text column above it.** `.section-head` (the eyebrow+h2+intro-`<p>` block) is capped at `max-width:640px` by the site's global CSS. Any standalone content box that follows it directly at full section width — `.jenis-box`, `.law-strip` used *outside* a grid — must carry `style="max-width:640px;"` too, or its edges visibly overshoot the paragraph above it (real bug, shipped, had to be patched with inline `max-width:640px` on every offending box after the fact). Boxes that already sit inside a `.two-col`/`.compare-grid`/`.organel-grid` grid are naturally narrower than 640px and don't need this — only add it to standalone, full-width boxes.
- **Diagrams and embeds get their own width cap, wider than text but not full-bleed.** `.diagram-card` (used for both static images and 3D-model iframes, see below) carries `max-width:760px` site-wide. Without it, a large or square source image (e.g. a 1159×1159 diagram) renders at the full `.wrap` width (~1120px) and towers over the page — also a real bug, shipped, had to be patched. 760px is deliberate: a visible "breakout" wider than the 640px reading column (the classic editorial convention — figures get more room than prose) without going full-width. Don't override this per-image; if a diagram genuinely needs to be larger, that's a `.diagram-card` CSS discussion with the web-shell session, not a per-chapter inline style.
- **Section spacing:** the default `section{padding:86px 0}` (global CSS) assumes a section with real content weight — a card grid, a table, a multi-paragraph explanation. After the "move static content to PDF" restructuring (see §5), a section that's down to one intro paragraph plus a short box reads as excessive empty space above/below it at that padding. Add `tight` to the section's class list (`class="notebook-bg tight"` etc. — it's an existing global modifier, `section.tight{padding:60px 0}`) for any section you expect to be short. Don't touch the global `section{padding}` value itself — that's shared by every chapter on every subject.
- **Never ship functional/informational text under 11px** (`0.6875rem` at the default 16px root) — sub-labels, tags, captions included. The bundled Impeccable detector (`impeccable detect --json <file>`) flags this as `undersized-ui-text`; a real instance (`font-size:.62rem` on organel "khusus tumbuhan/hewan" tags = 9.92px) shipped and had to be bumped to `.7rem`. Run the detector before calling a chapter done — see §7.

**3D / external interactive embeds:** when a real, working embed URL is supplied for a chapter (e.g. the user pastes a specific Sketchfab model link — never invent or guess one), follow this exact pattern rather than inventing new markup:

```html
<div class="jenis-box diagram-card">
  <p class="diagram-eyebrow">Model 3D Interaktif · <!-- what it shows --></p>
  <div class="model3d-frame">
    <iframe title="<!-- model title -->" src="<!-- embed URL, ends in /embed -->" allow="autoplay; fullscreen; xr-spatial-tracking" loading="lazy" allowfullscreen></iframe>
  </div>
  <p class="model3d-credit">Model 3D: <a href="<!-- model page URL -->" target="_blank" rel="nofollow noopener"><!-- title --></a> oleh <a href="<!-- creator profile URL -->" target="_blank" rel="nofollow noopener"><!-- creator --></a>, via <a href="https://sketchfab.com" target="_blank" rel="nofollow noopener">Sketchfab</a>.</p>
  <p class="diagram-caption"><!-- one line: what to look for / how it connects to the surrounding content --></p>
</div>
```

`.model3d-frame`/`.model3d-credit` are existing global CSS (aspect-ratio 4:3 responsive frame + small attribution line) — reuse them, don't reinvent. The credit line with working links back to the model page, creator profile, and Sketchfab is not optional — it's the attribution the model's CC-BY license requires. Place the embed physically next to the HTML content it illustrates (after the matching diagram, or after the interactive element it complements), not bundled all together at the end of a section.

## 4. Quiz JSON — exact schema

**Quiz** (`babN-slug.quiz.json`) — the ONLY interactive question format now, flat array, mixed difficulty (foundational through exam-style, no tier labels), covers the whole chapter — this replaces what used to be a separate chapter quiz plus per-topic leveled-exercise files (`.{topic}.exercise.json`, basic/intermediate/advanced) and, for one chapter, a separate practice-question-bank book; all of that is now one file:

```json
[
  {
    "q": "Question text, HTML allowed (e.g. <sup>3</sup>)",
    "opts": ["opt A", "opt B", "opt C", "opt D"],
    "correct": 0,
    "explain": "Why the correct answer is correct."
  }
]
```

`opts` doesn't have to be exactly 4 — the quiz engine renders up to 5 (A-E); use whatever option count the source material actually has, don't pad or trim to fit. `correct` is a 0-based index into `opts`. `explain` should teach the reasoning, not just restate the answer — a student getting it wrong should understand why after reading it. Aim for real depth here (see PRODUCT.md) — existing merged chapters run 24-63 questions; don't write a thin 10-question set just because the schema allows it.

## 5. PDF companion — what actually goes in it

**This section supersedes its original, narrower framing.** The PDF is not an export of the HTML page, and it is *not* merely "extra" formulas/worked examples anymore either. Established practice across Ekonomi bab1 and Biologi bab1 (both restructured this way, at explicit user direction, after the chapter was first built the old/narrower way and needed a follow-up pass): **entire static, non-interactive reference content — dense card grids, comparison tables, itemized lists, historical/biographical narrative, anything with no click/toggle/filter behavior — gets removed from the HTML lesson *entirely* and rewritten in full, elaborated prose in the PDF.** Not terse labels or a "see PDF for details" stub: PDF pages must stand alone without the HTML page's visual context, so a table that was two words per cell in HTML becomes a real explanatory paragraph in the PDF.

What **stays** in HTML: genuinely interactive elements (toggle filters, click-to-expand/accordion, tab-switch, calculators, the quiz engine), diagrams and 3D embeds together with their direct explanatory paragraph, and short foundational/definitional content a reader needs to follow the rest of the chapter. Everything else — if it's just sitting there to be read, not explored — is a PDF candidate. When restructuring an existing chapter, go section by section and ask "does clicking/toggling/filtering anything on this do something, or is it just static text/cards/a table?" — the latter moves.

Read-only, rendered as images (not a native embed), with a student-identity watermark drawn live by the viewer.

**Page template:** every PDF page is built as one `.pdf-page[data-subject="..."]` block from `public/assets/pdf-template/page-template.html` — bright per-subject accent frame around a white reading sheet, branded header (logo + wordmark + subject/chapter meta), diagonal student-identity watermark placeholder (see the critical warning below), footer with license text. Reuse its content-block classes rather than inventing new page markup per chapter:

| Class | Use for |
|---|---|
| `h1.page-title` / `p.dek` / `h2.section-title` / `p.lead` / `p.body-text` | Page title, one-line deck, section headings, intro/lead paragraph, regular elaborated prose paragraphs |
| `ul.learn-list` | The chapter-opener's "yang akan kamu pelajari" bullet list |
| `.formula-box` (`.label`, `.var-def`) | A stated formula (KaTeX) with every variable defined |
| `.example-box` (`.label`, `ol`/`li`, optional `p.setup`) | A worked example, numbered steps |
| `.callout.mistake` (`.label`, `.wrong`, `.right`) | ❌/✅ misconception callout — reuse this exact pattern, don't invent a new one |
| `.ref-table` (with `<thead>`/`<tbody>`, no inline colors) | A full reference table moved from HTML — every row/column reproduced, not summarized |
| `ol.ref-list` | A numbered reference list (e.g. sector classifications) |
| `.ref-list-2col` (`.item > .num`/`.term`/`.gloss`) | A dense 2-column glossary-style list (e.g. 14 named principles) — `columns:2` CSS, keeps a long enumerated list compact without a table |

`ref-table`/`ol.ref-list`/`.ref-list-2col` aren't defined in `page-template.html` itself (that file only shows the two page types it was first built with) — they were added directly in each chapter's `.pdf-pages.html` `<style>` block. Copy the block wholesale from an existing chapter's `.pdf-pages.html` (`content-private/ekonomi/bab1-badan-usaha.pdf-pages.html` or `content-private/biologi/bab1-sel.pdf-pages.html`) rather than retyping it — it's the same ~150-line CSS block in both, only the `--accent` value and a couple of size tweaks differ.

**Per-subject `--accent` colors** (add new ones here when a subject's color is decided, never invent one per-chapter): `ekonomi` → `#ee7d31` (site's orange). `biologi` → `#3fa15c` (matches `subjectsData.biologi.color: 'green'` in `app.js`). `matematika`/`fisika`/`kimia` not yet decided.

**Do NOT bake a watermark or "downloaded by" footer line into the rendered page.** This was a real, shipped bug: an earlier version of `page-template.html`/`.pdf-pages.html` included a `<div class="watermark">` with placeholder name/date text (meant as "a future per-student pipeline will stamp this dynamically") plus a `<div class="watermark-meta">Adryan Gerald<br>Diunduh ...</div>` footer line. Neither is per-student — the images are rendered *once* and served identically to every student — so every student saw the founder's name baked into their page, *underneath* the real, correct, live per-student watermark the viewer draws client-side (`initPdfViewers()`/`renderWatermark()` in `app.js`, `.pdf-viewer-watermark`). Two watermarks stacked, one of them wrong. **Current `page-template.html` and both existing `.pdf-pages.html` files have neither element — don't reintroduce them.** The `.sheet`/`.page-head`/`.page-body`/`.page-foot` structure stays; just the watermark div and the watermark-meta footer div are gone.

**Spec file:** write the page-by-page PDF content spec to `content-private/{subject}/babN-slug.pdf-spec.md`, a sibling of the chapter's HTML/JSON — see `content-private/ekonomi/bab1-badan-usaha.pdf-spec.md` or `content-private/biologi/bab1-sel.pdf-spec.md` for the format (page-by-page, each with the source table/list reproduced in full plus a written-out version, a one-line note on exactly what HTML section/element it replaced and what stayed behind). This is the spec the filled `.pdf-pages.html` is built from; it is not the rendered PDF itself.

**Filling the template and rendering — mechanical, but do it, don't stop at the spec:**
1. Copy an existing chapter's `.pdf-pages.html` as a starting structure (same reasons as the CSS block above — don't rebuild the `<head>`/watermark-free page shell from scratch).
2. Fill in each page's content from the spec, using only the classes from the table above.
3. Render to page images with a headless-Chromium pass. Prefer **element screenshots over a fixed-viewport CLI screenshot**: open the whole filled `.pdf-pages.html` in one page load, select all `.pdf-page` elements, and screenshot each element directly (e.g. via Playwright: `page.$$('.pdf-page')` then `el.screenshot({path, ...})` per element, `deviceScaleFactor: 1.5` on the page/context to match the site's existing 1.5x-rendered pages). This captures exactly that element's own box regardless of anything before/after it in the document, sidestepping the fragile `chrome --window-size=794,1123 --screenshot=... file://<temp-one-page-doc>.html` pattern (a per-page temp file whose captured viewport can silently mismatch the page's actual laid-out height if the temp doc's `<body>` isn't margin/padding-free, cropping the bottom of the page). Output filenames must be exactly `{bab-slug}.pdf.{page number, 1-based}.png` in `content-private/{subject}/`, matching what `api/pdf-content.js` looks up.
4. **Verify every page by actually reading the rendered image, not by estimating whether the content fits.** This is the single most repeated failure across both chapters built this way: dense content (a 2-column list + a table + a callout, or two medium tables stacked) reliably looks like it should fit on one `210mm×297mm` page and then silently clips at the bottom when actually rendered — the cut-off content is invisible in a quick glance, only visible if you open the image and read to the bottom. Don't just eyeball the image either — measure it: load the `.pdf-pages.html` in headless Chromium and read `.page-body`'s `scrollHeight` vs `clientHeight` for every page; any page where `scrollHeight > clientHeight` is silently clipping content that a screenshot alone can make easy to miss on a busy page. When in doubt, split into two pages rather than cramming; a 12-page PDF that's fully readable beats a 9-page one with two silently truncated pages. If a page is genuinely close but shouldn't be split, a `dense` modifier class on that page's `.page-body` (see `bab1-sel.pdf-pages.html` Page 2 for the pattern — tighter paragraph/callout margins and line-height, scoped to that one page only) can reclaim enough space without touching the font size or the content.

**By subject:**
- **Matematika, Fisika, Kimia** — equation-dense. Typeset via **LaTeX**, not plain text: proper fraction bars, aligned derivation steps, subscripts/superscripts, summation/integral notation. This is the actual reason the PDF path exists — the HTML page's inline KaTeX is fine for a formula or two, not for a full derivation or a page of worked problems.
- **Biologi, Ekonomi** — prose-first, same as the HTML page's voice. Use LaTeX only where an actual formula shows up (Hardy-Weinberg, reaction stoichiometry, SHU/break-even calculations) — don't typeset the whole document in LaTeX just because the tool is available. In practice, neither existing Biologi/Ekonomi chapter needed any LaTeX in its PDF at all once restructured this way — most of what moved to the PDF was tables/lists/narrative, not calculation.

**Content to include** (curated, not everything, but broader than the original "just extras" framing):
```
Chapter/topic summary
Definitions
Formulas (with every variable defined, units stated)
1-2 additional worked examples beyond what's on the HTML page
  (exam-style, multi-step — the PDF is where the harder ones live)
Common mistakes
A short additional practice set (can overlap with the quiz JSON, doesn't have to)
Everything static/non-interactive that used to be a card grid, table, or
  list in the HTML lesson — reproduced in full, not summarized
```

If a topic has nothing formula/advanced-example/reference-table-worthy at all, it's fine for the PDF to be thin — PDF value is evaluated per topic, not mandatory for every one. In practice this has not come up yet: both real chapters ended up with 9-12 pages once the static-content-migration above is applied honestly.

## 6. Subject-specific content rules

### Matematika
- Define every variable; state units/domain restrictions where relevant.
- Don't skip logical steps in a derivation to save space — an unexplained jump is worse than a longer explanation.
- Progression across worked examples: direct application → requires interpretation → multi-step → exam-style.
- Distinguish a *formula* (state it, use it) from a *derivation* (show why it's true) — not every formula needs its derivation on the HTML page; a genuinely useful one can live in the PDF instead.

### Fisika
- Always distinguish scalar vs vector, force vs net force, mass vs weight — these are the exact mix-ups SMA students make.
- Every equation gets: what it means, what each variable is, units, and the conditions/assumptions under which it holds (e.g. "berlaku untuk gerak lurus beraturan").
- Use a diagram wherever forces, motion, or spatial relationships matter — free-body diagrams especially.

### Kimia
- Separate what's observed (macroscopic) from what's happening at the particle level from how it's written symbolically — a common source of confusion.
- Balance every equation; state state symbols and reaction conditions when they matter.
- For molecular geometry: keep electron-domain geometry, molecular geometry, and hybridization distinct when the topic touches them.

### Biologi
- Prefer a causal chain over a list of facts. Not "mitokondria menghasilkan ATP" — walk through nutrient → respirasi seluler → gradien proton → ATP → kerja sel.
- Structure → function, cause → effect, process → outcome is the default explanatory shape.
- Diagrams earn their place here more than anywhere else — cell structures, processes, anatomy are genuinely easier to grasp visually. (`membran-sel.webp`, `sel-hewan-tumbuhan.webp` are the existing visual-quality bar.)

### Ekonomi
- Ground abstract concepts (badan usaha types, supply/demand, circular flow) in a concrete Indonesian economic example before generalizing — the existing chapter's "SHU calculator" pattern is the model: a real, workable calculation, not just the formula stated in the abstract.
- Distinguish positive statements (how the economy behaves) from normative ones (what a policy *should* do) when a topic touches policy.
- Formulas here are usually simpler than Math/Physics/Chemistry (SHU distribution, break-even, elasticity) — plain-text/inline KaTeX on the HTML page is usually enough; LaTeX in the PDF mainly earns its place for multi-step calculation walkthroughs.

## 7. Quality checklist before calling a topic done

```
[ ] Voice matches the existing chapters (casual, informal Bahasa Indonesia)
[ ] Any analogy is stated once for orientation, not carried literally into
    every following sentence/card as a running metaphor (see §1) — reread
    each section and check real terms (membran, protein, dst.) aren't
    replaced by the analogy's own vocabulary throughout
[ ] Every formula/equation: variables defined, units stated
[ ] Worked examples progress in difficulty, not just repeat the same step
[ ] At least one common-mistake/misconception called out where students
    actually get tripped up (not a generic "be careful")
[ ] Quiz JSON validated against the exact schema in §4 (correct is a
    valid 0-based index into that question's actual opts length, HTML
    entities render correctly) — one file, no exercise-root/.exercise.json
[ ] Quiz has real depth (see §4) — not a thin set just because the
    schema technically allows it
[ ] New HTML reuses existing section/card/accordion/tabswitch conventions —
    no new one-off classes without a reason
[ ] Static/non-interactive HTML content (card grids, tables, lists with no
    click/toggle behavior) moved to the PDF in full, not summarized in
    place — see §5's expanded framing before treating "PDF = just extras"
[ ] Standalone full-width note boxes (.jenis-box/.law-strip outside a grid)
    carry style="max-width:640px" to match the .section-head text column
[ ] Diagrams/3D embeds use .diagram-card (max-width:760px already handles
    sizing) — never inline a wider/narrower override per image
[ ] Sections that ended up short after PDF migration use class="... tight"
[ ] No functional/informational text under 11px — run
    `impeccable detect --json <changed file>` and fix any
    undersized-ui-text finding before calling it done
[ ] PDF content is genuinely curated and complete (formulas/advanced/
    exercises/full reference material), not a dump of the HTML page and
    not a thin stub that just says "see the HTML page"
[ ] Every .pdf-pages.html page actually rendered and visually read
    top-to-bottom for overflow/clipping — never shipped on estimation
[ ] .pdf-pages.html has no <div class="watermark"> or watermark-meta
    footer text — the real per-student watermark is drawn live by the
    viewer, baking one in duplicates it with wrong/placeholder identity
[ ] Any 3D/external embed uses a real, user-supplied URL (never invented)
    and includes full working attribution links (.model3d-credit)
[ ] No fabricated facts, stats, or sources
[ ] Chapter reviewed against the two existing same-subject chapters (if any)
    for consistent depth and terminology
```

## 8. Reference material

`docs/content-engine/CLAUDE.md`, `CURRICULUM_MAPPING.md`, `CONTENT_GENERATION.md` — the original, general-purpose framework this guide was distilled from. Useful for the underlying pedagogical reasoning (learning-objective phrasing, misconception-detection patterns, batch-generation discipline, the gold-standard-chapter idea) and for the curriculum-mapping phase (Notion ingestion) once that's wired up. Not everything in them applies directly — where they conflict with this file (schema, architecture, format), this file wins for Dalton Lab.
