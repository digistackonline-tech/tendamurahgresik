# Wiguna Tenda — tendamurahgresik.com

Landing page statis (HTML/CSS/JS, tanpa framework/build step) untuk bisnis sewa & jual tenda
Wiguna Tenda di Gresik.

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

## ⚠️ Data placeholder yang WAJIB diganti sebelum publish

Semua data kontak diatur di **satu tempat**: [assets/js/main.js](assets/js/main.js), bagian `CONFIG` di baris paling atas.

| Field | Placeholder saat ini | Keterangan |
|---|---|---|
| `waNumber` | *(kosong)* | Nomor WhatsApp asli, format `62...` tanpa `+` atau spasi |
| `phoneDisplay` | `Segera Hadir` | Tampilan nomor telepon di halaman |
| `address` | `Jl. Raya Gresik No. 123, ...` | Alamat lengkap toko/workshop |
| `email` | `info@tendamurahgresik.com` | Email bisnis aktif |
| `hours` | `Senin - Sabtu, 08.00 - 17.00 WIB` | Jam operasional |

`waNumber` sengaja dikosongkan dulu (customer belum deal project ini). **Selama kosong, semua tombol
"Chat WhatsApp" di seluruh halaman (navbar, hero, kartu layanan, kontak, tombol mengambang) otomatis
tampil nonaktif** (redup, tidak bisa diklik) — bukan link yang rusak. Begitu `waNumber` diisi nomor asli,
semua tombol otomatis aktif dan terhubung ke nomor tersebut, tanpa perlu edit satu per satu. Jangan lupa
juga isi kembali `phoneDisplay` dengan format nomor yang ingin ditampilkan.

Bagian lain yang juga masih placeholder dan perlu dilengkapi manual di `index.html`:

- **Statistik hero** (`10+ Tahun Pengalaman`, `500+ Event`, dll.) — cari `data-count` di section `#beranda`.
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
  `telephone` dan `address` masih placeholder, samakan dengan data asli yang dipakai di `CONFIG`.

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
