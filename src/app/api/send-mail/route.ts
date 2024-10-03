import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Fonction exportée pour gérer la méthode POST
export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    console.log("je passe par la", name, email, message);

    // Configuration du transporteur SMTP avec Nodemailer
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "samirm.nagg@gmail.com",
        pass: "iiju gsaj keat yyft", // Remplacer par une vraie variable d'environnement dans production
      },
    });

    // Envoyer l'email
    await transporter.sendMail({
      from: "samirm.nagg@gmail.com", // Adresse email de l'expéditeur
      to: "contact@safeout.io", // Adresse email de destination
      subject: `New message from ${name}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong></p>
             <p>${message}</p>`,
    });

    // Répondre avec succès
    console.log("Email sent successfully!");
    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    // Répondre en cas d'erreur
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
