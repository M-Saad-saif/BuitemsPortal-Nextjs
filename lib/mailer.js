import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465, 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendResetPasswordEmail(to, resetUrl) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px;">
      <h2 style="color: #1546c2; margin-bottom: 8px;">Reset your BUITEMS Portal password</h2>
      <p style="color: #374151; font-size: 14px; line-height: 1.6;">
        We received a request to reset your password. Click the button below to choose a new one.
        This link will expire in <strong>10 minutes</strong>.
      </p>
      <div style="text-align: center; margin: 28px 0;">
        <a href="${resetUrl}"
           style="background-color: #3169f4; color: #fff; padding: 12px 28px; border-radius: 999px; text-decoration: none; font-weight: bold; font-size: 14px;">
          Reset Password
        </a>
      </div>
      <p style="color: #9ca3af; font-size: 12px;">
        If you didn't request this, you can safely ignore this email — your password will remain unchanged.
      </p>
    </div>
  `;

  await transporter.sendMail({
    from: `"BUITEMS Portal" <${process.env.SMTP_USER}>`,
    to,
    subject: "Reset your password",
    html,
  });
}
