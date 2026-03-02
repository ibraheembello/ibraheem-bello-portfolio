import nodemailer from 'nodemailer';
import { config } from '../config/env';
import { ContactPayload } from '../types';

const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: config.email.port === 465,
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
});

export const sendContactEmail = async (data: ContactPayload): Promise<void> => {
  const { name, email, message } = data;

  const mailOptions = {
    from: `"Portfolio Contact" <${config.email.user}>`,
    to: config.email.to,
    replyTo: email,
    subject: `Portfolio Contact: from ${name}`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #7C3AED; border-bottom: 2px solid #7C3AED; padding-bottom: 10px;">
          New Portfolio Message
        </h2>
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #7C3AED;">
            ${message}
          </p>
        </div>
        <p style="color: #888; font-size: 12px;">
          Sent from ibraheembello.com portfolio contact form
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
