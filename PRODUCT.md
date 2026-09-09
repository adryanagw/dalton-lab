# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Indonesian SMA (senior high school) students, primarily preparing for UTBK and Ujian Sekolah. They come to Dalton Lab specifically for exam prep, not general browsing — the job is "get ready for a specific test," not "explore a subject casually."

## Product Purpose

Dalton Lab gives SMA students deep, exam-focused material per chapter (rangkuman + leveled/advanced latihan + interactive kuis) instead of broad, shallow coverage. Success means a student can open a bab, work through progressively harder exercises, and walk away actually ready for that topic on the exam — not just having skimmed a summary.

## Positioning

Two things a neighboring product can't truthfully copy:
1. **Advanced-level practice per bab.** The leveled-exercise system (3 tiers of difficulty per chapter) goes deeper than the broad-but-shallow coverage of Ruangguru/Zenius/Quipper-style platforms.
2. **Direct personal access to the actual content creator**, via WhatsApp — not a CS queue or a rotating tutor pool. Students can ask the person who wrote the material, not a generic support line.

## Operating Context

- Students land on the public site (dalton-lab.vercel.app), pick a subject, and either read/exercise/quiz immediately (if logged in with active access) or hit a paywall.
- Paywall flow: student picks a package (30/90/365 hari), submits an order, gets a WhatsApp deep-link with payment instructions, sends proof of payment manually. The founder (Allen/Adryan) reviews and approves orders by hand in a separate internal admin panel (`admin.html`), which grants the time-boxed access.
- **This manual WhatsApp+admin-approval flow is explicitly temporary** — a stopgap until a real payment gateway (Midtrans/Xendit-class) is integrated. Design/engineering should not over-fit to "manual forever."
- Chapter content, quizzes, and leveled exercises are authored through a **separate local workflow** ("chapter-builder", run by the founder on their own machine) and only ever reach students through authenticated `/api/*` endpoints — never as static files. Web-shell work in this repo/session must not hand-edit `content-private/*.html` directly, to avoid colliding with that parallel authoring process.
- Progress (per-chapter started/completed) and quiz results are tracked server-side per student account, so they follow the student across devices/sessions.

## Capabilities and Constraints

- Static HTML/CSS/vanilla JS frontend (`public/`) + Vercel serverless functions (`api/*`, Node/CommonJS) + Neon serverless Postgres (`users`, `orders`, `progress`, `quiz_results` tables, self-provisioning schema).
- Auth: HMAC-signed session tokens (student vs admin roles), scrypt password hashing — no external auth provider.
- Content gating: `/api/content`, `/api/quiz`, `/api/exercise` all require a valid, unexpired student token. `content-private/` is excluded from the public Vercel output directory.
- Only 3 subjects have real content today — Ekonomi, Biologi, Matematika, **one chapter (Bab 1) each**. Kimia and Fisika are catalog-listed as "Segera Hadir" with zero content; the catalog (`subjectsData` in `app.js`) is the single place new subjects/chapters get registered.
- Generic, reusable JS "engines" (accordion, tab-switch, quiz, 3-level leveled exercise) are driven by data-attributes in chapter HTML — a new chapter needs zero new JavaScript.
- KaTeX is self-hosted/vendored (not CDN-loaded) for math rendering.
- No payment gateway integration yet (see Operating Context) — WhatsApp number is real and live: `6282136673896`.

## Brand Commitments

- Name: **Dalton Lab**. Logo mark: a stylized orbiting "D".
- Visual identity (established via a dedicated redesign pass, not up for casual re-litigation): deep navy (`#0d1b2e`) + warm orange (`#ee7d31`) + warm cream/paper background; Space Grotesk (headings/data labels) + Inter (body) + IBM Plex Mono (numerals — chapter numbers, scores, prices, percentages); full light/dark theme support.
- Direction: editorial/"textbook," explicitly not a generic corporate-SaaS-dashboard look. Verified against the bundled Impeccable detector — the only findings left open (font pairing, cream palette) are deliberate choices, not defects.
- Voice: casual, informal Bahasa Indonesia ("santai, nggak kaku") — deliberately revised away from stiffer/more formal copy.
- WhatsApp (`6282136673896`) is a real, live, dual-purpose channel: package purchase/payment proof, and tutor-session (Zoom) inquiries.

## Evidence on Hand

- Real chapter content: Ekonomi Bab 1 (Badan Usaha, Koperasi & Manajemen), Biologi Bab 1 (Sel: Unit Dasar Kehidupan), Matematika Bab 1 (Eksponen & Logaritma).
- Real pricing: Rp49.000/30 hari, Rp129.000/90 hari (labeled "Hemat 12%"), Rp399.000/365 hari (labeled "Paling Worth It").
- **No testimonials, case studies, user counts, or usage stats exist.** Future work must not invent them.

## Product Principles

1. Depth over breadth — a small number of chapters done thoroughly (with genuinely advanced leveled exercises) beats broad shallow coverage.
2. The personal line to the maker (WhatsApp to the actual content creator) is a real differentiator — never abstract it into a faceless support queue.
3. Built specifically for UTBK/Ujian Sekolah prep, in natural informal Indonesian — not a generic translated/localized platform.
4. Content authoring (chapter-builder) and the web shell (this app) are separate workflows — shell changes never hand-edit `content-private/*.html`.
5. The manual WhatsApp/admin-approval flow is temporary scaffolding, not a permanent constraint — don't design as if it's forever.

## Accessibility & Inclusion

No formal standard was mandated by the founder, but WCAG AA has been the working bar applied throughout recent work — contrast ≥4.5:1, 44×44px touch targets, visible focus states, `prefers-reduced-motion` support, and correct heading hierarchy. Treat this as the established practice to maintain, not merely a nice-to-have.
