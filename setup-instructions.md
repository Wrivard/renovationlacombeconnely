# Setup Instructions for Rénovation Lacombe Connely

## 📋 Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Wrivard/renovationlacombeconnely.git
   cd renovationlacombeconnely
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a .env file with the following content**
   ```
   # Email Configuration
   RESEND_API_KEY=re_cULS7BvM_JA1bPvo3cXvQKUXWkb68FPNy
   FROM_EMAIL=onboarding@resend.dev
   ```

4. **Test email functionality**
   ```bash
   npm run test:email
   ```

## 🚀 Vercel Deployment

1. **Connect your GitHub repository to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Follow the setup instructions

2. **Set environment variables in Vercel Dashboard**
   - Go to your project settings
   - Add the following environment variables:
     - `RESEND_API_KEY`: re_cULS7BvM_JA1bPvo3cXvQKUXWkb68FPNy
     - `FROM_EMAIL`: onboarding@resend.dev (for testing)

3. **Deploy your project**
   - Vercel will automatically deploy your project
   - Check the deployment logs for any errors

## 📧 Email Configuration

### For Testing
- The API is configured to use `williamrivard@live.ca` as the recipient email
- Emails will be sent from `onboarding@resend.dev`

### For Production
1. **Verify your domain in Resend**
   - Go to [resend.com/domains](https://resend.com/domains)
   - Add and verify your domain
   - Update the `FROM_EMAIL` environment variable to use your verified domain

2. **Update the recipient email**
   - In `api/submit-form.js`, update the `businessEmail` variable to your preferred email

## 🔒 Security Notes
- The Resend API key is hardcoded in the API file for testing
- For production, remove the hardcoded API key and use only environment variables
- Never commit API keys to version control in a production environment
