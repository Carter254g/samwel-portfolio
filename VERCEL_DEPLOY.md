# Vercel Deployment Guide

## Overview
This is a **Next.js 16** app (frontend + backend API routes) deployed as a single project on Vercel.
The backend is Supabase (PostgreSQL + Storage). No separate server needed.

---

## Step 1 — Run the Database Migration

In your **Supabase Dashboard → SQL Editor**, run:

```
scripts/04-add-image-columns.sql
```

This adds `hero_image_url` and `about_image_url` columns to `photographers`,
and creates the `portfolio-images` Storage bucket.

> If the bucket already exists or you prefer the UI:
> Supabase Dashboard → Storage → New Bucket → Name: `portfolio-images` → Public: ✅

---

## Step 2 — Set Up Supabase Storage (if not done via SQL)

1. Supabase Dashboard → **Storage**
2. Create bucket named `portfolio-images` with **Public** access ON
3. Under Policies for that bucket, add:
   - SELECT (read): `true` (public reads)
   - INSERT: `true` (or restrict to service role)
   - DELETE: `true` (or restrict to service role)

---

## Step 3 — Deploy to Vercel

### Option A — Via Vercel CLI
```bash
npm i -g vercel
cd your-project-folder
vercel
```

### Option B — Via GitHub
1. Push this project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repository
4. Vercel auto-detects Next.js — no framework config needed

---

## Step 4 — Set Environment Variables on Vercel

In your Vercel project → **Settings → Environment Variables**, add:

| Variable | Value | Where to find it |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxx.supabase.co` | Supabase → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJ...` (anon key) | Supabase → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJ...` (service_role key) | Supabase → Settings → API |

> ⚠️ `SUPABASE_SERVICE_ROLE_KEY` is secret — it's only used server-side in API routes. Never expose it in client code.

---

## Step 5 — Redeploy

After adding env variables, trigger a redeploy:
- Vercel Dashboard → your project → **Deployments** → Redeploy latest

---

## Step 6 — Seed the Database (first time only)

If you haven't already created an admin user, run the setup script locally:

```bash
# Copy .env.local with your Supabase credentials first
cp .env.example .env.local
# Edit .env.local with your values, then:
node scripts/setup-admin.mjs
```

This creates the photographer record and admin login.

---

## Admin Panel

After deployment, access the admin at:
```
https://your-vercel-domain.vercel.app/admin
```

Default credentials are set by `setup-admin.mjs`. Change the password after first login.

---

## What the Admin Can Do

| Tab | Feature |
|---|---|
| **Site Images** | Upload/replace the Hero section image and About section image |
| **Portfolio** | Add, edit, delete portfolio images (upload files or paste URLs) |
| **Services** | View services from the database |
| **Testimonials** | View testimonials from the database |
| **Contacts** | Read and manage contact form submissions |

---

## Architecture

```
Vercel (Next.js)
├── / → public portfolio site (fetches from DB dynamically)
├── /admin → admin dashboard (protected by session)
└── /api/
    ├── portfolio → public portfolio images
    ├── photographer → public photographer profile
    └── admin/
        ├── login → authenticate admin
        ├── portfolio → CRUD portfolio images
        ├── services → CRUD services
        ├── testimonials → CRUD testimonials
        ├── contacts → manage contact submissions
        ├── upload → upload images to Supabase Storage
        └── photographer → update hero/about images

Supabase
├── PostgreSQL → all data
└── Storage → uploaded images (bucket: portfolio-images)
```

---

## Local Development

```bash
# Install dependencies
pnpm install

# Create .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Run dev server
pnpm dev
```
