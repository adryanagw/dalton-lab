# PDF Companion Spec — Bab 1 Matematika: Eksponen & Logaritma

Curated content for the PDF companion, built on `public/assets/pdf-template/page-template.html`
(`.pdf-page[data-subject="matematika"]`). Not an export of the HTML page — per
CHAPTER_CONTENT_GUIDE.md §5, entire non-interactive reference content (the two dense
sifat tables, the bentuk-pangkat breakdown, the bentuk-akar operation lists) was removed
from the HTML lesson entirely and is rewritten here in full. Matematika is equation-dense
per §5/§6, so this PDF is also where the actual value-add lives that didn't fit the HTML
page: full derivations/pembuktian of the sifat eksponen & logaritma (typeset in real
KaTeX, not plain text), plus exam-style multi-step worked examples beyond the two on the
HTML page. Every page is self-contained — it must not depend on content that lives only
in `bab1-eksponen-logaritma.html`.

After restructuring, the HTML lesson keeps: the short definitional intro to eksponen,
the short definitional intro to logaritma (basis/numerus/hasil, notasi khusus), the
fungsi eksponensial section (compact, two split-cards), the persamaan section's core
"how to solve" rule (compact, two split-cards) — all foundational/short — plus the two
`latihan-*` exercise-gate sections and the quiz, both untouched. Everything that was a
dense table (8 sifat eksponen, 9 sifat logaritma) or a static operation/rule list with no
click/toggle behavior (bentuk-bentuk pangkat, operasi bentuk akar, merasionalkan
penyebut) moved here in full.

10 pages: 1 chapter-opener + 9 content pages.

## Page 1 — Chapter opener

```
chapter-tag: Bab 1
subject-chip: Matematika
h1.page-title: Eksponen & Logaritma
p.dek: Materi PDF — pelengkap Bab 1
p.lead: Materi tambahan ini fokus ke tabel referensi lengkap tiap sifat, pembuktian
  (derivasi) rumus eksponen & logaritma, dan contoh soal tambahan tingkat lanjut —
  pelengkap materi & latihan interaktif di halaman utama, bukan salinannya.
h2.section-title: Yang akan kamu pelajari
ul.learn-list:
  - Tabel lengkap 4 bentuk pangkat (positif, nol, negatif, pecahan) dengan syarat &
    contoh masing-masing
  - Tabel lengkap 8 sifat eksponen beserta contohnya
  - Pembuktian (derivasi) rumus sifat eksponen — kenapa a⁰=1 dan a⁻ⁿ=1/aⁿ bisa benar,
    bukan cuma dihafal
  - Tabel lengkap operasi bentuk akar & cara merasionalkan penyebut, plus contoh
    soal tambahan tingkat lanjut
  - Tabel lengkap 9 sifat logaritma beserta contohnya
  - Pembuktian (derivasi) 3 sifat logaritma yang paling sering bikin bingung
  - Contoh soal tambahan persamaan eksponen & logaritma gaya ujian (multi-langkah)
  - Latihan tambahan singkat dengan kunci jawaban
```

## Page 2 — Referensi: Bentuk-Bentuk Pangkat

This content previously lived in the HTML under `#pengertian-eksponen` as a 4-card
`.organel-grid` (Pangkat Positif/Nol/Negatif/Pecahan) — removed there as a static
definitional grid (no click/toggle) and moved here in full as a reference table (the
HTML keeps only the intro paragraph and the quick 2⁴=16 example).

| Bentuk | Rumus | Syarat | Contoh |
|---|---|---|---|
| Pangkat Positif | \(a^n = a\times a\times\cdots\times a\) (n faktor) | n bilangan bulat positif | \(5^3=5\times5\times5=125\) |
| Pangkat Nol | \(a^0=1\) | \(a\neq0\) | \(123^0=1\) |
| Pangkat Negatif | \(a^{-n}=\dfrac{1}{a^n}\) | \(a\neq0\) | \(2^{-3}=\dfrac{1}{8}\) |
| Pangkat Pecahan (Rasional) | \(a^{m/n}=\sqrt[n]{a^m}\) | \(a>0\) (atau \(a\geq0\) bila n genap); m, n bilangan bulat, \(n\neq0\) | \(8^{1/3}=\sqrt[3]{8}=2\) |

```
chapter-tag: Bab 1 · Bilangan Berpangkat
subject-chip: Matematika

h2.section-title: Referensi: Bentuk-Bentuk Pangkat
p.lead: Empat bentuk khusus pangkat yang wajib dikenali di pandangan pertama, lengkap
  dengan syarat berlakunya masing-masing.

p.body-text: Pangkat positif ya cuma perkalian berulang biasa. Pangkat nol selalu
  bernilai 1 — asal basisnya bukan nol (pembuktian lengkap kenapa bisa begitu ada di
  Halaman 4). Pangkat negatif bukan berarti hasilnya jadi bilangan negatif — dia
  cuma kebalikan (invers) dari pangkat positifnya, hasilnya tetap pecahan positif.
  Pangkat pecahan adalah bentuk akar yang "disamarkan" — pembilangnya (m) jadi
  pangkat di dalam akar, penyebutnya (n) jadi indeks akarnya.

callout.mistake — Kesalahan Umum
❌ Salah: mengira 0⁰ bisa dihitung seperti a⁰ biasa (dianggap = 1), dan mengira
  \(a^{-n}\) selalu menghasilkan bilangan negatif.
✅ Benar: \(0^0\) dianggap tidak terdefinisi di jenjang SMA — beda dengan \(a^0\)
  untuk \(a\neq0\) yang selalu 1. Sementara \(2^{-3}=\dfrac{1}{8}\) — positif, cuma
  pecahan kecil, bukan -8.
```

## Page 3 — Referensi: 8 Sifat Eksponen

This content previously lived in the HTML under `#sifat-eksponen` as a `.compare-table`
plus a `.jenis-box` "Jebakan yang Sering Kejadian" list — both removed there (the HTML
now keeps only the section-head intro pointing here) and reproduced here in full.

| # | Sifat | Rumus | Contoh |
|---|---|---|---|
| 1 | Perkalian basis sama | \(a^m \cdot a^n = a^{m+n}\) | \(2^3 \cdot 2^2 = 2^5 = 32\) |
| 2 | Pembagian basis sama | \(a^m \div a^n = a^{m-n}\) | \(3^5 \div 3^2 = 3^3 = 27\) |
| 3 | Pangkat dari pangkat | \((a^m)^n = a^{m\times n}\) | \((2^2)^3=2^6=64\) |
| 4 | Pangkat dari perkalian | \((a\cdot b)^m = a^m\cdot b^m\) | \((2\cdot3)^2=2^2\cdot3^2=36\) |
| 5 | Pangkat dari pembagian | \(\left(\dfrac{a}{b}\right)^m=\dfrac{a^m}{b^m}\) | \(\left(\dfrac{4}{2}\right)^3=\dfrac{4^3}{2^3}=8\) |
| 6 | Pangkat nol | \(a^0=1\ (a\neq0)\) | \(123^0=1\) |
| 7 | Pangkat negatif | \(a^{-n}=\dfrac{1}{a^n}\) | \(5^{-2}=\dfrac{1}{25}\) |
| 8 | Pangkat pecahan (akar) | \(a^{m/n}=\sqrt[n]{a^m}\) | \(4^{3/2}=\sqrt{4^3}=8\) |

```
chapter-tag: Bab 1 · Sifat Eksponen
subject-chip: Matematika

h2.section-title: Referensi: 8 Sifat Eksponen
p.lead: Delapan sifat yang jadi dasar hampir seluruh soal eksponen — tabel lengkap
  rumus & contohnya, jebakan paling umum ada di bawah.

p.body-text: Sifat 1–5 mengatur bagaimana pangkat berperilaku saat basisnya sama
  atau saat ada operasi perkalian/pembagian/pemangkatan berulang. Sifat 6–8 adalah
  tiga bentuk khusus (nol, negatif, pecahan) yang juga muncul di tabel bentuk-bentuk
  pangkat (Halaman 2) — di sini posisinya sebagai bagian dari satu keluarga sifat
  yang sama, karena semuanya bisa saling diturunkan satu sama lain (lihat
  pembuktiannya di Halaman 4).

callout.mistake — Kesalahan Umum
❌ Salah: menggabungkan langsung \(2^3 \cdot 3^2\) menjadi \(6^5\).
✅ Benar: sifat 1 & 2 hanya berlaku kalau basisnya sama — \(2^3\cdot3^2 = 8\times9 =
  72\), bukan \(6^5\). Basis beda tidak bisa langsung digabung pangkatnya.
```

## Page 4 — Pembuktian (Derivasi) Sifat Eksponen

Not previously in the HTML at all — new content. Per CHAPTER_CONTENT_GUIDE.md §3/§6
("not every formula needs its derivation on the HTML page; a genuinely useful one can
live in the PDF instead"), this is the PDF-exclusive derivation content that gives the
Matematika PDF its real reason to exist beyond migrated tables.

```
chapter-tag: Bab 1 · Pembuktian
subject-chip: Matematika

h2.section-title: Kenapa Sifat-Sifat Itu Bisa Benar?
p.lead: Empat sifat eksponen paling dasar dibuktikan langsung dari definisi pangkat
  sebagai perkalian berulang — bukan cuma buat dihafal.

example-box — Pembuktian: \(a^m \cdot a^n = a^{m+n}\)
ol:
  1. Dari definisi, \(a^m\) artinya a dikalikan dirinya sendiri m kali, dan \(a^n\)
     artinya a dikalikan dirinya sendiri n kali.
  2. \(a^m \cdot a^n = \underbrace{(a\times\cdots\times a)}_{m\ \text{faktor}} \times
     \underbrace{(a\times\cdots\times a)}_{n\ \text{faktor}}\)
  3. Digabung, totalnya ada \((m+n)\) faktor a yang dikalikan berurutan.
  4. \(a^m \cdot a^n = \underbrace{a\times a\times\cdots\times a}_{(m+n)\ \text{faktor}}
     = a^{m+n}\) — terbukti.

example-box — Pembuktian: \(a^0 = 1\) (untuk \(a\neq0\))
ol:
  1. Pakai sifat 1 yang baru dibuktikan, dengan m = n (bilangan bulat positif
     sembarang): \(a^n \cdot a^{-n}\) belum bisa dipakai duluan, jadi mulai dari
     \(a^n \div a^n\).
  2. Secara aljabar biasa, bilangan apa pun (asal bukan nol) dibagi dirinya sendiri
     selalu = 1: \(a^n \div a^n = 1\).
  3. Tapi kalau dipandang sebagai sifat pembagian basis sama: \(a^n \div a^n =
     a^{n-n} = a^0\).
  4. Menyamakan hasil langkah 2 & 3: \(a^0 = 1\) — terbukti.

example-box — Pembuktian: \(a^{-n} = \dfrac{1}{a^n}\)
ol:
  1. Tulis 0 sebagai \(n + (-n)\), lalu pakai sifat 1: \(a^0 = a^{n+(-n)} = a^n \cdot
     a^{-n}\).
  2. Dari pembuktian sebelumnya, ruas kiri \(a^0 = 1\). Jadi \(a^n \cdot a^{-n} = 1\).
  3. Bagi kedua ruas dengan \(a^n\) (boleh, karena \(a\neq0\) sehingga \(a^n\neq0\)):
     \(a^{-n} = \dfrac{1}{a^n}\) — terbukti.

example-box — Pembuktian: \((a^m)^n = a^{mn}\)
ol:
  1. \((a^m)^n\) artinya \(a^m\) dikalikan dirinya sendiri n kali:
     \((a^m)^n = \underbrace{a^m \times a^m \times \cdots \times a^m}_{n\ \text{faktor}}\).
  2. Pakai sifat 1 berulang kali untuk menggabungkan semua faktor \(a^m\) itu:
     total pangkatnya jadi \(m+m+\cdots+m\) (dijumlahkan sebanyak n suku).
  3. \(m+m+\cdots+m\) (n suku) sama dengan \(m \times n\).
  4. \((a^m)^n = a^{mn}\) — terbukti.
```

## Page 5 — Referensi: Bentuk Akar & Contoh Soal Tambahan

This content previously lived in the HTML under `#bentuk-akar` as a `.two-col` with
two `.jenis-box` (Operasi Bentuk Akar; Merasionalkan Penyebut with `.role-cards`) —
both removed there (the HTML now keeps only the section-head intro connecting bentuk
akar to pangkat pecahan) and reproduced here in full, plus one exam-style worked
example beyond what was on the HTML page.

```
chapter-tag: Bab 1 · Bentuk Akar
subject-chip: Matematika

h2.section-title: Referensi: Operasi Bentuk Akar & Merasionalkan Penyebut
p.lead: Aturan lengkap menjumlah, mengalikan, membagi bentuk akar, dan cara
  menghilangkan akar yang nyangkut di penyebut pecahan.

p.body-text: Penjumlahan/pengurangan bentuk akar hanya bisa digabung kalau akarnya
  "sejenis" alias isinya sama persis — \(3\sqrt2 + 5\sqrt2 = 8\sqrt2\), tapi
  \(\sqrt2+\sqrt3\) tidak bisa disederhanakan lagi. Perkalian & pembagian ikuti
  \(\sqrt a \cdot \sqrt b = \sqrt{ab}\) dan \(\sqrt a \div \sqrt b = \sqrt{a/b}\) —
  contoh: \(\sqrt3 \cdot \sqrt{12} = \sqrt{36} = 6\), dan \(\sqrt{50}\div\sqrt2 =
  \sqrt{25}=5\).

p.body-text: Kalau ada akar di penyebut pecahan, hilangkan dengan mengalikan
  pembilang & penyebut dengan "sekawan"-nya: untuk bentuk \(\dfrac{1}{\sqrt a}\),
  kalikan dengan \(\dfrac{\sqrt a}{\sqrt a}\) sehingga hasilnya \(\dfrac{\sqrt
  a}{a}\). Untuk bentuk \(\dfrac{1}{\sqrt a+\sqrt b}\), kalikan dengan sekawannya
  \(\dfrac{\sqrt a-\sqrt b}{\sqrt a-\sqrt b}\) — sekawan dari \((\sqrt a+\sqrt b)\)
  adalah \((\sqrt a-\sqrt b)\), karena \((x+y)(x-y)=x^2-y^2\) akan menghilangkan
  akarnya dari penyebut.

example-box — Contoh Soal Tambahan: Merasionalkan & Menyederhanakan Bentuk Akar
p.setup: Sederhanakan \(\dfrac{4}{3-\sqrt5}\), lalu sederhanakan
  \(\sqrt{12}+\sqrt{27}-\sqrt{75}\).
ol:
  1. Untuk soal pertama, kalikan pembilang & penyebut dengan sekawan penyebutnya,
     \((3+\sqrt5)\): \(\dfrac{4}{3-\sqrt5}\times\dfrac{3+\sqrt5}{3+\sqrt5} =
     \dfrac{4(3+\sqrt5)}{3^2-(\sqrt5)^2} = \dfrac{12+4\sqrt5}{9-5} =
     \dfrac{12+4\sqrt5}{4} = 3+\sqrt5\).
  2. Untuk soal kedua, tiap akar dulu harus disederhanakan ke bentuk akar sejenis
     sebelum bisa digabung: \(\sqrt{12}=\sqrt{4\times3}=2\sqrt3\),
     \(\sqrt{27}=\sqrt{9\times3}=3\sqrt3\), \(\sqrt{75}=\sqrt{25\times3}=5\sqrt3\).
  3. Setelah semuanya sejenis (\(\sqrt3\)), tinggal jumlah/kurangkan koefisiennya:
     \(2\sqrt3+3\sqrt3-5\sqrt3 = (2+3-5)\sqrt3 = 0\).

callout.mistake — Kesalahan Umum
❌ Salah: langsung bilang \(\sqrt{12}\), \(\sqrt{27}\), \(\sqrt{75}\) "tidak sejenis"
  dan tidak bisa dijumlahkan sama sekali.
✅ Benar: sederhanakan dulu tiap akar ke bentuk akar terkecilnya — banyak soal
  ujian sengaja menyamarkan akar sejenis dalam bentuk yang kelihatannya beda.
```

## Page 6 — Referensi: 9 Sifat Logaritma

This content previously lived in the HTML under `#sifat-logaritma` as a
`.compare-table` — removed there (the HTML keeps only the section-head intro pointing
here) and reproduced here in full.

| # | Sifat | Rumus | Contoh |
|---|---|---|---|
| 1 | Logaritma dari 1 | \({}^{a}\log 1 = 0\) | \({}^{5}\log 1 = 0\) |
| 2 | Logaritma basis sendiri | \({}^{a}\log a = 1\) | \({}^{7}\log 7 = 1\) |
| 3 | Perkalian → penjumlahan | \({}^{a}\log(x\cdot y) = {}^{a}\log x + {}^{a}\log y\) | \({}^{2}\log(4\cdot8)={}^{2}\log4+{}^{2}\log8=2+3=5\) |
| 4 | Pembagian → pengurangan | \({}^{a}\log\left(\dfrac{x}{y}\right) = {}^{a}\log x - {}^{a}\log y\) | \({}^{2}\log\left(\dfrac{32}{4}\right)={}^{2}\log32-{}^{2}\log4=5-2=3\) |
| 5 | Pangkat numerus | \({}^{a}\log x^n = n\cdot{}^{a}\log x\) | \({}^{2}\log4^3=3\cdot{}^{2}\log4=3\cdot2=6\) |
| 6 | Pangkat basis | \({}^{a^m}\log x = \dfrac{1}{m}\cdot{}^{a}\log x\) | \({}^{4}\log8=\dfrac{1}{2}\cdot{}^{2}\log8=1{,}5\) |
| 7 | Kebalikan basis & numerus | \({}^{a}\log b = \dfrac{1}{{}^{b}\log a}\) | \({}^{2}\log8=\dfrac{1}{{}^{8}\log2}=\dfrac{1}{1/3}=3\) |
| 8 | Rantai (basis berbeda) | \({}^{a}\log b \cdot {}^{b}\log c = {}^{a}\log c\) | \({}^{2}\log3\cdot{}^{3}\log4={}^{2}\log4=2\) |
| 9 | a dipangkatkan logaritmanya sendiri | \(a^{({}^{a}\log b)}=b\) | \(2^{({}^{2}\log5)}=5\) |

```
chapter-tag: Bab 1 · Sifat Logaritma
subject-chip: Matematika

h2.section-title: Referensi: 9 Sifat Logaritma
p.lead: Pola pikirnya mirip sifat eksponen — wajar, karena logaritma memang
  kebalikan (invers) dari eksponen. Tabel lengkap rumus & contohnya berikut ini.

p.body-text: Sifat 1 & 2 adalah kasus dasar yang langsung dari definisi. Sifat 3–5
  mengubah operasi perkalian/pembagian/pemangkatan di dalam logaritma jadi operasi
  penjumlahan/pengurangan/perkalian biasa di luar logaritma — inilah alasan
  logaritma dulu dipakai untuk mempercepat perhitungan manual sebelum ada
  kalkulator. Sifat 6–9 lebih jarang dipakai langsung tapi sering muncul
  tersembunyi di soal ujian — pembuktian sifat 6, 7, dan 8 ada di Halaman 7.
```

## Page 7 — Pembuktian (Derivasi) Sifat Logaritma

Not previously in the HTML at all — new content, same rationale as Page 4.

```
chapter-tag: Bab 1 · Pembuktian
subject-chip: Matematika

h2.section-title: Membuktikan 3 Sifat Logaritma yang Sering Bikin Bingung
p.lead: Sifat pangkat basis, kebalikan basis & numerus, dan sifat rantai —
  dibuktikan langsung dari definisi logaritma & sifat eksponen, bukan cuma dihafal.

example-box — Pembuktian: \({}^{a}\log b \cdot {}^{b}\log c = {}^{a}\log c\)
  (sifat rantai)
ol:
  1. Misalkan \({}^{a}\log b = m\), artinya menurut definisi \(a^m = b\).
  2. Misalkan \({}^{b}\log c = n\), artinya menurut definisi \(b^n = c\).
  3. Substitusikan \(b=a^m\) ke persamaan kedua: \(c = b^n = (a^m)^n\).
  4. Pakai sifat eksponen "pangkat dari pangkat": \((a^m)^n = a^{mn}\), jadi
     \(c = a^{mn}\).
  5. Menurut definisi logaritma, \(c=a^{mn}\) artinya \({}^{a}\log c = mn\). Karena
     \(m={}^{a}\log b\) dan \(n={}^{b}\log c\), maka
     \({}^{a}\log c = {}^{a}\log b \cdot {}^{b}\log c\) — terbukti.

example-box — Pembuktian: \({}^{a}\log b = \dfrac{1}{{}^{b}\log a}\)
  (kebalikan basis & numerus)
ol:
  1. Misalkan \({}^{a}\log b = c\), artinya \(a^c=b\).
  2. Ambil akar pangkat c dari kedua ruas (atau pangkatkan kedua ruas dengan
     \(1/c\)): \(a = b^{1/c}\).
  3. Menurut definisi logaritma, \(a=b^{1/c}\) artinya \({}^{b}\log a = 1/c\).
  4. Karena \(c = {}^{a}\log b\), maka \({}^{b}\log a = \dfrac{1}{{}^{a}\log b}\),
     yang jika dibalik jadi \({}^{a}\log b = \dfrac{1}{{}^{b}\log a}\) — terbukti.

example-box — Pembuktian: \({}^{a^m}\log x = \dfrac{1}{m}\cdot{}^{a}\log x\)
  (pangkat basis)
ol:
  1. Misalkan \({}^{a^m}\log x = n\), artinya menurut definisi \((a^m)^n = x\).
  2. Pakai sifat eksponen "pangkat dari pangkat" untuk menulis ulang ruas kiri:
     \((a^m)^n = a^{mn}\), sehingga \(a^{mn}=x\).
  3. Menurut definisi logaritma, \(a^{mn}=x\) artinya \({}^{a}\log x = mn\).
  4. Bagi kedua ruas dengan m: \(n = \dfrac{1}{m}\cdot{}^{a}\log x\). Karena
     \(n={}^{a^m}\log x\), terbukti \({}^{a^m}\log x = \dfrac{1}{m}\cdot{}^{a}\log
     x\).
```

## Page 8 — Contoh Soal Tambahan: Persamaan Eksponen (Tingkat Lanjut)

Not previously in the HTML — this is the "1-2 additional worked examples beyond the
HTML page, exam-style, multi-step" content called for in CHAPTER_CONTENT_GUIDE.md §5.
The HTML `#persamaan` section keeps its own simpler same-base example
(\(2^{x+1}=2^5\)); this is the harder substitution-style follow-up.

```
chapter-tag: Bab 1 · Persamaan Eksponen
subject-chip: Matematika

h2.section-title: Contoh Soal Tambahan: Persamaan Eksponen Berbentuk Kuadrat
p.lead: Gaya soal ujian yang sering muncul — persamaan eksponen yang, dengan
  permisalan yang tepat, ternyata "menyamar" jadi persamaan kuadrat biasa.

example-box — Contoh Soal
p.setup: Tentukan nilai x yang memenuhi \(4^{x} - 6\cdot2^{x} + 8 = 0\).
ol:
  1. Perhatikan bahwa \(4^x = (2^2)^x = (2^x)^2\). Jadi seluruh persamaan bisa
     ditulis ulang hanya dalam bentuk \(2^x\).
  2. Misalkan \(y = 2^x\) (ingat: y harus selalu positif, karena hasil pemangkatan
     tidak pernah negatif atau nol). Persamaan menjadi \(y^2 - 6y + 8 = 0\).
  3. Faktorkan persamaan kuadrat ini: \(y^2-6y+8 = (y-2)(y-4) = 0\), sehingga
     \(y=2\) atau \(y=4\).
  4. Kembalikan permisalan: untuk \(y=2\), \(2^x=2^1\) sehingga \(x=1\). Untuk
     \(y=4\), \(2^x=2^2\) sehingga \(x=2\).
  5. Kedua nilai valid (tidak perlu dibuang) karena keduanya menghasilkan \(y>0\).
     Jadi himpunan penyelesaiannya \(x=1\) atau \(x=2\).

callout.mistake — Kesalahan Umum
❌ Salah: setelah dapat nilai y dari persamaan kuadrat, langsung menjawab \(x=y\)
  tanpa mengembalikan ke permisalan awal.
✅ Benar: y hanyalah variabel bantu (\(y=2^x\)) — jawaban akhir soal selalu dalam
  bentuk x, jadi permisalannya wajib dikembalikan di langkah terakhir. Cek juga
  kalau ada nilai y yang negatif atau nol, nilai itu harus dibuang karena \(2^x\)
  tidak pernah bisa negatif/nol.
```

## Page 9 — Contoh Soal Tambahan: Persamaan Logaritma (Tingkat Lanjut)

Not previously in the HTML — same rationale as Page 8, and directly reinforces the
"cek syarat numerus" warning that the HTML `#persamaan` section's `.jenis-box` keeps
(short version stays there; this is the full worked demonstration of why it matters).

```
chapter-tag: Bab 1 · Persamaan Logaritma
subject-chip: Matematika

h2.section-title: Contoh Soal Tambahan: Persamaan Logaritma & Akar Asing
p.lead: Contoh lengkap kenapa mengecek syarat numerus itu wajib, bukan cuma
  formalitas — salah satu jawaban aljabarnya di soal ini justru harus dibuang.

example-box — Contoh Soal
p.setup: Tentukan nilai x yang memenuhi \({}^{2}\log(x-1) + {}^{2}\log(x+2) = 2\).
ol:
  1. Gabungkan kedua suku ruas kiri pakai sifat perkalian logaritma:
     \({}^{2}\log[(x-1)(x+2)] = 2\).
  2. Ubah ke bentuk eksponen (definisi logaritma): \((x-1)(x+2) = 2^2 = 4\).
  3. Jabarkan & sederhanakan: \(x^2+x-2 = 4\), sehingga \(x^2+x-6=0\).
  4. Faktorkan: \((x+3)(x-2)=0\), sehingga \(x=-3\) atau \(x=2\).
  5. Cek syarat numerus (wajib!): numerus harus \(x-1>0\) dan \(x+2>0\), artinya
     \(x>1\). Untuk \(x=-3\): jelas \(x-1=-4<0\), jadi nilai ini adalah <b>akar
     asing</b> dan harus dibuang. Untuk \(x=2\): \(x-1=1>0\) dan \(x+2=4>0\),
     memenuhi syarat. Jadi satu-satunya penyelesaian adalah \(x=2\).

callout.mistake — Kesalahan Umum
❌ Salah: langsung menjawab "x=-3 atau x=2" begitu selesai memfaktorkan, tanpa
  mengecek ulang ke syarat numerus.
✅ Benar: hasil aljabar (memfaktorkan persamaan kuadrat) bisa saja benar secara
  matematis tapi tetap harus disubstitusi balik ke syarat numerus asli sebelum
  jadi jawaban final — nilai yang gagal disebut akar asing dan wajib dibuang.
```

## Page 10 — Latihan Tambahan (dengan Kunci Jawaban)

Not previously in the HTML — a short additional practice set per
CHAPTER_CONTENT_GUIDE.md §5 ("short additional practice set, can overlap with the
exercise JSON, doesn't have to"). Answer key inline since this is a static PDF page,
not an interactive quiz — the two `.exercise-root` sections on the HTML page remain
the graded/interactive practice.

```
chapter-tag: Bab 1 · Latihan Tambahan
subject-chip: Matematika

h2.section-title: Latihan Tambahan
p.lead: Lima soal campuran eksponen & logaritma buat pemanasan sebelum masuk ke
  latihan bertingkat & kuis interaktif di halaman utama — kunci jawaban ada di
  bawah tiap soal.

ol.ref-list:
  1. Sederhanakan \(\dfrac{3^{5}\cdot3^{-2}}{3^{0}}\).
     Jawaban: \(3^{5-2-0}=3^3=27\).
  2. Tentukan nilai x jika \(9^{x+1}=27^{x}\).
     Jawaban: samakan basis ke 3 → \(3^{2(x+1)}=3^{3x}\) → \(2x+2=3x\) → \(x=2\).
  3. Sederhanakan \(\sqrt{45}-\sqrt{20}+\sqrt{5}\).
     Jawaban: \(3\sqrt5-2\sqrt5+\sqrt5=2\sqrt5\).
  4. Tentukan nilai dari \({}^{3}\log5\cdot{}^{5}\log27\).
     Jawaban: sifat rantai → \({}^{3}\log27=3\) (karena \(3^3=27\)).
  5. Jika \(2^{x}=3\), tentukan nilai dari \(8^{x}\).
     Jawaban: \(8^x=(2^3)^x=(2^x)^3=3^3=27\).
```

## Note on the two exercise-gate sections (HTML, not PDF)

`#latihan-eksponen` and `#latihan-logaritma` (the two `.exercise-root` leveled-practice
mount points, basic/intermediate/advanced) stay in the HTML untouched, as does the
`#kuis-matematika` quiz section — all three are genuinely interactive (level-switching,
graded, explanations shown per answer) and have no PDF equivalent needed. None of the
`.eksponen.exercise.json` / `.logaritma.exercise.json` / `.quiz.json` files were
modified as part of this restructuring pass.

## Note on interactive elements found in the HTML (there weren't any beyond the above)

This chapter had no accordion, tab-switch, filter-toggle, or calculator beyond the two
exercise-gate mount points and the quiz — everything else in the original 263-line file
was static text/cards/tables, which is why the PDF ended up carrying the bulk of the
reference material (tables + new derivation content) while the HTML lesson slims down
to short definitional sections plus the three interactive mount points.
