# NT Green Market — Project Overview

## What is NT Green Market?

NT Green Market is a company-wide, month-long initiative that brings employees together around sustainability, community, and giving back. The platform serves as the digital hub for the event, enabling employees to participate in multiple ways.

## Goals

- **Raise money for charity** — all profits and donations fund charitable organizations
- Foster a sense of community and social responsibility among employees
- Provide a platform for employee creativity and entrepreneurship
- Create a fun, engaging internal marketplace experience that drives participation

## Event Format

- Physical flea market event, runs for ~2 months, held twice a year
- The app supports the event digitally: employees set up shops, browse, and **pre-order** products ahead of the physical market day
- Orders are collected as **pick-up only** at the physical market — no online payment, no delivery
- App is dormant between events

## Audience & Scale

- Internal use only — NashTech employees
- **Target demographics:** Gen Z and late Gen Y
- Expected user base: up to ~1,500 users
- **Design implication:** Playful, mobile-first, mission-driven tone (not corporate)

## Deployment Strategy

- **Phase 1 (Pilot):** Free hosting (e.g. Vercel + Supabase) — small user set, validate the concept
- **Phase 2 (Full scale):** Migrate to Azure (company infrastructure) for production rollout to all ~1,500 employees

## Users / Roles

- **Employee (Buyer)** — browses shops, places orders, donates to charity
- **Employee (Seller)** — creates and manages their own shop, lists products
- **Admin** — manages the event, oversees shops, charities, and orders

## Epics

| ID | Epic | Description | Priority |
|---|---|---|---|
| EP-01 | User Authentication & Access | Self-registration, login, and role-based access (Buyer, Seller, Admin) | High |
| EP-02 | Manage Event | Configure, publish, and close the event lifecycle | High |
| EP-04 | Direct Donations | Anyone can donate to the event charity fund; progress bar and leaderboard | High |
| EP-05 | Shop & Product Management | Sellers create and manage their shops and product listings | High |
| EP-07 | Browse & Order | Discover products, place orders, and track them to pick-up | High |
| EP-03 | Manage Users | Assign Seller and Admin roles per event; manage user access | High |
| EP-08 | Event Timeline & Countdown | Event schedule and countdown visible to all visitors | Medium |
| EP-09 | Lucky Draw | *(Deferred)* Earn draw entries through purchases and donations | Low |

> Full epic details and user stories are in [Epics/](Epics/).

## Out of Scope

- Online payment — confirmed out of scope; pick-up at physical market only
- Delivery / shipping — pick-up only
- Inventory / stock management

---

> **Note:** Items marked TBD should be confirmed with stakeholders before development begins.
