# EP-03 Technical Specification — Manage Users (Role-Only Model)

**Document Version:** 2.0
**Last Updated:** 2026-03-28
**Status:** Ready for Implementation (Phase 1)
**Major Change:** Removed account deactivation; simplified to flat role-only model (Buyer base, Seller per-event, Admin global)

---

## Table of Contents

1. [Admin Dashboard Workflow Diagram](#1-admin-dashboard-workflow-diagram)
2. [Data Model & Prisma Schema](#2-data-model--prisma-schema)
3. [API Specification](#3-api-specification)
4. [Role Model & Access Control](#4-role-model--access-control)
5. [Implementation Checklist](#5-implementation-checklist)
6. [Edge Cases & Concurrency Handling](#6-edge-cases--concurrency-handling)

---

## 1. Admin Dashboard Workflow Diagram

### High-Level Admin User Flow

```
[Admin Login]
     |
     v
[Admin Dashboard (EP-02)]
     |
     +-- Navigate to "Manage Users"
            |
            v
     [User Management Page]
            |
            +-- Select Event (dropdown)
                   |
                   v
            [User List Table Displays]
            [Name | Email | Location | Current Role]
                   |
                   +-- Search by Name/Email
                   |
                   +-- Filter by Location
                   |
                   +-- Sort by Column
                   |
                   +-- Select Users (checkboxes)
                        |
                        +-- Bulk Assign Seller Role (US-03.01)
                        |      |
                        |      v
                        |   [Confirmation Dialog]
                        |      |
                        |      v
                        |   [API: PATCH /api/admin/events/{eventId}/users/roles/bulk]
                        |      |
                        |      v
                        |   [Success/Error Message]
                        |      |
                        |      v
                        |   [Table Refreshes]
                        |
                        +-- User Context Menu
                               |
                               +-- Change Role (US-03.02)
                               |      |
                               |      v
                               |   [Role Selector Dialog]
                               |      |
                               |      v
                               |   [Confirmation Dialog]
                               |      |
                               |      v
                               |   [API: PATCH /api/admin/events/{eventId}/users/{userId}/role]
                               |      |
                               |      v
                               |   [Table Refreshes]
                               |
                               +-- Revoke Seller Role (US-03.02)
                               |      |
                               |      v
                               |   [Confirmation Dialog]
                               |      |
                               |      v
                               |   [API: DELETE /api/admin/events/{eventId}/users/{userId}/role]
                               |      |
                               |      v
                               |   [Table Refreshes (user reverts to Buyer)]
                               |
                               +-- Promote to Admin (US-03.05)
                                      |
                                      v
                                   [Confirmation Dialog]
                                      |
                                      v
                                   [API: POST /api/admin/users/{userId}/promote]
                                      |
                                      v
                                   [User.is_admin = true]
                                      |
                                      v
                                   [Table Refreshes]
```

### Auto-Revert Flow (Event Closure)

```
[Event Admin Closes Event]
     |
     v
[Event Status = CLOSED]
     |
     v
[System Trigger: Event Closure → Auto-Revert Seller → Buyer]
     |
     +-- Query all UserRole records for event WHERE event_id = [closed_event] AND role = SELLER
            |
            v
     [For each UserRole with role = SELLER]
            |
            v
     [Delete UserRole record OR mark inactive]
            |
            v
     [User reverts to Buyer for that event]
            |
            v
     [On next API request]
            |
            v
     [Role resolution: query UserRole, no SELLER found → default to BUYER]
            |
            v
     [User sees old shops as read-only (validated in EP-05)]
```

---

## 2. Data Model & Prisma Schema

### Core Tables

#### User Table
Stores user account information and global admin status.

```prisma
model User {
  id            String          @id @default(cuid())
  email         String          @unique
  name          String          @db.VarChar(100)
  location      Location        // HA_NOI | DA_NANG | HO_CHI_MINH (enum)
  is_admin      Boolean         @default(false)   // Global admin flag
  created_at    DateTime        @default(now())
  updated_at    DateTime        @updatedAt

  // Relations
  roles         UserRole[]      // Event-scoped roles (SELLER, BUYER)
  shops         Shop[]          // Seller's shops (EP-05)
  orders        Order[]         // User's orders (EP-07)

  @@index([email])
  @@index([location])
  @@map("users")
}

enum Location {
  HA_NOI
  DA_NANG
  HO_CHI_MINH
}
```

**Rationale:**
- Removed: `status`, `deactivated_at`, `deactivated_by`, `reactivated_at`, `reactivated_by` (no deactivation)
- Added: `is_admin` (boolean) for global admin flag (simpler than per-event UserRole)
- Simplified: Only essential fields; role determination is entirely in UserRole table

#### UserRole Table
Stores event-scoped role assignments (Seller, Buyer).

```prisma
model UserRole {
  id           String   @id @default(cuid())
  user_id      String
  event_id     String
  role         Role     // SELLER | BUYER (ADMIN is global on User.is_admin)
  assigned_at  DateTime @default(now())
  assigned_by  String?  // Reference to admin's user_id who assigned
  updated_at   DateTime @updatedAt

  // Relations
  user         User     @relation(fields: [user_id], references: [id], onDelete: Cascade)
  event        Event    @relation(fields: [event_id], references: [id], onDelete: Cascade)

  @@unique([user_id, event_id])
  @@index([event_id])
  @@index([user_id, event_id])
  @@map("user_roles")
}

enum Role {
  SELLER     // Event-scoped; can create/edit shops for this event
  BUYER      // Default role; can browse/order
}
```

**Rationale:**
- Removed: Role.ADMIN from this table (Admin is global on User.is_admin)
- Removed: `status` field (no per-event deactivation)
- Changed: Unique constraint to `(user_id, event_id)` only — every (user, event) pair has exactly one role
- Simplified: Only SELLER and BUYER; ADMIN is determined by User.is_admin
- Logic: If no UserRole exists for (user, event), user defaults to BUYER for that event

#### Event Table (Reference)
Events are created/managed in EP-02. Include these fields for coordination:

```prisma
model Event {
  id            String   @id @default(cuid())
  name          String
  description   String?
  status        EventStatus @default(DRAFT) // DRAFT | PUBLISHED | CLOSED
  start_date    DateTime
  end_date      DateTime
  donation_target Int?   // Optional target in currency units
  created_at    DateTime @default(now())
  updated_at    DateTime @updatedAt

  // Relations
  roles         UserRole[]
  shops         Shop[]   // (EP-05)

  @@index([status])
  @@map("events")
}

enum EventStatus {
  DRAFT
  PUBLISHED
  CLOSED
}
```

### Constraints & Business Rules

| Rule | Implementation |
|---|---|
| Email uniqueness | Unique index on User.email |
| At least one Admin | Enforce in app logic: count active Admins before demotion |
| One role per user per event | Unique constraint on (user_id, event_id) |
| Every (user, event) has a role | Either UserRole exists with role=SELLER, or user is BUYER by default |
| Admin role is global | Store on User.is_admin; not per-event |
| Auto-revert on event close | Delete UserRole records for closed event (implemented in EP-02 event closure handler) |

---

## 3. API Specification

### Authentication & Authorization

All endpoints require:
- **Header:** `Authorization: Bearer [JWT]` with standard claims (sub, email, iat, exp, aud, iss)
- **Validation:** Middleware checks `User.is_admin = true`
- **Response on unauthorized:** HTTP 403 Forbidden with `{ "error": "Not authorized" }`

---

### Endpoint: Get User List (US-03.04)

```
GET /api/admin/users
GET /api/admin/events/{eventId}/users

Headers:
  Authorization: Bearer [JWT]

Query Parameters:
  - event_id (required in path or query): Event ID for role context
  - search (optional): Name or email (partial, case-insensitive)
  - location (optional): Ha Noi | Da Nang | Ho Chi Minh (comma-separated for multi-select)
  - page (optional): Page number, default = 1
  - limit (optional): Results per page, default = 25, max = 100
  - sort_by (optional): name | email | location | role, default = name
  - sort_order (optional): asc | desc, default = asc

Response (200 OK):
{
  "success": true,
  "data": [
    {
      "id": "user-001",
      "name": "John Doe",
      "email": "john.doe@company.com",
      "location": "HA_NOI",
      "is_admin": false,
      "current_role": "SELLER",        // for selected event
      "role_assigned_at": "2024-03-01T10:00:00Z",
      "role_assigned_by": "admin-001"
    },
    {
      "id": "user-002",
      "name": "Jane Smith",
      "email": "jane@company.com",
      "location": "DA_NANG",
      "is_admin": true,
      "current_role": "SELLER",
      "role_assigned_at": null
    }
  ],
  "pagination": {
    "total_users": 150,
    "total_pages": 6,
    "current_page": 1,
    "page_size": 25,
    "has_next": true,
    "has_previous": false
  },
  "filters_applied": {
    "search": null,
    "location": null,
    "event_id": "event-001"
  }
}

Response (400 Bad Request):
{
  "success": false,
  "error": "Invalid page number or event_id not found"
}

Response (403 Forbidden):
{
  "success": false,
  "error": "Not authorized to view user list"
}
```

---

### Endpoint: Assign Seller Role (Bulk) (US-03.01)

```
PATCH /api/admin/events/{eventId}/users/roles/bulk

Headers:
  Authorization: Bearer [JWT]
  Content-Type: application/json

Request Body:
{
  "user_ids": [
    "user-001",
    "user-002",
    "user-003"
  ],
  "role": "SELLER"
}

Response (200 OK):
{
  "success": true,
  "assigned_count": 3,
  "failed_count": 0,
  "message": "Seller role assigned to 3 users for event [Event Name].",
  "data": {
    "event_id": "event-001",
    "event_name": "Event Name",
    "assigned_users": [
      {
        "user_id": "user-001",
        "email": "user1@company.com",
        "name": "User 1",
        "role": "SELLER"
      }
    ]
  }
}

Response (400 Bad Request - Partial Failure):
{
  "success": false,
  "assigned_count": 2,
  "failed_count": 1,
  "message": "Failed to assign role to 1 user(s). Changes rolled back.",
  "failures": [
    {
      "user_id": "user-003",
      "email": "user3@company.com",
      "error": "User does not exist"
    }
  ]
}

Response (403 Forbidden):
{
  "success": false,
  "error": "Not authorized to assign roles"
}

Response (404 Not Found):
{
  "success": false,
  "error": "Event not found"
}
```

---

### Endpoint: Assign/Change Role (Single User) (US-03.02, US-03.01 alternative)

```
PATCH /api/admin/events/{eventId}/users/{userId}/role

Headers:
  Authorization: Bearer [JWT]
  Content-Type: application/json

Request Body:
{
  "role": "SELLER" | "BUYER"
}

Response (200 OK):
{
  "success": true,
  "user_id": "user-001",
  "event_id": "event-001",
  "new_role": "SELLER",
  "assigned_by": "admin-001",
  "message": "[User Name]'s role changed to Seller for [Event Name]."
}

Response (400 Bad Request):
{
  "success": false,
  "error": "User does not exist"
  // OR
  "error": "Event not found"
  // OR
  "error": "User is already assigned this role for this event (idempotent)"
}

Response (409 Conflict):
{
  "success": false,
  "error": "User's role has been changed by another Admin. Please refresh and try again."
}

Response (403 Forbidden):
{
  "success": false,
  "error": "Not authorized to change roles"
}

Response (404 Not Found):
{
  "success": false,
  "error": "User or event not found"
}
```

---

### Endpoint: Revoke Role (US-03.02)

```
DELETE /api/admin/events/{eventId}/users/{userId}/role

Headers:
  Authorization: Bearer [JWT]

Response (200 OK):
{
  "success": true,
  "user_id": "user-001",
  "event_id": "event-001",
  "revoked_role": "SELLER",
  "new_role": "BUYER",
  "message": "Seller role revoked from [User Name] for [Event Name]. User reverted to Buyer."
}

Response (400 Bad Request):
{
  "success": false,
  "error": "User does not have Seller role for this event (already Buyer)"
}

Response (403 Forbidden):
{
  "success": false,
  "error": "Not authorized to revoke roles"
}

Response (404 Not Found):
{
  "success": false,
  "error": "User or event not found"
}
```

---

### Endpoint: Promote User to Admin (US-03.05)

```
POST /api/admin/users/{userId}/promote

Headers:
  Authorization: Bearer [JWT]

Request Body:
{} (empty)

Response (200 OK):
{
  "success": true,
  "user_id": "user-001",
  "name": "John Doe",
  "is_admin": true,
  "message": "[User Name] has been promoted to Admin."
}

Response (200 OK - Idempotent):
{
  "success": true,
  "user_id": "user-001",
  "name": "John Doe",
  "is_admin": true,
  "message": "[User Name] is already an Admin."
}

Response (400 Bad Request):
{
  "success": false,
  "error": "User does not exist"
}

Response (403 Forbidden):
{
  "success": false,
  "error": "Not authorized to promote users"
}

Response (404 Not Found):
{
  "success": false,
  "error": "User not found"
}
```

---

### Endpoint: Demote User from Admin (US-03.05 reverse)

```
DELETE /api/admin/users/{userId}/promote

Headers:
  Authorization: Bearer [JWT]

Response (200 OK):
{
  "success": true,
  "user_id": "user-001",
  "name": "John Doe",
  "is_admin": false,
  "message": "[User Name] has been demoted from Admin."
}

Response (200 OK - Idempotent):
{
  "success": true,
  "user_id": "user-001",
  "is_admin": false,
  "message": "[User Name] is not an Admin."
}

Response (400 Bad Request):
{
  "success": false,
  "error": "Cannot demote the last active Admin. Promote another user to Admin first."
}

Response (403 Forbidden):
{
  "success": false,
  "error": "Not authorized to demote users"
}

Response (404 Not Found):
{
  "success": false,
  "error": "User not found"
}
```

---

## 4. Role Model & Access Control

### Role Hierarchy

```
Admin (Global)
  ├── Can do everything
  ├── Can manage all events
  ├── Can be assigned Seller role (per-event)
  └── Includes Buyer role (default access)

Seller (Event-Scoped)
  ├── Can create and manage shop for assigned event
  ├── Cannot manage users or events
  ├── Includes Buyer role (can browse/order from own location)
  └── Reverts to Buyer when event closes or role is revoked

Buyer (Event-Scoped, Default)
  ├── Can browse shops from all locations
  ├── Can order from shops in own location
  ├── Can donate
  └── No administrative capabilities
```

### Per-Request Role Resolution

**Principle:** Role is not cached in JWT or session; it is resolved from app DB on every authenticated request.

**Implementation:**

1. User logs in → Supabase Auth returns JWT with standard claims (sub, email)
2. App receives JWT and extracts `sub` (user_id) and `email`
3. On every authenticated request:
   - Query `User` WHERE id = [sub]
   - Check `User.is_admin`: if true, set role = ADMIN for request (global, not per-event)
   - Query `UserRole` WHERE user_id = [sub] AND event_id = [current event context]
   - If UserRole exists, set role = [role from UserRole] (SELLER or BUYER)
   - If UserRole does not exist, default role = BUYER for that event
   - Set effective role: ADMIN > SELLER > BUYER (Admin users also have Seller/Buyer context per event)
4. Execute request with resolved role
5. On role change/revocation, next request sees new role (no session caching)

**Code Pattern (Next.js):**

```typescript
// middleware or route handler
async function getUserRoleForEvent(userId: string, eventId: string): Promise<Role> {
  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error('User not found');

  // Global Admin role
  if (user.is_admin) return 'ADMIN';

  // Event-scoped role
  const userRole = await db.userRole.findUnique({
    where: { user_id_event_id: { user_id: userId, event_id: eventId } }
  });

  return userRole?.role || 'BUYER';
}
```

### Access Control Matrix

| Operation | Admin | Seller | Buyer | Visitor |
|---|---|---|---|---|
| View user list | ✓ | ✗ | ✗ | ✗ |
| Assign roles | ✓ | ✗ | ✗ | ✗ |
| Revoke roles | ✓ | ✗ | ✗ | ✗ |
| Promote to Admin | ✓ | ✗ | ✗ | ✗ |
| Demote from Admin | ✓ | ✗ | ✗ | ✗ |
| Create shop | ✓* | ✓ | ✗ | ✗ |
| Browse shops | ✓ | ✓ | ✓ | ✗ |
| Order (own location) | ✓ | ✓ | ✓ | ✗ |
| View admin dashboard | ✓ | ✗ | ✗ | ✗ |

\* Admin can create shop if assigned Seller role for event (or has global Seller override).

---

## 5. Implementation Checklist

### Phase 1 — User Management (MVP)

#### Data Layer
- [ ] Implement simplified `User` table (no deactivation fields)
- [ ] Implement `UserRole` table with (user_id, event_id) unique constraint
- [ ] Remove `UserEventStatus` table (no longer needed)
- [ ] Add indexes: User(email), User(location), UserRole(event_id), UserRole(user_id, event_id)
- [ ] Add database migration to Supabase
- [ ] Seed initial Admin user (via migration or code)

#### API Layer
- [ ] Implement `GET /api/admin/users` with search, filter, pagination
- [ ] Implement `GET /api/admin/events/{eventId}/users` endpoint
- [ ] Implement `PATCH /api/admin/events/{eventId}/users/roles/bulk` with atomic transaction
- [ ] Implement `PATCH /api/admin/events/{eventId}/users/{userId}/role`
- [ ] Implement `DELETE /api/admin/events/{eventId}/users/{userId}/role`
- [ ] Implement `POST /api/admin/users/{userId}/promote` (promote to Admin)
- [ ] Implement `DELETE /api/admin/users/{userId}/promote` (demote from Admin, with last-Admin guard)
- [ ] Add middleware: authenticate Admin role for all /api/admin/* endpoints
- [ ] Add middleware: per-request role resolution (query User.is_admin + UserRole)
- [ ] Add error handling: 400/403/404 responses, validation messages
- [ ] Add server-side logging: all role changes (timestamp, admin_id, action)

#### Auth Layer (EP-01 Integration)
- [ ] Remove deactivation check from login (no longer needed)
- [ ] Ensure JWT contains only standard claims (no role/Supabase extensions)
- [ ] Update role resolution middleware to query app DB (not JWT)

#### UI Layer (Admin Dashboard)
- [ ] Implement "Manage Users" page layout (event selector, controls, table)
- [ ] Implement user list table with columns: Name, Email, Location, Current Role
- [ ] Implement search box (name/email, real-time debounce)
- [ ] Implement location filter dropdown (multi-select)
- [ ] Implement table sorting (by any column)
- [ ] Implement pagination (25 per page, previous/next)
- [ ] Implement multi-select checkboxes (bulk assignment)
- [ ] Implement context menu / inline buttons for actions (Change Role, Revoke, Promote)
- [ ] Implement confirmation dialogs (Assign, Revoke, Promote)
- [ ] Implement success/error toast messages
- [ ] Implement loading states and spinners
- [ ] Implement empty state messaging

#### Event Closure (EP-02 Integration)
- [ ] Implement auto-revert trigger in event closure handler
- [ ] When event.status → "closed", delete all UserRole records for that event with role=SELLER
- [ ] Users automatically become BUYER for that event on next request
- [ ] Verify EP-05 shop state transition (read-only access for old shops)

#### Testing
- [ ] Unit tests: role validation, Admin count checks, role reversion logic
- [ ] Integration tests: user list query + role join, bulk assignment, role change
- [ ] E2E tests: full workflows (assign, revoke, promote)
- [ ] Performance tests: load 1,500 users, search response, pagination
- [ ] Concurrency tests: simultaneous role changes
- [ ] Security tests: unauthorized access to /api/admin/*, role validation

---

### Phase 2 — Advanced Features (Deferred)

- [ ] Bulk import users via CSV
- [ ] Audit logging UI (view change history)
- [ ] Email notifications on role change
- [ ] RBAC expansion (department/team permissions)
- [ ] Azure AD SSO integration (auth provider swap)
- [ ] User detail drill-down view
- [ ] Virtual scroll for large user lists (1,500+)
- [ ] Advanced filters (date range, custom fields)
- [ ] Export user list to CSV

---

## 6. Edge Cases & Concurrency Handling

### Edge Case: Last Admin Demotion

**Scenario:** Only one Admin exists; Admin attempts to demote self or another Admin.

**Expected Behavior:**
1. UI: Confirm button disabled with message: "Cannot change [User Name]'s role. [User Name] is the last active Admin."
2. API: Return 400 Bad Request with same message

**Implementation:**
```typescript
const adminCount = await db.user.count({
  where: { is_admin: true }
});
if (adminCount <= 1 && targetUser.is_admin && !keepingAdmin) {
  throw new HttpError(400, 'Cannot demote last Admin. Promote another user to Admin first.');
}
```

### Edge Case: Bulk Assign with Invalid User

**Scenario:** Admin selects 3 users for bulk Seller assignment; User 3 does not exist.

**Expected Behavior:**
1. Validation fails for User 3: "User does not exist"
2. Entire transaction rolls back (no users assigned)
3. API returns 400 with failure details
4. User selections retained; Admin can retry or adjust selection

**Implementation:**
```typescript
async function bulkAssignRoles(userIds: string[], eventId: string, role: string) {
  const users = await db.user.findMany({ where: { id: { in: userIds } } });

  // Validate all users exist before assigning
  if (users.length !== userIds.length) {
    const notFound = userIds.filter(id => !users.find(u => u.id === id));
    throw new HttpError(400, 'Failed to assign role. Some users do not exist.', {
      failures: notFound.map(id => ({ user_id: id, error: 'User not found' }))
    });
  }

  // Atomic insert/update
  await db.$transaction(
    userIds.map(userId =>
      db.userRole.upsert({
        where: { user_id_event_id: { user_id: userId, event_id: eventId } },
        create: { user_id: userId, event_id: eventId, role },
        update: { role, updated_at: new Date() }
      })
    )
  );
}
```

### Edge Case: Concurrent Role Changes

**Scenario:** Two Admins change the same user's role simultaneously.

**Expected Behavior:**
- Last-write-wins (last PATCH request succeeds)
- Slower Admin sees 409 Conflict with message: "User's role has been changed. Please refresh."

**Implementation:**
```typescript
try {
  const updated = await db.userRole.update({
    where: { user_id_event_id: { user_id, event_id } },
    data: { role: newRole, updated_at: new Date() }
  });
} catch (error) {
  if (error.code === 'P2025') { // Record not found
    throw new HttpError(409, 'User role has already been changed by another Admin.');
  }
  throw error;
}
```

### Edge Case: User Already Assigned Seller Role

**Scenario:** Admin tries to assign Seller role to user already with Seller role for same event.

**Expected Behavior:**
- Idempotent: Return 200 OK, no change (upsert behavior)

**Implementation:**
```typescript
const userRole = await db.userRole.upsert({
  where: { user_id_event_id: { user_id, event_id } },
  create: { user_id, event_id, role: 'SELLER' },
  update: { updated_at: new Date() } // No change if already exists
});
```

### Edge Case: Auto-Revert & Manual Revocation

**Scenario:** User is Seller in Event A. Event A ends (auto-revert). Admin manually revokes before/after auto-revert.

**Expected Behavior:**
1. **If revoked before auto-revert:** UserRole is deleted, user becomes Buyer
2. **If revoked after auto-revert:** UserRole is already deleted, user is already Buyer
3. In both cases: user's shop becomes read-only; no edit access

**Implementation:**
- Auto-revert deletes UserRole for closed event
- Manual revoke also deletes UserRole
- Both result in user defaulting to BUYER for that event

### Edge Case: Event Deleted While Role Change In Flight

**Scenario:** Admin initiates role change, event is deleted before API call completes.

**Expected Behavior:**
- API returns 404 Not Found: "Event not found"
- No change is persisted

**Implementation:**
```typescript
const event = await db.event.findUnique({ where: { id: eventId } });
if (!event) {
  throw new HttpError(404, 'Event not found');
}
```

### Edge Case: Revoke Seller, User is Still Logged In

**Scenario:** User is logged in as Seller. Admin revokes Seller role. User makes API request to edit shop.

**Expected Behavior:**
1. User's next API request queries role resolution
2. UserRole is not found; user's role = BUYER
3. Shop edit endpoint checks role; returns 403 Forbidden: "You do not have permission to edit this shop"

**Implementation:**
- Per-request role resolution ensures immediate effect
- No session caching; each request re-evaluates role

---

## Implementation Notes for Offshore Development

### Async Handoff Strategy

**Assumption:** Offshore team works 8+ hours timezone difference; minimal back-and-forth.

1. **Pre-Implementation Review (Day 1):**
   - Offshore team reads this entire specification + individual user stories
   - Offshore team reviews Prisma schema and API specs
   - Team prepares: environment setup, database migrations, test data
   - Questions are batched and answered before implementation starts

2. **Database Setup:**
   - Use provided Prisma schema as-is (no deviations)
   - Create migration: `npx prisma migrate dev --name remove-deactivation-add-role-model`
   - Seed initial Admin via migration script
   - Verify indexes are created
   - **IMPORTANT:** Test unique constraint on (user_id, event_id)

3. **API Implementation Order:**
   - Start with simplest endpoint: `GET /api/admin/users` (read-only)
   - Then: `POST /api/admin/users/{userId}/promote` (promote to Admin)
   - Then: `DELETE /api/admin/users/{userId}/promote` (demote from Admin, test last-Admin guard)
   - Then: `PATCH /api/admin/events/{eventId}/users/{userId}/role` (single role change)
   - Then: `DELETE /api/admin/events/{eventId}/users/{userId}/role` (revoke)
   - Finally: `PATCH /api/admin/events/{eventId}/users/roles/bulk` (most complex, atomic transaction)

4. **Auth Middleware:**
   - Implement per-request role resolution function
   - Add to app/middleware.ts or api route handlers
   - Test: Admin role resolution from User.is_admin
   - Test: Event-scoped role resolution from UserRole
   - Test: role changes take effect on next request (no caching)

5. **Error Handling:**
   - Return structured error responses (see API spec)
   - Include validation details in 400 responses
   - Distinguish 400 (validation), 403 (auth), 404 (not found), 409 (conflict)

6. **Logging:**
   - Log all role changes to server logs (not visible in UI Phase 1)
   - Log format: `[timestamp] [admin_id] [action] [user_id] [event_id] [new_role]`
   - Useful for Phase 2 audit logging UI

7. **Testing:**
   - Run unit + integration tests before submitting PR
   - Include concurrency test: simulate two simultaneous role changes
   - Include last-Admin guard test
   - Mock Supabase Auth for JWT validation tests
   - **KEY:** Test auto-revert trigger (coordinate with EP-02 event closure)

8. **Code Review Checklist:**
   - [ ] All endpoints return correct HTTP status codes
   - [ ] All validations match spec (last Admin guard, etc.)
   - [ ] Atomic transactions for bulk operations
   - [ ] Timezone-aware timestamps (use UTC)
   - [ ] No hardcoded strings; use constants or error enums
   - [ ] Error messages match spec verbatim
   - [ ] Prisma queries optimized (no N+1)
   - [ ] Indexes match spec
   - [ ] Deactivation-related code completely removed

---

## Implementation Tracking

Use this checklist to track implementation progress:

- [ ] Requirements read and understood by offshore team
- [ ] Database schema created and migrated (deactivation removed)
- [ ] Initial Admin user seeded
- [ ] GET /api/admin/users endpoint implemented and tested
- [ ] POST /api/admin/users/{userId}/promote endpoint implemented and tested
- [ ] DELETE /api/admin/users/{userId}/promote endpoint implemented and tested (with last-Admin guard)
- [ ] PATCH /api/admin/events/{eventId}/users/{userId}/role endpoint implemented and tested
- [ ] DELETE /api/admin/events/{eventId}/users/{userId}/role endpoint implemented and tested
- [ ] PATCH /api/admin/events/{eventId}/users/roles/bulk endpoint implemented and tested
- [ ] Per-request role resolution middleware implemented
- [ ] Auto-revert trigger on event closure implemented (EP-02 integration)
- [ ] Admin dashboard UI implemented (list, search, filter, sort, pagination)
- [ ] Bulk assignment UI implemented
- [ ] Role change dialog implemented
- [ ] Promotion dialog implemented
- [ ] Revocation dialog implemented
- [ ] Confirmation dialogs implemented for all actions
- [ ] Error messages displayed correctly
- [ ] Success messages displayed correctly
- [ ] All user stories tested (acceptance criteria)
- [ ] Edge cases tested (last Admin, concurrent changes)
- [ ] Performance tested (1,500 users)
- [ ] Security tested (unauthorized access, role validation)
- [ ] Code review completed
- [ ] Ready for UAT
