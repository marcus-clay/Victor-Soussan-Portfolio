# Hero redesign + landing page /interventions

Date : 2026-03-30
Auteur : Victor Soussan + Claude

## Contexte

Victor est sur le point de prendre un poste en CDI (Senior Product Designer). Le site portfolio doit pivoter d'une vitrine de freelance vers une plateforme qui :
1. Montre 15 ans d'expérience en conception produit avec un niveau de craft élevé
2. Signale une avance sur l'intégration IA dans le design (Claude Code, Figma MCP, prototypage IA)
3. Crée un chemin de conversion vers des interventions (conférences, brownbags, workshops, webinaires) que Victor développe progressivement via son contenu LinkedIn
4. Fonctionne comme landing page pour le trafic LinkedIn (posts sur Claude Code, Figma MCP, pratique design augmentée)

Le positionnement est celui d'un design studio indépendant : retenue, craft, le travail parle. Pas de phrases marketing, pas de déclarations à la première personne, pas de claims non prouvés.

---

## Partie 1 : Hero section redesign

### Structure (desktop, 1440px)

Layout en deux colonnes : bloc texte à gauche (flex-1), photo portrait à droite (fixe).

De haut en bas, colonne gauche :

1. **Badge** : « Disponible pour collaborations et interventions »
2. **Tagline h1** : « Frame. Design. Ship. »
3. **Sous-titre** : « 15 ans de conception produit, du cadrage à la livraison. »
4. **Pills de compétences** : Product Design, Design Systems, Prototypage IA, Claude Code
5. **CTA primaire** : « Voir les projets » → scroll vers section projets
6. **CTA secondaire** : « Explorer le guide Claude Code » → /guide/claude-code
7. **Logos clients** : Airbus, Orange, beta.gouv, Dailymotion, Vinci, Unowhy (gris, opacity 40%)

Colonne droite : photo portrait Victor (existante), cachée sur mobile.

### Spécifications par élément

#### Badge

- Texte : « Disponible pour collaborations et interventions »
- Point vert animé (pulse CSS existant)
- Cliquable → /[lang]/interventions
- Le mot « interventions » a un underline discret au hover pour signaler le lien
- Style : border border-gray-200 rounded-full px-3.5 py-1.5 text-xs text-gray-500 hover:border-gray-300 cursor-pointer transition-colors

#### Tagline h1

- Contenu : « Frame. Design. Ship. »
- Typographie : text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.035em] leading-[1.05]
- Couleur : text-gray-900
- Pas de gradient, pas de couleur sur un mot individuel

#### Sous-titre

- Contenu : « 15 ans de conception produit, du cadrage à la livraison. »
- Typographie : text-lg md:text-xl text-gray-500 font-normal tracking-[-0.01em]
- Une seule ligne sur desktop, wrap naturel sur mobile

#### Pills

- 4 pills : Product Design, Design Systems, Prototypage IA, Claude Code
- Style : rounded-full bg-gray-100 text-gray-600 text-sm px-3.5 py-1.5
- Layout : flex gap-2 flex-wrap
- Non cliquables (pas de hover, pas de lien). Informationnelles.

#### CTA primaire

- Texte : « Voir les projets »
- Action : scrollToSection('projects')
- Style : bg-[#2D5CF3] text-white rounded-full px-6 py-3 font-medium hover:bg-[#2450d9] shadow-sm hover:shadow-md transition
- Icône : ArrowUpRight (Phosphor) à droite, size 16

#### CTA secondaire

- Texte : « Explorer le guide Claude Code »
- Action : navigation vers /[lang]/guide/claude-code
- Style : border border-gray-200 text-gray-700 rounded-full px-6 py-3 font-medium hover:border-gray-300 transition
- Icône : ArrowUpRight (Phosphor) à droite, size 16

#### Logos clients

- 6 logos : Airbus, Orange, beta.gouv, Dailymotion, Vinci, Unowhy
- Style : flex items-center gap-8, images en grayscale, opacity-40
- Pas de titre « Ils m'ont fait confiance » ni label
- Position : sous les CTA, séparés par un espacement de 32px
- Mobile : scroll horizontal ou 2 lignes

#### Photo

- Image existante : /images/photos victor/image_victor_home.png
- Taille : w-[300px] lg:w-[340px], h-[380px] lg:h-[440px]
- Style : rounded-3xl, object-cover
- Cachée sous md (hidden md:block)

### Éléments supprimés

| Élément | Raison |
|---|---|
| « Lead Product Designer end-to-end » | Titre de poste, remplacé par le sous-titre |
| Gradient bleu sur « end-to-end » | Incohérent avec la retenue studio |
| Ligne « SaaS B2B & B2G · Interfaces... » | Remplacée par les pills |
| Paragraphe de description (5 lignes) | Trop long, remplacé par sous-titre + pills + logos |
| CTA « Presentation 1 min » | Remplacé par CTA guide Claude Code |
| Blobs décoratifs (gradient background) | Bruit visuel, hero studio propre |

### Animation

- Conserver le stagger Framer Motion existant (0.08s entre enfants)
- Easing existant : [0.23, 1, 0.32, 1]
- Les logos apparaissent en dernier dans la séquence, avec un fade-in opacity

### Mobile (< 768px)

- Photo cachée
- Tagline en text-4xl (wrap sur 2-3 lignes)
- CTA empilés verticalement, pleine largeur (w-full)
- Pills en flex-wrap sur 2 lignes
- Logos en scroll horizontal (overflow-x-auto, pas de scrollbar visible)
- Sous-titre : descShort utilisé si besoin (traductions existantes)

### Traductions à mettre à jour (translations.ts)

```
hero: {
  availability: "Available for collaborations and engagements",
  tagline: "Frame. Design. Ship.",
  subtitle: "15 years in product design, from framing to delivery.",
  cta_projects: "View projects",
  cta_guide: "Explore the Claude Code guide",
  // pills are not translated (terms are industry-standard in both languages)
}
```

```
hero_fr: {
  availability: "Disponible pour collaborations et interventions",
  tagline: "Frame. Design. Ship.",
  subtitle: "15 ans de conception produit, du cadrage à la livraison.",
  cta_projects: "Voir les projets",
  cta_guide: "Explorer le guide Claude Code",
}
```

---

## Partie 2 : Landing page /interventions

### Route

- /[lang]/interventions
- Accessible depuis : badge hero (cliquable), nav (nouvel item), footer, fin d'articles/guide
- generateStaticParams : ajouter 'interventions' pour les deux langues

### Structure de page

6 sections, de haut en bas :

#### 1. Header de page

- h1 : « Interventions » (FR) / « Speaking & workshops » (EN)
- Sous-titre (2 lignes max) : « Conférences, workshops et formations. Conception produit, design systems, outils IA. » (FR)
- Pas de photo dans le header

#### 2. Sujets (grille 2 colonnes desktop, 1 colonne mobile)

4 cartes :

**Claude Code pour designers**
Comment un designer produit utilise Claude Code pour la recherche, le prototypage, le code et la documentation. Tiré de ma pratique quotidienne.

**Figma MCP : du design token au composant codé**
Synchroniser Figma et le code sans friction. Tokens, specs et variables lus directement dans l'environnement de dev.

**Prototypage IA : du concept au déploiement**
Idée, prompt, prototype, test, déploiement. Le workflow complet, avec des cas réels (50+ prototypes livrés).

**Design Systems et IA**
Construire et maintenir un design system quand les outils de génération de code modifient le workflow. Tokens, composants, documentation.

Style cartes : bg-white border border-gray-100 rounded-2xl p-6. Pas d'icône.
Les sujets sont modulables (ajout/retrait sans refonte).

#### 3. Formats (liste verticale)

| Format | Durée | Contexte |
|---|---|---|
| Conférence | 45-60 min | Présentation + Q&A. Événement interne ou public. |
| Brownbag lunch | 30-45 min | Format court, informel. Pour une équipe design ou produit. |
| Workshop | Demi-journée ou journée | Exercices pratiques, hands-on. |
| Webinaire | 45 min en visio | Équipes distribuées ou premier contact. |

Style : liste simple avec titres en font-medium, description en text-gray-600. Pas de cartes.

#### 4. À propos (section compacte)

- Photo Victor (format carré, image LinkedIn existante)
- 3 lignes : parcours condensé, noms de clients, lien vers le guide et les articles
- Layout : flex horizontal (photo gauche, texte droite). Empilé sur mobile.
- Réutiliser le composant AuthorContactCard existant ou s'en inspirer.

#### 5. Contact

Version initiale : mailto pré-rempli.

- Bouton : « Proposer une intervention » → mailto:victorsoussan@gmail.com?subject=Demande%20d'intervention
- Style : CTA bleu standard (bg-[#2D5CF3])
- Texte compagnon : « Dites-moi quel format vous intéresse, le sujet, et le contexte. Réponse sous 48h. »

Évolution future : formulaire avec champs (nom, organisation, email, format dropdown, textarea contexte).

#### 6. CTA vers le contenu

- Lien vers le guide Claude Code
- Lien vers les articles / ressources
- Texte : « Ces sujets en détail » ou « Explorer mes publications »
- Rôle : donner de la matière au visiteur qui veut creuser avant de contacter

### Éléments absents (ajoutés progressivement)

- Prix : pas affiché pour l'instant
- Témoignages : ajoutés après les premières interventions
- Vidéos de talks : ajoutées quand disponibles
- Calendrier d'événements : ajouté quand il y a des dates

### Intégration nav

Ajouter « Interventions » dans la nav, après « Ressources » :
- Desktop : nouvel item pill dans la nav
- Mobile : nouvel item dans le menu (icône : Microphone ou Presentation de Phosphor)

### Intégration footer

Ajouter le lien « Interventions » dans les liens du footer.

### Intégration articles et guide

Ajouter un CTA en fin d'article et en fin de chapitre de guide :
- Texte : « Ce sujet vous intéresse pour votre équipe ? »
- Lien → /[lang]/interventions
- Style : encart discret, bg-gray-50, rounded-xl, pas de fond bleu

---

## Récapitulatif des décisions

| Décision | Choix | Raison |
|---|---|---|
| Direction hero | Tagline + sous-titre + 4 pills | 3 niveaux de lecture, modulable, sous-titre ancre la tagline |
| Tagline | « Frame. Design. Ship. » (conservée) | Reconnaissable, posture studio |
| Sous-titre | « 15 ans de conception produit, du cadrage à la livraison. » | Ancre la tagline dans du concret, porte le message end-to-end |
| Pills | Product Design, Design Systems, Prototypage IA, Claude Code | 4 territoires distincts, scannables, SEO-pertinents |
| CTA primaire | Voir les projets (scroll) | Sert le job « évaluer ce designer » |
| CTA secondaire | Explorer le guide Claude Code (lien) | Sert le job « creuser le sujet IA + design », parcours SEO profond |
| Interventions en hero | Badge cliquable, pas CTA | Présent mais discret |
| Landing page | /interventions, version légère, maintenant | Donne un lien à envoyer, structure l'offre |
| Contact interventions | Mailto pré-rempli (v1) | Zéro infrastructure, upgrade possible vers formulaire |
| Logos clients | 6 logos gris sous les CTA | Crédibilité sans mots |
| Blobs décoratifs | Supprimés | Retenue studio |
| Description longue | Supprimée | Remplacée par sous-titre + pills + logos |
