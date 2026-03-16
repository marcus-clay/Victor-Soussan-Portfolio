# **06 – SQOOL Classe \- Real-Time Classroom Supervision**

**Subtitle:** Designing the teacher application for monitoring, controlling, and orchestrating student devices during a lesson

## **Title**

SQOOL Classe \- Real-Time Classroom Supervision

## **Grid Description**

The dedicated application for teachers to manage and supervise student device activity in real-time, focusing on clear status, quick action modalities, and privacy.

## **Introduction**

SQOOL Classe is the core teacher tool for in-class device management. The design challenge was to create an interface that provides instantaneous, clear visibility into student activity, while enabling fast, non-disruptive actions like blocking apps, sharing screens, or launching resources.

## **Context & Vision**

SQOOL Classe is the nerve center of the digital classroom for teachers. The core problem it solves is simple: how can a teacher effectively manage 30 individual devices in real-time without becoming a tech administrator? The vision was to provide a streamlined, high-information-density interface that offered real-time status (battery, screen activity) and allowed quick, focused actions (lock screen, share screen, start a session) to maintain pedagogical focus.

## **My Role**

* **Lead Interaction Designer:** Focused heavily on real-time data visualization, quick action affordances, and the overall information hierarchy within the classroom view.  
* **Workflow Optimization:** Developed detailed user flows for session creation, student grouping, and the in-class "emergency" controls (e.g., locking all screens).  
* **Prototyping:** Used high-fidelity prototypes to test how teachers visually scanned the class view and prioritized alerts or student requests.

## **Design Objectives**

The design needed to support the teacher's primary goals: maintaining order and facilitating content distribution.

* **Instant Visibility:** Design a tile-based view that gives the teacher an immediate, color-coded status of all student devices (active app, battery, connectivity).  
* **One-Click Actions:** Ensure all critical classroom management functions (lock, share, group) are available with minimal navigation and a large, touch-friendly target.  
* **Non-Intrusive Requests:** Create a smooth flow for students to discreetly request help or attention from the teacher.  
* **Filtering & Grouping:** Allow teachers to easily create and manage sub-groups of students for differentiated instruction.

## **What We Made**

The main teacher interface, optimized for a large, wall-mounted display or a teacher tablet.

* **Real-Time Student Cards:** A responsive, grid-based card layout where each student's device status was displayed. Color coding was used sparingly but effectively for warning states (low battery, off-task).  
* **Persistent Control Panel:** A dedicated area on the screen for the most frequent commands (session control, global lock, quick sharing).  
* **Grouping Workflow:** A smooth drag-and-drop mechanism for creating temporary student groups for activities or content distribution.  
* **Session Focus:** Clear visual feedback on the main screen indicating the current lesson's status and objectives.

## **Outcomes**

SQOOL Classe became a highly adopted tool for managing digital devices, directly improving lesson flow.

* **Increased Control:** Teachers reported a greater feeling of control and less frustration with device management, leading to better focus on pedagogy.  
* **Foundational Component:** This app proved the utility of real-time data feeds and served as the benchmark for responsiveness and data visualization in the entire suite.  
* **Integration Hub:** SQOOL Classe became the main hub, connecting to *Partage* for distribution and the App Catalog for launching curated content.

## **Key Artifacts**

* sqool-classe-dashboard@2x.png — Main classroom supervision interface.  
* session-control-flows.pdf — User flows for starting and managing a lesson session.  
* student-card-states.png — Detailed component specifications for student device status cards.  
* grouping-interaction.mp4 — Prototype demonstrating the drag-and-drop grouping feature.

## **Learnings**

* **Data Density Management:** For a high-information-density screen like a classroom view, visual hierarchy and restrained use of color are more important than feature breadth.  
* **The "Emergency" Path:** Always design the high-stress, urgent flows (like device lock) to be instantly accessible, reliable, and visually unambiguous.  
* **Pedagogy First:** The most critical design challenge was ensuring the technology *faded* into the background, supporting the lesson, not dominating it.