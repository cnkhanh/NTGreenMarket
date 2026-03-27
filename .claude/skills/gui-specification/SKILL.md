---
name: gui-specification
description: Converts screen images into structured UI specification tables covering components, behaviors, and interactions. Use for UI specification documentation and design handoff.
---

# GUI Specification Generator Skill

## Skill Type
Template Application (Screen-to-Table Conversion)

## When to Use
- Documenting mobile app UI specifications
- Converting screen images into structured UI specs
- Creating detailed field-level documentation
- Supporting UI development handoff

## Prerequisites
- Screen images of mobile app
- Understanding of insurance/onboarding flow context
- Knowledge of intended user interactions

---

## Purpose

Transform screen images into structured UI specifications for a native mobile insurance onboarding app while following BA core principles.

---

## Input Format

You will receive one or more **screen images** of the mobile app.
Each image represents a distinct UI screen or step in the user flow.

---

## Output Requirements

For each screen, generate a **structured UI Specification** that includes the following sections:

---

### 1. Screen Title

Provide a **clear, concise title** for the screen.

Example:

> "Personal Information – Step 1 of 3"
> "Upload Identity Document"
> "Review and Confirm Policy Details"

---

### 2. Detailed UI Specification Table

Create a **UI Specification Table** describing every component on the screen.
Follow the column structure and content rules shown below (adapted from *Example UI Spec.docx*):

See [sample table and example output](references/EXAMPLES.md).

---

### 3. Behavior Notes

Add a short section describing **screen behavior and interaction logic** in plain, professional language:

- Tone of the UI: professional, trustworthy, and user-friendly
- Navigation: screen transitions and button behaviors (e.g., "Next" navigates to verification step)
- Dynamic content: what changes based on user actions (e.g., enabling fields, showing validation messages)
- Error handling: how errors are displayed (e.g., red text below field)
- Accessibility considerations: font size, color contrast, input assistive hints

Example:

> When the user selects "Passport" as ID Type, the "Passport Expiry Date" field becomes visible.
> The "Continue" button remains disabled until all mandatory fields are filled and Terms checkbox is selected.
> Validation messages appear below each field when left empty.

---

## Writing and Formatting Guidelines

- Use **plain, professional English** — suitable for both **business analysts** and **UI designers**.
- Do **not** use any icon bullets or emojis.
- Maintain a **consistent structure and order** across all screens.
- Keep table column alignment neat and uniform.
- Focus on **clarity, accuracy, and functional relevance** — avoid creative interpretation unless asked.

---

## Example Output

See [references/EXAMPLES.md](references/EXAMPLES.md).

---

## Final Deliverable Format

Each response must include:

1. A **Screen Title** (H3 heading)
2. A **UI Specification Table** (as Markdown)
3. A **Behavior Notes** section in plain text

All outputs should be ready for use in Figma, Confluence, or internal design documentation.
