/* =========================================================
   Wiguna Tenda — tendamurahgresik.com
   Konfigurasi utama situs. Ganti nilai di bawah ini dengan
   data asli sebelum website dipublish.
   ========================================================= */
const CONFIG = {
  // Nomor WhatsApp format internasional TANPA tanda "+" (mis. 62812xxxxxxx).
  // Dipakai oleh SEMUA tombol "Chat WhatsApp" umum di halaman (navbar, hero,
  // kartu layanan, galeri, tombol mengambang) — admin utama.
  waNumber: "6289510532984", // Rendra Oktaviantoro
  phoneDisplay: "0895-1053-2984",
  waName: "Rendra Oktaviantoro",
  // Admin kedua — dipakai khusus oleh tombol berlabel data-wa-number-key="waNumber2"
  // (dipasang di section Kontak, mengikuti pola "WhatsApp Admin 1/2").
  waNumber2: "62895351287502", // Sherly Charima Dewi
  phoneDisplay2: "0895-3512-87502",
  waName2: "Sherly Charima Dewi",
  address: "Jl. Raya Gresik No. 123, Kec. Gresik, Kabupaten Gresik, Jawa Timur", // TODO: alamat asli
  email: "info@tendamurahgresik.com", // TODO: email asli jika berbeda
  hours: "Senin - Sabtu, 08.00 - 17.00 WIB", // TODO: jam operasional asli

  // --- Tracking iklan (opsional, kosongkan jika belum punya akun) ---
  // Dipakai untuk mengukur konversi (klik WhatsApp) dari Google Ads.
  // Isi setelah kampanye Google Ads dibuat: Tools & Settings > Conversions.
  googleAdsId: "", // contoh: "AW-XXXXXXXXX"
  googleAdsConversionLabel: "", // contoh: "AbCdEfGhIjKlMnOp"
  ga4Id: "", // opsional, Measurement ID Google Analytics 4, contoh: "G-XXXXXXXXXX"
  metaPixelId: "", // opsional, Meta (Facebook/Instagram) Pixel ID, jika nanti pasang iklan FB/IG
};

/* =========================================================
   GALERI FOTO
   Cara pasang foto asli, TANPA edit HTML/CSS sama sekali:
     1. Taruh file foto (jpg/png, disarankan persegi/square) di folder
        assets/img/gallery/
     2. Isi nama filenya di field "photo" baris yang sesuai di bawah ini,
        mis. photo: "tenda-kerucut-1.jpg"
   Selama "photo" masih kosong ("") kotaknya tetap tampil sebagai
   placeholder ikon seperti sekarang. Urutan/jumlah item boleh diubah
   bebas — cukup tambah atau hapus baris di array ini.
   ========================================================= */
const GALLERY = [
  { label: "Tenda Kerucut", photo: "tenda-kerucut.jpg", icon: '<path d="M12 2a5 5 0 0 1 5 5c0 2-1.3 3.7-3 4.5V21h-4v-9.5C8.3 10.7 7 9 7 7a5 5 0 0 1 5-5z"/>' },
  { label: "Tenda Limas", photo: "tenda-limas.jpg", icon: '<path d="M12 2 2 20h20L12 2zm0 5.5L17.5 18h-11L12 7.5z"/>' },
  { label: "Tenda Promosi", photo: "tenda-promosi.jpg", icon: '<path d="M4 4h16v4H4V4zm0 6h16v10H4V10zm3 2v6h2v-6H7zm7 0v6h2v-6h-2z"/>' },
  { label: "Tenda Lipat", photo: "tenda-lipat.jpg", icon: '<path d="M12 3 21 8 12 13 3 8Z M3 13 12 18 21 13 21 15.5 12 20.5 3 15.5Z"/>' },
  { label: "Tenda Pesta", photo: "", icon: '<path d="M2 20 12 4l10 16H2zm10-12.5L6.5 18h11L12 7.5z"/>' },
  { label: "Kanopi Kain", photo: "", icon: '<path d="M3 12A9 9 0 0 1 21 12Z M5 12 7 12 7 19 5 19Z M17 12 19 12 19 19 17 19Z"/>' },
  { label: "Payung Taman", photo: "", icon: '<path d="M2 12A10 10 0 0 1 22 12Z M11 11 13 11 13 20 11 20Z"/>' },
  { label: "Tenda Custom", photo: "tenda-custom.jpg", icon: '<rect x="5" y="5" width="14" height="2" rx="1"/><circle cx="9" cy="6" r="2"/><rect x="5" y="11" width="14" height="2" rx="1"/><circle cx="15" cy="12" r="2"/><rect x="5" y="17" width="14" height="2" rx="1"/><circle cx="11" cy="18" r="2"/>' },
];

document.addEventListener("DOMContentLoaded", () => {
  applyConfig();
  initTracking();
  initWaLinks();
  initPhoneLink();
  renderGallery();
  initMobileNav();
  initAccordion();
  initScrollReveal();
  initStatCounters();
  initHeaderShadow();
  initBackToTop();
  document.getElementById("year").textContent = new Date().getFullYear();
});

/* Isi otomatis semua elemen dengan data-config sesuai CONFIG */
function applyConfig() {
  document.querySelectorAll("[data-config]").forEach((el) => {
    const key = el.getAttribute("data-config");
    if (CONFIG[key]) el.textContent = CONFIG[key];
  });
}

/* Bangun link wa.me otomatis untuk semua tombol/link WhatsApp,
   dan catat sebagai konversi Google Ads / Meta Pixel setiap kali diklik.
   Sebuah tombol bisa menunjuk ke admin kedua dengan
   data-wa-number-key="waNumber2" (dipakai di section Kontak); tanpa
   atribut itu, tombol memakai CONFIG.waNumber (admin utama). Kalau
   nomor yang dirujuk masih kosong, tombol otomatis dibuat nonaktif. */
function initWaLinks() {
  document.querySelectorAll(".js-wa-link").forEach((el) => {
    const numberKey = el.getAttribute("data-wa-number-key") || "waNumber";
    const number = CONFIG[numberKey];
    if (!number) {
      el.setAttribute("href", "#");
      el.classList.add("is-disabled");
      el.setAttribute("aria-disabled", "true");
      el.title = "Nomor WhatsApp belum tersedia";
      return;
    }
    const msg = el.getAttribute("data-wa-message") || "Halo Wiguna Tenda, saya ingin bertanya.";
    el.setAttribute("href", `https://wa.me/${number}?text=${encodeURIComponent(msg)}`);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
    el.addEventListener("click", trackWaClick);
  });
}

/* Link telepon di top bar mengikuti waNumber juga; nonaktif kalau kosong. */
function initPhoneLink() {
  const link = document.getElementById("topbarPhoneLink");
  if (!link) return;
  if (CONFIG.waNumber) {
    link.setAttribute("href", `tel:+${CONFIG.waNumber}`);
  } else {
    link.setAttribute("href", "#");
    link.classList.add("is-disabled");
    link.setAttribute("aria-disabled", "true");
  }
}

/* Muat script Google Ads/Analytics (gtag.js) dan Meta Pixel HANYA jika
   ID-nya sudah diisi di CONFIG. Selama masih kosong, tidak ada script
   pihak ketiga yang dimuat sama sekali. */
function initTracking() {
  if (CONFIG.googleAdsId || CONFIG.ga4Id) {
    const primaryId = CONFIG.googleAdsId || CONFIG.ga4Id;
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${primaryId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() { window.dataLayer.push(arguments); };
    gtag("js", new Date());
    if (CONFIG.googleAdsId) gtag("config", CONFIG.googleAdsId);
    if (CONFIG.ga4Id) gtag("config", CONFIG.ga4Id);
  }

  if (CONFIG.metaPixelId) {
    /* eslint-disable */
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
    window.fbq("init", CONFIG.metaPixelId);
    window.fbq("track", "PageView");
  }
}

/* Kirim event konversi saat tombol WhatsApp diklik (lead untuk Google Ads/Meta). */
function trackWaClick() {
  if (window.gtag && CONFIG.googleAdsId && CONFIG.googleAdsConversionLabel) {
    window.gtag("event", "conversion", {
      send_to: `${CONFIG.googleAdsId}/${CONFIG.googleAdsConversionLabel}`,
    });
  }
  if (window.fbq) window.fbq("track", "Contact");
}

/* Bangun grid galeri dari daftar GALLERY di atas. Item dengan "photo"
   terisi menampilkan foto asli (cover + judul di bawahnya); item yang
   "photo"-nya masih kosong menampilkan placeholder ikon seperti biasa. */
function renderGallery() {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;
  grid.innerHTML = GALLERY.map((item) => {
    if (item.photo) {
      const url = `assets/img/gallery/${item.photo}`;
      return `<div class="gallery-item gallery-item--photo reveal" style="background-image:url('${url}')"><span>${item.label}</span></div>`;
    }
    return `<div class="gallery-item reveal"><div class="gallery-item__ring"><svg viewBox="0 0 24 24" class="icon">${item.icon}</svg></div><span>${item.label}</span></div>`;
  }).join("");
}

/* Menu mobile */
function initMobileNav() {
  const navbar = document.getElementById("navbar");
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    navbar.classList.toggle("is-open");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navbar.classList.remove("is-open"));
  });
}

/* Accordion FAQ */
function initAccordion() {
  document.querySelectorAll(".accordion-header").forEach((header) => {
    header.addEventListener("click", () => {
      const item = header.closest(".accordion-item");
      const wasActive = item.classList.contains("is-active");
      item.parentElement.querySelectorAll(".accordion-item").forEach((i) => i.classList.remove("is-active"));
      if (!wasActive) item.classList.add("is-active");
    });
  });
}

/* Reveal animasi saat scroll */
function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  items.forEach((el) => observer.observe(el));
}

/* Animasi angka statistik di hero */
function initStatCounters() {
  const counters = document.querySelectorAll(".hero__stat-num");
  if (!counters.length) return;

  const animate = (el) => {
    const target = parseInt(el.getAttribute("data-count"), 10) || 0;
    const duration = 1200;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(progress * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    requestAnimationFrame(step);
  };

  if (!("IntersectionObserver" in window)) {
    counters.forEach(animate);
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((el) => observer.observe(el));
}

/* Bayangan header saat scroll */
function initHeaderShadow() {
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("is-scrolled", window.scrollY > 10);
  });
}

/* Tombol back to top */
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    btn.classList.toggle("is-visible", window.scrollY > 500);
  });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}
