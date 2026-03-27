```markdown
# BPMN / bpmn.io Guidance

- Use BPMN for business-process models and orchestrations (approval flows, order processes, long-running processes).
- Store editable BPMN files as `.bpmn` or `.xml` and validate them with the bpmn.io modeler before committing.
- Prefer the `vs-code-bpmn-io` extension in this repository for interactive editing inside VS Code; it bundles the bpmn.io editor.
- Keep BPMN models focused: use Pools/Lanes for participants, Tasks for activities, Gateways for decisions, and sequence flows for ordering.
- Add a short header inside files (author, date, intent) to make diagram purpose and ownership explicit.

Quickstart

1. From the repository root run:

```bash
npm install
```

2. Build the VS Code extension and editor bundle:

```bash
cd vs-code-bpmn-io
npm install
npm run build
```

3. Open the workspace in VS Code and run the Extension Development Host (F5), then open example diagrams at the repository root to validate rendering.

```
