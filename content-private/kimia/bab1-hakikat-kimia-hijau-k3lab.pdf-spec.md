# PDF Companion Spec — Bab 1 Kimia: Hakikat Ilmu Kimia, Kimia Hijau & Keselamatan Laboratorium

Curated content for the PDF companion, built on `public/assets/pdf-template/page-template.html`
(`.pdf-page[data-subject="kimia"]`). Not an export of the HTML page — this is the dense
static-reference material per CHAPTER_CONTENT_GUIDE.md §5: entire non-interactive reference
content (the full 12-principle table, the full hazard-symbol table with prevention actions, the
full first-aid procedure, extra worked examples) lives here in full, elaborated form — not terse
labels, since PDF pages must stand alone without the HTML page's visual context.

**Accent color:** `kimia`'s site color is `pink` (`subjectsData.kimia.color` in `app.js`), which
wasn't yet assigned a PDF `--accent` hex (CHAPTER_CONTENT_GUIDE.md §5 flagged it "not yet
decided"). This is the first Kimia chapter, so this pass decides it: `--accent:#e2447e`, matching
the site's own `--pink` CSS variable (`public/assets/styles.css` light-mode `:root`). Flagging
this choice explicitly rather than guessing silently — future Kimia chapters should reuse this
same value.

Kimia is equation-dense per subject (Matematika/Fisika/Kimia use LaTeX in the PDF), but this
particular chapter is intro/conceptual — the only real formula is % Ekonomi Atom, so LaTeX is
used only where that formula/its worked examples appear (Pages 6). Everything else is
prose/tables, same treatment as Biologi/Ekonomi.

9 pages: 1 chapter-opener + 8 content pages. Peran Ilmu Kimia (originally planned as one
page) ended up split across two pages (2 and 3) during the render/clipping-check pass —
the .dense modifier alone wasn't enough to fit all 5 bidang + the mistake callout on one
page without clipping (measured via .page-body scrollHeight vs clientHeight), so it was
split rather than trimmed, per the guide's "split into two pages rather than cramming"
rule. All subsequent pages shifted by +1 from the original plan below.

## Page 1 — Chapter opener

```
chapter-tag: Bab 1
subject-chip: Kimia
h1.page-title: Hakikat Kimia, Kimia Hijau & Keselamatan Lab
p.dek: Materi PDF — pelengkap Bab 1
p.lead: Materi tambahan ini fokus ke penjelasan lengkap peran kimia di tiap bidang kehidupan,
  tabel lengkap 12 Prinsip Kimia Hijau (penjelasan + contoh penerapan nyata), latihan soal
  terpandu tambahan, contoh soal Ekonomi Atom kedua, tabel lengkap simbol bahaya + tindakan
  pencegahannya, dan prosedur P3K lengkap — pelengkap materi & diagram interaktif di halaman
  utama, bukan salinannya.
h2.section-title: Yang akan kamu pelajari
ul.learn-list:
  - Penjelasan lengkap peran ilmu kimia di 5 bidang kehidupan (kesehatan, tekstil, pembersih
    rumah tangga, pertanian, teknologi) dengan mekanisme kimianya masing-masing
  - Tabel lengkap 12 Prinsip Kimia Hijau (Anastas & Warner) — penjelasan konseptual SMA +
    contoh penerapan nyata untuk tiap satu dari 12 prinsip, disusun per 3 pilar
  - Dua soal analisis terpandu bergaya ujian: identifikasi prinsip Kimia Hijau pada kasus
    industri bioplastik, dan identifikasi simbol bahaya + aturan penyimpanan
  - Soal kedua perhitungan % Ekonomi Atom dengan reaksi berbeda (Zn + HCl), plus rekap rumus
  - Tabel lengkap 5 simbol bahaya bahan kimia — arti, contoh bahan, DAN tindakan pencegahan
    keamanan untuk tiap simbol (kolom yang tidak ada di diagram halaman utama)
  - Prosedur Pertolongan Pertama (First Aid) kecelakaan laboratorium secara lengkap
  - Penjelasan lebih dalam soal microscale chemistry sebagai penerapan nyata Kimia Hijau
```

## Page 2 — Peran Ilmu Kimia dalam Kehidupan Sehari-hari (1/2: Kesehatan, Tekstil, Pembersih)

This content previously lived in the HTML under `#hakikat-kimia` as a short `check-list`
(one line per bidang) — removed there as the short/foundational version (the HTML keeps only
the one-line list plus the two household diagrams) and elaborated here in full, including the
NaClO reduction-oxidation mechanism explained step by step (matches the source module's Soal 1
pembahasan). Originally planned as one page; split into Page 2 + Page 3 after the render pass
showed all 5 bidang + the mistake callout didn't fit one page without clipping even with the
`dense` modifier (measured via `.page-body` scrollHeight vs clientHeight) — see the note at
the top of this spec.

```
chapter-tag: Bab 1 · Hakikat Kimia
subject-chip: Kimia

h2.section-title: Peran Ilmu Kimia dalam Kehidupan Sehari-hari (1/2)
p.lead: Lima bidang paling sering diuji, dengan mekanisme kimia di baliknya — bukan cuma nama
  produknya, tapi kenapa produk itu bisa bekerja. Kesehatan, tekstil, dan pembersih rumah
  tangga dulu di halaman ini; pertanian & teknologi ada di halaman berikutnya.

p.body-text: <b>Kesehatan & Farmasi.</b> Penemuan vaksin, antibiotik, antiseptik, dan
  obat-obatan sintesis lahir dari pemahaman struktur molekul & reaksi kimia di tubuh —
  antibiotik misalnya bekerja dengan mengganggu proses kimia spesifik dalam sel bakteri
  (mis. sintesis dinding selnya) tanpa merusak sel manusia. Penemuan-penemuan ini yang
  menyelamatkan jutaan nyawa sepanjang sejarah kedokteran modern.

p.body-text: <b>Pakaian & Tekstil.</b> Serat sintetis (poliester, nilon, akrilik) dibuat lewat
  proses polimerisasi — menyambung molekul-molekul kecil (monomer) jadi rantai panjang
  (polimer) yang kuat & tahan lama, jauh lebih murah diproduksi massal dibanding serat alami.
  Pewarna tekstil sintetis juga hasil rekayasa kimia supaya warnanya tahan luntur.

p.body-text: <b>Pembersih Rumah Tangga.</b> Sabun & detergen bekerja lewat molekul surfaktan —
  punya "kepala" yang suka air (hidrofilik) dan "ekor" yang suka lemak (hidrofobik), sehingga
  bisa mengangkat kotoran berminyak dan membawanya larut ke dalam air. Pemutih pakaian
  (kloroks/NaClO, Natrium Hipoklorit) bekerja lewat mekanisme berbeda: NaClO adalah zat
  pengoksidasi (oksidator) yang melepaskan oksigen aktif untuk memutus ikatan rangkap pada
  molekul pigmen noda (kromofor), sehingga warna noda hilang — sekaligus merusak dinding sel
  bakteri & virus lewat oksidasi, menjadikannya disinfektan yang efektif. Tanpa pemahaman
  kimia soal konsentrasi & keamanan, kita tidak bisa memformulasi pembersih yang ampuh
  sekaligus aman dipakai di rumah.
```

## Page 3 — Peran Ilmu Kimia dalam Kehidupan Sehari-hari (2/2: Pertanian, Teknologi)

Continuation of Page 2 (see split note above).

```
chapter-tag: Bab 1 · Hakikat Kimia
subject-chip: Kimia

h2.section-title: Peran Ilmu Kimia dalam Kehidupan Sehari-hari (2/2)
p.lead: Lanjutan dari halaman sebelumnya — pertanian & pangan, lalu teknologi & gadget.

p.body-text: <b>Pertanian & Pangan.</b> Pupuk urea (mengandung nitrogen dalam bentuk yang bisa
  diserap akar tanaman) dan NPK (Nitrogen-Fosfor-Kalium) hasil rekayasa kimia untuk menyuburkan
  tanah secara terarah. Biopestisida ramah lingkungan (dari mikroorganisme/tumbuhan) jadi
  alternatif pestisida sintetis yang lebih cepat terurai. Pengawetan makanan (mis. dengan
  asam benzoat dalam batas aman) mencegah pertumbuhan mikroorganisme perusak tanpa membuat
  makanan berbahaya dikonsumsi.

p.body-text: <b>Teknologi & Gadget.</b> Baterai lithium-ion pada smartphone bekerja lewat
  perpindahan ion litium antara elektroda saat mengisi/menggunakan daya (reaksi elektrokimia
  reversibel). Semikonduktor silikon — bahan dasar chip komputer — adalah hasil rekayasa
  struktur kristal & kemurnian kimia yang sangat presisi. Layar OLED memakai senyawa organik
  yang memancarkan cahaya sendiri saat dialiri listrik (elektroluminesensi).

callout.mistake — Kesalahan Umum
❌ Salah: mengira ilmu kimia cuma relevan di dalam laboratorium atau pabrik besar.
✅ Benar: kimia ada di hampir setiap barang yang kamu pakai/pegang sehari-hari — dari pasta
  gigi, sabun mandi, kompor gas, sampai baterai HP-mu. Memahami mekanismenya membantu kamu
  memakai produk-produk itu dengan lebih aman & bijak, bukan cuma buat lulus ujian.
```

## Page 4 — Referensi: 12 Prinsip Kimia Hijau (Pilar 1 & 2)

This content previously lived in the HTML under `#tiga-pilar-prinsip` as a compact per-pilar
`check-list` (nama prinsip saja, tanpa penjelasan konseptual/contoh) — removed there (the HTML
keeps only the diagram + short 3-pillar grouping) and moved here as the full source table
(No. / Prinsip / Penjelasan Konseptual SMA / Contoh Penerapan Nyata SMA), split across two
pages (Pilar 1+2 here, Pilar 3 on Page 4) to avoid clipping a 12-row table on one page.

| No | Prinsip | Penjelasan Konseptual SMA | Contoh Penerapan Nyata SMA |
|---|---|---|---|
| 1 | Pencegahan Limbah (Prevent Waste) | Mencegah terbentuknya limbah sejak awal lebih baik daripada mengolah limbah setelah dihasilkan. | Merancang reaksi tanpa produk sampingan beracun. |
| 11 | Analisis Real-Time (Real-time Analysis) | Pemantauan pemprosesan secara langsung untuk mencegah pembentukan zat berbahaya sebelum terjadi. | Sensor otomatis pencegah kebocoran reaksi. |
| 12 | Pencegahan Kecelakaan (Prevent Accidents) | Memilih zat kimia dan wujudnya yang meminimalkan potensi ledakan, kebakaran, dan kebocoran. | Menghindari penggunaan gas bertekanan ekstrem. |
| 3 | Sintesis Kurang Berbahaya (Less Hazardous Syntheses) | Menggunakan dan menghasilkan zat yang sedikit atau tidak beracun bagi manusia dan bumi. | Mengganti asam pekat berbahaya dengan asam organik lemah. |
| 4 | Merancang Bahan Lebih Aman (Design Safer Chemicals) | Merancang produk yang tetap efektif berfungsi tetapi minim tingkat beracunnya. | Pestisida hayati (biopestisida) ramah lingkungan. |
| 5 | Pelarut & Alat Bantu Aman (Safer Solvents) | Mengurangi pelarut organik beracun (seperti benzen) dan menggantinya dengan pelarut ramah lingkungan. | Menggunakan air (H₂O) atau cairan ionik terbarukan sebagai pelarut. |
| 8 | Mengurangi Derivatif (Avoid Derivatives) | Menghindari langkah modifikasi sementara yang membutuhkan reagen tambahan dan buat limbah. | Sintesis langsung tanpa gugus pelindung berlebih. |

```
chapter-tag: Bab 1 · 12 Prinsip Kimia Hijau
subject-chip: Kimia

h2.section-title: Referensi Lengkap: Pilar 1 (Pencegahan) & Pilar 2 (Desain Cerdas)
p.lead: Tujuh dari 12 prinsip Anastas & Warner, lengkap dengan penjelasan konseptual dan
  contoh penerapan nyata untuk tiap satu — Pilar Sirkularitas (5 prinsip sisanya) ada di
  Halaman 4.

[ref-table di atas]

p.body-text: Pilar Pencegahan (Prinsip 1, 11, 12) semuanya soal bertindak SEBELUM masalah
  terjadi — merancang reaksi supaya nggak menghasilkan limbah sejak awal, memantau proses
  secara real-time supaya kebocoran terdeteksi sebelum jadi bencana, dan memilih bentuk zat
  kimia yang risikonya paling rendah. Pilar Desain Cerdas (Prinsip 3, 4, 5, 8) satu tingkat
  lebih teknis — soal bagaimana reaksi & bahan itu sendiri dirancang: pakai zat yang kurang
  berbahaya, rancang produk akhir yang tetap efektif tapi minim racun, ganti pelarut organik
  beracun dengan yang lebih aman, dan hindari langkah tambahan yang cuma bikin limbah ekstra
  (gugus pelindung yang dipasang lalu dilepas lagi, misalnya).
```

## Page 5 — Referensi: 12 Prinsip Kimia Hijau (Pilar 3) & Kimia Hijau vs Pemanasan Global

```
chapter-tag: Bab 1 · 12 Prinsip Kimia Hijau
subject-chip: Kimia

h2.section-title: Referensi Lengkap: Pilar 3 (Sirkularitas)
p.lead: Lima prinsip sisanya — semuanya soal memakai sumber daya (atom, energi, bahan baku)
  seefisien & sesirkular mungkin.
```

| No | Prinsip | Penjelasan Konseptual SMA | Contoh Penerapan Nyata SMA |
|---|---|---|---|
| 2 | Ekonomi Atom Tinggi (Atom Economy) | Memaksimalkan seluruh atom reaktan menjadi produk akhir yang berguna. | Reaksi adisi atau penataan ulang (100% Ekonomi Atom). |
| 6 | Efisiensi Energi (Energy Efficiency) | Meminimalkan energi dengan menjalankan reaksi pada suhu dan tekanan ruang. | Sintesis enzimatis pada suhu kamar (25°C). |
| 7 | Bahan Baku Terbarukan (Renewable Feedstocks) | Mengutamakan bahan baku berbasis biomassa alam daripada minyak bumi/fosil. | Plastik biodegradable dari pati singkong/jagung. |
| 9 | Penggunaan Katalis (Use Catalysts) | Menggunakan katalis selektif yang dapat dipakai berulang kali dibandingkan reagen stoikiometri. | Katalis enzim/zeolit dalam industri. |
| 10 | Desain untuk Degradasi (Design for Degradation) | Merancang produk kimia agar setelah selesai dipakai dapat terurai alami menjadi zat tak beracun. | Detergen ramah lingkungan terurai hayati (biodegradable). |

```
p.body-text: Ekonomi Atom (Prinsip 2) diukur langsung lewat rumus (lihat Halaman 7) — soal
  ini yang paling sering keluar sebagai hitungan di ujian. Efisiensi Energi dan Penggunaan
  Katalis sering jalan beriringan: katalis mempercepat reaksi sekaligus menurunkan suhu/
  tekanan yang dibutuhkan, jadi hemat energi. Bahan Baku Terbarukan & Desain untuk Degradasi
  sama-sama soal siklus hidup penuh produk — dari mana bahan bakunya berasal (terbarukan vs
  fosil), dan ke mana produk itu berakhir setelah dipakai (terurai alami vs menumpuk jadi
  limbah abadi seperti plastik konvensional).

h2.section-title: Kimia Hijau & Pemanasan Global
p.lead: Kenapa Kimia Hijau relevan buat isu global, bukan cuma soal keselamatan lab.

p.body-text: Kimia Hijau berperan langsung mengatasi Pemanasan Global (Global Warming) lewat
  tiga jalur: pertama, mengurangi emisi gas rumah kaca (CO₂ dan CH₄) lewat efisiensi energi
  dan penggunaan biomassa terbarukan (Prinsip 6 & 7). Kedua, mengganti bahan perusak lapisan
  ozon (CFC) dengan pendingin ramah lingkungan. Ketiga, mendukung langsung Sustainable
  Development Goals (SDGs) PBB Nomor 12 (Konsumsi & Produksi Bertanggung Jawab) dan Nomor 13
  (Penanganan Perubahan Iklim).
```

## Page 6 — Latihan Soal Terpandu: Analisis Prinsip & Simbol Bahaya

Two of the source module's "5 tipe soal ujian" worked through in full — neither appears on the
HTML page (which only carries the Ekonomi Atom worked example, per the "at least one fully
worked example" bar; these two are additional exam-style practice, per §5's "1-2 additional
worked examples beyond what's on the HTML page").

```
chapter-tag: Bab 1 · Latihan Terpandu
subject-chip: Kimia

h2.section-title: Latihan Soal Terpandu & Pembahasan
p.lead: Dua tipe soal yang paling sering diuji di luar hitungan Ekonomi Atom — analisis kasus
  penerapan prinsip, dan identifikasi simbol bahaya.

div.example-box (label: Soal · Analisis Kasus 12 Prinsip Kimia Hijau)
p.setup: Sebuah pabrik plastik mengganti bahan baku minyak bumi dengan pati singkong untuk
  membuat kantong belanja yang mudah terurai di alam. Prinsip Kimia Hijau nomor berapa
  sajakah yang diterapkan?
ol:
  - Prinsip 7 (Bahan Baku Terbarukan): pati singkong berasal dari tanaman biomassa
    terbarukan, menggantikan bahan fosil tak terbarukan.
  - Prinsip 10 (Desain untuk Degradasi): kantong bioplastik dirancang agar dapat terurai
    secara hayati (biodegradable) oleh mikroorganisme tanah.
  - Prinsip 1 (Pencegahan Limbah): secara tidak langsung mencegah penumpukan limbah
    plastik abadi di lingkungan.

div.example-box (label: Soal · Identifikasi Simbol Bahaya & Aturan Penyimpanan)
p.setup: Botol penyimpanan larutan Etanol memiliki simbol gambar api menyala, sedangkan
  botol Asam Sulfat pekat memiliki gambar cairan merusak tangan dan besi. Sebutkan nama
  simbol bahaya dan cara penyimpanan kedua bahan tersebut!
ol:
  - Etanol — simbol Flammable (Mudah Terbakar). Penyimpanan: tempat sejuk, berventilasi
    baik, jauh dari api Bunsen/sumber percikan.
  - Asam Sulfat pekat — simbol Corrosive (Korosif). Penyimpanan: rak khusus bahan asam
    korosif, botol kaca tebal, diamankan dari risiko jatuh.

callout.mistake — Kesalahan Umum
❌ Salah: mengira satu kasus penerapan kimia hijau cuma bisa dikaitkan dengan satu prinsip
  saja.
✅ Benar: satu tindakan/keputusan bisa memenuhi beberapa prinsip sekaligus (lihat contoh
  bioplastik di atas — 3 prinsip berbeda terpenuhi dari satu keputusan mengganti bahan baku).
  Soal ujian sering minta "sebutkan SEMUA prinsip yang berlaku", bukan cuma satu.
```

## Page 7 — Ekonomi Atom: Contoh Soal Kedua

The HTML page (`#ekonomi-atom`) already carries the primary worked example (CaH₂ + 2H₂O →
Ca(OH)₂ + 2H₂, %AE = 5,13%) in full with role-cards steps — this page is the "1-2 additional
worked examples beyond what's on the HTML page" per §5, using a different reaction so a student
sees the same 4-step method applied twice before trying it themselves in the quiz/bank soal.

```
chapter-tag: Bab 1 · Ekonomi Atom
subject-chip: Kimia

h2.section-title: Ekonomi Atom — Contoh Soal Kedua
p.lead: Metode yang sama, reaksi berbeda — reaksi logam seng dengan asam klorida, juga
  target produknya gas hidrogen.

div.formula-box (label: Rumus (rekap dari halaman utama))
[KaTeX] \%\,\text{Ekonomi Atom} = \dfrac{\text{Massa Molar Produk Target}}{\text{Total Massa
  Molar Seluruh Reaktan}} \times 100\%

div.example-box (label: Soal · Ekonomi Atom Reaksi Zn + HCl)
p.setup: Reaksi sintesis gas hidrogen di laboratorium dilakukan lewat reaksi logam Seng
  dengan Asam Klorida: [KaTeX] \text{Zn}(s) + 2\text{HCl}(aq) \rightarrow \text{ZnCl}_2(aq) +
  \text{H}_2(g). Massa molar: Zn = 65,4; H = 1,0; Cl = 35,5 g/mol. Jika produk target adalah
  gas H₂, hitung % Ekonomi Atom reaksi ini.
ol:
  - Tentukan produk target: gas H₂ (bukan ZnCl₂).
  - Massa molar HCl = 1,0 + 35,5 = 36,5 g/mol, sehingga massa 2HCl = 2 × 36,5 = 73 g/mol.
  - Total massa reaktan = massa Zn + massa 2HCl = 65,4 + 73 = 138,4 g/mol.
  - Massa produk target = massa H₂ = 2 g/mol (koefisien H₂ di sisi produk cuma 1, beda
    dengan contoh CaH₂ sebelumnya yang koefisiennya 2 — selalu cek koefisien reaksi
    setaranya dulu sebelum menghitung).
  - % Ekonomi Atom = (2 ÷ 138,4) × 100% ≈ 1,45%.

p.body-text: Bandingkan dengan contoh CaH₂ di halaman utama (5,13%) — reaksi Zn + HCl ini
  ekonomi atomnya lebih rendah lagi. Alasannya: massa molar Zn (65,4) dan Cl (35,5 × 2 di
  HCl) jauh lebih besar dibanding massa molar H₂ (cuma 2) yang jadi target, sehingga
  proporsi massa yang "nyangkut" di produk target makin kecil. Ini juga alasan kenapa
  industri sungguhan lebih suka reaksi adisi/penataan ulang langsung dibanding reaksi
  substitusi/pertukaran seperti ini — semakin besar "selisih ukuran" antara reaktan &
  produk target, semakin rendah ekonomi atomnya.

callout.mistake — Kesalahan Umum
❌ Salah: mengira % Ekonomi Atom sama dengan % rendemen (yield) reaksi.
✅ Benar: keduanya beda konsep. % Ekonomi Atom itu perhitungan teoretis dari persamaan
  reaksi setara (nggak peduli reaksinya berjalan sempurna atau tidak di lab sungguhan),
  sedangkan % rendemen (yield) itu perbandingan massa produk yang BENAR-BENAR didapat di
  lab dibanding massa produk maksimum secara teori — dipengaruhi hal-hal praktis seperti
  reaksi yang tidak sempurna, produk yang tumpah/menempel di alat, dst.
```

## Page 8 — Referensi Lengkap: Simbol Bahaya Bahan Kimia

This content previously lived in the HTML under `#simbol-bahaya` as two diagram images (arti +
contoh bahan saja, no "tindakan pencegahan" column) — removed there partially (the diagrams
stay, since they're real sourced images per the diagram-sourcing rule) and the full table
including the "Tindakan Pencegahan Keamanan" column (not shown on the diagram images) is
reproduced here in full, matching the source module's table exactly.

| Simbol Bahaya | Arti & Sifat Bahan | Contoh Bahan Kimia | Tindakan Pencegahan Keamanan |
|---|---|---|---|
| Toxic (Tengkorak) | Beracun. Dapat menyebabkan keracunan akut atau kronis jika terhirup, tertelan, atau terserap kulit. | Merkuri (Hg), Kalium Sianida (KCN), Metanol. | Gunakan lemari asam, hindari kontak kulit dan terhirup uapnya. |
| Corrosive (Cairan Merusak) | Korosif. Merusak jaringan kulit dan melubangi permukaan logam/meja. | Asam Sulfat (H₂SO₄), HCl pekat, NaOH padat. | Gunakan kacamata goggles dan sarung tangan tahan asam. |
| Flammable (Api Menyala) | Mudah Terbakar. Uap atau cairannya sangat mudah tersulut api. | Etanol, Aseton, Gas Elpiji (LPG), Eter. | Jauhkan dari pembakar Spiritus/Bunsen dan sumber percikan api. |
| Explosive (Ledakan) | Mudah Meledak jika terkena benturan, gesekan, atau panas ekstrem. | Amonium Nitrat, TNT, Peroksida pekat. | Hindari gesekan, benturan keras, dan sumber panas. |
| Irritant/Harmful (Tanda Silang) | Iritasi/Bahaya. Menyebabkan gatal, kemerahan pada kulit atau saluran pernapasan. | Kloroform, Amonia encer, H₂O₂ encer. | Gunakan masker dan sarung tangan, buka ventilasi udara. |

```
chapter-tag: Bab 1 · Simbol Bahaya
subject-chip: Kimia

h2.section-title: Referensi Lengkap: 5 Simbol Bahaya Bahan Kimia
p.lead: Tabel lengkap arti, contoh bahan, DAN tindakan pencegahan keamanan untuk tiap simbol
  — kolom "tindakan" ini yang paling sering ditanyakan di soal uraian.

[ref-table di atas]

p.body-text: Pola yang perlu diinget: tindakan pencegahan selalu menyasar jalur paparan
  yang paling berisiko dari sifat bahan itu. Bahan Toxic & Corrosive sama-sama berisiko
  lewat kontak kulit/terhirup, jadi APD-nya (lemari asam, goggles, sarung tangan tahan
  asam) fokus memutus jalur kontak langsung. Bahan Flammable & Explosive sama-sama
  berisiko lewat sumber pemicu (api, gesekan, panas), jadi tindakannya fokus menjauhkan
  bahan dari pemicu itu, bukan soal APD tubuh. Bahan Irritant tindakannya di tengah-tengah
  — kombinasi APD (masker, sarung tangan) dan ventilasi ruangan.
```

## Page 9 — Prosedur P3K Lengkap & Microscale Chemistry

This content previously lived in the HTML under `#simbol-bahaya` (first-aid) as a short
3-item `check-list` and under `#skala-mikro` (microscale) as one paragraph — both kept short
in the HTML (foundational safety info a reader needs immediately) and elaborated here in full.

```
chapter-tag: Bab 1 · P3K & Skala Mikro
subject-chip: Kimia

h2.section-title: Prosedur Pertolongan Pertama (First Aid) — Lengkap
p.lead: "Aturan Emas" pertolongan pertama kecelakaan laboratorium, ditulis lengkap
  langkah-demi-langkahnya.

ol.ref-list:
  - <b>Terkena Asam/Basa Korosif pada Kulit:</b> SEGERA bilas bagian tubuh yang terkena
    dengan air mengalir secara terus-menerus selama minimal 15–20 menit. <i>Jangan diolesi
    salep/minyak secara sembarangan</i> — ini bisa menjebak zat korosif di kulit alih-alih
    mengencerkannya. Langsung laporkan kepada guru pembimbing lab setelah/sambil dibilas.
  - <b>Bahan Kimia Terpercik ke Mata:</b> gunakan fasilitas Eyewash Station, buka mata
    lebar-lebar (jangan dikucek), dan bilas dengan air mengalir selama 15 menit. Kecepatan
    tindakan di sini krusial — jaringan mata jauh lebih sensitif dibanding kulit, kerusakan
    permanen bisa terjadi dalam hitungan menit kalau tidak segera dibilas.
  - <b>Kebakaran Kecil:</b> padamkan menggunakan kain/lap basah (menutup api, memutus
    pasokan oksigen) atau Alat Pemadam Api Ringan (APAR). <i>Jangan menyiram
    minyak/pelarut yang terbakar dengan air</i> — pelarut organik umumnya lebih ringan
    dari air dan tidak larut di dalamnya, sehingga air justru akan membuat cairan yang
    terbakar mengapung & menyebar, memperluas area kebakaran alih-alih memadamkannya.

h2.section-title: Microscale Chemistry — Kenapa Ini Dianggap Penerapan Kimia Hijau
p.lead: Bukan cuma soal hemat biaya reagen — ada alasan yang lebih fundamental.

p.body-text: Praktikum Skala Kecil (Microscale/Small-Scale Chemistry) memakai reagen cair
  dalam skala tetes (0,1–1 mL) atau plat tetes porselen, jauh lebih sedikit dibanding gelas
  kimia skala penuh yang dipakai praktikum konvensional. Empat keunggulan utamanya: hemat
  biaya reagen (volume yang dipakai bisa sepersekian dari skala penuh), meminimalkan limbah
  berbahaya hingga 90%, menekan polusi uap beracun (karena jumlah zat yang menguap juga jauh
  lebih sedikit), dan menjamin keselamatan yang jauh lebih tinggi bagi siswa SMA (risiko
  tumpahan besar, percikan ke kulit/mata, dan kebakaran semuanya berkurang drastis kalau
  volume bahan yang ditangani kecil sejak awal).

p.body-text: Hubungannya dengan 12 Prinsip Kimia Hijau langsung ke Prinsip 1 (Pencegahan
  Limbah) — karena reagen dipakai seminimal mungkin, limbah yang terbentuk otomatis lebih
  sedikit sejak awal, bukan hasil pengolahan limbah setelah terlanjur banyak terbentuk. Ini
  contoh paling konkret yang bisa langsung dipraktikkan siswa SMA sendiri di sekolah — beda
  dari prinsip-prinsip lain yang levelnya lebih ke keputusan desain industri.

p.body-text: Memahami Bab 1 ini adalah fondasi keselamatan dan kesadaran lingkungan buat
  siswa SMA — kimia ada di sekelilingmu, praktikum lab wajib mengutamakan keselamatan, dan
  Kimia Hijau adalah kunci menjaga bumi tetap lestari buat masa depan.
```

## Note on the diagram images (HTML, not PDF)

Not part of this spec, but placed in `bab1-hakikat-kimia-hijau-k3lab.html` alongside this
build — 11 of the 15 supplied infographic images, all used directly as `.diagram-card` images
per the diagram-sourcing rule (real supplied source, not hand-drawn recreations):

- `#hakikat-kimia`: `kimia-dalam-rumah-tangga.jpg` and `paradoks-kimia-rumah-tangga.jpg`.
- `#kimia-hijau`: `evolusi-paradigma-kimia-hijau.jpg`.
- `#tiga-pilar-prinsip`: `sintesis-12-prinsip-tiga-pilar.jpg`,
  `matriks-paradigma-kinetik-tradisional-vs-hijau.jpg`, `bukti-nyata-implementasi-kimia-hijau.jpg`.
- `#ekonomi-atom`: `visualisasi-ekonomi-atom-katalis.jpg`.
- `#apd-lab`: `anatomi-peneliti-yang-aman-apd.jpg`, `siklus-eksperimen-protokol-k3.jpg`.
- `#simbol-bahaya`: `matriks-bahaya-fisik-lingkungan.jpg`, `matriks-bahaya-kesehatan-primer.jpg`.

Four supplied images were deliberately left unused: `memasuki-ruang-skala-mikro.jpg`,
`titik-balik-keterbatasan-regulasi-tradisional.jpg`, `sintesis-inovasi-kimia-paripurna.jpg`,
and `cover-cetak-biru-kimia-berkelanjutan.jpg` are transitional/dramatic section-break slides
from the source deck (mostly a title + one framing sentence, no new factual content) — none of
them earn a place next to specific chapter content per the guide's "don't force all N images
in" note.
