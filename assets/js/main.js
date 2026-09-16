/* =========================================================
   Wiguna Tenda — tendamurahgresik.com
   Konfigurasi utama situs. Ganti nilai di bawah ini dengan
   data asli sebelum website dipublish.
   ========================================================= */
const CONFIG = {
  // Nomor WhatsApp format internasional TANPA tanda "+" (mis. 62812xxxxxxx).
  // Sengaja dikosongkan dulu (customer belum deal) — selama kosong, semua
  // tombol WhatsApp di halaman otomatis nonaktif (bukan link rusak).
  waNumber: "", // TODO: isi nomor WhatsApp asli Wiguna Tenda kalau project lanjut
  phoneDisplay: "Segera Hadir", // TODO: ganti jadi nomor asli begitu waNumber diisi
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

document.addEventListener("DOMContentLoaded", () => {
  applyConfig();
  initTracking();
  initWaLinks();
  initPhoneLink();
  initMobileNav();
  initTabs();
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
   Kalau waNumber belum diisi, tombol dibuat nonaktif (bukan link rusak). */
function initWaLinks() {
  const hasNumber = Boolean(CONFIG.waNumber);
  document.querySelectorAll(".js-wa-link").forEach((el) => {
    if (!hasNumber) {
      el.setAttribute("href", "#");
      el.classList.add("is-disabled");
      el.setAttribute("aria-disabled", "true");
      el.title = "Nomor WhatsApp belum tersedia";
      return;
    }
    const msg = el.getAttribute("data-wa-message") || "Halo Wiguna Tenda, saya ingin bertanya.";
    el.setAttribute("href", `https://wa.me/${CONFIG.waNumber}?text=${encodeURIComponent(msg)}`);
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

/* Tab Sewa / Jual */
function initTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const panels = document.querySelectorAll(".tab-panel");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-tab");
      tabButtons.forEach((b) => b.classList.remove("is-active"));
      panels.forEach((p) => p.classList.remove("is-active"));
      btn.classList.add("is-active");
      document.querySelector(`.tab-panel[data-panel="${target}"]`).classList.add("is-active");
    });
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
