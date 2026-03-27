# NT Green Market — Project Overview

## What is NT Green Market?

NT Green Market is a company-wide, month-long initiative that brings employees together around sustainability, community, and giving back. The platform serves as the digital hub for the event, enabling employees to participate in multiple ways.

## Goals

- Foster a sense of community and social responsibility among employees
- Provide a platform for employee creativity and entrepreneurship
- Support charitable causes through fundraising
- Create a fun, engaging internal marketplace experience

## Event Format

- Physical flea market event, runs for ~2 months, held twice a year
- The app supports the event digitally: employees set up shops, browse, and **pre-order** products ahead of the physical market day
- Orders are collected as **pick-up only** at the physical market — no online payment, no delivery
- App is dormant between events

## Audience & Scale

- Internal use only — NashTech employees
- Expected user base: up to ~1,500 users

## Deployment Strategy

- **Phase 1 (Pilot):** Free hosting (e.g. Vercel + Supabase) — small user set, validate the concept
- **Phase 2 (Full scale):** Migrate to Azure (company infrastructure) for production rollout to all ~1,500 employees

## Users / Roles

- **Employee (Buyer)** — browses shops, places orders, donates to charity
- **Employee (Seller)** — creates and manages their own shop, lists products
- **Admin** — manages the event, oversees shops, charities, and orders

## Epics

| ID | Epic | Description |
|---|---|---|
| EP-01 | User Authentication & Access | Login and role-based access for Buyers, Sellers, and Admins |
| EP-02 | Admin - Manage Event | Admins configure and oversee the event lifecycle |
| EP-03 | Admin - Manage Users | Admins manage employee accounts and role assignments |
| EP-04 | Donations | Employees browse and donate to participating charities |
| EP-05 | Seller - Shop & Product Management | Sellers create and manage their shops and product listings |
| EP-07 | Buyer - Browse & Order | Buyers discover products, place orders, and track them to fulfilment |
| EP-08 | Event Timeline & Countdown | Event schedule and countdown displayed to all users |
| EP-09 | Game | In-platform game or activity to encourage employee participation |

> Full epic details and user stories are in [Epics/](Epics/).

## Out of Scope

- Online payment — confirmed out of scope; pick-up at physical market only
- Delivery / shipping — pick-up only
- Inventory / stock management

---

> **Note:** Items marked TBD should be confirmed with stakeholders before development begins.
