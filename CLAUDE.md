# CLAUDE.md

This file provides guidance to Claude Code when working with the CTC Smart-Hands project.

---

## Project Overview: CTC Smart-Hands

**Complete Tech Care (CTC)** provides rapid-response regional VIC smart-hands services for MSPs & retail vendors, plus friendly IT support for Melbourne homes & small businesses.

**Owner:** Abdisalam Awale (Complete Tech Care)
**Version:** v1.0 (MVP)
**Date:** October 2025

### Core Services

1. **For MSPs & Retail Vendors:** 4-hour on-site response to Bendigo, Ballarat, Shepparton, Wodonga, Latrobe. L1-L2 break/fix, rollouts, POS/SCO peripherals, parts logistics, site audits.
2. **For SMB/Home (Melbourne):** Wi-Fi fixes, PC support, printer setup, smart devices, basic CCTV/NVR.

### Key Differentiators

- Regional 4-hour coverage to named hubs
- Vendor-friendly operations (PO/SOW/SLA fluent)
- Compliance-ready (PL $20M, PI, Police Check, Coles & Woolworths inductions)
- Predictable travel pricing with published caps

---

## Architecture

**Headless CMS Approach:**

```
┌─────────────────────────┐         REST API (HMAC)          ┌──────────────────────┐
│   Next.js 15 Frontend   │  ───────────────────────────────►  │  WordPress Backend   │
│   localhost:3000        │                                   │  (Local by Flywheel) │
│   - Public pages        │  ◄───────────────────────────────  │  - Custom plugin     │
│   - Booking form        │         JSON Response             │  - Bookings DB       │
│   - Admin dashboard     │                                   │  - Notifications     │
└─────────────────────────┘                                   └──────────────────────┘
```

**Frontend:** Next.js 15 (App Router), TypeScript (strict), Tailwind CSS, shadcn/ui
**Backend:** WordPress 6.6+, PHP 8.2+, custom plugin `ctc-smart-hands`
**Authentication:** HMAC SHA-256 (server-to-server)
**Database:** MySQL (via WordPress $wpdb)
**Notifications:** wp_mail (SMTP) + Twilio (SMS)

---

## Tech Stack Standards

### Frontend (Next.js)

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript (strict mode, no `any` types)
- **Styling:** Tailwind CSS v3.4+
- **Components:** shadcn/ui (accessible, customizable)
- **Fonts:** Inter (variable font for performance)
- **Validation:** Zod schemas
- **Testing:** Playwright for E2E
- **Deployment:** Vercel

### Backend (WordPress)

- **Version:** WordPress 6.6+
- **PHP:** 8.2+ (type hints, strict types)
- **Plugin:** Custom `ctc-smart-hands` (namespace `CTC\SmartHands`)
- **Database:** Custom tables via dbDelta
- **API:** REST API with custom namespace `ctc/v1`
- **Security:** HMAC authentication, nonce verification
- **Environment:** Local by Flywheel for development

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
5. **Security:** HMAC for API auth, input validation, rate limiting

### Next.js Standards

**File Structure:**
```
app/
├── (public)/           # Public routes
│   ├── page.tsx        # Landing page
│   └── layout.tsx
├── admin/              # Protected routes
│   └── page.tsx
└── api/
    └── book/
        └── route.ts    # API routes

components/
├── booking-form.tsx    # Feature components
├── rates-card.tsx
└── ui/                 # shadcn components

lib/
├── wordpress/
│   ├── client.ts       # API client
│   └── types.ts        # TypeScript interfaces
└── validations/
    └── schemas.ts      # Zod schemas
```

**Component Patterns:**

```typescript
// Use Server Components by default
export default async function Page() {
  const data = await fetchFromWordPress();
  return <div>{data}</div>;
}

// Only use 'use client' when necessary (forms, interactivity)
'use client';
import { useState } from 'react';

export function BookingForm() {
  const [status, setStatus] = useState('idle');
  // ...
}
```

**API Routes:**

```typescript
// Always validate input with Zod
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  // ...
});

export async function POST(req: Request) {
  const body = await req.json();
  const validated = schema.parse(body); // Throws if invalid
  // ...
}
```

### WordPress Standards

**PHP Style:**

```php
<?php
// Strict types at the top of every file
declare(strict_types=1);

namespace CTC\SmartHands;

// Use type hints
class Database {
    public function create_booking(array $data): int {
        // Use $wpdb with prepared statements
        global $wpdb;
        $wpdb->insert(
            $wpdb->prefix . 'ctc_bookings',
            $data,
            ['%s', '%s', '%d'] // Format array
        );
        return $wpdb->insert_id;
    }
}
```

**Security:**

```php
// Always sanitize input
$company = sanitize_text_field($_POST['company']);

// Always escape output
echo esc_html($booking->company);

// Use nonces for forms
wp_nonce_field('ctc_update_booking', 'ctc_nonce');

// Verify capabilities
if (!current_user_can('ctc_manage_bookings')) {
    wp_die('Unauthorized');
}
```

**⚠️ CRITICAL: dbDelta Limitations**

WordPress's `dbDelta()` function **DOES NOT support FOREIGN KEY constraints**. When using dbDelta for table creation:

```php
// ❌ WRONG - This will cause SQL errors
$sql = "CREATE TABLE {$table_name} (
    id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    booking_id bigint(20) UNSIGNED NOT NULL,
    PRIMARY KEY  (id),
    KEY booking_id (booking_id),
    CONSTRAINT fk_booking FOREIGN KEY (booking_id)
        REFERENCES {$prefix}ctc_bookings (id)
        ON DELETE CASCADE
) $charset_collate;";

// ✅ CORRECT - Remove FOREIGN KEY constraints
$sql = "CREATE TABLE {$table_name} (
    id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    booking_id bigint(20) UNSIGNED NOT NULL,
    PRIMARY KEY  (id),
    KEY booking_id (booking_id)
) $charset_collate;";
```

**Why this matters:**
- dbDelta tries to parse CONSTRAINT lines as column definitions
- This causes SQL syntax errors during plugin activation
- Use application-level referential integrity instead
- Add proper indexes (KEY) for foreign key columns

**Testing after plugin activation:**
- Always verify table creation using Chrome MCP
- Create a verification page to check table structure
- Delete test files after verification
- Check WordPress debug.log for SQL errors

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

### Playwright E2E Tests

**Required test scenarios:**

1. Submit booking form → verify created in WordPress
2. Admin login → update booking status → verify in database
3. Send notification → verify email/SMS sent
4. Invalid HMAC → expect 401
5. Rate limiting → expect 429
6. Mobile booking flow

---

## WordPress Plugin Structure

```
wp-content/plugins/ctc-smart-hands/
├── ctc-smart-hands.php           # Main plugin file
├── includes/
│   ├── class-database.php        # Table creation, queries
│   ├── class-rest-api.php        # REST endpoints
│   ├── class-auth.php            # HMAC verification
│   ├── class-notify.php          # Email & SMS
│   └── class-admin.php           # WP admin UI
├── admin/
│   ├── class-bookings-list.php   # WP_List_Table
│   └── views/
│       ├── settings-rates.php
│       ├── settings-notify.php
│       └── booking-detail.php
└── assets/
    ├── css/admin.css
    └── js/admin.js
```

---

## API Reference

### WordPress REST API (`/wp-json/ctc/v1`)

**Authentication:** All modifying endpoints require HMAC headers:

```
X-CTC-Key: {api_key}
X-CTC-Timestamp: {unix_timestamp}
X-CTC-Signature: HMAC_SHA256(secret, timestamp + raw_body)
```

**Endpoints:**

- `POST /bookings` - Create booking (sends notifications)
- `GET /bookings` - List bookings (paginated, filterable)
- `GET /bookings/{id}` - Get booking detail with notes
- `PATCH /bookings/{id}` - Update booking fields
- `POST /bookings/{id}/notify` - Send ETA/custom notification
- `GET /rates` - Get current rates (public, cacheable)
- `GET /downloads` - Get compliance document URLs (public)

---

## Environment Variables

### Next.js (`.env.local`)

```bash
# WordPress Connection
CTC_WP_API_BASE=http://ctcbackend.local/wp-json/ctc/v1
CTC_API_KEY=your-api-key-here
CTC_API_SECRET=your-secret-here

# Admin Protection
ADMIN_PASS_HASH=bcrypt-hash-here

# Optional
NEXT_PUBLIC_SITE_URL=https://ctc.example.com
```

### WordPress (`wp-config.php` or `.env`)

```php
// API Authentication
define('CTC_API_KEY', 'your-api-key-here');
define('CTC_API_SECRET', 'your-secret-here');

// Twilio
define('CTC_TWILIO_SID', 'AC...');
define('CTC_TWILIO_TOKEN', 'your-token');
define('CTC_TWILIO_FROM', '+61...');

// Timezone
define('CTC_TIMEZONE', 'Australia/Melbourne');
```

---

## Development Workflow

### Daily Workflow

1. **Start WordPress:** Open Local by Flywheel, start `ctcbackend` site
2. **Start Next.js:** `cd /Users/abuuuthman/projects/ctc_project && npm run dev`
3. **Code → Test → Commit:**
   - Write feature/component
   - Test with Chrome DevTools MCP
   - Run Playwright tests
   - Commit with descriptive message

### Before Each Commit

```bash
# Run type check
npm run type-check

# Run linting
npm run lint

# Run tests
npm run test

# Build to catch errors
npm run build
```

### Git Commit Messages

Follow conventional commits:

```
feat: add booking form validation
fix: correct HMAC timestamp calculation
docs: update API endpoint documentation
test: add E2E test for admin dashboard
style: improve mobile responsive layout
refactor: extract HMAC logic into utility
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

### WordPress (Production)

- [ ] Upload compliance PDFs to Media Library
- [ ] Configure SMTP credentials (wp-config.php)
- [ ] Set Twilio production credentials
- [ ] Generate strong API key and secret
- [ ] Test REST API endpoints with production URLs
- [ ] Verify CORS settings allow production Next.js domain

### Next.js (Vercel)

- [ ] Connect GitHub repository
- [ ] Set environment variables in Vercel dashboard
- [ ] Configure custom domain DNS
- [ ] Enable Vercel Analytics
- [ ] Test production build locally (`npm run build && npm start`)
- [ ] Deploy and verify all pages load
- [ ] Test booking submission end-to-end

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

---

## Support & Resources

- **WordPress Codex:** https://developer.wordpress.org/
- **Next.js Docs:** https://nextjs.org/docs
- **shadcn/ui:** https://ui.shadcn.com/
- **Tailwind CSS:** https://tailwindcss.com/docs
- **WCAG Guidelines:** https://www.w3.org/WAI/WCAG21/quickref/
- **Schema.org:** https://schema.org/LocalBusiness

---

**Last Updated:** October 21, 2025
**Project Status:** MVP Development Phase

---

## Blog System Improvements (October 2025)

### Professional Blog Design Updates

The blog system has been enhanced with professional formatting based on industry-standard MSP/IT blog best practices:

#### Content Width & Layout
- **Widened article content** from 896px (`max-w-4xl`) to **1600px (`max-w-[1600px]`)**
- Matches professional MSP blogs like NinjaOne (1400px+ standard)
- Improved readability on modern wide screens
- Significantly reduced white space on sides for professional appearance

#### Typography Improvements
- **Body text**: Increased to 17px (from 14-16px) for optimal readability
- **Headings**: Larger, bolder hierarchy (H1: 60px, H2: 36px with border, H3: 24px)
- **Line height**: Relaxed spacing (`leading-relaxed`) for comfortable reading
- **Minimum 16px base** following professional blog standards

#### Blog Listing Page (`/blog`)
- **Featured images displaying**: Fixed image loading with `unoptimized={true}` for localhost images
- **Clean card design** with professional stock photos from Unsplash
- **Larger cards** with 32px padding (increased from 24px)
- **Enhanced hover effects**: Smooth shadow transitions and subtle lift
- **Better metadata display**: Calendar and user icons with improved spacing
- **Professional CTAs**: "Read Article" with arrow icons
- **Image dimensions**: 208px height (h-52) for consistent card appearance

#### Individual Post Pages (`/blog/[slug]`)
- **Content width**: Widened to 1600px (`max-w-[1600px]`) for professional appearance
- **Featured hero image**: Full-width 384px height banner with gradient overlay
- **Image optimization**: Using `unoptimized={true}` for localhost WordPress images
- **Professional blog formatting**: Applied SEO best practices via automated script
  - Shorter paragraphs (3-4 lines max) for improved readability
  - Internal links to Core Webhub (corewebhub.com.au) for backlinking
  - Core Webhub byline before conclusion for branding
  - Tip callout boxes with emoji icons and colored borders
  - Natural anchor text for internal linking
- **H2 headings**: Added bottom borders for visual section separation
- **Improved spacing**:
  - H2: 48px top margin, 24px bottom
  - H3: 32px top margin, 16px bottom
  - Paragraphs: 24px bottom margin
  - Lists: 24px vertical spacing
- **Enhanced card styling**: Rounded corners, subtle shadows, better borders
- **Larger CTA buttons**: Increased padding and rounded corners

#### Files Modified
- `/Users/abuuuthman/projects/ctc_project/web/src/app/blog/page.tsx`
  - Re-added featured images with `unoptimized={true}` for localhost compatibility
  - Fixed 400 errors on image loading from WordPress backend
  - Enhanced card hover states with image zoom effect
  - Improved metadata presentation
  - Added 208px height (h-52) image containers

- `/Users/abuuuthman/projects/ctc_project/web/src/app/blog/[slug]/page.tsx`
  - Changed `max-w-6xl` to `max-w-[1600px]` (1200px → 1600px)
  - Added `unoptimized={true}` to hero featured image
  - Increased body text to 17px with `prose-p:text-[17px]`
  - Added H2 bottom borders with `prose-h2:border-b`
  - Enhanced spacing throughout all content sections
  - Improved card styling with rounded corners and shadows

### Design Philosophy
- **No gradients**: Solid colors only per design system
- **WCAG AA compliant**: Maintained 4.5:1 contrast ratios
- **Professional appearance**: Matches enterprise MSP blog standards
- **Optimized readability**: Follows 2025 web typography best practices

---

## Homepage UX/UI Improvements (October 2025)

### Professional Business Positioning

The homepage has been refined to present CTC as a professional contractor service (vendor) rather than an individual, with focus on B2B messaging for MSPs and IT service providers.

#### Key Changes

**Hero Section** (`/Users/abuuuthman/projects/ctc_project/web/src/app/page.tsx`):
- **Badge**: Changed from "Smart-Hands Contractor | Regional Victoria" to "Professional On-Site Contractor | Regional Victoria"
- **Headline**: Changed from "Your Trusted Regional IT Contractor" to "On-Site Support Where Your Team Can't Reach"
- **Description**: Removed first-person language, emphasized professional contractor services and 4-hour response guarantee
- **Result**: Clear value proposition for MSPs who need regional coverage

**How It Works Section** (NEW):
- Added 3-step process visualization:
  1. **Submit Request** - Phone, email, or booking form submission
  2. **On-Site Dispatch** - Technician follows client procedures
  3. **Complete & Report** - Photo documentation and professional reporting
- **Key Benefits Grid**:
  - White-Label Service
  - Flexible Engagement Models
  - Fully Insured & Certified
  - Transparent Pricing
- **Design**: Numbered circular badges, center card highlighted with primary border
- **Purpose**: Clarifies the collaboration workflow for potential MSP clients

**Service Capabilities Section**:
- **Renamed** from "What I Can Help With" to "Service Capabilities"
- Removed all first-person language ("I can handle it" → "Professional contractor services")
- Maintained existing MSP and Retail Vendor service cards

**Header Navigation** (`/Users/abuuuthman/projects/ctc_project/web/src/components/layout/header.tsx`):
- **Added phone number**: 0432 405 388 with phone icon (hidden on mobile/tablet, visible on large screens)
- **Positioning**: Placed between "Blog" and "Request Info" button
- **Styling**: Uses primary color with hover state to secondary
- **Purpose**: Immediate contact option for urgent inquiries

#### Files Modified

1. `/Users/abuuuthman/projects/ctc_project/web/src/app/page.tsx`
   - Hero section messaging (lines 18-26)
   - Added "How It Works" section (lines 65-155)
   - Renamed "Service Capabilities" section (lines 161-166)
   - Added Accordion component import for future FAQ

2. `/Users/abuuuthman/projects/ctc_project/web/src/components/layout/header.tsx`
   - Added phone number link in desktop navigation (lines 73-81)
   - Includes phone icon SVG and tel: link

3. `/Users/abuuuthman/projects/ctc_project/web/src/components/ui/accordion.tsx`
   - Added shadcn/ui Accordion component (installed via CLI)

### Design Principles Applied

- **Professional Voice**: Eliminated first-person language, uses business-to-business tone
- **Clear Value Proposition**: Focuses on being a contractor service for MSPs/IT providers
- **White-Label Positioning**: Emphasizes that CTC represents client brands
- **Workflow Integration**: "How It Works" explains seamless process integration
- **Accessibility**: Phone number in header provides immediate contact option
- **No Gradients**: Maintained solid color design system
- **WCAG AA Compliance**: All new sections maintain 4.5:1 contrast ratios

### User Experience Goals

1. **MSP Decision-Makers**: Understand instantly that CTC is a professional contractor vendor
2. **Clear Process**: 3-step workflow shows how collaboration works
3. **Trust Signals**: Insurance, certifications, and transparent pricing prominently displayed
4. **Easy Contact**: Phone number in header for immediate inquiries
5. **Scalability**: Flexible engagement models (one-off, retainer, project-based)

---

**Last Updated:** October 28, 2025
**Blog Status:** Professional formatting complete with SEO optimization - 5 posts published with Core Webhub branding and internal linking
**Homepage Status:** Professional B2B positioning with "How It Works" section and phone contact in header

