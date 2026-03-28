/* ================================================================
   CONFIG.JS — edytuj tylko ten plik przed wypuszczeniem na produkcję
   ================================================================ */

window.SITE_CONFIG = {

  /* Dane sprzedawcy */
  sellerName:    "ZARZU PROPERTY",                      // imię i nazwisko lub nazwa firmy
  sellerAddress: "Miła 14, 96-100 Skierniewice, Polska",
  sellerNip:     "8361892314",

  /* Kontakt */
  contactEmail:  "aiquickstart@int.pl",
  siteUrl:       "https://aiquickstart.github.io",

  /* Produkt */
  productName:   "AI Quick Start",
  priceDisplay:  "39 zł",
  priceOld:      "79 zł",

  /* Płatności — wklej link ze Stripe / Gumroad / Hotmart */
  paymentUrl:    "https://www.naffy.io/AiQuickStart/4",

  /* Podstrony */
  regulaminUrl:  "regulamin.html",
  privacyUrl:    "polityka-prywatnosci.html",

};

/* ================================================================
   Pomocnicze — automatyczne wypełnianie elementów na stronie.
   Nie musisz tu nic zmieniać.
   ================================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const C = window.SITE_CONFIG;

  /* Przyciski kupna */
  document.querySelectorAll(".buy-link").forEach(el => {
    el.href = C.paymentUrl;
  });

  /* Linki footer */
  const elReg     = document.getElementById("link-regulamin");
  const elPrivacy = document.getElementById("link-privacy");
  const elContact = document.getElementById("footer-contact");
  if (elReg)     elReg.href                   = C.regulaminUrl;
  if (elPrivacy) elPrivacy.href               = C.privacyUrl;
  if (elContact) { elContact.textContent      = C.contactEmail; elContact.href = `mailto:${C.contactEmail}`; }

  /* Gwarancja e-mail (landing) */
  ["guarantee-email", "guarantee-email-inline"].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.href = `mailto:${C.contactEmail}`;
    const span = el.querySelector("span:last-child");
    if (span) span.textContent = C.contactEmail;
    else      el.textContent   = C.contactEmail;
  });

  /* Rok w stopce */
  document.querySelectorAll(".current-year").forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  /* Dokumenty prawne — seller info */
  const fill = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  fill("seller-name",    C.sellerName);
  fill("seller-address", C.sellerAddress);
  fill("seller-nip",     C.sellerNip);
  fill("site-url",       C.siteUrl);

  /* Linki e-mail na podstronach */
  ["contact-reg","contact-reg2","contact-1","contact-2"].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = C.contactEmail;
    el.href        = `mailto:${C.contactEmail}`;
  });
});