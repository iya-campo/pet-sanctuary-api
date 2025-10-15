import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email', // For dev/testing
  port: 587,
  auth: {
    user: process.env.ETHEREAL_USER,
    pass: process.env.ETHEREAL_PASS,
  },
});

export const sendVerificationEmail = async (to: string, token: string) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

  await transporter.sendMail({
    from: '"Your App" <no-reply@yourapp.com>',
    to,
    subject: 'Verify Your Email',
    html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>`,
  });
};