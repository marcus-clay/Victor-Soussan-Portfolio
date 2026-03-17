# Claude Code et Figma MCP : concevoir et implémenter sans changer d'outil

## Le fossé design-code est un problème d'outillage, pas de compétences

Depuis que le design produit numérique existe, un fossé sépare la maquette du code. Les designers travaillent dans un environnement, les développeurs dans un autre, et entre les deux se trouve une couche de traduction faite de documents de specs, de redlines, d'outils de handoff et de réunions. Chaque traduction introduit de la dérive. Les couleurs décalent de quelques valeurs hexadécimales. Les espacements sont approximés. Un composant qui semblait correct dans Figma s'affiche différemment dans le navigateur parce que le développeur a interprété la logique de mise en page à sa manière.

Ce fossé a des coûts réels, et ils sont rarement comptabilisés. Des cycles d'intégration qui devraient prendre quelques heures s'étirent sur plusieurs jours. Les designers ouvrent des tickets de QA visuelle. Les développeurs contestent des maquettes qu'ils jugent trop coûteuses à implémenter fidèlement. Avec le temps, l'équipe développe une tolérance silencieuse pour le « à peu près », et le produit accumule de petites incohérences qui érodent l'expérience utilisateur pixel par pixel.

Le problème est structurel. Quand deux disciplines travaillent à partir de sources de vérité distinctes, l'alignement exige un effort manuel constant. Les outils de handoff (Zeplin, puis les Dev Mode de Figma) ont réduit la friction, mais ils n'ont pas supprimé la traduction. Le designer produit toujours un artefact statique que quelqu'un d'autre doit interpréter pour le transformer en code. C'est cette interprétation qui génère la dérive.


## Le fonctionnement concret de la connexion Figma MCP et Claude Code

Figma MCP (Model Context Protocol) est un protocole qui permet à des outils externes de lire les données de design directement depuis les fichiers Figma. Connecté à Claude Code, il crée un pont : l'agent IA peut inspecter un composant dans Figma, lire ses propriétés (espacements, couleurs, tokens typographiques, contraintes de mise en page, états de variantes), et générer du code qui correspond à l'intention de design avec une haute fidélité.

Le workflow en pratique suit trois temps. D'abord, je conçois un composant ou un écran dans Figma, en suivant les tokens et la structure du design system que j'ai établis. Ensuite, dans Claude Code, je référence le frame Figma concerné. Claude Code lit le composant via MCP : il récupère la hiérarchie des calques, les paramètres d'auto-layout, les valeurs de tokens spécifiques, le contenu textuel. À partir de ces données structurées, il génère un composant React avec des classes Tailwind qui correspond au design original.

Le premier résultat est rarement parfait. Mais il est suffisamment proche pour que l'itération se fasse au bon niveau. Au lieu de reconstruire un composant de zéro, j'ajuste des valeurs de padding, j'affine le comportement responsive, ou je peaufine un état d'interaction. La conversation entre design et code devient granulaire et productive plutôt que globale et frustrante.

La deuxième étape est celle où la valeur réelle apparaît. Une fois le composant rendu dans le navigateur, je l'évalue en contexte : aux côtés d'autres composants, avec du vrai contenu, à différentes tailles de viewport. Si quelque chose doit changer, je retourne dans Figma, j'ajuste le design, et Claude Code lit la version mise à jour. La boucle prend quelques minutes. Je peux enchaîner cinq ou six itérations dans une seule session de travail, chacune informée par ce que j'ai observé dans le produit réel.


## Un cas concret : du composant Figma au composant déployé

Pour rendre ce workflow tangible, voici comment il s'est déroulé sur un projet récent. Je travaillais sur la refonte de mon portfolio (celui que vous lisez), et je devais créer un composant de carte projet : une vignette avec image de couverture, titre, rôle, période, et un résumé d'une ligne. Le composant devait fonctionner en mode clair et sombre, s'adapter du mobile au desktop, et respecter le design system en place (tokens de couleur, espacement, typographie).

Dans Figma, j'ai conçu le composant avec auto-layout, des tokens nommés pour chaque valeur de couleur et d'espacement, et deux variantes (clair/sombre). Le travail de design a pris environ 45 minutes, ce qui est normal pour un composant avec contraintes responsive et deux thèmes.

Dans Claude Code, j'ai référencé le frame Figma. L'agent a lu la structure : un conteneur flex vertical, une image en ratio 16:9 avec border-radius de 12px, un bloc texte avec titre en font-semibold, sous-titre en text-sm text-gray-500, et un espacement de 12px entre l'image et le texte. Il a généré un composant React/Tailwind fonctionnel en moins de deux minutes.

Le premier rendu dans le navigateur a révélé deux ajustements nécessaires. L'image de couverture avait besoin d'un traitement object-cover que le composant Figma ne spécifiait pas explicitement. Et l'espacement entre les cartes en mode grille demandait un gap différent de celui que Figma utilisait en auto-layout (Figma raisonne en espacement entre enfants, CSS en gap sur le conteneur parent). J'ai corrigé ces deux points en une itération de cinq minutes.

Le composant final, testé sur mobile et desktop, en mode clair et sombre, avec du vrai contenu (titres de différentes longueurs, images de ratios variés), était déployé sur Vercel moins de deux heures après le début du travail dans Figma. Dans un workflow traditionnel avec handoff, cette séquence aurait pris entre deux et cinq jours, selon la disponibilité du développeur et le nombre d'allers-retours de QA.

Un deuxième cas illustre le comportement sur des composants plus complexes. Sur le même projet, je devais produire une page d'étude de cas complète : un layout avec sidebar de navigation (table des matières), un corps éditorial avec images pleine largeur, des blocs de témoignage intégrés, et un système de lightbox pour les captures d'écran. Le tout devait s'adapter entre un layout à deux colonnes sur desktop et un layout empilé sur mobile, avec la sidebar qui se transforme en menu déroulant.

Ici, le workflow a montré ses limites et ses forces simultanément. La structure globale de la page (sidebar + corps éditorial) a été générée correctement dès la première passe. Le positionnement sticky de la sidebar, le calcul du scroll-spy pour surligner la section active dans la table des matières, et la logique responsive de basculement sidebar/dropdown ont nécessité trois itérations supplémentaires avec des instructions précises. Le résultat final était fonctionnel et fidèle au design, mais il a fallu environ une demi-journée au lieu des deux heures du composant carte. La complexité n'est pas linéaire : un composant deux fois plus complexe en apparence peut demander cinq fois plus d'itérations.


## Ce qui fonctionne, ce qui casse, ce qui demande du jugement

Après plusieurs mois d'utilisation de ce workflow sur des projets variés (portfolio personnel, études de cas, prototypes clients), voici un bilan de terrain.

Les composants simples à moyennement complexes se traduisent de manière fiable. Cartes, en-têtes, barres de navigation, mises en page de formulaires, éléments de liste : tout cela passe avec une haute fidélité parce que leur structure se transpose proprement en code. Le gain de temps sur ces composants du quotidien est substantiel, souvent entre 70 et 80 % par rapport à un processus de handoff traditionnel.

Les interactions complexes, les animations et les cas limites nécessitent encore un jugement humain. Claude Code peut générer un état hover ou une transition CSS, mais les micro-interactions nuancées (une animation spring sur l'expansion d'une carte, une entrée en liste avec décalage progressif) requièrent des instructions explicites et précises. Le résultat par défaut, sans guidage, sera fonctionnel mais générique.

Le comportement responsive est un domaine où l'apport du designer reste essentiel. Les maquettes Figma sont généralement créées à des breakpoints spécifiques. L'IA peut générer du code responsive, mais les décisions sur la façon dont une mise en page doit s'adapter entre les breakpoints (ce qui se replie, ce qui se redistribue, ce qui disparaît) sont des décisions de design qui doivent être formulées, pas supposées.

Il y a aussi un seuil de qualité à prendre en compte. Si le fichier Figma est désordonné (calques non nommés, utilisation incohérente de l'auto-layout, composants détachés), l'IA lira des données désordonnées et produira du code désordonné. L'outil amplifie la qualité de la pratique design, et il ne compense pas un manque de rigueur.


## Les design systems deviennent la clé de voûte

Ce workflow met en lumière un phénomène que j'observe depuis plusieurs années dans les équipes produit : la valeur d'un design system se mesure moins à sa couverture de composants qu'à la cohérence de sa structure.

Quand les tokens sont bien nommés et que les composants suivent des patterns cohérents, l'IA génère un meilleur code parce qu'elle dispose de données plus claires. Un bouton nommé « Button/Primary/Large » avec des tokens « color/brand-primary » et « spacing/button-padding-lg » se traduit en code propre et prévisible. Le même bouton avec un calque nommé « Frame 247 » et des valeurs de couleur en dur produit du code fragile et difficile à maintenir.

Sur un projet récent, j'ai conçu un design system complet dans Figma (fondations, composants atomiques, patterns composites), puis je l'ai implémenté sur un site dédié en Astro et Tailwind, piloté intégralement par Claude Code. Le design system couvrait les fondations (couleur, typographie, espacement, élévation), les composants atomiques (boutons, inputs, badges, tags), et les patterns composites (cartes, navigation, formulaires). L'écart entre le design voulu et le résultat implémenté était quasi nul sur les composants atomiques, et minimal sur les patterns composites.

Cette expérience a confirmé une intuition : dans un workflow assisté par IA, le design system n'est plus seulement un outil de cohérence visuelle. Il devient le contrat d'interface entre le designer et l'agent de code. Plus ce contrat est explicite et structuré, plus le résultat est fidèle.

J'ai observé le même mécanisme à plus grande échelle chez UNOWHY, où j'ai conçu un design system couvrant cinq marques produit sur un écosystème logiciel destiné à 500 000 élèves. Le vrai défi d'un design system multi-marque n'est pas technique, il est organisationnel : maintenir la cohérence des tokens et des composants quand plusieurs équipes contribuent en parallèle. Dans un workflow classique, cette cohérence se dégrade naturellement au fil des mois. Avec un agent de code qui lit les tokens comme source de vérité, la dérive est détectée immédiatement : si un composant ne respecte pas le token, le code généré l'expose. Le design system devient auto-contrôlant. C'est un argument supplémentaire pour investir dans la rigueur du design system en amont, même quand l'équipe est petite, et d'autant plus quand elle est grande.


## La boucle de feedback change la manière de concevoir

Le changement le plus significatif de ce workflow est la qualité de la boucle de feedback. Dans un processus traditionnel, un designer prend des décisions dans un environnement statique (Figma) puis attend des jours ou des semaines pour voir ces décisions rendues dans le produit réel. Le temps que l'implémentation soit prête pour la revue, le designer est passé à la fonctionnalité suivante. La QA visuelle devient une arrière-pensée, et les compromis s'accumulent.

Avec Figma MCP et Claude Code, je vois le résultat d'une décision de design en quelques minutes. Cette immédiateté change la façon de concevoir. Je prends plus de risques dans la maquette parce que je sais que je pourrai les évaluer rapidement. Je détecte les problèmes de proportion plus tôt parce que je vois le composant dans un vrai contexte navigateur, pas seulement sur un canvas Figma. Je fais de meilleurs choix typographiques parce que je peux les tester avec du contenu réel et un rendu authentique.

La boucle change aussi la nature de l'itération. Au lieu d'un grand cycle de feedback (design, handoff, implémentation, QA, révision), le processus devient une série de petits cycles rapides. Chaque cycle produit un incrément tangible. L'effet cumulé est un résultat de meilleure qualité en moins de temps, avec moins de malentendus en chemin.


## Ce que cela implique pour les équipes, pas seulement pour les individus

La plupart des discussions autour de l'IA dans le design se concentrent sur le praticien individuel : est-ce que ça me rend plus rapide ? Est-ce que ça remplace une partie de mon travail ? Ces questions sont légitimes, mais elles passent à côté d'un enjeu organisationnel plus large.

Dans une équipe produit classique, le cycle design-développement est le goulot d'étranglement principal. Un designer produit des maquettes, les transmet à un développeur, attend l'implémentation, revoit le résultat, ouvre des tickets de correction, et le cycle recommence. Ce processus séquentiel génère des files d'attente, des dépendances, et des frustrations des deux côtés.

Quand un designer peut valider l'implémentation d'un composant en temps réel, la dynamique de l'équipe change. Le designer ne produit plus un artefact intermédiaire (la maquette) en espérant qu'il sera traduit fidèlement. Il produit un résultat vérifiable immédiatement. Les allers-retours de QA visuelle diminuent. Le développeur peut se concentrer sur la logique métier, l'architecture, et les performances, plutôt que sur le pixel-perfect d'une marge qui diffère de trois pixels entre la maquette et le navigateur.

Cela ne signifie pas que le développeur disparaît du processus. L'intégration front-end reste un métier qui demande une compréhension fine de l'accessibilité, de la performance, de la gestion d'état, et de l'architecture des composants. Ce qui change, c'est la nature de la collaboration : au lieu de traduire des maquettes en code, le développeur valide, optimise et étend le code que le workflow IA a produit. Le niveau de la conversation monte. Les discussions portent sur l'architecture et les compromis techniques, pas sur l'ajustement d'un padding.

Pour les organisations qui peinent à recruter ou à retenir des profils front-end spécialisés, ce workflow ouvre aussi une piste pragmatique. Un designer senior équipé de Claude Code et Figma MCP peut couvrir une partie du spectre d'intégration qui nécessitait auparavant un développeur dédié. Dans les contextes de petites équipes ou de phases exploratoires (prototypage rapide, validation d'hypothèses), cette autonomie accrue du designer réduit le nombre de dépendances et accélère le temps de mise en marché.

Ce constat résonne particulièrement dans le contexte français, où les budgets numériques des services publics et de l'éducation nationale sont contraints. J'ai travaillé six ans dans l'éducation numérique (SQOOL, chez UNOWHY), et j'ai vu de l'intérieur la difficulté de construire des produits de qualité avec des équipes réduites et des cycles budgétaires annuels. Un outil de supervision de classe destiné aux enseignants doit être irréprochable en termes d'ergonomie, parce que l'enseignant n'a ni le temps ni la tolérance pour un produit « à peu près ». Quand une équipe de trois personnes peut produire et valider des composants en temps réel plutôt que de passer par un cycle de handoff qui consomme la moitié du sprint, la qualité du produit final change de manière perceptible pour l'utilisateur.

Plus récemment, sur France VAE (Validation des Acquis de l'Expérience), un service public numérique opéré par beta.gouv, j'ai utilisé ce workflow pour prototyper et déployer une interface complexe en une semaine, là où le processus classique de specs, validation, développement, recette aurait pris un mois. Le prototype déployé a permis de tester des hypothèses avec de vrais utilisateurs avant d'engager le développement définitif. Dans un contexte de service public où chaque euro investi doit être justifié, cette capacité à valider vite et à moindre coût change la dynamique de décision.

Ce que j'observe autour de moi, chez les designers qui intègrent ce type de workflow dans leur pratique, c'est que la qualité de leur travail progresse de manière mesurable, parce que la boucle entre intention et exécution devient suffisamment courte pour qu'ils puissent corriger, affiner, et apprendre en continu. Le fossé entre ce qu'on conçoit et ce qui est réellement livré se réduit. Et pour ceux d'entre nous qui se sont toujours souciés de cette cohérence entre le design et le produit final, c'est probablement la transformation la plus concrète que ces outils apportent.
