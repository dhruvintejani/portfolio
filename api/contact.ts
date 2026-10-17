/**
 * Vercel serverless contact endpoint.
 * Requires RESEND_API_KEY and RESEND_FROM_EMAIL in Vercel Environment Variables.
 * JSON responses only, including errors. No secrets are exposed to the browser.
 */
type ApiRequest = {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: unknown;
};
type ApiResponse = {
  setHeader(name: string, value: string): void;
  status(code: number): { json(value: Record<string, unknown>): void };
};
type FormValues = { name?: unknown; email?: unknown; message?: unknown; website?: unknown };

const TO_EMAIL = 'dhruvintejani.work@gmail.com';
const LIVE_ORIGIN = 'https://portfoliowebsite-six-eta.vercel.app';

function parseBody(body: unknown): FormValues | null {
  if (body && typeof body === 'object' && !Array.isArray(body)) return body as FormValues;
  if (typeof body !== 'string' || body.length > 12000) return null;
  try {
    const value: unknown = JSON.parse(body);
    return value && typeof value === 'object' && !Array.isArray(value) ? value as FormValues : null;
  } catch { return null; }
}
function input(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export default async function handler(req: ApiRequest, res: ApiResponse): Promise<void> {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, code: 'METHOD_NOT_ALLOWED' });
    return;
  }

  const originHeader = req.headers.origin;
  const origin = Array.isArray(originHeader) ? originHeader[0] : originHeader;
  const allowedOrigins = [
    LIVE_ORIGIN,
    ...(process.env.CONTACT_ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean)
  ];
  if (!origin || !allowedOrigins.includes(origin)) {
    res.status(403).json({ ok: false, code: 'INVALID_ORIGIN' });
    return;
  }

  const request = parseBody(req.body);
  if (!request) {
    res.status(400).json({ ok: false, code: 'INVALID_JSON' });
    return;
  }
  if (input(request.website)) {
    // Treat bot submissions as no-ops.
    res.status(200).json({ ok: true });
    return;
  }

  const name = input(request.name);
  const email = input(request.email).toLowerCase();
  const message = input(request.message);
  if (name.length < 2 || name.length > 100 ||
      email.length < 5 || email.length > 160 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      message.length < 10 || message.length > 3000) {
    res.status(400).json({ ok: false, code: 'INVALID_INPUT' });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) {
    res.status(503).json({ ok: false, code: 'EMAIL_NOT_CONFIGURED' });
    return;
  }

  try {
    const sent = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + apiKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        from,
        to: [TO_EMAIL],
        reply_to: email,
        subject: 'Portfolio enquiry from ' + name.replace(/[\r\n]/g, ' '),
        text: [
          'New enquiry from your portfolio',
          '',
          'Name: ' + name,
          'Email: ' + email,
          '',
          'Project details:',
          message,
          '',
          'Source: ' + LIVE_ORIGIN
        ].join('\n')
      }),
      signal: AbortSignal.timeout(12000)
    });

    if (!sent.ok) {
      // Log status only. Never return secrets or external HTML/errors.
      console.error('Portfolio email provider returned HTTP', sent.status);
      res.status(502).json({ ok: false, code: 'EMAIL_PROVIDER_FAILURE' });
      return;
    }

    const result: unknown = await sent.json();
    const id = result && typeof result === 'object' && 'id' in result
      ? (result as { id: unknown }).id : null;
    if (typeof id !== 'string' || !id) {
      res.status(502).json({ ok: false, code: 'EMAIL_PROVIDER_FAILURE' });
      return;
    }
    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Portfolio contact endpoint failed', error instanceof Error ? error.name : 'Unknown');
    res.status(502).json({ ok: false, code: 'EMAIL_PROVIDER_FAILURE' });
  }
}
