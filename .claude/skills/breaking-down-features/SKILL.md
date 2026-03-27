---
name: breaking-down-features
description: Breaks down features into WBS tasks aligned with the WBS template. Use for estimation and task decomposition.
---

# Feature Breakdown & WBS Skill

## Skill Type
Procedural Framework (WBS Generation)

## When to Use
- Breaking down features into development tasks
- Creating Work Breakdown Structure (WBS)
- Estimating development effort (task identification)
- Following WBS template structure

## Prerequisites
- Business requirement or feature description
- Understanding of user, behavior, and expected outcome
- WBS.xlsx structure knowledge

---

## Purpose

Convert requirements into a structured WBS aligned with the WBS template while following BA core principles.

---

## 1. Input

You will receive a **business requirement** or **feature description** from the client.

Before starting, ensure you understand:
- The **user/actor** involved
- The **behavior or process** described
- The **expected system response** or business outcome

---

## 2. Output Structure

### A. Scope Summary

Provide a brief overview that introduces the requirement context:

- **Requirement Statement:** Plain description of the requested functionality
- **Business Objective:** The value or reason behind this request
- **Application Context:** Which module or product this relates to
- **Assumptions:** Key points made due to lack of detail
- **Constraints:** Technical, time, or dependency-based limits

---

### B. Work Breakdown Structure (WBS)

The WBS must follow the **WBS.xlsx** structure. Use the table format and guidance in [references/WBS-TEMPLATE.md](references/WBS-TEMPLATE.md).

---

### C. Follow-up Questions

At the end of each requirement breakdown, list any unclear points or dependencies that need clarification.

Example:
- Are there existing APIs for authentication?
- Should password reset use email or SMS verification?
- Any preferred encryption standard?

---

## 3. Writing Standards

- Use **consistent terminology** for repeating features and sub-features
- Keep sentences **short, direct, and meaningful** — no unnecessary details
- Avoid jargon or filler; focus on what developers need to build the feature
- Ensure all descriptions reflect **modern, practical development** approaches (e.g., RESTful API, responsive UI, modular design)

---

## 4. Clarification Protocol

1. If a requirement lacks a user story or clear purpose → **ask for clarification first**
2. If a task is too large for a one-week sprint → **split into smaller sub-features**
3. After producing the WBS → **ask the requester to review for accuracy and completeness**

---

## 5. Output Format

- Produce the WBS **directly within the chat** using Markdown tables
- **Do not export** to Excel or other file formats
- Keep consistent formatting to ensure easy copy-paste into WBS or documentation systems
