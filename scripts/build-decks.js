// Two deck templates in the visual system of victorsoussan.fr (Public Sans, semibold 600 titles, pale
// grounds, white cards with a hairline, black as the one accent), each in French and in English:
//   concept-review : presenting a product design concept (the ten steps of the review skeleton)
//   design-study   : presenting a design study (context, research, insights, explorations, decision, tests)
// Layouts come from the SPACE10 catalogue (contents, numbered section, statement, quote, lists, columns,
// visual, grid, table, timeline), redrawn in the site's tokens. Placeholder copy says what goes where.
//   npm install pptxgenjs (in a scratch folder), then: NODE_PATH=<that folder>/node_modules node scripts/build-decks.js public/decks
//   then render: soffice --headless --convert-to pdf public/decks/*.pptx ; pdftoppm -r 96 -png ; sharp to WebP 1280 (see the PR #70 notes)
const pptxgen = require("pptxgenjs");
const { applyTheme } = require("/Users/condamine/.claude/skills/synced/be6552e0-ff7b-403a-821f-9be919806da7_0e815d75-2b92-49d8-b2da-25da2eb96eb8/pptx/scripts/apply_theme.js");
const fs = require("fs");
const path = require("path");

const OUT = process.argv[2] || ".";
const NB = " ";
const HEAD = "Public Sans SemiBold";
const BODY = "Public Sans";

// Tokens of the site
const BG = "FDFDFC", WHITE = "FFFFFF", G900 = "111827", G700 = "374151", G600 = "4B5563", G500 = "6B7280", G400 = "9CA3AF", G200 = "E5E7EB", G100 = "F3F4F6", G50 = "F5F5F7";
const THEME = {
  name: "Victor Soussan",
  headFontFace: HEAD, bodyFontFace: BODY,
  colors: { dk1: G900, lt1: WHITE, dk2: G600, lt2: BG, accent1: G900, accent2: G500, accent3: G100, accent4: G200, accent5: G50, accent6: G400, hlink: G900, folHlink: G600 },
};
// Type scale (pt), from the site's scale
const T = { cover: 36, divider: 30, statement: 26, title: 24, lead: 16, h3: 15, body: 13, caption: 10.5, micro: 9.5 };
const W = 13.333, H = 7.5, M = 0.6;

// ---------------------------------------------------------------------------------------------------
// Words, per deck and per language
// ---------------------------------------------------------------------------------------------------
const COMMON = {
  fr: { visual: "Visuel", contents: "Sommaire", section: "Section", nextStep: "Prochaine étape", contact: "victorsoussan.fr · victorsoussan@gmail.com", pros: "Pour", cons: "Contre", footer: "Victor Soussan", date: "Mois AAAA", author: "Prénom Nom, rôle" },
  en: { visual: "Visual", contents: "Contents", section: "Section", nextStep: "Next step", contact: "victorsoussan.fr · victorsoussan@gmail.com", pros: "For", cons: "Against", footer: "Victor Soussan", date: "Month YYYY", author: "First name Last name, role" },
};

const DECKS = {
  "concept-review": {
    fr: {
      title: "Revue de concept", file: "Modele-revue-de-concept-FR",
      cover: { label: "Nom du projet", title: "Revue de concept", sub: "Une phrase sur ce que cette revue doit décider." },
      toc: ["Le problème à cadrer", "Besoins et objectifs", "Périmètre et impératifs", "Cadre conceptuel", "Le concept", "Proposition de valeur", "Le parcours", "Pour et contre", "Décisions et calendrier"],
      s1: { name: "Le problème à cadrer", note: "Ce que ce document doit permettre de décider, et pour qui." },
      problem: { title: "Le problème, tel que l’équipe le vit aujourd’hui", cols: [["Ce qui se passe", "Deux ou trois phrases factuelles : la situation, les symptômes observés, ce que disent les utilisateurs et les chiffres."], ["Pourquoi maintenant", "Ce qui rend le sujet prioritaire : une échéance, un signal produit, une décision en attente."]] },
      s2: { name: "Besoins et objectifs", note: "Qui a besoin de quoi, et ce que l’on cherche à atteindre." },
      needs: { title: "Trois besoins utilisateur, un objectif chacun", cards: [["Besoin 1", "Formulé du point de vue de l’utilisateur, avec la source (entretien, support, données)."], ["Besoin 2", "Un besoin par carte. Si deux besoins se ressemblent, n’en garder qu’un."], ["Besoin 3", "L’objectif associé se mesure : on saura dire s’il est atteint."]] },
      s3: { name: "Périmètre et impératifs", note: "Ce que le concept doit respecter quoi qu’il arrive." },
      scope: { title: "Les impératifs produit et leur origine", head: ["Impératif", "Pourquoi", "Source"], rows: [["Ce qui est obligatoire", "Réglementaire, technique ou métier", "Qui l’a posé"], ["Ce qui est hors périmètre", "Pour garder le sujet tenable", "Décision du…"], ["Ce qui reste ouvert", "À trancher pendant la revue", "Question pour…"]] },
      s4: { name: "Cadre conceptuel", note: "Les principes qui guident toutes les propositions." },
      principles: { title: "Quatre principes, formulés en une ligne chacun", words: ["Un principe", "Un autre principe", "Un troisième", "Le dernier"], note: "Un principe sert à choisir entre deux options. S’il ne permet aucun choix, ce n’est pas un principe." },
      s5: { name: "Le concept", note: "Une idée, présentée en une phrase avant d’être détaillée." },
      statement: "Le concept, en une phrase que n’importe qui dans la salle pourrait répéter.",
      value: { title: "Ce que le concept apporte, et à qui", body: "Trois phrases. La première dit le bénéfice pour l’utilisateur. La deuxième dit le bénéfice pour l’organisation. La troisième dit ce que le concept ne fait volontairement pas.", bullets: ["Pour l’utilisateur : …", "Pour l’équipe ou le métier : …", "Ce que le concept laisse de côté : …"] },
      flow: { title: "Le parcours, de l’entrée à la sortie", steps: ["Entrée", "Étape clé", "Décision", "Sortie"], note: "Si un prototype existe, c’est ici qu’on quitte les slides pour le montrer." },
      proscons: { title: "Ce que le concept gagne et ce qu’il coûte", pros: ["Un gain concret, avec son indice", "Un deuxième gain", "Un troisième"], cons: ["Un coût ou un risque, nommé", "Ce qui reste incertain", "Ce que l’on sacrifie"] },
      s6: { name: "Décisions et calendrier", note: "Ce qui doit être tranché, par qui, et quand." },
      decisions: { title: "Trois décisions à prendre, dans l’ordre", steps: [["Cette semaine", "Décision 1", "Qui la prend, sur quelle base"], ["Dans deux semaines", "Décision 2", "Ce qui doit être prêt avant"], ["Fin du mois", "Décision 3", "Ce qui démarre ensuite"]] },
      closing: { title: "La prochaine étape, précise", lines: ["Une action, une personne, une date.", "Ce que vous attendez de la salle aujourd’hui."] },
    },
    en: {
      title: "Concept review", file: "Concept-review-template-EN",
      cover: { label: "Project name", title: "Concept review", sub: "One sentence on what this review must decide." },
      toc: ["The problem to frame", "Needs and goals", "Scope and mandatories", "Conceptual framework", "The concept", "Value proposition", "The flow", "For and against", "Decisions and schedule"],
      s1: { name: "The problem to frame", note: "What this document must help decide, and for whom." },
      problem: { title: "The problem, as the team lives it today", cols: [["What is happening", "Two or three factual sentences: the situation, the symptoms observed, what users and numbers say."], ["Why now", "What makes the topic a priority: a deadline, a product signal, a pending decision."]] },
      s2: { name: "Needs and goals", note: "Who needs what, and what we are trying to reach." },
      needs: { title: "Three user needs, one goal each", cards: [["Need 1", "Written from the user’s point of view, with its source (interview, support, data)."], ["Need 2", "One need per card. If two needs look alike, keep one."], ["Need 3", "The matching goal is measurable: we will be able to say whether it was reached."]] },
      s3: { name: "Scope and mandatories", note: "What the concept must respect whatever happens." },
      scope: { title: "The product mandatories and where they come from", head: ["Mandatory", "Why", "Source"], rows: [["What is required", "Regulatory, technical or business", "Who set it"], ["What is out of scope", "To keep the topic tractable", "Decided by…"], ["What stays open", "To settle during the review", "Question for…"]] },
      s4: { name: "Conceptual framework", note: "The principles that guide every proposal." },
      principles: { title: "Four principles, one line each", words: ["A principle", "Another principle", "A third one", "The last one"], note: "A principle helps choose between two options. If it allows no choice, it is not a principle." },
      s5: { name: "The concept", note: "One idea, stated in one sentence before any detail." },
      statement: "The concept, in one sentence anyone in the room could repeat.",
      value: { title: "What the concept brings, and to whom", body: "Three sentences. The first states the benefit for the user. The second states the benefit for the organisation. The third states what the concept deliberately does not do.", bullets: ["For the user: …", "For the team or the business: …", "What the concept leaves aside: …"] },
      flow: { title: "The flow, from entry to exit", steps: ["Entry", "Key step", "Decision", "Exit"], note: "If a prototype exists, this is where you leave the slides to show it." },
      proscons: { title: "What the concept gains and what it costs", pros: ["A concrete gain, with its evidence", "A second gain", "A third one"], cons: ["A cost or a risk, named", "What stays uncertain", "What we give up"] },
      s6: { name: "Decisions and schedule", note: "What must be settled, by whom, and when." },
      decisions: { title: "Three decisions to take, in order", steps: [["This week", "Decision 1", "Who takes it, on what basis"], ["In two weeks", "Decision 2", "What must be ready before"], ["End of month", "Decision 3", "What starts next"]] },
      closing: { title: "The next step, precisely", lines: ["One action, one person, one date.", "What you expect from the room today."] },
    },
  },
  "design-study": {
    fr: {
      title: "Étude de design", file: "Modele-etude-de-design-FR",
      cover: { label: "Nom du projet", title: "Étude de design", sub: "Une phrase sur la question à laquelle l’étude répond." },
      toc: ["Le contexte", "Ce que la recherche a montré", "Les enseignements", "Les explorations", "La décision", "Le prototype", "Les tests", "La suite"],
      s1: { name: "Le contexte", note: "Le produit, l’équipe, la question de départ." },
      context: { title: "D’où part l’étude", body: "Le produit et son usage, en deux phrases. La question posée au départ, telle qu’elle a été formulée. Qui a demandé l’étude, et dans quel délai." },
      s2: { name: "Ce que la recherche a montré", note: "Les faits, avant les interprétations." },
      quote: { text: "Une phrase entendue en entretien, citée mot pour mot, qui dit le problème mieux qu’un résumé.", who: "Un participant, rôle, contexte" },
      facts: { title: "Ce que l’on sait, en phrases", lines: ["Douze entretiens menés en trois semaines, auprès de deux profils.", "Un parcours observé sur le terrain, dans deux lieux différents.", "Les données d’usage des six derniers mois, sur la fonctionnalité concernée."] },
      s3: { name: "Les enseignements", note: "Trois choses que l’on ne savait pas avant." },
      insights: { title: "Trois enseignements, un par colonne", cards: [["Enseignement 1", "Une phrase qui dit ce qui a changé dans notre compréhension, et la preuve."], ["Enseignement 2", "Chaque enseignement s’appuie sur plusieurs sources, jamais une seule."], ["Enseignement 3", "Ce qu’il implique pour la conception, en une ligne."]] },
      s4: { name: "Les explorations", note: "Plusieurs pistes, explorées avant de choisir." },
      grid: { title: "Quatre pistes explorées", labels: ["Piste A", "Piste B", "Piste C", "Piste D"] },
      s5: { name: "La décision", note: "La piste retenue, et pourquoi." },
      statement: "La piste retenue, en une phrase, avec la raison principale du choix.",
      s6: { name: "Le prototype", note: "Ce qui a été construit pour tester la décision." },
      proto: { title: "Le prototype, au niveau de fidélité choisi", body: "Ce que le prototype permet de tester, et ce qu’il ne cherche pas à montrer. Le niveau de fidélité dépend de la question : un flux se teste en basse fidélité, une interaction fine demande de la haute fidélité.", bullets: ["Testé : …", "Pas testé : …", "Lien vers le prototype"] },
      s7: { name: "Les tests", note: "Ce que les utilisateurs ont fait avec, et ce que l’on en retient." },
      tests: { title: "Les résultats des tests, tâche par tâche", head: ["Tâche", "Réussite", "Ce que l’on a vu", "Ce que l’on change"], rows: [["Tâche 1", "4 sur 5", "Une observation", "Un ajustement"], ["Tâche 2", "2 sur 5", "Le point de friction", "Ce qui est repris"], ["Tâche 3", "5 sur 5", "Ce qui a bien marché", "Rien"]] },
      s8: { name: "La suite", note: "Ce qui démarre, et quand." },
      roadmap: { title: "Les trois prochaines étapes", steps: [["Semaine 1", "Reprise du prototype", "Les deux ajustements issus des tests"], ["Semaines 2 et 3", "Deuxième série de tests", "Cinq participants, même protocole"], ["Semaine 4", "Passage en développement", "Spécifications et découpage"]] },
      closing: { title: "La prochaine étape, précise", lines: ["Une action, une personne, une date.", "Ce que vous attendez de la salle aujourd’hui."] },
    },
    en: {
      title: "Design study", file: "Design-study-template-EN",
      cover: { label: "Project name", title: "Design study", sub: "One sentence on the question the study answers." },
      toc: ["The context", "What the research showed", "The insights", "The explorations", "The decision", "The prototype", "The tests", "What comes next"],
      s1: { name: "The context", note: "The product, the team, the opening question." },
      context: { title: "Where the study starts from", body: "The product and its use, in two sentences. The question asked at the start, as it was worded. Who asked for the study, and in what timeframe." },
      s2: { name: "What the research showed", note: "The facts, before the interpretations." },
      quote: { text: "A sentence heard in an interview, quoted word for word, that says the problem better than a summary.", who: "A participant, role, context" },
      facts: { title: "What we know, in sentences", lines: ["Twelve interviews over three weeks, with two profiles.", "One journey observed in the field, in two different places.", "Usage data from the last six months, on the feature concerned."] },
      s3: { name: "The insights", note: "Three things we did not know before." },
      insights: { title: "Three insights, one per column", cards: [["Insight 1", "One sentence on what changed in our understanding, and the evidence."], ["Insight 2", "Each insight rests on several sources, never one."], ["Insight 3", "What it implies for the design, in one line."]] },
      s4: { name: "The explorations", note: "Several paths, explored before choosing." },
      grid: { title: "Four paths explored", labels: ["Path A", "Path B", "Path C", "Path D"] },
      s5: { name: "The decision", note: "The path kept, and why." },
      statement: "The path kept, in one sentence, with the main reason for the choice.",
      s6: { name: "The prototype", note: "What was built to test the decision." },
      proto: { title: "The prototype, at the chosen fidelity", body: "What the prototype lets us test, and what it does not try to show. Fidelity depends on the question: a flow is tested in low fidelity, a fine interaction needs high fidelity.", bullets: ["Tested: …", "Not tested: …", "Link to the prototype"] },
      s7: { name: "The tests", note: "What users did with it, and what we keep." },
      tests: { title: "Test results, task by task", head: ["Task", "Success", "What we saw", "What we change"], rows: [["Task 1", "4 of 5", "An observation", "An adjustment"], ["Task 2", "2 of 5", "The friction point", "What is reworked"], ["Task 3", "5 of 5", "What worked well", "Nothing"]] },
      s8: { name: "What comes next", note: "What starts, and when." },
      roadmap: { title: "The next three steps", steps: [["Week 1", "Prototype rework", "The two adjustments from the tests"], ["Weeks 2 and 3", "Second round of tests", "Five participants, same protocol"], ["Week 4", "Into development", "Specifications and slicing"]] },
      closing: { title: "The next step, precisely", lines: ["One action, one person, one date.", "What you expect from the room today."] },
    },
  },
};

// ---------------------------------------------------------------------------------------------------
// One deck
// ---------------------------------------------------------------------------------------------------
async function build(deckId, lang) {
  const d = DECKS[deckId][lang];
  const c = COMMON[lang];
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE";
  pres.theme = { headFontFace: HEAD, bodyFontFace: BODY };
  pres.author = "Victor Soussan";
  pres.title = d.title;
  pres.lang = lang === "fr" ? "fr-FR" : "en-GB";
  const C = pres.SchemeColor;
  let n = 0; const name = (s) => `${s} ${++n}`;

  const footer = [
    { text: { text: c.footer, options: { x: M, y: 6.94, w: 3, h: 0.3, fontSize: T.caption, color: C.accent2, margin: 0, valign: "middle" } } },
    { text: { text: c.contact, options: { x: 4.2, y: 6.94, w: 5, h: 0.3, fontSize: T.caption, color: C.accent2, margin: 0, align: "center", valign: "middle" } } },
  ];
  const slideNum = { x: W - M - 0.6, y: 6.94, w: 0.6, h: 0.3, fontSize: T.caption, color: G500, align: "right", margin: 0 };

  pres.defineSlideMaster({
    title: "COVER", background: { color: BG },
    objects: [
      { text: { text: c.footer, options: { x: M, y: 0.5, w: 4, h: 0.4, fontFace: HEAD, fontSize: 16, color: C.text1, margin: 0, valign: "middle", charSpacing: -0.3 } } },
      ...footer,
      { placeholder: { options: { align: "left", name: "label", type: "body", x: M, y: 2.5, w: 10, h: 0.3, fontSize: T.micro, color: C.accent2, charSpacing: 0.8, margin: 0 }, text: "" } },
      { placeholder: { options: { align: "left", name: "title", type: "title", x: M, y: 2.9, w: 10.6, h: 1.6, fontSize: T.cover, color: C.text1, charSpacing: -0.9, margin: 0, valign: "top" }, text: "" } },
      { placeholder: { options: { align: "left", name: "subtitle", type: "body", x: M, y: 4.5, w: 9.2, h: 1.0, fontSize: T.lead, color: C.accent2, margin: 0, valign: "top" }, text: "" } },
    ],
  });
  pres.defineSlideMaster({
    title: "CONTENT", background: { color: BG }, slideNumber: slideNum,
    objects: [
      ...footer,
      { placeholder: { options: { align: "left", name: "label", type: "body", x: M, y: 0.55, w: 11.5, h: 0.3, fontSize: T.micro, color: C.accent2, charSpacing: 0.8, margin: 0, valign: "middle" }, text: "" } },
      { placeholder: { options: { align: "left", name: "title", type: "title", x: M, y: 0.88, w: 11.2, h: 0.95, fontSize: T.title, color: C.text1, charSpacing: -0.6, margin: 0, valign: "top" }, text: "" } },
    ],
  });
  pres.defineSlideMaster({
    title: "DIVIDER", background: { color: BG }, slideNumber: slideNum,
    objects: [
      ...footer,
      { placeholder: { options: { align: "left", name: "label", type: "body", x: M, y: 2.3, w: 4, h: 0.3, fontSize: T.micro, color: C.accent2, charSpacing: 0.8, margin: 0 }, text: "" } },
      { placeholder: { options: { align: "left", name: "title", type: "title", x: M, y: 2.7, w: 10.6, h: 1.4, fontSize: T.divider, color: C.text1, charSpacing: -0.75, margin: 0, valign: "top" }, text: "" } },
      { placeholder: { options: { align: "left", name: "subtitle", type: "body", x: M, y: 4.2, w: 9.2, h: 1.2, fontSize: T.lead, color: C.accent2, margin: 0, valign: "top" }, text: "" } },
    ],
  });

  // Helpers
  const shadowSm = () => ({ type: "outer", blur: 4, offset: 1, angle: 90, color: "000000", opacity: 0.05 });
  const label = (s, text, x, y, w) => s.addText(text.toUpperCase(), { x, y, w, h: 0.24, fontSize: T.micro, color: C.accent2, charSpacing: 0.8, margin: 0, isTextBox: true, valign: "top", objectName: name("label") });
  const h3 = (s, text, x, y, w, h = 0.35, size = T.h3) => s.addText(text, { x, y, w, h, fontFace: HEAD, fontSize: size, color: C.text1, charSpacing: -0.2, margin: 0, isTextBox: true, valign: "top", objectName: name("h3") });
  const body = (s, text, x, y, w, h, size = T.body, color = C.text2) => s.addText(text, { x, y, w, h, fontSize: size, color, margin: 0, isTextBox: true, valign: "top", lineSpacingMultiple: 1.15, objectName: name("body") });
  const bullets = (s, items, x, y, w, h, size = T.body) => s.addText(items.map((t, i) => ({ text: t, options: { bullet: { indent: 14 }, breakLine: i < items.length - 1 } })), { x, y, w, h, fontSize: size, color: C.text2, margin: 0, isTextBox: true, valign: "top", paraSpaceAfter: 6, objectName: name("list") });
  const card = (s, x, y, w, h) => s.addShape(pres.ShapeType.roundRect, { x, y, w, h, rectRadius: 0.17, fill: { color: WHITE }, line: { color: G100, width: 0.75 }, shadow: shadowSm(), objectName: name("card") });
  /** A frame standing for a picture, with the word "Visual" in its centre */
  const visual = (s, x, y, w, h, text = c.visual) => {
    s.addShape(pres.ShapeType.roundRect, { x, y, w, h, rectRadius: 0.17, fill: { color: G100 }, line: { color: G200, width: 0.75 }, objectName: name("visual") });
    s.addText(text, { x, y, w, h, fontSize: T.caption, color: G500, align: "center", valign: "middle", margin: 0, isTextBox: true, objectName: name("visual label") });
  };
  const rule = (s, x, y, w, color = G200) => s.addShape(pres.ShapeType.line, { x, y, w, h: 0, line: { color, width: 0.75 }, objectName: name("rule") });
  const content = (sectionTitle, title, lbl) => {
    const s = pres.addSlide({ masterName: "CONTENT", sectionTitle });
    if (lbl) s.addText(lbl, { placeholder: "label" });
    s.addText(title, { placeholder: "title" });
    return s;
  };
  const TOP = 2.05; // first line under the title

  // ---- Cover
  pres.addSection({ title: d.cover.title });
  {
    const s = pres.addSlide({ masterName: "COVER", sectionTitle: d.cover.title });
    s.addText(d.cover.label, { placeholder: "label" });
    s.addText(d.cover.title, { placeholder: "title" });
    s.addText(d.cover.sub, { placeholder: "subtitle" });
    s.addText(`${c.date}${NB}·${NB}${c.author}`, { x: M, y: 5.6, w: 9, h: 0.3, fontSize: T.caption, color: C.accent2, margin: 0, isTextBox: true, objectName: name("meta") });
  }
  // ---- Contents: the title left, the numbered list in two columns on the right (SPACE10)
  {
    const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: d.cover.title });
    s.addText(c.contents, { placeholder: "title" });
    const half = Math.ceil(d.toc.length / 2);
    d.toc.forEach((t, i) => {
      const col = i < half ? 0 : 1;
      const row = i < half ? i : i - half;
      const x = 5.2 + col * 3.9, y = 1.0 + row * 0.52;
      s.addText(String(i + 1).padStart(2, "0"), { x, y, w: 0.5, h: 0.4, fontSize: T.body, color: C.accent2, margin: 0, isTextBox: true, valign: "middle", objectName: name("toc n") });
      s.addText(t, { x: x + 0.55, y, w: 3.2, h: 0.4, fontSize: T.body, color: C.text1, margin: 0, isTextBox: true, valign: "middle", objectName: name("toc") });
    });
  }

  let sectionNo = 0;
  const divider = (sec) => {
    sectionNo += 1;
    pres.addSection({ title: sec.name });
    const s = pres.addSlide({ masterName: "DIVIDER", sectionTitle: sec.name });
    s.addText(`${c.section} ${String(sectionNo).padStart(2, "0")}`, { placeholder: "label" });
    s.addText(sec.name, { placeholder: "title" });
    s.addText(sec.note, { placeholder: "subtitle" });
    return sec.name;
  };
  const statement = (sectionTitle, text) => {
    const s = pres.addSlide({ masterName: "CONTENT", sectionTitle });
    s.addText(text, { x: M, y: 2.4, w: 9.6, h: 2.2, fontFace: HEAD, fontSize: T.statement, color: C.text1, charSpacing: -0.6, margin: 0, isTextBox: true, valign: "top", lineSpacingMultiple: 1.15, objectName: name("statement") });
  };
  const twoCols = (sectionTitle, title, cols) => {
    const s = content(sectionTitle, title);
    const w = (W - 2 * M - 0.6) / 2;
    cols.forEach(([h, b], i) => { const x = M + i * (w + 0.6); h3(s, h, x, TOP, w); body(s, b, x, TOP + 0.5, w, 2.6); });
  };
  const cards = (sectionTitle, title, items) => {
    const s = content(sectionTitle, title);
    const gap = 0.3, w = (W - 2 * M - gap * (items.length - 1)) / items.length, y = TOP, h = 3.4;
    items.forEach(([hd, b], i) => { const x = M + i * (w + gap); card(s, x, y, w, h); h3(s, hd, x + 0.35, y + 0.35, w - 0.7); body(s, b, x + 0.35, y + 0.85, w - 0.7, h - 1.2); });
  };
  const table = (sectionTitle, title, head, rows) => {
    const s = content(sectionTitle, title);
    const cols = head.length, w = W - 2 * M, colW = w / cols;
    const data = [head.map((t) => ({ text: t, options: { bold: true, color: G900, fontFace: HEAD } })), ...rows];
    s.addTable(data, { x: M, y: TOP, w, colW: Array(cols).fill(colW), fontSize: T.body, color: G700, fontFace: BODY, border: { type: "solid", color: G200, pt: 0.5 }, fill: { color: WHITE }, margin: 0.12, rowH: 0.5, valign: "middle", objectName: name("table") });
  };
  const bigList = (sectionTitle, title, words, note) => {
    const s = content(sectionTitle, title);
    words.forEach((wd, i) => {
      const col = i % 2, row = Math.floor(i / 2);
      s.addText(wd, { x: M + col * 6.0, y: TOP + row * 0.95, w: 5.6, h: 0.8, fontFace: HEAD, fontSize: 28, color: C.text1, charSpacing: -0.7, margin: 0, isTextBox: true, valign: "middle", objectName: name("word") });
    });
    if (note) body(s, note, M, 5.2, 8, 0.8, T.body, C.accent2);
  };
  const halfMedia = (sectionTitle, title, text, items) => {
    const s = content(sectionTitle, title);
    const w = (W - 2 * M - 0.6) / 2;
    body(s, text, M, TOP, w, 1.8);
    if (items) bullets(s, items, M, TOP + 2.0, w, 1.6);
    visual(s, M + w + 0.6, TOP, w, 4.3);
  };
  const flow = (sectionTitle, title, steps, note) => {
    const s = content(sectionTitle, title);
    visual(s, M, TOP, W - 2 * M, 2.9);
    const gap = 0.3, w = (W - 2 * M - gap * (steps.length - 1)) / steps.length, y = TOP + 3.2;
    steps.forEach((st, i) => {
      const x = M + i * (w + gap);
      rule(s, x, y, w, G900);
      s.addText(`${String(i + 1).padStart(2, "0")}${NB}${NB}${st}`, { x, y: y + 0.12, w, h: 0.35, fontSize: T.body, fontFace: HEAD, color: C.text1, margin: 0, isTextBox: true, objectName: name("step") });
    });
    body(s, note, M, 6.1, 10, 0.5, T.caption, C.accent2);
  };
  const prosCons = (sectionTitle, title, pros, cons) => {
    const s = content(sectionTitle, title);
    const w = (W - 2 * M - 0.3) / 2, h = 3.6;
    [[c.pros, pros], [c.cons, cons]].forEach(([hd, items], i) => {
      const x = M + i * (w + 0.3);
      card(s, x, TOP, w, h);
      label(s, hd, x + 0.35, TOP + 0.35, w - 0.7);
      bullets(s, items, x + 0.35, TOP + 0.75, w - 0.7, h - 1.1, T.body);
    });
  };
  const timeline = (sectionTitle, title, steps) => {
    const s = content(sectionTitle, title);
    const gap = 0.3, w = (W - 2 * M - gap * (steps.length - 1)) / steps.length, y = TOP + 0.4;
    rule(s, M, y, W - 2 * M, G200);
    steps.forEach(([when, hd, b], i) => {
      const x = M + i * (w + gap);
      s.addShape(pres.ShapeType.ellipse, { x: x - 0.06, y: y - 0.06, w: 0.12, h: 0.12, fill: { color: G900 }, line: { color: G900, width: 0 }, objectName: name("dot") });
      label(s, when, x, y + 0.3, w);
      h3(s, hd, x, y + 0.65, w);
      body(s, b, x, y + 1.1, w - 0.3, 1.4);
    });
  };
  const grid = (sectionTitle, title, labels) => {
    const s = content(sectionTitle, title);
    const gap = 0.3, w = (W - 2 * M - gap) / 2, h = 1.95;
    labels.forEach((lb, i) => { const col = i % 2, row = Math.floor(i / 2); visual(s, M + col * (w + gap), TOP + row * (h + gap), w, h, lb); });
  };
  const quote = (sectionTitle, q) => {
    const s = pres.addSlide({ masterName: "CONTENT", sectionTitle });
    rule(s, M, 2.2, 0.9, G900);
    s.addText(`«${NB}${q.text}${NB}»`, { x: M, y: 2.45, w: 9.8, h: 2.0, fontFace: HEAD, fontSize: 24, color: C.text1, charSpacing: -0.5, margin: 0, isTextBox: true, valign: "top", lineSpacingMultiple: 1.2, objectName: name("quote") });
    body(s, q.who, M, 4.7, 8, 0.4, T.body, C.accent2);
  };
  const facts = (sectionTitle, title, lines) => {
    const s = content(sectionTitle, title);
    lines.forEach((ln, i) => {
      const y = TOP + i * 0.95;
      s.addShape(pres.ShapeType.ellipse, { x: M, y: y + 0.12, w: 0.1, h: 0.1, fill: { color: G900 }, line: { color: G900, width: 0 }, objectName: name("dot") });
      s.addText(ln, { x: M + 0.3, y, w: 10.5, h: 0.6, fontSize: T.lead, color: C.text1, margin: 0, isTextBox: true, valign: "top", objectName: name("fact") });
      if (i < lines.length - 1) rule(s, M, y + 0.75, W - 2 * M, G100);
    });
  };
  const closing = (sectionTitle, cl) => {
    const s = pres.addSlide({ masterName: "DIVIDER", sectionTitle });
    s.addText(c.nextStep, { placeholder: "label" });
    s.addText(cl.title, { placeholder: "title" });
    s.addText(cl.lines.join("\n"), { placeholder: "subtitle" });
  };

  // ---- The story of each deck
  if (deckId === "concept-review") {
    let sec = divider(d.s1); twoCols(sec, d.problem.title, d.problem.cols);
    sec = divider(d.s2); cards(sec, d.needs.title, d.needs.cards);
    sec = divider(d.s3); table(sec, d.scope.title, d.scope.head, d.scope.rows);
    sec = divider(d.s4); bigList(sec, d.principles.title, d.principles.words, d.principles.note);
    sec = divider(d.s5); statement(sec, d.statement); halfMedia(sec, d.value.title, d.value.body, d.value.bullets); flow(sec, d.flow.title, d.flow.steps, d.flow.note); prosCons(sec, d.proscons.title, d.proscons.pros, d.proscons.cons);
    sec = divider(d.s6); timeline(sec, d.decisions.title, d.decisions.steps); closing(sec, d.closing);
  } else {
    let sec = divider(d.s1); halfMedia(sec, d.context.title, d.context.body);
    sec = divider(d.s2); quote(sec, d.quote); facts(sec, d.facts.title, d.facts.lines);
    sec = divider(d.s3); cards(sec, d.insights.title, d.insights.cards);
    sec = divider(d.s4); grid(sec, d.grid.title, d.grid.labels);
    sec = divider(d.s5); statement(sec, d.statement);
    sec = divider(d.s6); halfMedia(sec, d.proto.title, d.proto.body, d.proto.bullets);
    sec = divider(d.s7); table(sec, d.tests.title, d.tests.head, d.tests.rows);
    sec = divider(d.s8); timeline(sec, d.roadmap.title, d.roadmap.steps); closing(sec, d.closing);
  }

  const file = path.join(OUT, `${d.file}.pptx`);
  await pres.writeFile({ fileName: file });
  await applyTheme(file, THEME);
  console.log("wrote", file);
}

(async () => {
  for (const deckId of Object.keys(DECKS)) for (const lang of ["fr", "en"]) await build(deckId, lang);
})();
