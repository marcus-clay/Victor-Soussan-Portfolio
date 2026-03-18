import type { Language } from './translations';

export type Category = 'All' | 'Management' | 'Design' | 'Product & Tech' | 'Clients';

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  date: string;
  content: string;
  image: string;
  linkedin?: string;
  category: Category;
}

export const getTestimonials = (lang: Language): Testimonial[] => {
  const isEn = lang === 'en';
  return [
    {
      id: "pierre-marie-nigay",
      author: "Pierre-Marie Nigay",
      role: isEn ? "Founder of Toolkit" : "Fondateur de Toolkit",
      date: "14/11/2025",
      content: isEn
        ? "Victor didn't just create mockups. We worked in workshops before the product even existed... He transformed business requirements into perfectly adapted user journeys. Victor is a great guy: curious, positive, ready to challenge to go further."
        : "Victor ne s'est pas content\u00e9 de faire des maquettes. Nous avons travaill\u00e9 en ateliers avant m\u00eame la cr\u00e9ation du produit... Il a transform\u00e9 les besoins m\u00e9tiers en parcours utilisateurs parfaitement adapt\u00e9s. Victor est un super gars : curieux, positif, pr\u00eat \u00e0 challenger pour aller toujours plus loin.",
      image: "pierre-marie-nigay.webp",
      linkedin: "https://www.linkedin.com/in/pnigay/",
      category: "Clients"
    },
    {
      id: "charlotte-rifflet",
      author: "Charlotte Rifflet",
      role: isEn ? "CPO @UNOWHY" : "CPO @UNOWHY",
      date: "24/06/2025",
      content: isEn
        ? "Victor combines overflowing creativity with impressive rigor. He translates complex visions into clear, impactful user experiences. Always listening, curious, he constantly pushes thinking further."
        : "Victor allie une cr\u00e9ativit\u00e9 d\u00e9bordante \u00e0 une rigueur de travail impressionnante. Il sait traduire des visions complexes en exp\u00e9riences utilisateur claires et percutantes. Toujours \u00e0 l\u2019\u00e9coute, curieux, il pousse constamment les r\u00e9flexions plus loin.",
      image: "charlotte-rifflet.webp",
      linkedin: "https://www.linkedin.com/in/charlotterifflet/",
      category: "Management"
    },
    {
      id: "boris-aime",
      author: "Boris Aim\u00e9-Bauderlique",
      role: isEn ? "Deployment Manager @FranceVAE" : "Charg\u00e9 de d\u00e9ploiement @FranceVAE",
      date: "28/06/2025",
      content: isEn
        ? "Always proposing ideas that shake things up... you never settled for just thinking: you produced, tested, wireframed, prototyped. Your UX expertise is undeniable, but your experience made the difference."
        : "Toujours en train de proposer des id\u00e9es qui bousculent... tu ne t\u2019es jamais content\u00e9 de rester dans la r\u00e9flexion : tu as produit, test\u00e9, maquett\u00e9, prototyp\u00e9. Ton expertise UX est ind\u00e9niable, mais c\u2019est ton exp\u00e9rience qui a vraiment fait la diff\u00e9rence.",
      image: "boris-aime-bauderlique.webp",
      linkedin: "https://www.linkedin.com/in/borisaimebauderlique",
      category: "Product & Tech"
    },
    {
      id: "achref-akkari",
      author: "Achref Akkari",
      role: isEn ? "Product Manager @UNOWHY" : "Product Manager @UNOWHY",
      date: "18/12/2024",
      content: isEn
        ? "Victor is a true source of inspiration. I was lucky to work with him on several projects... he brought a pragmatic and professional approach. His leadership and ability to collaborate were essential."
        : "Victor est une v\u00e9ritable source d\u2019inspiration. J\u2019ai eu la chance de travailler avec lui sur plusieurs projets... il a su apporter une approche pragmatique et professionnelle. Son leadership et sa capacit\u00e9 \u00e0 collaborer \u00e9taient essentiels.",
      image: "achref-akkari.webp",
      linkedin: "https://www.linkedin.com/in/achref-akkari",
      category: "Product & Tech"
    },
    {
      id: "justine-le-tellier",
      author: "Justine Le Tellier",
      role: isEn ? "UX Researcher @UNOWHY" : "UX Researcher @UNOWHY",
      date: "12/12/2024",
      content: isEn
        ? "As Product Lead in UI & Interaction Design, he played a central role in defining the product vision... I was struck by Victor's curiosity and his ability to share knowledge pedagogically. He was a real driver of progress."
        : "En tant que Product Lead en UI & Interaction Design, il a jou\u00e9 un r\u00f4le central dans la d\u00e9finition de la vision produit... J\u2019ai \u00e9t\u00e9 tr\u00e8s marqu\u00e9e par la curiosit\u00e9 de Victor et sa capacit\u00e9 \u00e0 partager son savoir avec p\u00e9dagogie. Il a \u00e9t\u00e9 un v\u00e9ritable moteur de progr\u00e8s.",
      image: "justine-le-tellier.webp",
      linkedin: "https://www.linkedin.com/in/justine-le-tellier",
      category: "Design"
    },
    {
      id: "hortense-jan",
      author: "Hortense Jan",
      role: isEn ? "Marketing Director @UNOWHY" : "Directrice Marketing @UNOWHY",
      date: "09/12/2024",
      content: isEn
        ? "I worked alongside Victor for 5 beautiful years. His expertise, 360 vision, and design talent enabled the creation and success of many projects... Victor is passionate and fascinating."
        : "J\u2019ai travaill\u00e9 aux c\u00f4t\u00e9s de Victor pendant 5 belles ann\u00e9es. Son expertise, sa vision 360 et son talent de designer ont permis la cr\u00e9ation et la r\u00e9ussite de nombreux projets... Victor est passionn\u00e9 et passionnant.",
      image: "hortense-jan.webp",
      linkedin: "https://www.linkedin.com/in/hortensejan",
      category: "Management"
    },
    {
      id: "hubert-bloch",
      author: "Hubert Bloch",
      role: isEn ? "Deputy CEO @UNOWHY" : "Directeur G\u00e9n\u00e9ral Adjoint @UNOWHY",
      date: "08/12/2024",
      content: isEn
        ? "Highly cultivated, curious, and creative, he always brings relevant ideas and original perspectives. Beyond his talent, Victor is particularly friendly, which makes collaborating with him even more enjoyable."
        : "Tr\u00e8s cultiv\u00e9, curieux et cr\u00e9atif, il apporte toujours des id\u00e9es pertinentes et des perspectives originales. En plus de son talent, Victor est quelqu\u2019un de particuli\u00e8rement sympathique, ce qui rend la collaboration avec lui d\u2019autant plus agr\u00e9able.",
      image: "hubert-bloch.webp",
      linkedin: "https://fr.linkedin.com/in/hubertbloch",
      category: "Management"
    },
    {
      id: "mbagna-johan",
      author: "Mbagna Johan Gaby",
      role: "Product Designer",
      date: "30/09/2024",
      content: isEn
        ? "Passionate and reliable... Lover of details... his feedback allowed me to reach a new level. He has the will to listen to his team, putting them in the best conditions."
        : "Passionn\u00e9 et fiable... Amoureux des d\u00e9tails... ses retours m\u2019ont permis d\u2019atteindre un nouveau palier. Il a la volont\u00e9 d\u2019\u00eatre \u00e0 l\u2019\u00e9coute de son \u00e9quipe, de les mettre dans les meilleures conditions.",
      image: "johan-mbagna-gaby.webp",
      linkedin: "https://fr.linkedin.com/in/mbagnajohan",
      category: "Design"
    },
    {
      id: "safak-aktas",
      author: "\u015eafak Akta\u015f",
      role: isEn ? "Graphic Designer at Reflet Digital" : "Graphiste chez Reflet Digital",
      date: "10/12/2020",
      content: isEn
        ? "Beyond being a manager concerned with his team's well-being, he is passionate about details. Patient and pedagogical, he doesn't hesitate to give constructive advice... A mentor I appreciated working with."
        : "En plus d\u2019\u00eatre un manager soucieux du bien-\u00eatre de son \u00e9quipe, c\u2019est un passionn\u00e9 qui a le souci du d\u00e9tail. Patient et p\u00e9dagogue, il n\u2019h\u00e9site pas \u00e0 donner des conseils constructifs... Un mentor avec lequel j\u2019ai appr\u00e9ci\u00e9 travailler.",
      image: "safak-aktas.webp",
      linkedin: "https://www.linkedin.com/in/safak-aktas/",
      category: "Design"
    },
    {
      id: "frederic-rodriguez",
      author: "Frederic Rodriguez",
      role: isEn ? "Head of Poker - FDJ" : "Head of Poker - FDJ",
      date: "29/06/2017",
      content: isEn
        ? "Professional and rigorous, Victor knows how to translate business stakes into relevant implementations... Victor is very attentive to his collaborators and different trades, both technical and marketing."
        : "Professionnel et rigoureux, Victor sait traduire les enjeux business dans des r\u00e9alisations pertinentes... Victor est tr\u00e8s \u00e0 l\u2019\u00e9coute de ses collaborateurs et des diff\u00e9rents m\u00e9tiers, \u00e0 la fois technique ou marketing.",
      image: "frederic-rodriguez.webp",
      linkedin: "https://www.linkedin.com/in/frederic-rodriguez-71061255/",
      category: "Management"
    },
    {
      id: "remi-serougne",
      author: "R\u00e9mi Serougne",
      role: isEn ? "Web Developer" : "D\u00e9veloppeur Web",
      date: "08/03/2017",
      content: isEn
        ? "Accessible, attentive, and responsible... working with Victor is a pleasure as he adheres to collective intelligence principles and facilitates interactions between Design and Engineering."
        : "Accessible, \u00e0 l\u2019\u00e9coute et responsable... travailler avec Victor est un plaisir car il adh\u00e8re aux principes de l\u2019intelligence collective et facilite les interactions entre l\u2019\u00e9quipe Design et la ma\u00eetrise d\u2019\u0153uvre.",
      image: "remi-serougne.webp",
      linkedin: "https://www.linkedin.com/in/remi-serougne-7314b940/",
      category: "Product & Tech"
    },
    {
      id: "simon-white",
      author: "Simon White",
      role: "Senior UX",
      date: "22/04/2016",
      content: isEn
        ? "He is a very capable designer who can do the legwork but also take a step back and advise on more strategic aspects... He's worked on mobile and web, and has a keen eye for interaction design. Highly recommended."
        : "Victor is passionate about UX... He is a very capable designer who can do the legwork but also take a step back... He's worked on mobile and web, and has a keen eye for interaction design. Highly recommended.",
      image: "simon-white.webp",
      linkedin: "https://www.linkedin.com/in/fruey/",
      category: "Design"
    },
    {
      id: "nicolas-moulin",
      author: "Nicolas Moulin",
      role: isEn ? "Entrepreneur / Advisor" : "Entrepreneur / Advisor",
      date: "12/04/2016",
      content: isEn
        ? "He knows how to unite people around a project, allowing for total autonomy to see it through. It is very useful to discuss the medium-term service vision with him."
        : "Il sait f\u00e9d\u00e9rer les gens autour d\u2019un projet et qu\u2019on peut par cons\u00e9quent lui laisser une autonomie totale pour le mener \u00e0 bien. Il est tr\u00e8s utile de discuter avec lui lorsqu\u2019il s\u2019agit d\u2019aborder la vision moyen terme.",
      image: "nicolas-moulin.webp",
      linkedin: "https://www.linkedin.com/in/moulinnicolas",
      category: "Management"
    },
    {
      id: "francois-khoury",
      author: "Fran\u00e7ois Khoury",
      role: isEn ? "Senior Presales" : "Senior Presales",
      date: "30/10/2014",
      content: isEn
        ? "His previous experiences as Art Director and Designer bring a critical sense and a new approach to our projects which allow us to improve user experience... Victor helped us a lot on the embedded PagesJaunes application."
        : "Ses exp\u00e9riences pr\u00e9c\u00e9dentes de DA et Designer apportent un sens critique et une nouvelle approche... Victor nous a beaucoup aid\u00e9 sur l\u2019application embarqu\u00e9e PagesJaunes que nous avons con\u00e7ue ensemble.",
      image: "francois-khoury.webp",
      linkedin: "https://www.linkedin.com/in/francoisk",
      category: "Product & Tech"
    }
  ];
};
