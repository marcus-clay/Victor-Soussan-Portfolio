/**
 * Guide Claude Code - Full content data
 * Source: Notion guide "Bien démarrer avec Claude Code - Guide pour les designers"
 */

export interface GuideSection {
  heading: string;
  content: string;
}

export interface GuideChapter {
  number: number;
  title: string;
  slug: string;
  intro: string;
  sections: GuideSection[];
}

export const GUIDE_META = {
  title: 'Bien démarrer avec Claude Code',
  subtitle: 'Guide pour les designers',
  categories: ['Claude Code', 'Guide', 'Ressources'] as const,
  date: '2026-03-14',
  readTime: '45 min',
  author: {
    name: 'Victor Soussan',
    role: 'Lead Product Designer',
    bio: 'SaaS B2B & B2G | Interfaces métier complexes | Design Systems | Figma, Claude Code | Prototypage IA',
    image: '/images/guide-claude-code/author-victor.png',
    linkedin: 'https://linkedin.com/in/victor-soussan-product-design/',
    website: 'https://www.victorsoussan.fr/',
  },
  heroImage: '/images/guide-claude-code/hero-cover.png',
  heroAlt: 'Claude Code ouvre aux designers la possibilité de concevoir, produire et déployer des livrables réels.',
};

export const GUIDE_CHAPTERS: GuideChapter[] = [
  {
    number: 1,
    title: 'Comprendre Claude Code',
    slug: 'comprendre',
    intro: 'Ce que c\'est, en quoi ça diffère des autres outils IA, et pourquoi ça change concrètement quelque chose pour un designer.',
    sections: [
      {
        heading: 'C\'est quoi',
        content: `<p>Claude Code est un agent de codage développé par Anthropic. Concrètement, il peut lire les fichiers d'un projet, écrire du code, exécuter des commandes, démarrer un serveur local pour prévisualiser une interface, et itérer sur les changements, tout ça depuis une conversation.</p>
<p>Tu lui décris ce que tu veux construire. Il écrit le code, le fait tourner, te montre le résultat. Tu lui dis ce qui ne va pas. Il corrige. Le cycle ressemble à ce que tu fais dans Figma entre deux versions d'un composant, sauf qu'en sortie tu obtiens quelque chose qui fonctionne dans un navigateur.</p>`,
      },
      {
        heading: 'En quoi ça diffère des autres outils',
        content: `<p>Plusieurs outils proposent de « créer des applications avec de l'IA » : Lovable, Bolt, v0, Framer AI. Ce sont des interfaces simplifiées construites au-dessus de modèles d'IA. Ils sont rapides pour démarrer et pratiques pour une exploration initiale.</p>
<p>Claude Code fonctionne différemment. Il travaille directement sur les fichiers de ton projet, dans ton environnement de travail. Il lit ta structure de dossiers, comprend les conventions déjà en place, et peut intervenir sur n'importe quel fichier avec précision. Ce n'est pas une application qui génère du code dans une boîte noire : c'est un agent qui travaille à côté de toi, sur les mêmes fichiers.</p>
<p>Cette différence devient importante quand tu passes de l'exploration à la construction réelle : un projet démarré dans Claude Code est un projet standard que tu peux ouvrir dans VSCode, versionner sur GitHub, déployer sur Vercel, et passer à un développeur sans friction.</p>
<table><thead><tr><th></th><th>Lovable / Bolt / v0</th><th>Claude Code</th></tr></thead><tbody>
<tr><td>Interface</td><td>Application web dédiée</td><td>Terminal, VSCode, ou app Desktop Claude</td></tr>
<tr><td>Accès aux fichiers</td><td>Interface propriétaire</td><td>Tes fichiers réels, dans ton dossier</td></tr>
<tr><td>Contrôle sur le code</td><td>Limité</td><td>Total</td></tr>
<tr><td>Export</td><td>Vers GitHub (selon l'outil)</td><td>Déjà dans tes fichiers</td></tr>
<tr><td>Prérequis</td><td>Aucun</td><td>Claude Pro/Max</td></tr>
</tbody></table>`,
      },
      {
        heading: 'Les trois modes d\'utilisation',
        content: `<img src="/images/guide-claude-code/ch1-three-modes.png" alt="Les trois modes d'utilisation de Claude Code" />
<p>Il n'y a pas une seule façon d'utiliser Claude Code. Selon ce que tu cherches à faire et les outils que tu maîtrises déjà, tu choisiras un mode différent.</p>
<p><strong>L'app Desktop</strong> est la façon la plus rapide de démarrer. Même interface que Claude chat, pas de configuration. Tu passes en mode Code, tu pointes sur un dossier, et tu commences. Elle offre une prévisualisation live intégrée, un diff visuel des modifications, la possibilité de cliquer directement sur les éléments de l'interface pour donner un feedback, et le glisser-déposer de maquettes et de screenshots.</p>
<p><strong>VSCode + fenêtre compagnon</strong> est la configuration la plus efficace au quotidien. VSCode occupe la moitié gauche de l'écran avec les fichiers du projet ouverts dans l'éditeur, et Claude Code tourne dans une fenêtre de conversation séparée à droite. Les deux fenêtres pointent sur le même dossier. Tu donnes tes instructions dans la conversation, Claude modifie les fichiers, et tu vois les changements apparaître instantanément dans l'éditeur VSCode sans quitter l'écran.</p>
<p><strong>VSCode + terminal intégré</strong> est une variante où Claude Code tourne directement dans le terminal à l'intérieur de VSCode, sans fenêtre séparée. Tout reste dans une seule application. C'est utile si tu préfères travailler dans un environnement unifié ou si tu intègres Claude Code dans un workflow plus technique.</p>
<blockquote>Pour la plupart des projets design, l'app Desktop ou VSCode couvrent l'essentiel. Le terminal devient pertinent quand le volume de travail augmente ou quand tu travailles dans un environnement d'équipe avec des conventions techniques précises.</blockquote>
<div class="callout"><strong>À quoi ça ressemble en pratique</strong><br/>VSCode ouvert à gauche avec les fichiers du projet. La fenêtre compagnon Claude Code à droite dans VSCode. Tu écris : « modifie le composant hero, padding à 24px, titre en 32px weight 800 ». Claude modifie les fichiers. Le diff apparaît dans l'éditeur, lignes modifiées surlignées. Tu vérifies sur <code>localhost:3000</code> dans le navigateur. Tu demandes à Claude de pousser sur GitHub. Le tout sans changer d'application, sans perdre le fil de la conversation.</div>`,
      },
      {
        heading: 'Ce qu\'on peut concrètement construire',
        content: `<p>Les cas d'usage qui ont le plus de valeur pour un designer :</p>
<p><strong>Prototypes interactifs avec de vraies données.</strong> Les prototypes Figma gèrent bien les flux, mais pas la logique conditionnelle, les états de chargement, ni les vrais comportements de formulaire. Claude Code peut construire une version qui répond à des interactions réelles. La différence est perceptible lors d'une présentation client.</p>
<p><strong>Prototypes de test utilisateur.</strong> Un prototype qui suit les clics, mesure le temps passé sur une tâche, ou modifie le contenu selon l'action de l'utilisateur. Figma ne peut pas faire ça. Claude Code peut le construire en une conversation.</p>
<p><strong>Documentation de design system.</strong> Une page où chaque composant s'affiche avec son code réel, les variantes sont interactives, et tout utilise tes vrais tokens. Beaucoup plus utile qu'une page Figma statique.</p>
<p><strong>Corrections UI directes.</strong> Un spacing incorrect, une couleur de bouton à corriger. Tu ouvres le projet dans Claude Code, tu cliques sur l'élément, tu indiques le changement. Claude génère une pull request propre que les développeurs peuvent réviser directement.</p>
<p><strong>Sites et landing pages.</strong> Une page portfolio depuis tes designs Figma, une landing page client déployée en production, une page de présentation d'un side project.</p>`,
      },
      {
        heading: 'Ce qu\'il ne fait pas à ta place',
        content: `<p>Claude Code couvre 60 à 80 % du chemin. Le reste reste de ta responsabilité.</p>
<p>Il génère du code qui fonctionne, mais qui ne sera pas toujours structuré exactement comme un développeur senior l'aurait fait. Le comportement responsive peut nécessiter des ajustements. Les animations fines demandent de l'itération. Et les décisions de design, lui dire ce qui est juste visuellement et ce qui ne l'est pas, restent les tiennes.</p>
<p>L'outil amplifie ce que tu sais déjà faire. Plus tu es précis dans tes descriptions et ton feedback, meilleur est le résultat.</p>`,
      },
    ],
  },
  {
    number: 2,
    title: 'Préparer son environnement',
    slug: 'environnement',
    intro: 'Abonnement, installation, organisation des dossiers sur Mac, outils à avoir avant de commencer.',
    sections: [
      {
        heading: 'Prérequis obligatoires',
        content: `<h3>Un abonnement Claude Pro ou Max</h3>
<p>Claude Code n'est pas disponible sur le plan gratuit.</p>
<ul>
<li><strong>Pro, 20 $/mois</strong> : suffisant pour démarrer et couvre la plupart des usages quotidiens.</li>
<li><strong>Max, 100 $/mois</strong> : utile si tu travailles intensivement ou si tu atteins régulièrement les limites de quota du plan Pro.</li>
</ul>
<p>Le quota est partagé entre le chat Claude et Claude Code. Des sessions de codage intensives consomment plus que des conversations textuelles.</p>
<blockquote>Conseil : commence par Pro. Tu verras rapidement si les limites te posent problème dans ton usage réel.</blockquote>
<h3>L'app Desktop Claude</h3>
<p>Télécharge l'app sur <a href="https://claude.ai/download" target="_blank" rel="noopener">claude.ai/download</a>. Disponible sur Mac et Windows. Connecte-toi avec le même compte que sur claude.ai.</p>`,
      },
      {
        heading: 'Prérequis selon le chemin choisi',
        content: `<table><thead><tr><th>Outil</th><th>Chemin A</th><th>Chemin B</th><th>Chemin C</th></tr></thead><tbody>
<tr><td>Claude Pro/Max</td><td>Oui</td><td>Oui</td><td>Oui</td></tr>
<tr><td>App Desktop Claude</td><td>Oui</td><td>Facultatif</td><td>Facultatif</td></tr>
<tr><td>VSCode</td><td>Facultatif</td><td>Oui</td><td>Oui</td></tr>
<tr><td>Git</td><td>Non</td><td>Oui</td><td>Oui</td></tr>
<tr><td>Compte GitHub</td><td>Non</td><td>Oui</td><td>Oui</td></tr>
<tr><td>Compte Lovable / Gemini</td><td>Non</td><td>Non</td><td>Selon l'outil</td></tr>
</tbody></table>
<p>Si tu ne sais pas encore quel chemin tu vas prendre, installe tout. La mise en place prend moins d'une heure.</p>`,
      },
      {
        heading: 'Organiser ses dossiers sur Mac',
        content: `<p>Claude Code travaille sur des dossiers réels de ton ordinateur. Chaque projet est un dossier. Avant de créer le premier, prends deux minutes pour mettre en place une convention simple que tu n'auras plus à revoir.</p>
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
      },
      {
        heading: 'Installer VSCode',
        content: `<p><a href="https://code.visualstudio.com/" target="_blank" rel="noopener">Télécharge VSCode</a> et installe-le normalement.</p>
<p>Une fois installé, deux extensions utiles à ajouter :</p>
<p><strong>Live Server</strong> : recharge automatiquement le navigateur chaque fois qu'un fichier HTML ou CSS est modifié. Indispensable pour les projets en HTML pur.</p>
<p><strong>GitLens</strong> : affiche l'historique Git directement dans l'éditeur, sur chaque ligne de code. Facultatif mais utile pour comprendre ce que Claude a modifié sur un fichier.</p>`,
      },
      {
        heading: 'Installer Git',
        content: `<p>Git est le système qui permet de versionner les fichiers de ton projet et de les synchroniser avec GitHub.</p>
<p><strong>Sur Mac :</strong> Git est souvent déjà installé. Pour vérifier, ouvre le Terminal et tape :</p>
<pre><code class="language-bash">git --version</code></pre>
<p>Si une version s'affiche, c'est bon. Sinon, installe <a href="https://brew.sh/" target="_blank" rel="noopener">Homebrew</a> puis tape <code>brew install git</code>.</p>`,
      },
      {
        heading: 'Créer un compte GitHub',
        content: `<p>GitHub est le service qui héberge tes projets versionnés dans le cloud. Pense-y comme un Google Drive pour le code : tes fichiers y sont sauvegardés, chaque modification est tracée, et tu peux partager l'accès à un développeur.</p>
<p>Crée un compte gratuit sur <a href="https://github.com/" target="_blank" rel="noopener">github.com</a>. Le plan gratuit est suffisant pour tous les usages décrits dans ce guide.</p>`,
      },
      {
        heading: 'Installer Claude Code en ligne de commande',
        content: `<p>Si tu veux utiliser Claude Code depuis le terminal de VSCode ou depuis un terminal directement :</p>
<pre><code class="language-bash">npm install -g @anthropic-ai/claude-code</code></pre>
<p>Cette commande nécessite que Node.js soit installé. Pour vérifier : <code>node --version</code>. Si Node n'est pas installé, télécharge-le sur <a href="https://nodejs.org/" target="_blank" rel="noopener">nodejs.org</a> (version LTS).</p>
<p>Une fois installé, lance Claude Code depuis n'importe quel dossier avec :</p>
<pre><code class="language-bash">claude</code></pre>
<blockquote>Si tu utilises uniquement l'app Desktop : tu n'as pas besoin d'installer Claude Code en ligne de commande. L'app Desktop l'inclut nativement.</blockquote>`,
      },
      {
        heading: 'Récapitulatif : liste de contrôle',
        content: `<p>Avant de passer à la suite, vérifie que tu as :</p>
<ul>
<li>Un abonnement Claude Pro ou Max actif</li>
<li>L'app Desktop Claude installée et connectée</li>
<li>Le dossier <code>dev_projects</code> créé dans ton répertoire personnel</li>
<li>VSCode installé (si tu prévois les chemins B ou C)</li>
<li>Git installé et fonctionnel (<code>git --version</code> renvoie une version)</li>
<li>Un compte GitHub créé</li>
<li>Claude Code CLI installé (<code>claude --version</code>) si tu utilises le terminal</li>
</ul>`,
      },
    ],
  },
  {
    number: 3,
    title: 'Les trois approches pour démarrer',
    slug: 'approches',
    intro: 'Dossier local, artifact Claude, ou autre outil IA comme point de départ. Comment choisir et comment migrer d\'un chemin à l\'autre.',
    sections: [
      {
        heading: 'Vue d\'ensemble',
        content: `<img src="/images/guide-claude-code/ch3-three-approaches.png" alt="Les trois approches pour démarrer un projet avec Claude Code" />
<p>Il n'y a pas une seule façon de commencer un projet avec Claude Code. Selon l'état d'avancement de ton idée, les outils que tu maîtrises, et le temps disponible pour la configuration, trois chemins s'offrent à toi.</p>`,
      },
      {
        heading: 'Approche 1 : Partir directement en local',
        content: `<p><strong>Quand l'utiliser :</strong> tu as une idée précise, tu veux construire quelque chose de zéro sans passer par GitHub, et tu veux aller vite.</p>
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
      },
      {
        heading: 'Approche 2 : Prototyper dans un artifact Claude, puis migrer',
        content: `<p><strong>Quand l'utiliser :</strong> tu veux explorer rapidement plusieurs directions visuelles avant de t'engager sur une structure de fichiers.</p>
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
      },
      {
        heading: 'Approche 3 : Démarrer dans un autre outil IA',
        content: `<p><strong>Quand l'utiliser :</strong> tu veux une interface visuellement aboutie très rapidement, ou tu veux exploiter les forces spécifiques d'un autre outil pour la phase exploratoire.</p>
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
      },
      {
        heading: 'GitHub : les quatre concepts essentiels',
        content: `<p>Si tu n'as jamais utilisé Git, voici les quatre notions que tu as besoin de comprendre. Pas plus.</p>
<p><strong>Repository</strong> : un dossier de projet hébergé sur GitHub, avec l'historique complet de toutes ses modifications.</p>
<p><strong>Clone</strong> : télécharger une copie d'un repo sur ton ordinateur, avec le lien maintenu vers GitHub.</p>
<p><strong>Commit</strong> : une sauvegarde nommée. <code>git commit -m "Refonte navigation"</code> crée un instantané du projet à cet état. L'équivalent de dupliquer un fichier Figma avant une grosse modification.</p>
<p><strong>Push</strong> : envoyer tes commits locaux vers GitHub. Sans <code>git push</code>, tes sauvegardes restent uniquement sur ton ordinateur.</p>
<p>Tu n'as pas besoin de comprendre les branches, les pull requests ou les conflits de merge pour démarrer.</p>`,
      },
      {
        heading: 'Tableau de comparaison',
        content: `<table><thead><tr><th></th><th>Chemin A</th><th>Chemin B</th><th>Chemin C</th></tr></thead><tbody>
<tr><td>Départ</td><td>Dossier vide</td><td>Artifact Claude</td><td>Lovable / Gemini / Bolt</td></tr>
<tr><td>Configuration</td><td>Minimale</td><td>Modérée</td><td>Modérée</td></tr>
<tr><td>Vitesse de démarrage</td><td>Rapide</td><td>Très rapide</td><td>La plus rapide</td></tr>
<tr><td>Contrôle sur la structure</td><td>Total dès le départ</td><td>Total après migration</td><td>À reprendre après migration</td></tr>
<tr><td>Idéal pour</td><td>Specs claires</td><td>Exploration visuelle</td><td>UI complexe dès le départ</td></tr>
<tr><td>Prérequis</td><td>Claude Pro/Max</td><td>Git + GitHub + VSCode</td><td>Git + GitHub + VSCode + compte outil</td></tr>
</tbody></table>`,
      },
    ],
  },
  {
    number: 4,
    title: 'Choisir sa stack',
    slug: 'stack',
    intro: 'HTML pur, React, Next.js, Tailwind, Shadcn. Ce que chaque choix implique et quelle combinaison fonctionne le mieux selon le type de projet.',
    sections: [
      {
        heading: 'Les options disponibles',
        content: `<h3>HTML + CSS pur</h3>
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
      },
      {
        heading: 'Quelle combinaison choisir',
        content: `<p><strong>Pour explorer et prototyper rapidement :</strong><br/>HTML + CSS + Tailwind (via CDN, sans installation)</p>
<p><strong>Pour la plupart des projets design :</strong><br/>Next.js + Tailwind CSS + Shadcn/ui</p>
<p>C'est la combinaison qui couvre le plus de cas d'usage. Next.js gère le routing et le déploiement, Tailwind remplace les feuilles de style, et Shadcn/ui fournit des composants prêts à l'emploi.</p>
<p><strong>Pour les prototypes avec animations :</strong><br/>Next.js + Tailwind + Framer Motion</p>
<p><strong>Pour un portfolio ou un site statique :</strong><br/>Astro + Tailwind</p>`,
      },
      {
        heading: 'Comment indiquer le stack à Claude Code',
        content: `<p>Au début d'une session, donne à Claude Code le contexte du projet. Deux façons de le faire :</p>
<p><strong>Dans le premier message :</strong></p>
<pre><code class="language-plain">Ce projet utilise Next.js 14, Tailwind CSS et Shadcn/ui.
Les composants Shadcn existants sont dans /components/ui.
Utilise les tokens de couleur définis dans tailwind.config.js.
Ne crée pas de nouveau composant si un composant Shadcn existant
peut faire l'affaire.</code></pre>
<p><strong>Dans un fichier CLAUDE.md à la racine du projet</strong> (voir page 7) : Claude lit ce fichier au démarrage de chaque session. Les instructions s'appliquent automatiquement sans avoir à les répéter.</p>`,
      },
    ],
  },
  {
    number: 5,
    title: 'Itérer et affiner visuellement',
    slug: 'iterer',
    intro: 'L\'app Desktop pas à pas, VSCode + fenêtre compagnon, le workflow VSCode terminal, et les techniques pour obtenir des résultats précis.',
    sections: [
      {
        heading: 'L\'app Desktop pas à pas',
        content: `<h3>Étape 1 : Passer en mode Code</h3>
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
      },
      {
        heading: 'VSCode + fenêtre compagnon Claude Code',
        content: `<p>C'est la configuration que j'utilise le plus au quotidien, et celle que je recommande aux designers qui veulent aller au-delà de l'exploration ponctuelle.</p>
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
      },
      {
        heading: 'VSCode + Terminal intégré',
        content: `<img src="/images/guide-claude-code/ch5-vscode-terminal.png" alt="VSCode avec Claude Code dans le terminal intégré" />
<p><strong>Ouvrir le terminal intégré :</strong> <code>Cmd+\`</code> (backtick)</p>
<p><strong>Lancer Claude Code :</strong> <code>claude</code></p>
<p><strong>Prévisualiser le résultat :</strong></p>
<ul>
<li>HTML statique : clic droit sur <code>index.html</code> > Open with Live Server</li>
<li>Projet Next.js : <code>npm run dev</code> dans un second terminal, puis ouvre <code>localhost:3000</code></li>
</ul>`,
      },
      {
        heading: 'Techniques pour obtenir de meilleurs résultats',
        content: `<h3>Être aussi précis qu'une redline</h3>
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
      },
      {
        heading: 'Calibrer ses attentes',
        content: `<p>Claude Code couvre 60 à 80 % du chemin. Ce qui reste est de ta responsabilité.</p>
<p><strong>Le code sera fonctionnel mais pas toujours parfait.</strong> L'espacement peut être légèrement décalé. Le comportement responsive peut demander des ajustements. C'est normal.</p>
<p><strong>La qualité de tes inputs détermine la qualité des outputs.</strong> Une maquette propre avec des valeurs de tokens claires produit des résultats bien meilleurs qu'une description vague.</p>
<p><strong>Tu apprends un nouveau workflow.</strong> La première session sera plus lente. La troisième sera fluide. Par la dixième, le rythme sera naturel.</p>`,
      },
    ],
  },
  {
    number: 6,
    title: 'Déployer avec Vercel',
    slug: 'deployer',
    intro: 'De localhost à une URL publique. Vercel CLI, prévisualisation, production, variables d\'environnement, domaine personnalisé.',
    sections: [
      {
        heading: 'Deux façons de déployer',
        content: `<img src="/images/guide-claude-code/ch6-vercel-deploy.png" alt="Interface de déploiement Vercel" />
<p><strong>Vercel via GitHub (recommandé) :</strong> tu connectes ton repo GitHub à Vercel. À chaque <code>git push</code>, Vercel redéploie automatiquement.</p>
<p><strong>Vercel CLI :</strong> tu déploies depuis le terminal avec une commande. Plus direct, moins automatisé.</p>
<div class="callout"><strong>À noter :</strong> toutes les commandes de code ci-après peuvent être remplacées par des demandes à Claude dans la conversation. Ex : « À présent déploie en production sur Vercel ». Il mouline et déploie tout seul sur ton URL Vercel en prod.</div>`,
      },
      {
        heading: 'Vercel CLI : installation et premier déploiement',
        content: `<pre><code class="language-bash">npm install -g vercel
vercel login</code></pre>
<p>Depuis le dossier de ton projet :</p>
<pre><code class="language-bash">vercel</code></pre>
<p>Vercel te pose quelques questions lors du premier déploiement. À la fin, il te retourne une <strong>URL de prévisualisation</strong> : une URL publique unique pour cette version.</p>
<h3>Déployer en production</h3>
<pre><code class="language-bash">vercel --prod</code></pre>
<p>Déploie la version actuelle en production et retourne l'URL publique définitive.</p>`,
      },
      {
        heading: 'Workflow type',
        content: `<ol>
<li>Tu travailles en local avec Claude Code</li>
<li>Tu vérifies le résultat dans le navigateur (localhost)</li>
<li><code>vercel</code> : URL de prévisualisation, tu partages pour feedback</li>
<li>Tu intègres les retours</li>
<li><code>vercel --prod</code> : URL de production mise à jour</li>
</ol>`,
      },
      {
        heading: 'Variables d\'environnement',
        content: `<pre><code class="language-bash"># Ajouter une variable
vercel env add NOM_DE_LA_VARIABLE

# Lister les variables d'un projet
vercel env ls

# Supprimer une variable
vercel env rm NOM_DE_LA_VARIABLE</code></pre>
<p>Les variables sont stockées côté Vercel et injectées automatiquement à chaque déploiement. Ton fichier <code>.env.local</code> reste sur ton ordinateur, jamais dans le repo GitHub.</p>`,
      },
      {
        heading: 'Domaine personnalisé',
        content: `<pre><code class="language-bash">vercel domains add mon-domaine.fr</code></pre>
<p>Vercel t'indique ensuite les enregistrements DNS à configurer. La propagation prend entre quelques minutes et 48 heures. Vercel génère automatiquement le certificat SSL.</p>`,
      },
      {
        heading: 'Vercel via GitHub : connexion automatique',
        content: `<ol>
<li>Va sur <a href="https://vercel.com/" target="_blank" rel="noopener">vercel.com</a> et connecte ton compte GitHub.</li>
<li>Importe ton repository.</li>
<li>Vercel configure le projet automatiquement.</li>
<li>À chaque <code>git push origin main</code>, Vercel redéploie automatiquement.</li>
</ol>
<p>Tu n'as plus à taper <code>vercel --prod</code> manuellement. Chaque modification poussée sur la branche principale est en production en quelques secondes.</p>`,
      },
    ],
  },
  {
    number: 7,
    title: 'Aller plus loin',
    slug: 'aller-plus-loin',
    intro: 'CLAUDE.md, skills, commandes Git essentielles, terminal, ressources.',
    sections: [
      {
        heading: 'Le fichier CLAUDE.md',
        content: `<p>Un fichier texte nommé <code>CLAUDE.md</code>, placé à la racine d'un projet, que Claude Code lit automatiquement au début de chaque session. C'est l'équivalent d'un brief permanent.</p>
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
      },
      {
        heading: 'Skills Claude',
        content: `<p>Les skills sont des fichiers d'instructions que Claude applique automatiquement dans une session. Ils s'installent en quelques secondes et changent significativement la précision et la qualité des outputs.</p>
<p>Un skill pour la qualité visuelle, un skill pour la rédaction, un skill pour la recherche utilisateur : chacun oriente Claude dans la bonne direction dès l'ouverture de la conversation.</p>
<p>Les deux skills à installer en priorité :</p>
<ul>
<li><strong>frontend-design</strong> : interfaces de qualité production, typographie, hiérarchie visuelle</li>
<li><strong>ux-designer</strong> : recherche utilisateur et prototypage</li>
</ul>`,
      },
      {
        heading: 'Git : les commandes que tu utiliseras vraiment',
        content: `<pre><code class="language-bash"># Voir l'état du projet (quels fichiers ont été modifiés)
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
      },
      {
        heading: 'Le terminal : ce qu\'il débloque',
        content: `<p><strong>Automatisation.</strong> Tu peux demander à Claude de travailler sur une liste de tâches en continu, sans te demander confirmation à chaque étape.</p>
<p><strong>Mode sans interruption.</strong> Le flag <code>--dangerously-skip-permissions</code> désactive les confirmations systématiques. Claude applique les changements en continu.</p>
<p><strong>Intégration dans des pipelines.</strong> Claude Code peut être intégré dans des scripts automatisés, des actions GitHub, ou des processus CI/CD.</p>`,
      },
      {
        heading: 'Ressources',
        content: `<h3>Claude Code</h3>
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
      },
    ],
  },
  {
    number: 8,
    title: 'Obtenir un résultat visuel de qualité',
    slug: 'resultat-visuel',
    intro: 'Skills à activer, prompts pour le style visuel, Framer Motion, Shadcn/ui, états de chargement, progressive disclosure, et connexion Figma Console MCP.',
    sections: [
      {
        heading: 'Définir le style visuel dès le premier prompt',
        content: `<p>Le style graphique se pose au début, pas après coup. Une fois que Claude a généré plusieurs fichiers dans une direction stylistique, revenir en arrière demande de tout reprendre.</p>
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
      },
      {
        heading: 'Micro-interactions et animations avec Framer Motion',
        content: `<pre><code class="language-plain">Implémenter les micro-interactions, animations et transitions
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
      },
      {
        heading: 'Interfaces métier avec beaucoup de données : Shadcn/ui',
        content: `<pre><code class="language-plain">Utiliser la librairie Shadcn/ui avec des composants en taille
small pour toute l'interface. Optimiser pour la densité
d'information : listes, colonnes, filtres, badges de statut,
indicateurs d'état. Chaque composant doit afficher le maximum
d'information dans un espace réduit sans sacrifier la lisibilité.</code></pre>
<blockquote>Pourquoi small et non medium ou large : les interfaces de productivité fonctionnent mieux avec des composants compacts. Un tableau de bord avec des composants large ressemble à une maquette de présentation, pas à un outil qu'on utilise 8 heures par jour.</blockquote>`,
      },
      {
        heading: 'États de chargement et feedbacks',
        content: `<pre><code class="language-plain">Implémenter tous les états de l'interface :
- États de chargement avec skeleton loaders pendant la
  récupération des données, spinners pour les actions courtes
- États vides (empty states) avec message explicite et
  action suggérée
- États d'erreur avec message clair et option de réessayer
- Feedback visuel immédiat après chaque action utilisateur :
  confirmation, toast notification, animation de validation
- États transitoires entre deux vues ou deux étapes d'un flux</code></pre>
<p>C'est systématiquement la partie que Claude Code omet si on ne la demande pas explicitement. Un prototype sans états de chargement brise l'illusion de réalité lors d'une présentation client ou d'un test utilisateur.</p>`,
      },
      {
        heading: 'Progressive disclosure et comportement des modales',
        content: `<pre><code class="language-plain">Appliquer les principes de progressive disclosure :
- Afficher d'abord les informations essentielles, révéler
  les détails à la demande (expand, tooltip, drawer)
- Comportement des modales selon les HIG d'Apple et iOS :
  entrée par le bas sur mobile, centré avec fond semi-transparent
  sur desktop, fermeture par tap extérieur ou swipe down
- Drawer latéral pour les panneaux de détail sur desktop
- Bottom sheet pour les actions contextuelles sur mobile</code></pre>`,
      },
      {
        heading: 'Connecter Figma Console MCP',
        content: `<p>Quand on travaille sur un projet avec un design system existant dans Figma, la démarche la plus efficace est de connecter Claude Code directement à ce fichier via <a href="https://docs.figma-console-mcp.southleft.com/" target="_blank" rel="noopener">Figma Console MCP</a>.</p>
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
      },
      {
        heading: 'Exemple de CLAUDE.md pour un projet d\'interface métier',
        content: `<pre><code class="language-markdown"># Conventions visuelles et interactions

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
      },
      {
        heading: 'Récapitulatif : prompts à copier selon le type de projet',
        content: `<table><thead><tr><th>Situation</th><th>Prompt ou action à prioriser</th></tr></thead><tbody>
<tr><td>Interface moderne style Apple</td><td>Prompt style macOS / iPadOS</td></tr>
<tr><td>Animations et micro-interactions</td><td>Framer Motion + HIG Apple + Material Design</td></tr>
<tr><td>Dashboard ou interface data-heavy</td><td>Shadcn/ui taille small</td></tr>
<tr><td>États de chargement et feedbacks</td><td>Prompt états complets</td></tr>
<tr><td>Modales et navigation complexe</td><td>Prompt progressive disclosure</td></tr>
<tr><td>Design system existant dans Figma</td><td>Figma Console MCP + prompt tokens</td></tr>
<tr><td>Session sans CLAUDE.md</td><td>Activer skills frontend-design + creative-director</td></tr>
</tbody></table>`,
      },
    ],
  },
  {
    number: 9,
    title: 'Skills Claude pour les designers',
    slug: 'skills',
    intro: 'Les skills sont des fichiers d\'instructions que Claude applique à la demande. Ils s\'installent en quelques secondes et changent significativement la qualité des outputs.',
    sections: [
      {
        heading: 'Comment installer un skill',
        content: `<pre><code class="language-plain">1. Télécharge le fichier .md du skill ci-dessous
2. Dans Claude, ouvre Paramètres > Skills
3. Crée un nouveau skill, colle le contenu du fichier
4. Nomme-le et sauvegarde
5. Mentionne le skill dans ta conversation pour l'activer</code></pre>
<blockquote>Pour les skills avec un lien externe : tu peux aussi installer directement depuis le lien marketplace sans télécharger le fichier.</blockquote>`,
      },
      {
        heading: 'Skills visuels et frontend',
        content: `<h3>frontend-design</h3>
<p>Oriente Claude vers des interfaces de qualité production : typographie, espacement, hiérarchie visuelle. Évite les esthétiques génériques des outputs IA par défaut.</p>
<p><strong>Cas d'usage :</strong> tout projet où le rendu visuel compte, composants UI, landing pages, prototypes présentés à un client.</p>
<p><a href="https://skillsmp.com/skills/anthropics-claude-code-plugins-frontend-design-skills-frontend-design-skill-md" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:8px;background:#2D5CF3;color:#fff;font-size:13px;font-weight:500;text-decoration:none">Installer depuis le marketplace</a></p>
<hr/>
<h3>creative-director</h3>
<p>Apporte un regard éditorial sur les décisions de composition et de direction artistique. Utile quand l'interface doit avoir un caractère visuel fort ou quand on part d'une page blanche sans référence précise.</p>
<p><strong>Cas d'usage :</strong> exploration de direction visuelle, interfaces de marque, projets avec identité visuelle forte, présentations client.</p>
<p><a href="https://skills.sh/smixs/creative-director-skill/creative-director" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:8px;background:#2D5CF3;color:#fff;font-size:13px;font-weight:500;text-decoration:none">Installer depuis le marketplace</a></p>`,
      },
      {
        heading: 'Skills design et UX',
        content: `<h3>ux-designer</h3>
<p>Assistance experte en recherche utilisateur, wireframing, prototypage et stratégie design. Couvre les user flows, personas, guides de tests d'utilisabilité, architecture d'information.</p>
<p><strong>Cas d'usage :</strong> cadrage de projet, préparation de tests utilisateurs, documentation UX, définition de parcours.</p>
<h3>interactive-prototype</h3>
<p>Documentation d'interactions pour Figma, Principle, Bolt et Lovable. Génère des spécifications de micro-interactions, timelines d'animation, et specs techniques pour l'implémentation.</p>
<p><strong>Cas d'usage :</strong> handoff d'interactions vers un développeur, documentation d'animations, spécifications de comportement.</p>
<h3>spec-ideation</h3>
<p>Cadre structuré pour générer des solutions en phases d'expansion, contraction et documentation. Utile pour les sessions de cadrage produit et les ateliers d'idéation avec un client.</p>
<p><strong>Cas d'usage :</strong> cadrage de mission, ateliers avec un client, arbitrages produit, exploration de concepts.</p>`,
      },
      {
        heading: 'Skills rédactionnels',
        content: `<h3>victor-voice</h3>
<p>Posture rédactionnelle pour tout output narratif : posts LinkedIn, briefs, notes de consulting. Élimine les tics d'écriture LLM, les fausses constructions dramatiques, le ton condescendant.</p>
<p><strong>Cas d'usage :</strong> posts LinkedIn, propositions commerciales, notes de cadrage, tout texte destiné à être publié ou partagé.</p>
<h3>francais-parfait</h3>
<p>Règles d'écriture en français natif : accentuation des majuscules (É, À), ligatures (œuvre, cœur), guillemets français, zéro emdash. Prioritaire sur tout autre style quand l'output est en français.</p>
<p><strong>Cas d'usage :</strong> tout output en français destiné à être publié ou partagé.</p>`,
      },
      {
        heading: 'Skills de marque et présentation',
        content: `<h3>Brand</h3>
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
      },
    ],
  },
];
