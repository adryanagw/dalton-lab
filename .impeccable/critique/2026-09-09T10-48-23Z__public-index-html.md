---
target: semua page (whole site — index.html shell + all views + content-private chapters)
total_score: 28
max_score: 40
na_heuristics: 
p0_count: 1
p1_count: 4
target_identity: "file:/home/user/dalton-lab/public/index.html"
target_fingerprint: "sha256:9faec8d796fe8f886337389852a06612f8361c039158d190e891d31f12944d7b"
target_path: /home/user/dalton-lab/public/index.html
timestamp: 2026-09-09T10-48-23Z
slug: public-index-html
---
Method: dual-agent (A: Impeccable critique Assessment A · B: Impeccable critique Assessment B)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Session badge, expiry pill, progress badges all work live; the lesson-fetch error state has no in-place retry, only "refresh the page." |
| 2 | Match System / Real World | 4 | Natural, correct Bahasa Indonesia throughout; domain-correct terms (SHU, BUMN/BUMD); voice matches the "santai" brand commitment. |
| 3 | User Control and Freedom | 3 | Back links present everywhere, but "Kembali ke login" doesn't actually collapse the packages panel (see P2 below). |
| 4 | Consistency and Standards | 2 | Two incompatible "book cover" visual systems on the same page (illustrated PNGs on the subject grid vs. a flat CSS-gradient mini-cover on the continue-banner). |
| 5 | Error Prevention | 3 | Sign-in/order forms have dedicated error slots; separately, a literal invisible-text bug exists in shipped chapter content (see P0) — not an "error prevention" failure exactly, but a shipped-content defect. |
| 6 | Recognition Rather Than Recall | 3 | Sidebar always shows active section + identity + expiry — but 5 form inputs have no programmatic accessible name (see P1), a real recognition failure for assistive-tech users. |
| 7 | Flexibility and Efficiency | 2 | "Lanjutkan Belajar" is a good shortcut, but close to the only one; the generic sign-in flow forces every returning visitor through the same full form. |
| 8 | Aesthetic and Minimalist Design | 2 | Home is rich and considered; Sign-in/Bab-picker/Lesson feel structurally sparse, plus widespread undersized UI text (10.5–10.9px status badges, below the 11px functional floor) and one skipped heading level. |
| 9 | Error Recovery | 3 | Lesson-fetch error copy is actionable; sign-in error slot exists. |
| 10 | Help and Documentation | 3 | The WhatsApp-to-founder line functions as real, prominent help — better than a generic FAQ. |
| **Total** | | **28/40** | **Good** |

## Design Specificity Verdict

**LLM assessment:** This is not a generic edtech template wearing a coat of paint. The chapter content is genuinely authored for this subject and audience — a badan-usaha-vs-perusahaan comparison component, a sector grid naming real Indonesian companies (Pertamina, Freeport, Telkom, Alfamart, Indofood), tabs for the six legal business structures with real statutory citations (UU No. 19 Tahun 2003, PP No. 54 Tahun 2017). The brand system (navy/orange/cream, Space Grotesk + Inter + IBM Plex Mono for numerals) is applied consistently, and the WhatsApp-direct-to-founder differentiator is surfaced repeatedly, not just claimed once in copy.

Where it slips into "generic/unfinished" territory is the shell, not the content: a structural layout bug that left the footer floating with dead space beneath it on every short page (see below — already fixed mid-run), and a visible seam between two different eras of visual asset for the same concept ("subject cover") on the same screen.

**Deterministic scan:** The bundled detector ran against `public/index.html` (4 findings) and `content-private/` (19 findings across the 3 real chapters). Two of the four `index.html` findings — `overused-font` (Space Grotesk/Inter pairing) and `cream-palette` — are **false positives**: PRODUCT.md explicitly names both as deliberate, already-verified brand choices. A third, `dark-glow` (a colored box-shadow using the navy brand color), is **not** covered by that carve-out and is worth a quick manual look to confirm it's intentional rather than an accepted-by-omission finding.

Everything else is real and not brand-covered: a **literal invisible-text bug** in `content-private/ekonomi/bab1-badan-usaha.html` (white `#ffffff` text on white `#ffffff` background, contrast 1.0:1 against a 4.5:1 requirement), 5 instances of body text under the 12px floor, cramped section padding across all 3 chapters, and — from live browser evidence — a skipped heading level on the bab-picker (`<h1>` straight to `<h4>`, no `<h2>`), text bleeding off the right edge of the viewport at mobile width (390px, up to -178px overflow), and 5 form inputs (`signinUsername`, `signinPassword`, `orderNama`, `orderWa`, `orderUsername`) with `<label>` elements that have no `for` attribute and don't wrap the input — no programmatic accessible name.

**Visual overlays:** Both assessments ran fully headless (Playwright/Chromium against a local static server) — there is no interactive `[Human]` browser tab to point you to in this run; all findings above come from the detector's console output and direct DOM/computed-style inspection, not a live visual overlay you can scroll through yourself.

## Overall Impression

The gut reaction: the content is the strongest part of this product and it doesn't feel generic at all — the shell around it is what's dragging the "elegant" impression down, and it's dragging it down for a very findable reason. One P0 (a floating footer leaving dead space on every short page — and since every subject currently has exactly one Bab, that's most pages you'll actually see) was independently caught by Assessment A's live screenshots and **was already fixed and shipped mid-run** (PR #8) once I saw your report of it. The single biggest remaining opportunity is closing the gap between the two different "book cover" visual languages now living on the same homepage — the illustrated PNG covers vs. the flat-gradient continue-banner mini-cover — because that seam sits on the page every returning student sees first.

## What's Working

1. **The `compare-card`/`sector-grid` teaching components in the Ekonomi chapter** — purpose-built, using real Indonesian company examples, not generic bullet lists. This is what "authored specifically for this audience" looks like in code.
2. **The tutor-strip + floating WhatsApp button** — the founder-access differentiator from PRODUCT.md isn't just claimed in copy, it's a persistent, tappable UI element on every screen.
3. **Progress system honesty** — session badge with real expiry date, per-bab status badges, subject-level progress bar — all derived from actual state, correctly respecting the "no invented stats" constraint from PRODUCT.md.

## Priority Issues

**[P0] Invisible text in shipped chapter content — white text on a white background**
- **What**: `content-private/ekonomi/bab1-badan-usaha.html` renders body text at `#ffffff` on a `#ffffff` background in at least one place (contrast 1.0:1; three more spots on the same file measure 1.6:1, both far under the 4.5:1 AA floor).
- **Why it matters**: This isn't a design-taste issue, it's content a student literally cannot read — on the one chapter most likely to be someone's first impression of the product.
- **Fix**: This lives in `content-private/`, which PRODUCT.md marks as owned by the separate chapter-builder workflow, not something this session hand-edits. Flag it for a chapter-builder pass rather than patching it here.
- **Suggested command**: `/impeccable audit` (to confirm scope/severity before routing to chapter-builder — not a fix run against this repo's shell).

**[P1] Hero illustration breaks in dark mode**
- **What**: `home-illustration.png` has a light/cream angled backdrop baked into the asset itself. It blends into the page in light mode, but produces a stark white diagonal polygon slicing across the homepage in dark mode.
- **Why it matters**: PRODUCT.md commits to full light/dark support — this is the one asset visibly not designed with dark mode in mind, and it's the largest single visual element on the homepage.
- **Fix**: Re-export with a transparent background, or crop/mask so no rectangular/angled backdrop ships with the art.
- **Suggested command**: `/impeccable adapt`

**[P1] Two incompatible visual systems for "subject identity" on one page**
- **What**: The home subject grid uses illustrated PNG book covers. The "Lanjutkan Belajar" continue-banner ~200px below it, on the same screen, uses a different, older component — a flat CSS-gradient rectangle with the chapter title typed on top a second time (it's already stated once in the banner text next to it).
- **Why it matters**: A direct, side-by-side visual inconsistency on the page a returning student sees most — reads as two design eras stitched together, and the repeated title adds noise without adding information.
- **Fix**: Replace the mini-cover with a small crop of the same illustrated cover art used on the subject grid; drop the duplicated title.
- **Suggested command**: `/impeccable polish`

**[P1] Five form inputs have no programmatic accessible name**
- **What**: `signinUsername`, `signinPassword`, `orderNama`, `orderWa`, `orderUsername` each sit next to a `<label>` — but none of those labels carry a `for` attribute matching the input's `id`, and none wrap the input. A screen reader announces these fields with no name.
- **Why it matters**: PRODUCT.md names WCAG AA as "established working practice, not a nice-to-have" — this is a direct, verifiable gap against that standard, on the two forms every paying customer must use (sign-in, order).
- **Fix**: Add `for="<input-id>"` to each label (or wrap the input in it).
- **Suggested command**: `/impeccable harden`

**[P1] Body text overflows the viewport at mobile width**
- **What**: At 390px width, several `<p>` elements bleed off the right edge of the screen — measured overflow of -62px to -178px past the viewport boundary, on 4 separate paragraphs.
- **Why it matters**: This is a hard, measurable mobile layout defect (not a taste call), and mobile is where a student under exam pressure is most likely to be ("Casey" persona below).
- **Fix**: Track down the missing `max-width`/`overflow-wrap` on the affected paragraphs at the 390px breakpoint.
- **Suggested command**: `/impeccable adapt`

## Persona Red Flags

**Sam (Accessibility-Dependent)**
- The 5 unlabeled form inputs above (P1) mean a screen-reader user cannot tell which field is username vs. password, or which order-form field they're filling, without guessing from placeholder text alone.
- Status badges ("Tersedia"/"Segera Hadir") and the session-expiry pill render at 10.5–10.9px — under most browsers' comfortable minimum and the detector's own 11px functional-text floor — a real strain for low-vision users even before screen-reader concerns.
- The bab-picker's heading hierarchy skips a level (`<h1>` "Ekonomi" straight to `<h4>` "Badan Usaha, Koperasi & Manajemen", no `<h2>`) — screen-reader users who navigate by heading level will perceive a broken document outline.

**Riley (Stress-Tester / the actual target user — SMA student under exam pressure)**
- Expired access is signaled only by a small pill tucked in the sidebar footer — the Home hero (greeting, subtext, illustration, subject grid) renders pixel-identical whether a paying student's access is active or lapsed. Someone cramming before an exam, expecting to jump straight into material, discovers the paywall only after clicking into a subject.
- Every "ready" subject has exactly one Bab, and the bab-picker gives no sense of total exam coverage or roadmap — for someone under UTBK pressure, "is this all there is, or is more coming?" is a real trust cost, not just a content gap.
- The lesson-fetch failure state offers only "coba refresh," no in-place retry — an extra full-page-reload tax at the exact moment focus is scarce.

**Casey (Distracted Mobile User)**
- The floating WhatsApp button visually overlaps the Biologi subject card's cover art at 390px width, obscuring part of the illustration and sitting inside the card's own tap target.
- The mobile sidebar drawer's backdrop scrim is translucent enough that body text underneath remains legible through it, undermining the drawer's read as a firm modal focus state.
- (See also the P1 viewport-overflow finding above — directly a mobile-first problem.)

## Minor Observations

- **Generic sign-in stacks the packages panel instead of replacing the login form.** Clicking "Belum punya akses? Lihat paket →" from the sidebar's generic "Masuk" entry only toggles the packages panel's visibility — the login card stays visible above it, so the page grows to show two competing, visually mismatched decision surfaces (a light minimal card, then a dark gradient pricing panel) stacked in one scroll. The subject-specific expired-package entry point already does this correctly (swaps panels instead of stacking). Worth mirroring that logic on the generic path. (`/impeccable clarify`)
- **Expired access gets no dedicated visual treatment on Home** — the highest-stakes moment for a returning paying student (discovering their access lapsed) currently has zero acknowledgment on the page they land on first. (`/impeccable harden`)
- **`styles.css`'s own comment on the mini book-cover component** already flags it as a "still used" legacy pattern — the code documents the inconsistency found above.
- Line length on the bab-picker's subject description runs ~151 characters/line with no `max-width` — well past a comfortable reading measure.
- `dark-glow` (a navy-colored box-shadow) was flagged by the detector and isn't covered by PRODUCT.md's brand-choice carve-out the way the font pairing and cream palette are — worth a quick look to confirm it's intentional.
- Font-loading `ERR_CONNECTION_RESET` console errors seen during testing are a sandbox network-egress artifact (no route to Google Fonts from this environment), not a site defect — mentioned only so it isn't mistaken for one.
- Kimia/Fisika's "Segera Hadir" empty state is genuinely well handled — ties the dead end straight to a WhatsApp CTA instead of a bare "coming soon."

## Questions to Consider

- What if the continue-banner's mini cover were simply a crop of the real illustrated subject art instead of the legacy flat-gradient placeholder — given how visible this seam is on the page returning students see most, how much of the overall "not elegant" impression would shift from fixing just that one element?
- What if the expired-access state got the same visual weight as the order-success screen (dedicated hero copy, warm reassurance, one-click renew) instead of a small pill — would that change how safe a paying student feels about staying subscribed?
- What if the two "Segera Hadir" subjects were visually demoted (smaller, muted, below the fold) instead of shown at equal weight to the three real subjects — would that alone bring the home page's primary decision back under a comfortable choice count?
