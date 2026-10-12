# Menuiserie Estivale

Site vitrine de Menuiserie Estivale. L’atelier pose des terrasses pour les restaurants, sur-mesure ou en kit réglable, avec ou sans jardinières. Paris et alentours : Levallois, Neuilly, puis Versailles. Vincennes, à l’essai. Rouen : tournée programmée, terrasses saisonnières sur places de stationnement, du 1er mars au 31 octobre — la ville de pose hors alentours. Orléans : un aller-retour dans la journée, seulement quand plusieurs extensions de places de stationnement sont déjà signées. Reims : visites et devis seulement ; la réglementation terrasse n’a pas été trouvée, et l’atelier n’y installe pas de terrasse sur stationnement.

Trois adresses : Drouant (place Gaillon), Labess (8 rue Aristide Bruant), Melt Oberkampf (74 rue de la Folie-Méricourt). La photo Drouant est le front de rue, jardinières et bornes, pas le gros plan de la petite terrasse de gauche. La photo Labess est un platelage ; une porte numérotée 5 est dans le cadre, donc on ne la légende pas comme le 8. Melt n’a pas de photo de terrasse. Détail dans `src/lib/cases.ts`.

Le nom public est la constante `brandName` dans `src/lib/brand.ts`. Le mot-symbole, les titres et l’adresse de contact en découlent.

Stack : Next.js (App Router), TypeScript, Tailwind, shadcn/ui.

## Lancer en local

```bash
npm install
npm run dev -- -p 4327
```

Ouvrir [http://127.0.0.1:4327](http://127.0.0.1:4327).

## Formulaire

`POST /api/contact` valide le message avec Zod, côté client et côté serveur. S’il est accepté, il part vers `contact@menuiserieestivale.fr`. Sans prestataire configuré, la route répond `503` avec `code: "mail_unconfigured"` et la page n’affiche pas un succès : elle ouvre un `mailto` déjà rédigé. Les états vides, erreur et succès restent sur le formulaire. Le téléphone et le mail restent visibles à côté.

Un seul groupe de variables suffit, dans Vercel (projet `menuiserie-estivale`, environnement Production), puis un redéploiement. Rien n’est défini pour l’instant.

Boîte IONOS, déjà en place pour le domaine (`mx00.ionos.fr` / `mx01.ionos.fr`) :

```bash
SMTP_HOST=smtp.ionos.fr
SMTP_PORT=587
SMTP_USER=contact@menuiserieestivale.fr
SMTP_PASSWORD=
# SMTP_FROM="Menuiserie Estivale <contact@menuiserieestivale.fr>"
```

Ou Resend. `onboarding@resend.dev` n’envoie qu’à l’adresse du compte Resend. Pour `contact@menuiserieestivale.fr`, le domaine doit être vérifié chez Resend.

```bash
RESEND_API_KEY=
RESEND_FROM="Menuiserie Estivale <contact@menuiserieestivale.fr>"
```

Ou Brevo, avec un expéditeur déjà vérifié :

```bash
BREVO_API_KEY=
BREVO_SENDER=contact@menuiserieestivale.fr
```

`CONTACT_TO` est optionnel. Sans elle, le destinataire est l’adresse publique du site.
