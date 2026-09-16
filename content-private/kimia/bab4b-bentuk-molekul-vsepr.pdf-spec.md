# PDF Companion Spec — Kimia Bab 4B (Bentuk Molekul & Teori VSEPR)

Sibling of `bab4b-bentuk-molekul-vsepr.html` / `.quiz.json`. Enrichment (pengayaan) chapter, `--accent:#e2447e` (reused from Bab 4, not re-decided). Page template: `public/assets/pdf-template/page-template.html` conventions, copied structurally from `bab4-ikatan-kimia-dasar.pdf-pages.html`.

Scope: the full 13-row VSEPR matrix (domain 2 through 6) — HTML lesson only carries the domain-3/4 subset (5 rows, the SMA-core cases) — plus full elaboration of the domain-5 and domain-6 geometries (Trigonal Bipiramida, Jungkat-Jangkit/Seesaw, Bentuk T, Linier domain-5, Oktahedral, Piramida Alas Persegi) that don't fit the main page but are genuinely exam-relevant for a "pengayaan" framing.

## Page 1 — Chapter opener

- `h1.page-title`: "Bentuk Molekul & Teori VSEPR"
- `p.dek`: "Materi PDF — pelengkap Bab 4B (Pengayaan)"
- `p.lead`: explains this PDF is where the full 13-row VSEPR matrix and the domain-5/6 geometries live, since the HTML page only covers domain 3–4 (the SMA-core cases).
- `ul.learn-list`:
  - Matriks VSEPR lengkap: 13 kombinasi \(AX_nE_m\) dari domain total 2 sampai 6
  - Geometri domain 5: Trigonal Bipiramida, Jungkat-Jangkit (Seesaw), Bentuk T, Linier (\(AX_2E_3\))
  - Geometri domain 6: Oktahedral, Piramida Alas Persegi, Persegi Planar (sudah dibahas di halaman utama lewat \(\ce{XeF4}\))
  - Kenapa gaya tolakan PEB pada domain 5 tidak seragam (posisi aksial vs ekuatorial)
  - Rekap kesalahan umum siswa saat mengerjakan soal VSEPR

## Page 2 — Full VSEPR matrix (13 rows), reproduced as `.ref-table`

`h2.section-title`: "Matriks Geometri Molekul VSEPR — Lengkap (Domain 2–6)"

`p.lead`: reminds this is the full matrix the HTML page's `.compare-table` trimmed to domain 3–4 only; every row from the source PDF reproduced here.

`table.ref-table` (`<caption>Matriks VSEPR Lengkap</caption>`), columns: Domain Total (SN) | Formula \(AX_nE_m\) | PEI | PEB | Geometri Molekul | Sudut Ikatan Ideal | Contoh Molekul

Rows (all 13, verbatim from source):

| Domain | Formula | PEI | PEB | Geometri | Sudut | Contoh |
|---|---|---|---|---|---|---|
| 2 | \(AX_2E_0\) | 2 | 0 | Linier | 180° | \(\ce{BeCl2}\), \(\ce{CO2}\), \(\ce{CS2}\) |
| 3 | \(AX_3E_0\) | 3 | 0 | Segitiga Planar | 120° | \(\ce{BF3}\), \(\ce{BCl3}\), \(\ce{SO3}\) |
| 3 | \(AX_2E_1\) | 2 | 1 | Bentuk V | ~119° | \(\ce{SO2}\), \(\ce{O3}\), \(\ce{SnCl2}\) |
| 4 | \(AX_4E_0\) | 4 | 0 | Tetrahedral | 109.5° | \(\ce{CH4}\), \(\ce{CCl4}\), \(\ce{SiF4}\) |
| 4 | \(AX_3E_1\) | 3 | 1 | Trigonal Piramida | 107° | \(\ce{NH3}\), \(\ce{PCl3}\), \(\ce{H3O+}\) |
| 4 | \(AX_2E_2\) | 2 | 2 | Bentuk V | 104.5° | \(\ce{H2O}\), \(\ce{H2S}\), \(\ce{OF2}\) |
| 5 | \(AX_5E_0\) | 5 | 0 | Trigonal Bipiramida | 90° & 120° | \(\ce{PCl5}\), \(\ce{AsF5}\) |
| 5 | \(AX_4E_1\) | 4 | 1 | Jungkat-Jangkit (Seesaw) | <90° & <120° | \(\ce{SF4}\), \(\ce{SeF4}\) |
| 5 | \(AX_3E_2\) | 3 | 2 | Bentuk T | <90° | \(\ce{ClF3}\), \(\ce{BrF3}\) |
| 5 | \(AX_2E_3\) | 2 | 3 | Linier | 180° | \(\ce{XeF2}\), \(\ce{I3-}\) |
| 6 | \(AX_6E_0\) | 6 | 0 | Oktahedral | 90° | \(\ce{SF6}\), \(\ce{SeF6}\) |
| 6 | \(AX_5E_1\) | 5 | 1 | Piramida Alas Persegi | <90° | \(\ce{BrF5}\), \(\ce{IF5}\) |
| 6 | \(AX_4E_2\) | 4 | 2 | Persegi Planar | 90° | \(\ce{XeF4}\), \(\ce{ICl4-}\) |

`p.body-text` note below the table: reading tip — domain 2–4 rows are the ones the HTML page's main table already covers (marked here for cross-reference); domain 5–6 rows are new content, elaborated on the following pages.

## Page 3 — Domain 5: Trigonal Bipiramida & its PEB-substituted forms

`h2.section-title`: "Domain Total 5: Trigonal Bipiramida dan Posisi Aksial vs Ekuatorial"

`p.lead`: The one wrinkle domain-5 geometries have that domain 3/4 don't — a Trigonal Bipiramida has two *different* kinds of position (axial and equatorial), so where a PEB goes actually matters, not just how many there are.

`p.body-text` paragraphs (elaborated prose, standalone-readable):
1. Explain a Trigonal Bipiramida (\(AX_5E_0\)) has 5 PEI split into 2 groups: 2 axial positions (180° apart, straight through the center) and 3 equatorial positions (120° apart, around the "waist"). Axial and equatorial positions aren't equivalent — an axial position has 3 near-neighbors at 90°, while an equatorial position only has 2.
2. Because PEB prefers the position with fewer/weaker 90° neighbors (less crowded), a PEB on a domain-5 central atom always goes equatorial first, never axial — this is why the seesaw/T-shaped/linear geometries that follow all keep their remaining PEI arranged a specific way, not arbitrarily.

`.example-box` — "Kenapa PEB Selalu Memilih Posisi Ekuatorial Dulu, Bukan Aksial?":
1. Posisi ekuatorial punya 2 tetangga 90° (ke 2 posisi aksial) dan 2 tetangga 120° (ke sesama ekuatorial).
2. Posisi aksial punya 3 tetangga 90° (ke semua posisi ekuatorial).
3. Karena tolakan 90° jauh lebih kuat daripada tolakan 120°, posisi dengan LEBIH SEDIKIT tetangga 90° (ekuatorial) adalah posisi paling "nyaman" — dan PEB yang punya awan elektron paling besar akan selalu mengincar posisi paling nyaman ini duluan.
4. Itulah kenapa \(\ce{SF4}\) (\(AX_4E_1\)): 1 PEB-nya menempati posisi ekuatorial, membuat 4 PEI-nya membentuk pola "seesaw" (jungkat-jangkit) yang asimetris, bukan pola simetris seandainya PEB-nya di aksial.

`table.ref-table` — Geometri turunan Trigonal Bipiramida (domain 5), columns: Formula | Geometri | Deskripsi Bentuk | Sudut | Contoh
- \(AX_5E_0\) | Trigonal Bipiramida | 5 PEI penuh, kerangka dasar tanpa distorsi | 90° (aksial-ekuatorial) & 120° (antar-ekuatorial) | \(\ce{PCl5}\), \(\ce{AsF5}\)
- \(AX_4E_1\) | Jungkat-Jangkit (Seesaw) | 1 PEB menempati posisi ekuatorial, 4 PEI tersisa membentuk pola asimetris mirip jungkat-jangkit | <90° & <120° (tertekan dari ideal) | \(\ce{SF4}\), \(\ce{SeF4}\)
- \(AX_3E_2\) | Bentuk T | 2 PEB menempati kedua posisi ekuatorial yang "nyaman", menyisakan 3 PEI (1 ekuatorial + 2 aksial) membentuk huruf T | <90° | \(\ce{ClF3}\), \(\ce{BrF3}\)
- \(AX_2E_3\) | Linier | 3 PEB menempati ketiga posisi ekuatorial, menyisakan 2 PEI di kedua posisi aksial yang saling berseberangan 180° | 180° | \(\ce{XeF2}\), \(\ce{I3-}\)

## Page 4 — Domain 6: Oktahedral & turunannya

`h2.section-title`: "Domain Total 6: Oktahedral, Piramida Alas Persegi, dan Persegi Planar"

`p.lead`: Unlike domain 5, all 6 positions of an Oktahedral are geometrically equivalent (each has exactly 4 neighbors at 90°) — so for the first PEB, position doesn't matter. It only starts to matter for the *second* PEB.

`p.body-text`:
1. \(AX_6E_0\) (Oktahedral, contoh \(\ce{SF6}\)): 6 PEI, semua posisi setara, sudut ikatan 90° di semua pasangan tetangga.
2. \(AX_5E_1\) (Piramida Alas Persegi, contoh \(\ce{BrF5}\), \(\ce{IF5}\)): 1 PEB menempati salah satu dari 6 posisi (semua setara, jadi tidak ada pilihan "terbaik" — di mana pun sama saja), menyisakan 5 PEI membentuk piramida beralas persegi. Sudut ikatan sedikit di bawah 90° karena tolakan PEB–PEI.
3. \(AX_4E_2\) (Persegi Planar, contoh \(\ce{XeF4}\), \(\ce{ICl4-}\)): begitu ada PEB kedua, posisinya TIDAK sembarang — 2 PEB akan selalu saling berseberangan 180° (posisi paling jauh satu sama lain) untuk meminimalkan tolakan PEB–PEB (yang paling kuat dalam hirarki). Ini menyisakan 4 PEI yang tersusun rata dalam satu bidang datar — persis kasus \(\ce{XeF4}\) yang sudah dibahas di halaman utama.

`.callout.mistake`:
- ❌ Salah: mengira posisi PEB kedua pada domain 6 bisa di mana saja asal "ada 2 PEB", tanpa memperhitungkan bahwa keduanya harus saling berseberangan (180°) untuk geometri paling stabil.
- ✅ Benar: begitu ada lebih dari 1 PEB, urutan hirarki tolakan (PEB–PEB paling kuat) menentukan penempatannya — dua PEB akan selalu mengambil posisi paling berjauhan yang tersedia, bukan posisi acak. Ini persis alasan \(\ce{XeF4}\) berbentuk Persegi Planar yang rata, bukan bentuk melengkung.

## Page 5 — Contoh soal tambahan & rekap kesalahan umum

`h2.section-title`: "Contoh Soal Tambahan & Rekap Kesalahan Umum VSEPR"

`.example-box` — "Soal: Tentukan Geometri Molekul \(\ce{SF4}\)":
1. Atom pusat: S (Golongan VI A → EV = 6).
2. Jumlah PEI (n) = 4 (mengikat 4 atom F).
3. PEB (m) = (6 − 4) / 2 = 1 PEB.
4. Notasi VSEPR: \(AX_4E_1\) → domain total 5 → Geometri: Jungkat-Jangkit (Seesaw), dengan 1 PEB menempati posisi ekuatorial.

`.example-box` — "Soal: Tentukan Geometri Molekul \(\ce{ClF3}\)":
1. Atom pusat: Cl (Golongan VII A → EV = 7).
2. Jumlah PEI (n) = 3 (mengikat 3 atom F).
3. PEB (m) = (7 − 3) / 2 = 2 PEB.
4. Notasi VSEPR: \(AX_3E_2\) → domain total 5 → Geometri: Bentuk T, dengan kedua PEB menempati posisi ekuatorial.

`ol.ref-list` — Rekap Kesalahan Umum:
1. **Menyamakan domain total dengan jumlah PEI saja.** Selalu hitung n + m, bukan cuma n — dua molekul dengan PEI sama bisa punya domain total (dan kerangka dasar) yang beda kalau PEB-nya beda, seperti \(\ce{CH4}\) (domain 4) vs \(\ce{XeF4}\) (domain 6, meski PEI-nya sama-sama 4).
2. **Mengira posisi PEB pada Trigonal Bipiramida bisa aksial atau ekuatorial secara bebas.** PEB selalu mengincar posisi ekuatorial dulu (tetangga 90°-nya paling sedikit) — bukan pilihan acak.
3. **Menyamakan electron-domain geometry dengan molecular geometry.** Electron-domain geometry menghitung PEI + PEB; molecular geometry (bentuk molekul yang disebut di soal) hanya menghitung posisi PEI yang "terlihat" sebagai atom.
4. **Lupa bahwa 2 PEB pada domain 6 harus saling berseberangan (180°), bukan berdekatan.** Tolakan PEB–PEB yang paling kuat memaksa keduanya mengambil posisi terjauh yang tersedia.
5. **Menghafal nama geometri tanpa memahami polanya.** Semua nama geometri domain 5 dan 6 sebenarnya cuma "Trigonal Bipiramida/Oktahedral dikurangi 1 PEI, digantikan 1 PEB, di posisi yang paling sedikit tolakannya" — kalau pola ini dipahami, tidak perlu menghafal 13 nama satu-satu.

---

**Filling & rendering note:** copied `.pdf-pages.html` `<style>` block wholesale from `bab4-ikatan-kimia-dasar.pdf-pages.html` (same `--accent:#e2447e`), same 3-script KaTeX+mhchem tags. All 5 pages use `class="page-body dense"` since each page carries a full-width table or 2 example-boxes. Rendered via Playwright, `deviceScaleFactor:1.5`, one `.pdf-page` element screenshot each; verified `.page-body` `scrollHeight` vs `clientHeight` on every page before shipping.
