# PDF Companion Spec — Bab 1 Fisika: Pengantar Ilmu Fisika, Besaran & Satuan

Curated content for the PDF companion, built on `public/assets/pdf-template/page-template.html`
(`.pdf-page[data-subject="fisika"]`). Not an export of the HTML page — per
CHAPTER_CONTENT_GUIDE.md §5, this is the dense static-reference material that doesn't belong on
the interactive lesson page: the full besaran-turunan reference across all three groups
(Mekanika/Kinematika sisa 5 baris, Listrik-Magnet-Gelombang 7 baris, Fluida-Termodinamika 3
baris), the full 6-row konstanta-fisika notasi-ilmiah table, extra worked examples, and an
"Analisis Dimensi" deep-dive. Not everything static needed to move — the 7 besaran pokok table
and the 8 most-tested besaran turunan stay on the HTML page per the brief, since they're
foundational content a reader needs to follow the rest of the chapter.

**Accent color:** first Fisika chapter, so this pass decides the PDF `--accent`:
`#8b5cf6`, matching the site's own `--purple` CSS variable (`public/assets/styles.css`
light-mode `:root`) and `subjectsData.fisika.color:'purple'` in `app.js`. Future Fisika
chapters should reuse this same value — add it to CHAPTER_CONTENT_GUIDE.md §5's per-subject
accent table.

Fisika is equation-dense (Matematika/Fisika/Kimia use LaTeX in the PDF per the guide) — every
table cell with a unit/dimension/rumus and every worked example on these pages uses real KaTeX,
not plain-text superscripts.

**Source cross-check:** the two source PDFs (`bab1-besaran-dan-satuan-source.pdf`,
`bab1-besaran-dan-satuan-besaran-turunan-source.pdf`) both independently list the same 8
besaran turunan (Luas, Volume, Massa Jenis, Kecepatan, Percepatan, Gaya, Usaha/Energi, Tekanan)
with identical rumus, satuan SI, and dimensi across the board — no discrepancy found between the
two sources on any of the 8 overlapping rows. Cross-checked cell by cell before writing the HTML
table.

7 pages: 1 chapter-opener + 6 content pages.

## Page 1 — Chapter opener

```
chapter-tag: Bab 1
subject-chip: Fisika
h1.page-title: Pengantar Ilmu Fisika: Besaran & Satuan
p.dek: Materi PDF — pelengkap Bab 1
p.lead: Materi tambahan ini fokus ke referensi lengkap besaran turunan (tiga kelompok: Mekanika
  lanjutan, Listrik-Magnet-Gelombang, Fluida-Termodinamika), tabel lengkap konstanta fisika
  dalam notasi ilmiah, latihan Analisis Dimensi tingkat lanjut, dan latihan tambahan — pelengkap
  materi di halaman utama, bukan salinannya.
h2.section-title: Yang akan kamu pelajari
ul.learn-list:
  - Referensi lengkap besaran turunan kelompok Mekanika & Kinematika lanjutan: Momentum Linear,
    Impuls, Momen Gaya/Torsi, Momen Inersia, Momentum Sudut (bekal Bab 2 mekanika)
  - Referensi lengkap besaran turunan kelompok Listrik, Magnet & Gelombang (7 besaran)
  - Referensi lengkap besaran turunan kelompok Fluida & Termodinamika (3 besaran)
  - Tabel lengkap 6 konstanta fisika dalam notasi ilmiah (termasuk 2 yang tidak ada di halaman
    utama: massa jenis air murni & tekanan udara standar), plus 2 latihan konversi tambahan
  - Analisis Dimensi tingkat lanjut: memverifikasi homogenitas persamaan gerak, deteksi rumus
    yang salah lewat dimensi
  - Latihan soal tambahan (5 soal + pembahasan) mencakup besaran turunan, notasi ilmiah, dan
    analisis dimensi
```

## Page 2 — Besaran Turunan Lengkap: Kelompok Mekanika & Kinematika (Lanjutan)

This content is not on the HTML page at all — the HTML keeps only the 8 most-tested Mekanika
besaran turunan (per the brief, momentum/impuls/torsi/momen-inersia are "more Bab-2-mechanics-
level"). Reproduced here in full from Source 2 (Halaman 2), with an explanatory paragraph tying
these to the Bab 2 mechanics chapters they preview.

| Besaran Turunan (Simbol) | Rumus | Satuan SI | Bentuk Satuan Pokok | Dimensi |
|---|---|---|---|---|
| Momentum Linear (p) | \(m \times v\) | kg·m/s | \(kg \cdot m \cdot s^{-1}\) | \([M][L][T]^{-1}\) |
| Impuls (I) | \(F \times \Delta t\) | Newton sekon (N·s) | \(kg \cdot m \cdot s^{-1}\) | \([M][L][T]^{-1}\) |
| Momen Gaya / Torsi (τ) | \(F \times r\) | Newton meter (N·m) | \(kg \cdot m^{2} \cdot s^{-2}\) | \([M][L]^{2}[T]^{-2}\) |
| Momen Inersia (I) | \(m \times r^{2}\) | kg·m^2 | \(kg \cdot m^{2}\) | \([M][L]^{2}\) |
| Momentum Sudut (L) | \(r \times p\) | kg·m^2/s | \(kg \cdot m^{2} \cdot s^{-1}\) | \([M][L]^{2}[T]^{-1}\) |

```
chapter-tag: Bab 1 · Besaran Turunan
subject-chip: Fisika

h2.section-title: Besaran Turunan Lengkap: Kelompok Mekanika & Kinematika (Lanjutan)
p.lead: Lima besaran turunan mekanika lain di luar 8 yang paling sering diuji di Bab 1 —
  semuanya akan kamu pakai lagi begitu masuk materi Momentum & Impuls serta Rotasi/Momen Inersia
  di bab-bab berikutnya, jadi kenali dulu satuan & dimensinya dari sekarang.

[ref-table di atas]

p.body-text: Perhatikan pola pasangan Momentum Linear & Impuls — keduanya punya satuan SI dan
  dimensi yang identis, \([M][L][T]^{-1}\), karena Impuls (perubahan momentum akibat gaya yang
  bekerja selama selang waktu tertentu) memang secara fisis SAMA DENGAN perubahan Momentum
  Linear — inilah yang mendasari Teorema Impuls-Momentum yang akan kamu pelajari lebih lanjut.
  Pola serupa muncul di Torsi & Usaha/Energi (Halaman utama) — keduanya sama-sama
  \([M][L]^{2}[T]^{-2}\) secara dimensi meski satuannya ditulis beda (N·m vs Joule), karena
  keduanya sama-sama hasil kali sebuah gaya dengan sebuah panjang.
```

## Page 3 — Besaran Turunan Lengkap: Kelompok Listrik, Magnet & Gelombang

Not on the HTML page at all (HTML defers all non-mekanika besaran turunan groups to the PDF
per the brief). Reproduced in full from Source 2 (Halaman 3, bagian B).

| Besaran Turunan (Simbol) | Rumus | Satuan SI | Bentuk Satuan Pokok | Dimensi |
|---|---|---|---|---|
| Muatan Listrik (Q) | \(I \times t\) | Coulomb (C) | \(A \cdot s\) | \([I][T]\) |
| Beda Potensial (V) | \(W/Q\) atau \(I \times R\) | Volt (V) | \(kg \cdot m^{2} \cdot s^{-3} \cdot A^{-1}\) | \([M][L]^{2}[T]^{-3}[I]^{-1}\) |
| Hambatan Listrik (R) | \(V/I\) | Ohm (Ω) | \(kg \cdot m^{2} \cdot s^{-3} \cdot A^{-2}\) | \([M][L]^{2}[T]^{-3}[I]^{-2}\) |
| Kapasitansi Listrik (C) | \(Q/V\) | Farad (F) | \(kg^{-1} \cdot m^{-2} \cdot s^{4} \cdot A^{2}\) | \([M]^{-1}[L]^{-2}[T]^{4}[I]^{2}\) |
| Frekuensi (f) | \(1/T\) | Hertz (Hz) | \(s^{-1}\) | \([T]^{-1}\) |
| Fluks Magnet (Φ) | \(B \times A\) | Weber (Wb) | \(kg \cdot m^{2} \cdot s^{-2} \cdot A^{-1}\) | \([M][L]^{2}[T]^{-2}[I]^{-1}\) |
| Induksi Magnet (B) | \(\Phi/A\) | Tesla (T) | \(kg \cdot s^{-2} \cdot A^{-1}\) | \([M][T]^{-2}[I]^{-1}\) |

```
chapter-tag: Bab 1 · Besaran Turunan
subject-chip: Fisika

h2.section-title: Besaran Turunan Lengkap: Kelompok Listrik, Magnet & Gelombang
p.lead: Tujuh besaran turunan yang akan kamu temui lagi begitu masuk materi Listrik Dinamis,
  Medan Magnet, dan Induksi Elektromagnetik — semuanya dibangun dari kombinasi besaran pokok
  Massa, Panjang, Waktu, dan Kuat Arus Listrik [I].

[ref-table di atas]

p.body-text: Satu pola yang bisa kamu pakai buat mengecek hafalan: Beda Potensial dan Hambatan
  Listrik dimensinya cuma beda satu pangkat pada [I] — karena Hambatan R = V/I berarti dimensi
  R = dimensi V dibagi dimensi I, sehingga pangkat [I] pada V (-1) dikurangi 1 lagi jadi -2 pada
  R. Kapasitansi (C = Q/V) punya dimensi paling rumit di kelompok ini karena melibatkan pangkat
  4 pada [T] — jangan coba hafal langsung angkanya, tapi turunkan dari rumus Q/V setiap kali
  butuh, sama seperti latihan Analisis Dimensi di Halaman 6.
```

## Page 4 — Besaran Turunan Lengkap: Kelompok Fluida & Termodinamika

Not on the HTML page (same reasoning as Page 3). Reproduced in full from Source 2 (Halaman 3,
bagian C).

| Besaran Turunan (Simbol) | Rumus | Satuan SI | Bentuk Satuan Pokok | Dimensi |
|---|---|---|---|---|
| Tegangan Permukaan (γ) | \(F/l\) | Newton per meter (N/m) | \(kg \cdot s^{-2}\) | \([M][T]^{-2}\) |
| Debit Volume (Q) | \(V/t\) atau \(A \times v\) | \(m^{3}/s\) | \(m^{3} \cdot s^{-1}\) | \([L]^{3}[T]^{-1}\) |
| Kalor Jenis (c) | \(Q/(m \times \Delta T)\) | Joule per (kg·K) | \(m^{2} \cdot s^{-2} \cdot K^{-1}\) | \([L]^{2}[T]^{-2}[\theta]^{-1}\) |

```
chapter-tag: Bab 1 · Besaran Turunan
subject-chip: Fisika

h2.section-title: Besaran Turunan Lengkap: Kelompok Fluida & Termodinamika
p.lead: Tiga besaran turunan lebih sederhana untuk melengkapi daftar — akan dipakai lagi saat
  materi Fluida Statis/Dinamis dan Suhu & Kalor.

[ref-table di atas]

p.body-text: Kalor Jenis (c) unik di antara semua besaran turunan yang sudah dibahas — satu-
  satunya yang dimensinya melibatkan [θ] (Suhu Termodinamika) selain kelompok Listrik-Magnet
  yang melibatkan [I]. Rumusnya Q/(m·ΔT) berarti kalor jenis mengukur berapa banyak kalor (Q,
  dimensi energi) yang dibutuhkan untuk menaikkan suhu satu satuan massa sebesar satu satuan
  suhu — semakin besar kalor jenis suatu zat, semakin "susah" suhunya naik meski dipanaskan
  dengan kalor yang sama (air punya kalor jenis tinggi, makanya lambat panas & lambat dingin
  dibanding logam).
```

## Page 5 — Notasi Ilmiah: Tabel Konstanta Fisika Lengkap & Latihan Tambahan

The HTML page already covers 4 dari 6 konstanta (c, G, e, N_A) sebagai worked examples secara
lengkap — halaman ini melengkapi dengan 2 konstanta yang belum dibahas (massa jenis air murni,
tekanan udara standar) plus tabel rekap semua 6 dalam satu tempat, per §5's "1-2 additional
worked examples beyond what's on the HTML page."

| Besaran / Konstanta Fisika | Simbol | Nilai Standar Desimal | Bentuk Notasi Ilmiah | Satuan SI |
|---|---|---|---|---|
| Kecepatan Cahaya di Ruang Hampa | c | 300.000.000 m/s | \(3{,}00 \times 10^{8}\) | m/s |
| Konstanta Gravitasi Universal | G | 0,00000000006674 N·m^2/kg^2 | \(6{,}674 \times 10^{-11}\) | N·m^2/kg^2 |
| Muatan Elementer Elektron | e | 0,0000000000000000001602 C | \(1{,}602 \times 10^{-19}\) | C |
| Massa Jenis Air murni (4 derajat C) | rho_air | 1.000 kg/m^3 | \(1{,}00 \times 10^{3}\) | kg/m^3 |
| Tekanan Udara Standar (1 atm) | P_0 | 101.300 Pa | \(1{,}013 \times 10^{5}\) | Pa |
| Konstanta Avogadro | N_A | 602.200.000.000.000.000.000.000 /mol | \(6{,}022 \times 10^{23}\) | /mol |

```
chapter-tag: Bab 1 · Notasi Ilmiah
subject-chip: Fisika

h2.section-title: Notasi Ilmiah: Tabel Konstanta Fisika Lengkap
p.lead: Rekap semua 6 konstanta fisika dari halaman utama dalam satu tabel, plus 2 konversi
  tambahan yang belum dibahas di sana.

[ref-table di atas]

div.example-box (label: Latihan Tambahan · Konversi Massa Jenis Air & Tekanan Udara Standar)
ol:
  - Massa jenis air murni (4 derajat C) = 1.000 kg/m^3. Geser koma 3 langkah ke kiri dari belakang angka
    1.000 sampai tersisa satu digit di depan koma → \(\rho_{air} = 1{,}00 \times 10^{3}\) kg/m^3.
  - Tekanan udara standar (1 atm) = 101.300 Pa. Geser koma 5 langkah ke kiri dari belakang angka
    101.300 → \(P_0 = 1{,}013 \times 10^{5}\) Pa.
  - Perhatikan: 101.300 punya digit signifikan sampai ratusan (1013), sehingga bentuk notasi
    ilmiahnya \(1{,}013 \times 10^{5}\) — BUKAN \(1{,}01 \times 10^{5}\) (itu membulatkan &
    menghilangkan 1 digit signifikan) atau \(1{,}0130 \times 10^{5}\) (menambah digit yang
    tidak ada di data asal).

callout.mistake — Kesalahan Umum
❌ Salah: mengira jumlah digit setelah koma pada bentuk notasi ilmiah boleh sembarang, asal
  angkanya "kelihatan mirip".
✅ Benar: jumlah digit signifikan pada \(a\) harus mencerminkan presisi data aslinya — kalau
  data punya 4 digit signifikan (1013), bentuk notasi ilmiahnya juga harus mempertahankan 4
  digit signifikan itu (1,013), tidak boleh dibulatkan atau ditambah tanpa alasan.
```

## Page 6 — Analisis Dimensi Tingkat Lanjut: Verifikasi Homogenitas Persamaan

Not on the HTML page — the HTML has one basic dimensional-analysis worked example (Tekanan).
This page is the "1-2 additional worked examples beyond what's on the HTML page, exam-style,
multi-step" per §5, applying the same dimensional-analysis skill to a genuine multi-term
kinematics equation (a classic SMA/UTBK exam item type for this exact chapter topic).

```
chapter-tag: Bab 1 · Analisis Dimensi
subject-chip: Fisika

h2.section-title: Analisis Dimensi Tingkat Lanjut: Verifikasi Homogenitas Persamaan
p.lead: Analisis dimensi paling sering diuji lewat soal "periksa apakah persamaan berikut
  mungkin benar" — begini cara mengerjakannya untuk persamaan bersuku banyak.

div.formula-box (label: Prinsip Homogenitas Dimensi)
[KaTeX] \text{Jika } A + B = C \text{, maka } [A] = [B] = [C]
var-def: Setiap suku yang DIJUMLAHKAN atau DIKURANGKAN dalam satu persamaan WAJIB punya dimensi
  yang identik — kamu cuma boleh menjumlahkan besaran yang sejenis (nggak bisa menjumlahkan
  "panjang" dengan "waktu", persis seperti nggak bisa menjumlahkan 3 apel dengan 2 jeruk jadi
  "5 apel-jeruk").

div.example-box (label: Soal · Verifikasi Persamaan Gerak Lurus Berubah Beraturan)
p.setup: Persamaan gerak lurus berubah beraturan (GLBB) berbunyi \(x = x_0 + v_0 t + \frac{1}{2}
  a t^{2}\), dengan x & x_0 = posisi (m), v_0 = kecepatan awal (m/s), t = waktu (s), dan a =
  percepatan (m/s^2). Periksa apakah persamaan ini homogen secara dimensi.
ol:
  - Dimensi ruas kiri: \([x] = [x_0] = [L]\) (posisi adalah besaran panjang).
  - Dimensi suku kedua \(v_0 t\): \([v_0][t] = [L][T]^{-1} \times [T] = [L][T]^{-1+1} = [L]\).
  - Dimensi suku ketiga \(\frac{1}{2} a t^{2}\): angka \(\frac{1}{2}\) adalah konstanta murni
    (tidak berdimensi), jadi \([a][t]^{2} = [L][T]^{-2} \times [T]^{2} = [L][T]^{-2+2} = [L]\).
  - Ketiga suku (\(x_0\), \(v_0 t\), \(\frac{1}{2}at^{2}\)) semuanya berdimensi \([L]\), sama
    dengan ruas kiri \([x]\) — persamaan ini HOMOGEN secara dimensi, jadi lolos uji kelayakan
    (meski ini belum membuktikan konstanta \(\frac{1}{2}\)-nya benar, karena konstanta angka
    murni memang tidak kelihatan dari analisis dimensi).

callout.mistake — Kesalahan Umum
❌ Salah: mengira analisis dimensi bisa membuktikan sebuah rumus 100% benar.
✅ Benar: analisis dimensi cuma bisa MENGGUGURKAN rumus yang jelas salah (dimensi tidak cocok).
  Rumus yang lolos uji dimensi belum tentu benar 100% — konstanta angka murni seperti
  \(\frac{1}{2}\), \(2\pi\), atau faktor numerik lain tidak punya dimensi sehingga tidak
  terdeteksi lewat cara ini. Analisis dimensi adalah alat SARING awal, bukan bukti akhir.

p.body-text: Trik cepat buat soal pilihan ganda "manakah persamaan yang secara dimensi
  mungkin benar": cek dulu SEMUA suku yang dijumlahkan/dikurangkan punya dimensi sama — kalau
  ada satu saja yang beda (misalnya sebuah opsi menulis \(x = x_0 + v_0 t^{2}\), yang berdimensi
  \([L][T]\), bukan \([L]\)), opsi itu otomatis salah tanpa perlu mengecek suku lainnya.
```

## Page 7 — Latihan Tambahan

A short additional practice set (5 soal + pembahasan singkat) per §5's "short additional
practice set" — overlaps in topic with the quiz JSON but uses different numbers/scenarios so
students see fresh practice, not the same items twice.

```
chapter-tag: Bab 1 · Latihan Tambahan
subject-chip: Fisika

h2.section-title: Latihan Tambahan
p.lead: Lima soal terakhir menggabungkan besaran turunan, notasi ilmiah, dan analisis dimensi —
  coba kerjakan dulu sebelum lihat pembahasannya.

ol.ref-list:
  - <b>Soal 1.</b> Sebuah mobil bergerak dengan gaya dorong 2.000 N dan massa 1.000 kg. Berapa
    percepatannya, dan sebutkan dimensinya? <i>Pembahasan: a = F/m = 2.000/1.000 = 2 m/s^2,
    dimensi \([L][T]^{-2}\).</i>
  - <b>Soal 2.</b> Tulis 0,000045 kg dalam bentuk notasi ilmiah. <i>Pembahasan: geser koma 5
    langkah ke kanan → \(4{,}5 \times 10^{-5}\) kg.</i>
  - <b>Soal 3.</b> Manakah dari berikut yang BUKAN besaran turunan: Momentum, Frekuensi, Kuat
    Arus Listrik, Tegangan Permukaan? <i>Pembahasan: Kuat Arus Listrik adalah besaran POKOK
    (satuan Ampere), tiga lainnya besaran turunan.</i>
  - <b>Soal 4.</b> Periksa apakah persamaan \(v^{2} = v_0^{2} + 2as\) homogen secara dimensi
    (v = kecepatan, a = percepatan, s = jarak). <i>Pembahasan: \([v^{2}] = [L]^{2}[T]^{-2}\).
    \([2as] = [L][T]^{-2} \times [L] = [L]^{2}[T]^{-2}\). Kedua ruas sama-sama
    \([L]^{2}[T]^{-2}\) — persamaan ini homogen.</i>
  - <b>Soal 5.</b> Tekanan atmosfer di puncak gunung tertentu tercatat 45.000 Pa. Tulis dalam
    notasi ilmiah dengan 2 digit signifikan. <i>Pembahasan: \(4{,}5 \times 10^{4}\) Pa — geser
    koma 4 langkah ke kiri, sisakan 2 digit signifikan (4 dan 5) sesuai presisi data asal.</i>
```
