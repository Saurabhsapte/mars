import type { Request, Response } from 'express';
import Stripe from 'stripe';
import { getSecret } from '#airo/secrets';
import { sendEmail } from '@/server/email';

function getStripe(): Stripe {
  const secretKey = getSecret('STRIPE_SECRET_KEY');
  if (!secretKey || typeof secretKey !== 'string') {
    throw new Error('Stripe is not configured');
  }
  return new Stripe(secretKey);
}

function formatTotal(amount: number | null, currency: string | null): string {
  if (amount === null || !currency) return 'Paid';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

export default async function handler(req: Request, res: Response) {
  const sessionId = typeof req.body?.sessionId === 'string' ? req.body.sessionId : '';
  if (!sessionId.startsWith('cs_')) {
    res.status(400).json({ success: false, error: 'Invalid checkout session' });
    return;
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId, { expand: ['line_items'] });
    const recipient = session.customer_details?.email ?? session.customer_email;

    if (session.status !== 'complete' || session.payment_status !== 'paid' || !recipient) {
      res.status(400).json({ success: false, error: 'Checkout is not ready for confirmation' });
      return;
    }

    const orderLines = session.line_items?.data
      .map((item) => `${item.quantity ?? 1} × ${item.description}`)
      .join('\n') ?? 'Your Mars Cafe order';
    const total = formatTotal(session.amount_total, session.currency);
    const customerName = session.customer_details?.name ? `Hi ${session.customer_details.name},` : 'Hi,';

    await sendEmail({
      fromName: 'Mars Cafe',
      to: recipient,
      subject: 'Your Mars Cafe order is confirmed',
      text: `${customerName}\n\nThanks for your order. Payment received: ${total}.\n\nOrder details:\n${orderLines}\n\nWe look forward to seeing you at Mars Cafe.`,
      html: `<h1>Your Mars Cafe order is confirmed</h1><p>${customerName}</p><p>Thanks for your order. Payment received: <strong>${total}</strong>.</p><p><strong>Order details</strong><br>${orderLines.replace(/\n/g, '<br>')}</p><p>We look forward to seeing you at Mars Cafe.</p>`,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('stripe.confirmation-email.failed', error);
    res.status(500).json({ success: false, error: 'Unable to send confirmation email' });
  }
}
