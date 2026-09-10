# PDF Companion Spec — Bab 1 Ekonomi: Badan Usaha, Koperasi & Manajemen

Curated content for the PDF companion, built on `public/assets/pdf-template/page-template.html`
(`.pdf-page[data-subject="ekonomi"]`). Not an export of the HTML page — this is the
formula/advanced-example material per CHAPTER_CONTENT_GUIDE.md §5. Ekonomi stays
prose-first; LaTeX only appears where a real formula/calculation shows up (the SHU pages).

6 pages: 1 chapter-opener + 5 content pages.

## Page 1 — Chapter opener

```
chapter-tag: Bab 1
subject-chip: Ekonomi
h1.page-title: Badan Usaha, Koperasi & Manajemen
p.dek: Materi PDF — pelengkap Bab 1
p.lead: Materi tambahan ini fokus ke rumus, referensi cepat, dan contoh soal
  lanjutan yang butuh perhitungan bertingkat — pelengkap materi interaktif
  di halaman utama, bukan salinannya.
h2.section-title: Yang akan kamu pelajari
ul.learn-list:
  - Cara menghitung & membagi SHU koperasi, termasuk skenario dua komponen
    (jasa modal + jasa usaha) sekaligus
  - Referensi cepat: badan hukum, tanggung jawab & modal tiap bentuk badan
    usaha (termasuk pecahan BUMN/BUMD: Perum, Persero, Perumda, Perseroda)
  - 14 Prinsip Manajemen Henry Fayol dalam satu tabel ringkas untuk dihafal
    cepat
  - 2 studi kasus SHU lanjutan: membandingkan dua anggota koperasi dengan
    proporsi simpanan/transaksi berbeda, dan efek perubahan persentase jasa
    modal antar tahun
```

## Page 2 — Referensi Cepat: Bentuk Badan Usaha

Dense static table showing all 6 forms + the BUMN/BUMD split side by side —
something the HTML's tab-switch never shows all at once, genuine PDF-only value.

| Bentuk | Badan Hukum | Tanggung Jawab | Modal |
|---|---|---|---|
| Perseorangan | Tidak | Tidak terbatas | Pribadi |
| Firma | Tidak | Tidak terbatas, tanggung renteng | Gabungan sekutu |
| CV | Tidak | Aktif: tidak terbatas · Pasif: terbatas modal | Aktif: skill+uang · Pasif: uang |
| PT | Ya | Terbatas modal disetor | Saham |
| Koperasi | Ya | Terbatas modal/simpanan | Simpanan anggota |
| Perum (BUMN) | Ya | 100% negara | APBN |
| Persero (BUMN) | Ya | Min. 51% negara | APBN + publik/swasta |
| Perumda (BUMD) | Ya | 100% daerah | APBD |
| Perseroda (BUMD) | Ya | Min. 51% daerah | APBD + pihak lain |

```
chapter-tag: Bab 1 · Bentuk Badan Usaha
subject-chip: Ekonomi

callout.mistake — Kesalahan Umum
❌ Salah: menganggap CV dan Firma itu sama karena keduanya "bukan badan
  hukum".
✅ Benar: CV punya dua jenis sekutu dengan tanggung jawab berbeda (aktif:
  tidak terbatas, pasif: terbatas modal disetor); di Firma semua sekutu
  aktif dan sama-sama tidak terbatas. Kalau sekutu pasif CV ikut mengelola
  usaha, tanggung jawabnya otomatis berubah jadi tidak terbatas juga.
```

## Page 3 — Menghitung Pembagian SHU (formula + contoh lanjutan #1)

```
chapter-tag: Bab 1 · Koperasi
subject-chip: Ekonomi

h2.section-title: Menghitung Pembagian SHU

formula-box — Rumus
  SHU_a = (S_a/S_total × p × T) + (B_a/B_total × (1-p) × T)
  var-def: SHU_a = SHU diterima anggota · T = total SHU koperasi (Rp) ·
    p = persentase jasa modal (sisanya 1-p = jasa usaha) · S_a, S_total =
    simpanan anggota & total simpanan (Rp) · B_a, B_total = belanja
    anggota & total belanja koperasi (Rp)

example-box — Contoh Soal · Tingkat Lanjut (Perbandingan Dua Anggota)
  Koperasi "Sentosa" membagi SHU Rp36.000.000, porsi 60% jasa modal : 40%
  jasa usaha. Total simpanan anggota Rp360.000.000, total belanja
  Rp180.000.000.
  Anggota A — simpanan Rp36.000.000, belanja Rp9.000.000
  Anggota B — simpanan Rp9.000.000, belanja Rp36.000.000
  1. A — jasa modal: (36/360)×60%×36jt = Rp2.160.000; jasa usaha:
     (9/180)×40%×36jt = Rp720.000; total = Rp2.880.000
  2. B — jasa modal: (9/360)×60%×36jt = Rp540.000; jasa usaha:
     (36/180)×40%×36jt = Rp2.880.000; total = Rp3.420.000
  3. Selisih = Rp540.000 — B lebih besar meski simpanannya jauh lebih
     kecil, karena porsi belanjanya jauh lebih dominan.
```

## Page 4 — Studi Kasus: Perubahan Porsi Jasa Modal Antar Tahun

```
chapter-tag: Bab 1 · Koperasi
subject-chip: Ekonomi

h2.section-title: Studi Kasus — Perubahan Porsi Jasa Modal

example-box — Contoh Soal · Tingkat Lanjut (Perbandingan Antar Tahun)
  Koperasi "Untung Bersama": tahun lalu porsi jasa modal 70% dari SHU
  Rp50.000.000; tahun ini diubah jadi 40% dari SHU yang sama besarnya.
  Made memegang simpanan tetap 10% dari total simpanan di kedua tahun.
  1. Tahun lalu: 10% × 70% × 50jt = Rp3.500.000
  2. Tahun ini: 10% × 40% × 50jt = Rp2.000.000
  3. Selisih: turun Rp1.500.000

callout.mistake — Kesalahan Umum
❌ Salah: menganggap SHU dibagi rata ke semua anggota, atau menyamakan SHU
  dengan dividen PT.
✅ Benar: SHU dibagi proporsional lewat dua komponen (jasa modal + jasa
  usaha) — bukan rata, dan bukan murni berdasar kepemilikan seperti
  dividen saham. Anggota aktif bertransaksi tetap kebagian besar meski
  simpanannya kecil (lihat Anggota B, halaman sebelumnya).
```

## Page 5 — Referensi Cepat: Fungsi & Prinsip Manajemen

| Fungsi | Istilah lain | Inti |
|---|---|---|
| Perencanaan | Planning | Menentukan tujuan, strategi, anggaran |
| Pengorganisasian | Organizing | Membagi tugas, wewenang, tanggung jawab |
| Pengarahan | Directing / Actuating | Membimbing & menggerakkan SDM |
| Pengoordinasian | Coordinating | Menyelaraskan semua unit |
| Pengendalian | Controlling | Memantau & mengoreksi penyimpangan |

```
chapter-tag: Bab 1 · Manajemen
subject-chip: Ekonomi

h2.section-title: 14 Prinsip Manajemen (Henry Fayol) — ringkas
Numbered dense list, all 14 in one flat pass (same content as the HTML
accordion, laid out for print instead of click-through):
  1. Division of Work — pembagian kerja sesuai keahlian
  2. Authority & Responsibility — wewenang seimbang tanggung jawab
  3–14. (same short glosses as the HTML accordion — see #manajemen
  section in bab1-badan-usaha.html for the canonical text)

callout.mistake — Kesalahan Umum
❌ Salah: mengira "Actuating" dan "Pengarahan/Directing" adalah dua fungsi
  manajemen yang berbeda; atau menyamakan 6M dengan 4P.
✅ Benar: Actuating/Directing = istilah yang sama, sumber beda. 6M (Man,
  Money, Material, Machine, Method, Market) = sumber daya yang dikelola
  manajemen secara umum; 4P (Product, Price, Promotion, Place) = strategi
  khusus bidang pemasaran saja.
```

## Page 6 — Latihan Tambahan (print-friendly practice set)

```
chapter-tag: Bab 1 · Latihan
subject-chip: Ekonomi

h2.section-title: Latihan Tambahan
1. Koperasi X membagi SHU Rp45.000.000 (55% jasa modal). Total simpanan
   anggota Rp450.000.000, simpanan Ibu Tuti Rp45.000.000. Hitung SHU jasa
   modal Ibu Tuti.
2. Bandingkan: PT dan Koperasi sama-sama badan hukum. Sebutkan 2
   perbedaan utama dalam hal tanggung jawab & cara pembagian laba.
3. Sebuah Persero BUMN akan melantai di bursa saham (IPO). Jelaskan
   mengapa ini tidak mengubah statusnya sebagai BUMN, selama syarat
   minimal kepemilikan negara masih terpenuhi.
4. Sebutkan 3 dari 5 fungsi manajemen dan berikan satu contoh
   penerapannya di sebuah OSIS sekolah.

Kunci Jawaban (kecil, di footer halaman):
  1. Rp4.950.000 (5%×55%×45jt) · 2. lihat Bentuk BU & Koperasi (bab ini) ·
  3. minimal 51% saham tetap milik negara · 4. jawaban terbuka, cek
  terhadap definisi di halaman utama
```
