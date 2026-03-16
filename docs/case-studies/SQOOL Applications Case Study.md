# **Case Study: SQOOL Applications**

## **Beyond the App Store: Designing Governance and Discovery in K-12 EdTech**

### **At a Glance**

| Metadata | Details |
| :---- | :---- |
| **Role** | Product Design Lead (UX/UI, Strategy, Vision Framing) |
| **Timeline** | 18 Months (Initial Concept to Strategic Pivot) |
| **Context** | Centralizing fragmented digital content access for a K-12 EdTech suite, serving 10,000+ schools. |
| **Challenge** | Creating a seamless, branded app catalog despite deep conflicts in Mobile Device Management (MDM) policies and regional governance restrictions. |
| **Outcome** | Successfully launched the application, streamlined access, and most importantly, drove a strategic pivot to redefine resource management within the entire product ecosystem. |

## **30-Second Summary**

SQOOL Applications was conceived as the unified, curated app store for educational content, designed to provide a clean discovery experience for teachers and students across Android, Windows, and web platforms. The initial design centered on effortless browsing, policy clarity, and device-aware action buttons (Launch vs. Install).  
However, the reality of fragmented regional policies and competition with major app stores led to significant post-launch friction. We realized the challenge wasn't just UI design; it was **policy visibility and resource governance**. We executed a strategic pivot, redefining the product as a *teacher-facing discovery front-end* while offloading all mass deployment complexity to the centralized MDM system. This work not only delivered a cleaner UI but fundamentally changed how the company addressed content distribution, leading to the creation of a new cross-functional "Resource Tribe."

## **The Case Study**

### **1\. The Fragmented Reality: Context & Vision**

The SQOOL ecosystem was rapidly expanding its catalogue of third-party educational applications. Before SQOOL Applications, teachers and students accessed these tools through messy Android launchers, generic web links, or various fragmented IT menus.  
**Our Goal:** To create a single, branded digital storefront that provided a **pedagogical browsing experience**—a place where apps were curated, clearly labeled by subject and grade level, and accessible regardless of the device (PC or tablet).  
**Key Pain Points to Solve:**

* **Discovery Chaos:** No central hub for approved educational resources.  
* **Policy Opacity:** Users had no idea which apps were approved or how to install them.  
* **Device Inconsistency:** Apps included native Android, Windows executables, and web links, requiring varied launch methods.

**VISUAL CUE 1:** Before/After: A "messy" Android launcher screenshot vs. the initial clean wireframe of the SQOOL Applications dashboard's discovery view.  
*Visual Style: Sketch or wireframe showing a clear grid layout, contrasted with a dense screen of unlabeled icons.*

### **2\. Crafting Clarity: Initial Design Principles**

The design effort focused heavily on the **App Card**—the atomic unit of the catalog—as it had to convey complex metadata instantly.  
**Design System Imperatives:**

* **Contextual Cards:** Each card had to communicate four things immediately: **Title**, **Subject/Grade**, **OS Compatibility** (Android/Win/Web), and **Action State**.  
* **Action State Clarity:** The Call-to-Action (CTA) button was the most complex element. It dynamically reflected the MDM status: Launch, Installed, Managed by IT, or Install Request. This abstraction was crucial for user trust.  
* **Filtering and IA:** We developed a persistent, advanced filtering sidebar that allowed users to narrow down the catalog instantly by pedagogical criteria (subject, curriculum, device type).

**VISUAL CUE 2:** The App Card Component. A high-fidelity mockup of three App Cards showing the different action states: 1\) Blue Launch (Web App), 2\) Grey Managed by IT (IT-deployed app), and 3\) Green Installed (User-installed app).  
*Visual Style: Premium device mockup (e.g., tablet) showing the grid view of the App Cards. Use a soft gradient grey background.* **(sqool-apps-cards.png or similar)**

### **3\. Facing Reality: Post-Launch Complexity & Constraints**

Upon launch, the product gained initial adoption, but quickly hit systemic friction points that no amount of pure UX refinement could solve. These challenges forced a critical self-assessment of the product's fundamental purpose.  
**Emerging Systemic Conflicts:**

| Constraint | UX Impact |
| :---- | :---- |
| **Governance Conflicts** | Regional policies dictated inconsistent permissions. Result: a fragmented UX where the same button meant different things depending on the user’s school/region. |
| **Store Duplication** | Competing directly with Google Play, Microsoft Store, and existing ENT portals. Result: SQOOL Applications lacked visibility and struggled to justify its limited catalogue size (\~300 apps vs. 5,000+). |
| **MDM Complexity Leakage** | Our initial attempts to give teachers self-management tools (like uninstall) led to complicated and error-prone UI flows, especially on lower-end devices. |

This phase taught us that *App access is part UX, part policy*—and that inconsistent policy kills UX.  
**VISUAL CUE 3:** Mobile/Tablet Mockup of the Filtering Sidebar and Discovery Page, showing the comprehensive filter list (Subject, Grade, Device).  
*Visual Style: Full-screen mobile view, clean, minimal design. Show the sidebar overlay for filtering.* **(app-catalog-filtering.png or similar)**

### **4\. The Strategic Pivot: Refining Scope for Impact**

Recognizing the political and systemic obstacles, the team initiated a major retrospective, leading to a crucial strategic pivot:  
**The Shift:** Stop competing as a full-featured "App Store" and redefine the product as the **Teacher-Facing Discovery Front-End**.

1. **Mass Deployment Exit:** All batch operations, silent installs, and device-wide management (MDM) tasks were fully moved out of SQOOL Applications and into the dedicated MDM dashboard.  
2. **Teacher-Focused Discovery:** The application's purpose was narrowed to discovery, previewing, and 1:1 installation rights *for teachers only* on their personal assigned devices. Student access became pure "Launch."  
3. **Governance Architecture:** The learnings inspired the creation of a new, cross-functional internal team (the "Resource Tribe") dedicated to standardizing content ingestion, metadata management, and cross-platform permissions, ensuring governance was solved *before* it reached the UI.

This pivot allowed the UX to be dramatically simplified, focusing on the core value: beautiful, fast, reliable content discovery.  
**VISUAL CUE 4:** The Final, Simplified App Detail View. Highlight the pedagogical metadata and a single, clear "Launch" or "Install" button.  
*Visual Style: High-fidelity mockup of the app detail page on a desktop/laptop screen, emphasizing large screenshots/previews and clean typography.* **(sqool-applications-dashboard@2x.png or similar)**

## **Key Learnings & Testimonial**

### **Key Takeaways**

* **Metadata is the Content:** The success of any catalog is defined by the clarity and rigor of its metadata. A modular App Card that clearly communicated OS, audience, and policy was our most reusable asset.  
* **Policy Visibility Builds Trust:** Making complex, behind-the-scenes MDM policies visually transparent to the user (via the CTA states) was crucial for managing expectations and trust.  
* **Success Can Mean Scoping Down:** The largest impact wasn't achieved by adding more features (like uninstall management), but by clearly defining the product's boundary and offloading systemic complexity to the appropriate platform (MDM). Our work helped map the **political DNA of public education** and structure a better internal process.

### **Testimonial**

"We thought we were shipping a catalog. We ended up mapping the political DNA of public education. This project fundamentally reframed how we approach resource governance across our entire product suite." — Senior Product Owner, Resource Tribe

## **Artifacts & Assets**

These assets were essential for communicating the vision and the final experience:

* **App Card State Specification (Fixed Visual):** Detailed wireframes showing the six possible states of the App Card CTA button. **(app-card-states.png)**  
* **Information Architecture Diagram (Fixed Visual):** Early IA diagrams showing the content taxonomy (Subject, Grade, Device, Policy) and filtering logic. **(catalog-information-architecture.pdf)**  
* **App Launch Flow Prototype (Animated Visual):** A short video illustrating the seamless user journey from catalog card click to the application launch (either web link or native app). **(app-launch-flow.mp4)**  
* **Final UI Kit Extract (Fixed Visual):** Components like reusable cards, loading skeletons, and the responsive filtering dropdowns. **(UI kit extract – cards & filters)**  
* **High-Fidelity UI Screens (Fixed Visual):** Final dashboard and detail views on tablet and desktop. **(sqool-applications-ui@2x.png)**