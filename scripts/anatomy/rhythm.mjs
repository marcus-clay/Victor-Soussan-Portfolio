// Figure 4, "Rhythm": a weekly planner. A long base plate carries two parallel trays, Discovery
// at the back and Delivery in front, cut into four stations (Monday, Tuesday to Wednesday,
// Thursday, Friday) that follow a day ruler along the front edge. Each Discovery station is a
// small scene with the same people as the other figures (the ink designer, the light PM and the
// user); each Delivery station holds what gets built that day, linked by wires.
import { k, bind, baseplate, figure } from "./shared.mjs";
import { person, chair } from "./people.mjs";

export const WIDTH = 640;
export const HEIGHT = 360;

// ── layout ────────────────────────────────────────────────────────────────────────────────
const DAY = 72; // one day on the ruler
const STATIONS = [
  [0, DAY], // Monday
  [DAY, DAY * 3], // Tuesday and Wednesday
  [DAY * 3, DAY * 4], // Thursday
  [DAY * 4, DAY * 5], // Friday
];
const PLATE = { x: -16, y: -88, w: 392, d: 176, r: 12 };
const BACK = { x: 0, y: -72, w: 360, d: 64, r: 5 }; // Discovery
const FRONT = { x: 0, y: 2, w: 360, d: 56, r: 5 }; // Delivery
const TRAY_H = 3;
const PAD_H = 1.2;
const PADZ = TRAY_H + PAD_H; // 4.2: where everything stands
const BACK_PAD = { y: -69, d: 58 };
const FRONT_PAD = { y: 5, d: 50 };
const RULER = { x: -4, y: 64, w: 368, d: 9, r: 1.5 };

const P = k.fitProjection(
  [
    ...k.boxCorners(PLATE, -16, 0),
    [36, -40, 60],
    [172, -40, 50],
    [279, -36, 54],
    [343, -57, 54],
    [250, -65, 48],
    [324, 42, 40],
  ],
  WIDTH,
  HEIGHT,
  { pad: 10, azimuth: 78, elevation: 42 },
);
const B = bind(P);
const { at, S, L, D, box, can, byDepth } = B;

// ── small helpers ─────────────────────────────────────────────────────────────────────────
const halo = (plan, z, h, blur = 4) => `<path class="iso-halo" d="${k.haloOf(plan, z, h, P)}" style="filter:blur(${blur}px)"/>`;
/** Thin standing slab on a face that looks toward +y (the viewer): a card, a screen, a note. */
const plank = (x, y, w, z, h, o = {}) =>
  S(k.slabOf({ x, y, w, d: o.d ?? 0.8, r: o.r ?? 0.8 }, z, h, P, 2, 0), { tone: o.tone ?? "mid", crease: o.crease ?? "faint", className: o.cls, lit: o.lit });
/** A segment lying in the plane y = const. */
const fseg = (y, x0, z0, x1, z1) => k.segment([x0, y, z0], [x1, y, z1], P);
/** A closed rounded rectangle lying in the plane y = const. */
const frect = (y, x, z, w, h, r = 1.5) => k.pathOf(k.roundedPlan({ x, y: z, w, d: h, r }, 3).map(([a, b]) => at([a, y, b])), true);
const wire = (a, b, via = []) => k.wireSvg(at(a), at(b), { via: via.map(at), tone: "mid", size: 1.1 });
const text = (pts, z, tone = "lo") => L(pts.map(([a, b]) => k.lineOnTop(a, b, z, P)).join(""), { tone, free: true });

// a deterministic hand for the sketches
let seed = 11;
const rnd = () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646 - 0.5;
};
const stroke = (a, b, z, wobble = 0.5) => {
  const pts = [];
  for (let i = 0; i <= 3; i++) {
    const t = i / 3;
    pts.push([a[0] + (b[0] - a[0]) * t + rnd() * wobble, a[1] + (b[1] - a[1]) * t + rnd() * wobble]);
  }
  return k.onTop(pts, z, P);
};
const sketch = (a, b, z) => L(stroke(a, b, z), { tone: "mid", free: true });

// ── ground: plate, trays, stations, ruler ─────────────────────────────────────────────────
function ground() {
  const out = [baseplate(B, { plate: PLATE, strip: false })];
  for (const tray of [BACK, FRONT]) out.push(box(tray, 0, TRAY_H, { steps: 5, bevel: 0.5 }));
  for (const [tray, pad] of [[BACK, BACK_PAD], [FRONT, FRONT_PAD]]) {
    void tray;
    for (const [a, b] of STATIONS) {
      const plan = { x: a + 3, y: pad.y, w: b - a - 6, d: pad.d, r: 3 };
      out.push(box(plan, TRAY_H, PAD_H, { tone: "lo", steps: 4, bevel: 0.4 }));
      out.push(D(k.corners(plan, 4.4).map(([x, y]) => at([x, y, PADZ])), { size: 0.4 }));
    }
  }
  // the day ruler: a strip with minor ticks, a major every 24 and a taller tick at each day
  out.push(S(k.slabOf(RULER, 0, 0.6, P, 3), { tone: "lo", crease: "none" }));
  const edge = RULER.y + 0.8;
  const t = k.topTicks(0, 360, 4, 6, edge, 0.6, [2.4, 4], P);
  const days = k.topTicks(0, 360, DAY, 1, edge, 0.6, [6.4, 6.4], P);
  out.push(L(t.minor, { tone: "lo" }), L(t.major, { tone: "mid" }), L(days.major, { tone: "hi" }));
  out.push(D([at([RULER.x + 2, RULER.y + 4.5, 0.6]), at([RULER.x + RULER.w - 2, RULER.y + 4.5, 0.6])], { size: 0.45 }));
  // track badges at the left end of each tray: a lens for Discovery, a block for Delivery
  const badge = (y, icon) => {
    const o = [];
    o.push(S(k.cylinder(-8, y, 5.2, 0, 1.6, P, 28, 0.3), { tone: "mid", crease: "faint" }));
    o.push(L(k.ring(-8, y, 3.8, 1.6, P, 24), { tone: "lo" }));
    o.push(icon(y));
    return o.join("");
  };
  out.push(
    badge(BACK.y + BACK.d / 2, (y) => L(k.ring(-8.6, y - 0.6, 1.7, 1.6, P, 16), { tone: "hi" }) + L(k.lineOnTop([-7.4, y + 0.6], [-5.6, y + 2.4], 1.6, P), { tone: "hi", free: true })),
  );
  out.push(
    badge(FRONT.y + FRONT.d / 2, (y) => L(k.planOutline({ x: -10.4, y: y - 2.2, w: 4.4, d: 4.4, r: 0.6 }, 1.6, P, 2), { tone: "hi" })),
  );
  return out.join("");
}

// ── Discovery: Monday, align (a table, two people, cards, a timer) ────────────────────────
const MON = { y: -40 };
function mondayTable() {
  const out = [];
  const plan = { x: 21, y: -49, w: 30, d: 18, r: 2 };
  const legH = 10;
  const top = PADZ + legH + 2.2; // 16.4
  for (const [x, y] of byDepth(k.corners(plan, 3.2))) out.push(can(x, y, 1.3, PADZ, legH, { steps: 12, tone: "lo", crease: "none" }));
  out.push(halo(plan, PADZ + legH, 2.2));
  out.push(box(plan, PADZ + legH, 2.2, { steps: 4, bevel: 0.5 }));
  out.push(L(k.planOutline(k.insetPlan(plan, 2.2), top, P, 3), { tone: "faint" }));
  // three note cards, one lit by the hi tone
  const cards = [
    { x: 24, y: -46.5, w: 6.4, d: 6.4, tone: "mid" },
    { x: 32.4, y: -47, w: 6.4, d: 6.4, tone: "hi" },
    { x: 25.5, y: -38.4, w: 6.4, d: 6.4, tone: "hi" },
  ];
  cards.forEach((c, i) => {
    out.push(S(k.slabOf({ x: c.x, y: c.y, w: c.w, d: c.d, r: 0.6 }, top, 0.7, P, 2, 0), { tone: c.tone, crease: "faint" }));
    out.push(text([[[c.x + 1.2, c.y + 2.2], [c.x + c.w - 1.2 - (i % 2) * 1.4, c.y + 2.2]], [[c.x + 1.2, c.y + 4.2], [c.x + c.w - 2.4, c.y + 4.2]]], top + 0.7));
  });
  return out.join("");
}
function timer(cx, cy, z, r = 4.4) {
  const out = [];
  out.push(S(k.cylinder(cx, cy, r, z, 3, P, 28, 0.4), { tone: "hi", crease: "lo" }));
  const t = z + 3;
  out.push(L(k.ring(cx, cy, r - 1.1, t, P, 28), { tone: "lo" }));
  const ticks = k.radialTicks(cx, cy, r - 1.1, 12, 3, t, [0.7, 1.4], P);
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
  // the hand, from the hub to the ring
  const a = 1.9;
  out.push(L(k.lineOnTop([cx, cy], [cx + Math.sin(a) * (r - 1.1), cy - Math.cos(a) * (r - 1.1)], t, P), { tone: "hi" }));
  out.push(S(k.cylinder(cx, cy, 1, t, 0.7, P, 12), { tone: "mid", crease: "none" }));
  return out.join("");
}

// ── Discovery: Tuesday to Wednesday, the interview ────────────────────────────────────────
const IV = { x: 144, y: -40 };
const IV_TOP = 24;
function roundTable() {
  const out = [];
  out.push(halo({ x: IV.x - 14, y: IV.y - 14, w: 28, d: 28, r: 14 }, PADZ + 17, 7));
  out.push(S(k.cylinder(IV.x, IV.y, 7, PADZ, 1.4, P, 32, 0.4), { tone: "lo", crease: "faint" }));
  out.push(S(k.cylinder(IV.x, IV.y, 2.4, PADZ + 1.4, IV_TOP - 2 - PADZ - 1.4, P, 20), { tone: "mid", crease: "none" }));
  out.push(L(k.sideArc(IV.x, IV.y, 2.4, 12, P, 16), { tone: "faint" }));
  out.push(S(k.cylinder(IV.x, IV.y, 14, IV_TOP - 2, 2, P, 48, 0.5), { tone: "mid", crease: "faint" }));
  out.push(L(k.ring(IV.x, IV.y, 11.4, IV_TOP, P, 44), { tone: "faint" }));
  return out.join("");
}
function interviewTablet() {
  const out = [];
  const body = { x: 133, y: -45, w: 14, d: 10, r: 1.6 };
  out.push(S(k.slabOf(body, IV_TOP, 1, P, 3, 0.3), { tone: "hi", crease: "faint" }));
  const z = IV_TOP + 1;
  out.push(S(k.slabOf(k.insetPlan(body, 1.1), z, 0.3, P, 2, 0), { tone: "lo", crease: "none" }));
  const zz = z + 0.3;
  out.push(L(k.planOutline({ x: 135, y: -43, w: 10, d: 2, r: 0.5 }, zz, P, 2), { tone: "mid" }));
  out.push(text([[[135, -39.6], [143.4, -39.6]], [[135, -37.6], [141, -37.6]]], zz));
  return out.join("");
}
function notepad() {
  const out = [];
  for (let i = 0; i < 3; i++) out.push(S(k.slabOf({ x: 148 + i * 0.3, y: -44 + i * 0.3, w: 8, d: 10, r: 0.6 }, IV_TOP, 0.6, P, 2, 0), { tone: i === 2 ? "hi" : "mid", crease: "faint" }));
  const z = IV_TOP + 1.8;
  out.push(text([[[149.6, -41.2], [154.6, -41.2]], [[149.6, -39.2], [153.6, -39.2]], [[149.6, -37.2], [154.2, -37.2]]], z));
  // a pen lying across the table edge of the notepad
  out.push(S(k.slabOf({ x: 133, y: -33.4, w: 10, d: 1.6, r: 0.7 }, IV_TOP, 1.6, P, 2, 0), { tone: "mid", crease: "none" }));
  out.push(S(k.slabOf({ x: 143, y: -33.4, w: 2.6, d: 1.6, r: 0.6 }, IV_TOP, 1.6, P, 2, 0), { tone: "lo", crease: "none" }));
  return out.join("");
}
function camera() {
  const out = [];
  const [cx, cy] = [94, -58];
  // a round pedestal, a column, a head plate, the body and its lens
  out.push(S(k.cylinder(cx, cy, 5.4, PADZ, 1.6, P, 24, 0.4), { tone: "mid", crease: "faint" }));
  out.push(S(k.cylinder(cx, cy, 1.6, PADZ + 1.6, 15, P, 14), { tone: "mid", crease: "none" }));
  out.push(L(k.sideArc(cx, cy, 1.6, PADZ + 9, P, 12), { tone: "faint" }));
  out.push(S(k.cylinder(cx, cy, 3.4, PADZ + 16.6, 1.6, P, 20, 0.3), { tone: "mid", crease: "faint" }));
  out.push(box({ x: cx - 6, y: cy - 3.5, w: 12, d: 7, r: 1.6 }, PADZ + 18.2, 6.4, { steps: 4, bevel: 0.5 }));
  out.push(box({ x: cx + 6, y: cy - 2.2, w: 4, d: 4.4, r: 1.4 }, PADZ + 19.4, 4, { tone: "hi", bevel: 0.3 }));
  out.push(L(k.sideRing([cx + 10, cy, PADZ + 21.4], 1.7, "x", P, 16), { tone: "mid" }));
  out.push(S(k.cylinder(cx - 2.6, cy + 0.5, 1, PADZ + 24.6, 0.9, P, 12), { tone: "hi", crease: "none" }));
  return out.join("");
}
function dataChart() {
  const out = [];
  const base = { x: 186, y: -65, w: 26, d: 16, r: 2 };
  out.push(box(base, PADZ, 1.4, { tone: "mid", bevel: 0.3 }));
  const z = PADZ + 1.4;
  out.push(L(k.planOutline(k.insetPlan(base, 1.8), z, P, 3), { tone: "faint" }));
  [4, 9, 6.5, 12].forEach((h, i) => out.push(box({ x: 189 + i * 5.6, y: -61.4, w: 4, d: 8.8, r: 0.8 }, z, h, { tone: i === 3 ? "hi" : "mid", bevel: 0.2, steps: 3 })));
  return out.join("");
}

// ── Discovery: Thursday, patterns (a board of notes, sketch sheets) ───────────────────────
const BOARD = { x: 222, y: -67, w: 54, d: 3 };
const BOARD_Z = 12;
const BOARD_H = 34;
const BF = BOARD.y + BOARD.d; // the writing face, y = -64
function board() {
  const out = [];
  // two posts and the panel
  [225, 270].forEach((x) => out.push(box({ x, y: -66, w: 4, d: 4, r: 1 }, PADZ, BOARD_Z - PADZ + 2, { bevel: 0.3 })));
  out.push(box({ x: BOARD.x, y: BOARD.y, w: BOARD.w, d: BOARD.d, r: 1.2 }, BOARD_Z, BOARD_H, { steps: 3, bevel: 0.6 }));
  out.push(plank(BOARD.x + 2.4, BF, BOARD.w - 4.8, BOARD_Z + 2.4, BOARD_H - 4.8, { tone: "lo", crease: "none", d: 0.5, r: 1 }));
  const fy = BF + 0.5;
  out.push(D([at([BOARD.x + 1.4, BF, BOARD_Z + BOARD_H - 1.4]), at([BOARD.x + BOARD.w - 1.4, BF, BOARD_Z + BOARD_H - 1.4])], { size: 0.4 }));
  // notes: two clusters, each circled by a dashed loop
  const note = (x, z, tone = "mid", lines = 2) => {
    const o = [plank(x, fy, 9, z, 9, { tone, d: 0.9, r: 0.5, crease: "faint" })];
    for (let i = 0; i < lines; i++) o.push(L(fseg(fy + 0.9, x + 1.6, z + 6.2 - i * 2.4, x + 7.4 - i * 1.6, z + 6.2 - i * 2.4), { tone: "lo", free: true }));
    return o.join("");
  };
  out.push(L(frect(fy, 226, 19, 24, 24, 3), { tone: "mid", dashed: true }));
  out.push(note(228, 32, "hi"), note(239, 32, "hi"), note(233.5, 21, "mid"));
  out.push(L(frect(fy, 255, 20, 16, 24, 3), { tone: "mid", dashed: true }));
  out.push(note(258, 33, "mid"), note(258, 22.4, "hi"));
  // the pattern link, from one cluster to the other
  out.push(k.wireSvg(at([248, fy + 0.9, 36.5]), at([258, fy + 0.9, 37.5]), { tone: "hi", size: 1 }));
  return out.join("");
}
function sketchSheets() {
  const out = [];
  for (let i = 0; i < 3; i++) out.push(S(k.slabOf({ x: 224 + i * 4, y: -28 + i * 3, w: 24, d: 15, r: 0.8 }, PADZ, 0.8, P, 2, 0), { tone: i === 2 ? "hi" : "mid", crease: "faint" }));
  const z = PADZ + 2.4;
  const [ox, oy] = [232, -19];
  out.push(L(k.planOutline({ x: ox + 1, y: oy + 1.6, w: 20, d: 3.6, r: 0.6 }, z, P, 2), { tone: "mid" }));
  out.push(sketch([ox + 1, oy + 8], [ox + 8.6, oy + 8], z), sketch([ox + 1, oy + 10.6], [ox + 7, oy + 10.6], z));
  out.push(L(k.planOutline({ x: ox + 11.4, y: oy + 7, w: 9.6, d: 5.6, r: 0.8 }, z, P, 2), { tone: "mid" }));
  // loose notes still to be placed on the board
  [[254, -29, "mid"], [264.6, -26, "hi"], [259, -19.4, "hi"]].forEach(([x, y, tone], i) => {
    out.push(S(k.slabOf({ x, y, w: 8, d: 8, r: 0.7 }, PADZ, 0.7, P, 2, 0), { tone, crease: "faint" }));
    out.push(text([[[x + 1.4, y + 2.6], [x + 6.4, y + 2.6]], [[x + 1.4, y + 5], [x + 5 - (i % 2), y + 5]]], PADZ + 0.7));
  });
  return out.join("");
}

// ── Discovery: Friday, share and decide ───────────────────────────────────────────────────
function fridayStand() {
  const out = [];
  out.push(halo({ x: 296, y: -52, w: 30, d: 16, r: 3 }, PADZ, 2));
  out.push(box({ x: 296, y: -52, w: 30, d: 16, r: 3 }, PADZ, 2, { bevel: 0.4 }));
  out.push(box({ x: 308, y: -45.4, w: 6, d: 5, r: 1.2 }, PADZ + 2, 11.8, { bevel: 0.3 }));
  const tab = { x: 297, y: -48, w: 28, d: 2.6, r: 1.4 };
  out.push(box(tab, 18, 25, { tone: "hi", bevel: 0.6, steps: 4 }));
  const f = tab.y + tab.d; // -45.4
  out.push(plank(299, f, 24, 20.4, 20.2, { tone: "lo", crease: "none", d: 0.5, r: 1 }));
  const c = f + 0.5;
  out.push(plank(301, c, 20, 35, 3.6, { tone: "mid", d: 0.7, r: 0.5, crease: "none" }));
  out.push(plank(301, c, 9, 23, 10, { tone: "hi", d: 0.9, r: 0.6 }), plank(312, c, 9, 23, 10, { tone: "hi", d: 0.9, r: 0.6 }));
  // the presented screen carries one finished detail: a ring gauge in the first card
  out.push(L(k.sideRing([305.5, c + 0.9, 28], 2.6, "y", P, 20), { tone: "mid" }));
  out.push(L(fseg(c + 0.9, 316.5, 26, 320, 26) + fseg(c + 0.9, 316.5, 29.4, 319, 29.4), { tone: "lo", free: true }));
  return out.join("");
}
function stamp() {
  const out = [];
  // the decision card, with the mark the stamp left, and the stamp itself in ink
  const card = { x: 312, y: -35, w: 16, d: 14, r: 1 };
  out.push(S(k.slabOf(card, PADZ, 0.8, P, 2, 0), { tone: "hi", crease: "faint" }));
  const z = PADZ + 0.8;
  out.push(L(k.ring(card.x + 8, card.y + 7, 4.4, z, P, 24), { tone: "hi" }));
  out.push(L(k.onTop([[card.x + 5.6, card.y + 7.4], [card.x + 7.4, card.y + 9.2], [card.x + 10.6, card.y + 5]], z, P), { tone: "hi", free: true }));
  out.push(box({ x: 298, y: -35, w: 11, d: 11, r: 2.4 }, PADZ, 5, { tone: "hi", bevel: 0.5, steps: 4, className: "ink" }));
  out.push(S(k.cylinder(303.5, -29.5, 2, PADZ + 5, 7, P, 18), { tone: "hi", crease: "none", className: "ink" }));
  out.push(S(k.cylinder(303.5, -29.5, 3.6, PADZ + 12, 2.6, P, 24, 0.4), { tone: "hi", crease: "lo", className: "ink" }));
  return out.join("");
}
function backlog() {
  const out = [];
  const n = 5;
  for (let i = 0; i < n; i++) out.push(S(k.slabOf({ x: 332 + i * 0.5, y: -42 + i * 0.5, w: 20, d: 26, r: 1.4 }, PADZ + i * 1.3, 1.2, P, 3, 0), { tone: i === n - 1 ? "hi" : "mid", crease: "faint" }));
  const top = PADZ + n * 1.3 - 0.1;
  const [ox, oy] = [332 + (n - 1) * 0.5, -42 + (n - 1) * 0.5];
  out.push(text([[[ox + 3, oy + 4], [ox + 14, oy + 4]]], top, "hi"));
  [0, 1, 2].forEach((i) => {
    const y = oy + 10 + i * 5.6;
    out.push(D([at([ox + 4, y, top])], { size: 0.8, tone: "hi" }));
    out.push(text([[[ox + 8, y], [ox + 17 - i * 2.4, y]]], top));
  });
  return out.join("");
}

// ── Delivery: what gets built each day ────────────────────────────────────────────────────
const SCREEN_Y = 10;
const SCREEN_W = 44;
const SCREEN_D = 32;
function mondaySketch() {
  const out = [];
  const sheet = { x: 8, y: 10, w: 38, d: 28, r: 1 };
  out.push(S(k.slabOf(sheet, PADZ, 0.8, P, 2, 0), { tone: "hi", crease: "faint" }));
  const z = PADZ + 0.8;
  const [ox, oy] = [sheet.x + 3, sheet.y + 3];
  out.push(L(k.planOutline({ x: ox, y: oy, w: 32, d: 5, r: 0.8 }, z, P, 2), { tone: "mid" }));
  out.push(L(k.planOutline({ x: ox, y: oy + 8.4, w: 14, d: 10, r: 0.8 }, z, P, 2), { tone: "mid" }));
  out.push(sketch([ox, oy + 8.4], [ox + 14, oy + 18.4], z), sketch([ox + 14, oy + 8.4], [ox, oy + 18.4], z));
  out.push(sketch([ox + 18, oy + 10], [ox + 32, oy + 10], z), sketch([ox + 18, oy + 13.6], [ox + 29, oy + 13.6], z), sketch([ox + 18, oy + 17], [ox + 31, oy + 17], z));
  return out.join("");
}
function sprintGoal() {
  const out = [];
  const [cx, cy] = [58, 46];
  out.push(halo({ x: cx - 7, y: cy - 7, w: 14, d: 14, r: 7 }, PADZ, 2.4, 3));
  out.push(S(k.cylinder(cx, cy, 7, PADZ, 2.4, P, 32, 0.4), { tone: "hi", crease: "lo" }));
  const z = PADZ + 2.4;
  [5, 3].forEach((r) => out.push(L(k.ring(cx, cy, r, z, P, 24), { tone: "mid" })));
  out.push(S(k.cylinder(cx, cy, 1.3, z, 0.9, P, 12), { tone: "mid", crease: "none" }));
  return out.join("");
}
function tabletCard(x, tone) {
  const out = [];
  const body = { x, y: SCREEN_Y, w: SCREEN_W, d: SCREEN_D, r: 3 };
  out.push(halo(body, PADZ, 3, 3));
  out.push(S(k.slabOf(body, PADZ, 2.6, P, 4, 0.6), { tone, crease: "faint" }));
  out.push(S(k.slabOf(k.insetPlan(body, 2.6), PADZ + 2.6, 0.4, P, 3, 0), { tone: "lo", crease: "none" }));
  return out.join("");
}
function wireframeScreen(x) {
  const out = [tabletCard(x, "mid")];
  const z = PADZ + 3.1;
  const o = [x + 5, SCREEN_Y + 5];
  const rect = (rx, ry, w, d, r = 1) => L(k.planOutline({ x: o[0] + rx, y: o[1] + ry, w, d, r }, z, P, 2), { tone: "mid" });
  out.push(rect(0, 0, 34, 5));
  out.push(rect(0, 8.4, 15, 11));
  out.push(L(k.lineOnTop([o[0], o[1] + 8.4], [o[0] + 15, o[1] + 19.4], z, P) + k.lineOnTop([o[0] + 15, o[1] + 8.4], [o[0], o[1] + 19.4], z, P), { tone: "lo" }));
  out.push(text([[[o[0] + 19, o[1] + 10.4], [o[0] + 34, o[1] + 10.4]], [[o[0] + 19, o[1] + 14], [o[0] + 30, o[1] + 14]], [[o[0] + 19, o[1] + 17.4], [o[0] + 32, o[1] + 17.4]]], z, "mid"));
  out.push(rect(0, 22, 12, 4, 2), rect(16, 22, 18, 4, 1));
  return out.join("");
}
function prototypeScreen(x) {
  const out = [tabletCard(x, "hi")];
  const z = PADZ + 3.1;
  const o = [x + 5, SCREEN_Y + 5];
  out.push(box({ x: o[0], y: o[1], w: 34, d: 5, r: 1.2 }, z, 1.6, { tone: "mid", bevel: 0.2, steps: 3 }));
  out.push(D([at([o[0] + 3, o[1] + 2.5, z + 1.6]), at([o[0] + 6.4, o[1] + 2.5, z + 1.6])], { size: 0.45 }));
  out.push(box({ x: o[0], y: o[1] + 8.4, w: 15, d: 11, r: 1.6 }, z, 2.4, { tone: "hi", bevel: 0.3, steps: 3 }));
  out.push(L(k.ring(o[0] + 7.5, o[1] + 13.9, 3.6, z + 2.4, P, 20), { tone: "mid" }));
  out.push(box({ x: o[0] + 19, y: o[1] + 8.4, w: 15, d: 11, r: 1.6 }, z, 2.4, { tone: "hi", bevel: 0.3, steps: 3 }));
  [2.4, 4.4, 3, 5].forEach((h, i) => out.push(box({ x: o[0] + 21.4 + i * 3, y: o[1] + 17.4 - h * 1.5, w: 2, d: h * 1.5, r: 0.5 }, z + 2.4, 1.4 + h * 0.18, { tone: "mid", bevel: 0.1, steps: 2 })));
  out.push(box({ x: o[0], y: o[1] + 22, w: 12, d: 4, r: 2 }, z, 1.8, { tone: "hi", bevel: 0.3, steps: 4 }));
  out.push(box({ x: o[0] + 16, y: o[1] + 22, w: 18, d: 4, r: 1 }, z, 0.9, { tone: "mid", bevel: 0.1, steps: 3 }));
  return out.join("");
}
function chatBubbles() {
  const out = [];
  const a = { x: 186, y: 10, w: 22, d: 11, r: 5 };
  const b = { x: 190, y: 26, w: 22, d: 11, r: 5 };
  out.push(S(k.slabOf(a, PADZ, 2, P, 5, 0.4), { tone: "mid", crease: "faint" }));
  out.push(text([[[a.x + 5, a.y + 4], [a.x + 17, a.y + 4]], [[a.x + 5, a.y + 7], [a.x + 13, a.y + 7]]], PADZ + 2));
  out.push(S(k.slabOf(b, PADZ, 2, P, 5, 0.4), { tone: "hi", crease: "faint" }));
  out.push(D([b.x + 6, b.x + 11, b.x + 16].map((x) => at([x, b.y + 5.5, PADZ + 2])), { size: 0.8, tone: "hi" }));
  return out.join("");
}
function miniScreen(x, lit = false) {
  const out = [];
  const body = { x, y: 8, w: 14, d: 26, r: 2 };
  out.push(S(k.slabOf(body, PADZ, 2, P, 4, 0.4), { tone: lit ? "hi" : "mid", crease: "faint" }));
  const z = PADZ + 2;
  out.push(L(k.planOutline({ x: x + 2, y: 10, w: 10, d: 3, r: 0.8 }, z, P, 2), { tone: "mid" }));
  out.push(S(k.slabOf({ x: x + 2, y: 15.6, w: 10, d: 7, r: 1 }, z, 1.4, P, 3, 0), { tone: "hi", crease: "faint" }));
  out.push(S(k.slabOf({ x: x + 2, y: 26, w: 10, d: 3.6, r: 1.8 }, z, 1.2, P, 4, 0), { tone: "hi", crease: "faint" }));
  out.push(text([[[x + 3, 24.2], [x + 10, 24.2]]], z));
  return out.join("");
}
function demoMonitor() {
  const out = [];
  const base = { x: 314, y: 38, w: 20, d: 12, r: 3 };
  out.push(halo(base, PADZ, 2));
  out.push(box(base, PADZ, 2, { bevel: 0.4 }));
  out.push(box({ x: 322, y: 42, w: 4, d: 4, r: 1 }, PADZ + 2, 8, { bevel: 0.2 }));
  const m = { x: 300, y: 40, w: 48, d: 3, r: 1.6 };
  const mz = PADZ + 10; // 14.2
  out.push(box(m, mz, 22, { tone: "hi", bevel: 0.7, steps: 4 }));
  const f = m.y + m.d; // 43
  out.push(plank(302.6, f, 42.8, mz + 2.2, 17.6, { tone: "lo", crease: "none", d: 0.5, r: 1.2 }));
  const c = f + 0.5;
  // the demo: a title bar, a hero card with a play mark, two small cards
  out.push(plank(305, c, 38, mz + 16.4, 2.6, { tone: "mid", d: 0.7, r: 0.5, crease: "none" }));
  out.push(plank(305, c, 24, mz + 4, 10.6, { tone: "hi", d: 0.9, r: 0.8 }));
  const [px, pz] = [317, mz + 9.3];
  out.push(L(k.sideRing([px, c + 0.9, pz], 3.2, "y", P, 24), { tone: "mid" }));
  out.push(L(k.segment([px - 1, c + 0.9, pz - 1.8], [px + 1.8, c + 0.9, pz], P) + k.segment([px + 1.8, c + 0.9, pz], [px - 1, c + 0.9, pz + 1.8], P) + k.segment([px - 1, c + 0.9, pz + 1.8], [px - 1, c + 0.9, pz - 1.8], P), { tone: "hi" }));
  out.push(plank(332, c, 11, mz + 9.2, 5.4, { tone: "mid", d: 0.9, r: 0.6 }), plank(332, c, 11, mz + 4, 4, { tone: "mid", d: 0.9, r: 0.6 }));
  out.push(D([at([303.4, f, mz + 20.4]), at([345.6, f, mz + 20.4])], { size: 0.4 }));
  return out.join("");
}

// ── links between the Delivery objects ────────────────────────────────────────────────────
function wires() {
  const z = PADZ + 0.15;
  const out = [];
  out.push(wire([46, 24, z], [80, 26, z]), wire([124, 26, z + 0.3], [134, 26, z + 0.3]));
  out.push(wire([178, 18, z + 0.3], [186, 15.5, z]));
  out.push(wire([212, 31.5, z], [222, 31.5, z]));
  out.push(wire([236, 21, z + 0.6], [244, 21, z + 0.6]), wire([258, 21, z + 0.6], [266, 21, z + 0.6]));
  out.push(wire([280, 30, z + 0.6], [314, 44, z]));
  return out.join("");
}

// ── assemble, far to near ─────────────────────────────────────────────────────────────────
const feet = PADZ;
const items = [
  // Discovery
  { c: [11, MON.y, feet], svg: person(B, { x: 11, y: MON.y, z: PADZ, kind: "standing", ink: true }) },
  { c: [36, MON.y, feet], svg: mondayTable() + timer(44.6, -40, 16.4) },
  { c: [61, MON.y, feet], svg: person(B, { x: 61, y: MON.y, z: PADZ, kind: "standing", ink: false }) },
  { c: [94, -58, feet], svg: camera() },
  { c: [118, IV.y, feet], svg: chair(B, { x: 118, y: IV.y, z: PADZ, w: 14, d: 14, h: 8 }) + person(B, { x: 118, y: IV.y, z: PADZ + 8 + 2.4, kind: "seated", ink: false }) },
  { c: [IV.x, IV.y, feet], svg: roundTable() + interviewTablet() + notepad() },
  { c: [170, IV.y, feet], svg: chair(B, { x: 170, y: IV.y, z: PADZ, w: 14, d: 14, h: 8 }) + person(B, { x: 170, y: IV.y, z: PADZ + 8 + 2.4, kind: "seated", ink: true }) },
  { c: [199, -57, feet], svg: dataChart() },
  { c: [250, -65, feet], svg: board() },
  { c: [248, -22, feet], svg: sketchSheets() },
  { c: [279, -36, feet], svg: person(B, { x: 279, y: -36, z: PADZ, kind: "standing", ink: true }) },
  { c: [311, -44, feet], svg: fridayStand() },
  { c: [343, -57, feet], svg: person(B, { x: 343, y: -57, z: PADZ, kind: "standing", ink: false }) },
  { c: [312, -28, feet], svg: stamp() },
  { c: [342, -29, feet], svg: backlog() },
  // Delivery
  { c: [27, 24, feet], svg: mondaySketch() },
  { c: [58, 46, feet], svg: sprintGoal() },
  { c: [102, 26, feet], svg: wireframeScreen(80) },
  { c: [156, 26, feet], svg: prototypeScreen(134) },
  { c: [197, 24, feet], svg: chatBubbles() },
  { c: [229, 21, feet], svg: miniScreen(222) },
  { c: [251, 21, feet], svg: miniScreen(244) },
  { c: [273, 21, feet], svg: miniScreen(266, true) },
  { c: [324, 44, feet], svg: demoMonitor() },
];

// the slider that marks Friday sits on the ruler
const slider = () =>
  box({ x: 319, y: 64.6, w: 10, d: 7.8, r: 1.6 }, 0.6, 5, { tone: "hi", bevel: 0.4, steps: 4, className: "ink" }) +
  L(k.lineOnTop([321.4, 68.5], [326.6, 68.5], 5.6, P), { tone: "faint", free: true });

export const svg = figure({
  width: WIDTH,
  height: HEIGHT,
  label:
    "A weekly planner. A long base plate carries two trays, Discovery at the back and Delivery in front, cut into four stations along a day ruler: Monday, Tuesday to Wednesday, Thursday and Friday. In Discovery, the designer and the product manager stand facing each other at a table with note cards and a timer on Monday; the designer and a user sit across a round table with a tablet, a camera and a chart on Tuesday and Wednesday; the designer stands at a board of clustered notes beside sketch sheets on Thursday; a prototype on a stand, a decision stamp and a stack of prioritised backlog cards close the week on Friday. In Delivery, a sketch, a wireframe and a prototype screen are linked by wires, followed by chat bubbles, three matching screens and a demo monitor. A marker sits on Friday on the ruler.",
  body: [ground(), ...byDepth(items, (item) => item.c).map((item) => item.svg), wires(), slider()],
});
