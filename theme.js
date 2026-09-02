/* ============================================================
   RAMBOWLS — theming.
   Loaded by BOTH pages. Lives here rather than in data.js on purpose:
   data.js is season data and shared math, and it gets edited every week to
   log scores. Wiring DOM behaviour into that file makes the one file you
   touch most also the one most able to break the page.

   It is still a single shared file rather than a copy per page, because the
   recurring failure in this app has been two pages drifting apart.
   ============================================================ */
(function (root) {

const THEMES = [
  {code:"RB",  name:"House",         ground:"#0E1116"},
  {code:"NYK", name:"Orange & blue", ground:"#08141F"},
  {code:"BKN", name:"Black & white", ground:"#0E1116"}
];

// Matches rambowls_who / rambowls_prov_v1_. The old "rb-theme" key is read
// once and migrated, so nobody loses the theme they already picked.
const KEY        = "rambowls_theme";
const LEGACY_KEY = "rb-theme";
const CODES      = THEMES.map(t => t.code);

function saved(){
  try{
    let t = localStorage.getItem(KEY);
    if (!t){
      const old = localStorage.getItem(LEGACY_KEY);
      if (CODES.includes(old)){
        t = old;
        localStorage.setItem(KEY, old);
        localStorage.removeItem(LEGACY_KEY);
      }
    }
    return CODES.includes(t) ? t : "RB";
  }catch(e){ return "RB"; }
}

function apply(code){
  if (!CODES.includes(code)) code = "RB";
  const el = document.documentElement;
  if (code === "RB") el.removeAttribute("data-theme");
  else el.setAttribute("data-theme", code);
  try{ localStorage.setItem(KEY, code); }catch(e){}

  /* Drag the browser and PWA chrome along with the ground. Without this the
     installed app keeps a #0E1116 status bar sitting on a blue page, which
     reads as a bug rather than a theme. */
  const meta = document.querySelector('meta[name="theme-color"]');
  const t = THEMES.find(x => x.code === code);
  if (meta && t) meta.setAttribute("content", t.ground);

  document.querySelectorAll("[data-theme-set]").forEach(b =>
    b.setAttribute("aria-pressed", String(b.dataset.themeSet === code)));
  return code;
}

function init(){
  const host = document.getElementById("themes");
  if (!host) return;
  host.innerHTML = THEMES.map(t =>
    `<button type="button" data-theme-set="${t.code}" aria-pressed="false" `
    + `title="${t.name}">${t.code}</button>`).join("");
  host.addEventListener("click", e => {
    const b = e.target.closest("[data-theme-set]");
    if (b) apply(b.dataset.themeSet);
  });
  apply(saved());
}

if (document.readyState === "loading"){
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

root.RBTheme = {THEMES, KEY, saved, apply, init};

})(window);
