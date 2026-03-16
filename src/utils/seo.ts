export interface SeoMeta {
  title: string;
  description: string;
  image: string;
}

export const PROJECT_SEO: Record<string, SeoMeta> = {
  'toolkit': {
    title: 'Toolkit - Design System & Planning App | Victor Soussan',
    description: 'Case study: Design System et application de planning pour PagesJaunes. UI Kit, composants Figma, et product design.',
    image: '/images/thumbnail-toolkit.webp'
  },
  'dailymotion': {
    title: 'Dailymotion - Video Platform Redesign | Victor Soussan',
    description: 'Case study: Refonte UX/UI de la plateforme vid\u00e9o Dailymotion. Design System, Video Manager, et exp\u00e9rience utilisateur.',
    image: '/images/dailymotion/thubmnail_dailymotion_03.webp'
  },
  'connect': {
    title: 'SQOOL Connect - EdTech Dashboard | Victor Soussan',
    description: 'Case study: Dashboard \u00e9ducatif pour tablettes scolaires. UX Research, Design Sprint, et innovation EdTech.',
    image: '/images/thumbnail-connect.webp'
  },
  'sqool': {
    title: 'SQOOL Suite - Education Software | Victor Soussan',
    description: 'Case study: Suite logicielle \u00e9ducative pour 500K+ \u00e9l\u00e8ves. Design System, Hi-SQOOL chat, et outils p\u00e9dagogiques.',
    image: '/images/thumbnail-sqool-suite.webp'
  },
  'sqool-classe': {
    title: 'SQOOL Classe - Supervision de classe en temps r\u00e9el | Victor Soussan',
    description: 'Case study: Outil de gestion de classe en temps r\u00e9el pour les enseignants. Grille de supervision, verrouillage d\u2019\u00e9crans, groupes, communication \u00e9l\u00e8ves-professeurs.',
    image: '/images/thumbnail_sqool_classe.webp'
  },
  'france-vae': {
    title: 'France VAE - Service Public Num\u00e9rique | Victor Soussan',
    description: 'Case study: Plateforme nationale de Validation des Acquis. UX Research, VAE Collective, et transformation digitale.',
    image: '/images/francevae/thumbnail_france_vae_02.webp'
  },
  'pagesjaunes': {
    title: 'PagesJaunes - Mobile Apps Redesign | Victor Soussan',
    description: 'Case study: Modernisation des apps mobiles PagesJaunes pour 22M+ utilisateurs. Homepage conversationnelle, navigation et design system.',
    image: '/images/thumbnail_pagesjaunes_sp_tablette.webp'
  },
  'androidwear': {
    title: 'PagesJaunes Android Wear - Wearable App Design | Victor Soussan',
    description: 'Case study: Conception de l\u2019app Android Wear PagesJaunes. Recherche locale glanceable, Material Design, collaboration designer-d\u00e9veloppeur.',
    image: '/images/pagesjaunes/Android wear/android_wear_insitu_store_01.webp'
  }
};

export const DEFAULT_SEO: SeoMeta = {
  title: 'Victor Soussan | Product Design Lead - UX/UI Portfolio',
  description: 'Senior Product Design Lead avec 15+ ans d\u2019exp\u00e9rience. Sp\u00e9cialis\u00e9 en Design System, UX Research, et transformation digitale.',
  image: '/images/og_victor_soussan.webp'
};

export const injectJsonLd = (projectId: string, seo: SeoMeta): (() => void) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: seo.title.split(' | ')[0],
    description: seo.description,
    url: `https://www.victorsoussan.fr/project/${projectId}`,
    image: `https://www.victorsoussan.fr${seo.image}`,
    author: {
      '@type': 'Person',
      name: 'Victor Soussan',
      url: 'https://www.victorsoussan.fr',
      jobTitle: 'Product Design Lead'
    },
    provider: {
      '@type': 'Organization',
      name: 'Condamine Studio'
    }
  };
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  script.dataset.jsonld = projectId;
  document.head.appendChild(script);
  return () => script.remove();
};

export const updateMetaTags = (seo: SeoMeta): void => {
  document.title = seo.title;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', seo.description);

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', seo.title);

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', seo.description);

  const ogImage = document.querySelector('meta[property="og:image"]');
  if (ogImage) ogImage.setAttribute('content', `https://www.victorsoussan.fr${seo.image}`);

  const twTitle = document.querySelector('meta[name="twitter:title"]');
  if (twTitle) twTitle.setAttribute('content', seo.title);

  const twDesc = document.querySelector('meta[name="twitter:description"]');
  if (twDesc) twDesc.setAttribute('content', seo.description);

  const twImage = document.querySelector('meta[name="twitter:image"]');
  if (twImage) twImage.setAttribute('content', `https://www.victorsoussan.fr${seo.image}`);
};
