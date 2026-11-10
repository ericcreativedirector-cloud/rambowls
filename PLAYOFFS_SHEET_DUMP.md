# Playoff sheet dump

Source: the league Google Sheet "2026 Fall Wednesday League" (sheet id `1eRRPcCOAMt8T2kVdodaOWb0ZtKiVKRoZxKHh8Q70i-g`), read on 2026-11-10.

## How this was read

The xlsx download did not work from this environment. `curl -L` on the `export?format=xlsx` URL got an HTTP 307 redirect to `doc-0o-2k-sheets.googleusercontent.com`, and the network proxy refused that host (`CONNECT tunnel failed, response 403`). No xlsx file was written.

Everything below was read instead from the same sheet through two docs.google.com routes that this environment allows:

- The `htmlview` page, which lists every tab with its gid and renders each tab as a grid with real row numbers and merged-cell spans. Cell addresses below come from this view.
- The `gviz/tq?tqx=out:csv&gid=<gid>` export of every tab, used to grep all 20 tabs for playoff terms and to cross-check values. Note that this export drops leading empty rows, so its row numbers were not used.

Values are copied verbatim. Where something is not on the sheet, it says "not on the sheet".

## Summary: Rambowls in the playoffs

Rambowls appear once on the Playoffs tab, as the 7 seed in the QUARTERS round.

| Round | Lane | Matchup as written | Date | Time | Result cells |
|---|---|---|---|---|---|
| QUARTERS | Lane 6 (cell B14, "Lane" over "6") | The Milk Duds (2) vs Rambowls (7) | not on the sheet | not on the sheet | Game 1, Game 2, Total labels for each side (C15:C17 and F15:F17); score cells D15:D17 and G15:G17 are empty |

Seeding as shown on the Playoffs tab (the number in parentheses after each team name):

| Lane | Seed | Team as written on the tab | Seed | Team as written on the tab |
|---|---|---|---|---|
| Lane 8 | 1 | Deli Meats (1) | 8 | WHO DO YOU THINK YOU ARE I AM (8) |
| Lane 7 | 3 | Bite Legends (3) | 6 | Peanut Gutter & Jelly (6) |
| Lane 6 | 2 | The Milk Duds (2) | 7 | Rambowls (7) |
| Lane 5 | 4 | 2 Legit 2 Split (4) | 5 | Bowl on Parade (5) |

Bracket structure as shown: QUARTERS (four matchups, Game 1, Game 2, Total), SEMIS (two matchup blocks labelled Lane 8 and Lane 7 with no team names filled in, Game 1, Game 2, Total), FINALS (one matchup block with no team names or lane filled in, Game 1 through Game 4 and Total).

Not on the sheet: any date, time or week for the playoff rounds; which semifinal block the Lane 6 winner goes to; any team names in the SEMIS or FINALS blocks; any scores.

The Standings tab lists Rambowls in place 7 with 12 W, 12 L, Playoff Eligible "Yes" (row 8).

Spelling note: the Playoffs tab writes "Bowl on Parade (5)" while the Standings tab writes "Bowls on Parade". Both are copied as they appear.

## (a) Every sheet name

Twenty tabs, in the order the sheet shows them:

| # | Tab name | gid |
|---|---|---|
| 1 | Standings | 0 |
| 2 | Playoffs | 2080145705 |
| 3 | Schedule | 62 |
| 4 | Leaderboard | 61 |
| 5 | 2 Legit 2 Split | 69 |
| 6 | Bite Legends | 75 |
| 7 | Blame It On The Lane | 49 |
| 8 | The Bowled and the Beautiful | 65 |
| 9 | Bowls on Parade | 64 |
| 10 | Deli Meats | 71 |
| 11 | Glory Bowl | 66 |
| 12 | Gutter Sluts | 76 |
| 13 | The Lane 5 Pole Dancers | 78 |
| 14 | The Milk Duds | 72 |
| 15 | Peanut Gutter & Jelly | 67 |
| 16 | Pin Pals | 74 |
| 17 | The Pinheads | 68 |
| 18 | Rambowls | 73 |
| 19 | Tokyo Drifters | 77 |
| 20 | WHO DO YOU THINK YOU ARE I AM | 70 |

## (b) Tabs mentioning playoff, bracket, semi, final or seed

A case-insensitive grep for `playoff`, `bracket`, `semi`, `final` and `seed` over the CSV export of all 20 tabs matched only two tabs: Playoffs (name and contents: QUARTERS, SEMIS, FINALS) and Standings (the "Playoff Eligible" column). No other tab, including the Schedule, Leaderboard and the 16 team tabs, contains any of those words.

### Playoffs tab (gid 2080145705), every non-empty cell

Columns A through V are present; rows 1 and 2 and row 13 and row 18 are empty. Sheet-side row numbers.

| Cell | Row | Col | Value | Note |
|---|---|---|---|---|
| B3 | 3 | B | QUARTERS | merged B3:G3 |
| J3 | 3 | J | SEMIS | merged J3:O3 |
| R3 | 3 | R | FINALS | merged R3:V3 |
| B4 | 4 | B | Lane<br>8 | merged B4:B7 |
| C4 | 4 | C | Deli Meats (1) | merged C4:D4 |
| E4 | 4 | E | vs | merged E4:E7 |
| F4 | 4 | F | WHO DO YOU THINK YOU ARE I AM (8) | merged F4:G4 |
| J4 | 4 | J | Lane<br>8 | merged J4:J7 |
| M4 | 4 | M | vs | merged M4:M7 |
| T4 | 4 | T | vs | merged T4:T9 |
| C5 | 5 | C | Game 1 |  |
| F5 | 5 | F | Game 1 |  |
| K5 | 5 | K | Game 1 |  |
| N5 | 5 | N | Game 1 |  |
| R5 | 5 | R | Game 1 |  |
| U5 | 5 | U | Game 1 |  |
| C6 | 6 | C | Game 2 |  |
| F6 | 6 | F | Game 2 |  |
| K6 | 6 | K | Game 2 |  |
| N6 | 6 | N | Game 2 |  |
| R6 | 6 | R | Game 2 |  |
| U6 | 6 | U | Game 2 |  |
| C7 | 7 | C | Total |  |
| F7 | 7 | F | Total |  |
| K7 | 7 | K | Total |  |
| N7 | 7 | N | Total |  |
| R7 | 7 | R | Game 3 |  |
| U7 | 7 | U | Game 3 |  |
| R8 | 8 | R | Game 4 |  |
| U8 | 8 | U | Game 4 |  |
| B9 | 9 | B | Lane<br>7 | merged B9:B12 |
| C9 | 9 | C | Bite Legends (3) | merged C9:D9 |
| E9 | 9 | E | vs | merged E9:E12 |
| F9 | 9 | F | Peanut Gutter & Jelly (6) | merged F9:G9 |
| J9 | 9 | J | Lane<br>7 | merged J9:J12 |
| M9 | 9 | M | vs | merged M9:M12 |
| R9 | 9 | R | Total |  |
| U9 | 9 | U | Total |  |
| C10 | 10 | C | Game 1 |  |
| F10 | 10 | F | Game 1 |  |
| K10 | 10 | K | Game 1 |  |
| N10 | 10 | N | Game 1 |  |
| C11 | 11 | C | Game 2 |  |
| F11 | 11 | F | Game 2 |  |
| K11 | 11 | K | Game 2 |  |
| N11 | 11 | N | Game 2 |  |
| C12 | 12 | C | Total |  |
| F12 | 12 | F | Total |  |
| K12 | 12 | K | Total |  |
| N12 | 12 | N | Total |  |
| B14 | 14 | B | Lane<br>6 | merged B14:B17 |
| C14 | 14 | C | The Milk Duds (2) | merged C14:D14 |
| E14 | 14 | E | vs | merged E14:E17 |
| F14 | 14 | F | Rambowls (7) | merged F14:G14 |
| C15 | 15 | C | Game 1 |  |
| F15 | 15 | F | Game 1 |  |
| C16 | 16 | C | Game 2 |  |
| F16 | 16 | F | Game 2 |  |
| C17 | 17 | C | Total |  |
| F17 | 17 | F | Total |  |
| B19 | 19 | B | Lane<br>5 | merged B19:B22 |
| C19 | 19 | C | 2 Legit 2 Split (4) | merged C19:D19 |
| E19 | 19 | E | vs | merged E19:E22 |
| F19 | 19 | F | Bowl on Parade (5) | merged F19:G19 |
| C20 | 20 | C | Game 1 |  |
| F20 | 20 | F | Game 1 |  |
| C21 | 21 | C | Game 2 |  |
| F21 | 21 | F | Game 2 |  |
| C22 | 22 | C | Total |  |
| F22 | 22 | F | Total |  |

### Standings tab (gid 0), every non-empty cell

Columns A through R are present. Rows 18, 19 and 24 onward are empty.

| Cell | Row | Col | Value | Note |
|---|---|---|---|---|
| A1 | 1 | A | Place |  |
| B1 | 1 | B | Team |  |
| C1 | 1 | C | Avg |  |
| D1 | 1 | D | W |  |
| E1 | 1 | E | L |  |
| F1 | 1 | F | T |  |
| G1 | 1 | G | # Played |  |
| H1 | 1 | H | Avg. |  |
| I1 | 1 | I | Std. D |  |
| J1 | 1 | J | Total |  |
| K1 | 1 | K | Playoff Eligible |  |
| A2 | 2 | A | 1 |  |
| B2 | 2 | B | Deli Meats |  |
| C2 | 2 | C | 0.792 |  |
| D2 | 2 | D | 19 |  |
| E2 | 2 | E | 5 |  |
| F2 | 2 | F | 0 |  |
| G2 | 2 | G | 24 |  |
| H2 | 2 | H | 444 |  |
| I2 | 2 | I | 45 |  |
| J2 | 2 | J | 10,651 |  |
| K2 | 2 | K | Yes |  |
| A3 | 3 | A | 2 |  |
| B3 | 3 | B | The Milk Duds |  |
| C3 | 3 | C | 0.750 |  |
| D3 | 3 | D | 18 |  |
| E3 | 3 | E | 6 |  |
| F3 | 3 | F | 0 |  |
| G3 | 3 | G | 24 |  |
| H3 | 3 | H | 404 |  |
| I3 | 3 | I | 41 |  |
| J3 | 3 | J | 9,687 |  |
| K3 | 3 | K | Yes |  |
| M3 | 3 | M | Handicap Factors |  |
| A4 | 4 | A | 3 |  |
| B4 | 4 | B | Bite Legends |  |
| C4 | 4 | C | 0.667 |  |
| D4 | 4 | D | 16 |  |
| E4 | 4 | E | 8 |  |
| F4 | 4 | F | 0 |  |
| G4 | 4 | G | 24 |  |
| H4 | 4 | H | 459 |  |
| I4 | 4 | I | 59 |  |
| J4 | 4 | J | 11,026 |  |
| K4 | 4 | K | Yes |  |
| M4 | 4 | M | Set Point |  |
| N4 | 4 | N | 200 |  |
| A5 | 5 | A | 4 |  |
| B5 | 5 | B | 2 Legit 2 Split |  |
| C5 | 5 | C | 0.667 |  |
| D5 | 5 | D | 16 |  |
| E5 | 5 | E | 8 |  |
| F5 | 5 | F | 0 |  |
| G5 | 5 | G | 24 |  |
| H5 | 5 | H | 379 |  |
| I5 | 5 | I | 56 |  |
| J5 | 5 | J | 9,094 |  |
| K5 | 5 | K | Yes |  |
| M5 | 5 | M | Percent |  |
| N5 | 5 | N | 70% |  |
| A6 | 6 | A | 5 |  |
| B6 | 6 | B | Bowls on Parade |  |
| C6 | 6 | C | 0.542 |  |
| D6 | 6 | D | 13 |  |
| E6 | 6 | E | 11 |  |
| F6 | 6 | F | 0 |  |
| G6 | 6 | G | 24 |  |
| H6 | 6 | H | 413 |  |
| I6 | 6 | I | 45 |  |
| J6 | 6 | J | 9,921 |  |
| K6 | 6 | K | Yes |  |
| M6 | 6 | M | Ballast Games # |  |
| N6 | 6 | N | 4 |  |
| A7 | 7 | A | 6 |  |
| B7 | 7 | B | Peanut Gutter & Jelly |  |
| C7 | 7 | C | 0.542 |  |
| D7 | 7 | D | 13 |  |
| E7 | 7 | E | 11 |  |
| F7 | 7 | F | 0 |  |
| G7 | 7 | G | 24 |  |
| H7 | 7 | H | 370 |  |
| I7 | 7 | I | 52 |  |
| J7 | 7 | J | 8,876 |  |
| K7 | 7 | K | Yes |  |
| M7 | 7 | M | Standard Average |  |
| N7 | 7 | N | 120 |  |
| A8 | 8 | A | 7 |  |
| B8 | 8 | B | Rambowls |  |
| C8 | 8 | C | 0.500 |  |
| D8 | 8 | D | 12 |  |
| E8 | 8 | E | 12 |  |
| F8 | 8 | F | 0 |  |
| G8 | 8 | G | 24 |  |
| H8 | 8 | H | 392 |  |
| I8 | 8 | I | 36 |  |
| J8 | 8 | J | 9,397 |  |
| K8 | 8 | K | Yes |  |
| A9 | 9 | A | 8 |  |
| B9 | 9 | B | WHO DO YOU THINK YOU ARE I AM |  |
| C9 | 9 | C | 0.500 |  |
| D9 | 9 | D | 12 |  |
| E9 | 9 | E | 12 |  |
| F9 | 9 | F | 0 |  |
| G9 | 9 | G | 24 |  |
| H9 | 9 | H | 383 |  |
| I9 | 9 | I | 77 |  |
| J9 | 9 | J | 9,195 |  |
| K9 | 9 | K | Yes |  |
| M9 | 9 | M | Explanation of Handicaps |  |
| A10 | 10 | A | 9 |  |
| B10 | 10 | B | Blame It On The Lane |  |
| C10 | 10 | C | 0.458 |  |
| D10 | 10 | D | 11 |  |
| E10 | 10 | E | 13 |  |
| F10 | 10 | F | 0 |  |
| G10 | 10 | G | 24 |  |
| H10 | 10 | H | 404 |  |
| I10 | 10 | I | 41 |  |
| J10 | 10 | J | 9,692 |  |
| K10 | 10 | K | Yes |  |
| M10 | 10 | M | Handicaps in this league are applied to individual bowlers based on a set point and a percentage (200 and 70%, respectively).  Each bowler will get 70% of the difference between their average and 200.  So a 100 average gets +70, a 150 average gets +35, etc.  <br><br>Handicaps adjust all season as your average adjusts.  For each week your handicap is based on your average at the end of the previous week and will be in the spreadsheet and available on league nights at the Gutter.  For the first week your handicap is based on your previous season's average, which is slowly phased out over your first four games.  This is done to provide stable averages and prevent wild swings early in the season. | merged M10:R23 |
| A11 | 11 | A | 10 |  |
| B11 | 11 | B | Tokyo Drifters |  |
| C11 | 11 | C | 0.417 |  |
| D11 | 11 | D | 10 |  |
| E11 | 11 | E | 14 |  |
| F11 | 11 | F | 0 |  |
| G11 | 11 | G | 24 |  |
| H11 | 11 | H | 397 |  |
| I11 | 11 | I | 44 |  |
| J11 | 11 | J | 9,522 |  |
| K11 | 11 | K | Not Yet |  |
| A12 | 12 | A | 11 |  |
| B12 | 12 | B | Pin Pals |  |
| C12 | 12 | C | 0.417 |  |
| D12 | 12 | D | 10 |  |
| E12 | 12 | E | 14 |  |
| F12 | 12 | F | 0 |  |
| G12 | 12 | G | 24 |  |
| H12 | 12 | H | 391 |  |
| I12 | 12 | I | 39 |  |
| J12 | 12 | J | 9,376 |  |
| K12 | 12 | K | Yes |  |
| A13 | 13 | A | 12 |  |
| B13 | 13 | B | The Bowled and the Beautiful |  |
| C13 | 13 | C | 0.375 |  |
| D13 | 13 | D | 9 |  |
| E13 | 13 | E | 15 |  |
| F13 | 13 | F | 0 |  |
| G13 | 13 | G | 24 |  |
| H13 | 13 | H | 412 |  |
| I13 | 13 | I | 26 |  |
| J13 | 13 | J | 9,877 |  |
| K13 | 13 | K | Yes |  |
| A14 | 14 | A | 13 |  |
| B14 | 14 | B | The Lane 5 Pole Dancers |  |
| C14 | 14 | C | 0.375 |  |
| D14 | 14 | D | 9 |  |
| E14 | 14 | E | 15 |  |
| F14 | 14 | F | 0 |  |
| G14 | 14 | G | 24 |  |
| H14 | 14 | H | 376 |  |
| I14 | 14 | I | 37 |  |
| J14 | 14 | J | 9,024 |  |
| K14 | 14 | K | Yes |  |
| A15 | 15 | A | 14 |  |
| B15 | 15 | B | Gutter Sluts |  |
| C15 | 15 | C | 0.375 |  |
| D15 | 15 | D | 9 |  |
| E15 | 15 | E | 15 |  |
| F15 | 15 | F | 0 |  |
| G15 | 15 | G | 24 |  |
| H15 | 15 | H | 336 |  |
| I15 | 15 | I | 83 |  |
| J15 | 15 | J | 8,068 |  |
| K15 | 15 | K | Yes |  |
| A16 | 16 | A | 15 |  |
| B16 | 16 | B | Glory Bowl |  |
| C16 | 16 | C | 0.333 |  |
| D16 | 16 | D | 8 |  |
| E16 | 16 | E | 16 |  |
| F16 | 16 | F | 0 |  |
| G16 | 16 | G | 24 |  |
| H16 | 16 | H | 283 |  |
| I16 | 16 | I | 170 |  |
| J16 | 16 | J | 6,781 |  |
| K16 | 16 | K | Not Yet |  |
| A17 | 17 | A | 16 |  |
| B17 | 17 | B | The Pinheads |  |
| C17 | 17 | C | 0.292 |  |
| D17 | 17 | D | 7 |  |
| E17 | 17 | E | 17 |  |
| F17 | 17 | F | 0 |  |
| G17 | 17 | G | 24 |  |
| H17 | 17 | H | 319 |  |
| I17 | 17 | I | 113 |  |
| J17 | 17 | J | 7,653 |  |
| K17 | 17 | K | Not Yet |  |
| B20 | 20 | B | Links to other nights: |  |
| B21 | 21 | B | 2026 Fall Monday League |  |
| B22 | 22 | B | 2026 Fall Tuesday League |  |
| B23 | 23 | B | 2026 Fall Thursday League |  |

The three "2026 Fall ... League" cells in B21:B23 are hyperlinks to other Google Sheets (Monday, Tuesday, Thursday). The link targets are other spreadsheets and are not reproduced here.

## (c) Schedule tab blocks with a date after 4-Nov

Not on the sheet. The Schedule tab (gid 62) has 27 rows and columns A through BT. Its date header row is row 4, and the last date block is 4-Nov in columns BP:BT. There is no block, cell or note dated after 4-Nov anywhere on the tab, and no cell on the tab mentions playoffs.

Date header cells on row 4 of the Schedule tab, verbatim:

| Cell | Value |
|---|---|
| E4 | 19-Aug |
| K4 | 26-Aug |
| Q4 | 2-Sep |
| W4 | 9-Sep |
| AC4 | 16-Sep |
| AI4 | 23-Sep |
| AO4 | 30-Sep |
| AU4 | 7-Oct |
| BA4 | 14-Oct |
| BE4 | LONG ISLAND CITY WEEK! |
| BG4 | 21-Oct |
| BM4 | 28-Oct |
| BS4 | 4-Nov |

The Rambowls team tab (gid 73) also ends at 11/4 (Week 12: 7:00 Lane 5 vs WHO DO YOU THINK YOU ARE I AM, 8:10 Lane 6 vs Tokyo Drifters). No playoff row is listed there.

## (d) Standings tab as a table

All 16 teams, rows 2 through 17, columns as labelled on row 1.

| Place | Team | Avg | W | L | T | # Played | Avg. | Std. D | Total | Playoff Eligible |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Deli Meats | 0.792 | 19 | 5 | 0 | 24 | 444 | 45 | 10,651 | Yes |
| 2 | The Milk Duds | 0.750 | 18 | 6 | 0 | 24 | 404 | 41 | 9,687 | Yes |
| 3 | Bite Legends | 0.667 | 16 | 8 | 0 | 24 | 459 | 59 | 11,026 | Yes |
| 4 | 2 Legit 2 Split | 0.667 | 16 | 8 | 0 | 24 | 379 | 56 | 9,094 | Yes |
| 5 | Bowls on Parade | 0.542 | 13 | 11 | 0 | 24 | 413 | 45 | 9,921 | Yes |
| 6 | Peanut Gutter & Jelly | 0.542 | 13 | 11 | 0 | 24 | 370 | 52 | 8,876 | Yes |
| 7 | Rambowls | 0.500 | 12 | 12 | 0 | 24 | 392 | 36 | 9,397 | Yes |
| 8 | WHO DO YOU THINK YOU ARE I AM | 0.500 | 12 | 12 | 0 | 24 | 383 | 77 | 9,195 | Yes |
| 9 | Blame It On The Lane | 0.458 | 11 | 13 | 0 | 24 | 404 | 41 | 9,692 | Yes |
| 10 | Tokyo Drifters | 0.417 | 10 | 14 | 0 | 24 | 397 | 44 | 9,522 | Not Yet |
| 11 | Pin Pals | 0.417 | 10 | 14 | 0 | 24 | 391 | 39 | 9,376 | Yes |
| 12 | The Bowled and the Beautiful | 0.375 | 9 | 15 | 0 | 24 | 412 | 26 | 9,877 | Yes |
| 13 | The Lane 5 Pole Dancers | 0.375 | 9 | 15 | 0 | 24 | 376 | 37 | 9,024 | Yes |
| 14 | Gutter Sluts | 0.375 | 9 | 15 | 0 | 24 | 336 | 83 | 8,068 | Yes |
| 15 | Glory Bowl | 0.333 | 8 | 16 | 0 | 24 | 283 | 170 | 6,781 | Not Yet |
| 16 | The Pinheads | 0.292 | 7 | 17 | 0 | 24 | 319 | 113 | 7,653 | Not Yet |

## (e) Rules text about the playoffs

Not on the sheet. No tab contains rules text about the playoffs. The only playoff-related text outside the Playoffs tab is the Standings column header "Playoff Eligible" with the values "Yes" or "Not Yet" per team (rows 2 to 17, column K).

The only rules text on the sheet is about handicaps, in Standings M10 (merged M10:R23), quoted verbatim:

> Handicaps in this league are applied to individual bowlers based on a set point and a percentage (200 and 70%, respectively).  Each bowler will get 70% of the difference between their average and 200.  So a 100 average gets +70, a 150 average gets +35, etc.  
>
> Handicaps adjust all season as your average adjusts.  For each week your handicap is based on your average at the end of the previous week and will be in the spreadsheet and available on league nights at the Gutter.  For the first week your handicap is based on your previous season's average, which is slowly phased out over your first four games.  This is done to provide stable averages and prevent wild swings early in the season.

Handicap factor cells next to it (Standings M3:N7), verbatim: "Handicap Factors"; "Set Point" 200; "Percent" 70%; "Ballast Games #" 4; "Standard Average" 120.

