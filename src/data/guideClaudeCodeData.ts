/**
 * Guide Claude Code - Full bilingual content data (EN/FR)
 * Source: Notion guide "Bien démarrer avec Claude Code - Guide pour les designers"
 */

export interface GuideSection {
  heading_en: string;
  heading_fr: string;
  content_en: string;
  content_fr: string;
}

export interface GuideChapter {
  number: number;
  title_en: string;
  title_fr: string;
  slug_en: string;
  slug_fr: string;
  intro_en: string;
  intro_fr: string;
  sections: GuideSection[];
}

export const GUIDE_META = {
  title_en: 'Getting Started with Claude Code',
  title_fr: 'Bien démarrer avec Claude Code',
  subtitle_en: 'A guide for designers',
  subtitle_fr: 'Guide pour les designers',
  categories_en: ['Claude Code', 'Guide', 'Resources'] as const,
  categories_fr: ['Claude Code', 'Guide', 'Ressources'] as const,
  date: '2026-03-14',
  readTime: '45 min',
  author: {
    name: 'Victor Soussan',
    role: 'Lead Product Designer',
    bio_en: 'SaaS B2B & B2G | Complex business interfaces | Design Systems | Figma, Claude Code | AI Prototyping',
    bio_fr: 'SaaS B2B & B2G | Interfaces métier complexes | Design Systems | Figma, Claude Code | Prototypage IA',
    image: '/images/guide-claude-code/author-victor.png',
    linkedin: 'https://linkedin.com/in/victor-soussan-product-design/',
    website: 'https://www.victorsoussan.fr/',
  },
  heroImage: '/images/guide-claude-code/hero-cover.png',
  heroAlt_en: 'Claude Code gives designers the ability to design, produce, and deploy real deliverables.',
  heroAlt_fr: 'Claude Code ouvre aux designers la possibilité de concevoir, produire et déployer des livrables réels.',
};

/** Find a chapter by slug in either language */
export function findChapterBySlug(slug: string): GuideChapter | undefined {
  return GUIDE_CHAPTERS.find((ch) => ch.slug_en === slug || ch.slug_fr === slug);
}

/** Get the localized slug for a chapter */
export function getChapterSlug(chapter: GuideChapter, lang: 'en' | 'fr'): string {
  return lang === 'en' ? chapter.slug_en : chapter.slug_fr;
}

/** Get all slugs for generateStaticParams */
export function getAllGuideSlugs(): { lang: string; slug: string }[] {
  return GUIDE_CHAPTERS.flatMap((ch) => [
    { lang: 'en', slug: ch.slug_en },
    { lang: 'fr', slug: ch.slug_fr },
  ]);
}

export const GUIDE_CHAPTERS: GuideChapter[] = [
  {
    number: 1,
    title_fr: 'Comprendre Claude Code',
    title_en: 'Understanding Claude Code',
    slug_fr: 'comprendre',
    slug_en: 'understanding',
    intro_fr: 'Ce que c\'est, en quoi ça diffère des autres outils IA, et pourquoi ça change concrètement quelque chose pour un designer.',
    intro_en: 'What it is, how it differs from other AI tools, and why it actually changes something for a designer.',
    sections: [
      {
        heading_fr: 'C\'est quoi',
        heading_en: 'What it is',
        content_fr: `<p>Claude Code est un agent de codage développé par Anthropic. Concrètement, il peut lire les fichiers d'un projet, écrire du code, exécuter des commandes, démarrer un serveur local pour prévisualiser une interface, et itérer sur les changements, tout ça depuis une conversation.</p>
<p>Tu lui décris ce que tu veux construire. Il écrit le code, le fait tourner, te montre le résultat. Tu lui dis ce qui ne va pas. Il corrige. Le cycle ressemble à ce que tu fais dans Figma entre deux versions d'un composant, sauf qu'en sortie tu obtiens quelque chose qui fonctionne dans un navigateur.</p>`,
        content_en: `<p>Claude Code is a coding agent developed by Anthropic. In practice, it can read a project's files, write code, run commands, start a local server to preview an interface, and iterate on changes, all from a conversation.</p>
<p>You describe what you want to build. It writes the code, runs it, shows you the result. You tell it what's not working. It fixes it. The cycle looks a lot like what you do in Figma between two versions of a component, except the output is something that actually works in a browser.</p>`,
      },
      {
        heading_fr: 'En quoi ça diffère des autres outils',
        heading_en: 'How it differs from other tools',
        content_fr: `<p>Plusieurs outils proposent de « créer des applications avec de l'IA » : Lovable, Bolt, v0, Framer AI. Ce sont des interfaces simplifiées construites au-dessus de modèles d'IA. Ils sont rapides pour démarrer et pratiques pour une exploration initiale.</p>
<p>Claude Code fonctionne différemment. Il travaille directement sur les fichiers de ton projet, dans ton environnement de travail. Il lit ta structure de dossiers, comprend les conventions déjà en place, et peut intervenir sur n'importe quel fichier avec précision. Ce n'est pas une application qui génère du code dans une boîte noire : c'est un agent qui travaille à côté de toi, sur les mêmes fichiers.</p>
<p>Cette différence devient importante quand tu passes de l'exploration à la construction réelle : un projet démarré dans Claude Code est un projet standard que tu peux ouvrir dans VSCode, versionner sur GitHub, déployer sur Vercel, et passer à un développeur sans friction.</p>
<table><thead><tr><th></th><th>Lovable / Bolt / v0</th><th>Claude Code</th></tr></thead><tbody>
<tr><td>Interface</td><td>Application web dédiée</td><td>Terminal, VSCode, ou app Desktop Claude</td></tr>
<tr><td>Accès aux fichiers</td><td>Interface propriétaire</td><td>Tes fichiers réels, dans ton dossier</td></tr>
<tr><td>Contrôle sur le code</td><td>Limité</td><td>Total</td></tr>
<tr><td>Export</td><td>Vers GitHub (selon l'outil)</td><td>Déjà dans tes fichiers</td></tr>
<tr><td>Prérequis</td><td>Aucun</td><td>Claude Pro/Max</td></tr>
</tbody></table>`,
        content_en: `<p>Several tools offer to "build apps with AI": Lovable, Bolt, v0, Framer AI. These are simplified interfaces built on top of AI models. They're fast to get started with and useful for initial exploration.</p>
<p>Claude Code works differently. It operates directly on your project's files, inside your working environment. It reads your folder structure, understands the conventions already in place, and can make precise edits to any file. It's not an app that generates code inside a black box: it's an agent working alongside you, on the same files.</p>
<p>This difference matters when you move from exploration to actual building: a project started in Claude Code is a standard project you can open in VSCode, version on GitHub, deploy on Vercel, and hand off to a developer without friction.</p>
<table><thead><tr><th></th><th>Lovable / Bolt / v0</th><th>Claude Code</th></tr></thead><tbody>
<tr><td>Interface</td><td>Dedicated web app</td><td>Terminal, VSCode, or Claude Desktop app</td></tr>
<tr><td>File access</td><td>Proprietary interface</td><td>Your actual files, in your folder</td></tr>
<tr><td>Control over code</td><td>Limited</td><td>Full</td></tr>
<tr><td>Export</td><td>To GitHub (depending on the tool)</td><td>Already in your files</td></tr>
<tr><td>Requirements</td><td>None</td><td>Claude Pro/Max</td></tr>
</tbody></table>`,
      },
      {
        heading_fr: 'Les trois modes d\'utilisation',
        heading_en: 'The three ways to use it',
        content_fr: `<img src="/images/guide-claude-code/ch1-three-modes.png" alt="Les trois modes d'utilisation de Claude Code" />
<p>Il n'y a pas une seule façon d'utiliser Claude Code. Selon ce que tu cherches à faire et les outils que tu maîtrises déjà, tu choisiras un mode différent.</p>
<p><strong>L'app Desktop</strong> est la façon la plus rapide de démarrer. Même interface que Claude chat, pas de configuration. Tu passes en mode Code, tu pointes sur un dossier, et tu commences. Elle offre une prévisualisation live intégrée, un diff visuel des modifications, la possibilité de cliquer directement sur les éléments de l'interface pour donner un feedback, et le glisser-déposer de maquettes et de screenshots.</p>
<p><strong>VSCode + fenêtre compagnon</strong> est la configuration la plus efficace au quotidien. VSCode occupe la moitié gauche de l'écran avec les fichiers du projet ouverts dans l'éditeur, et Claude Code tourne dans une fenêtre de conversation séparée à droite. Les deux fenêtres pointent sur le même dossier. Tu donnes tes instructions dans la conversation, Claude modifie les fichiers, et tu vois les changements apparaître instantanément dans l'éditeur VSCode sans quitter l'écran.</p>
<p><strong>VSCode + terminal intégré</strong> est une variante où Claude Code tourne directement dans le terminal à l'intérieur de VSCode, sans fenêtre séparée. Tout reste dans une seule application. C'est utile si tu préfères travailler dans un environnement unifié ou si tu intègres Claude Code dans un workflow plus technique.</p>
<blockquote>Pour la plupart des projets design, l'app Desktop ou VSCode couvrent l'essentiel. Le terminal devient pertinent quand le volume de travail augmente ou quand tu travailles dans un environnement d'équipe avec des conventions techniques précises.</blockquote>
<div class="callout"><strong>À quoi ça ressemble en pratique</strong><br/>VSCode ouvert à gauche avec les fichiers du projet. La fenêtre compagnon Claude Code à droite dans VSCode. Tu écris : « modifie le composant hero, padding à 24px, titre en 32px weight 800 ». Claude modifie les fichiers. Le diff apparaît dans l'éditeur, lignes modifiées surlignées. Tu vérifies sur <code>localhost:3000</code> dans le navigateur. Tu demandes à Claude de pousser sur GitHub. Le tout sans changer d'application, sans perdre le fil de la conversation.</div>`,
        content_en: `<img src="/images/guide-claude-code/ch1-three-modes.png" alt="The three ways to use Claude Code" />
<p>There's no single right way to use Claude Code. Depending on what you're trying to do and which tools you're already comfortable with, you'll pick a different mode.</p>
<p><strong>The Desktop app</strong> is the fastest way to get started. Same interface as Claude chat, no configuration needed. You switch to Code mode, point it at a folder, and you're off. It includes a built-in live preview, a visual diff of changes, the ability to click directly on interface elements to give feedback, and drag-and-drop support for mockups and screenshots.</p>
<p><strong>VSCode + companion window</strong> is the most efficient setup for daily use. VSCode takes up the left half of the screen with project files open in the editor, and Claude Code runs in a separate conversation window on the right. Both windows point to the same folder. You give instructions in the conversation, Claude edits the files, and you see the changes appear instantly in the VSCode editor without leaving the screen.</p>
<p><strong>VSCode + integrated terminal</strong> is a variation where Claude Code runs directly in the terminal inside VSCode, without a separate window. Everything stays in one application. This is useful if you prefer working in a unified environment or if you're integrating Claude Code into a more technical workflow.</p>
<blockquote>For most design projects, the Desktop app or VSCode covers everything you need. The terminal becomes relevant when the volume of work increases or when you're working in a team environment with specific technical conventions.</blockquote>
<div class="callout"><strong>What it looks like in practice</strong><br/>VSCode open on the left with project files. The Claude Code companion window on the right in VSCode. You type: "update the hero component, padding to 24px, title at 32px weight 800". Claude edits the files. The diff appears in the editor, modified lines highlighted. You check on <code>localhost:3000</code> in the browser. You ask Claude to push to GitHub. All without switching apps, without losing the thread of the conversation.</div>`,
      },
      {
        heading_fr: 'Ce qu\'on peut concrètement construire',
        heading_en: 'What you can actually build',
        content_fr: `<p>Les cas d'usage qui ont le plus de valeur pour un designer :</p>
<p><strong>Prototypes interactifs avec de vraies données.</strong> Les prototypes Figma gèrent bien les flux, mais pas la logique conditionnelle, les états de chargement, ni les vrais comportements de formulaire. Claude Code peut construire une version qui répond à des interactions réelles. La différence est perceptible lors d'une présentation client.</p>
<p><strong>Prototypes de test utilisateur.</strong> Un prototype qui suit les clics, mesure le temps passé sur une tâche, ou modifie le contenu selon l'action de l'utilisateur. Figma ne peut pas faire ça. Claude Code peut le construire en une conversation.</p>
<p><strong>Documentation de design system.</strong> Une page où chaque composant s'affiche avec son code réel, les variantes sont interactives, et tout utilise tes vrais tokens. Beaucoup plus utile qu'une page Figma statique.</p>
<p><strong>Corrections UI directes.</strong> Un spacing incorrect, une couleur de bouton à corriger. Tu ouvres le projet dans Claude Code, tu cliques sur l'élément, tu indiques le changement. Claude génère une pull request propre que les développeurs peuvent réviser directement.</p>
<p><strong>Sites et landing pages.</strong> Une page portfolio depuis tes designs Figma, une landing page client déployée en production, une page de présentation d'un side project.</p>`,
        content_en: `<p>The use cases with the most value for a designer:</p>
<p><strong>Interactive prototypes with real data.</strong> Figma prototypes handle flows well, but not conditional logic, loading states, or real form behavior. Claude Code can build a version that responds to real interactions. The difference is noticeable in a client presentation.</p>
<p><strong>User testing prototypes.</strong> A prototype that tracks clicks, measures time spent on a task, or changes content based on user actions. Figma can't do that. Claude Code can build it in a single conversation.</p>
<p><strong>Design system documentation.</strong> A page where each component renders with its actual code, variants are interactive, and everything uses your real tokens. Much more useful than a static Figma page.</p>
<p><strong>Direct UI fixes.</strong> Incorrect spacing, a button color that needs changing. You open the project in Claude Code, click the element, describe the change. Claude generates a clean pull request that developers can review directly.</p>
<p><strong>Sites and landing pages.</strong> A portfolio page from your Figma designs, a client landing page deployed to production, a presentation page for a side project.</p>`,
      },
      {
        heading_fr: 'Ce qu\'il ne fait pas à ta place',
        heading_en: 'What it doesn\'t do for you',
        content_fr: `<p>Claude Code couvre 60 à 80 % du chemin. Le reste reste de ta responsabilité.</p>
<p>Il génère du code qui fonctionne, mais qui ne sera pas toujours structuré exactement comme un développeur senior l'aurait fait. Le comportement responsive peut nécessiter des ajustements. Les animations fines demandent de l'itération. Et les décisions de design, lui dire ce qui est juste visuellement et ce qui ne l'est pas, restent les tiennes.</p>
<p>L'outil amplifie ce que tu sais déjà faire. Plus tu es précis dans tes descriptions et ton feedback, meilleur est le résultat.</p>`,
        content_en: `<p>Claude Code covers 60 to 80 percent of the way there. The rest stays your responsibility.</p>
<p>It generates code that works, but it won't always be structured exactly the way a senior developer would have done it. Responsive behavior may need adjusting. Fine-grained animations require iteration. And design decisions, telling it what looks right visually and what doesn't, remain yours.</p>
<p>The tool amplifies what you already know how to do. The more precise you are in your descriptions and feedback, the better the result.</p>`,
      },
    ],
  },
  {
    number: 2,
    title_fr: 'Préparer son environnement',
    title_en: 'Setting up your environment',
    slug_fr: 'environnement',
    slug_en: 'setup',
    intro_fr: 'Abonnement, installation, organisation des dossiers sur Mac, outils à avoir avant de commencer.',
    intro_en: 'Subscription, installation, folder organization on Mac, tools to have in place before you start.',
    sections: [
      {
        heading_fr: 'Prérequis obligatoires',
        heading_en: 'Required prerequisites',
        content_fr: `<h3>Un abonnement Claude Pro ou Max</h3>
<p>Claude Code n'est pas disponible sur le plan gratuit.</p>
<ul>
<li><strong>Pro, 20 $/mois</strong> : suffisant pour démarrer et couvre la plupart des usages quotidiens.</li>
<li><strong>Max, 100 $/mois</strong> : utile si tu travailles intensivement ou si tu atteins régulièrement les limites de quota du plan Pro.</li>
</ul>
<p>Le quota est partagé entre le chat Claude et Claude Code. Des sessions de codage intensives consomment plus que des conversations textuelles.</p>
<blockquote>Conseil : commence par Pro. Tu verras rapidement si les limites te posent problème dans ton usage réel.</blockquote>
<h3>L'app Desktop Claude</h3>
<p>Télécharge l'app sur <a href="https://claude.ai/download" target="_blank" rel="noopener">claude.ai/download</a>. Disponible sur Mac et Windows. Connecte-toi avec le même compte que sur claude.ai.</p>`,
        content_en: `<h3>A Claude Pro or Max subscription</h3>
<p>Claude Code is not available on the free plan.</p>
<ul>
<li><strong>Pro, $20/month</strong>: enough to get started and covers most everyday use cases.</li>
<li><strong>Max, $100/month</strong>: useful if you work intensively or if you regularly hit the quota limits of the Pro plan.</li>
</ul>
<p>The quota is shared between Claude chat and Claude Code. Intensive coding sessions consume more than text conversations.</p>
<blockquote>Tip: start with Pro. You'll quickly see whether the limits are a problem for your actual usage.</blockquote>
<h3>The Claude Desktop app</h3>
<p>Download the app at <a href="https://claude.ai/download" target="_blank" rel="noopener">claude.ai/download</a>. Available on Mac and Windows. Sign in with the same account you use on claude.ai.</p>`,
      },
      {
        heading_fr: 'Prérequis selon le chemin choisi',
        heading_en: 'Prerequisites by path',
        content_fr: `<table><thead><tr><th>Outil</th><th>Chemin A</th><th>Chemin B</th><th>Chemin C</th></tr></thead><tbody>
<tr><td>Claude Pro/Max</td><td>Oui</td><td>Oui</td><td>Oui</td></tr>
<tr><td>App Desktop Claude</td><td>Oui</td><td>Facultatif</td><td>Facultatif</td></tr>
<tr><td>VSCode</td><td>Facultatif</td><td>Oui</td><td>Oui</td></tr>
<tr><td>Git</td><td>Non</td><td>Oui</td><td>Oui</td></tr>
<tr><td>Compte GitHub</td><td>Non</td><td>Oui</td><td>Oui</td></tr>
<tr><td>Compte Lovable / Gemini</td><td>Non</td><td>Non</td><td>Selon l'outil</td></tr>
</tbody></table>
<p>Si tu ne sais pas encore quel chemin tu vas prendre, installe tout. La mise en place prend moins d'une heure.</p>`,
        content_en: `<table><thead><tr><th>Tool</th><th>Path A</th><th>Path B</th><th>Path C</th></tr></thead><tbody>
<tr><td>Claude Pro/Max</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
<tr><td>Claude Desktop app</td><td>Yes</td><td>Optional</td><td>Optional</td></tr>
<tr><td>VSCode</td><td>Optional</td><td>Yes</td><td>Yes</td></tr>
<tr><td>Git</td><td>No</td><td>Yes</td><td>Yes</td></tr>
<tr><td>GitHub account</td><td>No</td><td>Yes</td><td>Yes</td></tr>
<tr><td>Lovable / Gemini account</td><td>No</td><td>No</td><td>Depends on the tool</td></tr>
</tbody></table>
<p>If you're not sure which path you'll take, install everything. Setup takes less than an hour.</p>`,
      },
      {
        heading_fr: 'Organiser ses dossiers sur Mac',
        heading_en: 'Organizing your folders on Mac',
        content_fr: `<p>Claude Code travaille sur des dossiers réels de ton ordinateur. Chaque projet est un dossier. Avant de créer le premier, prends deux minutes pour mettre en place une convention simple que tu n'auras plus à revoir.</p>
<p>Crée un dossier <code>dev_projects</code> dans ton répertoire personnel :</p>
<pre><code class="language-plain">/Users/ton-nom/
└── dev_projects/
    ├── portfolio-2026/
    ├── prototype-dashboard/
    ├── landing-client-x/
    └── design-system-doc/</code></pre>
<img src="/images/guide-claude-code/ch3-dev-projects-folder.png" alt="Organisation des dossiers dev_projects dans le Finder" />
<p><strong>Pour le créer :</strong></p>
<ol>
<li>Ouvre le Finder.</li>
<li>Appuie sur <code>Cmd + Shift + H</code> pour aller dans ton répertoire personnel.</li>
<li>Appuie sur <code>Cmd + Shift + N</code> pour créer un nouveau dossier.</li>
<li>Nomme-le <code>dev_projects</code> (sans espace, sans majuscule, sans accent).</li>
<li>Glisse-le dans la barre latérale gauche du Finder pour un accès rapide.</li>
</ol>
<blockquote>Règle de nommage pour les sous-dossiers : pas d'espaces, pas de majuscules, pas d'accents. <code>portfolio-v2</code> oui, <code>Portfolio V2</code> non. Les outils en ligne de commande gèrent mal les espaces dans les chemins de fichiers.</blockquote>`,
        content_en: `<p>Claude Code works on real folders on your computer. Each project is a folder. Before creating the first one, take two minutes to set up a simple convention you won't have to revisit.</p>
<p>Create a <code>dev_projects</code> folder in your home directory:</p>
<pre><code class="language-plain">/Users/your-name/
└── dev_projects/
    ├── portfolio-2026/
    ├── prototype-dashboard/
    ├── landing-client-x/
    └── design-system-doc/</code></pre>
<img src="/images/guide-claude-code/ch3-dev-projects-folder.png" alt="dev_projects folder organization in the Finder" />
<p><strong>To create it:</strong></p>
<ol>
<li>Open the Finder.</li>
<li>Press <code>Cmd + Shift + H</code> to go to your home directory.</li>
<li>Press <code>Cmd + Shift + N</code> to create a new folder.</li>
<li>Name it <code>dev_projects</code> (no spaces, no capitals, no accents).</li>
<li>Drag it to the left sidebar of the Finder for quick access.</li>
</ol>
<blockquote>Naming rule for subfolders: no spaces, no capitals, no accents. <code>portfolio-v2</code> yes, <code>Portfolio V2</code> no. Command-line tools handle spaces in file paths poorly.</blockquote>`,
      },
      {
        heading_fr: 'Installer VSCode',
        heading_en: 'Installing VSCode',
        content_fr: `<p><a href="https://code.visualstudio.com/" target="_blank" rel="noopener">Télécharge VSCode</a> et installe-le normalement.</p>
<p>Une fois installé, deux extensions utiles à ajouter :</p>
<p><strong>Live Server</strong> : recharge automatiquement le navigateur chaque fois qu'un fichier HTML ou CSS est modifié. Indispensable pour les projets en HTML pur.</p>
<p><strong>GitLens</strong> : affiche l'historique Git directement dans l'éditeur, sur chaque ligne de code. Facultatif mais utile pour comprendre ce que Claude a modifié sur un fichier.</p>`,
        content_en: `<p><a href="https://code.visualstudio.com/" target="_blank" rel="noopener">Download VSCode</a> and install it normally.</p>
<p>Once installed, two useful extensions to add:</p>
<p><strong>Live Server</strong>: automatically reloads the browser every time an HTML or CSS file is modified. Essential for pure HTML projects.</p>
<p><strong>GitLens</strong>: displays the Git history directly in the editor, on every line of code. Optional but useful for understanding what Claude changed in a file.</p>`,
      },
      {
        heading_fr: 'Installer Git',
        heading_en: 'Installing Git',
        content_fr: `<p>Git est le système qui permet de versionner les fichiers de ton projet et de les synchroniser avec GitHub.</p>
<p><strong>Sur Mac :</strong> Git est souvent déjà installé. Pour vérifier, ouvre le Terminal et tape :</p>
<pre><code class="language-bash">git --version</code></pre>
<p>Si une version s'affiche, c'est bon. Sinon, installe <a href="https://brew.sh/" target="_blank" rel="noopener">Homebrew</a> puis tape <code>brew install git</code>.</p>`,
        content_en: `<p>Git is the system that lets you version your project files and sync them with GitHub.</p>
<p><strong>On Mac:</strong> Git is often already installed. To check, open the Terminal and type:</p>
<pre><code class="language-bash">git --version</code></pre>
<p>If a version number appears, you're good. Otherwise, install <a href="https://brew.sh/" target="_blank" rel="noopener">Homebrew</a> then type <code>brew install git</code>.</p>`,
      },
      {
        heading_fr: 'Créer un compte GitHub',
        heading_en: 'Creating a GitHub account',
        content_fr: `<p>GitHub est le service qui héberge tes projets versionnés dans le cloud. Pense-y comme un Google Drive pour le code : tes fichiers y sont sauvegardés, chaque modification est tracée, et tu peux partager l'accès à un développeur.</p>
<p>Crée un compte gratuit sur <a href="https://github.com/" target="_blank" rel="noopener">github.com</a>. Le plan gratuit est suffisant pour tous les usages décrits dans ce guide.</p>`,
        content_en: `<p>GitHub is the service that hosts your versioned projects in the cloud. Think of it as a Google Drive for code: your files are saved there, every change is tracked, and you can share access with a developer.</p>
<p>Create a free account at <a href="https://github.com/" target="_blank" rel="noopener">github.com</a>. The free plan is sufficient for everything described in this guide.</p>`,
      },
      {
        heading_fr: 'Installer Claude Code en ligne de commande',
        heading_en: 'Installing Claude Code via the command line',
        content_fr: `<p>Si tu veux utiliser Claude Code depuis le terminal de VSCode ou depuis un terminal directement :</p>
<pre><code class="language-bash">npm install -g @anthropic-ai/claude-code</code></pre>
<p>Cette commande nécessite que Node.js soit installé. Pour vérifier : <code>node --version</code>. Si Node n'est pas installé, télécharge-le sur <a href="https://nodejs.org/" target="_blank" rel="noopener">nodejs.org</a> (version LTS).</p>
<p>Une fois installé, lance Claude Code depuis n'importe quel dossier avec :</p>
<pre><code class="language-bash">claude</code></pre>
<blockquote>Si tu utilises uniquement l'app Desktop : tu n'as pas besoin d'installer Claude Code en ligne de commande. L'app Desktop l'inclut nativement.</blockquote>`,
        content_en: `<p>If you want to use Claude Code from the VSCode terminal or directly from a terminal:</p>
<pre><code class="language-bash">npm install -g @anthropic-ai/claude-code</code></pre>
<p>This command requires Node.js to be installed. To check: <code>node --version</code>. If Node isn't installed, download it from <a href="https://nodejs.org/" target="_blank" rel="noopener">nodejs.org</a> (LTS version).</p>
<p>Once installed, launch Claude Code from any folder with:</p>
<pre><code class="language-bash">claude</code></pre>
<blockquote>If you're using only the Desktop app: you don't need to install Claude Code via the command line. The Desktop app includes it natively.</blockquote>`,
      },
      {
        heading_fr: 'Récapitulatif : liste de contrôle',
        heading_en: 'Summary: checklist',
        content_fr: `<p>Avant de passer à la suite, vérifie que tu as :</p>
<ul>
<li>Un abonnement Claude Pro ou Max actif</li>
<li>L'app Desktop Claude installée et connectée</li>
<li>Le dossier <code>dev_projects</code> créé dans ton répertoire personnel</li>
<li>VSCode installé (si tu prévois les chemins B ou C)</li>
<li>Git installé et fonctionnel (<code>git --version</code> renvoie une version)</li>
<li>Un compte GitHub créé</li>
<li>Claude Code CLI installé (<code>claude --version</code>) si tu utilises le terminal</li>
</ul>`,
        content_en: `<p>Before moving on, make sure you have:</p>
<ul>
<li>An active Claude Pro or Max subscription</li>
<li>The Claude Desktop app installed and signed in</li>
<li>The <code>dev_projects</code> folder created in your home directory</li>
<li>VSCode installed (if you're planning on paths B or C)</li>
<li>Git installed and working (<code>git --version</code> returns a version number)</li>
<li>A GitHub account created</li>
<li>Claude Code CLI installed (<code>claude --version</code>) if you're using the terminal</li>
</ul>`,
      },
    ],
  },
  {
    number: 3,
    title_fr: 'Les trois approches pour démarrer',
    title_en: 'Three ways to start',
    slug_fr: 'approches',
    slug_en: 'getting-started',
    intro_fr: 'Dossier local, artifact Claude, ou autre outil IA comme point de départ. Comment choisir et comment migrer d\'un chemin à l\'autre.',
    intro_en: 'Local folder, Claude artifact, or another AI tool as a starting point. How to choose and how to migrate from one path to another.',
    sections: [
      {
        heading_fr: 'Vue d\'ensemble',
        heading_en: 'Overview',
        content_fr: `<img src="/images/guide-claude-code/ch3-three-approaches.png" alt="Les trois approches pour démarrer un projet avec Claude Code" />
<p>Il n'y a pas une seule façon de commencer un projet avec Claude Code. Selon l'état d'avancement de ton idée, les outils que tu maîtrises, et le temps disponible pour la configuration, trois chemins s'offrent à toi.</p>`,
        content_en: `<img src="/images/guide-claude-code/ch3-three-approaches.png" alt="The three approaches to starting a project with Claude Code" />
<p>There's no single way to start a project with Claude Code. Depending on how developed your idea is, the tools you're comfortable with, and the time available for setup, you have three paths to choose from.</p>`,
      },
      {
        heading_fr: 'Approche 1 : Partir directement en local',
        heading_en: 'Approach 1: Start directly in local',
        content_fr: `<p><strong>Quand l'utiliser :</strong> tu as une idée précise, tu veux construire quelque chose de zéro sans passer par GitHub, et tu veux aller vite.</p>
<p><strong>Prérequis :</strong> compte Claude Pro ou Max. Rien de plus.</p>
<h3>Ce qui se passe concrètement</h3>
<p>Claude Code pointe sur un dossier de ton ordinateur et crée les fichiers à l'intérieur. C'est comme avoir quelqu'un qui travaille directement dans ton Finder, en temps réel.</p>
<h3>Étape 1 : Créer le dossier projet</h3>
<p>Dans <code>dev_projects</code>, crée un nouveau dossier avec un nom clair : <code>portfolio-2026</code>, <code>prototype-login</code>, <code>landing-client</code>. Sans espaces, sans majuscules, sans accents.</p>
<h3>Étape 2 : Pointer Claude Code sur ce dossier</h3>
<p><strong>Dans l'app Desktop :</strong> passe en mode Code, clique sur « Choose folder » et sélectionne ton dossier.</p>
<p><strong>Dans VSCode :</strong> ouvre VSCode, puis File > Open Folder, sélectionne ton dossier. Ouvre le terminal intégré (<code>Cmd+\`</code>) et lance <code>claude</code>.</p>
<h3>Étape 3 : Décrire ce qu'on veut construire</h3>
<pre><code class="language-plain">Crée un fichier index.html avec une page portfolio minimaliste.
Fond blanc, typographie sombre, une section hero avec mon nom
et mon titre, une grille de 6 projets avec titre et description,
un footer avec mes liens. Utilise Tailwind CSS via CDN.</code></pre>
<h3>Étape 4 : Itérer et déployer</h3>
<pre><code class="language-bash">vercel          # URL de prévisualisation
vercel --prod   # URL publique définitive</code></pre>
<blockquote>Le chemin A ne passe pas par GitHub. Tes fichiers existent uniquement sur ton ordinateur (et sur Vercel si tu déploies). C'est suffisant pour la plupart des prototypes et projets solo.</blockquote>`,
        content_en: `<p><strong>When to use it:</strong> you have a clear idea, you want to build something from scratch without going through GitHub, and you want to move fast.</p>
<p><strong>Requirements:</strong> a Claude Pro or Max account. Nothing more.</p>
<h3>What happens in practice</h3>
<p>Claude Code points to a folder on your computer and creates files inside it. It's like having someone working directly in your Finder, in real time.</p>
<h3>Step 1: Create the project folder</h3>
<p>Inside <code>dev_projects</code>, create a new folder with a clear name: <code>portfolio-2026</code>, <code>prototype-login</code>, <code>landing-client</code>. No spaces, no capitals, no accents.</p>
<h3>Step 2: Point Claude Code at that folder</h3>
<p><strong>In the Desktop app:</strong> switch to Code mode, click "Choose folder" and select your folder.</p>
<p><strong>In VSCode:</strong> open VSCode, then File > Open Folder, select your folder. Open the integrated terminal (<code>Cmd+\`</code>) and run <code>claude</code>.</p>
<h3>Step 3: Describe what you want to build</h3>
<pre><code class="language-plain">Create an index.html file with a minimal portfolio page.
White background, dark typography, a hero section with my name
and title, a grid of 6 projects with title and description,
a footer with my links. Use Tailwind CSS via CDN.</code></pre>
<h3>Step 4: Iterate and deploy</h3>
<pre><code class="language-bash">vercel          # Preview URL
vercel --prod   # Final public URL</code></pre>
<blockquote>Path A doesn't go through GitHub. Your files exist only on your computer (and on Vercel if you deploy). That's enough for most prototypes and solo projects.</blockquote>`,
      },
      {
        heading_fr: 'Approche 2 : Prototyper dans un artifact Claude, puis migrer',
        heading_en: 'Approach 2: Prototype in a Claude artifact, then migrate',
        content_fr: `<p><strong>Quand l'utiliser :</strong> tu veux explorer rapidement plusieurs directions visuelles avant de t'engager sur une structure de fichiers.</p>
<p><strong>Prérequis :</strong> compte Claude (même gratuit pour le prototypage initial), Git, compte GitHub, VSCode.</p>
<h3>L'idée</h3>
<p>Claude chat peut générer du HTML directement dans un artifact : une fenêtre d'aperçu qui s'ouvre dans la conversation. Tu vois le résultat en temps réel, tu peux demander des modifications, et quand l'interface te convient, tu récupères le code source.</p>
<blockquote>Les artifacts HTML sont particulièrement utiles pour explorer des layouts, tester des palettes de couleurs, ou montrer une direction à un client en quelques minutes.</blockquote>
<h3>Les étapes</h3>
<ol>
<li>Prototyper dans un artifact Claude</li>
<li>Récupérer le code HTML (clic sur l'artifact, copier le code)</li>
<li>Créer un repository GitHub</li>
<li>Ajouter le fichier HTML au repository</li>
<li>Cloner le repository dans VSCode (<code>Cmd+Shift+P</code> > <code>Git: Clone</code>)</li>
<li>Lancer <code>claude</code> dans le terminal et continuer l'itération</li>
<li>Synchroniser avec GitHub et déployer</li>
</ol>
<pre><code class="language-bash">git add .
git commit -m "Ajout section hero et navigation"
git push origin main
vercel --prod</code></pre>
<blockquote>Gain de temps : Claude Code peut gérer tout le processus Git à ta place. Dis-lui simplement « sauvegarde les modifications avec le message "refonte navigation" et pousse sur GitHub ».</blockquote>`,
        content_en: `<p><strong>When to use it:</strong> you want to quickly explore several visual directions before committing to a file structure.</p>
<p><strong>Requirements:</strong> a Claude account (even a free one for initial prototyping), Git, a GitHub account, VSCode.</p>
<h3>The idea</h3>
<p>Claude chat can generate HTML directly in an artifact: a preview window that opens inside the conversation. You see the result in real time, you can ask for changes, and when the interface looks right, you grab the source code.</p>
<blockquote>HTML artifacts are particularly useful for exploring layouts, testing color palettes, or showing a direction to a client in a matter of minutes.</blockquote>
<h3>The steps</h3>
<ol>
<li>Prototype in a Claude artifact</li>
<li>Copy the HTML code (click the artifact, copy the code)</li>
<li>Create a GitHub repository</li>
<li>Add the HTML file to the repository</li>
<li>Clone the repository in VSCode (<code>Cmd+Shift+P</code> > <code>Git: Clone</code>)</li>
<li>Run <code>claude</code> in the integrated terminal and keep iterating</li>
<li>Sync with GitHub and deploy</li>
</ol>
<pre><code class="language-bash">git add .
git commit -m "Add hero section and navigation"
git push origin main
vercel --prod</code></pre>
<blockquote>Time saver: Claude Code can handle the entire Git process for you. Just tell it: "save the changes with the message 'navigation redesign' and push to GitHub".</blockquote>`,
      },
      {
        heading_fr: 'Approche 3 : Démarrer dans un autre outil IA',
        heading_en: 'Approach 3: Start in another AI tool',
        content_fr: `<p><strong>Quand l'utiliser :</strong> tu veux une interface visuellement aboutie très rapidement, ou tu veux exploiter les forces spécifiques d'un autre outil pour la phase exploratoire.</p>
<h3>Ce que chaque outil apporte</h3>
<p><strong><a href="https://lovable.dev/" target="_blank" rel="noopener">Lovable</a></strong> génère des applications React complètes. Il exporte nativement vers GitHub en un clic, ce qui en fait le plus simple à connecter à Claude Code.</p>
<p><strong><a href="https://aistudio.google.com/" target="_blank" rel="noopener">Google AI Studio</a></strong> avec Gemini est particulièrement fort sur les interfaces data-heavy, les tableaux de bord, et les composants avec logique métier.</p>
<p><strong><a href="https://bolt.new/" target="_blank" rel="noopener">Bolt</a></strong> et <strong><a href="https://v0.dev/" target="_blank" rel="noopener">v0</a></strong> (Vercel) exportent aussi vers GitHub et génèrent des interfaces React avec des composants Shadcn.</p>
<h3>Étapes pour Lovable vers Claude Code</h3>
<ol>
<li>Crée et développe l'interface dans Lovable.</li>
<li>Clique sur « Connect to GitHub » dans Lovable.</li>
<li>Clone l'URL GitHub dans VSCode.</li>
<li>Lance <code>claude</code> dans le terminal intégré.</li>
<li>Continue l'itération avec Claude Code.</li>
</ol>
<blockquote>Avant de commencer à modifier quoi que ce soit, donne d'abord cette instruction à Claude Code : « Lis la structure du projet, identifie le stack utilisé et les conventions existantes. Résume-les avant de faire quoi que ce soit. »</blockquote>`,
        content_en: `<p><strong>When to use it:</strong> you want a visually polished interface very quickly, or you want to leverage the specific strengths of another tool for the exploratory phase.</p>
<h3>What each tool brings</h3>
<p><strong><a href="https://lovable.dev/" target="_blank" rel="noopener">Lovable</a></strong> generates complete React applications. It exports natively to GitHub in one click, making it the simplest to connect to Claude Code.</p>
<p><strong><a href="https://aistudio.google.com/" target="_blank" rel="noopener">Google AI Studio</a></strong> with Gemini is particularly strong for data-heavy interfaces, dashboards, and components with business logic.</p>
<p><strong><a href="https://bolt.new/" target="_blank" rel="noopener">Bolt</a></strong> and <strong><a href="https://v0.dev/" target="_blank" rel="noopener">v0</a></strong> (Vercel) also export to GitHub and generate React interfaces with Shadcn components.</p>
<h3>Steps for Lovable to Claude Code</h3>
<ol>
<li>Build and develop the interface in Lovable.</li>
<li>Click "Connect to GitHub" in Lovable.</li>
<li>Clone the GitHub URL in VSCode.</li>
<li>Run <code>claude</code> in the integrated terminal.</li>
<li>Keep iterating with Claude Code.</li>
</ol>
<blockquote>Before changing anything, give Claude Code this instruction first: "Read the project structure, identify the stack and existing conventions. Summarize them before doing anything."</blockquote>`,
      },
      {
        heading_fr: 'GitHub : les quatre concepts essentiels',
        heading_en: 'GitHub: the four essential concepts',
        content_fr: `<p>Si tu n'as jamais utilisé Git, voici les quatre notions que tu as besoin de comprendre. Pas plus.</p>
<p><strong>Repository</strong> : un dossier de projet hébergé sur GitHub, avec l'historique complet de toutes ses modifications.</p>
<p><strong>Clone</strong> : télécharger une copie d'un repo sur ton ordinateur, avec le lien maintenu vers GitHub.</p>
<p><strong>Commit</strong> : une sauvegarde nommée. <code>git commit -m "Refonte navigation"</code> crée un instantané du projet à cet état. L'équivalent de dupliquer un fichier Figma avant une grosse modification.</p>
<p><strong>Push</strong> : envoyer tes commits locaux vers GitHub. Sans <code>git push</code>, tes sauvegardes restent uniquement sur ton ordinateur.</p>
<p>Tu n'as pas besoin de comprendre les branches, les pull requests ou les conflits de merge pour démarrer.</p>`,
        content_en: `<p>If you've never used Git, here are the four things you need to understand. Nothing more.</p>
<p><strong>Repository</strong>: a project folder hosted on GitHub, with the complete history of all its changes.</p>
<p><strong>Clone</strong>: downloading a copy of a repo to your computer, with the connection to GitHub maintained.</p>
<p><strong>Commit</strong>: a named save. <code>git commit -m "Navigation redesign"</code> creates a snapshot of the project at that point. The equivalent of duplicating a Figma file before a major change.</p>
<p><strong>Push</strong>: sending your local commits to GitHub. Without <code>git push</code>, your saves exist only on your computer.</p>
<p>You don't need to understand branches, pull requests, or merge conflicts to get started.</p>`,
      },
      {
        heading_fr: 'Tableau de comparaison',
        heading_en: 'Comparison table',
        content_fr: `<table><thead><tr><th></th><th>Chemin A</th><th>Chemin B</th><th>Chemin C</th></tr></thead><tbody>
<tr><td>Départ</td><td>Dossier vide</td><td>Artifact Claude</td><td>Lovable / Gemini / Bolt</td></tr>
<tr><td>Configuration</td><td>Minimale</td><td>Modérée</td><td>Modérée</td></tr>
<tr><td>Vitesse de démarrage</td><td>Rapide</td><td>Très rapide</td><td>La plus rapide</td></tr>
<tr><td>Contrôle sur la structure</td><td>Total dès le départ</td><td>Total après migration</td><td>À reprendre après migration</td></tr>
<tr><td>Idéal pour</td><td>Specs claires</td><td>Exploration visuelle</td><td>UI complexe dès le départ</td></tr>
<tr><td>Prérequis</td><td>Claude Pro/Max</td><td>Git + GitHub + VSCode</td><td>Git + GitHub + VSCode + compte outil</td></tr>
</tbody></table>`,
        content_en: `<table><thead><tr><th></th><th>Path A</th><th>Path B</th><th>Path C</th></tr></thead><tbody>
<tr><td>Starting point</td><td>Empty folder</td><td>Claude artifact</td><td>Lovable / Gemini / Bolt</td></tr>
<tr><td>Setup</td><td>Minimal</td><td>Moderate</td><td>Moderate</td></tr>
<tr><td>Speed to start</td><td>Fast</td><td>Very fast</td><td>Fastest</td></tr>
<tr><td>Control over structure</td><td>Full from the start</td><td>Full after migration</td><td>To reclaim after migration</td></tr>
<tr><td>Best for</td><td>Clear specs</td><td>Visual exploration</td><td>Complex UI from the start</td></tr>
<tr><td>Requirements</td><td>Claude Pro/Max</td><td>Git + GitHub + VSCode</td><td>Git + GitHub + VSCode + tool account</td></tr>
</tbody></table>`,
      },
    ],
  },
  {
    number: 4,
    title_fr: 'Choisir sa stack',
    title_en: 'Choosing your stack',
    slug_fr: 'stack',
    slug_en: 'stack',
    intro_fr: 'HTML pur, React, Next.js, Tailwind, Shadcn. Ce que chaque choix implique et quelle combinaison fonctionne le mieux selon le type de projet.',
    intro_en: 'Plain HTML, React, Next.js, Tailwind, Shadcn. What each choice involves and which combination works best depending on the type of project.',
    sections: [
      {
        heading_fr: 'Les options disponibles',
        heading_en: 'The available options',
        content_fr: `<h3>HTML + CSS pur</h3>
<p>Le point de départ le plus simple. Pas de dépendances, pas de commandes d'installation. Tu crées un fichier <code>index.html</code>, tu l'ouvres dans un navigateur, tu vois le résultat.</p>
<p><strong>Convient pour :</strong> prototypes rapides, pages statiques, artifacts Claude, landing pages sans logique métier.</p>
<h3>React</h3>
<p>React est une bibliothèque JavaScript qui permet de construire des interfaces à partir de composants réutilisables. Un composant, c'est un bloc d'interface autonome : un bouton, une carte, une modale.</p>
<p><strong>Convient pour :</strong> interfaces avec de nombreux composants réutilisables, applications dynamiques, prototypes avec états et interactions.</p>
<h3>Next.js</h3>
<p>Next.js est un framework construit au-dessus de React. Il ajoute le routing entre pages, la gestion du déploiement, et des optimisations de performance.</p>
<pre><code class="language-bash">npx create-next-app@latest nom-du-projet
cd nom-du-projet
npm run dev</code></pre>
<h3>Tailwind CSS</h3>
<p>Tailwind n'est pas un framework de composants mais un système de classes utilitaires. Au lieu d'écrire du CSS dans un fichier séparé, tu appliques des classes directement dans le HTML : <code>bg-white</code>, <code>text-xl</code>, <code>p-6</code>, <code>rounded-lg</code>.</p>
<p><strong>Avantage pour les designers :</strong> les classes correspondent directement à des valeurs de design system (spacing scale, type scale, color palette).</p>
<h3>Shadcn/ui</h3>
<p>Shadcn/ui est une collection de composants d'interface prêts à l'emploi : boutons, modales, formulaires, menus, tableaux. Construits au-dessus de Radix UI et stylisés avec Tailwind CSS.</p>
<pre><code class="language-bash">npx shadcn-ui@latest add button</code></pre>
<h3>Framer Motion</h3>
<p>Bibliothèque d'animations pour React. Transitions, animations d'entrée/sortie, micro-interactions directement dans les composants.</p>
<h3>Astro</h3>
<p>Framework orienté contenu, conçu pour les sites statiques et les portfolios. Génère des pages très rapides en limitant le JavaScript au minimum.</p>`,
        content_en: `<h3>Plain HTML + CSS</h3>
<p>The simplest starting point. No dependencies, no install commands. You create an <code>index.html</code> file, open it in a browser, and see the result.</p>
<p><strong>Good for:</strong> quick prototypes, static pages, Claude artifacts, landing pages with no business logic.</p>
<h3>React</h3>
<p>React is a JavaScript library for building interfaces out of reusable components. A component is a self-contained UI block: a button, a card, a modal.</p>
<p><strong>Good for:</strong> interfaces with many reusable components, dynamic applications, prototypes with states and interactions.</p>
<h3>Next.js</h3>
<p>Next.js is a framework built on top of React. It adds page routing, deployment management, and performance optimizations.</p>
<pre><code class="language-bash">npx create-next-app@latest project-name
cd project-name
npm run dev</code></pre>
<h3>Tailwind CSS</h3>
<p>Tailwind is not a component framework but a utility class system. Instead of writing CSS in a separate file, you apply classes directly in the HTML: <code>bg-white</code>, <code>text-xl</code>, <code>p-6</code>, <code>rounded-lg</code>.</p>
<p><strong>Advantage for designers:</strong> the classes map directly to design system values (spacing scale, type scale, color palette).</p>
<h3>Shadcn/ui</h3>
<p>Shadcn/ui is a collection of ready-to-use UI components: buttons, modals, forms, menus, tables. Built on top of Radix UI and styled with Tailwind CSS.</p>
<pre><code class="language-bash">npx shadcn-ui@latest add button</code></pre>
<h3>Framer Motion</h3>
<p>An animation library for React. Transitions, enter/exit animations, micro-interactions directly inside components.</p>
<h3>Astro</h3>
<p>A content-oriented framework designed for static sites and portfolios. Generates very fast pages by keeping JavaScript to a minimum.</p>`,
      },
      {
        heading_fr: 'Quelle combinaison choisir',
        heading_en: 'Which combination to choose',
        content_fr: `<p><strong>Pour explorer et prototyper rapidement :</strong><br/>HTML + CSS + Tailwind (via CDN, sans installation)</p>
<p><strong>Pour la plupart des projets design :</strong><br/>Next.js + Tailwind CSS + Shadcn/ui</p>
<p>C'est la combinaison qui couvre le plus de cas d'usage. Next.js gère le routing et le déploiement, Tailwind remplace les feuilles de style, et Shadcn/ui fournit des composants prêts à l'emploi.</p>
<p><strong>Pour les prototypes avec animations :</strong><br/>Next.js + Tailwind + Framer Motion</p>
<p><strong>Pour un portfolio ou un site statique :</strong><br/>Astro + Tailwind</p>`,
        content_en: `<p><strong>For exploring and prototyping quickly:</strong><br/>HTML + CSS + Tailwind (via CDN, no installation required)</p>
<p><strong>For most design projects:</strong><br/>Next.js + Tailwind CSS + Shadcn/ui</p>
<p>This combination covers the widest range of use cases. Next.js handles routing and deployment, Tailwind replaces stylesheets, and Shadcn/ui provides ready-to-use components.</p>
<p><strong>For prototypes with animations:</strong><br/>Next.js + Tailwind + Framer Motion</p>
<p><strong>For a portfolio or static site:</strong><br/>Astro + Tailwind</p>`,
      },
      {
        heading_fr: 'Comment indiquer le stack à Claude Code',
        heading_en: 'How to tell Claude Code which stack you\'re using',
        content_fr: `<p>Au début d'une session, donne à Claude Code le contexte du projet. Deux façons de le faire :</p>
<p><strong>Dans le premier message :</strong></p>
<pre><code class="language-plain">Ce projet utilise Next.js 14, Tailwind CSS et Shadcn/ui.
Les composants Shadcn existants sont dans /components/ui.
Utilise les tokens de couleur définis dans tailwind.config.js.
Ne crée pas de nouveau composant si un composant Shadcn existant
peut faire l'affaire.</code></pre>
<p><strong>Dans un fichier CLAUDE.md à la racine du projet</strong> (voir page 7) : Claude lit ce fichier au démarrage de chaque session. Les instructions s'appliquent automatiquement sans avoir à les répéter.</p>`,
        content_en: `<p>At the start of a session, give Claude Code the project context. Two ways to do it:</p>
<p><strong>In your first message:</strong></p>
<pre><code class="language-plain">This project uses Next.js 14, Tailwind CSS, and Shadcn/ui.
Existing Shadcn components are in /components/ui.
Use the color tokens defined in tailwind.config.js.
Don't create a new component if an existing Shadcn component can do the job.</code></pre>
<p><strong>In a CLAUDE.md file at the root of the project</strong> (see chapter 7): Claude reads this file at the start of every session. The instructions apply automatically without having to repeat them.</p>`,
      },
    ],
  },
  {
    number: 5,
    title_fr: 'Itérer et affiner visuellement',
    title_en: 'Iterating and refining visually',
    slug_fr: 'iterer',
    slug_en: 'iterating',
    intro_fr: 'L\'app Desktop pas à pas, VSCode + fenêtre compagnon, le workflow VSCode terminal, et les techniques pour obtenir des résultats précis.',
    intro_en: 'The Desktop app step by step, VSCode + companion window, the VSCode terminal workflow, and techniques for getting precise results.',
    sections: [
      {
        heading_fr: 'L\'app Desktop pas à pas',
        heading_en: 'The Desktop app step by step',
        content_fr: `<h3>Étape 1 : Passer en mode Code</h3>
<p>En haut de l'app Claude Desktop, un toggle permet de passer de Chat à Code.</p>
<h3>Étape 2 : Configurer l'environnement</h3>
<p><strong>Environnement</strong> : choisir « Local » pour travailler sur des fichiers sur ton ordinateur.</p>
<p><strong>Dossier projet</strong> : sélectionner le dossier dans <code>dev_projects</code>.</p>
<p><strong>Modèle</strong> : Sonnet est rapide et capable pour la plupart des tâches. Opus est plus puissant mais consomme plus de quota mensuel.</p>
<p><strong>Mode de permissions</strong> : commence avec « Ask permissions » pour que Claude demande confirmation avant chaque modification.</p>
<img src="/images/guide-claude-code/ch5-desktop-config.png" alt="Configuration de l'app Desktop Claude Code" />
<h3>Étape 3 : Donner les premières instructions</h3>
<pre><code class="language-plain">Crée une page portfolio avec trois sections : hero avec mon nom
et mon titre en 72px, grille de 6 projets en 2 colonnes avec
titre et description courte, footer avec liens LinkedIn et email.
Fond #F8F9FB, texte #1E1E1E, accent #295FEC.
Utilise Tailwind CSS via CDN. Responsive mobile en priorité.</code></pre>
<h3>Étape 4 : Utiliser la prévisualisation live</h3>
<p><strong>Cliquer directement sur les éléments</strong> : dans la fenêtre de prévisualisation, clique sur n'importe quel élément. Claude reçoit le contexte exact de l'élément sélectionné.</p>
<p><strong>La vue diff</strong> : quand Claude modifie un fichier, un diff s'affiche : lignes ajoutées en vert, lignes supprimées en rouge.</p>`,
        content_en: `<h3>Step 1: Switch to Code mode</h3>
<p>At the top of the Claude Desktop app, a toggle lets you switch from Chat to Code.</p>
<h3>Step 2: Configure the environment</h3>
<p><strong>Environment</strong>: choose "Local" to work with files on your computer.</p>
<p><strong>Project folder</strong>: select the folder inside <code>dev_projects</code>.</p>
<p><strong>Model</strong>: Sonnet is fast and capable for most tasks. Opus is more powerful but uses more of your monthly quota.</p>
<p><strong>Permissions mode</strong>: start with "Ask permissions" so Claude asks for confirmation before each modification.</p>
<img src="/images/guide-claude-code/ch5-desktop-config.png" alt="Claude Code Desktop app configuration" />
<h3>Step 3: Give your first instructions</h3>
<pre><code class="language-plain">Create a portfolio page with three sections: a hero with my name
and title at 72px, a 6-project grid in 2 columns with
title and short description, a footer with LinkedIn and email links.
Background #F8F9FB, text #1E1E1E, accent #295FEC.
Use Tailwind CSS via CDN. Mobile-first responsive.</code></pre>
<h3>Step 4: Use the live preview</h3>
<p><strong>Click directly on elements</strong>: in the preview window, click on any element. Claude receives the exact context of the selected element.</p>
<p><strong>The diff view</strong>: when Claude modifies a file, a diff is displayed: added lines in green, removed lines in red.</p>`,
      },
      {
        heading_fr: 'VSCode + fenêtre compagnon Claude Code',
        heading_en: 'VSCode + Claude Code companion window',
        content_fr: `<p>C'est la configuration que j'utilise le plus au quotidien, et celle que je recommande aux designers qui veulent aller au-delà de l'exploration ponctuelle.</p>
<p>VSCode occupe la moitié gauche de l'écran avec les fichiers du projet, et Claude Code tourne dans une fenêtre de conversation séparée à droite. Les deux pointent sur le même dossier.</p>
<h3>Prérequis : installer l'extension Claude Code dans VSCode</h3>
<ol>
<li>Dans VSCode, ouvre le panneau Extensions : <code>Cmd+Shift+X</code></li>
<li>Cherche <strong>Claude Code</strong></li>
<li>Sélectionne l'extension publiée par <strong>Anthropic</strong> et clique sur Installer</li>
</ol>
<img src="/images/guide-claude-code/ch5-vscode-extension.png" alt="Extension Claude Code dans le marketplace VSCode" />
<h3>Mise en place</h3>
<ol>
<li><strong>Ouvrir le projet dans VSCode</strong> : File > Open Folder</li>
<li><strong>Ouvrir la fenêtre compagnon</strong> : cliquer sur l'icône Claude dans la barre latérale</li>
<li><strong>Mettre les deux fenêtres côte à côte</strong> : 60 % VSCode / 40 % compagnon sur un écran large</li>
<li><strong>Vérifier que Claude voit les fichiers</strong> : « Lis la structure du projet et résume ce qu'il contient. »</li>
</ol>
<img src="/images/guide-claude-code/ch5-vscode-companion.png" alt="VSCode + Compagnon Claude Code" />
<h3>Travailler dans cette configuration</h3>
<p><strong>Donner des instructions précises :</strong></p>
<pre><code class="language-plain">Modifie le composant HeroSection.jsx :
- padding top et bottom à 80px
- titre en 48px, weight 800, couleur #1E1E1E
- sous-titre en 20px, couleur #6B7280
- espace entre titre et sous-titre : 16px</code></pre>
<p><strong>Copier-coller depuis l'éditeur :</strong> sélectionne un passage dans l'éditeur et colle-le dans le chat avec ton instruction.</p>
<p><strong>Déléguer Git :</strong> « Sauvegarde les modifications avec le message "hero: refonte typographie" et pousse sur GitHub. »</p>
<blockquote>Organisation de l'espace sur Mac : trois espaces Mission Control. Espace 1 : VSCode + compagnon. Espace 2 : navigateur avec la preview. Espace 3 : Figma.</blockquote>`,
        content_en: `<p>This is the setup I use most on a daily basis, and the one I recommend to designers who want to go beyond occasional exploration.</p>
<p>VSCode takes up the left half of the screen with the project files, and Claude Code runs in a separate conversation window on the right. Both point to the same folder.</p>
<h3>Prerequisite: install the Claude Code extension in VSCode</h3>
<ol>
<li>In VSCode, open the Extensions panel: <code>Cmd+Shift+X</code></li>
<li>Search for <strong>Claude Code</strong></li>
<li>Select the extension published by <strong>Anthropic</strong> and click Install</li>
</ol>
<img src="/images/guide-claude-code/ch5-vscode-extension.png" alt="Claude Code extension in the VSCode marketplace" />
<h3>Setup</h3>
<ol>
<li><strong>Open the project in VSCode</strong>: File > Open Folder</li>
<li><strong>Open the companion window</strong>: click the Claude icon in the sidebar</li>
<li><strong>Place the two windows side by side</strong>: 60% VSCode / 40% companion on a wide screen</li>
<li><strong>Verify Claude can see the files</strong>: "Read the project structure and summarize what it contains."</li>
</ol>
<img src="/images/guide-claude-code/ch5-vscode-companion.png" alt="VSCode + Claude Code companion window" />
<h3>Working in this setup</h3>
<p><strong>Give precise instructions:</strong></p>
<pre><code class="language-plain">Update the HeroSection.jsx component:
- top and bottom padding to 80px
- title at 48px, weight 800, color #1E1E1E
- subtitle at 20px, color #6B7280
- space between title and subtitle: 16px</code></pre>
<p><strong>Copy-paste from the editor:</strong> select a passage in the editor and paste it into the chat along with your instruction.</p>
<p><strong>Delegate Git:</strong> "Save the changes with the message 'hero: typography rework' and push to GitHub."</p>
<blockquote>Organizing your screen space on Mac: three Mission Control spaces. Space 1: VSCode + companion. Space 2: browser with the preview. Space 3: Figma.</blockquote>`,
      },
      {
        heading_fr: 'VSCode + Terminal intégré',
        heading_en: 'VSCode + integrated terminal',
        content_fr: `<img src="/images/guide-claude-code/ch5-vscode-terminal.png" alt="VSCode avec Claude Code dans le terminal intégré" />
<p><strong>Ouvrir le terminal intégré :</strong> <code>Cmd+\`</code> (backtick)</p>
<p><strong>Lancer Claude Code :</strong> <code>claude</code></p>
<p><strong>Prévisualiser le résultat :</strong></p>
<ul>
<li>HTML statique : clic droit sur <code>index.html</code> > Open with Live Server</li>
<li>Projet Next.js : <code>npm run dev</code> dans un second terminal, puis ouvre <code>localhost:3000</code></li>
</ul>`,
        content_en: `<img src="/images/guide-claude-code/ch5-vscode-terminal.png" alt="VSCode with Claude Code in the integrated terminal" />
<p><strong>Open the integrated terminal:</strong> <code>Cmd+\`</code> (backtick)</p>
<p><strong>Launch Claude Code:</strong> <code>claude</code></p>
<p><strong>Preview the result:</strong></p>
<ul>
<li>Static HTML: right-click on <code>index.html</code> > Open with Live Server</li>
<li>Next.js project: <code>npm run dev</code> in a second terminal, then open <code>localhost:3000</code></li>
</ul>`,
      },
      {
        heading_fr: 'Techniques pour obtenir de meilleurs résultats',
        heading_en: 'Techniques for getting better results',
        content_fr: `<h3>Être aussi précis qu'une redline</h3>
<p>Claude Code répond à la précision. « Améliore le rendu » ne donne rien. « Augmente le padding à 24px, passe le titre en 32px semibold, réduis l'espacement entre les cartes à 16px » donne à Claude exactement ce dont il a besoin.</p>
<h3>Référencer les tokens existants</h3>
<pre><code class="language-plain">Utilise les CSS custom properties définies dans styles/tokens.css.
Ne crée pas de nouvelles valeurs de couleur ou d'espacement.</code></pre>
<h3>Montrer plutôt que décrire</h3>
<p>Glisse une maquette Figma ou un screenshot directement dans la conversation. Claude voit les images et les utilise comme contexte visuel.</p>
<h3>Construire par couches</h3>
<pre><code class="language-plain">Étape 1 : Crée la structure de la page avec le header et le footer.
Étape 2 : Ajoute la section hero.
Étape 3 : Ajoute la grille de projets.</code></pre>
<h3>Utiliser le mode Plan pour les tâches complexes</h3>
<pre><code class="language-plain">Explique comment tu structurerais ce projet avant d'écrire du code.
Liste les fichiers que tu vas créer et les dépendances nécessaires.</code></pre>
<h3>Revenir en arrière</h3>
<p>Si Claude fait une modification que tu n'aimes pas, dis « annule le dernier changement » ou « reviens à l'état précédent ».</p>`,
        content_en: `<h3>Be as precise as a redline</h3>
<p>Claude Code responds to precision. "Improve the look" gives nothing. "Increase the padding to 24px, set the title to 32px semibold, reduce the spacing between cards to 16px" gives Claude exactly what it needs.</p>
<h3>Reference existing tokens</h3>
<pre><code class="language-plain">Use the CSS custom properties defined in styles/tokens.css.
Do not create new color or spacing values.</code></pre>
<h3>Show rather than describe</h3>
<p>Drop a Figma mockup or a screenshot directly into the conversation. Claude sees images and uses them as visual context.</p>
<h3>Build in layers</h3>
<pre><code class="language-plain">Step 1: Create the page structure with the header and footer.
Step 2: Add the hero section.
Step 3: Add the project grid.</code></pre>
<h3>Use Plan mode for complex tasks</h3>
<pre><code class="language-plain">Explain how you would structure this project before writing any code.
List the files you will create and the dependencies needed.</code></pre>
<h3>Roll back</h3>
<p>If Claude makes a change you don't like, say "undo the last change" or "go back to the previous state".</p>`,
      },
      {
        heading_fr: 'Calibrer ses attentes',
        heading_en: 'Calibrating your expectations',
        content_fr: `<p>Claude Code couvre 60 à 80 % du chemin. Ce qui reste est de ta responsabilité.</p>
<p><strong>Le code sera fonctionnel mais pas toujours parfait.</strong> L'espacement peut être légèrement décalé. Le comportement responsive peut demander des ajustements. C'est normal.</p>
<p><strong>La qualité de tes inputs détermine la qualité des outputs.</strong> Une maquette propre avec des valeurs de tokens claires produit des résultats bien meilleurs qu'une description vague.</p>
<p><strong>Tu apprends un nouveau workflow.</strong> La première session sera plus lente. La troisième sera fluide. Par la dixième, le rythme sera naturel.</p>`,
        content_en: `<p>Claude Code covers 60 to 80% of the way there. What remains is your responsibility.</p>
<p><strong>The code will be functional but not always perfect.</strong> Spacing may be slightly off. Responsive behavior may need adjustments. That's normal.</p>
<p><strong>The quality of your inputs determines the quality of the outputs.</strong> A clean mockup with clear token values produces much better results than a vague description.</p>
<p><strong>You're learning a new workflow.</strong> The first session will be slower. By the third it will feel smooth. By the tenth, the rhythm will be second nature.</p>`,
      },
    ],
  },
  {
    number: 6,
    title_fr: 'Déployer avec Vercel',
    title_en: 'Deploying with Vercel',
    slug_fr: 'deployer',
    slug_en: 'deploying',
    intro_fr: 'De localhost à une URL publique. Vercel CLI, prévisualisation, production, variables d\'environnement, domaine personnalisé.',
    intro_en: 'From localhost to a public URL. Vercel CLI, preview deployments, production, environment variables, custom domain.',
    sections: [
      {
        heading_fr: 'Deux façons de déployer',
        heading_en: 'Two ways to deploy',
        content_fr: `<img src="/images/guide-claude-code/ch6-vercel-deploy.png" alt="Interface de déploiement Vercel" />
<p><strong>Vercel via GitHub (recommandé) :</strong> tu connectes ton repo GitHub à Vercel. À chaque <code>git push</code>, Vercel redéploie automatiquement.</p>
<p><strong>Vercel CLI :</strong> tu déploies depuis le terminal avec une commande. Plus direct, moins automatisé.</p>
<div class="callout"><strong>À noter :</strong> toutes les commandes de code ci-après peuvent être remplacées par des demandes à Claude dans la conversation. Ex : « À présent déploie en production sur Vercel ». Il mouline et déploie tout seul sur ton URL Vercel en prod.</div>`,
        content_en: `<img src="/images/guide-claude-code/ch6-vercel-deploy.png" alt="Vercel deployment interface" />
<p><strong>Vercel via GitHub (recommended):</strong> you connect your GitHub repo to Vercel. Every <code>git push</code> triggers an automatic redeployment.</p>
<p><strong>Vercel CLI:</strong> you deploy from the terminal with a command. More direct, less automated.</p>
<div class="callout"><strong>Worth noting:</strong> all the code commands below can be replaced by asking Claude in the conversation. For example: "Now deploy to production on Vercel." It processes the request and deploys on its own to your Vercel production URL.</div>`,
      },
      {
        heading_fr: 'Vercel CLI : installation et premier déploiement',
        heading_en: 'Vercel CLI: installation and first deployment',
        content_fr: `<pre><code class="language-bash">npm install -g vercel
vercel login</code></pre>
<p>Depuis le dossier de ton projet :</p>
<pre><code class="language-bash">vercel</code></pre>
<p>Vercel te pose quelques questions lors du premier déploiement. À la fin, il te retourne une <strong>URL de prévisualisation</strong> : une URL publique unique pour cette version.</p>
<h3>Déployer en production</h3>
<pre><code class="language-bash">vercel --prod</code></pre>
<p>Déploie la version actuelle en production et retourne l'URL publique définitive.</p>`,
        content_en: `<pre><code class="language-bash">npm install -g vercel
vercel login</code></pre>
<p>From your project folder:</p>
<pre><code class="language-bash">vercel</code></pre>
<p>Vercel asks a few questions on the first deployment. At the end, it returns a <strong>preview URL</strong>: a unique public URL for that version.</p>
<h3>Deploy to production</h3>
<pre><code class="language-bash">vercel --prod</code></pre>
<p>Deploys the current version to production and returns the definitive public URL.</p>`,
      },
      {
        heading_fr: 'Workflow type',
        heading_en: 'Typical workflow',
        content_fr: `<ol>
<li>Tu travailles en local avec Claude Code</li>
<li>Tu vérifies le résultat dans le navigateur (localhost)</li>
<li><code>vercel</code> : URL de prévisualisation, tu partages pour feedback</li>
<li>Tu intègres les retours</li>
<li><code>vercel --prod</code> : URL de production mise à jour</li>
</ol>`,
        content_en: `<ol>
<li>You work locally with Claude Code</li>
<li>You check the result in the browser (localhost)</li>
<li><code>vercel</code>: preview URL, you share it for feedback</li>
<li>You incorporate the feedback</li>
<li><code>vercel --prod</code>: production URL updated</li>
</ol>`,
      },
      {
        heading_fr: 'Variables d\'environnement',
        heading_en: 'Environment variables',
        content_fr: `<pre><code class="language-bash"># Ajouter une variable
vercel env add NOM_DE_LA_VARIABLE

# Lister les variables d'un projet
vercel env ls

# Supprimer une variable
vercel env rm NOM_DE_LA_VARIABLE</code></pre>
<p>Les variables sont stockées côté Vercel et injectées automatiquement à chaque déploiement. Ton fichier <code>.env.local</code> reste sur ton ordinateur, jamais dans le repo GitHub.</p>`,
        content_en: `<pre><code class="language-bash"># Add a variable
vercel env add VARIABLE_NAME

# List variables for a project
vercel env ls

# Remove a variable
vercel env rm VARIABLE_NAME</code></pre>
<p>Variables are stored on Vercel's side and injected automatically at each deployment. Your <code>.env.local</code> file stays on your computer, never in the GitHub repo.</p>`,
      },
      {
        heading_fr: 'Domaine personnalisé',
        heading_en: 'Custom domain',
        content_fr: `<pre><code class="language-bash">vercel domains add mon-domaine.fr</code></pre>
<p>Vercel t'indique ensuite les enregistrements DNS à configurer. La propagation prend entre quelques minutes et 48 heures. Vercel génère automatiquement le certificat SSL.</p>`,
        content_en: `<pre><code class="language-bash">vercel domains add my-domain.com</code></pre>
<p>Vercel then tells you which DNS records to configure. Propagation takes anywhere from a few minutes to 48 hours. Vercel automatically generates the SSL certificate.</p>`,
      },
      {
        heading_fr: 'Vercel via GitHub : connexion automatique',
        heading_en: 'Vercel via GitHub: automatic connection',
        content_fr: `<ol>
<li>Va sur <a href="https://vercel.com/" target="_blank" rel="noopener">vercel.com</a> et connecte ton compte GitHub.</li>
<li>Importe ton repository.</li>
<li>Vercel configure le projet automatiquement.</li>
<li>À chaque <code>git push origin main</code>, Vercel redéploie automatiquement.</li>
</ol>
<p>Tu n'as plus à taper <code>vercel --prod</code> manuellement. Chaque modification poussée sur la branche principale est en production en quelques secondes.</p>`,
        content_en: `<ol>
<li>Go to <a href="https://vercel.com/" target="_blank" rel="noopener">vercel.com</a> and connect your GitHub account.</li>
<li>Import your repository.</li>
<li>Vercel configures the project automatically.</li>
<li>Every <code>git push origin main</code> triggers an automatic redeployment.</li>
</ol>
<p>You no longer need to type <code>vercel --prod</code> manually. Every change pushed to the main branch is in production within seconds.</p>`,
      },
    ],
  },
  {
    number: 7,
    title_fr: 'Aller plus loin',
    title_en: 'Going further',
    slug_fr: 'aller-plus-loin',
    slug_en: 'going-further',
    intro_fr: 'CLAUDE.md, skills, commandes Git essentielles, terminal, ressources.',
    intro_en: 'CLAUDE.md, skills, essential Git commands, the terminal, and resources.',
    sections: [
      {
        heading_fr: 'Le fichier CLAUDE.md',
        heading_en: 'The CLAUDE.md file',
        content_fr: `<p>Un fichier texte nommé <code>CLAUDE.md</code>, placé à la racine d'un projet, que Claude Code lit automatiquement au début de chaque session. C'est l'équivalent d'un brief permanent.</p>
<h3>Ce qu'on met dedans</h3>
<pre><code class="language-markdown"># Contexte projet

Stack : Next.js 14, Tailwind CSS, Shadcn/ui, TypeScript
Déploiement : Vercel

## Conventions

- Toujours utiliser les CSS custom properties définies dans globals.css
- Ne jamais installer de dépendance sans demander d'abord
- Utiliser les composants Shadcn existants avant d'en créer de nouveaux
- Nommer les composants en PascalCase, les fichiers en kebab-case

## Tokens design

Couleurs : #295FEC (bleu principal), #1E1E1E (texte), #F8F9FB (fond)
Typographie : Public Sans, weight 800 pour les titres
Espacement : base de 4px (utiliser les classes Tailwind)</code></pre>
<h3>Ce qu'on n'y met pas</h3>
<p>Pas de secrets, pas de clés API. Ce fichier peut finir dans ton repo GitHub.</p>
<blockquote>Conseil : crée un fichier CLAUDE.md de base pour chaque nouveau projet dès le départ. Même cinq lignes valent mieux que rien. Claude improvise moins quand il a un contexte.</blockquote>`,
        content_en: `<p>A text file named <code>CLAUDE.md</code>, placed at the root of a project, that Claude Code reads automatically at the start of every session. Think of it as a permanent brief.</p>
<h3>What goes in it</h3>
<pre><code class="language-markdown"># Project context

Stack: Next.js 14, Tailwind CSS, Shadcn/ui, TypeScript
Deployment: Vercel

## Conventions

- Always use the CSS custom properties defined in globals.css
- Never install a dependency without asking first
- Use existing Shadcn components before creating new ones
- Name components in PascalCase, files in kebab-case

## Design tokens

Colors: #295FEC (primary blue), #1E1E1E (text), #F8F9FB (background)
Typography: Public Sans, weight 800 for headings
Spacing: 4px base (use Tailwind classes)</code></pre>
<h3>What not to put in it</h3>
<p>No secrets, no API keys. This file may end up in your GitHub repo.</p>
<blockquote>Tip: create a basic CLAUDE.md for every new project from the start. Even five lines beat nothing. Claude improvises less when it has context.</blockquote>`,
      },
      {
        heading_fr: 'Skills Claude',
        heading_en: 'Claude skills',
        content_fr: `<p>Les skills sont des fichiers d'instructions que Claude applique automatiquement dans une session. Ils s'installent en quelques secondes et changent significativement la précision et la qualité des outputs.</p>
<p>Un skill pour la qualité visuelle, un skill pour la rédaction, un skill pour la recherche utilisateur : chacun oriente Claude dans la bonne direction dès l'ouverture de la conversation.</p>
<p>Les deux skills à installer en priorité :</p>
<ul>
<li><strong>frontend-design</strong> : interfaces de qualité production, typographie, hiérarchie visuelle</li>
<li><strong>ux-designer</strong> : recherche utilisateur et prototypage</li>
</ul>`,
        content_en: `<p>Skills are instruction files that Claude applies automatically within a session. They install in seconds and significantly improve the precision and quality of outputs.</p>
<p>One skill for visual quality, one for writing, one for user research: each points Claude in the right direction from the moment you open the conversation.</p>
<p>The two skills to install first:</p>
<ul>
<li><strong>frontend-design</strong>: production-quality interfaces, typography, visual hierarchy</li>
<li><strong>ux-designer</strong>: user research and prototyping</li>
</ul>`,
      },
      {
        heading_fr: 'Git : les commandes que tu utiliseras vraiment',
        heading_en: 'Git: the commands you will actually use',
        content_fr: `<pre><code class="language-bash"># Voir l'état du projet (quels fichiers ont été modifiés)
git status

# Sauvegarder toutes les modifications
git add .
git commit -m "Description de la modification"

# Envoyer vers GitHub
git push origin main

# Récupérer les dernières modifications depuis GitHub
git pull origin main

# Voir l'historique des sauvegardes
git log --oneline</code></pre>
<blockquote>Tu peux tout déléguer à Claude Code. « Sauvegarde les modifications avec le message "ajout section témoignages" et pousse sur GitHub » : il exécute les trois commandes à ta place.</blockquote>`,
        content_en: `<pre><code class="language-bash"># See the project status (which files have been modified)
git status

# Save all changes
git add .
git commit -m "Description of the change"

# Push to GitHub
git push origin main

# Pull the latest changes from GitHub
git pull origin main

# View the history of saves
git log --oneline</code></pre>
<blockquote>You can delegate all of this to Claude Code. "Save the changes with the message 'add testimonials section' and push to GitHub": it runs all three commands for you.</blockquote>`,
      },
      {
        heading_fr: 'Le terminal : ce qu\'il débloque',
        heading_en: 'The terminal: what it unlocks',
        content_fr: `<p><strong>Automatisation.</strong> Tu peux demander à Claude de travailler sur une liste de tâches en continu, sans te demander confirmation à chaque étape.</p>
<p><strong>Mode sans interruption.</strong> Le flag <code>--dangerously-skip-permissions</code> désactive les confirmations systématiques. Claude applique les changements en continu.</p>
<p><strong>Intégration dans des pipelines.</strong> Claude Code peut être intégré dans des scripts automatisés, des actions GitHub, ou des processus CI/CD.</p>`,
        content_en: `<p><strong>Automation.</strong> You can ask Claude to work through a list of tasks continuously, without asking for confirmation at each step.</p>
<p><strong>Uninterrupted mode.</strong> The <code>--dangerously-skip-permissions</code> flag disables the systematic confirmation prompts. Claude applies changes continuously.</p>
<p><strong>Integration into pipelines.</strong> Claude Code can be integrated into automated scripts, GitHub Actions, or CI/CD processes.</p>`,
      },
      {
        heading_fr: 'Ressources',
        heading_en: 'Resources',
        content_fr: `<h3>Claude Code</h3>
<ul>
<li><a href="https://docs.anthropic.com/fr/docs/claude-code/overview" target="_blank" rel="noopener">Documentation officielle Claude Code</a></li>
<li><a href="https://claude.ai/download" target="_blank" rel="noopener">Télécharger l'app Desktop Claude</a></li>
</ul>
<h3>Outils</h3>
<ul>
<li><a href="https://code.visualstudio.com/" target="_blank" rel="noopener">VSCode</a></li>
<li><a href="https://vercel.com/docs/cli" target="_blank" rel="noopener">Vercel CLI</a></li>
<li><a href="https://git-scm.com/" target="_blank" rel="noopener">Git</a></li>
<li><a href="https://github.com/" target="_blank" rel="noopener">GitHub</a></li>
</ul>
<h3>Stack</h3>
<ul>
<li><a href="https://nextjs.org/docs" target="_blank" rel="noopener">Next.js</a></li>
<li><a href="https://tailwindcss.com/docs" target="_blank" rel="noopener">Tailwind CSS</a></li>
<li><a href="https://ui.shadcn.com/" target="_blank" rel="noopener">Shadcn/ui</a></li>
<li><a href="https://www.framer.com/motion/" target="_blank" rel="noopener">Framer Motion</a></li>
<li><a href="https://astro.build/" target="_blank" rel="noopener">Astro</a></li>
</ul>
<h3>Figma MCP</h3>
<ul>
<li><a href="https://docs.figma-console-mcp.southleft.com/" target="_blank" rel="noopener">Figma Console MCP, documentation</a></li>
</ul>
<h3>Outils d'exploration IA</h3>
<ul>
<li><a href="https://lovable.dev/" target="_blank" rel="noopener">Lovable</a></li>
<li><a href="https://bolt.new/" target="_blank" rel="noopener">Bolt</a></li>
<li><a href="https://v0.dev/" target="_blank" rel="noopener">v0</a></li>
<li><a href="https://aistudio.google.com/" target="_blank" rel="noopener">Google AI Studio</a></li>
</ul>`,
        content_en: `<h3>Claude Code</h3>
<ul>
<li><a href="https://docs.anthropic.com/fr/docs/claude-code/overview" target="_blank" rel="noopener">Official Claude Code documentation</a></li>
<li><a href="https://claude.ai/download" target="_blank" rel="noopener">Download the Claude Desktop app</a></li>
</ul>
<h3>Tools</h3>
<ul>
<li><a href="https://code.visualstudio.com/" target="_blank" rel="noopener">VSCode</a></li>
<li><a href="https://vercel.com/docs/cli" target="_blank" rel="noopener">Vercel CLI</a></li>
<li><a href="https://git-scm.com/" target="_blank" rel="noopener">Git</a></li>
<li><a href="https://github.com/" target="_blank" rel="noopener">GitHub</a></li>
</ul>
<h3>Stack</h3>
<ul>
<li><a href="https://nextjs.org/docs" target="_blank" rel="noopener">Next.js</a></li>
<li><a href="https://tailwindcss.com/docs" target="_blank" rel="noopener">Tailwind CSS</a></li>
<li><a href="https://ui.shadcn.com/" target="_blank" rel="noopener">Shadcn/ui</a></li>
<li><a href="https://www.framer.com/motion/" target="_blank" rel="noopener">Framer Motion</a></li>
<li><a href="https://astro.build/" target="_blank" rel="noopener">Astro</a></li>
</ul>
<h3>Figma MCP</h3>
<ul>
<li><a href="https://docs.figma-console-mcp.southleft.com/" target="_blank" rel="noopener">Figma Console MCP, documentation</a></li>
</ul>
<h3>AI exploration tools</h3>
<ul>
<li><a href="https://lovable.dev/" target="_blank" rel="noopener">Lovable</a></li>
<li><a href="https://bolt.new/" target="_blank" rel="noopener">Bolt</a></li>
<li><a href="https://v0.dev/" target="_blank" rel="noopener">v0</a></li>
<li><a href="https://aistudio.google.com/" target="_blank" rel="noopener">Google AI Studio</a></li>
</ul>`,
      },
    ],
  },
  {
    number: 8,
    title_fr: 'Obtenir un résultat visuel de qualité',
    title_en: 'Getting a high-quality visual result',
    slug_fr: 'resultat-visuel',
    slug_en: 'visual-quality',
    intro_fr: 'Skills à activer, prompts pour le style visuel, Framer Motion, Shadcn/ui, états de chargement, progressive disclosure, et connexion Figma Console MCP.',
    intro_en: 'Skills to activate, prompts for visual style, Framer Motion, Shadcn/ui, loading states, progressive disclosure, and Figma Console MCP connection.',
    sections: [
      {
        heading_fr: 'Définir le style visuel dès le premier prompt',
        heading_en: 'Set the visual style in your first prompt',
        content_fr: `<p>Le style graphique se pose au début, pas après coup. Une fois que Claude a généré plusieurs fichiers dans une direction stylistique, revenir en arrière demande de tout reprendre.</p>
<h3>Prompt : style macOS / iPadOS</h3>
<pre><code class="language-plain">Un style, des composants, des animations et transitions dans le
style de macOS et iPadOS, avec Liquid Glass. Éviter le violet.
Éviter les emojis et remplacer par des icônes de la librairie
Lucide React. Typographie moderne grotesque sans-serif, avec
plusieurs niveaux de typescales pour un résultat professionnel.
Privilégier des composants de taille small et medium, mieux
adaptés à une interface de productivité avec beaucoup de données
affichées.</code></pre>
<blockquote>Ce prompt peut être intégré dans <code>CLAUDE.md</code> pour s'appliquer automatiquement à chaque session du projet.</blockquote>`,
        content_en: `<p>The visual style is established at the start, not as an afterthought. Once Claude has generated several files in one stylistic direction, going back means starting over.</p>
<h3>Prompt: macOS / iPadOS style</h3>
<pre><code class="language-plain">A style, components, animations and transitions in the style
of macOS and iPadOS, with Liquid Glass. Avoid purple.
Avoid emojis and replace them with icons from the
Lucide React library. Modern grotesque sans-serif typography,
with multiple typescale levels for a professional result.
Prefer small and medium-sized components, better
suited to a productivity interface with lots of data
displayed.</code></pre>
<blockquote>This prompt can be added to <code>CLAUDE.md</code> so it applies automatically at every project session.</blockquote>`,
      },
      {
        heading_fr: 'Micro-interactions et animations avec Framer Motion',
        heading_en: 'Micro-interactions and animations with Framer Motion',
        content_fr: `<pre><code class="language-plain">Implémenter les micro-interactions, animations et transitions
avec Framer Motion. Suivre les Human Interface Guidelines
d'Apple pour les animations : durées courtes (150-300ms),
easing naturel, feedback immédiat après chaque action
utilisateur. Pour les composants web, appliquer également
les principes Material Design sur les transitions d'état
et les élévations.</code></pre>
<p><strong>Ce que ce prompt couvre :</strong></p>
<ul>
<li>Animations d'entrée et de sortie des éléments dans le DOM</li>
<li>Transitions entre états (hover, focus, active, disabled)</li>
<li>Feedback visuel après action (confirmation, erreur, chargement)</li>
<li>Cohérence des mouvements entre les différentes vues</li>
</ul>`,
        content_en: `<pre><code class="language-plain">Implement micro-interactions, animations and transitions
with Framer Motion. Follow Apple's Human Interface Guidelines
for animations: short durations (150-300ms),
natural easing, immediate feedback after each user action.
For web components, also apply the Material Design
principles for state transitions and elevations.</code></pre>
<p><strong>What this prompt covers:</strong></p>
<ul>
<li>Enter and exit animations for elements in the DOM</li>
<li>State transitions (hover, focus, active, disabled)</li>
<li>Visual feedback after an action (confirmation, error, loading)</li>
<li>Consistent motion across different views</li>
</ul>`,
      },
      {
        heading_fr: 'Interfaces métier avec beaucoup de données : Shadcn/ui',
        heading_en: 'Data-heavy business interfaces: Shadcn/ui',
        content_fr: `<pre><code class="language-plain">Utiliser la librairie Shadcn/ui avec des composants en taille
small pour toute l'interface. Optimiser pour la densité
d'information : listes, colonnes, filtres, badges de statut,
indicateurs d'état. Chaque composant doit afficher le maximum
d'information dans un espace réduit sans sacrifier la lisibilité.</code></pre>
<blockquote>Pourquoi small et non medium ou large : les interfaces de productivité fonctionnent mieux avec des composants compacts. Un tableau de bord avec des composants large ressemble à une maquette de présentation, pas à un outil qu'on utilise 8 heures par jour.</blockquote>`,
        content_en: `<pre><code class="language-plain">Use the Shadcn/ui library with small-sized components
throughout the interface. Optimize for information density:
lists, columns, filters, status badges,
state indicators. Each component should display as much
information as possible in a compact space without sacrificing readability.</code></pre>
<blockquote>Why small and not medium or large: productivity interfaces work better with compact components. A dashboard built with large components looks like a presentation mockup, not a tool someone uses for 8 hours a day.</blockquote>`,
      },
      {
        heading_fr: 'États de chargement et feedbacks',
        heading_en: 'Loading states and feedback',
        content_fr: `<pre><code class="language-plain">Implémenter tous les états de l'interface :
- États de chargement avec skeleton loaders pendant la
  récupération des données, spinners pour les actions courtes
- États vides (empty states) avec message explicite et
  action suggérée
- États d'erreur avec message clair et option de réessayer
- Feedback visuel immédiat après chaque action utilisateur :
  confirmation, toast notification, animation de validation
- États transitoires entre deux vues ou deux étapes d'un flux</code></pre>
<p>C'est systématiquement la partie que Claude Code omet si on ne la demande pas explicitement. Un prototype sans états de chargement brise l'illusion de réalité lors d'une présentation client ou d'un test utilisateur.</p>`,
        content_en: `<pre><code class="language-plain">Implement all interface states:
- Loading states with skeleton loaders during
  data fetching, spinners for short actions
- Empty states with an explicit message and
  a suggested action
- Error states with a clear message and a retry option
- Immediate visual feedback after each user action:
  confirmation, toast notification, validation animation
- Transitional states between two views or two steps of a flow</code></pre>
<p>This is consistently the part Claude Code skips if you do not ask for it explicitly. A prototype without loading states breaks the illusion of reality during a client presentation or a user test.</p>`,
      },
      {
        heading_fr: 'Progressive disclosure et comportement des modales',
        heading_en: 'Progressive disclosure and modal behavior',
        content_fr: `<pre><code class="language-plain">Appliquer les principes de progressive disclosure :
- Afficher d'abord les informations essentielles, révéler
  les détails à la demande (expand, tooltip, drawer)
- Comportement des modales selon les HIG d'Apple et iOS :
  entrée par le bas sur mobile, centré avec fond semi-transparent
  sur desktop, fermeture par tap extérieur ou swipe down
- Drawer latéral pour les panneaux de détail sur desktop
- Bottom sheet pour les actions contextuelles sur mobile</code></pre>`,
        content_en: `<pre><code class="language-plain">Apply progressive disclosure principles:
- Show essential information first, reveal
  details on demand (expand, tooltip, drawer)
- Modal behavior following Apple's HIG and iOS:
  enters from the bottom on mobile, centered with a semi-transparent
  background on desktop, closed by tapping outside or swiping down
- Side drawer for detail panels on desktop
- Bottom sheet for contextual actions on mobile</code></pre>`,
      },
      {
        heading_fr: 'Connecter Figma Console MCP',
        heading_en: 'Connecting Figma Console MCP',
        content_fr: `<p>Quand on travaille sur un projet avec un design system existant dans Figma, la démarche la plus efficace est de connecter Claude Code directement à ce fichier via <a href="https://docs.figma-console-mcp.southleft.com/" target="_blank" rel="noopener">Figma Console MCP</a>.</p>
<h3>Ce que ça permet</h3>
<ul>
<li>Tokens de couleur, typographie et espacement appliqués automatiquement</li>
<li>Composants nommés dans le code comme dans Figma</li>
<li>Variables de design system respectées dans chaque fichier généré</li>
<li>Modifications répercutées dans Figma en direct depuis Claude Code</li>
</ul>
<h3>Prompt d'ouverture avec Figma Console MCP actif</h3>
<pre><code class="language-plain">Connecte-toi au fichier Figma [URL du fichier]. Lis les tokens,
variables et styles du design system avant de générer quoi que
ce soit. Utilise ces valeurs pour tous les choix de couleur,
typographie et espacement. Nomme les composants en cohérence
avec les noms définis dans Figma.</code></pre>`,
        content_en: `<p>When working on a project with an existing design system in Figma, the most efficient approach is to connect Claude Code directly to that file via <a href="https://docs.figma-console-mcp.southleft.com/" target="_blank" rel="noopener">Figma Console MCP</a>.</p>
<h3>What this enables</h3>
<ul>
<li>Color, typography, and spacing tokens applied automatically</li>
<li>Components named in code exactly as in Figma</li>
<li>Design system variables respected in every generated file</li>
<li>Changes reflected in Figma in real time from Claude Code</li>
</ul>
<h3>Opening prompt with Figma Console MCP active</h3>
<pre><code class="language-plain">Connect to the Figma file [file URL]. Read the tokens,
variables and styles from the design system before generating
anything. Use these values for all color, typography
and spacing decisions. Name components consistently
with the names defined in Figma.</code></pre>`,
      },
      {
        heading_fr: 'Exemple de CLAUDE.md pour un projet d\'interface métier',
        heading_en: 'Example CLAUDE.md for a business interface project',
        content_fr: `<pre><code class="language-markdown"># Conventions visuelles et interactions

## Style
Style macOS / iPadOS avec Liquid Glass.
Pas de violet. Pas d'emojis, utiliser Lucide React pour
toutes les icônes. Typographie grotesque sans-serif, plusieurs
niveaux de typescale pour un résultat professionnel.
Composants Shadcn/ui en taille small pour toute l'interface.

## Animations
Framer Motion pour toutes les transitions et micro-interactions.
Suivre les HIG Apple : durées 150-300ms, easing naturel.
Material Design pour les élévations et transitions d'état.

## États
Toujours implémenter :
- Loading states avec skeleton loaders
- Empty states avec message et action suggérée
- Error states avec message explicite et option de réessayer
- Feedback visuel immédiat après chaque action utilisateur

## Progressive disclosure
Modales selon HIG iOS/macOS.
Drawer latéral pour les panneaux de détail sur desktop.
Bottom sheet pour les actions contextuelles sur mobile.

## Figma
Fichier de référence : [URL du fichier Figma]
Utiliser les tokens et variables du design system.
Nommer les composants en cohérence avec les noms Figma.

## Skills actifs
frontend-design, creative-director</code></pre>`,
        content_en: `<pre><code class="language-markdown"># Visual conventions and interactions

## Style
macOS / iPadOS style with Liquid Glass.
No purple. No emojis, use Lucide React for
all icons. Grotesque sans-serif typography, multiple
typescale levels for a professional result.
Shadcn/ui components in small size throughout the interface.

## Animations
Framer Motion for all transitions and micro-interactions.
Follow Apple HIG: durations 150-300ms, natural easing.
Material Design for elevations and state transitions.

## States
Always implement:
- Loading states with skeleton loaders
- Empty states with message and suggested action
- Error states with explicit message and retry option
- Immediate visual feedback after each user action

## Progressive disclosure
Modals following iOS/macOS HIG.
Side drawer for detail panels on desktop.
Bottom sheet for contextual actions on mobile.

## Figma
Reference file: [Figma file URL]
Use design system tokens and variables.
Name components consistently with Figma names.

## Active skills
frontend-design, creative-director</code></pre>`,
      },
      {
        heading_fr: 'Récapitulatif : prompts à copier selon le type de projet',
        heading_en: 'Summary: prompts to copy by project type',
        content_fr: `<table><thead><tr><th>Situation</th><th>Prompt ou action à prioriser</th></tr></thead><tbody>
<tr><td>Interface moderne style Apple</td><td>Prompt style macOS / iPadOS</td></tr>
<tr><td>Animations et micro-interactions</td><td>Framer Motion + HIG Apple + Material Design</td></tr>
<tr><td>Dashboard ou interface data-heavy</td><td>Shadcn/ui taille small</td></tr>
<tr><td>États de chargement et feedbacks</td><td>Prompt états complets</td></tr>
<tr><td>Modales et navigation complexe</td><td>Prompt progressive disclosure</td></tr>
<tr><td>Design system existant dans Figma</td><td>Figma Console MCP + prompt tokens</td></tr>
<tr><td>Session sans CLAUDE.md</td><td>Activer skills frontend-design + creative-director</td></tr>
</tbody></table>`,
        content_en: `<table><thead><tr><th>Situation</th><th>Prompt or action to prioritize</th></tr></thead><tbody>
<tr><td>Modern Apple-style interface</td><td>macOS / iPadOS style prompt</td></tr>
<tr><td>Animations and micro-interactions</td><td>Framer Motion + Apple HIG + Material Design</td></tr>
<tr><td>Dashboard or data-heavy interface</td><td>Shadcn/ui small size</td></tr>
<tr><td>Loading states and feedback</td><td>Full states prompt</td></tr>
<tr><td>Modals and complex navigation</td><td>Progressive disclosure prompt</td></tr>
<tr><td>Existing design system in Figma</td><td>Figma Console MCP + tokens prompt</td></tr>
<tr><td>Session without CLAUDE.md</td><td>Activate frontend-design + creative-director skills</td></tr>
</tbody></table>`,
      },
    ],
  },
  {
    number: 9,
    title_fr: 'Skills Claude pour les designers',
    title_en: 'Claude skills for designers',
    slug_fr: 'skills',
    slug_en: 'skills',
    intro_fr: 'Les skills sont des fichiers d\'instructions que Claude applique à la demande. Ils s\'installent en quelques secondes et changent significativement la qualité des outputs.',
    intro_en: 'Skills are instruction files that Claude applies on demand. They install in seconds and significantly improve the quality of outputs.',
    sections: [
      {
        heading_fr: 'Comment installer un skill',
        heading_en: 'How to install a skill',
        content_fr: `<pre><code class="language-plain">1. Télécharge le fichier .md du skill ci-dessous
2. Dans Claude, ouvre Paramètres > Skills
3. Crée un nouveau skill, colle le contenu du fichier
4. Nomme-le et sauvegarde
5. Mentionne le skill dans ta conversation pour l'activer</code></pre>
<blockquote>Pour les skills avec un lien externe : tu peux aussi installer directement depuis le lien marketplace sans télécharger le fichier.</blockquote>`,
        content_en: `<pre><code class="language-plain">1. Download the skill's .md file below
2. In Claude, open Settings > Skills
3. Create a new skill, paste the file content
4. Name it and save
5. Mention the skill in your conversation to activate it</code></pre>
<blockquote>For skills with an external link: you can also install directly from the marketplace link without downloading the file.</blockquote>`,
      },
      {
        heading_fr: 'Skills visuels et frontend',
        heading_en: 'Visual and frontend skills',
        content_fr: `<h3>frontend-design</h3>
<p>Oriente Claude vers des interfaces de qualité production : typographie, espacement, hiérarchie visuelle. Évite les esthétiques génériques des outputs IA par défaut.</p>
<p><strong>Cas d'usage :</strong> tout projet où le rendu visuel compte, composants UI, landing pages, prototypes présentés à un client.</p>
<p><a href="https://skillsmp.com/skills/anthropics-claude-code-plugins-frontend-design-skills-frontend-design-skill-md" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:8px;background:#2D5CF3;color:#fff;font-size:13px;font-weight:500;text-decoration:none">Installer depuis le marketplace</a></p>
<hr/>
<h3>creative-director</h3>
<p>Apporte un regard éditorial sur les décisions de composition et de direction artistique. Utile quand l'interface doit avoir un caractère visuel fort ou quand on part d'une page blanche sans référence précise.</p>
<p><strong>Cas d'usage :</strong> exploration de direction visuelle, interfaces de marque, projets avec identité visuelle forte, présentations client.</p>
<p><a href="https://skills.sh/smixs/creative-director-skill/creative-director" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:8px;background:#2D5CF3;color:#fff;font-size:13px;font-weight:500;text-decoration:none">Installer depuis le marketplace</a></p>`,
        content_en: `<h3>frontend-design</h3>
<p>Points Claude toward production-quality interfaces: typography, spacing, visual hierarchy. Avoids the generic aesthetics of default AI outputs.</p>
<p><strong>Use cases:</strong> any project where visual output matters, UI components, landing pages, prototypes presented to a client.</p>
<p><a href="https://skillsmp.com/skills/anthropics-claude-code-plugins-frontend-design-skills-frontend-design-skill-md" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:8px;background:#2D5CF3;color:#fff;font-size:13px;font-weight:500;text-decoration:none">Install from the marketplace</a></p>
<hr/>
<h3>creative-director</h3>
<p>Brings an editorial eye to composition decisions and art direction. Useful when an interface needs a strong visual character, or when you are starting from a blank page with no clear reference.</p>
<p><strong>Use cases:</strong> visual direction exploration, brand interfaces, projects with a strong visual identity, client presentations.</p>
<p><a href="https://skills.sh/smixs/creative-director-skill/creative-director" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:8px;background:#2D5CF3;color:#fff;font-size:13px;font-weight:500;text-decoration:none">Install from the marketplace</a></p>`,
      },
      {
        heading_fr: 'Skills design et UX',
        heading_en: 'Design and UX skills',
        content_fr: `<h3>ux-designer</h3>
<p>Assistance experte en recherche utilisateur, wireframing, prototypage et stratégie design. Couvre les user flows, personas, guides de tests d'utilisabilité, architecture d'information.</p>
<p><strong>Cas d'usage :</strong> cadrage de projet, préparation de tests utilisateurs, documentation UX, définition de parcours.</p>
<h3>interactive-prototype</h3>
<p>Documentation d'interactions pour Figma, Principle, Bolt et Lovable. Génère des spécifications de micro-interactions, timelines d'animation, et specs techniques pour l'implémentation.</p>
<p><strong>Cas d'usage :</strong> handoff d'interactions vers un développeur, documentation d'animations, spécifications de comportement.</p>
<h3>spec-ideation</h3>
<p>Cadre structuré pour générer des solutions en phases d'expansion, contraction et documentation. Utile pour les sessions de cadrage produit et les ateliers d'idéation avec un client.</p>
<p><strong>Cas d'usage :</strong> cadrage de mission, ateliers avec un client, arbitrages produit, exploration de concepts.</p>`,
        content_en: `<h3>ux-designer</h3>
<p>Expert assistance with user research, wireframing, prototyping, and design strategy. Covers user flows, personas, usability test guides, and information architecture.</p>
<p><strong>Use cases:</strong> project framing, preparing user tests, UX documentation, defining user journeys.</p>
<h3>interactive-prototype</h3>
<p>Interaction documentation for Figma, Principle, Bolt, and Lovable. Generates micro-interaction specifications, animation timelines, and technical specs for implementation.</p>
<p><strong>Use cases:</strong> handing off interactions to a developer, animation documentation, behavior specifications.</p>
<h3>spec-ideation</h3>
<p>A structured framework for generating solutions through expansion, contraction, and documentation phases. Useful for product framing sessions and ideation workshops with a client.</p>
<p><strong>Use cases:</strong> project scoping, workshops with a client, product trade-offs, concept exploration.</p>`,
      },
      {
        heading_fr: 'Skills rédactionnels',
        heading_en: 'Writing skills',
        content_fr: `<h3>victor-voice</h3>
<p>Posture rédactionnelle pour tout output narratif : posts LinkedIn, briefs, notes de consulting. Élimine les tics d'écriture LLM, les fausses constructions dramatiques, le ton condescendant.</p>
<p><strong>Cas d'usage :</strong> posts LinkedIn, propositions commerciales, notes de cadrage, tout texte destiné à être publié ou partagé.</p>
<h3>francais-parfait</h3>
<p>Règles d'écriture en français natif : accentuation des majuscules (É, À), ligatures (œuvre, cœur), guillemets français, zéro emdash. Prioritaire sur tout autre style quand l'output est en français.</p>
<p><strong>Cas d'usage :</strong> tout output en français destiné à être publié ou partagé.</p>`,
        content_en: `<h3>victor-voice</h3>
<p>A writing posture for any narrative output: LinkedIn posts, briefs, consulting notes. Eliminates LLM writing tics, false dramatic constructions, and a condescending tone.</p>
<p><strong>Use cases:</strong> LinkedIn posts, commercial proposals, framing notes, any text meant to be published or shared.</p>
<h3>francais-parfait</h3>
<p>French native-speaker writing rules: accented capitals (É, À), ligatures (œuvre, cœur), French quotation marks, zero emdash. Takes priority over all other style rules when the output is in French.</p>
<p><strong>Use cases:</strong> any French-language output intended for publication or sharing.</p>`,
      },
      {
        heading_fr: 'Skills de marque et présentation',
        heading_en: 'Brand and presentation skills',
        content_fr: `<h3>Brand</h3>
<p>Système de marque pour des présentations PPT avec style corporate minimaliste : tokens visuels, typographie (Helvetica Neue / Public Sans), palette (#295FEC, #F8F9FB), conventions de mise en page pour les livrables client.</p>
<p><strong>Cas d'usage :</strong> propositions commerciales, études de cas, livrables client, documents de positionnement.</p>
<h3>Slides</h3>
<p>Création de présentations : structure narrative, tokens de design, conventions de mise en page pour les decks client. À combiner avec le skill pptx pour la génération technique.</p>
<p><strong>Cas d'usage :</strong> decks client, keynotes, supports de formation, restitutions de mission.</p>
<h3>pptx</h3>
<p>Génère des présentations PowerPoint structurées et mises en forme directement depuis Claude. Gère la création de slides, l'organisation du contenu par sections, la typographie, les tableaux, et l'exportation en fichier <code>.pptx</code> téléchargeable.</p>
<p><strong>Cas d'usage :</strong> restitutions client en format slide, synthèses de mission, decks de présentation à partir de notes ou d'un brief.</p>
<blockquote>À combiner avec la skill <strong>slides</strong> pour appliquer les conventions visuelles au fichier généré.</blockquote>
<h3>Research</h3>
<p>Recherche de signaux dans l'espace UI/UX, design produit, IA et workflows assistés, B2B/B2G. Génère des angles de contenu LinkedIn calibrés au positionnement Condamine Studio.</p>
<p><strong>Cas d'usage :</strong> préparation de posts LinkedIn, veille sectorielle, positionnement sur un sujet avant de rédiger.</p>`,
        content_en: `<h3>Brand</h3>
<p>A brand system for PPT presentations with a minimal corporate style: visual tokens, typography (Helvetica Neue / Public Sans), palette (#295FEC, #F8F9FB), layout conventions for client deliverables.</p>
<p><strong>Use cases:</strong> commercial proposals, case studies, client deliverables, positioning documents.</p>
<h3>Slides</h3>
<p>Presentation creation: narrative structure, design tokens, layout conventions for client decks. Combine with the pptx skill for technical generation.</p>
<p><strong>Use cases:</strong> client decks, keynotes, training materials, project debriefs.</p>
<h3>pptx</h3>
<p>Generates structured and formatted PowerPoint presentations directly from Claude. Handles slide creation, content organization by section, typography, tables, and export as a downloadable <code>.pptx</code> file.</p>
<p><strong>Use cases:</strong> client debriefs in slide format, project summaries, presentation decks from notes or a brief.</p>
<blockquote>Combine with the <strong>slides</strong> skill to apply visual conventions to the generated file.</blockquote>
<h3>Research</h3>
<p>Searches for signals in the UI/UX, product design, AI and assisted workflows, B2B/B2G space. Generates LinkedIn content angles calibrated to Condamine Studio's positioning.</p>
<p><strong>Use cases:</strong> preparing LinkedIn posts, sector monitoring, positioning on a topic before writing.</p>`,
      },
      {
        heading_fr: 'Skills de workflow et méthodologie',
        heading_en: 'Workflow and methodology skills',
        content_fr: `<h3>ship-to-show</h3>
<p>Framework en 7 phases pour transformer un prototype en case study portfolio avec vidéos animées, contenu narratif bilingue et pack d'intégration. Le processus complet prend environ 2h30, du prototype brut à la page publiée.</p>
<p><strong>Cas d'usage :</strong> documenter un prototype dans un portfolio, produire des vidéos de démonstration d'une interface, créer un case study complet à partir d'un fichier de code.</p>
<p><strong>Installation :</strong></p>
<pre><code class="language-plain">mkdir -p ~/.claude/skills/ship-to-show
curl -o ~/.claude/skills/ship-to-show/SKILL.md https://raw.githubusercontent.com/marcus-clay/ship-to-show/main/SKILL.md</code></pre>
<p><strong>Invocation :</strong> <code>/ship-to-show</code></p>
<p><a href="/fr/guide/ship-to-show" style="display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:8px;background:#2D5CF3;color:#fff;font-size:13px;font-weight:500;text-decoration:none">Lire le guide complet</a></p>`,
        content_en: `<h3>ship-to-show</h3>
<p>A 7-phase framework to turn a prototype into a portfolio case study with animated videos, bilingual narrative, and an integration pack. The full process takes about 2h30, from raw prototype to published page.</p>
<p><strong>Use cases:</strong> documenting a prototype in a portfolio, producing interface demo videos, creating a complete case study from a code file.</p>
<p><strong>Installation:</strong></p>
<pre><code class="language-plain">mkdir -p ~/.claude/skills/ship-to-show
curl -o ~/.claude/skills/ship-to-show/SKILL.md https://raw.githubusercontent.com/marcus-clay/ship-to-show/main/SKILL.md</code></pre>
<p><strong>Invocation:</strong> <code>/ship-to-show</code></p>
<p><a href="/en/guide/ship-to-show" style="display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:8px;background:#2D5CF3;color:#fff;font-size:13px;font-weight:500;text-decoration:none">Read the full guide</a></p>`,
      },
    ],
  },
];
