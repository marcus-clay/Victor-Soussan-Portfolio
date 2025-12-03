# **SQOOL Extend**

### **Bringing powerful virtual computing to the classroom, on demand.**

## **At a Glance**

| Category | Detail |
| :---- | :---- |
| **Role** | Product Design Lead (Concept to Detailed Flows) |
| **Timeline** | 2022-2024 (Discovery, 3 Release Cycles) |
| **Context** | Democratizing access to heavy software (CAD, 3D, Dev IDEs) for high school students using low-spec tablets/PCs. |
| **Challenge** | Design a simple, intuitive booking and access experience for complex Virtual Machines (VMs) and cloud-streamed desktops. |
| **Outcome** | Successful beta rollout, integrated VDI capability into the SQOOL suite, and deployment to 100+ schools in 2024\. |

## **30-Second Summary**

SQOOL Extend was a strategic partnership with a Cloud PC provider (Weytop) to solve the "heavy software, light hardware" paradox in French high schools. Our design challenge was making Virtual Desktop Infrastructure (VDI)—a complex, high-latency system—feel like a native, one-click application launch. We designed the end-to-end teacher and student journey, focusing on clear status communication, simplified session management (templates), and a minimal in-stream overlay. The resulting product successfully virtualized computing environments at scale, allowing students to run industry-standard tools like SolidWorks and Photoshop, regardless of their device's power.

## **The Challenge: Bridging the Hardware Gap**

Many high school specializations—from technical design and engineering to media and coding—require powerful software like SolidWorks, CAD, and advanced IDEs. However, the schools were largely equipped with low-spec tablets and budget PCs that could not handle these applications natively.  
**The Ambition:** To shift UNOWHY's educational suite into post-device innovation by offering **cloud workstations on demand**, accessible from any student device and streamed in real-time.  
**Initial Discovery & Vision:** We began with in-depth interviews with IT staff, teachers, and students. Bench testing in real classrooms confirmed our hypothesis: the technology (cloud streaming/VDI) was viable, but the user experience needed a complete overhaul. The core finding was that **without simple metaphors, VMs feel alien to the average teacher and student.**  
**Visual Cue 1 (Fixed):** *A visually striking 3-column graphic contrasting a low-spec student tablet/PC with the heavy software icons (SolidWorks, VS Code, Photoshop) they now can access via a Cloud PC icon.*

## **The Iterative Approach: Pilot & Validation**

Given the complexity of deploying VDI at a regional scale, we adopted an intensive, exploratory design approach focused on real-world use cases and technical viability.

### **Phase 1: Pilot & Protocol Setup**

We partnered with a selection of pilot high schools (*Lycées*) to test the conceptual model and early wireframes. Our protocol was structured over **six weeks** to capture usage across different pedagogical scenarios.  
**Key Experimental Methods:**

* **Continuous Feedback Channel:** A dedicated channel (Teams) for participants to share spontaneous remarks, challenges, and suggestions.  
* **Bimonthly Video Exchanges:** Scheduled sync-ups every two weeks to discuss progress, usage patterns, and address critical friction points.  
* **In-person Observation:** Visits were planned at the start and end of the test, including direct observation of student sessions to capture interactions, emotional reactions, and task completion in real-time.

### **Phase 2: Validating Core Hypotheses**

Our research focused on validating whether the core UX metaphors simplified the technical complexity for non-expert users. We tested specific hypotheses related to the teacher and student flows:

* **Teacher Focus (Booking):** Could teachers easily choose the appropriate **Session Template**? Did they understand how to select the audience and define the exact time slot based on limited server resources?  
* **Student Focus (Access):** Could students launch the session created by their teacher seamlessly? Did they understand the switch between their local device and the remote Virtual Machine environment?

This iterative validation was crucial in refining the loading choreography (Part 2\) and defining the necessary safety rails within the session creation flow (Part 1).  
**Visual Cue 1.5 (Fixed):** *A clean, simple timeline graphic or infographic showing the 6-week pilot phase, highlighting the touchpoints: Start Visit, Bimonthly Syncs, Session Observation, End Visit/Feedback Collection.*

## **Part 1: Designing the Teacher Experience (Booking & Management)**

The teacher needed a reliable way to provision powerful resources—GPUs, specific OS versions, and specialized software models—without being an IT expert. This introduced a critical tension: balancing flexible configuration with the constraints of real-time server pool availability.

### **The 'Session Template' Solution**

We streamlined the complexity of hardware configuration into curated **Session Templates** (e.g., "3D Modeling with GPU," "Python Dev Environment"). This allowed for fast session creation while still supporting granular control for advanced users.  
**Key Teacher Flows Designed:**

1. **Fast Session Booking:** A clean configurator interface for defining OS, apps, specs, availability window, and audience.  
2. **Session Dashboard:** A clear, at-a-glance view for "My Sessions," showing past, active, and upcoming reservations with clear state indicators.  
3. **Action UX:** Drag-and-drop mechanics for simple session management (renaming, duplicating) and contextual feedback for editing or canceling.

**Visual Cue 2 (Animated/Fixed):** *Mockup of the Teacher Dashboard on a desktop screen, showing a clean calendar/list view of upcoming sessions with clear status labels (Active, Booked, Finished).* (pc-virtuel-booking@2x.png / session-history@2x.png)

## **Part 2: The Student Experience (Seamless Access)**

For students, the experience had to be as simple as launching any other app on their tablet or PC. The challenge was integrating the Cloud PC's complex Single Sign-On (SSO) and VDI provisioning into the existing SQOOL ecosystem.

### **Designing for Latency**

Integrating a high-latency system meant that **the design solution *was* the loading state.** We had to minimize *perceived* latency during the critical 30-60 second provisioning phase.  
**Sequential Loading Choreography:** We implemented a multi-step loading modal that provides distinct, visually rewarding feedback:

1. **"Provisioning Environment":** Server pool is located and prepared.  
2. **"Authenticating User":** Seamless SSO leveraging existing SQOOL credentials.  
3. **"Connecting Stream":** The final stage before the desktop appears.

This choreography manages user expectations, reducing frustration and abandonment rates compared to a static loading spinner.  
**Visual Cue 3 (Animated):** *A short animation showing the sequential 3-step loading screen choreography before launching the full virtual desktop stream.* (sqool-extend-loading-animation.mp4)

## **Part 3: In-Stream UX & Micro-Interactions**

Once the student is inside the virtual, streamed Windows environment, we needed to maintain a connection to the parent SQOOL suite without being intrusive.

### **The Minimal Overlay**

We designed a minimal, non-intrusive toolbar within the streamed environment. This **In-Stream Overlay UX** provides:

* **Quick Session Control:** Clear, non-technical controls for managing the session (Pause, Disconnect, End Session).  
* **Session Timer:** A persistent, minimal timer to manage class time and resource usage.

The overlay was ruthlessly minimal to avoid adding cognitive load in an already complex environment (a streamed desktop).  
**Visual Cue 4 (Fixed):** *Mockup of a virtual desktop screen (Windows environment) on a high-end monitor, showing the minimal, persistent SQOOL-branded toolbar overlay at the top or side.* (in-stream-toolbar-ux.png / pc-virtuel-ui@2x.png)

## **Outcomes & Strategic Impact**

SQOOL Extend successfully delivered a critical strategic capability: enabling schools to deploy a full-featured PC environment without requiring high-spec local hardware.

| Metric | Result |
| :---- | :---- |
| **Rollout** | 3 phases of rollout, tested in 6+ Lycées. |
| **Launch** | Deployed in late 2024 to 100+ schools across selected regions. |
| **Viability** | UX flows proved a complex, latency-sensitive feature could be successfully integrated. |
| **Strategic Win** | Positioned SQOOL as the first UNOWHY app to virtualize computing environments at scale, supporting a wider range of high school use cases. |

### **Testimonial**

**“Extend allowed us to run SolidWorks on tablets in our design class. That used to be a fantasy.”**  
— *Engineering Teacher, Technical Lycée*

## **Key Learnings**

1. **Design for Delays:** When integrating a high-latency system, the design solution *is* the loading state. Clear, sequential progress communication is paramount to user satisfaction.  
2. **Partnership UX:** Designing for partner integration (like Weytop) requires meticulous flow mapping and clear technical specifications (like our PRD and handoff documents) to ensure a seamless bridge, not just an API connection.  
3. **Innovation through Metaphor:** To introduce a technically complex product like VDI to non-technical users (teachers/students), the UX must prioritize clear, safe metaphors over technical jargon.  
4. **Validate in Context:** The most critical discoveries (e.g., resource availability and time slot management) only emerged through real-world testing with teachers and students in pilot schools.