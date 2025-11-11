# CLAUDE.md

This file provides guidance to Claude Code when working with the CTC Smart-Hands project.

---

## Project Overview: CTC Smart-Hands

**Complete Tech Care (CTC)** provides rapid-response regional VIC smart-hands services for MSPs & retail vendors.

**Owner:** Abdisalam Awale (Complete Tech Care)
**Version:** v1.0 (MVP)
**Date:** November 2025

### Core Services

1. **For MSPs & IT Providers:** Same-day dispatch to Bendigo, Ballarat, Shepparton, Echuca. L1-L2 break/fix, rollouts, POS/SCO peripherals, parts logistics, site audits.
2. **Service Model:** B2B contractor services, white-label operations, PO/SOW/SLA fluent.

### Key Differentiators

- Same-day regional dispatch (help MSPs meet their client SLAs)
- Vendor-friendly operations (PO/SOW/SLA fluent)
- Compliance-ready (PL $20M, PI, Police Check, Coles & Woolworths inductions)
- Transparent pricing: $110/hr + $1.00/km travel (published rates)

---

## Architecture

**Minimal MVP Approach (Email-Only Backend):**

```
┌──────────────────────────────┐
│   Next.js 15 Frontend        │
│   localhost:3003             │
│   - Public pages             │
│   - Blog (5 posts)           │
│   - Rates page               │
│   - Booking form             │
└──────────┬───────────────────┘
           │
           │ POST /api/book
           ├─────────────────────► Resend API
           │                       - Email to contractor
           │                       - Confirmation to client
           │
           └─────────────────────► No Database
                                   No Admin Dashboard
                                   Pure Email Notifications
```

**Frontend:** Next.js 15 (App Router), TypeScript (strict), Tailwind CSS v4, shadcn/ui
**Backend:** Resend API for email notifications only
**Validation:** Zod schemas
**Deployment:** Vercel
**No Database:** All inquiries handled via email workflow

---

## Tech Stack Standards

### Frontend (Next.js)

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript (strict mode, no `any` types)
- **Styling:** Tailwind CSS v4
- **Components:** shadcn/ui (accessible, customizable)
- **Fonts:** Inter (variable font for performance)
- **Validation:** Zod schemas
- **Package Manager:** pnpm
- **Deployment:** Vercel

### Email Notifications (Resend)

- **Service:** Resend API (`resend` npm package)
- **Templates:** @react-email/components for HTML emails
- **Emails Sent:**
  1. Contractor notification (to `CONTRACTOR_EMAIL`) with full inquiry details
  2. Client confirmation with rate info ($110/hr + $1/km), phone number (0432 405 388)
- **No Database:** Inquiries stored in contractor email inbox

### Design System

**Color Palette** (WCAG AA compliant, NO gradients):

```css
/* Primary Colors */
--primary: #2563EB;      /* blue-600 - trust, modern */
--secondary: #0F172A;    /* slate-900 - professional */
--accent: #06B6D4;       /* cyan-500 - tech accent */

/* Semantic Colors */
--success: #10B981;      /* emerald-500 */
--error: #EF4444;        /* red-500 */
--warning: #F59E0B;      /* amber-500 */

/* Neutrals */
--bg-primary: #FFFFFF;
--bg-secondary: #F8FAFC; /* slate-50 */
--text-primary: #0F172A; /* slate-900 */
--text-secondary: #64748B; /* slate-500 */
```

**Typography:**

```css
/* Font Family */
font-family: 'Inter', system-ui, -apple-system, sans-serif;

/* Scale (Tailwind defaults) */
text-sm: 0.875rem (14px)
text-base: 1rem (16px)
text-lg: 1.125rem (18px)
text-xl: 1.25rem (20px)
text-2xl: 1.5rem (24px)
text-3xl: 1.875rem (30px)
text-4xl: 2.25rem (36px)
```

**Spacing:** Use Tailwind spacing scale (4px base unit)

---

## Coding Standards

### General Principles

1. **Accessibility First:** WCAG AA minimum (4.5:1 contrast, keyboard nav, semantic HTML)
2. **No Gradients:** Solid colors only, no background gradients
3. **Type Safety:** Full TypeScript coverage, no `any` types
4. **Performance:** Lighthouse scores >90 (Performance, SEO, Accessibility 100)
5. **Security:** Input validation with Zod, rate limiting on API routes

### Next.js Standards

**File Structure:**
```
web/
├── src/
│   ├── app/
│   │   ├── page.tsx           # Homepage
│   │   ├── rates/page.tsx     # Pricing page
│   │   ├── blog/              # Blog pages
│   │   ├── book/page.tsx      # Booking form page
│   │   └── api/
│   │       └── book/route.ts  # Resend email API
│   ├── components/
│   │   ├── forms/
│   │   │   └── booking-form.tsx
│   │   ├── layout/
│   │   │   ├── header.tsx
│   │   │   └── footer.tsx
│   │   └── ui/                # shadcn components
│   └── lib/
│       └── validations/
│           └── schemas.ts     # Zod schemas
└── package.json
```

**Component Patterns:**

```typescript
// Use Server Components by default
export default async function Page() {
  return <div>Content</div>;
}

// Only use 'use client' when necessary (forms, interactivity)
'use client';
import { useState } from 'react';

export function BookingForm() {
  const [status, setStatus] = useState('idle');
  // ...
}
```

**API Routes (Resend Email):**

```typescript
import { Resend } from 'resend';
import { bookingFormSchema } from '@/lib/validations/schemas';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();
  const validated = bookingFormSchema.parse(body); // Throws if invalid

  // Send contractor notification
  await resend.emails.send({
    from: 'CTC Smart-Hands <noreply@ctc-smarthands.com>',
    to: process.env.CONTRACTOR_EMAIL,
    subject: `New MSP Inquiry: ${validated.company}`,
    html: `...professional HTML template...`
  });

  // Send client confirmation
  await resend.emails.send({
    to: validated.contactEmail,
    subject: 'CTC Smart-Hands - Request Received',
    html: `...includes pricing and contact info...`
  });
}
```

---

## Testing Standards

### Chrome DevTools MCP Integration

Use Chrome DevTools MCP for visual inspection and testing at these checkpoints:

1. **After component creation:** Visual layout, color palette, spacing
2. **After form implementation:** Accessibility, keyboard nav, error states
3. **Before each commit:** Lighthouse audit (Performance, A11y, SEO)
4. **Before deployment:** Full production audit

### Accessibility Testing Checklist

- [ ] Lighthouse Accessibility score = 100
- [ ] All text meets 4.5:1 contrast ratio minimum
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Focus indicators visible on all interactive elements
- [ ] Form errors announced to screen readers
- [ ] Semantic HTML (nav, main, section, article)
- [ ] ARIA labels where needed (icon buttons, etc)
- [ ] Images have descriptive alt text

---

## Environment Variables

### Next.js (`.env.local`)

```bash
# Resend API Configuration
# Get your API key from: https://resend.com/api-keys
RESEND_API_KEY=re_your_api_key_here

# Contractor Email (where booking notifications will be sent)
CONTRACTOR_EMAIL=your-personal-email@example.com

# Optional
NEXT_PUBLIC_SITE_URL=https://ctc-smarthands.vercel.app
```

---

## Development Workflow

### Daily Workflow

1. **Start Next.js:** `cd /Users/abuuuthman/projects/ctc_project/web && pnpm dev`
2. **Code → Test → Commit:**
   - Write feature/component
   - Test with Chrome DevTools MCP
   - Commit with descriptive message

### Before Each Commit

```bash
# Change to web directory
cd web

# Run type check
pnpm run build

# Run linting
pnpm run lint
```

### Git Commit Messages

Follow conventional commits:

```
feat: add booking form validation
fix: correct email template formatting
docs: update API endpoint documentation
style: improve mobile responsive layout
refactor: extract email templates into separate files
```

---

## Performance Targets

### Lighthouse Scores (Production)

- **Performance:** ≥90
- **Accessibility:** 100 (non-negotiable)
- **Best Practices:** ≥90
- **SEO:** ≥95

### Core Web Vitals

- **LCP (Largest Contentful Paint):** <2.5s
- **FID (First Input Delay):** <100ms
- **CLS (Cumulative Layout Shift):** <0.1

---

## Deployment Checklist

### Next.js (Vercel)

- [ ] Connect GitHub repository
- [ ] Set environment variables in Vercel dashboard:
  - `RESEND_API_KEY`
  - `CONTRACTOR_EMAIL`
  - `NEXT_PUBLIC_SITE_URL`
- [ ] Configure custom domain DNS (if applicable)
- [ ] Enable Vercel Analytics (optional)
- [ ] Test production build locally (`pnpm run build && pnpm start`)
- [ ] Deploy and verify all pages load
- [ ] Test booking submission end-to-end
- [ ] Verify emails arrive at contractor and client addresses

### Resend Configuration

- [ ] Create Resend account at https://resend.com
- [ ] Generate API key
- [ ] Verify domain (ctc-smarthands.com) for professional email sending
- [ ] Test email delivery in Resend dashboard
- [ ] Monitor email logs for failed deliveries

---

## Important Reminders for Claude Code

1. **Always double-check before creating new files** - Prefer editing existing files over creating new ones
2. **Communicate before major changes** - Ask user for confirmation on architectural decisions
3. **Use shadcn/ui components carefully** - Ensure accessibility and proper theming
4. **No gradients, ever** - Solid colors only per design system
5. **Contrast ratios matter** - Always verify 4.5:1 minimum for WCAG AA
6. **Think about disabilities** - Design for screen readers, keyboard-only users, color blindness
7. **Professional color usage** - No black on black, no light on light
8. **Use Chrome DevTools MCP proactively** - Test visual design and accessibility at each checkpoint
9. **Use pnpm** - Not npm or yarn, always use pnpm for package management

---

## Support & Resources

- **Next.js Docs:** https://nextjs.org/docs
- **Resend Docs:** https://resend.com/docs
- **shadcn/ui:** https://ui.shadcn.com/
- **Tailwind CSS:** https://tailwindcss.com/docs
- **WCAG Guidelines:** https://www.w3.org/WAI/WCAG21/quickref/
- **Schema.org:** https://schema.org/LocalBusiness

---

## Pricing & Service Model

### Contractor Rates (November 2025)

**Hourly Rates:**
- Business hours (Mon-Fri 8am-6pm): $110/hr (1.5hr minimum)
- After-hours (Mon-Fri 6pm-11pm): $140/hr (2hr minimum)
- Weekends (Sat-Sun): $130/hr (2hr minimum)
- Public holidays: $165/hr (2hr minimum)

**Travel Charges:**
- $1.00 per kilometre (round trip from Melbourne)
- First 50km one-way deducted (free Melbourne metro zone)
- Examples:
  - Bendigo: 300km RT = $300 travel
  - Shepparton: 360km RT = $360 travel
  - Echuca: 400km RT = $400 travel
  - Ballarat: 240km RT = $240 travel

**Retainer Options:**
- From $1,800/month (includes set hours + priority dispatch)
- Flexible engagement models (one-off, block hours, retainer, project-based)

### Coverage Areas

**Primary hubs (same-day dispatch available):**
- Bendigo (150km from Melbourne)
- Ballarat (120km)
- Shepparton (180km)
- Echuca (200km)

**Service philosophy:**
- Help MSPs meet their client SLAs with same-day regional dispatch
- No false "4-hour response guarantee" - be honest about travel times (2-4 hours)
- Confirm availability and ETA within 30 minutes of request
- Professional white-label service representing client brands

---

## Project Status & Recent Changes

**Last Updated:** November 8, 2025
**Current Phase:** MVP Launch Ready

### MVP Architecture (November 2025)

**What Changed:**
- **Removed WordPress entirely** - No backend database, no admin dashboard, no plugin
- **Replaced with Resend API** - Pure email notification workflow
- **Simplified for quick launch** - Focus on getting MSP clients, not building infrastructure

**Why Email-Only:**
- Faster time to market (launch this week vs. months of WordPress development)
- No hosting costs for backend
- No database management complexity
- Inquiries go straight to contractor email inbox
- Can add database/CRM later if volume justifies it

### Homepage & Messaging (November 2025)

**SLA Messaging Corrections:**
- Changed "4-hour response guarantee" to "Same-day dispatch"
- Emphasize "Help MSPs meet their client SLAs" not "We have 4-hour SLA"
- Travel time is 2-4 hours depending on location, confirm ETA within 30 minutes
- Be transparent: same-day dispatch WHERE POSSIBLE, not guaranteed

**Updated Pages:**
- **Homepage** ([page.tsx](/Users/abuuuthman/projects/ctc_project/web/src/app/page.tsx)):
  - Hero: "Help your clients meet their SLAs with same-day regional dispatch"
  - Stats banner: "Same-Day Regional Dispatch - Help you close SLAs"
  - Coverage: 4 hubs (Bendigo, Ballarat, Shepparton, Echuca)
  - FAQ with 7 MSP-focused questions

- **Rates Page** ([page.tsx](/Users/abuuuthman/projects/ctc_project/web/src/app/rates/page.tsx)):
  - Clear $110/hr + $1/km pricing
  - Job cost calculator table (Bendigo 2hr = $520, Shepparton 2hr = $580, etc.)
  - Example invoice breakdown with GST

- **Booking Form** ([booking-form.tsx](/Users/abuuuthman/projects/ctc_project/web/src/components/forms/booking-form.tsx)):
  - "Request Contractor Information" heading
  - "30 minutes response during business hours" promise
  - Location dropdown: Bendigo, Ballarat, Shepparton, Echuca, Other Regional VIC
  - Success message: "We'll contact you within 30 minutes..."

- **Header Navigation** ([header.tsx](/Users/abuuuthman/projects/ctc_project/web/src/components/layout/header.tsx)):
  - Removed deleted pages (For MSPs, Coverage)
  - Clean navigation: Home, Rates, Blog, Phone, Request Info

### Email Notifications (Resend API)

**Two emails sent on form submission:**

1. **Contractor Notification** (to contractor inbox):
   - Subject: "New MSP Inquiry: {company}"
   - Contains: Company info, contact details, service type, location, description
   - Action required prompt with contact details

2. **Client Confirmation** (to inquirer):
   - Subject: "CTC Smart-Hands - Request Received"
   - Contains: Confirmation of receipt, pricing info ($110/hr + $1/km), urgent callout number
   - Sets expectation: will contact shortly to discuss

---

**Status:**
- ✅ Phase 1-8 Complete: Minimal MVP ready for deployment
- ⏭️ Next: Deploy to Vercel with Resend API key
- 🎯 Goal: Launch this week to start getting MSP clients

---

## November 8, 2025 - Branding & Regional Coverage Updates

### Session Summary

**Completed Work:**
1. ✅ Fixed critical email template bug (undefined values)
2. ✅ Updated all branding from "CTC Smart-Hands" to "Complete Tech Care (CTC)"
3. ✅ Expanded regional coverage from 5 cities to statewide Victoria
4. ✅ Created PROGRESS.md file for tracking development

### Branding Updates

**Problem:** Email templates showed "undefined" for contact info because API route used camelCase variables but Zod schema expected snake_case.

**Fix Applied:**
- Updated API route destructuring in [route.ts:26-36](/Users/abuuuthman/projects/ctc_project/web/src/app/api/book/route.ts#L26-L36)
- Changed `contactName` → `contact_name`, `contactEmail` → `contact_email`, etc.
- Both contractor and client emails now display all contact information correctly

**Branding Standardization:**
- Company name: **Complete Tech Care (CTC)**
- Updated in:
  - Email templates (contractor + client notifications)
  - Header component: "Complete Tech Care"
  - Footer component: "Complete Tech Care" + "Same-day dispatch guarantee"
  - Layout metadata: Title, description, keywords
  - Schema.org data: All URLs, names, contact info
  - Pricing schema: $110/hr (correct rate)

**Contact Information:**
- Email: completetechcare@gmail.com
- Phone: +61432405388 (0432 405 388)
- Email sender: `Complete Tech Care <onboarding@resend.dev>`

### Regional Coverage Expansion

**Problem:** Only listed 5 cities (Bendigo, Ballarat, Shepparton, Wodonga, Latrobe) - misleading for statewide service.

**Solution:** Expanded to show comprehensive regional Victoria coverage.

**Location Schema Updated** ([schemas.ts](/Users/abuuuthman/projects/ctc_project/web/src/lib/validations/schemas.ts)):
```typescript
export const locationSchema = z.enum([
  'bendigo', 'ballarat', 'shepparton', 'echuca', 'wodonga',
  'wangaratta', 'latrobe', 'geelong', 'warrnambool', 'mildura',
  'horsham', 'sale', 'bairnsdale', 'swan_hill', 'other_regional',
]);
```

**Booking Form Dropdown** ([booking-form.tsx](/Users/abuuuthman/projects/ctc_project/web/src/components/forms/booking-form.tsx)):
- 14 major regional cities listed
- Plus "Other Regional VIC" catch-all option
- Latrobe Valley properly labeled as "Latrobe Valley (Morwell/Traralgon)"

**Homepage Regional Section** ([page.tsx](/Users/abuuuthman/projects/ctc_project/web/src/app/page.tsx)):
- Heading: "Statewide Regional Victoria Coverage"
- Shows 8 major hubs in grid layout
- Footer text: "Plus: Mildura, Horsham, Sale, Bairnsdale, Swan Hill, Latrobe Valley, and all other regional Victorian locations"

**Footer Coverage Area** ([footer.tsx](/Users/abuuuthman/projects/ctc_project/web/src/components/layout/footer.tsx)):
- Lists 6 major cities (Bendigo, Ballarat, Shepparton, Geelong, Warrnambool, Mildura)
- Footer note: "+ All Regional VIC"

**Schema.org SEO Data** ([schema.ts](/Users/abuuuthman/projects/ctc_project/web/src/lib/schema.ts)):
- Added 9 cities with Wikidata IDs for structured data
- Added Victoria state entity for broader geographic coverage
- Helps Google/AI understand full service area

### Files Modified This Session

1. `/web/src/app/api/book/route.ts` - Fixed variable names, updated branding in both emails
2. `/web/src/lib/validations/schemas.ts` - Expanded location enum to 15 options
3. `/web/src/components/forms/booking-form.tsx` - Updated dropdown with all locations
4. `/web/src/app/page.tsx` - Expanded regional coverage section
5. `/web/src/components/layout/header.tsx` - Updated branding
6. `/web/src/components/layout/footer.tsx` - Updated branding + expanded coverage list
7. `/web/src/app/layout.tsx` - Updated metadata (title, description, keywords)
8. `/web/src/lib/schema.ts` - Updated all Schema.org data with correct branding, pricing, locations
9. `/PROGRESS.md` - Created tracking file (NEW)
10. `/CLAUDE.md` - This documentation (UPDATED)

### Testing Performed

- ✅ Verified branding displays correctly on homepage via Chrome MCP snapshot
- ✅ Verified booking form shows expanded location dropdown
- ✅ Confirmed email templates have correct variable mapping
- ⏳ Need to test actual email delivery with expanded location options

### Remaining Work (Per Approved Plan)

**Phase 2: Enhanced Booking Form**
- Add urgency level dropdown (ASAP / Same-day / Scheduled)
- Add PO Number field (optional)
- Add Ticket Reference field (optional)
- Add Equipment details (make/model)
- Add Site access information (contact, codes, parking)
- Add Preferred contact method (phone/email)
- Update Zod schema and email templates

**Phase 3: Realistic Service Pages** (6 pages)
- `/services/pos-retail` - POS & Retail Equipment Support
- `/services/equipment-swap` - Hardware Replacement
- `/services/onsite-support` - L1-L2 Break/Fix
- `/services/infrastructure` - Cabling & Rack Work
- `/services/site-audits` - Site Surveys & Documentation
- `/services/logistics` - Parts Delivery & Transport

**Phase 4: Legal Pages**
- Privacy Policy
- Terms of Service
- Compliance documentation page

**Phase 5: Final Polish**
- Custom 404 page
- Replace favicon
- Final Chrome MCP testing
- Vercel deployment

---

**Next Steps:** Continue with Phase 2 (Enhanced Booking Form) to add professional MSP workflow fields.
