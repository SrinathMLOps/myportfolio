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
Replace `YOUR_PUBLIC_K

