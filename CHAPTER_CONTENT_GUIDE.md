# Dalton Lab — Chapter Content Generation Guide

## What this file is

A distilled, Dalton-Lab-specific operating guide for the agent that writes chapter content (the `dalton-lab-chapter-builder` skill, run locally). It adapts the general-purpose methodology in `docs/content-engine/` (`CLAUDE.md`, `CURRICULUM_MAPPING.md`, `CONTENT_GENERATION.md`) to this project's actual architecture and audience. Read those three for the full reasoning; read this one for what to actually do.

**Scope of this file:** chapter *content* generation only — HTML lesson + PDF companion for a topic that's already been decided (subject, class, chapter, topic name). Curriculum ingestion/mapping from Notion is a separate, earlier phase and isn't covered here.

## The one thing that's different from the uploaded docs

Those docs assume a presentation-independent JSON schema rendered by a generic engine. **This project doesn't do that, and this pass doesn't change it.** Chapters are hand-authored HTML files (`content-private/{subject}/babN-slug.html`) plus sibling JSON files for quiz and exercises, served only through authenticated `/api/content` calls — never as static files. The web-shell (`public/`, `api/*`) is built and maintained in a separate session; this guide and the local chapter-builder agent never touch it.

**What's new:** every chapter also gets a PDF companion, generated from the same content spec, focused on formulas/advanced concepts/worked examples — not a dump of the HTML page. See §5.

## 1. Audience and voice

Indonesian SMA (senior high) students prepping for UTBK/Ujian Sekolah. Not curious hobbyists — they came for a specific test.

- **Language:** casual, informal Bahasa Indonesia ("santai, nggak kaku"), same register as the existing chapters (`bab1-eksponen-logaritma.html`, `bab1-sel.html`, `bab1-badan-usaha.html` are the voice reference — read one before writing).
- **Depth over breadth.** Advanced-level leveled exercises per bab is the actual differentiator (see PRODUCT.md) — don't write a shallow summary chapter to cover more ground faster.
- Never invent statistics, testimonials, or citations. If a claim needs a source, say so instead of fabricating one.

## 2. Content structure per topic

Not a rigid template — sections below are typical, not mandatory. Skip what a simple topic doesn't need; expand what an advanced one does.

```
1. Hook / quick intuition           (1-2 sentences before any formalism)
2. Core concept, plain language
3. Formal definition / formula      (LaTeX where applicable — see §4)
4. Worked example(s)                (progressing basic → exam-style)
5. Common mistakes / misconceptions (❌ salah paham → ✅ paham yang benar)
6. Leveled exercises                (basic / intermediate / advanced — see §3)
7. Quiz                             (single set, mixed difficulty)
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
- **Leveled exercises mount point:**
  ```html
  <div class="exercise-root"
       data-exercise-subject="matematika"
       data-exercise-bab="bab1-eksponen-logaritma"
       data-exercise-topic="eksponen"></div>
  ```
  One mount point per exercise topic; the JS engine loads the matching `.{topic}.exercise.json` file.

**Do not invent new generic engines.** If a chapter seems to need one (e.g. a new interaction type), that's a web-shell change — flag it for the other session rather than hacking it into chapter HTML.

## 4. Quiz and exercise JSON — exact schema

**Quiz** (`babN-slug.quiz.json`) — flat array, single difficulty, covers the whole chapter:

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

**Leveled exercise** (`babN-slug.{topic}.exercise.json`) — one file per topic within the chapter, three tiers, same question shape as above nested under each:

```json
{
  "topic": "Eksponen",
  "basic": [ { "q": "...", "opts": [...], "correct": 0, "explain": "..." } ],
  "intermediate": [ ... ],
  "advanced": [ ... ]
}
```

Existing chapters use ~4 questions per tier as a rough baseline, not a hard rule. `correct` is a 0-based index into `opts`. `explain` should teach the reasoning, not just restate the answer — a student getting it wrong should understand why after reading it.

## 5. PDF companion — what actually goes in it

The PDF is not a export-to-PDF of the HTML page. It's a separate, curated document: **formulas, advanced concepts, and worked exercise examples** — the material that benefits from print/offline/dense reference, not the intuition-building prose that already lives on the page. Read-only, rendered as images (not a native embed) per the earlier decision in this thread, with a student-identity watermark once that viewer exists.

**Page template:** every PDF page is built as one `.pdf-page[data-subject="..."]` block from `public/assets/pdf-template/page-template.html` — bright per-subject accent frame around a white reading sheet, branded header (logo + wordmark + subject/chapter meta), diagonal student-identity watermark, footer with license text. Reuse its classes (`.formula-box`, `.example-box`, `.callout.mistake`, etc.) rather than inventing new page markup per chapter. Only `ekonomi` has an `--accent` color defined so far — other subjects get theirs added there once decided, not invented per-chapter.

**Spec file:** write the page-by-page PDF content spec to `content-private/{subject}/babN-slug.pdf-spec.md`, a sibling of the chapter's HTML/JSON — see `content-private/ekonomi/bab1-badan-usaha.pdf-spec.md` for the format. This is the spec a future render pipeline consumes; it is not the rendered PDF itself.

**By subject:**
- **Matematika, Fisika, Kimia** — equation-dense. Typeset via **LaTeX**, not plain text: proper fraction bars, aligned derivation steps, subscripts/superscripts, summation/integral notation. This is the actual reason the PDF path exists — the HTML page's inline KaTeX is fine for a formula or two, not for a full derivation or a page of worked problems.
- **Biologi, Ekonomi** — prose-first, same as the HTML page's voice. Use LaTeX only where an actual formula shows up (Hardy-Weinberg, reaction stoichiometry, SHU/break-even calculations) — don't typeset the whole document in LaTeX just because the tool is available.

**Content to include** (curated, not everything):
```
Chapter/topic summary
Definitions
Formulas (with every variable defined, units stated)
1-2 additional worked examples beyond what's on the HTML page
  (exam-style, multi-step — the PDF is where the harder ones live)
Common mistakes
A short additional practice set (can overlap with the exercise JSON, doesn't have to)
```

If a topic has nothing formula/advanced-example-worthy (e.g. a purely conceptual biology topic), it's fine for the PDF to be thin or skipped — PDF value is evaluated per topic, not mandatory for every one.

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
[ ] Every formula/equation: variables defined, units stated
[ ] Worked examples progress in difficulty, not just repeat the same step
[ ] At least one common-mistake/misconception called out where students
    actually get tripped up (not a generic "be careful")
[ ] Quiz + exercise JSON validated against the exact schema in §4
    (correct is a valid 0-based index, HTML entities render correctly)
[ ] New HTML reuses existing section/card/accordion/tabswitch conventions —
    no new one-off classes without a reason
[ ] PDF content is genuinely curated (formulas/advanced/exercises), not a
    dump of the HTML page
[ ] No fabricated facts, stats, or sources
[ ] Chapter reviewed against the two existing same-subject chapters (if any)
    for consistent depth and terminology
```

## 8. Reference material

`docs/content-engine/CLAUDE.md`, `CURRICULUM_MAPPING.md`, `CONTENT_GENERATION.md` — the original, general-purpose framework this guide was distilled from. Useful for the underlying pedagogical reasoning (learning-objective phrasing, misconception-detection patterns, batch-generation discipline, the gold-standard-chapter idea) and for the curriculum-mapping phase (Notion ingestion) once that's wired up. Not everything in them applies directly — where they conflict with this file (schema, architecture, format), this file wins for Dalton Lab.
