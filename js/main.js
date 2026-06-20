(function () {
  "use strict";

  /* === Screenshots === */
  const SCREENSHOTS = [
    "main-menu", "sales-summary", "discounts",
    "cancellations", "top-tables", "top-waiters",
    "hourly-revenue", "open-shift", "date-range",
    "compare-periods", "ai-assistant", "ai-result",
  ];

  function buildGallery() {
    const gallery = document.getElementById("gallery");
    if (!gallery) return;
    SCREENSHOTS.forEach(function (name, i) {
      const div = document.createElement("div");
      div.className = "gallery__item";
      div.dataset.index = i;
      const img = document.createElement("img");
      img.src = "screenshots/" + name + ".png";
      img.alt = name;
      img.loading = "lazy";
      div.appendChild(img);
      gallery.appendChild(div);
    });
  }

  /* === Lightbox === */
  var lightboxEl = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxClose = document.getElementById("lightboxClose");
  var lightboxPrev = document.getElementById("lightboxPrev");
  var lightboxNext = document.getElementById("lightboxNext");
  var currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = "screenshots/" + SCREENSHOTS[index] + ".png";
    lightboxImg.alt = SCREENSHOTS[index];
    lightboxEl.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightboxEl.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + SCREENSHOTS.length) % SCREENSHOTS.length;
    lightboxImg.src = "screenshots/" + SCREENSHOTS[currentIndex] + ".png";
    lightboxImg.alt = SCREENSHOTS[currentIndex];
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % SCREENSHOTS.length;
    lightboxImg.src = "screenshots/" + SCREENSHOTS[currentIndex] + ".png";
    lightboxImg.alt = SCREENSHOTS[currentIndex];
  }

  function initLightbox() {
    document.addEventListener("click", function (e) {
      var item = e.target.closest(".gallery__item");
      if (item) openLightbox(parseInt(item.dataset.index, 10));
    });
    if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener("click", prevImage);
    if (lightboxNext) lightboxNext.addEventListener("click", nextImage);
    lightboxEl.addEventListener("click", function (e) {
      if (e.target === lightboxEl) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (!lightboxEl.classList.contains("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    });
  }

  /* === i18n === */
  var currentLang = localStorage.getItem("rw_lang") || "ru";

  function applyTranslations(lang) {
    var t = TRANSLATIONS[lang];
    if (!t) return;
    document.documentElement.lang = lang;
    /* textContent replacements */
    var textEls = document.querySelectorAll("[data-i18n]");
    textEls.forEach(function (el) {
      var key = el.dataset.i18n;
      if (t[key]) el.textContent = t[key];
    });
    /* innerHTML replacements */
    var htmlEls = document.querySelectorAll("[data-i18n-html]");
    htmlEls.forEach(function (el) {
      var key = el.dataset.i18nHtml;
      if (t[key]) el.innerHTML = t[key];
    });
    /* update active lang button */
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.classList.toggle("is-active", btn.dataset.lang === lang);
    });
  }

  function switchLang(lang) {
    currentLang = lang;
    localStorage.setItem("rw_lang", lang);
    applyTranslations(lang);
  }

  function initI18n() {
    applyTranslations(currentLang);
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        switchLang(btn.dataset.lang);
      });
    });
  }

  /* === Header scroll === */
  function initHeader() {
    var header = document.getElementById("header");
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          header.classList.toggle("header--scrolled", window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /* === Hamburger === */
  function initHamburger() {
    var hamburger = document.getElementById("hamburger");
    var nav = document.getElementById("nav");
    if (!hamburger || !nav) return;
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("is-active");
      nav.classList.toggle("is-open");
    });
    /* close nav on link click */
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        hamburger.classList.remove("is-active");
        nav.classList.remove("is-open");
      });
    });
  }

  /* === Init === */
  document.addEventListener("DOMContentLoaded", function () {
    buildGallery();
    initLightbox();
    initI18n();
    initHeader();
    initHamburger();
  });
})();
