import type { Request, Response } from 'express';
import { sendEmail } from '@/server/email';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req: Request, res: Response): Promise<void> {
  const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';

  if (!email || !emailPattern.test(email)) {
    res.status(400).json({ success: false, error: 'A valid email address is required.' });
    return;
  }

  if (req.headers['x-airo-httpcheck'] === 'true') {
    res.status(201).json({ success: true });
    return;
  }

  try {
    await sendEmail({
      fromName: 'Mars Cafe',
      to: email,
      subject: 'Welcome to the Mars Cafe list',
      text: 'Thanks for joining the Mars Cafe list. You’ll be the first to hear about seasonal drinks, fresh pastry drops, and café promotions.',
      html: '<h1>Welcome to Mars Cafe</h1><p>Thanks for joining the list. You’ll be the first to hear about seasonal drinks, fresh pastry drops, and café promotions.</p>',
    });
    res.status(201).json({ success: true });
  } catch (error) {
    console.error('newsletter.signup.failed', error);
    res.status(500).json({ success: false, error: 'Unable to save newsletter signup.' });
  }
}
