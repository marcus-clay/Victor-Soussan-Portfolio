// Figure 3, "Decide": a delivery line with four bays along a conveyor.
//   1. test bay: a participant (seated) works through the prototype on a tablet, the designer
//      (dark) moderates, an observer takes notes, a camera on a tripod films.
//   2. decision bay: a prioritisation board (impact against effort). Five light notes and one
//      dark note in the "do first" quadrant. The product manager and the designer stand at it
//      and the designer points at the dark note: that is the arbitration.
//   3. spec bay: the annotated panel with measured spacing. A wire carries the decision from
//      the dark note to the panel.
//   4. release bay: a lever, a changelog sheet.
// What travels on the belt changes as it goes: a prototype card, then a measured spec sheet,
// then a sealed, numbered package.
import { k, bind, baseplate, figure } from "./shared.mjs";
import * as G from "./lathe.mjs";
import { person, chair } from "./people.mjs";

export const WIDTH = 640;
export const HEIGHT = 360;

const PLATE = { x: -98, y: -198, w: 170, d: 396, r: 12 };
const BELT_X = 18;
const BELT_W = 34;
const BELT_Z = 14;
const BELT_H = 5;
const BELT_TOP = BELT_Z + BELT_H; // 19
const BAY_H = 3;
const BAY_TOP = BAY_H;
const SEGMENTS = [
  { name: "release", y: -192, d: 70 },
  { name: "spec", y: -122, d: 86 },
  { name: "decide", y: -36, d: 94 },
  { name: "test", y: 58, d: 134 },
];

const P = k.fitProjection(
  [
    ...k.boxCorners(PLATE, -16, 0),
    [-60, -80, 80],
    [-60, 10, 80],
    [-45, -165, 56],
    [-30, 170, 56],
    [-70, 180, 50],
  ],
  WIDTH,
  HEIGHT,
  { pad: 12, azimuth: 28, elevation: 33 },
);
const B = bind(P);
const { at, S, L, D, box, can } = B;

const fx = (x, y, z) => [x, y, z];
const seg = (a, b) => k.segment(a, b, P);
/** Thin standing slab on a +x face: a card, a bar, a sticker. y0 and width run along y. */
const standing = (xFace, y0, width, z0, height, opts = {}) =>
  S(k.slabOf({ x: xFace, y: y0, w: opts.depth ?? 0.9, d: width, r: opts.r ?? 1 }, z0, height, P, 2, 0), {
    tone: opts.tone ?? "mid",
    crease: opts.crease ?? "faint",
    className: opts.className,
  });
const item = (c, svg) => ({ c, svg });
const sorted = (items) => B.byDepth(items, (i) => i.c).map((i) => i.svg).join("");

// ── ground: plate and the bay floors ──────────────────────────────────────────────────────
function plate() {
  return baseplate(B, { plate: PLATE, strip: false });
}

const bayFloor = (s) => box({ x: -90, y: s.y + 4, w: 96, d: s.d - 8, r: 6 }, 0, BAY_H, { tone: "lo", steps: 5, bevel: 0.4 });

// ── conveyor ──────────────────────────────────────────────────────────────────────────────
function beltSegment(s) {
  const out = [];
  const plan = { x: BELT_X, y: s.y, w: BELT_W, d: s.d, r: 3 };
  for (const [x, y] of B.byDepth(k.corners(plan, 6))) out.push(can(x, y, 3.2, 0, BELT_Z, { steps: 16 }));
  out.push(box(plan, BELT_Z, BELT_H, { steps: 4, bevel: 0.7 }));
  out.push(L(k.planOutline(k.insetPlan(plan, 3), BELT_TOP, P, 3), { tone: "faint" }));
  // rollers: lines across the belt, edge to edge of the inset belt face
  for (let y = s.y + 8; y < s.y + s.d - 4; y += 8) {
    out.push(L(k.lineOnTop([plan.x + 3, y], [plan.x + plan.w - 3, y], BELT_TOP, P), { tone: "faint" }));
  }
  return out.join("");
}

// ── a rod between two points, ending in a ball: an arm and its hand, a tripod leg and its foot ─
function rod(from, to, { r = 1.5, ball = 2.1, ink = false, tone = ink ? "hi" : "mid" } = {}) {
  const cls = ink ? "ink" : undefined;
  const dir = G.sub3(to, from);
  const length = G.len3(dir);
  const F = G.frameAlong(from, dir);
  return (
    S(G.solidOf([[0, r], [length - ball * 0.6, r]], F, P, { smooth: true }), { tone, crease: "none", className: cls }) +
    S(G.sphereOf(to, ball, P), { tone, crease: "none", className: cls })
  );
}

// ── bay 1: test ───────────────────────────────────────────────────────────────────────────
function testBay() {
  const items = [];
  // the tablet on its stand, facing +x
  {
    const out = [];
    const y0 = 104;
    const d = 44;
    out.push(box({ x: -56, y: y0, w: 18, d, r: 3 }, BAY_TOP, 3, { tone: "mid", bevel: 0.5 }));
    out.push(box({ x: -48, y: y0 + d / 2 - 4, w: 5, d: 8, r: 1.4 }, BAY_TOP + 3, 17, { tone: "mid", crease: "none" }));
    const tab = { x: -52, y: y0, w: 4, d, r: 2.4 };
    out.push(box(tab, 23, 38, { tone: "hi", bevel: 0.6, steps: 4 }));
    const face = tab.x + tab.w; // -48
    out.push(standing(face, y0 + 4, d - 8, 27, 30, { tone: "lo", crease: "none", r: 1 }));
    const c = face + 0.9;
    out.push(standing(c, y0 + 6, d - 12, 50, 4, { tone: "mid", crease: "none", r: 0.6, depth: 0.7 }));
    out.push(standing(c, y0 + 6, 15, 36, 10, { tone: "hi", depth: 0.9 }));
    out.push(standing(c, y0 + 23, 15, 36, 10, { tone: "hi", depth: 0.9 }));
    // the button the participant is about to press: the dark accent of the prototype
    out.push(standing(c, y0 + 6, 15, 29, 5.5, { tone: "hi", depth: 1.1, r: 2.6, className: "ink", crease: "lo" }));
    items.push(item([-50, y0 + d / 2, 35], out.join("")));
  }
  // the participant: seated, close to the tablet
  {
    const x = -28;
    const y = 102;
    const out = [chair(B, { x, y, z: BAY_TOP, w: 16, d: 16, h: 11 })];
    out.push(person(B, { x, y, z: BAY_TOP + 13.4, kind: "seated" }));
    items.push(item([x, y, 20], out.join("")));
  }
  // the designer moderates, standing beside the tablet
  items.push(item([-30, 160, 25], person(B, { x: -30, y: 160, z: BAY_TOP, kind: "standing", ink: true })));
  // the observer: seated at a small desk, taking notes
  {
    const out = [];
    const cx = -74;
    const cy = 176;
    out.push(chair(B, { x: cx, y: cy, z: BAY_TOP, w: 16, d: 16, h: 11 }));
    out.push(person(B, { x: cx, y: cy, z: BAY_TOP + 13.4, kind: "seated" }));
    items.push(item([cx, cy, 20], out.join("")));
    const desk = { x: -62, y: 168, w: 14, d: 16, r: 1.6 };
    const dz = BAY_TOP + 17;
    const dsk = [];
    for (const [px, py] of B.byDepth(k.corners(desk, 2))) dsk.push(can(px, py, 1.1, BAY_TOP, 17, { steps: 10 }));
    dsk.push(box(desk, dz, 2, { tone: "mid", bevel: 0.4 }));
    const top = dz + 2;
    const pad = { x: desk.x + 3, y: desk.y + 3, w: 8, d: 10, r: 0.8 };
    dsk.push(box(pad, top, 1, { tone: "hi", bevel: 0.3 }));
    [3.4, 6.2].forEach((dy) => dsk.push(L(k.lineOnTop([pad.x + 1.6, pad.y + dy], [pad.x + pad.w - 1.6, pad.y + dy], top + 1, P), { tone: "lo", free: true })));
    items.push(item([desk.x + 7, desk.y + 8, 20], dsk.join("")));
  }
  // camera on a tripod, filming the exchange from the right
  {
    const out = [];
    const cam = [-36, 72];
    // tripod: three legs from the post to the floor, each ending in a foot
    const feet = [90, 210, 330].map((deg) => {
      const a = (deg * Math.PI) / 180;
      return [Math.cos(a), Math.sin(a)];
    });
    for (const [ux, uy] of B.byDepth(feet, ([ux, uy]) => [cam[0] + ux * 9, cam[1] + uy * 9, 0])) {
      out.push(rod([cam[0] + ux * 1.8, cam[1] + uy * 1.8, BAY_TOP + 17], [cam[0] + ux * 9, cam[1] + uy * 9, BAY_TOP + 1.2], { r: 1, ball: 1.2, tone: "lo" }));
    }
    out.push(can(cam[0], cam[1], 1.8, BAY_TOP + 15, 24, { steps: 14 }));
    out.push(box({ x: cam[0] - 8, y: cam[1] - 8, w: 16, d: 16, r: 2.4 }, 39, 11, { tone: "mid", bevel: 0.5, steps: 4 }));
    // the lens looks toward +y, onto the participant and the tablet
    out.push(box({ x: cam[0] - 4, y: cam[1] + 8, w: 8, d: 10, r: 1.6 }, 41, 7, { tone: "hi", bevel: 0.4 }));
    out.push(L(k.sideRing([cam[0], cam[1] + 18, 44.5], 2.6, "y", P, 16), { tone: "mid" }));
    out.push(can(cam[0] + 3, cam[1] - 3, 1.3, 50, 1.1, { steps: 12, tone: "hi" }));
    items.push(item([cam[0], cam[1], 30], out.join("")));
  }
  return sorted(items);
}

// ── bay 2: decision (the prioritisation board) ───────────────────────────────────────────
const BOARD = { x: -62, w: 4, y: -14, d: 56 }; // panel; the face looks toward +x
const FACE = BOARD.x + BOARD.w; // -58
const FACE_FRONT = FACE + 0.9; // -57.1 front of the paper-colour face
const MATRIX = { y: -8, d: 44, z: 22, h: 40 };
const MATRIX_FRONT = FACE_FRONT + 0.7; // -56.4
const NOTE_FRONT = MATRIX_FRONT + 1.1; // -55.3
const AXIS_Y = MATRIX.y + MATRIX.d / 2; // 14
const AXIS_Z = MATRIX.z + MATRIX.h / 2; // 42
// the dark note: top-left quadrant, "do first" (high impact, low effort)
const INK_NOTE = { y: 22, w: 12, z: 51, h: 9 };
const WIRE_X = -55.6;
const WIRE_Z = 67;
const SPEC_WIRE_Y = -91; // where the wire lands on the spec panel

function board() {
  const out = [];
  // feet, panel, face
  [-8, 28].forEach((y) => out.push(box({ x: -66, y, w: 14, d: 12, r: 2 }, BAY_TOP, 11, { tone: "mid", bevel: 0.4 })));
  out.push(box({ x: BOARD.x, y: BOARD.y, w: BOARD.w, d: BOARD.d, r: 2.4 }, 14, 62, { tone: "mid", bevel: 0.7, steps: 4 }));
  out.push(standing(FACE, BOARD.y + 3, BOARD.d - 6, 19, 52, { tone: "hi", crease: "none", r: 1.2 }));
  // the grid: one recessed field and a cross of two axis lines, edge to edge
  out.push(standing(FACE_FRONT, MATRIX.y, MATRIX.d, MATRIX.z, MATRIX.h, { tone: "lo", depth: 0.7, crease: "none", r: 1 }));
  // the "do first" quadrant is a lighter, slightly raised field
  out.push(standing(MATRIX_FRONT, AXIS_Y + 0.8, MATRIX.y + MATRIX.d - AXIS_Y - 0.8, AXIS_Z + 0.8, MATRIX.z + MATRIX.h - AXIS_Z - 0.8, { tone: "hi", depth: 0.4, crease: "none", r: 0.8 }));
  const ax = MATRIX_FRONT + 0.45;
  out.push(L(seg(fx(ax, AXIS_Y, MATRIX.z), fx(ax, AXIS_Y, MATRIX.z + MATRIX.h)), { tone: "mid", free: true }));
  out.push(L(seg(fx(ax, MATRIX.y, AXIS_Z), fx(ax, MATRIX.y + MATRIX.d, AXIS_Z)), { tone: "mid", free: true }));
  // notes: thin light slabs in the quadrants, one dark note in the top-left one
  const note = (y, z, w = 9, h = 6.5) =>
    standing(MATRIX_FRONT, y, w, z, h, { tone: "hi", depth: 1.1, r: 0.8, crease: "faint" }) +
    L(seg(fx(NOTE_FRONT, y + 1.6, z + h * 0.55), fx(NOTE_FRONT, y + w - 2.2, z + h * 0.55)), { tone: "lo", free: true });
  out.push(note(-5.5, 51, 9, 6.5), note(4.5, 44.5, 8, 6)); // top-right
  out.push(note(20, 25.5, 9.5, 6.5), note(26, 34, 8, 5.4)); // bottom-left
  out.push(note(-5, 26, 9, 6.5)); // bottom-right
  out.push(standing(MATRIX_FRONT, INK_NOTE.y, INK_NOTE.w, INK_NOTE.z, INK_NOTE.h, { tone: "hi", depth: 1.3, r: 0.9, className: "ink", crease: "lo" }));
  return out.join("");
}

function decideBay() {
  const items = [];
  items.push(item([-62, 14, 40], board()));
  // the product manager (light) and the designer (dark) stand at the board
  items.push(item([-34, -12, 25], person(B, { x: -34, y: -12, z: BAY_TOP, kind: "standing" })));
  {
    const dx = -40;
    const dy = 47;
    const out = [person(B, { x: dx, y: dy, z: BAY_TOP, kind: "standing", ink: true })];
    // the pointing arm: from the shoulder to the dark note
    const shoulder = [dx - 3, dy - 3, BAY_TOP + 10 + 24];
    const hand = [NOTE_FRONT + 1.6, INK_NOTE.y + INK_NOTE.w * 0.55, INK_NOTE.z + INK_NOTE.h * 0.45];
    out.push(rod(shoulder, hand, { ink: true }));
    items.push(item([dx, dy, 25], out.join("")));
  }
  // the wire that carries the decision from the dark note to the spec panel
  {
    const noteMid = INK_NOTE.y + INK_NOTE.w / 2;
    const from = at([NOTE_FRONT, noteMid, INK_NOTE.z + INK_NOTE.h]);
    const via = [at([WIRE_X, noteMid, WIRE_Z]), at([WIRE_X, SPEC_WIRE_Y, WIRE_Z])];
    const to = at([FACE_FRONT, SPEC_WIRE_Y, WIRE_Z]);
    items.push(item([WIRE_X, 10, WIRE_Z], k.wireSvg(from, to, { via, tone: "hi", size: 1.2 })));
  }
  return sorted(items);
}

// ── bay 3: spec ───────────────────────────────────────────────────────────────────────────
function specBay() {
  const out = [];
  const y0 = -112;
  const d = 66;
  // panel with an annotated mockup, standing on two feet
  [y0 + 8, y0 + d - 20].forEach((y) => out.push(box({ x: -66, y, w: 14, d: 12, r: 2 }, BAY_TOP, 11, { tone: "mid", bevel: 0.4 })));
  const panel = { x: -62, y: y0, w: 4, d, r: 2.4 };
  out.push(box(panel, 14, 62, { tone: "mid", bevel: 0.7, steps: 4 }));
  const face = panel.x + panel.w; // -58
  out.push(standing(face, y0 + 3, d - 6, 19, 52, { tone: "hi", crease: "none", r: 1.2 }));
  const c = face + 0.9;
  const c1 = { y: y0 + 9, w: 26 };
  const c2 = { y: y0 + 39, w: 20 };
  out.push(standing(c, c1.y, c1.w, 40, 20, { tone: "mid", depth: 1.1 }));
  out.push(standing(c, c2.y, c2.w, 40, 20, { tone: "mid", depth: 1.1 }));
  out.push(standing(c, c1.y, 20, 24, 8, { tone: "hi", depth: 1.3, r: 4, className: "ink", crease: "lo" }));
  out.push(standing(c, c1.y + 24, 28, 24, 8, { tone: "lo", depth: 0.8, crease: "none" }));
  // dimension marks on the panel: width of the first card, its height, and the gap between cards
  const dm = c + 1.4;
  const tick = (y, z) => seg(fx(dm, y, z - 1.4), fx(dm, y, z + 1.4));
  const wz = 62.4;
  out.push(L(seg(fx(dm, c1.y, wz), fx(dm, c1.y + c1.w, wz)), { tone: "hi", free: true }), L(tick(c1.y, wz) + tick(c1.y + c1.w, wz), { tone: "hi", free: true }));
  const hy = c1.y - 3;
  out.push(L(seg(fx(dm, hy, 40), fx(dm, hy, 60)), { tone: "hi", free: true }), L(seg(fx(dm, hy - 1.4, 40), fx(dm, hy + 1.4, 40)) + seg(fx(dm, hy - 1.4, 60), fx(dm, hy + 1.4, 60)), { tone: "hi", free: true }));
  const gz = 52;
  out.push(L(seg(fx(dm, c1.y + c1.w, gz), fx(dm, c2.y, gz)), { tone: "lit", free: true }), L(tick(c1.y + c1.w, gz) + tick(c2.y, gz), { tone: "lit", free: true }));
  // swatches
  [c1.y + 4, c1.y + 11, c1.y + 18].forEach((y, i) => out.push(L(k.sideRing([c + 0.3, y, 21.6], 2, "x", P, 14), { tone: i === 0 ? "hi" : "mid" })));
  // story cards, a short stack in front of the panel
  for (let i = 0; i < 3; i++) {
    out.push(S(k.slabOf({ x: -30 + i * 1.2, y: -98 + i * 2.2, w: 15, d: 24, r: 1.4 }, BAY_TOP + i * 1.3, 1.2, P, 2, 0), { tone: i === 2 ? "hi" : "mid" }));
  }
  const top = BAY_TOP + 3 * 1.3;
  out.push(L(k.lineOnTop([-26, -90], [-17, -90], top, P), { tone: "hi", free: true }), L(k.lineOnTop([-26, -84], [-19, -84], top, P), { tone: "lo", free: true }), L(k.lineOnTop([-26, -79], [-18, -79], top, P), { tone: "lo", free: true }));
  return out.join("");
}

// ── bay 4: release ────────────────────────────────────────────────────────────────────────
function releaseBay() {
  const out = [];
  const base = { x: -70, y: -178, w: 34, d: 34, r: 3.5 };
  out.push(box(base, BAY_TOP, 4, { tone: "mid", bevel: 0.7, steps: 4 }));
  out.push(L(k.planOutline(k.insetPlan(base, 3), BAY_TOP + 4, P, 4), { tone: "faint" }));
  out.push(D(k.corners(base, 5).map(([x, y]) => at([x, y, BAY_TOP + 4])), { size: 0.45 }));
  // go lamp
  out.push(can(-62, -169, 3.6, BAY_TOP + 4, 3, { steps: 20, tone: "mid" }));
  out.push(S(k.cylinder(-62, -169, 2.4, BAY_TOP + 7, 1.6, P, 20), { tone: "hi", crease: "none", lit: true }));
  // the lever: a post, an arm, a ball knob
  const lx = -52;
  const ly = -156;
  out.push(can(lx, ly, 3.6, BAY_TOP + 4, 4, { steps: 20 }));
  out.push(can(lx, ly, 2, BAY_TOP + 8, 28, { steps: 16 }));
  out.push(L(k.sideArc(lx, ly, 2, BAY_TOP + 20, P, 12), { tone: "faint" }));
  out.push(box({ x: lx - 3, y: ly - 3, w: 6, d: 6, r: 1.6 }, BAY_TOP + 36, 4, { tone: "mid", bevel: 0.3 }));
  out.push(box({ x: lx - 2, y: ly - 18, w: 4, d: 21, r: 2 }, BAY_TOP + 38, 3.4, { tone: "hi", bevel: 0.3 }));
  out.push(S(k.cylinder(lx, ly - 18, 4.6, BAY_TOP + 36, 8, P, 24, 0.5), { tone: "hi", crease: "lo" }));
  // changelog: a sheet with ticked lines
  const sheet = { x: -26, y: -170, w: 28, d: 38, r: 1 };
  out.push(S(k.slabOf(sheet, BAY_TOP, 1, P, 2, 0), { tone: "hi", crease: "faint" }));
  const z = BAY_TOP + 1;
  out.push(L(k.lineOnTop([sheet.x + 4, sheet.y + 6], [sheet.x + 18, sheet.y + 6], z, P), { tone: "hi", free: true }));
  [0, 1, 2, 3].forEach((i) => {
    const y = sheet.y + 13 + i * 6.4;
    out.push(D([at([sheet.x + 4.4, y, z])], { size: 0.7, tone: "hi" }));
    out.push(L(k.lineOnTop([sheet.x + 8, y], [sheet.x + 22 - (i % 2) * 5, y], z, P), { tone: "lo", free: true }));
  });
  return out.join("");
}

// ── things on the belt ────────────────────────────────────────────────────────────────────
function prototypeCard() {
  const out = [];
  const plan = { x: 26, y: 124, w: 20, d: 32, r: 2.5 };
  out.push(box(plan, BELT_TOP, 2.4, { tone: "hi", bevel: 0.4 }));
  const z = BELT_TOP + 2.4;
  out.push(L(k.planOutline({ x: plan.x + 3, y: plan.y + 3, w: 14, d: 6, r: 1 }, z, P, 2), { tone: "mid" }));
  out.push(L(k.planOutline({ x: plan.x + 3, y: plan.y + 12, w: 14, d: 9, r: 1 }, z, P, 2), { tone: "lo" }));
  out.push(S(k.slabOf({ x: plan.x + 3, y: plan.y + 24, w: 14, d: 5, r: 2 }, z, 1.6, P, 3, 0), { tone: "hi", crease: "none", className: "ink" }));
  return out.join("");
}

function specSheet() {
  const out = [];
  const plan = { x: 26, y: -108, w: 22, d: 34, r: 1 };
  out.push(box(plan, BELT_TOP, 1.2, { tone: "hi", bevel: 0.3 }));
  const z = BELT_TOP + 1.2;
  out.push(L(k.planOutline({ x: plan.x + 3.5, y: plan.y + 4, w: 15, d: 10, r: 1 }, z, P, 2), { tone: "mid" }));
  out.push(L(k.planOutline({ x: plan.x + 3.5, y: plan.y + 18, w: 15, d: 12, r: 1 }, z, P, 2), { tone: "mid" }));
  // measured gaps: a dimension line with end ticks, one in the lit tone
  const dim = (x0, y0, x1, y1, tone) => {
    const horizontal = y0 === y1;
    const t = horizontal ? ([x, y]) => k.lineOnTop([x, y - 1.2], [x, y + 1.2], z, P) : ([x, y]) => k.lineOnTop([x - 1.2, y], [x + 1.2, y], z, P);
    return L(k.lineOnTop([x0, y0], [x1, y1], z, P) + t([x0, y0]) + t([x1, y1]), { tone, free: true });
  };
  out.push(dim(plan.x + 3.5, plan.y + 14, plan.x + 3.5, plan.y + 18, "hi"));
  out.push(dim(plan.x + 21, plan.y + 4, plan.x + 21, plan.y + 14, "hi"));
  out.push(dim(plan.x + 3.5, plan.y + 32, plan.x + 18.5, plan.y + 32, "lit"));
  return out.join("");
}

function pack() {
  const out = [];
  const plan = { x: 24, y: -180, w: 30, d: 34, r: 3 };
  out.push(box(plan, BELT_TOP, 22, { tone: "hi", bevel: 0.8, steps: 4, className: "ink" }));
  const top = BELT_TOP + 22;
  // tape across the lid, then down the visible faces
  const mx = plan.x + plan.w / 2;
  out.push(L(k.lineOnTop([mx - 2.4, plan.y], [mx - 2.4, plan.y + plan.d], top, P) + k.lineOnTop([mx + 2.4, plan.y], [mx + 2.4, plan.y + plan.d], top, P), { tone: "mid" }));
  out.push(L(k.segment([plan.x + plan.w, plan.y + 17 - 2.4, BELT_TOP], [plan.x + plan.w, plan.y + 17 - 2.4, top], P) + k.segment([plan.x + plan.w, plan.y + 17 + 2.4, BELT_TOP], [plan.x + plan.w, plan.y + 17 + 2.4, top], P), { tone: "mid" }));
  // the numbered tag, hanging on the viewer's side
  out.push(standing(plan.x + plan.w, plan.y + 5, 15, BELT_TOP + 5, 10, { tone: "hi", depth: 1.1, r: 1.6, crease: "lo" }));
  out.push(k.faceTextSvg(k.sideMatrix([plan.x + plan.w + 1.2, plan.y + 18.4], BELT_TOP + 8.6, P, "right"), "v2", { size: 5, tone: "hi" }));
  return out.join("");
}

// direction of travel: small chevrons on the belt between the items
function chevrons() {
  const out = [];
  [96, 12, -52, -128].forEach((y) => {
    const x = BELT_X + BELT_W / 2;
    out.push(L(k.onTop([[x - 4, y + 3], [x, y], [x + 4, y + 3]], BELT_TOP, P), { tone: "mid", free: true }));
  });
  return out.join("");
}

// stop block at the end of the belt
const stopBlock = () => box({ x: BELT_X + 1, y: -190, w: BELT_W - 2, d: 5, r: 1 }, BELT_TOP, 8, { tone: "mid", bevel: 0.4 });

// ── order: far to near ────────────────────────────────────────────────────────────────────
const [rel, spec, decide, test] = SEGMENTS;
const mid = (s) => s.y + s.d / 2;
const groups = [
  { c: [-40, mid(rel), 0], svg: bayFloor(rel) + releaseBay() },
  { c: [-40, mid(spec), 0], svg: bayFloor(spec) + specBay() },
  { c: [-40, mid(decide), 0], svg: bayFloor(decide) + decideBay() },
  { c: [-40, mid(test), 0], svg: bayFloor(test) + testBay() },
  { c: [BELT_X + BELT_W / 2, mid(rel), 0], svg: beltSegment(rel) + stopBlock() + pack() },
  { c: [BELT_X + BELT_W / 2, mid(spec), 0], svg: beltSegment(spec) + specSheet() },
  { c: [BELT_X + BELT_W / 2, mid(decide), 0], svg: beltSegment(decide) },
  { c: [BELT_X + BELT_W / 2, mid(test), 0], svg: beltSegment(test) + prototypeCard() },
];

export const svg = figure({
  width: WIDTH,
  height: HEIGHT,
  label:
    "A delivery line with four bays along a conveyor. In the test bay a participant sits at a tablet showing a prototype, the designer moderates and an observer takes notes while a camera on a tripod films. In the decision bay a product manager and the designer stand at a prioritisation board of impact against effort, and the designer points at the one dark note in the do-first quadrant. A wire carries that decision to the specification bay, a panel of measured spacing. The release bay has a lever and a changelog sheet. On the belt a prototype card becomes a measured spec sheet, then a sealed package tagged v2.",
  body: [plate(), ...B.byDepth(groups, (g) => g.c).map((g) => g.svg), chevrons()],
});
