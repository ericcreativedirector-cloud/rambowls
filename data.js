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
  // GoatCounter site code — just the subdomain, e.g. "rambowls".
  // Empty string = analytics off entirely (nothing loads, no requests made).
  analyticsId:"",
  // Name of the team's group thread in Messages, shown in the reply prompt
  // so people know which conversation to pick. Cosmetic only.
  groupChatName:"Rambowls",
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
  {wk:0, place:10, baseline:"last season's finish"},
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
  {id:"kelvyn",  name:"Kelvyn Perez",    short:"Kelvyn",  prev:120, alt:true,  hcpPre:56,
   scores:{}, note:"Alternate — not on the league sheet, so 120 (the league standard average) stands in until a real average is filed."},
  {id:"jamiqve", name:"Jamiqve Mascoll", short:"Jamiqve", prev:120, alt:true,  hcpPre:56,
   scores:{}, note:"Alternate — not on the league sheet, so 120 (the league standard average) stands in until a real average is filed."},
  {id:"pete",    name:"Pete",            short:"Pete",    prev:120, alt:true,  hcpPre:56,
   scores:{}, note:"Alternate — not on the league sheet, so 120 (the league standard average) stands in until a real average is filed."}
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

/* ---------- availability, one entry per bowling night ---------- */
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
    goal: p.goal || p.prev + 10,
    qualified: games.length >= SEASON.qualify,
    toQualify: Math.max(0, SEASON.qualify - games.length)
  };
}

/* Last week with any official player score or team total — for "Through Week X". */
function lastCompletedWeek(){
  let last = 0;
  for (const g of SCHEDULE) if (g.us != null && g.wk > last) last = g.wk;
  for (const p of PLAYERS){
    for (const k of Object.keys(p.scores || {})){
      const any = (p.scores[k] || []).some(v => v != null && v !== "");
      if (any && +k > last) last = +k;
    }
  }
  return last;
}

root.RB = {
  SEASON, PLAYERS, SCHEDULE, SHIRTS, SHIRT_CALLS, NIGHTS, STANDINGS,
  pad, todayISO, nights, weeks, playerById,
  officialGames, leagueAverage, handicapFor, playerStats, lastCompletedWeek
};

})(window);
