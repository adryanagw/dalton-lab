# PDF Companion Spec — Bab 1 Sejarah: Kolonialisme & Imperialisme Barat di Nusantara

Curated content for the PDF companion, built on `public/assets/pdf-template/page-template.html`
(`.pdf-page[data-subject="sejarah"]`). Sejarah has no established `--accent` yet in
CHAPTER_CONTENT_GUIDE.md §5 — this chapter introduces `#b3392c` (a deep vintage-map red,
distinct from the site's `--danger`/`#e2574c` used inside mistake callouts), matching
`subjectsData.sejarah.color:'red'` already wired into `app.js`/sidebar by the user. Flagged
for the web-shell session to add to the guide's accent table once confirmed.

Sejarah stays prose-first like Biologi/Ekonomi — no LaTeX anywhere in this chapter's PDF
(no formulas exist in this topic). Every page is self-contained — it must not depend on
content that lives only in `bab1-kolonialisme-imperialisme.html`.

This spec matches the actual rendered PDF in `bab1-kolonialisme-imperialisme.pdf-pages.html`
exactly — same headings, same content, same page boundaries. 12 pages: 1 chapter-opener +
11 content pages.

## Page 1 — Chapter opener

```
chapter-tag: Bab 1
subject-chip: Sejarah
h1.page-title: Kolonialisme & Imperialisme Barat di Nusantara
p.dek: Materi PDF — pelengkap Bab 1
p.lead: Materi tambahan ini fokus ke kronologi lengkap, referensi tokoh/rute,
  dan detail tambahan yang tidak muat di halaman utama — pelengkap materi
  interaktif di halaman utama, bukan salinannya.
h2.section-title: Yang akan kamu pelajari
ul.learn-list:
  - Kronologi lengkap 1453–1904: setiap peristiwa kunci berurutan dengan
    dampaknya, dari jatuhnya Konstantinopel sampai Perang Aceh
  - Referensi cepat semua tokoh & tahun penjelajahan samudra (Portugis,
    Spanyol, Belanda, Inggris) dalam satu tabel
  - Perbandingan detail Perjanjian Tordesillas & Saragosa: pihak, isi,
    garis pembagian
  - Hak Octrooi & kebijakan eksploitasi VOC dijelaskan lebih dalam,
    plus runtutan sebab-akibat lengkap keruntuhan VOC 1799
  - Perbandingan lengkap Daendels vs Raffles dalam satu tabel referensi
  - Konteks & elaborasi penuh Politik Pintu Terbuka 1870 (Multatuli,
    UU Agraria, UU Gula)
  - Kronologi & tokoh lengkap perlawanan bangsa Indonesia (Perang Padri,
    Perang Diponegoro, Perjanjian Bongaya, Perang Aceh)
  - Dampak kolonialisme dijabarkan penuh per bidang (politik, ekonomi,
    sosial-budaya) dengan contoh konkret
  - Studi kasus menganalisis sumber sejarah + latihan tambahan
```

## Page 2 — Kronologi Peristiwa Penting (1453–1602)

Full chronological events table from the source monograph, part 1 of 2 (split
across two pages per CHAPTER_CONTENT_GUIDE.md §5's overflow warning — 20 rows total
with full description text does not fit legibly on one page). This is the
canonical home for the timeline; the HTML lesson only mentions it briefly in
the closing "Dampak" section and points here.

| Tahun | Peristiwa Kunci | Deskripsi Sejarah & Dampak Utama |
|---|---|---|
| 1453 | Jatuhnya Konstantinopel | Turki Usmani menaklukkan Bizantium; menutup akses rempah Laut Tengah. |
| 1488 | Ekspedisi Bartolomeu Dias | Pelaut Portugis pertama yang berhasil mengitari Tanjung Harapan Afrika. |
| 1492 | Pendaratan Columbus | Christopher Columbus mendarat di Kepulauan Salvador (Amerika). |
| 1494 | Perjanjian Tordesillas | Pembagian garis eksplorasi bumi antara Spanyol (Barat) dan Portugis (Timur). |
| 1498 | Vasco da Gama Tiba di India | Rute laut Portugis menembus Calicut untuk perdagangan rempah. |
| 1511 | Jatuhnya Malaka ke Portugis | Afonso de Albuquerque menaklukkan Selat Malaka pada 10 Agustus 1511. |
| 1512 | Portugis Tiba di Maluku | Ekspedisi Francisco Serrão berlabuh di Ternate dan Kepulauan Banda. |
| 1521 | Spanyol Tiba di Tidore | Armada Magelhaens & Del Cano mendarat di Tidore, Maluku. |
| 1529 | Perjanjian Saragosa | Spanyol keluar dari Maluku ke Filipina; Portugis menguasai monopoli Maluku. |
| 1596 | Pendaratan Belanda di Banten | Ekspedisi pertama Belanda dipimpin Cornelis de Houtman tiba di Banten. |
| 1599 | Ekspedisi Jacob van Neck | Armada Belanda berhasil mengangkut muatan rempah-rempah masif dari Maluku. |
| 1602 | Pembentukan VOC | VOC didirikan dengan Hak Octrooi monopoli perdagangan di Asia. |

Renders as one `.ref-table` (Tahun/Peristiwa/Deskripsi columns). Replaces: nothing
removed from HTML (the HTML never had the full 20-row table — this is genuinely
PDF-only reference content per the Sejarah subject rule "use it for a real
sequence, not a dumping ground").

## Page 3 — Kronologi Peristiwa Penting (1667–1904)

Part 2 of 2.

| Tahun | Peristiwa Kunci | Deskripsi Sejarah & Dampak Utama |
|---|---|---|
| 1667 | Perjanjian Bongaya | Sultan Hasanuddin (Gowa) dipaksa menandatangani perjanjian monopoli VOC. |
| 1799 | VOC Resmi Dibubarkan | VOC dinyatakan bangkrut (31 Des); aset diambil alih Pemerintah Belanda. |
| 1808–1811 | Pemerintahan Daendels | Pembangunan Jalan Raya Pos Anyer–Panarukan 1.000 km dengan rodi. |
| 1811 | Kapitulasi Tuntang | Belanda menyerahkan kekuasaan Jawa kepada Inggris (T.S. Raffles). |
| 1816 | Konvensi London | Inggris mengembalikan wilayah Nusantara kepada pemerintah Hindia Belanda. |
| 1821–1837 | Perang Padri | Perlawanan rakyat Minangkabau dipimpin Tuanku Imam Bonjol melawan Belanda. |
| 1825–1830 | Perang Jawa / Diponegoro | Perlawanan besar Pangeran Diponegoro yang menguras kas kolonial Belanda. |
| 1830 | Sistem Tanam Paksa | Van den Bosch memberlakukan Cultuurstelsel untuk mengisi kas Belanda. |
| 1870 | Politik Pintu Terbuka | Penerbitan UU Agraria & UU Gula 1870 mengawali kapitalisme swasta. |
| 1873–1904 | Perang Aceh | Perlawanan gerilya rakyat Aceh dipimpin Teuku Umar & Cut Nyak Dien. |

Callout mistake: students often think VOC's founding (1602) and its collapse
(1799) bookend the *entire* colonial period — in fact Daendels/Raffles (1808–1816)
and the whole 1821–1904 resistance-war era happened entirely *after* VOC was
already gone, under direct Dutch state rule, not VOC rule.

## Page 4 — Referensi Cepat: Tokoh & Rute Penjelajahan Samudra

All four nations' explorers/routes/years/achievements in one table — the HTML's
role-cards show this broken into 4 separate cards; this page is the single-glance
cross-reference version, genuine PDF-only value (a quick-lookup format the
interactive cards never show all at once).

| Tokoh | Bangsa | Tahun | Capaian |
|---|---|---|---|
| Bartolomeu Dias | Portugis | 1488 | Mencapai Tanjung Harapan (ujung selatan Afrika) |
| Vasco da Gama | Portugis | 1498 | Menembus Calicut, India |
| Afonso de Albuquerque | Portugis | 1511 | Menaklukkan Selat Malaka |
| Francisco Serrão | Portugis | 1512 | Tiba di Ternate & Kepulauan Banda, Maluku |
| Christopher Columbus | Spanyol | 1492 | Mendarat di Kepulauan Salvador, Amerika |
| Ferdinand Magelhaens & Juan Sebastian del Cano | Spanyol | 1519–1521 | Mengelilingi dunia lewat Pasifik, mendarat di Tidore |
| Cornelis de Houtman | Belanda | 1596 | Mendarat di Banten via Selat Sunda |
| Jacob van Neck | Belanda | 1598–1599 | Meraih untung besar dari rempah Maluku |
| Sir Henry Middleton | Inggris | 1604 | Mencapai Sumatra, Banten, dan Ambon |

Callout mistake: siswa sering mengira Columbus dan Magelhaens/Del Cano adalah
ekspedisi yang sama karena keduanya "orang Spanyol yang menyeberangi Atlantik" —
padahal Columbus (1492) tidak pernah sampai Asia (ia mendarat di Amerika dan
meninggal masih percaya itu Hindia), sedangkan Magelhaens/Del Cano (1519–1521)
yang benar-benar meneruskan perjalanan lewat Pasifik hingga tiba di Maluku.

## Page 5 — Perjanjian Tordesillas & Saragosa: Detail Lengkap

Elaborated prose beyond the HTML's two-card summary — full context on why a
Papal treaty could bind two Catholic kingdoms, and the exact geographic logic
of the meridian lines.

```
p.lead: Dua perjanjian ini sering dianggap "satu peristiwa" karena sama-sama
  soal pembagian dunia — padahal terpisah 35 tahun dan menyelesaikan masalah
  yang berbeda.

h2.section-title: Tordesillas (1494) — Membagi Dunia di Atas Kertas
p.body-text: Pada akhir abad ke-15, Spanyol dan Portugis sama-sama berlomba
  mencari jalur laut ke Dunia Timur lewat arah berlawanan — Portugis ke timur
  (mengitari Afrika), Spanyol ke barat (menyeberangi Atlantik). Karena
  keduanya kerajaan Katolik, Paus Alexander VI (yang punya otoritas moral
  atas negara-negara Katolik saat itu) diminta menengahi sebelum konflik
  militer pecah. Solusinya: menarik garis meridian bayangan di 46° Bujur
  Barat, sekitar 370 mil laut sebelah barat Kepulauan Tanjung Verde.
  Wilayah di barat garis itu jadi milik Spanyol, wilayah di timurnya jadi
  milik Portugis — pembagian yang murni teoritis karena saat itu belum ada
  yang tahu persis seberapa jauh dunia di sisi lain garis itu.

h2.section-title: Saragosa (1529) — Menyelesaikan Sengketa Nyata
p.body-text: Masalah Tordesillas: garis itu hanya ditarik di satu sisi bumi.
  Begitu kedua bangsa terus berlayar dan akhirnya bertemu dari arah
  berlawanan di ujung dunia yang lain (Maluku), tidak jelas siapa yang
  berhak di sana. Ketika Spanyol mendarat di Tidore (1521) sementara
  Portugis sudah lebih dulu berkuasa di Ternate — dua pulau kecil yang
  saling berdekatan — konflik kepentingan pun pecah. Perjanjian Saragosa
  (1529) menarik garis meridian kedua di sisi timur bumi, dengan hasil:
  Spanyol harus mundur dan memfokuskan wilayahnya di Filipina, sementara
  Portugis memperoleh monopoli penuh atas perdagangan rempah Maluku.

callout.mistake:
  wrong: menganggap Tordesillas dan Saragosa adalah perjanjian yang sama,
    atau mengira keduanya ditandatangani di tahun yang sama.
  right: Tordesillas (1494) adalah pembagian awal yang bersifat preventif,
    sebelum kedua bangsa benar-benar bertemu. Saragosa (1529), 35 tahun
    kemudian, adalah penyelesaian sengketa nyata setelah keduanya benar-benar
    berebut wilayah yang sama di Maluku.
```

## Page 6 — VOC: Hak Octrooi & Kebijakan Eksploitasi, Detail Lengkap

Deeper elaboration of each hak octrooi/exploitative policy beyond the HTML's
short organel-card blurbs — full paragraph per item, with concrete
consequences named.

```
h2.section-title: Enam Hak Octrooi VOC, Satu per Satu
p.body-text: Monopoli perdagangan berarti VOC adalah satu-satunya pihak yang
  boleh berdagang rempah di wilayah kekuasaannya — pedagang lain (termasuk
  pedagang pribumi) yang mencoba berdagang langsung dianggap penyelundup.
  Hak merekrut tentara dan membangun benteng memberi VOC kekuatan militer
  sendiri tanpa harus bergantung pada tentara kerajaan Belanda. Hak
  memaklumkan perang berarti VOC bisa menyerang kerajaan lokal atas
  keputusannya sendiri, tanpa perlu izin dari Belanda. Hak mencetak uang
  membuat VOC punya sistem ekonomi tertutup di wilayahnya. Hak mengangkat
  pegawai (termasuk gubernur jenderal) berarti VOC mengatur pemerintahan
  wilayah kekuasaannya sendiri, nyaris seperti negara di dalam negara.

h2.section-title: Empat Kebijakan Eksploitasi, Detail Lengkap
p.body-text: Contingenten dan Verplichte Leverantie sering tertukar karena
  sama-sama soal penyerahan hasil bumi — bedanya, Contingenten adalah pajak
  (rakyat tidak dibayar sama sekali), sedangkan Verplichte Leverantie tetap
  "dibayar" tapi dengan harga yang ditetapkan sepihak oleh VOC, jauh di
  bawah harga pasar wajar — secara praktik hasilnya sama-sama merugikan
  rakyat. Ekstirpasi terdengar aneh (menebang tanaman sendiri?) tapi
  logikanya adalah kelangkaan buatan: VOC sengaja membatasi jumlah pohon
  rempah yang boleh tumbuh supaya harga di pasar dunia tidak jatuh akibat
  kelebihan pasokan — kebijakan ini paling merugikan petani di daerah yang
  produksinya "terlalu subur". Pelayaran Hongi adalah alat penegakannya:
  patroli kora-kora bersenjata yang menghancurkan kebun rempah ilegal dan
  menghukum siapa pun yang menjual rempah di luar jalur VOC.

callout.mistake:
  wrong: mengira Ekstirpasi berarti VOC menambah produksi rempah
    sebanyak-banyaknya untuk keuntungan maksimal.
  right: justru sebaliknya — Ekstirpasi adalah pembatasan produksi
    (menebang kelebihan pohon) demi menjaga harga tinggi lewat kelangkaan
    buatan. Prinsip dagang VOC bukan "produksi sebanyak mungkin", tapi
    "produksi secukupnya untuk harga setinggi mungkin".
```

## Page 7 — Runtutan Sebab-Akibat: Kenapa VOC Bangkrut?

An "extra worked example" for history — not a calculation, but a full
step-by-step causal chain walkthrough, the historical equivalent of a
multi-step exam problem.

```
h2.section-title: Membedah Keruntuhan VOC 1799 Langkah demi Langkah
example-box label: Analisis Sebab-Akibat
ol:
  1. Korupsi struktural: pejabat VOC di semua level (dari pegawai
     rendahan sampai gubernur jenderal) terbiasa mengambil keuntungan
     pribadi dari perdagangan yang seharusnya masuk kas perusahaan —
     praktik ini berlangsung puluhan tahun tanpa pengawasan efektif dari
     Belanda yang jauh di Eropa.
  2. Beban militer yang terus membengkak: menjaga monopoli lewat Pelayaran
     Hongi, membangun & mempertahankan benteng di banyak titik, plus
     perang melawan kerajaan-kerajaan lokal yang melawan monopoli (mis.
     Gowa hingga Perjanjian Bongaya 1667) menghabiskan biaya jauh lebih
     besar dari yang direncanakan.
  3. Persaingan dagang internasional yang makin sengit: EIC (Inggris)
     dan pedagang-pedagang Eropa lain mulai merebut jalur & pasar yang
     dulunya dikuasai VOC sendirian, mengikis pendapatan yang tersisa.
  4. Ketiga tekanan itu bertumpuk bersamaan pada akhir abad ke-18: kas
     yang sudah tergerus korupsi tidak punya cadangan untuk menutup biaya
     perang yang membengkak, sementara pendapatan dari monopoli terus
     menyusut akibat persaingan — VOC dinyatakan bangkrut secara resmi
     pada 31 Desember 1799, dan seluruh asetnya diambil alih pemerintah
     Belanda.

callout.mistake:
  wrong: mengira VOC bangkrut karena diserang dan dikalahkan secara
    militer oleh Inggris atau kerajaan lokal.
  right: keruntuhan VOC murni finansial/internal (korupsi + biaya perang
    + persaingan dagang) — bukan kekalahan perang tunggal. VOC tidak
    pernah ditaklukkan secara militer; ia dibubarkan karena bangkrut.
```

## Page 8 — Referensi: Daendels vs Raffles

Full side-by-side reference table, the single-glance version of the HTML's
two compare-cards.

| Aspek | Daendels (1808–1811) | Raffles (1811–1816) |
|---|---|---|
| Mewakili | Republik Bataaf (Prancis) | Inggris |
| Latar belakang berkuasa | Diutus mempertahankan Jawa dari ancaman Inggris | Menang lewat Kapitulasi Tuntang 1811 |
| Kebijakan tanah/kerja | Kerja rodi (kerja paksa tanpa upah layak) | Landrent System (sewa tanah, semua tanah milik pemerintah) |
| Warisan utama | Jalan Raya Pos Anyer–Panarukan (±1.000 km) | Buku *History of Java*; penghapusan kerja rodi & penyerahan wajib |
| Akhir masa jabatan | Ditarik kembali ke Eropa (1811) | Konvensi London 1816 mengembalikan Nusantara ke Belanda |

Callout mistake: mengira Daendels dan Raffles memerintah dalam urutan
terbalik, atau mengira keduanya sama-sama menerapkan kerja rodi. Urutannya
Daendels dulu (1808–1811, kerja rodi), baru Raffles (1811–1816, justru
menghapus kerja rodi) — dua kebijakan yang berlawanan arah, bukan sama.

## Page 9 — Politik Pintu Terbuka: Konteks & Elaborasi Penuh

Beyond the HTML's one-paragraph summary — full context on the liberal
critique movement and what the two 1870 laws actually enabled.

```
h2.section-title: Dari Kritik Sastra ke Perubahan Kebijakan
p.body-text: Kecurangan Tanam Paksa bukan cuma dikritik oleh rakyat yang
  menderita langsung, tapi juga oleh kalangan liberal Belanda sendiri —
  sebuah gerakan yang justru berasal dari dalam negara penjajah. Eduard
  Douwes Dekker, mantan pejabat kolonial yang pernah bertugas di Lebak,
  menulis novel *Max Havelaar* (1860) dengan nama pena Multatuli (bahasa
  Latin, "aku telah banyak menderita") — mengisahkan penderitaan petani
  Lebak akibat penyelewengan pejabat pribumi & Belanda dalam Tanam Paksa.
  Baron van Hoevell menyuarakan kritik serupa lewat jalur politik di
  parlemen Belanda. Tekanan opini publik inilah yang akhirnya membuat
  parlemen Belanda menghapus Cultuurstelsel secara bertahap.

h2.section-title: Apa yang Sebenarnya Diubah UU Agraria & UU Gula 1870?
p.body-text: UU Agraria (Agrarische Wet) 1870 mengatur bahwa tanah di Hindia
  Belanda dibedakan menjadi tanah milik rakyat (tidak boleh dijual ke asing,
  hanya boleh disewa) dan tanah negara (bisa disewakan jangka panjang ke
  swasta, hingga 75 tahun). UU Gula (Suiker Wet) 1870 secara khusus
  mengakhiri monopoli negara atas industri gula dan membuka jalan bagi
  perusahaan swasta mengelola pabrik gula sendiri. Bersama-sama, kedua UU
  ini membuka babak baru: modal swasta asing (Belanda, Inggris, Amerika)
  berbondong-bondong menyewa tanah dan mendirikan perkebunan besar (kopi,
  teh, tembakau, tebu, karet) serta tambang — era ini disebut Politik
  Pintu Terbuka atau Liberalisme Kolonial.

callout.mistake:
  wrong: mengira Politik Pintu Terbuka berarti kolonialisme berakhir atau
    rakyat pribumi jadi lebih sejahtera.
  right: Politik Pintu Terbuka hanya mengganti pelaku eksploitasi dari
    negara (lewat Cultuurstelsel) menjadi swasta (lewat sewa tanah &
    perkebunan) — rakyat pribumi tetap tidak memiliki kendali atas tanah
    & hasil produksinya sendiri.
```

## Page 10 — Perlawanan Bangsa Indonesia: Kronologi & Tokoh Lengkap

Full detail on the resistance wars only briefly named in the HTML's closing
"Dampak" section.

| Perlawanan | Tahun | Tokoh Utama | Konteks Singkat |
|---|---|---|---|
| Perjanjian Bongaya | 1667 | Sultan Hasanuddin (Gowa) | Sultan Hasanuddin dipaksa menandatangani perjanjian yang memberi VOC monopoli dagang di kawasan timur Nusantara, mengakhiri perlawanan Gowa terhadap VOC. |
| Perang Padri | 1821–1837 | Tuanku Imam Bonjol | Awalnya konflik internal Minangkabau soal adat vs syariat, berkembang jadi perlawanan bersama melawan campur tangan Belanda. |
| Perang Jawa (Diponegoro) | 1825–1830 | Pangeran Diponegoro | Perlawanan besar yang dipicu ketidakpuasan bangsawan & rakyat Jawa terhadap kebijakan kolonial; biayanya menguras kas Belanda hingga memicu Tanam Paksa. |
| Perang Aceh | 1873–1904 | Teuku Umar, Cut Nyak Dien | Perlawanan gerilya berkepanjangan rakyat Aceh, salah satu perang kolonial terlama & termahal bagi Belanda di Nusantara. |

Replaces: the HTML's `#dampak` section only names these four in one sentence
each and points here for full detail — this table is the canonical reference.

## Page 11 — Dampak Kolonialisme, Dijabarkan Penuh

Full elaboration per category beyond the HTML's three short paragraphs.

```
h2.section-title: Bidang Politik — Lebih dari Sekadar "Kalah Perang"
p.body-text: Politik adu domba (devide et impera) bekerja dengan sengaja
  memecah aliansi antar-kerajaan lokal — VOC/Belanda secara aktif membantu
  satu pihak dalam konflik suksesi atau perang saudara, dengan imbalan hak
  dagang eksklusif setelah pihak itu menang. Contohnya konflik yang berujung
  Perjanjian Bongaya (1667): VOC membantu Arung Palakka (Bone) melawan Gowa,
  lalu mendapat monopoli dagang sebagai imbalannya. Efek jangka panjangnya:
  raja/adipati lokal yang dulunya berdaulat penuh berubah jadi pegawai
  bergaji dalam struktur birokrasi kolonial terpusat — kehilangan kedaulatan
  politik meski gelarnya tetap dipertahankan secara simbolis.

h2.section-title: Bidang Ekonomi — Untung Rugi yang Tidak Seimbang
p.body-text: Eksploitasi SDA (rempah, gula, kopi, karet, hasil tambang)
  mengalir keluar Nusantara tanpa nilai tambah yang kembali ke rakyat.
  Pedagang pribumi merosot karena monopoli VOC/pemerintah kolonial menutup
  akses mereka ke pasar internasional. Tanam Paksa & kerja rodi membebani
  rakyat dengan kerja tanpa upah layak. Namun infrastruktur yang dibangun
  untuk kepentingan kolonial (rel kereta api untuk mengangkut hasil
  perkebunan ke pelabuhan, pelabuhan itu sendiri, jalan raya) tetap menjadi
  aset yang dipakai Indonesia modern — dampak yang tidak disengaja tapi
  nyata.

h2.section-title: Bidang Sosial & Budaya — Struktur yang Bertahan Lama
p.body-text: Kolonial menciptakan pelapisan sosial tiga tingkat: Eropa di
  puncak, Timur Asing (Tionghoa, Arab, India) di tengah, Pribumi di bawah —
  struktur ini menentukan hak hukum & akses ekonomi seseorang murni
  berdasarkan asal-usul, bukan kemampuan. Ironisnya, pendidikan modern yang
  dibangun kolonial untuk mencetak pegawai administrasi tingkat rendah
  justru melahirkan golongan terpelajar yang kelak memimpin kesadaran
  kebangsaan Indonesia — dampak yang berbalik melawan tujuan awalnya sendiri.
```

## Page 12 — Studi Kasus & Latihan Tambahan

```
h2.section-title: Studi Kasus — Mengidentifikasi Era dari Sebuah Skenario
example-box label: Latihan Analisis Sumber
p.setup: Sebuah catatan sejarah menyebutkan: "Petani di suatu daerah wajib
  menanam tebu di lebih dari separuh lahannya, tidak menerima pembebasan
  pajak tanah yang dijanjikan, dan kegagalan panen tahun itu sepenuhnya
  ditanggung sendiri oleh petani tanpa bantuan pemerintah." Era apa yang
  digambarkan, dan bagaimana kamu tahu?
ol:
  1. Kata kunci "wajib menanam" dan "kegagalan panen ditanggung petani
     sendiri" menunjuk pada Cultuurstelsel/Tanam Paksa (1830–1870) — bukan
     era VOC (yang memakai Contingenten/Verplichte Leverantie, bukan
     "wajib tanam" berbasis lahan) dan bukan era Raffles (yang justru
     menghapus penyerahan wajib).
  2. Detail "lebih dari separuh lahan" dan "tidak menerima pembebasan pajak
     yang dijanjikan" adalah ciri khas penyimpangan realita, bukan aturan
     resmi Staatblad 1834 No. 22 (yang menjanjikan hanya 1/5 lahan dan
     pembebasan pajak) — jadi skenario ini menggambarkan praktik di
     lapangan, bukan aturan di atas kertas.
  3. Kesimpulan: skenario ini adalah contoh nyata penyimpangan Cultuurstelsel
     yang dijelaskan di halaman utama & Halaman 9 PDF ini — persis jenis
     soal yang sering muncul di ujian (memberi skenario, meminta identifikasi
     era + aturan resmi vs realita).

callout.mistake:
  wrong: menjawab "VOC" untuk skenario apa pun yang menyebut "wajib
    menyerahkan hasil bumi", tanpa memperhatikan detail spesifik kebijakan.
  right: cek detail spesifiknya — Contingenten/Verplichte Leverantie (VOC)
    berbasis komoditas & harga sepihak, sedangkan Cultuurstelsel berbasis
    persentase lahan (1/5 resmi) dengan pembebasan pajak yang dijanjikan.
    Detail itulah yang membedakan era mana yang sedang digambarkan.

h2.section-title: Latihan Tambahan
ref-list:
  1. Sebutkan tiga faktor pendorong penjelajahan samudra Eropa selain
     jatuhnya Konstantinopel, dan jelaskan bagaimana ketiganya saling
     berkaitan.
  2. Jelaskan kenapa Perjanjian Saragosa diperlukan meski Perjanjian
     Tordesillas sudah ada 35 tahun sebelumnya.
  3. Sebutkan dua perbedaan utama antara Contingenten dan Verplichte
     Leverantie.
  4. Mengapa VOC yang punya hak octrooi seluas itu tetap bisa bangkrut?
     Sebutkan tiga sebab utamanya secara berurutan.
  5. Bandingkan kebijakan tanah/kerja Daendels dan Raffles — sebutkan satu
     persamaan periode dan satu perbedaan kebijakan.
  6. Sebutkan tiga aturan resmi Cultuurstelsel (Staatblad 1834 No. 22) dan
     jelaskan penyimpangannya masing-masing di lapangan.
```
