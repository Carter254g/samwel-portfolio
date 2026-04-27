# Backend Setup & Deployment Guide

## System Architecture

```
┌─────────────────────────────────────────┐
│      SAMWEL Photography Portfolio       │
├─────────────────────────────────────────┤
│  Frontend (Next.js React Components)    │
├─────────────────────────────────────────┤
│  API Routes (Node.js Backend)           │
│  • /api/admin/login                     │
│  • /api/admin/portfolio                 │
│  • /api/admin/services                  │
│  • /api/admin/testimonials              │
│  • /api/admin/contacts                  │
├─────────────────────────────────────────┤
│  Database (Supabase PostgreSQL)         │
│  • photographers                        │
│  • services                             │
│  • portfolio_images                     │
│  • testimonials                         │
│  • contact_submissions                  │
│  • admin_users                          │
└─────────────────────────────────────────┘
```

## Prerequisites

- Node.js 18+ installed
- pnpm package manager
- Supabase account and project
- Vercel account (for deployment)
- Git for version control

## Initial Setup

### 1. Environment Variables

All required environment variables are automatically set by Vercel when you connect Supabase.

Required variables:
```
SUPABASE_URL
NEXT_PUBLIC_SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_JWT_SECRET
POSTGRES_URL
POSTGRES_PRISMA_URL
POSTGRES_URL_NON_POOLING
POSTGRES_USER
POSTGRES_PASSWORD
POSTGRES_DATABASE
POSTGRES_HOST
```

### 2. Database Initialization

Run the setup script to create tables and seed initial data:

```bash
# Install dependencies
pnpm install bcryptjs @supabase/supabase-js

# Run the setup script
node scripts/setup-admin.mjs
```

This will:
- Create all required database tables
- Set up Row-Level Security (RLS) policies
- Create initial photographer entry (SAMWEL)
- Create admin user account
- Seed sample services
- Seed sample portfolio images
- Seed sample testimonials

### 3. Verify Setup

Check that the admin panel is accessible:
1. Navigate to `http://localhost:3000/admin/login`
2. Log in with:
   - Email: `admin@samwel.com`
   - Password: `admin@samwel123`
3. You should see the admin dashboard

## File Structure

```
/app
  /api
    /admin
      /login
        route.ts          # Admin authentication
      /portfolio
        route.ts          # CRUD for portfolio images
      /services
        route.ts          # CRUD for services
      /testimonials
        route.ts          # CRUD for testimonials
      /contacts
        route.ts          # Contact form management
    /contact
      route.ts            # Public contact form submission
  /admin
    /login
      page.tsx            # Admin login page
    /dashboard
      page.tsx            # Main admin dashboard
    /setup
      page.tsx            # Setup guide
  /page.tsx               # Homepage

/components
  /hero-section.tsx
  /services-section.tsx
  /portfolio-section.tsx
  /about-section.tsx
  /testimonials-section.tsx
  /contact-section.tsx
  /navigation.tsx
  /footer.tsx

/scripts
  /01-create-tables.sql       # Initial schema
  /02-seed-data.sql           # Sample data
  /03-setup-admin-db.sql      # Admin schema
  /setup-admin.mjs            # Setup script
  /init-db.mjs                # Database init
```

## API Endpoints Documentation

### Authentication

**POST /api/admin/login**

Authenticate admin user.

Request:
```json
{
  "email": "admin@samwel.com",
  "password": "admin@samwel123"
}
```

Response:
```json
{
  "success": true,
  "admin": {
    "id": "uuid",
    "email": "admin@samwel.com",
    "photographer_id": "uuid"
  },
  "photographer": {
    "id": "uuid",
    "name": "SAMWEL",
    "bio": "...",
    "years_experience": 5,
    "projects_completed": 100
  }
}
```

### Portfolio Images

**GET /api/admin/portfolio?photographer_id={id}**

Get all portfolio images for a photographer.

Response:
```json
{
  "images": [
    {
      "id": "uuid",
      "photographer_id": "uuid",
      "title": "Wedding Ceremony",
      "description": "...",
      "image_url": "https://...",
      "category": "Wedding",
      "order_num": 1,
      "is_active": true
    }
  ]
}
```

**POST /api/admin/portfolio**

Create a new portfolio image.

Request:
```json
{
  "photographer_id": "uuid",
  "title": "New Image",
  "description": "Image description",
  "image_url": "https://...",
  "category": "Portrait",
  "order_num": 1,
  "is_active": true
}
```

**PUT /api/admin/portfolio**

Update a portfolio image.

Request:
```json
{
  "id": "uuid",
  "title": "Updated Title",
  "description": "Updated description",
  "image_url": "https://...",
  "category": "Landscape",
  "order_num": 2,
  "is_active": true
}
```

**DELETE /api/admin/portfolio?id={id}**

Delete a portfolio image.

### Services

**GET /api/admin/services?photographer_id={id}**

Get all services for a photographer.

**POST /api/admin/services**

Create a new service.

Request:
```json
{
  "photographer_id": "uuid",
  "title": "Service Title",
  "description": "Service description",
  "icon_name": "Heart",
  "order_num": 1,
  "is_active": true
}
```

**PUT /api/admin/services**

Update a service.

**DELETE /api/admin/services?id={id}**

Delete a service.

### Testimonials

**GET /api/admin/testimonials?photographer_id={id}**

Get all testimonials for a photographer.

**POST /api/admin/testimonials**

Create a new testimonial.

Request:
```json
{
  "photographer_id": "uuid",
  "client_name": "John Doe",
  "client_title": "CEO",
  "content": "Amazing work!",
  "rating": 5,
  "is_featured": true,
  "order_num": 1
}
```

**PUT /api/admin/testimonials**

Update a testimonial.

**DELETE /api/admin/testimonials?id={id}**

Delete a testimonial.

### Contact Submissions

**GET /api/admin/contacts?limit=50&offset=0**

Get contact form submissions.

Response:
```json
{
  "contacts": [
    {
      "id": "uuid",
      "name": "Client Name",
      "email": "client@email.com",
      "phone": "+1234567890",
      "subject": "Wedding Photography",
      "message": "I would like to book...",
      "service_interest": "Wedding Session",
      "is_read": false,
      "is_archived": false,
      "created_at": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 25,
  "limit": 50,
  "offset": 0
}
```

**PUT /api/admin/contacts**

Mark contact as read/archived.

Request:
```json
{
  "id": "uuid",
  "is_read": true,
  "is_archived": false
}
```

**DELETE /api/admin/contacts?id={id}**

Delete a contact submission.

## Deployment to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit - SAMWEL Photography Portfolio"
git push origin main
```

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js
5. Click "Deploy"

### 3. Set Environment Variables

In Vercel dashboard:
1. Go to Project Settings
2. Navigate to Environment Variables
3. The Supabase variables should already be configured
4. Verify all are present

### 4. Deploy

```bash
# Deploy from CLI
vercel

# Or push to GitHub and Vercel auto-deploys
```

## Database Backup & Recovery

### Automatic Backups

Supabase automatically creates backups:
- Daily backups retained for 14 days
- Weekly backups retained for 4 weeks
- Monthly backups retained for 1 year

### Manual Backup

Via Supabase dashboard:
1. Navigate to Project Settings
2. Go to Backups
3. Click "Create Backup"
4. Provide a backup name
5. Complete

### Restore from Backup

1. Contact Supabase support
2. Provide backup timestamp
3. They will restore the database
4. Verify data integrity after restore

## Monitoring & Logging

### View Logs

**Vercel Function Logs:**
```bash
vercel logs
```

**Supabase Database Logs:**
1. Supabase Dashboard
2. Logs tab
3. Filter by date/type

### Error Tracking

Browser console errors:
- F12 → Console tab
- Check for API errors
- Note timestamp for debugging

## Security Best Practices

### Authentication
- Use strong passwords (12+ characters, mix of letters/numbers/symbols)
- Change default credentials immediately
- Never share login credentials
- Implement password reset mechanism

### Data Protection
- Enable Row Level Security (RLS) on all tables
- Use environment variables for secrets
- Never commit `.env` to version control
- Use HTTPS exclusively

### API Security
- Rate limiting on contact form
- CORS configuration
- Input validation on all endpoints
- SQL injection prevention via ORM/parameterized queries

### Monitoring
- Monitor failed login attempts
- Track API endpoint usage
- Alert on unusual activity
- Regular security audits

## Troubleshooting

### Database Connection Issues

```bash
# Test connection
psql $POSTGRES_URL -c "SELECT 1"

# Check environment variables
echo $SUPABASE_URL
echo $POSTGRES_URL
```

### API Route Not Found

1. Check file path: `/app/api/admin/{route}/route.ts`
2. Verify method is exported: `export async function POST()`
3. Check CORS headers if external client
4. Test with curl: `curl http://localhost:3000/api/admin/login`

### Images Not Loading

1. Verify image URL is publicly accessible
2. Check CORS headers
3. Test URL directly in browser
4. Check image dimensions and file size

### Admin Dashboard Blank

1. Check browser console for errors
2. Verify localStorage has admin_session
3. Check API endpoints return data
4. Verify photographer_id matches

## Performance Optimization

### Database Optimization
- Use indexes on frequently queried columns
- Implement pagination for large datasets
- Use caching where appropriate
- Archive old contact submissions

### Frontend Optimization
- Lazy load portfolio images
- Use image optimization (next/image)
- Implement pagination for galleries
- Cache API responses with SWR

### Deployment Optimization
- Use Vercel Edge Functions for API routes
- Enable automatic image optimization
- Configure ISR (Incremental Static Regeneration)
- Monitor bundle size

## Maintenance Schedule

| Task | Frequency | Details |
|------|-----------|---------|
| Update Portfolio | Weekly | Add new project photos |
| Review Contacts | Weekly | Respond to inquiries |
| Update Testimonials | Monthly | Add new client reviews |
| Database Backup | Monthly | Manual backup verification |
| Security Audit | Quarterly | Review logs, update passwords |
| Performance Review | Quarterly | Analyze metrics, optimize |
| Content Update | Annually | Refresh all content |

---

**Version:** 1.0
**Last Updated:** 2024
**Maintained By:** SAMWEL
