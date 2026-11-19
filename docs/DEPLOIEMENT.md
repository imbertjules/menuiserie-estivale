# Déploiement — Coolify (JULES-FIX)

Le site tourne désormais sur **Coolify** (JULES-FIX). Vercel n'est plus la cible : le
`vercel.json` a été retiré du dépôt, le projet Vercel existant reste en ligne jusqu'à la
bascule du domaine.

## Image

- `Dockerfile` multi-étapes : `node:22-alpine`, `pnpm install --frozen-lockfile`,
  `pnpm build` (sortie **standalone**), image finale `node:22-alpine` non privilégiée
  (`nextjs`, uid 1001), port **3000**, `HEALTHCHECK` sur `/`.
- `sharp` est installé dans l'image finale : `next/image` en a besoin pour optimiser les photos.
- Les photos de `public/realisations` sont **versionnées** : le script `scripts/fetch-photos.mjs`
  ne les retélécharge que si elles manquent. `PHOTOS_REFRESH=1` force le rafraîchissement
  (utile si une source change). Un build sans réseau passe donc.

## Construire et lancer à la main

```bash
docker build -t menuiserie-estivale:local .
docker run --rm -p 4327:3000 menuiserie-estivale:local
# http://127.0.0.1:4327
```

## Application Coolify

| | |
|---|---|
| Projet / env | `doubles-jules-fix` / `production` |
| Nom | `menuiserie-estivale` |
| Dépôt | `https://github.com/imbertjules/menuiserie-estivale` (public) |
| Branche | `main` |
| Build pack | `dockerfile` (Dockerfile à la racine) |
| Port exposé | `3000` |
| Domaine interne | `http://<uuid>.100-69-46-46.nip.io` (tailnet seulement) |

Variables d'environnement : aucune n'est nécessaire pour l'affichage. Pour que le formulaire
envoie réellement les demandes de devis, il faut **un** des trois groupes (voir `.env.example`
et la section « Formulaire » du `README`) : SMTP IONOS (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`,
`SMTP_PASSWORD`), Resend (`RESEND_API_KEY`, `RESEND_FROM`) ou Brevo (`BREVO_API_KEY`,
`BREVO_SENDER`). Sans elles, `POST /api/contact` répond 503 `mail_unconfigured` et la page
ouvre un `mailto:` prérempli — c'est le comportement actuel, y compris sur Vercel.

Ne jamais poser `NODE_ENV` dans les variables Coolify : elle est déjà fixée par l'image de
production et Coolify l'injecterait au build.

## Retour arrière

Redéployer le commit précédent depuis Coolify (onglet des déploiements → Rollback) ou
`POST /api/v1/deploy` sur l'application avec `git_branch` = commit antérieur. Côté Vercel,
rien n'a été supprimé : le retour au domaine se fait en remettant les enregistrements DNS
d'origine (voir la carte de migration).
