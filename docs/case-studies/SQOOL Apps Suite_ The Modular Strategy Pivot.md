# **SQOOL Apps Suite: The Modular Strategy Pivot**

## **From Monolith to Modular: Redefining the K-12 Digital Experience**

| Metadata | Details |
| :---- | :---- |
| **Role** | Strategy Co-Author, Identity & Cohesion Lead, Design System Implementation |
| **Timeline** | Q1–Q3 2022 |
| **Context** | An attempt to consolidate all K-12 functions (Teaching, IT Management, File Sharing) into one monolithic application (the "SQOOL OS") resulted in user confusion and development bottlenecks. |
| **Challenge** | Break a complex, unified product vision into a focused, scalable, and user-centric suite of independent web applications while maintaining a single, cohesive brand identity. |
| **Outcome** | A successful pivot to a four-app strategy, leading to improved development velocity, crystal-clear user segmentation, and the successful validation of the core SQOOL Design System. |

## **30-Second Summary**

Faced with the cognitive overload of a single, all-encompassing digital platform for schools, we co-authored a fundamental product pivot. The monolithic "SQOOL OS" was strategically deconstructed into a **suite of four single-purpose, interconnected web applications (Classe, Partage, Applications, MDM)**. My contribution centered on designing the **shared identity and cohesion framework**—a unified App Shell, navigation model, and cross-app workflows—ensuring that while developers gained independence, users experienced a single, predictable family of products. This decision was a critical success, accelerating feature delivery and simplifying training across diverse user groups (teachers, IT staff, and students).

## **The Problem: When One App Does Too Much**

The initial product hypothesis—to build a single, comprehensive digital operating system for K-12 education—suffered from a critical flaw: its massive scope created friction for every user type. Teachers struggled to find teaching tools amidst IT administration features, while IT staff were distracted by classroom-specific functionality. This "cognitive noise" led to fragmented adoption and slowed development, as every feature affected the entire codebase.  
**\<--- VISUAL INDICATION: Visuel 1 \---\>**

* **Type:** Diagramme / Schéma d'architecture  
* **Contenu:** Une illustration avant/après. Représentez un grand bloc central (le "Monolith") sur la gauche, avec des flèches qui le traversent dans tous les sens. Sur la droite, quatre blocs distincts et bien ordonnés (Classe, Partage, Applications, MDM) reliés par des lignes douces (le "SQOOL Apps Suite").  
* **Style:** Illustration isométrique ou 2D propre sur fond gris clair.

## **Strategic Pivot: Designing for Focus**

The strategic decision was to shift from a "SQOOL OS" to the **SQOOL Apps Suite**. This move was fundamentally a design decision: to use application boundaries as a tool for cognitive clarity and targeted utility.

| Application Name | Primary User | Core Function |
| :---- | :---- | :---- |
| **SQOOL Classe** | Teachers | Classroom management, student device control, teaching tools. |
| **SQOOL MDM** | IT Administrators | Device enrollment, security policies, remote management. |
| **SQOOL Partage** | All Users | Centralized, secure file storage and sharing. |
| **SQOOL Applications** | All Users | App store and centralized launchpad for all available tools. |

My role became the **Identity & Cohesion Lead**. The challenge shifted from *building features* to *building the seams*—making sure the four specialized tools felt like a single, trusted family.

## **Phase 1: Defining the Shared DNA**

To ensure the modular suite felt unified, we established a "Shared DNA" framework that dictated the non-negotiable elements common to all four applications. This was crucial for minimizing context switching friction.

### **1\. The Unified App Shell**

We standardized the main layout structure, header, and primary navigation (sidebar/header) using production-ready React components. This ensured that no matter which app a user was in, the global elements—such as the user avatar, notification bell, and primary branding—were consistent and in the same place.

### **2\. Iconography and Visual Language**

We designed a clean, cohesive set of application icons (sqool-suite-icons.png). This visual standard extended to the internal iconography and color palette, which were rigorously managed through our centralized Design System documentation (zeroheight-guide.html). Each application received a primary accent color, but all components adhered to the same foundational design tokens.  
**\<--- VISUAL INDICATION: Visuel 2 \---\>**

* **Type:** Mockup de l'UI  
* **Contenu:** Une grille propre présentant les quatre icônes des applications (Classe, Partage, Applications, MDM) avec leurs noms en dessous. Un style digne d'un design studio (simplicité, couleurs vives mais apaisantes sur fond neutre).  
* **Style:** Flat design/iconographie unifiée.

## **Phase 2: Minimizing Context Switching**

A modular architecture risks creating "walled gardens" that disrupt user flow. We mitigated this by designing clear, frictionless pathways between the apps.

### **Cross-App Workflows**

We defined specific interaction models for moments where a user *must* jump from one app to another.

* **The File Picker:** A common pain point was moving files between teaching (Classe) and storage (Partage). We designed a unified File Picker component that was surfaced in both applications, using the same visual language and interaction patterns, abstracting the API layer underneath. This made the file ecosystem feel instantaneous and unified.  
* **Action Redirection:** Notifications or call-to-action buttons (e.g., "Manage Device Settings") within Classe or Partage were designed to seamlessly redirect the user to the precise location in MDM, ensuring a zero-friction handoff.

**\<--- VISUAL INDICATION: Visuel 3 (Animé/Fixe) \---\>**

* **Type:** Animation d'interface (ou succession de 3 captures)  
* **Contenu:** Démonstration du flux d'une tâche simple: un enseignant dans l'application Classe clique sur "Add Resource", et une modale/un tiroir s'ouvre utilisant le composant Partage (Shared File Picker).  
* **Style:** Mockup de l'interface utilisateur dans un device premium (par exemple, un grand écran d'ordinateur portable) sur un fond dégradé subtil.

## **Outcomes & Validation**

The modular pivot proved to be one of the most impactful strategic decisions of the entire program, validating the power of targeted design and shared systems.

### **1\. Accelerated Velocity**

By segmenting the product, we created clear product ownership boundaries, allowing development teams to focus on a smaller, defined problem space. This immediately accelerated feature delivery across all four applications simultaneously.

### **2\. Clarity and Adoption**

User testing and support metrics confirmed the shift brought immediate clarity. Teachers now instinctively knew that **Classe** was for teaching and **MDM** was strictly for the IT team, simplifying training documentation and reducing support requests related to application confusion.

### **3\. Design System Scalability**

The SQOOL Apps Suite served as the definitive stress test for our newly formalized Design System. Deploying the system across four parallel, independent applications validated its robustness, component structure, and tokenization, proving its scalability for future product launches.  
**\<--- VISUAL INDICATION: Visuel 4 \---\>**

* **Type:** Screenshot d'interface  
* **Contenu:** Une vue de l'une des applications, par exemple SQOOL Classe ou SQOOL MDM. Le but est de montrer l'esthétique finale: un UI clean, l'utilisation cohérente du Design System (cartes, typographie, couleurs).  
* **Style:** Un grand screenshot d'application, centré sur fond neutre/dégradé, mettant en valeur l'interface utilisateur.

## **Key Learnings**

1. **Product Strategy *is* UX Strategy:** The decision to split a platform is fundamentally an exercise in reducing cognitive load and aligning the product architecture with the user's mental model. This strategic move was the biggest UX win.  
2. **Consistency Over Convenience:** Modular success hinges entirely on a ruthless commitment to consistency in the shared elements (App Shell, navigation, components). If the user perceives a break in identity, the friction returns.  
3. **Coordination is the New Centralization:** Moving from one large project to four smaller ones shifted the design challenge from execution to cross-squad coordination, demanding clear documentation and governance for the Shared DNA framework.