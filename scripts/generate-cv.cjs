// Génère public/cv/CV-Victor-Soussan-2026-{FR,EN}.pdf à partir de la source unique du parcours
// (src/data/profileData.ts) et du bloc resume de src/data/translations.ts.
// Usage : npm run cv   (nécessite playwright et ses navigateurs, déjà installés pour les tests)
// Forme : une colonne, Arial, en-têtes standards, liens actifs, texte copiable (lecture ATS).

const fs = require('fs')
const path = require('path')
const Module = require('module')
const ts = require('typescript')
const { chromium } = require('playwright')

const ROOT = path.resolve(__dirname, '..')

// Charge un module TypeScript sans build : transpile en CommonJS et résout les imports relatifs.
const cache = new Map()
function loadTs(file) {
  if (cache.has(file)) return cache.get(file)
  const src = fs.readFileSync(file, 'utf8')
  const out = ts.transpileModule(src, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText
  const m = new Module(file, module)
  m.filename = file
  m.paths = Module._nodeModulePaths(path.dirname(file))
  m.require = (req) => {
    if (!req.startsWith('.')) return require(req)
    const base = path.resolve(path.dirname(file), req)
    return loadTs(fs.existsSync(base + '.ts') ? base + '.ts' : base)
  }
  cache.set(file, m.exports)
  m._compile(out, file)
  return m.exports
}

const { TRANSLATIONS } = loadTs(path.join(ROOT, 'src/data/translations.ts'))
const { PROFILE_EXPERIENCE } = loadTs(path.join(ROOT, 'src/data/profileData.ts'))

// Nombre de puces conservées par expérience pour tenir sur deux pages (contexte toujours conservé)
const MAX_BULLETS = {
  freelance: 5,
  'beta-gouv': 4,
  toolkit: 3,
  'unowhy-product-lead': 5,
  'unowhy-head-of-design': 4,
  'unowhy-senior': 3,
  dailymotion: 4,
  ogury: 2,
  'pagesjaunes-senior': 3,
  'pagesjaunes-designer': 2,
  louis21: 3,
  'early-career': 2,
}

const LABELS = {
  fr: { summary: 'Profil', experience: 'Expériences', skills: 'Compétences', education: 'Formation', languages: 'Langues', phone: '06 15 98 94 00' },
  en: { summary: 'Summary', experience: 'Experience', skills: 'Skills', education: 'Education', languages: 'Languages', phone: '+33 6 15 98 94 00' },
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Aucun tiret cadratin ni demi-cadratin dans le texte produit ; espaces insécables avant ; : ? ! % en français
function clean(text, lang) {
  let t = text.replace(/\s[–—]\s/g, ', ').replace(/[–—]/g, '-')
  if (lang === 'fr') t = t.replace(/ ([:;?!%])/g, ' $1')
  return esc(t)
}

function html(lang) {
  const r = TRANSLATIONS[lang].resume
  const L = LABELS[lang]
  const c = (s) => clean(s, lang)
  const entries = PROFILE_EXPERIENCE.map((e) => {
    const bullets = e.bullets[lang].slice(0, MAX_BULLETS[e.id] ?? 3)
    return `<div class="e">
      <div class="h"><span><b>${c(e.role[lang])}</b>, ${c(e.company[lang])}</span><span class="d">${c(e.period[lang])}</span></div>
      <p class="ctx">${c(e.context[lang])}</p>
      <ul>${bullets.map((b) => `<li>${c(b)}</li>`).join('')}</ul>
    </div>`
  }).join('\n')

  return `<!doctype html><html lang="${lang}"><meta charset="utf-8"><title>Victor Soussan, Lead Product Designer</title>
<style>
  @page { size: A4; margin: 12mm 15mm 12mm 15mm; }
  * { box-sizing: border-box; }
  body { font-family: Arial, Helvetica, sans-serif; font-size: 8.6pt; line-height: 1.34; color: #111827; margin: 0; }
  a { color: #3D65E8; text-decoration: none; }
  h1 { font-size: 20pt; margin: 0; letter-spacing: -0.01em; }
  .role { font-size: 11pt; color: #374151; margin: 1mm 0 1.5mm; }
  .contact { font-size: 8.4pt; color: #374151; }
  h2 { font-size: 8.8pt; text-transform: uppercase; letter-spacing: 0.08em; margin: 4.2mm 0 1.6mm; padding-bottom: 0.8mm; border-bottom: 0.6pt solid #111827; }
  p { margin: 0; }
  .e { margin-bottom: 2.6mm; break-inside: avoid; }
  .h { display: flex; justify-content: space-between; gap: 6mm; }
  .d { color: #4B5563; white-space: nowrap; }
  .ctx { color: #374151; margin: 0.5mm 0 0.6mm; }
  ul { margin: 0; padding-left: 4mm; }
  li { margin: 0 0 0.35mm; }
  .skills { color: #111827; }
</style>
<h1>Victor Soussan</h1>
<div class="role">Lead Product Designer</div>
<div class="contact">
  <a href="mailto:victorsoussan@gmail.com">victorsoussan@gmail.com</a> | ${L.phone} | Paris |
  <a href="https://www.victorsoussan.fr">victorsoussan.fr</a> |
  <a href="https://www.linkedin.com/in/victorsoussan-product-design">linkedin.com/in/victorsoussan-product-design</a>
</div>
<h2>${L.summary}</h2>
<p>${c(r.summary)}</p>
<h2>${L.experience}</h2>
${entries}
<h2>${L.skills}</h2>
<p class="skills">${r.skills.map(c).join(' | ')}</p>
<p class="skills" style="margin-top:1mm">${c(r.tools)}</p>
<h2>${L.education}</h2>
<ul>${r.education.map((e) => `<li>${c(e)}</li>`).join('')}</ul>
<h2>${L.languages}</h2>
<p>${c(r.languages)}</p>
</html>`
}

;(async () => {
  const outDir = path.join(ROOT, 'public/cv')
  fs.mkdirSync(outDir, { recursive: true })
  const browser = await chromium.launch()
  for (const lang of ['fr', 'en']) {
    const page = await browser.newPage()
    await page.setContent(html(lang), { waitUntil: 'load' })
    const file = path.join(outDir, `CV-Victor-Soussan-2026-${lang.toUpperCase()}.pdf`)
    await page.pdf({ path: file, format: 'A4', printBackground: true, preferCSSPageSize: true })
    console.log('écrit', path.relative(ROOT, file))
    await page.close()
  }
  await browser.close()
})().catch((e) => {
  console.error(e)
  process.exit(1)
})
