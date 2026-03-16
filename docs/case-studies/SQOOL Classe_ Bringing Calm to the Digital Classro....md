# **SQOOL Classe: Real-Time Classroom Supervision**

## **Bringing Calm and Control to the Digital Learning Environment**

| Metadata | Detail |
| :---- | :---- |
| **Role** | Lead Interaction Designer & Product Design Lead |
| **Timeline** | 2022 Launch (Built from scratch) |
| **Context** | Core teacher application for in-class device management within a national educational device rollout (BYOD and managed fleets). |
| **Challenge** | Design a real-time supervision tool that is powerful yet non-invasive, works reliably on low-speed school networks, and allows teachers to focus on pedagogy, not tech administration. |
| **Outcome** | Highly adopted foundational component of the SQOOL Suite, providing teachers with increased control and reducing in-class device management frustration. |

### **30-Second Summary**

The shift to 1:1 student devices presented a major challenge for educators: how to effectively manage 30 individual screens in real-time without losing control or disrupting the lesson flow. We designed **SQOOL Classe**, a web application that acts as the digital nerve center of the classroom. It provides immediate, clear visibility into student activity via a responsive grid, and integrates powerful one-click controls (lock screen, share content, group students) into a calm, non-overwhelming interface. The result is a tool that fades into the background, supporting the teacher's primary goal: *teaching*.

## **The Case Study**

### **1\. The Context: From Digital Potential to Pedagogical Panic**

The massive distribution of digital devices in classrooms promised personalized and engaging learning. However, for teachers, this innovation often introduced a new layer of anxiety: managing device behavior, battling distractions, and troubleshooting tech in a room full of students. The existing solutions were either too clunky, too invasive, or relied on unstable infrastructure. Our mission was to design a supervision layer that was robust, accessible via the browser, and fundamentally *pedagogical*.  
**Visual Integration 1: Contextual Overview**  
**Type:** Fixed Visual / Device Mockup **Description:** Full-screen mockup of the SQOOL Classe main dashboard, displayed on a high-end teacher tablet or large wall-mounted screen. Use a premium, subtly textured light gray background/gradient. Focus on the grid of student cards and the persistent control panel. **File Suggestion:** \`\`

### **2\. The Core Challenge: Visibility without Invasion**

The central paradox of classroom supervision is the tension between **control** and **trust**. Teachers needed to see what was happening instantly to maintain order, but the tool couldn't feel like surveillance or overwhelm them with data. This led to three key design pillars:

1. **Instant Visibility:** Create a tile-based view providing an immediate, color-coded status of all student devices (active app, battery, connectivity).  
2. **One-Click Actionability:** Ensure critical classroom management functions (lock, share, group) are instantly accessible.  
3. **Calm & Confidence:** Design the information density and interaction patterns to reduce teacher anxiety, visualizing connectivity issues (latency, loss) transparently rather than hiding them.

### **3\. Interaction Design: Crafting the Real-Time Grid**

The student card—the central component of the interface—was key. It needed to distill complex real-time data into a scannable, non-disruptive format.

#### **Designing the Student Card and Grid**

* **Data Density:** Each card shows the student's name, current active application (a live thumbnail refreshed frequently), and essential status indicators (low battery, connectivity).  
* **Restrained Color Coding:** Color was used sparingly—primarily for warning states (red for off-task, orange for low battery) and projection status—to avoid sensory overload.  
* **State Transitions:** We designed clear visual state transitions for devices (Off, Idle, Live, Projecting) to ensure teachers never questioned whether the data was current. *Skeleton loading* was used during initial connection to manage the perception of network latency.

**Visual Integration 2: Component & States**  
**Type:** Fixed Visual / Component Breakdown **Description:** A triptych showing the three key states of a student card (e.g., *Connected/On-Task*, *Low Battery Warning*, *Device Locked*), highlighting the specific visual changes and micro-interactions. Mockup the cards placed inside a device frame (e.g., a simple monitor or laptop screen). **File Suggestion:** \`\`

#### **Orchestration Workflow**

The most critical flows—starting a lesson, locking all screens—needed to be non-negotiable in their speed and reliability.

* **The Persistent Control Panel:** A dedicated sidebar or header housed the 'emergency' controls (Global Lock, End Session, Start Sharing) with large, touch-friendly targets, regardless of the screen size (tablet or desktop).  
* **Grouping for Differentiation:** We implemented a smooth **drag-and-drop mechanism** allowing teachers to quickly create temporary sub-groups for differentiated instruction or focused content distribution, a core pedagogical need.  
* **Projection as a Drag Interaction:** To project a student's screen, the teacher simply drags the student's card into a designated projection zone, making the action feel direct and immediate.

**Visual Integration 3: Key Interaction Flow**  
**Type:** Animated Visual (GIF/MP4) **Description:** A short animation demonstrating the fluid drag-and-drop interaction for either: a) creating a student group, OR b) dragging a student card to the projection area. **File Suggestion:** \[Animation of the drag-and-drop grouping or screen projection interaction\]

### **4\. Product Challenges & Technical Constraints**

Real-world usage in schools meant designing for constraints often ignored in pure SaaS products.

* **Unreliable Networks:** The design had to gracefully handle low-speed or intermittent Wi-Fi. We implemented sophisticated status indicators to visualize connection loss without crashing the application or inducing panic.  
* **Dynamic Class Logic:** Student rosters are fluid. The system was engineered to handle dynamic class grouping (students moving between rooms or guest logins) without requiring constant technical re-configuration from the teacher.  
* **Accessibility:** The application was built as a focused web app to ensure accessibility across various teacher devices and operating systems.

### **5\. Outcomes & Impact**

SQOOL Classe quickly became the benchmark for usability and responsiveness within the entire suite, directly addressing the core anxiety associated with digital classrooms.

* **Increased Pedagogical Focus:** Teachers reported a significant increase in their feeling of control and a decrease in time spent on device management, allowing them to redirect their focus back to teaching.  
* **Foundational Technology:** The real-time data feed and visualization patterns established in Classe served as the technical and UX benchmark for subsequent applications in the SQOOL ecosystem.  
* **Deployment:** The application successfully launched in production and was a key component in securing major regional educational contracts.

**Visual Integration 4: Final Product In Use**  
**Type:** Fixed Visual / Device Mockup **Description:** A clean, focused shot of the interface, perhaps highlighting the *Global Lock* feature activated, showing the visual confirmation (e.g., a prominent lock icon) in the control panel and on the student cards. Use a premium, modern tablet mockup on a simple, contrasting background. **File Suggestion:** \`\`  
**Testimonial Placeholder**  
“This is the first time I felt I could manage my classroom without shouting. SQOOL Classe gave me peace of mind.” — *\[Teacher, Test Pilot, 2023\]*