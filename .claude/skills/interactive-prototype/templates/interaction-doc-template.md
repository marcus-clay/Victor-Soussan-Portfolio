# [Interaction Name]

> **Created:** [Date]  
> **Author:** [Name]  
> **Status:** Draft | In Review | Approved  
> **Version:** 1.0

---

## Overview

### Intention
**What is the purpose of this interaction?**

[Describe the goal and why this interaction exists. What problem does it solve? What user need does it address?]

### Context
**Where and when does this interaction occur?**

- **Screen/Flow:** [Which screen(s) or user flow]
- **User Action:** [What the user is trying to accomplish]
- **Frequency:** [How often this interaction happens]
- **Conditions:** [Any prerequisites or conditional requirements]

---

## Interaction Specification

### Trigger

| Property | Value |
|----------|-------|
| **Type** | Tap / Long Press / Swipe / Hover / Scroll / Auto / Other |
| **Element** | [Which component triggers the interaction] |
| **Location** | [Where on screen / which area] |
| **Condition** | [Any conditions that must be met] |
| **Accessibility** | [How keyboard/screen reader users trigger it] |

**Example:**
- Type: Tap
- Element: "Submit" button
- Condition: Form validation passes
- Accessibility: Enter key or Space bar

---

### States & Visual Flow

| State | Description | Visual Representation | Duration |
|-------|-------------|----------------------|----------|
| **Initial** | [Starting state before interaction] | [Screenshot or description] | - |
| **Triggered** | [Moment of user action] | [Screenshot or description] | 0ms |
| **Transition** | [During animation/loading] | [Screenshot or description] | [Duration] |
| **Complete** | [Final state after interaction] | [Screenshot or description] | - |
| **Error** (if applicable) | [If interaction fails] | [Screenshot or description] | - |

**Additional States:**
- Hover: [If applicable]
- Focus: [For keyboard navigation]
- Disabled: [Non-interactive state]

---

### Animation Details

#### Primary Animation
| Property | Value |
|----------|-------|
| **Duration** | [e.g., 300ms] |
| **Easing** | [e.g., Ease In-Out, Spring, Custom Bezier] |
| **Properties Animated** | [e.g., opacity, scale, position, color] |
| **Start Value** | [Initial property value] |
| **End Value** | [Final property value] |

#### Timing Breakdown
If multiple animations or sequential steps:

```
0ms     - [Initial state]
  │
  ├─ 0-150ms:   [First animation step]
  │
  ├─ 150-300ms: [Second animation step]
  │
300ms   - [Final state]
```

**Easing Curve:**
- Bezier values: [e.g., cubic-bezier(0.4, 0.0, 0.2, 1)]
- Visual reference: [Link to easing visualization or animation-library.md]

---

### Feedback

#### Visual Feedback
- [What changes visually to confirm the interaction]
- [Color changes, icon updates, text changes, etc.]
- [Loading indicators, progress bars, etc.]

#### Haptic Feedback (Mobile)
- **Type:** Light / Medium / Heavy / Rigid / Soft / Selection / None
- **Trigger Moment:** [When haptic fires during interaction]
- **Platform:** iOS / Android / Both

#### Audio Feedback (Optional)
- **Sound:** [Type of sound, e.g., "success chime", "button click"]
- **Volume:** [Relative volume level]
- **Duration:** [Length of sound]
- **Condition:** [When sound plays, respect user mute settings]

#### System Feedback
- **Toast/Snackbar:** [Message shown to user]
- **Status Update:** [Changes to status bar, badges, etc.]

---

## Technical Implementation

### User Action
**What exactly does the user do?**

[Detailed description of the user's physical action and intent]

Example:
- User taps the "Save" button after filling out the form
- System validates all required fields
- If valid, proceeds to save; if invalid, shows error

---

### Backend Logic

#### API Request (if applicable)
| Property | Value |
|----------|-------|
| **Endpoint** | [e.g., POST /api/users/save] |
| **Method** | GET / POST / PUT / DELETE |
| **Headers** | [Required headers, auth tokens] |
| **Request Body** | [JSON payload or form data] |
| **Response** | [Expected response format] |

**Request Example:**
```json
{
  "userId": "12345",
  "formData": {
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Response Example (Success):**
```json
{
  "status": "success",
  "message": "Data saved successfully",
  "data": { ... }
}
```

**Response Example (Error):**
```json
{
  "status": "error",
  "message": "Email already exists",
  "errorCode": "DUPLICATE_EMAIL"
}
```

---

#### Data Flow
1. [Step 1: User action captured]
2. [Step 2: Data validation/transformation]
3. [Step 3: API call or local storage update]
4. [Step 4: Response handling]
5. [Step 5: UI update based on response]

---

#### State Management
| State Variable | Initial Value | After Interaction |
|----------------|---------------|-------------------|
| `isLoading` | false | true → false |
| `hasError` | false | true (if error) |
| `formData` | { ... } | { updated values } |
| `validationErrors` | [] | [error messages] |

---

### Error Handling

#### Error Scenarios
| Error Type | User Message | Recovery Action | Visual State |
|------------|--------------|-----------------|--------------|
| **Network Error** | "Unable to connect. Please check your internet." | Retry button | Error icon, red border |
| **Validation Error** | "Please fill all required fields." | Highlight missing fields | Red underline on fields |
| **Server Error** | "Something went wrong. Please try again." | Retry button | Error message banner |
| **Timeout** | "Request timed out. Please try again." | Retry button | - |

---

## Timeline Visualization

### Interaction Timeline
```
User Action         System Response              Visual Feedback
    │                      │                          │
    ├─ Tap Button          │                          │
    │                      │                          │
    │                  ┌───▼────┐                     │
    │                  │ Validate │                   │
    │                  └───┬────┘                     │
    │                      │                     ┌────▼─────┐
    │                      ├─ Success ──────────>│ Show Check│
    │                      │                     └──────────┘
    │                      │                          │
    │                      ├─ Error ───────────> [Show Error]
    │                      │                          │
    ▼                      ▼                          ▼
   [Complete]         [API Call]               [Update UI]

Timeline:
0ms     - Tap detected
50ms    - Button press animation
100ms   - Validation starts
250ms   - Loading state shown
1000ms  - API response received
1200ms  - Success animation plays
3200ms  - Return to default state
```

---

## Edge Cases & Considerations

### Edge Cases
1. **Double Tap Prevention**
   - Issue: User taps button twice rapidly
   - Solution: Disable button after first tap until interaction completes

2. **Network Loss Mid-Interaction**
   - Issue: Connection drops during API call
   - Solution: Show retry option, cache user input

3. **Slow Network**
   - Issue: API takes >3 seconds
   - Solution: Show progress indicator, allow cancellation

4. **Interrupted Interaction**
   - Issue: User navigates away during loading
   - Solution: Cancel pending requests, save draft if applicable

### Platform Considerations
- **iOS:** [iOS-specific notes, e.g., back swipe gesture conflicts]
- **Android:** [Android-specific notes, e.g., hardware back button]
- **Desktop:** [Desktop-specific notes, e.g., keyboard shortcuts]
- **Tablet:** [Larger screen considerations]

### Accessibility
- **Screen Reader:** [How interaction is announced]
- **Keyboard Only:** [How to trigger without mouse/touch]
- **Reduced Motion:** [Alternative for users with motion sensitivity]
- **Color Blind:** [Ensure feedback doesn't rely solely on color]

---

## Related Interactions
- [Link to similar or related interaction docs]
- [Dependencies or prerequisites]
- [Subsequent interactions in the flow]

---

## Design Assets
- **Figma File:** [Link to Figma prototype]
- **Principle File:** [Link if using Principle]
- **Video Recording:** [Link to screen recording of interaction]
- **Design Specs:** [Link to Zeplin, Figma inspect, etc.]

---

## Development Notes
[Any additional notes for developers implementing this interaction]

- Performance considerations
- Browser/device compatibility
- Third-party libraries needed
- Known limitations

---

## Testing Checklist
- [ ] Interaction triggers correctly on all platforms
- [ ] All states display properly
- [ ] Animations run at 60fps
- [ ] Error states show appropriate messages
- [ ] Loading states prevent duplicate actions
- [ ] Accessibility: Keyboard navigation works
- [ ] Accessibility: Screen reader announces correctly
- [ ] Reduced motion preference respected
- [ ] Works on slow networks (3G)
- [ ] Edge cases handled gracefully

---

## Change Log
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | [Date] | [Name] | Initial documentation |

---

## Approval
| Role | Name | Date | Signature |
|------|------|------|-----------|
| Designer | [Name] | [Date] | ✓ |
| Developer | [Name] | [Date] | ✓ |
| Product Manager | [Name] | [Date] | ✓ |
