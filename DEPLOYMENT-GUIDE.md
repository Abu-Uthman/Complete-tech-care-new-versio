# CTC Smart-Hands - Production Deployment Guide

**Date:** November 11, 2025
**Version:** v1.0 (MVP)
**Platform:** Vercel
**Status:** READY FOR DEPLOYMENT ✅

---

## Pre-Deployment Checklist ✅

### Build Verification
- [x] **TypeScript compilation:** PASSED (strict mode, no errors)
- [x] **ESLint checks:** PASSED (0 errors, 3 minor warnings)
- [x] **Production build:** SUCCESSFUL (17 pages generated)
- [x] **Route optimization:** All pages correctly configured

### Build Output Summary
```
Route (app)                   Revalidate  Expire
┌ ○ /                         -           -
├ ○ /_not-found               -           -
├ ƒ /api/book                 -           -
├ ○ /blog                     5m          1y
├ ƒ /blog/[slug]              -           -
├ ○ /book                     -           -
├ ○ /privacy                  -           -
├ ○ /rates                    -           -
├ ○ /services                 -           -
├ ○ /services/equipment-swap  -           -
├ ○ /services/infrastructure  -           -
├ ○ /services/logistics       -           -
├ ○ /services/onsite-support  -           -
├ ○ /services/pos-retail      -           -
├ ○ /services/site-audits     -           -
└ ○ /terms                    -           -

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```

---

## Step 1: Vercel Account Setup

### 1.1 Create Vercel Account (if needed)
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub (recommended for seamless deployment)
3. Authorize Vercel to access your GitHub repositories

### 1.2 Install Vercel CLI (Optional but Recommended)
```bash
npm install -g vercel
# or
pnpm add -g vercel
```

---

## Step 2: GitHub Repository Setup

### 2.1 Ensure Clean Git State
```bash
cd /Users/abuuuthman/projects/ctc_project
git status
```

### 2.2 Commit Current Changes
```bash
# Stage all changes
git add .

# Commit with descriptive message
git commit -m "feat: production-ready deployment with all 17 pages and Resend integration"

# Push to main branch
git push origin main
```

---

## Step 3: Vercel Project Setup (Dashboard Method)

### 3.1 Import Project
1. Log in to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Click **"Import Git Repository"**
4. Select your GitHub account and find `ctc_project` repository
5. Click **"Import"**

### 3.2 Configure Project Settings

**Framework Preset:** Next.js (should auto-detect)

**Root Directory:** `web` (CRITICAL - must specify subdirectory)

**Build & Output Settings:**
- Build Command: `pnpm build` (or leave default `next build`)
- Output Directory: `.next` (default)
- Install Command: `pnpm install` (or leave default)

**Node.js Version:** 20.x (default)

---

## Step 4: Environment Variables Configuration

### 4.1 Required Environment Variables

In the Vercel dashboard, go to **Settings → Environment Variables** and add:

#### Production Environment Variables

| Variable Name              | Value                                      | Environment       |
|---------------------------|--------------------------------------------|-------------------|
| `RESEND_API_KEY`          | `re_D84SPuH3_KktgLLD8wCiJ84HhBMc54bE6`     | Production        |
| `CONTRACTOR_EMAIL`        | `completetechcare@gmail.com`               | Production        |
| `NEXT_PUBLIC_SITE_URL`    | `https://your-domain.vercel.app`           | Production        |

#### Preview Environment Variables (Optional)

| Variable Name              | Value                                      | Environment       |
|---------------------------|--------------------------------------------|-------------------|
| `RESEND_API_KEY`          | `re_D84SPuH3_KktgLLD8wCiJ84HhBMc54bE6`     | Preview           |
| `CONTRACTOR_EMAIL`        | `completetechcare@gmail.com`               | Preview           |
| `NEXT_PUBLIC_SITE_URL`    | `https://your-project-preview.vercel.app`  | Preview           |

### 4.2 How to Add Environment Variables

1. In Vercel dashboard, navigate to your project
2. Click **Settings** → **Environment Variables**
3. Click **"Add New"**
4. Enter **Name:** `RESEND_API_KEY`
5. Enter **Value:** `re_D84SPuH3_KktgLLD8wCiJ84HhBMc54bE6`
6. Select **Environment:** `Production` (or all if you want)
7. Click **"Save"**
8. Repeat for `CONTRACTOR_EMAIL` and `NEXT_PUBLIC_SITE_URL`

**IMPORTANT NOTES:**
- `NEXT_PUBLIC_SITE_URL` will be your actual production URL (e.g., `https://ctc-smarthands.vercel.app`)
- Update this after your first deployment when you know your Vercel URL
- If using custom domain, update to `https://completetechcare.com.au` (or your domain)

---

## Step 5: Deploy to Production

### 5.1 Initial Deployment

**Method 1: Dashboard (Easiest)**
1. After configuring environment variables, click **"Deploy"**
2. Vercel will automatically:
   - Clone your repository
   - Install dependencies with pnpm
   - Run `pnpm build`
   - Deploy to production

**Method 2: CLI (Alternative)**
```bash
cd /Users/abuuuthman/projects/ctc_project/web

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N (first time)
# - Project name? ctc-smart-hands
# - Directory? ./
```

### 5.2 Monitor Deployment

1. Watch the build logs in real-time on Vercel dashboard
2. Deployment typically takes 2-3 minutes
3. Look for:
   - ✅ Installing dependencies
   - ✅ Building application
   - ✅ Generating static pages (17 pages)
   - ✅ Deployment complete

---

## Step 6: Post-Deployment Verification

### 6.1 Immediate Checks

Once deployment shows "Ready", visit your production URL:

**Production URL:** `https://[your-project-name].vercel.app`

#### Critical Page Tests
- [ ] **Homepage:** `https://your-domain.vercel.app/`
  - Hero section loads
  - Stats banner displays
  - FAQ accordion works
  - Phone number in header visible on desktop

- [ ] **Services Overview:** `https://your-domain.vercel.app/services`
  - All 6 service cards display
  - Links to detail pages work

- [ ] **Service Detail Pages:** Test all 6:
  - [ ] `/services/onsite-support`
  - [ ] `/services/equipment-swap`
  - [ ] `/services/site-audits`
  - [ ] `/services/pos-retail`
  - [ ] `/services/infrastructure`
  - [ ] `/services/logistics`

- [ ] **Rates Page:** `https://your-domain.vercel.app/rates`
  - Competitive rates banner displays
  - All 4 rate model cards visible
  - Travel cost details correct

- [ ] **Booking Page:** `https://your-domain.vercel.app/book`
  - "What to Expect" section displays
  - Form fields all render correctly
  - Submit button works

- [ ] **Blog:** `https://your-domain.vercel.app/blog`
  - Blog listing page loads (may show empty if WordPress not connected)

- [ ] **Legal Pages:**
  - [ ] `/privacy` - Privacy policy loads
  - [ ] `/terms` - Terms of service loads

### 6.2 Functional Tests

#### Test 1: Booking Form Submission
1. Go to `/book`
2. Fill out all required fields:
   - Contact Name: Test User
   - Email: your-email@example.com
   - Phone: 0412 345 678
   - Company: Test Company
   - Service Type: On-Site Support
   - Location: Bendigo
   - Details: Test booking submission
3. Click "Send Request"
4. Verify:
   - Success message displays
   - Form resets
   - Check `completetechcare@gmail.com` inbox for notification email

#### Test 2: Mobile Responsiveness
1. Open DevTools (F12)
2. Toggle device toolbar (mobile view)
3. Test on iPhone SE (375px), iPad (768px), Desktop (1440px)
4. Verify:
   - Navigation hamburger menu works on mobile
   - All text is readable (min 16px)
   - No horizontal scroll
   - Touch targets are at least 44px

#### Test 3: Accessibility Audit
1. Open DevTools → Lighthouse
2. Run audit for:
   - Homepage `/`
   - Services page `/services`
   - Booking page `/book`
3. Target Scores:
   - Performance: ≥90
   - Accessibility: 100 (required)
   - Best Practices: ≥90
   - SEO: ≥95

### 6.3 Performance Checks

#### Core Web Vitals (use PageSpeed Insights)
1. Go to [pagespeed.web.dev](https://pagespeed.web.dev/)
2. Enter your production URL
3. Verify metrics:
   - **LCP (Largest Contentful Paint):** <2.5s ✅
   - **FID (First Input Delay):** <100ms ✅
   - **CLS (Cumulative Layout Shift):** <0.1 ✅

---

## Step 7: Custom Domain Setup (Optional)

### 7.1 Add Custom Domain in Vercel

1. Go to Vercel dashboard → Your project
2. Click **Settings** → **Domains**
3. Click **"Add"**
4. Enter your domain: `completetechcare.com.au` (or your domain)
5. Click **"Add"**

### 7.2 Configure DNS Records

**If using Namecheap, GoDaddy, or other registrar:**

Add these DNS records:

```
Type    Name    Value                           TTL
A       @       76.76.21.21                     Automatic
CNAME   www     cname.vercel-dns.com           Automatic
```

**If using Cloudflare:**

```
Type    Name    Target                          Proxy Status
A       @       76.76.21.21                     Proxied
CNAME   www     cname.vercel-dns.com           Proxied
```

### 7.3 Update Environment Variables

After domain is active:
1. Go to Vercel → Settings → Environment Variables
2. Update `NEXT_PUBLIC_SITE_URL`:
   - Old: `https://ctc-smarthands.vercel.app`
   - New: `https://completetechcare.com.au`
3. Redeploy to apply changes

---

## Step 8: Ongoing Maintenance

### 8.1 Auto-Deployments (Continuous Deployment)

Vercel automatically deploys on every push to `main` branch:

```bash
# Make changes locally
git add .
git commit -m "feat: add new feature"
git push origin main

# Vercel automatically:
# 1. Detects push to main
# 2. Builds project
# 3. Deploys to production
# 4. Sends notification
```

### 8.2 Preview Deployments

Every pull request creates a preview deployment:

1. Create feature branch: `git checkout -b feature/new-page`
2. Make changes and commit
3. Push to GitHub: `git push origin feature/new-page`
4. Create Pull Request on GitHub
5. Vercel automatically creates preview URL
6. Test on preview before merging to main

### 8.3 Monitoring & Analytics

**Enable Vercel Analytics:**
1. Go to your project dashboard
2. Click **Analytics** tab
3. Click **"Enable Analytics"**
4. Get real-time traffic and performance data

**Enable Vercel Speed Insights:**
1. Go to **Speed Insights** tab
2. Click **"Enable Speed Insights"**
3. Monitor Core Web Vitals from real users

---

## Rollback Plan

### If Deployment Fails

#### Option 1: Redeploy Previous Version (Dashboard)
1. Go to Vercel dashboard → Deployments
2. Find the last working deployment (marked with green checkmark)
3. Click **"⋯"** → **"Promote to Production"**
4. Confirm rollback

#### Option 2: Revert Git Commit (CLI)
```bash
# Find the commit hash of the last working version
git log --oneline

# Revert to that commit
git revert HEAD

# Push to trigger redeployment
git push origin main
```

#### Option 3: Emergency Rollback (CLI)
```bash
# Login to Vercel
vercel login

# List recent deployments
vercel ls

# Promote specific deployment to production
vercel promote [deployment-url] --yes
```

### If Environment Variables are Wrong

1. Go to Vercel dashboard → Settings → Environment Variables
2. Click **"Edit"** on the incorrect variable
3. Update the value
4. Click **"Save"**
5. Go to Deployments tab
6. Click **"Redeploy"** on the latest deployment

---

## Troubleshooting Common Issues

### Issue 1: Build Fails with "Cannot find module"

**Cause:** Missing dependency or wrong root directory

**Solution:**
```bash
# Ensure all dependencies are installed
cd /Users/abuuuthman/projects/ctc_project/web
pnpm install

# Verify package.json includes all dependencies
cat package.json

# Push updated lock file
git add pnpm-lock.yaml
git commit -m "chore: update dependencies"
git push origin main
```

### Issue 2: Environment Variables Not Working

**Cause:** Variables not set or wrong environment

**Solution:**
1. Verify all 3 variables are set in Vercel dashboard
2. Ensure "Production" environment is selected
3. Redeploy after adding variables

### Issue 3: 404 on Dynamic Routes

**Cause:** Wrong Next.js configuration

**Solution:**
- Verify `web/next.config.ts` has correct output configuration
- Check that dynamic routes use proper file structure (`[slug]/page.tsx`)

### Issue 4: API Route Returns 500 Error

**Cause:** Missing Resend API key or invalid configuration

**Solution:**
1. Test Resend API key: https://resend.com/api-keys
2. Verify email domain is verified in Resend
3. Check Vercel logs: Dashboard → Deployment → Functions

### Issue 5: Slow Load Times

**Cause:** Large images or unoptimized assets

**Solution:**
- Use Next.js `<Image>` component (already implemented)
- Enable Vercel Image Optimization (automatic)
- Check Lighthouse report for specific recommendations

---

## Security Checklist

- [ ] **Environment variables:** Set only in Vercel dashboard (never in code)
- [ ] **.env.local:** Added to `.gitignore` (verified)
- [ ] **API keys:** Rotated and restricted to production domain
- [ ] **CORS:** Not needed (same-origin API routes)
- [ ] **Rate limiting:** Consider adding to `/api/book` route if spam occurs
- [ ] **Form validation:** Zod schemas implemented on server-side
- [ ] **Email sanitization:** All inputs sanitized before sending

---

## Performance Optimization Tips

### 1. Image Optimization
- All images already use Next.js `<Image>` component
- Vercel automatically optimizes images on-demand
- Consider adding blur placeholder for hero images

### 2. Font Optimization
- Inter font already configured as Next.js Font
- Font subsetting automatic
- Zero layout shift guaranteed

### 3. Code Splitting
- Automatic with Next.js App Router
- Each route is a separate bundle
- Shared components bundled efficiently

### 4. Caching Strategy
- Static pages cached at edge (all service pages)
- API routes use on-demand rendering
- Blog posts cached for 5 minutes (ISR)

---

## Cost Estimation

### Vercel Free Tier (Hobby)
- **Bandwidth:** 100 GB/month
- **Build Time:** 100 hours/month
- **Serverless Functions:** 100 GB-hours/month
- **Edge Network:** Global CDN included
- **Cost:** $0/month

### Expected Usage (First 3 Months)
- **Bandwidth:** ~5-10 GB/month (estimate: 1000 visitors)
- **Build Time:** ~30 minutes/month (assuming 10 deployments)
- **Serverless Functions:** ~1-2 GB-hours/month
- **Estimated Cost:** $0/month (well within free tier)

### Resend Email Service
- **Free Tier:** 100 emails/day
- **Expected Usage:** 5-20 bookings/day
- **Cost:** $0/month (free tier sufficient)

### Total Monthly Cost: $0

**Upgrade to Pro ($20/month) when:**
- Traffic exceeds 100 GB/month bandwidth
- Need priority support
- Want custom analytics
- Require team collaboration features

---

## Post-Launch Checklist

### Week 1: Monitoring
- [ ] Check Vercel Analytics daily
- [ ] Monitor booking form submissions
- [ ] Verify email notifications arriving
- [ ] Test all pages for broken links
- [ ] Check Google Search Console (if set up)

### Week 2: Optimization
- [ ] Review Lighthouse scores
- [ ] Check Core Web Vitals in real user data
- [ ] Analyze user behavior (Vercel Analytics)
- [ ] Optimize slow-loading pages if any

### Month 1: SEO
- [ ] Submit sitemap to Google Search Console
- [ ] Verify all meta descriptions are unique
- [ ] Check backlinks (if any)
- [ ] Monitor keyword rankings

---

## Support & Resources

### Vercel Documentation
- **Getting Started:** https://vercel.com/docs
- **Environment Variables:** https://vercel.com/docs/environment-variables
- **Custom Domains:** https://vercel.com/docs/custom-domains
- **Troubleshooting:** https://vercel.com/docs/troubleshooting

### Next.js Documentation
- **App Router:** https://nextjs.org/docs/app
- **Deployment:** https://nextjs.org/docs/deployment
- **Image Optimization:** https://nextjs.org/docs/app/api-reference/components/image

### Resend API
- **Documentation:** https://resend.com/docs
- **React Email:** https://react.email/docs
- **API Reference:** https://resend.com/docs/api-reference

### Project-Specific
- **Project Repo:** https://github.com/[your-username]/ctc_project
- **CLAUDE.md:** `/Users/abuuuthman/projects/ctc_project/CLAUDE.md`
- **Local Dev:** `cd web && pnpm dev` (runs on port 3003)

---

## Contact & Emergency

**Developer:** Abdisalam Awale
**Business Owner:** Complete Tech Care
**Business Email:** completetechcare@gmail.com
**Business Phone:** 0432 405 388

**Emergency Rollback Contact:**
- Vercel Support: support@vercel.com (Pro plan only)
- Community: https://github.com/vercel/vercel/discussions

---

## Deployment Timeline

**Estimated Total Time:** 20-30 minutes

| Task                          | Time     |
|------------------------------|----------|
| GitHub commit and push       | 2 min    |
| Vercel project import        | 3 min    |
| Environment variables setup  | 5 min    |
| Initial deployment           | 3 min    |
| Verification testing         | 10 min   |
| Custom domain setup (opt)    | 5 min    |
| **Total**                    | **28 min** |

---

## Next Steps After Deployment

1. **Test all functionality** (use checklist above)
2. **Update CLAUDE.md** with production URL
3. **Share production URL** with stakeholders
4. **Set up Google Analytics** (optional)
5. **Configure custom domain** (if ready)
6. **Enable Vercel Analytics** for monitoring
7. **Submit to Google Search Console** for SEO
8. **Create social media posts** announcing launch
9. **Monitor email notifications** for bookings
10. **Plan first round of updates** based on feedback

---

## Success Criteria

Deployment is considered successful when:

- [ ] All 17 pages load without errors
- [ ] Booking form successfully sends emails
- [ ] Lighthouse Accessibility score = 100
- [ ] Mobile navigation works correctly
- [ ] All service pages display properly
- [ ] No console errors in browser DevTools
- [ ] Performance scores ≥90 on PageSpeed Insights
- [ ] Email notifications arrive within 1 minute
- [ ] Custom domain resolves correctly (if configured)
- [ ] SSL certificate is active (automatic with Vercel)

---

**Deployment Status:** READY ✅
**Last Updated:** November 11, 2025
**Approved By:** CTC DevOps Specialist Agent

---

## Quick Reference Commands

```bash
# Local development
cd /Users/abuuuthman/projects/ctc_project/web
pnpm dev

# Build and test locally
pnpm build
pnpm start

# Deploy to Vercel (CLI)
vercel --prod

# Rollback deployment
vercel rollback [deployment-url]

# Check deployment logs
vercel logs [deployment-url]

# List all deployments
vercel ls

# Open project in browser
vercel open
```

---

**END OF DEPLOYMENT GUIDE**
