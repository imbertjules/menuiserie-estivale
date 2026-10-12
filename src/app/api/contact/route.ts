import { NextResponse } from "next/server";
import { contactSchema, fieldErrorsFromZod } from "@/lib/contact";
import { sendContactEmail } from "@/lib/mail";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Le message est illisible. Réessayez, ou écrivez-nous directement." },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Certains champs ne passent pas. Corrigez-les, le message n’est pas parti.",
        fieldErrors: fieldErrorsFromZod(parsed.error),
      },
      { status: 400 },
    );
  }

  const sent = await sendContactEmail(parsed.data);
  if (sent.ok) {
    console.info(JSON.stringify({ type: "contact", via: sent.via }));
    return NextResponse.json({ ok: true });
  }

  if (sent.reason === "unconfigured") {
    return NextResponse.json(
      {
        ok: false,
        code: "mail_unconfigured",
        message:
          "L’atelier n’a pas encore branché l’envoi automatique. Le message n’est pas parti tout seul.",
      },
      { status: 503 },
    );
  }

  console.error(JSON.stringify({ type: "contact", error: sent.detail }));
  return NextResponse.json(
    {
      ok: false,
      code: "mail_failed",
      message:
        "L’envoi vers la boîte de l’atelier a échoué. Réessayez, ou ouvrez votre messagerie : le texte est déjà écrit.",
    },
    { status: 502 },
  );
}
