# PDF Companion Spec — Bab 2 Kimia: Sejarah &amp; Evolusi Model Atom

Curated content for the PDF companion, built on `public/assets/pdf-template/page-template.html`
(`.pdf-page[data-subject="kimia"]`). Not an export of the HTML page — the HTML lesson already
carries the full causal narrative (why each model replaced the last), so this PDF focuses on what
the guide's §5 actually calls for beyond that: the full comprehensive comparison table (5 columns
incl. Kelebihan/Kelemahan in full prose, not the 3-column condensed version on the HTML page), a
one-page quantum-formula reference sheet, two additional guided worked examples not on the HTML
page at all (from the source module's Soal 4 & Soal 5), extra historical depth on the Yunani
Kuno → Dalton transition (kept brief on the HTML page), and a consolidated common-mistakes recap.

**Accent color:** `--accent:#e2447e`, the value already decided for Kimia in
`bab1-hakikat-kimia-hijau-k3lab.pdf-spec.md` / reused in `bab3-struktur-atom-sistem-periodik.pdf-spec.md`
(matches the site's `--pink` CSS variable / `subjectsData.kimia.color`). Not re-decided here.

**LaTeX use:** per §5's Matematika/Fisika/Kimia rule, LaTeX is used throughout for scientific
notation, quantum-number/momentum equations (Bohr's quantization, de Broglie's wavelength,
Heisenberg-linked energy transition), and nuclide/particle notation wherever plain text would be
ambiguous or ugly.

**Source:** all content below is drawn directly from `bab2-sejarah-model-atom-source.pdf` (6
pages) — no fabricated facts, dates, or figures. Soal 4 and Soal 5 (pages 5–6 of the source) are
guided exercises not used anywhere on the HTML page (which uses Soal 1, Soal 2, and Soal 3 —
adapted into the Rutherford, Bohr, and comparison sections respectively).

9 pages: 1 chapter-opener + 8 content pages. The comprehensive comparison table (originally
planned as 2 pages) was split into 3 during the render/clipping-check pass — a 5-row table with
all 5 columns still overflowed `.page-body` even with the `dense` modifier (measured via
scrollHeight vs clientHeight), so it was split 3+2+2 rows across three pages rather than crammed,
per the guide's "split into two pages rather than cramming" rule. All page numbers below reflect
the final 9-page layout.

## Page 1 — Chapter opener

```
chapter-tag: Bab 2
subject-chip: Kimia
h1.page-title: Sejarah & Evolusi Model Atom
p.dek: Materi PDF — pelengkap Bab 2
p.lead: Materi tambahan ini fokus ke tabel perbandingan komprehensif keenam tokoh/model (dengan
  kelebihan & kelemahan lengkap dalam prosa, bukan cuma daftar singkat), lembar rumus cepat
  notasi & persamaan kuantum satu halaman, dua latihan soal terpandu tambahan (kontribusi
  Thomson & Millikan, dan Hukum Perbandingan Berganda Dalton), pendalaman transisi dari
  filsafat Yunani Kuno ke sains kuantitatif Dalton, plus rekap kesalahan umum di seluruh bab —
  pelengkap narasi sebab-akibat di halaman utama, bukan salinannya.
h2.section-title: Yang akan kamu pelajari
ul.learn-list:
  - Tabel perbandingan komprehensif 7 tokoh/model (Demokritos, Dalton, Thomson, Millikan,
    Rutherford, Bohr, Schrödinger) — konsep utama, eksperimen kunci, kelebihan & kelemahan
    ditulis lengkap dalam prosa, bukan cuma kata kunci
  - Lembar rumus cepat satu halaman: notasi nuklida, momentum sudut Bohr, panjang gelombang
    de Broglie, energi transisi elektron, dan istilah kunci tiap model
  - Latihan soal terpandu tambahan: kontribusi kuantitatif J.J. Thomson & Robert Millikan
    dalam menentukan karakteristik elektron
  - Latihan soal terpandu tambahan: kenapa Hukum Perbandingan Berganda jadi salah satu bukti
    terpenting yang mendukung Teori Atom Dalton
  - Pendalaman sejarah: kenapa gagasan Demokritos dianggap filosofis (bukan sains), dan apa
    yang benar-benar berubah begitu Dalton masuk ke era bukti kuantitatif
  - Rekap kesalahan umum siswa di seluruh sejarah evolusi model atom
```

## Pages 2–4 — Tabel Perbandingan Komprehensif (3 bagian: Demokritos–Thomson, Millikan–Rutherford, Bohr–Schrödinger)

Split into 3 pages (3+2+2 rows) after the clipping-check pass found a 5-row/5-column table
overflowed even with `.dense` — see the split-page note above. Page content below shown as the
original 2-page draft; the actual `.pdf-pages.html` divides it 3/2/2 rows across pages 2, 3, 4.

Full comparison table with all 5 columns (Tokoh & Tahun, Konsep/Postulat Utama, Eksperimen
Kunci, Kelebihan/Kontribusi, Kelemahan/Keterbatasan), reproduced from the source module's Section
9 table — the HTML page's `#perbandingan-model` table only carries 3 of these columns (condensed
for readability on-page); this PDF page carries the full 5-column version in `.ref-table` with
every cell as real explanatory text, not a truncated keyword.

| Tokoh & Tahun | Konsep/Postulat Utama | Eksperimen Kunci | Kelebihan/Kontribusi | Kelemahan/Keterbatasan |
|---|---|---|---|---|
| Demokritos (±400 SM) | Materi tersusun dari partikel sangat kecil yang tidak dapat dibagi lagi (atomos). | Pemikiran filosofis murni, tanpa laboratorium atau alat ukur apa pun. | Mencetuskan ide dasar konsep atom pertama dalam sejarah peradaban manusia. | Tidak didukung bukti eksperimen ilmiah sama sekali; dianggap murni gagasan spekulatif, dan sempat ditolak Aristoteles. |
| John Dalton (1803) | Atom adalah bola pejal tak terbagi. Unsur yang sama memiliki atom identik; senyawa adalah gabungan atom dengan rasio bilangan bulat sederhana. | Berlandaskan Hukum Kekekalan Massa (Lavoisier) & Hukum Perbandingan Tetap (Proust) — dua hukum kuantitatif hasil eksperimen kimia. | Meletakkan dasar teori kimia kuantitatif pertama; berhasil menjelaskan hukum-hukum rasio stoikiometri, termasuk memprediksi Hukum Perbandingan Berganda. | Tidak menjelaskan sifat kelistrikan materi; menganggap atom tidak bermassa internal/tidak berstruktur sama sekali. |
| J.J. Thomson (1897) | Model Roti Kismis: atom berupa bola padat bermuatan positif dengan elektron bermuatan negatif tersebar merata di dalamnya. | Eksperimen Tabung Sinar Katode — berhasil mengukur rasio muatan terhadap massa elektron (e/m). | Membuktikan untuk pertama kalinya keberadaan partikel sub-atomik bermuatan negatif (elektron) di dalam atom — meruntuhkan model bola pejal Dalton. | Gagal menjelaskan di mana sebenarnya letak muatan positif terkonsentrasi, dan tidak bisa menjelaskan hasil hamburan sinar alfa yang ditemukan Rutherford. |
| Robert Millikan (1909) | Penentuan kuantitatif nilai muatan tunggal elektron dan kalkulasi massa elektron. | Eksperimen Tetes Minyak (Oil Drop Experiment) dengan pemberian muatan lewat radiasi sinar-X. | Memperoleh nilai muatan presisi satu elektron \(e = -1{,}6 \times 10^{-19}\) C, dan (dikombinasikan dengan rasio e/m Thomson) massa elektron \(m = 9{,}11 \times 10^{-28}\) g. | Fokusnya murni pada pengukuran parameter fisika elektron secara presisi, bukan pada penyusunan struktur/gambaran visual tata atom secara keseluruhan. |
| Ernest Rutherford (1911) | Model Inti/Tata Surya: pusat atom adalah inti padat bermuatan positif (nukleus), dikelilingi elektron yang bergerak di ruang kosong. | Penembakan Partikel Alfa (α) pada Lempeng Emas Tipis (dibantu Geiger & Marsden). | Menemukan keberadaan Inti Atom dan Proton; menjelaskan bahwa sebagian besar volume atom sebenarnya adalah ruang kosong. | Bertentangan dengan elektrodinamika klasik Maxwell — menurut teori itu, elektron yang mengorbit seharusnya terhempas jatuh ke inti, padahal atom nyatanya stabil. |

```
chapter-tag: Bab 2 · Tabel Perbandingan (1/3) — actual pages 2–4, split 3/2/2 rows, see note above
subject-chip: Kimia

h2.section-title: Tabel Perbandingan Komprehensif Evolusi Model Atom (1/2)
p.lead: Versi lengkap 5 kolom dari tabel ringkas di halaman utama — kelebihan & kelemahan tiap
  tokoh ditulis penuh sebagai kalimat penjelas, bukan cuma kata kunci, supaya bisa dibaca berdiri
  sendiri tanpa perlu buka halaman utama.

[ref-table di atas, 5 baris: Demokritos, Dalton, Thomson, Millikan, Rutherford]
```

### (continuation — actual Page 4 in rendered .pdf-pages.html)

| Tokoh & Tahun | Konsep/Postulat Utama | Eksperimen Kunci | Kelebihan/Kontribusi | Kelemahan/Keterbatasan |
|---|---|---|---|---|
| Niels Bohr (1913) | Model Orbit/Kulit Stasioner: elektron mengelilingi inti pada tingkat energi terkuantisasi tanpa meradiasikan energi. | Spektroskopi Spektrum Garis Atom Hidrogen & Teori Kuantum Max Planck. | Berhasil menjelaskan kestabilan atom (membantah prediksi keruntuhan Maxwell) dan pola spektrum emisi/absorpsi atom Hidrogen secara akurat. | Hanya akurat untuk atom/ion berelektron tunggal (\(\ce{H}\), \(\ce{He+}\)); gagal pada atom kompleks berelektron banyak, dan tidak menjelaskan efek Zeeman. |
| Erwin Schrödinger (1926) | Model Mekanika Kuantum/Awan Elektron: elektron berada dalam orbital (daerah kebolehjadian/probabilitas tinggi, ≥90%), bukan lintasan pasti. | Persamaan Gelombang Schrödinger, didasari Dualisme Gelombang-Partikel de Broglie & Asas Ketidakpastian Heisenberg. | Model paling akurat yang dipakai sampai sekarang; menjelaskan struktur atom berelektron banyak dan bentuk geometri orbital (s, p, d, f). | Persamaan matematisnya sangat kompleks; posisi pasti elektron tidak pernah bisa ditentukan secara pasti, hanya berupa probabilitas. |

```
chapter-tag: Bab 2 · Tabel Perbandingan (3/3) — actual page 4
subject-chip: Kimia

h2.section-title: Tabel Perbandingan Komprehensif Evolusi Model Atom (2/2)
p.lead: Lanjutan tabel dari halaman sebelumnya — dua model terakhir, sekaligus dua model yang
  paling sering dibandingkan langsung di soal ujian (orbit vs orbital).

[ref-table di atas, 2 baris: Bohr, Schrödinger]

p.body-text: Perhatikan pola kelebihan/kelemahan di seluruh tabel dua halaman ini: tiap
  "Kelemahan" pada satu baris hampir selalu jadi alasan langsung lahirnya "Konsep Utama" pada
  baris berikutnya. Itu bukan kebetulan — itulah keseluruhan poin bab ini: evolusi model atom
  adalah rantai sebab-akibat, bukan daftar nama yang harus dihafal lepas-lepas.
```

## Page 5 — Lembar Rumus Cepat: Notasi &amp; Persamaan Kuantum

Not present on the HTML page (which states each formula inline within its own section, spread
across 3 different sections) — this is the single-page recap for the whole chapter's math
content, the reason the PDF path exists per §5 for Kimia.

```
chapter-tag: Bab 2 · Lembar Rumus Cepat
subject-chip: Kimia

h2.section-title: Lembar Rumus Cepat — Notasi & Persamaan Kuantum
p.lead: Semua notasi & persamaan inti Bab 2 dalam satu tabel — buat direview cepat sebelum
  ujian, tanpa perlu scroll ulang tiap section di halaman utama.

[ref-table]
| Konsep | Rumus/Notasi | Keterangan |
|---|---|---|
| Rasio Muatan/Massa Elektron (Thomson) | \(e/m = -1{,}76 \times 10^{8}\) C/g | Diukur lewat pembelokan sinar katode oleh medan listrik & magnet |
| Muatan Elektron (Millikan) | \(e = -1{,}602 \times 10^{-19}\) C | Diukur lewat eksperimen tetes minyak |
| Massa Elektron | \(m_e = 9{,}109 \times 10^{-28}\) g \(\approx \frac{1}{1836} m_{\ce{H}}\) | Dihitung dari kombinasi e/m Thomson & e Millikan |
| Momentum Sudut Terkuantisasi (Bohr) | \(mvr = n\dfrac{h}{2\pi}\), \(n = 1,2,3,...\) | n = bilangan kuantum utama, menandai orbit stasioner yang diizinkan |
| Energi Transisi Elektron (Bohr) | \(\Delta E = E_2 - E_1 = h\nu\) | Eksitasi = menyerap foton, de-eksitasi = memancarkan foton |
| Panjang Gelombang de Broglie | \(\lambda = \dfrac{h}{p}\) | Dasar dualisme gelombang-partikel elektron |
| Probabilitas Orbital (Schrödinger) | Daerah dengan peluang \(\geq 90\%\) | Bukan posisi pasti — beda fundamental dari "orbit" Bohr |

p.body-text: Satu pola yang menyatukan baris ke-4 sampai ke-7: semuanya lahir dari usaha
  menjelaskan perilaku elektron yang TIDAK bisa dijelaskan fisika klasik — momentum
  terkuantisasi Bohr menjawab keruntuhan Maxwell, sementara de Broglie & probabilitas orbital
  Schrödinger menjawab keterbatasan Bohr sendiri pada atom berelektron banyak.
```

## Page 6 — Latihan Terpandu: Kontribusi Thomson &amp; Millikan

Source module's Soal 4 — not used anywhere on the HTML page (the HTML page's Thomson/Millikan
section states the two contributions narratively; this guided example asks the student to
reconstruct them as an exam-style answer).

```
chapter-tag: Bab 2 · Latihan Terpandu
subject-chip: Kimia

h2.section-title: Latihan Terpandu: Kontribusi Thomson & Millikan pada Karakteristik Elektron
p.lead: Soal ujian klasik yang minta kamu membedakan dua kontribusi yang sering ketuker karena
  sama-sama "soal elektron" — padahal masing-masing mengukur besaran yang berbeda.

div.example-box (label: Soal · Kontribusi J.J. Thomson & Robert Millikan)
p.setup: Sebutkan kontribusi eksperimen J.J. Thomson dan Robert Millikan dalam menentukan
  karakteristik elektron!
ol:
  - J.J. Thomson (1897): lewat eksperimen tabung sinar katode, berhasil MEMBUKTIKAN
    keberadaan elektron sebagai partikel sub-atomik bermuatan negatif, dan mengukur RASIO
    muatan terhadap massanya: \(e/m = -1{,}76 \times 10^{8}\) C/g. Perhatikan: ini baru
    rasio, bukan nilai muatan atau massa elektron yang berdiri sendiri.
  - Robert Millikan (1909): lewat eksperimen tetes minyak, berhasil MENGUKUR muatan presisi
    satu elektron secara berdiri sendiri: \(e = -1{,}602 \times 10^{-19}\) C.
  - Karena rasio e/m Thomson sudah diketahui, begitu nilai e dari Millikan didapat, massa
    elektron bisa dihitung: \(m_e = \dfrac{e}{(e/m)} = 9{,}11 \times 10^{-28}\) g.
  - Kesimpulan: Thomson menjawab PERTANYAAN KUALITATIF ("apakah elektron ada, dan berapa
    rasio muatan-massanya"), sedangkan Millikan menjawab PERTANYAAN KUANTITATIF LANJUTAN
    ("berapa persis nilai muatan & massa satu elektron") — dua eksperimen yang saling
    melengkapi, bukan saling menggantikan.

p.body-text: Ini pola yang berulang di sepanjang bab: satu eksperimen menjawab pertanyaan
  "apa", eksperimen berikutnya menjawab pertanyaan "berapa persisnya" — sama seperti
  Rutherford yang menjawab "di mana muatan positif berada" setelah Thomson menjawab "apakah
  ada partikel bermuatan negatif di dalam atom".

callout.mistake — Kesalahan Umum
❌ Salah: menganggap Thomson dan Millikan menemukan hal yang sama, atau menukar siapa yang
  mengukur rasio e/m dan siapa yang mengukur nilai e secara langsung.
✅ Benar: Thomson = rasio e/m (via tabung sinar katode). Millikan = nilai e berdiri sendiri
  (via tetes minyak) — massa elektron BARU bisa dihitung setelah kedua nilai ini digabung.
```

## Page 7 — Latihan Terpandu: Hukum Perbandingan Berganda &amp; Teori Dalton

Source module's Soal 5 — not used on the HTML page at all (the HTML page's Dalton section
mentions Hukum Perbandingan Berganda only as a one-line "keberhasilan" note, without walking
through why it's evidence FOR the atomic theory).

```
chapter-tag: Bab 2 · Latihan Terpandu
subject-chip: Kimia

h2.section-title: Latihan Terpandu: Hukum Perbandingan Berganda sebagai Bukti Teori Dalton
p.lead: Soal analisis konseptual — kenapa satu hukum kimia kuantitatif bisa jadi bukti kuat
  untuk sebuah model atom, bukan cuma kebetulan angka?

div.example-box (label: Soal · Hukum Perbandingan Berganda)
p.setup: Mengapa Hukum Perbandingan Berganda Dalton menjadi salah satu bukti terpenting yang
  mendukung Teori Atom Dalton?
ol:
  - Hukum Perbandingan Berganda menyatakan: jika dua unsur membentuk lebih dari satu senyawa,
    maka massa unsur kedua yang bergabung dengan massa unsur pertama yang tetap akan
    berbanding sebagai angka bulat & sederhana (misal 1:2, bukan 1:2,37).
  - Pola "angka bulat & sederhana" ini HANYA mungkin terjadi kalau unsur-unsur tersusun dari
    unit-partikel diskrit yang tak terbagi (atom-atom) — bukan materi kontinu yang bisa
    dibagi ke pecahan berapa pun (seperti cairan homogen).
  - Kalau materi memang kontinu (bisa dibagi tanpa batas), rasio massa antar-senyawa bisa
    berupa pecahan sembarang, bukan cuma rasio bulat sederhana. Kenyataannya rasio yang
    teramati selalu bulat & sederhana — pas sesuai prediksi kalau materi tersusun dari atom.
  - Kesimpulan: Hukum Perbandingan Berganda bukan cuma pola matematis yang kebetulan cocok —
    pola itu SECARA LOGIS mengharuskan keberadaan partikel diskrit (atom), persis seperti
    yang dipostulatkan Dalton.

p.body-text: Ini contoh bagus soal "mengapa", bukan "apa" — ujian sering nanya kenapa sebuah
  hukum empiris (hasil pengukuran lab) bisa dipakai sebagai bukti teori (model penjelas).
  Jawabannya selalu: cek dulu, pola macam apa yang HARUS ada kalau teorinya benar, lalu
  bandingkan dengan pola yang benar-benar teramati di lab.
```

## Page 8 — Pendalaman: Dari Filsafat Yunani Kuno ke Sains Kuantitatif Dalton

Extra historical depth beyond the HTML page's brief mention — the HTML page's `#pengantar-yunani`
section keeps Demokritos/Aristoteles short (foundational framing only); this page elaborates the
~2.200 tahun gap and what specifically changed once Dalton entered.

```
chapter-tag: Bab 2 · Pendalaman
subject-chip: Kimia

h2.section-title: Kenapa Butuh 2.200 Tahun dari Demokritos ke Dalton?
p.lead: Gagasan Demokritos benar secara garis besar ("materi tersusun dari partikel
  terkecil") — tapi butuh lebih dari dua milenium sebelum gagasan itu diterima sebagai sains.
  Bukan karena idenya salah, tapi karena caranya sampai ke kesimpulan itu yang bermasalah.

p.body-text: Demokritos & Leukipos sampai pada gagasan atomos murni lewat perdebatan logika —
  "kalau materi terus dipotong, apakah ada batasnya?" — tanpa satu pun pengukuran, timbangan,
  atau eksperimen terkontrol. Ini yang membuat Aristoteles, filsuf paling berpengaruh di masa
  itu, bisa menolaknya begitu saja dengan gagasan tandingan (empat elemen: air, udara, tanah,
  api) — dan karena besarnya pengaruh Aristoteles di dunia filsafat Barat, gagasan empat
  elemen inilah yang justru bertahan dominan selama berabad-abad, bukan gagasan atomos.

p.body-text: Yang berubah di tangan John Dalton (1803) bukan kesimpulannya (atom itu ada),
  tapi METODENYA. Dalton tidak mengajukan atom lewat logika semata — ia mengajukannya sebagai
  penjelasan yang PALING MASUK AKAL untuk dua hukum kimia yang sudah diukur berkali-kali di
  laboratorium: Hukum Kekekalan Massa (massa total zat sebelum & sesudah reaksi kimia selalu
  sama) dan Hukum Perbandingan Tetap (unsur-unsur dalam satu senyawa murni selalu bergabung
  dengan perbandingan massa yang tetap, berapa pun asal & jumlah sampelnya). Begitu Dalton
  bisa MEMPREDIKSI pola baru (Hukum Perbandingan Berganda) dari model atomnya sendiri —
  dan prediksi itu terbukti benar saat diukur — teori atom pindah status dari "gagasan
  filosofis yang bisa ditolak logika lain" menjadi "teori ilmiah yang harus diuji lewat
  eksperimen, bukan debat."

p.body-text: Pelajaran metodologis ini yang membuat bab ini relevan buat ujian, bukan cuma
  soal hafalan nama & tahun: kamu akan sering ketemu soal yang minta membedakan MANA yang
  sekadar hipotesis/gagasan, dan MANA yang sudah jadi teori teruji — kuncinya selalu ada di
  satu pertanyaan: apakah gagasan itu sudah diuji lewat eksperimen terkontrol & bisa
  memprediksi hasil baru, atau masih murni logika/pengamatan sepintas?
```

## Page 9 — Rekap Kesalahan Umum di Seluruh Bab 2

```
chapter-tag: Bab 2 · Rekap Kesalahan Umum
subject-chip: Kimia

h2.section-title: Rekap Kesalahan Umum di Seluruh Bab 2
p.lead: Tujuh kesalahan paling sering ditemui siswa SMA di topik sejarah model atom,
  dirangkum jadi satu halaman referensi cepat.

ol.ref-list:
  - <b>Mengira Demokritos "menemukan" atom lewat eksperimen.</b> Gagasan Demokritos murni
    filosofis/logika, tanpa laboratorium atau bukti eksperimen sama sekali — beda mendasar
    dari Dalton yang berlandaskan hukum kimia kuantitatif hasil eksperimen.
  - <b>Menyamakan model Thomson dengan model Rutherford.</b> Thomson: muatan positif
    tersebar merata (roti kismis). Rutherford: muatan positif terpusat di inti (tata surya) —
    dua gambaran yang dibuktikan saling bertentangan oleh eksperimen lempeng emas.
  - <b>Mengira Rutherford menemukan neutron.</b> Rutherford menemukan inti atom & proton
    (1911); neutron baru ditemukan James Chadwick, 21 tahun kemudian (1932) — bab ini fokus
    ke enam model utama, bukan ke penemuan partikel Chadwick.
  - <b>Menganggap model Bohr berlaku sama akuratnya untuk semua atom.</b> Model Bohr HANYA
    akurat untuk atom/ion berelektron tunggal (H, \(\ce{He+}\)) — bukan untuk atom
    berelektron banyak seperti karbon atau oksigen.
  - <b>Mengira "orbit" dan "orbital" cuma beda ejaan untuk hal yang sama.</b> Orbit (Bohr) =
    lintasan 2D pasti. Orbital (Schrödinger) = daerah probabilitas 3D (≥90%), BUKAN lintasan
    pasti — beda konsep secara fundamental, bukan cuma beda istilah.
  - <b>Menjawab "di mana posisi pasti elektron dalam orbital" dengan sebuah titik/lokasi.</b>
    Ini soal jebakan — jawabannya justru TIDAK ADA posisi pasti, karena itu definisi dasar
    orbital (probabilitas, bukan kepastian), berdasar Asas Ketidakpastian Heisenberg.
  - <b>Menghafal urutan model tanpa tahu alasan pergantiannya.</b> Ujian sering nanya
    "kenapa model X diganti model Y", bukan cuma "urutkan modelnya" — selalu siapkan alasan
    kausal tiap pergantian (titik buta model lama → bukti eksperimen baru → model baru).
```
