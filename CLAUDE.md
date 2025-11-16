# CLAUDE.md

This file provides guidance to Claude Code when working with the CTC Smart-Hands project.

---

## Project Overview: CTC Smart-Hands

**Complete Tech Care (CTC)** provides on-site IT contractor services across **Melbourne Metro, CBD, and Regional Victoria** for MSPs, IT providers, and retail vendors.

**Owner:** Abdisalam Awale (Complete Tech Care)
**Version:** v1.0 (MVP)
**Date:** November 2025

### Core Services

1. **Melbourne Metro & CBD:** Zero travel costs, 2-4 hour arrival - perfect for MSPs with metro clients (save $200-400 per callout vs regional contractors)
2. **Regional Victoria:** Same-day dispatch to Bendigo, Ballarat, Shepparton, Echuca, and statewide coverage
3. **Service Types:** L1-L2 break/fix, equipment swaps, rollouts, POS/SCO support, site audits, infrastructure, parts logistics
4. **Service Model:** B2B contractor services, white-label operations, PO/SOW/SLA fluent

### Key Differentiators

- **Melbourne-based advantage:** No travel costs for metro/CBD jobs (save MSPs significant money on metro callouts)
- **B2B-focused pricing:** Starting from $140/hr with flexible engagement models for MSP partnerships and volume clients
- **Statewide coverage:** Melbourne metro + CBD + regional Victoria (not just regional)
- **Compliance-ready:** $20M liability insurance, PI coverage, police checks, Coles & Woolworths inducted
- **Vendor-friendly:** PO/SOW/SLA fluent operations, white-label service available

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
  2. Client confirmation with contact details (phone: 0432 405 388) and link to rates page
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

## Multi-Agent Development System

**Implemented:** November 2025
**Purpose:** Specialized AI agents for different aspects of CTC project development

### Overview

The CTC project uses a multi-agent system with specialized agents for different development tasks. Instead of a single Claude Code agent handling all work, tasks are routed to specialized agents with deep expertise in specific domains.

### Available Agents

**Location:** `.claude/agents/` directory

1. **ctc-orchestrator.md** - Master Coordinator
   - Routes tasks to appropriate specialized agents
   - Manages multi-agent workflows (sequential & parallel)
   - Tracks project phase and recommends next tasks
   - Commands: `*status`, `*next-task`, `*deploy-plan`, `*agent [name]`

2. **ctc-frontend-dev.md** - Next.js Frontend Specialist
   - Creates pages and components (Next.js 15, TypeScript strict)
   - Implements shadcn/ui components with accessibility
   - Optimizes performance (Lighthouse, Core Web Vitals)
   - Commands: `*create-page`, `*create-component`, `*add-section`, `*fix-accessibility`, `*optimize-performance`

3. **ctc-seo-expert.md** - SEO Optimization Specialist
   - Technical SEO (meta tags, schema.org, sitemaps)
   - Local SEO (Google My Business, 15+ regional Victoria locations)
   - Keyword optimization ("IT contractor regional Victoria")
   - Commands: `*seo-audit`, `*optimize-meta`, `*create-sitemap`, `*add-schema`, `*local-seo-setup`

4. **ctc-ai-optimizer.md** - AI Search Optimization
   - Optimizes for ChatGPT, Perplexity, Claude search
   - Creates FAQ schema for AI parsing
   - Entity definitions for AI understanding
   - Commands: `*ai-audit`, `*optimize-for-ai`, `*create-faq`, `*add-ai-schema`, `*compare-content`

5. **ctc-a11y-auditor.md** - Accessibility Compliance
   - WCAG 2.1 AA compliance auditing (100/100 score non-negotiable)
   - Contrast analysis (4.5:1 minimum)
   - Screen reader testing (NVDA, JAWS, VoiceOver)
   - Commands: `*audit-page`, `*check-contrast`, `*test-keyboard-nav`, `*test-screen-reader`, `*fix-accessibility`

6. **ctc-content-writer.md** - Professional B2B Content Creator
   - B2B copywriting for MSP/IT provider audience
   - Service pages, blog posts, marketing copy
   - Australian English standards
   - Commands: `*write-service-page`, `*write-blog-post`, `*write-cta`, `*optimize-readability`, `*write-faq`

7. **ctc-devops.md** - Deployment & Operations
   - Vercel production deployment
   - Performance auditing (Core Web Vitals)
   - Security auditing (HTTPS, headers, API security)
   - Commands: `*deploy-production`, `*setup-environment`, `*create-staging`, `*performance-audit`, `*security-audit`

### How to Use Agents

**Method 1: Explicit Agent Invocation**
```
Use the Task tool to invoke specific agent:

Task({
  subagent_type: "general-purpose",
  prompt: "You are now the ctc-seo-expert agent from .claude/agents/ctc-seo-expert.md. Run an SEO audit on /services/site-audits page."
})
```

**Method 2: Natural Language (Orchestrator Routes)**
```
User: "Audit the homepage for SEO issues"
→ Orchestrator recognizes SEO keyword
→ Routes to ctc-seo-expert agent
→ Agent performs audit and reports back
```

**Method 3: Direct Command Syntax**
```
User: "*seo-audit /services/pos-retail"
→ Executes command defined in ctc-seo-expert agent
→ Returns structured SEO audit report
```

### Agent Coordination Patterns

**Sequential Workflow (Tasks Depend on Each Other):**
```
1. Frontend dev creates service page
2. SEO expert adds meta tags and schema
3. AI optimizer creates FAQ section
4. Accessibility auditor verifies WCAG compliance
5. DevOps deploys to production
```

**Parallel Workflow (Independent Tasks):**
```
Simultaneously:
- Frontend dev creates 3 service pages
- Content writer drafts blog posts
- SEO expert audits existing pages
- Accessibility auditor tests navigation
```

**Hybrid Workflow (Mix of Sequential & Parallel):**
```
Phase 1 (Parallel):
- Frontend dev creates page structure
- Content writer drafts copy

Phase 2 (Sequential):
- Frontend dev implements content
- SEO expert adds schema markup
- Accessibility auditor verifies compliance
```

### Integration with PROGRESS.md

Agents use `/PROGRESS.md` as shared state file:
- Current project phase
- Completed tasks
- Pending work
- Known issues

Agents read PROGRESS.md to understand context and update it after completing work.

### Agent Best Practices

1. **Trust Agent Expertise** - Agents are specialists, defer to their recommendations
2. **Use Appropriate Agent** - Route tasks to agent with relevant expertise
3. **Coordinate Changes** - Frontend + SEO + A11y + Content should work together
4. **Verify Outputs** - Always test agent work with Chrome MCP before committing
5. **Update PROGRESS.md** - Agents document completed work for future reference

### Common Agent Combinations

**New Service Page:**
```
1. Content Writer: Draft service page copy
2. Frontend Dev: Implement page with content
3. SEO Expert: Add meta tags, schema.org markup
4. AI Optimizer: Create FAQ section for AI search
5. Accessibility Auditor: Verify WCAG compliance
6. DevOps: Deploy to production
```

**Blog Post Creation:**
```
1. Content Writer: Draft blog post (800-1200 words)
2. SEO Expert: Optimize for target keywords
3. AI Optimizer: Add FAQ schema for AI parsing
4. Frontend Dev: Implement on /blog/[slug] page
5. Accessibility Auditor: Verify readability at 200% zoom
```

**Production Deployment:**
```
1. DevOps: Run pre-deployment checks
2. Frontend Dev: Verify build successful
3. SEO Expert: Confirm sitemap generated
4. Accessibility Auditor: Final Lighthouse audit
5. DevOps: Deploy to Vercel production
6. DevOps: Post-deployment verification
```

### Agent Command Reference

See individual agent files in `.claude/agents/` for full command documentation:
- Each agent defines custom commands (e.g., `*seo-audit`, `*create-page`)
- Commands provide structured output and actionable recommendations
- Commands can be chained in workflows

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

### B2B Pricing Strategy (November 2025 Update)

**Public Pricing Positioning:**
- **Business hours:** From $140/hr (starting rate for business hours callouts)
- **After-hours & weekends:** Premium rates apply
- **Public holidays:** Premium rates apply
- **Minimum charge:** 1.5 hours
- **Travel:** Melbourne metro/CBD = $0 travel costs; Regional Victoria = travel fees apply based on location

**Why "From" Pricing:**
- Allows negotiation flexibility for MSP partnerships and volume clients
- Prevents end clients from seeing exact contractor margins (MSPs can mark up without transparency issues)
- Conservative volume discounts: 5% off for 10+ hours/month, 10% off for 20+ hours/month
- Positions as B2B contractor partner, not retail competitor

**Internal Rate Structure (Not Published):**
- Business hours base: $140/hr
- After-hours/weekends: $165-175/hr
- Public holidays: $200/hr
- Travel: $1.00/km (round trip from Melbourne, first 50km one-way free for metro)
- Regional callouts typically $500-800 total depending on location, time, and job complexity

**MSP Partner Engagement Models:**
- **One-off callouts:** Standard rates, invoiced per job
- **Block hours:** 10, 20, 50 hour packages with volume discounts
- **Monthly retainer:** From $1,800/month (includes set hours + priority dispatch)
- **Project-based:** Fixed quotes for rollouts and multi-site deployments

### Coverage Areas

**Melbourne Metro & CBD Advantage:**
- Zero travel costs for metro/CBD jobs
- 2-4 hour arrival for most locations
- Saves MSPs $200-400 per callout vs. regional contractors

**Regional Victoria Coverage:**
- Same-day dispatch to Bendigo, Ballarat, Shepparton, Echuca
- Statewide coverage including Geelong, Warrnambool, Mildura, Latrobe Valley, and beyond
- Travel times 2-4 hours depending on location

**Service Philosophy:**
- Help MSPs meet their client SLAs with responsive dispatch
- Be honest about travel times (2-4 hours typical), confirm ETA within 30 minutes
- Professional white-label service representing client brands
- Conservative promises for solo operator reality (not "same-day to 15+ hubs" - be realistic)

---

## Project Status & Recent Changes

**Last Updated:** November 11, 2025
**Current Phase:** MVP Complete - READY FOR PRODUCTION DEPLOYMENT ✅

### Production Deployment Status

**Build Status:** ✅ PASSED
- TypeScript compilation: SUCCESSFUL (strict mode, no errors)
- ESLint checks: PASSED (0 errors, 3 minor warnings)
- Production build: SUCCESSFUL (17 pages generated)
- All functionality tested and working

**Environment Variables for Vercel:**
```bash
RESEND_API_KEY=re_D84SPuH3_KktgLLD8wCiJ84HhBMc54bE6
CONTRACTOR_EMAIL=completetechcare@gmail.com
NEXT_PUBLIC_SITE_URL=https://your-production-domain.vercel.app
```

**Deployment Instructions:**
See comprehensive guide: `/Users/abuuuthman/projects/ctc_project/DEPLOYMENT-GUIDE.md`

**Production URL:** TBD (will be updated after first deployment)

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
  - B2B-focused pricing: "From $140/hr" starting rate
  - Melbourne metro advantage (zero travel costs)
  - Vague pricing for flexibility: "Premium rates apply", "Travel fees apply based on location"
  - MSP partner pricing section with engagement models
  - NO detailed job cost calculator (removed for B2B positioning)

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
   - Subject: "Complete Tech Care - Request Received"
   - Contains: Confirmation of receipt, contact info (0432 405 388), link to rates page for pricing details
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
  - Pricing schema: $140/hr starting rate (MinimumAdvertisedPrice)

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
