import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return Response.json({ error: "Eksik alan var" }, { status: 400 });
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

    await transporter.sendMail({
      from: `"Materyon İletişim" <${process.env.SMTP_USER}>`,
      to: process.env.SEND_TO,
      subject: "Yeni Geri Bildirim",
      text: `
İsim: ${name}
E-posta: ${email}
Mesaj: ${message}
      `,
      html: `
        <h2>Yeni Geri Bildirim</h2>
        <p><strong>İsim:</strong> ${name}</p>
        <p><strong>E-posta:</strong> ${email}</p>
        <p><strong>Mesaj:</strong><br>${message}</p>
      `,
    });

    return Response.json({ success: true });
  } catch (e) {
    console.error("Mail send error", e);
    return Response.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

// GET endpoint test için
export async function GET() {
  return Response.json({ status: "ok" });
}
