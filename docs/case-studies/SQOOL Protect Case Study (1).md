# **SQOOL Protect: Designing Secure and Lightweight Parental Control for School Devices**

## **Bridging the Digital Divide: Enabling Responsible Home Use of Education Laptops**

### **Project Overview**

| Category | Detail |
| :---- | :---- |
| **My Role** | Product Design Lead (Conception & Specifications) |
| **Timeline** | *\[Insert Project Duration \- e.g., Q1/Q2 2023\]* |
| **Context** | UNOWHY / Deployment of SQOOL PCs to middle and high school students in French regions (e.g., Île-de-France). |
| **Challenge** | Create a simple, tamper-proof parental control solution for school-issued Windows laptops that addresses parental anxiety without requiring complex setup or compromising institutional IT rules. |
| **Outcome** | Successfully deployed across **thousands of devices**, becoming the **most-used home feature** by parents, validating the need for a focused, lightweight parental UX. |

### **The 30-Second Summary**

SQOOL Protect was designed to solve a critical tension in the EdTech ecosystem: the need for parental supervision when a school-issued laptop enters the home. We created a **lightweight, system-native parental control** that was pre-installed and impossible for students to bypass. By eliminating complex features and focusing on core needs—**screen time scheduling, app restriction, and web filtering**—we delivered a zero-friction experience for non-technical parents. This strategic focus allowed SQOOL Protect to achieve high parental adoption and usage, providing essential peace of mind while securing the device outside of school hours.

## **1\. Defining the Problem Space: Unsupervised Learning**

### **The Contextual Gap**

Following mass deployment, school laptops (SQOOL PCs) became dual-purpose tools: educational devices during the day, and personal computers at night. Parents quickly voiced a concern: they needed to **regulate their children’s digital habits** on a device they couldn't fully control or monitor without an institutional intermediary.  
The market offered complex, feature-heavy parental control apps. Our analysis showed these were unsuitable, as they required technical installation, conflicted with existing school MDM policies, and added unnecessary friction for parents.

### **The Design Mandate**

The solution had to be simple, effective, and crucially, **resistant to bypass**. Our design constraints were tight and specific:

* **Zero-Friction Installation:** The app must be pre-installed and available immediately.  
* **Tamper-Proof:** The student must not be able to disable, close, or uninstall the service.  
* **Parent-Centric UX:** Setup and daily management must be effortless, designed for maximum adoption by non-tech-savvy users.

**Visual 1: The Contextual Challenge** *Intégrer un visuel composite et premium. Un mockup de l'ordinateur SQOOL (design sobre et épuré) affichant l'interface SQOOL Protect, avec un fond dégradé gris clair et des éléments de design doux (flou, profondeur).*

## **2\. Strategic Simplicity: The Lightweight Approach**

To overcome the design constraints, we strategically limited the feature set to maximize impact and ease of use, resulting in an integrated solution that felt natural to the Windows operating system.

### **Core Feature Alignment: Control and Context**

We focused on three pillars of parental control:

1. **Contextual Screen Time:** Based on the principle that the school device is regulated **outside** of school hours (18:00 to 08:00, weekends). This allows parents to define supplemental screen time (e.g., 2 extra hours) that layers onto the institutional default schedule.  
2. **Explicit App Restriction:** A straightforward, visual toggle list of native applications detected on the device, allowing for immediate blocking.  
3. **Web Filtering:** Seamless integration with established educational safety standards (based on the "Liste de Toulouse" recommendations) to block inappropriate content and restricted URLs without parental configuration.

### **The Seamless Onboarding Flow**

We identified **parental onboarding** as the most critical point of failure in other apps. Our flow was reduced to four quick steps:

1. **Access:** Parent clicks the SQOOL Protect icon in the child's PC system tray.  
2. **Pairing:** A secure, one-time-use **QR code** is displayed on the PC screen.  
3. **Authentication:** Parent scans the code with their personal phone/tablet to log in or create an account via email.  
4. **Activation:** Parent links the child's profile (Name \+ Birthday) to the device.

This flow eliminated traditional passwords, manual entry of device codes, and complex app store downloads, achieving the goal of a **sub-3-minute setup**.  
**Visual 2: Zero-Friction Setup** *Intégrer une animation (GIF/vidéo) du flux de connexion/pairing. Montrer un smartphone/tablette (device premium) scannant un QR code affiché sur l'écran d'un laptop SQOOL. Le contraste entre les deux devices est très important.*

## **3\. The Design Output: UI for Peace of Mind**

The visual language prioritized clarity, legibility, and a non-judgmental tone. The design was minimalist, relying on strong information hierarchy and familiar native UI elements.

### **Screen Time Management UI**

The scheduling interface needed to clearly communicate the three layers of time: **School-Defined Time**, **Blocked Time**, and **Parent-Authorized Time**. We used a simple, segmented dial or calendar view to represent these blocks visually.

### **App and System Resilience**

A key part of the design collaboration with developers involved the **"locked screen" state**. We designed a clear, reassuring, yet firm overlay that appeared when screen time expired, preventing access but offering a simple, non-frustrating message.  
The parent-facing UI ensured:

* Real-time activity feedback (e.g., "Last activity: 17:27").  
* Explicit status for non-customizable features (e.g., "Internet Filtering: Active. Defined by the system, cannot be modified").

**Visual 3: Core Feature Interface** *Intégrer un mockup haute-fidélité ("apps-restriction-toggle@2x.png") de l'interface parentale sur un smartphone. Mettre en évidence la simplicité des toggles pour les applications et la clarté des statuts.*  
**Visual 4: The Locked Screen State** *Intégrer un visuel d'un écran de laptop SQOOL verrouillé. Le design de l'overlay doit être minimaliste et informatif (e.g., un simple message "Screen Time Expired. Access resumes at 08:00 AM").*

## **4\. Impact and Reflection**

### **Adoption as Validation**

The success of SQOOL Protect was not measured by feature count, but by **parental adoption and sustained usage**. The high usage rate, confirmed by Customer Success Management (CSM) feedback, demonstrated that when security is simplified and friction is removed, parents will embrace digital supervision.  
SQOOL Protect became a crucial differentiating factor for the SQOOL offering, proving that **intentional minimalism** and solving the single most pressing parental need (time management outside of school) delivered far greater value than a suite of secondary features.  
*"It’s reassuring. I know the laptop is off by 9 p.m., and I control which apps my daughter sees."*  
— Parent, SQOOL PC Program

### **Key Learnings**

Our work on SQOOL Protect confirmed that in the EdTech space, **user experience for the secondary user (the parent)** must be prioritized with the same rigor as the primary user (the student/teacher), but with a focus on **utility and clarity over complexity.**