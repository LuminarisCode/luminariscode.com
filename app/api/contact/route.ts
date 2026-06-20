import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, company, service, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Luminaris Code Website" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `[Luminaris Code] Pesan baru dari ${name}${company ? ` — ${company}` : ""}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f9fafb; margin: 0; padding: 0; }
              .wrapper { max-width: 560px; margin: 32px auto; background: #ffffff; border-radius: 12px; border: 1px solid #e5e7eb; overflow: hidden; }
              .header { background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%); padding: 28px 32px; }
              .header-logo { color: #ffffff; font-size: 18px; font-weight: 700; letter-spacing: -0.3px; margin: 0; }
              .header-sub { color: rgba(255,255,255,0.7); font-size: 13px; margin: 4px 0 0; }
              .body { padding: 28px 32px; }
              .badge { display: inline-block; background: #EEF2FF; color: #4F46E5; font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 20px; margin-bottom: 20px; letter-spacing: 0.5px; text-transform: uppercase; }
              .title { font-size: 20px; font-weight: 700; color: #111827; margin: 0 0 20px; }
              .field { margin-bottom: 16px; }
              .field-label { font-size: 11px; font-weight: 600; color: #9CA3AF; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
              .field-value { font-size: 14px; color: #111827; background: #F9FAFB; border: 1px solid #F3F4F6; border-radius: 8px; padding: 10px 14px; }
              .field-value.message { white-space: pre-wrap; line-height: 1.6; }
              .divider { border: none; border-top: 1px solid #F3F4F6; margin: 20px 0; }
              .footer { padding: 16px 32px 24px; text-align: center; }
              .footer p { font-size: 12px; color: #9CA3AF; margin: 0; }
              .reply-btn { display: inline-block; margin: 16px 0 0; background: #4F46E5; color: #ffffff; font-size: 13px; font-weight: 600; padding: 10px 24px; border-radius: 8px; text-decoration: none; }
            </style>
          </head>
          <body>
            <div class="wrapper">
              <div class="header">
                <p class="header-logo">⚡ LuminarisCode</p>
                <p class="header-sub">Website Contact Form Notification</p>
              </div>
              <div class="body">
                <span class="badge">New Inquiry</span>
                <h2 class="title">Pesan baru masuk dari website</h2>

                <div class="field">
                  <div class="field-label">Nama</div>
                  <div class="field-value">${name}</div>
                </div>

                <div class="field">
                  <div class="field-label">Email</div>
                  <div class="field-value">${email}</div>
                </div>

                ${company ? `
                <div class="field">
                  <div class="field-label">Perusahaan / Organisasi</div>
                  <div class="field-value">${company}</div>
                </div>
                ` : ""}

                ${service ? `
                <div class="field">
                  <div class="field-label">Layanan yang Dibutuhkan</div>
                  <div class="field-value">${service}</div>
                </div>
                ` : ""}

                <div class="field">
                  <div class="field-label">Pesan</div>
                  <div class="field-value message">${message}</div>
                </div>

                <hr class="divider" />
                <center>
                  <a href="mailto:${email}" class="reply-btn">Balas Email Ini</a>
                </center>
              </div>
              <div class="footer">
                <p>Email ini dikirim otomatis dari form kontak luminariscode.com</p>
                <p style="margin-top:4px;">© 2024 Luminaris Code</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
