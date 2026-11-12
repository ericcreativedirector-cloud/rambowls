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
  lastUpdated:"2026-11-11",
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
  // Date the league sheet's Playoff Eligible column flipped to Yes for the
  // team. null until it does. Team-level; the per-bowler 6-game rule is below.
  playoffEligible:"2026-10-14",
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
  {wk:2, place:4},
  {wk:3, place:3},
  {wk:4, place:3},
  {wk:6, place:5},
  {wk:7, place:8},
  {wk:8, place:10},
  {wk:9, place:9},
  {wk:11, place:10},
  {wk:12, place:7}
];

/* ---------- playoffs ----------
   From the league sheet's Playoffs tab, seeds as written there in parentheses.
   A game with both iso and time24 shows up in Next up, Availability, the
   schedule table and the calendar export like any other night; one with only
   an iso stays in the Playoffs section until the league posts the rest. Playoff games never
   touch the regular-season record or the six-game eligibility count.
   Results: a playoff tie is decided on total pins over the games, so each game
   carries us/them as totals with handicap, same as SCHEDULE. */
const PLAYOFFS = {
  // League email of 11/10 (Tony, for Bill and Brent): lanes on at 6:45, games
  // start at 7:00. Quarters and semis are both 11/11, the final is 11/18.
  // Quarters and semis: two 3-on-3 games, all six bowlers bowl, so each bowls
  // one game. Total score with handicap wins. Final: four games, all six bowl
  // twice.
  format:  "Two 3-on-3 games, all six bowl once, total pins",
  lanesOn: "18:45",
  // An alternate may sub only with six regular-season games. The UI reads the
  // roster against this number; nobody is hand-listed as eligible.
  subGames: 6,
  /* Each round carries:
       about    start times the league has not confirmed, by game. Only time24
                is the league's. Shown as "about 8:10", never exported.
       lineup   the round's trios, by game. The first round of a night reads
                NIGHTS[iso].lineup instead, so Availability and the card agree.
       fallback by game: {for, by} if a named bowler may not be there.
       scores   per bowler per game, {Phil:120, ...}. Playoff scores live
                here and nowhere else: they never enter PLAYERS.scores.
       us/them  the round's totals with handicap, both games added. One result
                per round, since the round is won on total pins. Entering a
                result flips the next round from conditional to live, or drops
                it on a loss. Fill opp, oppSeed and lane on the next round
                once the league reseeds. */
  games: [
    {round:"Quarterfinal", short:"QF", iso:"2026-11-11", time24:"19:00", lane:6,
     opp:"The Milk Duds", seed:7, oppSeed:2,
     about:{2:"20:10"},
     // Game 1 card: Rambowls 400 scratch + 145 = 545, The Milk Duds 452 + 120
     // = 572. Down 27 going into game 2. Round totals go in after game 2.
     // Game 2 card: Rambowls 312 + 144 = 456, The Milk Duds 369 + 137 = 506 (a
     // sub penalty of 23 came off their handicap). Round on total pins:
     // 1001 to 1078, The Milk Duds by 77. Season over.
     scores:{1:{Ron:148, Phil:116, Michael:136}, 2:{Prah:113, Eric:100, Ken:99}}, us:1001, them:1078},
    // Same night, for the quarterfinal winners. Reseeded, so the opponent and
    // lane come from the night itself. No time24 on purpose: the night card
    // for 11/11 already covers it, and a second dated game would double it.
    {round:"Semifinal", short:"SF", iso:"2026-11-11", time24:null, lane:null, opp:null, oppSeed:null, seed:7,
     after:"Quarterfinal",
     about:{1:"21:20", 2:"22:30"},
     lineup:{1:["Michael","Ron","Prah"], 2:["Phil","Ken","Eric"]},
     // Phil may not be back from softball for the last game. Prah or Ron, both
     // in game 1 and both higher averages, bowls as Phil on Phil's handicap.
     fallback:{2:{for:"Phil", by:["Prah","Ron"]}},
     scores:{1:{}, 2:{}}, us:null, them:null,
     note:"Same night, straight after the quarterfinal. Reseeded: the highest seed still in plays the lowest."},
    // Set time24 and lane once the league posts them and 11/18 joins Next up,
    // Availability, the schedule table and the calendar like any other night.
    {round:"Final", short:"F", iso:"2026-11-18", time24:null, lane:null, opp:null, oppSeed:null, seed:7,
     after:"Semifinal", format:"Four 3-on-3 games, all six bowl twice, total pins",
     scores:{1:{}, 2:{}, 3:{}, 4:{}}, us:null, them:null,
     note:"Lane and time not posted yet."}
  ],
  bracket: [
    {round:"Quarterfinal", lane:8, a:"Deli Meats",      aSeed:1, b:"WHO DO YOU THINK YOU ARE I AM", bSeed:8},
    {round:"Quarterfinal", lane:7, a:"Bite Legends",    aSeed:3, b:"Peanut Gutter & Jelly",         bSeed:6},
    {round:"Quarterfinal", lane:6, a:"The Milk Duds",   aSeed:2, b:"Rambowls",                      bSeed:7},
    {round:"Quarterfinal", lane:5, a:"2 Legit 2 Split", aSeed:4, b:"Bowls on Parade",               bSeed:5}
  ],
  /* Scouting for 11/11. Every average, handicap and score is copied from the
     league sheet's team tabs, final regular-season figures through 11/4.
     proj = sum of (season average + handicap) for the six bowlers with the six
     games needed to bowl. odds is an estimate from those averages and each
     bowler's game-to-game spread, not a league number. bowlers rows are
     [name, avg, hcp, last four scores, tag, read]; tag is "threat" or "soft". */
  scout: {
    us: 1077,
    source: "League sheet through 11/4. Projection is season average plus handicap for each team's six eligible bowlers. Odds and the chance of each draw are estimates.",
    teams: [
      {round:"Quarterfinal", team:"The Milk Duds", seed:2, rec:"18-6", proj:1079, odds:49,
       bowlers: [
         ["Frank Burton",    157.4, 30, [169,134,161,181], "threat", "Anchor. 16 games, season low 134."],
         ["Julian Jacobson", 143.9, 39, [133,133,95,175],  "",       "Swings from 95 to 188."],
         ["Matty Krant",     133.8, 46, [100,135,117,153], "",       "Only 6 games."],
         ["Steven Carey",    127.3, 51, [132,136,153,104], "",       "Low 78, high 153."],
         ["Marc Lesser",     125.3, 52, [98,141,130,127],  "",       "Steady."],
         ["Hannah Berg",     111.1, 62, [111,98,146,102],  "soft",   "Their lowest expected score with handicap."]
       ],
       notes: [
         "Won 7 of their last 8. Team average with handicap went from 523 in the first half to 560 in the second.",
         "Season series 1-1: we won 559-488 in Week 2, lost 517-549 in Week 9 on Lane 6."
       ]},
      /* Semifinal is reseeded, so the opponent is not known until the
         quarterfinals finish. options are every team we can draw, most likely
         first. chance = estimated chance we draw them given we win; needs = the
         results that put them across from us. Once PLAYOFFS.games' semifinal
         has opp set, only that team's block shows and the tabs go away.
         Bite Legends and WHO cannot be our semifinal opponent under reseeding. */
      {round:"Semifinal", options: [
        {team:"Deli Meats", short:"Deli Meats", seed:1, rec:"19-5", proj:1104, odds:36, chance:62,
         needs:"Deli Meats beat WHO DO YOU THINK YOU ARE I AM on Lane 8.",
         bowlers: [
           ["Eddie Arecco",     175.9, 17, [218,246,150,152], "threat", "218 and 246 two weeks ago."],
           ["Danny O'Brien",    160.2, 28, [178,204,138,129], "threat", "Anchor. 21 games, high 225."],
           ["Ted Pfeifer",      150.7, 35, [147,166,136,166], "",       "Consistent."],
           ["Matt Stollstorff", 149.2, 36, [153,148,168,108], "",       "Only 6 games."],
           ["Cole Dudley",      124.6, 53, [88,143,138,129],  "soft",   "Ranges from 88 to 178."],
           ["Alex Realmuto",    112.0, 62, [122,112,95,87],   "soft",   "Has not bowled since 10/14."]
         ],
         notes: ["Won their last six.", "Beat us 549-498 in Week 5, our only meeting."]},
        {team:"Bowls on Parade", short:"Bowls", seed:5, rec:"13-11", proj:1088, odds:43, chance:17,
         needs:"WHO beat Deli Meats, Bite Legends beat Peanut Gutter & Jelly, and Bowls on Parade beat 2 Legit 2 Split.",
         bowlers: [
           ["Pete Dixon",           186.2, 10, [213,161,176,173], "threat", "Season low is 161."],
           ["Adam Maid",            167.1, 23, [141,213,187,138], "threat", "213 and 187 in the last four."],
           ["Brent Postlethweight", 141.7, 41, [174,144,121,129], "",       "Steady. 12 games, low 121."],
           ["Seth Keim",            138.6, 43, [202,124,156,144], "",       "High 202."],
           ["Konner Smith",         133.2, 47, [120,136,156,141], "",       "Ranges from 98 to 166."],
           ["Ally Martinelli",      117.8, 58, [132,112,125,101], "",       "Only 6 games."],
           ["Jaclyn Whalen",        113.1, 61, [103,141,134,108], "",       "Ranges from 90 to 141."],
           ["Eliza Hanson",          96.4, 73, [100,78,123,105],  "soft",   "Their lowest expected score with handicap."]
         ],
         notes: [
           "Eight of them have six games and only six bowl. The projection runs from 1,064 to 1,107 depending on who they send; 1,088 is the middle.",
           "Season series 1-1: lost 540-577 in Week 5, won 577-543 in Week 9."
         ]},
        {team:"2 Legit 2 Split", short:"2 Legit", seed:4, rec:"16-8", proj:1071, odds:53, chance:12,
         needs:"WHO beat Deli Meats, Bite Legends beat Peanut Gutter & Jelly, and 2 Legit 2 Split beat Bowls on Parade.",
         bowlers: [
           ["Dan O'Brien",     143.6, 39, [165,138,156,104], "",     "Low of 104 came in the most recent game."],
           ["Dave King",       141.7, 41, [124,123,179,113], "",     "14 games, the most on the team."],
           ["Grayson Johnson", 136.8, 44, [141,187,130,168], "",     "Has not bowled since 10/7."],
           ["Nicole Bell",     135.8, 45, [133,153,113,144], "",     "Ranges from 101 to 177."],
           ["Kevin Pernick",   119.4, 56, [126,69,84,124],   "soft", "69 and 84 in the last four."],
           ["Matt Duncan",      95.7, 73, [133,88,98,135],   "",     "133 and 135 in the last four, on a 73 handicap."]
         ],
         notes: ["Season series 1-1: lost 556-579 in Week 8, won 549-495 in Week 11."]},
        {team:"Peanut Gutter & Jelly", short:"PG&J", seed:6, rec:"13-11", proj:1063, odds:57, chance:9,
         needs:"WHO beat Deli Meats and Peanut Gutter & Jelly beat Bite Legends.",
         bowlers: [
           ["Luke Harris",     142.8, 40, [92,102,176,135],   "",       "Swings from 92 to 187."],
           ["Devon Bostick",   132.4, 47, [186,153,160,116],  "threat", "186, 153 and 160 in the last four."],
           ["Asher Tanenbaum", 131.4, 48, [103,139,143,136],  "",       "Ranges from 103 to 155."],
           ["Stanley Simons",  126.7, 51, [166,142,120,91],   "",       "166 down to 91 across the last four."],
           ["Jeff Novak",      118.2, 57, [148,101,135,98],   "",       "Ranges from 84 to 156."],
           ["Nyah Estevez",     95.4, 73, [130,69,71,86],     "soft",   "Last three: 69, 71, 86."]
         ],
         notes: ["Lost their last three.", "Season series 1-1: won 552-541 in Week 2, lost 539-590 in Week 10."]}
      ]}
    ]
  },
  // The league email, condensed. Nothing here is invented.
  rules: [
    "Lanes on at 6:45, games start at 7:00.",
    "Quarterfinal and semifinal, both 11/11: two games, three on three, all six bowlers bowl (three a game), total score wins.",
    "Semifinals are reseeded. The highest seed still in plays the lowest.",
    "Final, 11/18: four games, all six bowlers bowl twice, total score wins.",
    "Individual handicaps apply in every round as normal. They do not reset between rounds.",
    "Sub with a higher average: deduct the difference in averages. The absent bowler's handicap is used for that game, not the sub's.",
    "Sub with a lower average: the sub uses their own handicap.",
    "A sub cannot sub in a game they are bowling as themselves. Declare at the start of the game whether you are subbing or bowling as yourself.",
    "An alternate may sub only if they bowled six games in the regular season. Standard sub penalties apply.",
    "Tie after all games: every bowler bowls one more tenth frame, handicaps pro-rated to a tenth, and all six scores are added. Repeat until there is a winner."
  ]
};

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
   scores:{1:[136,124], 2:[125,97], 3:[95,90], 6:[93,105], 8:[95,null], 9:[104,null], 11:[null,113], 12:[null,94]}},
  {id:"ken",     name:"Ken Yamaguchi",   short:"Ken",     prev:140, alt:false, hcpPre:42,
   scores:{1:[149,122], 4:[151,160], 5:[139,114], 6:[132,141], 9:[null,154], 10:[105,181], 12:[139,113]}},
  {id:"ron",     name:"Ron Upperman",    short:"Ron",     prev:116, alt:false, hcpPre:59,
   scores:{1:[86,null], 2:[121,120], 3:[162,176], 4:[149,158], 5:[136,null], 7:[153,111], 8:[null,108], 10:[116,114], 11:[164,103], 12:[158,159]}},
  {id:"michael", name:"Michael Seidler", short:"Michael", sheetName:"Mike Seidler", prev:129, alt:false, hcpPre:49,
   scores:{1:[null,116], 4:[null,140], 5:[null,94], 8:[150,127], 9:[121,149], 11:[135,96]}},
  {id:"phil",    name:"Phil Marken",     short:"Phil",    sheetName:"Phill Marken", prev:134, alt:false, hcpPre:47,
   scores:{3:[125,148], 5:[139,157], 7:[103,133], 8:[145,149], 11:[108,null], 12:[120,null]}},
  {id:"prah",    name:"Dave Prah",       short:"Prah",    prev:138, alt:false, hcpPre:43,
   scores:{2:[144,180], 6:[149,141], 9:[142,146]}},
  {id:"kelvyn",  name:"Kelvyn Perez",    short:"Kelvyn",  prev:138, alt:true,  hcpPre:43,
   scores:{4:[167,null], 7:[92,139]}, note:"Alternate. Carries a real 138 average from last season, so his handicap is 43, not the 56 an unrated bowler gets."},
  {id:"jamiqve", name:"Jamiqve Mascoll", short:"Jamiqve", prev:120, alt:true,  hcpPre:56,
   scores:{}, note:"Alternate, on the league sheet with no prior average, so the league standard 120 stands in until he files one."},
  {id:"pete",    name:"Pete",            short:"Pete",    prev:120, alt:true,  hcpPre:56,
   scores:{}, note:"Not on the league sheet yet, still unconfirmed with the commissioner. Shown at the league standard 120 until that's settled."},
  {id:"kenny",   name:"Kenny Diaz",      short:"Kenny",   prev:173, alt:true,  hcpPre:19,
   scores:{10:[140,137]}, note:"Sub, a friend of Phil's. First night was 10/21. The league sheet carries a prior average for him, so his handicap started at 19, not the 56 an unrated bowler gets."}
];

/* ---------- schedule ----------
   Two games per bowling night. iso = date, time24 = start.
   us / them = official team totals; absent means not bowled yet.
   venue = only when a night is NOT at the home alley in Williamsburg. The
   night card, the availability note and the calendar export all pick it up.
--------------------------------------------------------------- */
const SCHEDULE = [
  {wk:1,  iso:"2026-08-19", time24:"19:00", lane:7, opp:"The Pinheads",                  us:533, them:470},
  {wk:1,  iso:"2026-08-19", time24:"20:10", lane:8, opp:"The Lane 5 Pole Dancers",       us:514, them:532},
  {wk:2,  iso:"2026-08-26", time24:"21:20", lane:5, opp:"Peanut Gutter & Jelly",         us:552, them:541},
  {wk:2,  iso:"2026-08-26", time24:"22:30", lane:5, opp:"The Milk Duds",                 us:559, them:488},
  {wk:3,  iso:"2026-09-02", time24:"21:20", lane:8, opp:"Pin Pals",                    us:547, them:532},
  {wk:3,  iso:"2026-09-02", time24:"22:30", lane:8, opp:"Gutter Sluts",                us:579, them:554},
  {wk:4,  iso:"2026-09-09", time24:"19:00", lane:7, opp:"The Bowled and the Beautiful", us:601, them:546},
  {wk:4,  iso:"2026-09-09", time24:"20:10", lane:7, opp:"Glory Bowl",                   us:601, them:502},
  {wk:5,  iso:"2026-09-16", time24:"19:00", lane:6, opp:"Bowls on Parade",              us:540, them:577},
  {wk:5,  iso:"2026-09-16", time24:"20:10", lane:6, opp:"Deli Meats",                   us:498, them:549},
  {wk:6,  iso:"2026-09-23", time24:"21:20", lane:6, opp:"Bite Legends",                 us:514, them:608},
  {wk:6,  iso:"2026-09-23", time24:"22:30", lane:6, opp:"Tokyo Drifters",               us:527, them:579},
  {wk:7,  iso:"2026-09-30", time24:"21:20", lane:7, opp:"The Pinheads",                 us:469, them:347},
    {wk:7,  iso:"2026-09-30", time24:"22:30", lane:7, opp:"Blame It On The Lane",         us:504, them:563},
  {wk:8,  iso:"2026-10-07", time24:"19:00", lane:8, opp:"2 Legit 2 Split",              us:556, them:579},
  {wk:8,  iso:"2026-10-07", time24:"20:10", lane:8, opp:"Bite Legends",                 us:530, them:556},
  {wk:9,  iso:"2026-10-14", time24:"21:20", lane:6, opp:"The Milk Duds",                us:517, them:549},
  {wk:9,  iso:"2026-10-14", time24:"22:30", lane:5, opp:"Bowls on Parade",              us:577, them:543},
  {wk:10, iso:"2026-10-21", time24:"21:20", lane:7, opp:"WHO DO YOU THINK YOU ARE I AM", venue:"The Gutter, Long Island City", us:468, them:490},
  {wk:10, iso:"2026-10-21", time24:"22:30", lane:8, opp:"Peanut Gutter & Jelly",         venue:"The Gutter, Long Island City", us:539, them:590},
  {wk:11, iso:"2026-10-28", time24:"19:00", lane:5, opp:"2 Legit 2 Split",              us:549, them:495},
  {wk:11, iso:"2026-10-28", time24:"20:10", lane:5, opp:"Glory Bowl",                   us:476, them:511},
  {wk:12, iso:"2026-11-04", time24:"19:00", lane:5, opp:"WHO DO YOU THINK YOU ARE I AM", us:552, them:497},
  {wk:12, iso:"2026-11-04", time24:"20:10", lane:6, opp:"Tokyo Drifters",               us:520, them:503}
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
  "2026-09-02": null,
  "2026-09-09": "fresh",
  "2026-09-23": "leroy"
};

/* ---------- availability, one entry per bowling night ----------
   Optional `lineup` overrides the auto-picked trio for that night. Two forms:

     lineup: ["Eric","Phil","Ron"]          same three bowl both games
     lineup: {1:["Ken","Ron","Kelvyn"],     a different trio per game, for the
              2:["Michael","Ron","Kelvyn"]} nights when a 4th or 5th shows up

   Leave it out and lineupFor() picks the three IN bowlers with the fewest
   games logged (ties keep roster order), which is what actually moves people
   toward the 6-game playoff threshold. Add it when the real lineup differs —
   a swap at the alley, someone bowling for a teammate.

   The per-game form matters for eligibility: a bowler in only one game earns
   one game toward the six, and the board projects accordingly.
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
    played: true,
    bowled: [["Eric",2], ["Ron",2], ["Phil",2]],
    sat:    [["Ken",""], ["Michael",""], ["Prah",""]]
  },
  "2026-09-09": {
    played: true,
    // Split night: Ken, Ron, Kelvyn took game 1; Michael came in for Kelvyn in
    // game 2 under member-before-alternate. Kept the lineup for the record —
    // `bowled` counts games but not which game each bowler took.
    lineup: {
      1: ["Ken","Ron","Kelvyn"],
      2: ["Michael","Ken","Ron"]
    },
    bowled: [["Ken",2], ["Ron",2], ["Kelvyn",1], ["Michael",1]],
    sat:    [["Eric",""], ["Phil",""], ["Prah",""]]
  },
  "2026-09-16": {
    played: true,
    // Michael called game 2 only. Ron already had 7 games, so he took game 1
    // and stepped out of game 2 to give Ken, Phil and Michael the reps.
    lineup: {
      1: ["Phil","Ron","Ken"],
      2: ["Michael","Phil","Ken"]
    },
    bowled: [["Ken",2], ["Phil",2], ["Ron",1], ["Michael",1]],
    sat:    [["Eric",""], ["Prah",""]]
  },
  "2026-09-23": {
    played: true,
    // Ken doubled to bank games before two weeks away; Ron offered to sit and
    // stayed on standby.
    bowled: [["Eric",2], ["Prah",2], ["Ken",2]],
    sat:    [["Phil",""], ["Michael",""], ["Ron",""]]
  },
  // Ken said on 9/21 he's away the next two weeks.
  "2026-09-30": {
    played: true,
    bowled: [["Ron",2], ["Phil",2], ["Kelvyn",2]],
    sat:    [["Ken",""], ["Eric",""], ["Michael",""], ["Prah",""]]
  },
  "2026-10-07": {
    played: true,
    // Ron came for support and took Eric's spot in game 2.
    lineup: {
      1: ["Eric","Michael","Phil"],
      2: ["Ron","Phil","Michael"]
    },
    bowled: [["Phil",2], ["Michael",2], ["Eric",1], ["Ron",1]],
    sat:    [["Ken",""], ["Prah",""]]
  },
  // Phil said on 10/5 he's out the next two weeks.
  "2026-10-14": {
    played: true,
    // Eric bowled game 1 and went home; Ken came in for game 2.
    lineup: {
      1: ["Eric","Michael","Prah"],
      2: ["Michael","Ken","Prah"]
    },
    bowled: [["Michael",2], ["Prah",2], ["Eric",1], ["Ken",1]],
    sat:    [["Phil",""], ["Ron",""], ["Kelvyn",""]]
  },
  "2026-10-21": {
    played: true,
    // Away night at The Gutter LIC. Kenny, a friend of Phil's, subbed both
    // games. Team results are from the league sheet; there were no cards.
    bowled: [["Ron",2], ["Ken",2], ["Kenny",2]],
    sat:    [["Eric",""], ["Phil",""], ["Michael",""], ["Prah",""], ["Kelvyn",""]]
  },
  "2026-10-28": {
    played: true,
    // Phil left for softball after game 1; Eric arrived for game 2.
    lineup: {
      1: ["Ron","Michael","Phil"],
      2: ["Ron","Michael","Eric"]
    },
    bowled: [["Ron",2], ["Michael",2], ["Phil",1], ["Eric",1]],
    sat:    [["Ken",""], ["Prah",""], ["Kelvyn",""]]
  },
  "2026-11-04": {
    played: true,
    // Last night of the season. Eric came in for Phil in game 2. Swept it.
    lineup: {
      1: ["Ken","Ron","Phil"],
      2: ["Ken","Ron","Eric"]
    },
    bowled: [["Ron",2], ["Ken",2], ["Phil",1], ["Eric",1]],
    sat:    [["Prah",""], ["Michael",""], ["Kelvyn",""]]
  },
  // Playoff night. All six bowl, three a game: set lineup {1:[...], 2:[...]}
  // once the two trios are decided and the night card shows them.
  "2026-11-11": {
    // Quarterfinal. All six starters in. Phil has softball at 8:30, so he
    // bowls the 7:00 game and the last game of the night only. This lineup is
    // the quarterfinal's; the semifinal's trios live on PLAYOFFS.
    // Game 1 card: Ron, Phil and Mike bowled, so Michael went in for Ken.
    // Everyone bowls once, which leaves Eric, Ken and Prah for game 2.
    played: true,
    lineup: {
      1: ["Ron","Phil","Michael"],
      2: ["Eric","Ken","Prah"]
    },
    bowled: [["Eric",1], ["Ken",1], ["Michael",1], ["Phil",1], ["Prah",1], ["Ron",1]],
    sat:    [["Kelvyn",""], ["Kenny",""]]
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
   We field 3 bowlers a game. Most nights the same three bowl both games, but
   when a 4th or 5th shows up the trio changes between games, so this resolves
   per game. Given the IN list, pick the three with the fewest games logged so
   the lineup itself works the playoff-eligibility problem. `lineup` in NIGHTS
   overrides, either as one array (both games) or {1:[...], 2:[...]}.

   lineupFor(iso)    -> the night: names is every bowler slated, in any game
   lineupFor(iso, 1) -> just game 1's three
   Returns short names, plus enough context for the UI to explain itself. */
function gameNumbers(iso){
  return SCHEDULE.filter(g => g.iso === iso).map((_, i) => i + 1);
}

/* The three the auto-picker would field: fewest games logged, roster order
   breaks ties. Shared by both the whole-night and per-game paths. */
function autoTrio(ins, need){
  return ins
    .map(s => ({s, p:playerByShort(s)}))
    .map(o => ({
      s: o.s,
      games: o.p ? playerStats(o.p.id).count : Infinity,
      order: o.p ? PLAYERS.indexOf(o.p) : Infinity
    }))
    .sort((a,b) => a.games - b.games || a.order - b.order)
    .slice(0, need)
    .map(o => o.s);
}

function lineupFor(iso, game){
  const n = NIGHTS[iso];
  const need = SEASON.needPerGame;
  const blank = {names:[], inCount:0, short:0, auto:true, manual:false,
                 played:false, game:game || null, split:false, byGame:{}};
  if (!n) return {...blank, short:need};

  if (n.played){
    // A played night reports who actually bowled; the count next to each name
    // already carries how many games they took, so there is nothing to split.
    const names = (n.bowled || []).map(x => x[0]);
    const byGame = {};
    for (const g of gameNumbers(iso)) byGame[g] = names;
    return {names, inCount:names.length, short:0, auto:false, manual:false,
            played:true, game:game || null, split:false, byGame};
  }

  const ins  = (n.in || []).map(x => x[0]);
  const nums = gameNumbers(iso);
  const lu   = n.lineup;
  const perGame = lu && !Array.isArray(lu) && typeof lu === "object";
  const manual  = !!(Array.isArray(lu) ? lu.length : perGame);

  // Resolve each game independently, then read the night off the parts.
  const byGame = {};
  for (const g of nums){
    let names;
    if (perGame && Array.isArray(lu[g]) && lu[g].length){
      names = lu[g].slice(0, need);
    } else if (Array.isArray(lu) && lu.length){
      names = lu.slice(0, need);
    } else if (perGame){
      // Per-game object with this game unset: fall back to the other game so a
      // half-filled night still reads sensibly, then to the auto trio.
      const other = nums.map(k => lu[k]).find(v => Array.isArray(v) && v.length);
      names = other ? other.slice(0, need) : autoTrio(ins, need);
    } else {
      names = autoTrio(ins, need);
    }
    byGame[g] = names;
  }

  const sets  = nums.map(g => byGame[g].join("|"));
  const split = new Set(sets).size > 1;

  if (game != null && byGame[game]){
    const names = byGame[game];
    return {names, inCount:ins.length, short:Math.max(0, need - names.length),
            auto:!manual, manual, played:false, game, split, byGame};
  }

  // Whole-night view: every bowler slated in any game, roster order.
  const union = [...new Set(nums.flatMap(g => byGame[g]))]
    .sort((a,b) => {
      const pa = playerByShort(a), pb = playerByShort(b);
      return (pa ? PLAYERS.indexOf(pa) : Infinity) - (pb ? PLAYERS.indexOf(pb) : Infinity);
    });
  // "Short" is about fielding a legal game, so measure the thinnest game.
  const worst = Math.max(...nums.map(g => Math.max(0, need - byGame[g].length)), 0);
  return {names:union, inCount:ins.length, short:worst,
          auto:!manual, manual, played:false, game:null, split, byGame};
}

/* How many of the night's games each bowler is slated for. The eligibility
   board needs this: someone in one game of a double-header earns one game
   toward the six, not two. Returns {shortName: gameCount}. */
function lineupGames(iso){
  const lu  = lineupFor(iso);
  const out = {};
  for (const g of Object.keys(lu.byGame))
    for (const nm of lu.byGame[g]) out[nm] = (out[nm] || 0) + 1;
  return out;
}

/* ---------- playoffs: read-only helpers ----------
   Playoff scores live on PLAYOFFS.games[].scores and nowhere else. They never
   enter PLAYERS.scores, so playerStats, league averages, handicaps, the
   eligibility count and the season record are untouched. That is also why
   handicaps are frozen for the playoffs: with no new regular-season games,
   playerStats() returns the same figure in every round. */
function playoffHcp(short){
  const p = playerByShort(short);
  return p ? playerStats(p.id).hcp : null;
}

/* A round's standing, from the rounds before it:
   "done"        its own result is in
   "out"         an earlier round was lost, so this one is off
   "conditional" waits on an earlier round that has no result yet
   "live"        on: the first round, or every earlier round was won */
function playoffStatus(g){
  const rounds = PLAYOFFS.games;
  const i = rounds.indexOf(g);
  for (let k = 0; k < i; k++){
    const r = rounds[k];
    if (r.us == null || r.them == null) return "conditional";
    if (r.us < r.them) return "out";
  }
  return (g.us != null && g.them != null) ? "done" : "live";
}

/* Sub terms per the league email: a higher-average sub gives back the
   difference in averages and bowls on the absent bowler's handicap; a
   lower-average sub bowls on their own. Averages are the app's league
   averages, the same ones the handicaps come from. */
function playoffSubTerms(subShort, forShort){
  const s = playerByShort(subShort), f = playerByShort(forShort);
  if (!s || !f) return null;
  const sa = playerStats(s.id).leagueAvg, fa = playerStats(f.id).leagueAvg;
  if (sa == null || fa == null) return null;
  const diff = Math.round(sa - fa);
  return {sub:subShort, for:forShort, higher:diff > 0, giveBack:Math.max(0, diff),
          hcp: diff > 0 ? playerStats(f.id).hcp : playerStats(s.id).hcp};
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
   (secondary accent: masthead rule). The logo mark — ball stroke and finger
   holes alike — is always --maple, so NYK renders it in the club orange. The
   wordmark is always --bone and no theme repaints it. It must NEVER touch
   --strike or --signal: those are semantic on this app (needs-attention vs
   done) and the eligibility pins are read at a glance. A red-primary team
   swapped into --strike would make every finished bowler look like an error.

   Palettes are colors only — no marks, no full club names. Codes are the
   label. Values are hand-tuned for contrast on --lane (#0E1116), not lifted
   raw from a brand sheet: a true club navy sinks into this background.

   The pre-paint application lives in an inline <head> script on each page,
   so the theme is on the element before first paint. This is the picker. */
/* ---------- league leaderboard ----------
   Read live from the league sheet's Leaderboard tab: every bowler in the
   league, ranked by scratch average, no minimum games. Rank is taken from the
   sheet as-is (ties keep the sheet's order); nothing is recomputed here.

   Trap from PLAN_SHEET_SYNC.md: a missing tab returns 200 with the FIRST
   sheet's data. So the header row must read Player / Team or we reject it.
   On any failure the last good copy on this device is used, flagged stale. */
const LB_URL = "https://docs.google.com/spreadsheets/d/1eRRPcCOAMt8T2kVdodaOWb0ZtKiVKRoZxKHh8Q70i-g/gviz/tq?tqx=out:csv&sheet=Leaderboard";
const LB_KEY = "rambowls_lb_v1";

function parseCSV(text){
  const rows = []; let row = [], f = "", q = false;
  for (let i = 0; i < text.length; i++){
    const c = text[i];
    if (q){
      if (c === '"' && text[i+1] === '"'){ f += '"'; i++; }
      else if (c === '"') q = false;
      else f += c;
    } else if (c === '"') q = true;
    else if (c === ",") { row.push(f); f = ""; }
    else if (c === "\n") { row.push(f); rows.push(row); row = []; f = ""; }
    else if (c !== "\r") f += c;
  }
  if (f !== "" || row.length) { row.push(f); rows.push(row); }
  return rows.map(r => r.map(v => v.trim()));
}

function parseLeaderboard(text){
  const rows = parseCSV(text);
  const h = rows.findIndex(r => r[2] === "Player" && r[3] === "Team");
  if (h < 0) throw new Error("Leaderboard header not found");
  const out = [];
  for (const r of rows.slice(h + 1)){
    const rank = parseInt(r[1], 10), games = parseInt(r[8], 10);
    if (!Number.isFinite(rank) || !r[2]) continue;
    out.push({rank, name:r[2], team:r[3], avg:+r[4], games:games || 0});
  }
  if (!out.length) throw new Error("Leaderboard empty");
  return out;
}

async function leaderboard(){
  try {
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), 8000);
    const res = await fetch(LB_URL, {signal: ctl.signal, cache: "no-store"});
    clearTimeout(t);
    if (!res.ok) throw new Error("HTTP " + res.status);
    const rows = parseLeaderboard(await res.text());
    const data = {at: Date.now(), rows};
    try { localStorage.setItem(LB_KEY, JSON.stringify(data)); } catch(e){}
    return {...data, stale:false};
  } catch(err){
    try {
      const raw = localStorage.getItem(LB_KEY);
      if (raw) return {...JSON.parse(raw), stale:true};
    } catch(e){}
    return null;
  }
}

/* A bowler's row, or null if they have no games on the sheet yet. `of` counts
   only bowlers who have bowled, not the empty alternate slots. */
function leagueRank(lb, id){
  const p = playerById(id);
  if (!lb || !p) return null;
  const want = (p.sheetName || p.name).toLowerCase();
  const row = lb.rows.find(r => r.name.toLowerCase() === want && r.team === "Rambowls");
  if (!row || !row.games) return null;
  return {...row, of: lb.rows.filter(r => r.games > 0).length};
}

root.RB = {
  SEASON, PLAYERS, SCHEDULE, SHIRTS, SHIRT_CALLS, NIGHTS, STANDINGS, PLAYOFFS,
  pad, todayISO, nights, weeks, playerById, playerByShort,
  officialGames, leagueAverage, handicapFor, playerStats, lastCompletedWeek,
  gamesRemaining, atRisk, lineupFor, lineupGames,
  playoffHcp, playoffStatus, playoffSubTerms,
  leaderboard, leagueRank, parseLeaderboard
};

/* data.js is loaded at the end of <body>, so the DOM is parsed by now.
   Both pages get the picker from this one call — neither page script
   needs to know themes exist. */

})(window);
