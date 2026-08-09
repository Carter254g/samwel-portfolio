import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const NOTIFY_EMAIL = 'obarasamwel48@gmail.com';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, phone, serviceType, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('[v0] Contact form submission:', {
      name,
      email,
      phone,
      serviceType,
      message,
      submittedAt: new Date().toISOString(),
    });

    await resend.emails.send({
      from: 'SAMWEL Portfolio <onboarding@resend.dev>',
      to: NOTIFY_EMAIL,
      replyTo: email,
      subject: `New inquiry from ${name} via your portfolio site`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #111;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 120px;">Name:</td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Email:</td>
              <td style="padding: 8px 0;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
              <td style="padding: 8px 0;">${phone || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Service:</td>
              <td style="padding: 8px 0;">${serviceType || 'Not specified'}</td>
            </tr>
          </table>
          <p style="font-weight: bold; margin-top: 20px;">Message:</p>
          <p style="white-space: pre-wrap; background: #f5f5f5; padding: 16px; border-radius: 4px;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json(
      { success: true, message: 'Contact submission received' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[v0] Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
