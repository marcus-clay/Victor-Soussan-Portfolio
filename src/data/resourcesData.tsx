import React from 'react';
import {
  Target,
  Users,
  ScrollText,
  CheckCircle2,
  Layers,
  Figma,
} from 'lucide-react';
import type { Language } from './translations';

export interface Resource {
  title: string;
  type: string;
  desc: string;
  link: string;
  icon: React.ReactNode;
}

export const getResources = (lang: Language): Resource[] => {
  const isEn = lang === 'en';
  return [
    // 1. Frame - Discovery/Framing
    {
      title: isEn ? "Template: Design Scoping" : "Template : Cadrage Design",
      type: "Notion",
      desc: isEn ? "A framework to frame design problems, scope, and goals before starting UI." : "Le document que je remplis avant d'ouvrir Figma pour aligner tout le monde sur le 'Pourquoi'.",
      link: "https://victor-soussan.notion.site/Template-Id-ation-Cadrage-de-conception-22ea519b0dea810f9d50cf4eeb7f0c48",
      icon: <Target size={20} className="text-red-600"/>
    },
    // 2. Align - Establish rituals with stakeholders
    {
      title: isEn ? "Process: PO / Design Sync" : "Rituel : Synchro PO / Design",
      type: "Notion",
      desc: isEn ? "Rituals and workflows to align Product Owners and Designers efficiently." : "Comment organiser la collaboration hebdomadaire pour éviter l'effet tunnel.",
      link: "https://victor-soussan.notion.site/Process-de-synchro-PO-Design-22ea519b0dea815690c0c5e178b61bf7",
      icon: <Users size={20} className="text-orange-600"/>
    },
    // 3. Analyze - Audit existing interfaces
    {
      title: "Atelier : Design Teardown",
      type: "Notion",
      desc: isEn ? "Workshop template for analyzing and critiquing existing interfaces collectively." : "Template pour auditer une interface existante en équipe et identifier les dettes UX.",
      link: "https://victor-soussan.notion.site/Template-Id-ation-Atelier-Design-Teardown-22ea519b0dea81b09215c004b04ef56d",
      icon: <ScrollText size={20} className="text-purple-600"/>
    },
    // 4. Design - Execution checklist
    {
      title: isEn ? "Checklist: Feature Design" : "Checklist : Design de fonctionnalité",
      type: "Notion",
      desc: isEn ? "A granular checklist to ensure quality from kickoff to handoff." : "Rien ne doit être oublié avant le dev : edge cases, états vides, erreurs, responsive.",
      link: "https://victor-soussan.notion.site/LONG-Checklist-Design-d-une-nouvelle-fonctionnalit-112a519b0dea8119b5ecc4084f3c0e53",
      icon: <CheckCircle2 size={20} className="text-green-600"/>
    },
    // 5. Handoff - Break down UI for developers
    {
      title: isEn ? "Process: UI Slicing" : "Méthode : Découpage UI (Slicing)",
      type: "Notion",
      desc: isEn ? "Methodology to break down interfaces into atomic components for devs." : "Comment je découpe une interface en composants React/Atomic pour les développeurs.",
      link: "https://victor-soussan.notion.site/Process-D-couper-finement-une-UI-22ea519b0dea81158739d163fc196f0c",
      icon: <Layers size={20} className="text-blue-600"/>
    },
    // 6. Maintain - Ongoing file organization
    {
      title: isEn ? "Figma: File Status" : "Figma : Convention de nommage",
      type: "Notion",
      desc: isEn ? "Naming conventions and status tags for keeping Figma files clean." : "Comment je gère les statuts (WIP, Review, Dev Ready) pour qu'on s'y retrouve.",
      link: "https://victor-soussan.notion.site/Figma-Status-des-maquettes-et-prototypes-22ea519b0dea8121a1acd9e1fd59212f",
      icon: <Figma size={20} className="text-indigo-600"/>
    }
  ];
};
