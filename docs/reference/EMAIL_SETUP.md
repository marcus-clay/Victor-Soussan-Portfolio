# Email Configuration Guide

This project uses EmailJS to handle contact form submissions. Follow these steps to set it up:

## 1. Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (allows 200 emails/month)
3. Verify your email address

## 2. Add an Email Service

1. Go to the **Email Services** page in your EmailJS dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Copy the **Service ID** (e.g., `service_abc123`)

## 3. Create an Email Template

1. Go to the **Email Templates** page
2. Click **Create New Template**
3. Use this template structure:

**Subject:**
```
New Contact Form Submission from {{from_name}}
```

**Content:**
```
You have received a new contact form submission from your portfolio website.

Name: {{from_name}}
Email: {{from_email}}
Company: {{company}}
Expected Duration: {{duration}}
Approximate Budget: {{budget}}

Message:
{{message}}

---
This email was sent from your portfolio contact form.
```

4. Save the template and copy the **Template ID** (e.g., `template_xyz789`)

## 4. Get Your Public Key

1. Go to **Account** > **General** in your EmailJS dashboard
2. Find your **Public Key** (e.g., `AbC123XyZ`)

## 5. Update the Configuration File

Open `emailConfig.ts` and replace the placeholder values:

```typescript
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_abc123',      // Your Service ID
  TEMPLATE_ID: 'template_xyz789',    // Your Template ID
  PUBLIC_KEY: 'AbC123XyZ'            // Your Public Key
};
```

## 6. Test the Form

1. Run your development server: `npm run dev`
2. Fill out the contact form
3. Submit and check if you receive the email

## Security Notes

- ✅ EmailJS Public Key is safe to expose in client-side code
- ✅ EmailJS automatically prevents spam and abuse
- ✅ Rate limiting is built-in (200 emails/month on free tier)
- ⚠️ Never commit your actual API keys to public repositories if using paid tiers

## Troubleshooting

**Not receiving emails?**
- Check your spam/junk folder
- Verify all IDs are correct in `emailConfig.ts`
- Check EmailJS dashboard for error logs
- Ensure your email service is properly connected

**Rate limit exceeded?**
- Free tier: 200 emails/month
- Upgrade to paid plan for more capacity
- Check EmailJS dashboard for usage stats

## Alternative: Use FormSpree

If you prefer not to use EmailJS, you can use [FormSpree](https://formspree.io/) instead:
1. Sign up at formspree.io
2. Create a new form
3. Replace the EmailJS code with a simple POST request to your FormSpree endpoint
