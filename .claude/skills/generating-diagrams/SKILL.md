---
name: generating-diagrams
description: Generates business diagrams (flowcharts, BPMN, sequence, state, ERD, use cases) using draw.io GraphXML or Mermaid. Use for process flows, system interactions, and data modeling.
---

# Diagram Generation Skill

## Skill Type
Visual Documentation (Multi-format Diagram Generation)

## When to Use
- Documenting business workflows and process flows
- Creating decision logic flowcharts or user journeys
- Modeling concurrent processes with swimlanes
- Illustrating system interactions and API message flows
- Generating entity relationship diagrams
- Producing high-level use case scope diagrams
- Modeling system/entity state lifecycle

## Prerequisites
- Business requirement, process description, or system specification
- Identified actors, systems, or entities involved
- Target audience (business stakeholder vs. technical team)
- Desired level of detail

---

## Purpose

Convert requirements into structured, accurate diagrams that facilitate communication between business and technical stakeholders, serving as a BA deliverable or input to development.

---

## 1. Before Starting: Checklist

Before generating any diagram:

- [ ] Read and understand the business context and requirements
- [ ] Select the appropriate diagram type (see Section 2)
- [ ] Confirm the stakeholder audience (business vs. technical)
- [ ] Identify all actors, systems, roles, and decision points
- [ ] Determine the level of detail — split into multiple diagrams if scope is large
- [ ] Select the rendering tool (draw.io GraphXML, Mermaid, or bpmn.io)
- [ ] Propose assumptions and confirm before generating if requirements are ambiguous

---

## 2. Diagram Type Selection Guide

Choose the diagram type based on the nature of the requirement:

| Diagram Type | Use When | Default Tool |
|---|---|---|
| **Flowchart** | Sequential logic, decision trees, simple process steps | draw.io or Mermaid |
| **Activity Diagram (Swimlanes)** | Multiple actors/roles, parallel processes, cross-functional flows | draw.io |
| **BPMN** | Formal business process notation for business-audience communication | bpmn.io |
| **Sequence Diagram** | Time-ordered interactions between actors/systems (APIs, services) | Mermaid |
| **State Diagram** | System/entity lifecycle, status transitions, approval workflows | Mermaid |
| **Use Case Diagram** | High-level system scope, actor interactions, early requirements phase | Mermaid or draw.io |
| **ERD** | Data structure, entity attributes, entity relationships | Mermaid |

### Decision Rules

- **Multiple actors involved?** → Always use swimlanes (Activity Diagram)
- **Business stakeholder audience?** → Prefer BPMN or Flowchart with plain language
- **Technical stakeholder audience?** → Prefer Sequence or State Diagrams
- **Simple sequential process, single actor?** → Flowchart (Mermaid for quick, draw.io for polished)
- **API or service interactions?** → Sequence Diagram
- **Data modeling?** → ERD

---

## 3. Diagram Types

### A. Flowcharts & Activity Diagrams (with Swimlanes)

**Purpose:** Sequential logic, decision flows, end-to-end process steps, and multi-actor workflows.

**Tool:** draw.io GraphXML (preferred for swimlanes and polished output) or Mermaid (for quick/simple single-actor flows)

**Key rule:** Always use swimlanes when more than one actor or system participates.

**Approach:**
1. Identify all start/end points and process steps
2. Map all decision points with Yes/No branches
3. Assign each step to an actor or system
4. If multiple actors: design as a swimlane diagram
5. Apply layout and shape standards per [references/diagram-best-practices.md](references/diagram-best-practices.md)
6. Generate using [references/drawio-graphxml-syntax.md](references/drawio-graphxml-syntax.md) or [references/mermaid-syntax.md](references/mermaid-syntax.md)

---

### B. BPMN Diagrams

**Purpose:** Formal business process notation for business-audience communication and process documentation.

**Tool:** bpmn.io

**When to use:** When the client/audience is familiar with BPMN, or when formal process documentation is required.

**Approach:**
1. Map pools (organizations or systems) and lanes (roles within each pool)
2. Identify events (start, intermediate, end), tasks, and gateways (exclusive, parallel, inclusive)
3. Define sequence flows within pools and message flows between pools
4. Mark boundary events, sub-processes, and data objects where applicable
5. Apply guidance from [references/bpmn-io.md](references/bpmn-io.md)

---

### C. Sequence Diagrams

**Purpose:** Time-ordered interactions between actors and systems, particularly for API calls, service integrations, and authentication flows.

**Tool:** Mermaid

**When to use:** API interaction documentation, request/response flows, inter-service communication, sign-on flows.

**Approach:**
1. List all participants (users, services, databases, external systems)
2. Define the message sequence chronologically from top to bottom
3. Distinguish synchronous calls (solid arrow) from async (dashed)
4. Include return messages and response content where relevant
5. Use `alt` / `opt` / `loop` blocks for conditional or repeated flows
6. Apply guidance from [references/mermaid-syntax.md](references/mermaid-syntax.md)

---

### D. State Diagrams

**Purpose:** Model the lifecycle and state transitions of a system, entity, or business object.

**Tool:** Mermaid

**When to use:** Policy status, order state, user account lifecycle, document approval workflows.

**Approach:**
1. Identify all states the entity can be in
2. Define each transition: trigger event and guard condition
3. Mark the initial state and all terminal states
4. Group related states where complexity warrants a composite state
5. Apply guidance from [references/mermaid-syntax.md](references/mermaid-syntax.md)

---

### E. Use Case Diagrams

**Purpose:** High-level visualization of system scope, actors, and their interactions with system functionality.

**Tool:** Mermaid or draw.io

**When to use:** Scope definition, early-phase requirements, stakeholder alignment on system boundaries.

**Approach:**
1. Define the system boundary
2. Identify all primary actors (users) and secondary actors (external systems)
3. List use cases (functional goals each actor achieves)
4. Define `<<include>>` and `<<extend>>` relationships where applicable
5. Keep diagrams high-level; avoid implementation detail

---

### F. Entity Relationship Diagrams (ERD)

**Purpose:** Data structure, entity attributes, and relationships between entities.

**Tool:** Mermaid (`erDiagram`) or draw.io

**When to use:** Database design review, data dictionary visualization, integration data mapping.

**Approach:**
1. Identify all entities (business objects/nouns in the domain)
2. Define attributes per entity with data types
3. Map relationships with labels (e.g., "places", "contains", "belongs to")
4. Specify cardinality (one-to-one, one-to-many, many-to-many) and optionality
5. Apply guidance from [references/mermaid-syntax.md](references/mermaid-syntax.md)

---

## 4. Tool Selection Guide

| Tool | Best For | Output |
|---|---|---|
| **draw.io GraphXML** | Flowcharts, swimlane activity diagrams, complex polished layouts | XML (paste into draw.io) |
| **Mermaid** | Sequence, state, ERD, use cases, quick flowcharts, markdown-embeddable | Mermaid code block |
| **bpmn.io** | BPMN formal notation | BPMN 2.0 XML |

**Defaults:**
- Flowchart with swimlanes → **draw.io GraphXML**
- Sequence / State / ERD → **Mermaid**
- BPMN → **bpmn.io**
- Quick single-actor flow → **Mermaid**

---

## 5. Output Standards

- **Multiple actors present:** Always use swimlanes — never place multiple actors in a single-lane flow
- **Validate before presenting:** Check output against the original requirements; state "Ready" or note any revisions needed
- **Ambiguous input:** Propose assumptions and confirm with the user before generating
- **Broad scope:** Split into multiple focused diagrams (e.g., happy path first, then exceptions)
- **Audience adaptation:** Adjust label language — plain business language for stakeholders, technical precision for engineering

---

## 6. Writing Standards for Labels

- Use **Verb + Noun** format for process steps (e.g., "Validate Payment", "Submit Application")
- Use **"Yes" / "No"** consistently for decision branches
- Keep labels **concise** — avoid full sentences in nodes
- Use **consistent terminology** — the same concept must use the same label throughout
- Avoid technical jargon unless the audience is technical

---

## References

- [Diagram Best Practices](references/diagram-best-practices.md)
- [draw.io GraphXML Syntax](references/drawio-graphxml-syntax.md)
- [Mermaid Syntax](references/mermaid-syntax.md)
- [BPMN-io Syntax](references/bpmn-io.md)
