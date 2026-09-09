---
target: the whole page (homepage)
total_score: 28
max_score: 36
na_heuristics: 10
p0_count: 1
p1_count: 1
target_identity: "file:/home/user/dalton-lab/public/index.html"
target_fingerprint: "sha256:9694d4a3c98b64c01dbc9395000c8c114f93148de2af0453706f93067d832335"
target_path: /home/user/dalton-lab/public/index.html
timestamp: 2026-09-09T04-28-09Z
slug: public-index-html
---
Method: dual-agent (A: general-purpose design-review subagent · B: general-purpose detector/browser-evidence subagent)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Continue-banner metadata is clear, but `fetchProgress()` fails silently on error and can pop the banner in late with a layout shift |
| 2 | Match Between System and Real World | 4 | Terminology, tone, and WhatsApp-native flow all match how an Indonesian SMA student actually thinks |
| 3 | User Control and Freedom | 3 | Logout/theme toggle are clean; no way to dismiss the continue-banner if it's not what you want right now |
| 4 | Consistency and Standards | 3 | Same 5 subjects rendered 3 different visual ways on one screen (nav icons, colored cards, plain meta rows) |
| 5 | Error Prevention | 3 | Little error-prone surface here; logout has no confirm but is non-destructive |
| 6 | Recognition Rather Than Recall | 4 | Full descriptions + personalized greeting + continue-banner metadata — nothing to memorize |
| 7 | Flexibility and Efficiency of Use | 3 | Continue-banner is a genuine expert shortcut; no other accelerators, but scope doesn't obviously need more |
| 8 | Aesthetic and Minimalist Design | 2 | Duplicate name+description per subject card, triple-rendered subject list, decorative hero glow competing with the actual decision |
| 9 | Error Recovery | 3 | No visible error states on this view; the one failure path (progress fetch) degrades silently |
| 10 | Help and Documentation | n/a | No task here needs in-context help; the product's real "help channel" is direct WhatsApp access to the creator — a deliberate substitute, not a gap |
| **Total** | | **28/36** | **Good** (78%) |

## Design Specificity Verdict

**LLM assessment:** This reads as genuinely authored for this product, not a reskinned template. The strongest evidence: casual native-Indonesian copy ("Mau belajar apa hari ini?", "Segera Hadir"), the "book cover" gradient cards (3:4 spine ratio) reinforcing a textbook metaphor instead of a generic icon-tile grid, IBM Plex Mono numerals giving data its own texture, and a continue-banner built specifically around "resume the one bab you left mid-way" — an exam-crammer's mental model, not a generic "recently viewed" widget. The color-per-subject system is semantic and consistent across the nav, cards, and (per PRODUCT.md) chapter pages — a real IA decision.

Where it slips toward category-interchangeable: the hero illustration is a polished, generic "student at a laptop with sticky notes and a coffee mug" flat illustration, near-identical in genre to stock EdTech marketing art. Its only bespoke touches are the subject-labeled book spines and a tiny logo doodle. Given this product's own history of deliberately redesigning away from an "AI-generated" feel, the single largest visual element on the page is the piece most likely to still read that way to a design-literate visitor.

**Deterministic scan:** The static CLI detector (`impeccable detect --json`) found 66 findings across `index.html` and `styles.css` — 62 `overused-font` (Inter + Space Grotesk, repeated per declaration), 1 `cream-palette`, 1 `dark-glow` (WhatsApp button's brand-green pulse). All three exactly match this project's own documented, deliberate baseline — no new CLI-detected regressions.

The **browser-rendered overlay scan** (which measures actual computed styles on the live DOM, not just source patterns) found a materially different and non-overlapping set: **5 low-contrast text/background pairs, all of them the white text on every colored subject card** (measured live at #fff on #e8a33d ≈2.2:1, on #3fa15c ≈3.2:1, on #2f7edb ≈4.1:1, on #e2447e ≈3.9:1, on #8b5cf6 ≈4.2:1 — I independently recomputed these from the actual CSS values and confirm them: the card body text and status-pill text both land between 1.8:1 and 4.2:1 depending on the color, all below the 4.5:1 AA floor), several **undersized-text** instances (~10px status-pill labels: "Tersedia", "Segera Hadir", "Hemat 12%", "Paling Worth It"), one **clipped-overflow-container** flag on `section.hero` (I checked: `.hero` combines `overflow:hidden` with `position:relative` as a general pattern; nothing currently positioned inside it on the homepage is actually being visibly clipped — this is a latent risk, not an active visual bug today), and one **radial-spotlight-glow** flag on the hero's decorative radial-gradient wash (a recognizable "AI-generated UI" signature, same family as the accent-bar pattern this project already redesigned away from elsewhere).

**False positive found:** the browser scan also reported a "line-length too long" finding attributed to "the search input." I verified directly against the source — **there is no search input anywhere on this page** (the only `<input>` elements are in the hidden sign-in/order form, not part of the home view). This finding is a mislabeling by the detector's overlay and should be disregarded.

## Overall Impression

The bones are genuinely good — a personalized, high-utility continue-banner and a distinctive color-coded book-cover metaphor that a template redesign wouldn't have produced. But the newest component (the colored subject cards from the most recent redesign pass) shipped with a real, measurable accessibility regression: every card's own text fails contrast against its own background, on the page's single most important decision surface. That's the biggest opportunity here — not a new idea, but finishing the one already on screen.

## What's Working

1. **The continue-banner** — exact chapter title, subject, time estimate, and subbab count on one high-contrast card with a single CTA. It's a real, audience-specific shortcut for a returning crammer, and it correctly outranks everything else on the page for the user who most needs speed.
2. **The book-cover color system** — semantic, not decorative: amber/green/blue/pink/purple map consistently to subject identity across the nav and cards, giving Dalton Lab a real visual signature against flat-icon competitors.
3. **Copy voice** — reads like something an actual Indonesian SMA student would say to themselves, not a translated corporate line. This alone does a lot of the "built for us" work.

## Priority Issues

**[P0] Every subject card fails text contrast against its own background.** White title/description text sits directly on solid gradient fills (amber, green, blue, pink, purple) at ratios between 1.8:1 and 4.2:1 — all below WCAG AA's 4.5:1, with amber as low as ~2.2:1. The status pill ("Tersedia"/"Segera Hadir") compounds this with translucent-white-on-white at similarly poor ratios. This is the page's primary decision surface — the thing every visitor is looking at to pick a subject — and it's also a direct miss against this project's own stated WCAG AA working bar. The personalized greeting ("Halo, {nama}!") has the same class of problem at a smaller scale: `--orange-dark` on `--paper` computes to 3.48:1, also below AA.
**Why it matters:** low-vision and many normal-vision users in bright light will struggle to read the card text and status at all — on the one screen where reading it correctly determines what they click next.
**Fix:** darken the five card base colors (or drop an opacity scrim under the text) until white text clears 4.5:1 on each; give the status pill a solid, per-subject-appropriate high-contrast fill instead of translucent white-on-color; darken `--orange-dark` specifically for text-on-paper contexts (it can stay lighter for accents/icons where it isn't carrying text).
**Suggested command:** `/impeccable harden` or `/impeccable audit` (accessibility-focused pass)

**[P1] Every ready subject's name and description is rendered twice per card.** `renderSubjectGrid()` prints the same text in `.book-cover h3/p` and again in `.subject-meta .subj-meta-name/p` — confirmed in code and visible in screenshots as literally repeated strings, back to back. This is the single biggest contributor to an unusually long mobile scroll (the homepage renders to ~4000px on a 390-wide viewport) and adds pure re-reading burden on desktop.
**Why it matters:** cognitive load checklist failure — a student scans the same sentence twice per subject, five times over, before reaching the tutor CTA or footer.
**Fix:** pick one representation per card. Keep the colored cover as the primary label+description, and reduce the meta row underneath to just an icon and a chevron/affordance — not a second copy of the same sentence.
**Suggested command:** `/impeccable distill`

**[P2] "Segera Hadir" subjects are true dead ends, including for keyboard users.** `makeRowFocusable()` explicitly skips elements with the `soon` class, and this was confirmed live by tabbing through the page: focus jumps from Matematika straight to the WhatsApp button, skipping Kimia and Fisika entirely. There's also no capture mechanism for a student who came specifically for one of those two — both real UTBK subjects.
**Why it matters:** this is a real acquisition loss (2 of 5 core subjects offer no path forward) and an accessibility gap (keyboard users can't even perceive the cards exist as page content).
**Fix:** make soon-cards focusable with `aria-disabled="true"` rather than invisible to tab order; add a lightweight "kasih tau kalau udah ada" WhatsApp-linked affordance so interested students aren't a dead end.
**Suggested command:** `/impeccable harden`

**[P2] The stated differentiators never appear on the homepage.** Per product positioning, Dalton Lab's two real differentiators are (1) advanced/leveled practice deeper than Ruangguru/Zenius/Quipper-style competitors, and (2) direct WhatsApp access to the actual content creator, not a CS queue. Neither appears in the homepage copy. The one relevant section (`.tutor-strip`, "Mau belajar bareng tutor asli lewat Zoom?") actually reads as scheduled live tutoring — which undersells and slightly misrepresents the real pitch.
**Why it matters:** a first-time visitor has no way to know why Dalton Lab beats the free-content alternatives they already know about.
**Fix:** state the differentiator explicitly near the hero or the tutor-strip — e.g. "Chat langsung sama yang bikin soalnya, bukan CS," plus a line naming the exercise-depth angle.
**Suggested command:** `/impeccable clarify`

**[P3] Decorative hero glow + triple-rendered subject list.** The hero's radial-gradient orange wash is a recognizable "AI-generated UI" signature (same family this project already redesigned away from elsewhere — accent-bar callouts, cream-palette). Separately, the same 5 subjects appear three times on one screen (nav switcher, cards, meta rows), and mobile cards keep a fixed 3:4 aspect ratio at full column width rather than tightening into a denser layout.
**Why it matters:** polish-level, but consistent with this project's own stated goal of not reading as generic/AI-templated.
**Fix:** drop or substantially soften the radial glow; on mobile, consider a denser 2-column card grid once the P1 duplicate-content fix removes the meta-row repetition anyway.
**Suggested command:** `/impeccable quieter`

## Persona Red Flags

**Jordan (confused first-timer, logged-out desktop):**
- Sees each subject's name+description twice per card before realizing they're one item (the two renderings differ in style, so it doesn't read as an obvious duplicate at a glance).
- Clicking Kimia or Fisika leads nowhere with no path to be notified later.
- Never learns the actual differentiator anywhere on the page — the tutor-strip pitches generic Zoom tutoring instead of "message the person who wrote this."

**Casey (distracted mobile user):**
- Must scroll roughly 4000px of mostly-repetitive content before reaching the WhatsApp CTA and footer.
- On the logged-in dark-mode mobile view, the floating WhatsApp bubble sits right at the transition from continue-banner into the rest of the page — a cluttered tap zone at exactly the point a thumb is scrolling fastest.
- The nav brand subtext wraps to two lines at 390px, cramping the header next to the theme toggle and hamburger.

**Sam (keyboard/contrast-dependent):**
- Confirmed live via tabbing: focus order skips Kimia and Fisika entirely.
- The personalized greeting and the "Tersedia"/"Segera Hadir" labels — arguably the two most information-bearing short strings on the page — are also measurably the worst-contrast text on it (≈3.48:1 and ≈1.8–3:1 respectively).

## Minor Observations

- `.wa-float-pulse` runs an infinite 2.6s animation on every load (does respect `prefers-reduced-motion`, confirmed).
- Nav subject-switcher icons are monochrome outlines while the cards use the semantic color system — a missed reinforcement of the color-per-subject mnemonic.
- Footer still lists only "Matematika · Biologi · Ekonomi" — accurate today, but a maintenance trap the moment Kimia/Fisika ship real content.
- The `clipped-overflow-container` detector flag on `.hero` isn't causing a visible bug today (nothing positioned inside it is actually being clipped) but is worth remembering before adding any absolutely-positioned decoration there later.

## Questions to Consider

- What if, for a returning logged-in student, the entire above-the-fold hero *became* the continue-banner — dropping the generic greeting and illustration for that session — so their first frame is 100% "pick up where you left off"?
- What if the WhatsApp-to-the-actual-creator differentiator were shown as a concrete artifact (a small real chat-exchange mockup) instead of only implied by a floating icon and a generic tutor strip?
- Does the homepage need Kimia/Fisika visible at all before they have content, or would "3 mapel sekarang, 2 lagi ditulis" undersell less than two dead cards do?
