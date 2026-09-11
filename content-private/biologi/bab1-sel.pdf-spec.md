# PDF Companion Spec — Bab 1 Biologi: Sel — Unit Dasar Kehidupan

Curated content for the PDF companion, built on `public/assets/pdf-template/page-template.html`
(`.pdf-page[data-subject="biologi"]`). Not an export of the HTML page — this is the dense
static-reference material per CHAPTER_CONTENT_GUIDE.md §5, extended per this project's actual
practice: entire non-interactive reference content (card grids, comparison tables, itemized
lists with no click/toggle/filter behavior) was removed from the HTML lesson entirely and is
rewritten here in full, elaborated prose — not terse labels, since PDF pages must stand alone
without the HTML page's visual context. Biologi stays prose-first; none of this chapter's
content needs LaTeX (no formulas — everything below is descriptive/tabular).

Every page in this spec is self-contained — it must not depend on content that lives only in
`bab1-sel.html`, since the HTML lesson now covers only the interactive exploration (diagrams,
the organel toggle-filter, the mitosis phase-picker) plus short foundational definitions —
this PDF is the sole canonical source for the history, the full comparison tables, and the
detailed transport-mechanism explanations that used to also live in the HTML and have since
been trimmed there.

10 pages: 1 chapter-opener + 9 content pages (Mitosis-vs-Meiosis and Teori
Endosimbiotik ended up split onto separate pages during rendering — see
Page 9/10 notes below — rather than the 9-page combined plan this spec
originally sketched).

## Page 1 — Chapter opener

```
chapter-tag: Bab 1
subject-chip: Biologi
h1.page-title: Sel — Unit Dasar Kehidupan
p.dek: Materi PDF — pelengkap Bab 1
p.lead: Materi tambahan ini fokus ke sejarah penemuan sel secara lengkap, tabel-tabel
  perbandingan, dan penjelasan detail mekanisme transpor membran — pelengkap materi
  interaktif (diagram, filter organel, pemilih fase mitosis) di halaman utama, bukan
  salinannya.
h2.section-title: Yang akan kamu pelajari
ul.learn-list:
  - Kisah lengkap 4 ilmuwan penemu teori sel — Robert Hooke, Antonie van Leeuwenhoek,
    Schleiden & Schwann, dan Rudolf Virchow — beserta tahun dan temuan masing-masing
  - Tabel lengkap makromolekul organik (karbohidrat, protein, lipid, asam nukleat)
    dengan monomer penyusun, contoh, dan fungsi utamanya
  - Tabel perbandingan DNA vs RNA (gula penyusun, basa nitrogen, bentuk, lokasi, fungsi)
  - Tabel perbandingan sel hewan vs tumbuhan (7 aspek) dan sel prokariotik vs
    eukariotik (6 aspek) — referensi lengkap
  - Penjelasan detail tiga kelompok transpor membran: transpor pasif (difusi, difusi
    terfasilitasi, osmosis), tabel efek tonisitas (hipotonis/isotonis/hipertonis) pada
    sel hewan & tumbuhan, siklus lengkap pompa Na⁺/K⁺, dan transpor vesikuler
    (fagositosis, pinositosis, endositosis diperantarai reseptor, eksositosis)
  - Tabel perbandingan lengkap Mitosis vs Meiosis (6 aspek)
  - Bukti-bukti pendukung Teori Endosimbiotik, dijelaskan satu per satu
```

## Page 2 — Sejarah Penemuan Sel (Lengkap)

This content previously lived in the HTML under `#sejarah-sel` as a 4-card
`.organel-grid` (Hooke, Leeuwenhoek, Schleiden & Schwann, Virchow) — removed there as
static, non-interactive content and rewritten here in full prose (the HTML now keeps
only the intro paragraph, the Postulat Teori Sel checklist, and the "Jadi, Apa Itu Sel?"
summary, all short/foundational).

```
chapter-tag: Bab 1 · Sejarah Sel
subject-chip: Biologi

h2.section-title: Sejarah Penemuan Sel
p.lead: Empat ilmuwan, tersebar di rentang hampir 200 tahun, yang perlahan-lahan
  menyusun apa yang sekarang kita kenal sebagai Teori Sel.

p.body-text: Robert Hooke (1665) adalah orang pertama yang mengamati sel, meski ia
  sendiri tidak sadar sedang melihat unit dasar kehidupan. Menggunakan mikroskop
  sederhana rancangannya sendiri, ia mengintip sayatan tipis gabus (kulit kayu ek
  yang sudah mati) dan melihat deretan ruang-ruang kosong berdinding, seperti
  kamar-kamar kecil berjejer. Ia menamainya "cellula", bahasa Latin untuk "kamar
  kecil" atau "bilik biara" — dari sinilah istilah "sel" berasal. Penting dicatat:
  yang sebenarnya dilihat Hooke bukan sel hidup, melainkan dinding sel gabus yang
  sudah mati, jadi ia hanya melihat "kerangka kosong"-nya saja.

p.body-text: Antonie van Leeuwenhoek (1674), seorang pedagang kain asal Belanda yang
  hobi mengasah lensa sebagai kegemarannya, membangun mikroskop rancangannya sendiri
  dengan kemampuan perbesaran hingga sekitar 270 kali — jauh melampaui mikroskop
  Hooke. Dengan alat ini, ia menjadi orang pertama yang mengamati sel-sel yang
  masih hidup dan bergerak: bakteri, protozoa, hingga sel darah. Ia menjuluki
  makhluk-makhluk mikroskopis itu "animalcules" (hewan-hewan kecil). Karena
  kontribusinya membuka dunia mikroorganisme, ia dijuluki Bapak Mikrobiologi.

p.body-text: Matthias Schleiden (ahli botani/tumbuhan) dan Theodor Schwann (ahli
  zoologi/hewan) bekerja secara terpisah, lalu menggabungkan temuan mereka pada
  1838–1839. Schleiden mengamati bahwa seluruh jaringan tumbuhan tersusun dari sel,
  sementara Schwann menemukan pola serupa pada jaringan hewan. Gabungan pengamatan
  keduanya melahirkan Teori Sel modern yang pertama: semua makhluk hidup, baik
  tumbuhan maupun hewan, tersusun atas sel — sebuah generalisasi besar yang untuk
  pertama kalinya menyatukan dunia tumbuhan dan hewan di bawah satu prinsip
  struktural yang sama.

p.body-text: Rudolf Virchow (1855–1858) melengkapi teori sel dengan menjawab
  pertanyaan yang belum terjawab oleh Schleiden & Schwann: dari mana sel baru
  berasal? Jawabannya ia rangkum dalam prinsip Latin "Omnis cellula e cellula" —
  setiap sel hanya bisa terbentuk dari pembelahan sel yang sudah ada sebelumnya,
  bukan muncul begitu saja dari materi tak hidup (membantah teori generatio
  spontanea/abiogenesis yang saat itu masih dipercaya banyak orang). Prinsip inilah
  yang menjadi postulat keempat Teori Sel.

callout.mistake — Kesalahan Umum
❌ Salah: mengira Robert Hooke adalah orang yang menemukan sel hidup pertama kali.
✅ Benar: Hooke hanya melihat dinding sel gabus yang sudah mati (1665) — yang
  pertama kali mengamati sel hidup yang bergerak adalah Antonie van Leeuwenhoek,
  hampir satu dekade kemudian (1674).
```

## Page 3 — Referensi: Makromolekul Organik

This content previously lived in the HTML under `#komponen-kimiawi` as a
`.compare-table` right after the Anorganik/Organik overview — removed there as a
dense static table and moved here in full as the canonical reference (the HTML
keeps only the 2-card Anorganik/Organik overview, which is short and definitional).

| Makromolekul | Monomer Penyusun | Contoh | Fungsi Utama |
|---|---|---|---|
| Karbohidrat — Monosakarida | Monosakarida | Glukosa, Fruktosa, Galaktosa | Sumber & cadangan energi |
| Karbohidrat — Disakarida | Disakarida | Sukrosa, Laktosa, Maltosa | Sumber & cadangan energi |
| Karbohidrat — Polisakarida | Polisakarida | Selulosa (dinding sel tumbuhan), Pati/Amilum (cadangan energi tumbuhan), Glikogen (cadangan energi hewan), Kitin | Sumber & cadangan energi |
| Protein | Asam amino | Enzim, kolagen, hemoglobin | Struktural, enzim (katalis), transportasi, pertahanan (antibodi), pergerakan |
| Lipid | Asam lemak + gliserol | Fosfolipid (penyusun membran), trigliserida, steroid (kolesterol) | Penyusun membran sel, cadangan energi, hormon |
| Asam Nukleat | Nukleotida | DNA, RNA | Menyimpan & menyalurkan informasi genetik |

```
chapter-tag: Bab 1 · Komponen Kimiawi
subject-chip: Biologi

h2.section-title: Referensi: Makromolekul Organik
p.lead: Empat kelompok besar makromolekul berbasis karbon yang menyusun sel, dengan
  monomer (unit penyusun terkecil), contoh konkret, dan fungsi utamanya.

p.body-text: Karbohidrat dibedakan lagi menjadi tiga tingkatan berdasarkan jumlah
  monomernya: monosakarida (satu unit gula, mis. glukosa), disakarida (dua unit
  gula tersambung, mis. sukrosa/gula pasir), dan polisakarida (rantai panjang
  banyak unit gula, mis. selulosa penyusun dinding sel tumbuhan atau glikogen
  cadangan energi hewan). Protein tersusun dari rangkaian asam amino dan punya
  fungsi paling beragam — dari struktural (kolagen), katalis reaksi kimia (enzim),
  transportasi (hemoglobin), hingga pertahanan tubuh (antibodi). Lipid, meski
  bukan polimer sejati, tetap dikelompokkan di sini karena juga makromolekul
  organik — fosfolipid khususnya penting karena jadi bahan dasar seluruh membran
  sel. Asam nukleat (DNA & RNA) tersusun dari nukleotida dan bertugas menyimpan
  serta menyalurkan informasi genetik.

callout.mistake — Kesalahan Umum
❌ Salah: mengira semua karbohidrat berfungsi sama.
✅ Benar: selulosa (polisakarida struktural pada tumbuhan) tidak bisa dicerna
  manusia dan berfungsi sebagai penyusun dinding sel, sementara pati/amilum dan
  glikogen (polisakarida cadangan) memang disimpan tubuh sebagai sumber energi
  yang bisa dipecah kembali jadi glukosa.
```

## Page 4 — Referensi: DNA vs RNA

This content previously lived in the HTML under `#komponen-kimiawi` as a second
`.compare-table` right after the Makromolekul Organik table — removed there and
moved here in full.

| Aspek | DNA | RNA |
|---|---|---|
| Gula penyusun | Deoksiribosa | Ribosa |
| Basa nitrogen | Adenin, Timin, Guanin, Sitosin | Adenin, Urasil, Guanin, Sitosin |
| Bentuk | Untai ganda (double helix) | Umumnya untai tunggal |
| Lokasi | Inti sel, mitokondria, kloroplas | Inti sel & sitoplasma (ribosom) |
| Fungsi | Menyimpan informasi genetik | Menyalurkan & menerjemahkan informasi genetik |

```
chapter-tag: Bab 1 · Komponen Kimiawi
subject-chip: Biologi

h2.section-title: Referensi: DNA vs RNA
p.lead: Dua jenis asam nukleat yang sering tertukar karena namanya mirip — meski
  keduanya menyimpan informasi genetik, strukturnya cukup berbeda.

p.body-text: Perbedaan paling gampang diingat ada pada gula penyusun dan basa
  nitrogennya: DNA memakai gula deoksiribosa (kekurangan satu atom oksigen
  dibanding ribosa) dan salah satu dari empat basa nitrogennya adalah Timin;
  RNA memakai gula ribosa penuh dan menukar Timin dengan Urasil. Dari segi
  bentuk, DNA umumnya berupa untai ganda yang saling berpilin (double helix)
  sehingga informasinya lebih stabil dan tahan lama — cocok untuk perannya
  sebagai "arsip induk" informasi genetik. RNA umumnya berupa untai tunggal,
  lebih fleksibel tapi kurang stabil, sesuai perannya yang lebih sementara:
  menyalin instruksi dari DNA lalu membawanya ke ribosom untuk diterjemahkan
  menjadi protein.

callout.mistake — Kesalahan Umum
❌ Salah: mengira DNA hanya ada di inti sel.
✅ Benar: DNA juga ditemukan di mitokondria & kloroplas (DNA sirkular, mirip
  DNA bakteri) — inilah salah satu bukti pendukung Teori Endosimbiotik
  (lihat Halaman 9).
```

## Page 5 — Referensi: Perbandingan Sel Hewan vs Tumbuhan

This content previously lived in the HTML under `#perbandingan-sel` as the first
of two `.compare-table`s — removed there and replaced with a short paragraph
naming only the single biggest difference (dinding sel + kloroplas), pointing
here for the full table.

| Aspek | Sel Hewan | Sel Tumbuhan |
|---|---|---|
| Dinding sel | Tidak ada | Ada (selulosa) |
| Bentuk sel | Tidak tetap (fleksibel) | Tetap, kaku |
| Vakuola | Kecil, jumlah banyak (jika ada) | Besar, tunggal, dominan |
| Kloroplas | Tidak ada | Ada |
| Sentriol | Ada | Umumnya tidak ada |
| Cadangan makanan | Glikogen | Amilum (pati) |
| Cara memperoleh energi | Heterotrof (dari makanan) | Autotrof (fotosintesis) |

```
chapter-tag: Bab 1 · Perbandingan Sel
subject-chip: Biologi

h2.section-title: Referensi: Sel Hewan vs Sel Tumbuhan
p.lead: Coba bayangkan rumah tanpa pagar tembok (sel hewan) vs rumah dengan pagar
  tembok kokoh (sel tumbuhan) — itulah kira-kira bedanya, dijabarkan dalam tujuh
  aspek berikut.

p.body-text: Dinding sel (selulosa) adalah pembeda paling mendasar — kehadirannya
  pada sel tumbuhan membuat bentuk sel jadi tetap/kaku, sekaligus memungkinkan sel
  tumbuhan menahan tekanan air masuk tanpa pecah (lihat efek turgid pada tabel
  tonisitas, Halaman 7). Vakuola pada tumbuhan berukuran besar dan tunggal, berperan
  besar menjaga tekanan turgor tersebut; pada hewan vakuola kecil dan jumlahnya bisa
  banyak. Kloroplas, tempat berlangsungnya fotosintesis, murni eksklusif milik sel
  tumbuhan — inilah yang memungkinkan tumbuhan bersifat autotrof (membuat makanan
  sendiri dari cahaya), sementara sel hewan bersifat heterotrof (bergantung pada
  makanan dari luar). Sebaliknya, sentriol (berperan menarik kromosom saat
  pembelahan sel) umumnya hanya ditemukan pada sel hewan.

callout.mistake — Kesalahan Umum
❌ Salah: mengira sel tumbuhan sama sekali tidak punya mitokondria karena sudah
  punya kloroplas.
✅ Benar: sel tumbuhan tetap punya mitokondria (untuk respirasi seluler) di
  samping kloroplas (untuk fotosintesis) — keduanya bekerja untuk tujuan
  berbeda dan sama-sama dibutuhkan.
```

## Page 6 — Referensi: Perbandingan Sel Prokariotik vs Eukariotik

This content previously lived in the HTML under `#perbandingan-sel` as the
second `.compare-table` — removed there and moved here in full.

| Aspek | Prokariotik | Eukariotik |
|---|---|---|
| Membran inti | Tidak ada (nukleoid) | Ada |
| Organel bermembran | Tidak ada | Ada (mitokondria, RE, Golgi) |
| Ukuran sel | Lebih kecil (±1–10 µm) | Lebih besar (±10–100 µm) |
| Ribosom | Tipe 70S | Tipe 80S |
| Contoh organisme | Bakteri, Archaea | Hewan, tumbuhan, fungi, protista |
| Pembelahan sel | Pembelahan biner | Mitosis / meiosis |

```
chapter-tag: Bab 1 · Perbandingan Sel
subject-chip: Biologi

h2.section-title: Referensi: Sel Prokariotik vs Eukariotik
p.lead: Bandingkan "rumah studio" super sederhana (prokariotik, seperti bakteri)
  dengan "rumah bertingkat lengkap dengan ruangan khusus" (eukariotik, seperti
  sel manusia) — enam aspek pembedanya berikut ini.

p.body-text: Ciri paling mendasar ada pada membran inti: sel prokariotik tidak
  memilikinya sama sekali, sehingga materi genetiknya (DNA) hanya mengambang
  bebas di sitoplasma dalam wilayah yang disebut nukleoid — bukan nukleus
  sungguhan. Sel eukariotik membungkus DNA-nya rapi di dalam nukleus bermembran
  ganda. Konsekuensinya, sel prokariotik juga tidak punya organel bermembran
  lain (tidak ada mitokondria, RE, atau Golgi) dan ukurannya jauh lebih kecil —
  umumnya sepersepuluh sampai seperseratus ukuran sel eukariotik. Ribosom
  keduanya juga berbeda tipe: 70S pada prokariotik, 80S pada eukariotik —
  perbedaan tipe ribosom inilah yang jadi salah satu bukti kuat Teori
  Endosimbiotik (lihat Halaman 9), karena mitokondria & kloroplas justru
  memakai ribosom tipe 70S seperti bakteri, bukan 80S seperti sel eukariotik
  yang menampungnya.

callout.mistake — Kesalahan Umum
❌ Salah: mengira "prokariotik" berarti organisme yang lebih sederhana/primitif
  dalam segala hal.
✅ Benar: prokariotik memang lebih sederhana secara struktural (tanpa membran
  inti & organel bermembran), tapi tetap sangat sukses secara evolusioner —
  bakteri & Archaea justru organisme paling banyak jumlahnya & paling beragam
  habitatnya di Bumi.
```

## Page 7 — Transpor Membran: Pasif & Tonisitas (Penjelasan Lengkap)

This content previously lived in the HTML under `#transpor-membran` as a
3-card grid (Difusi/Difusi Terfasilitasi/Osmosis) plus a Tonisitas
`.compare-table` — removed there (the HTML now keeps only a one-sentence
intro per transport category) and moved here in full elaborated prose.

| Kondisi Larutan | Efek pada Sel Hewan | Efek pada Sel Tumbuhan |
|---|---|---|
| Hipotonis (larutan encer, air masuk ke sel) | Lisis — sel kemasukan air terus, membengkak, lalu pecah | Turgid — sel menggembung tapi tetap aman berkat dinding sel yang kokoh |
| Isotonis (konsentrasi larutan sama dengan sel) | Sel tetap normal, tidak ada perpindahan air bersih | Sel tetap normal, tidak ada perpindahan air bersih |
| Hipertonis (larutan pekat, air keluar dari sel) | Krenasi — sel kehilangan air dan mengerut/keriput | Plasmolisis — isi sel menyusut, membrannya lepas dari dinding sel |

```
chapter-tag: Bab 1 · Transpor Membran
subject-chip: Biologi

h2.section-title: Transpor Pasif & Dampak Osmosis (Tonisitas)
p.lead: Tiga mekanisme yang sama-sama tidak butuh energi sel, plus efek
  osmosis pada sel yang direndam larutan dengan kepekatan berbeda-beda.

p.body-text: Difusi adalah yang paling sederhana — sama seperti aroma parfum
  yang perlahan menyebar memenuhi ruangan tanpa ada yang mendorongnya, molekul
  di sini bergerak sendiri dari area padat (konsentrasi tinggi) ke area lebih
  sepi (konsentrasi rendah), sampai akhirnya merata di semua tempat. Difusi
  terfasilitasi bekerja dengan prinsip arah yang sama, tapi untuk molekul yang
  "terlalu besar" atau bermuatan listrik untuk menembus lapisan lemak membran
  begitu saja — molekul ini tetap bisa lewat asal dibantu dibukakan "pintu"
  oleh protein channel atau protein carrier di membran. Osmosis adalah versi
  khusus difusi untuk air: air berpindah melewati membran semipermeabel, dari
  larutan yang lebih encer menuju larutan yang lebih pekat, sampai kepekatan
  di kedua sisi membran setara.

p.body-text: Dampak osmosis pada sel dikenal sebagai tonisitas, dan efeknya
  berbeda antara sel hewan (tanpa dinding sel) dan sel tumbuhan (punya dinding
  sel yang kokoh) — mirip percobaan klasik kentang direndam air garam vs air
  biasa. Dalam larutan hipotonis (lebih encer dari cairan sel), air terus
  masuk ke sel: sel hewan yang tidak punya penahan akan terus membengkak
  sampai pecah (lisis), sementara sel tumbuhan tetap aman menggembung (turgid)
  karena dinding selnya menahan tekanan dari dalam. Dalam larutan isotonis
  (kepekatan sama dengan cairan sel), tidak ada perpindahan air bersih, jadi
  kedua jenis sel tetap normal. Dalam larutan hipertonis (lebih pekat dari
  cairan sel), air keluar dari sel: sel hewan mengerut/keriput (krenasi),
  sementara pada sel tumbuhan yang terjadi adalah plasmolisis — isi selnya
  menyusut menjauhi dinding sel, sehingga membran plasmanya lepas dari dinding
  sel meski dinding selnya sendiri tetap kaku di tempat.

callout.mistake — Kesalahan Umum
❌ Salah: menganggap krenasi dan plasmolisis adalah istilah yang bisa
  dipertukarkan begitu saja.
✅ Benar: krenasi khusus istilah untuk sel hewan mengerut dalam larutan
  hipertonis (karena tidak punya dinding sel penahan bentuk); plasmolisis
  khusus istilah untuk sel tumbuhan, di mana membran plasmanya lepas/menyusut
  dari dinding sel yang tetap kaku di tempatnya.
```

## Page 8 — Transpor Aktif & Vesikuler (Penjelasan Lengkap)

This content previously lived in the HTML under `#transpor-membran` as the
Na⁺/K⁺ pump `.role-cards` (4 numbered steps) and a 4-card grid
(Fagositosis/Pinositosis/Endositosis Diperantarai Reseptor/Eksositosis) —
removed there and rewritten here as connected prose.

```
chapter-tag: Bab 1 · Transpor Membran
subject-chip: Biologi

h2.section-title: Transpor Aktif & Transpor Vesikuler
p.lead: Dua mekanisme yang butuh usaha ekstra dari sel — satu memompa ion
  satu per satu lewat protein, satu lagi mengangkut partikel besar dalam
  "kardus" gelembung membran.

p.body-text: Transpor aktif dibutuhkan ketika sel perlu memindahkan zat ke
  arah yang "berlawanan arus" — dari area sepi ke area padat, melawan gradien
  konsentrasi alami. Ini butuh usaha ekstra, seperti mendorong mobil menanjak:
  perlu bahan bakar berupa ATP. Contoh klasiknya adalah pompa Na⁺/K⁺
  (sodium-potassium pump), yang bekerja dalam siklus berulang empat langkah.
  Pertama, protein carrier di membran menjemput 3 ion Na⁺ dari dalam sel.
  Kedua, satu molekul ATP dipakai — diubah jadi ADP + fosfat — untuk mengubah
  bentuk protein carrier tersebut. Ketiga, perubahan bentuk ini membuat
  protein melepas 3 ion Na⁺ ke luar sel, lalu langsung menjemput 2 ion K⁺ dari
  luar sel. Keempat, protein kembali ke bentuk semula dan melepas 2 ion K⁺ ke
  dalam sel — siklus pun berulang dari awal. Perlu dibedakan dua jenis
  "petugas transportasi" di membran: protein channel (jalur pasif, tidak
  butuh energi, cuma jadi lubang lewat) dan protein carrier/pump (aktif,
  memompa ion melawan arus dengan bantuan energi ATP seperti pada contoh di
  atas).

p.body-text: Transpor vesikuler dipakai untuk partikel yang terlalu besar
  untuk lewat "pintu" protein biasa — sel punya trik lain: membungkusnya
  dalam gelembung membran (vesikel), seperti mengemas barang dalam kardus
  sebelum diangkut. Ada empat bentuknya. Fagositosis adalah ketika sel
  "memakan" partikel padat, seperti sel darah putih yang menelan bakteri
  untuk melawan infeksi. Pinositosis adalah versi cairnya — sel "meneguk"
  cairan atau zat terlarut di sekitarnya sebagai cara menyerap nutrisi cair.
  Endositosis diperantarai reseptor lebih presisi dibanding keduanya: molekul
  tertentu harus "mengetuk pintu" dulu (menempel ke reseptor spesifik di
  membran) sebelum ditelan sel — contohnya penyerapan kolesterol (LDL) dari
  darah. Eksositosis adalah kebalikan dari ketiganya — sel mengeluarkan atau
  mensekresikan isinya ke luar, misalnya melepaskan hormon, enzim, atau
  neurotransmitter.

callout.mistake — Kesalahan Umum
❌ Salah: mengira transpor vesikuler termasuk transpor pasif karena
  "zat cuma dibungkus dan dibawa saja".
✅ Benar: transpor vesikuler (fagositosis, pinositosis, endositosis, dan
  eksositosis) tetap termasuk kategori yang butuh energi ATP — sel harus
  aktif membentuk & menggerakkan vesikelnya, bukan proses yang berjalan
  sendiri seperti difusi.
```

## Page 9 — Referensi: Mitosis vs Meiosis

The Mitosis vs Meiosis table previously lived in the HTML under
`#reproduksi-sel` as a `.compare-table` right after the Meiosis I/II
split-cards — removed there (the HTML keeps the interactive mitosis
phase-picker and the short Meiosis I/II cards, both untouched).

| Aspek | Mitosis | Meiosis |
|---|---|---|
| Jumlah pembelahan | 1 kali | 2 kali (Meiosis I & II) |
| Jumlah sel anak | 2 | 4 |
| Sifat genetik anak | Identik dengan induk (diploid) | Setengah dari induk (haploid), bervariasi |
| Terjadi pada | Sel somatik (sel tubuh) | Sel gonad (pembentuk gamet) |
| Fungsi | Pertumbuhan, regenerasi, perbaikan | Reproduksi seksual, variasi genetik |
| Pindah silang | Tidak terjadi | Terjadi pada profase I |

```
chapter-tag: Bab 1 · Reproduksi Sel
subject-chip: Biologi

h2.section-title: Referensi: Mitosis vs Meiosis
p.lead: Perbandingan langsung dua jenis pembelahan sel dalam enam aspek —
  detail tiap fase mitosis & tiap tahap meiosis ada di materi interaktif
  halaman utama.

p.body-text: Perbedaan paling mendasar ada pada jumlah pembelahan dan hasil
  akhirnya: mitosis membelah satu kali menghasilkan 2 sel anak yang identik
  secara genetik dengan induknya (tetap diploid/2n) — cocok untuk pertumbuhan
  & perbaikan jaringan tubuh. Meiosis membelah dua kali berurutan (Meiosis I
  lalu Meiosis II) menghasilkan 4 sel anak yang jumlah kromosomnya separuh
  dari induk (haploid/n) dan bervariasi secara genetik satu sama lain, karena
  terjadi pindah silang (crossing over) pada profase I — pertukaran materi
  genetik antar kromosom homolog yang tidak pernah terjadi pada mitosis.
  Mitosis berlangsung pada sel somatik (sel tubuh biasa), sedangkan meiosis
  khusus terjadi pada sel gonad untuk membentuk sel gamet (sperma/sel telur).
```

## Page 10 — Bukti Pendukung Teori Endosimbiotik

The Teori Endosimbiotik evidence table previously lived under
`#endosimbiotik` as a 5-row `.compare-table` — removed there (the HTML
keeps only the `.law-strip` summary and closing `.mini-note`). Split onto
its own page rather than combined with Page 9's Mitosis-vs-Meiosis table
(the original plan) after actually rendering and checking — combined, the
page had noticeably more headroom than the rest of the deck, but keeping
each topic on its own page reads cleaner than cramming two unrelated
tables together, so it was split during the orchestrating session's
render pass rather than left combined.

```
chapter-tag: Bab 1 · Teori Endosimbiotik
subject-chip: Biologi

h2.section-title: Bukti Pendukung Teori Endosimbiotik
p.lead: Lima bukti yang menguatkan dugaan bahwa mitokondria & kloroplas dulunya
  adalah sel prokariotik bebas yang hidup bersimbiosis dengan sel eukariotik
  purba.

p.body-text: Pertama, DNA sendiri — mitokondria & kloroplas punya DNA sirkular
  sendiri, terpisah dari DNA inti sel, dan bentuknya mirip DNA bakteri (bukan
  DNA linear seperti di nukleus). Kedua, membran ganda — membran luarnya
  berasal dari vesikel endositosis sel inang saat "menelan" bakteri purba,
  sementara membran dalamnya adalah membran bakteri asli yang tertelan.
  Ketiga, ribosom tipe 70S — sama persis seperti ribosom bakteri, berbeda dari
  ribosom sel eukariotik di sekitarnya yang bertipe 80S (lihat juga Halaman 6).
  Keempat, reproduksi independen — mitokondria & kloroplas bisa membelah diri
  sendiri di dalam sel, mirip pembelahan biner bakteri, tidak menunggu sel
  induknya membelah. Kelima, ukuran — keduanya berukuran serupa dengan bakteri
  pada umumnya. Kelima bukti ini bersama-sama menunjuk pada dugaan bahwa
  mitokondria berasal dari bakteri aerobik (alfa-proteobacteria), sedangkan
  kloroplas dari bakteri fotosintetik (cyanobacteria).

callout.mistake — Kesalahan Umum
❌ Salah: mengira mitokondria/kloroplas "dimakan" lalu dicerna oleh sel
  eukariotik purba.
✅ Benar: keduanya tidak dicerna — mereka bertahan hidup di dalam sel inang
  dan membentuk hubungan simbiosis mutualisme (saling menguntungkan) hingga
  akhirnya menyatu secara evolusioner menjadi organel permanen.
```

## Note on practice questions

There is no standalone "Latihan Tambahan" page in this PDF. The leveled practice
questions for this chapter live in `bab1-sel.transpor.exercise.json` (Transpor
Membran topic) and `bab1-sel.quiz.json` (full-chapter quiz) — neither file was
modified as part of this restructuring pass.

## Note on the interactive 3D cell models (HTML, not PDF)

Not part of this spec, but added to `bab1-sel.html` alongside this
restructuring pass — six embedded Sketchfab 3D models, all CC-BY 4.0:

- `#komponen-struktural`: one model ("Cell Membrane" by Virtual Reality /
  simulanis), placed right after the existing membran-sel.webp diagram
  and before the 5-card bilayer/protein breakdown.
- `#organel`: two side-by-side models ("Eukaryotic Cell" by The Center for
  BioMedical Visualization at SGU, and "Plant Cell Organelles" by
  CVallance), placed right after the existing static organel diagram.
- `#perbandingan-sel`: one model ("Prokaryotic Bacterial Cell Anatomy" by
  Nima), placed after the animal/plant-vs-prokaryotic teaser paragraph —
  gives the prokaryotic/eukaryotic comparison a hands-on counterpart now
  that its comparison table lives only in the PDF (Page 6).
- `#transpor-membran`: one model ("Osmosis in a plant cell" by arloopa),
  placed right after the Transpor Pasif summary box — the full tonisitas
  table (turgid/lisis/krenasi/plasmolisis) it illustrates lives in the
  PDF (Page 7).
- `#reproduksi-sel`: one model ("Mitosis 3d animation" by Naveen Manja),
  placed right after the interactive mitosis phase-picker/detail panel —
  a visual walkthrough to pair with picking through the phase buttons.

These are genuinely interactive (rotate/zoom) and stay in the HTML per the
established keep-interactive-elements-in-HTML rule — no PDF equivalent
needed.
