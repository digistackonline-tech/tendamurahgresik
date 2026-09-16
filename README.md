# Wiguna Tenda — tendamurahgresik.com

Landing page statis (HTML/CSS/JS, tanpa framework/build step) untuk Wiguna Tenda — perusahaan tenda
profesional (produksi tenda &amp; terpal custom + sewa tenda event) berpengalaman 11+ tahun, berbasis
di Gresik. Konten mengikuti profil perusahaan resmi (`deskripsi wiguna tenda.pdf` dari klien).

## Struktur folder

```
index.html
robots.txt
sitemap.xml
assets/
  css/style.css
  js/main.js
  img/
    logo.jpeg          # logo klien (banner, dipakai untuk og:image)
    favicon.png         # logo di-crop persegi, dipakai untuk tab browser
    gallery/            # taruh foto galeri asli di sini
```

## ✅ Data kontak asli & ⚠️ yang masih placeholder

Semua data kontak diatur di **satu tempat**: [assets/js/main.js](assets/js/main.js), bagian `CONFIG` di baris paling atas.

| Field | Nilai saat ini | Keterangan |
|---|---|---|
| `waNumber` | `6289510532984` | **Asli** — Rendra Oktaviantoro, admin utama. Dipakai semua tombol WA umum di halaman. |
| `phoneDisplay` | `0895-1053-2984` | **Asli** — tampilan nomor Rendra |
| `waNumber2` | `62895351287502` | **Asli** — Sherly Charima Dewi, admin kedua. Dipakai khusus tombol dengan `data-wa-number-key="waNumber2"` (section Kontak). |
| `phoneDisplay2` | `0895-3512-87502` | **Asli** — tampilan nomor Sherly |
| `address` | `Jl. Raya Gresik No. 123, ...` | ⚠️ Masih **placeholder**, alamat asli belum tersedia dari klien |
| `email` | `info@tendamurahgresik.com` | ⚠️ Masih **placeholder** |
| `hours` | `Senin - Sabtu, 08.00 - 17.00 WIB` | ⚠️ Masih **placeholder** |

Kalau ada perubahan nomor WA di kemudian hari, tinggal edit `waNumber`/`waNumber2` di satu tempat ini —
semua tombol "Chat WhatsApp" di seluruh halaman (navbar, hero, kartu layanan, galeri, kontak, tombol
mengambang) otomatis ikut terhubung ke nomor yang benar. Kalau salah satu nomor dikosongkan lagi,
tombol yang merujuk ke nomor itu otomatis tampil nonaktif (redup, tidak bisa diklik) — bukan link rusak.

Bagian lain yang juga masih placeholder dan perlu dilengkapi manual di `index.html`:

- **Statistik hero** (`500+ Event Terlaksana`, dll. — `11+ Tahun Pengalaman` sudah data asli) — cari `data-count` di section `#beranda`.
- **Galeri foto** (section `#galeri`) — saat ini berupa kartu ikon+judul kategori. Untuk memasang foto asli:
  1. Taruh file foto di `assets/img/gallery/`.
  2. Pada setiap `<div class="gallery-item" ...>`, tambahkan `style="background-image:url('assets/img/gallery/nama-file.jpg')"`.
- **Testimoni pelanggan** (section `#testimoni`) — masih berupa template kosong ("Nama Pelanggan"). Ganti
  dengan testimoni nyata dari pelanggan setelah tersedia.
- **Peta lokasi** (section `#kontak`) — saat ini menampilkan peta umum area Gresik. Setelah alamat pasti
  tersedia, ganti `src` iframe dengan link embed Google Maps yang sesuai (Google Maps → Bagikan → Sematkan peta).
- **Link sosial media** (Instagram/Facebook/TikTok, di top bar & footer) — masih `href="#"`, ganti dengan
  URL profil asli.
- **Structured data LocalBusiness** (`<script type="application/ld+json">` di `<head>` index.html) — field
  `telephone` sudah nomor asli (Rendra), tapi `address` masih placeholder, samakan begitu alamat asli ada.

## 📈 Tracking iklan (Google Ads / GA4 / Meta Pixel)

Karena strategi marketing utama memakai **Google Ads** (bukan SEO organik) untuk kata kunci seperti
"tenda murah", yang paling penting adalah *conversion tracking* — mengukur setiap klik tombol WhatsApp
sebagai hasil dari iklan.

Semua diatur di `assets/js/main.js`, bagian `CONFIG`:

| Field | Kapan diisi |
|---|---|
| `googleAdsId` | Setelah kampanye Google Ads dibuat. Ambil di **Tools & Settings → Conversions** (format `AW-XXXXXXXXX`). |
| `googleAdsConversionLabel` | Label dari action konversi yang sama (mis. "Kirim WhatsApp"). |
| `ga4Id` | Opsional, Measurement ID dari Google Analytics 4 (`G-XXXXXXXXXX`) untuk melihat traffic secara umum. |
| `metaPixelId` | Opsional, jika nanti juga pasang iklan Facebook/Instagram. |

Selama field-field ini masih kosong, **tidak ada script tracking pihak ketiga yang dimuat sama sekali**
(situs tetap ringan). Begitu diisi, setiap klik tombol "Chat WhatsApp" di seluruh halaman otomatis
terkirim sebagai event konversi ke Google Ads (dan/atau Meta Pixel) — tidak perlu pasang kode manual di
setiap tombol.

## 🔍 File SEO dasar

`robots.txt` dan `sitemap.xml` di root project sudah disiapkan (mengizinkan semua crawler, menunjuk ke
`https://tendamurahgresik.com/sitemap.xml`). Ini membantu kualitas halaman meski fokus akuisisi utamanya
lewat Google Ads, dan tetap berguna jika nanti ingin menambah upaya SEO organik.

## Menjalankan secara lokal

Tidak perlu instalasi apa pun. Buka `index.html` langsung di browser, atau jalankan server statis sederhana:

```bash
# opsi 1: Python
python -m http.server 8080

# opsi 2: Node (npx)
npx serve .
```

Lalu buka `http://localhost:8080`.

## Deploy ke Cloudflare Pages via GitHub

1. Push folder ini ke repository GitHub (lihat instruksi commit/push yang diberikan terpisah).
2. Login ke [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create application** → tab **Pages** → **Connect to Git**.
3. Pilih repository GitHub ini, lalu isi konfigurasi build:
   - **Framework preset**: `None`
   - **Build command**: *(kosongkan)*
   - **Build output directory**: `/`
4. Klik **Save and Deploy**. Cloudflare akan memberi URL sementara `*.pages.dev`.
5. Untuk memakai domain `tendamurahgresik.com`:
   - Tambahkan domain tersebut ke akun Cloudflare (Add a Site), arahkan nameserver domain ke Cloudflare.
   - Di project Pages → **Custom domains** → **Set up a custom domain** → masukkan `tendamurahgresik.com` (dan `www.tendamurahgresik.com` jika perlu).
   - Cloudflare akan otomatis membuatkan DNS record dan SSL.

Setiap kali ada `git push` ke branch utama, Cloudflare Pages akan otomatis build & deploy ulang.
