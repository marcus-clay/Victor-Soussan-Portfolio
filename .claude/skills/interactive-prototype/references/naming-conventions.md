# Naming Conventions for Interactive Prototypes

## Frames (Screens & Artboards)

### Structure
```
[Type]/[Name]/[State]
```

### Types
- **Screen** - Full application screens
- **Modal** - Overlay dialogs and modals
- **Component** - Reusable component variations
- **Flow** - User flow documentation frames

### Examples
```
Screen/Home/Default
Screen/Profile/Edit-Mode
Modal/Confirmation/Open
Modal/Confirmation/Closed
Component/Button/All-States
Flow/Onboarding/Step-1
```

---

## Layers (Elements)

### Structure
```
[Type]-[Name]-[Variant]
```

### Common Types
- **Button** - Interactive buttons
- **Icon** - Icon elements
- **Text** - Text layers
- **Container** - Groups and frames
- **Image** - Image elements
- **Input** - Form inputs

### Examples
```
Button-Primary-Default
Button-Primary-Hover
Button-Primary-Active
Icon-Menu-Hamburger
Text-Title-H1
Text-Body-Regular
Container-Card-Elevated
Input-Email-Empty
Input-Email-Filled
```

---

## Interaction Groups

### Structure
```
Interaction-[Action]-[Component]
```

### Action Types
- **Tap** - Touch/click interactions
- **Swipe** - Swipe gestures
- **Hover** - Mouse hover states
- **Scroll** - Scroll-triggered animations
- **Drag** - Drag interactions
- **LongPress** - Long press gestures

### Examples
```
Interaction-Tap-MenuButton
Interaction-Swipe-Card
Interaction-Hover-Link
Interaction-Scroll-ParallaxBg
Interaction-Drag-Slider
Interaction-LongPress-ContextMenu
```

---

## States Naming

### Standard States
- **Default** - Initial/idle state
- **Hover** - Mouse over (desktop)
- **Active** - Currently pressed/selected
- **Focus** - Keyboard focus
- **Disabled** - Non-interactive state
- **Loading** - Processing state
- **Error** - Error state
- **Success** - Success state

### Compound States
For complex components with multiple state dimensions:
```
Button-Primary-Hover-Disabled
Input-Text-Focus-Error
Card-Selected-Hover
```

---

## Variants Naming

### Auto Layout Variants
Use descriptive names for different breakpoints or configurations:
```
Button/Size=Small
Button/Size=Medium
Button/Size=Large
Button/Type=Primary
Button/Type=Secondary
Button/State=Default
Button/State=Hover
```

---

## Page Organization

### Recommended Structure
```
📄 Design System
  └─ Components
  └─ Styles
  └─ Icons

📄 Screens
  └─ Section/Feature grouping
  
📄 Flows
  └─ User journey documentation
  
📄 Prototypes
  └─ Interactive prototype versions
  
📄 Archive
  └─ Old versions
```

---

## Best Practices

### Do's ✅
- Use PascalCase or kebab-case consistently
- Be descriptive but concise
- Group related elements with consistent prefixes
- Version prototypes (v1, v2, etc.)
- Keep hierarchy shallow (max 3 levels)

### Don'ts ❌
- Avoid generic names like "Frame 1", "Rectangle 2"
- Don't use special characters except `-` and `/`
- Avoid abbreviations unless universal (btn → Button)
- Don't mix naming conventions within a project
- Avoid spaces in layer names (use dashes)

---

## Quick Reference

| Element | Pattern | Example |
|---------|---------|---------|
| Screen | Screen/Name/State | Screen/Login/Default |
| Modal | Modal/Name/State | Modal/Alert/Open |
| Button | Button-Type-State | Button-Primary-Hover |
| Icon | Icon-Name | Icon-ChevronRight |
| Text | Text-Style-Variant | Text-Heading-Bold |
| Container | Container-Purpose | Container-CardWrapper |
| Interaction | Interaction-Action-Target | Interaction-Tap-SubmitBtn |
