# PDF Companion Spec — Bab 4 Kimia: Ikatan Kimia Dasar

Curated content for the PDF companion, built on `public/assets/pdf-template/page-template.html`
(`.pdf-page[data-subject="kimia"]`). Not an export of the HTML page — per
CHAPTER_CONTENT_GUIDE.md §5, this is where the dense reference tables (transition-metal
cations, anion list — not shown as tables anywhere on the HTML page), the 3 worked examples
from the source module not reproduced on the HTML page (NH4+ coordinate bond, H2O-vs-CCl4
polarity restated in more depth is already on HTML so instead the IUPAC naming-5-compounds
drill, plus a from-scratch Lewis structure for CO2/N2/NH4+), and the full octet-deviation
worked breakdowns (NO/NO2, SF6/XeF4) live in full, elaborated form.

**Accent color:** `--accent:#e2447e`, reusing the value already decided for Kimia in
`bab1-hakikat-kimia-hijau-k3lab.pdf-spec.md` / `bab3-struktur-atom-sistem-periodik.pdf-spec.md`
(matches the site's `--pink` CSS variable / `subjectsData.kimia.color`). Not re-decided here.

**LaTeX/mhchem use:** this chapter is the most notation-dense Kimia chapter yet — chemical
formulas, ion charges, full reactions, and electron configurations appear throughout. Every
formula/ion/config is typeset with KaTeX + the mhchem extension (`\(\ce{...}\)`), never as raw
Unicode super/subscript characters — matching the fix already applied across bab1-bab3.

**Sourcing note on the two reference tables (Page 3):** the transition-metal cation table and
the anion table are pulled from `bab4-ikatan-kimia-dasar-tata-nama-ionik-source.pdf` —
**text/table content only**, per the task's explicit instruction (a dense supplementary
reference PDF, not used for any image). Both tables are abridged from the source's much longer
full lists (28 transition-metal-cation rows, ~35 anion rows) down to the most exam-relevant
subset — common SMA-exam metals (Fe, Cu, Cr, Mn, Sn, Pb, Ag, Hg) and the most common anion
families (halida, kalkogenida, oksianion belerang/nitrogen/fosfor/halogen, hidroksida,
poliatomik umum) — not every row, since the full ~28+35-row tables would run several dense
pages on their own and most of those metals (Sc, Ti, V, Zr, Pt, Au, Bi, Cd) rarely appear in SMA
exam questions. The "criss-cross method" worked table (page 5-6 of the source) is reproduced in
full as Page 4's worked example instead of a dumped table, since it's inherently a worked
process, not a static reference list.

10 pages: 1 chapter-opener + 9 content pages. Pages 3 (kation/anion reference), 5 (NH4+
coordinate bond / IUPAC-5-drill), and 7 (lembar rumus cepat / rekap kesalahan) as originally
planned each measured taller than one physical page once actually rendered (`.page-body`
`scrollHeight > clientHeight`, checked via headless Chromium per CHAPTER_CONTENT_GUIDE.md §5) —
each was split into two pages (3a/3b, 5a/5b, 7a/7b) rather than compressed further, per the
guide's "when in doubt, split" rule. The section-by-section breakdown below reflects the final
10-page structure; the actual `.pdf-pages.html` is the source of truth for exact page
boundaries.

## Page 1 — Chapter opener

```
chapter-tag: Bab 4
subject-chip: Kimia
h1.page-title: Ikatan Kimia Dasar
p.dek: Materi PDF — pelengkap Bab 4
p.lead: Materi tambahan ini fokus ke dua tabel referensi tata nama ionik yang tidak ada di
  halaman utama (kation logam transisi & anion poliatomik), tiga latihan soal terpandu
  tambahan (struktur Lewis CO2/N2/NH4+, ikatan koordinasi NH4+ dari NH3+H+, dan tata nama
  IUPAC 5 senyawa sekaligus), analisis lengkap penyimpangan oktet untuk NO/NO2 dan SF6/XeF4,
  plus rekap kesalahan umum di tiap sub-topik — pelengkap materi & diagram interaktif di
  halaman utama, bukan salinannya.
h2.section-title: Yang akan kamu pelajari
ul.learn-list:
  - Struktur Lewis lengkap untuk CO2, N2, dan ion NH4+ (dengan ikatan kovalen koordinasi) —
    disebutkan tapi tidak digambar penuh di halaman utama
  - Tabel referensi kation logam transisi paling sering diuji (Fe, Cu, Cr, Mn, Sn, Pb, Ag, Hg)
    lengkap dengan nama Stock/IUPAC dan nama Latin tradisionalnya
  - Tabel referensi anion umum (halida, kalkogenida, oksianion belerang/nitrogen/fosfor/
    halogen, hidroksida, dan beberapa poliatomik penting)
  - Latihan soal terpandu: metode silang muatan (criss-cross method) untuk 4 senyawa ionik
    sekaligus
  - Latihan soal terpandu: ikatan kovalen koordinasi NH4+ dari reaksi NH3 dengan H+
  - Latihan soal terpandu: tata nama IUPAC untuk 5 senyawa sekaligus (ionik & kovalen campur)
  - Analisis lengkap penyimpangan oktet pada NO, NO2 (elektron ganjil) dan SF6, XeF4 (oktet
    diperluas)
  - Rekap kesalahan umum siswa di tiap sub-topik bab ini
```

## Page 2 — Latihan Terpandu: Struktur Lewis CO2, N2 & Ion NH4+

The HTML page's worked table only covers CH4/H2O/NH3 directly; this page completes the other 3
rows of the source module's full 6-molecule table (CO2, N2, NH4+) that the HTML page only
mentions by name.

```
chapter-tag: Bab 4 · Latihan Terpandu
subject-chip: Kimia

h2.section-title: Latihan Terpandu: Struktur Lewis CO2, N2 & Ion NH4+
p.lead: Halaman utama menuntaskan CH4, H2O, dan NH3 secara penuh — di sini giliran 3 spesi
  yang lebih menantang: satu dengan ikatan rangkap dua, satu dengan ikatan rangkap tiga, dan
  satu ion dengan ikatan kovalen koordinasi.

table.ref-table (caption: Struktur Lewis CO2, N2, dan NH4+)
| Molekul/Ion | Total e⁻ Valensi | PEI / PEB | Keterangan |
| Karbon Dioksida CO2 | 4 (C) + 2×6 (O) = 16 | 4 PEI (2 ikatan rangkap 2), 4 PEB (di O) | O=C=O — atom C dan kedua O masing-masing dikelilingi 8 e⁻ (oktet sempurna) |
| Gas Nitrogen N2 | 2×5 (N) = 10 | 3 PEI (rangkap 3), 2 PEB (1 di tiap N) | N≡N — kedua atom N berbagi 3 pasang e⁻ sehingga masing-masing mencapai 8 e⁻ |
| Ion Amonium NH4+ | 5 (N) + 4×1 (H) − 1 (muatan +1) = 8 | 3 PEI biasa + 1 PEI koordinasi | Atom N mendonasikan PEB-nya ke H+ membentuk ikatan kovalen koordinasi |

div.example-box (label: Cara Menghitung Total e⁻ Valensi Ion NH4+)
p.setup: Kenapa NH4+ dihitung 5 + 4×1 − 1, bukan + 1?
ol:
  - Jumlahkan dulu elektron valensi tiap atom netral: N = 5, tiap H = 1 (×4 atom) = 4. Total
    sementara = 5 + 4 = 9.
  - Karena NH4+ adalah KATION (muatan +1), KURANGI 1 elektron dari total (kation berarti
    kekurangan elektron dibanding atom netralnya): 9 − 1 = 8.
  - Aturan umum: untuk ANION, TAMBAHKAN elektron sejumlah muatannya. Untuk KATION, KURANGI
    elektron sejumlah muatannya — arahnya gampang tertukar kalau tidak hati-hati.

callout.mistake — Kesalahan Umum
❌ Salah: menambahkan elektron untuk ion NH4+ karena melihat ada tanda "+" tanpa memperhatikan
  bahwa tanda ini artinya KATION (kekurangan elektron), bukan ANION.
✅ Benar: tanda muatan pada rumus ion (+/−) menunjukkan KELEBIHAN atau KEKURANGAN elektron
  dibanding jumlah proton — kation (+) berarti KURANGI elektron, anion (−) berarti TAMBAHKAN
  elektron, saat menghitung total elektron valensi.
```

## Page 3 — Referensi: Kation Logam Transisi & Anion Umum

Both tables sourced from `bab4-ikatan-kimia-dasar-tata-nama-ionik-source.pdf` (see sourcing
note above) — not present as tables anywhere on the HTML page, which only names a handful of
inline examples (FeCl2/FeCl3, Cu2O/CuO) without the full Latin-name/valence reference.

```
chapter-tag: Bab 4 · Referensi Tambahan
subject-chip: Kimia

h2.section-title: Referensi: Kation Logam Transisi & Anion Umum
p.lead: Delapan logam transisi paling sering diuji di SMA, lengkap dengan nama Stock (IUPAC)
  dan nama Latin tradisionalnya — plus daftar anion umum yang paling sering muncul di soal
  tata nama & rumus kimia.

table.ref-table (caption: Kation Logam Transisi Paling Sering Diuji)
| Unsur | Rumus Kation | Nama Stock (IUPAC) | Nama Latin/Tradisional | Contoh Senyawa |
| Besi (Fe) | Fe²⁺ | Besi(II) | Fero (Ferrous) | FeSO4, FeCl2 |
| Besi (Fe) | Fe³⁺ | Besi(III) | Feri (Ferric) | FeCl3, Fe2(SO4)3 |
| Tembaga (Cu) | Cu⁺ | Tembaga(I) | Kupro (Cuprous) | Cu2O, CuCl |
| Tembaga (Cu) | Cu²⁺ | Tembaga(II) | Kupri (Cupric) | CuSO4, CuO (Terusi) |
| Kromium (Cr) | Cr³⁺ | Kromium(III) | Kromi | Cr2O3, CrCl3 |
| Mangan (Mn) | Mn²⁺ | Mangan(II) | Mangano | MnSO4, MnCl2 |
| Mangan (Mn) | Mn⁴⁺ | Mangan(IV) | Manganik | MnO2 (Pirolusit) |
| Timah (Sn)* | Sn²⁺ | Timah(II) | Stano (Stannous) | SnCl2, SnO |
| Timah (Sn)* | Sn⁴⁺ | Timah(IV) | Stani (Stannic) | SnCl4, SnO2 |
| Timbal (Pb)* | Pb²⁺ | Timbal(II) | Plumbo (Plumbous) | Pb(NO3)2, PbI2 |
| Perak (Ag) | Ag⁺ | Perak(I)/Perak | Argento (Silver) | AgNO3, AgCl |
| Raksa (Hg) | Hg²⁺ | Raksa(II) | Merkuri (Mercuric) | HgCl2, HgO |

p.body-text: *Timah (Sn) dan Timbal (Pb) secara kualitatif adalah logam post-transisi blok p,
  bukan blok d murni — tapi tetap punya kation dengan valensi bervariasi seperti logam
  transisi, jadi dinamai dengan Sistem Stock yang sama.

table.ref-table (caption: Anion Umum yang Sering Diuji)
| Kategori | Rumus Anion | Nama Anion | Muatan | Contoh Senyawa |
| Halida | F⁻ | Fluorida | −1 | NaF, CaF2 |
| Halida | Cl⁻ | Klorida | −1 | NaCl, FeCl3 |
| Halida | Br⁻ | Bromida | −1 | KBr, AgBr |
| Kalkogenida | O²⁻ | Oksida | −2 | Na2O, Fe2O3 |
| Kalkogenida | S²⁻ | Sulfida | −2 | Na2S, FeS |
| Oksianion N | NO3⁻ | Nitrat | −1 | KNO3, AgNO3 |
| Oksianion N | NO2⁻ | Nitrit | −1 | NaNO2 |
| Oksianion S | SO4²⁻ | Sulfat | −2 | Na2SO4, BaSO4 |
| Oksianion S | SO3²⁻ | Sulfit | −2 | Na2SO3 |
| Oksianion P | PO4³⁻ | Fosfat | −3 | Ca3(PO4)2 |
| Oksianion Halogen | ClO⁻ | Hipoklorit | −1 | NaClO (pemutih) |
| Oksianion Halogen | ClO3⁻ | Klorat | −1 | KClO3 |
| Oksianion Logam | CrO4²⁻ | Kromat | −2 | K2CrO4 |
| Oksianion Logam | Cr2O7²⁻ | Dikromat | −2 | K2Cr2O7 |
| Oksianion Logam | MnO4⁻ | Permanganat | −1 | KMnO4 |
| Karbon | CO3²⁻ | Karbonat | −2 | CaCO3, Na2CO3 |
| Karbon | HCO3⁻ | Hidrogenkarbonat (Bikarbonat) | −1 | NaHCO3 (soda kue) |
| Hidroksida | OH⁻ | Hidroksida | −1 | NaOH, Ca(OH)2 |
| Poliatomik | NH4+ (kation) | Amonium | +1 | NH4Cl, (NH4)2SO4 |

p.body-text: Pola akhiran yang perlu diinget: anion monoatomik (dari 1 atom) selalu diakhiri
  "-ida" (klorida, oksida, sulfida). Oksianion (anion yang mengandung oksigen) diakhiri "-at"
  untuk jumlah O lebih banyak dan "-it" untuk jumlah O lebih sedikit — mis. sulfat (SO4²⁻,
  4 O) vs sulfit (SO3²⁻, 3 O), nitrat (NO3⁻) vs nitrit (NO2⁻).
```

## Page 4 — Latihan Terpandu: Metode Silang Muatan (Criss-Cross Method)

Adapted from the source's "Panduan Penulisan Rumus Kimia" worked table (4 rows) — a technique
not on the HTML page at all (the HTML page's MgF2 example derives the formula by reasoning
about charge balance in prose/role-cards, not via the criss-cross shortcut).

```
chapter-tag: Bab 4 · Latihan Terpandu
subject-chip: Kimia

h2.section-title: Latihan Terpandu: Metode Silang Muatan (Criss-Cross Method)
p.lead: Cara cepat menentukan rumus senyawa ionik dari kation & anionnya — angka muatan salah
  satu ion "disilangkan" jadi subskrip pasangannya, lalu disederhanakan kalau bisa.

div.example-box (label: Metode Silang Muatan untuk 4 Pasangan Ion)
p.setup: Tentukan rumus kimia netral dari pasangan kation-anion berikut menggunakan metode
  silang muatan, lalu berikan nama IUPAC-nya!
ol:
  - Fe³⁺ (Besi(III)) + SO4²⁻ (Sulfat): silangkan angka muatan → 3 jadi subskrip SO4, 2 jadi
    subskrip Fe → Fe2(SO4)3 → Besi(III) sulfat.
  - Co²⁺ (Kobalt(II)) + Cl⁻ (Klorida): silangkan → 2 jadi subskrip Cl, 1 (dari Cl⁻) jadi
    subskrip Co, tapi karena Co-nya cuma 1 (tak perlu ditulis) → CoCl2 → Kobalt(II) klorida.
  - Ca²⁺ (Kalsium) + PO4³⁻ (Fosfat): silangkan → 2 jadi subskrip PO4 (dalam kurung karena
    poliatomik & jumlahnya &gt;1), 3 jadi subskrip Ca → Ca3(PO4)2 → Kalsium fosfat.
  - Pb⁴⁺ (Timbal(IV)) + O²⁻ (Oksida): silangkan → 4 jadi subskrip O, 2 jadi subskrip Pb, lalu
    SEDERHANAKAN rasio 4:2 menjadi 2:1 → PbO2 → Timbal(IV) oksida.

p.body-text: Dua aturan wajib saat memakai metode ini: (1) kalau ion poliatomik butuh subskrip
  lebih dari 1, WAJIB dikasih tanda kurung — Ca3(PO4)2, bukan Ca3PO42 (rumus ini ambigu, bisa
  disalahbaca punya 42 atom O). (2) Setelah disilangkan, SELALU cek apakah rasionya bisa
  disederhanakan (seperti Pb⁴⁺ + O²⁻ di atas, 4:2 disederhanakan jadi 2:1) — rasio subskrip
  akhir harus rasio paling sederhana.

callout.mistake — Kesalahan Umum
❌ Salah: lupa menyederhanakan rasio subskrip hasil silang muatan (menulis Pb4O2 alih-alih
  PbO2), atau lupa kurung pada ion poliatomik yang subskripnya lebih dari 1.
✅ Benar: sederhanakan rasio subskrip ke bentuk paling kecil SEBELUM menuliskan rumus final,
  dan selalu kurung ion poliatomik yang muncul lebih dari sekali dalam rumus.
```

## Page 5 — Latihan Terpandu: Ikatan Koordinasi NH4+ & Penamaan 5 Senyawa

Two of the source module's worked examples not covered in full on the HTML page: the NH4+
coordinate-bond mechanism (HTML only briefly names the concept in the kovalen-koordinasi bullet
list) and the 5-compound IUPAC naming drill (HTML gives isolated inline examples, not a single
combined drill).

```
chapter-tag: Bab 4 · Latihan Terpandu
subject-chip: Kimia

h2.section-title: Latihan Terpandu: Ikatan Koordinasi NH4+ & Tata Nama 5 Senyawa
p.lead: Dua latihan singkat sekaligus — mekanisme lengkap ikatan kovalen koordinasi pada
  NH4+, lalu drill penamaan IUPAC untuk 5 senyawa campuran ionik & kovalen.

div.example-box (label: Soal · Ikatan Kovalen Koordinasi pada NH4+)
p.setup: Jelaskan bagaimana ikatan kovalen koordinasi terbentuk pada ion Amonium (NH4+) dari
  reaksi molekul NH3 dengan ion H+!
ol:
  - Molekul NH3 memiliki 1 Pasangan Elektron Bebas (PEB) pada atom N (N dikelilingi 8 e⁻: 3
    PEI + 1 PEB).
  - Ion H+ adalah kation hidrogen yang sudah kehilangan satu-satunya elektronnya — tidak
    punya elektron sama sekali (orbital kosong).
  - Atom N pada NH3 mendonasikan PEB-nya untuk dipakai bersama dengan H+, tanpa ada elektron
    yang disumbang dari pihak H+.
  - Ikatan N-H yang terbentuk dengan cara ini disebut Ikatan Kovalen Koordinasi (Datif),
    kadang disimbolkan dengan panah N → H+ untuk menunjukkan arah donor elektronnya.

p.body-text: Yang menarik: begitu ikatan koordinasi ini terbentuk, keempat ikatan N-H pada
  NH4+ menjadi identik (sama panjang & sama kekuatan) — tidak bisa dibedakan lagi mana yang
  "asalnya" ikatan kovalen biasa dan mana yang "asalnya" ikatan koordinasi. Cara terbentuknya
  beda, tapi hasil akhirnya sama persis.

div.example-box (label: Soal · Tata Nama IUPAC 5 Senyawa Sekaligus)
p.setup: Berikan nama IUPAC resmi untuk senyawa-senyawa berikut: (a) FeCl3, (b) N2O4, (c)
  Na2SO4, (d) PCl5, (e) Cu2O.
ol:
  - FeCl3: Besi adalah logam transisi dengan muatan +3 (Fe³⁺ menetralkan 3 Cl⁻) → Besi(III)
    klorida.
  - N2O4: Senyawa kovalen biner (2 atom N + 4 atom O) → Dinitrogen tetraoksida.
  - Na2SO4: Senyawa ionik dengan ion poliatomik sulfat → Natrium sulfat.
  - PCl5: Senyawa kovalen biner (1 atom P + 5 atom Cl) → Fosforus pentaklorida.
  - Cu2O: Tembaga adalah logam transisi dengan muatan +1 (2 Cu⁺ menetralkan 1 O²⁻) →
    Tembaga(I) oksida.

callout.mistake — Kesalahan Umum
❌ Salah: langsung memakai awalan Yunani untuk semua senyawa tanpa cek dulu apakah senyawanya
  ionik (logam+non-logam) atau kovalen biner (non-logam+non-logam) — misalnya menamai FeCl3
  sebagai "besi triklorida".
✅ Benar: cek dulu jenis unsurnya. Logam + non-logam = ionik (Sistem Stock/nama langsung).
  Non-logam + non-logam = kovalen biner (awalan Yunani). Fe adalah logam, jadi FeCl3 memakai
  Sistem Stock (Besi(III) klorida), bukan awalan Yunani.
```

## Page 6 — Analisis Lengkap Penyimpangan Oktet: NO, NO2, SF6, XeF4

The HTML page's worked example covers BF3 (oktet tak lengkap) and PCl5 (oktet diperluas) —
this page completes the other two categories/examples the source module covers (elektron
ganjil: NO/NO2; oktet diperluas lanjutan: SF6/XeF4) that the HTML page only names without full
electron-counting breakdowns.

```
chapter-tag: Bab 4 · Latihan Terpandu
subject-chip: Kimia

h2.section-title: Analisis Lengkap Penyimpangan Oktet: NO, NO2, SF6, XeF4
p.lead: Halaman utama menuntaskan BF3 (oktet tak lengkap) dan PCl5 (oktet diperluas) secara
  penuh — di sini giliran spesi elektron ganjil (NO, NO2) dan satu contoh oktet diperluas lagi
  (SF6, XeF4) yang lebih ekstrem.

div.example-box (label: Analisis · Spesi Elektron Ganjil NO & NO2)
p.setup: Kenapa NO dan NO2 tidak bisa digambarkan dengan struktur Lewis yang oktet sempurna di
  semua atomnya?
ol:
  - NO: elektron valensi N = 5, O = 6. Total = 11 elektron — jumlah GANJIL, tidak mungkin
    dibagi habis jadi pasangan-pasangan elektron.
  - Setelah 1 ikatan rangkap dua N=O dibuat (4 elektron) plus PEB di kedua atom, atom N hanya
    berakhir dikelilingi 7 elektron (bukan 8) — sisa 1 elektron ini jadi elektron tak
    berpasangan (radikal bebas) di N.
  - NO2: elektron valensi N = 5, tiap O = 6 (×2) = 12. Total = 5 + 12 = 17 elektron — juga
    GANJIL. Molekul ini juga punya 1 elektron tak berpasangan pada atom N pusatnya.
  - Baik NO maupun NO2 disebut radikal bebas karena punya elektron tak berpasangan — inilah
    yang membuat keduanya jauh lebih reaktif dibanding molekul dengan elektron serba
    berpasangan (mis. mudah bereaksi dengan O2 di udara membentuk NO2 dari NO).

div.example-box (label: Analisis · Oktet Diperluas SF6 & XeF4)
p.setup: Bagaimana atom pusat S dan Xe bisa dikelilingi lebih dari 8 elektron pada SF6 dan
  XeF4?
ol:
  - SF6: atom S (elektron valensi 6, Periode 3) mengikat 6 atom F dengan 6 ikatan kovalen
    tunggal → atom pusat S dikelilingi 12 elektron (6 pasang ikatan).
  - Ini dimungkinkan karena S berada di Periode 3, punya subkulit 3d yang kosong dan bisa
    dipakai menampung pasangan elektron tambahan — sesuatu yang TIDAK dimiliki unsur Periode
    2 seperti O (anggota segolongan S).
  - XeF4: atom Xe (gas mulia, tapi Periode 5, punya subkulit d) mengikat 4 atom F dengan 4
    ikatan kovalen tunggal, PLUS menyisakan 2 PEB pada atom Xe sendiri → atom pusat Xe
    dikelilingi total 12 elektron (4 pasang ikatan + 2 PEB).
  - XeF4 adalah bukti bahwa "gas mulia tidak pernah bereaksi" bukan aturan mutlak — Xe (gas
    mulia berat, elektron valensinya relatif longgar terikat) tetap bisa membentuk senyawa
    dengan unsur sangat elektronegatif seperti F, meski butuh kondisi reaksi khusus di
    laboratorium (bukan terjadi spontan di alam).

p.body-text: Pola pengenal cepat oktet diperluas: kalau atom pusatnya ada di Periode 3 ke atas
  (P, S, Cl, Xe, dst.) DAN jumlah atom yang diikatnya (atau PEB yang tersisa) membuat total
  elektron di sekitarnya lebih dari 8, itu oktet diperluas — bukan kesalahan menggambar
  struktur.
```

## Page 7 — Lembar Rumus Cepat: Rangkuman Satu Halaman

A quick-reference formula sheet for the whole chapter, pulled from the source module's own
"Lembar Rumus Cepat" table on its page 1 — not present anywhere on the HTML page, which
spreads the same content across multiple sections instead.

```
chapter-tag: Bab 4 · Lembar Rumus Cepat
subject-chip: Kimia

h2.section-title: Lembar Rumus Cepat — Rangkuman Satu Halaman
p.lead: Semua konsep inti Bab 4 dalam satu tabel — buat direview cepat sebelum ujian, tanpa
  perlu scroll ulang tiap section di halaman utama.

table.ref-table
| Konsep | Penjelasan & Rumus Utama | Contoh & Catatan |
| Kaidah Duplet & Oktet | Kestabilan e⁻ terluar: Duplet = 2 e⁻ (n=1), Oktet = 8 e⁻ (ns²np⁶) | He (2 e⁻), Ne & Ar (8 e⁻) |
| Ikatan Ion (Elektrovalen) | Gaya elektrostatik kation (logam lepas e⁻) & anion (non-logam tangkap e⁻) | NaCl, MgBr2, Al2O3. Sifat: titik leleh tinggi, lelehan/larutan konduktor |
| Ikatan Kovalen | Pemakaian bersama PEI antar atom non-logam | Tunggal (H2), Rangkap 2 (O2), Rangkap 3 (N2), Koordinasi (NH4+) |
| Penyimpangan Oktet | 1) Tak lengkap (&lt;8 e⁻) 2) Elektron ganjil 3) Diperluas (&gt;8 e⁻) | 1) BeCl2, BF3 2) NO, NO2 3) PCl5, SF6, XeF4 |
| Kepolaran Molekul | Polar: ΔEn &gt; 0,4, asimetris, ada PEB (μ&gt;0). Nonpolar: ΔEn≈0, simetris, tanpa PEB (μ=0) | Polar: H2O, NH3, HCl, HF. Nonpolar: CH4, CCl4, BF3, CO2 |
| Tata Nama IUPAC | Ionik: Logam+Non-logam+"-ida" / Angka Romawi Stock. Kovalen: awalan Yunani | FeCl3 = Besi(III) klorida. N2O4 = Dinitrogen tetraoksida |

p.body-text: Kalau cuma boleh hafal SATU baris dari tabel ini, hafalkan baris pertama: Kaidah
  Duplet & Oktet. Semua konsep lain di bab ini — ikatan ion, ikatan kovalen, penyimpangan
  oktet, bahkan tata nama — sebenarnya cuma konsekuensi dari cara berbeda-beda yang dipakai
  atom untuk mencapai (atau, pada penyimpangan oktet, mendekati) konfigurasi elektron gas
  mulia yang stabil.

ol.ref-list (Rekap Kesalahan Umum di Seluruh Bab 4):
  - <b>Struktur dipaksa oktet padahal atom pusatnya memang menyimpang.</b> Cek dulu golongan
    & periode atom pusat sebelum memaksakan oktet — Be/B (golongan 2A/3A) secara alami tak
    bisa oktet, sedangkan P/S/Xe (Periode 3+) boleh melebihi oktet.
  - <b>Arah penambahan/pengurangan elektron pada ion tertukar.</b> Anion (−) = TAMBAH
    elektron. Kation (+) = KURANGI elektron — sering tertukar arahnya saat menghitung total
    elektron valensi ion poliatomik seperti NH4+.
  - <b>Kepolaran molekul disamakan dengan kepolaran ikatan individualnya.</b> Molekul dengan
    ikatan polar bisa tetap NONPOLAR total kalau bentuknya simetris (CCl4, CO2) — momen
    dipolnya saling meniadakan secara vektor.
  - <b>Awalan Yunani dipakai pada senyawa ionik.</b> Awalan Yunani (mono-, di-, tri-) HANYA
    untuk senyawa kovalen biner. Senyawa ionik pakai Sistem Stock (angka Romawi) atau nama
    langsung, tidak pernah awalan Yunani.
  - <b>Rumus senyawa ionik disamakan 1:1 tanpa metode silang muatan.</b> Subskrip ditentukan
    dari perbandingan muatan kation & anion (disilangkan lalu disederhanakan), bukan asumsi
    1 kation : 1 anion.
```

## Note on the diagram images (HTML, not PDF)

Not part of this spec, but placed in `bab4-ikatan-kimia-dasar.html` alongside this build — all
3 supplied diagram images, all used directly as `.diagram-card` images per the diagram-sourcing
rule (real supplied source, not hand-drawn recreations):

- `#struktur-lewis`: `diagram-vektor-struktur-lewis-ch4-h2o-nh3-co2.jpg` (primary, vector
  redraw with color-coded electrons) AND `lewis-dot-structures-molekul-oktet.jpg` (secondary,
  explicit PEI/PEB labels) — both used back-to-back since they show the same 4 molecules from
  genuinely different notational angles (one cleaner/color-coded, one with labels spelled out),
  not a redundant duplicate.
- `#ikatan-kovalen`: `ilustrasi-tumpang-tindih-orbital-ikatan-kovalen.jpg` — directly
  illustrates the polar-vs-nonpolar orbital-overlap concept taught right next to it (H2 single
  bond, H2O polar bond with δ+/δ−, O2 double bond).

All 3 supplied diagram images were used — none left out; this chapter's source PDF only
embedded these as genuine content diagrams (Gambar 4.1, 4.2, 4.3), so no selection judgment was
needed beyond deciding where each fits best.
