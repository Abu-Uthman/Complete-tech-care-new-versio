# CTC Smart-Hands

> Rapid-response regional VIC smart-hands services for MSPs & retail vendors

**Complete Tech Care (CTC)** provides 4-hour on-site response to Bendigo, Ballarat, Shepparton, Wodonga, and Latrobe, plus friendly IT support for Melbourne homes & small businesses.

---

## Project Architecture

**Headless CMS Approach:**

```
┌────────────────────┐         REST API (HMAC)          ┌──────────────────────┐
│  Next.js Frontend  │  ───────────────────────────────►  │  WordPress Backend   │
│  localhost:3000    │                                   │  ctcbackend.local    │
│  - Public pages    │  ◄───────────────────────────────  │  - Custom plugin     │
│  - Booking form    │         JSON Response             │  - Bookings DB       │
│  - Admin dashboard │                                   │  - Notifications     │
└────────────────────┘                                   └──────────────────────┘
```

---

## Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS + shadcn/ui
- **Package Manager:** pnpm
- **Deployment:** Vercel

### Backend
- **CMS:** WordPress 6.6+
- **PHP:** 8.2+
- **Plugin:** Custom `ctc-smart-hands`
- **Database:** MySQL 8.0
- **Environment:** Local by Flywheel (dev)

### Authentication
- **Method:** HMAC SHA-256 (server-to-server)
- **Headers:** X-CTC-Key, X-CTC-Timestamp, X-CTC-Signature

### Notifications
- **Email:** WordPress wp_mail (SMTP)
- **SMS:** Twilio API

---

## Quick Start

### Prerequisites

- **WordPress:** Local by Flywheel with PHP 8.2+
- **Node.js:** v20+ (for Next.js 15)
- **pnpm:** Latest version

```bash
# Install pnpm if not already installed
npm install -g pnpm
```

### 1. WordPress Setup

1. Ensure Local by Flywheel site is running at `ctcbackend.local`
2. Activate the `ctc-smart-hands` plugin:
   - Navigate to WordPress admin → Plugins
   - Activate "CTC Smart-Hands"
3. Configure plugin settings:
   - Settings → CTC Rates (set hourly rates, travel model)
   - Settings → CTC Notifications (SMTP, Twilio credentials)
   - Settings → CTC API (generate API key and secret)

### 2. Next.js Setup

```bash
cd frontend

# Install dependencies with pnpm
pnpm install

# Create .env.local file
cp .env.example .env.local

# Edit .env.local with your credentials
# CTC_WP_API_BASE=http://ctcbackend.local/wp-json/ctc/v1
# CTC_API_KEY=your-key-from-wp-admin
# CTC_API_SECRET=your-secret-from-wp-admin

# Start development server
pnpm dev
```

### 3. Access the Application

- **Frontend:** http://localhost:3000
- **WordPress Admin:** http://ctcbackend.local/wp-admin
- **API Endpoint:** http://ctcbackend.local/wp-json/ctc/v1

---

## Project Structure

```
ctc_project/
├── app/public/                    # WordPress installation
│   └── wp-content/
│       └── plugins/
│           └── ctc-smart-hands/   # Custom plugin
│               ├── ctc-smart-hands.php
│               ├── includes/
│               │   ├── class-database.php
│               │   ├── class-rest-api.php
│               │   ├── class-auth.php
│               │   └── class-notify.php
│               └── admin/
├── frontend/                      # Next.js application
│   ├── app/
│   │   ├── (public)/              # Public pages
│   │   ├── admin/                 # Protected admin
│   │   └── api/                   # API routes
│   ├── components/
│   │   ├── forms/
│   │   │   └── booking-form.tsx   # Main booking form
│   │   ├── display/
│   │   └── ui/                    # shadcn components
│   ├── lib/
│   │   ├── wordpress/
│   │   │   ├── client.ts          # API client
│   │   │   ├── types.ts           # TypeScript types
│   │   │   └── hmac.ts            # HMAC signing
│   │   └── validations/
│   │       └── booking-schema.ts  # Zod schemas
│   ├── .env.local                 # Environment vars
│   └── package.json
├── docs/                          # Documentation
│   ├── PRD.md                     # Product requirements
│   ├── API.md                     # API documentation
│   └── WORKFLOW.md                # Developer guide
├── .gitignore
├── CLAUDE.md                      # AI assistant guidance
└── README.md
```

---

## Development Workflow

### Daily Development

1. **Start WordPress:** Open Local by Flywheel, start `ctcbackend` site
2. **Start Next.js:** `cd frontend && pnpm dev`
3. **Code → Test → Commit:**
   - Write feature/component
   - Test with Chrome DevTools
   - Run tests: `pnpm test`
   - Commit with descriptive message

### Before Each Commit

```bash
cd frontend

# Type check
pnpm type-check

# Lint
pnpm lint

# Test
pnpm test

# Build (catches production errors)
pnpm build
```

### Testing WordPress API

Use Postman or curl to test REST endpoints:

```bash
# Test public endpoint (no auth)
curl http://ctcbackend.local/wp-json/ctc/v1/rates

# Test authenticated endpoint (requires HMAC headers)
# See docs/API.md for HMAC signing examples
```

---

## WordPress REST API

**Base URL:** `http://ctcbackend.local/wp-json/ctc/v1`

### Public Endpoints

- `GET /rates` - Get current rates
- `GET /downloads` - Get compliance document URLs

### Authenticated Endpoints (HMAC Required)

- `POST /bookings` - Create booking (triggers notifications)
- `GET /bookings` - List bookings (paginated, filterable)
- `GET /bookings/{id}` - Get booking detail
- `PATCH /bookings/{id}` - Update booking
- `POST /bookings/{id}/notify` - Send notification

**Authentication Headers:**
```
X-CTC-Key: your-api-key
X-CTC-Timestamp: 1729526400
X-CTC-Signature: hmac-sha256-signature
```

See `docs/API.md` for detailed documentation.

---

## Design System

### Color Palette (WCAG AA Compliant)

```css
--primary: #2563EB;      /* blue-600 - trust, modern */
--secondary: #0F172A;    /* slate-900 - professional */
--accent: #06B6D4;       /* cyan-500 - tech accent */
--success: #10B981;      /* emerald-500 */
--error: #EF4444;        /* red-500 */
--warning: #F59E0B;      /* amber-500 */
```

**Rules:**
- ❌ NO gradients (solid colors only)
- ✅ Minimum 4.5:1 contrast ratio for text
- ✅ Visible focus indicators
- ✅ Semantic HTML5

### Typography

- **Font:** Inter (variable font)
- **Headings:** text-2xl to text-4xl
- **Body:** text-base (16px)
- **Small:** text-sm (14px)

---

## Testing

### Unit Tests

```bash
cd frontend
pnpm test
```

### E2E Tests (Playwright)

```bash
cd frontend
pnpm dlx playwright test
```

### Accessibility Testing

```bash
# Run Lighthouse audit
pnpm dlx lighthouse http://localhost:3000 --view

# Target scores:
# Performance: ≥90
# Accessibility: 100
# SEO: ≥95
```

---

## Deployment

### WordPress (Production)

1. Upload plugin to production WordPress
2. Activate plugin
3. Configure settings (rates, SMTP, Twilio, API keys)
4. Upload compliance PDFs to Media Library
5. Test REST API endpoints

### Next.js (Vercel)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard:
   - `CTC_WP_API_BASE` (production WordPress URL)
   - `CTC_API_KEY`
   - `CTC_API_SECRET`
   - `ADMIN_PASS_HASH`
4. Deploy
5. Configure custom domain
6. Test production booking flow

---

## Key Features

✅ **Booking System:** Vendor booking form with validation
✅ **HMAC Authentication:** Secure server-to-server communication
✅ **Notifications:** Email + SMS alerts for new bookings
✅ **Admin Dashboard:** View and manage bookings
✅ **Rate Display:** Dynamic rates from WordPress
✅ **Compliance:** Download capability statement, insurance, SWMS
✅ **Accessibility:** WCAG AA compliant
✅ **SEO Optimized:** Structured data, proper metadata

---

## Support

- **Documentation:** See `docs/` directory
- **Issues:** Contact project owner
- **WordPress Admin:** http://ctcbackend.local/wp-admin
- **API Docs:** See `docs/API.md`

---

## License

Proprietary - Complete Tech Care (CTC)

---

**Built with:**
- Next.js 15
- WordPress 6.6+
- TypeScript
- Tailwind CSS
- pnpm

**Owner:** Abdisalam Awale (Complete Tech Care)
**Version:** v1.0 (MVP)
**Last Updated:** October 21, 2025
