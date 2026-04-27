# SAMWEL Photography Portfolio - Admin Guide

## Overview

The admin panel provides full control over your photography portfolio. You can manage portfolio images, services, testimonials, and view contact submissions.

## Login Access

### Default Credentials

```
URL: /admin/login
Email: admin@samwel.com
Password: admin@samwel123
```

**Important:** Change these credentials immediately after first login for security!

## Admin Dashboard Features

### 1. Portfolio Images Management

**Add New Images:**
1. Click the "Add Image" button in the Portfolio tab
2. Fill in the following details:
   - **Image Title**: Name of the photograph
   - **Image URL**: Direct link to the image (use Vercel Blob or any image CDN)
   - **Description**: Brief description of the image
   - **Category**: Type of photography (Wedding, Portrait, Landscape, Product, Event, Commercial, etc.)
3. Click "Save Image"

**Edit Images:**
- Click the edit icon (pencil) on any image card
- Update the information
- Save changes

**Delete Images:**
- Hover over an image card
- Click the delete icon (trash can)
- Confirm deletion

**Tips:**
- Use high-quality images (minimum 500px width recommended)
- Organize images by category for better filtering on the portfolio
- Keep descriptions brief and compelling
- Reorder images by adjusting the `order_num` field

### 2. Services Management

**Edit Service Descriptions:**
1. Go to the Services tab
2. Click edit on any service card
3. Update the title, description, and icon
4. Save changes

**Available Services:**
- Wedding Session
- Studio Shooting
- Product Shoot
- Video Shooting

**Customize Services:**
- Add new services with specific pricing and details
- Update descriptions with your latest service information
- Mark services as active/inactive

### 3. Testimonials Management

**Add Client Testimonials:**
1. Go to the Testimonials tab
2. Click "Add Testimonial"
3. Enter:
   - Client name
   - Client title/position
   - Testimonial content (their quote)
   - Star rating (1-5)
4. Toggle "Featured" to show on homepage
5. Save

**Best Practices:**
- Include real client names and job titles
- Focus on specific compliments about your work
- Mix short and longer testimonials
- Feature your best 3-5 testimonials

### 4. Contact Submissions

**View Contact Forms:**
1. Go to the Contacts tab
2. All submitted contact forms appear here
3. New submissions are highlighted

**Manage Contacts:**
- **Mark as Read**: Click "Mark Read" to indicate you've reviewed
- **Sort by Date**: Contacts are automatically sorted by newest first
- **Archive**: Hide old contacts with the archive button

**Respond to Inquiries:**
- Contact information (name, email, phone) is displayed
- Copy email address to respond to inquiries
- Check the service they're interested in

## API Endpoints

All API endpoints are secure and require authentication when needed.

### Portfolio Images
- `GET /api/admin/portfolio?photographer_id={id}` - List all images
- `POST /api/admin/portfolio` - Create new image
- `PUT /api/admin/portfolio` - Update image
- `DELETE /api/admin/portfolio?id={id}` - Delete image

### Services
- `GET /api/admin/services?photographer_id={id}` - List all services
- `POST /api/admin/services` - Create new service
- `PUT /api/admin/services` - Update service
- `DELETE /api/admin/services?id={id}` - Delete service

### Testimonials
- `GET /api/admin/testimonials?photographer_id={id}` - List all testimonials
- `POST /api/admin/testimonials` - Create new testimonial
- `PUT /api/admin/testimonials` - Update testimonial
- `DELETE /api/admin/testimonials?id={id}` - Delete testimonial

### Contacts
- `GET /api/admin/contacts?limit=50&offset=0` - List submissions
- `PUT /api/admin/contacts` - Mark as read/archived
- `DELETE /api/admin/contacts?id={id}` - Delete submission

## Image Management Best Practices

### Uploading Images

**Using Vercel Blob:**
1. Go to your Vercel project settings
2. Navigate to Storage → Blob
3. Create a new blob storage
4. Use the upload interface to add images
5. Copy the image URL and paste it into the admin panel

**Using External Services:**
- Unsplash, Pexels (free)
- Cloudinary, imgix (paid with more features)
- AWS S3, Google Cloud Storage
- Any CDN with image hosting

### Image Optimization

**Recommended Specifications:**
- **Size**: 500px - 2000px width
- **Format**: JPG or WebP for best compression
- **File Size**: 300KB - 2MB per image
- **Aspect Ratio**: 4:3 or 16:9 for gallery
- **Quality**: High resolution recommended (72dpi minimum)

### Image Categories

Suggested categories for organization:
- **Wedding**: Ceremony, Reception, Details
- **Portrait**: Professional, Personal, Family
- **Landscape**: Nature, Architecture, Travel
- **Product**: Commercial, E-commerce
- **Event**: Conferences, Parties, Corporate
- **Commercial**: Advertising, Brand, Lifestyle

## Database Structure

### Tables

**Photographers**
- id, name, email, bio, years_experience, projects_completed, profile_image_url

**Services**
- id, photographer_id, title, description, icon_name, order_num, is_active

**Portfolio Images**
- id, photographer_id, title, description, image_url, category, order_num, is_active

**Testimonials**
- id, photographer_id, client_name, client_title, content, rating, is_featured, order_num

**Contact Submissions**
- id, name, email, phone, subject, message, service_interest, is_read, is_archived

**Admin Users**
- id, photographer_id, email, password_hash, is_active, last_login

## Security Considerations

1. **Change Default Password**: Log in and immediately change your password
2. **Use Strong Passwords**: Use a combination of letters, numbers, and symbols
3. **Secure Storage**: Never share your login credentials
4. **Browser Logout**: Always logout when finished, especially on shared computers
5. **HTTPS Only**: Always use HTTPS for admin access
6. **Session Timeout**: Sessions expire after inactivity

## Troubleshooting

### Images Not Displaying

1. Check the image URL is correct and accessible
2. Verify the image has public access (not blocked by CORS)
3. Test the URL directly in a browser
4. Use a different image service if issues persist

### Login Issues

1. Verify email and password are correct
2. Check caps lock on password
3. Clear browser cache and cookies
4. Try incognito/private browsing mode
5. Reset password (contact support)

### Forms Not Saving

1. Check all required fields are filled
2. Verify internet connection is stable
3. Check browser console for error messages
4. Try a different browser
5. Clear browser cache

## Support & Maintenance

### Regular Maintenance Tasks

- **Weekly**: Review contact submissions, respond to inquiries
- **Monthly**: Update portfolio with new projects
- **Quarterly**: Review and update testimonials
- **Annually**: Refresh services and pricing information

### Backup Strategy

- Database backups are automatic in Supabase
- Regular backups are created automatically
- Manual backups can be done through Supabase dashboard
- Keep offline copies of important client work

## Advanced Features

### Custom Fields

You can extend the database schema to include:
- Pricing information
- Service packages
- Client case studies
- Photography tips/blog
- Gallery collections
- Booking calendar integration

### Integration Ideas

- Email notifications for new contact forms
- SMS alerts for inquiries
- Calendar integration for bookings
- Portfolio public sharing links
- Client proofing gallery
- Invoice generation

## Getting Help

For issues or questions:
1. Check this guide first
2. Review the API documentation
3. Check browser console for errors
4. Contact technical support

---

**Last Updated:** 2024
**Version:** 1.0
**Status:** Active
