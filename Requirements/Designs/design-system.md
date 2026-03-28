# NT Green Market — Design System

**Based on:** NashTech Global brand identity + Gen Z/late Gen Y aesthetic
**Stack:** Next.js 14 · Tailwind CSS · shadcn/ui
**Style:** Modern Corporate meets Gen Z — playful, mobile-first, mission-driven
**Core Purpose:** Charity fundraising platform (all profits → charities)
**Target Users:** Gen Z & late Gen Y (expect casual tone, animations, social features)

---

## 1. Color Palette

### Brand Colors

| Token | Name | Hex | Usage |
|---|---|---|---|
| `--color-primary` | NashTech Red | `#D6001C` | Primary CTAs, links, active states |
| `--color-primary-hover` | Red Hover | `#BD0019` | Button hover, focus ring |
| `--color-primary-dark` | Red Dark | `#A70218` | Pressed state |
| `--color-secondary` | NashTech Purple | `#6A1F7A` | Secondary accents, badges, gradients |
| `--color-accent` | Market Green | `#2D7A4F` | Sustainability accent, success states, Seller badges |

### Neutrals

| Token | Name | Hex | Usage |
|---|---|---|---|
| `--color-gray-900` | Dark Navy | `#2A2E3A` | Headings, primary text |
| `--color-gray-700` | Dark Gray | `#4E5761` | Body text, secondary content |
| `--color-gray-500` | Medium Gray | `#6C7685` | Muted text, placeholders |
| `--color-gray-400` | Light Gray | `#99A4B5` | Disabled states, hints |
| `--color-gray-200` | Border Gray | `#D9D9D9` | Dividers, borders |
| `--color-gray-50` | Off-white | `#F6F7F8` | Card backgrounds, section fills |
| `--color-white` | White | `#FFFFFF` | Page background, card surfaces |

### Semantic Colors

| Token | Hex | Usage |
|---|---|---|
| `--color-success` | `#2D7A4F` | Order confirmed, donation success |
| `--color-warning` | `#F4AD33` | Pending orders, event countdown |
| `--color-info` | `#0094D5` | Informational banners, tips |
| `--color-error` | `#D6001C` | Form errors, destructive actions |

### Gradients

| Name | Value | Usage |
|---|---|---|
| Brand gradient | `linear-gradient(270deg, #D6001C 13%, #6A1F7A 98%)` | Hero banners, page headers |
| Green tint | `linear-gradient(135deg, #2D7A4F, #48A570)` | Seller cards, donation sections |
| Dark overlay | `linear-gradient(180deg, rgba(18,18,22,0.5), rgba(18,18,22,0.7))` | Image overlays |

---

## 2. Typography

### Fonts

| Role | Font | Source |
|---|---|---|
| Headings | **Mulish** | Google Fonts |
| Body | **Inter** | Google Fonts |

```css
@import url('https://fonts.googleapis.com/css2?family=Mulish:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');
```

### Type Scale

| Token | Size | Weight | Usage |
|---|---|---|---|
| `text-5xl` | 48px | 700 | Hero headings |
| `text-4xl` | 36px | 700 | Page titles |
| `text-3xl` | 30px | 600 | Section headings |
| `text-2xl` | 24px | 600 | Card headings |
| `text-xl` | 20px | 600 | Sub-headings |
| `text-lg` | 18px | 500 | Lead text |
| `text-base` | 16px | 400 | Body text |
| `text-sm` | 14px | 400 | Secondary text, labels |
| `text-xs` | 12px | 400 | Captions, badges |

**Line heights:** Body `1.65` · Headings `1.2` · Labels `1.4`

---

## 3. Spacing

Base unit: **4px** (Tailwind default).

| Token | Value | Usage |
|---|---|---|
| `space-1` | 4px | Icon gaps |
| `space-2` | 8px | Inline gaps |
| `space-3` | 12px | Tight padding |
| `space-4` | 16px | Standard padding |
| `space-6` | 24px | Card padding |
| `space-8` | 32px | Section inner padding |
| `space-12` | 48px | Section spacing |
| `space-16` | 64px | Large section spacing |

---

## 4. Border Radius

Minimal rounding to match NashTech corporate aesthetic.

| Token | Value | Usage |
|---|---|---|
| `rounded-sm` | 2px | Badges, tags |
| `rounded` | 4px | Buttons, inputs |
| `rounded-md` | 6px | Cards |
| `rounded-lg` | 8px | Modals, dropdowns |
| `rounded-full` | 9999px | Avatar, pill badges |

---

## 5. Shadows

| Token | Value | Usage |
|---|---|---|
| `shadow-sm` | `0 1px 3px rgba(15,15,26,0.08)` | Subtle lift |
| `shadow-md` | `0 4px 16px rgba(15,15,26,0.1)` | Cards |
| `shadow-lg` | `0 10px 40px rgba(15,15,26,0.12)` | Modals, popovers |

---

## 6. Gen Z / Late Gen Y Design Considerations

### Tone & Copy
- **Avoid:** Corporate jargon, formal language, numbered steps
- **Use:** Casual, authentic, mission-focused messaging
- **Examples:**
  - ❌ "Process your donation" → ✅ "Help out"
  - ❌ "Seller account management" → ✅ "My shop"
  - ❌ "Order status: pending" → ✅ "Almost ready 🎉"

### Visual Style
- **Embrace movement:** Smooth hover effects, micro-interactions, skeleton loaders
- **Use vibrant accents:** The green accent (#2D7A4F) should be prominent and energetic
- **Icons over text:** Use clear, friendly SVG icons (Lucide) for navigation
- **Social proof:** Show donation totals, participant counts, leaderboards

### Mobile Experience (PRIORITY)
- **Bottom navigation:** For buyers/sellers — easier thumb access
- **Large touch targets:** 48px+ buttons
- **Minimal scrolling:** Content should fit viewport depth
- **Fast interactions:** Instant feedback on donations/orders

### Gamification Elements (EP-09)
- Leaderboard showing top donors/sellers
- Achievement badges ("Donated $100", "Sold 10 items")
- Progress bars showing event/charity goals
- Streak counter for daily engagement

### Charity Impact Visualization
- Show real impact: "$50 = 10 meals" messages
- Live counter of donations/products sold
- Charity stories with photos/quotes
- Urgency: "2 days left to help" countdown

---

## 8. Components

### Buttons

| Variant | Style | Usage |
|---|---|---|
| `primary` | Red fill → brand gradient on hover, white text | Primary actions (Place Order, Donate) |
| `secondary` | Red border, red text, transparent | Secondary actions |
| `ghost` | No border, gray text | Tertiary actions |
| `success` | Green fill, white text | Confirm order, Shop open |
| `destructive` | Dark red fill | Delete shop, Cancel |

- Min height: **44px** (touch target)
- Padding: `12px 24px`
- Border radius: `rounded` (4px)
- Transition: `150ms ease`
- Disabled: `opacity-50 cursor-not-allowed`

### Cards

- Background: `white`
- Border: `1px solid #D9D9D9`
- Border radius: `rounded-md` (6px)
- Shadow: `shadow-md`
- Padding: `24px`
- Hover: `shadow-lg` + `translateY(-2px)` transition `200ms`

### Badges / Role Labels

| Badge | Color | Usage |
|---|---|---|
| Buyer | Blue `#0094D5` | Buyer role indicator |
| Seller | Green `#2D7A4F` | Seller role indicator |
| Admin | Purple `#6A1F7A` | Admin role indicator |
| Pending | Amber `#F4AD33` | Order pending |
| Confirmed | Green `#2D7A4F` | Order confirmed |
| Ready | Blue `#0094D5` | Ready for pick-up |
| Completed | Gray `#6C7685` | Order completed |

### Navigation

- Position: sticky top
- Background: white with `shadow-sm` on scroll
- Logo: left-aligned
- Nav links: right-aligned, role-based visibility
- Mobile: hamburger menu
- Active link: red underline `#D6001C`

### Forms / Inputs

- Background: `#F6F7F8` (gray-50)
- Border: none on sides/top — **bottom border only**, `2px solid #D9D9D9` default
- Border radius: `0` (flat, no rounding)
- Height: `52px` minimum
- Label: **floating** — sits inside field as placeholder, animates to top-left small on focus/fill
- Label default: `16px #99A4B5` (gray-400)
- Label floated: `12px #6C7685` (gray-500)
- Focus: bottom border replaced by **brand gradient** (`linear-gradient(270deg, #D6001C, #6A1F7A)`)
- Error state: red bottom border + red helper text below
- Dropdown: same field style + right-aligned chevron icon

---

## 7. Iconography

- **Library:** Lucide React (ships with shadcn/ui)
- **Size:** `16px` (inline), `20px` (buttons), `24px` (standalone)
- **No emojis** as UI icons — SVG only

---

## 9. Accessibility

- Minimum contrast: **4.5:1** for normal text, **3:1** for large text
- All interactive elements: visible focus ring (`ring-2 ring-primary`)
- Touch targets: minimum **44×44px**
- Form inputs: always paired with a `<label>`
- Images: always include `alt` text
- Respect `prefers-reduced-motion` — disable animations for users who opt out

---

## 10. Responsive Breakpoints

| Breakpoint | Width | Target |
|---|---|---|
| `sm` | 640px | Large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Wide screens |

Container max-width: **1280px** (`max-w-7xl`)

---

## 11. Motion

- Micro-interactions: `150ms ease`
- Card hover / page transitions: `200-300ms ease`
- Use `transform` and `opacity` only — never animate `width` or `height`
- Skeleton loaders for async content (avoid layout shift)
