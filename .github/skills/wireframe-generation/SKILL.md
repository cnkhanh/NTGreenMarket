---
name: generating-wireframes
description: Produces draw.io wireframes and UI layouts across lo-fi, mid-fi, and hi-fi fidelity levels. Use for UI wireframing, screen visualization, and design documentation.
---

# Wireframe Generation Skill

## Skill Type
Visual Design + Template Application (draw.io)

## When to Use
- Creating UI wireframes for web or mobile
- Visualizing screen layouts and flows
- Documenting UI component placement
- Supporting requirements elicitation with visual prototypes

## Prerequisites
- UI requirements or feature description
- Target platform (web/mobile)
- Desired fidelity level (Lo-Fi, Mid-Fi, Hi-Fi)
- User flow or screen sequence

---

## Purpose

Create clear, accurate wireframes that visualize layouts, interactions, and information architecture for web and mobile applications while following BA core principles.

---

## Contents

- [Approach & Workflow](#approach--workflow)
- [When to Generate Wireframes](#when-to-generate-wireframes)
- [CRITICAL: Requirements Clarification Before Generation](#critical-requirements-clarification-before-generation)
- [Wireframing Principles](#wireframing-principles)
- [draw.io Wireframe Implementation](#drawio-wireframe-implementation)
- [Wireframe Generation Workflow](#wireframe-generation-workflow)
- [Best Practices Summary](#best-practices-summary)

---

## Approach & Workflow
Begin with a concise checklist (3-7 bullets) of key subtasks required to fulfill the user request; keep checklist items conceptual and not implementation-level.

After each wireframe or requirements proposal, validate that the generated output aligns with the confirmed requirements and state either "Ready for next step" or specify if a revision is needed.

---

## When to Generate Wireframes
- Document screen layouts and UI component placement
- Visualize user flows across multiple screens
- Define information hierarchy and content organization
- Illustrate responsive design patterns and breakpoints
- Support requirements elicitation and stakeholder alignment
- Create clickable prototypes for user testing
- Establish UI patterns and design consistency

---

## CRITICAL: Requirements Clarification Before Generation
**For WORKFLOW and HIGH-LEVEL LAYOUT, propose reasonable assumptions based on industry best practices and ask for confirmation in a single message—do NOT ask open-ended questions.**

### 1. Workflow & User Flow (SUGGEST & CONFIRM)
- Do not ask open-ended questions. Instead, infer a logical flow from the user's request and propose it.
- **Navigation flow:** Suggest a likely post-action destination (e.g., "I'll assume submitting this form takes the user to a confirmation screen— is that correct?")
- **User journey:** Propose a step sequence based on the described feature (e.g., "I'll assume the flow is: Login → Profile Setup → Dashboard. Does that match your intent?")
- **Entry points:** Assume the most common entry point for the feature type (e.g., from the main navigation menu) and state the assumption.
- **Screen sequence:** Propose a sensible number of screens and their order, then confirm.
- **Alternative paths:** Apply a sensible default (e.g., Cancel returns to previous screen) and flag it as an assumption.

**Example confirmation message format:**
> Here's what I'm assuming for the workflow—please confirm or correct:
> - Flow: Step A → Step B → Step C
> - Entry point: Main navigation menu
> - Cancel action: Returns to previous screen
> Does this look right, or would you like to adjust anything before I generate the wireframe?

### 2. High-Level Layout & Screen Purpose (SUGGEST & CONFIRM)
- Do not ask open-ended questions. Propose a layout based on the described feature and standard patterns.
- **Screen sections:** Propose a standard layout for the feature type (e.g., "I'll use Header + Main content area + Footer—let me know if you need a sidebar or different structure.")
- **Content hierarchy:** Assume the primary CTA and key data fields as most prominent and state this assumption.
- **Viewport targets:** Default to **both mobile and desktop** unless the request suggests otherwise; state and confirm this assumption.

**Example confirmation message format:**
> Here's the layout I'm planning—let me know if you'd like changes:
> - Viewport: Both mobile (375px) and desktop (1280px)
> - Layout: Header with logo + nav, main content with form, sticky footer with actions
> - Primary focus: [Key action/content]
> Happy to proceed, or any adjustments?

---

## Wireframing Principles

### Best Practices by Fidelity Level

**Lo-Fi Wireframe Best Practices:**
*When to use:*
- Early conceptual stakeholder discussions
- Rapid ideation and brainstorming
- Testing layout variations quickly
- Requirements still evolving
- Limited budget or time for detailed design

*Design approach:*
- Use grayscale only (black, white, gray shades)
- Represent images with simple boxes and "X" or image icons
- Use "Lorem ipsum" or generic placeholder text
- Show component hierarchy by size and position
- Avoid specific fonts, colors, or detailed styling
- Use simple annotations for interactions
- Keep element count minimal; focus on key components

*Include:*
- Basic layout structure and sections
- Navigation patterns (menus/links)
- Content hierarchy
- Primary user actions (main buttons/CTAs)
- Form field placement (not detailed validation)

*Avoid:*
- Brand colors or actual color schemes
- Detailed typography or font choices
- Pixel-perfect spacing
- Actual copy or marketing text
- Detailed icons or imagery
- Interactive states (hover, focus, disabled)

**Mid-Fi Wireframe Best Practices:**
*When to use:*
- Stakeholder reviews and alignment
- Developer estimation and feasibility
- User flow validation with realistic content
- Moving from concept to planning
- Most common for BA deliverables and handoff

*Design approach:*
- Limited color palette (grayscale + 1-2 accent colors for interactivity)
- Use realistic content with proper text structure
- Show component types clearly
- Use consistent 8px grid alignment
- Add typography hierarchy (heading, body text)
- Annotate interactions (click targets, navigation flows)
- Show form validation and error placement
- Represent realistic data structures

*Include:*
- Realistic placeholder text (e.g., "Submit Application")
- Field labels, hints, placeholder text
- Navigation states (active page indicator)
- Button hierarchy
- Error message placement and validation rules
- Required field indicators
- Content grouping and labels
- Basic iconography
- Loading/empty state indicators

*Avoid:*
- Final brand colors or exact codes
- Pixel-perfect spacing (approximate to 8px steps)
- Actual production copy unless provided
- Complex animations
- Multiple responsive breakpoints (focus on primary viewport)
- Decorative elements without function

*Best use cases:*
- BA to Developer handoffs
- Stakeholder approval for development
- Requirements documentation
- User story visual supplements
- API/data structure alignment

### Default Fidelity Level
**If fidelity level is not specified, always generate Mid-Fi wireframes.**

Mid-Fi is the default as it:
- Balances detail with flexibility
- Suits most BA deliverables and stakeholder reviews
- Gives enough detail for developer planning
- Is flexible to adapt to requirement changes
- Prevents over-investment in visual fidelity
- Includes realistic structure without final copy

**User can override by specifying:**
- "Create a lo-fi wireframe..." → Generate Lo-Fi
- "Create a high-fidelity wireframe..." or "detailed/polished wireframe..." → Generate Hi-Fi
- "Create a quick/rough wireframe..." → Generate Lo-Fi
- If fidelity not mentioned → Default to Mid-Fi

### UI Component Standards

**Common Components to Include:**
- **Navigation**: Headers, menus, breadcrumbs, tabs, sidebars
- **Content Areas**: Main content, sidebars, cards, panels
- **Forms**: Input fields, dropdowns, checkboxes, radio buttons, date pickers
- **Actions**: Buttons (primary, secondary, tertiary), links, icons
- **Feedback**: Error messages, success notifications, loading indicators
- **Data Display**: Tables, lists, grids, charts, cards
- **Media**: Image placeholders, video players, icons

**Form Field Requirements:**
- **Input Placeholders (ALWAYS REQUIRED):**
  - All input fields must have placeholder text indicating expected input:
    - Text input: `value="Enter your full name"` with `fontColor=#999999`
    - Email input: `value="you@example.com"` with `fontColor=#999999`
    - Phone input: `value="+1 (555) 123-4567"` with `fontColor=#999999`
    - Date input: `value="MM/DD/YYYY"` with `fontColor=#999999`
    - Textarea: `value="Street address, city, state, zip"` with `fontColor=#999999`
- **Dropdown Indicators (ALWAYS REQUIRED):**
  - Dropdown/select fields must have a down arrow (`▼`):
    - Add separate `mxCell` with `value="▼"` at right edge of dropdown
    - Arrow style: `fontSize=16`, `fontColor=#333333`, no border/background, position 8–16px from right edge

### Layout Best Practices
- **Grid System:** Use consistent 8px or 12px grid spacing
- **Alignment:** Align elements to grid for consistency
- **Whitespace:** Ensure adequate spacing
- **Hierarchy:** Use size and position for importance
- **Screen-level Grouping (REQUIRED):** Wrap each viewport's frame and all its child elements in a draw.io group cell (`style="group;"`). Set `parent="screen-group-id"` on every child. Child coordinates must be **relative to the group's top-left origin**. This allows the entire screen to be moved as one unit.
- **Component-level Grouping (REQUIRED):** Within each screen group, further group the elements that make up each distinct UI component (e.g. nav bar, category strip, each product card, each form section). Create a sub-group cell (`style="group;"`) sized to the component's bounding box, set it as a child of the screen group, and nest all the component's elements inside it with coordinates relative to the component group's origin. Single-element components (e.g. a standalone hero banner) do not need a sub-group. **Naming convention:** `{screen-prefix}-{component-name}-group` (e.g. `m-p1-group`, `d-nav-group`).
- **Element Consistency (REQUIRED):** Within the same component type (e.g. product card, form field, category chip), all instances must use identical dimensions and font sizes for equivalent elements — image placeholders, buttons, labels, and input fields must share the same `width`, `height`, and `fontSize`. If one card has a rating row and another does not, anchor shared elements (price, button) at the same relative y-offset so cards in a row remain visually aligned.
- **Responsive:** Consider mobile, tablet, and desktop layouts

---

## draw.io Wireframe Implementation

### Tool Selection: draw.io
- Free and web-based
- Built-in UI libraries: iOS, Android, Material Design, Bootstrap
- Export to PNG, SVG, PDF, XML
- Collaborative editing and version control
- No design skills required

### Accessing Wireframe Libraries
1. In draw.io, go to: File → Open Library from → Mockups
2. Choose library: iOS, Android, Bootstrap, or General
3. For this skill, use **General** or **Bootstrap** for web wireframes

### Shape Library and GraphXML Reference

See [references/REFERENCE.md](references/REFERENCE.md) for shape examples, GraphXML structure, viewport standards, and styling rules.

---

## Wireframe Generation Workflow

### Step 1: Requirements & Architecture
- Use suggest-and-confirm method for user flows, screens, navigation hierarchy, grouping, and business rules. Ensure checklist is referenced before proceeding.

### Step 2: Layout Creation
For each screen:
1. Begin with device frame or browser window (always `rounded=0`)
2. Add navigation/header
3. Define content containers
4. Place UI elements with `sketch=1`
5. Add labels and placeholders
6. Connect screens with flow arrows

### Step 3: Annotation & Documentation
- Add screen titles, component labels, interaction notes
- Specify validation and responsive behaviors

### Step 4: Review & Iteration
- Validate against requirements and checklist, check for consistency, update as necessary, and state if ready for next step or requires revision.

---

## Best Practices Summary
1. **Start simple:** Use lo-fi to validate structure
2. **Use grids:** Align to 8px/12px grid
3. **Label everything:** Components, interactions, states
4. **Show hierarchy:** Via size, position, spacing
5. **Think responsive:** Plan for layout adaptation
6. **Iterate quickly:** Revise per feedback
7. **Focus on content:** Prioritize user needs
8. **Document interactions:** Use annotations/arrows
9. **Maintain consistency:** Repeat patterns where possible
10. **Validate early:** Review before design

---
