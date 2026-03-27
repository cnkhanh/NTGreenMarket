# Diagram Generation Best Practices

Begin with a concise checklist (3-7 bullets) of what you will do; keep items conceptual, not implementation-level.

## For **Flowcharts** and **Activity Diagrams**

### General Layout & Structure
1. **Layout**: Design the flow from top-to-bottom or left-to-right. Avoid crossing connectors when possible to maintain clarity.
2. **Consistency**: Keep shape sizes, spacing, and styling consistent throughout the diagram.
3. **Vertical Spacing for Parallel Paths**: When a decision splits into parallel paths—especially across swimlanes—offset the paths vertically. For example, if Path A occupies Y=800–900, ensure Path B starts at Y>900 to avoid overlapping Path A during horizontal transitions.

### Nodes & Shapes
4. **Standard Shapes**: Use terminators for start/end, rectangles for processes, diamonds for decisions, parallelograms for data input/output, and circles for on-page references.
5. **Start/End Nodes**: Split combined "Start: [Action]" and "End" nodes into two: a generic "Start" (or "End") terminator node connected to the first (or last) action node.
6. **Node Sizing**: Standardize process node width (e.g., 180px) for consistency. Use smaller dimensions for Start/End nodes (e.g., 40×40px). For longer labels, increase node height, not width, to maintain alignment.
7. **Decision Node Sizing**: Make Decision nodes smaller (e.g., 80×80px) to improve diagram density and visual balance.
8. **Color Coding**:
- Assign a unique color to all process nodes associated with the same Actor.
- Apply a consistent color to all Decision nodes.
- Use `light red` (e.g., `#f8cecc`, stroke `#b85450`) for End nodes.
- Use `light green` (e.g., `#d5e8d4`, stroke `#82b366`) for Start nodes.
9. **Labels**: Make labels concise and descriptive. For decision branches, use "Yes/No".

### Swimlanes
10. **Usage**: Use swimlanes to indicate parallel responsibilities. Add synchronization bars where processes converge.
11. **Orientation**: **ALWAYS use vertical swimlanes (columns) with headers at the top by setting `horizontal=1`**. This creates side-by-side swimlanes with top headers where processes flow downward. Never use `horizontal=0` (which puts headers on the left side). Ensure all nodes are contained within their swimlane boundaries.
12. **Swimlane Sizing**: Calculate swimlane heights by counting nodes and vertical spacing. Each node requires ~60–80px, plus ~40–60px between rows. For a 9-node vertical flow: `(9 × 60) + (8 × 60) + 200px buffer = 1,220px minimum`. Round up to the nearest 100px and add a 200px buffer to prevent cutoff.
13. **Start Node Positioning**: Place the Start node below the swimlane header, at least y=75 (if header is at y=40 with height 20), to avoid overlap with the swimlane title bar. Use a consistent offset for all diagrams.
14. **XML Structure for Swimlanes**: Set `parent="1"` for all swimlane cells (root parent), not child parent IDs. Swimlanes should be decorative containers, not literal parent nodes. All process/decision/end nodes must also use `parent="1"` for proper draw.io XML parsing. **Do not nest nodes as children of swimlane cells—this causes XML parsing errors.**
15. **Cross-Swimlane Flow**: When moving a process between swimlanes, align source and target nodes horizontally to create straight connector lines.

### Edges & Connectivity
16. **Connectivity**: Ensure all edges have valid `source` and `target` attributes that match the IDs of connected shapes, so connections remain intact when elements move.
17. **Edge Styling**: By default, use `Orthogonal` lines with rounded corners and line jumps, unless otherwise specified.
18. **Decision "No" Path (Straight Down)**: For "No" branches staying in the same swimlane, exit the Decision node from the bottom (`exitX=0.5, exitY=1`) and run straight down to the target's top (`entryX=0.5, entryY=0`). Keep waypoints vertically aligned if needed.
19. **Decision "Yes" Path (Side Exit)**: For "Yes" branches, exit from the right side of the Decision node (`exitX=1, exitY=0.5`), route horizontally at mid-height, then vertically down. Enter the target from the right side (`entryX=1, entryY=0.5`). This keeps the "No" path distinct and prevents edge overlap.
20. **Loop Entry (Left/Mid Side)**: For loopback or return paths, enter the target node from the left (`entryX=0.25` or `0, entryY=1`) or bottom-left. Route at a separate horizontal level (e.g., Y=250 if the main flow is at Y=200).
21. **Decision Edges**: Always have outgoing edges from a Decision node originate from different sides/connection points (bottom, right, left) to prevent line overlap.
22. **Decision Branching**: If a decision branch leads to another swimlane, direct the outgoing edge toward that swimlane (e.g., exit left for the left swimlane).
23. **Port Distribution**: For nodes with multiple edge connections, explicitly set distinct connection points using `exitX`/`exitY` and `entryX`/`entryY` (e.g., `exitX=0.25` and `exitX=0.75` for two bottom exits) to avoid overlaps.

## BPMN / bpmn.io Editor Support

This repository includes a VS Code extension wrapper around the bpmn.io editor in the `vs-code-bpmn-io` folder. Add these notes when working with BPMN diagrams or enhancing the editor integration.

- **Extension location**: See [vs-code-bpmn-io](vs-code-bpmn-io) for the extension source, build scripts, and the bundled `bpmn-editor.js` implementation.
- **When to add BPMN**: Use BPMN format when specified by the user.

Recommended checklist for BPMN-related tasks:
- **Diagram type**: Confirm whether BPMN (business process) or UML/flowchart is more suitable for the audience.
- **Integration**: If modifying the editor, keep changes inside `vs-code-bpmn-io/src` and `vs-code-bpmn-io/client` until feature growth requires modularization.
- **Validation**: Validate generated diagrams with the bpmn.io modeler or by loading them into the extension; small malformed XML will typically fail to render.
- **Accessibility**: Ensure shapes and connectors remain readable at common zoom levels; prefer text labels over color-only distinctions.

<!-- Developer quickstart for working with the bpmn.io editor integration:

- **Install dependencies**: From the repository root, run `npm install` to install shared dev dependencies. Then `cd vs-code-bpmn-io` and run `npm install` to install extension-specific dependencies.
- **Build the extension**: In `vs-code-bpmn-io`, run `npm run build` (or the equivalent script defined in `package.json`) to bundle the editor.
- **Run in VS Code**: Open the workspace in VS Code and use the Extension Development Host (F5) to launch the extension with the bundled editor for manual testing.
- **Quick test**: Open any example XML from the repository in the Extension Development Host to verify rendering and editing behavior.

Notes about contributions and testing:
- Keep the `client/bpmn-editor.js` and `client/bpmn-editor.css` files in sync with upstream bpmn.io versions where appropriate; document version bumps in `CHANGELOG.md`.
- Add new example diagrams to `vs-code-bpmn-io/test/fixtures` when covering new rendering scenarios. Use the existing test harness under `vs-code-bpmn-io/test` as a guide. -->