# CTC Smart-Hands - Development Workflow

> Professional development workflow for smooth backend ↔ frontend integration

**Last Updated:** October 21, 2025

---

## Overview

This document outlines the development workflow for the CTC Smart-Hands project, ensuring smooth collaboration between WordPress backend and Next.js frontend.

---

## Development Environment Setup

### Prerequisites

✅ **Local by Flywheel** installed and running
✅ **Node.js** v20+ installed
✅ **pnpm** package manager installed
✅ **Git** installed
✅ **Chrome** browser (for DevTools MCP testing)

### First-Time Setup

```bash
# 1. Clone the repository
cd /Users/abuuuthman/projects
git clone <repository-url> ctc_project
cd ctc_project

# 2. WordPress is already in app/public/ (via Local by Flywheel)
# Navigate to WordPress admin and activate the ctc-smart-hands plugin

# 3. Install Next.js dependencies
cd frontend
pnpm install

# 4. Configure environment variables
cp .env.example .env.local
# Edit .env.local with your WordPress API credentials

# 5. Start development server
pnpm dev
```

---

## Daily Development Workflow

### Morning Routine

```bash
# 1. Start WordPress
# Open Local by Flywheel → Start ctcbackend site

# 2. Verify WordPress is running
curl http://ctcbackend.local
# Should return HTML

# 3. Start Next.js development server
cd /Users/abuuuthman/projects/ctc_project/frontend
pnpm dev

# 4. Open browser
# Frontend: http://localhost:3000
# WordPress Admin: http://ctcbackend.local/wp-admin
```

### Development Cycle

```
┌─────────────────────────────────────────────────────────┐
│                   SMOOTH WORKFLOW                        │
└─────────────────────────────────────────────────────────┘

1. PLAN
   ↓
   Write feature spec or user story
   ↓

2. BACKEND (if needed)
   ↓
   a. Modify WordPress plugin code
   b. Test with Postman (verify JSON response)
   c. Check database in phpMyAdmin
   d. Verify notifications sent
   ↓

3. FRONTEND
   ↓
   a. Create/modify components
   b. Test with Chrome DevTools MCP
   c. Verify accessibility (Lighthouse)
   d. Test responsive design
   ↓

4. INTEGRATION
   ↓
   a. Connect frontend to WordPress API
   b. Test end-to-end flow
   c. Verify data persistence
   ↓

5. TEST
   ↓
   a. Run unit tests (pnpm test)
   b. Run E2E tests (pnpm test:e2e)
   c. Manual QA
   ↓

6. COMMIT
   ↓
   git add .
   git commit -m "feat: descriptive message"
   git push
```

---

## WordPress Plugin Development

### File Structure

```
app/public/wp-content/plugins/ctc-smart-hands/
├── ctc-smart-hands.php          # Main plugin file
├── includes/
│   ├── class-database.php        # Database operations
│   ├── class-rest-api.php        # REST endpoints
│   ├── class-auth.php            # HMAC authentication
│   ├── class-notify.php          # Email/SMS notifications
│   └── class-helpers.php         # Utility functions
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

### Making Changes

```bash
# 1. Edit plugin file
# Example: includes/class-rest-api.php

# 2. Refresh WordPress admin to see changes
# (PHP changes are immediate, no rebuild needed)

# 3. Test with Postman
# Example: POST http://ctcbackend.local/wp-json/ctc/v1/bookings

# 4. Check WordPress error log
tail -f /Users/abuuuthman/projects/ctc_project/logs/php/error.log

# 5. Verify database changes
# Open phpMyAdmin via Local by Flywheel
# Check wp_ctc_bookings table
```

### Testing WordPress API

**Use Postman Collection:**

```
Collection: CTC Smart-Hands API
├── Public Endpoints
│   ├── GET /rates
│   └── GET /downloads
└── Authenticated Endpoints
    ├── POST /bookings (with HMAC headers)
    ├── GET /bookings
    ├── GET /bookings/{id}
    ├── PATCH /bookings/{id}
    └── POST /bookings/{id}/notify
```

**HMAC Headers (for authenticated endpoints):**

```
X-CTC-Key: your-api-key
X-CTC-Timestamp: 1729526400
X-CTC-Signature: calculated-hmac-sha256
```

---

## Next.js Frontend Development

### File Structure

```
frontend/
├── app/
│   ├── (public)/
│   │   ├── page.tsx              # Landing page
│   │   └── layout.tsx
│   ├── admin/
│   │   ├── page.tsx              # Dashboard
│   │   └── bookings/[id]/page.tsx
│   └── api/
│       └── book/route.ts         # Booking API route
├── components/
│   ├── forms/
│   │   └── booking-form.tsx      # Main form (critical!)
│   ├── display/
│   │   ├── rates-card.tsx
│   │   └── downloads.tsx
│   └── ui/                       # shadcn components
├── lib/
│   ├── wordpress/
│   │   ├── client.ts             # API client
│   │   ├── types.ts              # TypeScript types
│   │   └── hmac.ts               # HMAC signing
│   └── validations/
│       └── booking-schema.ts     # Zod schemas
└── .env.local
```

### Making Changes

```bash
# 1. Edit component or page
# Example: components/forms/booking-form.tsx

# 2. Hot Module Reload (HMR) updates browser automatically
# Check http://localhost:3000

# 3. Open Chrome DevTools (F12)
# - Check Console for errors
# - Inspect Elements for layout issues
# - Run Lighthouse for accessibility

# 4. Test responsiveness
# DevTools → Device Mode → Test mobile/tablet

# 5. If TypeScript errors:
pnpm type-check

# 6. If linting issues:
pnpm lint --fix
```

### Chrome DevTools MCP Checkpoints

Use Chrome DevTools MCP at these stages:

✅ **After creating component:**
- Visual inspection
- Color palette verification
- Spacing consistency

✅ **After form implementation:**
- Accessibility panel check
- Keyboard navigation test
- Error state contrast

✅ **Before commit:**
- Lighthouse audit (P≥90, A=100, S≥95)
- Mobile responsive test
- Performance check

✅ **Before deployment:**
- Full production audit
- Cross-browser test
- Real device test

---

## Common Development Tasks

### 1. Adding a New Booking Field

**Backend (WordPress):**

```php
// 1. Add column to database (includes/class-database.php)
$wpdb->query("ALTER TABLE {$wpdb->prefix}ctc_bookings
              ADD COLUMN new_field VARCHAR(255) AFTER existing_field");

// 2. Update REST API (includes/class-rest-api.php)
'new_field' => sanitize_text_field($request['new_field']),

// 3. Update validation
if (empty($data['new_field'])) {
    return new WP_Error('missing_field', 'New field is required', ['status' => 400]);
}
```

**Frontend (Next.js):**

```typescript
// 1. Update TypeScript type (lib/wordpress/types.ts)
export interface Booking {
  // ... existing fields
  new_field: string;
}

// 2. Update Zod schema (lib/validations/booking-schema.ts)
newField: z.string().min(1, 'New field required').max(255),

// 3. Add to form (components/forms/booking-form.tsx)
<Input
  label="New Field"
  {...register('newField')}
  error={errors.newField}
/>
```

### 2. Changing Rate Calculation

**Backend Only:**

```php
// 1. Update Settings (WordPress admin)
// Settings → CTC Rates → Modify values

// 2. Update calculation logic (includes/class-helpers.php)
public static function calculate_rate($hours, $is_after_hours) {
    $rates = get_option('ctc_rates');
    $hourly = $is_after_hours ? $rates['ahHourly'] : $rates['bhHourly'];
    return $hourly * $hours;
}
```

**Frontend:**
- No changes needed! Rates fetched from WordPress API automatically.

### 3. Modifying Email Template

**Backend Only:**

```php
// 1. Edit template (WordPress admin)
// Settings → CTC Notifications → Email Templates

// 2. Available tokens:
// {public_id}, {company}, {po}, {site_id}, {sla},
// {contact}, {phone}, {address}, {work_type}

// Example template:
New booking {public_id} for {company}
PO: {po}
Site: {site_id}
SLA: {sla}
```

**Frontend:**
- No changes needed!

### 4. Adding a New Public Page

**Frontend Only:**

```bash
# 1. Create page file
touch frontend/app/(public)/services/page.tsx

# 2. Add content
export default function ServicesPage() {
  return (
    <div>
      <h1>Our Services</h1>
      {/* content */}
    </div>
  );
}

# 3. Add to navigation (components/navigation.tsx)
<Link href="/services">Services</Link>

# 4. Test at http://localhost:3000/services
```

---

## Testing Workflow

### 1. Unit Tests (Frontend)

```bash
cd frontend

# Run all tests
pnpm test

# Run specific test file
pnpm test booking-form.test.tsx

# Run in watch mode (during development)
pnpm test --watch

# Run with coverage
pnpm test --coverage
```

### 2. E2E Tests (Playwright)

```bash
cd frontend

# Run E2E tests (headless)
pnpm dlx playwright test

# Run with browser visible (debugging)
pnpm dlx playwright test --headed

# Run specific test
pnpm dlx playwright test tests/booking-flow.spec.ts

# Generate test report
pnpm dlx playwright show-report
```

### 3. Accessibility Testing

```bash
# Lighthouse audit (command line)
pnpm dlx lighthouse http://localhost:3000 --view

# Or use Chrome DevTools:
# 1. Open page in Chrome
# 2. F12 → Lighthouse tab
# 3. Select "Accessibility" + "SEO"
# 4. Click "Generate report"
# Target: Accessibility 100/100
```

### 4. Manual QA Checklist

Before committing major features:

✅ **Functionality**
- [ ] Feature works as expected
- [ ] No console errors
- [ ] No network errors (check DevTools Network tab)

✅ **Accessibility**
- [ ] Keyboard navigation works (Tab through page)
- [ ] Focus indicators visible
- [ ] Screen reader announces content
- [ ] Color contrast ≥4.5:1

✅ **Responsive Design**
- [ ] Mobile (375px): Layout correct, text readable
- [ ] Tablet (768px): Layout adapts properly
- [ ] Desktop (1440px): Optimal use of space

✅ **Forms** (Critical!)
- [ ] All required fields validated
- [ ] Error messages clear and helpful
- [ ] Success state shows confirmation
- [ ] Submission creates database record
- [ ] Notifications sent

---

## Git Workflow

### Commit Message Convention

Use conventional commits format:

```
<type>(<scope>): <description>

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- style: Code style (formatting, no logic change)
- refactor: Code refactoring
- test: Adding/updating tests
- chore: Build process, dependencies

Examples:
feat(booking-form): add parts tracking field
fix(api): correct HMAC timestamp validation
docs(readme): update installation steps
style(landing): improve mobile spacing
test(booking): add E2E test for form submission
```

### Branch Strategy

```bash
# Main branch (production-ready)
main

# Feature branches
git checkout -b feat/booking-form-validation
git checkout -b fix/email-notification-bug
git checkout -b docs/api-documentation

# After work is complete:
git add .
git commit -m "feat(booking): add validation for phone field"
git push origin feat/booking-form-validation

# Create Pull Request (or merge if solo)
```

### Before Committing

```bash
# 1. Type check
cd frontend && pnpm type-check

# 2. Lint
pnpm lint

# 3. Format (if using Prettier)
pnpm format

# 4. Test
pnpm test

# 5. Build (catch production errors)
pnpm build

# If all pass ✅, commit:
git add .
git commit -m "feat: descriptive message"
git push
```

---

## Debugging

### WordPress Issues

**PHP Errors:**
```bash
# Check error log
tail -f /Users/abuuuthman/projects/ctc_project/logs/php/error.log

# Enable WordPress debugging (wp-config.php)
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);
```

**Database Issues:**
```bash
# Access phpMyAdmin via Local by Flywheel
# Check tables: wp_ctc_bookings, wp_ctc_booking_notes

# Or use WP-CLI:
wp db query "SELECT * FROM wp_ctc_bookings ORDER BY id DESC LIMIT 5"
```

**API Issues:**
```bash
# Test endpoint with curl
curl -v http://ctcbackend.local/wp-json/ctc/v1/rates

# Check CORS headers
curl -I -X OPTIONS http://ctcbackend.local/wp-json/ctc/v1/bookings

# Test with invalid HMAC (should return 401)
curl -X POST http://ctcbackend.local/wp-json/ctc/v1/bookings \
  -H "X-CTC-Key: wrong-key" \
  -H "X-CTC-Timestamp: $(date +%s)" \
  -H "X-CTC-Signature: invalid"
```

### Next.js Issues

**Build Errors:**
```bash
cd frontend

# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Try build again
pnpm build
```

**TypeScript Errors:**
```bash
# Check specific file
pnpm tsc --noEmit app/page.tsx

# Check entire project
pnpm type-check
```

**Runtime Errors:**
```bash
# Check browser console (F12)
# Check Next.js terminal output
# Check Network tab for failed requests
```

---

## Performance Optimization

### Monitoring

```bash
# Lighthouse audit
pnpm dlx lighthouse http://localhost:3000 --view

# Bundle analysis
cd frontend
pnpm build
pnpm dlx @next/bundle-analyzer
```

### Optimization Checklist

✅ **Images:**
- [ ] Use next/image component
- [ ] Proper sizing (no oversized images)
- [ ] WebP format
- [ ] Alt text for accessibility

✅ **Fonts:**
- [ ] Use variable fonts (Inter)
- [ ] Preload critical fonts
- [ ] font-display: swap

✅ **JavaScript:**
- [ ] Code splitting (dynamic imports)
- [ ] Server Components where possible
- [ ] Client Components only when needed

✅ **API Calls:**
- [ ] Use Server Components for data fetching
- [ ] Implement caching (revalidate)
- [ ] Parallel requests where possible

---

## Deployment Checklist

### Pre-Deployment

✅ **WordPress**
- [ ] All settings configured
- [ ] Compliance PDFs uploaded
- [ ] SMTP credentials verified
- [ ] Twilio credentials verified
- [ ] API keys generated (production-strength)
- [ ] Database backed up

✅ **Next.js**
- [ ] All tests passing
- [ ] Build successful (pnpm build)
- [ ] Environment variables documented
- [ ] .env.production prepared (not committed!)
- [ ] Lighthouse scores: P≥90, A=100, S≥95

### Deployment

✅ **WordPress (Production)**
1. Upload plugin to production WordPress
2. Activate plugin
3. Configure all settings
4. Test API endpoints with Postman

✅ **Next.js (Vercel)**
1. Push code to GitHub
2. Connect repo to Vercel
3. Set environment variables
4. Deploy
5. Test production URL

### Post-Deployment

✅ **Smoke Tests**
- [ ] Homepage loads
- [ ] Booking form submits successfully
- [ ] WordPress creates booking record
- [ ] Owner receives email + SMS
- [ ] Dispatcher receives email
- [ ] Admin dashboard loads
- [ ] Lighthouse audit passes

---

## Maintenance

### Weekly Tasks

- Review error logs (WordPress + Vercel)
- Check booking submissions (any issues?)
- Monitor email/SMS delivery rates
- Review Vercel Analytics (traffic, performance)

### Monthly Tasks

- Update WordPress core + plugins
- Update Node.js dependencies (`pnpm update`)
- Review and archive old bookings
- Backup database
- Review Lighthouse scores

---

## Support Resources

- **WordPress Codex:** https://developer.wordpress.org/
- **Next.js Docs:** https://nextjs.org/docs
- **pnpm Docs:** https://pnpm.io/
- **Tailwind CSS:** https://tailwindcss.com/docs
- **shadcn/ui:** https://ui.shadcn.com/
- **WCAG Guidelines:** https://www.w3.org/WAI/WCAG21/quickref/

---

**Remember:**
- ✅ Use pnpm (not npm or yarn)
- ✅ Test with Chrome DevTools MCP frequently
- ✅ Forms are critical - test thoroughly!
- ✅ Accessibility is non-negotiable (WCAG AA minimum)
- ✅ NO gradients in design

---

**Last Updated:** October 21, 2025
