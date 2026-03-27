---
name: writing-user-stories
description: Creates and refines user stories with acceptance criteria using the NT standard template. Use for user story drafting and refinement.
---

# User Story Writing Skill

## Skill Type
Template Application

## When to Use
- Creating new user stories from requirements
- Refining existing user stories
- Ensuring stories follow NT standard template
- Adding acceptance criteria and mockup descriptions

## Prerequisites
- Business requirement or feature description
- User role (or inferred from context)
- Expected behavior and system response

---

## Purpose

Capture, structure, and refine requirements into clear, testable user stories using the NT standard template while following the BA core principles.

## Objective

The structure and format must follow the **User Story Sample** template (embedded below).

## Workflow

### 1. Requirement Understanding
When a requirement is received, first **analyze and identify**:
- **User/Actor**  Who performs the action.
- **Behavior**  What the user does.
- **System Response**  How the system reacts.

### 2. User Story Development
- Use the format from **User Story Sample** to draft one or more user stories.
- Each section in the document must be fully completed.
- If information is missing, apply **best practices** to fill the gaps.

### 3. Best Practice Fill-ins
- **Workflow Diagram**: If not available, describe the flow step-by-step in text.
- **Mockup Screen**: Provide a text-based description, listing all fields and properties:
  - Default values
  - Maximum length
  - Related rules
  - Validation requirements

### 4. Handling Input Cases
- If requirement comes without a user story  **ask for it first**.
- If a user story is too large (cannot be delivered in 1 week)  **split into smaller stories** and prepare details for each.

### 5. Naming & Client Handling
- Always **generalize client names**.
  - If a user mentions "Samsung" or "Salesforce," rewrite it as **"the client"** or **"the company."**
- Never retain or reference actual client names.

### 6. Review & Iteration
- After providing user story details, **ask the user whether changes are needed**.
- If a user story does not specify a **user role**, ask for clarification and propose relevant roles based on context.

---

## User Story Sample Template

See [references/USER-STORY-TEMPLATE.md](references/USER-STORY-TEMPLATE.md).

---

## Best Practices
1. Always align with **NT's standard (User Story Sample)**.
2. Fill missing info with **best practice assumptions**.
3. Keep stories **small, testable, and deliverable**.
4. Ask clarifying questions before finalizing.
5. Always request **user feedback** for refinement.
6. When writing Acceptance Criteria in **Gherkin format**, always prefix with the AC ID in bold (e.g., **AC01**, **AC02**) followed by a descriptive title (do not include the word "Scenario"). If multiple test scenarios exist for the same AC, use sub-numbering (e.g., **AC02.1**, **AC02.2**, **AC02.3**), and format the Gherkin keywords in bold and indented. If the **Given**, **When**, or **Then** items are short, keep the **And** on the same line for easier readability; otherwise indent the **And** for clarity.
7. To improve readability and conciseness, group test scenarios that share the same **Given** or **When** conditions into a single AC with multiple **Then** statements, rather than creating separate sub-numbered scenarios.
8. Always arrange ACs that affect similar or the same functionalities next to each other to improve readability and logical flow.
