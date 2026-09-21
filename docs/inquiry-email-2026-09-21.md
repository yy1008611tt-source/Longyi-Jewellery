# Inquiry Form + Email Customer Service — 2026-09-21

## Delivery
Implemented /contact and server-only POST /api/inquiry without changing product images, catalog data, prices, shipping/exchange policies, checkout or the home/PDP layout.

1. Files: listed below.
2. /contact replaces the old placeholder with “How Can We Help?” and the requested subtitle.
3. Inquiry types: Product Question, Sizing Help, Order & Shipping, Exchange Request, Trade / Wholesale, Other. Direct entry defaults to Please select.
4. Dynamic fields: sizing ranges/measurement optional; order number optional for order questions; exchange requires order number and product; trade requires company, country, products interested and whole-number quantity >= 10, with optional website/social.
5. SKU 001 Product Help preselects Product Question and Verdant Beaded Bracelet, showing canonical SKU 001 and product URL.
6. Home Wholesale preselects Trade. PDP Wholesale also prefills the product and products interested.
7. Footer Email Us points to /contact.
8. Existing Customer Service panel includes Email Us; no second floating widget.
9. Product Help includes Email Us beside the existing WhatsApp link. Wholesale WhatsApp remains available.
10. Provider: Nodemailer via Gmail SMTP over TLS on port 465.
11. Server-only transport; POST endpoint validates input and sends mail. No credentials in browser code.
12. Local configuration: project-root .env.local contains EMAIL_USER, INQUIRY_TO_EMAIL and an empty EMAIL_APP_PASSWORD. Fill only the missing Gmail App Password, then restart the local server. Deployment needs the same three private server environment variables. Never prefix them with NEXT_PUBLIC or commit env files. This document deliberately contains no real email addresses or secrets.
13. From uses EMAIL_USER; Reply-To uses the validated customer email.
14. Source and browser static assets were checked for the real mailbox address: no frontend exposure.
15. Sending disables the form/button. Success appears only after the server reports SMTP acceptance, with the requested thank-you text and Continue Shopping. Successful server behavior is covered with a mocked mail sender; no live success is claimed.
16. Failures show the requested generic message and WhatsApp fallback, retain entered values, and expose no SMTP details. Missing credentials were checked in the browser and correctly produced failure.
17. Honeypot, client/server validation, limits on fields and streamed body, same-origin check, basic in-memory throttling (60 total requests and 3 validated attempts per email per 15 minutes), concurrent duplicate blocking and 5-minute successful duplicate blocking. Counters reset on process restart and are not shared across multiple instances.
18. Browser checks at 375, 430, 768, 1024 and 1440px: no horizontal overflow; mobile single-column fields; dynamic fields and validation focus work. All requested entry links and prefills checked. Fresh page console has no errors. The deliberate failed-send check returns expected HTTP 502. Success UI has not been exercised against live Gmail because credentials are absent.
19. Lint passed.
20. Production build passed, 35 generated pages.
21. Tests: 22 passed, including 10 new inquiry tests covering required fields, email/header injection, dynamic fields, MOQ, canonical prefills, email content, mocked success/failure, request protections, limits and duplicate submissions.
22. Actual email delivery is NOT verified: EMAIL_APP_PASSWORD is not configured. SMTP acceptance alone does not prove inbox arrival. After configuring, submit a test and verify receipt, subject, fields and Reply-To in the destination inbox.
23. Preview: http://127.0.0.1:3000/contact
24. GitHub: deliver through a normal descendant commit on existing main, with non-force update; env files excluded.

## Changed files
- app/[...slug]/page.tsx
- app/contact/page.tsx
- app/api/inquiry/route.ts
- app/globals.css
- components/contact/inquiry-form.tsx
- components/home/trade-inquiry.tsx
- components/layout/customer-help.tsx
- components/layout/footer.tsx
- components/product/product-options.tsx
- components/product/product-information.tsx
- lib/inquiry.ts
- lib/server/inquiry-handler.ts
- lib/server/inquiry-mail.ts
- package.json
- pnpm-lock.yaml
- tsconfig.json
- tests/inquiry.test.mjs
- docs/inquiry-email-2026-09-21.md

No SKU 002 or checkout work was started.

