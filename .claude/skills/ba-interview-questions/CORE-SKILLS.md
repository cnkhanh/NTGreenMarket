Each question is tagged: **(J)** = Junior, **(M)** = Mid, **(S)** = Senior, **(All)** = all levels.

---

## Brainstorming / Problem Solving

**(All)** *Describe a time you were given an unclear or conflicting requirement. How did you approach resolving it?*
- **Assessing:** Structured problem solving, analysis under ambiguity
- **Green:**
  - Uses a clear method (5 Whys, root cause analysis, assumption mapping)
  - involves stakeholders
  - documents resolution
- **Red:**
  - Waits for someone else to resolve it
  - escalates without attempting to structure the problem first

---

**(M/S)** *You've been asked to propose a solution to a business problem with no prior technical or domain context. Where do you start?*
- **Assessing:** Research and brainstorming methodology, self-sufficiency
- **Green:** Describes research steps (domain reading, stakeholder interviews, benchmarking), structures options, presents trade-offs
- **Red:**
  - Jumps to a solution immediately
  - no evidence of structured exploration

---

**(M/S)** *You are a Business Analyst at Netflix. Data shows that many users cancel their subscriptions after the free trial period ends. How would you analyse the issue and design a solution to improve retention?*
- **Assessing:** PO/product mindset, data-driven analysis, hypothesis generation, solution design from evidence
- **Green:**
  - Frames the problem before proposing a solution
  - identifies multiple hypotheses (price shock, lack of perceived value, poor onboarding, no reminder before trial end, competitor comparison)
  - proposes research methods (exit surveys, funnel analysis, cohort data, A/B tests)
  - shapes a solution around confirmed root cause (e.g. trial-end notification with value reminder, personalised content surfacing, flexible plan downgrade option)
  - distinguishes between symptoms and causes
- **Red:**
  - Jumps immediately to "send a reminder email"
  - no hypothesis testing
  - treats the data point as the root cause rather than a symptom
  - cannot describe what research would be needed before designing a solution

---

**(M/S)** *Apple Music research found that the app is more popular in the south of Vietnam than the north. Given access to all sources of data, how would you help the client understand and improve this situation?*
- **Assessing:** Data mindset, regional market analysis, structured investigation, evidence-based recommendation
- **Green:**
  - Does not immediately propose a fix
  - structures investigation across supply-side factors (content localisation, music catalogue, artist popularity by region), demand-side factors (demographics, device penetration, income, streaming habits, competitor use by region), and platform factors (UI language, payment method availability)
  - identifies which data sources to consult (in-app analytics, regional surveys, competitor market share data)
  - surfaces hypotheses before recommending interventions
  - considers that improving the north may not require the same solution as reinforcing the south
- **Red:**
  - Immediately proposes "add northern artists" without any investigation
  - cannot name relevant data sources
  - no structured framework for regional gap analysis

---

**(M/S)** *You are leading the BA effort for a new online marketplace for small businesses. The marketing team wants advanced personalisation, the finance team is concerned about fraud prevention, and the development team warns that some features may affect performance. How would you gather and prioritise requirements to meet the launch deadline?*
- **Assessing:** Competing stakeholder management, MVP thinking, prioritisation under constraints, NFR awareness
- **Green:**
  - Runs structured elicitation sessions per stakeholder group to capture both functional and non-functional requirements
  - uses a prioritisation framework (MoSCoW, WSJF, value vs effort) to build a ranked backlog
  - defines MVP scope that satisfies the minimum viable version of each stakeholder's concern (e.g. basic fraud rules at MVP, advanced personalisation in phase 2)
  - surfaces the performance risk as a formal constraint and involves the dev team early in feasibility
  - documents trade-offs and presents them to the PO for decision
- **Red:**
  - Tries to include everything in scope
  - no prioritisation method
  - ignores performance and fraud concerns as "dev problems"
  - no concept of phased delivery

---

**(M/S)** *The same marketplace product — the marketing team wants detailed statistics on user behaviour to improve the onboarding journey in the future. How would you elicit this high-level requirement? What metrics would you track to measure whether the onboarding flow is user-friendly yet secure?*
- **Assessing:** NFR and analytics requirement elicitation, data-driven mindset, measurable success criteria, security-usability balance
- **Green:**
  - Asks clarifying questions to turn "detailed statistics" into specific data requirements (what events, at what granularity, for what decisions?)
  - proposes specific metrics for usability (drop-off rate per onboarding step, time to completion, error rate on form fields, re-attempt rate) and security (failed authentication attempts, identity verification pass/fail rates, fraud flag rate)
  - considers data retention, privacy compliance (GDPR/PDPA), and consent
  - distinguishes between operational metrics and business intelligence metrics
- **Red:**
  - "Set up Google Analytics" with no further thought
  - cannot name specific metrics
  - ignores the security side of the onboarding usability question
  - no awareness of data privacy implications

---

### Analytical / Critical Thinking

> Use these scenario-based questions to assess structured analysis, root cause thinking, and cross-system reasoning. Each has escalating follow-ups.

**(M/S)** *You're working on an Order Management System. During testing, you notice that some orders are marked as "Completed" even though payment has not been confirmed. How would you analyse this issue?*
- **Assessing:** Process / state flow understanding, gap analysis between expected vs. actual behaviour, business rule tracing
- **Green:**
  - Maps the order lifecycle states (Pending → Payment Confirmed → Processing → Completed)
  - identifies where "Completed" is set and what triggers it
  - hypothesises root causes (missing payment confirmation check, race condition, incorrect state transition rule)
  - proposes investigation steps (trace a specific order ID, review state transition logic in the spec, check if the business rule was ever defined)
- **Red:**
  - "That's a dev bug — I'd raise a defect ticket"
  - no attempt to trace the state flow
  - cannot distinguish a missing requirement from a development defect

**Follow-ups:**
- *Draw the order state diagram as you understand it. Where does the business rule for triggering "Completed" live — in your requirements, or in the developer's implementation?*
- *Was this gap in the original requirements, or was the requirement correct and the developer implemented it wrong? How do you tell the difference?*
- *How would you write the AC for the "Completed" state transition to prevent this class of issue from recurring?*

---

**(M/S)** *You're supporting the integration between your system and a third-party payment provider. Some transactions are successful on the provider side but remain "Pending" in your system. How would you investigate this?*
- **Assessing:** Integration flow understanding, async behaviour awareness, failure point identification across system boundaries
- **Green:**
  - Identifies the integration pattern (callback/webhook vs. polling)
  - checks whether the provider sends a success callback and whether the system receives and processes it
  - examines failure points (callback not received, callback received but not processed, status update logic missing)
  - reviews whether the BA's original integration spec defined the callback contract, retry behaviour, and idempotency rules
- **Red:**
  - "I'd ask the developer to check the logs"
  - no understanding of callback/webhook patterns
  - cannot describe where the sync failure could occur
  - treats it purely as a technical issue with no BA ownership of the integration spec

**Follow-ups:**
- *When you wrote the integration requirements, did you specify what happens if the payment provider's callback is delayed or never arrives? What was in your spec for that scenario?*
- *What's the difference between a polling-based integration and a callback/webhook-based integration? Which would you specify for this scenario and why?*
- *Write the AC for a transaction that succeeds on the provider side but whose callback is delayed by 30 seconds.*

---

**(All)** *A business report shows different numbers from the source system for the same time period. A stakeholder is asking why. How do you approach analysing this?*
- **Assessing:** Data lineage thinking, timing/batch vs. real-time awareness, definition alignment, structured root cause analysis
- **Green:**
  - Structures the investigation across three areas — (1) data extraction timing
  - (2) calculation/transformation logic
  - (3) definition mismatch — walks through each hypothesis systematically
  - involves both the data team and the business stakeholder
- **Red:**
  - "It must be a data bug — raise it with the developer"
  - picks one cause immediately
  - cannot distinguish a timing issue from a transformation issue from a definition mismatch

**Follow-ups:**
- *The numbers differ by exactly 3 records. What does that specific gap tell you about where to look?*
- *The stakeholder says "the report is wrong." How do you determine whether the report is wrong, the source system is wrong, or both are correct but measuring different things?*
- *How would you prevent this class of issue at requirements stage — what would you put in the spec?*

---

## Research

**(All)** *How do you approach learning a new business domain quickly when joining a project?*
- **Assessing:** Research habits, knowledge-building strategy
- **Green:** Reads industry materials, reviews existing documentation, interviews SMEs, maps key terminology
- **Red:**
  - Waits to be told
  - no proactive research behaviour

---

**(M/S)** *Can you describe a time you used research to validate or challenge a stakeholder's assumption?*
- **Assessing:** Evidence-based analysis, critical thinking
- **Green:**
  - Specific example with a named source
  - outcome changed a decision
  - diplomatic delivery
- **Red:**
  - Never challenges assumptions
  - accepts stakeholder statements as fact without validation

---

**(All)** *How do you use AI tools to accelerate domain research or requirements discovery? Give an example of how you validated what the AI surfaced before acting on it.*
- **Assessing:** AI-augmented research habits, critical evaluation of AI output, practical AI adoption in discovery work
- **Green:**
  - Uses AI for domain summarisation, gap spotting, question generation, or document synthesis
  - always cross-checks AI output against source material, SME input, or primary documentation
  - treats AI as a starting point, not a source of truth
  - can give a concrete example with a real outcome
- **Red:**
  - Uses AI and submits output without validation
  - or does not use AI for research at all
  - cannot describe a specific example
  - conflates AI tool familiarity with genuine adoption

---

## Diagram

**(All)** *When would you choose a process flow diagram over a sequence diagram? Give an example of each.*
- **Assessing:** Diagram selection judgment, communication via visual artefacts
- **Green:**
  - Clear rationale for each type
  - names real use cases (e.g. "process flow for as-is/to-be, sequence for API call chains")
  - mentions tools (draw.io, Lucidchart, Miro, Visio)
- **Red:**
  - Only creates one diagram type
  - cannot differentiate
  - only creates diagrams when asked

---

**(M/S)** *Walk me through the last diagram you created. What was it for, who was the audience, and how was it used?*
- **Assessing:** Purposeful diagramming, audience awareness, practical application
- **Green:** Explains context, audience (developer vs business stakeholder), medium (Confluence, presentation), and impact on shared understanding
- **Red:**
  - Vague description
  - diagram not connected to a clear communication goal

---

**(M/S)** *Design a high-level process flow for the appointment booking process of a telemedicine application. Include appointment scheduling, doctor availability, consultation, and post-appointment follow-ups. Walk me through the key decision points and potential failure scenarios.*
- **Assessing:** Process modelling from scratch, whiteboard/diagramming thinking, completeness of edge case coverage, ability to structure an end-to-end flow without prompting
- **Green:**
  - Identifies the main happy path (patient selects slot → availability confirmed → booking created → consultation occurs → follow-up triggered)
  - surfaces meaningful decision points (no available slot, doctor cancels, patient no-show, consultation runs over time)
  - covers failure scenarios (payment failure if booking requires payment, notification delivery failure, follow-up not acknowledged)
  - considers system boundaries (booking system vs. video platform vs. pharmacy/prescription service)
  - suggests appropriate diagram type (BPMN or swimlane)
- **Red:**
  - Only draws the happy path
  - no decision points or failure scenarios
  - cannot identify where system boundaries exist
  - produces a flat list rather than a flow
  - does not consider follow-up as part of the scope

---

## Requirements Elicitation

**(All)** *A client comes to you with a vague, high-level description of what they want — no detail, no acceptance criteria, no clear scope. How do you turn that into requirements you can actually build from?*
- **Assessing:** Elicitation technique selection, structured questioning, assumption management, requirement decomposition
- **Green:**
  - Names specific elicitation techniques (workshops, interviews, document analysis, observation, prototyping)
  - explains how to identify and engage the right stakeholders
  - uses structured questioning to surface scope, business rules, constraints, and success criteria
  - validates understanding by feeding back a summary or prototype
  - documents assumptions explicitly
  - describes how to escalate unresolvable ambiguity before it enters a sprint
- **Red:**
  - "I ask the client what they want" with no structure
  - no technique named
  - assumes the client will eventually clarify without prompting
  - no mention of assumption documentation or assumption risk

---

## Agile — Scrum / Kanban / RUP

**(J)** *Can you walk me through a sprint cycle and where you fit into it as a BA?*
- **Assessing:** Basic agile/scrum understanding, BA role in ceremonies
- **Green:**
  - Mentions refinement, planning, sprint review, daily standups
  - knows when stories are "ready"
- **Red:**
  - Recites definitions without lived experience
  - confuses BA tasks with QA or dev tasks

---

**(J/M)** *What makes a user story "ready" to go into a sprint?*
- **Assessing:** Definition of Ready awareness
- **Green:** Mentions AC, acceptance of designs, dependency checks, edge cases
- **Red:** "When it's written" or "when the PO approves" — no concept of DoR quality criteria

---

**(J/M)** *How do you write acceptance criteria? Can you give an example?*
- **Assessing:** User story quality, AC structure (Given/When/Then or equivalent)
- **Green:** Structured format, references a real scenario, considers happy path + edge case
- **Red:**
  - Vague bullet points with no testable outcomes
  - cannot produce an example under pressure

---

**(M)** *How do you handle a situation where requirements change mid-sprint?*
- **Assessing:** Change management, sprint protection, PO proxy decision-making
- **Green:** Escalates trade-offs, documents impact, negotiates, protects sprint goal
- **Red:**
  - Accepts all changes without challenge
  - no concept of change impact on velocity

---

**(M/S)** *Have you worked with Kanban or RUP? How does your BA approach differ from Scrum?*
- **Assessing:** Methodology breadth, adaptability
- **Green:**
  - Clear articulation of differences (e.g. "RUP has heavier upfront documentation phases
  - Kanban has no fixed sprints so DoR discipline is even more critical")
  - adapts approach accordingly
- **Red:**
  - Only knows Scrum
  - treats all methodologies as identical

---

**(S)** *How do you set up and maintain a Definition of Ready on a project that doesn't already have one?*
- **Assessing:** BA practice leadership, quality gates, team enablement
- **Green:** Defines and socialises DoR criteria, coaches team, gates sprint entry via refinement
- **Red:**
  - Treats DoR as someone else's responsibility
  - no experience establishing team norms

---

**(All)** *Why does Agile exist? What problem does it solve compared to a traditional Waterfall or "mini-Waterfall" approach?*
- **Assessing:**
  - Conceptual understanding of Agile principles, not just mechanics
  - ability to explain the "why" not just the "what"
- **Green:**
  - Explains the core problem Agile solves (late delivery of wrong thing
  - slow feedback loops
  - change resistance
  - big upfront design in uncertain environments)
  - articulates the difference between genuine iterative delivery and mini-Waterfall (sequential phases within a sprint adding no real agility)
  - references the Agile manifesto values at a conceptual level (individuals over processes, responding to change over following a plan)
  - links the theory to lived experience
- **Red:**
  - Recites Scrum ceremonies as the definition of Agile
  - cannot explain what problem Agile was designed to solve
  - describes sprints but cannot articulate the difference between iterative delivery and phased delivery within a fixed scope

---

**(All)** *If an offshore developer in a different timezone picks up your requirement tomorrow with no context and no access to you, what should that requirement document contain?*
- **Assessing:** Async-first documentation discipline, offshore delivery awareness, self-sufficient requirement writing
- **Green:** Business context (why this feature exists), user story with structured AC (Given/When/Then), edge cases and error paths, annotated wireframe or screen reference, data field definitions, dependency and integration notes, explicit assumptions listed, glossary for domain terms, out-of-scope statements — written so no clarification is needed
- **Red:**
  - "The user story and AC" — no context, no assumptions, no edge cases
  - relies on verbal handover or availability for questions
  - does not write for async consumption

---

**(M/S)** *Have you ever had a developer come back to you with questions about a requirement you wrote? What did you change about your approach afterwards?*
- **Assessing:** Self-awareness about documentation quality, continuous improvement, async delivery discipline
- **Green:**
  - Specific example
  - identifies the root cause of the gap (missing edge case, ambiguous term, assumed business rule)
  - describes a concrete change made to their template or process
  - applies it proactively going forward
- **Red:**
  - "It hasn't happened" (unlikely and not credible)
  - or "I just answered their question" with no process change
  - no reflection on how to prevent recurrence

---

## UI/UX

**(All)** *How involved are you in the UI/UX process as a BA? What artefacts do you produce or review?*
- **Assessing:** UI/UX collaboration, wireframe literacy, requirements-design bridge
- **Green:** Reviews wireframes/prototypes against requirements, spots UX gaps, creates low-fidelity wireframes when no designer is available, annotates designs with functional notes
- **Red:**
  - "That's the designer's job" — no active participation
  - never validates designs against AC

---

**(M/S)** *Describe a time a UI/UX design didn't meet the functional requirement. How did you raise it and resolve it?*
- **Assessing:** Design validation, collaborative problem-solving, communication
- **Green:**
  - Specific example
  - uses AC as the reference point
  - constructive conversation with the designer
  - outcome documented
- **Red:**
  - Accepted the design without challenge
  - or describes a conflict with no resolution

---

**(All)** *We need to prevent users from accidentally deleting a critical object — the action is irreversible and high-impact — but we still need to expose this functionality for authorised users. How would you approach specifying this as a BA?*
- **Assessing:** UX design thinking for destructive actions, translating business constraints into testable requirements, knowledge of UX safeguarding patterns
- **Green:**
  - Identifies that "restrict" and "still provide" are two separate concerns requiring a layered solution
  - proposes options such as: role-based access control (only certain roles see the delete option), soft delete / archive with a recovery window before permanent deletion, confirmation dialog with meaningful friction (e.g. type the object name to confirm), audit trail / logging of who deleted what and when
  - frames each option as a requirement with observable user-facing behaviour
  - considers the recovery and rollback path
  - differentiates soft delete from hard delete in the spec
- **Red:**
  - "Just add a confirmation popup" with no further thought
  - no mention of access control or recovery path
  - cannot distinguish soft delete from hard delete
  - treats the solution as purely a developer or designer decision with no BA ownership of the requirement specification

---

**(M/S)** *You're working on an e-commerce website. User testing reveals that many users abandon the checkout process at the payment stage. Stakeholders believe the issue is pricing, but your research suggests users are confused by the payment options and form layout. How would you approach solving this problem — walk me through from research to recommended solution.*
- **Assessing:** Evidence-based challenge of stakeholder assumptions, user-centred research methodology, problem framing before solution, UX requirements specification
- **Green:**
  - Does not accept the pricing hypothesis without validation
  - proposes research methods to test both hypotheses (usability testing, session recordings, heatmaps, exit surveys, analytics funnel analysis)
  - structures the investigation before recommending a solution
  - if research confirms UX confusion, translates findings into specific, testable requirements (e.g. reduce payment options to most-used methods, progressive disclosure for less common options, inline form validation, clear error messages, progress indicator)
  - considers A/B testing to validate the fix
  - documents assumptions and presents trade-offs to stakeholders diplomatically
- **Red:**
  - Accepts the stakeholder's pricing assumption without testing it
  - skips the research phase and jumps straight to a redesign
  - cannot describe how to validate a hypothesis
  - describes only high-level "improve UX" without any testable requirement specifics
  - frames research findings as confrontational rather than evidence-based

---

## Backlog Management & Prioritisation

**(J/M)** *Walk me through how you would decompose an epic into sprint-ready stories.*
- **Assessing:** Story decomposition, vertical slicing, independence
- **Green:**
  - Identifies AC, dependencies, edge cases, technical constraints
  - mentions Story Mapping or MoSCoW
- **Red:**
  - Writes one big story
  - no decomposition strategy
  - never mentions dependencies

---

**(M/S)** *How do you prioritise a backlog when competing stakeholders have conflicting priorities?*
- **Assessing:** Prioritisation frameworks, PO proxy capability, stakeholder diplomacy
- **Green:**
  - MoSCoW, WSJF, value vs effort matrices
  - references business outcomes not stakeholder seniority
  - escalates where needed
- **Red:** "I go by whoever shouts loudest" or no framework at all

---

**(S)** *How do you maintain a healthy backlog over a long-running programme with evolving scope?*
- **Assessing:** Backlog hygiene, long-term ownership, grooming discipline
- **Green:** Regular refinement cycles, roadmap reviews, story aging policies, pruning stale items
- **Red:**
  - No strategy beyond writing new stories
  - backlog becomes a graveyard of never-done items

---

## Stakeholder Management

**(J/M)** *Describe a time you had to push back on a requirement from a client stakeholder. How did you handle it?*
- **Assessing:** Assertiveness, professional diplomacy, evidence-based challenge
- **Green:** Specific scenario, outcome-focused, references evidence used to push back
- **Red:** Never pushes back ("I just do what the client says") or adversarial with no evidence

---

**(M/S)** *A client stakeholder is consistently unavailable for refinement sessions, causing sprint blockers. How do you resolve this?*
- **Assessing:** Risk management, escalation, delivery governance
- **Green:** Escalates via PM/account manager, documents risk formally, proposes async alternatives (Loom, email sign-off), adjusts sprint scope
- **Red:**
  - Passively accepts
  - no escalation or risk documentation strategy

---

**(S)** *Describe a time you managed conflicting expectations between two senior stakeholders. What was your approach?*
- **Assessing:** Senior stakeholder management, conflict navigation, influence without authority
- **Green:**
  - Structured approach (1:1s, joint session, options/trade-offs presented)
  - decisions documented
  - escalates when needed
- **Red:**
  - Avoids conflict
  - relies on someone else to resolve it

---

## Documentation

**(All)** *What does a complete set of BA documentation look like at the end of a project or sprint?*
- **Assessing:** Documentation standards, Definition of Done discipline
- **Green:** User stories with AC, process flows, data dictionary, decisions log, UAT test cases, Confluence pages up to date
- **Red:** "Just the user stories" — no concept of living documentation or knowledge transfer artefacts

---

**(M/S)** *How do you ensure your documentation is understandable by an offshore developer who has no project context?*
- **Assessing:** Async documentation quality, offshore delivery awareness
- **Green:** Context sections in stories, annotated wireframes, glossary/terminology notes, no assumed knowledge
- **Red:** "I'm available to answer questions" — does not write for async consumption

---

## Domain Knowledge

**(All)** *How do you quickly build domain knowledge when starting on a new project in an unfamiliar industry?*
- **Assessing:** Domain ramp-up strategy, research habits, intellectual curiosity
- **Green:** Reads regulatory/industry docs, interviews SMEs, maps key entities and processes, builds a glossary
- **Red:**
  - Waits to be told
  - relies entirely on stakeholders with no independent research

---

**(M/S)** *Tell me about a domain you know deeply. How has that knowledge made you more effective as a BA?*
- **Assessing:** Depth of domain expertise, applied knowledge, business value delivery
- **Green:**
  - Specific industry context
  - explains how domain knowledge helped spot gaps, ask better questions, or challenge incorrect requirements
- **Red:**
  - Generic answer
  - domain knowledge not linked to any concrete BA outcome

---

## Level Calibration — Core Skills

| Skill | Junior (0–2 yrs) | Mid (2–5 yrs) | Senior (5+ yrs) |
|---|---|---|---|
| Brainstorming / Problem Solving | Follows a lead's approach; basic structured thinking | Independently structures problems; explores options | Facilitates problem solving across teams; coaches others |
| Research | Researches when directed | Proactively builds domain knowledge; validates assumptions | Drives research strategy; establishes knowledge bases |
| Diagram | Follows templates; basic flow charts | Selects diagram type by purpose; creates as-is/to-be flows | Governs diagramming standards; uses diagrams to align teams |
| Agile (Scrum/Kanban/RUP) | Knows Scrum ceremonies; participates with guidance | Runs refinement; enforces DoR; adapts to Kanban | Sets up agile ceremonies; defines DoR/DoD; coaches team |
| UI/UX | Reviews wireframes with guidance | Validates designs against AC; creates lo-fi wireframes | Drives design review process; bridges UX and product vision |
| Backlog Management & Prioritisation | Assists with story writing | Decomposes epics; prioritises with MoSCoW/WSJF | Owns full backlog; long-running programme grooming; prunes stale items |
| Stakeholder Management | Supported by lead; attends meetings | Direct engagement; pushes back with evidence | Manages conflict; influences decisions at senior level |
| Documentation | Follows templates; updates stories | Writes async-ready documentation; maintains Confluence | Governs documentation standards; ensures knowledge transfer completeness |
| Domain Knowledge | Building foundational knowledge | Competent in primary domain; applies knowledge to requirements | Deep domain expertise; spots gaps and challenges incorrect requirements |
