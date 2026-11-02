/**
 * Guide "Un OS personnel avec Claude Code" / "A personal OS with Claude Code" - bilingual content (EN/FR).
 * Follows the `personal-os` skill: same folders, agents, commands and steps. Every person, company and
 * product in the examples is fictional (Acme Corp). The French text carries its non-breaking spaces
 * (before : ; ? ! and inside « »).
 */

export type L = { fr: string; en: string }
export type LL = { fr: string[]; en: string[] }

export const GUIDE_OS_PATH = 'guide/os-personnel'

export const GUIDE_OS_META = {
  title: { en: 'A personal OS with Claude Code', fr: 'Un OS personnel avec Claude Code' } as L,
  subtitle: {
    en: 'A folder of text files that works as memory and dashboard for Claude Code: an inbox, rules, agents and commands. A skill builds it with you, step by step.',
    fr: 'Un dossier de fichiers texte qui sert de mémoire et de tableau de bord à Claude Code : une inbox, des règles, des agents et des commandes. Une skill le construit avec vous, pas à pas.',
  } as L,
  description: {
    en: 'Build a personal OS with Claude Code: an inbox, rules, agents and commands that keep your decisions. Step-by-step guide with a skill and a worked example.',
    fr: 'Créez un OS personnel avec Claude Code : une inbox, des règles, des agents et des commandes qui gardent vos décisions. Guide pas à pas, skill et exemple.',
  } as L,
  date: '2026-11-02',
  readTime: { en: '15 min read', fr: '15 min de lecture' } as L,
  categories: { en: ['Claude Code', 'Method'], fr: ['Claude Code', 'Méthode'] } as LL,
  keywords: ['Claude Code', 'Second brain', 'Skill', 'Product design'],
  skillUrl: 'https://github.com/marcus-clay/design-skills/releases/latest/download/personal-os.zip',
}

export const OS_SECTIONS: { id: string; label: L }[] = [
  { id: 'why', label: { fr: 'À quoi ça sert', en: 'What it is for' } },
  { id: 'needs', label: { fr: 'Ce qu’il faut', en: 'What you need' } },
  { id: 'install', label: { fr: 'Installer la skill', en: 'Install the skill' } },
  { id: 'build', label: { fr: 'Créer son OS pas à pas', en: 'Build it step by step' } },
  { id: 'daily', label: { fr: 'Au quotidien', en: 'Day to day' } },
  { id: 'usecases', label: { fr: 'Les cas d’usage', en: 'Use cases' } },
  { id: 'example', label: { fr: 'Un exemple chez Acme Corp', en: 'A worked example at Acme Corp' } },
  { id: 'safety', label: { fr: 'Sûreté et questions', en: 'Safety and questions' } },
  { id: 'more', label: { fr: 'Pour aller plus loin', en: 'Going further' } },
]

// ---------------------------------------------------------------------------
// 2. What it is for
// ---------------------------------------------------------------------------

export const OS_WHY = {
  title: { fr: 'À quoi ça sert et ce que ça change', en: 'What it is for and what it changes' } as L,
  intro: {
    fr: 'Un OS personnel est un dossier de fichiers texte (au format Markdown, que n’importe quel éditeur ouvre) où Claude Code range ce que vous lui confiez, retrouve ce qui a été décidé et prépare la suite. Sans mémoire, chaque conversation avec Claude repart de zéro. Avec ce dossier, la conversation est jetable et le dossier devient la mémoire : ce qui compte est écrit dans un fichier, et Claude relit les fichiers avant de répondre.',
    en: 'A personal OS is a folder of plain text files (in Markdown, which any editor opens) where Claude Code files what you hand it, finds what was decided and prepares what comes next. Without memory, every conversation with Claude starts from zero. With this folder, the conversation is disposable and the folder becomes the memory: what matters is written in a file, and Claude rereads the files before answering.',
  } as L,
  partsTitle: { fr: 'Ce que contient le dossier', en: 'What the folder contains' } as L,
  parts: [
    {
      name: 'inbox/',
      text: {
        fr: 'La boîte de dépôt. Vous y glissez la matière brute : transcription de réunion, notes, mail copié.',
        en: 'The drop box. You slide raw material into it: a meeting transcript, notes, a copied email.',
      },
    },
    {
      name: 'CLAUDE.md',
      text: {
        fr: 'Les règles d’ingestion. Claude Code lit ce fichier au début de chaque session : il dit qui vous êtes et comment traiter une information nouvelle.',
        en: 'The ingestion rules. Claude Code reads this file at the start of every session: it says who you are and how to handle new information.',
      },
    },
    {
      name: '.claude/agents/',
      text: {
        fr: 'Des agents spécialisés. Un agent est un assistant qui a ses propres consignes et ses propres droits (par exemple lire sans jamais écrire).',
        en: 'Specialised agents. An agent is an assistant with its own instructions and its own permissions (for example, read but never write).',
      },
    },
    {
      name: '.claude/commands/',
      text: {
        fr: 'Des commandes. Une commande est un raccourci que vous tapez dans Claude Code, comme /inbox.',
        en: 'Commands. A command is a shortcut you type in Claude Code, such as /inbox.',
      },
    },
    {
      name: '05_scope/views/',
      text: {
        fr: 'Des vues générées. Ce sont des tableaux produits par un petit script à partir des fiches de sujets : on ne les modifie jamais à la main.',
        en: 'Generated views. These are tables produced by a small script from the topic sheets: you never edit them by hand.',
      },
    },
  ] as { name: string; text: L }[],
  benefitsTitle: { fr: 'Trois bénéfices concrets', en: 'Three concrete benefits' } as L,
  benefits: [
    {
      title: { fr: 'Aucune décision ne se perd', en: 'No decision gets lost' },
      text: {
        fr: 'Chaque décision est enregistrée avec sa raison et sa source. Dans trois mois, vous retrouvez pourquoi un choix a été fait, sans rouvrir la discussion.',
        en: 'Every decision is recorded with its reason and its source. Three months later, you can find out why a choice was made without reopening the discussion.',
      },
    },
    {
      title: { fr: 'Vous savez quoi faire ensuite', en: 'You know what to do next' },
      text: {
        fr: 'Chaque sujet a un porteur et une prochaine action. Le board de tâches et les vues se mettent à jour à partir de vos notes, sans recopie.',
        en: 'Every topic has an owner and a next action. The task board and the views update from your notes, with no copying.',
      },
    },
    {
      title: { fr: 'Changer de sujet coûte moins', en: 'Switching topics costs less' },
      text: {
        fr: 'Une fiche par sujet, un fait dans un seul fichier. On rouvre un chantier en quelques minutes, et un rendez-vous se prépare à partir de ce qui s’est dit la dernière fois.',
        en: 'One sheet per topic, one fact in one file. You reopen a project in a few minutes, and a meeting is prepared from what was said last time.',
      },
    },
  ] as { title: L; text: L }[],
}

// ---------------------------------------------------------------------------
// 3. What you need
// ---------------------------------------------------------------------------

export const OS_NEEDS = {
  title: { fr: 'Ce dont on a besoin', en: 'What you need' } as L,
  items: [
    {
      title: { fr: 'Claude Code installé', en: 'Claude Code installed' },
      text: {
        fr: 'La commande claude répond dans un terminal. Si ce n’est pas encore fait, le guide Claude Code explique l’installation.',
        en: 'The claude command answers in a terminal. If that is not done yet, the Claude Code guide covers the installation.',
      },
    },
    {
      title: { fr: 'Un dossier vide', en: 'An empty folder' },
      text: {
        fr: 'Par exemple ~/brain. C’est le seul endroit où Claude écrit pour ce projet.',
        en: 'For example ~/brain. It is the only place where Claude writes for this project.',
      },
    },
    {
      title: { fr: 'Environ 30 minutes', en: 'About 30 minutes' },
      text: {
        fr: 'Pour l’entretien de départ, la structure et un premier essai avec une vraie note.',
        en: 'For the starting interview, the structure and a first try with a real note.',
      },
    },
  ] as { title: L; text: L }[],
  optional: {
    fr: 'Facultatif : Python 3 pour générer les vues, et Git pour pouvoir revenir en arrière.',
    en: 'Optional: Python 3 to generate the views, and Git to be able to go back.',
  } as L,
}

// ---------------------------------------------------------------------------
// 4. Install the skill
// ---------------------------------------------------------------------------

export const OS_INSTALL = {
  title: { fr: 'Installer la skill', en: 'Install the skill' } as L,
  intro: {
    fr: 'La skill personal-os mène la mise en place pas à pas. Une skill est un dossier d’instructions que Claude lit quand la tâche s’y prête : ici, elle pose les questions, propose les dossiers et écrit les fichiers après votre accord.',
    en: 'The personal-os skill leads the setup step by step. A skill is a folder of instructions that Claude reads when the task fits: here, it asks the questions, proposes the folders and writes the files once you agree.',
  } as L,
  download: { fr: 'Télécharger personal-os.zip', en: 'Download personal-os.zip' } as L,
  downloadHint: {
    fr: 'Le fichier vient de la dernière version publiée sur GitHub.',
    en: 'The file comes from the latest release published on GitHub.',
  } as L,
  targets: [
    {
      id: 'claude-code',
      title: { fr: 'Pour Claude Code', en: 'For Claude Code' },
      text: { fr: 'Dans un terminal :', en: 'In a terminal:' },
      command:
        'curl -L -o personal-os.zip \\\n  https://github.com/marcus-clay/design-skills/releases/latest/download/personal-os.zip\nunzip -o personal-os.zip -d ~/.claude/skills',
    },
    {
      id: 'codex',
      title: { fr: 'Pour Codex', en: 'For Codex' },
      text: { fr: 'Même téléchargement, autre dossier :', en: 'Same download, another folder:' },
      command:
        'curl -L -o personal-os.zip \\\n  https://github.com/marcus-clay/design-skills/releases/latest/download/personal-os.zip\nunzip -o personal-os.zip -d ~/.agents/skills',
    },
    {
      id: 'claude-ai',
      title: { fr: 'Pour Claude.ai', en: 'For Claude.ai' },
      text: {
        fr: 'Téléchargez le zip, puis ouvrez Réglages, Capacités, Skills et téléversez le fichier.',
        en: 'Download the zip, then open Settings, Capabilities, Skills and upload the file.',
      },
      command: '',
    },
  ] as { id: string; title: L; text: L; command: string }[],
  startTitle: { fr: 'Puis lancez la mise en place', en: 'Then start the setup' } as L,
  startText: {
    fr: 'Ouvrez un terminal dans votre dossier vide, lancez claude, puis écrivez :',
    en: 'Open a terminal in your empty folder, run claude, then write:',
  } as L,
  startPrompt: {
    fr: 'Crée mon OS personnel avec la skill personal-os.',
    en: 'Create my personal OS with the personal-os skill.',
  } as L,
  catalogue: {
    fr: 'Vous pouvez aussi voir la skill dans le catalogue',
    en: 'You can also see the skill in the catalogue',
  } as L,
  manual: {
    title: { fr: 'Si vous préférez ne rien installer', en: 'If you would rather install nothing' } as L,
    text: {
      fr: 'La skill ne fait rien de magique : elle écrit des fichiers texte. Ce guide donne la structure et les extraits de chaque fichier, vous pouvez donc tout créer à la main. Créez d’abord les dossiers, puis collez le CLAUDE.md de l’étape 3 et copiez les extraits des étapes suivantes.',
      en: 'The skill does nothing magical: it writes text files. This guide gives the structure and the excerpts of each file, so you can create everything by hand. Create the folders first, then paste the CLAUDE.md of step 3 and copy the excerpts of the following steps.',
    } as L,
    command:
      'mkdir -p brain/{inbox,archive,00_journal/activity,01_steering,02_product,03_team,04_decisions}\nmkdir -p brain/05_scope/{sheets,views} brain/{06_resources,_to-decide,scripts}\nmkdir -p brain/.claude/{agents,commands}\ntouch brain/CLAUDE.md brain/CHANGELOG.md',
  },
}

// ---------------------------------------------------------------------------
// 5. Build it step by step
// ---------------------------------------------------------------------------

export interface Snippet {
  file: string
  caption?: L
  code: L
}

export interface BuildStep {
  id: string
  title: L
  intro: L
  /** What you tell Claude (copyable) */
  prompt: L
  /** What you get */
  result: LL
  snippets: Snippet[]
}

const TREE: L = {
  fr: `brain/
  CLAUDE.md                  règles lues par Claude Code à chaque session
  README.md                  index pour les humains
  CHANGELOG.md               ce qu'il faut reporter dans les outils externes
  inbox/                     matières brutes à traiter
  archive/                   originaux traités (jamais modifiés)
  00_journal/
    journal.md               journal daté (ajout seulement)
    timeline.md              faits datés (ajout seulement)
    activity/                vues générées jour par jour
  01_steering/
    board.md                 tâches par horizon
  02_product/                un fichier par produit ou par thème
  03_team/
    directory.md             annuaire des personnes
  04_decisions/
    decision-register.md     décisions et raisons (ajout seulement)
  05_scope/
    sheets/                  une fiche par sujet
    views/                   tableaux générés (ne pas éditer)
  06_resources/
    glossary.md              lexique et noms à reconfirmer
  _to-decide/                ce qui attend une réponse
  scripts/
    build_views.py
  .claude/
    agents/                  un fichier par agent
    commands/                un fichier par commande`,
  en: `brain/
  CLAUDE.md                  rules read by Claude Code at every session
  README.md                  index for humans
  CHANGELOG.md               what to carry over to external tools
  inbox/                     raw material to process
  archive/                   processed originals (never edited)
  00_journal/
    journal.md               dated journal (append only)
    timeline.md              dated facts (append only)
    activity/                generated day-by-day views
  01_steering/
    board.md                 tasks by horizon
  02_product/                one file per product or theme
  03_team/
    directory.md             directory of people
  04_decisions/
    decision-register.md     decisions and reasons (append only)
  05_scope/
    sheets/                  one sheet per topic
    views/                   generated tables (do not edit)
  06_resources/
    glossary.md              glossary and names to reconfirm
  _to-decide/                what is waiting for an answer
  scripts/
    build_views.py
  .claude/
    agents/                  one file per agent
    commands/                one file per command`,
}

export const OS_STEPS_INTRO: L = {
  fr: 'Sept étapes, dans cet ordre la première fois. Pour chacune, vous voyez ce qu’on dit à Claude, ce qu’on obtient, et un extrait d’un fichier du brain d’exemple chez Acme Corp (une entreprise fictive). La skill écrit les fichiers dans la langue choisie à la question 6 : les extraits sont ici dans la langue de la page, les noms de dossiers restent identiques.',
  en: 'Seven steps, in this order the first time. For each one you see what you tell Claude, what you get, and an excerpt from a file of the example brain at Acme Corp (a fictional company). The skill writes the files in the language you pick at question 6: the excerpts are shown here in the language of the page, and the folder names stay the same.',
}

export const OS_STEPS: BuildStep[] = [
  {
    id: 'interview',
    title: { fr: 'L’entretien de départ', en: 'The starting interview' },
    intro: {
      fr: 'Claude pose sept questions, une par une, en attendant votre réponse à chacune. Des réponses courtes suffisent. À la fin, il résume ce qu’il a compris en dix lignes et attend votre accord.',
      en: 'Claude asks seven questions, one at a time, waiting for your answer to each. Short answers are enough. At the end it sums up what it understood in ten lines and waits for your approval.',
    },
    prompt: {
      fr: 'Crée mon OS personnel avec la skill personal-os. Commence par l’entretien de départ.',
      en: 'Create my personal OS with the personal-os skill. Start with the starting interview.',
    },
    result: {
      fr: [
        '1. Votre rôle et votre équipe, en une phrase : la section « Qui je suis » du CLAUDE.md.',
        '2. Vos trois à cinq chantiers en cours : une fiche de sujet par chantier.',
        '3. Les personnes avec qui vous travaillez le plus : l’annuaire.',
        '4. Les matières que vous recevez (transcriptions, mails, notes) : le tri de l’inbox.',
        '5. Où reporter ce que vous produisez (wiki, outil de tickets) : le CHANGELOG.md.',
        '6. Votre langue et vos règles d’écriture : la section « Style ».',
        '7. Le rythme de vos revues : les commandes et agents à installer en premier.',
      ],
      en: [
        '1. Your role and your team, in one sentence: the "Who I am" section of CLAUDE.md.',
        '2. Your three to five current projects: one topic sheet per project.',
        '3. The people you work with most: the directory.',
        '4. The material you receive (transcripts, emails, notes): the inbox sorting.',
        '5. Where to carry over what you produce (wiki, ticket tool): CHANGELOG.md.',
        '6. Your language and writing rules: the "Style" section.',
        '7. The rhythm of your reviews: which commands and agents to install first.',
      ],
    },
    snippets: [],
  },
  {
    id: 'structure',
    title: { fr: 'La structure', en: 'The structure' },
    intro: {
      fr: 'Claude propose l’arborescence, puis la crée une fois que vous avez dit oui. Un principe guide tout : un fichier, un sujet, un nom neutre. Aucun fichier ne porte le nom d’une personne, ce qui la concerne va dans l’annuaire.',
      en: 'Claude proposes the folder tree, then creates it once you say yes. One principle guides everything: one file, one topic, a neutral name. No file carries a person’s name; what concerns a person goes in the directory.',
    },
    prompt: {
      fr: 'Propose-moi l’arborescence du dossier à partir de mes réponses. Crée-la seulement quand j’aurai dit oui.',
      en: 'Propose the folder tree from my answers. Create it only once I have said yes.',
    },
    result: {
      fr: [
        'Les dossiers de base, avec le rôle de chacun : inbox/ et archive/ pour la matière brute et son rangement, 00_journal/ pour les historiques, 01_steering/ pour le board, 04_decisions/ pour le registre, 05_scope/ pour les fiches et les vues.',
        'Les modèles de journal, de registre, de board et de fiche, remplis avec vos réponses.',
      ],
      en: [
        'The base folders, with the role of each: inbox/ and archive/ for raw material and where it goes once processed, 00_journal/ for the histories, 01_steering/ for the board, 04_decisions/ for the register, 05_scope/ for the sheets and views.',
        'The journal, register, board and sheet templates, filled in with your answers.',
      ],
    },
    snippets: [{ file: 'brain/', code: TREE }],
  },
  {
    id: 'claude-md',
    title: { fr: 'Le fichier CLAUDE.md', en: 'The CLAUDE.md file' },
    intro: {
      fr: 'CLAUDE.md est lu automatiquement par Claude Code à chaque session. Il contient les règles du jeu : qui vous êtes, ce que Claude fait quand une information arrive, les règles de sûreté et le style d’écriture. Gardez-le court (une à deux pages) : le détail vit dans d’autres fichiers que Claude lit au besoin.',
      en: 'CLAUDE.md is read automatically by Claude Code at every session. It holds the rules of the game: who you are, what Claude does when information arrives, the safety rules and the writing style. Keep it short (one to two pages): the detail lives in other files that Claude reads when needed.',
    },
    prompt: {
      fr: 'Écris le CLAUDE.md à partir de mes réponses, en une à deux pages. Il doit contenir le protocole d’ingestion, la règle de fraîcheur, les fichiers en ajout seulement et les règles de sûreté.',
      en: 'Write the CLAUDE.md from my answers, in one to two pages. It must contain the ingestion protocol, the freshness rule, the append-only files and the safety rules.',
    },
    result: {
      fr: [
        'Un CLAUDE.md qui dit qui vous êtes, comment traiter une information nouvelle, et ce que Claude ne fait jamais sans votre accord.',
        'La liste des noms souvent déformés par les outils de transcription, à compléter au fil du temps.',
      ],
      en: [
        'A CLAUDE.md that says who you are, how to handle new information, and what Claude never does without your approval.',
        'The list of names that transcription tools often garble, to complete over time.',
      ],
    },
    snippets: [
      {
        file: 'CLAUDE.md',
        caption: { fr: 'Extrait du brain d’Acme Corp (fictif)', en: 'Excerpt from the Acme Corp brain (fictional)' },
        code: {
          fr: `## Qui je suis

Sam dirige une équipe de quelques designers sur deux produits : Acme Portal (espace client)
et Acme Insights (tableaux de bord). Sam travaille avec Dana (VP Produit), Riley (directeur
technique) et Morgan (designer produit).

## Quand une information nouvelle arrive

1. Ajouter une entrée datée dans 00_journal/journal.md. Domaine entre crochets, → action,
   ? question, ! point de vigilance, rien devant un fait brut.
2. Extraire les actions et les proposer pour 01_steering/board.md, avec leur porteur.
   Ne jamais fixer d'échéance sauf si Dana, Riley ou un document officiel l'a donnée.
3. Router les décisions vers 04_decisions/decision-register.md (contexte, décision, raison,
   conséquences ; « raison non documentée » si absente).
4. Ne jamais répéter un fait déjà écrit ailleurs : renvoyer vers le fichier.

## Sûreté

- Proposer d'abord, écrire après validation explicite.
- Ne jamais inventer une décision, une action ou une échéance.
- Ne rien supprimer ni déplacer sans accord, hors du flux inbox vers archive.`,
          en: `## Who I am

Sam leads a small team of designers on two products: Acme Portal (customer area)
and Acme Insights (dashboards). Sam works with Dana (VP Product), Riley (CTO)
and Morgan (product designer).

## When new information arrives

1. Add a dated entry to 00_journal/journal.md. Domain in brackets, → action,
   ? question, ! watch point, nothing in front of a plain fact.
2. Extract the actions and propose them for 01_steering/board.md, with their owner.
   Never set a deadline unless Dana, Riley or an official document gave it.
3. Route decisions to 04_decisions/decision-register.md (context, decision, reason,
   consequences; "reason not documented" if missing).
4. Never repeat a fact already written elsewhere: point to the file.

## Safety

- Propose first, write after explicit approval.
- Never invent a decision, an action or a deadline.
- Never delete or move anything without approval, apart from the inbox to archive flow.`,
        },
      },
    ],
  },
  {
    id: 'agents',
    title: { fr: 'Les agents et les commandes', en: 'Agents and commands' },
    intro: {
      fr: 'Un agent et une commande sont de simples fichiers Markdown dans le dossier .claude/. Commencez petit : l’agent inbox-ingestion avec la commande /inbox pour traiter ce que vous déposez, puis la commande /journal pour consigner une note rapide. Le reste vient quand le besoin se présente.',
      en: 'An agent and a command are plain Markdown files in the .claude/ folder. Start small: the inbox-ingestion agent with the /inbox command to process what you drop, then the /journal command to log a quick note. The rest comes when the need appears.',
    },
    prompt: {
      fr: 'Installe l’agent inbox-ingestion et la commande /inbox, puis la commande /journal. Vérifie qu’ils apparaissent dans /agents.',
      en: 'Install the inbox-ingestion agent and the /inbox command, then the /journal command. Check that they show up in /agents.',
    },
    result: {
      fr: [
        'Les fichiers .claude/agents/inbox-ingestion.md et .claude/commands/inbox.md, puis .claude/commands/journal.md.',
        'Cinq autres agents disponibles quand vous en avez besoin : board-review (revue du board), consistency-check (cohérence, lecture seule), deliverables-writer (rédaction), meeting-prep (préparation de rendez-vous, lecture seule), decision-advisor (éprouver une décision, lecture seule).',
        'Les commandes /review-board, /prep-1to1 et /propagate pour plus tard.',
      ],
      en: [
        'The files .claude/agents/inbox-ingestion.md and .claude/commands/inbox.md, then .claude/commands/journal.md.',
        'Five more agents available when you need them: board-review (board review), consistency-check (consistency, read only), deliverables-writer (writing), meeting-prep (meeting preparation, read only), decision-advisor (stress-testing a decision, read only).',
        'The /review-board, /prep-1to1 and /propagate commands for later.',
      ],
    },
    snippets: [
      {
        file: '.claude/agents/inbox-ingestion.md',
        caption: { fr: 'Extrait', en: 'Excerpt' },
        code: {
          fr: `---
name: inbox-ingestion
description: "Traite un fichier déposé dans inbox/ (compte rendu, note, transcription).
  Sépare décisions, actions, faits et questions ouvertes. Propose tout, n'écrit
  qu'après validation explicite."
tools: Read, Grep, Glob, Edit, Write
---

# Ingestion d'un fichier d'inbox

Lis d'abord CLAUDE.md, 03_team/directory.md et 06_resources/glossary.md.

## Limites

- Aucune décision, action ou échéance inventée. Une idée évoquée est une question ouverte.
- Aucune suppression. Aucun nom corrigé de mémoire.
- Un fait vit dans un seul fichier : le journal renvoie, il ne recopie pas.`,
          en: `---
name: inbox-ingestion
description: "Processes a file dropped in inbox/ (minutes, note, transcript).
  Separates decisions, actions, facts and open questions. Proposes everything,
  writes only after explicit approval."
tools: Read, Grep, Glob, Edit, Write
---

# Processing an inbox file

Read CLAUDE.md, 03_team/directory.md and 06_resources/glossary.md first.

## Limits

- No decision, action or deadline invented. An idea mentioned is an open question.
- No deletion. No name corrected from memory.
- A fact lives in one file only: the journal points to it, it does not copy it.`,
        },
      },
      {
        file: '.claude/commands/inbox.md',
        caption: { fr: 'Extrait', en: 'Excerpt' },
        code: {
          fr: `---
description: Traiter les fichiers déposés dans inbox/
argument-hint: [nom d'un fichier de inbox/, facultatif]
---
Traite ce qui est déposé dans inbox/. Utilise l'agent inbox-ingestion.

1. Liste inbox/. S'il n'y a rien, dis-le et arrête-toi.
2. Lis chaque fichier en entier. Donne un verdict par fichier.
3. Présente la liste numérotée de modifications (fichier, avant, après, source, statut).
4. N'écris rien tant que je n'ai pas écrit « valide tout » ou une liste de numéros.
5. Après validation : écris, ajoute l'entrée de CHANGELOG.md, déplace l'original vers archive/.`,
          en: `---
description: Process the files dropped in inbox/
argument-hint: [name of a file in inbox/, optional]
---
Process what is dropped in inbox/. Use the inbox-ingestion agent.

1. List inbox/. If it is empty, say so and stop.
2. Read each file in full. Give one verdict per file.
3. Present the numbered list of changes (file, before, after, source, status).
4. Write nothing until I have written "approve all" or a list of numbers.
5. After approval: write, add the CHANGELOG.md entry, move the original to archive/.`,
        },
      },
    ],
  },
  {
    id: 'first-try',
    title: { fr: 'Le premier essai avec l’inbox', en: 'The first try with the inbox' },
    intro: {
      fr: 'Écrivez ou collez une vraie note, même courte, dans inbox/ (par exemple inbox/2026-01-15_point-equipe.txt), puis tapez /inbox. Claude lit le fichier en entier, repère les passages douteux, croise avec l’existant et rend une liste numérotée de modifications proposées. Rien n’est écrit tant que vous n’avez pas répondu.',
      en: 'Write or paste a real note, even a short one, into inbox/ (for example inbox/2026-01-15_team-sync.txt), then type /inbox. Claude reads the file in full, spots doubtful passages, checks it against what exists and returns a numbered list of proposed changes. Nothing is written until you answer.',
    },
    prompt: { fr: '/inbox', en: '/inbox' },
    result: {
      fr: [
        'Une proposition numérotée : pour chaque ligne, le fichier, l’avant, l’après, la source et le statut.',
        'Une liste « possibles, non retenues » pour les actions que Claude déduit lui-même, et les points à reconfirmer.',
        'Vous répondez « valide 1, 2, 4 » ou « valide tout ». Claude écrit, déplace l’original dans archive/, ajoute une ligne au CHANGELOG.md et relance le script de vues.',
      ],
      en: [
        'A numbered proposal: for each line, the file, the before, the after, the source and the status.',
        'A "possible, not retained" list for the actions Claude deduces on its own, and the points to reconfirm.',
        'You answer "approve 1, 2, 4" or "approve all". Claude writes, moves the original to archive/, adds a line to CHANGELOG.md and reruns the views script.',
      ],
    },
    snippets: [
      {
        file: 'proposition de Claude',
        caption: { fr: 'Extrait de la proposition (fictive)', en: 'Excerpt of the proposal (fictional)' },
        code: {
          fr: `1. 00_journal/journal.md, ajout de l'entrée du 12 mars 2026 [PROD]
2. 04_decisions/decision-register.md, ajout de D-003
   Décision : la checklist d'accueil v1 ne s'affiche que pour les nouveaux comptes
   Raison : limiter la charge technique avant l'été (dite par Riley)
3. 02_product/products.md, correction en place
   Avant : API de filtres enregistrés prévue en juin 2026
   Après : prévue en avril 2026 (ancienne valeur : juin 2026, avant le 12 mars)
4. 01_steering/board.md, 3 actions avec leur porteur
   Possibles, non retenues : mesurer le taux d'activation (déduit, non dit)
À reconfirmer : « Dina » (Dana ?), « décaler les filtres » (idée ou décision ?)`,
          en: `1. 00_journal/journal.md, add the entry of 12 March 2026 [PROD]
2. 04_decisions/decision-register.md, add D-003
   Decision: onboarding checklist v1 only shows for new accounts
   Reason: limit the technical load before summer (said by Riley)
3. 02_product/products.md, fix in place
   Before: saved-filters API planned for June 2026
   After: planned for April 2026 (previous value: June 2026, before 12 March)
4. 01_steering/board.md, 3 actions with their owner
   Possible, not retained: measure the activation rate (deduced, not said)
To reconfirm: "Dina" (Dana?), "postpone the filters" (idea or decision?)`,
        },
      },
    ],
  },
  {
    id: 'routines',
    title: { fr: 'Les routines', en: 'The routines' },
    intro: {
      fr: 'Une mémoire ne sert que si on l’alimente à intervalles réguliers. Quatre rythmes suffisent pour commencer. Demandez à Claude de les écrire dans le README.md du dossier, là où vous les verrez.',
      en: 'A memory is only useful if you feed it at regular intervals. Four rhythms are enough to start. Ask Claude to write them in the README.md of the folder, where you will see them.',
    },
    prompt: {
      fr: 'Écris dans le README.md mes quatre routines (quotidienne, après une réunion, hebdomadaire, avant un 1:1) avec la commande de chacune.',
      en: 'Write my four routines (daily, after a meeting, weekly, before a 1:1) in README.md, with the command for each.',
    },
    result: {
      fr: ['Une section « Routines » dans le README.md, que le chapitre « Au quotidien » détaille ci-dessous.'],
      en: ['A "Routines" section in README.md, which the "Day to day" chapter below details.'],
    },
    snippets: [
      {
        file: 'README.md',
        caption: { fr: 'Extrait du brain d’Acme Corp (fictif)', en: 'Excerpt from the Acme Corp brain (fictional)' },
        code: {
          fr: `## Routines

- Chaque jour : déposer dans inbox/, taper /inbox, valider.
- Chaque semaine : /review-board, puis l'agent consistency-check.
- Avant un 1:1 : /prep-1to1 Dana (ou Riley, Morgan).

Les volumes ne sont pas écrits ici : scripts/build_views.py les calcule.`,
          en: `## Routines

- Every day: drop into inbox/, type /inbox, approve.
- Every week: /review-board, then the consistency-check agent.
- Before a 1:1: /prep-1to1 Dana (or Riley, Morgan).

Totals are not written here: scripts/build_views.py computes them.`,
        },
      },
    ],
  },
  {
    id: 'evolve',
    title: { fr: 'Faire évoluer son OS', en: 'Making it evolve' },
    intro: {
      fr: 'Un nouveau sujet se crée avec une fiche dans 05_scope/sheets/. Le script build_views.py la lit et régénère les tableaux : les fiches sont la source, les vues sont des dérivés. Avant d’ajouter quoi que ce soit (fiche, agent, vue), posez-vous quatre questions : cela m’évite-t-il de perdre une décision et sa raison ? me dit-il la prochaine action et son porteur ? réduit-il l’effort pour passer d’un sujet à un autre ? laisse-t-il une trace utile à mon équipe ? Si la réponse est non partout, ne l’ajoutez pas.',
      en: 'A new topic is created with a sheet in 05_scope/sheets/. The build_views.py script reads it and regenerates the tables: the sheets are the source, the views are derived. Before adding anything (a sheet, an agent, a view), ask yourself four questions: does it keep me from losing a decision and its reason? does it tell me the next action and its owner? does it reduce the effort of switching topics? does it leave a useful trace for my team? If the answer is no everywhere, do not add it.',
    },
    prompt: {
      fr: 'Ajoute un sujet « Filtres enregistrés » : crée sa fiche dans 05_scope/sheets/ à partir du modèle, puis relance le script de vues.',
      en: 'Add a topic "Saved filters": create its sheet in 05_scope/sheets/ from the template, then rerun the views script.',
    },
    result: {
      fr: ['Une fiche avec son en-tête (identifiant, statut, porteur, prochaine action, horizon, source).', 'Les vues par statut et par porteur régénérées. Vous ne les modifiez jamais à la main.'],
      en: ['A sheet with its header (id, status, owner, next action, horizon, source).', 'The views by status and by owner regenerated. You never edit them by hand.'],
    },
    snippets: [
      {
        file: '05_scope/sheets/insights-filters.md',
        caption: { fr: 'En-tête d’une fiche (fictive)', en: 'Header of a sheet (fictional)' },
        code: {
          fr: `---
id: INS-FLT
title: Filtres enregistrés d'Acme Insights
status: en attente
owner: Riley
next_action: Confirmer par écrit la date de l'API
horizon: Cette semaine
source: archive/2026-03-12_sync-portal.txt
---`,
          en: `---
id: INS-FLT
title: Saved filters in Acme Insights
status: waiting
owner: Riley
next_action: Confirm the API date in writing
horizon: This week
source: archive/2026-03-12_sync-portal.txt
---`,
        },
      },
      {
        file: '05_scope/views/by-status.md',
        caption: { fr: 'Vue générée par le script', en: 'View generated by the script' },
        code: {
          fr: `## en attente (1)

| ID | Sujet | Porteur | Prochaine action | Horizon |
|---|---|---|---|---|
| INS-FLT | Filtres enregistrés d'Acme Insights | Riley | Confirmer par écrit la date de l'API | Cette semaine |`,
          en: `## waiting (1)

| ID | Topic | Owner | Next action | Horizon |
|---|---|---|---|---|
| INS-FLT | Saved filters in Acme Insights | Riley | Confirm the API date in writing | This week |`,
        },
      },
    ],
  },
]

// ---------------------------------------------------------------------------
// 6. Day to day
// ---------------------------------------------------------------------------

export const OS_DAILY = {
  title: { fr: 'Utiliser au quotidien', en: 'Using it day to day' } as L,
  intro: {
    fr: 'Quatre routines couvrent l’essentiel. Aucune ne demande plus de quelques minutes : l’effort est de déposer la matière, le reste est la proposition de Claude et votre validation.',
    en: 'Four routines cover the essentials. None takes more than a few minutes: your effort is dropping the material, the rest is Claude’s proposal and your approval.',
  } as L,
  routines: [
    {
      title: { fr: 'Chaque jour', en: 'Every day' },
      time: { fr: '5 minutes', en: '5 minutes' },
      commands: ['/inbox', '/journal'],
      text: {
        fr: 'Déposez ce qui est arrivé dans inbox/, tapez /inbox et validez. En fin de journée, /journal pour une note libre.',
        en: 'Drop what arrived into inbox/, type /inbox and approve. At the end of the day, /journal for a free note.',
      },
    },
    {
      title: { fr: 'Après une réunion', en: 'After a meeting' },
      time: { fr: 'Dans la foulée', en: 'Right away' },
      commands: ['/inbox'],
      text: {
        fr: 'Déposez la transcription ou vos notes, tapez /inbox. Vérifiez en priorité les décisions et leur raison, puis les actions et leur porteur.',
        en: 'Drop the transcript or your notes, type /inbox. Check the decisions and their reason first, then the actions and their owner.',
      },
    },
    {
      title: { fr: 'Chaque semaine', en: 'Every week' },
      time: { fr: '15 minutes', en: '15 minutes' },
      commands: ['/review-board', 'consistency-check'],
      text: {
        fr: 'Tapez /review-board, puis demandez à l’agent consistency-check de contrôler les dates, les statuts et les noms. Relancez le script de vues.',
        en: 'Type /review-board, then ask the consistency-check agent to check dates, statuses and names. Rerun the views script.',
      },
    },
    {
      title: { fr: 'Avant un 1:1', en: 'Before a 1:1' },
      time: { fr: '5 minutes', en: '5 minutes' },
      commands: ['/prep-1to1 Dana'],
      text: {
        fr: 'L’agent meeting-prep rassemble ce qui a été dit, ce qui est en attente et les questions ouvertes, avec la source de chaque ligne.',
        en: 'The meeting-prep agent gathers what was said, what is pending and the open questions, with the source of each line.',
      },
    },
  ] as { title: L; time: L; commands: string[]; text: L }[],
}

// ---------------------------------------------------------------------------
// 7. Use cases
// ---------------------------------------------------------------------------

export interface UseCase {
  title: L
  situation: L
  ask: L
  does: L
}

export const OS_USECASES = {
  title: { fr: 'Les cas d’usage', en: 'Use cases' } as L,
  intro: {
    fr: 'Sept situations, avec les personnes et produits d’Acme Corp (fictifs). Pour chacune : la situation, ce qu’on demande, ce que Claude fait.',
    en: 'Seven situations, with the people and products of Acme Corp (fictional). For each: the situation, what you ask, what Claude does.',
  } as L,
  labels: {
    situation: { fr: 'La situation', en: 'The situation' } as L,
    ask: { fr: 'Ce qu’on demande', en: 'What you ask' } as L,
    does: { fr: 'Ce que Claude fait', en: 'What Claude does' } as L,
  },
  items: [
    {
      title: { fr: 'Le product design au quotidien', en: 'Everyday product design' },
      situation: {
        fr: 'Morgan, designer produit, enchaîne trois réunions dans la journée. Le soir, ses notes sont dispersées et elle ne sait plus quelle décision a été prise sur quel écran.',
        en: 'Morgan, a product designer, goes through three meetings in a day. By evening her notes are scattered and she no longer knows which decision was made on which screen.',
      },
      ask: {
        fr: 'Elle dépose ses trois fichiers de notes dans inbox/ et tape /inbox.',
        en: 'She drops her three note files into inbox/ and types /inbox.',
      },
      does: {
        fr: 'Il traite les fichiers un par un, sépare décisions, actions, faits et questions ouvertes, signale un nom douteux, puis écrit et archive après validation. Le lendemain, /review-board lui donne ses cinq actions de la semaine avec leurs sources.',
        en: 'Claude processes the files one by one, separates decisions, actions, facts and open questions, flags a doubtful name, then writes and archives after approval. The next day, /review-board gives her five actions for the week with their sources.',
      },
    },
    {
      title: { fr: 'Le head of design qui définit la stratégie et pilote l’activité', en: 'The head of design who sets strategy and steers the activity' },
      situation: {
        fr: 'Sam doit présenter à Dana la répartition de l’équipe entre trois sujets, et savoir où l’activité est bloquée.',
        en: 'Sam has to present to Dana how the team is split across three topics, and find out where the activity is blocked.',
      },
      ask: {
        fr: '« Lance le script de vues, puis donne-moi les sujets en attente et ce qui bloque, par porteur. Ensuite, demande à l’agent decision-advisor d’éprouver l’idée de mettre une personne de plus sur les filtres d’Insights. »',
        en: '"Run the views script, then give me the waiting topics and what blocks them, by owner. Then ask the decision-advisor agent to stress-test the idea of adding one more person on the Insights filters."',
      },
      does: {
        fr: 'Il lit les vues par statut et par porteur, puis liste les sujets en attente avec leur prochaine action. L’agent relit le registre et rend ses hypothèses non vérifiées, deux alternatives et trois questions à poser à Dana.',
        en: 'Claude reads the views by status and by owner, then lists the waiting topics with their next action. The agent rereads the register and returns its unverified assumptions, two alternatives and three questions to ask Dana.',
      },
    },
    {
      title: { fr: 'Concevoir un parcours', en: 'Designing a user journey' },
      situation: {
        fr: 'Morgan doit concevoir le parcours d’arrivée dans Acme Portal pour les nouveaux comptes.',
        en: 'Morgan has to design the arrival journey in Acme Portal for new accounts.',
      },
      ask: {
        fr: '« Rassemble tout ce que le brain dit sur l’accueil des nouveaux comptes : décisions, contraintes techniques, questions ouvertes. Propose ensuite une description du parcours, étape par étape, avec les états et les cas limites. »',
        en: '"Gather everything the brain says about onboarding new accounts: decisions, technical constraints, open questions. Then propose a step-by-step description of the journey, with states and edge cases."',
      },
      does: {
        fr: 'Il lit la fiche du sujet, le registre (D-003 limite la checklist aux nouveaux comptes) et les comptes rendus archivés. Il rend un brouillon avec les étapes, les règles de gestion, les cas limites et une section « À confirmer » pour tout ce qui n’est pas documenté.',
        en: 'Claude reads the topic sheet, the register (D-003 limits the checklist to new accounts) and the archived minutes. It returns a draft with the steps, the business rules, the edge cases and a "To confirm" section for everything undocumented.',
      },
    },
    {
      title: { fr: 'Concevoir avec un MCP (Figma) en s’appuyant sur le brain', en: 'Designing with an MCP (Figma) backed by the brain' },
      situation: {
        fr: 'Un MCP est un connecteur qui donne à Claude Code l’accès à un outil externe, ici un outil de maquettes. Morgan l’a branché pour que Claude puisse lire et créer des écrans.',
        en: 'An MCP is a connector that gives Claude Code access to an external tool, here a mockup tool. Morgan plugged it in so Claude can read and create screens.',
      },
      ask: {
        fr: '« Crée dans le fichier de maquettes les écrans de la checklist d’accueil, à partir de la fiche du sujet et du parcours validé. Ne fais que ce que la fiche justifie. »',
        en: '"Create the onboarding checklist screens in the mockup file, from the topic sheet and the approved journey. Only do what the sheet justifies."',
      },
      does: {
        fr: 'Il relit la fiche et le parcours, liste les écrans à produire et demande votre validation avant de toucher au fichier. Il signale ce qui sort de la fiche, ne supprime rien sans confirmation, et ajoute une ligne au CHANGELOG.md. Les maquettes suivent le texte, pas l’inverse.',
        en: 'Claude rereads the sheet and the journey, lists the screens to produce and asks for your approval before touching the file. It flags what goes beyond the sheet, deletes nothing without confirmation, and adds a line to CHANGELOG.md. The mockups follow the text, not the other way round.',
      },
    },
    {
      title: { fr: 'Déployer des prototypes', en: 'Shipping prototypes' },
      situation: {
        fr: 'Riley, directeur technique, veut tester la checklist avec cinq clients avant l’été. Morgan doit fournir un prototype cliquable.',
        en: 'Riley, the CTO, wants to test the checklist with five customers before summer. Morgan has to provide a clickable prototype.',
      },
      ask: {
        fr: '« À partir du parcours validé du sujet d’accueil, construis un prototype cliquable dans le dossier ~/prototypes/portal-onboarding. N’écris rien dans le brain. »',
        en: '"From the approved onboarding journey, build a clickable prototype in the ~/prototypes/portal-onboarding folder. Write nothing in the brain."',
      },
      does: {
        fr: 'Il annonce ce qu’il va produire (écrans, interactions, ce qui est simulé), construit le prototype dans le dossier désigné et note les écarts avec le parcours. Les retours de test repassent ensuite par /inbox et deviennent des faits, des décisions et des actions sourcés.',
        en: 'Claude announces what it will produce (screens, interactions, what is simulated), builds the prototype in the given folder and notes the gaps with the journey. Test feedback then goes through /inbox and becomes sourced facts, decisions and actions.',
      },
    },
    {
      title: { fr: 'Concevoir des présentations', en: 'Preparing presentations' },
      situation: {
        fr: 'Sam présente l’état du périmètre design au comité produit, devant des personnes qui ne sont pas designers.',
        en: 'Sam presents the state of the design scope to the product committee, in front of people who are not designers.',
      },
      ask: {
        fr: '« Utilise l’agent deliverables-writer pour un plan de présentation de huit diapositives : où nous en sommes, ce qui est décidé, ce qui bloque, ce que nous demandons. Lecteurs : le comité produit, sans vocabulaire de design. »',
        en: '"Use the deliverables-writer agent for an eight-slide presentation plan: where we stand, what is decided, what blocks us, what we ask for. Readers: the product committee, no design vocabulary."',
      },
      does: {
        fr: 'L’agent lit les vues, le registre et le board, puis propose un plan avec un message par diapositive et les sources en note. Il distingue ce qui est décidé de ce qui est envisagé, et ne prend aucun engagement à la place de Sam.',
        en: 'The agent reads the views, the register and the board, then proposes a plan with one message per slide and the sources in a note. It separates what is decided from what is only considered, and commits Sam to nothing.',
      },
    },
    {
      title: { fr: 'Mettre à jour la mémoire de tous les contenus après un changement', en: 'Updating the memory of every content after a change' },
      situation: {
        fr: 'Dana annonce que le lancement d’Acme Insights passe de septembre à octobre. Cette date figure dans la fiche du sujet, le fichier produit, le board, deux pages externes et un support de présentation.',
        en: 'Dana announces that the Acme Insights launch moves from September to October. That date appears in the topic sheet, the product file, the board, two external pages and a presentation.',
      },
      ask: {
        fr: '/propagate Lancement d’Acme Insights décalé de septembre à octobre 2026, annoncé par Dana le 12 mars.',
        en: '/propagate Acme Insights launch moved from September to October 2026, announced by Dana on 12 March.',
      },
      does: {
        fr: 'Il cherche la date dans tout le dossier, choisit un fichier source où corriger la valeur (l’ancienne reste entre parenthèses), propose de renvoyer vers lui dans les autres fichiers, liste dans le CHANGELOG.md les pages externes à mettre à jour, puis fait relire le résultat par consistency-check. Un seul endroit porte la nouvelle date, et rien n’est oublié parce que la liste vient d’une recherche.',
        en: 'Claude searches for the date across the folder, picks one source file where the value is fixed (the old one stays in parentheses), proposes pointing to it in the other files, lists in CHANGELOG.md the external pages to update, then has consistency-check reread the result. One place holds the new date, and nothing is forgotten because the list comes from a search.',
      },
    },
  ] as UseCase[],
}

// ---------------------------------------------------------------------------
// 8. Worked example at Acme Corp
// ---------------------------------------------------------------------------

export interface BeforeAfter {
  id: string
  title: L
  file: string
  text: L
  before: L
  after: L
}

export const OS_EXAMPLE = {
  title: { fr: 'Un exemple pas à pas chez Acme Corp', en: 'A step-by-step example at Acme Corp' } as L,
  intro: {
    fr: 'Acme Corp est une entreprise fictive, tout comme Sam, Dana, Riley et Morgan. Sam, head of design, dépose la transcription d’un point de 25 minutes dans inbox/ et tape /inbox. Voici la note brute, ce que Claude repère avant de proposer, puis ce qui est écrit dans chaque fichier après « valide tout ».',
    en: 'Acme Corp is a fictional company, and so are Sam, Dana, Riley and Morgan. Sam, head of design, drops the transcript of a 25-minute meeting into inbox/ and types /inbox. Here are the raw note, what Claude spots before proposing, then what gets written in each file after "approve all".',
  } as L,
  noteTitle: { fr: 'La note brute', en: 'The raw note' } as L,
  noteFile: 'inbox/2026-03-12_sync-portal.txt',
  note: {
    fr: `Transcription automatique, point hebdomadaire Portal et Insights, jeudi 12 mars 2026.
Présents : Sam, Dana, Riley, Morgan.

[03:30] Riley : Côté technique, la liste en bandeau est faisable avant l'été. Pour les comptes
existants, il faudrait migrer les données de profil, et on n'a pas la capacité avant juillet.
[05:00] Dana : Alors on part là-dessus : la checklist v1 uniquement pour les nouveaux comptes.
Les comptes existants, ce sera la v2.
[06:00] Morgan : Oui, je prépare les trois variantes pour la semaine prochaine.
[09:00] Riley : L'API de filtres enregistrés sera disponible en avril, plus en juin.
[09:45] Dina : Il me faudrait ça par écrit, avec la date, avant vendredi prochain, pour le comité.
[13:15] Dana : Franchement, on pourrait peut-être décaler les filtres à l'été. On verra.`,
    en: `Automatic transcript, weekly Portal and Insights meeting, Thursday 12 March 2026.
Present: Sam, Dana, Riley, Morgan.

[03:30] Riley: On the tech side, the banner list is doable before summer. For existing accounts,
we would have to migrate profile data, and we have no capacity before July.
[05:00] Dana: Then let's go with that: checklist v1 for new accounts only.
Existing accounts will be v2.
[06:00] Morgan: Yes, I'll prepare the three variants for next week.
[09:00] Riley: The saved-filters API will be available in April, not June anymore.
[09:45] Dina: I would need that in writing, with the date, before next Friday, for the committee.
[13:15] Dana: Honestly, we could maybe push the filters to the summer. We'll see.`,
  } as L,
  spottedTitle: { fr: 'Ce que Claude repère avant de proposer', en: 'What Claude spots before proposing' } as L,
  spotted: {
    fr: [
      '« Dina » parle à 09:45, mais l’annuaire ne contient aucune Dina et Dana est présente. Déformation de transcription probable : Claude écrit « Dana (à reconfirmer) » et ne crée aucune personne.',
      '« On pourrait peut-être décaler les filtres à l’été » n’est pas une décision : c’est une question ouverte.',
      '« Avant vendredi prochain », dit un jeudi, peut désigner le 13 ou le 20 mars. Claude retient le 20, le signale et le dit dans le board.',
    ],
    en: [
      '"Dina" speaks at 09:45, but the directory has no Dina and Dana is present. Likely a transcription slip: Claude writes "Dana (to reconfirm)" and creates no person.',
      '"We could maybe push the filters to the summer" is not a decision: it is an open question.',
      '"Before next Friday", said on a Thursday, can mean the 13th or the 20th of March. Claude picks the 20th, flags it and says so in the board.',
    ],
  } as LL,
  resultTitle: { fr: 'Ce qui est écrit, avant et après', en: 'What gets written, before and after' } as L,
  beforeLabel: { fr: 'Avant', en: 'Before' } as L,
  afterLabel: { fr: 'Après', en: 'After' } as L,
  changes: [
    {
      id: 'journal',
      title: { fr: 'Le journal (ajout seulement)', en: 'The journal (append only)' },
      file: '00_journal/journal.md',
      text: {
        fr: 'Une entrée datée est ajoutée à la fin, avec les symboles → (action), ? (question) et ! (point de vigilance). Les faits ne sont pas recopiés : l’entrée renvoie vers les fichiers où ils vivent.',
        en: 'A dated entry is added at the end, with the symbols → (action), ? (question) and ! (watch point). Facts are not copied: the entry points to the files where they live.',
      },
      before: {
        fr: `## 2026-02-10, Rituel de revue de design

[PIL] Sam met en place un rendez-vous fixe pour l'équipe design.

Décision : une revue de design hebdomadaire le mardi (voir D-002, raison non documentée).`,
        en: `## 2026-02-10, Design review ritual

[PIL] Sam sets up a fixed meeting for the design team.

Decision: a weekly design review on Tuesday (see D-002, reason not documented).`,
      },
      after: {
        fr: `(entrée du 10 février inchangée)

## 2026-03-12, Point hebdomadaire Portal et Insights

[PROD] Point de 25 minutes avec Dana, Riley et Morgan.

Décision : périmètre de la première version de la checklist d'accueil (voir D-003).
Nouvelle date pour l'API de filtres enregistrés, voir 02_product/products.md.
→ Morgan : préparer trois variantes de la checklist
→ Riley : confirmer la date de l'API par écrit
? Les filtres peuvent-ils être décalés à l'été ? Évoqué par Dana, non tranché.
! « Dina » est probablement Dana (voir 06_resources/glossary.md).
! « Vendredi prochain » peut désigner le 13 ou le 20 mars.

Source : archive/2026-03-12_sync-portal.txt`,
        en: `(10 February entry unchanged)

## 2026-03-12, Weekly Portal and Insights meeting

[PROD] 25-minute meeting with Dana, Riley and Morgan.

Decision: scope of the first version of the onboarding checklist (see D-003).
New date for the saved-filters API, see 02_product/products.md.
→ Morgan: prepare three variants of the checklist
→ Riley: confirm the API date in writing
? Can the filters be pushed to the summer? Raised by Dana, not settled.
! "Dina" is probably Dana (see 06_resources/glossary.md).
! "Next Friday" can mean 13 or 20 March.

Source: archive/2026-03-12_sync-portal.txt`,
      },
    },
    {
      id: 'register',
      title: { fr: 'Le registre de décisions (ajout seulement)', en: 'The decision register (append only)' },
      file: '04_decisions/decision-register.md',
      text: {
        fr: 'La décision est ajoutée avec ses quatre champs. La raison est le plus important : sans elle, la décision se rediscute dans trois mois.',
        en: 'The decision is added with its four fields. The reason matters most: without it, the decision gets rediscussed in three months.',
      },
      before: {
        fr: `## D-001 : un seul fichier de maquettes par produit
## D-002 : revue de design hebdomadaire le mardi`,
        en: `## D-001: one mockup file per product
## D-002: weekly design review on Tuesday`,
      },
      after: {
        fr: `## D-001 : un seul fichier de maquettes par produit
## D-002 : revue de design hebdomadaire le mardi

## D-003 : checklist d'accueil v1 uniquement pour les nouveaux comptes

- Date : 2026-03-12
- Décidée par : Dana (VP Produit)
- Contexte : le support reçoit de nombreux tickets de personnes perdues à leur première
  connexion à Acme Portal.
- Décision : la première version ne s'affiche que pour les nouveaux comptes.
  Les comptes existants verront la checklist dans une version 2.
- Raison : migrer les données de profil des comptes existants demande une capacité
  technique que l'équipe n'a pas avant juillet (dit par Riley).
- Conséquences : la forme finale reste à trancher après les trois variantes de Morgan.
- Source : archive/2026-03-12_sync-portal.txt, de 03:30 à 05:00`,
        en: `## D-001: one mockup file per product
## D-002: weekly design review on Tuesday

## D-003: onboarding checklist v1 for new accounts only

- Date: 2026-03-12
- Decided by: Dana (VP Product)
- Context: support receives many tickets from people lost at their first login
  to Acme Portal.
- Decision: the first version only shows for new accounts.
  Existing accounts will get the checklist in a version 2.
- Reason: migrating profile data for existing accounts needs technical capacity
  the team does not have before July (said by Riley).
- Consequences: the final form is still to settle after Morgan's three variants.
- Source: archive/2026-03-12_sync-portal.txt, from 03:30 to 05:00`,
      },
    },
    {
      id: 'board',
      title: { fr: 'Le board de tâches', en: 'The task board' },
      file: '01_steering/board.md',
      text: {
        fr: 'Chaque action a un porteur et une source. Une échéance n’est posée que si un tiers l’a donnée, ici Dana. Ce que Claude déduit seul va dans « possibles, non retenues ».',
        en: 'Every action has an owner and a source. A deadline is set only when someone else gave it, here Dana. What Claude deduces on its own goes into "possible, not retained".',
      },
      before: {
        fr: `## Cette semaine

(aucune de ces tâches)`,
        en: `## This week

(none of these tasks)`,
      },
      after: {
        fr: `## Cette semaine

- [?] Confirmer par écrit la date de l'API de filtres enregistrés
  (porteur : Riley ; échéance : vendredi 20 mars, demandée par Dana, à reconfirmer)

## Semaine suivante

- [~] Préparer trois variantes de la checklist d'accueil (porteur : Morgan)

## Possibles, non retenues

- Mesurer le taux d'activation après la v1 (déduit par Claude, non dit)`,
        en: `## This week

- [?] Confirm the saved-filters API date in writing
  (owner: Riley; deadline: Friday 20 March, requested by Dana, to reconfirm)

## Next week

- [~] Prepare three variants of the onboarding checklist (owner: Morgan)

## Possible, not retained

- Measure the activation rate after v1 (deduced by Claude, not said)`,
      },
    },
    {
      id: 'sheet',
      title: { fr: 'La fiche de sujet', en: 'The topic sheet' },
      file: '05_scope/sheets/portal-onboarding.md',
      text: {
        fr: 'L’en-tête de la fiche change en place (statut, porteur, prochaine action), et une ligne est ajoutée à l’historique. Le script régénère ensuite les vues.',
        en: 'The sheet header changes in place (status, owner, next action), and a line is added to the history. The script then regenerates the views.',
      },
      before: {
        fr: `status: ouvert
owner: Sam
next_action: À préciser
horizon: Plus tard`,
        en: `status: open
owner: Sam
next_action: To be defined
horizon: Later`,
      },
      after: {
        fr: `status: engagé
owner: Morgan
next_action: Préparer trois variantes de la checklist (bandeau, fenêtre guidée, page dédiée)
horizon: Semaine suivante

## Historique des mises à jour
- 2026-03-12 : périmètre v1 décidé, porteur Morgan (source : archive/2026-03-12_sync-portal.txt)`,
        en: `status: committed
owner: Morgan
next_action: Prepare three variants of the checklist (banner, guided window, dedicated page)
horizon: Next week

## Update history
- 2026-03-12: v1 scope decided, owner Morgan (source: archive/2026-03-12_sync-portal.txt)`,
      },
    },
    {
      id: 'fact',
      title: { fr: 'Un fait durable, corrigé en place', en: 'A lasting fact, fixed in place' },
      file: '02_product/products.md',
      text: {
        fr: 'Riley annonce une nouvelle date. La règle de fraîcheur s’applique : la valeur la plus récente et la plus officielle remplace l’ancienne, qui reste entre parenthèses avec sa date.',
        en: 'Riley announces a new date. The freshness rule applies: the most recent and most official value replaces the old one, which stays in parentheses with its date.',
      },
      before: {
        fr: `- API de filtres enregistrés : disponibilité prévue en juin 2026.`,
        en: `- Saved-filters API: availability planned for June 2026.`,
      },
      after: {
        fr: `- API de filtres enregistrés : disponibilité prévue en avril 2026
  (ancienne valeur : juin 2026, avant le 12 mars 2026).
  Source : archive/2026-03-12_sync-portal.txt, 09:00, annonce de Riley.`,
        en: `- Saved-filters API: availability planned for April 2026
  (previous value: June 2026, before 12 March 2026).
  Source: archive/2026-03-12_sync-portal.txt, 09:00, announced by Riley.`,
      },
    },
    {
      id: 'changelog',
      title: { fr: 'Le changelog', en: 'The changelog' },
      file: 'CHANGELOG.md',
      text: {
        fr: 'Il dit, page par page, quoi reporter dans les outils externes : « ajouter » veut dire coller à la fin, « remplacer » veut dire remplacer un paragraphe identifié. Les outils externes sont des vues du brain, la source reste dans le dossier.',
        en: 'It says, page by page, what to carry over to external tools: "add" means paste at the end, "replace" means replace an identified paragraph. External tools are views of the brain, the source stays in the folder.',
      },
      before: {
        fr: `## 2026-02-10, rituel de revue de design

- Wiki « Rituels de l'équipe design »
  ajouter · fin de page
  « Revue de design chaque mardi, 45 minutes. »  [x]`,
        en: `## 2026-02-10, design review ritual

- Wiki "Design team rituals"
  add · end of page
  "Design review every Tuesday, 45 minutes."  [x]`,
      },
      after: {
        fr: `## 2026-03-12, point hebdomadaire Portal et Insights

- Wiki « Acme Portal, checklist d'accueil »
  remplacer · paragraphe « Périmètre de la v1 »
  « La première version s'affiche uniquement pour les nouveaux comptes. »  [ ]
- Wiki « Acme Insights, feuille de route »
  remplacer · ligne « API de filtres enregistrés »
  « Disponibilité prévue : avril 2026 (en attente de confirmation écrite). »  [ ]
- Wiki « Décisions de l'équipe design »
  ajouter · fin de page
  « 12 mars 2026, D-003 : checklist v1 pour les nouveaux comptes seulement. »  [ ]

## 2026-02-10, rituel de revue de design
(inchangé)`,
        en: `## 2026-03-12, weekly Portal and Insights meeting

- Wiki "Acme Portal, onboarding checklist"
  replace · paragraph "v1 scope"
  "The first version only shows for new accounts."  [ ]
- Wiki "Acme Insights, roadmap"
  replace · line "Saved-filters API"
  "Planned availability: April 2026 (awaiting written confirmation)."  [ ]
- Wiki "Design team decisions"
  add · end of page
  "12 March 2026, D-003: checklist v1 for new accounts only."  [ ]

## 2026-02-10, design review ritual
(unchanged)`,
      },
    },
  ] as BeforeAfter[],
  closing: {
    fr: 'Pour finir, Claude déplace l’original vers archive/, relance python3 scripts/build_views.py et liste ce qui a été fait. Il laisse à Sam trois points à trancher : confirmer que « Dina » est Dana, confirmer l’échéance du 20 mars, prendre ou écarter les lignes « possibles, non retenues ».',
    en: 'To finish, Claude moves the original to archive/, reruns python3 scripts/build_views.py and lists what was done. Claude leaves Sam three points to settle: confirm that "Dina" is Dana, confirm the 20 March deadline, take or drop the "possible, not retained" lines.',
  } as L,
}

// ---------------------------------------------------------------------------
// 9. Safety rules and FAQ
// ---------------------------------------------------------------------------

export const OS_SAFETY = {
  title: { fr: 'Les règles de sûreté', en: 'The safety rules' } as L,
  intro: {
    fr: 'Ces règles sont copiées dans le CLAUDE.md et valent pour tous les agents.',
    en: 'These rules are copied into CLAUDE.md and apply to every agent.',
  } as L,
  rules: [
    {
      title: { fr: 'Claude propose, vous validez, puis il écrit', en: 'Claude proposes, you approve, then it writes' },
      text: {
        fr: 'Il présente d’abord ce qu’il compte modifier. Il n’écrit qu’après votre accord explicite (« valide tout » ou une liste de numéros).',
        en: 'Claude first presents what it intends to change. It writes only after your explicit approval ("approve all" or a list of numbers).',
      },
    },
    {
      title: { fr: 'Il n’invente jamais une décision', en: 'Claude never invents a decision' },
      text: {
        fr: 'Une décision, une action ou une échéance qui n’est pas dans le texte n’est pas créée. Si la raison manque, il écrit « raison non documentée ».',
        en: 'A decision, an action or a deadline that is not in the text is not created. If the reason is missing, it writes "reason not documented".',
      },
    },
    {
      title: { fr: 'Il signale les doutes', en: 'Claude flags doubts' },
      text: {
        fr: 'Un passage ambigu, une date sans année ou un nom qui ressemble à une déformation de transcription donnent lieu à une question, jamais à un choix silencieux.',
        en: 'An ambiguous passage, a date without a year or a name that looks like a transcription slip leads to a question, never to a silent choice.',
      },
    },
    {
      title: { fr: 'Rien n’est supprimé sans accord', en: 'Nothing is deleted without approval' },
      text: {
        fr: 'Aucun fichier n’est supprimé ni déplacé hors du flux prévu (inbox vers archive) sans que vous l’ayez demandé.',
        en: 'No file is deleted or moved outside the planned flow (inbox to archive) unless you asked.',
      },
    },
    {
      title: { fr: 'Un fait, une idée et un engagement restent distincts', en: 'A fact, an idea and a commitment stay distinct' },
      text: {
        fr: 'Ce qui est fait, ce que vous avez promis à quelqu’un et ce que vous envisagez sont trois statuts. Une suggestion de Claude n’est jamais présentée comme un engagement.',
        en: 'What is done, what you promised someone and what you are considering are three statuses. A suggestion from Claude is never presented as a commitment.',
      },
    },
    {
      title: { fr: 'Chaque ligne garde sa source', en: 'Every line keeps its source' },
      text: {
        fr: 'Chaque fait important renvoie à son fichier d’origine et à sa date, jamais à un résumé produit à partir du brain.',
        en: 'Every important fact points to its original file and date, never to a summary produced from the brain.',
      },
    },
  ] as { title: L; text: L }[],
  faqTitle: { fr: 'Questions fréquentes', en: 'Frequently asked questions' } as L,
  faq: [
    {
      q: { fr: 'Mes notes restent-elles privées ?', en: 'Do my notes stay private?' },
      a: {
        fr: 'Les fichiers restent sur votre machine. En revanche, Claude Code lit leur contenu pour répondre, donc ce qu’il lit est envoyé au modèle pendant la session. Évitez d’y mettre des mots de passe ou des données personnelles inutiles.',
        en: 'The files stay on your machine. However, Claude Code reads their content to answer, so what it reads is sent to the model during the session. Avoid putting passwords or needless personal data in it.',
      },
    },
    {
      q: { fr: 'Faut-il savoir coder ?', en: 'Do I need to know how to code?' },
      a: {
        fr: 'Non. Tout est en fichiers texte que Claude écrit pour vous. Seul le script de vues demande Python 3, et il est facultatif.',
        en: 'No. Everything is plain text files that Claude writes for you. Only the views script needs Python 3, and it is optional.',
      },
    },
    {
      q: { fr: 'Et si Claude se trompe ?', en: 'What if Claude gets it wrong?' },
      a: {
        fr: 'Rien n’est écrit sans votre accord, chaque ligne a sa source et l’original est archivé sans modification. Avec Git, vous pouvez en plus revenir à l’état précédent du dossier.',
        en: 'Nothing is written without your approval, every line has its source and the original is archived untouched. With Git you can also go back to the folder’s previous state.',
      },
    },
    {
      q: { fr: 'Cela marche-t-il avec Codex ou Claude.ai ?', en: 'Does it work with Codex or Claude.ai?' },
      a: {
        fr: 'La skill s’installe aussi dans Codex et dans Claude.ai, et elle vous guide pour la structure et les règles. Les agents et les commandes comme /inbox sont des fichiers du dossier .claude/, lus par Claude Code.',
        en: 'The skill also installs in Codex and in Claude.ai, and it guides you through the structure and the rules. Agents and commands such as /inbox are files in the .claude/ folder, read by Claude Code.',
      },
    },
  ] as { q: L; a: L }[],
}

// ---------------------------------------------------------------------------
// 10. Going further
// ---------------------------------------------------------------------------

export const OS_MORE = {
  title: { fr: 'Pour aller plus loin', en: 'Going further' } as L,
  links: [
    {
      path: 'guide/claude-code',
      title: { fr: 'Le guide Claude Code', en: 'The Claude Code guide' },
      text: {
        fr: 'De l’installation au déploiement, pour les designers.',
        en: 'From installation to deployment, for designers.',
      },
    },
    {
      path: 'skills',
      title: { fr: 'Le catalogue de skills', en: 'The skills catalogue' },
      text: {
        fr: 'Les skills que j’utilise, à installer en une commande.',
        en: 'The skills I use, to install with one command.',
      },
    },
    {
      path: 'claude',
      title: { fr: 'La page Claude', en: 'The Claude page' },
      text: {
        fr: 'Comment je travaille avec Claude au quotidien.',
        en: 'How I work with Claude day to day.',
      },
    },
  ] as { path: string; title: L; text: L }[],
}

export const OS_LABELS = {
  copy: { fr: 'Copier', en: 'Copy' } as L,
  copied: { fr: 'Copié', en: 'Copied' } as L,
  prompt: { fr: 'Ce qu’on dit à Claude', en: 'What you tell Claude' } as L,
  result: { fr: 'Ce qu’on obtient', en: 'What you get' } as L,
  step: { fr: 'Étape', en: 'Step' } as L,
  resources: { fr: 'Ressources', en: 'Resources' } as L,
}
