# PDF Companion Spec — Bab 1 Ekonomi: Badan Usaha, Koperasi & Manajemen

Curated content for the PDF companion, built on `public/assets/pdf-template/page-template.html`
(`.pdf-page[data-subject="ekonomi"]`). Not an export of the HTML page — this is the
formula/advanced-example/dense-reference material per CHAPTER_CONTENT_GUIDE.md §5. Ekonomi
stays prose-first; LaTeX only appears where a real formula/calculation shows up (the SHU pages).

Every page in this spec is self-contained — it must not depend on content that lives only in
`bab1-badan-usaha.html`, since the HTML lesson covers basics/interactive exploration only and
this PDF is the "further detail" companion (some content below used to also live in the HTML
and has since been trimmed there — this file is now the sole canonical source for it).

This spec matches the actual rendered PDF in `bab1-badan-usaha.pdf-pages.html` exactly —
same headings, same content, same page boundaries. 12 pages: 1 chapter-opener + 11 content
pages.

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
  - Klasifikasi badan usaha berdasarkan sektor (ekstraktif, agraris,
    manufaktur, dagang, jasa) — referensi lengkap
  - 7 Peran BUMN dalam perekonomian nasional — referensi lengkap
  - Prinsip-prinsip koperasi, unsur manajemen (6M), dan bidang-bidang
    manajemen — referensi lengkap di luar sesi belajar interaktif
  - 5 Fungsi Manajemen (POAC) dengan penjelasan & analogi lengkap, plus 14
    Prinsip Manajemen Henry Fayol satu per satu
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

## Page 3 — Referensi: Badan Usaha Berdasarkan Sektornya

This content previously lived in the HTML right after the Badan Usaha vs
Perusahaan intro, under a dedicated "02 · Klasifikasi" section (`#sectorGrid` /
`.sector-card`, 5-card grid) — removed there as static, non-interactive content
and moved here in full as the canonical reference.

```
chapter-tag: Bab 1 · Klasifikasi Badan Usaha
subject-chip: Ekonomi

h2.section-title: Badan Usaha Berdasarkan Sektornya
p.lead: Lima sektor utama tempat badan usaha di Indonesia beroperasi —
  dibedakan dari jenis kegiatan ekonominya, bukan dari bentuk hukumnya (yang
  dibahas di Halaman 2).

ref-list, full text:
  01. Ekstraktif — badan usaha yang mengambil atau mengolah hasil alam
      secara langsung dari sumbernya, tanpa proses pengolahan awal oleh
      pihak lain. Contoh: Pertamina (minyak & gas), Freeport (tambang),
      PTBA (batu bara).
  02. Agraris — badan usaha yang mengolah hasil pertanian, perkebunan, dan
      peternakan. Contoh: perusahaan perkebunan, badan usaha pertanian,
      Charoen Pokphand (peternakan & pakan).
  03. Manufaktur / Industri — badan usaha yang mengolah bahan mentah atau
      bahan setengah jadi menjadi barang jadi/setengah jadi bernilai tambah
      lebih tinggi. Contoh: Astra (otomotif), ICBP (makanan olahan), Semen
      Indonesia.
  04. Dagang — badan usaha yang membeli barang lalu menjualnya kembali tanpa
      mengubah bentuk atau fungsinya — nilai tambahnya ada di distribusi,
      bukan produksi. Contoh: Alfamart, Matahari, Ace Hardware.
  05. Jasa — badan usaha yang menyediakan layanan/pelayanan, bukan barang
      fisik. Outputnya tetap dihitung sebagai nilai ekonomi meski tidak
      berwujud. Contoh: Telkom (telekomunikasi), RS Siloam (kesehatan),
      bank, perhotelan.

callout.mistake — Kesalahan Umum
❌ Salah: mengira sektor ekstraktif cuma soal tambang, dan sektor jasa
  "tidak menghasilkan apa-apa" karena tidak ada barang fisiknya.
✅ Benar: ekstraktif mencakup semua pengambilan sumber daya alam mentah
  (termasuk hasil laut & hutan), bukan cuma tambang — syaratnya diambil
  langsung dari alam tanpa diolah dulu. Sektor jasa tetap dihitung sebagai
  output ekonomi (nilai tambah) meski bentuknya bukan barang; nilainya
  justru sering lebih besar dari sektor barang di ekonomi modern.
```

## Page 4 — Referensi: 7 Peran BUMN dalam Perekonomian

This content previously lived in the HTML under #bumn as a `.role-cards`
list — removed there as supplementary depth not needed to grasp the core
Perum/Persero/Perumda/Perseroda distinctions, and moved here in full as
the canonical reference.

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

## Page 5 — Menghitung Pembagian SHU (formula + contoh lanjutan #1)

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

## Page 6 — Studi Kasus: Perubahan Porsi Jasa Modal Antar Tahun

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
  simpanannya kecil (lihat Anggota B, Halaman 5).
```

## Page 7 — Referensi: Prinsip-Prinsip Koperasi

This content previously lived in the HTML under #koperasi as a `.principle-grid`
6-card grid — removed there as static, non-interactive content (the org chart
and the "Jenis-Jenis Koperasi" `.jenis-box` list next to it stayed in the HTML,
since the org chart is interactive/clickable and the jenis-box list is a
different, denser lookup table students use while exploring) — moved here in
full as the canonical reference, placed near the SHU pages since it's the same
Koperasi topic.

```
chapter-tag: Bab 1 · Koperasi
subject-chip: Ekonomi

h2.section-title: Prinsip-Prinsip Koperasi
p.lead: Koperasi dijalankan berdasarkan seperangkat prinsip yang
  membedakannya dari badan usaha lain — bukan cuma soal struktur
  organisasi, tapi juga nilai yang dipegang.

ref-list, full text:
  01. Mandiri — anggota didorong aktif berpartisipasi dan koperasi
      berupaya memenuhi kebutuhannya sendiri tanpa terlalu bergantung pada
      pihak luar.
  02. Sukarela & Terbuka — keanggotaan tidak dipaksakan dan terbuka untuk
      siapa saja yang ingin bergabung, tanpa diskriminasi.
  03. Demokratis — pengelolaan dan pengambilan keputusan mengikuti suara
      mayoritas anggota lewat Rapat Anggota, bukan ditentukan sepihak oleh
      Pengurus.
  04. Pendidikan Perkoperasian — koperasi berkewajiban mendidik anggotanya
      soal prinsip & praktik perkoperasian, serta membangun kerja sama
      antarkoperasi (baik sesama koperasi primer maupun dengan koperasi
      sekunder).
  05. Concern for Community — koperasi peduli terhadap dampak kegiatannya
      dan berupaya memberi manfaat bagi komunitas di sekitarnya, tidak
      semata mengejar keuntungan anggota sendiri.
  06. Pembagian SHU Adil — Sisa Hasil Usaha dibagi sesuai kontribusi
      masing-masing anggota (jasa modal & jasa usaha), bukan dibagi rata
      per kepala. Rumus & contoh perhitungannya ada di Halaman 5.

callout.mistake — Kesalahan Umum
❌ Salah: menganggap koperasi "harus" selalu untung kecil/nirlaba karena
  prinsipnya kekeluargaan, atau menyamakan "demokratis" dengan "semua
  keputusan harus bulat/disepakati semua orang".
✅ Benar: koperasi tetap bisa besar dan menghasilkan SHU signifikan selama
  prinsip pembagian hasilnya tetap adil & proporsional. "Demokratis"
  berarti keputusan diambil lewat mekanisme suara mayoritas di Rapat
  Anggota — bukan berarti harus selalu bulat.
```

## Page 8 — Referensi: Unsur Manajemen (6M)

This content previously lived in the HTML under #manajemen as a static
card grid (`.six-m-grid` / `.m-card`) — removed there as non-interactive
content. Originally combined with the Bidang-Bidang Manajemen page below
onto one page, but the real render clipped: the two 2-column lists plus
the mistake callout didn't fit one page together, so this is now split
into two standalone pages (8 and 9), same pattern as the Fungsi/Fayol
split earlier in this chapter's history.

```
chapter-tag: Bab 1 · Manajemen
subject-chip: Ekonomi

h2.section-title: Unsur Manajemen — 6M
p.lead: Enam sumber daya yang dikelola manajemen di semua bidang — jangan
  tertukar dengan 4P (lihat kesalahan umum di halaman berikutnya).

ref-list-2col, full text:
  01. Man — orang-orang yang benar-benar mengerjakan pekerjaan. Tanpa
      manusia, semua rencana cuma di atas kertas — unsur paling
      fundamental dari 6M.
  02. Money — uang/anggaran yang membiayai seluruh kegiatan, dari gaji
      karyawan sampai pembelian bahan baku.
  03. Material — bahan baku yang akan diolah jadi produk jadi; kualitas
      bahan menentukan kualitas hasil akhir.
  04. Machine — mesin & peralatan yang membantu pekerjaan jadi lebih
      cepat, mudah, dan efisien dibanding dikerjakan manual.
  05. Method — cara atau langkah kerja yang dipakai; metode yang tepat
      menghasilkan output lebih maksimal dengan usaha lebih sedikit.
  06. Market — pasar tempat produk akan dijual; tanpa riset pasar yang
      matang, produk sebagus apa pun bisa gagal terjual.
```

## Page 9 — Referensi: Bidang-Bidang Manajemen

This content previously lived in the HTML under #manajemen as a static
card grid (`.bidang-grid` / `.bidang-card`) — removed there as
non-interactive content.

```
chapter-tag: Bab 1 · Manajemen
subject-chip: Ekonomi

h2.section-title: Bidang-Bidang Manajemen
p.lead: Manajemen diterapkan berbeda-beda tergantung bidang fungsionalnya
  di dalam organisasi.

ref-list-2col, full text:
  01. Produksi — mengelola faktor produksi barang & jasa agar efisien:
      rancangan produk, volume produksi, proses, lokasi & tata letak
      pabrik, hingga quality control.
  02. Marketing — membangun branding agar produk dikenal & dipercaya
      pasar, dijalankan lewat kerangka 4P: Product, Price, Promotion,
      Place.
  03. Finance — mengatur cara memperoleh, menggunakan, dan mengelola uang
      serta aset perusahaan secara keseluruhan.
  04. Personalia (HRD) — mencari & mengelola SDM berkualitas: menyusun
      job desc, rekrutmen, pelatihan, hingga promosi/mutasi karyawan.
  05. Administrasi — mengelola administrasi kegiatan, pemakaian
      alat/perlengkapan kantor, hingga pemeliharaan gedung & fasilitas.

callout.mistake — Kesalahan Umum
❌ Salah: menyamakan 6M (unsur manajemen) dengan 4P (strategi pemasaran).
✅ Benar: 6M adalah sumber daya yang dikelola manajemen secara umum di
  semua bidang (termasuk bidang non-marketing seperti Produksi & Finance);
  4P (Product, Price, Promotion, Place) adalah strategi khusus di bidang
  Marketing saja — satu bagian kecil dari cakupan 6M.
```

## Page 10 — 5 Fungsi Manajemen (POAC) — Penjelasan Lengkap

This content previously lived in the HTML under #manajemen as a `.poac-grid`
card grid with fuller analogy-based explanations — removed there as a static
card grid and migrated here in full. Different from Page 10: this page has the
complete analogy-based explanations; Page 10 keeps a terser table-only
reference for quick lookup.

```
chapter-tag: Bab 1 · Manajemen
subject-chip: Ekonomi

h2.section-title: 5 Fungsi Manajemen
p.lead: Lima fungsi yang dijalankan manajer dalam mengelola organisasi —
  biasa disingkat POAC/POACE. Referensi tabel singkatnya ada di halaman
  berikutnya.

ref-list, full text:
  01. Perencanaan (Planning) — ibarat menyusun peta sebelum jalan-jalan:
      menentukan mau ke mana (tujuan), lewat jalur mana (strategi), dan
      berapa bekal yang dibutuhkan (anggaran) sebelum benar-benar mulai
      bergerak.
  02. Pengorganisasian (Organizing) — setelah ada rencana, siapa
      mengerjakan apa? Fungsi ini membagi tugas ke orang yang tepat,
      lengkap dengan kewenangan & tanggung jawabnya masing-masing, supaya
      kerja jadi rapi dan tidak tumpang tindih.
  03. Pengarahan (Directing / Actuating) — rencana & pembagian tugas saja
      tidak cukup kalau timnya tidak semangat. Di sinilah pemimpin turun
      tangan membimbing dan memotivasi timnya supaya benar-benar bergerak
      sesuai rencana.
  04. Pengoordinasian (Coordinating) — bayangkan orkestra: tiap pemain
      hebat sendiri-sendiri percuma kalau tidak main bersama. Fungsi ini
      menyelaraskan semua unit & sumber daya supaya bergerak kompak, satu
      arah, tanpa saling tabrakan kerja.
  05. Pengendalian (Controlling) — layaknya cek kesehatan rutin: memantau
      apakah semua berjalan sesuai rencana & SOP, menemukan yang meleset,
      lalu memperbaikinya sebelum jadi masalah besar.

callout.mistake — Kesalahan Umum
❌ Salah: menganggap "Directing" dan "Actuating" adalah dua fungsi
  manajemen yang berbeda.
✅ Benar: keduanya istilah yang sama, cuma beda sumber/buku — maksudnya
  sama: menggerakkan & membimbing SDM supaya benar-benar menjalankan
  rencana. Soal ujian bisa memakai istilah manapun.
```

## Page 11 — Referensi: Fungsi Manajemen

The 5 fungsi manajemen table + mistake callout. Kept as its own page (split
off from the 14 Prinsip content below) because the full 2-column 14-item
list didn't fit on one page alongside the functions table and the mistake
callout — 14 Prinsip gets its own standalone page (Page 11). This table is a
terse quick-reference version; Page 9 has the fuller analogy-based
explanations.

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

h2.section-title: Referensi: Fungsi Manajemen
p.lead: Lima fungsi manajemen, dengan istilah alternatifnya (kadang
  ditulis beda di sumber lain, maksudnya sama). 14 Prinsip Manajemen
  Henry Fayol ada di halaman berikutnya.

callout.mistake — Kesalahan Umum
❌ Salah: mengira "Actuating" dan "Pengarahan/Directing" adalah dua fungsi
  manajemen yang berbeda; atau menyamakan 6M dengan 4P.
✅ Benar: Actuating/Directing = istilah yang sama, sumber beda. 6M (Man,
  Money, Material, Machine, Method, Market) = sumber daya yang dikelola
  manajemen secara umum; 4P (Product, Price, Promotion, Place) = strategi
  khusus bidang pemasaran saja.
```

## Page 12 — 14 Prinsip Manajemen (Henry Fayol)

Standalone page, full 2-column reference list of all 14 principles. The
HTML lesson only names what the 14 principles are (with a couple named as
examples) and points here for the full list — this page is the sole
canonical source for the complete enumeration, written fully
self-contained (complete real text for all 14, not a pointer back to the
HTML) so the PDF works standalone offline.

```
chapter-tag: Bab 1 · Manajemen
subject-chip: Ekonomi

h2.section-title: 14 Prinsip Manajemen (Henry Fayol)
p.lead: Referensi lengkap — halaman utama hanya menautkan ke sini alih-alih
  menampilkan semuanya sekaligus.

ref-list-2col, full text for all 14:
  01. Division of Work — pembagian kerja sesuai keahlian agar lebih
      efisien.
  02. Authority & Responsibility — wewenang harus seimbang dengan
      tanggung jawab yang diberikan.
  03. Discipline — kepatuhan terhadap aturan & kesepakatan organisasi.
  04. Unity of Command — setiap karyawan hanya menerima perintah dari
      satu atasan.
  05. Unity of Direction — kegiatan dengan tujuan sama harus dipimpin
      satu rencana & satu kepala.
  06. Subordination of Individual Interest — kepentingan bersama harus
      didahulukan dari kepentingan pribadi.
  07. Remuneration of Personnel — gaji/imbalan harus adil bagi karyawan
      & perusahaan.
  08. Centralization — keseimbangan antara pengambilan keputusan
      terpusat & terdesentralisasi.
  09. Chain of Command — alur komando/wewenang yang jelas dari atas ke
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
```

## Note on practice questions

There is no standalone "Latihan Tambahan" page in this PDF. The print-style
practice questions that used to close this document were migrated into
`bab1-badan-usaha.quiz.json` instead (converted to multiple-choice, matching
the quiz's existing schema) — see that file for the current questions
covering SHU calculation, PT vs. Koperasi, Persero IPO status, and fungsi
manajemen applied to an OSIS scenario.
