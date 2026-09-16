# PDF Companion Spec — Bab 3 Kimia: Struktur Atom &amp; Sistem Periodik Unsur

Curated content for the PDF companion, built on `public/assets/pdf-template/page-template.html`
(`.pdf-page[data-subject="kimia"]`). Not an export of the HTML page — per
CHAPTER_CONTENT_GUIDE.md §5, this is where the extra reference tables (not shown as images on
the HTML page), the two worked examples not reproduced in full on the HTML page, and an
additional guided example live in full, elaborated form.

**Accent color:** `--accent:#e2447e`, reusing the value already decided for Kimia in
`bab1-hakikat-kimia-hijau-k3lab.pdf-spec.md` (matches the site's `--pink` CSS variable /
`subjectsData.kimia.color`). Not re-decided here, per the task's instruction.

**LaTeX use:** this chapter is genuinely equation/notation-dense (nuclide notation, quantum
numbers, electron configuration) — per §5's Matematika/Fisika/Kimia rule, LaTeX is used
throughout for nuclide notation (ᴬZX), electron configurations, and the isotop/isoton/isobar
definitions wherever a plain-text rendering would be ambiguous or ugly (subscripts/superscripts).

**Sourcing note on the two extra reference tables (Page 6):** the "bentuk orbital" (subkulit
shapes) table and the "nama khusus golongan" (special golongan names) table below are pulled
from `bab3-struktur-atom-sistem-periodik-literature-reference-no-images.pdf` — **text/table
content only**, per the task's explicit instruction. No image from that PDF is used anywhere in
this chapter (HTML or PDF); all four diagram images used across both the HTML page and this PDF
companion are sourced exclusively from the primary source PDF's embedded images, already
extracted to `public/assets/images/kimia/`.

7 pages: 1 chapter-opener + 6 content pages.

## Page 1 — Chapter opener

```
chapter-tag: Bab 3
subject-chip: Kimia
h1.page-title: Struktur Atom & Sistem Periodik Unsur
p.dek: Materi PDF — pelengkap Bab 3
p.lead: Materi tambahan ini fokus ke lembar rumus cepat rangkuman seluruh bab, dua tabel
  referensi yang tidak ada di halaman utama (bentuk orbital & nama khusus golongan), dua
  latihan soal terpandu tambahan (bilangan kuantum & klasifikasi 5 spesi sekaligus), plus
  rekap kesalahan umum di tiap sub-topik — pelengkap materi & diagram interaktif di halaman
  utama, bukan salinannya.
h2.section-title: Yang akan kamu pelajari
ul.learn-list:
  - Lembar rumus cepat (quick reference sheet) satu halaman untuk seluruh Bab 3 — notasi
    nuklida, aturan ion, isotop/isoton/isobar/isoelektron, kapasitas subkulit, urutan Aufbau
  - Tabel lengkap bentuk & jumlah orbital tiap subkulit (s, p, d, f) — tidak ada di halaman
    utama, cuma disebut kapasitasnya saja di sana
  - Tabel lengkap nama khusus golongan (Alkali, Alkali Tanah, Halogen, Gas Mulia) dengan
    konfigurasi valensi dan sifat utama masing-masing
  - Latihan soal terpandu tambahan: klasifikasi isotop/isoton/isobar/isoelektron untuk 6
    spesi sekaligus (lebih kompleks dari contoh 5 spesi di halaman utama)
  - Latihan soal terpandu tambahan: menentukan 4 bilangan kuantum (n, l, m, s) elektron
    terakhir unsur Klorin (₁₇Cl)
  - Latihan soal terpandu tambahan: konfigurasi elektron & golongan/periode unsur transisi
    (₂₆Fe) secara lengkap langkah-demi-langkah
  - Rekap kesalahan umum siswa di tiap sub-topik bab ini
```

## Page 2 — Lembar Rumus Cepat (Quick Reference Sheet)

This is the source module's full "Quick Reference Sheet" table (7 rows), reproduced here in
full as the single-page formula recap for the whole chapter — not present anywhere on the HTML
page, which spreads the same formulas across multiple `.law-strip` boxes per section instead.

| Konsep | Rumus/Notasi | Keterangan |
|---|---|---|
| Notasi Nuklida | ᴬZX | Z = Nomor Atom (jumlah proton), A = Nomor Massa (proton + neutron) |
| Jumlah Neutron | N = A − Z | Selisih nomor massa dikurangi nomor atom |
| Aturan Atom Netral | jumlah p⁺ = jumlah e⁻ = Z | Dalam atom netral, proton dan elektron jumlahnya sama |
| Muatan Ion | e⁻ = Z − (muatan) | Kation (Xⁿ⁺): melepas n elektron. Anion (Xⁿ⁻): menangkap n elektron |
| Isotop/Isoton/Isobar/Isoelektron | Isotop: Z sama, Isoton: N sama, Isobar: A sama, Isoelektron: e⁻ sama | Trik hafalan: Isotop (proton sama), Isoton (neutron sama), Isobar (massa sama) |
| Kapasitas Subkulit | s=2e⁻, p=6e⁻, d=10e⁻, f=14e⁻ | Jumlah orbital dikali 2 (tiap orbital maks 2 elektron) |
| Urutan Aufbau | 1s→2s→2p→3s→3p→4s→3d→4p→5s→4d... | Pengisian elektron dari tingkat energi terendah ke tertinggi |

```
chapter-tag: Bab 3 · Lembar Rumus Cepat
subject-chip: Kimia

h2.section-title: Lembar Rumus Cepat — Rangkuman Satu Halaman
p.lead: Semua rumus & notasi inti Bab 3 dalam satu tabel — buat direview cepat sebelum ujian,
  tanpa perlu scroll ulang tiap section di halaman utama.

[ref-table di atas, dengan kolom "Rumus/Notasi" ditulis pakai KaTeX untuk notasi nuklida ᴬZX]

p.body-text: Kalau cuma boleh hafal SATU baris dari tabel ini, hafalkan baris pertama: notasi
  nuklida ᴬZX. Hampir semua baris lain (jumlah neutron, aturan ion, isotop/isoton/isobar)
  diturunkan langsung dari Z dan A pada notasi ini — begitu ᴬZX dikuasai, sisanya tinggal
  aritmatika sederhana (pengurangan/penjumlahan).
```

## Page 3 — Referensi: Bentuk Orbital & Nama Khusus Golongan

Both tables sourced from the literature-reference PDF's text (see sourcing note above) — not
present as tables anywhere on the HTML page (the HTML page only names the 4 special golongan
briefly in a `.law-strip`, without the full sifat-utama column).

| Subkulit | Jumlah Orbital | Kapasitas Maks. | Bentuk Orbital |
|---|---|---|---|
| s (sharp) | 1 orbital | 2 elektron (s²) | Bola simetris (spherical) |
| p (principal) | 3 orbital (pₓ, p_y, p_z) | 6 elektron (p⁶) | Balon terpilin (dumbbell) |
| d (diffuse) | 5 orbital | 10 elektron (d¹⁰) | Daun semanggi (cloverleaf) |
| f (fundamental) | 7 orbital | 14 elektron (f¹⁴) | Kompleks multilobus |

| Golongan | Nama Khusus | Konfigurasi Valensi | Sifat Utama |
|---|---|---|---|
| 1A | Alkali (kecuali H) | ns¹ | Logam sangat reaktif, lunak, membentuk kation +1 |
| 2A | Alkali Tanah | ns² | Logam reaktif, membentuk kation +2 |
| 7A | Halogen | ns² np⁵ | Non-logam sangat reaktif, membentuk anion −1 |
| 8A | Gas Mulia | ns² np⁶ (He: 1s²) | Sangat stabil, oktet/duplet penuh, sukar bereaksi |

```
chapter-tag: Bab 3 · Referensi Tambahan
subject-chip: Kimia

h2.section-title: Referensi: Bentuk Orbital & Nama Khusus Golongan
p.lead: Dua tabel yang tidak ditampilkan penuh di halaman utama — bentuk geometris tiap
  subkulit, dan sifat lengkap 4 golongan bernama khusus yang paling sering diuji.

[ref-table 1: Bentuk Orbital di atas]

p.body-text: Bentuk orbital ini sebenarnya jarang ditanya langsung sebagai "gambar", tapi
  sering muncul di soal konseptual — misalnya "kenapa subkulit p punya 3 orientasi berbeda
  (pₓ, p_y, p_z)?" Jawabannya karena bentuk dumbbell-nya bisa mengarah ke 3 sumbu ruang yang
  saling tegak lurus (x, y, z), makanya kapasitasnya 3 orbital × 2 elektron = 6.

[ref-table 2: Nama Khusus Golongan di atas]

p.body-text: Pola konfigurasi valensi ke-4 golongan ini gampang dibandingkan berurutan:
  Alkali (ns¹) hanya butuh MELEPAS 1 elektron untuk stabil, Alkali Tanah (ns²) melepas 2,
  sedangkan di ujung lain Halogen (ns² np⁵) hanya butuh MENANGKAP 1 elektron untuk stabil,
  dan Gas Mulia (ns² np⁶) sudah stabil sejak awal tanpa perlu melepas/menangkap apa pun. Ini
  yang menjelaskan kenapa Alkali & Halogen sama-sama "sangat reaktif" meski satu logam satu
  non-logam — keduanya cuma butuh SATU langkah kecil (lepas/tangkap 1 elektron) buat sampai
  ke konfigurasi stabil gas mulia terdekat.
```

## Page 4 — Latihan Terpandu: Klasifikasi 6 Spesi Sekaligus

An additional worked example beyond the HTML page's 5-spesi version, adapted from the
literature-reference module's Soal 2 (which used 6 spesi including an isoelektron pair) — more
complex than the HTML's 5-spesi example since it also requires spotting an isoelektron pair
(needs e⁻ count from ion charge, not just Z/A/N).

```
chapter-tag: Bab 3 · Latihan Terpandu
subject-chip: Kimia

h2.section-title: Latihan Terpandu: Klasifikasi 6 Spesi Sekaligus
p.lead: Versi yang lebih lengkap dari contoh di halaman utama — kali ini juga menguji
  pasangan Isoelektron, yang butuh menghitung jumlah elektron dari muatan ion, bukan cuma
  dari Z dan A.

div.example-box (label: Soal · Klasifikasi Isotop, Isoton, Isobar, Isoelektron)
p.setup: Diberikan 6 spesi: A (¹⁴₆C), B (¹⁴₇N), C (¹⁶₈O), D (¹²₆C), E (₁₁Na⁺), F (₁₀Ne).
  Kelompokkan pasangan-pasangan yang tergolong Isotop, Isobar, Isoton, dan Isoelektron!
ol:
  - Hitung dulu Z, A, N (=A−Z), dan jumlah e⁻ tiap spesi: A (Z=6,A=14,N=8,e⁻=6), B
    (Z=7,A=14,N=7,e⁻=7), C (Z=8,A=16,N=8,e⁻=8), D (Z=6,A=12,N=6,e⁻=6), E (Z=11, ion +1 →
    e⁻=11−1=10), F (Z=10, netral → e⁻=10).
  - Isotop (Z sama): A dan D, sama-sama Z=6.
  - Isobar (A sama): A dan B, sama-sama A=14.
  - Isoton (N sama): A dan C, sama-sama N=8.
  - Isoelektron (e⁻ sama): E dan F, sama-sama 10 elektron — perhatikan E adalah ION (Na⁺,
    melepas 1 elektron dari 11 jadi 10), sedangkan F adalah atom netral (Ne, 10 elektron
    sejak awal). Keduanya tetap isoelektron meski satu ion satu atom netral, karena yang
    dibandingkan cuma jumlah elektron akhirnya.

callout.mistake — Kesalahan Umum
❌ Salah: lupa mengurangi/menambah elektron sesuai muatan ion saat mencari pasangan
  isoelektron, dan malah memakai nomor atom (Z) mentah dari ion tersebut.
✅ Benar: untuk ion, jumlah elektron HARUS dihitung dulu dari e⁻ = Z − muatan (bukan dipakai
  Z-nya langsung) sebelum dibandingkan ke spesi lain — Na⁺ elektronnya 10, bukan 11.
```

## Page 5 — Latihan Terpandu: 4 Bilangan Kuantum Elektron Terakhir

The source module's Soal 4, not reproduced on the HTML page at all (the HTML page's worked
examples focus on particle-counting, isotop/isoton/isobar, and electron config/golongan/
periode — this is the exam-style extension into quantum numbers, appropriately harder and PDF-
only per §5's "1-2 additional worked examples beyond what's on the HTML page").

```
chapter-tag: Bab 3 · Latihan Terpandu
subject-chip: Kimia

h2.section-title: Latihan Terpandu: Menentukan 4 Bilangan Kuantum
p.lead: Soal lanjutan yang sering keluar di ujian — menentukan 4 bilangan kuantum (n, l, m,
  s) untuk elektron TERAKHIR sebuah unsur, bukan cuma menulis konfigurasi elektronnya saja.

div.example-box (label: Soal · 4 Bilangan Kuantum Elektron Terakhir ₁₇Cl)
p.setup: Tentukan keempat bilangan kuantum (n, l, m, s) untuk elektron terakhir dari unsur
  ₁₇Cl (Klorin)!
ol:
  - Tulis dulu konfigurasi elektron ₁₇Cl: 1s² 2s² 2p⁶ 3s² 3p⁵. Elektron terakhir berada di
    subkulit 3p⁵ (elektron ke-17).
  - Bilangan kuantum utama (n) = 3 — diambil langsung dari angka di depan subkulit terakhir
    (3p⁵).
  - Bilangan kuantum azimut (l) = 1 — tiap jenis subkulit punya nilai l tetap: s→l=0, p→l=1,
    d→l=2, f→l=3. Karena elektron terakhir ada di subkulit p, l = 1.
  - Bilangan kuantum magnetik (m): orbital p punya 3 orientasi dengan m = −1, 0, +1.
    Mengisi 5 elektron ke 3 orbital p mengikuti Kaidah Hund: isi ↑ dulu di ketiganya
    (elektron ke-1,2,3 di m=−1,0,+1), baru elektron ke-4 & ke-5 mulai berpasangan (↓) dari
    orbital paling kiri lagi. Elektron ke-5 (terakhir) jatuh berpasangan di orbital m = 0.
  - Bilangan kuantum spin (s): karena elektron ke-5 ini adalah pasangan kedua di orbital
    m=0 (elektron pertama di situ sudah ↑), elektron ke-5 arahnya berlawanan → s = −½.
  - Hasil akhir: n = 3, l = 1, m = 0, s = −½.

p.body-text: Pola yang perlu diinget: elektron PERTAMA yang masuk ke tiap orbital dalam satu
  subkulit (mengikuti Kaidah Hund) selalu diberi spin +½ (↑), dan elektron yang jadi
  PASANGAN kedua di orbital yang sama diberi spin −½ (↓). Untuk tahu orbital mana yang
  ditempati elektron terakhir, gambar dulu semua orbitalnya sebagai kotak-kotak kosong, isi
  satu-satu sesuai Hund, baru lihat elektron ke berapa yang jadi elektron terakhir.

callout.mistake — Kesalahan Umum
❌ Salah: langsung menyimpulkan m = +1 atau nilai acak lain tanpa benar-benar menggambar
  pengisian orbital satu per satu sesuai Kaidah Hund.
✅ Benar: SELALU gambar diagram kotak orbital (orbital box diagram) dan isi elektronnya
  satu-satu mengikuti Hund sebelum menjawab bilangan kuantum m dan s — jangan ditebak.
```

## Page 6 — Latihan Terpandu: Konfigurasi Elektron Unsur Transisi (Fe)

The HTML page's `#konfigurasi-elektron` section only gives Fe's golongan (8B) as a short
callout note, without walking through the full periode/golongan derivation the way it does for
Br — this page completes that derivation in full guided-example form.

```
chapter-tag: Bab 3 · Latihan Terpandu
subject-chip: Kimia

h2.section-title: Latihan Terpandu: Konfigurasi Elektron & Golongan Unsur Transisi (Fe)
p.lead: Halaman utama sudah menuliskan konfigurasi Fe & bilang golongannya 8B — di sini
  langkah lengkapnya, dibandingkan langsung dengan cara golongan A dihitung untuk Br.

div.example-box (label: Soal · Konfigurasi, Periode & Golongan ₂₆Fe)
p.setup: Tentukan konfigurasi elektron, elektron valensi, Periode, dan Golongan unsur ₂₆Fe
  (Besi)!
ol:
  - Urutan Aufbau (Z=26): 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶, disingkat [Ar] 4s² 3d⁶.
  - Kulit utama terbesar (n) = 4 → Periode 4 (sama seperti Br, karena keduanya baru mulai
    mengisi kulit ke-4).
  - Subkulit terakhir yang diisi = 3d (blok d) → unsur transisi, elektron valensi dihitung
    dari (n−1)dᵃ nsᵇ = 3d⁶ 4s² → jumlah = 6+2 = 8.
  - Karena berakhir di blok d dengan jumlah elektron valensi 8 (termasuk rentang 8,9,10),
    Fe masuk Golongan Transisi 8B — BUKAN Golongan 8A, meski jumlahnya sama-sama 8.

p.body-text: Perbandingan langsung dengan Br dari halaman utama: keduanya sama-sama Periode
  4 (kulit terluar n=4), tapi caranya beda total. Br berakhir di blok p → dihitung dengan
  rumus golongan utama (nsᵃnpᵇ) → 7A. Fe berakhir di blok d → dihitung dengan rumus golongan
  transisi ((n−1)dᵃnsᵇ) → 8B. Aturan konversi golongan transisi: jika a+b = 8, 9, atau 10 →
  golongan 8B; jika a+b = 11 → 1B; jika a+b = 12 → 2B (kasus-kasus khusus di luar pola linear
  1B-7B biasa).

callout.mistake — Kesalahan Umum
❌ Salah: memakai rumus golongan utama (jumlah elektron di kulit terluar ns+np) untuk unsur
  blok d, sehingga Fe dikira golongan 2A (cuma menghitung 4s² saja).
✅ Benar: begitu subkulit TERAKHIR yang diisi Aufbau adalah d, langsung ganti ke rumus
  golongan transisi (n−1)dᵃnsᵇ — jangan pernah pakai rumus golongan A untuk unsur blok d.
```

## Page 7 — Rekap Kesalahan Umum per Sub-Topik

Consolidates the misconception callouts already placed inline throughout the HTML page (one
per section) into a single dense reference page, plus 2 misconceptions not covered on the HTML
page at all (afinitas elektron vs energi ionisasi mix-up, dan salah kaprah notasi ion).

```
chapter-tag: Bab 3 · Rekap Kesalahan Umum
subject-chip: Kimia

h2.section-title: Rekap Kesalahan Umum di Seluruh Bab 3
p.lead: Tujuh kesalahan paling sering ditemui siswa SMA di topik ini, dirangkum jadi satu
  halaman referensi cepat.

ol.ref-list:
  - <b>Isoton dikira soal proton, bukan neutron.</b> Isoton itu N (neutron) sama, dan
    unsurnya justru pasti BEDA (kalau protonnya sama, itu Isotop).
  - <b>Elektron ion dihitung salah arah.</b> Kation (+) MELEPAS elektron (dikurangi),
    anion (−) MENANGKAP elektron (ditambah) — sering tertukar arahnya, terutama untuk anion.
  - <b>Golongan unsur blok d dihitung pakai rumus golongan A.</b> Unsur blok d (transisi)
    WAJIB pakai rumus (n−1)dᵃnsᵇ, bukan nsᵃnpᵇ seperti golongan utama.
  - <b>Bilangan kuantum m/s ditebak tanpa menggambar diagram orbital.</b> Selalu gambar
    kotak-kotak orbital dan isi elektron satu-satu sesuai Kaidah Hund dulu, jangan ditebak.
  - <b>Jari-jari atom dan energi ionisasi dikira searah dalam satu periode.</b> Keduanya
    berbanding TERBALIK: makin kecil jari-jarinya, makin besar energi ionisasinya.
  - <b>Afinitas elektron dan energi ionisasi dikira konsep yang sama.</b> Energi ionisasi =
    energi MELEPAS elektron. Afinitas elektron = energi saat MENANGKAP elektron — dua
    proses yang berlawanan arah, meski sama-sama makin besar ke arah kanan periode.
  - <b>Notasi ion ditulis terbalik posisinya.</b> Muatan ion ditulis sebagai superskrip di
    KANAN ATAS simbol unsur (Fe³⁺, bukan ³⁺Fe atau Fe³⁺ dengan urutan angka-tanda tertukar
    jadi Fe⁺³ — konvensi baku IUPAC selalu angka dulu baru tanda, mis. "3+" bukan "+3").
```

## Note on the diagram images (HTML, not PDF)

Not part of this spec, but placed in `bab3-struktur-atom-sistem-periodik.html` alongside this
build — all 4 supplied diagram images, all used directly as `.diagram-card` images per the
diagram-sourcing rule (real supplied source from the primary-source PDF, not hand-drawn
recreations, and never from the defective literature-reference PDF):

- `#partikel-sub-atomik`: `struktur-atom-partikel-subatomik-rutherford.jpg`.
- `#konfigurasi-elektron`: `diagram-aufbau-konfigurasi-elektron.jpg`.
- `#tabel-periodik`: `tabel-periodik-unsur-modern.jpg`.
- `#sifat-keperiodikan`: `tren-sifat-keperiodikan-unsur.jpg`.

All 4 supplied diagram images were used — none left out, unlike Bab 1 Kimia which had extra
transitional/dramatic slides with no new factual content. This chapter's source PDF only
embedded these 4 as genuine content diagrams (one per major section), so no selection judgment
was needed here.
