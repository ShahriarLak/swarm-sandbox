# PRD: PulsePilot MVP

**Status:** Draft  
**Owner:** Shahriar  
**Stakeholders:** Eng Lead, Design, CS  
**Linked Theme:** /themes/mvp  
**Linked Roadmap Item (if any):** RP-1

---

## 1) Problem & Context
Teams struggle to turn customer feedback into prioritized, shippable work. PulsePilot gives a simple “tasks-from-PRD” flow that keeps everyone aligned while shipping fast.

## 2) Users & JTBD
- **Primary user:** Solo founder / small team PM.
- **JTBD:** “Turn messy notes into a clear plan and a few tasks I can ship this week.”

## 3) Goals & Non-Goals
**Goals**
- Show a clean marketing page that communicates value.
- Provide a minimal dashboard shell to demo the product direction.
- Capture early interest (waitlist form or CTA).

**Non-Goals**
- Full feedback ingestion pipeline.
- Multi-tenant auth or billing.

## 4) Solution Overview
- Landing page with: hero, logo strip, features, pricing, FAQ, footer.
- Navbar with links to **Home** and **/dashboard**.
- Basic analytics (Vercel Analytics/Insights) to measure visitors.

## 5) Scope
**In scope**
- Home page and dashboard shell
- Basic tests (navbar + FAQ)
- CI checks run and pass

**Out of scope**
- Auth, full data model, integrations

## 6) Success Metrics
- 50 unique visitors and 10+ waitlist signups in the first week
- PR build and production deploy are green

## 7) Risks & Assumptions
- Assumption: traffic from founder networks will be enough to validate messaging.
- Risk: generic positioning; we’ll iterate fast based on early feedback.

## 8) Release Plan
- Ship MVP to production behind “PulsePilot” domain
- Post to founder communities; collect feedback; iterate

---

## Tasks
- [ ] Implement marketing sections (hero, logo strip, features, pricing, FAQ, footer)
- [ ] Navbar with link to `/dashboard`
- [ ] Enable Vercel Analytics/Insights
- [ ] Add two Vitest tests (navbar render, FAQ toggle)
- [ ] Update README with MVP overview and link to this PRD
