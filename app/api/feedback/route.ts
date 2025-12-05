import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name")?.toString();
    const email = formData.get("email")?.toString();
    const message = formData.get("message")?.toString();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Eksik alan var" },
        { status: 400 }
      );
    }

   const transporter = nodemailer.createTransport({
  host: "smtp.zoho.eu",
  port: 465,
  secure: true, // 🔥 465 için TRUE olmak zorunda
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
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
    console.error("MAIL HATASI TAM LOG:", error);
    return NextResponse.json(
      { error: "Sunucu hatası" },
      { status: 500 }
    );
  }
}
