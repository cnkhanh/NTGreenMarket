# Mermaid Sequence Diagram Syntax Instructions

## Sequence Diagram

- **NEVER include title headings** (e.g., `# User Management Sequence Diagram`) in the output file
- **NEVER include markdown code fence characters** (```` ```mermaid ```` or ```` ``` ````) in the output file
- **Start directly with `sequenceDiagram`** - do not include any markdown formatting
- **Include `autonumber` by default** to automatically number the sequence steps
- **Use colored grouping boxes** with `rect rgb()` or `rect rgba()` and `end` to group logical sections of flows
- **Add a note label** at the beginning of each grouped section to identify the flow (e.g., `note right of FrontEnd: Create User Flow`)
- **Recommended colors for grouping boxes**:
  - Light blue: `rect rgb(200, 220, 240)` or `rect rgba(173, 216, 230, 0.3)`
  - Light green: `rect rgb(220, 240, 220)` or `rect rgba(144, 238, 144, 0.3)`
  - Light yellow: `rect rgb(255, 250, 205)` or `rect rgba(255, 255, 224, 0.5)`
  - Light coral: `rect rgb(240, 220, 220)` or `rect rgba(255, 228, 225, 0.5)`
- The output file should contain ONLY the raw Mermaid diagram code, nothing else

### Basic Structure

```
sequenceDiagram
    autonumber
    participant A
    participant B
    
    A->>B: Message
    B-->>A: Response
```

### Example Format

When creating a Mermaid sequence diagram, the output should look like:

```
sequenceDiagram
    autonumber
    participant FrontEnd
    participant API
    
    rect rgb(200, 220, 240)
    note right of FrontEnd: Create User Flow
    FrontEnd->>API: Create User
    API-->>FrontEnd: return
    end
    
    rect rgb(220, 240, 220)
    note right of FrontEnd: Verify User Flow
    FrontEnd->>API: Verify User
    API-->>FrontEnd: return
    end
```

### Additional Notes

- Use `participant` to define participants
- Use `->>` for solid arrows (requests)
- Use `-->>` for dashed arrows (responses)
- Use `Note over Participant: Text` for notes
- Use `%%` for comments
- Line breaks in text can be added with `<br/>`
