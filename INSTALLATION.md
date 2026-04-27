# Installation & Setup Guide

## Option 1: Clone from GitHub (Recommended for Development)

### Prerequisites
- Node.js 18+ installed
- Git installed
- GitHub account (optional)

### Step 1: Clone Repository
```bash
git clone <repository-url>
cd photography-portfolio
```

### Step 2: Install Dependencies
```bash
pnpm install
# or
npm install
# or
yarn install
```

### Step 3: Set Up Environment Variables
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
POSTGRES_URL=your_postgres_url
```

Get these values from:
1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to Settings → API
4. Copy the credentials

### Step 4: Initialize Database (Optional)
```bash
node scripts/init-db.mjs
```

Or run SQL manually:
1. Go to Supabase Dashboard
2. Click SQL Editor
3. Create new query
4. Copy contents of `scripts/01-create-tables.sql`
5. Run the query
6. Repeat with `scripts/02-seed-data.sql`

### Step 5: Run Development Server
```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

Visit `http://localhost:3000` in your browser.

## Option 2: Deploy to Vercel (Simplest)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### Step 2: Connect to Vercel
1. Go to [Vercel](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repository
4. Click "Import"

### Step 3: Set Environment Variables
1. In Vercel project settings
2. Go to Settings → Environment Variables
3. Add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `POSTGRES_URL`

### Step 4: Deploy
Click "Deploy" button. Vercel will:
- Build your Next.js app
- Optimize images
- Deploy to CDN
- Provide live URL

**That's it! Your portfolio is live.**

## Option 3: Using v0 (What We Used)

If using v0.dev:

### Step 1: Download from v0
1. Click three dots (⋯) in top right
2. Click "Download ZIP"
3. Extract the ZIP file

### Step 2: Install Locally
```bash
cd portfolio-project
pnpm install
```

### Step 3: Run Dev Server
```bash
pnpm dev
```

### Step 4: Deploy When Ready
1. Click "Publish" in v0
2. Connect GitHub repository
3. Auto-deploys to Vercel

## Supabase Setup Guide

### Create Supabase Account
1. Go to [Supabase](https://supabase.com)
2. Click "Start Your Project"
3. Sign up with GitHub or email
4. Create organization
5. Create project

### Initialize Database
```bash
# Option A: Auto-setup with script
node scripts/init-db.mjs

# Option B: Manual SQL setup
1. Go to SQL Editor in Supabase
2. Copy contents of scripts/01-create-tables.sql
3. Run the query
4. Repeat with scripts/02-seed-data.sql
```

### Get Credentials
1. Go to Settings → API
2. Copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - Anon Key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Service Role Key → `SUPABASE_SERVICE_ROLE_KEY`
3. Go to Settings → Database
4. Copy Connection String → `POSTGRES_URL`

### Enable Row-Level Security
Already configured in schema, but to verify:
1. Go to Tables
2. For each table, check RLS is "Enabled"
3. Policies should be visible

## Vercel Setup Guide

### Create Vercel Account
1. Go to [Vercel](https://vercel.com)
2. Sign up with GitHub/GitLab/Bitbucket
3. Authorize with Git provider

### Connect Repository
1. Click "New Project"
2. Select GitHub and authenticate
3. Choose your portfolio repository
4. Click "Import"

### Configure Project
1. Set Framework: Next.js (auto-detected)
2. Set Root Directory: ./ (default)
3. Environment Variables:
   - Add all Supabase variables
4. Click "Deploy"

### Custom Domain
1. Go to project Settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration

## Vercel Blob Setup (For Image Uploads)

### Enable in Vercel
1. Go to project Settings
2. Storage → Create
3. Select Blob Storage
4. Name: photography-uploads
5. Copy token for .env

### Upload Files
```typescript
import { put } from '@vercel/blob';

const blob = await put('filename.jpg', file, {
  access: 'private',
});
```

## Email Setup (For Contact Form)

### Option A: SendGrid
```bash
npm install @sendgrid/mail
```

1. Create SendGrid account
2. Get API key
3. Add to environment variables
4. Update contact API route

### Option B: Resend
```bash
npm install resend
```

1. Create Resend account
2. Get API key
3. Add to environment variables
4. Update contact API route

### Option C: Gmail API
1. Enable Gmail API in Google Cloud
2. Create service account
3. Add credentials to environment
4. Update contact API route

## Troubleshooting

### Port 3000 Already in Use
```bash
# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On Mac/Linux
lsof -i :3000
kill -9 <PID>
```

### Supabase Connection Error
1. Check environment variables
2. Verify Supabase project is active
3. Check database is running
4. Verify network access

### Images Not Loading
- Check image URLs are HTTPS
- Verify CORS headers
- Use Vercel Blob for private images

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next
pnpm build
pnpm dev
```

### Deployment Fails
1. Check build logs in Vercel
2. Verify all env vars are set
3. Check Node.js version compatibility
4. Test build locally: `pnpm build`

## Development Commands

### Build for Production
```bash
pnpm build
```

### Start Production Server
```bash
pnpm start
```

### Run TypeScript Check
```bash
pnpm type-check
```

### Format Code
```bash
pnpm format
```

### Lint Code
```bash
pnpm lint
```

## Customization Checklist

Before deploying, customize:

- [ ] Photographer name and bio
- [ ] Contact information
- [ ] Hero section image
- [ ] Service descriptions
- [ ] Portfolio images (6+)
- [ ] Testimonials
- [ ] Meta tags (title, description)
- [ ] Social media links
- [ ] Email settings
- [ ] Color theme (optional)

## Performance Tips

### Image Optimization
```tsx
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="Description"
  width={600}
  height={400}
  priority
/>
```

### Database Queries
- Use indexes for frequent queries
- Paginate large result sets
- Cache static content

### Deployment
- Enable Vercel Analytics
- Monitor Core Web Vitals
- Use Vercel Image Optimization

## Security Checklist

- [ ] Environment variables in .env.local (not committed)
- [ ] RLS enabled on all database tables
- [ ] API rate limiting configured
- [ ] CORS properly configured
- [ ] No sensitive data in client code
- [ ] HTTPS enabled on domain
- [ ] Content Security Policy headers

## Monitoring & Logging

### Vercel Analytics
1. Deployed project dashboard
2. Real-time traffic and errors
3. Performance metrics
4. Deployment history

### Supabase Monitoring
1. Supabase dashboard
2. Database performance
3. API usage
4. Error logs

### Application Logging
```typescript
console.log('[v0] Event occurred:', data);
console.error('[v0] Error:', error);
```

## Backup & Maintenance

### Database Backup
1. Go to Supabase Settings
2. Click Backup
3. Download backup regularly

### Code Backup
- Push to GitHub regularly
- Use GitHub releases for versions
- Keep deployment history

### Monitor Dependencies
```bash
# Check for updates
pnpm outdated

# Update packages
pnpm update
```

## Getting Help

- **Documentation**: See README.md
- **Quick Start**: See QUICK_START.md
- **v0 Support**: https://v0.dev
- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Support**: https://vercel.com/support

## Success Checklist

✅ Development server running locally
✅ Environment variables configured
✅ Database initialized
✅ Content customized
✅ Images uploaded
✅ Deployed to Vercel
✅ Custom domain connected
✅ Contact form working
✅ Email notifications configured
✅ Analytics enabled

---

You're all set! Your professional photography portfolio is ready to impress clients.
