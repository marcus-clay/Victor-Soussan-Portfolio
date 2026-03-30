#!/usr/bin/env python3
"""
Generate interaction documentation from template.

This script helps quickly create interaction documentation by filling in
a template with user-provided information.
"""

import os
import sys
from datetime import datetime
from pathlib import Path


def get_input(prompt, default=""):
    """Get user input with optional default value."""
    if default:
        prompt = f"{prompt} [{default}]: "
    else:
        prompt = f"{prompt}: "
    
    value = input(prompt).strip()
    return value if value else default


def get_multiline_input(prompt):
    """Get multiline input from user."""
    print(f"\n{prompt}")
    print("(Enter empty line to finish)")
    lines = []
    while True:
        line = input()
        if not line:
            break
        lines.append(line)
    return "\n".join(lines)


def get_yes_no(prompt, default=True):
    """Get yes/no input from user."""
    default_str = "Y/n" if default else "y/N"
    response = input(f"{prompt} [{default_str}]: ").strip().lower()
    
    if not response:
        return default
    return response in ['y', 'yes']


def main():
    print("=" * 60)
    print("Interactive Prototype Documentation Generator")
    print("=" * 60)
    print()
    
    # Load template
    template_path = Path(__file__).parent.parent / "templates" / "interaction-doc-template.md"
    
    if not template_path.exists():
        print(f"Error: Template not found at {template_path}")
        sys.exit(1)
    
    with open(template_path, 'r', encoding='utf-8') as f:
        template = f.read()
    
    # Collect information
    print("Let's create your interaction documentation.")
    print("You can leave fields blank if not applicable.\n")
    
    # Basic info
    interaction_name = get_input("Interaction name", "Button Press Animation")
    author = get_input("Author name", "Design Team")
    status = get_input("Status (Draft/In Review/Approved)", "Draft")
    
    # Overview
    print("\n--- OVERVIEW ---")
    intention = get_multiline_input("What is the intention/purpose?")
    screen = get_input("Which screen/flow?", "Home Screen")
    user_action = get_input("What is the user trying to accomplish?")
    
    # Trigger
    print("\n--- TRIGGER ---")
    trigger_types = ["Tap", "Long Press", "Swipe", "Hover", "Scroll", "Auto", "Other"]
    print("Trigger types: " + ", ".join(trigger_types))
    trigger_type = get_input("Trigger type", "Tap")
    trigger_element = get_input("Which element triggers it?", "Primary button")
    trigger_condition = get_input("Any conditions?", "None")
    
    # Animation
    print("\n--- ANIMATION ---")
    duration = get_input("Animation duration (ms)", "300ms")
    easing = get_input("Easing curve", "Ease In-Out")
    properties = get_input("Properties animated (comma-separated)", "opacity, scale")
    
    # Feedback
    print("\n--- FEEDBACK ---")
    visual_feedback = get_input("Visual feedback description", "Button scales down slightly")
    
    has_haptic = get_yes_no("Include haptic feedback?", False)
    haptic_type = ""
    if has_haptic:
        print("Haptic types: Light, Medium, Heavy, Rigid, Soft, Selection")
        haptic_type = get_input("Haptic type", "Light")
    
    has_api = get_yes_no("Does this interaction call an API?", False)
    api_endpoint = ""
    api_method = ""
    if has_api:
        api_endpoint = get_input("API endpoint", "/api/action")
        api_method = get_input("HTTP method", "POST")
    
    # Create output
    today = datetime.now().strftime("%Y-%m-%d")
    
    # Simple replacement (for demonstration - in production, use a proper templating engine)
    output = template.replace("[Interaction Name]", interaction_name)
    output = output.replace("[Date]", today)
    output = output.replace("[Name]", author)
    output = output.replace("Draft | In Review | Approved", status)
    output = output.replace("[Describe the goal and why this interaction exists. What problem does it solve? What user need does it address?]", intention or "[To be filled]")
    output = output.replace("[Which screen(s) or user flow]", screen)
    output = output.replace("[What the user is trying to accomplish]", user_action or "[To be filled]")
    output = output.replace("Tap / Long Press / Swipe / Hover / Scroll / Auto / Other", trigger_type)
    output = output.replace("[Which component triggers the interaction]", trigger_element)
    output = output.replace("[Any conditions that must be met]", trigger_condition)
    output = output.replace("[e.g., 300ms]", duration)
    output = output.replace("[e.g., Ease In-Out, Spring, Custom Bezier]", easing)
    output = output.replace("[e.g., opacity, scale, position, color]", properties)
    output = output.replace("[What changes visually to confirm the interaction]", visual_feedback)
    
    if has_haptic:
        output = output.replace("Light / Medium / Heavy / Rigid / Soft / Selection / None", haptic_type)
    
    if has_api:
        output = output.replace("[e.g., POST /api/users/save]", f"{api_method} {api_endpoint}")
        output = output.replace("GET / POST / PUT / DELETE", api_method)
    
    # Save output
    output_dir = Path.cwd() / "interaction-docs"
    output_dir.mkdir(exist_ok=True)
    
    filename = interaction_name.lower().replace(" ", "-") + ".md"
    output_path = output_dir / filename
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(output)
    
    print("\n" + "=" * 60)
    print(f"✓ Documentation generated: {output_path}")
    print("=" * 60)
    print("\nNext steps:")
    print("1. Review and fill in remaining sections")
    print("2. Add screenshots/visuals to states table")
    print("3. Complete timeline visualization")
    print("4. Add edge cases and considerations")
    print("5. Share with team for review")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\nCancelled by user.")
        sys.exit(0)
