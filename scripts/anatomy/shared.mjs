// Shared helpers for the Approche figures. The drawing kit (iso-kit.mjs) is the MIT-licensed
// "anatomy" kit, copied next to this file (see LICENSE-anatomy).
import * as k from "./iso-kit.mjs";

export { k };

/** Short drawing helpers bound to one projection. */
export function bind(P) {
  const at = (point) => k.iso(point, P);
  return {
    P,
    at,
    S: (paths, style) => k.solidSvg(paths, style),
    L: (d, style) => k.lineSvg(d, style),
    D: (points, style) => k.dotsSvg(points, style),
    // Parts painted far to near
    byDepth: (items, centre = (item) => item) =>
      [...items].sort((a, b) => k.depthOf(centre(a), P) - k.depthOf(centre(b), P)),
    // A box standing on `z`: slab, bevelled, optional seam line inset
    box: (plan, z, h, opts = {}) =>
      k.solidSvg(k.slabOf(plan, z, h, P, opts.steps ?? 3, opts.bevel ?? 0), { tone: opts.tone ?? "mid", crease: opts.crease ?? "faint", lit: opts.lit, inner: opts.inner, className: opts.className }),
    can: (cx, cy, r, z, h, opts = {}) =>
      k.solidSvg(k.cylinder(cx, cy, r, z, h, P, opts.steps ?? 24, opts.bevel ?? 0), { tone: opts.tone ?? "mid", crease: opts.crease ?? "faint", lit: opts.lit }),
    // Screw dots on a top face
    screws: (points, z, size = 0.45) => k.dotsSvg(points.map(([x, y]) => at([x, y, z])), { size }),
  };
}

/** Surface plate on four feet with a groove, corner screws, a ruler strip and a label plate. */
export function baseplate(B, { plate, h = 10, foot = 5, strip = true, label = null }) {
  const { P, S, L, D, at, byDepth } = B;
  const out = [`<path class="iso-halo" d="${k.haloOf(plate, -h - foot, h, P)}"/>`];
  for (const [x, y] of byDepth(k.corners(plate, 20))) {
    out.push(S(k.cylinder(x, y, 7, -h - foot, 1.6, P, 28), { tone: "lo" }));
    out.push(S(k.cylinder(x, y, 5.4, -h - foot + 1.6, foot - 1.6, P, 28), { tone: "mid" }));
  }
  out.push(S(k.slabOf(plate, -h, h, P, 8, 1.6), { tone: "mid" }));
  out.push(L(k.planOutline(k.insetPlan(plate, 5), 0, P), { tone: "lo" }));
  const screws = k.corners(plate, 10);
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 2.2, 0, P, 16)).join(""), { tone: "lo" }));
  out.push(D(screws.map(([x, y]) => at([x, y, 0])), { size: 0.5 }));
  if (strip) {
    const s = { x: plate.x + 20, y: plate.y + plate.d - 15, w: plate.w * 0.52, d: 7, r: 1 };
    out.push(S(k.slabOf(s, 0, 0.6, P, 3), { tone: "lo", crease: "none" }));
    const t = k.topTicks(s.x + 4, s.x + s.w - 4, 4, 5, s.y + 0.8, 0.6, [2, 3.6], P);
    out.push(L(t.minor, { tone: "lo" }), L(t.major, { tone: "mid" }));
    out.push(D([at([s.x + 2, s.y + 3.5, 0.6]), at([s.x + s.w - 2, s.y + 3.5, 0.6])], { size: 0.45 }));
  }
  if (label) {
    const l = label;
    out.push(S(k.slabOf(l, 0, 0.8, P, 4), { tone: "lo", crease: "none" }));
    out.push(L(k.planOutline(k.insetPlan(l, 1.6), 0.8, P), { tone: "faint" }));
    [0.3, 0.55, 0.8].forEach((f, i) => {
      const y = l.y + l.d * f;
      out.push(L(k.lineOnTop([l.x + 4, y], [l.x + l.w * (i === 1 ? 0.55 : 0.78) - 4, y], 0.8, P), { tone: "lo", free: true }));
    });
    out.push(D([at([l.x + 2.4, l.y + 2.4, 0.8]), at([l.x + l.w - 2.4, l.y + l.d - 2.4, 0.8])], { size: 0.4 }));
  }
  return out.join("");
}

// The kit's light theme is tuned for a card; on a white page the same figure needs a little
// more contrast: darker side shades, stronger secondary lines.
const CONTRAST = `.iso[data-theme="light"]{--anatomy-shade-0:#cdcdc8;--anatomy-shade-1:#dadad5;--anatomy-shade-2:#e7e7e2;--anatomy-shade-3:#f2f2ee;--anatomy-lo:#9c9ca2;--anatomy-mid:#6c6c72;--anatomy-faint:#c2c2c5;--anatomy-halo-opacity:.42}.iso-solid.ink>.iso-fill{fill:#1b1b1e}.iso-solid.ink>.iso-top{fill:#2c2c30}.iso-solid.ink>.iso-shade{fill:#232326}.iso-solid.ink>.iso-edge{stroke:#0c0c0e}.iso-solid.ink>.iso-crease,.iso-solid.ink>.iso-bevel{stroke:#55555b}.iso-solid.ink[data-seamless]>.iso-shade{stroke:#232326}.iso-solid.ink[data-seamless]>.iso-top{stroke:#2c2c30}`;

/** Wrap a body in the standalone light-theme SVG. */
export function figure({ width, height, label, body }) {
  return k.figureSvg({ width, height, label, body, standalone: "light" }).replace("</style>", `${CONTRAST}</style>`);
}
