# THE NAIL ATELIER

A luxury nail & spa booking platform: public website, customer accounts, an admin
dashboard, and an AI concierge ("Atelier AI") that answers only from your real
business data. Full-stack MERN (MongoDB, Express, React, Node), styled to the
provided reference (ivory/cream/champagne-gold/blush palette, Playfair Display +
Inter).

## What's real in this build

Everything below is wired end-to-end against a real database — nothing here is
a stub or a fake response.

- **Auth** — JWT-based register/login, role-based access (customer/admin), password change
- **Booking** — multi-step flow, real slot generation from business hours, real conflict
  checking (no double-booking), real appointment records
- **Public site** — Home, About, Services (+ detail pages), Gallery, Spa & Wellness,
  Bridal Packages, Offers, Reviews (with customer submission), Contact (real form → DB),
  legal pages (editable from admin, not hard-coded)
- **Customer dashboard** — upcoming appointments, appointment history + cancellation,
  profile editing, password change
- **Admin dashboard** — live stats (today's appointments, pending/confirmed counts,
  revenue, popular services) with real charts from real data; full CRUD for services,
  gallery, offers, bridal packages, reviews (approve/reject), AI knowledge (FAQs),
  contact messages, and business settings
- **Atelier AI concierge** — floating chat widget wired to a real `POST /api/ai/chat`
  endpoint that calls the Claude API. It only ever answers from services/policies/FAQs
  pulled live from your database that turn — it cannot invent a price, hour, or
  promotion, and it says so explicitly when it doesn't have an answer. It understands
  English, Urdu, and Roman Urdu, and never claims to complete a booking itself (it
  routes to the real booking page instead)

## What's intentionally not in this build (v1 scope)

The original spec asks for a lot more than one build can responsibly deliver as
genuine, tested functionality. Rather than fake these, they're left out and noted
here as a clear v2 roadmap:

- **Payments / deposits** — no Stripe (or other) integration. Booking creates a
  `pending` appointment; taking real payment needs a payment provider's API keys.
- **Gift cards** — no purchase/redemption flow (this needs payment processing too).
- **Staff/technician assignment** — appointments aren't assigned to a specific stylist.
- **Loyalty points, notifications (email/SMS), audit logs** — not implemented.
- **AI-driven booking** — the concierge recommends and navigates to the booking page,
  but doesn't create/modify bookings via tool-calling from inside the chat.
- **Formal accessibility/security audit** — sensible defaults are in place (semantic
  HTML, focus states, rate limiting, Helmet, input validation) but this hasn't gone
  through a WCAG audit or a security review.

## Project structure

```
nail-atelier/
├── server/                 Express + MongoDB API
│   ├── src/
│   │   ├── config/          Database connection
│   │   ├── models/          Mongoose schemas
│   │   ├── middleware/      Auth, rate limiting, error handling
│   │   ├── controllers/     Route logic
│   │   ├── routes/          Express routers
│   │   ├── utils/           AI context retrieval, JWT helper
│   │   └── seed/            Sample data + admin account
│   ├── server.js
│   └── .env.example
└── client/                 React (Vite) + Tailwind CSS
    └── src/
        ├── api/              Axios client + endpoint functions
        ├── context/          Auth context
        ├── components/       Shared UI, layout, AI widget, admin table
        ├── layouts/          Public / customer / admin shells
        └── pages/            All routed pages
```

## Setup

**Prerequisites:** Node.js 18+, and a MongoDB instance (local, or a free
[MongoDB Atlas](https://www.mongodb.com/atlas) cluster), and an
[Anthropic API key](https://console.anthropic.com) for the AI concierge.

### 1. Backend

```bash
cd server
npm install
cp .env.example .env
# edit .env: set MONGO_URI, JWT_SECRET, and AI_API_KEY at minimum
npm run seed     # creates sample services/gallery/offers/FAQs + an admin account
npm run dev      # starts the API on http://localhost:5000
```

The seed script prints the admin login it creates (default
`admin@nailatelier.test` / `ChangeMe123!` unless you change `ADMIN_EMAIL` /
`ADMIN_PASSWORD` in `.env` first) — **change that password before deploying.**

### 2. Frontend

```bash
cd client
npm install
cp .env.example .env    # defaults to http://localhost:5000/api, adjust if needed
npm run dev              # starts the site on http://localhost:5173
```

Visit `http://localhost:5173`. Log in with the seeded admin account to reach
`/admin`, or register a new account to use the customer dashboard.

### 3. Production build

```bash
cd client && npm run build   # outputs client/dist — serve as static files
cd server && npm start       # run the API with a process manager (pm2, etc.)
```

## Notes on the AI concierge

- Uses `@anthropic-ai/sdk` server-side; the API key never reaches the browser.
- Every reply is grounded in services, FAQs, and policies fetched fresh from
  MongoDB for that message (simple keyword matching — not a vector database,
  but genuinely live data, not hard-coded text).
- Rate-limited (30 messages / 5 minutes / IP) and capped at 800 characters per message.
- Change the assistant's name, welcome message, and quick actions from
  **Admin → Settings** — no code changes or redeploy needed.
- Default model is `claude-sonnet-5` (set via `AI_MODEL` in `server/.env`); swap in
  a smaller model there if you want lower per-message cost.

## Images

Gallery/service photos are seeded with placeholder images (via picsum.photos) —
they are not real salon photography. Replace them with your own via
**Admin → Services** and **Admin → Gallery** (paste an image URL, or adapt the
upload flow to your preferred storage if you want direct uploads).
