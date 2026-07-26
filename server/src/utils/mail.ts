import nodemailer from "nodemailer";
import { env } from "../config/env.js";

export const transporter = nodemailer.createTransport({
  host: env.MAIL_HOST,
  port: Number(env.MAIL_PORT),
  secure: false,
  auth: {
    user: env.MAIL_USER,
    pass: env.MAIL_PASS,
  },
});

export async function sendOTPEmail(
  email: string,
  name: string,
  otp: string
) {
  await transporter.sendMail({
    from: env.MAIL_FROM,
    to: email,
    subject: "Password Reset OTP",
    html: `
      <h2>Hello ${name},</h2>

      <p>Your OTP is:</p>

      <h1 style="letter-spacing:8px">${otp}</h1>

      <p>This OTP will expire in 10 minutes.</p>

      <p>If you didn't request this, please ignore this email.</p>
    `,
  });
}