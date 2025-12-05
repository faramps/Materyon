import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // 587 için false
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Materyon İletişim" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECEIVER,
      subject: "Yeni Geri Bildirim",
      html: `
        <b>Ad:</b> ${name}<br/>
        <b>Email:</b> ${email}<br/>
        <b>Mesaj:</b><br/>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("MAIL HATASI:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
