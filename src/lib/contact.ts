import { z } from "zod";
import { brand } from "@/lib/brand";

const frenchPhone = z
  .string()
  .trim()
  .min(1, "Un numéro français, pour qu’on puisse rappeler entre deux services.")
  .refine(
    (value) => /^(?:\+33|0)[1-9]\d{8}$/.test(value.replace(/[\s.-]/g, "")),
    "Un numéro français, pour qu’on puisse rappeler entre deux services.",
  );

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Dites-nous comment vous appeler.")
    .max(80, "Quarante caractères suffisent, le prénom et le nom."),
  restaurant: z
    .string()
    .trim()
    .min(2, "Le nom de l’établissement, même s’il n’est pas encore sur la façade.")
    .max(120, "Le nom de l’établissement est un peu long."),
  email: z
    .string()
    .trim()
    .min(1, "Il nous faut une adresse qui reçoit vraiment.")
    .pipe(z.email("Il nous faut une adresse qui reçoit vraiment.")),
  phone: frenchPhone,
  message: z
    .string()
    .trim()
    .min(
      20,
      "Le quartier, la largeur du trottoir, et la saison visée. Vingt caractères minimum.",
    )
    .max(2000, "Restez sous deux mille caractères : on viendra mesurer le reste."),
});

export type ContactInput = z.infer<typeof contactSchema>;

function singleLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export function contactSubject(input: Pick<ContactInput, "name" | "restaurant">) {
  return singleLine(`Terrasse — ${input.restaurant} — ${input.name}`);
}

export function contactMailBody(input: ContactInput) {
  return [
    `Nom : ${input.name}`,
    `Restaurant : ${input.restaurant}`,
    `E-mail : ${input.email}`,
    `Téléphone : ${input.phone}`,
    "",
    input.message,
  ].join("\n");
}

export function mailtoHref(input: ContactInput, to = brand.email) {
  const params = new URLSearchParams({
    subject: contactSubject(input),
    body: contactMailBody(input),
  });
  return `mailto:${to}?${params.toString()}`;
}

export function fieldErrorsFromZod(error: z.ZodError) {
  const flat = error.flatten().fieldErrors as Record<string, string[] | undefined>;
  const fieldErrors: Record<string, string> = {};
  for (const [key, messages] of Object.entries(flat)) {
    const message = messages?.[0];
    if (message) fieldErrors[key] = message;
  }
  return fieldErrors;
}
