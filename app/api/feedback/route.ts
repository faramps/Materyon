import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    console.log("FORM:", { name, email, message });
    console.log("SMTP:", {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER,
      passExist: !!process.env.SMTP_PASS,
      to: process.env.CONTACT_RECEIVER,
    });

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Eksik alan" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.verify(); // 🔥 SMTP TEST

    await transporter.sendMail({
      from: `"Materyon" <${process.env.SMTP_USER}>`,
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
  } catch (err) {
    console.error("MAIL HATASI TAM LOG:", err);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}