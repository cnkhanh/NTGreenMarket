# API Design Guidelines

## Introduction

Atlanta services sit in between customer-facing user interfaces and third-party services which we consume, as well as infrastructure components such as databases that we interact with.

To support this architecture, we have opted to use **REST APIs exposed over HTTP**. Alternative approaches such as **GraphQL** and **gRPC** exist; however, any deviation from REST standards must be **explicitly explained, justified, and agreed**.

---

## REST

A RESTful service exposes APIs over HTTP like any other HTTP-based service. The key distinction is that:

- Each URL represents a **resource (noun)**, not an **action (verb)**
- The action performed is determined by the **HTTP verb**:
  - `GET`
  - `POST`
  - `PUT`
  - `PATCH`
  - `DELETE`

### Common REST Patterns

- **Data retrieval** typically involves `GET`ting a resource from a collection
- **Data creation** typically involves `POST`ing a resource to a collection

With a `POST`, the **server assigns the resource identifier** and returns it in the response.

An alternative is `PUT`, where the **client assigns the identifier**.  
- `PUT` is **idempotent** (multiple identical requests result in the same state)
- `POST` is **not idempotent** and usually creates a new resource each time

`PATCH` is used when **partially updating** a resource without sending the full representation.

---

## Expected Response Codes

Some standard response codes may appear regardless of API details:

- **500 Internal Server Error** – Technical error  
  - *Do not expose technical details in the response*
- **408 Timeout** – Performance or network issues
- **401 Unauthorized** – Unable to authenticate the caller
- **403 Forbidden** – Authenticated but not authorised
- **405 Method Not Allowed** – Incorrect HTTP method used (e.g. `POST` instead of `PUT`)

Beyond these, response codes are **endpoint-specific**, with no additional patterns expected outside those defined below.

---

## Endpoint Behaviour and Responses

### `GET /collection-identifier/resource-identifier`

Returns:
- **200 OK** – Resource found, response body contains the resource
- **404 Not Found** – Resource not found, no response body

---

### `GET /collection-identifier/`

Returns:
- **200 OK** – Resources found in the collection
- **200 OK** – Empty array (`[]`) if no resources are found

---

### `POST /collection-identifier/`

Returns:
- **400 Bad Request** – Invalid request body
- **201 Created** – Resource created, resource returned in response body

---

### `PUT /collection-identifier/resource-identifier`

Returns:
- **400 Bad Request** – Invalid request body
- **201 Created** – Resource created, resource returned in response body

---

### `PATCH /collection-identifier/resource-identifier`

Returns:
- **400 Bad Request** – Invalid request body
- **409 Conflict** – Attempt to patch an outdated version of the resource
- **200 OK** – Successful, full resource returned in response body
- **204 No Content** – Successful, no response body returned

---

### `DELETE /collection-identifier/resource-identifier`

Returns:
- **400 Bad Request** – Invalid request body
- **204 No Content** – Resource deleted successfully, empty response body

---

## Examples

### REST-Compliant Example

```http
GET /api/quotes/car/{webreference}
```
