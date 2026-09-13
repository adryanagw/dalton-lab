# PDF Companion Spec — Bab 2 Matematika: Fungsi, Komposisi & Fungsi Invers

Curated content for the PDF companion, built on `public/assets/pdf-template/page-template.html`
(`.pdf-page[data-subject="matematika"]`, `--accent:#2f7edb`). Not an export of the HTML page —
per CHAPTER_CONTENT_GUIDE.md §5, all dense reference material (the 5-row tabel rumus cepat
invers, the algebraic injektif/surjektif test, all 5 worked examples from the source rangkuman
plus 2 PDF-exclusive derivations) lives here in full. The HTML lesson keeps only short
definitional prose, the 6 real diagrams (extracted from the source PDF, never hand-redrawn) with
their direct explanatory paragraph, and two compact "Contoh Cepat" one-liners per concept that
point back here for the full worked version. Every page is self-contained.

11 pages: 1 chapter-opener + 10 content pages.

## Page 1 — Chapter opener

```
chapter-tag: Bab 2
subject-chip: Matematika
h1.page-title: Fungsi, Komposisi & Fungsi Invers
p.dek: Materi PDF — pelengkap Bab 2
p.lead: Materi tambahan ini fokus ke tabel rumus cepat invers lengkap, cara menguji
  injektif/surjektif secara aljabar, pembuktian kenapa rumus cepatnya bisa begitu, dan
  5+ contoh soal tambahan tingkat lanjut — pelengkap materi & Drill Soal di halaman
  utama, bukan salinannya.
h2.section-title: Yang akan kamu pelajari
ul.learn-list:
  - Tabel lengkap 3 syarat domain alami plus contoh soal domain gabungan tingkat lanjut
  - Cara menguji injektif & surjektif secara aljabar (bukan cuma dari diagram panah)
  - Tabel lengkap operasi aljabar fungsi & sifat operasi komposisi, plus contoh soal
    evaluasi komposisi dan mencari komponen fungsi g(x)
  - Tabel rumus cepat lengkap invers fungsi aljabar (linear, pecahan rasional, akar,
    kuadrat, eksponen) dengan syarat masing-masing
  - Pembuktian (derivasi) rumus cepat invers linear & pecahan rasional
  - Contoh soal tambahan invers pecahan rasional & invers fungsi komposisi berantai
  - Pengayaan lanjutan fungsi floor & ceiling plus latihan menyelesaikan persamaannya
  - Latihan tambahan singkat dengan kunci jawaban
```

## Page 2 — Referensi: Domain Alami & Contoh Soal Gabungan

Previously in HTML under `#domain-alami` as a compact struct-num list + one-line law-strip —
the HTML keeps the 3 syarat as short definitions with the quick combined example one-liner;
the full step-by-step working of that combined example, plus a second harder domain example
(logaritma + akar bersarang), is reproduced here in full.

| # | Bentuk | Syarat | Contoh |
|---|---|---|---|
| 1 | Pecahan \(f(x)=\dfrac{g(x)}{h(x)}\) | \(h(x)\neq0\) | \(f(x)=\dfrac1{x-3}\Rightarrow x\neq3\) |
| 2 | Akar Genap \(f(x)=\sqrt{g(x)}\) | \(g(x)\geq0\) | \(f(x)=\sqrt{x-4}\Rightarrow x\geq4\) |
| 3 | Logaritma \(f(x)={}^{a}\log(g(x))\) | \(g(x)>0\), \(a>0, a\neq1\) | \(f(x)={}^{2}\log(x+1)\Rightarrow x>-1\) |

```
chapter-tag: Bab 2 · Domain Alami
subject-chip: Matematika

h2.section-title: Referensi: Domain Alami & Contoh Soal Gabungan
p.lead: Tiga bentuk pembatas domain, lengkap dengan dua contoh soal yang menggabungkan
  lebih dari satu syarat sekaligus — gaya soal yang paling sering bikin salah.

[ref-table di atas]

example-box — Contoh Soal 1: Domain Gabungan Akar & Pecahan
p.setup: Tentukan daerah asal (domain) alami dari \(f(x)=\dfrac{\sqrt{x^2-9}}{x-5}\).
ol:
  1. Syarat akar: nilai di dalam akar genap harus non-negatif — \(x^2-9\geq0
     \iff (x-3)(x+3)\geq0\). Dengan pembuat nol \(x=3\) dan \(x=-3\), uji tanda pada
     garis bilangan menghasilkan \(x\leq-3\) atau \(x\geq3\).
  2. Syarat pecahan: penyebut tidak boleh nol — \(x-5\neq0 \iff x\neq5\).
  3. Domain akhir adalah irisan dari kedua syarat: \(D_f=\{x\in\mathbb{R}\mid(x\leq-3
     \text{ atau } x\geq3)\text{ dan } x\neq5\}\). Perhatikan 5 memang sudah ada di
     rentang \(x\geq3\), makanya harus dicoret secara eksplisit.

example-box — Contoh Soal 2: Domain Gabungan Logaritma & Akar
p.setup: Tentukan domain alami dari \(f(x)={}^{3}\log\left(\sqrt{x+2}\right)\).
ol:
  1. Syarat akar (di dalam logaritma): \(x+2\geq0 \iff x\geq-2\).
  2. Syarat numerus logaritma: numerus \(\sqrt{x+2}\) harus lebih besar dari 0 (bukan
     hanya ≥0, karena numerus log harus tegas positif): \(\sqrt{x+2}>0 \iff x+2>0
     \iff x>-2\).
  3. Karena syarat kedua (\(x>-2\)) lebih ketat dan sudah mencakup syarat pertama,
     domainnya adalah \(D_f=\{x\in\mathbb{R}\mid x>-2\}\).

callout.mistake — Kesalahan Umum
❌ Salah: pada Contoh Soal 2, menyamakan syarat akar (\(x\geq-2\)) dengan syarat
  numerus log dan berhenti di \(x\geq-2\) — lupa bahwa numerus log tidak boleh nol.
✅ Benar: kalau bentuk akar berada di dalam logaritma, syarat numerus log (\(>0\),
  bukan \(\geq0\)) selalu lebih ketat daripada syarat akarnya sendiri — cek keduanya
  secara terpisah, jangan asumsikan salah satu otomatis mencakup yang lain.
```

## Page 3 — Menguji Injektif & Surjektif Secara Aljabar

Not previously in the HTML — the HTML `#sifat-pemetaan` section only shows the diagram-panah
method (visual, works for finite/discrete sets). This page adds the algebraic method needed
for continuous algebraic functions, which is what actually shows up in ujian soal.

```
chapter-tag: Bab 2 · Sifat Pemetaan
subject-chip: Matematika

h2.section-title: Menguji Injektif & Surjektif Secara Aljabar
p.lead: Diagram panah cuma praktis untuk himpunan kecil & diskret. Untuk fungsi
  aljabar (domain tak hingga), pakai dua uji berikut.

h2.section-title: Uji Injektif — Metode f(x₁) = f(x₂)
p.body-text: Andaikan \(f(x_1)=f(x_2)\), lalu selesaikan secara aljabar. Kalau
  hasil akhirnya memaksa \(x_1=x_2\), fungsi itu injektif. Kalau ada solusi lain
  di mana \(x_1\neq x_2\) tetap memenuhi, fungsi itu tidak injektif.

example-box — Contoh: Uji Injektif f(x) = 3x + 5
p.setup: Buktikan f(x) = 3x+5 injektif menggunakan definisi.
ol:
  1. Andaikan \(f(x_1)=f(x_2)\): \(3x_1+5=3x_2+5\).
  2. Kurangi 5 dari kedua ruas: \(3x_1=3x_2\).
  3. Bagi kedua ruas dengan 3: \(x_1=x_2\). Karena pengandaian \(f(x_1)=f(x_2)\)
     selalu memaksa \(x_1=x_2\), maka f(x)=3x+5 terbukti injektif.

example-box — Contoh: Uji Injektif f(x) = x²  (domain semua real)
p.setup: Selidiki apakah f(x) = x² injektif pada domain semua bilangan real.
ol:
  1. Andaikan \(f(x_1)=f(x_2)\): \(x_1^2=x_2^2\).
  2. Ini tidak memaksa \(x_1=x_2\) — bisa juga \(x_1=-x_2\) (dua akar berbeda dari
     bilangan kuadrat yang sama).
  3. Contoh konkret: \(x_1=-2, x_2=2\), keduanya berbeda tapi \(f(-2)=f(2)=4\).
     Jadi f(x)=x² pada domain semua real <b>tidak injektif</b>.

h2.section-title: Uji Surjektif — Metode Menyelesaikan x dalam y
p.body-text: Misalkan \(y=f(x)\), lalu selesaikan x dalam bentuk y. Kalau untuk
  <i>setiap</i> nilai y di kodomain selalu ada x real yang memenuhi, fungsi itu
  surjektif terhadap kodomain tersebut.

example-box — Contoh: Uji Surjektif f(x) = 2x − 1 (kodomain semua real)
p.setup: Selidiki apakah f(x) = 2x−1 surjektif terhadap kodomain ℝ.
ol:
  1. Misalkan \(y=2x-1\), selesaikan x: \(x=\dfrac{y+1}{2}\).
  2. Untuk sembarang nilai real y, \(x=\dfrac{y+1}{2}\) selalu berupa bilangan real
     yang sah (tidak ada pembatas).
  3. Karena setiap y di kodomain selalu punya pasangan x di domain, f(x)=2x−1
     terbukti surjektif terhadap ℝ.

callout.mistake — Kesalahan Umum
❌ Salah: menyimpulkan fungsi kuadrat f(x)=x² TIDAK PERNAH bijektif dalam kondisi
  apa pun.
✅ Benar: f(x)=x² tidak injektif kalau domainnya semua real, TAPI kalau domainnya
  dibatasi (misalnya hanya \(x\geq0\)), fungsi itu jadi injektif (karena tidak ada
  lagi pasangan \(x_1=-x_2\) yang mungkin) — begitulah caranya fungsi kuadrat bisa
  dibuat bijektif dan akhirnya punya invers (lihat Halaman 8).
```

## Page 4 — Referensi: Operasi Aljabar Fungsi & Sifat Komposisi

Previously in HTML under `#fungsi-komposisi` as a `.two-col` split-card pair — the HTML keeps
the compact version; this reproduces both tables in full with every variable/domain condition
spelled out plus a proof of the associative property.

| Operasi | Rumus | Syarat Domain |
|---|---|---|
| Penjumlahan | \((f+g)(x)=f(x)+g(x)\) | \(D_f \cap D_g\) |
| Pengurangan | \((f-g)(x)=f(x)-g(x)\) | \(D_f \cap D_g\) |
| Perkalian | \((f\cdot g)(x)=f(x)\cdot g(x)\) | \(D_f \cap D_g\) |
| Pembagian | \(\left(\dfrac{f}{g}\right)(x)=\dfrac{f(x)}{g(x)}\) | \(D_f \cap D_g\), dan \(g(x)\neq0\) |

```
chapter-tag: Bab 2 · Komposisi Fungsi
subject-chip: Matematika

h2.section-title: Referensi: Operasi Aljabar Fungsi & Sifat Komposisi
p.lead: Domain hasil operasi aljabar fungsi selalu irisan domain kedua fungsi asal —
  detail yang sering dilewatkan siswa karena fokus cuma ke rumusnya saja.

[ref-table di atas]

p.body-text: Domain dari hasil penjumlahan/pengurangan/perkalian dua fungsi selalu
  irisan (∩) domain masing-masing fungsi asal — kalau f hanya terdefinisi untuk
  \(x\geq0\) dan g untuk semua real, maka \(f+g\) hanya terdefinisi untuk
  \(x\geq0\) juga. Untuk pembagian, ada syarat tambahan: nilai x yang membuat
  penyebut \(g(x)=0\) harus dicoret juga dari irisan itu.

example-box — Pembuktian: Sifat Asosiatif Komposisi
p.setup: Buktikan \((f\circ(g\circ h))(x) = ((f\circ g)\circ h)(x)\) untuk sembarang
  fungsi f, g, h.
ol:
  1. Ruas kiri: \((f\circ(g\circ h))(x) = f((g\circ h)(x)) = f(g(h(x)))\) — h
     dikerjakan dulu, hasilnya masuk g, hasilnya masuk f.
  2. Ruas kanan: \(((f\circ g)\circ h)(x) = (f\circ g)(h(x)) = f(g(h(x)))\) — h
     dikerjakan dulu, hasilnya masuk ke gabungan \((f\circ g)\), yang berarti masuk
     g dulu baru f.
  3. Kedua ruas sama-sama berakhir di \(f(g(h(x)))\) — urutan pengerjaannya
     identik (h, lalu g, lalu f) di kedua cara pengelompokan. Terbukti asosiatif.

callout.mistake — Kesalahan Umum
❌ Salah: mengira sifat asosiatif berarti \((f\circ g)(x)\) boleh ditukar jadi
  \((g\circ f)(x)\) selama masih ada h di soal.
✅ Benar: asosiatif cuma soal <i>pengelompokan tanda kurung</i> pada komposisi
  tiga fungsi atau lebih — urutan f, g, h dari dalam ke luar (h→g→f) tetap sama
  dan tidak boleh ditukar. Ini beda dari sifat komutatif (yang memang TIDAK
  berlaku pada komposisi).
```

## Page 5 — Contoh Soal Tambahan: Evaluasi & Komponen Komposisi

Directly reproduces Soal 2 & Soal 3 from the source rangkuman in full, plus one harder
"mencari f(x) dari g dan hasil komposisi" variant not in the source.

```
chapter-tag: Bab 2 · Komposisi Fungsi
subject-chip: Matematika

h2.section-title: Contoh Soal Tambahan: Evaluasi & Mencari Komponen Fungsi
p.lead: Dua gaya soal komposisi yang paling sering keluar ujian — menghitung nilai
  komposisi di satu titik, dan membalik proses untuk mencari komponen fungsi yang
  belum diketahui.

example-box — Contoh Soal: Evaluasi Nilai Komposisi Fungsi
p.setup: Diketahui f(x) = 2x² − 3x + 1 dan g(x) = x + 4. Hitung (f∘g)(2).
ol:
  1. Hitung nilai g(2) terlebih dahulu: \(g(2)=2+4=6\).
  2. Substitusikan hasil g(2)=6 ke dalam fungsi f(x): \(f(6)=2(6)^2-3(6)+1 =
     2(36)-18+1 = 72-18+1=55\).
  3. Jadi, nilai \((f\circ g)(2)=55\).

example-box — Contoh Soal: Menentukan Komponen Fungsi g(x)
p.setup: Diketahui f(x) = 3x − 2 dan (f∘g)(x) = 6x² + 9x + 7. Tentukan rumus g(x).
ol:
  1. Berdasarkan definisi komposisi: \((f\circ g)(x)=f(g(x))=3\cdot g(x)-2\).
  2. Samakan dengan persamaan yang diketahui: \(3\cdot g(x)-2 = 6x^2+9x+7\).
  3. Tambahkan 2 ke kedua ruas: \(3\cdot g(x) = 6x^2+9x+9\).
  4. Bagi kedua ruas dengan 3: \(g(x) = 2x^2+3x+3\).

example-box — Contoh Soal: Menentukan Komponen Fungsi f(x) (Variasi Terbalik)
p.setup: Diketahui g(x) = x + 1 dan (f∘g)(x) = 2x² + 4x + 5. Tentukan rumus f(x).
ol:
  1. \((f\circ g)(x) = f(g(x)) = f(x+1) = 2x^2+4x+5\). Di sini yang belum diketahui
     adalah f, sedangkan "isi" dari f adalah \(x+1\), bukan x — perlu permisalan.
  2. Misalkan \(u=x+1\), sehingga \(x=u-1\). Substitusikan ke ruas kanan:
     \(f(u) = 2(u-1)^2+4(u-1)+5\).
  3. Jabarkan: \(2(u^2-2u+1)+4u-4+5 = 2u^2-4u+2+4u+1 = 2u^2+3\).
  4. Ganti u menjadi x: \(f(x)=2x^2+3\).

callout.mistake — Kesalahan Umum
❌ Salah: pada contoh ketiga, langsung mengganti \(x+1\) menjadi x tanpa permisalan,
  sehingga menjawab \(f(x)=2x^2+4x+5\) (menyalin ruas kanan apa adanya).
✅ Benar: karena yang diketahui adalah f(g(x)), bukan f(x) secara langsung, wajib
  memisalkan \(u=g(x)=x+1\) lalu menyatakan x dalam u (\(x=u-1\)) sebelum
  menyubstitusi — baru kemudian ganti u kembali menjadi x di jawaban akhir.
```

## Page 6 — Referensi: Tabel Rumus Cepat Invers Fungsi Aljabar

Previously in HTML under `#fungsi-invers` as a `.law-strip` mentioning only 2 of the 5 rows —
the HTML keeps that compact 2-row mention; the full 5-row table is reproduced here in full,
exactly as the source rangkuman's "Tabel Rumus Cepat Invers Fungsi Aljabar".

| Bentuk Fungsi f(x) | Bentuk Invers f⁻¹(x) | Catatan / Syarat |
|---|---|---|
| Linear: \(ax+b\) | \(\dfrac{x-b}{a}\) | \(a\neq0\) |
| Pecahan Rasional: \(\dfrac{ax+b}{cx+d}\) | \(\dfrac{-dx+b}{cx-a}\) | \(x\neq\dfrac{a}{c}, c\neq0\) |
| Bentuk Akar: \(\sqrt[n]{ax+b}\) | \(\dfrac{x^n-b}{a}\) | \(a\neq0\) |
| Kuadrat: \(ax^2+bx+c\) | \(\dfrac{-b\pm\sqrt{b^2-4a(c-x)}}{2a}\) | Dibatasi pada domainnya |
| Eksponen: \(a^{cx}\) | \(\dfrac1c\cdot{}^{a}\log(x)\) | \(x>0, a>0, a\neq1\) |

```
chapter-tag: Bab 2 · Rumus Cepat Invers
subject-chip: Matematika

h2.section-title: Referensi: Tabel Rumus Cepat Invers Fungsi Aljabar
p.lead: Lima bentuk fungsi aljabar yang paling sering muncul, dengan rumus invers
  siap pakai — tetap ingat rumus ini adalah jalan pintas dari langkah baku (misalkan
  y, selesaikan x, tukar simbol), bukan pengganti pemahamannya.

[ref-table di atas]

p.body-text: Untuk bentuk kuadrat, tanda ± di rumus cepatnya HARUS dipilih salah satu
  sesuai domain yang dibatasi pada soal (lihat Halaman 8) — kalau domain asal
  dibatasi \(x\geq -b/2a\) (setengah parabola kanan), ambil tanda +; kalau dibatasi
  \(x\leq -b/2a\) (setengah parabola kiri), ambil tanda −. Untuk bentuk eksponen,
  hasil inversnya berbentuk logaritma — konsisten dengan hubungan eksponen &
  logaritma yang sudah dipelajari di Bab 1.
```

## Page 7 — Pembuktian (Derivasi) Rumus Cepat Invers

Not previously in the HTML — PDF-exclusive derivation content per CHAPTER_CONTENT_GUIDE.md
§3/§6 ("not every formula needs its derivation on the HTML page; a genuinely useful one can
live in the PDF instead"), showing where the two most-used rows of the Page 6 table actually
come from (applying the langkah baku from the HTML's `#fungsi-invers` section to the general
form).

```
chapter-tag: Bab 2 · Pembuktian
subject-chip: Matematika

h2.section-title: Dari Mana Rumus Cepat Invers Itu Berasal?
p.lead: Dua rumus cepat yang paling sering dipakai (linear & pecahan rasional)
  diturunkan langsung dari langkah baku mencari invers — bukan rumus hafalan lepas.

example-box — Derivasi: Invers Fungsi Linear f(x) = ax + b
ol:
  1. Misalkan \(y=f(x)=ax+b\).
  2. Selesaikan x dalam bentuk y: kurangi b dari kedua ruas, \(y-b=ax\), lalu bagi
     dengan a (syarat \(a\neq0\)): \(x=\dfrac{y-b}{a}\).
  3. Ganti x menjadi \(f^{-1}(x)\) dan y menjadi x: \(f^{-1}(x)=\dfrac{x-b}{a}\) —
     persis rumus cepat di tabel Halaman 6.

example-box — Derivasi: Invers Fungsi Pecahan Rasional f(x) = (ax+b)/(cx+d)
ol:
  1. Misalkan \(y=\dfrac{ax+b}{cx+d}\), dengan \(cx+d\neq0\).
  2. Kalikan silang: \(y(cx+d) = ax+b\), lalu jabarkan: \(cxy+dy = ax+b\).
  3. Kumpulkan semua suku berisi x ke satu ruas: \(cxy - ax = b - dy\).
  4. Faktorkan x: \(x(cy-a) = b-dy\), lalu bagi kedua ruas dengan \((cy-a)\) (syarat
     \(cy-a\neq0\)): \(x = \dfrac{b-dy}{cy-a} = \dfrac{-dy+b}{cy-a}\).
  5. Ganti x menjadi \(f^{-1}(x)\) dan y menjadi x: \(f^{-1}(x)=\dfrac{-dx+b}{cx-a}\)
     — persis rumus cepat di tabel Halaman 6. Syarat \(x\neq\dfrac{a}{c}\) muncul
     dari syarat pembagi \(cx-a\neq0\) di langkah ini.

callout.mistake — Kesalahan Umum
❌ Salah: menghafal rumus cepat pecahan rasional sebagai "tukar posisi a dan b, lalu
  d dan c" secara sembarangan tanpa tahu tanda mana yang berubah.
✅ Benar: dari derivasi di atas, yang benar-benar terjadi adalah a dan d bertukar
  posisi DAN keduanya berganti tanda relatif terhadap posisi awal — b dan c tetap
  di tempatnya. Cara paling aman tetap menurunkan ulang dari langkah baku kalau ragu.
```

## Page 8 — Contoh Soal Tambahan: Invers Pecahan Rasional & Invers Kuadrat

Reproduces Soal 4 from the source rangkuman in full, plus one additional worked example on
inverting a domain-restricted quadratic (referenced from the Page 6 table note and Page 3's
injective test, tying the whole chapter together).

```
chapter-tag: Bab 2 · Fungsi Invers
subject-chip: Matematika

h2.section-title: Contoh Soal Tambahan: Invers Pecahan Rasional & Invers Kuadrat
p.lead: Satu contoh langsung pakai rumus cepat, satu lagi contoh kenapa domain
  harus dibatasi dulu sebelum fungsi kuadrat bisa dicari inversnya.

example-box — Contoh Soal: Menentukan Invers Pecahan Rasional
p.setup: Tentukan fungsi invers dari f(x) = (4x−5)/(2x+3), untuk x ≠ −3/2.
ol:
  1. Gunakan rumus cepat pecahan rasional: untuk \(f(x)=\dfrac{ax+b}{cx+d}
     \Rightarrow f^{-1}(x)=\dfrac{-dx+b}{cx-a}\).
  2. Dari soal diperoleh: \(a=4, b=-5, c=2, d=3\).
  3. Substitusikan: \(f^{-1}(x)=\dfrac{-3x-5}{2x-4}\), atau ekuivalen ditulis
     \(f^{-1}(x)=\dfrac{3x+5}{4-2x}\), dengan syarat \(x\neq2\) (dari \(x\neq a/c=4/2\)).

example-box — Contoh Soal: Invers Fungsi Kuadrat dengan Domain Dibatasi
p.setup: Tentukan fungsi invers dari f(x) = x² − 4x + 7, untuk domain dibatasi
  x ≥ 2.
ol:
  1. Cek dulu kenapa domain harus dibatasi: bentuk \(x^2-4x+7\) adalah parabola
     dengan sumbu simetri di \(x=2\) (dari \(-b/2a = 4/2 = 2\)). Tanpa pembatasan,
     fungsi ini tidak injektif (lihat uji Halaman 3). Domain \(x\geq2\) mengambil
     cabang kanan parabola saja, yang sudah injektif.
  2. Misalkan \(y=x^2-4x+7\). Lengkapkan kuadrat sempurna: \(y = (x-2)^2+3\), jadi
     \((x-2)^2 = y-3\).
  3. Akarkan kedua ruas: \(x-2 = \pm\sqrt{y-3}\). Karena domain dibatasi \(x\geq2\),
     ambil tanda + saja: \(x = 2+\sqrt{y-3}\).
  4. Ganti x menjadi \(f^{-1}(x)\) dan y menjadi x: \(f^{-1}(x) = 2+\sqrt{x-3}\),
     dengan domain \(x\geq3\) (nilai minimum fungsi asal).

callout.mistake — Kesalahan Umum
❌ Salah: pada contoh kuadrat, menuliskan \(f^{-1}(x)=2\pm\sqrt{x-3}\) (tetap
  menyertakan kedua tanda ± di jawaban akhir).
✅ Benar: begitu domain fungsi asal sudah dibatasi (di sini \(x\geq2\)), invers-nya
  WAJIB memilih hanya satu tanda yang konsisten dengan pembatasan itu — hasil akhir
  fungsi invers harus tetap berupa fungsi (satu output per input), bukan dua
  kemungkinan sekaligus.
```

## Page 9 — Invers dari Fungsi Komposisi: Pembuktian & Contoh Berantai

Reproduces Soal 5 from the source rangkuman, plus a proof of the invers-komposisi identity and
one harder 3-fungsi chained example not in the source.

```
chapter-tag: Bab 2 · Invers Komposisi
subject-chip: Matematika

h2.section-title: Invers dari Fungsi Komposisi: Kenapa Urutannya Dibalik?
p.lead: Pembuktian singkat kenapa \((f\circ g)^{-1}(x)=(g^{-1}\circ f^{-1})(x)\),
  lalu dua contoh soal — satu langsung dari source, satu contoh rantai 3 fungsi.

example-box — Pembuktian: (f∘g)⁻¹(x) = (g⁻¹∘f⁻¹)(x)
ol:
  1. Misalkan \(z=(f\circ g)(x)=f(g(x))\). Tujuannya adalah menyatakan x kembali
     dalam bentuk z, yaitu mencari \((f\circ g)^{-1}(z)\).
  2. Karena \(z=f(g(x))\), terapkan \(f^{-1}\) di kedua ruas: \(f^{-1}(z) =
     f^{-1}(f(g(x))) = g(x)\) (karena \(f^{-1}\circ f\) saling meniadakan).
  3. Terapkan \(g^{-1}\) di kedua ruas: \(g^{-1}(f^{-1}(z)) = g^{-1}(g(x)) = x\)
     (karena \(g^{-1}\circ g\) saling meniadakan).
  4. Jadi \(x = g^{-1}(f^{-1}(z)) = (g^{-1}\circ f^{-1})(z)\). Karena x adalah hasil
     dari \((f\circ g)^{-1}(z)\), terbukti \((f\circ g)^{-1} = g^{-1}\circ f^{-1}\)
     — urutannya dibalik karena proses "membongkar" komposisi harus dimulai dari
     fungsi yang paling luar (f) dulu, baru fungsi yang paling dalam (g).

example-box — Contoh Soal: Aplikasi Invers Fungsi Komposisi
p.setup: Jika f⁻¹(x) = (x+1)/2 dan g⁻¹(x) = 3x − 4, tentukan nilai dari (f∘g)⁻¹(3).
ol:
  1. Gunakan sifat invers komposisi: \((f\circ g)^{-1}(x) = (g^{-1}\circ f^{-1})(x)\).
  2. Hitung nilai \(f^{-1}(3)\) terlebih dahulu: \(f^{-1}(3)=\dfrac{3+1}{2}=2\).
  3. Masukkan hasil ke \(g^{-1}(x)\): \(g^{-1}(2)=3(2)-4=2\).
  4. Jadi, nilai dari \((f\circ g)^{-1}(3) = 2\).

example-box — Contoh Soal: Invers Komposisi 3 Fungsi Berantai
p.setup: Jika f⁻¹(x) = x+2, g⁻¹(x) = 2x, dan h⁻¹(x) = x−1, tentukan nilai dari
  (f∘g∘h)⁻¹(5).
ol:
  1. Perluasan sifat invers komposisi untuk 3 fungsi: \((f\circ g\circ h)^{-1}(x) =
     (h^{-1}\circ g^{-1}\circ f^{-1})(x)\) — urutannya dibalik total, dari f
     (terluar) jadi paling akhir dibongkar.
  2. Hitung dari yang paling dalam sesuai urutan baru: \(f^{-1}(5) = 5+2 = 7\).
  3. Masukkan ke \(g^{-1}\): \(g^{-1}(7) = 2(7) = 14\).
  4. Masukkan ke \(h^{-1}\): \(h^{-1}(14) = 14-1 = 13\).
  5. Jadi, nilai dari \((f\circ g\circ h)^{-1}(5) = 13\).

callout.mistake — Kesalahan Umum
❌ Salah: pada soal rantai 3 fungsi, membongkar dengan urutan asli (f⁻¹, lalu g⁻¹,
  lalu h⁻¹) karena "kelihatan lebih natural" mengikuti urutan penulisan f∘g∘h.
✅ Benar: makin banyak fungsi yang dirantai, aturan pembalikan urutan berlaku untuk
  SEMUANYA — bukan cuma dua fungsi terluar. Urutan invers-nya selalu persis
  kebalikan dari urutan komposisi aslinya.
```

## Page 10 — Pengayaan Lanjutan: Fungsi Floor & Ceiling

Previously in HTML under `#pengayaan-tangga` as a compact two-col split-card with the diagram
kept in HTML — the HTML keeps the definitions + diagram; extended properties and an equation-
solving example are PDF-exclusive additions (floor/ceiling equations are a real, if uncommon,
UTBK/olimpiade question style; not fabricated, standard step-function properties).

```
chapter-tag: Bab 2 · Pengayaan
subject-chip: Matematika

h2.section-title: Pengayaan Lanjutan: Fungsi Floor & Ceiling
p.lead: Beberapa sifat tambahan fungsi tangga, plus cara menyelesaikan persamaan
  sederhana yang melibatkan floor/ceiling — gaya soal yang muncul di olimpiade &
  soal HOTS.

p.body-text: Beberapa sifat penting: untuk x bilangan bulat, \(\lfloor x\rfloor =
  \lceil x\rceil = x\) (tidak ada pembulatan). Untuk x bukan bilangan bulat, selalu
  berlaku \(\lceil x\rceil = \lfloor x\rfloor + 1\) (ceiling selalu satu lebih besar
  dari floor). Kedua fungsi ini bersifat non-turun (semakin besar x, nilainya tidak
  pernah mengecil) tapi TIDAK injektif — banyak nilai x berbeda (misalnya semua x di
  interval [3, 4)) menghasilkan \(\lfloor x\rfloor\) yang sama, yaitu 3.

example-box — Contoh Soal: Menyelesaikan Persamaan Floor
p.setup: Tentukan semua nilai x yang memenuhi ⌊2x⌋ = 5.
ol:
  1. Menurut definisi floor, \(\lfloor2x\rfloor=5\) berarti 5 adalah bilangan bulat
     terbesar yang \(\leq 2x\), sehingga \(2x\) harus berada di interval
     \(5 \leq 2x < 6\) (kalau \(2x\) sudah mencapai 6, floor-nya akan jadi 6, bukan
     5 lagi).
  2. Bagi seluruh pertidaksamaan dengan 2: \(2.5 \leq x < 3\).
  3. Jadi himpunan penyelesaiannya adalah semua x di interval \([2.5, 3)\) — bukan
     satu nilai tunggal, karena floor bukan fungsi injektif.

callout.mistake — Kesalahan Umum
❌ Salah: menjawab persamaan floor/ceiling dengan satu nilai x tunggal, seperti
  menyelesaikan persamaan aljabar biasa.
✅ Benar: karena floor & ceiling bukan fungsi injektif, penyelesaiannya hampir
  selalu berupa <i>interval</i> nilai x, bukan satu titik — selalu ubah dulu jadi
  bentuk pertidaksamaan ganda sebelum menjawab.
```

## Page 11 — Latihan Tambahan (dengan Kunci Jawaban)

Short additional practice set per CHAPTER_CONTENT_GUIDE.md §5, spanning the whole chapter.
Answer key inline since this is a static PDF page — the Drill Soal quiz on the HTML page
remains the graded/interactive practice.

```
chapter-tag: Bab 2 · Latihan Tambahan
subject-chip: Matematika

h2.section-title: Latihan Tambahan
p.lead: Tujuh soal campuran domain, komposisi, invers, dan floor/ceiling untuk
  pemanasan sebelum masuk ke Drill Soal interaktif di halaman utama — kunci jawaban
  ada di bawah tiap soal.

ol.ref-list:
  1. Tentukan domain alami dari \(f(x)=\sqrt{5-x}\Big/(x+1)\).
     Jawaban: syarat akar \(5-x\geq0\Rightarrow x\leq5\); syarat pecahan
     \(x\neq-1\). Gabungan: \(x\leq5\) dan \(x\neq-1\).
  2. Diketahui f(x) = x−2 dan g(x) = x². Tentukan (g∘f)(3).
     Jawaban: \(f(3)=1\), \(g(1)=1\). Jadi \((g\circ f)(3)=1\).
  3. Diketahui f(x) = 2x+3 dan (f∘g)(x) = 4x²+6. Tentukan g(x).
     Jawaban: \(2\cdot g(x)+3=4x^2+6 \Rightarrow g(x) = 2x^2+1{,}5\).
  4. Tentukan invers dari f(x) = (3x−1)/(x+2), x≠−2.
     Jawaban: a=3,b=−1,c=1,d=2 → \(f^{-1}(x)=\dfrac{-2x-1}{x-3}\), \(x\neq3\).
  5. Jika f⁻¹(x) = x−4 dan g⁻¹(x) = 2x+1, tentukan (g∘f)⁻¹(6).
     Jawaban: \((g\circ f)^{-1}=f^{-1}\circ g^{-1}\). \(g^{-1}(6)=13\), lalu
     \(f^{-1}(13)=9\). Jadi hasilnya 9.
  6. Tentukan nilai dari ⌊−4.2⌋ + ⌈4.2⌉.
     Jawaban: \(\lfloor-4.2\rfloor=-5\), \(\lceil4.2\rceil=5\). Jumlahnya \(0\).
  7. Selidiki apakah f(x) = 5 (fungsi konstan) merupakan fungsi injektif.
     Jawaban: Tidak — semua x berbeda menghasilkan output yang sama (5), sehingga
     jelas melanggar definisi injektif (\(x_1\neq x_2\) tapi \(f(x_1)=f(x_2)\)).
```
