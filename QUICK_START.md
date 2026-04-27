# Quick Start Guide - Photography Portfolio

## 5-Minute Setup

### What's Included
✅ Professional dark minimalist portfolio design
✅ Fully responsive layout (mobile, tablet, desktop)
✅ 7 complete sections (hero, services, gallery, about, testimonials, contact, footer)
✅ Filterable portfolio gallery with 6 sample images
✅ Contact form with validation
✅ Database schema ready for Supabase
✅ Admin setup guide

### Files to Customize

#### 1. **Photographer Information** (`components/hero-section.tsx`)
```tsx
// Line ~25: Change photographer name
I&apos;M ALEXANDER  // → Change to your name

// Line ~31: Update bio
A professional landscape, still-life, and architectural photographer...
```

#### 2. **Hero Image** (`components/hero-section.tsx`)
```tsx
// Line ~17: Replace with your image
src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?..."
```

#### 3. **About Section** (`components/about-section.tsx`)
```tsx
// Lines ~20-35: Update bio text
// Line ~39: Replace image URL
// Lines ~63-73: Update stats
```

#### 4. **Services** (`components/services-section.tsx`)
```tsx
// Lines ~8-23: Update service titles and descriptions
```

#### 5. **Portfolio Images** (`components/portfolio-section.tsx`)
```tsx
// Lines ~5-32: Replace image URLs with your portfolio
// Update titles and categories
```

#### 6. **Testimonials** (`components/testimonials-section.tsx`)
```tsx
// Lines ~5-20: Update client names, roles, and testimonials
```

### Environment Variables
No configuration needed! Supabase env vars are auto-configured.

### Deploy Immediately
The site is ready to deploy as-is. Just click the "Publish" button in v0.

## Customization Checklist

- [ ] Update photographer name in hero section
- [ ] Replace hero image
- [ ] Update "About Me" section text and image
- [ ] Customize services to match your offerings
- [ ] Add your portfolio images (update image URLs)
- [ ] Update testimonials with real client feedback
- [ ] Update contact information in footer
- [ ] Update meta tags in `app/layout.tsx`

## Database Setup (Optional)

If you want to manage content dynamically through Supabase:

### Step 1: Run Database Setup
```bash
node scripts/init-db.mjs
```

### Step 2: View Data in Supabase
- Go to your Supabase dashboard
- Navigate to Table Editor
- View tables: photographers, services, portfolios, testimonials

### Step 3: Update Component to Load from DB
See commented code in API route at `app/api/contact/route.ts`

## Image URLs

Currently using Unsplash images. Replace with your own:

**Replace these image URLs:**
- `components/hero-section.tsx` - Hero image
- `components/services-section.tsx` - Featured gallery preview (3 images)
- `components/portfolio-section.tsx` - Portfolio items (6+ images)
- `components/about-section.tsx` - About image
- `components/testimonials-section.tsx` - Optional client photos

**Use these image sources:**
- Vercel Blob (recommended for private uploads)
- Cloudinary
- AWS S3
- Any HTTPS image URL

## Contact Form

Form submissions are currently logged to console. To enable email:

1. **Set up email service:**
   - SendGrid
   - Resend
   - Gmail API
   - Or any email service

2. **Update `app/api/contact/route.ts`:**
```typescript
// Add email sending logic here
const response = await sendEmail({
  to: 'your-email@example.com',
  subject: `New inquiry from ${name}`,
  body: message
});
```

## Deployment Steps

### Option 1: Deploy with v0
1. Click "Publish" button in top right
2. Connect GitHub repository
3. Vercel auto-deploys on push

### Option 2: Deploy with CLI
```bash
pnpm install -g vercel
vercel
```

### Option 3: Manual GitHub Deploy
1. Push code to GitHub
2. Connect repo to Vercel dashboard
3. Auto-deploy on push

## Key Features Explained

### Navigation
- Fixed header with logo and links
- Mobile hamburger menu
- "Book Now" CTA button

### Hero Section
- Split layout (image + text)
- Large typography
- Clear value proposition

### Services Section
- 4 service cards with icons
- Gallery preview below
- "View All Services" button

### Portfolio Gallery
- Filter by category (All, Wedding, Portrait, Landscape, Product)
- 6 sample images
- Grayscale → Color hover effect

### About Section
- Photographer photo
- Professional bio
- 3 key stats

### Testimonials
- 3 client testimonials
- 5-star ratings
- Real feedback examples

### Contact Form
- Name, email, phone fields
- Service type dropdown
- Message textarea
- Form validation
- Success/error messages

## Styling

All styles use Tailwind CSS. To customize:

**Colors** - Edit `app/globals.css`:
```css
:root {
  --background: #0a0a0a;
  --foreground: #ffffff;
  /* etc */
}
```

**Fonts** - Already configured to Geist, no changes needed

**Spacing** - Tailwind scale (p-4, gap-6, etc.)

## Troubleshooting

### Images not loading
- Check URL is HTTPS
- Check CORS headers if using external URLs
- Use Vercel Blob for private uploads

### Form not submitting
- Check browser console for errors
- Verify form endpoint at `/api/contact`
- Check email configuration

### Styling looks off
- Clear browser cache
- Check dark mode is enabled
- Verify Tailwind CSS is compiled

## What's Next?

1. **Customize content** - Follow checklist above
2. **Deploy** - Click Publish button
3. **Set up email** - Configure contact form
4. **Add database** - Run `node scripts/init-db.mjs`
5. **Promote** - Share your portfolio!

## Support

- See `/admin/setup` for detailed setup instructions
- Check `README.md` for full documentation
- v0 docs: https://v0.dev

---

Ready to go! You have a professional portfolio. Now make it yours.
