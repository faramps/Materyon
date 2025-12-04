import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  const transporter = nodemailer.createTransport({
    host: process.env.ZOHOSMTP_HOST,
    port: Number(process.env.ZOHOSMTP_PORT),
    secure: true,
    auth: {
      user: process.env.ZOHOSMTP_USER,
      pass: process.env.ZOHOSMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Materyon İletişim" <${process.env.ZOHOSMTP_USER}>`,
    to: "contact@materyon.com",
    subject: "Materyon iletişim formu mesajı",
    html: `
      <h2>Yeni mesaj var!</h2>
      <p><strong>İsim:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mesaj:</strong><br/>${message}</p>
    `,
  });

  return NextResponse.json({ ok: true });
}
