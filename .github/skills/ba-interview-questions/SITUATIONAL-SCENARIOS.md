# Interview Questions — Situational Scenarios

Full-scenario questions designed to assess the complete BA skill set in a single exercise: **discovery, elicitation, functional decomposition, constraint identification, and data/analysis thinking**. Use these for Senior-level interviews or as a deep-dive assessment for Mid-level candidates being considered for Senior roles.

Each question is tagged: **(J)** = Junior, **(M)** = Mid, **(S)** = Senior, **(All)** = all levels.

---

## How to Use These Questions

These scenarios are intentionally open-ended. The correct answer is not a solution — it is a **structured approach to discovering the problem before attempting to solve it**. Assess the candidate on:

1. **Discovery discipline** — do they ask clarifying questions before proposing anything?
2. **Functional decomposition** — can they break a vague business ask into distinct, nameable functional areas?
3. **Constraint identification** — do they surface hard vs. soft constraints without prompting?
4. **Data awareness** — do they recognise when a solution depends on data and ask what data exists?
5. **Integration awareness** — do they identify system boundaries and external dependencies?
6. **Elicitation instinct** — do they know *who* to talk to and *what* to ask?

---

## Scenarios

---

### Scenario 1 — F&B Vending Machine Route Optimisation

**(S)** *You are the BA for an F&B company that operates vending machines across multiple cities. The company has multiple warehouses and a mixed fleet of motorbike and car drivers who refill each machine periodically. The client's ask is to build a system that optimises driver routes, delivery timing, and refill frequency on a daily basis. How would you approach this requirement?*

> **As-Is Briefing — give this to the candidate before asking the question:**
>
> **The business:**
> - The company operates **~200 vending machines** spread across Ho Chi Minh City, Hanoi, and Đà Nẵng — located in office buildings, shopping malls, hospitals, universities, and street-level kiosks
> - Machines vary by type: some are snack-and-drink combos, some are drink-only; slot count ranges from 12 to 40 slots per machine; not all machines carry the same product range
> - The company has **3 warehouses** — one per city — each managed with a basic Warehouse Management System (WMS) that tracks stock-on-hand per SKU and logs inbound/outbound movements; the WMS is used by warehouse staff but is not connected to field operations
>
> **How routes and refills are currently managed:**
> - The company uses a **basic field service app** (an off-the-shelf tool, not custom-built) for driver assignments; each morning, a dispatcher in each city uses the app to assign a list of machines to each driver for the day
> - The app shows each driver their assigned machine list and a machine address; drivers navigate to the machine themselves.
> - The app has **no route optimisation** — the dispatcher manually orders the machine list based on location of the machine relative to the warehouse and experience
> - **Stock levels are not visible in the app** — the dispatcher assigns machines based on a fixed refill schedule (each machine is visited every N days regardless of actual stock level); N is set per machine when it is onboarded.
> - When a driver arrives at a machine, they check the stock manually, load what is needed from the crates they brought, and mark the visit as "completed" in the app;
> - The WMS is updated at end of day when drivers return to the warehouse and hand over unused stock; a warehouse staff member manually adjusts inventory based on the driver's verbal report
>
> **Fleet and access:**
> - Motorbike drivers handle machines in narrow alleyways, pedestrian zones, and buildings with no vehicle parking; they carry a **limited load** (typically 2–3 small crates) per trip and must return to the warehouse to reload
> - Car drivers handle larger machines and multi-building office complexes; they can carry more but cannot access all locations
> - Several machines are located on **upper floors of buildings** (floors 3–8); drivers must use lifts and obtain building reception clearance; some buildings require 24-hour advance notice for deliveries
> - **Building access hours** vary — some machines can only be accessed between 08:00–17:00; some mall machines only before 09:00 — these constraints exist as free-text notes in the field service app, not as structured data; the app does not enforce or surface them during scheduling
>
> **Stock and consumption:**
> - The machines have **payment terminals** that log every transaction; this data is available via a reporting portal but is only reviewed by the finance team for revenue reporting — it has never been connected to operations or used to inform refill scheduling
> - The WMS holds **current stock-on-hand per SKU per warehouse** but has no visibility of what is loaded on vehicles or sitting inside machines in the field. (Stock Keeping Unit - Đơn vị lưu kho)
> - Products have different **shelf lives**; expired items are discovered during visits and written off manually via a paper form; these write-offs are not captured in the WMS until the driver returns and the warehouse team enters them
>
> **Pain points the client has raised:**
> - Machines still run empty between scheduled visits in high-traffic locations — the fixed N-day schedule does not reflect actual consumption patterns
> - Drivers are sometimes sent to machines that are nearly full while high-priority machines are skipped until the next scheduled date
> - Drivers occasionally arrive outside a building's permitted access window because the app does not flag it during route planning; building managers are complaining
> - Drivers sometimes bring the wrong product mix because the load plan is based on averages, not on what is actually low in each machine
> - The operations director cannot see a real-time picture of which machines are at risk of running out today; decisions are still largely reactive
> - The WMS and the field service app are **not integrated** — stock consumed in the field only surfaces in the warehouse record at end of day, creating a blind spot throughout the working day

- **Assessing:** Complex system scoping, requirements decomposition, physical/spatial constraint identification, consumption pattern analysis, fleet capability modelling, optimisation problem framing, cross-functional dependency awareness

- **Green:**
  - Does **not** jump to solution design; first establishes what "optimise" means to the business — is the goal to minimise total driving distance, eliminate stockouts, reduce fuel cost, maximise driver utilisation, or a weighted combination?
  - Identifies the key actors and their distinct concerns: dispatchers (daily planning, exception handling), drivers (clear task lists, navigation, load instructions), warehouse managers (stock availability, vehicle loading), operations/finance (cost efficiency, SLA reporting)
  - Asks about the **current-state process** before defining to-be — how are routes planned today? How do drivers know which machine to visit next?
  - Decomposes the problem into distinct functional areas:
    - **Machine inventory monitoring** — when does a machine need refilling? Is stock level reported by IoT sensor, or does the driver check manually on arrival?
    - **Per-SKU (Stock-Keeping Unit) consumption tracking** — which specific items run out first? Do certain slots empty faster than others? Does consumption vary by machine location, time of day, or day of week?
    - **Consumption velocity and demand forecasting** — how quickly do items deplete? Is the rate predictable enough to schedule proactively, or is it reactive?
    - **Machine physical location modelling** — is the machine inside a building? What floor? Is there lift access? Are there access restrictions (entry codes, reception sign-in, building cut-off times)?
    - **Machine address and spatial data** — GPS coordinates alone are insufficient for urban locations; a machine on the 4th floor of a mall has a very different access time than one in a ground-floor lobby; the system must distinguish street address from precise access point
    - **Capacity planning per visit** — what volume needs to go to each machine on each visit? Which SKUs and quantities? Does this vary per machine?
    - **Fleet capability modelling** — motorbikes and cars have fundamentally different load capacities, access constraints (motorbike cannot carry large restocking loads; car cannot enter pedestrian zones), and cost profiles; which machine types can be served by which vehicle type?
    - **Driver assignment and load planning** — who is available today, with which vehicle, from which warehouse, at what start time? What is the maximum load they can carry per trip?
    - **Route optimisation and sequencing** — given the above, what is the most efficient visit sequence? This is not just distance — it must account for building access windows, rush hour traffic by city zone and time of day, and machine priority (a machine about to run out ranks higher than one at 60% stock)
    - **Rush hour and time-of-day impact** — peak traffic hours dramatically affect travel time between stops; a route that takes 20 minutes at 10am may take 90 minutes at 8am; the system must model this, not treat all time slots as equivalent
    - **Scheduling and timing optimisation** — at what time of day should each machine be visited? Should high-traffic-area machines be visited before rush hour? Should machines in the same building be batched into one visit?
  - Identifies **hard constraints**: driver shift hours, vehicle load capacity per trip, warehouse stock availability and opening hours, building access windows, machine physical access requirements
  - Identifies **soft constraints**: traffic patterns by city zone and time of day, machine visit priority based on stock velocity, driver familiarity with specific zones or buildings
  - Recognises this is a **data-dependent optimisation problem** — the quality of the output is entirely dependent on the quality of the inputs; asks what data exists today before defining requirements
  - Flags **integration dependencies**: mapping/routing API (with traffic data, not just distance), IoT or telemetry feed from machines (or a manual check-in substitute), building access data (static config), driver mobile app, warehouse stock management system

- **Red:**
  - Immediately proposes "build a map with routes" or starts talking about Google Maps API
  - Cannot decompose the problem beyond "assign drivers to machines"
  - Treats all machine locations as equivalent (ignores floor level, building access, access windows)
  - Treats "optimise" as self-defining without asking what the business actually wants to optimise for
  - No mention of per-SKU consumption tracking or the fact that different items deplete at different rates
  - No awareness that motorbikes and cars have different operational constraints and cannot serve all machine types equally
  - No mention of rush hour or time-of-day as a variable affecting route efficiency
  - Treats data collection as a technical concern with no BA ownership

---

**Follow-ups:**

- *The client says they want the system to "automatically suggest the optimal refill schedule." What questions would you ask before writing a single requirement?*
  - Green:
    - What does "optimal" mean in measurable terms — fewest stockouts? lowest fuel spend? shortest driver hours? They likely mean a combination; ask how each should be weighted
    - Do machines currently report stock levels automatically, or does a driver manually check on arrival? If manual, the system cannot forecast proactively
    - Who approves the suggested schedule — does a dispatcher review and confirm, or is it fully automated? This changes the UX and audit requirements significantly
    - What happens when the plan breaks down — driver calls in sick, a machine is inaccessible, a warehouse runs out of a specific SKU?
    - Is the schedule per-machine or per-driver trip? A driver may visit 8 machines per trip; the schedule must account for the full trip load, not just individual machine visits
  - Red: Starts writing AC without clarifying any of these; assumes "optimal" has an obvious definition; no awareness of exception scenarios

- *How do you define the data requirements to support this optimisation target? What data inputs must the system have, and where would each come from?*
  - Green identifies the following data inputs, mapped to sources:

    | Data | What it captures | Source |
    |---|---|---|
    | Current stock level per machine | Fill level and remaining quantity by SKU slot | IoT sensor feed or driver manual check-in on arrival |
    | Historical consumption per SKU per machine | How fast each item depletes; which slots empty fastest | Transaction logs or sales data from machine |
    | Machine physical location | GPS coordinates + building name + floor level + access point description + entry requirements | Static config, maintained by ops team |
    | Machine access windows | Building opening hours, security restrictions, cut-off times | Static config, maintained per machine |
    | Warehouse locations and stock availability | Which warehouse holds which SKUs and in what quantity | Warehouse / inventory management system |
    | Fleet data | Driver name, vehicle type (motorbike / car), max load capacity, shift start/end, assigned warehouse | HR / fleet management system or driver app |
    | Real-time traffic and travel time | Estimated journey time between stops at a given time of day | Routing API with live traffic (e.g. Google Maps Platform, HERE) |
    | Rush hour patterns by city zone | Historical traffic density by area and hour | Routing API historical data or static zone config |
    | Driver current location | Live GPS position during shift | Driver mobile app |

  - Flags that **missing or low-quality stock data is the single biggest risk** — if machines do not report stock levels reliably, all downstream optimisation is based on guesswork
  - Flags that **floor level and building access data are almost always missing** from early discovery — ops teams often store this in someone's head or an informal spreadsheet; it must be formally captured and maintained as master data
  - Distinguishes between **real-time inputs** (current stock, driver location, live traffic) and **batch/static inputs** (machine config, historical consumption, warehouse stock levels refreshed at start of day)

  - Red:
    - Lists "machine data and driver data" with no breakdown
    - Cannot map data to a source
    - Does not flag data quality as a risk
    - Unaware that floor/building access data is a distinct and often-missing data requirement
    - Treats all data as equivalent (no real-time vs. batch distinction)
    - No mention of per-SKU consumption history as a prerequisite for proactive scheduling

---

### Scenario 2 — Vietnam FX Exchange Shop: Going Legit

**(S)** *You are the BA assigned to a family-run currency exchange business operating 3 shopfronts across Vietnam — one in Ho Chi Minh City's District 1 near Bình Tây wholesale market, one in Hanoi's Old Quarter, and one in Đà Nẵng near the port. The business has operated informally for 22 years with no digital records. Following regulatory pressure, the owner has been granted a provisional Money Service Business (MSB) licence by the State Bank of Vietnam, with 12 months to implement AML/KYC controls, maintain auditable electronic transaction records, and report suspicious transactions within 24 hours — or lose the licence. The owner wants to build a digital system to run the business and meet the conditions. He has no IT staff, no existing systems, and no documentation of how the business currently works. How would you approach this requirement?*

> **As-Is Briefing — give this to the candidate before asking the question:**
>
> - Every transaction is recorded in a **paper ledger**, one per shopfront; entries include date, currency pair, amount given, amount received, and a customer name — often a nickname or first name only
> - The primary currency supply comes from a **network of informal brokers** — individuals and small dealers the owner has worked with for years, mostly in HCMC and Chinese border trading zones; deals are made by phone or Zalo, settled in cash, with no contracts or receipts
> - A secondary source is **surplus foreign currency bought back from customers**; for large USD and CNY positions the owner occasionally buys from a licensed commercial bank — the only sourced currency that comes with any paper trail
> - **No hedging strategy exists** — the owner holds whatever currencies arrive and absorbs FX rate risk overnight
> - Currency stock levels across all three shops are known only to the owner; cashiers text him when a currency is running low and he physically moves cash between shops by car, or contacts a broker
> - Exchange rates are set each morning via **Zalo message** to each shop; cashiers apply them from memory or a printed paper taped to the counter; rates may be adjusted mid-day verbally
> - There is **no customer identity verification** — regular customers are known by face; new customers may be asked for a name for large amounts, nothing more
> - No receipts are issued; a **photo of the ledger page** is sent to the owner via Zalo at end of shift; the owner reconciles across three shops in his head
> - The three shops have different customer profiles: HCMC handles high-volume small transactions at speed; Hanoi handles lower-volume large corporate amounts with negotiated rates; Đà Nẵng serves port and logistics clients with a high proportion of USD/CNY
> - **No two shops use the same ledger format**
> - The owner has never produced a formal P&L; all pricing decisions are based on 22 years of experience
>
> **Regulatory conditions to be met within 12 months:**
> - Every customer must be identified by CCCD or passport for transactions above a threshold set by the State Bank (the exact threshold has not yet been confirmed to the owner)
> - Full tamper-evident electronic transaction records must be maintained for a minimum of 5 years
> - Suspicious transactions must be reported to the State Bank within 24 hours via a standardised form
> - The business must produce a complete transaction history for any customer within 48 hours on request
> - The exchange rate applied must be documented per transaction, not just the daily opening rate

- **Assessing:** Digital transformation scoping from zero baseline, regulatory requirement decomposition, compliance-driven prioritisation, as-is process documentation, assumption and dependency identification, stakeholder sensitivity, data migration from paper records

- **Green:**
  - Recognises immediately that the **first job is not to write requirements** — it is to document the as-is, because there is no baseline; a system cannot be designed until the current process is fully understood
  - Flags that the KYC threshold is an **unresolved dependency** — certain requirements (customer identification flow, threshold-triggered ID capture) cannot be written until the State Bank confirms the figure; this must be escalated as a critical blocker with a deadline
  - Identifies the key actors and their concerns: the owner (control, simplicity, cost), cashiers at each shop (speed of transaction, ease of use — system must not slow down the counter), the regulator (auditability, completeness, timeliness of suspicious activity reports), informal suppliers (they will not want to be documented — the owner must decide how to handle supplier identity in the system)
  - Decomposes the problem into distinct functional areas, sequenced by regulatory urgency:
    - **Customer identity management (KYC)** — capture, store, and retrieve customer ID against every transaction above threshold; must handle CCCD, passport, and potentially foreign IDs; must be searchable and retrievable within 48 hours
    - **Transaction recording** — replace paper ledger with a digital entry at point of transaction; must capture: transaction datetime, cashier ID, shop location, currency pair, amount in/out, rate applied at the time of transaction, customer reference
    - **Rate management** — replace the Zalo morning message with a system-managed rate that is pushed to all three shops simultaneously, timestamped, and recorded against every transaction it applies to; support mid-day rate overrides with an audit trail
    - **Currency inventory management** — real-time or near-real-time visibility of cash-in-hand per currency per shop; low-stock alerts replacing the informal text to the owner; inter-shop transfer recording
    - **Suspicious transaction flagging and SAR reporting** — define what "suspicious" means in rules (large single transaction, multiple transactions by same customer in a day, unusual currency combination, customer with no prior history conducting a large transaction); generate a draft Suspicious Activity Report in the State Bank's required format within 24 hours of a flag
    - **Audit trail and tamper-evidence** — every record must be non-editable after submission; corrections must be logged as amendments, not overwrites; 5-year retention must be enforced at the database level
    - **Regulatory reporting** — ability to produce a complete transaction history for any customer on demand, within 48 hours
    - **Multi-shop management** — the owner needs a consolidated view across all three locations; each shop operates independently but the owner must see the full picture
  - Identifies **hard constraints**: 12-month regulatory deadline is non-negotiable; cashiers are not technically literate — the system must be fast and simple enough to not slow down counter service; some cashiers may resist digital recording if they perceive it as surveillance; the owner's informal supplier network cannot be exposed in the system without his explicit agreement
  - Identifies **soft constraints**: the owner may want to continue adjusting rates informally; the system must accommodate his working style without breaking the audit trail
  - Raises the **data migration question**: what happens to 22 years of paper ledgers? The regulation requires 5 years of records — does the owner need to digitise historical ledgers, or does the 5-year clock start from go-live? This must be confirmed with the regulator
  - Flags that the **informal broker supply chain is a regulatory risk in its own right** — if the regulator audits the source of funds and finds undocumented cash purchases from informal brokers, that is a separate compliance exposure; this should be raised with the owner and escalated to a legal/compliance adviser, not embedded silently in the BA's requirements
  - Proposes phasing the build around regulatory risk: KYC + transaction recording + rate management in Phase 1 (minimum viable compliance); inventory, SAR automation, and reporting dashboards in Phase 2; owner analytics and multi-shop optimisation in Phase 3

- **Red:**
  - Jumps straight into designing an app or listing features
  - Does not flag the missing KYC threshold as a blocker
  - Does not ask to document the as-is process before writing requirements
  - Does not separate regulatory-mandatory requirements from operational convenience features
  - Treats all three shops as identical (ignores the different customer profiles and transaction patterns)
  - Does not raise the informal supplier network as a compliance risk
  - Does not consider cashier usability as a constraint (proposes a complex system that would slow down counter service)
  - No mention of data migration or the 5-year historical records question

---

**Follow-ups:**

- *The owner says "I just need something simple — my cashiers are not tech-savvy." How do you balance simplicity with the regulatory requirements for tamper-evident records and AML flagging?*
  - Green:
    - Separates the cashier-facing UI (which must be fast and simple — ideally 3–5 taps per transaction) from the back-end compliance layer (which can be complex without the cashier ever seeing it)
    - Notes that tamper-evidence is a database and architecture concern, not a UI concern — the cashier does not need to know how records are locked; they just need to not be able to edit them after submission
    - For AML flagging: the system applies rules automatically in the background; the cashier only sees a prompt when a flag is triggered ("This transaction requires manager approval") — the complexity is hidden
    - Proposes that simplicity and compliance are not in conflict if the system is designed correctly — the risk is in designing the UI first and bolting compliance on afterwards
  - Red: Treats simplicity and compliance as a trade-off where one must lose; proposes removing AML features to make it simpler; cannot describe how to separate UI complexity from backend complexity

- *What data must the system capture at the point of every transaction, and what are the consequences if any field is missing?*
  - Green defines the following, with consequences:

    | Field | Why it is required | Consequence if missing |
    |---|---|---|
    | Transaction datetime (timestamp) | Regulatory audit trail; rate validity window | Cannot prove the rate applied was the rate in force at that time |
    | Shop / terminal ID | Distinguish between three locations | Cannot produce per-shop records; cannot trace which cashier processed the transaction |
    | Cashier ID | Accountability; fraud detection | Cannot assign responsibility for a disputed or suspicious transaction |
    | Customer identity (CCCD / passport number + name) | KYC requirement above threshold | Regulatory non-compliance; licence at risk |
    | Currency pair | Core transaction record | Transaction is meaningless without it |
    | Amount given by customer (with currency) | Core transaction record | Cannot reconstruct the transaction |
    | Amount given to customer (with currency) | Core transaction record | Cannot reconstruct the transaction |
    | Rate applied at transaction time | Regulatory requirement — must be per-transaction, not just daily rate | Cannot prove rate was fair or compliant; disputes unresolvable |
    | Transaction status | Completed / voided / flagged | Cannot distinguish valid transactions from cancelled ones in reporting |
    | AML flag status | Whether the transaction triggered a suspicious activity rule | Cannot produce SAR within 24 hours if flag is not recorded at source |

  - Flags that **rate capture is the most commonly missed field** in informal digitisation projects — businesses assume the daily rate is sufficient, but the regulation explicitly requires the rate applied at the moment of each transaction
  - Red: Lists "customer name and amount" — misses rate, cashier ID, shop ID, timestamp precision, and AML flag; cannot articulate why each field matters for compliance

---

### Scenario 3 — Vietnam Consumer Mobile Payment App

**(S)** *You are the BA for a fintech startup that wants to launch a consumer mobile payment app in Vietnam. The app will allow users to top up a wallet from their bank account, pay merchants by QR code, send money peer-to-peer, and split bills within groups. The founding team has come to you with a slide deck of features and a 6-month launch deadline. They have no existing system, no technical team hired yet, and no regulatory licence. How would you approach this?*

> **As-Is Briefing — give this to the candidate before asking the question:**
>
> - The founding team is composed of two ex-bankers and one product designer; no engineers have been hired yet
> - The slide deck lists 14 features including: wallet top-up via bank transfer and card, QR code payment (both static and dynamic), peer-to-peer transfer, bill splitting, transaction history, push notifications, referral programme, merchant onboarding portal, loyalty points, in-app chat support, biometric login, and multi-language support
> - The team believes 6 months is achievable "because it's just an app"
> - Vietnam requires payment intermediary services to be licenced by the State Bank of Vietnam under Circular 39/2014/TT-NHNN; the team is aware of this but has not started the application process
> - The team has spoken to 3 potential merchant partners informally but has no signed agreements
> - There is no data model, no API design, no security architecture, and no compliance framework
> - The team's assumption is that they will integrate with "a bank API" — they have not identified which bank or confirmed that an open API arrangement exists
> - Budget has been allocated for 6 months of development; there is no contingency

- **Assessing:** Scope management under pressure, regulatory awareness, MVP definition, dependency identification, stakeholder expectation management, risk surfacing, requirement prioritisation from a feature list

- **Green:**
  - Does **not** begin writing requirements from the slide deck — the first job is a **feasibility and dependency audit**, not feature decomposition
  - Immediately identifies the **regulatory licence as the single most critical dependency**: without a State Bank licence, the app cannot legally process payments in Vietnam; the licence application process takes a minimum of 6–12 months and requires, among other things, a minimum charter capital, a documented system security framework, and a disaster recovery plan — none of which exist yet; the 6-month launch deadline may be impossible before the licence issue is even considered
  - Raises the **bank integration dependency**: "a bank API" is not a requirement — the team must identify and contract with a specific banking partner; open banking APIs in Vietnam are not universally available; this is a multi-month commercial and technical negotiation, not a sprint task
  - Challenges the **14-feature scope** against the 6-month deadline directly — not by saying "it can't be done" but by asking the team to rank features by what is needed for a compliant, functional MVP vs. what is a growth feature for later; proposes MoSCoW prioritisation
  - Decomposes the problem into regulatory-mandatory vs. product-optional functional areas:
    - **Regulatory-mandatory (must exist before go-live):**
      - Wallet and fund flow architecture that complies with SBV e-money regulations
      - KYC/eKYC customer onboarding (identity verification against national ID database)
      - AML transaction monitoring and suspicious transaction reporting
      - Data residency and security requirements (customer financial data must be stored in Vietnam)
      - System security framework and penetration testing evidence (required for licence)
      - Disaster recovery and business continuity documentation
    - **Core product (MVP features):**
      - Wallet top-up via bank transfer (not card — card acquiring requires separate agreements)
      - QR code payment — static QR first (simpler), dynamic QR in Phase 2
      - Peer-to-peer transfer
      - Transaction history
      - Biometric login and push notifications
    - **Growth features (post-launch):**
      - Bill splitting
      - Referral programme
      - Loyalty points
      - In-app chat support
      - Merchant onboarding portal (self-serve — Phase 2)
      - Multi-language (Phase 2 unless initial market requires it)
  - Identifies **hard constraints**: regulatory licence timeline; bank integration lead time; no engineering team yet (hiring takes time and affects what can realistically be scoped); budget with no contingency
  - Identifies **key unknowns that must be resolved before requirements can be written**: which bank partner? what KYC provider? what is the minimum charter capital status of the entity? has a legal entity been incorporated? is eKYC via the national ID system (VNPT or C06 integration) in scope?
  - Proposes that the BA's first deliverable is not a backlog — it is a **risk and dependency register** and a **revised, realistic timeline** based on the licence and integration lead times, presented back to the founding team before any development begins

- **Red:**
  - Starts decomposing the 14 features into user stories
  - Does not flag the regulatory licence as a dependency, or mentions it briefly and moves on
  - Accepts the 6-month deadline without questioning its feasibility
  - Does not identify the bank integration as a multi-month commercial dependency
  - Treats "a bank API" as a technical task rather than a partnership and commercial negotiation
  - No mention of KYC/AML as regulatory-mandatory requirements
  - Does not attempt to prioritise or cut the feature list
  - No mention of data residency, security framework, or disaster recovery as licence prerequisites

---

**Follow-ups:**

- *The founding team pushes back and says "other apps launched in 6 months, why can't we?" How do you handle this?*
  - Green:
    - Acknowledges the concern without dismissing it — asks which apps they are referring to; some launched as unlicensed pilots before obtaining a licence, which is a regulatory risk the team should consciously decide to take or not
    - Presents the dependency timeline factually: licence application alone takes X months minimum; bank partnership negotiation takes Y months; hiring engineers and onboarding takes Z months — laid out as a dependency chain, not as a personal opinion
    - Reframes the conversation: "The question isn't whether we can build in 6 months — it's what we can legally and safely launch in 6 months"; proposes a closed pilot (invite-only, limited users, below regulatory thresholds) as a way to demonstrate the product while the licence is in process
    - Documents the conversation and the team's decision — if they choose to proceed with the original timeline knowing the risks, that decision must be recorded
  - Red: Capitulates and starts writing requirements for the full 14-feature scope; or becomes adversarial and tells the team they are wrong; either way no evidence of constructive stakeholder management under pressure

- *If you had to define the absolute minimum viable system that could legally operate in Vietnam on day one, what would it contain and what would it exclude?*
  - Green:
    - MVP contains: wallet top-up via one bank partner (bank transfer only), peer-to-peer transfer, static QR payment, transaction history, biometric login, KYC onboarding (government ID verification), AML monitoring (basic transaction rules), SBV-compliant data storage and security
    - MVP excludes: card top-up (separate acquiring agreement needed), dynamic QR (more complex settlement), bill splitting, loyalty/referral, merchant self-onboarding portal, multi-language (Vietnamese only at launch), in-app chat
    - Notes that even this MVP requires the SBV licence to be in place, a bank partner contracted, and a KYC provider integrated — none of which are development tasks
    - Cannot give a meaningful timeline until those three dependencies have resolution dates
  - Red: Proposes an MVP that still includes loyalty points or referral; cannot identify which features have regulatory preconditions vs. which are purely product choices; gives a timeline without referencing the non-development dependencies

---

### Scenario 4 — Motor Claims & Garage Repair: Config-Driven Multi-Insurer Workflow System

**(M/S)** *You are the BA for a third-party claims management company that handles motor insurance claims and garage repair on behalf of multiple insurers. The company currently manages 20 insurer clients, each with their own claim intake, triage, repair authorisation, and payment workflow. A new system is needed to replace the current patchwork of spreadsheets and manual handoffs. The client's key requirement is that the system must scale — onboarding a new insurer should not require a development sprint; the operations team should be able to configure new workflows themselves. How would you approach this?*

> **As-Is Briefing — give this to the candidate before asking the question:**
>
> **The business:**
> - The company acts as a claims handler on behalf of 20 insurers; the insurers send claims to this company to manage end-to-end — from first notice of loss through to repair completion and payment
> - The company employs claim handlers, a network of approved garages/repairers, and a panel of independent motor engineers for vehicle assessments
> - Currently, each insurer's workflow is handled differently: some have their own process documents, some rely on verbal agreements, and two have bespoke spreadsheet trackers
> - When a new insurer is onboarded, a developer must hardcode the workflow logic — this has taken between 3 and 8 weeks per insurer and has created a maintenance burden as insurer rules change frequently
>
> **Example workflows — give these to the candidate to illustrate the variation:**
>
> **Insurer A — Direct Repair Programme (premium insurer):**
>
> *Intake & Triage*
> - Customer reports claim via insurer's own app → insurer pushes structured claim data to this company via API
> - System validates mandatory fields (policy number, incident date, vehicle registration); rejects incomplete submissions back to insurer with error detail
> - Claim automatically triaged: repair route confirmed (total loss check not required for this insurer)
> - System auto-assigns claim to an approved repairer from Insurer A's dedicated DRP network, based on postcode proximity and current repairer capacity
>
> *Pre-Repair*
> - Assigned repairer receives claim notification and must contact customer within 4 hours to book vehicle drop-off; system records contact timestamp and flags SLA breach if 4-hour window is missed
> - Customer drops off vehicle; repairer records vehicle receipt in the system with odometer reading and condition notes
> - Repairer submits itemised repair estimate within 24 hours of vehicle receipt
> - Estimate auto-approved if total is under £1,500; if above, claim handler reviews and approves or queries within 1 business day
> - If handler queries the estimate, repairer must respond within 24 hours; revised estimate restarts the approval check
>
> *Repair Execution*
> - Repair begins only after authorisation is recorded in the system
> - Repairer submits a progress update at three mandatory milestones: (1) repair start confirmed, (2) parts received and fitted, (3) repair complete and quality-checked
> - If repair scope changes mid-job (additional damage found), repairer submits a supplementary estimate; same approval threshold rules apply
> - Repairer records estimated completion date at repair start; system tracks against the target and alerts handler if completion is delayed by more than 1 day
>
> *Completion & Payment*
> - Repairer marks job as complete and uploads completion photos (minimum 4: front, rear, both sides post-repair)
> - System notifies customer by SMS that vehicle is ready for collection; customer collects and signs a digital collection confirmation
> - Repairer submits invoice within 24 hours of customer collection; invoice must match the approved estimate (or approved supplementary estimate)
> - Invoice auto-validated against the approved estimate; mismatches flagged to handler for review
> - Payment issued to repairer within 3 business days of approved invoice
> - Customer satisfaction survey triggered by SMS 24 hours after collection
>
> ---
>
> **Insurer B — Customer Choice (mid-market insurer):**
>
> *Intake & Triage*
> - Customer calls the claims company's call centre directly to report FNOL; handler creates claim manually in the system during the call
> - Customer may use any repairer of their choice (not network-restricted); customer provides repairer name, address, and contact number
> - Handler validates that the repairer is registered with Companies House and holds valid motor trade insurance (checked against an external register); unregistered repairers must be approved manually by a senior handler before proceeding
> - Excess amount confirmed from policy data; customer informed of the amount due before repair begins
>
> *Assessment*
> - An independent engineer from the company's panel is dispatched to inspect the vehicle — either at the customer's address or at the chosen repairer's premises
> - Engineer must be assigned and booking confirmed within 1 business day of FNOL
> - Engineer submits a full repair assessment report including: damage description, recommended repair method per item, estimated hours per item, parts list with OEM part numbers, and total estimate
> - Handler reviews the engineer report within 1 business day; authorises repair scope line-by-line in the system; each line must be explicitly approved, queried, or rejected — bulk approval is not permitted
>
> *Pre-Repair*
> - Excess collected from the customer before any repair work begins — paid by card via telephone; payment recorded in the system with transaction reference
> - Repairer receives the authorised scope of work as a structured document from the system (not just the engineer report); only authorised items may be repaired
> - Repair start is blocked in the system until excess payment is confirmed
>
> *Repair Execution*
> - Repairer begins work; no mandatory progress milestones required by Insurer B during the repair
> - If the repairer discovers additional damage not covered by the engineer's report, they must halt work on that item and notify the handler; a supplementary engineer inspection may be commissioned at the handler's discretion
> - Supplementary scope, if approved, follows the same line-by-line authorisation process
>
> *Completion & Payment*
> - Repairer notifies handler verbally or by email that repair is complete; handler records completion date in the system
> - Repairer submits invoice; handler checks every invoice line against the authorised scope from the engineer report
> - Any invoice line that was not in the authorised scope, or that exceeds the authorised amount by more than 10%, requires senior handler sign-off before payment
> - Customer is contacted to confirm satisfaction with the repair before payment is released; if customer disputes quality, a re-inspection is booked before invoice is approved
> - Payment issued to repairer within 5 business days of full invoice approval
> - No customer satisfaction survey triggered (Insurer B does not require it)
>
> ---
>
> **Insurer C — Total Loss First (budget insurer):**
>
> *Intake & Triage*
> - FNOL submitted by customer via Insurer C's web portal; claim data pushed to this company via API
> - System retrieves current market value of the vehicle from an integrated valuation service (using vehicle registration and mileage)
> - System calculates estimated repair cost from the customer's damage description (using a rules-based estimate model); if estimated cost exceeds 60% of current market value, the claim is automatically routed to the **total loss track**; if below 60%, routed to the **repair track**
> - Customer is notified of the routing decision by email within 30 minutes of submission
>
> *Total Loss Track*
> - Engineer assessment booked within 1 business day to confirm total loss determination; engineer inspects vehicle and submits a formal total loss report
> - Handler reviews engineer report and confirms total loss status in the system; if the engineer disputes the automated routing, handler overrides and moves to repair track
> - Salvage company notified automatically by the system upon total loss confirmation; salvage collection booked
> - Settlement offer generated based on agreed vehicle valuation methodology; offer letter sent to customer by email with a 5-working-day acceptance window
> - Customer may accept (settlement processed within 3 business days), dispute (handler reviews and negotiates), or reject (claim escalated to senior handler)
> - Vehicle title transfer recorded in the system; salvage collection confirmed; claim closed
>
> *Repair Track — Pre-Repair*
> - Customer must obtain a minimum of three repair quotes from any garage; quotes submitted via the customer portal (structured form, not free text)
> - System validates that all three quotes are from different businesses (by company registration number); duplicate or related garages rejected
> - Handler reviews the three quotes; the lowest compliant quote is selected; if the lowest quote is more than 20% below the next, handler must confirm it is genuine before authorising
> - Repair authorised against the selected quote; OEM parts not required — aftermarket parts approved for all items
> - Excess is not collected upfront; it is deducted from the claim settlement at invoice stage
>
> *Repair Execution*
> - Repairer begins work upon receiving authorisation; no mandatory progress updates required
> - If additional damage is discovered and a revised quote is needed, the customer must submit a new quote (only from the same repairer for the supplementary scope); approved by handler
>
> *Completion & Payment*
> - Repairer notifies customer of completion; customer marks job as complete on the customer portal
> - Repairer submits invoice only after customer confirmation is recorded
> - Invoice validated against the authorised quote; excess deducted from the payable amount automatically
> - Net payment issued to repairer within 5 business days
> - Customer receives a statement showing gross invoice, excess deducted, and net amount paid to repairer
>
> **Current pain points:**
> - Insurer rule changes (e.g. a threshold change from £1,500 to £2,000) currently require a developer code change and a release — taking up to 2 weeks
> - Handlers must memorise which insurer has which rules; there is no system enforcement — wrong workflow steps are followed occasionally
> - Two insurers use different invoice validation logic; when one changed their rules, the wrong logic was applied for 3 weeks before it was caught
> - The operations director cannot see how many claims per insurer are at each workflow stage in real time
> - A new insurer is expected to be onboarded in 6 weeks; under the current model this is not achievable

- **Assessing:** Config-driven system design thinking, workflow abstraction, requirements decomposition for a multi-tenant rules engine, data modelling awareness, changeability vs stability analysis, non-technical configurator UX, workflow versioning

- **Green:**
  - Does **not** propose building 20 separate workflow modules or hardcoding rules — immediately frames this as a **single configurable workflow engine** with an insurer-specific config layer sitting on top of a shared execution layer
  - First asks to **map what is common vs what varies** across all workflows before defining any requirements — identifies the shared structural skeleton and the dimensions of variation:

    | Dimension | What is shared | What varies per insurer |
    |---|---|---|
    | Claim lifecycle stages | FNOL → Triage → Assessment → Authorisation → Repair → Invoice → Payment | Which stages are active; which are skipped; which are mandatory |
    | Repairer assignment | The act of assigning a repairer | Network-only vs customer choice vs any repairer |
    | Engineer assessment | The step exists | Required always / required above a threshold / never required |
    | Authorisation rules | An authorisation decision is made | Who decides; at what thresholds; tiered vs single approver |
    | Parts policy | Parts are sourced for the repair | OEM only / aftermarket approved / aftermarket preferred |
    | Excess handling | Excess may apply | Collected upfront / deducted from settlement / not applicable |
    | Total loss triage | A total loss threshold may exist | The % threshold; whether the step exists at all |
    | Invoice validation | Invoice is checked before payment | Line-by-line vs bulk; against rate card vs against engineer estimate |
    | Payment | Payment is issued | To whom; timing; batch vs per-claim |
    | Customer notifications | Events trigger communications | Which events; which channels (SMS, email, portal); what content |
    | SLA targets | Time targets exist | Different response, authorisation, and completion windows per insurer |
    | Progress milestones | Progress updates may be required | Which stages trigger updates; who receives them |

  - Identifies the concept of **workflow steps as the unit of configuration**: each step has a type (intake, assessment, authorisation, payment, etc.), a set of actors, required inputs, outputs, and transition rules (proceed to next step if X; skip step if Y; escalate if Z); insurer config defines which steps are present, in what order, and with what parameter values
  - Raises the **workflow designer UX** question immediately — who will configure new insurers? The operations team, not developers; the tooling must be usable by non-technical configurators without writing code; this is a distinct functional requirement for the configuration interface itself
  - Asks about **workflow versioning**: what happens when an insurer changes their rules mid-flight? Claims already in progress must continue on the version they started; new claims must use the updated version; the system must support parallel active versions per insurer and a controlled activation date for version switches
  - Raises **testing and validation of new configs**: before a new insurer workflow goes live on real claims, it must be testable — propose a workflow simulation or dry-run capability so ops can validate step transitions and rule logic against test scenarios without touching production data
  - Identifies the **rule change process** as a functional requirement in its own right: who can modify a live workflow config? What approval is needed? Is there an audit log of config changes? This is not just a technical concern — it is a governance and accountability requirement
  - Decomposes the system into functional areas:
    - **Claim intake and FNOL** — multi-channel FNOL capture (API push from insurer, web portal, phone/call centre); claim linked to correct insurer and workflow version at intake
    - **Workflow engine** — step-by-step claim progression; step-gating (claim cannot advance until required inputs are submitted); automated transition where rules allow; manual handler intervention where required; legal hold / pause / resume capability
    - **Workflow configuration tool** — the ops-facing interface for defining and managing insurer workflows; step builder, rule editor, threshold values, actor assignment, notification triggers; non-technical, form-based UX
    - **Repairer and engineer management** — repairer network membership per insurer; rate cards per insurer; engineer panel and availability; assignment logic (auto-assign vs handler selects)
    - **Authorisation and approvals** — tiered approval rules; threshold-based auto-approval; escalation paths; audit trail of all authorisation decisions
    - **Invoice validation** — configurable validation rules per insurer (rate card match, estimate match, line-item exceptions); exception queue for handler review
    - **Payment processing** — payment routing (to repairer / to customer); per-claim vs batch per insurer; payment trigger (invoice approved, customer confirmed, scheduled)
    - **Customer and third-party communications** — event-driven notification triggers; configurable per insurer (which events, which channels, which templates); template management
    - **Claim handler dashboard** — real-time view of all claims by stage, by insurer, by handler; SLA breach alerts; workload management
    - **Operations / management reporting** — claim volumes by insurer/stage/handler; SLA adherence; average cycle times; invoice exception rates
  - Identifies **hard constraints**: the ops team must be able to onboard a new insurer without developer involvement; workflow changes must not break in-flight claims; audit trail on all config changes is non-negotiable; insurer data must be isolated (one insurer's claim data must not be visible to another insurer's handlers)
  - Flags **integration dependencies**: insurer systems (inbound claim data via API or portal), vehicle valuation services (for total loss triage), parts pricing APIs (for estimate validation), payment gateway, notification services, and potentially the insurer's own customer portal for status updates

- **Red:**
  - Proposes building a separate module or workflow per insurer
  - Jumps to database schema or UI design without first mapping what varies vs what is common
  - Cannot articulate the concept of a workflow engine with a config layer — describes the problem as "a form for each insurer with different fields"
  - Does not raise workflow versioning — assumes all changes take immediate effect on all active claims
  - Does not ask who will configure workflows or what tooling they need
  - Treats all 20 insurers as having the same workflow with minor label differences
  - No mention of testing or validating a new insurer config before go-live
  - Does not identify data isolation between insurers as a requirement
  - No awareness that the config change process itself needs governance and an audit trail

---

**Follow-ups:**

- *The operations team says "we want to be able to drag and drop workflow steps to reorder them." How do you approach this requirement?*
  - Green:
    - Does not immediately accept or reject the request — first asks what business problem they are solving; is step reordering genuinely required, or do they actually want to be able to activate/deactivate steps and set skip conditions?
    - Challenges whether arbitrary reordering is safe: some step sequences have hard dependencies (you cannot authorise a repair before triage is complete; you cannot process an invoice before repair is confirmed as complete); reordering must respect these constraints
    - Proposes the safer alternative: a configurable step set where each step can be marked active/inactive and skip conditions can be set — rather than free-form drag-and-drop which could produce invalid workflows
    - If drag-and-drop is confirmed as a genuine requirement, raises the need for workflow validation on save (the system should reject a saved config that violates a hard dependency) and a preview/simulation mode before activation
    - Documents the requirement with explicit scope: which steps can be reordered freely, which have fixed positions, and what validation prevents an invalid configuration from being activated
  - Red: Accepts the requirement as stated and starts writing AC for a drag-and-drop UI without questioning whether it is safe or whether it solves the actual need; no mention of hard step dependencies or validation

- *An insurer changes their authorisation threshold from £1,500 to £2,000. Walk me through what happens in the system — from the ops team making the change to it taking effect on claims.*
  - Green:
    - Ops team opens the workflow config for Insurer A in the configuration tool; locates the authorisation step; edits the threshold field from £1,500 to £2,000
    - The change is saved as a **draft** — it does not take immediate effect; a workflow version number is incremented
    - Ops team reviews the change in a diff view (old vs new config), runs a simulation against test claim scenarios to confirm the new threshold behaves as expected
    - Ops team submits the new version for approval (if a change governance process exists); an approver reviews and activates the new version with an effective date/time
    - On activation: **all new claims for Insurer A** from that point use the new version; **all in-flight claims** continue on the version they started under — the system must store which config version each claim was created against
    - The change is recorded in the audit log: who changed it, what changed, when, and who approved activation
    - If the change is rolled back, the previous version is reactivated; in-flight claims on the new version must be assessed individually
  - Red: Describes the change as "the developer updates the config file and deploys" — no ops-facing tool; no versioning; no impact on in-flight claims considered; no audit trail; no activation control

- *You are onboarding a new insurer — Insurer F — who has a workflow unlike any of the existing 20. Their process requires a customer video assessment (the customer films the damage on their phone) before any engineer or repairer is assigned. How do you handle a genuinely new step type?*
  - Green:
    - First establishes whether "video assessment" is a genuinely new step type (a new category of action the workflow engine has never seen) or a variation of the existing "engineer assessment" step (same step, different input medium)
    - If it is a variation: documents it as a config option on the existing assessment step ("assessment method: in-person / desktop / customer video") — no new development needed
    - If it is genuinely new (different actors, different inputs, different outputs, different transition logic): flags this as a **platform gap** — the workflow engine needs to be extended with a new step type before Insurer F can be onboarded; this requires a development sprint and must be scoped, estimated, and planned
    - Distinguishes clearly between **configuration work** (ops team, no developer needed) and **platform extension work** (developer needed to add a new step type capability); this is the core boundary the system must maintain
    - Raises the question of whether the video assessment step type is likely to be needed by future insurers — if so, building it as a reusable step type is worth the investment; if it is truly unique to Insurer F, the cost/benefit should be presented to the client
    - Documents the gap formally and includes it in the onboarding plan for Insurer F with a timeline dependency on the platform extension being delivered first
  - Red: Proposes hardcoding the video step for Insurer F specifically; does not recognise the distinction between config and platform extension; cannot describe how to manage the onboarding timeline dependency
