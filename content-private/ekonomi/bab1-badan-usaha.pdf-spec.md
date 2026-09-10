# PDF Companion Spec — Bab 1 Ekonomi: Badan Usaha, Koperasi & Manajemen

Curated content for the PDF companion, built on `public/assets/pdf-template/page-template.html`
(`.pdf-page[data-subject="ekonomi"]`). Not an export of the HTML page — this is the
formula/advanced-example/dense-reference material per CHAPTER_CONTENT_GUIDE.md §5. Ekonomi
stays prose-first; LaTeX only appears where a real formula/calculation shows up (the SHU pages).

Every page in this spec is self-contained — it must not depend on content that lives only in
`bab1-badan-usaha.html`, since the HTML lesson covers basics/interactive exploration only and
this PDF is the "further detail" companion (some content below used to also live in the HTML
and has since been trimmed there — this file is now the sole canonical source for it).

7 pages: 1 chapter-opener + 6 content pages.

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
  - 7 Peran BUMN dalam perekonomian nasional — referensi lengkap
  - 14 Prinsip Manajemen Henry Fayol lengkap, satu per satu, untuk dihafal
    & dipahami di luar sesi belajar interaktif
  - 2 studi kasus SHU lanjutan: membandingkan dua anggota koperasi dengan
    proporsi simpanan/transaksi berbeda, dan efek perubahan persentase jasa
    modal antar tahun
```

## Page 2 — Referensi Cepat: Bentuk Badan Usaha

Dense static table showing all 6 forms + the BUMN/BUMD split side by side —
something the HTML's tab-switch never shows all at once, genuine PDF-only value.
This is now the only place this full comparison table lives (previously also
duplicated under the HTML's #bentuk section as a static table right after the
interactive tabs — removed there since it was redundant with the tabs above it;
this page is the canonical reference).

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

## Page 3 — Referensi: 7 Peran BUMN dalam Perekonomian

New page. This content previously lived in the HTML under #bumn as a
`.role-cards` list — removed there as supplementary depth not needed to
grasp the core Perum/Persero/Perumda/Perseroda distinctions, and moved
here in full as the canonical reference.

```
chapter-tag: Bab 1 · BUMN & BUMD
subject-chip: Ekonomi

h2.section-title: 7 Peran Utama BUMN dalam Perekonomian
Numbered reference list, full text:
  1. Penghasil barang & jasa untuk hajat hidup orang banyak — BUMN
     menyediakan kebutuhan dasar (listrik, air, transportasi publik, dll.)
     yang harus tetap tersedia meski secara komersial kurang menguntungkan.
  2. Pelopor di sektor usaha yang belum diminati swasta — masuk duluan ke
     sektor berisiko tinggi/modal besar yang swasta masih ragu garap.
  3. Sumber penerimaan negara & roda utama ekonomi — lewat pajak, dividen,
     dan kontribusi langsung ke PDB.
  4. Penyedia pelayanan publik / umum — menjamin akses layanan esensial
     merata sampai ke daerah yang secara bisnis kurang menarik bagi
     swasta.
  5. Pembuka lapangan kerja terbesar — menyerap tenaga kerja dalam jumlah
     besar di berbagai sektor strategis.
  6. Penyelamat krisis ekonomi — jadi instrumen negara untuk stabilisasi
     saat kondisi ekonomi bergejolak (mis. menjaga pasokan bahan pokok,
     menstabilkan harga/nilai tukar).
  7. Menguasai sektor vital agar tidak terjadi monopoli swasta — sektor
     yang menguasai hajat hidup orang banyak (listrik, air, minyak & gas)
     tetap dikontrol negara sesuai amanat UUD 1945 Pasal 33.

callout.mistake — Kesalahan Umum
❌ Salah: mengira BUMN selalu 100% dimiliki negara dan tidak boleh mencari
  laba.
✅ Benar: hanya Perum yang 100% milik negara dan murni berorientasi
  pelayanan; Persero minimal 51% milik negara dan justru berorientasi
  laba seperti perusahaan pada umumnya (lihat Halaman 2).
```

## Page 4 — Menghitung Pembagian SHU (formula + contoh lanjutan #1)

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

## Page 5 — Studi Kasus: Perubahan Porsi Jasa Modal Antar Tahun

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

## Page 6 — Referensi Lengkap: Fungsi & 14 Prinsip Manajemen (Henry Fayol)

The HTML lesson keeps its `[data-accordion]` with all 14 principles as a
genuine interactive/exploratory element (click-through, one at a time) — it
was judged core rather than a reference-dump, so it was not trimmed there.
This page is still written fully self-contained (complete real text for all
14, not a pointer back to the HTML) so the PDF works standalone offline.

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

h2.section-title: 14 Prinsip Manajemen (Henry Fayol)
Numbered reference list, full text for all 14:
  1. Division of Work — pembagian kerja sesuai keahlian agar lebih
     efisien.
  2. Authority & Responsibility — wewenang harus seimbang dengan
     tanggung jawab yang diberikan.
  3. Discipline — kepatuhan terhadap aturan & kesepakatan organisasi.
  4. Unity of Command — setiap karyawan hanya menerima perintah dari
     satu atasan.
  5. Unity of Direction — kegiatan dengan tujuan sama harus dipimpin
     satu rencana & satu kepala.
  6. Subordination of Individual Interest — kepentingan bersama harus
     didahulukan dari kepentingan pribadi.
  7. Remuneration of Personnel — gaji/imbalan harus adil bagi karyawan
     & perusahaan.
  8. Centralization — keseimbangan antara pengambilan keputusan
     terpusat & terdesentralisasi.
  9. Chain of Command — alur komando/wewenang yang jelas dari atas ke
     bawah.
  10. Order — tata tertib: orang & barang berada pada tempat yang
      semestinya.
  11. Equity — keadilan & kebaikan dalam memperlakukan karyawan.
  12. Stability of Tenure of Personnel — tingkat turnover karyawan yang
      rendah demi stabilitas kerja.
  13. Initiative — memberi ruang karyawan untuk berinisiatif menyusun &
      menjalankan rencana.
  14. Esprit de Corps — semangat kerja sama & kekompakan tim dalam
      organisasi.

callout.mistake — Kesalahan Umum
❌ Salah: mengira "Actuating" dan "Pengarahan/Directing" adalah dua fungsi
  manajemen yang berbeda; atau menyamakan 6M dengan 4P.
✅ Benar: Actuating/Directing = istilah yang sama, sumber beda. 6M (Man,
  Money, Material, Machine, Method, Market) = sumber daya yang dikelola
  manajemen secara umum; 4P (Product, Price, Promotion, Place) = strategi
  khusus bidang pemasaran saja.
```

## Page 7 — Latihan Tambahan (print-friendly practice set)

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
  1. Rp4.950.000 (5%×55%×45jt) · 2. lihat Halaman 2 (referensi bentuk
  badan usaha) & materi Koperasi di halaman utama · 3. minimal 51% saham
  tetap milik negara · 4. jawaban terbuka, cek terhadap definisi di
  halaman utama
```
