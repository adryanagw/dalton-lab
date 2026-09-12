# PDF Companion Spec — Bab 2 Ekonomi: Latihan Soal Pendapatan Nasional

A second, separate PDF "book" (distinct `bab` id: `bab2-pendapatan-nasional-latihan`) — not
the chapter's main content companion (`bab2-pendapatan-nasional.pdf-pages.html`). Read-only,
rendered as images, watermarked, served through the same `.pdf-viewer` component, with
`data-pdf-download="true"` enabled (client-side re-compiled PDF, watermark re-stamped by
`app.js`, per the web-shell infrastructure already built for this viewer instance only).

**Source & scope:** reproduces all 22 present questions from the two Zenius Education practice
sheets supplied for this chapter:
- `Latihan Soal - Pendapatan Nasional - cgc-4406.pdf` — 8 questions present (No. 1, 2, 5, 6, 7,
  8, 9, 10; the source sheet's own numbering skips 3-4, this is not a copying error).
- `Latihan Soal - Pendapatan Nasional - cgc-5589.pdf` — 14 questions present (No. 1-11, 13, 14,
  15; the source sheet's own numbering skips 12).

Neither source PDF includes the answer key text (it's behind a URL/QR code not available to
us) — every "Jawaban" below is independently solved & verified here, not copied from an
inaccessible key. The same verified answers are reused in
`bab2-pendapatan-nasional-latihan.quiz.json` (interactive quiz) and cross-checked against the
`.exercise.json` files where a question's numbers were reused there — solved once, reused
consistently across all three surfaces.

**Attribution:** original questions are Zenius Education (2025) intellectual property,
reproduced here for enrolled students' practice/review inside a read-only, watermarked,
authenticated viewer (not publicly served) — same spirit as any licensed practice-question
compilation. Attribution line included on the opener page.

## Page 1 — Opener

```
chapter-tag: Bab 2 · Latihan Soal
subject-chip: Ekonomi
h1.page-title: Latihan Soal Pendapatan Nasional
p.dek: 22 soal pilihan ganda — dijawab & dijelaskan oleh tim Dalton Lab
p.lead: 22 soal disusun & diselesaikan langsung oleh tim Dalton Lab, lengkap dengan
  pembahasan tiap butir — buat asah pemahaman kamu sebelum ujian.
```

## Page 2 — cgc-4406, No. 1-6

Questions No. 1, 2, 5, 6 (source sheet skips No. 3-4).

```
chapter-tag: Bab 2 · Latihan Soal
subject-chip: Ekonomi

example-box — No. 1
  setup: Pendapatan nasional adalah .... A. pendapatan yang diterima pada kas suatu
    negara B. jumlah hasil produksi berdasarkan nilai moneternya C. penerimaan negara
    dari pungutan berupa pajak D. jumlah hasil produksi yang dihitung berdasarkan
    barang mentahnya E. penerimaan negara dari berbagai macam sumber
  Jawaban: B — nilai total hasil produksi barang & jasa diukur berdasarkan nilai
    uangnya (moneter), bukan kas negara, bukan penerimaan pajak, dan harus barang/jasa
    akhir (bukan barang mentah).

example-box — No. 2
  setup: Data negara Zen (miliar US$): GNP=25.700, Iuran asuransi=50, Penyusutan=3.200,
    Personal Income (PI)=20.250, Pajak tidak langsung=1.200, Pajak perseroan=850, Laba
    ditahan=2.000, Pajak langsung=500. Besar transfer payment adalah .... A. 2.750
    B. 2.350 C. 1.350 D. 1.750 E. 1.850
  Jawaban: E (1.850) — NNP=25.700−3.200=22.500. NNI=22.500−1.200=21.300. PI=NNI+TP−
    (Laba Ditahan+Pajak Perseroan+Iuran Asuransi) → 20.250=21.300+TP−2.900 → TP=1.850.

example-box — No. 3
  setup: Empat sektor produksi keripik apel (juta Rupiah, input/output): Pertanian
    Apel (0/100), Industri Pengolahan Keripik (100/120), Logistik/Transportasi
    (120/150), Perdagangan Keripik Apel (150/180). Nilai produksi domestik bruto
    adalah .... A. 100 B. 150 C. 180 D. 370 E. 550
  Jawaban: C (180) — jumlah nilai tambah tiap sektor: 100+20+30+30=180, bukan total
    output (550, double counting) atau total input (370).

example-box — No. 4
  setup: Tabel 2020 — Intan (95 juta jiwa, GDP 120.000 juta US$), Swadikap (100 juta,
    125.000), Sejahtera (90 juta, 111.000), Balada (85 juta, 110.000), Juara (97 juta,
    115.000). Negara pendapatan per kapita PALING TINGGI: A. Intan B. Balada
    C. Swadikap D. Juara E. Sejahtera
  Jawaban: B (Balada) — per kapita: Intan≈1.263, Swadikap=1.250, Sejahtera≈1.233,
    Balada≈1.294 (tertinggi), Juara≈1.186 (ribu US$/jiwa).
```

## Page 3 — cgc-4406, No. 7-10

```
chapter-tag: Bab 2 · Latihan Soal
subject-chip: Ekonomi

example-box — No. 5
  setup: Negara Zenzen 2021 (ribuan dolar): PDB=13.400, Pendapatan netto faktor luar
    negeri=400, Pajak langsung=800, Pajak tidak langsung=1.500, Penyusutan=240, Iuran
    asuransi=450, Laba ditahan=250, Pajak perseroan=100, Transfer payment=250. Besar
    Disposable Income (DI): A. 10.450 B. 10.710 C. 9.910 D. 11.200 E. 10.300
  Jawaban: B (10.710) — GNP=13.800, NNP=13.560, NNI=12.060, PI=11.510, DI=10.710
    (lihat langkah lengkap di Halaman 5, materi PDF utama).

example-box — No. 6
  setup: Upah Rp12.000.000, Pengeluaran rumah tangga Rp36.000.000, Laba Rp9.000.000,
    Pengeluaran pemerintah Rp10.000.000, Konsumsi Rp25.000.000, Pendapatan bunga
    Rp6.000.000, Pendapatan sewa Rp8.000.000, Impor Rp5.000.000, Ekspor Rp7.000.000.
    Pendapatan nasional metode PENGELUARAN: A. 35jt B. 45jt C. 63jt D. 67jt E. 73jt
  Jawaban: E (73jt) — abaikan 4 item pendekatan pendapatan (Upah+Laba+Bunga+Sewa=35jt,
    itu jebakan opsi A). Jumlahkan 5 item sisanya: Pengeluaran RT(36jt)+Konsumsi(25jt)+
    Pengeluaran pemerintah(10jt)+Ekspor(7jt)−Impor(5jt)=Rp73.000.000.

example-box — No. 7
  setup: Rasio Gini sebesar 0 menunjukkan .... A. ketimpangan rendah, kurva melengkung
    B. merata sempurna, kurva diagonal C. tidak merata sempurna, kurva segitiga
    D. merata sempurna, kurva melengkung E. ketimpangan tinggi, kurva melengkung
  Jawaban: B — Gini 0 = pemerataan sempurna, Kurva Lorenz berimpit garis diagonal.

example-box — No. 8
  setup: Gini provinsi (BPS 2020): Kep. Bangka Belitung 0,262; DI Yogyakarta 0,434;
    Jawa Tengah 0,362; Kalimantan Utara 0,292; NTT 0,354; Sumatera Barat 0,305. Provinsi
    ketimpangan PALING RENDAH: A. Bangka Belitung B. DIY C. Jateng D. Kaltara E. NTT
  Jawaban: A (Kep. Bangka Belitung) — Gini terkecil (0,262) di antara keenamnya.
```

## Page 4 — cgc-5589, No. 1-5

```
chapter-tag: Bab 2 · Latihan Soal
subject-chip: Ekonomi

example-box — No. 9
  setup: Pada metode pendapatan, pendapatan nasional sama dengan .... A. produksi+upah
    B. jumlah investasi masyarakat C. konsumsi dan investasi D. jumlah nilai tambah
    produksi E. penjumlahan sewa, bunga, upah dan laba
  Jawaban: E — Y=r+w+i+p. "Nilai tambah" (D) itu ciri pendekatan produksi, bukan
    pendapatan.

example-box — No. 10
  setup: Indikator alat ukur perkembangan & struktur pembangunan suatu daerah adalah
    .... A. PN harga konstan B. APBD C. produk domestik regional bruto D. PDB
    E. pendapatan per kapita
  Jawaban: C — PDRB adalah versi GDP khusus wilayah sub-nasional (provinsi/kabupaten).

example-box — No. 11
  setup: Nilai koefisien Gini yang menunjukkan ketimpangan moderat adalah .... A. 0,4–0,5
    B. &lt;0,4 C. &gt;0,5 D. 0,5–0,6 E. &gt;0,6
  Jawaban: A (0,4–0,5) — sepenuhnya di dalam kategori Sedang (0,30–0,50) tanpa
    menyerempet Rendah/Tinggi seperti opsi lain.

example-box — No. 12
  setup: Nilai barang & jasa yang dihasilkan daerah tertentu (kabupaten/provinsi) dalam
    satu tahun disebut .... A. PDB B. PNB C. PDRB D. PDB harga berlaku E. PDB harga
    konstan
  Jawaban: C (PDRB) — definisi PDRB persis ini.

example-box — No. 13
  setup: Data (miliar): Konsumsi=37.500, Investasi=46.400, Pengeluaran pemerintah=
    21.500, Ekspor=14.500, Impor=6.400. PN pendekatan pengeluaran: A. 109.000
    B. 110.500 C. 111.500 D. 112.500 E. 113.500
  Jawaban: E (113.500) — Y=37.500+46.400+21.500+(14.500−6.400)=113.500.
```

## Page 5 — cgc-5589, No. 6-10

```
chapter-tag: Bab 2 · Latihan Soal
subject-chip: Ekonomi

example-box — No. 14
  setup: Konsep pendapatan nasional yang menggambarkan pendapatan siap dibelanjakan
    adalah .... A. PDB B. PN neto C. pendapatan perorangan D. pendapatan per kapita
    E. pendapatan disposabel
  Jawaban: E — Disposable Income = pendapatan siap dibelanjakan/ditabung.

example-box — No. 15
  setup: PDB adalah ukuran kuantitatif kemajuan ekonomi, dan hanya menggambarkan ....
    A. kualitas hidup B. jumlah pengangguran C. distribusi pendapatan D. faktor produksi
    E. jumlah dan harga output
  Jawaban: E — PDB murni mengukur jumlah & harga output, bukan pemerataan/kualitas hidup.

example-box — No. 16
  setup: Keadaan yang menggambarkan peningkatan standar hidup: A. GDP riil naik
    B. GDP riil naik lebih cepat dari harga C. GDP riil naik lebih cepat dari populasi
    D. GDP riil naik lebih cepat dari jumlah pemberi kerja E. GDP riil naik lebih
    cepat dari laju pertambahan output
  Jawaban: C — standar hidup per kepala naik kalau GDP riil tumbuh lebih cepat dari
    penduduk, supaya "kue" ekonomi yang dibagi tiap kepala benar-benar bertambah.

example-box — No. 17
  setup: Komponen: 1) Gaji/upah 2) Investasi 3) Konsumsi RT 4) Bunga modal 5) Hasil
    sewa 6) Konsumsi pemerintah. Pendekatan PENGELUARAN: A. 1,2,3 B. 1,2,4 C. 1,2,5
    D. 2,3,6 E. 2,4,6
  Jawaban: D (2,3,6) — Investasi, Konsumsi RT, Konsumsi pemerintah. 1,4,5 itu
    pendekatan pendapatan.

example-box — No. 18
  setup: Pendekatan produksi harus menghindari perhitungan ganda — unsur yang dihitung
    adalah .... A. nilai tambah barang & jasa B. harga barang sebelum produksi
    C. harga faktor produksi D. nilai bahan mentah E. output tiap sektor
  Jawaban: A — nilai tambah (output−input antara), bukan output kotor/bahan mentah.
```

## Page 6 — cgc-5589, No. 11, 13, 14, 15

```
chapter-tag: Bab 2 · Latihan Soal
subject-chip: Ekonomi

example-box — No. 19
  setup: GNP & penduduk: AS (1.680.000, 40jt jiwa), Belanda (579.000, 15jt), Norwegia
    (1.027.000, 16jt), Luksemburg (643.456, 12jt), Swiss (757.980, 15jt), Swedia
    (793.880, 20jt). Per kapita TERTINGGI & TERENDAH: A. AS & Belanda B. Swiss & Swedia
    C. Norwegia & AS D. Norwegia & Belanda E. Luksemburg & Swedia
  Jawaban: D — per kapita: AS=42.000, Belanda=38.600 (terendah), Norwegia≈64.188
    (tertinggi), Luksemburg≈53.621, Swiss≈50.532, Swedia≈39.694.

example-box — No. 20
  setup: Komponen: (1) Laba usaha (2) Hasil sewa (3) Konsumsi RT (4) Investasi
    (5) Bunga modal (6) Belanja pemerintah. Pendekatan PENDAPATAN: A. 1,2,3 B. 1,2,5
    C. 2,4,6 D. 3,4,6 E. 4,5,6
  Jawaban: B (1,2,5) — Laba usaha, hasil sewa, bunga modal. 3,4,6 itu pendekatan
    pengeluaran.

example-box — No. 21
  setup: Harga benang Rp6.000, kain Rp12.000, pakaian jadi Rp20.000, kapas Rp2.000,
    penyusutan aktiva Rp500. Pendapatan nasional (nilai tambah): A. 10.000 B. 14.000
    C. 18.000 D. 20.000 E. 40.000
  Jawaban: D (20.000) — nilai tambah tiap tahap (kapas→benang→kain→pakaian jadi):
    2.000+4.000+6.000+8.000=20.000, sama dengan harga jual akhir. 40.000 keliru
    (double counting); penyusutan tidak relevan untuk pendekatan produksi ini.

example-box — No. 22
  setup: Pendapatan nasional bertambah lebih besar dari pertambahan penduduk. Artinya:
    A. pendapatan per kapita turun B. pendapatan per kapita naik C. penduduk melambat
    D. kesejahteraan turun E. distribusi pendapatan merata
  Jawaban: B — pendapatan per kapita = PN÷penduduk; kalau pembilang tumbuh lebih
    cepat dari penyebut, hasil baginya pasti naik.
```
