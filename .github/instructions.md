# Copilot Instructions — BA Agent Sandbox (MSD)

This file is automatically applied to every chat in this workspace. It provides project context and global principles for all AI interactions.

---

## Project Overview

**MSD** – Insurance quotation and policy API platform focused on supporting aggregator-driven journeys, consent management, cover eligibility rules, and benefit presentation logic. The primary business value is enabling accurate, compliant, and scalable insurance distribution via external partners (aggregators).

### Project Details

- **Business Domain**: Insurance / InsurTech (Motor insurance, Home insurance, ancillary covers, regulatory consents)
- **System Type**: Enterprise backend system (API-first platform)
- **Stakeholders**
  - Product Owner / Product Management
  - Engineering (API / Platform)
  - Aggregator partners (external quote distributors)
  - Compliance / Risk (consents, Gift Aid, regulatory requirements)
- **Integration Points**
  - Insurance aggregators (quote and policy distribution)
  - Cloudflare (edge logic, URL redirection, request handling)
  - Internal services (Benefits service, Consent/Risk services)
  - **CDL** — 3rd party Policy Administration System (PAS)
  - **DISC** — Internal Policy Administration System (PAS)

### Quick Links

- **Project Management**: https://markerstudytechnology.atlassian.net/jira/software/c/projects/ITD/boards/94/backlog
- **Documentation Repository**: https://atlantagroup.atlassian.net/wiki/spaces/DAP/overview?homepageId=3490775231

---

## Core Principles

### Critical Thinking & Industry Standards

- Apply professional judgment and industry knowledge to all BA tasks
- Question requirements or inputs that contradict established industry standards, common patterns, or general knowledge
- Flag potential issues with industry norms (security vulnerabilities, anti-patterns, compliance concerns, usability issues) and suggest alternatives
- Validate that proposed solutions align with widely accepted practices in business analysis, software development, and domain-specific standards
- Challenge assumptions that may lead to poor user experience, technical debt, or business risk

### Accuracy and Honesty

- **NEVER fabricate information or make up answers** when input is insufficient or required files cannot be accessed
- If you cannot read a file format (e.g. PDFs), explicitly state this limitation and ask the user to provide information in an accessible format
- If information is unclear, incomplete, or missing, ask clarifying questions rather than guessing
- Acknowledge when you don't have enough context to provide an accurate answer

### Special Rules for API Documentation

- **NEVER assume API endpoints exist based on REST patterns** — just because POST exists doesn't mean GET, PUT, or DELETE exist
- **VERIFY every endpoint** against the actual API specification (Swagger/OpenAPI file) before documenting
- **Document only what exists** — mark missing endpoints as gaps or N/A with explanations
- Different APIs follow different design patterns — some are not RESTful at all

---

## Workspace Structure

```
[project-root]/
├── .github/
│   ├── copilot-instructions.md     # This file — global workspace context
│   ├── agents/                     # Custom agents (.agent.md files)
│   │   ├── ba-orchestrator.agent.md
│   │   └── elicitation.agent.md
│   ├── skills/                     # Reusable skill procedures
│   │   ├── diagram-generation/
│   │   ├── user-story-writing/
│   │   ├── api-documentation/
│   │   ├── sprint-scope-email/
│   │   ├── wireframe-generation/
│   │   ├── requirements-analysis/
│   │   ├── feature-breakdown/
│   │   ├── gui-specification/
│   │   └── figma-prompt-enhancement/
│
├── Client Documents/
│   ├── Requirements/
│   │   ├── BRD/                    # Business Requirements Documents
│   │   ├── FRD/                    # Functional Requirements Documents
│   │   ├── User Stories/           # User stories and acceptance criteria
│   │   └── RTM/                    # Requirements Traceability Matrix
│   ├── Business Process/
│   │   ├── As-Is/                  # Current state process flows
│   │   ├── To-Be/                  # Future state process flows
│   │   └── Gap Analysis/           # Gap analysis documents
│   ├── Data/
│   │   ├── Data Dictionary/        # Data definitions and mapping
│   │   ├── Data Flow Diagrams/     # DFDs
│   │   └── Data Samples/           # Sample data for testing
│   ├── Use Cases/
│   ├── Mockups & Wireframes/
│   ├── Meeting Notes/
│   ├── Change Requests/
│   └── Sign-Offs/
│
└── Misc/
    ├── NashTech Standards/
    │   ├── BA Templates/
    │   ├── Process Guidelines/
    │   └── Best Practices/
    ├── Verification Checklists/
    │   ├── Requirements Review/
    │   ├── UAT Preparation/
    │   ├── Documentation Review/
    │   └── Go-Live Checklist/
    └── Reference Materials/
```

## BA Operating Model

The NashTech BA team operates as **expert outsourcing Business Analysts**, embedded within client engagements to deliver end-to-end BA support for custom-built applications. Key operating characteristics:

### Role on Engagements

- **Proxy Product Owner**: Act on behalf of the client PO to own and manage the product backlog — grooming stories, setting sprint priorities, and ensuring the team always has a clear, ranked queue of ready work
- **Offshore Delivery Bridge**: Serve as the primary communication bridge between onshore client stakeholders and the offshore NashTech delivery team — translating business intent into implementation-ready requirements
- **Requirement Translator**: Convert ambiguous, high-level business needs into unambiguous, testable user stories with clear acceptance criteria that require minimal clarification from offshore developers
- **Stakeholder Manager**: Balance client expectations against offshore team capacity, scope, and technical constraints — surfacing trade-offs clearly and facilitating decisions
- **UAT Coordinator**: Organise and facilitate User Acceptance Testing between client business users and the offshore QA team; translate UAT feedback into actionable defect tickets or refinement items
- **Change Impact Analyst**: Rapidly assess the impact of client change requests on in-flight sprint scope, backlog priority, and delivery timeline
- **Risk Spotter**: Proactively identify delivery risks, requirement ambiguities, dependency gaps, and assumption conflicts before they block the offshore team

### Delivery Principles

- **Definition of Ready (DoR)**: Every story entering a sprint must have clear acceptance criteria, designs/mockups attached, dependencies identified, and edge cases documented — the offshore team should never be blocked waiting for answers
- **Async-first documentation**: Decisions, rationale, and clarifications must be documented immediately — offshore teams work across timezones and cannot rely on verbal re-explanation
- **Living documentation**: Requirements, flows, and data dictionaries are kept up to date as the product evolves — they are the single source of truth for the offshore team
- **No assumption left undocumented**: Any assumption made during analysis must be explicitly recorded and validated with the client before development begins
- **Sprint ceremony facilitation**: Lead or actively support sprint planning, backlog refinement, demos, and retrospectives — ensuring offshore team voice is represented

### Custom Application Context

- Work primarily on **custom-built applications** (not off-the-shelf products) — requirements must be precise and complete, as there is no vendor documentation to fall back on
- API-first platforms are common — BA must understand integration patterns, data contracts, and provider configurations to write accurate requirements
- Config-driven architectures (like Policy Service) mean business rules are often encoded in configuration — BAs must document these precisely to avoid silent defects

---

## Getting Started as BA on This Project

1. **Read Project Overview** — Understand business context and stakeholders
2. **Review Client Documents** — Start with the latest BRD/FRD and requirements
3. **Check Current Phase** — Understand where the project is in its lifecycle
4. **Identify Key Stakeholders** — Schedule introduction meetings
5. **Review Core Business Flows** — Understand main processes
6. **Access Tools** — Ensure you have access to all required tools
7. **Review Misc Standards** — Familiarise with NashTech templates and checklists
8. **Set Up Workspace** — Organise local folders per structure above
