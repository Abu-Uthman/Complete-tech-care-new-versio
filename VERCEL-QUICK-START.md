# Vercel Deployment - Quick Start Guide

**Project:** CTC Smart-Hands
**Status:** READY FOR DEPLOYMENT ✅
**Time Required:** 20-30 minutes

---

## Pre-Flight Check ✅

- [x] Build successful (17 pages)
- [x] TypeScript: 0 errors
- [x] ESLint: 0 errors
- [x] Performance: LCP 542ms, CLS 0.00
- [x] All pages tested and working

---

## 5-Step Deployment Process

### Step 1: Commit & Push (2 min)

```bash
cd /Users/abuuuthman/projects/ctc_project
git add .
git commit -m "feat: production-ready deployment - all 17 pages complete"
git push origin main
```

### Step 2: Import to Vercel (3 min)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository"
3. Select `ctc_project`
4. **IMPORTANT:** Set "Root Directory" to `web`
5. Leave other settings as default
6. Click "Deploy" (DON'T deploy yet, add env vars first!)

### Step 3: Environment Variables (5 min)

Before deploying, add these in the import screen or Settings → Environment Variables:

```bash
RESEND_API_KEY=re_D84SPuH3_KktgLLD8wCiJ84HhBMc54bE6
CONTRACTOR_EMAIL=completetechcare@gmail.com
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
```

**Note:** Update `NEXT_PUBLIC_SITE_URL` after first deployment with your actual URL.

### Step 4: Deploy (3 min)

1. Click "Deploy" button
2. Wait 2-3 minutes
3. Watch build logs for "Build successful"
4. Copy your production URL (e.g., `https://ctc-smart-hands.vercel.app`)

### Step 5: Verify (10 min)

Visit your production URL and test:

- [ ] Homepage loads
- [ ] Navigate to `/book`
- [ ] Fill out booking form
- [ ] Submit form
- [ ] Check `completetechcare@gmail.com` for email
- [ ] Test all service pages (`/services/*`)
- [ ] Test rates page (`/rates`)
- [ ] Run Lighthouse audit (target: Accessibility 100)

---

## Environment Variables Explained

### RESEND_API_KEY
**Purpose:** Sends booking notification emails
**Value:** `re_D84SPuH3_KktgLLD8wCiJ84HhBMc54bE6`
**Get from:** [resend.com/api-keys](https://resend.com/api-keys)

### CONTRACTOR_EMAIL
**Purpose:** Where booking notifications are sent
**Value:** `completetechcare@gmail.com`
**Note:** Must be a verified sender in Resend

### NEXT_PUBLIC_SITE_URL
**Purpose:** Used in emails and metadata
**Value:** `https://your-actual-domain.vercel.app`
**Note:** Update after first deployment with real URL

---

## Common Issues & Fixes

### Issue: "Build failed - cannot find module"
**Fix:** Ensure "Root Directory" is set to `web` (not root)

### Issue: "Environment variable not found"
**Fix:** Add all 3 env vars in Vercel dashboard, then redeploy

### Issue: "404 on all pages"
**Fix:** Wrong root directory. Set to `web` in Settings → General

### Issue: "Email not sending"
**Fix:** Verify email domain in Resend dashboard

---

## After Successful Deployment

1. **Update CLAUDE.md:**
   - Add production URL
   - Update deployment status

2. **Update NEXT_PUBLIC_SITE_URL:**
   - Go to Settings → Environment Variables
   - Update with actual production URL
   - Redeploy

3. **Optional: Custom Domain**
   - Go to Settings → Domains
   - Add your domain (e.g., `completetechcare.com.au`)
   - Update DNS records as instructed
   - Wait for DNS propagation (up to 48 hours)

4. **Enable Analytics:**
   - Go to Analytics tab
   - Click "Enable Analytics"
   - Monitor traffic and performance

---

## Quick Commands

```bash
# Local development
cd /Users/abuuuthman/projects/ctc_project/web
pnpm dev

# Production build test
pnpm build
pnpm start

# Deploy via CLI (alternative)
npm install -g vercel
vercel login
vercel --prod
```

---

## Support Resources

- **Comprehensive Guide:** `/Users/abuuuthman/projects/ctc_project/DEPLOYMENT-GUIDE.md`
- **Pre-Deployment Checklist:** `/Users/abuuuthman/projects/ctc_project/DEPLOYMENT-CHECKLIST.md`
- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Next.js Deployment:** [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)

---

## Project Stats

- **Total Pages:** 17
- **Build Time:** ~6 seconds
- **Bundle Size:** Optimized with Next.js 16
- **Performance:** LCP 542ms, CLS 0.00
- **Expected Cost:** $0/month (free tier)

---

## Success Checklist

After deployment, verify these:

- [ ] Homepage loads without errors
- [ ] Booking form submits successfully
- [ ] Email notifications arrive
- [ ] All 17 pages are accessible
- [ ] Mobile navigation works
- [ ] Lighthouse Accessibility score = 100
- [ ] No console errors in browser DevTools
- [ ] SSL certificate is active (automatic)

---

**READY TO DEPLOY: YES ✅**

**Next Step:** Go to [vercel.com/new](https://vercel.com/new) and import your project!

---

**Questions?**
- Email: completetechcare@gmail.com
- Phone: 0432 405 388
