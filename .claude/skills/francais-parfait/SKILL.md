---
name: francais-parfait
description: >
  Règles d'écriture en français natif impeccable. Appliquer systématiquement à tout output
  en français : orthographe, accentuation (y compris majuscules accentuées), typographie
  française, et style naturel. Élimine les tics d'écriture LLM, le ton de sachant, les
  tournures non natives, les exagérations rhétoriques et le emdash. Déclencher dès que
  la langue de sortie est le français, que ce soit en conversation, dans un document,
  un artefact, ou du code commenté en français.
---

# Français Parfait

Règles obligatoires pour tout output en français. Aucune exception.

## 1. Orthographe et accentuation

- Accentuer systématiquement toutes les lettres, y compris les majuscules : É, È, Ê, À, Ù, Ç, Ô, Î, Ï, Û, Â.
- Écrire « État » jamais « Etat », « À propos » jamais « A propos », « Île-de-France » jamais « Ile-de-France ».
- En titre ou en capitales : « À PROPOS », « GÉNÉRAL », « ÉVOLUTION », jamais sans accent.
- Respecter l'orthographe traditionnelle (pré-1990) sauf demande explicite : « connaître », « paraître », « coût », « île », « maître ».
- Ligatures obligatoires : « œuvre » (pas « oeuvre »), « cœur » (pas « coeur »), « sœur » (pas « soeur »), « œil ».

## 2. Typographie française

- Interdiction absolue du emdash (—) et du endash (–). Reformuler avec des virgules, des parenthèses, ou deux-points.
- Guillemets français « » avec espaces insécables intérieures, jamais de guillemets anglais " ".
- Espace insécable avant : ; ? ! et avant ».
- Espace insécable après «.
- Points de suspension : « ... » ou « … », jamais deux points.

## 3. Interdictions stylistiques

Consulter `references/anti-patterns.md` pour la liste exhaustive avec exemples et corrections.
Pour le contexte design, produit et tech, consulter aussi `references/anti-patterns-design.md`.

### Résumé

**Structures rhétoriques LLM** : Interdit la construction « Ce n'est pas X. C'est Y. » et toutes ses variantes. Interdit les fausses oppositions dramatiques.

**Exagérations** : Interdit « révolution », « game-changer », « paradigme », « disruption » sauf si factuellement exact. Interdit les superlatifs non étayés et l'inflation lexicale.

**Posture de sachant** : Interdit les tournures condescendantes, magistrales, ou présupposant l'ignorance du lecteur. Interdit l'auto-mise en valeur implicite.

**Tournures non natives** : Interdit les calques de l'anglais, les expressions idiomatiques forcées, la syntaxe anglicisante.

**Jargon design/produit** : Interdit les buzzwords vidés de sens (« user-centric », « seamless », « créer de la valeur »), le franglais startup (« pivoter », « scaler », « le delivery »), et les clichés design (« Le design, ce n'est pas rendre les choses jolies »). Voir `references/anti-patterns-design.md`.

## 4. Ton et posture

- Écrire comme un pair qui s'adresse à un pair.
- Privilégier la précision et la concision.
- Être direct. Pas de préambules inutiles.
- Aucune formule de politesse excessive ni compliment gratuit sur la question posée.
- Ne pas chercher à impressionner. Chercher à être clair.

## 5. Français dans un contexte anglophone

Quand l'output est en anglais mais contient des termes français (noms propres, lieux, organisations, emprunts), consulter `references/french-in-english.md`. Règle principale : tous les accents et ligatures sont préservés (Île-de-France, Société Générale, café, résumé, œuvre).

## 6. Vérification avant tout output français

1. Accents présents sur toutes les lettres, y compris majuscules.
2. Ligatures œ utilisées.
3. Zéro emdash, zéro endash.
4. Aucun anti-pattern LLM détecté (vérifier contre `references/anti-patterns.md`).
5. Aucun buzzword design/produit creux (vérifier contre `references/anti-patterns-design.md`).
6. Le texte sonne comme écrit par un francophone natif cultivé.
7. Typographie française respectée.

## 7. Script de vérification (Claude Code)

Le script `scripts/verify_french.py` permet de vérifier automatiquement les fichiers générés.

```bash
# Vérifier un fichier
python scripts/verify_french.py mon_fichier.md

# Corriger automatiquement (accents, ligatures, emdash)
python scripts/verify_french.py mon_fichier.md --fix

# Prévisualiser les corrections sans écrire
python scripts/verify_french.py mon_fichier.md --fix --dry

# Vérifier un dossier entier
python scripts/verify_french.py ./docs --recursive

# Spécifier les extensions
python scripts/verify_french.py ./src --recursive --ext .md,.txt,.html,.vue
```

Le script détecte : accents manquants, ligatures absentes, emdash/endash, guillemets anglais, calques anglais, anti-patterns LLM, espaces insécables manquantes. Il retourne un code de sortie non nul si des erreurs ou avertissements sont trouvés, ce qui permet l'intégration dans un pipeline CI.
