# Rénovation Lacombe Connely - Webflow to Production

## 🚀 Features
- ✅ Webflow form integrated with Resend email service
- ✅ Business and confirmation emails
- ✅ Console error cleanup
- ✅ Mobile responsive design
- ✅ SEO optimized

## 📧 Email Configuration
- **Business Email**: contact@renovationlacombeconnely.com
- **From Email**: noreply@renovationlacombeconnely.com
- **Email Templates**: Table-based HTML with inline styles

## 🛠️ Technology Stack
- **Frontend**: Webflow export (HTML/CSS/JS)
- **Backend**: Vercel serverless functions
- **Email Service**: Resend API
- **Deployment**: Vercel

## 🔧 Environment Variables
Set these in Vercel Dashboard:
- `RESEND_API_KEY`: re_cULS7BvM_JA1bPvo3cXvQKUXWkb68FPNy
- `FROM_EMAIL`: noreply@renovationlacombeconnely.com

## 🚀 Local Development

### Setup
```bash
# Install dependencies
npm install

# Run local development server
npm run dev
```

### Testing Email
```bash
# Test email functionality
npm run test:email
```

## 📦 Deployment
1. Push changes to GitHub
2. Vercel will automatically deploy from the main branch
3. Ensure environment variables are set in Vercel Dashboard

## 📱 Contact
For support contact: contact@renovationlacombeconnely.com
