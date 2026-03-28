Home Page Information Hierarchy — NT Green Market
The home page uses a single adaptive URL — content is layered based on auth state and role. Content is stacked top-to-bottom in priority order.

Visitor (unauthenticated)
The goal: spark curiosity, drive donations and sign-ups. No login required.

Priority	Section	Content	Source
1	Hero / Event Banner	Event name, tagline, dates — sets the scene immediately	EP-08
2	Event Countdown	Days/hours remaining until market day	EP-08
3	Global Donation Progress Bar	Total raised vs target — energetic, celebratory fill	EP-04
4	Per-Location Breakdown	Ha Noi / Da Nang / Ho Chi Minh progress — friendly competition	EP-04
5	Top Donors Leaderboard	Display names + amounts — social proof, motivation	EP-04
6	Donate CTA	Prominent call to action — no login required	EP-04
7	Sign Up / Log In CTA	Secondary CTA — "Join the market, browse shops"	EP-06
Rationale: Visitors need to understand the mission instantly, feel the momentum (progress bar), be motivated socially (leaderboard), and have a clear next action (donate or sign up).

Buyer (logged-in, no seller role)
The goal: continue participation — browse, order, donate.

Priority	Section	Content	Source
1	Event Countdown	Days/hours to market day — urgency for ordering	EP-08
2	Basket Summary	Item count + "Go to basket" shortcut	EP-06
3	Featured Shops	Curated/random shops from buyer's location — quick browse entry point	EP-06
4	Global Donation Progress Bar	Continued motivation to donate	EP-04
5	Per-Location Breakdown	Office competition — motivates location loyalty	EP-04
6	Top Donors Leaderboard	Social proof	EP-04
7	Donate CTA	Persistent — every user can donate	EP-04
Rationale: Basket summary is surfaced early because buyers with items in their basket are close to converting — reducing friction here is high value. Featured shops follow to re-engage browsing. Donation content is retained but de-prioritized behind transactional actions.

Seller (logged-in, has seller role)
The goal: monitor their shop, respond to orders, stay informed.

Priority	Section	Content	Source
1	My Shop Status Card	Shop open/closed toggle, recent order count, link to shop dashboard	EP-06, EP-05
2	Event Countdown	Days remaining — deadline urgency for shop readiness	EP-08
3	Featured Shops	Browse other sellers' shops (inspiration / awareness)	EP-06
4	Global Donation Progress Bar	Event pulse	EP-04
5	Per-Location Breakdown	Location pride	EP-04
6	Top Donors Leaderboard	Community engagement	EP-04
7	Donate CTA	Sellers can also donate	EP-04
Rationale: Sellers' most critical daily action is managing their shop and responding to orders. The shop status card must be immediately visible — no navigation required (US-06.03). The basket summary from the buyer view is removed as sellers are not primarily buyers on this page.

Admin
The goal: get to the dashboard immediately.

Priority	Section	Content	Source
1	Auto-redirect to Admin Dashboard	No home page — redirect on login	EP-06, EP-02
Rationale: Admins have no use for the public home page content. EP-06 explicitly specifies auto-redirect. The admin dashboard (EP-02) is their operational home.

Summary View
Section	Visitor	Buyer	Seller	Admin
Hero / Event Banner	✓ (1st)	—	—	—
Event Countdown	✓ (2nd)	✓ (1st)	✓ (2nd)	—
Basket Summary	—	✓ (2nd)	—	—
My Shop Status Card	—	—	✓ (1st)	—
Featured Shops	—	✓ (3rd)	✓ (3rd)	—
Global Donation Progress	✓ (3rd)	✓ (4th)	✓ (4th)	—
Per-Location Breakdown	✓ (4th)	✓ (5th)	✓ (5th)	—
Top Donors Leaderboard	✓ (5th)	✓ (6th)	✓ (6th)	—
Donate CTA	✓ (6th)	✓ (7th)	✓ (7th)	—
Sign Up / Log In CTA	✓ (7th)	—	—	—
Admin Redirect	—	—	—	✓