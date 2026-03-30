# Anti-patterns : tournures interdites en français

Liste exhaustive des patterns à détecter et corriger. Chaque section contient des exemples interdits et leur réécriture correcte.

## 1. Structure rhétorique « fausse opposition dramatique »

La construction la plus caractéristique des LLM. Toujours la réécrire.

| Interdit | Correction |
|---|---|
| Ce n'est pas un détail. C'est un changement majeur. | Ce changement a un impact significatif. |
| Ce n'est pas un outil. C'est une révolution. | Cet outil apporte des améliorations notables. |
| Il ne s'agit pas de X. Il s'agit de Y. | L'enjeu porte sur Y. |
| Ce n'est pas simplement X. C'est aussi Y. | X s'accompagne de Y. |
| Le problème n'est pas X. Le problème, c'est Y. | Le problème vient de Y. |

**Variantes également interdites :**
- « Plus qu'un X, c'est un Y. »
- « X ? Non. Y. »
- « Oubliez X. Pensez Y. »
- « X, certes. Mais Y. » (quand utilisé comme effet dramatique)

## 2. Exagérations et inflation lexicale

### Mots et expressions interdits (sauf justification factuelle)

| Interdit | Préférer |
|---|---|
| révolution / révolutionnaire | amélioration, avancée, changement notable |
| game-changer | avantage concurrentiel, apport significatif |
| paradigme (shift) | approche, cadre, changement d'approche |
| disruption / disruptif | innovation, rupture (si factuel) |
| absolument essentiel | nécessaire, important |
| fondamental (galvaudé) | central, structurant |
| transformer (quand « modifier » suffit) | modifier, adapter, faire évoluer |
| stratégique (quand « utile » suffit) | utile, pertinent, adapté |
| puissant (pour un outil/feature) | efficace, performant |
| incontournable | recommandé, très utile |
| clé (« un élément clé ») | important, central |

### Superlatifs non étayés
- Interdit : « le plus important », « la meilleure approche », « absolument crucial ».
- Acceptable uniquement avec données ou comparaison explicite.

## 3. Posture de sachant et condescendance

### Tournures magistrales (interdites)

| Interdit | Pourquoi |
|---|---|
| Il est important de comprendre que... | Présuppose l'ignorance du lecteur |
| Il faut bien saisir que... | Condescendant |
| Notons que... | Ton professoral |
| Rappelons que... | Ton professoral |
| Soulignons que... | Ton professoral |
| Il convient de préciser que... | Bureaucratique et distant |
| Force est de constater que... | Pompeux |
| En effet, ... (en début de phrase) | Tic LLM, souvent inutile |

### Tournures présupposant l'ignorance (interdites)

| Interdit | Correction |
|---|---|
| Comme vous le savez peut-être... | Supprimer, aller directement au fait. |
| Contrairement à ce qu'on pourrait croire... | Reformuler directement. |
| Beaucoup pensent que X, mais en réalité... | Énoncer le fait directement. |
| Il est courant de confondre X et Y... | Distinguer X et Y directement. |

### Auto-mise en valeur implicite (interdite)

| Interdit | Correction |
|---|---|
| En réalité, ... | Supprimer ou reformuler. |
| La vérité, c'est que... | Énoncer le fait directement. |
| Ce que beaucoup ignorent, c'est que... | Énoncer le fait. |
| Le point crucial ici, c'est... | Aller au fait. |
| L'erreur classique consiste à... | Décrire la bonne pratique directement. |

## 4. Tournures non natives et anglicismes

### Calques lexicaux de l'anglais (interdits)

| Interdit | Correct |
|---|---|
| adresser un problème | traiter un problème, résoudre un problème |
| faire du sens | avoir du sens |
| implémenter | mettre en place, déployer (sauf contexte technique précis) |
| supporter (au sens de « prendre en charge ») | prendre en charge, gérer |
| délivrer de la valeur | apporter de la valeur, créer de la valeur |
| finaliser | achever, terminer, conclure |
| impacter | affecter, avoir un effet sur |
| performer | être performant, obtenir de bons résultats |
| prioriser | hiérarchiser, donner la priorité à |
| digitaliser | numériser |
| scalable | extensible, qui passe à l'échelle |
| leverager | tirer parti de, s'appuyer sur |
| onboarder | accueillir, intégrer |
| process | processus, procédure |
| feedback | retour, avis |
| briefer | informer, mettre au courant |
| challenger | remettre en question, questionner |

### Syntaxe anglicisante (interdite)
- Phrases trop courtes enchaînées sans connecteurs (style journalistique anglais).
- Sujet-verbe-complément systématique sans variation syntaxique.
- Paragraphes d'une seule phrase successifs pour créer un effet dramatique.

### Expressions idiomatiques forcées ou mal employées
- Éviter toute expression idiomatique dont l'usage semble artificiel ou recherché.
- Privilégier le vocabulaire courant et précis plutôt que l'expression imagée.
- Un francophone natif cultivé utilise rarement plus de deux expressions idiomatiques par page.

## 5. Autres tics LLM en français

| Interdit | Pourquoi |
|---|---|
| « Plongeons dans... » / « Explorons... » | Traduction littérale de « Let's dive into » |
| « Décortiquons... » | Artificiel |
| « En un mot : ... » (suivi de plusieurs mots) | Tic rhétorique |
| « Concrètement, ... » (en début de chaque point) | Répétitif et artificiel |
| « C'est là que X entre en jeu. » | Calque de « That's where X comes in » |
| « La question n'est pas si, mais quand. » | Cliché LLM |
| « Et c'est exactement ce que... » | Tic rhétorique |
| « Voici pourquoi. » (phrase isolée) | Calque de « Here's why. » |
| « Spoiler : ... » | Registre inapproprié en contexte pro |
| « TL;DR » / « En bref » (systématique) | Tic de format |
| « Passons aux choses sérieuses. » | Artificiel |
| « Sans plus attendre, ... » | Artificiel |
| Commencer par « Alors, ... » | Faux ton oral |
| Commencer par « Eh bien, ... » | Faux ton oral |
| « ...et bien plus encore ! » | Remplissage vide |

## 6. Règle de réécriture

Quand un anti-pattern est détecté, appliquer cette logique :
1. Identifier l'information utile dans la phrase.
2. La reformuler de la manière la plus directe et naturelle possible.
3. Si la phrase ne contient aucune information utile après suppression du pattern, la supprimer entièrement.
