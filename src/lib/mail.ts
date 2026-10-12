import nodemailer from "nodemailer";
import { brand } from "@/lib/brand";
import { type ContactInput, contactMailBody, contactSubject } from "@/lib/contact";

export type SendResult =
  | { ok: true; via: "smtp" | "resend" | "brevo" }
  | { ok: false; reason: "unconfigured" | "provider"; detail: string };

type Letter = {
  to: string;
  subject: string;
  text: string;
  replyTo: string;
};

function env(name: string) {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
}

function recipient() {
  return env("CONTACT_TO") || brand.email;
}

function smtpReady() {
  return Boolean(env("SMTP_HOST") && env("SMTP_USER") && env("SMTP_PASSWORD"));
}

export function mailTransport() {
  if (smtpReady()) return "smtp" as const;
  if (env("RESEND_API_KEY")) return "resend" as const;
  if (env("BREVO_API_KEY")) return "brevo" as const;
  return null;
}

export async function sendContactEmail(input: ContactInput): Promise<SendResult> {
  const letter: Letter = {
    to: recipient(),
    subject: contactSubject(input),
    text: contactMailBody(input),
    replyTo: input.email,
  };
  const via = mailTransport();
  if (via === "smtp") return sendSmtp(letter);
  if (via === "resend") return sendResend(letter);
  if (via === "brevo") return sendBrevo(letter);
  return {
    ok: false,
    reason: "unconfigured",
    detail: "Aucun prestataire d’e-mail n’est configuré.",
  };
}

async function sendSmtp(letter: Letter): Promise<SendResult> {
  const port = Number(env("SMTP_PORT") || "587");
  const user = env("SMTP_USER")!;
  const transporter = nodemailer.createTransport({
    host: env("SMTP_HOST"),
    port,
    secure: port === 465,
    auth: { user, pass: env("SMTP_PASSWORD") },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 8000,
  });

  try {
    await transporter.sendMail({
      from: env("SMTP_FROM") || user,
      to: letter.to,
      replyTo: letter.replyTo,
      subject: letter.subject,
      text: letter.text,
    });
    return { ok: true, via: "smtp" };
  } catch (error) {
    return { ok: false, reason: "provider", detail: safeError(error) };
  }
}

async function sendResend(letter: Letter): Promise<SendResult> {
  const from = env("RESEND_FROM") || "Menuiserie Estivale <onboarding@resend.dev>";
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env("RESEND_API_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [letter.to],
        reply_to: letter.replyTo,
        subject: letter.subject,
        text: letter.text,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) {
      return { ok: false, reason: "provider", detail: await providerDetail(response) };
    }
    return { ok: true, via: "resend" };
  } catch (error) {
    return { ok: false, reason: "provider", detail: safeError(error) };
  }
}

async function sendBrevo(letter: Letter): Promise<SendResult> {
  const sender = env("BREVO_SENDER");
  if (!sender) {
    return {
      ok: false,
      reason: "provider",
      detail: "BREVO_SENDER manque. Brevo refuse un expéditeur non vérifié.",
    };
  }
  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": env("BREVO_API_KEY")!,
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: { email: sender, name: brand.name },
        to: [{ email: letter.to }],
        replyTo: { email: letter.replyTo },
        subject: letter.subject,
        textContent: letter.text,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) {
      return { ok: false, reason: "provider", detail: await providerDetail(response) };
    }
    return { ok: true, via: "brevo" };
  } catch (error) {
    return { ok: false, reason: "provider", detail: safeError(error) };
  }
}

async function providerDetail(response: Response) {
  const body = await response.text().catch(() => "");
  const clipped = body.replace(/\s+/g, " ").slice(0, 180);
  return `Le prestataire a répondu ${response.status}. ${clipped}`.trim();
}

function safeError(error: unknown) {
  if (error instanceof Error) return error.message.slice(0, 180);
  return "L’envoi a échoué.";
}
