// Figure 2, "Build": a comparison bench seen from above. Three directions lie side by side at
// three levels of fidelity (a pencil sketch, a grey wireframe, a finished prototype with a
// cursor on its ink button). The prototype opens onto two phone screens (the flow), and a
// component sheet (colour tokens, type specimen, button, field, toggle, checkboxes, card) sits
// beside it with one wire to the matching button: components build the screen. The designer
// sketches at one end, a product partner stands at the selector between directions, a user tries
// the flow at the other end, and below them a flow of screen states (default, empty, loading,
// error, done) is chained left to right.
import { k, bind, baseplate, figure } from "./shared.mjs";
import { person, chair } from "./people.mjs";

export const WIDTH = 640;
export const HEIGHT = 360;

const PLATE = { x: -206, y: -118, w: 412, d: 236, r: 12 };
const ROW_Y = -108;
const TW = 82; // tablet width (x) and depth (y)
const TD = 64;
const c = 0.82; // scale of the screen content (designed for a 100 x 76 tablet)
const XS = [-196, -98, 0];
const MAT_H = 1.6;
const BODY_H = 5;
const SCREEN_Z = MAT_H + BODY_H; // 6.6
const CONTENT_Z = SCREEN_Z + 0.5;

// the component sheet, beside the prototype
const BOARD = { x: 94, y: -105, w: 104, d: 56, r: 4 };
const BOARD_H = 2.2;
const BZ = BOARD_H;

// the phones of the flow, in front of the prototype
const PW = 38;
const PD = 58;
const PHONE_Y = -30;
const PHONES = [46, 100];

// people, with their chairs
const DESIGNER = { x: -152, y: 6 };
const PARTNER = { x: -12, y: -4 };
const USER = { x: 168, y: 2 };
const CHAIR_H = 11;
const SEAT_TOP = CHAIR_H + 2.4;

const P = k.fitProjection(
  [
    ...k.boxCorners(PLATE, -16, 0),
    [DESIGNER.x, DESIGNER.y, 44],
    [PARTNER.x, PARTNER.y, 40],
    [USER.x, USER.y, 44],
    [XS[0], ROW_Y + TD, 14],
  ],
  WIDTH,
  HEIGHT,
  { pad: 12, azimuth: 76, elevation: 44 },
);
const B = bind(P);
const { at, S, L, D, box, can } = B;

// a deterministic hand: wobbly strokes for the sketch
let seed = 7;
const rnd = () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646 - 0.5;
};
const stroke = (a, b, z, wobble = 0.7) => {
  const n = 4;
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    pts.push([a[0] + (b[0] - a[0]) * t + rnd() * wobble, a[1] + (b[1] - a[1]) * t + rnd() * wobble]);
  }
  return k.onTop(pts, z, P);
};
const sketch = (a, b, z) => L(stroke(a, b, z) + stroke([a[0] + rnd(), a[1] + rnd()], [b[0] + rnd(), b[1] + rnd()], z, 0.5), { tone: "mid", free: true });
const sketchBox = (x, y, w, d, z) =>
  [sketch([x, y], [x + w, y], z), sketch([x + w, y], [x + w, y + d], z), sketch([x + w, y + d], [x, y + d], z), sketch([x, y + d], [x, y], z)].join("");

function mat(x, y, w = TW, d = TD) {
  return S(k.slabOf({ x: x - 3, y: y - 3, w: w + 6, d: d + 6, r: 7 }, 0, MAT_H, P, 5, 0.4), { tone: "lo", crease: "faint" });
}

// A: the sketch, a sheet of paper with a pencil lying on it
function sketchSheet(x, y = ROW_Y) {
  const out = [mat(x, y)];
  const sheet = { x: x + 4, y: y + 3, w: TW - 8, d: TD - 6, r: 1 };
  out.push(S(k.slabOf(sheet, MAT_H, 0.8, P, 2, 0), { tone: "hi", crease: "faint" }));
  const z = MAT_H + 0.8;
  const [sx, sy] = [sheet.x, sheet.y];
  out.push(sketchBox(sx + 4, sy + 4, 58, 9, z)); // header
  out.push(sketchBox(sx + 4, sy + 18, 26, 20, z)); // image
  out.push(sketch([sx + 4, sy + 18], [sx + 30, sy + 38], z), sketch([sx + 30, sy + 18], [sx + 4, sy + 38], z));
  [20, 26, 32].forEach((dy, i) => out.push(sketch([sx + 35, sy + dy], [sx + 62 - i * 7, sy + dy], z)));
  out.push(sketchBox(sx + 4, sy + 43, 22, 8, z)); // button
  // a note in the margin
  out.push(sketch([sx + 32, sy + 47], [sx + 52, sy + 47], z), sketch([sx + 52, sy + 47], [sx + 48.6, sy + 44.4], z), sketch([sx + 52, sy + 47], [sx + 48.6, sy + 49.6], z));
  // pencil on the sheet: body, ferrule, tip
  const px = x + TW - 12.5;
  out.push(S(k.slabOf({ x: px, y: y + 6, w: 3.4, d: 29, r: 1.3 }, z, 3.4, P, 2, 0), { tone: "mid", crease: "none" }));
  out.push(S(k.slabOf({ x: px, y: y + 35, w: 3.4, d: 5.5, r: 1 }, z, 3.4, P, 2, 0), { tone: "hi", crease: "none" }));
  out.push(S(k.slabOf({ x: px + 0.5, y: y + 40.5, w: 2.4, d: 4.6, r: 0.4 }, z, 2.4, P, 2, 0), { tone: "lo", crease: "none" }));
  return out.join("");
}

function tablet(x, y = ROW_Y, tone = "mid") {
  const out = [mat(x, y)];
  const body = { x, y, w: TW, d: TD, r: 7 };
  out.push(S(k.slabOf(body, MAT_H, BODY_H, P, 5, 0.8), { tone, crease: "faint" }));
  const screen = k.insetPlan(body, 4);
  out.push(S(k.slabOf(screen, SCREEN_Z, 0.5, P, 3, 0), { tone: "lo", crease: "none" }));
  out.push(D([at([x + TW - 2.2, y + TD / 2, SCREEN_Z])], { size: 0.5 })); // camera
  return out.join("");
}

// the content frame of a tablet: (rx, ry) in the 100 x 76 design grid, scaled by c
const frame = (x, y) => {
  const o = [x + 7, y + 7];
  return { o, pt: (rx, ry) => [o[0] + rx * c, o[1] + ry * c], plan: (rx, ry, w, d, r = 1) => ({ x: o[0] + rx * c, y: o[1] + ry * c, w: w * c, d: d * c, r: r * c }) };
};

// B: the wireframe, outlines only, an image placeholder crossed out
function wireframe(x, y = ROW_Y) {
  const out = [tablet(x, y)];
  const z = CONTENT_Z;
  const f = frame(x, y);
  const rect = (rx, ry, w, d, r = 1) => L(k.planOutline(f.plan(rx, ry, w, d, r), z, P, 2), { tone: "mid" });
  out.push(rect(0, 0, 84, 9));
  out.push(rect(0, 14, 38, 24));
  const [a, b, cc, d] = [f.pt(0, 14), f.pt(38, 38), f.pt(38, 14), f.pt(0, 38)];
  out.push(L(k.lineOnTop(a, b, z, P) + k.lineOnTop(cc, d, z, P), { tone: "lo" }));
  [16, 23, 30].forEach((dy, i) => out.push(L(k.lineOnTop(f.pt(44, dy), f.pt(84 - i * 8, dy), z, P), { tone: "mid", free: true })));
  out.push(rect(0, 44, 26, 9, 2));
  out.push(rect(58, 44, 26, 9, 4.5));
  out.push(D([at([...f.pt(4.5, 4.5), z]), at([...f.pt(12, 4.5), z])], { size: 0.5 }));
  return out.join("");
}

// C: the prototype, real thickness, an ink button with the cursor about to press it
const PROTO = { x: XS[2], y: ROW_Y };
const protoFrame = frame(PROTO.x, PROTO.y);
const BTN = protoFrame.plan(58, 44, 26, 9, 4.5); // the primary button of the screen
const BTN_Z = CONTENT_Z;
const BTN_H = 3;
const BTN_CY = BTN.y + BTN.d / 2;
const BTN_CX = BTN.x + BTN.w / 2;

function prototype() {
  const { x, y } = PROTO;
  const out = [tablet(x, y, "hi")];
  const z = CONTENT_Z;
  const f = protoFrame;
  out.push(box(f.plan(0, 0, 84, 9, 2), z, 2, { tone: "mid", bevel: 0.3 }));
  out.push(D([at([...f.pt(5, 4.5), z + 2]), at([...f.pt(11, 4.5), z + 2])], { size: 0.5 }));
  out.push(box(f.plan(0, 14, 38, 24, 2.5), z, 3, { tone: "hi", bevel: 0.4 }));
  // a ring gauge in the first card
  const g = f.pt(14, 26);
  out.push(L(k.ring(g[0], g[1], 6.5 * c, z + 3, P, 28), { tone: "mid" }));
  const gt = f.pt(18, 22);
  out.push(L(k.lineOnTop(g, gt, z + 3, P), { tone: "hi", free: true }));
  out.push(L(k.lineOnTop(f.pt(26, 21), f.pt(34, 21), z + 3, P) + k.lineOnTop(f.pt(26, 26), f.pt(32, 26), z + 3, P), { tone: "lo", free: true }));
  out.push(box(f.plan(44, 14, 40, 24, 2.5), z, 3, { tone: "hi", bevel: 0.4 }));
  [3, 6.5, 4.5, 8].forEach((h, i) => {
    const p = f.plan(49 + i * 8, 34 - 1.4 - h * 1.8, 5, h * 1.8, 0.8);
    out.push(box(p, z + 3, 2.4 + h * 0.18, { tone: "mid", crease: "faint" }));
  });
  // the footer row: a secondary button, a toggle, then the primary ink button
  out.push(box(f.plan(0, 44, 26, 9, 4.5), z, 1.2, { tone: "mid", crease: "faint" }));
  const ghost = f.plan(0, 44, 26, 9, 4.5);
  out.push(L(k.planOutline(k.insetPlan(ghost, 1), z + 1.2, P, 5), { tone: "hi" }));
  const tg = f.plan(33, 45.5, 18, 6, 3);
  out.push(box(tg, z, 1.2, { tone: "mid", crease: "faint" }));
  out.push(can(tg.x + tg.w - tg.d / 2, tg.y + tg.d / 2, tg.d / 2 - 0.5, z + 1.2, 1, { steps: 14 }));
  out.push(box(BTN, BTN_Z, BTN_H, { tone: "hi", bevel: 0.4, className: "ink", steps: 5 }));
  // the cursor, resting on the button
  const cu = f.pt(70, 46);
  const arrow = [[0, 0], [0, 10], [2.6, 7.8], [4.6, 12.2], [6.6, 11.3], [4.6, 7], [8, 6.8]].map(([a, b]) => [cu[0] + a * 0.78, cu[1] + b * 0.78]);
  out.push(S(k.extrude(arrow, BTN_Z + BTN_H, 1.2, P, { convex: false }), { tone: "hi", crease: "none", lit: true }));
  return out.join("");
}

// a phone, lying flat: the next screens of the flow
function phone(x, variant) {
  const y = PHONE_Y;
  const out = [mat(x, y, PW, PD)];
  const body = { x, y, w: PW, d: PD, r: 6 };
  out.push(S(k.slabOf(body, MAT_H, BODY_H, P, 5, 0.8), { tone: "hi", crease: "faint" }));
  out.push(S(k.slabOf(k.insetPlan(body, 3.5), SCREEN_Z, 0.5, P, 3, 0), { tone: "lo", crease: "none" }));
  out.push(D([at([x + PW / 2, y + 1.8, SCREEN_Z])], { size: 0.45 }));
  const z = CONTENT_Z;
  const o = [x + 6.5, y + 7];
  const rect = (rx, ry, w, d, r = 1.5) => ({ x: o[0] + rx, y: o[1] + ry, w, d, r });
  const line = (rx, ry, rx2, tone = "lo", zz = z) => L(k.lineOnTop([o[0] + rx, o[1] + ry], [o[0] + rx2, o[1] + ry], zz, P), { tone, free: true });
  if (variant === 0) {
    out.push(box(rect(0, 0, 25, 17, 2), z, 1.6, { tone: "hi", bevel: 0.3 }));
    out.push(L(k.ring(o[0] + 12.5, o[1] + 8.5, 4.6, z + 1.6, P, 24), { tone: "mid" }));
    out.push(line(0, 22.5, 20, "mid"), line(0, 27.5, 25), line(0, 31.5, 17));
    out.push(box(rect(0, 38, 25, 7, 3.5), z, 1.4, { tone: "mid", crease: "faint" }));
  } else {
    [0, 11, 22].forEach((dy) => {
      out.push(box(rect(0, dy, 25, 8, 2), z, 1.2, { tone: "hi", bevel: 0.3 }));
      out.push(D([at([o[0] + 3.2, o[1] + dy + 4, z + 1.2])], { size: 0.7 }));
      out.push(line(7, dy + 4, 21, "lo", z + 1.2));
    });
    out.push(L(k.ring(o[0] + 12.5, o[1] + 37, 4.6, z, P, 24), { tone: "mid" }));
    out.push(L(k.onTop([[o[0] + 10, o[1] + 37.2], [o[0] + 12, o[1] + 39.2], [o[0] + 15.4, o[1] + 35]], z, P), { tone: "hi", free: true }));
  }
  return out.join("");
}

// the component sheet: tokens, type specimen and the components of the screen, as thin slabs
function board() {
  const out = [S(k.slabOf(BOARD, 0, BOARD_H, P, 5, 0.5), { tone: "lo", crease: "faint" })];
  const bp = (bx, by) => [BOARD.x + bx, BOARD.y + by];
  const plan = (bx, by, w, d, r = 1.5) => ({ x: BOARD.x + bx, y: BOARD.y + by, w, d, r });
  // colour tokens: five swatches, the last one ink
  [["lo"], ["mid"], ["hi"], ["hi", true], ["hi", false, "ink"]].forEach(([tone, lit, cls], i) => {
    const [sx, sy] = bp(9.4 + i * 9.6, 9.5);
    out.push(S(k.cylinder(sx, sy, 3.5, BZ, 1.2, P, 20, 0.3), { tone, lit, className: cls, crease: "faint" }));
  });
  // type specimen: one tile with an engraved "Aa"
  const tile = plan(56, 3.5, 22, 12, 2);
  out.push(box(tile, BZ, 0.8, { tone: "hi", bevel: 0.3 }));
  out.push(k.faceTextSvg(k.topMatrix([tile.x + 3.4, tile.y + 9], BZ + 0.8, P, "x"), "Aa", { size: 9.5, tone: "mid" }));
  // card: image block and two lines of text
  const card = plan(81, 4, 19, 25, 2);
  out.push(box(card, BZ, 2, { tone: "hi", bevel: 0.4 }));
  out.push(box({ x: card.x + 2.5, y: card.y + 2.5, w: 14, d: 10, r: 1 }, BZ + 2, 0.8, { tone: "mid", crease: "none" }));
  out.push(L(k.lineOnTop([card.x + 2.5, card.y + 17], [card.x + 15, card.y + 17], BZ + 2, P) + k.lineOnTop([card.x + 2.5, card.y + 21], [card.x + 10, card.y + 21], BZ + 2, P), { tone: "lo", free: true }));
  // input field with its cursor
  const input = plan(6, 20, 44, 9, 2);
  out.push(box(input, BZ, 1.4, { tone: "hi", bevel: 0.3 }));
  const inTop = BZ + 1.4;
  out.push(L(k.planOutline(k.insetPlan(input, 1.2), inTop, P, 3), { tone: "mid" }));
  out.push(L(k.lineOnTop([input.x + 4.6, input.y + input.d / 2], [input.x + 20, input.y + input.d / 2], inTop, P), { tone: "lo", free: true }));
  out.push(S(k.slabOf({ x: input.x + 23, y: input.y + 2.2, w: 1, d: input.d - 4.4, r: 0.3 }, inTop, 0.6, P, 2, 0), { tone: "mid", crease: "none" })); // the text cursor
  // toggle, on
  const tg = plan(56, 21.5, 18, 6, 3);
  out.push(box(tg, BZ, 1.3, { tone: "mid", crease: "faint" }));
  out.push(can(tg.x + tg.w - 3, tg.y + 3, 2.5, BZ + 1.3, 1, { steps: 14 }));
  // buttons: primary (ink) and secondary (outline)
  const primary = plan(6, 39.3, 26, 9, 4.5);
  out.push(box(primary, BZ, 2.5, { tone: "hi", bevel: 0.4, className: "ink", steps: 5 }));
  const secondary = plan(38, 39.3, 26, 9, 4.5);
  out.push(box(secondary, BZ, 1.2, { tone: "hi", bevel: 0.3, steps: 5 }));
  out.push(L(k.planOutline(k.insetPlan(secondary, 1), BZ + 1.2, P, 5), { tone: "mid" }));
  // checkboxes: one empty, one checked
  const cb0 = plan(74, 40.3, 7, 7, 1.4);
  const cb1 = plan(85, 40.3, 7, 7, 1.4);
  out.push(box(cb0, BZ, 1.2, { tone: "hi", bevel: 0.3 }), box(cb1, BZ, 1.2, { tone: "hi", bevel: 0.3 }));
  out.push(L(k.planOutline(k.insetPlan(cb0, 0.9), BZ + 1.2, P, 3), { tone: "mid" }));
  out.push(L(k.onTop([[cb1.x + 1.8, cb1.y + 3.8], [cb1.x + 3.1, cb1.y + 5.2], [cb1.x + 5.4, cb1.y + 1.9]], BZ + 1.2, P), { tone: "mid", free: true }));
  return out.join("");
}

// A cable laid over the steps of a part: a polyline of 3D points, dots on both ends
const cable = (points) => {
  const pts = points.map((p) => at(p));
  return k.wireSvg(pts[0], pts[pts.length - 1], { via: pts.slice(1, -1), tone: "mid", size: 1.1 });
};

// the sheet's primary button leads, across the steps of the tablet, to the prototype's button
function componentWire() {
  const yc = BTN_CY;
  const px = BOARD.x + 6; // the sheet's primary button, left edge
  const btnTop = BZ + 2.5;
  const body = XS[2] + TW; // right face of the prototype
  const screenRight = body - 4;
  return cable([
    [px + 1.4, yc, btnTop],
    [px, yc, btnTop],
    [px, yc, BZ],
    [BOARD.x, yc, BZ],
    [BOARD.x - 0.8, yc, 0],
    [body + 3, yc, 0],
    [body + 3, yc, MAT_H],
    [body, yc, MAT_H],
    [body, yc, SCREEN_Z],
    [screenRight, yc, SCREEN_Z],
    [screenRight, yc, CONTENT_Z],
    [BTN.x + BTN.w, yc, CONTENT_Z],
    [BTN.x + BTN.w, yc, BTN_Z + BTN_H],
    [BTN.x + BTN.w - 1.6, yc, BTN_Z + BTN_H],
  ]);
}

// the ink button leads to the first phone: over the front of the tablet, then onto the phone's mat
function flowWire() {
  const x = BTN_CX;
  const front = BTN.y + BTN.d;
  const tabletFront = ROW_Y + TD;
  const phoneBack = PHONE_Y - 3;
  return cable([
    [x, front - 1.4, BTN_Z + BTN_H],
    [x, front, BTN_Z + BTN_H],
    [x, front, CONTENT_Z],
    [x, tabletFront - 4, CONTENT_Z],
    [x, tabletFront - 4, SCREEN_Z],
    [x, tabletFront, SCREEN_Z],
    [x, tabletFront, MAT_H],
    [x, tabletFront + 3, MAT_H],
    [x, tabletFront + 3, 0],
    [x, phoneBack - 0.4, 0],
    [x, phoneBack, MAT_H],
    [x, phoneBack + 1.4, MAT_H],
  ]);
}

const flat = (a, b, z = MAT_H + 0.01) => k.wireSvg(at([a[0], a[1], z]), at([b[0], b[1], z]), { tone: "mid", size: 1.1 });

// the selector: three detents, the pointer on the third direction
const SEL = { x: -52, y: -6 };
function selector() {
  const out = [];
  const [cx, cy, r] = [SEL.x, SEL.y, 15];
  out.push(`<path class="iso-halo" d="${k.haloOf({ x: cx - r, y: cy - r, w: r * 2, d: r * 2, r }, 0, 8, P)}" style="filter:blur(4px)"/>`);
  out.push(S(k.cylinder(cx, cy, r + 3, 0, 1.6, P, 48), { tone: "lo", crease: "faint" }));
  out.push(S(k.cylinder(cx, cy, r, 1.6, 8, P, 56, 0.8), { tone: "hi", crease: "lo" }));
  const z = 9.6;
  out.push(L(k.knurl(cx, cy, r, z - 3.2, z, 60, P, 0.3), { tone: "lo" }));
  out.push(L(k.ring(cx, cy, r - 2.6, z, P, 56), { tone: "lo" }));
  const dir = (deg) => [Math.sin((deg * Math.PI) / 180), -Math.cos((deg * Math.PI) / 180)];
  [-70, 0, 70].forEach((deg) => {
    const d = dir(deg);
    out.push(L(k.lineOnTop([cx + d[0] * (r - 5.4), cy + d[1] * (r - 5.4)], [cx + d[0] * (r - 3), cy + d[1] * (r - 3)], z, P), { tone: "mid" }));
  });
  const head = dir(70);
  out.push(L(k.lineOnTop([cx, cy], [cx + head[0] * (r - 4), cy + head[1] * (r - 4)], z, P), { tone: "lit" }));
  out.push(S(k.cylinder(cx, cy, 2.4, z, 1.4, P, 16), { tone: "mid", crease: "none" }));
  return out.join("");
}

// the flow of states
const CARD = { w: 48, d: 36 };
const CARD_Y = 48;
const CARD_X = [-178, -102, -26, 50, 126];
const CARD_H = 3;
const TOPZ = CARD_H;
const m = 0.86;

function stateCard(i) {
  const x = CARD_X[i];
  const out = [S(k.slabOf({ x, y: CARD_Y, w: CARD.w, d: CARD.d, r: 3 }, 0, CARD_H, P, 3, 0.5), { tone: i === 4 ? "hi" : "mid", crease: "faint" })];
  const o = [x + 4.3, CARD_Y + 4.3];
  const pt = (ax, ay) => [o[0] + ax * m, o[1] + ay * m];
  const line = (ax, ay, bx, by, tone = "lo") => L(k.lineOnTop(pt(ax, ay), pt(bx, by), TOPZ, P), { tone, free: true });
  const ringAt = (ax, ay, r) => {
    const [cx, cy] = pt(ax, ay);
    return L(k.ring(cx, cy, r * m, TOPZ, P, 28), { tone: "hi" });
  };
  out.push(L(k.planOutline({ x: o[0], y: o[1], w: 46 * m, d: 6 * m, r: 1.5 }, TOPZ, P, 2), { tone: "mid" })); // title bar
  if (i === 0) {
    // default: list rows with a dot each
    [13, 20, 27].forEach((dy) => {
      out.push(D([at([...pt(3, dy), TOPZ])], { size: 0.8 }));
      out.push(line(8, dy, 40, dy));
    });
  } else if (i === 1) {
    // empty: a dashed frame and a plus
    const f = { x: pt(8, 11)[0], y: pt(8, 11)[1], w: 30 * m, d: 22 * m, r: 3 };
    out.push(L(k.planOutline(f, TOPZ, P, 3), { tone: "mid", dashed: true }));
    out.push(L(k.lineOnTop(pt(23, 17), pt(23, 27), TOPZ, P) + k.lineOnTop(pt(18, 22), pt(28, 22), TOPZ, P), { tone: "hi", free: true }));
  } else if (i === 2) {
    // loading: skeleton bars and a part-turn ring
    out.push(line(0, 12, 34, 12, "mid"), line(0, 18, 24, 18), line(0, 24, 30, 24));
    const [ax, ay] = pt(38, 24);
    const arc = [];
    for (let a = 0; a <= 4.2; a += 0.28) arc.push([ax + Math.sin(a) * 4.4 * m, ay - Math.cos(a) * 4.4 * m]);
    out.push(L(k.onTop(arc, TOPZ, P), { tone: "hi", free: true }));
  } else if (i === 3) {
    // error: a ring with an exclamation mark and a line of text
    out.push(ringAt(23, 17, 7.5));
    out.push(L(k.lineOnTop(pt(23, 13), pt(23, 18), TOPZ, P), { tone: "hi", free: true }));
    out.push(D([at([...pt(23, 21), TOPZ])], { size: 0.7, tone: "hi" }));
    out.push(line(8, 29, 38, 29));
  } else {
    // done: a check in a ring, on the lit card
    out.push(ringAt(23, 17, 8));
    out.push(L(k.onTop([pt(19, 17.5), pt(22, 20.5), pt(28, 14)], TOPZ, P), { tone: "hi", free: true }));
    out.push(line(8, 29, 38, 29));
  }
  return out.join("");
}

function plate() {
  return baseplate(B, {
    plate: PLATE,
    label: { x: 156, y: 96, w: 38, d: 18, r: 2 },
  });
}

// people
const designer = () =>
  chair(B, { x: DESIGNER.x, y: DESIGNER.y, z: 0, w: 15, d: 15, h: CHAIR_H }) + person(B, { x: DESIGNER.x, y: DESIGNER.y, z: SEAT_TOP, kind: "seated", ink: true });
const partner = () => person(B, { x: PARTNER.x, y: PARTNER.y, z: 0, kind: "standing", scale: 0.72 });
const user = () => chair(B, { x: USER.x, y: USER.y, z: 0, w: 15, d: 15, h: CHAIR_H }) + person(B, { x: USER.x, y: USER.y, z: SEAT_TOP, kind: "seated", scale: 0.92 });

// everything that stands on the plate, painted far to near
const items = [
  { c: [XS[0] + TW / 2, ROW_Y + TD / 2, 0], svg: sketchSheet(XS[0]) },
  { c: [XS[1] + TW / 2, ROW_Y + TD / 2, 0], svg: wireframe(XS[1]) },
  { c: [XS[2] + TW / 2, ROW_Y + TD / 2, 0], svg: prototype() },
  { c: [BOARD.x + BOARD.w / 2, BOARD.y + BOARD.d / 2, 0], svg: board() },
  ...PHONES.map((x, i) => ({ c: [x + PW / 2, PHONE_Y + PD / 2, 0], svg: phone(x, i) })),
  { c: [SEL.x, SEL.y, 0], svg: selector() },
  { c: [DESIGNER.x, DESIGNER.y, 0], svg: designer() },
  { c: [PARTNER.x, PARTNER.y, 0], svg: partner() },
  { c: [USER.x, USER.y, 0], svg: user() },
  ...CARD_X.map((x, i) => ({ c: [x + CARD.w / 2, CARD_Y + CARD.d / 2, 0], svg: stateCard(i) })),
];

const wires = [
  flat([XS[0] + TW + 4, ROW_Y + TD / 2], [XS[1] - 4, ROW_Y + TD / 2]),
  flat([XS[1] + TW + 4, ROW_Y + TD / 2], [XS[2] - 4, ROW_Y + TD / 2]),
  componentWire(),
  flowWire(),
  flat([PHONES[0] + PW + 4, PHONE_Y + PD / 2], [PHONES[1] - 4, PHONE_Y + PD / 2]),
  ...CARD_X.slice(0, -1).map((x, i) => k.wireSvg(at([x + CARD.w, CARD_Y + CARD.d / 2, CARD_H * 0.5]), at([CARD_X[i + 1], CARD_Y + CARD.d / 2, CARD_H * 0.5]), { tone: "mid", size: 1.1 })),
];

const body = [plate(), ...B.byDepth(items, (it) => it.c).map((it) => it.svg), ...wires];

export const svg = figure({
  width: WIDTH,
  height: HEIGHT,
  label:
    "A design bench seen from above. A designer seated in ink sketches the first direction on paper; a grey wireframe and a finished prototype follow at rising fidelity, and a selector with three detents sits in front of them while a partner stands beside it to arbitrate. The prototype's ink button, pressed by the cursor, leads to two phone screens that a user tries. Beside the prototype, a component sheet (colour swatches, an Aa type specimen, buttons, a field, a toggle, checkboxes and a card) is wired to the same button. Below, five screen states are chained: default, empty, loading, error and done.",
  body,
});
