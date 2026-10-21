// Figure 1, "Frame": a framing workshop. A whiteboard on an easel carries the problem, the
// hypotheses and the success criteria, read left to right. On the left of the plate, an interview
// corner (a designer in ink and a user across a round table) produces note cards that rise along
// a dotted wire to the first column of the board. On the table sit the three formats the workshop
// hands over (the FigJam board on a laptop, the restitution deck, the written document) and a timer.
import { k, bind, baseplate, figure } from "./shared.mjs";
import { person, chair } from "./people.mjs";

export const WIDTH = 640;
export const HEIGHT = 360;

const PLATE = { x: -172, y: -88, w: 344, d: 168, r: 10 };
const TABLE = { x: -36, y: -12, w: 188, d: 86, r: 5 };
const TABLE_Z = 34;
const TABLE_H = 5;
const TOP = TABLE_Z + TABLE_H; // 39

const FRAME = { x: -136, y: -82, w: 272, d: 8, r: 2 };
const FRAME_Z = 50; // the board is raised so the table never hides its lower notes
const FRAME_H = 126;
const PANEL = { x: -130, y: -74, w: 260, d: 1.2, r: 1 };
const PANEL_Z = FRAME_Z + 6;
const PANEL_H = 114;
const FACE = PANEL.y + PANEL.d; // the writing surface, y = -72.8
const LEDGE_TOP = PANEL_Z + 2.4;
// Board content is written in board-local heights (30 = panel bottom, 144 = panel top)
const DZ = PANEL_Z - 30;

const P = k.fitProjection(
  [
    ...k.boxCorners(PLATE, -16, 0),
    [FRAME.x, FRAME.y, FRAME_Z + FRAME_H],
    [FRAME.x + FRAME.w, FRAME.y, FRAME_Z + FRAME_H],
    [TABLE.x + TABLE.w, TABLE.y + TABLE.d, TOP + 20],
  ],
  WIDTH,
  HEIGHT,
  { pad: 18, azimuth: 58, elevation: 28 },
);
const B = bind(P);
const { at, S, L, D, box, can, byDepth } = B;

// A point on the writing surface: (x across, z up)
const onFace = (x, z, lift = 0) => [x, FACE + lift, z + DZ];
const faceLine = (x0, z0, x1, z1, lift = 0) => k.segment(onFace(x0, z0, lift), onFace(x1, z1, lift), P);
const faceRing = (x, z, r, lift = 0, steps = 28) => k.sideRing(onFace(x, z, lift), r, "y", P, steps);
const stub = (x0, x1, z, lift = 0) => L(faceLine(x0, z, x1, z, lift), { tone: "lo", free: true });

/** Sticky note stuck on the board: a thin standing slab. */
function note(x, z, w, h, { lit = false, lines = 2, depth = 1.2 } = {}) {
  const plan = { x, y: FACE, w, d: depth, r: 0.6 };
  const front = FACE + depth;
  const out = [S(k.slabOf(plan, z + DZ, h, P, 2, 0), { tone: lit ? "hi" : "mid", crease: lit ? "lo" : "faint", className: lit ? "ink" : undefined })];
  for (let i = 0; i < lines; i++) {
    const zz = z + DZ + h - 7 - i * 5.5;
    const long = i === 0 ? 0.74 : 0.5;
    out.push(L(k.segment([x + 4, front, zz], [x + 4 + (w - 8) * long, front, zz], P), { tone: "lo", free: true }));
  }
  if (!lit) out.push(D([at([x + w / 2, front, z + DZ + h - 2.6])], { size: 0.55, tone: "hi" }));
  return out.join("");
}

function plate() {
  return baseplate(B, {
    plate: PLATE,
    label: { x: 118, y: 62, w: 38, d: 18, r: 2 },
  });
}

function easel() {
  const out = [];
  for (const x of [-118, 108]) {
    out.push(box({ x, y: -86, w: 10, d: 18, r: 2 }, 0, FRAME_Z, { bevel: 0.5 }));
    out.push(L(k.sideSeam({ x, y: -86, w: 10, d: 18, r: 2 }, FRAME_Z * 0.45, P, 3), { tone: "faint" }));
    out.push(D([at([x + 5, -86 + 9, FRAME_Z])], { size: 0.45 }));
  }
  // cross-brace between the legs
  out.push(box({ x: -112, y: -84, w: 224, d: 4, r: 1 }, 14, 5, { bevel: 0.4 }));
  // frame, panel, marker ledge
  out.push(box(FRAME, FRAME_Z, FRAME_H, { steps: 3, bevel: 0.8 }));
  out.push(S(k.slabOf(PANEL, PANEL_Z, PANEL_H, P, 2, 0), { tone: "lo", crease: "none" }));
  out.push(box({ x: PANEL.x, y: FACE, w: PANEL.w, d: 5, r: 1 }, PANEL_Z, 2.4, { bevel: 0.4 }));
  out.push(D([at([-122, FRAME.y + FRAME.d, FRAME_Z + FRAME_H - 4]), at([122, FRAME.y + FRAME.d, FRAME_Z + FRAME_H - 4])], { size: 0.45 }));
  // markers resting on the ledge
  [[-100, "mid"], [-90, "hi"], [-80, "mid"]].forEach(([x, tone]) => {
    out.push(S(k.slabOf({ x, y: FACE + 1.2, w: 6.2, d: 2.8, r: 1.2 }, LEDGE_TOP, 2.8, P, 2, 0), { tone, crease: "none" }));
  });
  return out.join("");
}

function boardContent() {
  const out = [];
  const top = 30 + PANEL_H; // board-local
  // column dividers run edge to edge, from the ledge to the top rail
  for (const x of [-43, 43]) out.push(L(faceLine(x, LEDGE_TOP - DZ, x, top), { tone: "faint" }));
  // column headings: a numbered ring and a title line
  [[-122, 56], [-35, 40], [52, 48]].forEach(([x, len], i) => {
    out.push(L(faceRing(x, top - 12, 3.6, 0, 20), { tone: "mid" }));
    // the number of the step, as one, two or three dots inside the ring
    const pips = i === 0 ? [[0, 0]] : i === 1 ? [[-1.3, 0], [1.3, 0]] : [[0, 1.5], [-1.4, -0.9], [1.4, -0.9]];
    out.push(D(pips.map(([dx, dz]) => at(onFace(x + dx, top - 12 + dz))), { size: 0.5, tone: "hi" }));
    out.push(stub(x + 8, x + 8 + len * 0.7, top - 12));
  });

  // 1 · the problem: one big note that everything else points at
  out.push(note(-118, 72, 52, 44, { lit: true, lines: 3, depth: 1.6 }));
  out.push(note(-120, 40, 24, 24, { lines: 2 }));
  out.push(note(-92, 40, 24, 24, { lines: 2 }));
  // risks: a small warning triangle pinned to two of the notes
  for (const nx of [-120, -92]) {
    const cx = nx + 19.4;
    const cz = 40 + 24 - 6.6;
    const tri = [[cx - 2.3, cz - 1.8], [cx + 2.3, cz - 1.8], [cx, cz + 2.2]].map(([x, z]) => at(onFace(x, z, 1.3)));
    out.push(L(k.pathOf(tri, true), { tone: "hi" }));
    out.push(D([at(onFace(cx, cz - 0.5, 1.3))], { size: 0.4, tone: "hi" }));
  }

  // 2 · hypotheses: a grid of small notes
  [92, 62].forEach((z) => {
    [-39, -11, 17].forEach((x) => out.push(note(x, z, 22, 22, { lines: 2 })));
  });

  // 3 · success criteria: a target and a checklist
  [22, 14, 6.5].forEach((r) => out.push(L(faceRing(86, 96, r, 0.1, 36), { tone: r === 6.5 ? "hi" : "mid" })));
  out.push(D([at(onFace(86, 96, 0.1))], { size: 0.8, tone: "hi" }));
  [64, 50, 36].forEach((z, i) => {
    out.push(S(k.slabOf({ x: 54, y: FACE, w: 8, d: 1, r: 0.5 }, z + DZ, 8, P, 2, 0), { tone: "mid", crease: "none" }));
    if (i < 2) out.push(L(k.segment(onFace(55.6, z + 4.2, 1.2), onFace(57.8, z + 2.2, 1.2), P) + k.segment(onFace(57.8, z + 2.2, 1.2), onFace(61, z + 6.4, 1.2), P), { tone: "hi" }));
    out.push(stub(68, i === 0 ? 112 : i === 1 ? 104 : 96, z + 4, 0.2));
  });

  // flow: problem → hypotheses → success criteria
  const wire = (a, b) => k.wireSvg(at(a), at(b), { tone: "mid", size: 1.1 });
  out.push(wire(onFace(-66, 96, 1.7), onFace(-39, 103, 1.3)));
  out.push(wire(onFace(39, 103, 1.3), onFace(64, 96, 0.2)));
  out.push(wire(onFace(39, 73, 1.3), onFace(62, 68, 1.2)));
  return out.join("");
}

function table() {
  const out = [];
  const legs = k.corners(TABLE, 14);
  for (const [x, y] of byDepth(legs)) {
    out.push(can(x, y, 4.6, 0, TABLE_Z, { steps: 20, bevel: 0 }));
  }
  out.push(`<path class="iso-halo" d="${k.haloOf(TABLE, TABLE_Z, TABLE_H, P)}" style="filter:blur(5px)"/>`);
  out.push(box(TABLE, TABLE_Z, TABLE_H, { steps: 5, bevel: 1 }));
  out.push(L(k.planOutline(k.insetPlan(TABLE, 4), TOP, P, 5), { tone: "faint" }));
  out.push(D(k.corners(TABLE, 8).map(([x, y]) => at([x, y, TOP])), { size: 0.45 }));
  return out.join("");
}

// ── things on the table ───────────────────────────────────────────────────────────────────
function laptop() {
  const out = [];
  const base = { x: -30, y: 4, w: 68, d: 46, r: 3 };
  out.push(box(base, TOP, 2.6, { steps: 3, bevel: 0.6 }));
  const keysTop = TOP + 2.6;
  out.push(D(k.dotGrid(base.x + 8, 22, 9, 3, 6, keysTop, P), { size: 0.4, tone: "lo" }));
  out.push(L(k.planOutline({ x: base.x + 24, y: 38, w: 20, d: 8, r: 2 }, keysTop, P, 3), { tone: "faint" }));
  // lid with its screen: a miniature of the board
  const lid = { x: base.x, y: base.y, w: base.w, d: 3, r: 1.2 };
  out.push(box(lid, keysTop, 46, { steps: 3, bevel: 0.6 }));
  const sy = lid.y + lid.d;
  out.push(S(k.slabOf({ x: base.x + 4, y: sy, w: base.w - 8, d: 0.7, r: 1 }, keysTop + 4, 38, P, 2, 0), { tone: "lo", crease: "none" }));
  const sz = keysTop + 4;
  const sw = base.w - 8;
  for (const f of [1 / 3, 2 / 3]) out.push(L(k.segment([base.x + 4 + sw * f, sy + 0.7, sz], [base.x + 4 + sw * f, sy + 0.7, sz + 38], P), { tone: "faint" }));
  // tiny notes in the three columns
  [[0, [20, 8]], [1, [24, 24, 6]], [2, [12]]].forEach(([col, zs]) => {
    zs.forEach((z, i) => {
      const x = base.x + 4 + sw * (col / 3) + 2.4 + (i % 2) * 8.6;
      out.push(S(k.slabOf({ x, y: sy + 0.7, w: 7, d: 0.5, r: 0.3 }, sz + 6 + z * 0.9 + (col === 1 ? 0 : 0), 6, P, 2, 0), { tone: col === 0 && i === 0 ? "hi" : "mid", crease: "none" }));
    });
  });
  out.push(D([at([base.x + base.w / 2, sy, keysTop + 44.4])], { size: 0.5 }));
  return out.join("");
}

function timer() {
  const out = [];
  const [cx, cy, r] = [52, 60, 12];
  out.push(`<path class="iso-halo" d="${k.haloOf({ x: cx - r, y: cy - r, w: r * 2, d: r * 2, r }, TOP, 6, P)}" style="filter:blur(4px)"/>`);
  out.push(S(k.cylinder(cx, cy, r, TOP, 9, P, 56, 0.8), { tone: "hi", crease: "lo" }));
  const z = TOP + 9;
  out.push(L(k.knurl(cx, cy, r, z - 3.2, z, 64, P, 0.3), { tone: "lo" }));
  out.push(L(k.ring(cx, cy, r - 2.4, z, P, 56), { tone: "lo" }));
  const t = k.radialTicks(cx, cy, r - 3, 60, 5, z, [1.1, 2.4], P);
  out.push(L(t.minor, { tone: "lo" }), L(t.major, { tone: "mid" }));
  // the time left is a thin wedge, about a third of the dial
  const wedge = [[cx, cy]];
  for (let i = 0; i <= 14; i++) {
    const a = -Math.PI / 2 + (i / 14) * 1.9; // clockwise from 12 o'clock as seen from above, roughly
    wedge.push([cx + Math.sin(i / 14 * 1.9) * (r - 4.4), cy - Math.cos(i / 14 * 1.9) * (r - 4.4)]);
  }
  out.push(S(k.extrude(wedge, z, 0.5, P, { convex: true }), { tone: "lo", crease: "none" }));
  out.push(L(k.lineOnTop([cx, cy], [cx + Math.sin(1.9) * (r - 4.4), cy - Math.cos(1.9) * (r - 4.4)], z + 0.5, P), { tone: "hi" }));
  out.push(S(k.cylinder(cx, cy, 2.2, z, 1.6, P, 16), { tone: "mid", crease: "none" }));
  // crown on the +x side
  out.push(S(k.slabOf({ x: cx + r - 0.5, y: cy - 2, w: 3.4, d: 4, r: 1 }, TOP + 3, 3.4, P, 2, 0), { tone: "mid", crease: "none" }));
  return out.join("");
}

function deck() {
  const out = [];
  for (let i = 0; i < 5; i++) {
    const plan = { x: 44 + i * 3.4, y: 6 + i * 2.6, w: 48, d: 28, r: 1.6 };
    out.push(S(k.slabOf(plan, TOP + i * 1.6, 1.5, P, 3, 0), { tone: i === 4 ? "hi" : "mid", crease: "faint" }));
  }
  // the top slide: title bar, two content blocks
  const top = TOP + 5 * 1.6 - 0.1;
  const o = { x: 44 + 4 * 3.4, y: 6 + 4 * 2.6 };
  out.push(L(k.lineOnTop([o.x + 5, o.y + 7], [o.x + 28, o.y + 7], top, P), { tone: "hi", free: true }));
  out.push(L(k.planOutline({ x: o.x + 5, y: o.y + 12, w: 16, d: 11, r: 1 }, top, P, 2), { tone: "lo" }));
  out.push(L(k.planOutline({ x: o.x + 25, y: o.y + 12, w: 18, d: 11, r: 1 }, top, P, 2), { tone: "lo" }));
  return out.join("");
}

function doc() {
  const out = [];
  const sheet = { x: 108, y: 44, w: 36, d: 28, r: 1 };
  out.push(S(k.slabOf(sheet, TOP, 0.9, P, 2, 0), { tone: "hi", crease: "faint" }));
  const z = TOP + 0.9;
  out.push(L(k.lineOnTop([sheet.x + 4, sheet.y + 5], [sheet.x + 22, sheet.y + 5], z, P), { tone: "hi", free: true }));
  [10, 14, 18, 22].forEach((dy, i) => {
    out.push(L(k.lineOnTop([sheet.x + 4, sheet.y + dy], [sheet.x + sheet.w - 4 - (i === 3 ? 12 : 0), sheet.y + dy], z, P), { tone: "lo", free: true }));
  });
  return out.join("");
}

// ── interview corner: a user and the designer across a round table ───────────────────────
const IV = { x: -116, y: 32 }; // centre of the round table
const IV_R = 21;
const IV_TOP = 27;
const SEAT = 13; // chair height; seated people start here
const PERSON = 1.3;
const CARD = { w: 14, d: 0.9, h: 10.5 };
// the insight cards rise from the table to the first column of the board, one step each
const CARDS = [
  { y: 12, z: 38 },
  { y: -8, z: 49 },
  { y: -28, z: 60 },
];

function interviewTable() {
  const out = [];
  out.push(`<path class="iso-halo" d="${k.haloOf({ x: IV.x - IV_R, y: IV.y - IV_R, w: IV_R * 2, d: IV_R * 2, r: IV_R }, 0, 4, P)}" style="filter:blur(4px)"/>`);
  out.push(S(k.cylinder(IV.x, IV.y, 10, 0, 1.8, P, 28, 0.4), { tone: "lo", crease: "none" }));
  out.push(S(k.cylinder(IV.x, IV.y, 3.2, 1.8, 21, P, 16), { tone: "mid", crease: "none" }));
  out.push(L(k.sideArc(IV.x, IV.y, 3.2, 10, P, 12), { tone: "faint" }));
  out.push(S(k.cylinder(IV.x, IV.y, IV_R, 22.8, IV_TOP - 22.8, P, 44, 0.6), { tone: "mid", crease: "faint" }));
  out.push(L(k.ring(IV.x, IV.y, IV_R - 2.6, IV_TOP, P, 44), { tone: "faint" }));
  // a tablet and two index cards lie on the table: what the interview is about
  const tab = { x: IV.x - 11, y: IV.y - 7, w: 22, d: 14, r: 1.8 };
  out.push(S(k.slabOf(tab, IV_TOP, 1.1, P, 3, 0.3), { tone: "hi", crease: "faint" }));
  const tz = IV_TOP + 1.1;
  out.push(L(k.planOutline(k.insetPlan(tab, 1.6), tz, P, 3), { tone: "lo" }));
  [4, 7, 10].forEach((dy, i) => out.push(L(k.lineOnTop([tab.x + 3.6, tab.y + dy], [tab.x + tab.w - 3.6 - (i === 2 ? 5 : 0), tab.y + dy], tz, P), { tone: "lo", free: true })));
  [[IV.x + 10, IV.y + 8, 0], [IV.x + 12, IV.y + 11.4, 1]].forEach(([x, y, i]) => {
    out.push(S(k.slabOf({ x: x - 4, y: y - 3, w: 9, d: 6, r: 0.8 }, IV_TOP + i * 0.8, 0.8, P, 2, 0), { tone: "mid", crease: "faint" }));
  });
  return out.join("");
}

function seat(x, ink) {
  return chair(B, { x, y: IV.y, z: 0, w: 20, d: 20, h: SEAT }) + person(B, { x, y: IV.y, z: SEAT, kind: "seated", ink, scale: PERSON });
}

// the insight cards: standing slabs lifted in the air, each one a step up toward the board
function cards() {
  const out = [];
  const cx = IV.x;
  CARDS.forEach(({ y, z }, i) => {
    const plan = { x: cx - CARD.w / 2, y, w: CARD.w, d: CARD.d, r: 0.7 };
    out.push(S(k.slabOf(plan, z, CARD.h, P, 2, 0), { tone: i === 0 ? "hi" : "mid", crease: "faint" }));
    const front = y + CARD.d;
    [CARD.h - 3.4, CARD.h - 6.6].forEach((dz, j) => out.push(L(k.segment([cx - 5, front, z + dz], [cx - 5 + (j ? 6 : 10), front, z + dz], P), { tone: "lo", free: true })));
  });
  // one dotted wire from the tablet, up the three cards, onto the first column of the board
  const wire = (a, b) => k.wireSvg(at(a), at(b), { tone: "mid", dotted: true, size: 1 });
  const edge = (c, top) => [cx, c.y + CARD.d, c.z + (top ? CARD.h : 0)];
  out.push(wire([cx, IV.y, IV_TOP + 1.1], edge(CARDS[0], false)));
  out.push(wire(edge(CARDS[0], true), edge(CARDS[1], false)));
  out.push(wire(edge(CARDS[1], true), edge(CARDS[2], false)));
  out.push(wire(edge(CARDS[2], true), [cx, FACE + 1.2, CARDS[2].z + CARD.h + 2]));
  return out.join("");
}

// ── assemble, far to near ─────────────────────────────────────────────────────────────────
const tableGroup = [
  table(),
  ...byDepth(
    [
      { c: [4, 27, TOP], svg: laptop() },
      { c: [52, 60, TOP], svg: timer() },
      { c: [70, 20, TOP], svg: deck() },
      { c: [126, 58, TOP], svg: doc() },
    ],
    (item) => item.c,
  ).map((item) => item.svg),
].join("");

const scene = byDepth(
  [
    { c: [IV.x - 35, IV.y, 0], svg: seat(IV.x - 35, false) },
    { c: [IV.x, IV.y, 0], svg: interviewTable() },
    { c: [IV.x + 35, IV.y, 0], svg: seat(IV.x + 35, true) },
    { c: [54, 31, 0], svg: tableGroup },
  ],
  (item) => item.c,
);

export const body = [plate(), easel(), boardContent(), ...scene.map((item) => item.svg), cards()];

export const svg = figure({
  width: WIDTH,
  height: HEIGHT,
  label:
    "A framing workshop in three steps. On the left, a designer and a user sit across a round table with a tablet; three insight cards rise along a dotted line from the table to the board. The board on its easel is split into three numbered columns: one large note for the problem with its risks, a grid of notes for the hypotheses, a target and a checklist for the success criteria, linked left to right. On the table in front: a laptop showing the same board in miniature, a stack of slides, a written document and a timer.",
  body,
});
