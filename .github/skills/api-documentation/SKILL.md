---
name: documenting-apis-and-mappings
description: Documents API endpoints and maps data fields between systems with transformation rules. Use for API integration and data mapping.
---

# API Documentation & Data Mapping Skill

## Skill Type
Procedural Framework + Template Application

## When to Use
- Writing comprehensive API specifications
- Mapping data between systems
- Documenting integration endpoints
- Creating data transformation rules

## Prerequisites
- API documentation (swagger/OpenAPI file, or link to docs)
- Internal database schema or table structure
- Business requirements for integration

---

## Purpose

Provide a repeatable process for writing API specifications and mapping data between systems while following the BA core principles.

## Objectives

1. **Write comprehensive API specifications** using standardized templates.
2. **Understand API specifications** and extract required/request parameters.
3. **Map data** from internal merchant tables to API fields.
4. **Suggest transformation rules** when data types or formats differ.
5. **Output structured mapping results** (as Markdown table or downloadable Excel).
6. **Enable iteration** by using standard templates and reusable logic.

---

## Inputs

- **Excel or CSV mapping template** (e.g., *Data Mapping Template 1.xlsx*).
- **Official API documentation** link (public or internal).
- **Merchant database/tables** structure or assumptions for matching fields.

---

## Step-by-Step Process

### Part A: Writing API Specifications

When asked to create or document an API specification, follow the comprehensive template structure defined in:

**→ [API Specification Template](references/API-Specification-Template.md)**

The template covers:
1. HTTP Method & Endpoint
2. Summary
3. Description
4. Request Parameters (Headers, Path, Query, Body)
5. Request Processing Rules (with Mermaid diagrams for complex flows)
6. Response Specifications (all HTTP status codes with examples)
7. Additional Sections (Authentication, Tracking, Logging)

**→ [API Design Guidelines](references/API-Design-Guidelines.md)**

Follow RESTful design principles including:
- Resource-based URL patterns (nouns, not verbs)
- Appropriate HTTP verbs (GET, POST, PUT, PATCH, DELETE)
- Standard response codes and their usage
- Endpoint behavior and response patterns

---

### Part B: Data Mapping Process

#### 1. Review the Data Mapping Template

Your primary reference is the data mapping template and examples in:

- **[Data Mapping Templates and Examples](references/REFERENCE.md)**

---

#### 2. Extract API Parameters

- Access the API documentation link provided by the user.
- List all request and response parameters with their:
  - Names
  - Data types
  - Required/optional flags
  - Validation rules (length, regex, or value range)

---

#### 3. Identify and Map Internal Fields

#### Example Mapping Table

| Source Table | Source Field | Source Data Type | Target API Parameter | API Data Type | Is Required | Transformation Rule | Validation Rule | Remarks |
|---------------|---------------|------------------|----------------------|---------------|--------------|---------------------|-----------------|----------|
| transactions | amount | decimal(12,2) | totalAmount | integer | Yes | amount * 1000 | > 0 | Convert to cents |
| customers | phone_number | varchar(20) | customerPhone | string | Yes | formatToE164(phone_number) | must start with + | API requires E.164 |
| orders | order_id | varchar(50) | requestId | string | Yes | concat('ORD-', order_id) | not null | Ensure unique prefix |
| merchant | created_date | datetime | requestDate | string | Yes | formatDate(created_date, 'yyyy-MM-ddTHH:mm:ss') | valid ISO date | Format as ISO8601 |

---

#### Common Transformation Rules

| Rule Type | Example | Purpose |
|-----------|---------|---------|
| Formatting | formatToE164(phone_number) | Standardize phone to international format |
| Encoding | base64(value) | Encode sensitive fields |
| Data Enrichment | concat('ORD-', order_id) | Add unique prefix |
| Type Casting | castToInt(string_value) | Align data type mismatch |

---

#### 5. Validate Mapping

- Check that all **required fields** are mapped.
- Identify missing or unmatched API parameters.
- Flag unclear or ambiguous mappings for user clarification.

#### 5.1 Validation Loop (REQUIRED)

If validation finds gaps or ambiguity:
1. Summarize the exact missing fields or mismatches.
2. Ask targeted clarifying questions.
3. Update the mapping and re-run validation.
4. Only proceed to final output after all required fields are resolved.

---

#### 6. Review and Deliver Output

#### Example Output in Markdown

| Source Table | Source Field | Target API Parameter | Transformation Rule | Remarks |
|---------------|---------------|----------------------|---------------------|----------|
| transactions | amount | totalAmount | amount * 1000 | Convert to smallest unit |
| customers | phone_number | customerPhone | formatToE164(phone_number) | Add +84 prefix |
| orders | order_id | requestId | concat('ORD-', order_id) | Unique ID prefix |

See [data mapping templates and examples](references/REFERENCE.md).
**When working with API specifications, NEVER assume endpoints exist based on common REST patterns:**

- **Do NOT assume** that if `POST /resource` exists, then `GET /resource`, `PUT /resource`, or `DELETE /resource` also exist
- **Do NOT assume** that if `POST /resources/{id}` exists, then `GET /resources/{id}` also exists
- **Do NOT assume** REST conventions like `/resources/{id}/accept` or `/resources/{id}/confirm` subpaths
- **Do NOT infer** HTTP methods without explicit verification in the API specification

**INSTEAD:**
- **VERIFY every single endpoint** against the actual API specification (swagger, OpenAPI, or official docs)
- **Only document endpoints that explicitly exist** in the specification
- **Search the specification file** for the exact path and method combination before documenting
- **Mark gaps explicitly** when expected endpoints do not exist (e.g., "N/A - No DELETE endpoint available")
- **Ask clarifying questions** if you cannot verify an endpoint's existence

**Example of what went wrong:**
- Assumed `GET /api/v1/policies/{webref}/renewal-proposals/{policyEventRef}` existed because `POST` existed
- Reality: Only the POST endpoint exists; GET retrieves renewals via the main policy endpoint
- Result: Documented 20+ non-existent endpoints that had to be corrected

**Remember:** Each API is designed differently. Some APIs do not follow RESTful conventions. Always verify against source documentation.

---

- Use clear, RESTful endpoint naming conventions
- Document all possible HTTP status codes with real-world scenarios
- Include Mermaid diagrams for complex processing flows (3+ decision points)
- Provide concrete examples for request/response payloads
- Always specify data types, nullable fields, and validation rules
- Reference the example spec format provided in attached files
- Keep descriptions concise but complete - focus on what, why, and when

**For Data Mapping:**
- Always **include both source and target data perspectives**.
- Use **clear, standardized naming** for repeated concepts (e.g., "order_id" vs "transaction_id").
- Keep transformation logic **simple, readable, and scalable**.
- When the internal schema is unavailable, propose a **best-practice table structure**.
- Avoid unnecessary symbols or icons — keep the answer clean and professional.
- Provide **one complete mapping per API** or **group of endpoints**.

---

## Implementation Notes

### CRITICAL IMPLEMENTATION RULE: Endpoint Verification

**Before documenting ANY API endpoint:**
1. Use `grep_search` or `read_file` to search the API specification file
2. Look for the exact path string (e.g., `"/api/v1/policies/{webref}/proposals"`)
3. Verify the HTTP method exists under that path (look for `"get"`, `"post"`, `"put"`, `"delete"`)
4. Only document the endpoint if you find explicit evidence in the specification
5. If you cannot find it, mark as "N/A" with a gap explanation

**Example verification process:**
```
User mentions: "Update proposal endpoint"
DON'T: Assume PUT /api/v1/policies/{webref}/proposals/{id} exists
DO: grep_search for "proposals/{" in swagger file
DO: Read the section to see which methods exist
DO: Document only verified endpoints (e.g., only POST exists, no PUT)
```

---

**For API Specifications:**
- Always structure API specs following the template: Method → Endpoint → Summary → Description → Request → Processing Rules → Response
- Include Mermaid flowcharts when processing has 3+ distinct steps or multiple conditional branches
- Break down responses by HTTP status code - never group multiple status codes together
- Provide realistic examples for both success and error scenarios
- Use tables for parameter documentation - consistent formatting improves readability
- Cross-reference related endpoints or authentication requirements where applicable
- **VERIFY endpoint existence before documenting** - search the actual API spec file

**For Data Mapping:**
- Never skip any API parameter without marking its status (mapped, pending, not applicable).
- If data mapping depends on a condition (e.g., payment type), specify the logic clearly in remarks.
- Prefer Markdown outputs for readability unless explicitly asked to generate downloadable Excel.
- Be concise, factual, and use consistent table formatting.
