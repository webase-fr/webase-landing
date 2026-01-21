"use server";

import nodemailer from "nodemailer";

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 5; // Max 5 emails per hour per IP (simulated/token)

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record) {
    rateLimitMap.set(identifier, { count: 1, lastReset: now });
    return true;
  }

  if (now - record.lastReset > RATE_LIMIT_WINDOW) {
    // Reset window
    rateLimitMap.set(identifier, { count: 1, lastReset: now });
    return true;
  }

  if (record.count >= MAX_REQUESTS) {
    return false;
  }

  record.count += 1;
  return true;
}

// Config Transporter
// Ideally put these in .env
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "luis.doudeau@gmail.com",
    pass: process.env.GMAIL_APP_PASSWORD || "fill_this_in_env_or_hardcode_for_demo_if_safe", 
  },
});

type ActionState = {
  success: boolean;
  message: string;
};

export async function sendContactEmail(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const ip = "user-ip"; // In server actions, getting IP is tricky without headers(), simplified for demo
  
  if (!checkRateLimit(ip)) {
    return { success: false, message: "Trop de demandes. Veuillez réessayer plus tard." };
  }

  const firstname = formData.get("firstname") as string;
  const lastname = formData.get("lastname") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string || "Nouveau message de contact";
  const message = formData.get("message") as string;

  if (!email || !message) {
    return { success: false, message: "Champs manquants." };
  }

  const mailOptions = {
    from: `"Webase Contact" <luis.doudeau@gmail.com>`,
    to: "luis.doudeau@gmail.com",
    replyTo: email,
    subject: `[Contact] ${subject}`,
    text: `
      Nouveau message de : ${firstname} ${lastname} (${email})
      
      Sujet: ${subject}
      
      Message:
      ${message}
    `,
    html: `
      <div style="font-family: sans-serif; color: #333;">
        <h2>Nouveau message de contact</h2>
        <p><strong>De :</strong> ${firstname} ${lastname} (<a href="mailto:${email}">${email}</a>)</p>
        <p><strong>Sujet :</strong> ${subject}</p>
        <hr />
        <h3>Message :</h3>
        <p style="white-space: pre-wrap;">${message}</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: "Email envoyé avec succès." };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, message: "Erreur lors de l'envoi de l'email." };
  }
}

export async function sendEstimationEmail(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const ip = "user-ip-est"; 
  
  if (!checkRateLimit(ip)) {
    return { success: false, message: "Trop de demandes. Veuillez réessayer plus tard." };
  }

  const firstname = formData.get("firstname") as string;
  const lastname = formData.get("lastname") as string;
  const email = formData.get("email") as string;
  const company = formData.get("company") as string;
  const type = formData.get("type") as string;
  const budget = formData.get("budget") as string;
  const description = formData.get("description") as string;
  const file = formData.get("file") as File | null;

  const mailOptions: any = {
    from: `"Webase Est." <luis.doudeau@gmail.com>`,
    to: "luis.doudeau@gmail.com",
    replyTo: email,
    subject: `[Estimation] Nouveau projet - ${type || "Autre"}`,
    text: `
      Nouvelle demande d'estimation
      
      Contact: ${firstname} ${lastname}
      Email: ${email}
      Société: ${company || "N/A"}
      
      Type: ${type || "Non spécifié"}
      Budget: ${budget || "Non spécifié"}
      
      Description:
      ${description}
    `,
    html: `
      <div style="font-family: sans-serif; color: #333;">
        <h2>Nouvelle demande d'estimation 🚀</h2>
        <h3>Infos Contact</h3>
        <ul>
          <li><strong>Nom :</strong> ${firstname} ${lastname}</li>
          <li><strong>Email :</strong> <a href="mailto:${email}">${email}</a></li>
          <li><strong>Société :</strong> ${company || "Non renseigné"}</li>
        </ul>
        <h3>Détails Projet</h3>
        <ul>
          <li><strong>Type :</strong> ${type || "Non renseigné"}</li>
          <li><strong>Budget :</strong> ${budget || "Non renseigné"}</li>
        </ul>
        <hr />
        <h3>Description :</h3>
        <p style="white-space: pre-wrap;">${description}</p>
      </div>
    `,
    attachments: []
  };

  if (file && file.size > 0) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    mailOptions.attachments.push({
      filename: file.name,
      content: buffer,
    });
  }

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: "Demande reçue avec succès." };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, message: "Erreur lors de l'envoi de la demande." };
  }
}
