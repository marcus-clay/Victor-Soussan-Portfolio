import React from 'react';
import {
  Target,
  Users,
  Scroll as ScrollText,
  CheckCircle as CheckCircle2,
  Stack as Layers,
  FigmaLogo as Figma,
} from '@phosphor-icons/react';
import type { Language } from './translations';

export type ResourceArt = 'scoping' | 'sync' | 'teardown' | 'checklist' | 'slicing' | 'status';

export interface Resource {
  title: string;
  type: string;
  desc: string;
  link: string;
  icon: React.ReactNode;
  /** Minimalist document illustration shown on the About resource cards */
  art?: ResourceArt;
}

export const getResources = (lang: Language): Resource[] => {
  const isEn = lang === 'en';
  return [
    // 1. Frame - Discovery/Framing
    {
      title: isEn ? "Template: Design Scoping" : "Modèle : cadrage de conception",
      type: "Notion",
      art: 'scoping',
      desc: isEn ? "A framework to frame design problems, scope, and goals before starting UI." : "Le document que je remplis avant d’ouvrir Figma pour mettre tout le monde d’accord sur le « pourquoi ».",
      link: "https://victor-soussan.notion.site/Template-Id-ation-Cadrage-de-conception-22ea519b0dea810f9d50cf4eeb7f0c48",
      icon: <Target size={20} className="text-red-600"/>
    },
    // 2. Align - Establish rituals with stakeholders
    {
      title: isEn ? "Process: PO / Design Sync" : "Rituel : point PO et design",
      type: "Notion",
      art: 'sync',
      desc: isEn ? "Rituals and workflows to align Product Owners and Designers efficiently." : "Comment organiser la collaboration de la semaine pour éviter l’effet tunnel.",
      link: "https://victor-soussan.notion.site/Process-de-synchro-PO-Design-22ea519b0dea815690c0c5e178b61bf7",
      icon: <Users size={20} className="text-orange-600"/>
    },
    // 3. Analyze - Audit existing interfaces
    {
      title: isEn ? "Workshop: Design Teardown" : "Atelier : Design Teardown",
      type: "Notion",
      art: 'teardown',
      desc: isEn ? "Workshop template for analyzing and critiquing existing interfaces collectively." : "Un modèle pour auditer une interface existante en équipe et repérer la dette UX.",
      link: "https://victor-soussan.notion.site/Template-Id-ation-Atelier-Design-Teardown-22ea519b0dea81b09215c004b04ef56d",
      icon: <ScrollText size={20} className="text-purple-600"/>
    },
    // 4. Design - Execution checklist
    {
      title: isEn ? "Checklist: Feature Design" : "Checklist : concevoir une fonctionnalité",
      type: "Notion",
      art: 'checklist',
      desc: isEn ? "A granular checklist to ensure quality from kickoff to handoff." : "De quoi ne rien oublier avant le développement : cas limites, états vides, erreurs, adaptation aux écrans.",
      link: "https://victor-soussan.notion.site/LONG-Checklist-Design-d-une-nouvelle-fonctionnalit-112a519b0dea8119b5ecc4084f3c0e53",
      icon: <CheckCircle2 size={20} className="text-green-600"/>
    },
    // 5. Handoff - Break down UI for developers
    {
      title: isEn ? "Process: UI Slicing" : "Méthode : découper une interface",
      type: "Notion",
      art: 'slicing',
      desc: isEn ? "Methodology to break down interfaces into atomic components for devs." : "Comment je découpe une interface en composants (React, design atomique) pour les développeurs.",
      link: "https://victor-soussan.notion.site/Process-D-couper-finement-une-UI-22ea519b0dea81158739d163fc196f0c",
      icon: <Layers size={20} className="text-blue-600"/>
    },
    // 6. Maintain - Ongoing file organization
    {
      title: isEn ? "Figma: File Status" : "Figma : nommage et statuts des fichiers",
      type: "Notion",
      art: 'status',
      desc: isEn ? "Naming conventions and status tags for keeping Figma files clean." : "Comment je gère les statuts (WIP, Review, Dev Ready) pour que chacun s’y retrouve.",
      link: "https://victor-soussan.notion.site/Figma-Status-des-maquettes-et-prototypes-22ea519b0dea8121a1acd9e1fd59212f",
      icon: <Figma size={20} className="text-indigo-600"/>
    }
  ];
};
