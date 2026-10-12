"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { brand } from "@/lib/brand";
import { contactSchema, fieldErrorsFromZod, mailtoHref } from "@/lib/contact";

const emptyValues = {
  name: "",
  restaurant: "",
  email: "",
  phone: "",
  message: "",
};

type FieldName = keyof typeof emptyValues;
type FieldErrors = Partial<Record<FieldName, string>>;

const fields: { name: FieldName; label: string; autoComplete: string; type?: string }[] = [
  { name: "name", label: "Votre nom", autoComplete: "name" },
  { name: "restaurant", label: "Restaurant", autoComplete: "organization" },
  { name: "email", label: "E-mail", autoComplete: "email", type: "email" },
  { name: "phone", label: "Téléphone", autoComplete: "tel", type: "tel" },
];

export function ContactForm() {
  const [values, setValues] = useState(emptyValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error" | "handoff">("idle");
  const [formError, setFormError] = useState("");
  const sending = useRef(false);

  function update(name: FieldName, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (sending.current) return;
    sending.current = true;
    setFormError("");

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      sending.current = false;
      setErrors(fieldErrorsFromZod(parsed.error));
      setStatus("error");
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = (await response.json().catch(() => null)) as {
        fieldErrors?: FieldErrors;
        message?: string;
        code?: string;
      } | null;

      if (!response.ok) {
        sending.current = false;
        setErrors(data?.fieldErrors ?? {});
        if (data?.code === "mail_unconfigured" || data?.code === "mail_failed") {
          setStatus("handoff");
          return;
        }
        setFormError(
          data?.message ??
            "L’envoi n’est pas passé. Écrivez ou appelez : le mail et le téléphone restent ouverts.",
        );
        setStatus("error");
        return;
      }

      setValues(emptyValues);
      setStatus("success");
    } catch {
      sending.current = false;
      setFormError(
        "Pas de réponse du serveur. Le message n’est pas parti : appelez ou écrivez, les coordonnées sont à côté.",
      );
      setStatus("error");
    }
  }

  if (status === "handoff") {
    const href = mailtoHref(values);
    return (
      <div
        className="rounded-lg border border-[#8a6a32]/40 bg-[#faf6ef] p-6 sm:p-8"
        role="status"
      >
        <p className="font-display text-3xl tracking-tight text-[#1c1915]">
          Le message n’est pas encore parti.
        </p>
        <p className="mt-3 max-w-prose text-base leading-7 text-foreground">
          L’atelier ne peut pas l’expédier depuis le site pour l’instant. Ouvrez votre
          messagerie : le texte est déjà écrit pour {brand.email}. Il part quand vous
          appuyez sur Envoyer dans votre application.
        </p>
        <Button
          nativeButton={false}
          render={<a href={href} />}
          className="mt-6 h-12 w-full px-5 text-base sm:w-auto"
        >
          Ouvrir le message dans votre messagerie
        </Button>
        <Button
          type="button"
          variant="outline"
          className="mt-3 h-11 bg-background px-4"
          onClick={() => {
            sending.current = false;
            setStatus("idle");
          }}
        >
          Revenir au formulaire
        </Button>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div
        className="rounded-lg border border-[#1e4a38]/30 bg-[#e7efe9] p-6 sm:p-8"
        role="status"
      >
        <p className="font-display text-3xl tracking-tight text-[#1e4a38]">C’est reçu.</p>
        <p className="mt-3 max-w-prose text-base leading-7 text-foreground">
          On lit ça aujourd’hui et on rappelle sous un jour ouvré, avec une première
          idée de faisabilité : la largeur utile, pas une plaquette.
        </p>
        <p className="mt-6 text-sm leading-6 text-muted-foreground">
          Si c’est urgent, entre deux services :{" "}
          <a className="font-medium text-foreground underline" href={`mailto:${brand.email}`}>
            {brand.email}
          </a>{" "}
          ou{" "}
          <a className="font-medium text-foreground underline" href={brand.phoneHref}>
            {brand.phoneDisplay}
          </a>
          .
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-6 h-11 bg-background px-4"
          onClick={() => {
            sending.current = false;
            setStatus("idle");
          }}
        >
          Envoyer un autre message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      {status === "error" && formError ? (
        <p
          role="alert"
          className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm leading-6 text-destructive"
        >
          {formError}
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((field) => {
          const error = errors[field.name];
          const errorId = `${field.name}-error`;
          return (
            <div key={field.name} className="flex flex-col gap-2">
              <Label htmlFor={field.name}>{field.label}</Label>
              <Input
                id={field.name}
                name={field.name}
                type={field.type ?? "text"}
                autoComplete={field.autoComplete}
                value={values[field.name]}
                onChange={(event) => update(field.name, event.target.value)}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? errorId : undefined}
                className="h-12 bg-background px-3 text-base md:text-base"
              />
              {error ? (
                <p id={errorId} role="alert" className="text-sm text-destructive">
                  {error}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : "message-hint"}
          className="min-h-36 bg-background px-3 py-3 text-base md:text-base"
          placeholder="Le quartier, la largeur, sur-mesure ou kit, jardinières ou non, et la saison visée."
        />
        {errors.message ? (
          <p id="message-error" role="alert" className="text-sm text-destructive">
            {errors.message}
          </p>
        ) : (
          <p id="message-hint" className="text-sm text-muted-foreground">
            Deux lignes suffisent pour qu’on sache si on se déplace.
          </p>
        )}
      </div>

      <Button
        type="button"
        className="h-12 px-5 text-base"
        disabled={status === "submitting"}
        onClick={onSubmit}
      >
        {status === "submitting" ? "Envoi…" : "Envoyer le message"}
      </Button>
    </form>
  );
}
