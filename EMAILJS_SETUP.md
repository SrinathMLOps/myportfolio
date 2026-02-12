# EmailJS Setup Guide for Contact Form

Your contact form is now configured to work with EmailJS, a free email service. Follow these steps to make it fully functional:

## Option 1: Use EmailJS (Recommended - Free & Easy)

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

### Step 2: Add Email Service
1. Go to "Email Services" in your EmailJS dashboard
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the instructions to connect your email
5. Copy the **Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Template
1. Go to "Email Templates" in your EmailJS dashboard
2. Click "Create New Template"
3. Use this template content:

**Subject:**
```
New Contact Form Message from {{from_name}}
```

**Body:**
```
You have received a new message from your portfolio contact form:

Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

Location Information:
Address: {{location_address}}
Coordinates: {{location_lat}}, {{location_lng}}

---
This message was sent from your portfolio website.
Reply to: {{reply_to}}
```

4. Save the template and copy the **Template ID** (e.g., `template_xyz789`)

### Step 4: Get Public Key
1. Go to "Account" → "General" in your EmailJS dashboard
2. Copy your **Public Key** (e.g., `abcdefghijklmnop`)

### Step 5: Update Your Website
Open `index.html` and replace these placeholders:

**Line with `emailjs.init('YOUR_PUBLIC_KEY');`**
Replace `YOUR_PUBLIC_KEY` with your actual public key

**In `script.js`, find this line:**
```javascript
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
```

Replace:
- `YOUR_SERVICE_ID` with your Service ID
- `YOUR_TEMPLATE_ID` with your Template ID

### Step 6: Test
1. Save all files
2. Push to GitHub
3. Visit your website and test the contact form
4. You should receive an email at your configured email address

---

## Option 2: Use Default Email Client (Already Working!)

If you don't want to set up EmailJS, the form already has a fallback that opens the user's default email client (Gmail, Outlook, etc.) with pre-filled information.

This works immediately without any configuration!

---

## Option 3: Use Formspree (Alternative)

1. Go to [https://formspree.io/](https://formspree.io/)
2. Sign up for free account
3. Create a new form and get your form endpoint
4. Update the form in `index.html`:

```html
<form id="contactForm" class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

---

## Free Tier Limits

### EmailJS Free Plan:
- 200 emails per month
- 2 email templates
- 1 email service
- Perfect for portfolio websites!

### Formspree Free Plan:
- 50 submissions per month
- Basic spam filtering

---

## Troubleshooting

**Form not sending?**
- Check browser console for errors (F12)
- Verify all IDs are correctly replaced
- Make sure EmailJS script is loaded
- Check your EmailJS dashboard for quota limits

**Not receiving emails?**
- Check spam folder
- Verify email service is connected in EmailJS
- Test with EmailJS dashboard's "Test" feature
- Ensure template variables match the code

**Need help?**
- EmailJS Documentation: https://www.emailjs.com/docs/
- Contact me: srinath.kaithoju@gmail.com

---

## Current Status

✅ Form validation working
✅ Location tracking working
✅ Fallback to email client working (no setup needed!)
⏳ EmailJS integration ready (needs your API keys)

The form will work immediately using the email client fallback. Set up EmailJS for a better user experience!
