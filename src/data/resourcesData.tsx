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
import { TEMPLATE_ENTRIES } from './templatesData';
import type { ResourceArt } from './templatesData';

export type { ResourceArt } from './templatesData';

export interface Resource {
  title: string;
  type: string;
  desc: string;
  link: string;
  icon: React.ReactNode;
  /** Minimalist document illustration shown on the About resource cards */
  art?: ResourceArt;
}

const ICON_BY_ART: Record<ResourceArt, React.ReactNode> = {
  scoping: <Target size={20} className="text-red-600"/>,
  sync: <Users size={20} className="text-orange-600"/>,
  teardown: <ScrollText size={20} className="text-purple-600"/>,
  checklist: <CheckCircle2 size={20} className="text-green-600"/>,
  slicing: <Layers size={20} className="text-blue-600"/>,
  status: <Figma size={20} className="text-indigo-600"/>,
};

// Order = the series order of the About cards (frame, align, analyze, design, handoff, maintain).
export const getResources = (lang: Language): Resource[] =>
  TEMPLATE_ENTRIES.map((t) => ({
    title: t.title[lang],
    type: "Notion",
    art: t.art,
    desc: t.desc[lang],
    link: t.link,
    icon: ICON_BY_ART[t.art],
  }));
