# Post LinkedIn : Ship to Show

---

J'ai passé une session de travail à transformer un prototype d'interface en case study publiable. Prototype React brut le matin, case study avec 7 vidéos animées et déploiement Vercel le soir.

Le prototype en question : RiskOS, un outil de détection de fraude pour les analystes des néobanques européennes. Une expérimentation sur les interfaces agentiques, pour comprendre comment intégrer un agent IA dans un flux de décision humain sans que l'analyste perde le contrôle.

Le constat de départ est simple. Quand on fait du product design, on passe beaucoup de temps à construire des prototypes, mais très peu à les documenter. Les projets s'accumulent dans des dossiers, sans vidéos, sans narration, sans case study. Et quand il faut montrer son travail, il faut tout reprendre de zéro.

J'ai structuré le processus en 7 phases pour le rendre reproductible.

Cadrer : analyser le prototype, identifier le secteur, les utilisateurs, le problème, le point de vue de design. Produire un executive summary.

Structurer : rendre le prototype exécutable en local. Package.json, config, localhost.

Enrichir : ajouter les parcours manquants pour que chaque fonctionnalité soit filmable. Des données variées par cas, des intégrations simulées (Slack, SMS, export), des micro-interactions.

Filmer : produire les vidéos avec un pipeline Puppeteer + FFmpeg. Des fichiers HTML autonomes avec des animations CSS choreographiées, capturés frame par frame puis encodés en MP4. Pas besoin d'After Effects.

Raconter : rédiger le case study avec une structure narrative. Chaque vidéo est accompagnée d'une légende qui décrit la frustration utilisateur et le bénéfice apporté. Le texte cadre, les vidéos démontrent.

Empaqueter : créer le repo GitHub, déployer sur Vercel, produire un fichier d'intégration pour le portfolio.

Publier : intégrer le case study dans le site portfolio.

Claude Code m'a accompagné sur l'ensemble de la chaîne. L'IA est un accélérateur sur les tâches de mise en forme, de production vidéo et de structuration, mais les décisions de design, le cadrage du cas d'usage, les choix narratifs et le positionnement du case study restent les miens. L'outil amplifie le travail, il ne le remplace pas.

Le résultat pour RiskOS : 7 vidéos animées en boucle (style Late Checkout Agency), un case study bilingue FR/EN, un prototype déployé, et un pack d'intégration pour mon site portfolio. Le tout en une session de travail.

Le framework s'appelle Ship to Show. Il est documenté et open source.

Ce qui m'intéresse dans cette approche : elle pose la question de l'industrialisation de la documentation design. Les designers produisent constamment des artefacts de qualité qui ne sont jamais montrés parce que le coût de mise en forme est trop élevé. Réduire ce coût à une session de travail change la donne sur la visibilité du travail de design.

Prototype : https://riskos-gulcbxw52-hugos-projects-0ac0cf31.vercel.app
GitHub : https://github.com/marcus-clay/riskos-fraud-detection
