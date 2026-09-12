# PDF Companion Spec — Bab 2 Ekonomi: Pendapatan Nasional & Ketimpangan Ekonomi

Curated content for the PDF companion, built on `public/assets/pdf-template/page-template.html`
(`.pdf-page[data-subject="ekonomi"]`, `--accent:#ee7d31`). Not an export of the HTML page — this
is the formula/advanced-example/dense-reference material per CHAPTER_CONTENT_GUIDE.md §5.
Ekonomi stays prose-first; LaTeX only appears where a real formula/calculation shows up.

Every page below is self-contained — it must not depend on content that lives only in
`bab2-pendapatan-nasional.html`, since the HTML lesson covers the interactive/foundational parts
only and this PDF is the "further detail" companion. 11 pages: 1 chapter-opener + 10 content
pages (Page 10's original Pengayaan+Glosarium combo overflowed on render — measured via
headless Chromium `.page-body` scrollHeight vs clientHeight — and was split into two pages,
10 and 11, rather than cramped with a `dense` class; see the render note at the bottom of this
file).

This spec matches the actual rendered PDF in `bab2-pendapatan-nasional.pdf-pages.html` exactly —
same headings, same content, same page boundaries.

## Page 1 — Chapter opener

```
chapter-tag: Bab 2
subject-chip: Ekonomi
h1.page-title: Pendapatan Nasional & Ketimpangan Ekonomi
p.dek: Materi PDF — pelengkap Bab 2
p.lead: Materi tambahan ini fokus ke definisi lengkap, referensi cepat, dan contoh soal
  lanjutan yang butuh perhitungan bertingkat — pelengkap materi interaktif di halaman
  utama, bukan salinannya.
h2.section-title: Yang akan kamu pelajari
ul.learn-list:
  - Definisi pendapatan nasional menurut 3 ahli ekonomi, dan 4 manfaat utama
    menghitungnya — referensi lengkap
  - Circular Flow Diagram 2/3/4 sektor dijelaskan penuh: siapa berinteraksi dengan
    siapa, dan apa yang mengalir di tiap panah
  - Tabel referensi lengkap 6 konsep berantai (GDP → GNP → NNP → NNI → PI → DI)
    dengan rumus & definisi tiap konsep
  - 2 contoh soal lanjutan: perhitungan GNP/NNP/NNI dan GDP pendekatan produksi,
    plus jebakan klasik campur pendekatan pendapatan vs pengeluaran
  - Kurva Lorenz & Indeks Gini dijelaskan penuh, plus tabel klasifikasi lengkap
    (Indeks Gini & kriteria Bank Dunia)
  - Kebijakan fiskal ekspansif & kontraktif — rantai mekanismenya sampai ke PDB
  - Pengayaan: perspektif ekonomi Islam (ZISWAF) dan glosarium cepat istilah bab ini
```

## Page 2 — Referensi: Pengertian & Manfaat Pendapatan Nasional

This content previously would have lived in the HTML's #pengertian section as a full
list of expert definitions — kept terse there (one condensed sentence pointing here)
since the HTML only needs a short foundational definition to move on to Circular Flow;
the full elaborated version lives here as the canonical reference.

```
chapter-tag: Bab 2 · Konsep Dasar
subject-chip: Ekonomi

h2.section-title: Pengertian Pendapatan Nasional Menurut Para Ahli
p.lead: Tiga definisi klasik yang sering dikutip di soal ujian — beda kata-kata, inti
  yang sama: nilai total produksi atau balas jasa faktor produksi dalam satu periode.

ol.ref-list, full text:
  1. Soediyono Reksoprayitno — pendapatan nasional adalah jumlah nilai barang dan
     jasa yang dihasilkan oleh perekonomian suatu negara dalam kurun waktu tertentu.
     Definisi ini menekankan sisi PRODUKSI: seberapa banyak & seberapa bernilai
     barang/jasa yang benar-benar dihasilkan.
  2. Sadono Sukirno — pendapatan nasional adalah total jumlah pendapatan yang
     diterima dari faktor-faktor produksi yang digunakan untuk memproduksi barang
     dan jasa dalam satu tahun tertentu. Definisi ini menekankan sisi PENDAPATAN:
     siapa menerima berapa dari proses produksi tersebut.
  3. Alfred Marshall — pendapatan nasional adalah hasil bersih yang diperoleh dari
     pengolahan sumber daya alam suatu negara oleh tenaga kerja dan modal, baik
     berwujud benda maupun jasa. Definisi klasik ini menegaskan bahwa sumber daya
     alam saja tidak cukup — harus diolah lebih dulu oleh tenaga kerja & modal
     supaya bernilai ekonomi.

h2.section-title: Manfaat Menghitung Pendapatan Nasional
ol.ref-list, full text:
  1. Mengukur Tingkat Kemakmuran — memberi gambaran kuantitatif mengenai taraf
     hidup & kesejahteraan masyarakat suatu negara. Angka pendapatan nasional per
     kapita (dibagi jumlah penduduk) sering dipakai sebagai proksi kemakmuran rata-
     rata penduduk, meski tidak menggambarkan pemerataannya (lihat Halaman 7-8
     soal ketimpangan).
  2. Menelaah Struktur Perekonomian — dari komposisi pendapatan nasional (berapa
     persen dari sektor agraris, industri, atau jasa), pemerintah & ekonom bisa
     tahu ke arah mana perekonomian sebuah negara condong, dan sektor mana yang
     perlu didorong lebih jauh.
  3. Perbandingan Ekonomi Antarwaktu dan Antarnegara — dengan menghitung pendapatan
     nasional tiap tahun, laju pertumbuhan ekonomi bisa dipantau dari waktu ke
     waktu; dengan membandingkannya ke negara lain, posisi relatif kekuatan
     ekonomi suatu negara juga bisa dipetakan.
  4. Pedoman Kebijakan Pemerintah — data pendapatan nasional menjadi dasar
     penyusunan Anggaran Pendapatan dan Belanja Negara (APBN), perencanaan
     pembangunan jangka panjang, dan evaluasi efektivitas program-program
     ekonomi yang sudah berjalan.
```

## Page 3 — Referensi: Circular Flow Diagram 2/3/4 Sektor (Penjelasan Lengkap)

The HTML keeps the interactive tab-switch + diagrams + one-line captions per panel
(genuinely interactive, stays in HTML). This page reproduces the full breakdown of
who interacts with whom and what flows in each arrow, elaborated — the level of
detail the compact HTML captions intentionally don't carry.

```
chapter-tag: Bab 2 · Circular Flow
subject-chip: Ekonomi

h2.section-title: Circular Flow Diagram — Penjelasan Lengkap
p.lead: Tiga model bertingkat yang menggambarkan bagaimana uang, barang, dan faktor
  produksi berputar di antara pelaku-pelaku ekonomi.

h2.section-title: Model 2 Sektor (Perekonomian Sederhana)
p.body-text: Melibatkan dua pelaku saja: Rumah Tangga Konsumen (RTK) dan Rumah
  Tangga Produsen (RTP). RTK berperan ganda — sebagai pemilik faktor produksi
  (tanah, tenaga kerja, modal, kewirausahaan) yang disewakan ke RTP, sekaligus
  sebagai konsumen yang membeli barang/jasa hasil produksi RTP. Ada dua arus yang
  saling berlawanan arah: arus riil (faktor produksi mengalir dari RTK ke RTP,
  barang/jasa mengalir dari RTP ke RTK) dan arus uang (balas jasa berupa sewa,
  upah, bunga, laba mengalir dari RTP ke RTK; uang pembelian/konsumsi (C) mengalir
  dari RTK ke RTP). Model ini belum melibatkan pemerintah maupun pihak luar negeri
  — cocok untuk memahami konsep dasar sebelum modelnya makin realistis.

h2.section-title: Model 3 Sektor (Perekonomian Tertutup)
p.body-text: Menambahkan Rumah Tangga Negara/Pemerintah (RTN) sebagai pelaku
  ketiga. Pemerintah memungut pajak dari RTK (pajak penghasilan) maupun dari RTP
  (pajak perusahaan/PPN), lalu menyalurkannya kembali ke perekonomian dalam tiga
  bentuk: subsidi (mengurangi biaya produksi/harga barang tertentu), bantuan
  sosial (transfer langsung ke rumah tangga tertentu), dan belanja pemerintah/G
  (membeli barang & jasa dari RTP, misalnya proyek infrastruktur). Disebut
  "tertutup" karena masih belum ada hubungan ekonomi dengan pihak luar negeri —
  seluruh perputaran uang & barang terjadi di dalam batas negara itu sendiri.

h2.section-title: Model 4 Sektor (Perekonomian Terbuka)
p.body-text: Menambahkan Masyarakat Luar Negeri (RTLN) sebagai pelaku keempat.
  RTP menjual sebagian hasil produksinya ke luar negeri (ekspor/X) dan membeli
  barang/jasa dari luar negeri untuk kebutuhan produksi maupun konsumsi domestik
  (impor/M). Disebut "terbuka" karena sudah terhubung dengan perekonomian dunia.
  Inilah model paling realistis dan paling lengkap — keempat pelakunya (RTK, RTP,
  RTN, RTLN) persis menjadi dasar keempat komponen rumus pendekatan pengeluaran:
  Y = C + I + G + (X − M).

callout.mistake — Kesalahan Umum
❌ Salah: mengira model 3 sektor dan 4 sektor cuma beda "jumlah kotak" di diagram
  tanpa makna ekonomi yang berbeda.
✅ Benar: tiap sektor tambahan mewakili satu kelompok pengeluaran/pendapatan baru
  dalam rumus GDP. Sektor pemerintah (RTN) melahirkan komponen G; sektor luar
  negeri (RTLN) melahirkan komponen (X−M). Model 2 sektor kalau dihitung GDP-nya
  cuma akan menghasilkan Y = C (+ I bila ada investasi), jauh lebih sederhana dari
  realita ekonomi sesungguhnya.
```

## Page 4 — Referensi Lengkap: Konsep Berantai Pendapatan Nasional

The HTML only walks through ONE full worked example (Halaman 5-6 di sini yang beri
contoh lain) tanpa menampilkan tabel definisi semua 6 konsep sekaligus — tabel
lengkap dengan definisi & rumus tiap konsep jadi referensi utama di halaman ini.

```
chapter-tag: Bab 2 · Konsep Berantai
subject-chip: Ekonomi

h2.section-title: Dari GDP ke Disposable Income — Referensi Lengkap
p.lead: Enam konsep pendapatan nasional yang terhubung berantai, dari total
  produksi wilayah (GDP) sampai uang yang benar-benar siap dibelanjakan
  perseorangan (DI).

ref-table, full text:
  | Konsep | Penjelasan | Rumus |
  |---|---|---|
  | GDP (Gross Domestic Product / PDB) | Total produksi barang & jasa oleh siapa
    pun (WNI maupun WNA) yang berproduksi DI DALAM batas wilayah negara. |
    GDP = Produksi Dalam Negeri (WNI + WNA) |
  | GNP (Gross National Product) | Total nilai produk yang dihasilkan oleh
    seluruh WARGA NEGARA suatu negara, baik yang berproduksi di dalam maupun di
    luar negeri. |
    GNP = GDP + Pendapatan Neto Luar Negeri (Pendapatan WNI di LN − Pendapatan
    WNA di DN) |
  | NNP (Net National Product) | Produk nasional bersih setelah dikurangi
    penggantian/penyusutan barang modal yang aus selama proses produksi. |
    NNP = GNP − Penyusutan (Depresiasi) |
  | NNI (Net National Income) | Pendapatan bersih nasional berdasarkan balas jasa
    murni yang diterima pemilik faktor produksi, setelah pajak tidak langsung
    dikeluarkan dan subsidi ditambahkan kembali. |
    NNI = NNP − Pajak Tidak Langsung + Subsidi |
  | PI (Personal Income) | Total pendapatan yang benar-benar diterima setiap
    individu dalam masyarakat — bagian yang tidak sampai ke individu (laba
    ditahan, pajak perseroan, iuran asuransi) dikeluarkan, sementara transfer
    payment yang diterima individu (meski bukan dari bekerja) ditambahkan. |
    PI = NNI + Transfer Payment − (Laba Ditahan + Pajak Perseroan + Iuran
    Asuransi) |
  | DI (Disposable Income) | Pendapatan yang benar-benar siap dimanfaatkan untuk
    konsumsi atau dialokasikan sebagai tabungan, setelah pajak langsung (PPh)
    dipotong. |
    DI = PI − Pajak Langsung (PPh) |

callout.mistake — Kesalahan Umum
❌ Salah: menghafal arah penyesuaian (tambah/kurang) secara acak, atau mengira
  semua tahap sama-sama "dikurangi".
✅ Benar: arahnya tetap dan logis kalau dipikirkan dari maknanya. NNP selalu
  DIKURANGI penyusutan (barang modal aus, bukan pendapatan baru). NNI dikurangi
  pajak tidak langsung (bukan balas jasa faktor produksi) tapi DITAMBAH subsidi
  (bentuk lain "balas jasa" tidak langsung dari pemerintah). PI dikurangi tiga
  komponen yang tidak sampai ke individu, tapi DITAMBAH transfer payment yang
  sampai ke individu. DI dikurangi pajak langsung karena itu benar-benar
  dipotong dari kantong individu.
```

## Page 5 — Contoh Soal Lanjutan 1: Menghitung GNP, NNP & NNI

```
chapter-tag: Bab 2 · Konsep Berantai
subject-chip: Ekonomi

h2.section-title: Contoh Soal Lanjutan — GNP, NNP & NNI

example-box — Contoh Soal · Tingkat Lanjut
  Diketahui data ekonomi suatu negara (dalam miliar Rupiah): GDP = 50.000,
  Pendapatan WNI di Luar Negeri = 3.500, Pendapatan WNA di Dalam Negeri = 6.000,
  Penyusutan = 2.000, Pajak Tidak Langsung = 1.500, dan Subsidi = 500. Hitunglah
  besarnya GNP, NNP, dan NNI!
  1. GNP = GDP + (Pendapatan WNI di LN − Pendapatan WNA di DN)
     = 50.000 + (3.500 − 6.000) = 50.000 − 2.500 = Rp47.500 miliar
  2. NNP = GNP − Penyusutan = 47.500 − 2.000 = Rp45.500 miliar
  3. NNI = NNP − Pajak Tidak Langsung + Subsidi = 45.500 − 1.500 + 500 =
     Rp44.500 miliar
  Perhatikan: pendapatan WNA di dalam negeri (6.000) LEBIH BESAR dari pendapatan
  WNI di luar negeri (3.500) — makanya GNP negara ini justru LEBIH KECIL dari
  GDP-nya. Ini situasi umum di negara yang banyak menerima investasi asing:
  produksi di dalam negeri tinggi (GDP besar), tapi sebagian keuntungannya
  mengalir keluar sebagai pendapatan WNA, bukan warga negaranya sendiri.
```

## Page 6 — Contoh Soal Lanjutan 2: Pendekatan Produksi & Jebakan Campur Pendekatan

```
chapter-tag: Bab 2 · Tiga Pendekatan GDP
subject-chip: Ekonomi

h2.section-title: Contoh Soal Lanjutan — Pendekatan Produksi

example-box — Contoh Soal · Tingkat Lanjut (Nilai Tambah)
  Empat sektor produksi memiliki nilai input & output berikut (juta Rupiah):
  Pertanian Apel (input 0, output 100), Industri Pengolahan Keripik (input 100,
  output 120), Logistik/Transportasi (input 120, output 150), Perdagangan
  Keripik Apel (input 150, output 180).
  1. Nilai tambah tiap sektor = Nilai Output − Nilai Input: 100−0=100,
     120−100=20, 150−120=30, 180−150=30.
  2. GDP (pendekatan produksi) = jumlah nilai tambah = 100+20+30+30 = 180 juta.
  3. BUKAN jumlah total nilai output (100+120+150+180=550 juta) — itu sudah
     menghitung nilai bahan baku/setengah jadi berkali-kali di tiap tahap
     rantai produksi (double counting).

example-box — Contoh Soal · Tingkat Lanjut (Jebakan Campur Pendekatan)
  Data suatu negara (miliar Rupiah): Upah=45, Sewa=20, Bunga=10, Laba=35,
  Konsumsi=400, Investasi=180, Belanja Pemerintah=130, Ekspor=95, Impor=70.
  Hitung pendapatan nasional dengan pendekatan PENGELUARAN.
  1. Pisahkan dulu: Upah, Sewa, Bunga, Laba adalah komponen pendekatan
     PENDAPATAN (Y = r+w+i+p = 20+45+10+35 = 110) — BUKAN bagian dari
     pendekatan pengeluaran, harus diabaikan untuk soal ini.
  2. Komponen pendekatan pengeluaran yang benar: Konsumsi (C) = 400, Investasi
     (I) = 180, Belanja Pemerintah (G) = 130, Ekspor (X) = 95, Impor (M) = 70.
  3. Y = C+I+G+(X−M) = 400+180+130+(95−70) = 400+180+130+25 = Rp735 miliar.

callout.mistake — Kesalahan Umum
❌ Salah: soal sengaja mencantumkan data pendekatan pendapatan (r,w,i,p) dan
  pendekatan pengeluaran (C,I,G,X,M) sekaligus dalam satu daftar, berharap
  siswa menjumlah semuanya jadi satu angka besar.
✅ Benar: dua pendekatan itu dua rumus TERPISAH untuk angka Y yang sama —
  tentukan dulu pendekatan mana yang diminta soal, lalu ambil HANYA variabel
  yang sesuai rumus itu. Variabel dari pendekatan lain harus diabaikan, bukan
  ikut dijumlahkan.
```

## Page 7 — Referensi Lengkap: Kurva Lorenz & Klasifikasi Ketimpangan

The HTML keeps the interactive Gini classifier + a short classification list.
Full explanation of the Lorenz curve mechanics plus BOTH classification tables
(Gini ratio & World Bank) reproduced in full live here as the canonical reference.

```
chapter-tag: Bab 2 · Ketimpangan Ekonomi
subject-chip: Ekonomi

h2.section-title: Kurva Lorenz & Indeks Gini — Penjelasan Lengkap
p.body-text: Kurva Lorenz menggambarkan hubungan antara persentase kumulatif
  penduduk (sumbu horizontal, diurutkan dari yang termiskin) dengan persentase
  kumulatif pendapatan yang mereka terima (sumbu vertikal). Garis diagonal lurus
  dari titik (0,0) ke (100,100) adalah "garis pemerataan sempurna" — kalau
  distribusi pendapatan benar-benar merata, x% penduduk termiskin akan selalu
  menerima persis x% dari total pendapatan. Pada kenyataannya, kurva realitas
  selalu melengkung DI BAWAH garis diagonal ini, karena kelompok termiskin
  selalu menerima porsi pendapatan yang lebih kecil dari porsi jumlah mereka.
  Semakin jauh & semakin melengkung kurva ini dari diagonal, semakin timpang
  distribusi pendapatannya.
p.body-text: Indeks Gini (Gini Ratio) mengubah kelengkungan itu jadi satu angka
  tunggal antara 0 dan 1: Indeks Gini = Luas Area A ÷ (Luas Area A + Luas Area
  B), di mana Area A adalah luas area di antara garis diagonal dan Kurva
  Lorenz, sedangkan Area B adalah luas area di bawah Kurva Lorenz sampai sumbu
  horizontal. Semakin besar Area A relatif terhadap total area di bawah garis
  diagonal, semakin besar Indeks Gini-nya — dan semakin timpang distribusinya.

h2.section-title: Standar Klasifikasi Ketimpangan
ref-table, full text:
  | Indikator / Lembaga | Rentang / Kategori | Tingkat Ketimpangan |
  |---|---|---|
  | Indeks Gini / Rasio Gini | Nilai Gini < 0,30 | Ketimpangan Rendah |
  | Indeks Gini / Rasio Gini | Nilai Gini 0,30 – 0,50 | Ketimpangan Sedang |
  | Indeks Gini / Rasio Gini | Nilai Gini > 0,50 | Ketimpangan Tinggi |
  | Bank Dunia (World Bank) — Porsi 40% Penduduk Termiskin | Porsi Pendapatan
    > 17% | Ketimpangan Rendah |
  | Bank Dunia (World Bank) — Porsi 40% Penduduk Termiskin | Porsi Pendapatan
    12% – 17% | Ketimpangan Sedang |
  | Bank Dunia (World Bank) — Porsi 40% Penduduk Termiskin | Porsi Pendapatan
    < 12% | Ketimpangan Tinggi |

callout.mistake — Kesalahan Umum
❌ Salah: mengira Indeks Gini dan kriteria Bank Dunia harus selalu memberi
  kesimpulan yang sama persis untuk negara yang sama.
✅ Benar: keduanya mengukur aspek yang sedikit berbeda — Indeks Gini melihat
  sebaran pendapatan di SELURUH populasi lewat Kurva Lorenz, sedangkan kriteria
  Bank Dunia fokus khusus ke porsi yang diterima 40% penduduk termiskin saja.
  Keduanya bisa saling melengkapi, dan sesekali memberi kesimpulan yang
  berbeda tanpa berarti salah satu keliru.
```

## Page 8 — Contoh Soal Lanjutan 3: Klasifikasi Ketimpangan Ganda

```
chapter-tag: Bab 2 · Ketimpangan Ekonomi
subject-chip: Ekonomi

h2.section-title: Contoh Soal Lanjutan — Kombinasi Dua Kriteria

example-box — Contoh Soal · Tingkat Lanjut
  Suatu negara memiliki Indeks Gini sebesar 0,42 dan 40% penduduk termiskin
  menikmati 14% dari total pendapatan nasional. Kategorikan tingkat
  ketimpangan negara tersebut berdasarkan kriteria Indeks Gini dan Bank Dunia!
  1. Kriteria Indeks Gini: 0,42 berada di rentang 0,30–0,50 → Ketimpangan
     Sedang.
  2. Kriteria Bank Dunia: porsi 14% berada di rentang 12%–17% → Ketimpangan
     Sedang.
  3. Kesimpulan: kedua kriteria yang berbeda ini konsisten menunjukkan hasil
     yang sama — negara tersebut berada pada tingkat Ketimpangan Sedang.

example-box — Contoh Soal · Tingkat Lanjut (Membaca Tabel Gini Antarwilayah)
  Koefisien Gini beberapa provinsi (dikutip dari bps.go.id, Maret 2020): Kep.
  Bangka Belitung 0,262; DI Yogyakarta 0,434; Jawa Tengah 0,362; Kalimantan
  Utara 0,292; Nusa Tenggara Timur 0,354; Sumatera Barat 0,305. Provinsi mana
  yang punya ketimpangan pendapatan paling rendah?
  1. Ketimpangan paling rendah = nilai Gini paling kecil di antara semua
     provinsi yang dibandingkan.
  2. Bandingkan keenamnya: 0,262 (Bangka Belitung) adalah yang terkecil.
  3. Jawaban: Kepulauan Bangka Belitung, dengan Gini 0,262 — bahkan sudah
     masuk kategori Ketimpangan Rendah (< 0,30), sementara lima provinsi
     lainnya semuanya berada di kategori Sedang (0,30–0,50).
```

## Page 9 — Referensi Lengkap: Kebijakan Fiskal

The HTML keeps a short, light two-card comparison (per the brief: "this is context,
not the chapter's core"). Full mechanism chains for both directions live here.

```
chapter-tag: Bab 2 · Kebijakan Fiskal
subject-chip: Ekonomi

h2.section-title: Kebijakan Fiskal Ekspansif & Kontraktif — Mekanisme Lengkap
p.body-text: Kebijakan fiskal adalah tindakan pemerintah mengatur belanja negara
  (G) dan pajak untuk memengaruhi jalannya perekonomian — dua variabel yang
  keduanya langsung ada dalam rumus Y = C + I + G + (X − M): G masuk langsung
  sebagai komponen penjumlah, sementara pajak memengaruhi Y secara tidak
  langsung lewat daya beli & konsumsi (C) masyarakat.

h2.section-title: Kebijakan Ekspansif ("Menginjak Gas")
p.body-text: Dipakai saat perekonomian sedang lesu atau resesi — pertumbuhan
  PDB melambat, pengangguran naik, daya beli masyarakat lemah. Rantai
  mekanismenya: pemerintah MENAIKKAN belanja negara (G) dan/atau MENURUNKAN
  tarif pajak → uang yang beredar di masyarakat bertambah & beban pajak
  berkurang → daya beli & konsumsi (C) rumah tangga naik → permintaan agregat
  (agregat demand) naik → dunia usaha terdorong memproduksi lebih banyak
  (PDB naik) dan menyerap lebih banyak tenaga kerja.

h2.section-title: Kebijakan Kontraktif ("Menginjak Rem")
p.body-text: Dipakai saat perekonomian terlalu "panas" — inflasi tinggi,
  permintaan melebihi kapasitas produksi. Rantai mekanismenya kebalikan dari
  ekspansif: pemerintah MENURUNKAN belanja negara (G) dan/atau MENAIKKAN tarif
  pajak → uang beredar & daya beli masyarakat berkurang → konsumsi (C) &
  permintaan agregat mereda → tekanan kenaikan harga (inflasi) mulai
  terkendali, meski risikonya pertumbuhan ekonomi ikut melambat dalam jangka
  pendek.

callout.mistake — Kesalahan Umum
❌ Salah: menganggap kebijakan fiskal ekspansif selalu "lebih baik" karena
  sama-sama mendorong PDB naik, dan kontraktif selalu "buruk" karena menekan
  pertumbuhan.
✅ Benar: keduanya alat yang tepat dipakai pada situasi yang berbeda —
  ekspansif tepat saat ekonomi lesu, tapi kalau dipakai saat ekonomi sudah
  panas justru memperparah inflasi. Kontraktif tepat saat inflasi tinggi,
  tapi kalau dipakai saat ekonomi sedang lesu justru memperdalam resesi.
  Pilihan kebijakan tergantung kondisi ekonomi saat itu, bukan mana yang
  "kedengarannya" lebih positif.
```

## Page 10 — Pengayaan: Ekonomi Islam

```
chapter-tag: Bab 2 · Pengayaan
subject-chip: Ekonomi

h2.section-title: Pengayaan: Perspektif Ekonomi Islam (Bukan Materi Inti Ujian)
p.body-text: Ekonomi konvensional mengukur keberhasilan sebuah negara terutama
  lewat angka GDP/GNP — makin tinggi angkanya, makin dianggap makmur. Dalam
  kajian ekonomi Islam, ukuran keberhasilan itu diperluas mencakup pencapaian
  falah (kesejahteraan dunia sekaligus akhirat), bukan semata angka produksi
  atau pendapatan.
p.body-text: Salah satu instrumen khas ekonomi Islam adalah Zakat, Infak,
  Sedekah, dan Wakaf (disingkat ZISWAF) — bentuk redistribusi kekayaan yang
  berjalan di LUAR mekanisme pasar biasa (bukan lewat jual-beli atau upah
  kerja). Dana ZISWAF disalurkan langsung dari pihak yang mampu ke pihak yang
  berhak menerima, dan secara langsung berdampak menaikkan Personal Income
  (PI) kelompok penerima serta mendorong pemerataan kesejahteraan di
  masyarakat — melengkapi mekanisme redistribusi konvensional seperti pajak &
  subsidi yang sudah dibahas di bagian kebijakan fiskal (Halaman 9).
p.body-text: Penting dicatat: ZISWAF bukan pengganti perhitungan GDP/GNP, dan
  bukan bagian dari materi inti UTBK/Ujian Sekolah untuk bab ini — bagian ini
  murni pengayaan wawasan bahwa ada cara pandang lain dalam mengukur
  kesejahteraan sebuah perekonomian selain angka produksi semata.
```

## Page 11 — Glosarium Cepat

Originally combined onto Page 10 with the Pengayaan prose above; split into its
own standalone page after the render measurement below showed the combined
version overflowing `.page-body` by ~95px — same "split rather than cram"
policy as CHAPTER_CONTENT_GUIDE.md §5 prescribes.

```
chapter-tag: Bab 2 · Referensi
subject-chip: Ekonomi

h2.section-title: Glosarium Cepat
p.lead: Semua istilah & singkatan penting bab ini dalam satu halaman, buat
  direview cepat sebelum ujian.
ref-list-2col, full text:
  01. GDP — Total produksi barang/jasa di dalam batas wilayah negara (WNI +
      WNA), dalam satu periode (biasanya 1 tahun).
  02. GNP — Total produksi oleh seluruh warga negara (di dalam + luar negeri).
  03. PDRB — Versi GDP untuk wilayah sub-nasional (provinsi/kabupaten).
  04. NNP — Produk nasional bersih setelah dikurangi penyusutan barang modal.
  05. NNI — Pendapatan bersih nasional berupa balas jasa murni faktor produksi.
  06. PI — Total pendapatan yang benar-benar diterima tiap individu.
  07. DI — Pendapatan siap dibelanjakan/ditabung setelah pajak langsung.
  08. Kurva Lorenz — Grafik hubungan persentase kumulatif penduduk & pendapatan.
  09. Indeks Gini — Angka 0–1 yang meringkas kelengkungan Kurva Lorenz.
  10. Kebijakan Fiskal — Pengaturan belanja negara & pajak oleh pemerintah.
  11. ZISWAF — Zakat, Infak, Sedekah, Wakaf — instrumen redistribusi non-pasar.
```

## Render verification note

Rendered via headless Chromium (Playwright, `deviceScaleFactor:1.5`, element
screenshots of each `.pdf-page`) and every page's `.page-body` `scrollHeight`
vs `clientHeight` was measured programmatically (not estimated) — the only
overflow found was the original combined Page 10 (95px over), fixed by the
split above. All 11 pages measured `scrollHeight === clientHeight` (zero
overflow) after the split, and each rendered PNG was read top-to-bottom to
confirm no visual clipping.
