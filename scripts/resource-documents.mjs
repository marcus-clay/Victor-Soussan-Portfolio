// Resource documents for the About page: six Hairline-style isometric sheets, one per resource card.
// Static SVG, no interaction. Each sheet is a page with a folded corner; its content says which resource.
//
//   node scripts/resource-documents.mjs [out dir] [--dark]
//
// Needs the Hairline kernel, whose geometry functions (pure maths, no page, no engine) draw the sheets:
//   npx skills add lucasmarkes/hairline
// then the kernel is at ~/.claude/skills/hairline-create/kernel.js. Another place: HAIRLINE_KERNEL=<path>.
// The kernel is read, never copied: the generated files hold only paths and the palette.
// Writes doc-<name>-light.svg (and doc-<name>-dark.svg with --dark) to public/images/resources by default.
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { homedir } from "node:os";

const args = process.argv.slice(2);
const OUT = args.find((a) => !a.startsWith("--")) || "public/images/resources";
const WITH_DARK = args.includes("--dark");
const KERNEL = process.env.HAIRLINE_KERNEL || `${homedir()}/.claude/skills/hairline-create/kernel.js`;
if (!existsSync(KERNEL)) {
  console.error(`Hairline kernel not found at ${KERNEL}.\nInstall it with: npx skills add lucasmarkes/hairline\nor point HAIRLINE_KERNEL at kernel.js.`);
  process.exit(1);
}
mkdirSync(OUT, { recursive: true });
const src = readFileSync(KERNEL, "utf8");
const HL = new Function("window", "document", "navigator", "matchMedia", "requestAnimationFrame", `${src}; return HL;`)({}, {}, {}, () => ({ matches: false }), () => 0);
const { Cam, fit, proj, facing, rrect, circ, fillet, poly, open, seg, ringAt, prism } = HL;

// ---- the sheet: a portrait page, one corner folded --------------------------------------------------
const X0 = -55, X1 = 55, Y0 = -75, Y1 = 75, CUT = 14, TH = 2;
const ZT = TH + 0.05;
const C = Cam(45, 0.5, 1.9);
fit(C, [[X0, Y0, 0], [X1, Y1, 0], [X1, Y0, 0], [X0, Y1, 0], [X0, Y0, TH], [X1, Y1, TH]], 200, 166);
const P = proj(C), front = facing(C);

/** Ring samples (with outward normals) for a polygon, inset by `inset` world units. */
function ringOf(pts, inset = 0) {
  const n = pts.length;
  let area = 0;
  for (let i = 0; i < n; i++) { const a = pts[i], b = pts[(i + 1) % n]; area += a[0] * b[1] - b[0] * a[1]; }
  const sgn = area > 0 ? 1 : -1;
  return pts.map((p, i) => {
    const a = pts[(i + n - 1) % n], b = pts[(i + 1) % n];
    let tx = b[0] - a[0], ty = b[1] - a[1];
    const l = Math.hypot(tx, ty) || 1; tx /= l; ty /= l;
    const nu = sgn * ty, nv = -sgn * tx;
    return { u: p[0] - nu * inset, v: p[1] - nv * inset, nu, nv };
  });
}
const outline = fillet([[X0, Y0], [X1 - CUT, Y0], [X1, Y0 + CUT], [X1, Y1], [X0, Y1]], [3, 2, 2, 3, 3], 4);
const sheet = prism(P, front, ringOf(outline), ringOf(outline, 1.4), 0, TH);

// ---- drawing helpers, all on the sheet's top face ---------------------------------------------------
const f = (n) => n.toFixed(1);
const box = (u0, v0, u1, v1, r, cls = "nf") => `<path class="${cls}" d="${poly(ringAt(P, rrect(u0, v0, u1, v1, r, 4), ZT))}"/>`;
const line = (u0, v0, u1, v1, cls = "nf") => `<path class="${cls}" d="${seg(P(u0, v0, ZT), P(u1, v1, ZT))}"/>`;
const run = (u, v, len, cls = "nf") => line(u, v, u + len, v, cls);
const path = (pts, cls = "nf") => `<path class="${cls}" d="${open(pts.map(([u, v]) => P(u, v, ZT)))}"/>`;
const dot = (u, v, r = 1.8, cls = "dot") => { const [x, y] = P(u, v, ZT); return `<circle class="${cls}" cx="${f(x)}" cy="${f(y)}" r="${r}"/>`; };
const round = (u, v, R, cls = "nf") => `<path class="${cls}" d="${poly(ringAt(P, circ(R, 24).map((q) => ({ ...q, u: q.u + u, v: q.v + v })), ZT))}"/>`;

/** What makes it a document, whatever it says: a title line, and the folded corner. */
const dogEar = () => `<path d="${poly([P(X1 - CUT, Y0, ZT), P(X1, Y0 + CUT, ZT), P(X1 - CUT, Y0 + CUT, ZT)])}"/>`;
const title = (len = 34) => run(-46, -64, len);

// ---- the six documents: each one a different kind of page -------------------------------------------
const DOCS = {
  // a scoping template: a framed "why" first, two zones, a closing strip
  scoping: () => [
    title(),
    box(-46, -50, 46, -8, 5, "nf hi"),
    run(-38, -38, 60), run(-38, -29, 40), run(-38, -20, 66),
    box(-46, 2, -4, 36, 4), box(4, 2, 46, 36, 4),
    run(-38, 14, 24), run(12, 14, 24),
    box(-46, 46, 46, 62, 4),
  ],
  // a ritual between two roles: two rows of days, one slot they share
  sync: () => [
    title(),
    ...[-32, -16, 0, 16, 32].map((u) => dot(u, -44, 1.3, "dot off")),
    ...[-32, -16, 0, 16, 32].flatMap((u) => [
      box(u - 7, -31, u + 7, -17, 3, u === 0 ? "nf hi" : "nf"),
      box(u - 7, 9, u + 7, 23, 3, u === 0 ? "nf hi" : "nf"),
    ]),
    line(0, -17, 0, 9, "nf hi"),
    run(-46, 42, 70), run(-46, 52, 48),
  ],
  // an audit: an interface under review, three findings pinned and listed
  teardown: () => [
    title(),
    box(-46, -50, 46, 0, 5),
    line(-38, -41, 38, -41),
    box(-38, -34, -4, -8, 3), box(4, -34, 38, -22, 3), box(4, -16, 38, -8, 3),
    dot(30, -41, 2.3), dot(-21, -21, 2.3), dot(21, -28, 2.3),
    ...[16, 32, 48].flatMap((v, i) => [dot(-40, v, 2.3), run(-30, v, [64, 44, 70][i])]),
  ],
  // a checklist: five rows, every box ticked
  checklist: () => [
    title(),
    ...[-44, -22, 0, 22, 44].flatMap((v, i) => [
      box(-46, v - 7, -32, v + 7, 3),
      path([[-43.5, v - 0.5], [-39.5, v + 4.5], [-32, v - 6]], "nf hi"),
      run(-24, v, [66, 48, 58, 40, 54][i]),
    ]),
  ],
  // a page cut into slices, and the pieces it is made of
  slicing: () => [
    title(),
    box(-46, -50, 12, -38, 3), box(-46, -32, 12, -6, 3),
    box(-46, 0, -18, 26, 3), box(-12, 0, 12, 26, 3), box(-46, 32, 12, 44, 3),
    line(-52, -35, 18, -35, "nf hi dash"), line(-52, -3, 18, -3, "nf hi dash"), line(-52, 29, 18, 29, "nf hi dash"),
    box(24, -50, 46, -42, 4), box(24, -30, 46, -22, 3), box(24, -8, 46, 24, 4),
    run(-38, 52, 50), run(-38, 61, 30),
  ],
  // a register of files, and where each one stands
  status: () => [
    title(),
    ...[-34, 4, 42].flatMap((v, i) => [
      box(-46, v - 9, -32, v + 9, 2),
      run(-22, v - 3, [48, 58, 40][i]), run(-22, v + 5, [30, 36, 24][i]),
    ]),
    round(36, -34, 7, "nf dash"),
    round(36, 4, 7), dot(36, 4, 2.2, "dot m"),
    round(36, 42, 7, "nf hi"), dot(36, 42, 3.4),
  ],
};

const THEMES = {
  light: { plate: "#ffffff", hi: "#232327", edge: "#a4a4ac", mid: "#c3c3c9", lo: "#e0e0e4" },
  dark: { plate: "#08090a", hi: "#d0d6e0", edge: "#5b5d64", mid: "#3e3e44", lo: "#29292d" },
};
const css = (t) => `.hl{--plate:${t.plate};--hi:${t.hi};--edge:${t.edge};--mid:${t.mid};--lo:${t.lo}}.hl path{fill:var(--plate);stroke:var(--mid);stroke-width:.9;vector-effect:non-scaling-stroke;stroke-linejoin:round;stroke-linecap:round}.hl .nf{fill:none}.hl .sil{stroke:var(--edge)}.hl .hi{stroke:var(--hi)}.hl .lo{stroke:var(--lo)}.hl .dash{stroke-dasharray:1 3}.hl .dot{stroke:none;fill:var(--hi)}.hl .dot.m{fill:var(--edge)}.hl .dot.off{fill:var(--lo)}`;

for (const [name, make] of Object.entries(DOCS)) {
  for (const [theme, t] of Object.entries(THEMES)) {
    if (theme === "dark" && !WITH_DARK) continue;
    const body = [`<path class="sil" d="${sheet.sil}"/>`, `<path class="nf" d="${sheet.crease}"/>`, dogEar(), ...make()].join("");
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" class="hl" viewBox="0 0 400 320" aria-hidden="true"><style>${css(t)}</style>${body}</svg>`;
    writeFileSync(`${OUT}/doc-${name}-${theme}.svg`, svg);
  }
}
console.log("wrote", Object.keys(DOCS).length * (WITH_DARK ? 2 : 1), "files to", OUT);
