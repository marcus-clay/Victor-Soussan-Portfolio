#!/usr/bin/env python3
"""
francais-parfait : vérification et correction post-génération.

Usage :
    python verify_french.py <fichier>              # Vérifier un fichier
    python verify_french.py <fichier> --fix         # Corriger automatiquement
    python verify_french.py <fichier> --fix --dry   # Prévisualiser les corrections
    python verify_french.py <dossier> --recursive   # Vérifier un dossier entier

Vérifie :
- Accents manquants sur les mots courants (y compris majuscules)
- Ligatures œ manquantes
- Emdash / endash interdits
- Guillemets anglais au lieu de français
- Espaces insécables manquantes (avant ; : ? !)
- Anti-patterns LLM détectés
- Calques anglais courants

Retourne un code de sortie non nul si des problèmes sont détectés.
"""

import argparse
import re
import sys
from pathlib import Path

# ---------------------------------------------------------------------------
# DICTIONNAIRE D'ACCENTS MANQUANTS
# Clé : forme sans accent (minuscule). Valeur : forme correcte.
# On gère les majuscules dynamiquement.
# ---------------------------------------------------------------------------
ACCENT_FIXES = {
    # É / è / ê
    "etat": "état",
    "etats": "états",
    "ete": "été",
    "etes": "êtes",
    "etre": "être",
    "evenement": "événement",
    "evenements": "événements",
    "evolution": "évolution",
    "equipe": "équipe",
    "equipes": "équipes",
    "etude": "étude",
    "etudes": "études",
    "etape": "étape",
    "etapes": "étapes",
    "ecrire": "écrire",
    "ecrit": "écrit",
    "ecran": "écran",
    "ecrans": "écrans",
    "element": "élément",
    "elements": "éléments",
    "eleve": "élève",
    "eleves": "élèves",
    "energie": "énergie",
    "education": "éducation",
    "economie": "économie",
    "economique": "économique",
    "economiques": "économiques",
    "editeur": "éditeur",
    "edition": "édition",
    "echange": "échange",
    "echanges": "échanges",
    "echelle": "échelle",
    "ecole": "école",
    "ecoles": "écoles",
    "ecosysteme": "écosystème",
    "eligibilite": "éligibilité",
    "eligible": "éligible",
    "egalite": "égalité",
    "egal": "égal",
    "egalement": "également",
    # À
    "a propos": "à propos",
    "a partir": "à partir",
    "a travers": "à travers",
    # Î / Ï
    "ile": "île",
    "iles": "îles",
    "ile-de-france": "île-de-France",
    "maitre": "maître",
    "maitres": "maîtres",
    "maitrise": "maîtrise",
    "connaitre": "connaître",
    "paraitre": "paraître",
    "apparaitre": "apparaître",
    "naitre": "naître",
    "chaine": "chaîne",
    "chaines": "chaînes",
    "traitre": "traître",
    "fraiche": "fraîche",
    # Ô
    "role": "rôle",
    "roles": "rôles",
    "controle": "contrôle",
    "controles": "contrôles",
    "cote": "côté",
    "cotes": "côtés",
    "depot": "dépôt",
    "hopital": "hôpital",
    "hopitaux": "hôpitaux",
    "hotel": "hôtel",
    "hotels": "hôtels",
    "tot": "tôt",
    "plutot": "plutôt",
    "bientot": "bientôt",
    # Ç
    "francais": "français",
    "francaise": "française",
    "francaises": "françaises",
    "facade": "façade",
    "facades": "façades",
    "lecon": "leçon",
    "lecons": "leçons",
    "garcon": "garçon",
    "garcons": "garçons",
    "recu": "reçu",
    "recue": "reçue",
    "decu": "déçu",
    "decue": "déçue",
    "apercu": "aperçu",
    # Û
    "cout": "coût",
    "couts": "coûts",
    "gout": "goût",
    "gouts": "goûts",
    "sur (adj)": "sûr",
    "mur (adj)": "mûr",
    # Â
    "tache (travail)": "tâche",
    "grace": "grâce",
    "age": "âge",
    "ages": "âges",
}

# ---------------------------------------------------------------------------
# LIGATURES
# ---------------------------------------------------------------------------
LIGATURE_FIXES = {
    "oeuvre": "œuvre",
    "oeuvres": "œuvres",
    "coeur": "cœur",
    "coeurs": "cœurs",
    "soeur": "sœur",
    "soeurs": "sœurs",
    "oeil": "œil",
    "voeu": "vœu",
    "voeux": "vœux",
    "noeud": "nœud",
    "noeuds": "nœuds",
    "boeuf": "bœuf",
    "boeufs": "bœufs",
    "manoeuvre": "manœuvre",
    "manoeuvres": "manœuvres",
}

# ---------------------------------------------------------------------------
# CALQUES ANGLAIS
# ---------------------------------------------------------------------------
ANGLICISMS = {
    r"\badresser\s+(?:un|le|ce|des|les)\s+probl[eè]me": "traiter/résoudre un problème",
    r"\bfaire\s+du\s+sens\b": "avoir du sens",
    r"\bimpl[ée]menter\b": "mettre en place / déployer",
    r"\bsupporter\b(?!\s+(?:un|une|le|la)\s+(?:équipe|club))": "prendre en charge (si contexte technique)",
    r"\bd[ée]livrer\s+de\s+la\s+valeur\b": "apporter/créer de la valeur",
    r"\bleverager\b": "tirer parti de",
    r"\bonboarder\b": "accueillir / intégrer",
    r"\bscalable\b": "extensible / qui passe à l'échelle",
    r"\bperformer\b": "être performant / obtenir de bons résultats",
}

# ---------------------------------------------------------------------------
# ANTI-PATTERNS LLM
# ---------------------------------------------------------------------------
LLM_PATTERNS = [
    (r"[Cc]e n'est pas .{3,60}\.\s*C'est ", "Structure « Ce n'est pas X. C'est Y. »"),
    (r"[Ii]l ne s'agit pas .{3,60}\.\s*Il s'agit ", "Structure « Il ne s'agit pas X. Il s'agit Y. »"),
    (r"[Pp]lus qu'un[e]?\s+.{3,40},\s*c'est ", "Structure « Plus qu'un X, c'est Y. »"),
    (r"[Oo]ubliez\s+.{3,30}\.\s*[Pp]ensez ", "Structure « Oubliez X. Pensez Y. »"),
    (r"[Pp]longeons\s+dans", "« Plongeons dans » (calque de dive into)"),
    (r"[Dd][ée]cortiquons", "« Décortiquons » (tic LLM)"),
    (r"[Cc]'est là que .{3,40} entre en jeu", "« C'est là que X entre en jeu »"),
    (r"[Ll]a question n'est pas si,?\s*mais quand", "Cliché LLM"),
    (r"[Ee]t c'est exactement ce que", "Tic rhétorique LLM"),
    (r"[Ss]ans plus attendre", "Tic LLM"),
    (r"[Pp]assons aux choses s[ée]rieuses", "Tic LLM"),
    (r"\.\.\.\s*et bien plus encore", "Remplissage vide"),
    (r"[Ii]l est important de comprendre que", "Posture de sachant"),
    (r"[Ii]l faut bien saisir que", "Posture de sachant"),
    (r"[Ff]orce est de constater", "Posture de sachant (pompeux)"),
    (r"[Cc]ontrairement [àa] ce qu'on pourrait croire", "Présuppose l'ignorance"),
    (r"[Cc]e que beaucoup ignorent", "Présuppose l'ignorance"),
    (r"[Ll]a v[ée]rit[ée],?\s*c'est que", "Auto-mise en valeur"),
    (r"[Ee]n r[ée]alit[ée],", "Auto-mise en valeur (début de phrase)"),
    (r"[Vv]oici pourquoi\.", "Calque de « Here's why. »"),
]

# ---------------------------------------------------------------------------
# TYPOGRAPHY CHECKS
# ---------------------------------------------------------------------------

def check_emdash(text: str) -> list[dict]:
    """Détecte emdash et endash."""
    issues = []
    for i, line in enumerate(text.splitlines(), 1):
        for m in re.finditer(r"[—–]", line):
            issues.append({
                "line": i,
                "col": m.start() + 1,
                "type": "TYPO",
                "severity": "error",
                "msg": f"Emdash/endash interdit : '{m.group()}'",
                "fix": ", ",
            })
    return issues


def check_english_quotes(text: str) -> list[dict]:
    """Détecte les guillemets anglais."""
    issues = []
    for i, line in enumerate(text.splitlines(), 1):
        # Ignorer les lignes de code (indentées ou entre backticks)
        stripped = line.lstrip()
        if stripped.startswith("```") or stripped.startswith("`") or line.startswith("    "):
            continue
        for m in re.finditer(r'(?<![`])"([^"]*)"(?![`])', line):
            content = m.group(1)
            if len(content) > 1 and not any(c in content for c in ["=", "{", "}", "(", ")"]):
                issues.append({
                    "line": i,
                    "col": m.start() + 1,
                    "type": "TYPO",
                    "severity": "warning",
                    "msg": f"Guillemets anglais détectés : \"{content}\"",
                    "fix": f"« {content} »",
                })
    return issues


def check_missing_nbsp(text: str) -> list[dict]:
    """Détecte les espaces normales avant ; : ? !."""
    issues = []
    for i, line in enumerate(text.splitlines(), 1):
        stripped = line.lstrip()
        if stripped.startswith("```") or stripped.startswith("|") or stripped.startswith("    "):
            continue
        # Espace normale (pas insécable) avant ponctuation double
        for m in re.finditer(r"(?<=\w) ([;:?!])", line):
            issues.append({
                "line": i,
                "col": m.start() + 1,
                "type": "TYPO",
                "severity": "info",
                "msg": f"Espace insécable recommandée avant '{m.group(1)}'",
            })
    return issues


def check_ligatures(text: str) -> list[dict]:
    """Détecte les ligatures manquantes."""
    issues = []
    for i, line in enumerate(text.splitlines(), 1):
        lower_line = line.lower()
        for wrong, correct in LIGATURE_FIXES.items():
            for m in re.finditer(rf"\b{re.escape(wrong)}\b", lower_line):
                original = line[m.start():m.end()]
                issues.append({
                    "line": i,
                    "col": m.start() + 1,
                    "type": "ORTH",
                    "severity": "error",
                    "msg": f"Ligature manquante : '{original}' -> '{correct}'",
                    "fix_pattern": (wrong, correct),
                })
    return issues


def check_accents(text: str) -> list[dict]:
    """Détecte les accents manquants sur les mots courants."""
    issues = []
    # Mots simples (pas les expressions multi-mots)
    simple_fixes = {k: v for k, v in ACCENT_FIXES.items() if " " not in k and "(" not in k}

    for i, line in enumerate(text.splitlines(), 1):
        stripped = line.lstrip()
        if stripped.startswith("```") or stripped.startswith("    "):
            continue
        for wrong, correct in simple_fixes.items():
            pattern = rf"\b{re.escape(wrong)}\b"
            for m in re.finditer(pattern, line, re.IGNORECASE):
                original = line[m.start():m.end()]
                # Vérifier que ce n'est pas déjà accentué
                if original.lower() == wrong:
                    # Préserver la casse
                    if original[0].isupper():
                        fix = correct[0].upper() + correct[1:]
                    else:
                        fix = correct
                    if original.isupper():
                        fix = correct.upper()
                    issues.append({
                        "line": i,
                        "col": m.start() + 1,
                        "type": "ACCENT",
                        "severity": "error",
                        "msg": f"Accent manquant : '{original}' -> '{fix}'",
                        "fix_pattern": (original, fix),
                    })
    return issues


def check_anglicisms(text: str) -> list[dict]:
    """Détecte les calques anglais."""
    issues = []
    for i, line in enumerate(text.splitlines(), 1):
        for pattern, suggestion in ANGLICISMS.items():
            for m in re.finditer(pattern, line, re.IGNORECASE):
                issues.append({
                    "line": i,
                    "col": m.start() + 1,
                    "type": "ANGL",
                    "severity": "warning",
                    "msg": f"Calque anglais détecté : '{m.group()}' -> préférer '{suggestion}'",
                })
    return issues


def check_llm_patterns(text: str) -> list[dict]:
    """Détecte les anti-patterns LLM."""
    issues = []
    for i, line in enumerate(text.splitlines(), 1):
        for pattern, description in LLM_PATTERNS:
            for m in re.finditer(pattern, line):
                issues.append({
                    "line": i,
                    "col": m.start() + 1,
                    "type": "LLM",
                    "severity": "warning",
                    "msg": f"Anti-pattern LLM : {description}",
                })
    return issues


# ---------------------------------------------------------------------------
# AUTO-FIX
# ---------------------------------------------------------------------------

def apply_fixes(text: str) -> str:
    """Applique les corrections automatiques (accents, ligatures, emdash)."""
    # Emdash -> virgule + espace
    text = text.replace("—", ", ")
    text = text.replace("–", ", ")

    # Ligatures
    for wrong, correct in LIGATURE_FIXES.items():
        text = re.sub(rf"\b{re.escape(wrong)}\b", correct, text)
        text = re.sub(
            rf"\b{re.escape(wrong[0].upper() + wrong[1:])}\b",
            correct[0].upper() + correct[1:],
            text,
        )

    # Accents (mots simples)
    simple_fixes = {k: v for k, v in ACCENT_FIXES.items() if " " not in k and "(" not in k}
    for wrong, correct in simple_fixes.items():
        # Minuscule
        text = re.sub(rf"\b{re.escape(wrong)}\b", correct, text)
        # Première lettre majuscule
        cap_wrong = wrong[0].upper() + wrong[1:]
        cap_correct = correct[0].upper() + correct[1:]
        text = re.sub(rf"\b{re.escape(cap_wrong)}\b", cap_correct, text)
        # Tout majuscule
        text = re.sub(rf"\b{re.escape(wrong.upper())}\b", correct.upper(), text)

    return text


# ---------------------------------------------------------------------------
# MAIN
# ---------------------------------------------------------------------------

SEVERITY_COLORS = {
    "error": "\033[91m",    # rouge
    "warning": "\033[93m",  # jaune
    "info": "\033[96m",     # cyan
}
RESET = "\033[0m"


def format_issue(issue: dict, filepath: str) -> str:
    color = SEVERITY_COLORS.get(issue["severity"], "")
    return (
        f"{color}[{issue['severity'].upper():7s}]{RESET} "
        f"{filepath}:{issue['line']}:{issue['col']} "
        f"({issue['type']}) {issue['msg']}"
    )


def process_file(filepath: Path, fix: bool = False, dry: bool = False) -> int:
    text = filepath.read_text(encoding="utf-8")

    all_issues = []
    all_issues.extend(check_emdash(text))
    all_issues.extend(check_english_quotes(text))
    all_issues.extend(check_ligatures(text))
    all_issues.extend(check_accents(text))
    all_issues.extend(check_anglicisms(text))
    all_issues.extend(check_llm_patterns(text))
    all_issues.extend(check_missing_nbsp(text))

    # Trier par ligne puis colonne
    all_issues.sort(key=lambda x: (x["line"], x["col"]))

    if all_issues:
        for issue in all_issues:
            print(format_issue(issue, str(filepath)))
        print(f"\n{'='*60}")
        errors = sum(1 for i in all_issues if i["severity"] == "error")
        warnings = sum(1 for i in all_issues if i["severity"] == "warning")
        infos = sum(1 for i in all_issues if i["severity"] == "info")
        print(f"Total : {errors} erreurs, {warnings} avertissements, {infos} infos")
    else:
        print(f"✓ {filepath} : aucun problème détecté.")

    if fix and all_issues:
        fixed = apply_fixes(text)
        if dry:
            print(f"\n--- Prévisualisation des corrections pour {filepath} ---")
            # Montrer le diff simplifié
            orig_lines = text.splitlines()
            fixed_lines = fixed.splitlines()
            for idx, (o, f_) in enumerate(zip(orig_lines, fixed_lines), 1):
                if o != f_:
                    print(f"  L{idx}:")
                    print(f"    - {o}")
                    print(f"    + {f_}")
        else:
            filepath.write_text(fixed, encoding="utf-8")
            print(f"✓ Corrections appliquées à {filepath}")

    return len([i for i in all_issues if i["severity"] in ("error", "warning")])


def main():
    parser = argparse.ArgumentParser(description="Vérification français parfait")
    parser.add_argument("path", help="Fichier ou dossier à vérifier")
    parser.add_argument("--fix", action="store_true", help="Appliquer les corrections automatiques")
    parser.add_argument("--dry", action="store_true", help="Prévisualiser les corrections sans écrire")
    parser.add_argument("--recursive", "-r", action="store_true", help="Traiter un dossier récursivement")
    parser.add_argument(
        "--ext",
        default=".md,.txt,.html,.rst,.adoc",
        help="Extensions à traiter (défaut: .md,.txt,.html,.rst,.adoc)",
    )
    args = parser.parse_args()

    target = Path(args.path)
    extensions = set(args.ext.split(","))

    if target.is_file():
        issues = process_file(target, fix=args.fix, dry=args.dry)
    elif target.is_dir() and args.recursive:
        issues = 0
        for ext in extensions:
            for f in sorted(target.rglob(f"*{ext}")):
                issues += process_file(f, fix=args.fix, dry=args.dry)
                print()
    else:
        print(f"Erreur : {target} n'est pas un fichier ou utilisez --recursive pour un dossier.")
        sys.exit(2)

    sys.exit(1 if issues > 0 else 0)


if __name__ == "__main__":
    main()
