Each question is tagged: **(J)** = Junior, **(M)** = Mid, **(S)** = Senior, **(All)** = all levels.

---

## AI Mindset / Skills

**(All)** *How are you currently using AI tools in your BA work? Give specific examples.*
- **Assessing:** AI tool adoption, practical application, productivity mindset
- **Green:**
  - Uses AI for drafting stories/AC, generating test cases, summarising documents, writing queries, or diagram generation
  - critically evaluates output before using it
- **Red:**
  - Not using AI at all
  - or uses AI but submits output without review

---

**(M/S)** *What are the risks of using AI to generate requirements or documentation? How do you mitigate them?*
- **Assessing:** Critical AI thinking, quality control, professional responsibility
- **Green:**
  - Hallucination risk, context loss, compliance/IP concerns
  - always reviews and validates AI output
  - never treats AI output as ground truth
- **Red:**
  - No awareness of risks
  - treats AI output as fully reliable

---

## Data Mindset / Skills (SQL, NoSQL, Big Data)

**(All)** *As a BA, how do you use data to support your requirements or decisions?*
- **Assessing:** Data-driven thinking, analytical mindset
- **Green:**
  - References usage metrics, query results, or reports to validate requirements
  - identifies data sources
  - checks data quality
- **Red:**
  - Never uses data to inform requirements
  - purely intuition-based

---

**(M/S)** *Have you worked with SQL, NoSQL, or big data concepts in a BA context? What was your involvement?*
- **Assessing:** Data literacy, schema understanding, data requirements specification
- **Green:**
  - Wrote or reviewed SQL queries
  - specified data storage requirements
  - understood data structures in requirements
  - worked with data engineers to define schemas
- **Red:** "That's the developer's job" — no engagement with data structures at all

---

**(All)** *Explain the difference between a primary key, foreign key, and composite key. Why does a BA need to understand these concepts?*
- **Assessing:** Database foundational literacy, understanding of data integrity in requirements context
- **Green:**
  - Clear and accurate definitions (primary key = unique row identifier
  - foreign key = link to another table's primary key
  - composite key = two or more fields combined as a unique identifier)
  - links the knowledge to BA practice — understanding keys is essential when specifying data requirements, designing data dictionaries, writing integration specs, and spotting data integrity issues before they become defects
  - can give an example of where this has mattered in their work
- **Red:**
  - Cannot define the terms accurately
  - or "that's a developer concern" — no awareness of why data structure knowledge matters for a BA specifying requirements or integration contracts

---

## API (SOAP / RESTful / Message Queue / Webhook)

**(M/S)** *Describe your experience documenting or specifying API requirements. What does a good API requirement look like?*
- **Assessing:** API literacy, integration requirement writing, technical communication
- **Green:**
  - Describes endpoint purpose, request/response payload, error handling, authentication, contract-first thinking
  - mentions Swagger/OpenAPI
- **Red:** "I don't do API work" or cannot describe what an API requirement consists of

---

**(M/S)** *What's the difference between a RESTful API call and a message queue? When would each be appropriate?*
- **Assessing:** Integration conceptual literacy, architecture awareness
- **Green:**
  - Clear conceptual explanation with real-world examples (e.g. "message queue for event-driven processing, REST for real-time lookups")
  - understands implications for error and retry logic, sync and async patterns
- **Red:**
  - Cannot distinguish the two
  - conflates synchronous and asynchronous patterns

---

**(M/S)** *Write a user story for a payment feature that involves backend logic such as card tokenisation and card validation — including acceptance criteria. How do you make the backend rules testable in the AC without exposing implementation detail?*
- **Assessing:**
  - Ability to translate backend technical logic into developer-ready stories with testable AC
  - understanding of where business rules end and implementation begins
- **Green:**
  - Produces a structured story (As a… / I want… / So that…)
  - AC uses Given/When/Then covering happy path (valid card, successful tokenisation), failure paths (invalid card number, expired card, tokenisation failure), and edge cases (duplicate token, network timeout)
  - references the backend rule as an outcome condition ("the card number is stored as a token") rather than as implementation code
  - notes AC should be verifiable by QA without knowing the tokenisation algorithm
- **Red:**
  - AC only covers the happy path
  - embeds implementation detail directly in AC ("the system calls the Visa tokenisation API with the PAN field")
  - cannot distinguish between what the BA specifies and what the developer decides

**Additional scenarios — use any of the following as alternatives or follow-ups depending on the candidate's domain:**

- **(Payment limit / fraud check)** *Write a story for a payment transaction that must be blocked if it exceeds the user's daily limit or is flagged by a fraud detection engine. How do you write the AC so the rule is testable without specifying how the fraud engine works?*
  - **Green:**
    - AC covers limit-exceeded path ("Given the user has reached their daily limit, When they attempt a payment, Then the transaction is declined and the user receives an error message")
    - fraud flag expressed as an outcome ("the system declines the transaction") not as an algorithm description
  - **Red:**
    - Tries to document the fraud scoring logic in AC
    - only covers the success scenario
    - no error state or user-facing message specified

- **(OTP / 2FA verification)** *Write a story for a payment step that requires OTP verification before authorisation. Include AC for all outcomes including expired OTP, wrong OTP, and too many failed attempts.*
  - **Green:** Happy path (correct OTP within time window), expiry path (OTP expired — resend option), wrong OTP path (error + retry count), lockout path (max attempts reached — account locked or cooldown), all with testable conditions and user-visible outcomes
  - **Red:**
    - Only covers happy path
    - no retry limit
    - no expiry behaviour
    - no user feedback states

- **(Refund / reversal logic)** *Write a story for a refund feature where the refund business rules differ depending on whether the original payment was made by card, wallet, or bank transfer. How do you handle conditional business rules in AC without writing three separate stories?*
  - **Green:**
    - Uses a single story with AC structured by payment method condition (Given the original payment was by card / wallet / bank transfer, Then…)
    - considers partial refund, full refund, and ineligible cases
    - notes that method-specific rules can be parameterised rather than duplicated
  - **Red:**
    - Writes three separate stories with no shared structure
    - or collapses all rules into one undifferentiated AC line
    - or doesn't identify the conditional logic at all

- **(Recurring / scheduled payment)** *Write a story for a scheduled recurring payment that must retry if the initial attempt fails due to insufficient funds. How do you specify the retry behaviour and escalation path in the AC?*
  - **Green:**
    - Specifies retry trigger (failed payment), retry interval and maximum attempt count, user notification at each stage, final failure outcome (payment cancelled + user notified)
    - all expressed as observable outcomes not as code logic
  - **Red:**
    - No retry logic in AC
    - no escalation or notification path
    - assumes payment always succeeds

- **(Currency conversion)** *Write a story for a cross-currency payment where an FX rate is applied at the point of transaction. What fields, validations, and edge cases must appear in the AC?*
  - **Green:**
    - Specifies displayed rate vs applied rate, rate expiry window, re-confirmation if rate changes before submission, rounding rules, and what happens if the FX service is unavailable
    - all expressed as user-visible conditions
  - **Red:**
    - Only covers the happy path (payment goes through)
    - no rate expiry, no rounding specification, no fallback for FX service downtime

---

## Integration (General)

**(M/S)** *Walk me through how you would document the integration between two systems as a BA.*
- **Assessing:** Integration requirements specification, sequence diagramming, data contract documentation
- **Green:** Produces sequence diagrams, defines data contracts, documents error/exception flows, specifies retry and timeout behaviour, involves architects
- **Red:**
  - "I'd just write a user story" — no understanding of integration complexity
  - no sequence diagram
  - no data contract

---

**(S)** *You're told two systems need to be integrated but neither has documentation. How do you approach discovery?*
- **Assessing:** Technical discovery in ambiguous contexts, integration analysis, stakeholder engagement
- **Green:** Interviews system owners, reverse-engineers existing flows, documents current-state data exchanges, identifies gaps and risks
- **Red:**
  - Waits for technical documentation before starting
  - no proactive discovery approach

---

## Dynamic / Flexible Systems *(Bonus)*

**(M/S — Bonus)** *Have you worked on a config-driven or rules-engine-based system? How did you document the business rules?*
- **Assessing:** Config-driven system awareness, business rules documentation, precision in requirement writing
- **Green:**
  - Documents rules in structured tables or decision matrices
  - understands the difference between hardcoded and configurable behaviour
  - knows config changes can introduce silent defects
- **Red:**
  - Never encountered config-driven systems
  - or treats all system behaviour as hardcoded

---

**(S — Bonus)** *A system needs to support multiple clients with different business rules for the same feature. How do you approach requirements for this?*
- **Assessing:** Multi-tenancy thinking, config-driven design awareness, scalable requirements
- **Green:**
  - Defines a base rule set and client-specific overrides
  - flags shared vs client-specific behaviour
  - considers maintenance impact of rule divergence
- **Red:**
  - Writes separate requirements per client with no abstraction
  - assumes all clients will have the same rules

---

## Non-Functional Requirements (NFRs)

**(All)** *What are non-functional requirements? Give three examples and explain why they matter to a BA.*
- **Assessing:** NFR awareness, ability to distinguish functional from non-functional, understanding of their impact on delivery
- **Green:**
  - Clearly distinguishes NFRs from functional requirements (NFRs define *how well* the system does something, not *what* it does)
  - gives concrete examples across different categories — performance ("the page must load within 2 seconds for 95% of users"), availability ("the system must be available 99.9% of the time"), security ("all data in transit must be encrypted using TLS 1.2 or above"), scalability, maintainability, or compliance
  - explains that NFRs are often the source of the most expensive defects because they are discovered late if not defined upfront
  - notes they must be measurable, not vague ("the system must be fast" is not an NFR)
- **Red:**
  - Cannot define NFRs
  - or defines them as "things that aren't features"
  - gives only one category (usually performance)
  - cannot explain why they must be captured early
  - has never written a measurable NFR

---

**(M/S)** *A stakeholder says "the system must be fast and reliable." How do you turn that into a testable NFR?*
- **Assessing:** NFR elicitation technique, measurability discipline, stakeholder translation skills
- **Green:**
  - Immediately flags that "fast" and "reliable" are not requirements — they are intentions
  - uses structured elicitation to extract specifics: *fast* → "Under what load? How fast for which operations? What is acceptable vs. unacceptable response time?" → produces "The search results page must return results within 1.5 seconds for up to 1,000 concurrent users under normal load conditions"
  - *reliable* → "What does failure mean? How much downtime is acceptable per month? Does it need to degrade gracefully or fail completely?" → produces "The system must achieve 99.95% uptime measured monthly, excluding planned maintenance windows
  - in the event of a partial outage, read operations must remain available"
  - notes that each NFR must define the metric, the threshold, the measurement conditions, and the measurement method
- **Red:**
  - Accepts "fast and reliable" as written
  - or only asks "how fast?" without specifying load conditions or measurement method
  - produces an NFR without a measurable threshold

---

**(M/S)** *How do you prioritise NFRs against functional requirements in a sprint backlog? Give an example of where an NFR should block a feature from going live.*
- **Assessing:** NFR integration into delivery, risk awareness, ability to hold the line on quality gates
- **Green:**
  - Explains that NFRs are not separate from features — they are acceptance conditions on top of which features are built
  - proposes that critical NFRs (security, data protection, compliance) should be defined as Definition of Done criteria or explicit acceptance criteria on the feature story, not as separate backlog items
  - gives a concrete example where an NFR blocks go-live: "A login feature cannot go live if the password storage NFR (bcrypt hashing, never plaintext) is not met — that is a security requirement, not a nice-to-have"
  - distinguishes between NFRs that are absolute gates (security, regulatory compliance, data integrity) vs. NFRs that can be phased (response time under high load can be improved post-launch with monitoring in place)
  - notes that NFRs without an owner, a measurement method, and a test are effectively invisible — they will not be built
- **Red:**
  - Treats NFRs as a separate "non-functional backlog" with lower priority
  - cannot give an example of an NFR blocking a release
  - does not connect NFRs to acceptance criteria or Definition of Done
  - views NFRs as the architect's responsibility rather than the BA's

---

**(S)** *You are writing requirements for a system that must comply with a data residency requirement — all Vietnamese customer data must be stored and processed within Vietnam. How does this NFR affect your requirements, and what questions do you need answered before you can write it correctly?*
- **Assessing:** Regulatory NFR decomposition, cross-cutting constraint identification, cloud and infrastructure awareness in a BA context
- **Green:**
  - Recognises this is a **cross-cutting NFR** that affects multiple functional areas — not just storage, but also backups, logging, analytics pipelines, third-party integrations, and CDN/caching layers
  - asks the following before writing the requirement: What is the legal definition of "stored and processed" — does it include temporary in-memory processing, logs, and analytics, or only the primary database? Does "within Vietnam" mean a specific data centre geography, or is a Vietnamese-entity cloud region sufficient? What happens if a third-party integration (e.g. email provider, payment gateway, analytics tool) processes data outside Vietnam — is that a violation? Who owns the decision on third-party exceptions? Is there a regulatory citation (specific law or circular) that defines the requirement, or is it a business assumption?
  - notes that without precise legal definition, the NFR cannot be implemented correctly — "store data in Vietnam" written vaguely will be interpreted differently by every developer and architect on the team
- **Red:**
  - Writes "all data must be stored in Vietnam" as a single sentence and moves on
  - no awareness that the NFR affects integrations, backups, and logs, not just the primary database
  - does not ask for the legal source of the requirement
  - treats it as a purely technical concern with no BA ownership

---

## Level Calibration — Tech Skills

| Skill | Junior (0–2 yrs) | Mid (2–5 yrs) | Senior (5+ yrs) |
|---|---|---|---|
| AI Mindset / Skills | Aware of AI tools; beginning to adopt | Actively uses AI; critically reviews output | Champions AI adoption; establishes quality control for AI-generated artefacts |
| Data Mindset / Skills | Basic data literacy; understands tables and fields | Reads/writes basic SQL; specifies data requirements | Strong data analysis skills; guides data modelling decisions from a business perspective |
| API (SOAP/RESTful/MQ/Webhook) | Aware APIs exist; basic understanding | Documents API requirements; understands REST vs async patterns | Specifies full API contracts; leads integration requirement workshops |
| Integration (General) | Aware of system integrations | Documents integrations with sequence diagrams and data contracts | Owns integration requirements end-to-end; manages cross-team dependency resolution |
| Dynamic / Flexible Systems *(bonus)* | Aware of config-driven concepts | Documents business rules in decision tables; understands config vs hardcoded | Designs rule documentation frameworks for multi-client, config-driven platforms |
| Non-Functional Requirements | Aware NFRs exist; can name common types | Writes measurable NFRs; integrates them into AC | Owns NFR framework across the product; ensures NFRs are defined, measured, and enforced as quality gates |
