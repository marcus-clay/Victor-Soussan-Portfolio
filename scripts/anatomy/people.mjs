// Stylised people for the Approche figures: a rounded torso turned on a lathe and a ball head.
// No faces, no arms: a person is a posture and a place in the scene. The designer is drawn in
// the dark "ink" tone in every figure, so the same person can be followed from one act to the next.
import { k } from "./shared.mjs";
import * as G from "./lathe.mjs";

/**
 * @param B   bound helpers from shared.mjs `bind(P)`
 * @param opt { x, y, z, height (torso), kind: "standing" | "seated", ink, scale }
 * Returns SVG markup, painted bottom to top: legs or seat, torso, head.
 */
export function person(B, { x, y, z = 0, kind = "standing", ink = false, scale = 1 }) {
  const { P, S } = B;
  const out = [];
  const tone = ink ? "hi" : "mid";
  const cls = ink ? "ink" : undefined;
  const r = 6.4 * scale;
  const torso = kind === "seated" ? 17 * scale : 28 * scale;
  const feet = kind === "seated" ? 0 : 0;
  if (kind === "standing") {
    // two short legs under the torso, so the figure stands on something
    for (const dx of [-2.6, 2.6]) out.push(S(k.cylinder(x + dx * scale, y, 2.4 * scale, z, 10 * scale, P, 14), { tone: "lo", crease: "none" }));
  }
  const base = z + (kind === "standing" ? 10 * scale : feet);
  const F = G.frameAlong([x, y, base], [0, 0, 1]);
  const profile = [
    [0, r * 0.92],
    [torso * 0.72, r],
    [torso * 0.92, r * 0.86, 1],
    [torso, r * 0.46],
  ];
  out.push(S(G.solidOf(profile, F, P, { smooth: true }), { tone, crease: "none", className: cls }));
  // head
  out.push(S(G.sphereOf([x, y, base + torso + 4.2 * scale], 4.9 * scale, P), { tone, crease: "none", className: cls }));
  return out.join("");
}

/** A simple chair: seat slab and four short legs (for seated people). */
export function chair(B, { x, y, z = 0, w = 16, d = 16, h = 11 }) {
  const { P, S } = B;
  const out = [];
  for (const [px, py] of B.byDepth(k.corners({ x: x - w / 2, y: y - d / 2, w, d }, 2))) out.push(S(k.cylinder(px, py, 1.3, z, h, P, 10), { tone: "lo", crease: "none" }));
  out.push(S(k.slabOf({ x: x - w / 2, y: y - d / 2, w, d, r: 2.5 }, z + h, 2.4, P, 3, 0.3), { tone: "mid", crease: "faint" }));
  return out.join("");
}
