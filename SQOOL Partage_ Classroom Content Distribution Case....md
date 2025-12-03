# **SQOOL Partage: Zero-Friction Content Distribution for the Classroom**

## **Designing an 'AirDrop-like' sharing experience that abstracts enterprise complexity in a K-12 environment.**

| Metadata | Details |
| :---- | :---- |
| **Role** | Product Design Lead, then Senior Interaction Design Specialist |
| **Timeline** | 2022–2024 (Full Design & Iteration Cycle) |
| **Context** | Standalone application within the SQOOL Suite, replacing a legacy file-hosting solution ("SQOOL Cloud"). |
| **Challenge** | Simplify complex, multi-audience, bi-directional file sharing (Teacher ↔ Student) while hiding MDM and network complexity for instant content delivery. |
| **Outcome** | Became the default, highly-praised file distribution workflow, achieving high teacher satisfaction and immediate adoption across deployments. |

## **30-Second Summary**

SQOOL Partage was born from the need to eliminate the daily friction of file sharing in the classroom. We designed a ruthlessly simple, AirDrop-like content distribution system that works instantly across native tablets and web browsers. By focusing on pedagogical intent over technical features, we successfully abstracted away complex governance rules, multi-device management, and network heterogeneity, delivering a seamless, single-click solution for teachers to instantly distribute files, media, and assignments to their entire class or specific groups.

## **01\. The Problem: Friction in the Flow**

Teachers frequently needed to share lesson materials, photos, and digital worksheets instantly, but the existing process—a legacy file manager—was too technical, requiring multiple steps, complex file paths, or reliance on external, non-compliant tools like USB keys. This daily friction disrupted lesson flow and reduced the time spent on teaching. The core design challenge was to map this friction and build a system that made sharing feel immediate and reliable, regardless of the underlying IT complexity.  
**Visual Indication:**

* **Asset:** Problem\_Legacy\_Flow\_Diagram.png  
* **Type:** Still image.  
* **Description:** Simple visual diagram comparing the multi-step, technical legacy flow ("SQOOL Cloud") versus the single-step, zero-friction "Partage" flow. Rendered on a subtle light-grey gradient background.

## **02\. Strategy & Architecture**

Our strategy was to resist the temptation to build yet another generic "Dropbox clone." Instead, we anchored every design decision in specific **pedagogical scenarios** (e.g., *“The teacher needs to instantly send a PDF to the whole class while walking around the room.”*). This led to a dual-platform architecture that was robust and context-aware: a native Android application for the student/teacher tablet experience, and a complementary web application for browser-based access.  
**Key Design Decisions:**

* **Pedagogical First:** The focus shifted from file storage to content *distribution* and *collection* within the teacher-student loop.  
* **Bi-Directional:** Supporting both teacher-to-student distribution (lessons) and student-to-teacher submission (homework).  
* **Information Architecture:** We defined a clear navigation logic around usage: My Files, Shared With Me, Shared By Me, and Favorites.

**Visual Indication:**

* **Asset:** sqool-partage-layout@2x.png  
* **Type:** Still image.  
* **Description:** A composite visual showing the core file explorer layout on both a premium tablet device (native app) and a desktop browser (web app), highlighting the responsive navigation structure.

## **03\. Interaction Focus: The Share Wizard**

The centerpiece of the experience is the highly-calibrated "Share Wizard" and the accompanying gesture-based sharing. Our goal was minimal clicks and maximum confidence.  
We designed a drag-and-drop pattern that allows a teacher to initiate a share simply by dropping a file onto a dedicated component. This immediately triggers the simplified sharing modal, which handles three critical complexities:

1. **Audience Targeting:** Supporting complex multi-audience rules (class roster, group, or individual students) with pre-filled rosters and clear fallbacks.  
2. **Instant Delivery:** Leveraging motion and micro-interactions (e.g., a subtle animation of the file "flying" to the destination) to provide instant confirmation and confidence during transfer.  
3. **Real-Time Status:** A discreet component provided a real-time, student-by-student confirmation of successful file receipt.

**Visual Indication:**

* **Asset:** sqool-partage-dragdrop.mp4 & sqool-partage-share-modal@2x.png  
* **Type:** Animated prototype (MP4) and Still image.  
* **Description:** **(Motion)** A short animation demonstrating the fluid drag-and-drop gesture from a file list onto the "Share" target, followed by the appearance of the streamlined sharing modal. **(Still)** A close-up of the Partage modal UI on a sleek, dark-framed device.

## **04\. Hiding Governance and Accessibility**

The true complexity of the product lay beneath the surface. The design needed to maintain an ultra-simple interface despite navigating complex rulesets (different governance across school districts, offline states, and accessibility mandates).  
We solved this through:

* **Status Codes:** Implementing visual file-type codes (color \+ shape) and permission badges (read, comment, edit) to grant granular control without cluttering the interface.  
* **Document Scanner UX:** Integrating a simple camera flow that automatically converts physical documents (worksheets) into optimized PDFs on the fly, making physical-to-digital sharing seamless.  
* **Accessibility for DYS:** Ensuring high contrast, clear information hierarchy, and support for reading aids, making the sharing process usable for DYS learners.

**Visual Indication:**

* **Asset:** document-scanner-ux.png  
* **Type:** Still image.  
* **Description:** Mockup of the mobile document scanning feature flow—showing the camera view with automatic corner detection and the final optimized PDF preview on a premium tablet device.

## **05\. Impact, Learnings, and Future Vision**

SQOOL Partage immediately became the core file-sharing engine of the SQOOL Suite. The focus on a "single purpose, zero-friction" design directly solved a major pain point, leading to immediate high satisfaction scores.  
“I stopped using USB keys and just dropped the files directly on my students’ tablets from my dashboard. It’s the simplest tool I have.” — Middle School Teacher, Île-de-France  
**Key Learnings:**

* **Friction Mapping is Product Strategy:** Designing single-purpose apps for high-friction tasks (like sharing) is more effective than attempting to build one complex monolithic platform.  
* **Motion for Confidence:** Subtle, positive motion feedback during the document transfer gave teachers essential confidence that the file had successfully delivered, mitigating anxiety about technical processes.  
* **Abstracting Complexity is Core UX:** The design's success lay entirely in completely hiding the technical details of MDM, network configuration, and device heterogeneity from the end-user.

**Visual Indication:**

* **Asset:** Outcomes\_Testimonial\_Graphic.png  
* **Type:** Still image.  
* **Description:** A graphic treatment of the teacher testimonial and a high-level visualization (e.g., a simple rising bar chart) indicating high adoption/satisfaction.