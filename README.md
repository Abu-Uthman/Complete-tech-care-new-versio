# CTC Smart-Hands

> Professional on-site contractor services for MSPs & IT vendors across regional Victoria

**Complete Tech Care (CTC)** provides same-day dispatch smart-hands services to Bendigo, Ballarat, Shepparton, Echuca, and surrounding areas. White-label contractor support helping MSPs meet their client SLAs.

---

## Project Architecture

**Minimal Email-Only Backend:**

```
┌────────────────────────┐         HTTPS POST          ┌──────────────────┐
│   Next.js Frontend     │  ───────────────────────────►  │  Resend API      │
│   Vercel Deployment    │                               │  Email Service   │
│   - Public pages       │  ◄───────────────────────────  │  Transactional   │
│   - Booking form       │         Email Sent            │  HTML Emails     │
│   - Blog               │                               └──────────────────┘
└────────────────────────┘
```

**Simple flow:** User submits booking form → Next.js API route → Resend sends email → Contractor receives notification

---

## Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Package Manager:** pnpm
- **Deployment:** Vercel

### Email Notifications
- **Service:** Resend (https://resend.com)
- **Templates:** @react-email/components (React-based HTML emails)
- **Validation:** Zod schemas for form data

### Content
- **Blog:** Standalone Next.js pages (5 MSP-focused posts)
- **Rates:** Static content in Next.js pages
- **Downloads:** Static PDF files in `/public/downloads/`

---

## Quick Start

### Prerequisites

- **Node.js:** v20+ (for Next.js 15)
- **pnpm:** Latest version
- **Resend Account:** Free tier available at https://resend.com

```bash
# Install pnpm if not already installed
npm install -g pnpm
```

### 1. Clone and Install

```bash
cd ctc_project/web

# Install dependencies with pnpm
pnpm install
```

### 2. Environment Setup

Create `.env.local` in the `/web` directory:

```bash
# Copy example file
cp .env.local.example .env.local

# Edit .env.local with your credentials:
# RESEND_API_KEY=re_your_api_key_here
# CONTRACTOR_EMAIL=your-email@example.com
```

**Get your Resend API key:**
1. Sign up at https://resend.com
2. Navigate to API Keys
3. Create a new API key
4. Copy to `.env.local`

### 3. Start Development Server

```bash
pnpm dev
```

Open http://localhost:3000 to see the site.

---

## Project Structure

```
ctc_project/
├── web/                           # Next.js application
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx           # Homepage
│   │   │   ├── rates/             # Rates page
│   │   │   ├── blog/              # Blog (5 posts)
│   │   │   ├── book/              # Booking form
│   │   │   └── api/
│   │   │       └── book/
│   │   │           └── route.ts   # Form submission → Resend
│   │   ├── components/
│   │   │   ├── forms/
│   │   │   │   └── booking-form.tsx
│   │   │   ├── layout/
│   │   │   │   ├── header.tsx
│   │   │   │   └── footer.tsx
│   │   │   └── ui/                # shadcn components
│   │   ├── lib/
│   │   │   └── validations/
│   │   │       └── schemas.ts     # Zod validation
│   │   └── emails/
│   │       └── booking-notification.tsx
│   ├── public/
│   │   └── downloads/             # Compliance PDFs
│   ├── .env.local.example
│   ├── package.json
│   └── tailwind.config.ts
├── blog-posts/                    # Blog content backups
├── .gitignore
├── CLAUDE.md                      # AI assistant guidance
└── README.md
```

---

## Development Workflow

### Daily Development

1. **Start Next.js:** `cd web && pnpm dev`
2. **Code → Test → Commit:**
   - Write feature/component
   - Test form submission (emails sent to contractor)
   - Run type check: `pnpm type-check`
   - Commit with descriptive message

### Before Each Commit

```bash
cd web

# Type check
pnpm type-check

# Lint
pnpm lint

# Build (catches production errors)
pnpm build
```

### Testing Email Notifications

1. Fill out booking form at http://localhost:3000/book
2. Submit form
3. Check configured `CONTRACTOR_EMAIL` inbox
4. Verify email contains all booking details

---

## Key Routes

- **`/`** - Homepage (hero, services, FAQ)
- **`/rates`** - Pricing table ($110/hr + $1.00/km travel)
- **`/blog`** - 5 MSP-focused blog posts
- **`/book`** - Booking form (sends email via Resend)
- **`/api/book`** - Form submission endpoint

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

**Design Rules:**
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

## Deployment to Vercel

### Prerequisites

1. **GitHub Repository:** Push code to GitHub
2. **Vercel Account:** Sign up at https://vercel.com
3. **Resend Account:** Get production API key

### Deployment Steps

1. **Connect to Vercel:**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Select `ctc_project/web` as the root directory

2. **Configure Environment Variables:**
   - In Vercel dashboard → Settings → Environment Variables
   - Add:
     - `RESEND_API_KEY` = `re_your_production_key`
     - `CONTRACTOR_EMAIL` = `your-email@example.com`

3. **Deploy:**
   - Click "Deploy"
   - Vercel automatically detects Next.js and builds

4. **Configure Custom Domain (Optional):**
   - Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed

5. **Test Production:**
   - Visit deployed URL
   - Submit test booking
   - Verify email received

---

## Email Configuration (Resend)

### Production Setup

1. **Verify Domain (Recommended):**
   - Go to Resend → Domains
   - Add your domain (e.g., `ctc.example.com`)
   - Add DNS records (SPF, DKIM, DMARC)
   - Emails will come from `noreply@ctc.example.com`

2. **Without Domain Verification:**
   - Emails come from `onboarding@resend.dev`
   - Limited to 100 emails/day on free tier
   - Good for testing, upgrade for production

### Email Template

Located at `/web/src/emails/booking-notification.tsx`

Built with @react-email/components for professional HTML emails.

---

## Pricing Model

**Standard Rates:**
- Business hours (Mon-Fri 8AM-5PM): $110/hr (1.5hr minimum)
- After-hours (nights/weekends): $140/hr (2hr minimum)
- Travel: $1.00/km round trip (first 50km one-way free)

**Example Calculation:**
- Bendigo job (150km one-way, 2 hours on-site)
- Travel: (150km - 50km free) × 2 (round trip) = 200km × $1.00 = $200
- Labor: 2hr × $110/hr = $220
- **Total: $420**

---

## Coverage Areas

**Primary Hubs (Same-Day Dispatch):**
- Bendigo (150km from Melbourne)
- Ballarat (115km from Melbourne)
- Shepparton (180km from Melbourne)
- Echuca (210km from Melbourne)

**Extended Coverage:**
- Wodonga, Wangaratta, Seymour, Goulburn Valley

**SLA:** Same-day dispatch, confirm availability within 30 minutes

---

## Key Features

✅ **Professional Booking Form:** Vendor intake with company/PO fields
✅ **Email Notifications:** Instant contractor alerts via Resend
✅ **Transparent Pricing:** Clear $110/hr + $1.00/km rate table
✅ **MSP-Focused Content:** White-label positioning, SLA support
✅ **Blog:** 5 MSP-focused posts (regional coverage, vendor selection, smart-hands value)
✅ **Compliance Downloads:** Capability statement, insurance certificates
✅ **Accessibility:** WCAG AA compliant
✅ **SEO Optimized:** Structured data, proper metadata
✅ **Mobile Responsive:** Works on all screen sizes

---

## Technology Choices

### Why Resend?

- **Simple:** No database, no backend server needed
- **Reliable:** 99.9% uptime SLA
- **Developer-Friendly:** React email templates, TypeScript SDK
- **Cost-Effective:** Free tier: 3,000 emails/month (sufficient for contractor leads)
- **Professional:** Domain verification, DKIM signing

### Why No Database?

This is a **lead generation website**, not a CRM:
- Bookings don't need to be stored long-term
- Contractor manages leads in their own system (email inbox)
- Simpler = fewer points of failure
- No database hosting costs

### Future Scaling

If lead volume grows significantly:
- Upgrade Resend plan (unlimited emails from $20/month)
- Add database for analytics (optional)
- Integrate with PSA tools (ConnectWise, Autotask) via webhooks

---

## Maintenance

### Regular Tasks

- **Update blog:** Add new MSP-focused posts in `/web/src/app/blog/`
- **Update rates:** Edit `/web/src/app/rates/page.tsx`
- **Update PDFs:** Replace files in `/web/public/downloads/`
- **Monitor emails:** Check Resend dashboard for delivery stats

### Security

- **Never commit `.env.local`** (already in `.gitignore`)
- **Rotate API keys** if exposed
- **Keep dependencies updated:** `pnpm update`
- **Monitor Vercel logs** for errors

---

## Support

- **Next.js Docs:** https://nextjs.org/docs
- **Resend Docs:** https://resend.com/docs
- **shadcn/ui:** https://ui.shadcn.com
- **Tailwind CSS:** https://tailwindcss.com/docs

---

## License

Proprietary - Complete Tech Care (CTC)

---

**Built with:**
- Next.js 15
- Resend API
- TypeScript
- Tailwind CSS v4
- pnpm

**Owner:** Abdisalam Awale (Complete Tech Care)
**Version:** v1.0 (MVP)
**Last Updated:** November 2025
