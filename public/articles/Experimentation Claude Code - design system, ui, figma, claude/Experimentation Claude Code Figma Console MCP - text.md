# Experimentation Claude Code Figma Console MCP - text

<Post à intégrer>

Depuis dix ans, une part croissante du travail du designer s'est déplacée vers la gestion de l'outil : frames à construire, tokens à maintenir, variables à synchroniser. Le temps passé à faire vivre le fichier Figma a grandi avec sa complexité.

La question que je cherche à résoudre depuis quelques mois : est-ce que cette partie-là peut être pilotée, pendant que le designer se concentre sur ce qui compte ?

Pour les équipes produit, ça réduit le temps entre une idée et quelque chose de testable dans le navigateur, avant d'engager le delivery. Pour les designers, ça libère du temps de cadrage et de conception que la gestion de l'outil avait progressivement absorbé.

Voilà où j'en suis. 3 minutes 21, dans un projet Figma réel : modifier les tokens et variables d'un design system, mettre à jour les écrans en cohérence, ajouter de nouveaux prototypes avec transitions, depuis Claude Code. Le fichier suit les décisions, pas l'inverse.

Il reste des corrections manuelles, et l'ensemble n'est pas encore sans friction. Mais la direction est claire pour les designers qui créent des systèmes et prototypent des parcours.

Dans votre équipe, combien de temps s'écoule entre une décision de design et quelque chose qu'un utilisateur peut vraiment tester ? Et quelle part de ce temps est consacrée à mettre les maquettes à jour plutôt qu'à concevoir ?

hashtag#ProductDesign hashtag#Figma hashtag#ClaudeCode hashtag#DesignSystem hashtag#PrototypageIA


--

<Post auquel je souhaite faire référence, que j’ai écrit avant>
Pendant un an, j'ai travaillé avec deux approches parallèles qui ne se parlaient pas.

D'un côté, l'approche classique dans Figma : librairie de marque, librairie de composants, fichiers de conception connectés, parcours détaillés pour le handoff avec les développeurs. Rigoureux, structuré, mais complexe à produire et à faire évoluer.

De l'autre, le prototypage avec Claude Code et les LLMs : des interfaces HTML réalistes générées en quelques minutes, utilisables en test utilisateur, présentables à un décideur, mais complètement déconnectées du design system en place dans Figma. Utiles pour converser, inutiles pour livrer en production.

Depuis quelques semaines, Figma MCP Console permet de connecter les deux. C'est un serveur MCP développé par TJ Pitre et l'équipe de Southleft, LLC, et il change concrètement la donne pour les designers qui travaillent avec des outils génératifs.

Claude Code peut maintenant générer un fichier Figma complet : un design system avec ses tokens, ses variables, ses composants, puis implémenter les écrans qu'on lui décrit en spécification, connecter les parcours entre eux et poser les transitions. En sortie, on récupère un fichier Figma autonome, intéractif, avec une application complète à l'intérieur.

La semaine dernière, j'ai conçu une application mobile pour le secteur médical de cette façon. 10 écrans, un UI kit complet avec styles, tokens, variables et une vingtaine de composants principaux. En deux heures.

Ce qui m'intéresse le plus dans cette évolution, ce n'est pas la vitesse de production. C'est la possibilité de maintenir un design system à jour au fil de l'eau, de mettre à jour les composants et les variables en itérant directement avec Claude Code, sans avoir à reprendre chaque écran à la main. Et de garder ce design system comme source de vérité partagée, côté design et côté développement.

On n'en est pas encore à un environnement de production parfaitement fluide. Il y a encore des erreurs d'implémentation à vérifier, des corrections manuelles à faire, et l'ensemble reste assez artisanal. Mais on retrouve petit à petit la liberté et la vitesse d'exécution du prototypage génératif, dans un environnement qui commence à ressembler à celui dans lequel les équipes livrent réellement.

Si tout va bien, on approche du moment où le design system côté designer et le design system côté front-end ne seront plus deux artefacts distincts maintenus par des humains qui font le pont entre les deux. On n'y est pas encore, mais la direction est claire.

Merci à TJ Pitre et à Southleft pour le travail sur Figma MCP Console. C'est le type d'outil qui fait avancer le métier sans avoir besoin d'en faire la promotion.
