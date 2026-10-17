# Portfolio contact form

The React contact form posts to a same-origin serverless endpoint at \`/api/contact\`.
It does not use FormSubmit's HTML-returning AJAX endpoint and does not need
visitors to use an email application.

## One-time setup (required before public enquiries can be delivered)

1. Create a Resend account and verify a domain you own in Resend.
2. In Vercel → your portfolio project → Settings → Environment Variables, add:
   - \`RESEND_API_KEY\`: the secret server API key
   - \`RESEND_FROM_EMAIL\`: e.g. \`Portfolio <hello@yourverifieddomain.com>\`
   Do **not** put either secret in the source code or prefix the key with \`VITE_\`.
3. Redeploy the Vercel project so its functions receive the variables.
4. Submit a test enquiry from https://portfoliowebsite-six-eta.vercel.app/#contact-form
   and verify it arrives at dhruvintejani.work@gmail.com.
5. If you use a custom domain, add it to \`CONTACT_ALLOWED_ORIGINS\`, redeploy
   and test from that domain as well.

The endpoint validates input and origin, uses a hidden anti-bot field, sends a
plain-text email and returns JSON on both success and failure. If configuration
is missing it returns HTTP 503 with \`EMAIL_NOT_CONFIGURED\`; the frontend
shows a clear unavailable message without replacing the page or clearing input.

FormSubmit is no longer used. Gmail access in ChatGPT is separate from hosting
credentials and is **not** a backend mail service.

## Troubleshooting
- Form shows "being set up": check both Vercel environment variables and redeploy.
- Sending still fails: check function logs and verify sender domain / Resend limits.
- Seeing HTML instead of JSON: verify \`vercel.json\` does not rewrite \`/api/contact\` to the SPA page.
- Do not consider delivery verified until you receive a test message.
