# SOP & PLAYBOOK DIGITAL MARKETING KLIEN (WEBSITE + SEO + GOOGLE ADS)
*Dokumen Panduan Standar untuk Agensi / Freelancer — Siap Dibaca & Dijalankan Langsung oleh AI*

---

## 📌 CARA PENGGUNAAN OLEH AI (AI EXECUTION GUIDE)
Jika Anda (AI) membaca dokumen ini untuk menangani klien baru:
1. Mulai dari **FASE 0** untuk memvalidasi kelengkapan data intake dari user.
2. Kerjakan fase demi fase secara berurutan tanpa melompati langkah.
3. Konfirmasi kepada user di setiap akhir fase sebelum melanjutkan ke fase berikutnya.

---

## FASE 0: CLIENT INTAKE (PENGUMPULAN DATA AWAL)
Sebelum memulai pengerjaan teknis, mintalah data berikut dari klien:

| No | Data yang Wajib Diminta | Contoh / Keterangan |
|---|---|---|
| 1 | **Nama Bisnis / Brand** | Wiguna Tenda |
| 2 | **Fokus Produk / Layanan Utama** | Tenda Kerucut, Tenda Promosi, Tenda Cafe |
| 3 | **Alamat Fisik Toko / Bengkel** | Dsn Karangasem, DS Karangandong RT 03/04, Driyorejo, Gresik |
| 4 | **Titik GPS Google Maps Presisi** | Share Live Location dari lokasi asli bengkel |
| 5 | **Kontak Admin WhatsApp** | No WA Admin 1 (dan Admin 2 jika ada) + Nama Admin |
| 6 | **Akun Gmail Khusus Bisnis** | `namabisnis@gmail.com` (digunakan untuk GSC, Google Ads, GBP) |
| 7 | **Target Wilayah Pemasaran** | Gresik, Surabaya, Sidoarjo, Lamongan |
| 8 | **Budget Iklan yang Disepakati** | Rp 250.000 / bulan (atau nominal lain) |
| 9 | **Aset Visual Produk** | 5 – 10 foto asli produksi/toko dan file logo |

---

## FASE 1: WEBSITE & TECHNICAL SEO SETUP (FONDASI)
*Tujuan: Membangun landing page cepat, responsif, kaya kata kunci, dan siap konversi.*

### Langkah 1.1: Konfigurasi Identitas Situs
Edit file konfigurasi utama `assets/js/main.js`:
- Masukkan `waNumber`, `phoneDisplay`, `waName`, `address`, `email`, dan jam operasional.
- Pastikan semua tombol WhatsApp di HTML menggunakan class `.js-wa-link`.

### Langkah 1.2: On-Page SEO & Structured Data (Schema.org)
Di `index.html`, `layanan.html`, dan `galeri.html`:
- **Title Tag**: Format `[Produk Utama] & [Kategori] [Kota Utama] [Kota Sekunder] | [Nama Brand]`  
  *(Contoh: Jual Tenda & Pabrik Tenda Kerucut Gresik Surabaya | Wiguna Tenda)*.
- **Meta Description**: Maks 150-160 karakter memuat keunggulan (harga pabrik, pengalaman, garansi, target kota).
- **Heading Hierarchy**: Satu `<h1>` utama kaya kata kunci, `<h2>` untuk setiap kategori layanan.
- **Image SEO**: Format WebP, tambahkan `width`, `height`, dan `alt` deskriptif. Gambar pertama menggunakan `fetchpriority="high"`, sisanya `loading="lazy"`.
- **JSON-LD Schema**:
  - `LocalBusiness` (Nama, deskripsi, alamat, geo koordinat, telepon, jam buka).
  - `Product` / `OfferCatalog` (katalog produk).
  - `FAQPage` (pertanyaan umum).
  - `BreadcrumbList` (hierarki halaman).

### Langkah 1.3: Infrastruktur Kecepatan & Keamanan (.htaccess)
Pasang file `.htaccess` di root hosting (Apache/LiteSpeed):
- **HTTPS & Non-WWW 301 Redirect**: Menghindari penalti konten duplikat.
- **Gzip Compression (`mod_deflate`)**: Mengompres HTML, CSS, JS hingga 70%.
- **Browser Caching (`mod_expires`)**: Cache 1 tahun untuk gambar/font, 1 bulan untuk CSS/JS.
- **Custom 404 Error Page**: Buat file `404.html` responsif lengkap dengan tombol kembali dan tombol WhatsApp.

---

## FASE 2: GOOGLE SEARCH CONSOLE (VERIFIKASI & INDEKS ORGANIK)
*Tujuan: Mendaftarkan domain agar Google merayapi dan menampilkan website di halaman pencarian.*

1. Buka [search.google.com/search-console](https://search.google.com/search-console).
2. Tambahkan properti dengan tipe **Domain** (contoh: `tendamurahgresik.com`).
3. Verifikasi kepemilikan via **DNS TXT Record** pada penyedia DNS (Cloudflare / cPanel / Hosting).
4. Buat file `sitemap.xml` dan `robots.txt` di root web.
5. Di menu Search Console, klik **Peta Situs (Sitemaps)** $\rightarrow$ submit URL `sitemap.xml`.
6. Lakukan **Pemeriksaan URL** pada halaman utama $\rightarrow$ klik **Minta Pengindeksan** (*Request Indexing*).

---

## FASE 3: GOOGLE PROFIL BISNIS / GOOGLE MAPS (LOCAL SEO)
*Tujuan: Memunculkan nama bisnis di Google Maps dan Local 3-Pack saat dicari di sekitar lokasi.*

1. Buka [google.com/business](https://google.com/business) dengan Gmail bisnis klien.
2. Masukkan nama bisnis resmi (misal: `Wiguna Tenda`).
3. **PILIH KATEGORI UTAMA DENGAN TEPAT**:
   - Ketik kata kunci bisnis dan pilih dari saran resmi Google (contoh: *Produsen*, *Pemasok tenda*, *Layanan sewa tenda*).
   - JANGAN memilih kategori yang salah (seperti EO jika bisnisnya pembuat tenda).
4. **SET TITIK PIN LOKASI**:
   - Seret pin merah Google Maps tepat di atap toko/bengkel fisik (jangan berbeda antara teks alamat dan titik pin peta).
5. **LENGKAPI INFORMASI**:
   - Masukkan link website: `https://[domain-klien]/`
   - Masukkan nomor telepon WhatsApp.
   - Jam operasional kerja.
   - Upload 10+ foto produk asli dan foto tempat usaha.
6. **SELESAIKAN VERIFIKASI**: Lakukan video singkat tempat usaha atau SMS verifikasi.
7. **TAUTKAN KE WEBSITE**:
   - Ambil shortlink resmi: Klik **Bagikan profil** $\rightarrow$ `https://maps.app.goo.gl/...`
   - Masukkan link ini ke Schema `hasMap` dan tombol *"Lihat di Google Maps"* pada section Kontak website.

---

## FASE 4: SETUP GOOGLE ADS & BILLING (BEBAS MASALAH PAJAK)
*Tujuan: Menyiapkan akun iklan dan sistem penagihan tanpa tersangkut dokumen pajak rumit.*

1. Buka [ads.google.com](https://ads.google.com) dengan akun Gmail bisnis.
2. Klik **Beralih ke Mode Pakar** (*Switch to Expert Mode*) jika akun masih di mode pintar sederhana.
3. Buka **Tagihan (Billing)** $\rightarrow$ **Setelan Penagihan**:
   - Negara: Indonesia, Mata uang: IDR.
   - **Jenis Akun**: PILIH **"Perorangan" / "Individu"** (bukan Organisasi/Bisnis).
   - **Informasi Pajak Indonesia**:
     - Jika muncul modal pajak: Pilih **"Kantor Pusat"** (JANGAN pilih *"Kantor Cabang"* karena akan mewajibkan NITKU 22 digit).
     - Untuk akun perorangan, NPWP bersifat **Opsional**.
   - **Metode Pembayaran**: Pilih Transfer Bank (BCA/Mandiri/BRI), GoPay, atau Kartu Debit.

---

## FASE 5: PELACAKAN KONVERSI WHATSAPP (CONVERSION TRACKING)
*Tujuan: Merekam setiap klik WhatsApp dari website ke dashboard Google Ads.*

1. Di Google Ads: Buka menu **Sasaran (Goals)** $\rightarrow$ **Konversi** $\rightarrow$ **Ringkasan**.
2. Klik **+ Tindakan Konversi Baru** $\rightarrow$ Pilih **Situs (Website)**.
3. Masukkan domain website $\rightarrow$ Klik **Pindai (Scan)**.
4. Gulir ke bawah ke **Tambahkan tindakan konversi secara manual**:
   - Kategori sasaran: **Kontak** (*Contact*).
   - Nama konversi: `Klik WhatsApp`.
   - Nilai: *Jangan gunakan nilai* (atau 1 IDR).
   - Penghitungan: *Satu*.
   - Klik Selesai $\rightarrow$ Simpan dan Lanjutkan.
5. Klik **Lihat cuplikan peristiwa (Event snippet)**:
   - Catat **Google Ads ID** (format: `AW-XXXXXXXXX`).
   - Catat **Conversion Label** (deretan huruf setelah tanda `/`, misal: `AbCdEfGhIjKlMnOp`).
6. Masukkan kedua kode tersebut ke `assets/js/main.js`:
   ```javascript
   googleAdsId: "AW-XXXXXXXXX",
   googleAdsConversionLabel: "AbCdEfGhIjKlMnOp",
   ```
7. Push ke server. Sekarang setiap klik tombol `.js-wa-link` otomatis tercatat sebagai konversi di Google Ads!

---

## FASE 6: STRUKTUR KAMPANYE GOOGLE ADS
*Tujuan: Membuat iklan yang mendatangkan pembeli nyata dengan budget hemat.*

1. **Tautkan Aset Lokasi**: Menu **Aset** $\rightarrow$ **Lokasi** $\rightarrow$ Hubungkan Google Profil Bisnis yang sudah diverifikasi di Fase 3.
2. **Pilih 10 – 15 Kata Kunci Niat Beli Tinggi (High Intent)**:
   - Gunakan kombinasi: `jual [produk] [kota]`, `pabrik [produk] [kota]`, `harga [produk] [kota]`.
   - Hindari kata kunci tunggal yang boros (misal: hanya kata *"tenda"*).
3. **Daftarkan Negative Keywords (Pencegah Boncos)**:
   - Tambahkan kata kunci negatif: `bekas, second, gratis, download, tutorial, cara membuat, gambar, skripsi, lirik`.
4. **Targeting Lokasi**:
   - Pilih kota utama dan kabupaten tetangga terdekat.
   - Setelan lokasi: Pilih *"Kehadiran: Orang yang berada di atau sering mengunjungi lokasi target Anda"*.
5. **Jadwal Tayang (Ad Scheduling)**:
   - Atur iklan hanya tayang pada jam kerja admin WA (misal: Senin - Sabtu, 08.00 - 17.00 WIB).
6. **Materi Iklan (Responsive Search Ads)**:
   - 15 Headline (maks 30 karakter) menonjolkan: Nama Produk, Harga Pabrik, Pengalaman, Kota, dan CTA.
   - 4 Deskripsi (maks 90 karakter) menonjolkan spesifikasi bahan, garansi, respon cepat.
   - Pasang Aset Gambar (rasio 1:1 persegi 1080x1080 dan 1.91:1 landscape 1200x628).

---

## FASE 7: MONITORING & REPORTING KLIEN (RUTINITAS)
*Tujuan: Menjaga klien puas dan memperpanjang kontrak jasa setiap bulan.*

### Alur Kerja Evaluasi:
1. **Setelah 3 Hari Tayang**: Cek menu **Istilah Penelusuran (Search Terms)**. Tambahkan kata-kata pencarian yang tidak relevan ke *Negative Keywords*.
2. **Setelah 7 Hari Tayang (Laporan Mingguan)**:
   - Ambil screenshot Halaman Kampanye (filter 7 hari terakhir).
   - Kirimkan draf laporan singkat via WhatsApp (gunakan Template Mingguan).
3. **Setelah 30 Hari Tayang (Laporan Bulanan & Renewal)**:
   - Ambil data 30 hari: Total Tayang, Total Klik, Total Chat WA, Biaya Terpakai.
   - Kirimkan laporan evaluasi bulanan beserta tagihan perpanjangan jasa bulan berikutnya.

---

## 🤖 PROMPT SIAP PAKAI UNTUK MEMANGGIL AI
Ketika Anda memiliki klien baru, cukup salin prompt berikut ke AI:

> *"Halo AI, saya punya klien baru bernama **[Nama Klien]** untuk produk **[Jenis Produk]** di kota **[Nama Kota]**. Tolong baca dokumen `docs/SOP_PLAYBOOK_DIGITAL_MARKETING.md`, dan pandu saya mulai dari FASE 0 dan FASE 1 secara bertahap."*
