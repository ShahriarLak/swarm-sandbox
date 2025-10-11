# PRD: PulsePilot MVP v1

**Status:** Draft | Review | Final → **Draft**  
**Owner:** Shahriar  
**Stakeholders:** Eng Lead, Design, CS, Sales  
**Linked Theme:** /themes/pulsepilot-mvp  
**Linked Roadmap Item (if any):** /roadmap/mvp-v1

---

## 1) Problem & Context

**Problem statement:**  
B2B SaaS teams scatter customer feedback across Slack, email, meetings, and spreadsheets. PMs struggle to turn this into a clear roadmap and a consistent release cadence. Result: slow decisions, missed opportunities, and weak “what shipped” storytelling.

**Who:**  
- Primary: Founders/PMs at early-stage B2B SaaS (5–100 employees).  
- Secondary: Eng leads who want clarity on priorities & shipped work.

**When/where:**  
- During customer calls, support chats, sales discussions, and internal standups.

**Why now:**  
Teams want a lightweight alternative to heavyweight PM suites. We can ship a focused MVP quickly (1–2 weeks of dev per slice) and validate value.

---

## 2) Goals / Non-Goals

**Goals (MVP v1):**  
1. Centralize product work: a simple **Kanban board** (Todo / Doing / Done).  
2. Log **feedback notes** and link them to roadmap items.  
3. Auto-generate a **public changelog** from Done items.  
4. Provide a clean **marketing landing page** that points to the app.

**Non-Goals (defer):**  
- Multi-workspace/org support.  
- Deep integrations (Slack/Intercom/HubSpot/Linear).  
- Advanced permissions or SSO.  
- Complex analytics dashboards.

---

## 3) Success Metrics (MVP-level)

- **Activation:** First-time users create ≥1 board item and 1 feedback note in the first session.  
- **Engagement:** ≥3 items moved to “Done” in week 1 by a new team.  
- **Value signal:** ≥1 changelog entry published (public URL) in week 1.  
- **Qualitative:** 3+ users say it’s faster to share “what shipped” vs. their prior process.

---

## 4) Scope (MVP v1)

### 4.1 Core UX Flows
- **Landing page** → Sign in / Go to app.
- **Board**: Create, edit, move items across Todo / Doing / Done.
- **Feedback**: Add quick notes; link notes to items.
- **Changelog**: Public page generated from “Done” items (title, date, summary, tags).

### 4.2 Entities
- **Item** (id, title, description, status [todo|doing|done], tags, createdAt, updatedAt, linkedFeedbackIds[]).  
- **Feedback** (id, source [manual], author, body, createdAt, linkedItemId?).  
- **Changelog Entry** (derived from “Done” items: id, title, date, tags, summary).

### 4.3 Pages & URLs
- `/` — Marketing landing page (hero, features, CTA to dashboard)  
- `/dashboard` — Board (Todo/Doing/Done), new-item input, list of items  
- `/feedback` — Simple list + “Add note” (textarea + link-to-item)  
- `/changelog` — Public page listing Done items (reverse-chronological)  

---

## 5) Requirements (User Stories)

**P0 (Must have)**  
- As a user, I can create a board item with title + description.  
- As a user, I can drag or set item status to Todo/Doing/Done.  
- As a user, I can add a feedback note and optionally link it to an item.  
- As a user, I can see a `/changelog` page generated from items in “Done” (title, date, optional summary).  
- As a visitor, I can view the landing page and navigate to `/dashboard`.

**P1 (Nice to have, if time allows)**  
- Tags on items (string array) and simple filter by tag.  
- Markdown description for items.  
- Basic “release notes” summary field on items (shown in changelog).

**Out of scope (later)**  
- Multi-projects, orgs, advanced auth/SSO.  
- Email/Slack ingest for feedback.  
- Analytics charts.

---

## 6) UX Notes

- Keep visuals minimal (Tailwind).  
- Board shows three columns; new items default to **Todo**.  
- Feedback form is one text area + optional item selector.  
- Changelog uses a simple list card per entry (title, date, summary, tag chips).

---

## 7) Technical Notes

- Next.js App Router (already set up).  
- Keep data in simple in-memory array or lightweight file-based store for MVP;  
  (We’ll move to Postgres/Supabase later).  
- Export minimal server actions (or API routes) for CRUD.  
- Derive `/changelog` entries at request time from “Done” items.

---

## 8) Risks & Mitigations

- **Risk:** MVP feels too basic.  
  **Mitigation:** Tight scoping, clear storytelling on landing page, publish /changelog quickly to show momentum.  
- **Risk:** Data persistence (in-memory) resets on redeploy.  
  **Mitigation:** Acceptable for MVP demo; plan Supabase in v2.

---

## 9) Milestones & Timeline

- **M1 (Today + 2–3 days):**  
  - Landing page (hero, features, footer)  
  - Board with create/edit/move  
  - Minimal data store (in-memory)  

- **M2 (Next 2 days):**  
  - Feedback page + link to items  
  - Basic tags & filters (optional)

- **M3 (Next 1 day):**  
  - Changelog page pulling from “Done” items  
  - “Release notes” summary field on item (optional)

---

## 10) Rollout & Validation

- Share `/changelog` URL with 3–5 target founders.  
- Capture feedback via a simple Typeform link in the footer (or email).  
- Track: number of items created, moved to Done, and changelog entries over 1 week.

---

## 11) Open Questions

- Do we need basic auth now (magic link) or can we keep it open for demo?  
- Do we need persistence (Supabase) before inviting external testers?

