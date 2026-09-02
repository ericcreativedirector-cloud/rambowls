/* ============================================================
   RAMBOWLS — shared data + shared math.
   Loaded by BOTH the Scheduler (/index.html) and Stats (/tracker/).
   Edit season data HERE and nowhere else.
   ============================================================ */
(function (root) {

/* ---------- season meta ---------- */
const SEASON = {
  label:      "2026 Fall Wednesday League",
  venue:      "The Gutter Bar",
  span:       "Aug 19 – Nov 4 · Lanes 5–8 · 12 weeks, 24 games",
  lastUpdated:"2026-09-01",
  // Name of the team's group thread in Messages, shown in the reply prompt
  // so people know which conversation to pick. Cosmetic only.
  groupChatName:"Rambowls",
  // Who to send season goals to. Used only in the "set my goal" prompt copy.
  captain:"Eric",
  // NOTE: no phone numbers live in this file, on purpose. The reply buttons
  // open Messages with an EMPTY recipient field — the sender chooses the
  // existing group thread. Nobody's number is published in this public repo.
  sheetUrl:   "https://docs.google.com/spreadsheets/d/1eRRPcCOAMt8T2kVdodaOWb0ZtKiVKRoZxKHh8Q70i-g/edit?gid=62#gid=62",
  qualify:    6,     // games needed for playoff eligibility
  needPerGame:3,     // bowlers we want on a lane each game
  ballast:    4,     // league ballast games
  setPoint:   200,   // handicap set point
  pct:        0.7,   // handicap percentage
  standardAvg:120,   // league standard average for unrated bowlers
  teamCount:  16,    // teams in the league, for "4th of 16"
  // Last season's team scratch average (Winter 2026: 10th of 16, 11-13-0).
  // Used as the season-long comparison on the scratch-average card.
  prevSeasonAvg:361
};

/* ---------- league standings ----------
   Place comes off the Standings tab of the league sheet — it depends on all
   16 teams, so it cannot be derived from our own scores. Add one row each
   week when you log scores.
   wk:0 is last season's finishing place, used only as the baseline for the
   movement arrow until there are two real weeks to compare. */
const STANDINGS = [
  {wk:0, place:10, baseline:"last season"},
  {wk:2, place:4}
];

/* ---------- players ----------
   prev    = last season's average from the league sheet (ballast anchor)
   hcpPre  = the league sheet's OWN preseason handicap. Kept verbatim because
             the sheet computes from unrounded averages, so recalculating from
             the rounded `prev` does not always reproduce it (e.g. Phil: sheet
             says 47, 0.7*(200-134) says 46). Official value wins until the
             bowler has games, after which the sheet recomputes and so do we.
   scores  = OFFICIAL league-sheet scores only. {week: [game1, game2]}
             null = did not bowl that game.
   Alternates are not on the league sheet, so they carry the league standard
   average (120) and its matching handicap (56) until a real average is filed.
--------------------------------------------------------------- */
const PLAYERS = [
  {id:"eric",    name:"Eric Rodriguez",  short:"Eric",    prev:112, goal:138, alt:false, hcpPre:61,
   scores:{1:[136,124], 2:[125,97]}},
  {id:"ken",     name:"Ken Yamaguchi",   short:"Ken",     prev:140, alt:false, hcpPre:42,
   scores:{1:[149,122]}},
  {id:"ron",     name:"Ron Upperman",    short:"Ron",     prev:116, alt:false, hcpPre:59,
   scores:{1:[86,null], 2:[121,120]}},
  {id:"michael", name:"Michael Seidler", short:"Michael", prev:129, alt:false, hcpPre:49,
   scores:{1:[null,116]}},
  {id:"phil",    name:"Phil Marken",     short:"Phil",    prev:134, alt:false, hcpPre:47,
   scores:{}, note:"No games yet this season."},
  {id:"prah",    name:"Dave Prah",       short:"Prah",    prev:138, alt:false, hcpPre:43,
   scores:{2:[144,180]}},
  {id:"kelvyn",  name:"Kelvyn Perez",    short:"Kelvyn",  prev:138, alt:true,  hcpPre:43,
   scores:{}, note:"Alternate. Carries a real 138 average from last season, so his handicap is 43, not the 56 an unrated bowler gets."},
  {id:"jamiqve", name:"Jamiqve Mascoll", short:"Jamiqve", prev:120, alt:true,  hcpPre:56,
   scores:{}, note:"Alternate, on the league sheet with no prior average, so the league standard 120 stands in until he files one."},
  {id:"pete",    name:"Pete",            short:"Pete",    prev:120, alt:true,  hcpPre:56,
   scores:{}, note:"Not on the league sheet yet, still unconfirmed with the commissioner. Shown at the league standard 120 until that's settled."}
];

/* ---------- schedule ----------
   Two games per bowling night. iso = date, time24 = start.
   us / them = official team totals; absent means not bowled yet.
--------------------------------------------------------------- */
const SCHEDULE = [
  {wk:1,  iso:"2026-08-19", time24:"19:00", lane:7, opp:"The Pinheads",                  us:533, them:470},
  {wk:1,  iso:"2026-08-19", time24:"20:10", lane:8, opp:"The Lane 5 Pole Dancers",       us:514, them:532},
  {wk:2,  iso:"2026-08-26", time24:"21:20", lane:5, opp:"Peanut Gutter & Jelly",         us:552, them:541},
  {wk:2,  iso:"2026-08-26", time24:"22:30", lane:5, opp:"The Milk Duds",                 us:559, them:488},
  {wk:3,  iso:"2026-09-02", time24:"21:20", lane:8, opp:"Pin Pals"},
  {wk:3,  iso:"2026-09-02", time24:"22:30", lane:8, opp:"Gutter Sluts"},
  {wk:4,  iso:"2026-09-09", time24:"19:00", lane:7, opp:"The Bowled and the Beautiful"},
  {wk:4,  iso:"2026-09-09", time24:"20:10", lane:7, opp:"Glory Bowl"},
  {wk:5,  iso:"2026-09-16", time24:"19:00", lane:6, opp:"Bowls on Parade"},
  {wk:5,  iso:"2026-09-16", time24:"20:10", lane:6, opp:"Deli Meats"},
  {wk:6,  iso:"2026-09-23", time24:"21:20", lane:6, opp:"Bite Legends"},
  {wk:6,  iso:"2026-09-23", time24:"22:30", lane:6, opp:"Tokyo Drifters"},
  {wk:7,  iso:"2026-09-30", time24:"21:20", lane:7, opp:"The Pinheads"},
  {wk:7,  iso:"2026-09-30", time24:"22:30", lane:7, opp:"Blame It On The Lane"},
  {wk:8,  iso:"2026-10-07", time24:"19:00", lane:8, opp:"2 Legit 2 Split"},
  {wk:8,  iso:"2026-10-07", time24:"20:10", lane:8, opp:"Bite Legends"},
  {wk:9,  iso:"2026-10-14", time24:"21:20", lane:6, opp:"The Milk Duds"},
  {wk:9,  iso:"2026-10-14", time24:"22:30", lane:5, opp:"Bowls on Parade"},
  {wk:10, iso:"2026-10-21", time24:"21:20", lane:7, opp:"WHO DO YOU THINK YOU ARE I AM"},
  {wk:10, iso:"2026-10-21", time24:"22:30", lane:8, opp:"Peanut Gutter & Jelly"},
  {wk:11, iso:"2026-10-28", time24:"19:00", lane:5, opp:"2 Legit 2 Split"},
  {wk:11, iso:"2026-10-28", time24:"20:10", lane:5, opp:"Glory Bowl"},
  {wk:12, iso:"2026-11-04", time24:"19:00", lane:5, opp:"WHO DO YOU THINK YOU ARE I AM"},
  {wk:12, iso:"2026-11-04", time24:"20:10", lane:6, opp:"Tokyo Drifters"}
];

/* ---------- shirts ---------- */
const SHIRTS = [
  {id:"leroy", label:"Leroy Jenkins"},
  {id:"aloha", label:"Aloha"},
  {id:"fresh", label:"Fresh Fit"}
];

/* SHIRT CALL — set the value, save, push. null = not called yet. */
const SHIRT_CALLS = {
  "2026-08-26": "fresh",
  "2026-09-02": null
};

/* ---------- availability, one entry per bowling night ----------
   Optional `lineup:["Eric","Phil","Ron"]` overrides the auto-picked trio for
   that night. Leave it out and lineupFor() picks the three IN bowlers with
   the fewest games logged (ties keep roster order), which is what actually
   moves people toward the 6-game playoff threshold. Add it when the real
   lineup differs — a swap at the alley, someone bowling for a teammate.
   Short names only, exactly as they appear in the in/maybe/out lists. */
const NIGHTS = {
  "2026-08-19": {
    played: true,
    bowled: [["Eric",2], ["Ken",2], ["Ron",1], ["Michael",1]],
    sat:    [["Phil",""], ["Prah",""]]
  },
  "2026-08-26": {
    played: true,
    bowled: [["Eric",2], ["Ron",2], ["Prah",2]],
    sat:    [["Ken",""], ["Michael",""], ["Phil",""]]
  },
  "2026-09-02": {
    played: false,
    in:    [["Eric",""], ["Phil",""], ["Ron",""]],
    maybe: [["Kelvyn","alt"]],
    out:   [["Ken",""], ["Michael",""], ["Jamiqve","alt"]],
    quiet: [["Prah",""], ["Pete","alt"]]
  },
  "2026-09-09": {
    played: false,
    in:    [],
    maybe: [],
    out:   [["Eric",""]],
    quiet: [["Ken",""], ["Ron",""], ["Michael",""], ["Phil",""], ["Prah",""],
            ["Kelvyn","alt"], ["Jamiqve","alt"], ["Pete","alt"]]
  }
};

/* ============================================================
   SHARED MATH — both views call these, so they cannot disagree.
   ============================================================ */

const pad = n => String(n).padStart(2, "0");

function todayISO(){
  const n = new Date();
  return `${n.getFullYear()}-${pad(n.getMonth()+1)}-${pad(n.getDate())}`;
}

/* Bowling nights, in order. */
function nights(){
  return [...new Set(SCHEDULE.map(g => g.iso))].sort();
}

/* Week-shaped view of the schedule: one row per night, two games. */
function weeks(){
  return nights().map(iso => {
    const games = SCHEDULE.filter(g => g.iso === iso);
    const [y,m,d] = iso.split("-").map(Number);
    return {wk:games[0].wk, iso, date:`${m}/${d}`, games};
  });
}

function playerById(id){ return PLAYERS.find(p => p.id === id) || null; }

/* Official scores as a flat list of numbers. */
function officialGames(p){
  const out = [];
  for (const w of weeks()){
    const s = (p.scores || {})[w.wk] || [];
    for (const v of s) if (v != null && v !== "") out.push(+v);
  }
  return out;
}

/* League average: blends real games with `prev` until the ballast runs out. */
function leagueAverage(games, prev){
  const b = Math.max(0, SEASON.ballast - games.length);
  if (!games.length && !b) return null;
  return (games.reduce((x,y) => x+y, 0) + b*prev) / (games.length + b);
}

function handicapFor(leagueAvg){
  return Math.round(SEASON.pct * (SEASON.setPoint - leagueAvg));
}

/* THE canonical per-player figures. Scheduler and Stats both use this. */
function playerStats(id){
  const p = typeof id === "string" ? playerById(id) : id;
  if (!p) return null;
  const games   = officialGames(p);
  const scratch = games.length ? games.reduce((x,y)=>x+y,0) / games.length : null;
  const league  = leagueAverage(games, p.prev);
  const ballast = Math.max(0, SEASON.ballast - games.length);
  // Preseason: trust the league sheet's own handicap. After that, compute.
  const hcp = (games.length === 0 && p.hcpPre != null)
    ? p.hcpPre
    : handicapFor(league);
  return {
    player: p,
    games, count: games.length, ballast,
    scratchAvg: scratch,
    leagueAvg:  league,
    avgDisplay: league == null ? null : Math.round(league),
    hcp,
    high: games.length ? Math.max(...games) : null,
    // A goal is only a goal if the bowler actually gave us one. We used to
    // fall back to prev+10, which meant the app told teammates their "season
    // target" was a number they never chose. Null now, and the Stats page
    // asks for it instead of inventing it.
    goal: p.goal != null ? p.goal : null,
    hasGoal: p.goal != null,
    qualified: games.length >= SEASON.qualify,
    toQualify: Math.max(0, SEASON.qualify - games.length)
  };
}

/* Games still to be bowled this season — the ceiling on what anyone can add. */
function gamesRemaining(){
  return SCHEDULE.filter(g => g.us == null).length;
}

/* A starter is at risk only when the maths has run out: more games needed
   than the season has left. Everything short of that is just "early". */
function atRisk(p){
  const s = playerStats(p);
  return !s.qualified && s.toQualify > gamesRemaining();
}

function playerByShort(short){
  return PLAYERS.find(p => p.short === short) || null;
}

/* ---------- tonight's trio ----------
   We field 3 bowlers a night and keep the same 3 for both games. Given the
   IN list, pick the three with the fewest games logged so the lineup itself
   works the playoff-eligibility problem. `lineup` in NIGHTS overrides.
   Returns short names, plus enough context for the UI to explain itself. */
function lineupFor(iso){
  const n = NIGHTS[iso];
  const need = SEASON.needPerGame;
  const blank = {names:[], inCount:0, short:0, auto:true, manual:false, played:false};
  if (!n) return {...blank, short:need};

  if (n.played){
    const names = (n.bowled || []).map(x => x[0]);
    return {names, inCount:names.length, short:0, auto:false, manual:false, played:true};
  }
  const ins = (n.in || []).map(x => x[0]);

  if (Array.isArray(n.lineup) && n.lineup.length){
    const names = n.lineup.slice(0, need);
    return {names, inCount:ins.length, short:Math.max(0, need - names.length),
            auto:false, manual:true, played:false};
  }
  const names = ins
    .map(s => ({s, p:playerByShort(s)}))
    .map(o => ({
      s: o.s,
      games: o.p ? playerStats(o.p.id).count : Infinity,
      order: o.p ? PLAYERS.indexOf(o.p) : Infinity
    }))
    .sort((a,b) => a.games - b.games || a.order - b.order)
    .slice(0, need)
    .map(o => o.s);
  return {names, inCount:ins.length, short:Math.max(0, need - names.length),
          auto:true, manual:false, played:false};
}

/* Last week the TEAM has officially recorded — for "Through Week X".
   Deliberately ignores individual scores: if one bowler's numbers get entered
   before the team totals, Stats would otherwise claim a week is complete while
   the Scheduler's record still stops a week short. One definition, both pages. */
function lastCompletedWeek(){
  let last = 0;
  for (const g of SCHEDULE) if (g.us != null && g.wk > last) last = g.wk;
  return last;
}

/* ---- Themes -------------------------------------------------------------
   Decorative only. A theme may set --maple (primary accent) and --maple-2
   (secondary accent: masthead rule, logo finger-holes). It must NEVER touch
   --strike or --signal: those are semantic on this app (needs-attention vs
   done) and the eligibility pins are read at a glance. A red-primary team
   swapped into --strike would make every finished bowler look like an error.

   Palettes are colors only — no marks, no full club names. Codes are the
   label. Values are hand-tuned for contrast on --lane (#0E1116), not lifted
   raw from a brand sheet: a true club navy sinks into this background.

   The pre-paint application lives in an inline <head> script on each page,
   so the theme is on the element before first paint. This is the picker. */
const THEMES = [
  {code:"RB",  name:"House",          ground:"#0E1116"},
  {code:"NYK", name:"Orange & blue",  ground:"#08141F"},
  {code:"BKN", name:"Black & white",  ground:"#0E1116"}
];
const THEME_KEY = "rb-theme";
const THEME_CODES = THEMES.map(t => t.code);

function themeSaved(){
  try{
    const t = localStorage.getItem(THEME_KEY);
    return THEME_CODES.includes(t) ? t : "RB";
  }catch(e){ return "RB"; }
}

function applyTheme(code){
  if (!THEME_CODES.includes(code)) code = "RB";
  const el = document.documentElement;
  if (code === "RB") el.removeAttribute("data-theme");
  else el.setAttribute("data-theme", code);
  try{ localStorage.setItem(THEME_KEY, code); }catch(e){}
  /* Drag the browser/PWA chrome along with the ground. Without this the
     installed app keeps a #0E1116 status bar sitting on a blue page, which
     reads as a bug rather than a theme. */
  const meta = document.querySelector('meta[name="theme-color"]');
  const t = THEMES.find(x => x.code === code);
  if (meta && t) meta.setAttribute("content", t.ground);
  document.querySelectorAll("[data-theme-set]").forEach(b =>
    b.setAttribute("aria-pressed", String(b.dataset.themeSet === code)));
  return code;
}

function initThemes(){
  const host = document.getElementById("themes");
  if (!host) return;
  host.innerHTML = THEMES.map(t =>
    `<button type="button" data-theme-set="${t.code}" aria-pressed="false" `
    + `title="${t.name}">${t.code}</button>`).join("");
  host.addEventListener("click", e => {
    const b = e.target.closest("[data-theme-set]");
    if (b) applyTheme(b.dataset.themeSet);
  });
  applyTheme(themeSaved());
}

root.RB = {
  SEASON, PLAYERS, SCHEDULE, SHIRTS, SHIRT_CALLS, NIGHTS, STANDINGS,
  pad, todayISO, nights, weeks, playerById, playerByShort,
  officialGames, leagueAverage, handicapFor, playerStats, lastCompletedWeek,
  gamesRemaining, atRisk, lineupFor,
  THEMES, applyTheme, initThemes
};

/* data.js is loaded at the end of <body>, so the DOM is parsed by now.
   Both pages get the picker from this one call — neither page script
   needs to know themes exist. */
initThemes();

})(window);
