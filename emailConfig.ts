// EmailJS Configuration
// To use this, you need to:
// 1. Create a free account at https://www.emailjs.com/
// 2. Create an email service (Gmail, Outlook, etc.)
// 3. Create an email template
// 4. Get your Public Key from Account > General
// 5. Replace the values below with your actual EmailJS credentials

export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_573dfvr', // Replace with your EmailJS Service ID
  TEMPLATE_ID: 'template_e5b7dkr', // Template ID for receiving quote requests (to Victor)
  CONFIRMATION_TEMPLATE_ID: 'template_confirmation', // Template ID for client confirmation email (REPLACE THIS)
  PUBLIC_KEY: 'q0H5SPAjRJr7MGz4z' // Replace with your EmailJS Public Key
};

// Template variables that will be sent to EmailJS:
// {{from_name}} - Contact form name
// {{from_email}} - Contact form email
// {{company}} - Company name
// {{duration}} - Expected duration
// {{budget}} - Approximate budget
// {{message}} - Message content
