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
        ? "As a UX/UI designer, Victor didn't just create mockups. We worked in workshops before the product even existed so he could immerse himself in the construction sector. He transformed business requirements into perfectly adapted user journeys, ideal for a startup like ours. Thanks to his experience, Victor also laid the foundations (UI kit, ergonomics...) that saved us a tremendous amount of time afterwards. And beyond skills, Victor is a great guy: curious in the best way, always positive, ready to challenge to go further. That's why our collaboration with Victor continues two years later, and for a very long time to come."
        : "En tant que designer UX/UI, Victor ne s'est pas contenté de faire des maquettes. Nous avons travaillé en ateliers avant même la création du produit pour qu'il s'imprègne du secteur de la construction. Il a transformé les besoins métiers en parcours utilisateurs parfaitement adaptés, idéal pour une startup comme la nôtre. Grâce à son expérience, Victor a aussi posé les bases (UI kit, ergonomie...) qui nous ont fait gagner énormément de temps par la suite. Et au-delà des compétences, Victor est un super gars : curieux dans le bon sens, toujours positif, prêt à challenger pour aller toujours plus loin. C'est la raison pour laquelle notre collaboration avec Victor se poursuit 2 ans plus tard, et pour très longtemps encore.",
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
        ? "Victor combines overflowing creativity with impressive rigor. He translates complex visions into clear, impactful user experiences. Always listening, curious, he constantly pushes thinking further, whether on substance or form. I particularly appreciated our ability to co-create: he is not afraid to challenge ideas while maintaining a caring posture, focused on product quality and user impact. I recommend him to any team looking for a Lead Designer who is creative, demanding, and profoundly human."
        : "Victor allie une créativité débordante à une rigueur de travail impressionnante. Il sait traduire des visions complexes en expériences utilisateur claires et percutantes. Toujours à l'écoute, curieux, il pousse constamment les réflexions plus loin, que ce soit sur le fond ou sur la forme. J'ai particulièrement apprécié notre capacité à co-construire : il n'a pas peur de challenger les idées tout en restant dans une posture bienveillante, tournée vers la qualité du produit et l'impact utilisateur. Je le recommande à toute équipe qui cherche un Lead Design à la fois créatif, exigeant, et profondément humain.",
      image: "charlotte-rifflet.webp",
      linkedin: "https://www.linkedin.com/in/charlotterifflet/",
      category: "Management"
    },
    {
      id: "boris-aime",
      author: "Boris Aimé-Bauderlique",
      role: isEn ? "Deployment Manager @FranceVAE" : "Chargé de déploiement @FranceVAE",
      date: "28/06/2025",
      content: isEn
        ? "I had the pleasure of collaborating with Victor on a public digital service, and he was truly a driving force in the team. Always proposing ideas that shake things up, that move things forward, often before we even had time to formulate our own questions. And above all, you never settled for just thinking: you produced, tested, wireframed, prototyped... to make things visible, so we could project ourselves. Your UX expertise is undeniable, but it's your experience that truly made the difference. You know how to create dynamics, question habits, and push everyone to raise their game. A complete, involved profile, someone I would work with again without hesitation."
        : "J'ai eu le plaisir de collaborer avec Victor sur un service public numérique, et il faut le dire, tu as été un moteur dans l'équipe. Toujours en train de proposer des idées qui bousculent, qui font avancer, souvent avant même qu'on ait eu le temps de formuler nos propres questions. Et surtout, tu ne t'es jamais contenté de rester dans la réflexion : tu as produit, testé, maquetté, prototypé... pour donner à voir, pour qu'on puisse se projeter. Ton expertise UX est indéniable, mais c'est ton expérience qui a vraiment fait la différence. Tu sais créer des dynamiques, remettre en question les habitudes, et pousser tout le monde à élever le niveau. Bref, un profil ultra complet, impliqué, avec qui je retravaillerais sans hésiter. À bientôt j'espère !",
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
        ? "Victor is a true source of inspiration. I was lucky to work with him on several projects with different stakes, on which he brought a pragmatic and professional approach. His leadership and ability to collaborate closely with various stakeholders were essential for creating products that meet user needs while respecting strategic objectives. Victor is the embodiment of the human artist designer passionate about his work. I warmly recommend Victor for his professional and human qualities and his positive impact on every project he contributes to."
        : "Victor est une véritable source d'inspiration. J'ai eu la chance de travailler avec lui sur plusieurs projets ayant des enjeux différents sur lesquels il a su apporter une approche pragmatique et professionnelle. Son leadership et sa capacité à collaborer étroitement avec les différentes parties prenantes ont été essentiels pour créer des produits répondant aux besoins des utilisateurs tout en respectant les objectifs stratégiques. Victor est l'incarnation du designer artiste humain passionné par son travail. Je recommande chaleureusement Victor pour ses qualités professionnelles, humaines et son impact positif dans chaque projet auquel il contribue.",
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
        ? "I had the pleasure of collaborating with Victor for nearly 2 years within the SQOOL application design team at UNOWHY. As Product Lead in UI & Interaction Design, he played a central role in defining the product vision as well as designing and continuously improving engaging and coherent products for the educational community. Victor notably led and guided the product designers team with a rigorous yet inspiring approach. His expertise, leadership, and close collaboration with various stakeholders were essential for designing solutions that meet different user needs and strategic challenges. I was particularly struck by Victor's curiosity and his ability to share knowledge pedagogically. He was a real driver of progress within the design team, fostering a collaborative and stimulating work environment."
        : "J'ai eu le plaisir de collaborer avec Victor pendant près de 2 ans au sein de l'équipe de conception des applications SQOOL chez UNOWHY. En tant que Product Lead en UI & Interaction Design, il a joué un rôle central dans la définition de la vision produit ainsi que dans la conception et l'amélioration continue de produits engageants et cohérents à destination de la communauté éducative. Victor a notamment piloté et accompagné l'équipe de product designers avec une approche à la fois rigoureuse et inspirante. Son expertise, son leadership et sa collaboration étroite avec les différentes parties prenantes ont été essentiels pour concevoir des solutions répondant aux besoins des différents types d'utilisateurs et aux enjeux stratégiques. J'ai été très marquée par la curiosité de Victor et sa capacité à partager son savoir avec pédagogie. Il a été un véritable moteur de progrès au sein de l'équipe de conception, favorisant un environnement de travail collaboratif et stimulant.",
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
        ? "I worked alongside Victor for 5 beautiful years. His expertise, 360 vision, and design talent enabled the creation and success of many projects. We notably redesigned the UNOWHY brand platform, and without Victor it would never have seen the light of day. Victor is passionate and fascinating."
        : "J'ai travaillé aux côtés de Victor pendant 5 belles années. Son expertise, sa vision 360 et son talent de designer ont permis la création et la réussite de nombreux projets. Nous avons notamment revu la plateforme des marques de UNOWHY et sans Victor cela n'aurait pas vu le jour. Victor est passionné et passionnant.",
      image: "hortense-jan.webp",
      linkedin: "https://www.linkedin.com/in/hortensejan",
      category: "Management"
    },
    {
      id: "hubert-bloch",
      author: "Hubert Bloch",
      role: isEn ? "Deputy CEO @UNOWHY" : "Directeur Général Adjoint @UNOWHY",
      date: "08/12/2024",
      content: isEn
        ? "I had the pleasure of working with Victor during his 6 years at UNOWHY, and he is someone I highly recommend. Highly cultivated, curious, and creative, he always brings relevant ideas and original perspectives to every project. Beyond his talent, Victor is particularly friendly, which makes collaborating with him even more enjoyable."
        : "J'ai eu le plaisir de travailler avec Victor durant ses 6 années chez UNOWHY, et c'est une personne que je recommande vivement. Très cultivé, curieux et créatif, il apporte toujours des idées pertinentes et des perspectives originales à chaque projet. En plus de son talent, Victor est quelqu'un de particulièrement sympathique, ce qui rend la collaboration avec lui d'autant plus agréable.",
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
        ? "Passionate and reliable, I greatly appreciated my professional experience at UNOWHY with Victor. Lover of details, the numerous exchanges, his feedback and recommendations allowed me to reach a new level and strengthen my expertise and experience as a designer. He has the will to listen to his team, to put them in the best conditions both professionally and personally, to guarantee the best possible environment. It was a huge pleasure to have been able to work and learn with him."
        : "Passionné et fiable, j'ai énormément apprécié mon expérience professionnelle à UNOWHY avec Victor. Amoureux des détails, les nombreux échanges, ses retours et recommandations m'ont permis d'atteindre un nouveau palier et de renforcer mon expertise et expériences en tant que designer. Il a la volonté d'être à l'écoute de son équipe, de leur mettre dans les meilleures conditions tant sur le plan professionnel que humain, pour garantir le meilleur cadre qui soit. Ce fut un énorme plaisir d'avoir pu travailler et d'apprendre avec lui.",
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
        ? "I was lucky to be part of Victor's team for two years at UNOWHY. Beyond being a manager concerned with his team's well-being, he is passionate with an eye for detail and well-done work. Patient and pedagogical, he doesn't hesitate to give constructive advice and share his knowledge with kindness, always pulling others upward. He is a collaborator and mentor I appreciated working with, and who gave me the technical and human lessons that will always be more than useful throughout my career."
        : "J'ai eu la chance de faire partie de l'équipe de Victor durant deux ans au sein de UNOWHY. En plus d'être un manager soucieux du bien-être de son équipe, c'est un passionné qui a le souci du détail et du travail bien fait. Patient et pédagogue, il n'hésite pas à donner des conseils de façon constructive et partager ses connaissances en toute bienveillance, toujours en tirant les autres vers le haut. C'est un collaborateur et un mentor avec lequel j'ai apprécié travailler, et qui a su m'apporter les enseignements techniques et humains qui me seront toujours plus qu'utiles dans la suite de ma carrière.",
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
        ? "It's a real pleasure to work with Victor. Professional and rigorous, Victor knows how to translate business stakes into relevant implementations that allow projects to reach their objectives. As a person, Victor is very attentive to his collaborators and different trades, both technical and marketing. Together, we achieved beautiful products at PagesJaunes that we are very proud of."
        : "C'est un réel plaisir de travailler avec Victor. Professionnel et rigoureux, Victor sait traduire les enjeux business dans des réalisations pertinentes qui permettent d'atteindre les objectifs des projets. En tant que personne, Victor est très à l'écoute de ses collaborateurs et des différents métiers, à la fois technique ou marketing. Ensemble, nous avons réalisé de beaux produits au sein de PagesJaunes dont nous sommes très fiers.",
      image: "frederic-rodriguez.webp",
      linkedin: "https://www.linkedin.com/in/frederic-rodriguez-71061255/",
      category: "Management"
    },
    {
      id: "remi-serougne",
      author: "Rémi Serougne",
      role: isEn ? "Web Developer" : "Développeur Web",
      date: "08/03/2017",
      content: isEn
        ? "Talented in his field, Victor brings real expertise to imagining a quality user experience. Accessible, attentive, and responsible, working with Victor is a pleasure as he adheres to collective intelligence principles and does everything to facilitate interactions between the Design team and engineering. I strongly recommend Victor for his professional and human qualities."
        : "Talentueux dans son domaine, Victor apporte une réelle expertise pour imaginer une expérience utilisateur de qualité. Accessible, à l'écoute et responsable, travailler avec Victor est un plaisir car il adhère aux principes de l'intelligence collective et met tout en œuvre pour faciliter les interactions entre l'équipe Design et la maîtrise d'œuvre. Je recommande vivement Victor pour ses qualités professionnelles et humaines.",
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
        ? "Victor is passionate about UX and keeps himself up to date with latest trends and methods. He is a very capable designer who can do the legwork but also take a step back and advise on more strategic aspects of an interface design or the project as a whole. He's worked on mobile and web, and has a keen eye for interaction design and can work with the latest prototyping tools. Highly recommended as part of a UX or product team."
        : "Victor is passionate about UX and keeps himself up to date with latest trends and methods. He is a very capable designer who can do the legwork but also take a step back and advise on more strategic aspects of an interface design or the project as a whole. He's worked on mobile and web, and has a keen eye for interaction design and can work with the latest prototyping tools. Highly recommended as part of a UX or product team.",
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
        ? "Working with Victor was a real pleasure. First, because even though his UX skills are well established, he continues to learn and strives to be ever more effective. Then because he knows how to unite people around a project, allowing for total autonomy to see it through. Finally because it is very useful to discuss the medium-term service vision, trades, and associated processes with him."
        : "Travailler avec Victor a été un réel plaisir. D'abord parce que même si ses compétences en terme d'UX ne sont plus à démontrer il continue de vouloir apprendre et cherche à être toujours plus efficace. Ensuite parce qu'il sait fédérer les gens autour d'un projet et qu'on peut par conséquent lui laisser une autonomie totale pour le mener à bien. Enfin parce qu'il est très utile de discuter avec lui lorsqu'il s'agit d'aborder la vision moyen terme des services, des métiers et des process associés.",
      image: "nicolas-moulin.webp",
      linkedin: "https://www.linkedin.com/in/moulinnicolas",
      category: "Management"
    },
    {
      id: "francois-khoury",
      author: "François Khoury",
      role: isEn ? "Senior Presales" : "Senior Presales",
      date: "30/10/2014",
      content: isEn
        ? "It's a real pleasure to work with Victor. His previous experiences as Art Director and Designer bring a critical sense and a new approach to our projects which allow us to improve user experience on Android app and responsive website. Passionate about innovation and cars, Victor helped us a lot on the embedded PagesJaunes application that we conceived together for our partners."
        : "It's a real pleasure to work with Victor. His previous experiences as Art Director and Designer bring a critical sense and a new approach to our projects which allow us to improve user experience on Android app and responsive website. Passionate about innovation and cars, Victor helped us a lot on the embedded PagesJaunes application that we conceived together for our partners.",
      image: "francois-khoury.webp",
      linkedin: "https://www.linkedin.com/in/francoisk",
      category: "Product & Tech"
    }
  ];
};
