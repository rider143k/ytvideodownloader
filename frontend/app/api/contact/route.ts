import { NextRequest } from "next/server";
import nodemailer from "nodemailer";

/* ---------------------------
   Utils
--------------------------- */
const sanitize = (str: string) =>
  str.replace(/[<>]/g, "").trim();

/* ---------------------------
   Mail Transporter
--------------------------- */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* ---------------------------
   API Handler
--------------------------- */
export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "All fields are required",
        }),
        { status: 400 }
      );
    }

    if (
      !process.env.EMAIL_USER ||
      !process.env.EMAIL_PASS ||
      !process.env.RECEIVER_EMAIL
    ) {
      throw new Error("Email environment variables missing");
    }

    const safeName = sanitize(name);
    const safeEmail = sanitize(email);
    const safeSubject = sanitize(subject);
    const safeMessage = sanitize(message);

    /* ---------------------------
       1️⃣ Send ADMIN email (CRITICAL)
    --------------------------- */
    await transporter.sendMail({
      from: `"VideoDownloadLink Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      replyTo: safeEmail,
      subject: `📩 Contact: ${safeSubject}`,
      html: `
        <h2>New Contact Message</h2>
        <p><b>Name:</b> ${safeName}</p>
        <p><b>Email:</b> ${safeEmail}</p>
        <p><b>Subject:</b> ${safeSubject}</p>
        <p><b>Message:</b></p>
        <p>${safeMessage}</p>
      `,
    });

    /* ---------------------------
       2️⃣ AUTO-REPLY (NON-CRITICAL)
       ❌ Fail hua to ignore
    --------------------------- */
    try {
      await transporter.sendMail({
        from: `"VideoDownloadLink Support" <${process.env.EMAIL_USER}>`,
        to: safeEmail,
        subject: "We received your message",
        html: `
          <p>Hi ${safeName},</p>
          <p>Thanks for contacting <b>VideoDownloadLink</b>.</p>
          <p>We’ve received your message and will reply within 24 hours.</p>
          <br />
          <p>— VideoDownloadLink Team</p>
        `,
      });
    } catch (autoReplyError) {
      console.warn("AUTO-REPLY FAILED (ignored):", autoReplyError);
    }

    /* ---------------------------
       SUCCESS RESPONSE
    --------------------------- */
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    );
  } catch (error) {
    console.error("CONTACT API ERROR:", error);

    return new Response(
      JSON.stringify({
        success: false,
        message: "Unable to send message. Please try again later.",
      }),
      { status: 500 }
    );
  }
}
