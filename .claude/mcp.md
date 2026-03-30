# MCP Servers

Serveurs MCP disponibles dans les sessions Claude Code de ce projet.

## Serveurs connectés (via claude.ai)

| Serveur | Usage |
|---------|-------|
| **Figma** | Lecture de designs, screenshots, Code Connect, FigJam diagrams |
| **Gmail** | Lecture/brouillons d'emails |
| **Google Calendar** | Événements, disponibilités, création de réunions |
| **Notion** | Pages, databases, commentaires, recherche |
| **Excalidraw** | Création de diagrammes visuels |
| **Paper** | Design tool pour UI, lecture/écriture de designs |
| **Pencil** | Éditeur de fichiers .pen, design system, guidelines |

## Serveurs via plugins

| Plugin | Serveur MCP | Usage |
|--------|-------------|-------|
| context7 | Context7 | Documentation à jour des librairies (React, Next.js, Tailwind, etc.) |
| playwright | Playwright | Browser automation, screenshots, tests E2E |
| serena | Serena | Semantic coding tools, symbol navigation |
| microsoft-docs | Microsoft Learn | Documentation Microsoft/Azure |
| mintlify | Mintlify | Documentation Mintlify |

## Plugins installés (30)

### Développement
- typescript-lsp, pyright-lsp
- feature-dev, code-review, code-simplifier, pr-review-toolkit
- commit-commands, claude-md-management
- github, plugin-dev, agent-sdk-dev
- security-guidance

### Design & Frontend
- figma (v2.0.2), frontend-design
- ui-ux-pro-max (v2.0.1)
- playground

### Infrastructure
- vercel, supabase, firebase
- sanity-plugin

### Documentation
- context7, microsoft-docs, mintlify

### Workflow
- superpowers (v5.0.6), ralph-loop
- skill-creator, claude-code-setup
- serena, playwright, atomic-agents

---

# Plugins activés (settings.json)

Plugins explicitement activés dans `~/.claude/settings.json` :

```json
{
  "frontend-design": true,
  "context7": true,
  "superpowers": true,
  "code-review": true,
  "github": true,
  "code-simplifier": true,
  "feature-dev": true,
  "playwright": true,
  "commit-commands": true,
  "claude-md-management": true,
  "security-guidance": true,
  "ralph-loop": true,
  "typescript-lsp": true,
  "serena": true,
  "pr-review-toolkit": true,
  "skill-creator": true,
  "pyright-lsp": true,
  "claude-code-setup": true,
  "supabase": true,
  "agent-sdk-dev": true,
  "plugin-dev": true,
  "vercel": true,
  "playground": true,
  "firebase": true,
  "sanity-plugin": true,
  "mintlify": true,
  "atomic-agents": true,
  "microsoft-docs": true
}
```

Note : `figma` est installé mais **désactivé** (`false`).
