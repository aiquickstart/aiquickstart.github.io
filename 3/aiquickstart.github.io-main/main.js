/* ================================================================
   MAIN.JS — logika strony (ładowana z defer, DOMContentLoaded
   nie jest potrzebny)
   ================================================================

   Sekcje:
     1. Nav — efekt przy scrollu
     2. MobileMenu — hamburger toggle
     3. ScrollReveal — IntersectionObserver dla .reveal
     4. FAQ — akordeon
     5. Countdown — licznik czasu oferty
     6. StickyCTA — pasek na dole na mobile
   ================================================================ */

"use strict";

/* ────────────────────────────────────────────────────────────────
   1. NAV — tło po przewinięciu
   ──────────────────────────────────────────────────────────────── */
const Nav = (() => {
  const el = document.getElementById("nav");
  if (!el) return;

  const SCROLL_THRESHOLD = 40;

  const update = () => {
    const scrolled = window.scrollY > SCROLL_THRESHOLD;
    el.style.background     = scrolled ? "rgba(10,10,10,0.96)" : "";
    el.style.backdropFilter = scrolled ? "blur(14px)"          : "";
    el.style.borderColor    = scrolled ? "#222"                : "transparent";
  };

  window.addEventListener("scroll", update, { passive: true });
  update(); // stan przy pierwszym renderze
})();


/* ────────────────────────────────────────────────────────────────
   2. MOBILE MENU — hamburger
   ──────────────────────────────────────────────────────────────── */
const MobileMenu = (() => {
  const hamburger  = document.getElementById("hamburger");
  const menu       = document.getElementById("mobile-menu");
  if (!hamburger || !menu) return;

  const lines = hamburger.querySelectorAll(".ham-line");
  let isOpen  = false;

  const open = () => {
    isOpen                 = true;
    menu.style.maxHeight   = menu.scrollHeight + "px";
    menu.style.opacity     = "1";
    lines[0].style.transform = "translateY(8px) rotate(45deg)";
    lines[1].style.opacity   = "0";
    lines[2].style.transform = "translateY(-8px) rotate(-45deg)";
  };

  const close = () => {
    isOpen                 = false;
    menu.style.maxHeight   = "0";
    menu.style.opacity     = "0";
    lines.forEach(l => { l.style.transform = ""; l.style.opacity = ""; });
  };

  hamburger.addEventListener("click", () => (isOpen ? close : open)());

  // Zamknij po kliknięciu linka w menu
  menu.querySelectorAll("a").forEach(a => a.addEventListener("click", close));
})();


/* ────────────────────────────────────────────────────────────────
   3. SCROLL REVEAL — sekcje .reveal wchodzą przy scrollu
   ──────────────────────────────────────────────────────────────── */
const ScrollReveal = (() => {
  const elements = document.querySelectorAll(".reveal");
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ isIntersecting, target }) => {
        if (!isIntersecting) return;
        target.classList.add("visible");
        observer.unobserve(target);
      });
    },
    { threshold: 0.08 }
  );

  elements.forEach(el => observer.observe(el));
})();


/* ────────────────────────────────────────────────────────────────
   4. FAQ ACCORDION
   ──────────────────────────────────────────────────────────────── */
const FAQ = (() => {
  const items = document.querySelectorAll(".faq-item");
  if (!items.length) return;

  const closeAll = () => {
    items.forEach(item => {
      item.dataset.open              = "0";
      item.querySelector(".faq-a").style.maxHeight = "0";
      const toggle                   = item.querySelector(".faq-toggle");
      toggle.textContent             = "+";
      toggle.style.cssText           = "";
    });
  };

  items.forEach(item => {
    item.querySelector(".faq-q").addEventListener("click", () => {
      const isOpen = item.dataset.open === "1";
      closeAll();

      if (!isOpen) {
        item.dataset.open = "1";
        const answer      = item.querySelector(".faq-a");
        answer.style.maxHeight = answer.scrollHeight + "px";

        const toggle          = item.querySelector(".faq-toggle");
        toggle.textContent    = "−";
        toggle.style.cssText  = "background:#d4ff00;color:#000;border-color:#d4ff00";
      }
    });
  });
})();


/* ────────────────────────────────────────────────────────────────
   5. COUNTDOWN — 75-godzinny zegar oferty premierowej
      Koniec zapisywany w localStorage; resetuje się po wygaśnięciu.
   ──────────────────────────────────────────────────────────────── */
const Countdown = (() => {
  const STORAGE_KEY  = "aqs_cd_end";
  const OFFER_HOURS  = 75;
  const MS_PER_HOUR  = 3_600_000;

  const elH = document.getElementById("cd-hours");
  const elM = document.getElementById("cd-minutes");
  const elS = document.getElementById("cd-seconds");
  if (!elH || !elM || !elS) return;

  const getEndTime = () => {
    let end = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
    if (!end || end < Date.now()) {
      end = Date.now() + OFFER_HOURS * MS_PER_HOUR;
      localStorage.setItem(STORAGE_KEY, end);
    }
    return end;
  };

  const pad = n => String(n).padStart(2, "0");

  const tick = () => {
    const diff = Math.max(0, getEndTime() - Date.now());
    elH.textContent = pad(Math.floor(diff / MS_PER_HOUR));
    elM.textContent = pad(Math.floor((diff % MS_PER_HOUR) / 60_000));
    elS.textContent = pad(Math.floor((diff % 60_000) / 1_000));
  };

  tick();
  setInterval(tick, 1_000);
})();


/* ────────────────────────────────────────────────────────────────
   6. STICKY CTA — pojawia się gdy hero wychodzi z viewportu
   ──────────────────────────────────────────────────────────────── */
const StickyCTA = (() => {
  const cta  = document.getElementById("sticky-cta");
  const hero = document.querySelector("section");
  if (!cta || !hero) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      cta.style.transform = entry.isIntersecting ? "translateY(100%)" : "translateY(0)";
    },
    { threshold: 0.1 }
  );

  observer.observe(hero);
})();