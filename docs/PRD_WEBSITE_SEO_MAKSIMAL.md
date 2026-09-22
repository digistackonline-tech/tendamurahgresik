# PRD: STANDAR PEMBUATAN WEBSITE BARU DENGAN SEO & KONVERSI MAKSIMAL
*Product Requirement Document (PRD) — Blueprint Standar Agensi untuk Developer & AI Agent*

---

## 1. DOKUMEN OVERVIEW & TUJUAN
Dokumen ini menetapkan spesifikasi fungsional dan non-fungsional untuk membangun landing page / website bisnis lokal baru. Setiap website yang dibangun dengan panduan ini wajib memenuhi standar:
1. **Peringkat Organik Cepat di Google**: Terindeks dalam < 7 hari dan menargetkan Halaman 1 Google untuk pencarian lokal (*Local Search*).
2. **Kecepatan Tinggi (Core Web Vitals)**: Skor Google PageSpeed Mobile $\ge 90$, LCP < 2.5 detik, CLS < 0.1.
3. **Konversi WhatsApp Tinggi**: Tingkat konversi pengunjung menjadi chat WhatsApp $\ge 5\% - 10\%$.
4. **Siap Iklan (Ad-Ready)**: Memiliki struktur tracking Google Ads & Meta Pixel bawaan sejak hari pertama.

---

## 2. ARSITEKTUR INFORMASI & STRUKTUR FILE
Setiap proyek website klien wajib memiliki struktur file standar berikut:

```text
├── index.html              # Halaman Beranda (Pillar Page & Konversi Utama)
├── layanan.html            # Katalog Produk / Layanan Lengkap & Spesifikasi
├── galeri.html             # Portofolio Foto Asli & Bukti Kerja (Social Proof)
├── 404.html                # Halaman Error Custom Ramah SEO & Navigasi
├── robots.txt              # Izin Crawling Googlebot & Lokasi Sitemap
├── sitemap.xml             # Peta Situs XML Terstruktur
├── .htaccess               # Caching Server, Kompresi Gzip, dan Redirect 301
├── assets/
│   ├── css/style.css       # CSS Modern, Ringan, Mobile-First, Tanpa Framework Berat
│   ├── js/main.js          # File Konfigurasi Tunggal (CONFIG) & Event Tracking
│   └── img/                # Aset Gambar Format WebP + JPG Fallback
└── docs/                   # Dokumentasi SOP & PRD Proyek
```

---

## 3. ON-PAGE SEO REQUIREMENTS (SEMANTIK & KONTEN)

### 3.1. Tag Meta Wajib di Setiap Halaman (`<head>`)
- **Title Tag**: 
  - Pola: `[Kata Kunci Utama] & [Kategori] [Kota Utama] [Kota Sekunder] | [Nama Brand]`
  - Panjang: 50 – 60 karakter.
- **Meta Description**:
  - Pola: `[Keunggulan / USP] + [Daftar Produk/Layanan] + [Wilayah Operasional] + [CTA Hubungi Kami]`.
  - Panjang: 140 – 160 karakter.
- **Canonical URL**: `<link rel="canonical" href="https://[domain-klien]/[halaman]">` (mencegah penalti URL duplikat).
- **Robots Meta**: `<meta name="robots" content="index, follow">` (kecuali `404.html` gunakan `noindex, follow`).
- **Open Graph (Social Sharing)**: Wajib memuat `og:title`, `og:description`, `og:image` (1200x630px), `og:url`, `og:type="website"`.
- **Favicon Lengkap**: `favicon.png` (32x32) dan `apple-touch-icon.png` (180x180).

### 3.2. Struktur Heading & Hierarki Konten
- **Aturan H1**: Tepat **satu tag `<h1>` per halaman** yang memuat kata kunci pencarian utama dan kota sasaran.
- **Aturan H2**: Membagi section utama (Tentang Kami, Keunggulan, Layanan/Produk, Testimoni, FAQ, Kontak).
- **Aturan H3**: Digunakan untuk judul kartu layanan atau pertanyaan pada accordion FAQ.

### 3.3. Standar Optimasi Gambar (Image SEO & Core Web Vitals)
- **Format**: Wajib menyediakan format `.webp` dengan tag `<picture>` dan fallback ke `.jpg`/`.png`.
- **Dimensi**: Wajib menyertakan atribut `width` dan `height` eksplisit pada tag `<img>` untuk mencegah lonjakan layout (CLS = 0).
- **Alt Text**: Wajib menyertakan nama produk dan lokasi (contoh: `alt="Pabrik Tenda Kerucut Ukuran 3x3 di Gresik"`).
- **Prioritas Loading**:
  - Gambar Hero LCP: `fetchpriority="high"` (tanpa `loading="lazy"`).
  - Semua gambar lainnya di bawah layar pertama: `loading="lazy"`.

---

## 4. STRUCTURED DATA REQUIREMENTS (SCHEMA.ORG JSON-LD)
Setiap halaman wajib memiliki tag `<script type="application/ld+json">` dengan format `@graph` yang menghubungkan entitas bisnis:

1. **`LocalBusiness`**:
   - `name`, `alternateName`, `description`, `image`, `url`, `telephone`, `email`, `priceRange`.
   - `address` (`PostalAddress` lengkap dengan jalan, kelurahan/kecamatan, kota, provinsi, kodepos, negara `ID`).
   - `geo` (`GeoCoordinates` latitude & longitude presisi).
   - `hasMap`: Link resmi Google Maps (`https://maps.app.goo.gl/...`).
   - `areaServed`: Array kota-kota target (contoh: Gresik, Surabaya, Sidoarjo).
   - `openingHours`: Jam operasional format `Mo-Sa 08:00-17:00`.
2. **`Product` / `OfferCatalog`**: Daftar produk dengan nama dan deskripsi kaya kata kunci.
3. **`FAQPage`**: Minimal 5 pasang pertanyaan dan jawaban umum seputar spesifikasi, harga, pengiriman, dan garansi.
4. **`BreadcrumbList`**: Pada subhalaman (`layanan.html`, `galeri.html`) untuk memunculkan remah roti di hasil Google.

---

## 5. TECHNICAL SEO & SERVER PERFORMANCE (`.htaccess`)
Server wajib dikonfigurasi untuk performa maksimal:

```apache
# 1. Enforce HTTPS & Non-WWW
RewriteEngine On
RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
RewriteRule ^(.*)$ https://%1/$1 [R=301,L]
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]

# 2. Custom 404 Handler
ErrorDocument 404 /404.html

# 3. Gzip Compression (mod_deflate)
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json image/svg+xml
</IfModule>

# 4. Browser Caching (mod_expires)
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresDefault "access plus 1 month"
  ExpiresByType text/html "access plus 1 hour"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

# 5. Security Headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
```

---

## 6. CONVERSION RATE OPTIMIZATION (CRO) & TRACKING ARCHITECTURE

### 6.1. Konfigurasi Terpusat (`assets/js/main.js`)
Semua parameter bisnis wajib berada di dalam satu objek konfigurasi (`CONFIG`):

```javascript
const CONFIG = {
  waNumber: "6289510532984",
  phoneDisplay: "0895-1053-2984",
  waName: "Nama Admin Utama",
  address: "Alamat Lengkap Toko / Bengkel",
  waDefaultMessage: "Halo [Nama Bisnis], saya tertarik dengan layanan Anda:",
  mapsUrl: "https://maps.app.goo.gl/...",
  
  // Tracking Iklan & Analitik
  googleAdsId: "AW-XXXXXXXXX",
  googleAdsConversionLabel: "YYYYYYYYYYYYY",
  ga4Id: "",
  metaPixelId: ""
};
```

### 6.2. Aturan Tombol WhatsApp (.js-wa-link)
- Setiap tombol CTA WhatsApp di website wajib menggunakan kelas CSS `.js-wa-link`.
- Script otomatis menyusun link `https://wa.me/[waNumber]?text=[encodedMessage]`.
- Setiap kali diklik, script otomatis memicu event Google Ads conversion:
  ```javascript
  gtag('event', 'conversion', {
    'send_to': `${CONFIG.googleAdsId}/${CONFIG.googleAdsConversionLabel}`,
    'value': 1.0,
    'currency': 'IDR'
  });
  ```
- Wajib memiliki **Floating WhatsApp Button** di pojok kanan bawah yang selalu terlihat di layar mobile.

---

## 7. CHECKLIST QUALITY ASSURANCE (QA) SEBELUM GO-LIVE

| Kategori | Item Pengujian | Target Standar |
|---|---|---|
| **Kecepatan** | Google PageSpeed Insights (Mobile) | Skor $\ge 90$, LCP $\le 2.5\text{s}$ |
| **SEO Schema** | Google Rich Results Test | 0 Error, terdeteksi LocalBusiness & FAQ |
| **Indexing** | Google Search Console URL Inspection | Status "URL tersedia untuk Google" |
| **Link WhatsApp** | Uji klik semua tombol `.js-wa-link` di HP | Membuka aplikasi WA dengan pesan prefilled |
| **Tracking** | Google Tag Assistant | Event conversion berhasil 'Fired' saat klik WA |
| **Responsive** | Uji tampilan di resolusi 360px, 768px, 1200px | Tidak ada elemen meluap secara horizontal |
| **Error Handling**| Buka URL sembarang (misal: `/tes-error`) | Membuka halaman `404.html` dengan benar |
