# PDF Companion Spec — Bab 2 Fisika: Vektor Bidang 2D

Curated content for the PDF companion, built on `public/assets/pdf-template/page-template.html`
(`.pdf-page[data-subject="fisika"]`). Not an export of the HTML page — per
CHAPTER_CONTENT_GUIDE.md §5, this is additional exam-style worked examples, a component-level
derivation of the dot/cross product formulas (genuinely useful but not needed to follow the main
lesson, so it lives here rather than on the HTML page), a full formula/reference recap, and a
short additional practice set — none of it duplicates the HTML page's own two worked examples
(Soal 1 resultan gaya, Soal 2 usaha via dot product), which stay on the HTML page since they're
the source PDF's own flagship HOTS examples.

**Accent color:** `#8b5cf6`, same as Bab 1 Fisika — matches `subjectsData.fisika.color:'purple'`
in `app.js` and the site's own `--purple` CSS variable. Reused as-is, not re-decided.

Fisika is equation-dense — every formula, derivation step, and worked example on these pages
uses real KaTeX, not plain-text superscripts/subscripts.

**Source cross-check:** all formulas below were checked step-by-step against
`bab2-vektor-2d-source.pdf` (`page.get_text()` per page, PyMuPDF) before writing — no
discrepancies found between the transcribed brief and the actual source content. All new
worked examples (Halaman 2–4, 6) use original numbers not present in the source, chosen so the
arithmetic resolves cleanly (verified by hand below).

7 pages: 1 chapter-opener + 6 content pages.

## Page 1 — Chapter opener

```
chapter-tag: Bab 2
subject-chip: Fisika
h1.page-title: Vektor Bidang 2D
p.dek: Materi PDF — pelengkap Bab 2
p.lead: Materi tambahan ini fokus ke soal resultan 3 vektor (metode analitis penuh), soal
  Aturan Kosinus tambahan (sudut apit berbeda dari contoh di halaman utama, buat lihat efek
  perubahan sudut ke hasil R & D), derivasi komponen dot product & cross product langsung dari
  sifat vektor satuan, tabel ringkasan rumus vektor 2D, tabel perbandingan lengkap Dot vs Cross
  Product, kesalahan umum, dan latihan tambahan — pelengkap materi interaktif di halaman utama,
  bukan salinannya.
h2.section-title: Yang akan kamu pelajari
ul.learn-list:
  - Soal resultan 3 vektor sekaligus pakai metode analitis penuh (notasi sigma Σ untuk n vektor)
  - Soal Aturan Kosinus dengan sudut apit 120° (dibandingkan langsung dengan Contoh Soal HOTS di
    halaman utama yang sudut apitnya 60°) — lihat efek sudut apit membesar ke R vs D
  - Derivasi rumus komponen A.B = AxBx+AyBy dan r cross F = (rxFy-ryFx)k-hat langsung dari sifat perkalian
    vektor satuan (î, ĵ, k̂), dilanjutkan contoh soal Torsi lewat bentuk komponen
  - Tabel ringkasan seluruh rumus vektor bab ini dalam satu halaman referensi cepat
  - Tabel perbandingan lengkap Dot Product vs Cross Product (7 aspek)
  - Rekap 4 kesalahan umum yang paling sering bikin soal vektor salah
  - Latihan tambahan (5 soal + pembahasan) mencakup semua sub-topik bab ini
```

## Page 2 — Latihan Tambahan: Resultan 3 Vektor (Metode Analitis Penuh)

Not on the HTML page — the HTML's own worked example (Contoh Soal HOTS Resultan Gaya 2D) only
uses 2 vektor, matching the source PDF's own example exactly. This page shows the metode
analitis actually doing the job it's built for: n > 2 vektor sekaligus, using the general Σ
notation stated in the HTML lesson.

```
chapter-tag: Bab 2 · Resultan Vektor
subject-chip: Fisika

h2.section-title: Latihan Tambahan: Resultan 3 Vektor Sekaligus
p.lead: Contoh Soal HOTS di halaman utama cuma pakai 2 vektor — di sini metode analitis
  dipakai untuk kasus aslinya: menjumlahkan n vektor sekaligus (di sini n=3), pakai notasi
  sigma penuh.

div.example-box (label: Soal · Tiga Gaya Sebidang)
p.setup: Tiga buah gaya bekerja pada satu titik tangkap: \(\vec{F}_1 = 8\) N pada \(0^{\circ}\),
  \(\vec{F}_2 = 8\) N pada \(60^{\circ}\), dan \(\vec{F}_3 = 8\) N pada \(120^{\circ}\), semua
  diukur terhadap sumbu-X positif. Tentukan besar resultan \(R\) dan arah sudutnya!
ol:
  - Uraikan tiap gaya ke sumbu-X dan sumbu-Y: \(F_{1x}=8\cos 0^{\circ}=8\) N, \(F_{1y}=8\sin
    0^{\circ}=0\) N; \(F_{2x}=8\cos 60^{\circ}=4\) N, \(F_{2y}=8\sin 60^{\circ}=4\sqrt{3}\) N;
    \(F_{3x}=8\cos 120^{\circ}=-4\) N, \(F_{3y}=8\sin 120^{\circ}=4\sqrt{3}\) N.
  - Jumlahkan seluruh komponen memakai notasi sigma penuh: \(R_x = \sum_{i=1}^{3} F_{ix} =
    F_{1x}+F_{2x}+F_{3x} = 8+4+(-4) = 8\) N. \(R_y = \sum_{i=1}^{3} F_{iy} = F_{1y}+F_{2y}+F_{3y}
    = 0+4\sqrt{3}+4\sqrt{3} = 8\sqrt{3}\) N.
  - Hitung besar resultan: \(R = \sqrt{R_x^2+R_y^2} = \sqrt{8^2+(8\sqrt{3})^2} =
    \sqrt{64+192} = \sqrt{256} = 16\) N.
  - Hitung arah sudut: \(\tan\theta_R = \dfrac{R_y}{R_x} = \dfrac{8\sqrt{3}}{8} = \sqrt{3}
    \Rightarrow \theta_R = 60^{\circ}\) terhadap sumbu-X positif.

p.body-text: Perhatikan polanya: ketiga gaya besarnya sama (8 N) dan berjarak sudut yang sama
  (60° antar gaya berurutan), tapi resultannya (16 N pada 60°) BUKAN sekadar 3x8=24 N — karena
  arahnya berbeda-beda, sebagian saling menguatkan (komponen-Y) dan sebagian saling meniadakan
  sebagian (komponen-X F1 & F3). Ini kasus umum: makin banyak vektor yang terlibat, makin
  penting menguraikan SATU-PER-SATU ke sumbu-X/Y dulu sebelum menjumlahkan — nggak bisa dikira-
  kira langsung dari besarnya saja.
```

## Page 3 — Latihan Tambahan: Aturan Kosinus dengan Sudut Apit Berbeda

Not on the HTML page. The HTML's Aturan-Kosinus cross-check only verifies R with α=60° (using
the same numbers as the main worked example). This page runs both formulas (R dan D) on the
SAME pair of vectors but with α=120°, deliberately chosen so students see the sudut-apit membesar
→ R mengecil, D membesar relationship concretely — a common source of sign confusion.

```
chapter-tag: Bab 2 · Resultan Vektor
subject-chip: Fisika

h2.section-title: Latihan Tambahan: Aturan Kosinus — Efek Sudut Apit yang Membesar
p.lead: Contoh Soal HOTS di halaman utama pakai dua vektor 10 N dengan sudut apit 60°. Di sini,
  dua vektor yang SAMA PERSIS (10 N & 10 N) dipakai lagi, tapi sudut apitnya diperbesar jadi
  120° — perhatikan bagaimana hasil R dan D berubah dibanding sebelumnya.

div.example-box (label: Soal · Dua Vektor dengan Sudut Apit 120°)
p.setup: Dua vektor gaya \(\vec{F}_1 = 10\) N dan \(\vec{F}_2 = 10\) N membentuk sudut apit
  \(\alpha = 120^{\circ}\). Tentukan besar resultan penjumlahan \(R\) dan besar selisih
  pengurangan \(D\) keduanya!
ol:
  - Besar resultan penjumlahan: \(R = \sqrt{F_1^2+F_2^2+2F_1F_2\cos\alpha} =
    \sqrt{10^2+10^2+2(10)(10)\cos 120^{\circ}}\). Karena \(\cos 120^{\circ} = -0{,}5\):
    \(R = \sqrt{100+100+200(-0{,}5)} = \sqrt{200-100} = \sqrt{100} = 10\) N.
  - Besar selisih pengurangan: \(D = \sqrt{F_1^2+F_2^2-2F_1F_2\cos\alpha} =
    \sqrt{100+100-200(-0{,}5)} = \sqrt{200+100} = \sqrt{300} = 10\sqrt{3} \approx 17{,}32\) N.
  - Bandingkan dengan Contoh Soal HOTS di halaman utama (α=60°, \(F_1=F_2=10\) N): di sana
    \(R=10\sqrt{3}\approx 17{,}32\) N dan (kalau dihitung) \(D=10\) N — persis KEBALIKAN dari
    hasil di soal ini.

callout.mistake — Kesalahan Umum
❌ Salah: menganggap memperbesar sudut apit \(\alpha\) selalu memperbesar resultan \(R\).
✅ Benar: hubungannya justru terbalik untuk \(R\) — makin besar \(\alpha\) (kedua vektor makin
  "berlawanan arah"), makin KECIL \(R\) karena \(\cos\alpha\) makin negatif (dari +0,5 di α=60°
  jadi -0,5 di α=120°). Sebaliknya \(D\) (selisih) justru makin BESAR karena tandanya di depan
  suku \(2F_1F_2\cos\alpha\) terbalik (minus jadi plus efektifnya). Intinya: jangan hafal "R
  selalu lebih besar dari D" atau sebaliknya — itu tergantung besar sudut apitnya, harus
  dihitung, bukan ditebak.

p.body-text: Kasus ekstrem yang bisa dipakai buat cek cepat hafalan: kalau α=180° (dua vektor
  segaris tapi berlawanan arah persis), rumus R berubah jadi \(R=\sqrt{F_1^2+F_2^2-2F_1F_2}=
  |F_1-F_2|\) — resultan penjumlahan dua vektor yang berlawanan arah sama dengan SELISIH
  besarnya, sesuai intuisi (dua gaya tarik-menarik berlawanan arah saling meniadakan sebagian).
```

## Page 4 — Derivasi Komponen Dot Product & Cross Product + Contoh Soal Torsi

Not on the HTML page — the HTML states the component formulas (\(\vec{A}\cdot\vec{B}=A_xB_x+
A_yB_y\) and the magnitude-only cross product formula) without deriving them, per the "a
genuinely useful [derivation] can live in the PDF instead" principle. This page derives both
directly from the unit-vector properties already stated on the HTML page, then applies the
cross-product component result to a torsi example in component form — something the HTML page
doesn't cover at all (its Soal 2 uses dot product/usaha, not cross product/torsi, in component
form).

```
chapter-tag: Bab 2 · Perkalian Vektor
subject-chip: Fisika

h2.section-title: Derivasi Komponen Dot Product & Cross Product
p.lead: Rumus komponen \(\vec{A}\cdot\vec{B}=A_xB_x+A_yB_y\) yang dipakai di halaman utama
  sebenarnya bisa diturunkan langsung dari sifat perkalian vektor satuan — begini caranya,
  sekaligus versi cross product-nya yang belum dibahas dalam bentuk komponen.

div.formula-box (label: Derivasi Komponen Dot Product)
[KaTeX, tampilkan sebagai langkah beruntun]
\(\vec{A}\cdot\vec{B} = (A_x\hat{i}+A_y\hat{j})\cdot(B_x\hat{i}+B_y\hat{j})\)
\(= A_xB_x(\hat{i}\cdot\hat{i}) + A_xB_y(\hat{i}\cdot\hat{j}) + A_yB_x(\hat{j}\cdot\hat{i}) +
  A_yB_y(\hat{j}\cdot\hat{j})\)
\(= A_xB_x(1) + A_xB_y(0) + A_yB_x(0) + A_yB_y(1) = A_xB_x+A_yB_y\)
var-def: Dua suku tengah lenyap karena \(\hat{i}\cdot\hat{j}=\hat{j}\cdot\hat{i}=0\) (saling
  tegak lurus), dan dua suku ujung jadi \(A_xB_x\) & \(A_yB_y\) karena \(\hat{i}\cdot\hat{i}=
  \hat{j}\cdot\hat{j}=1\).

div.formula-box (label: Derivasi Komponen Cross Product (2D))
[KaTeX, tampilkan sebagai langkah beruntun]
\(\vec{A}\times\vec{B} = (A_x\hat{i}+A_y\hat{j})\times(B_x\hat{i}+B_y\hat{j})\)
\(= A_xB_x(\hat{i}\times\hat{i}) + A_xB_y(\hat{i}\times\hat{j}) + A_yB_x(\hat{j}\times\hat{i}) +
  A_yB_y(\hat{j}\times\hat{j})\)
\(= A_xB_x(0) + A_xB_y(\hat{k}) + A_yB_x(-\hat{k}) + A_yB_y(0) = (A_xB_y-A_yB_x)\hat{k}\)
var-def: Untuk vektor yang sama-sama terletak pada bidang X-Y (2D), hasil cross product-nya
  SELALU murni pada sumbu-Z (\(\hat{k}\)) — masuk akal, karena \(\hat{k}\) tegak lurus bidang
  X-Y yang memuat kedua vektor asal. Nilai skalarnya \((A_xB_y-A_yB_x)\) bisa positif (arah
  \(+\hat{k}\), keluar bidang / ke arah pembaca) atau negatif (arah \(-\hat{k}\), masuk bidang),
  tergantung urutan & posisi kedua vektor — inilah yang mendasari Kaidah Tangan Kanan secara
  aljabar, bukan cuma visual.

div.example-box (label: Soal · Torsi dari Vektor dalam Bentuk Komponen)
p.setup: Sebuah gaya \(\vec{F}=(2\hat{i}+5\hat{j})\) N bekerja pada benda dengan vektor lengan
  (posisi titik kerja gaya terhadap poros putar) \(\vec{r}=(3\hat{i}+4\hat{j})\) m. Tentukan
  torsi \(\vec{\tau}=\vec{r}\times\vec{F}\) yang dihasilkan!
ol:
  - Pakai rumus komponen cross product yang baru diturunkan: \(\vec{\tau} = \vec{r}\times\vec{F}
    = (r_xF_y - r_yF_x)\hat{k}\).
  - Substitusi: \(\tau_z = (3)(5) - (4)(2) = 15 - 8 = 7\).
  - Jadi \(\vec{\tau} = 7\hat{k}\) N·m — besarnya \(|\vec{\tau}|=7\) N·m, arahnya sepanjang
    sumbu-Z positif (keluar dari bidang kertas ke arah pembaca, sesuai Kaidah Tangan Kanan
    karena hasilnya positif).

p.body-text: Bentuk komponen lebih cepat dipakai kalau \(\vec{r}\) dan \(\vec{F}\) sudah dalam
  \(\hat{i}\), \(\hat{j}\) — nggak perlu cari besar \(r\), \(F\), \(\theta\) dulu seperti rumus
  \(\tau=rF\sin\theta\); hasilnya sama, cuma jalan pintas aljabar. (Shortened from this spec's
  first draft during rendering — the `dense` page-body modifier plus the original longer
  sentence still overflowed ~20px past the page bottom.)
```

## Page 5 — Ringkasan Rumus Vektor 2D & Tabel Perbandingan Dot vs Cross Product

A dense two-part reference page — full formula recap (revision-friendly single-page summary of
every formula across the whole chapter) plus the expanded comparison table (the HTML page only
keeps a compact 3-row version; the full 7-aspect version lives here per §5's "everything static
... reproduced in full, not summarized").

```
chapter-tag: Bab 2 · Referensi
subject-chip: Fisika

h2.section-title: Ringkasan Rumus Vektor Bidang 2D

table.ref-table (caption: Semua rumus bab ini dalam satu halaman)
| Konsep | Rumus | Keterangan |
|---|---|---|
| Komponen vektor | \(F_x=F\cos\theta\), \(F_y=F\sin\theta\) | θ dari sumbu-X positif |
| Notasi vektor satuan | \(\vec{F}=F_x\hat{i}+F_y\hat{j}\) | î, ĵ = vektor satuan sumbu X, Y |
| Magnitudo & arah dari komponen | \(\vert\vec{F}\vert=\sqrt{F_x^2+F_y^2}\), \(\theta=\arctan(F_y/F_x)\) | koreksi +180° jika Fx<0 |
| Resultan n vektor (analitis) | \(R_x=\sum F_{ix}\), \(R_y=\sum F_{iy}\), \(R=\sqrt{R_x^2+R_y^2}\) | berlaku untuk berapa pun n |
| Aturan Kosinus (2 vektor) | \(R=\sqrt{F_1^2+F_2^2+2F_1F_2\cos\alpha}\) (jumlah), \(D=\sqrt{F_1^2+F_2^2-2F_1F_2\cos\alpha}\) (selisih) | α = sudut apit, hanya utk 2 vektor |
| Dot product | \(\vec{A}\cdot\vec{B}=\vert\vec{A}\vert\vert\vec{B}\vert\cos\theta=A_xB_x+A_yB_y\) | hasil skalar |
| Usaha | \(W=\vec{F}\cdot\vec{s}=Fs\cos\theta\) | satuan Joule (J) |
| Cross product (magnitudo) | \(\vert\vec{A}\times\vec{B}\vert=\vert\vec{A}\vert\vert\vec{B}\vert\sin\theta\) | hasil vektor, arah via tangan kanan |
| Cross product (komponen 2D) | \(\vec{A}\times\vec{B}=(A_xB_y-A_yB_x)\hat{k}\) | hasil murni pada sumbu-Z |
| Torsi | \(\vec{\tau}=\vec{r}\times\vec{F}\), \(\vert\vec{\tau}\vert=rF\sin\theta\) | satuan N·m |

h2.section-title: Tabel Perbandingan Lengkap: Dot Product vs Cross Product

table.ref-table (caption: 7 aspek pembeda utama)
| Aspek | Dot Product (Perkalian Titik) | Cross Product (Perkalian Silang) |
|---|---|---|
| Jenis hasil | Skalar (cuma nilai) | Vektor (nilai + arah) |
| Rumus magnitudo/nilai | \(\vert\vec{A}\vert\vert\vec{B}\vert\cos\theta\) | \(\vert\vec{A}\vert\vert\vec{B}\vert\sin\theta\) |
| Rumus komponen (2D) | \(A_xB_x+A_yB_y\) | \((A_xB_y-A_yB_x)\hat{k}\) |
| Sifat urutan | Komutatif: \(\vec{A}\cdot\vec{B}=\vec{B}\cdot\vec{A}\) | Anti-komutatif: \(\vec{A}\times\vec{B}=-(\vec{B}\times\vec{A})\) |
| Nilai vektor satuan sejenis | \(\hat{i}\cdot\hat{i}=\hat{j}\cdot\hat{j}=1\) | \(\hat{i}\times\hat{i}=\hat{j}\times\hat{j}=0\) |
| Nilai vektor satuan beda | \(\hat{i}\cdot\hat{j}=0\) | \(\hat{i}\times\hat{j}=\hat{k}\), \(\hat{j}\times\hat{i}=-\hat{k}\) |
| Maksimum saat | \(\theta=0^{\circ}\) (segaris/sejajar) | \(\theta=90^{\circ}\) (tegak lurus) |
| Nol saat | \(\theta=90^{\circ}\) (tegak lurus) | \(\theta=0^{\circ}\) atau \(180^{\circ}\) (segaris) |
| Aplikasi fisis | Usaha: \(W=\vec{F}\cdot\vec{s}\) | Torsi: \(\vec{\tau}=\vec{r}\times\vec{F}\) |
```

## Page 6 — Kesalahan Umum

Recap of the chapter's four most common mistakes (each already flagged inline on the HTML page
as a `.law-strip` callout, gathered here in one place per the guide's "common mistakes" PDF
content type). Originally sketched as one combined "Kesalahan Umum & Latihan Tambahan" page in
this spec's first draft, but split into two separate pages (6 and 7 below) during rendering —
the combined version clipped ~167px past the page bottom (verified via `.page-body` scrollHeight
vs clientHeight), silently cutting off Soal 4 and Soal 5 entirely.

```
chapter-tag: Bab 2 · Kesalahan Umum
subject-chip: Fisika

h2.section-title: Kesalahan Umum yang Sering Terjadi

callout.mistake — 1. Jarak vs Perpindahan
❌ Salah: menganggap jarak dan perpindahan selalu sama nilainya.
✅ Benar: jarak (skalar) = total panjang lintasan; perpindahan (vektor) = perubahan posisi
  awal-akhir. Keduanya sama nilainya HANYA kalau geraknya lurus satu arah tanpa balik lagi.

callout.mistake — 2. Resultan Bukan Jumlah Aljabar Biasa
❌ Salah: menghitung R = F1+F2 langsung tanpa memperhatikan sudut apitnya.
✅ Benar: R=F1+F2 cuma benar kalau α=0° (searah persis). Begitu ada sudut apit, R harus
  dihitung lewat metode analitis atau Aturan Kosinus — hasilnya SELALU ≤ F1+F2.

callout.mistake — 3. cos itu Usaha, sin itu Torsi
❌ Salah: memakai sinθ untuk usaha atau cosθ untuk torsi (tertukar).
✅ Benar: Usaha (W=Fs cosθ) butuh komponen gaya SEJAJAR perpindahan. Torsi (τ=rF sinθ) butuh
  komponen gaya TEGAK LURUS lengan. Keduanya kebalikan, jangan dihafal sembarang.

callout.mistake — 4. Cross Product Hasilnya Vektor, Bukan Skalar
❌ Salah: menjawab hasil AxB sebagai sebuah angka saja (seperti hasil dot product).
✅ Benar: hasil cross product SELALU berupa vektor baru (tegak lurus bidang A dan B, arah via
  Kaidah Tangan Kanan) — kalau soal cuma minta "besarnya", jawabannya memang angka
  (\(\vert\vec{A}\times\vec{B}\vert\)), tapi hasil lengkapnya tetap sebuah vektor dengan arah.
```

## Page 7 — Latihan Tambahan

A short additional practice set (5 soal + pembahasan) per §5's "short additional practice set" —
overlaps in topic with the quiz JSON but uses different numbers so students see fresh practice.

```
chapter-tag: Bab 2 · Latihan Tambahan
subject-chip: Fisika

h2.section-title: Latihan Tambahan
p.lead: Lima soal terakhir menggabungkan semua sub-topik bab ini — coba kerjakan dulu sebelum
  lihat pembahasannya.

ol.ref-list:
  - <b>Soal 1.</b> Manakah pasangan berikut yang keduanya besaran skalar: (a) gaya & tekanan,
    (b) energi & suhu, (c) kecepatan & percepatan, (d) momentum & perpindahan?
    <i>Pembahasan: (b) — energi dan suhu sama-sama tidak punya arah. Gaya & momentum & kecepatan
    & percepatan & perpindahan semuanya vektor; tekanan sebenarnya skalar juga, tapi pasangannya
    di opsi (a) yaitu gaya adalah vektor, jadi opsi (a) gugur.</i>
  - <b>Soal 2.</b> Sebuah gaya \(F=100\) N membentuk sudut \(53^{\circ}\) terhadap sumbu-X
    positif (gunakan \(\sin 53^{\circ}\approx 0{,}8\), \(\cos 53^{\circ}\approx 0{,}6\)). Tentukan
    \(F_x\) dan \(F_y\)! <i>Pembahasan: \(F_x=100\times 0{,}6=60\) N, \(F_y=100\times 0{,}8=80\)
    N.</i>
  - <b>Soal 3.</b> Dua vektor gaya 6 N dan 8 N membentuk sudut apit 90°. Hitung besar
    resultannya! <i>Pembahasan: \(R=\sqrt{6^2+8^2+2(6)(8)\cos 90^{\circ}}=\sqrt{36+64+0}=
    \sqrt{100}=10\) N (Aturan Kosinus otomatis jadi Pythagoras saat α=90°).</i>
  - <b>Soal 4.</b> Diketahui \(\vec{A}=(4\hat{i}+3\hat{j})\) N dan \(\vec{B}=(2\hat{i}+6\hat{j})\)
    m. Hitung \(\vec{A}\cdot\vec{B}\)! <i>Pembahasan: \(A\cdot B = (4\times2)+(3\times6) =
    8+18=26\).</i>
  - <b>Soal 5.</b> Sebuah gaya \(F=30\) N bekerja pada lengan momen \(r=0{,}4\) m dengan sudut
    \(90^{\circ}\) terhadap lengan. Hitung besar torsinya! <i>Pembahasan: \(\tau=rF\sin\theta=
    0{,}4\times30\times\sin90^{\circ}=12\times1=12\) N·m.</i>
```
