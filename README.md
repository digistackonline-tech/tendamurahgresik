# Wiguna Tenda — tendamurahgresik.com

Landing page statis (HTML/CSS/JS, tanpa framework/build step) untuk bisnis sewa & jual tenda
Wiguna Tenda di Gresik.

## Struktur folder

```
index.html
assets/
  css/style.css
  js/main.js
  img/
    logo.jpeg          # logo klien
    gallery/            # taruh foto galeri asli di sini
```

## ⚠️ Data placeholder yang WAJIB diganti sebelum publish

Semua data kontak diatur di **satu tempat**: [assets/js/main.js](assets/js/main.js), bagian `CONFIG` di baris paling atas.

| Field | Placeholder saat ini | Keterangan |
|---|---|---|
| `waNumber` | `6281234567890` | Nomor WhatsApp asli, format `62...` tanpa `+` atau spasi |
| `phoneDisplay` | `0812-3456-7890` | Tampilan nomor telepon di halaman |
| `address` | `Jl. Raya Gresik No. 123, ...` | Alamat lengkap toko/workshop |
| `email` | `info@tendamurahgresik.com` | Email bisnis aktif |
| `hours` | `Senin - Sabtu, 08.00 - 17.00 WIB` | Jam operasional |

Setelah `waNumber` diganti, **semua** tombol "Chat WhatsApp" di seluruh halaman (navbar, hero, kartu
layanan, kontak, tombol mengambang) otomatis terhubung ke nomor yang benar — tidak perlu edit satu per satu.

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
- **Favicon/logo** — saat ini memakai file JPEG asli dari klien. Jika ingin versi PNG transparan/optimized,
  ganti `assets/img/logo.jpeg` (jaga nama file yang sama, atau update referensinya di `index.html`).

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
