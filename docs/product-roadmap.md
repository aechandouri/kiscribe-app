# Kiscribe — Product Roadmap

> Build plan pour Claude Code. Chaque tâche a un checkbox à cocher dès qu'elle est terminée.
> Stack : Next.js 14 · TypeScript · Tailwind · Supabase · Clerk · Stripe · Groq · Claude Haiku · Vercel · next-pwa

---

## Build Philosophy

1. **Ship le magic moment d'abord** — La dictée → SOAPIE fonctionne avant tout le reste. Tout le reste est secondaire.
2. **Stateless MVP** — Aucune donnée de santé stockée. Audio → transcription → note → réponse client. Point.
3. **Mobile-first absolu** — Chaque composant est testé sur 375px avant d'être testé sur desktop.
4. **Chaque phase = démo demoable** — À la fin de chaque phase, l'app est utilisable par un vrai kiné.
5. **Pas d'over-engineering** — Pas d'abstraction prématurée. Le code le plus simple qui marche.

---

## Phase 1 — Foundation & Infrastructure
**Objectif :** Projet Next.js configuré, auth fonctionnelle, base de données prête, déployé sur Vercel.
**Demoable :** Un utilisateur peut s'inscrire, se connecter, voir un dashboard vide protégé par auth.
**Durée estimée :** 1 jour

**Prompt agent session :**
> "Initialise un projet Next.js 14 App Router avec TypeScript, Tailwind CSS, Clerk auth, Supabase, et Stripe. Configure tous les providers et middleware. Crée les tables Supabase (users, subscriptions, usage_logs). Déploie sur Vercel. Suis exactement le PRD section 2 (stack), section 3 (data model), section 10 (auth), section 11 (payments)."

- [x] **TASK-001** — Initialiser le projet Next.js
  Files: `package.json`, `next.config.ts`, `tsconfig.json`, `app/globals.css`
  Notes: Next.js 16.2.2 + Tailwind v4 CSS-based config. Design tokens via @theme. Fonts Google (Instrument Serif + Inter).

- [x] **TASK-002** — Installer et configurer Clerk
  Files: `proxy.ts`, `app/layout.tsx`, `app/(auth)/sign-in/[[...sign-in]]/page.tsx`, `app/(auth)/sign-up/[[...sign-up]]/page.tsx`, `.env.local`
  Notes: Next.js 16 : `proxy.ts` remplace `middleware.ts`. ClerkProvider dans root layout. Routes publiques configurées.

- [x] **TASK-003** — Créer les tables Supabase
  Files: `lib/supabase.ts`, `supabase/migrations/001_init.sql`
  Notes: Client lazy (pas d'erreur au build sans env vars). Tables users/subscriptions/usage_logs + RLS.

- [x] **TASK-004** — Webhook Clerk → sync users Supabase
  Files: `app/api/webhooks/clerk/route.ts`
  Notes: Vérification svix. Event user.created → INSERT users.

- [x] **TASK-005** — Configurer Stripe (produit + price)
  Files: `lib/stripe.ts`, `.env.local`
  Notes: Instance Stripe configurée. ⚠️ Créer produit Solo 49€/mois dans dashboard Stripe + copier Price ID dans .env.local.

- [x] **TASK-006** — Structure des routes et layout dashboard
  Files: `app/(dashboard)/layout.tsx`, `app/(dashboard)/page.tsx`
  Notes: Auth guard via auth() Clerk. Navbar logo + hamburger. Dashboard placeholder.

- [ ] **TASK-007** — Déploiement Vercel initial
  Files: `vercel.json` (si nécessaire)
  Notes: `vercel --prod`. Ajouter toutes les variables d'environnement dans Vercel dashboard. Région `cdg1` (Paris). ⚠️ Requiert les vraies clés API (Clerk, Supabase, Stripe) dans .env.local d'abord. ⚠️ Git requiert `sudo xcodebuild -license` avant de pouvoir commiter.

---

## Phase 2 — Core Feature : Dictée → SOAPIE
**Objectif :** Le magic moment fonctionne. Un utilisateur connecté peut dicter et obtenir une note SOAPIE + code AMK.
**Demoable :** Dictée 90 secondes → note SOAPIE complète en français → code AMK → copier en un tap.
**Durée estimée :** 2-3 jours

**Prompt agent session :**
> "Implémente le core feature de Kiscribe : enregistrement audio via MediaRecorder, transcription via Groq Whisper API, génération de note SOAPIE + code AMK via Claude Haiku. Interface mobile-first avec bouton micro, états (idle/recording/processing/result), et bouton copier. Suis exactement le PRD sections 4 (API), 6 (FR-001, FR-002, FR-003, FR-004), 8 (Screen 2)."

- [x] **TASK-008** — Hook useAudioRecorder
  Files: `hooks/useAudioRecorder.ts`
  Notes: Utilise `MediaRecorder` avec `audio/webm;codecs=opus`. États : `idle | recording | stopped`. Expose : `startRecording()`, `stopRecording()`, `audioBlob`, `duration`. Auto-stop après 5 minutes. Gestion des erreurs de permission micro. Détection silence optionnelle (peut être ajoutée en TASK-017).

- [x] **TASK-009** — API route POST /api/transcribe
  Files: `app/api/transcribe/route.ts`, `lib/groq.ts`
  Notes: Installe `groq-sdk`. Reçoit FormData avec `audio` (File). Vérifie auth Clerk (`auth().protect()`). Appelle Groq Whisper `whisper-large-v3` avec `language: 'fr'`. Retourne `{ transcript: string }`. Validation Zod sur l'input. Timeout 15 secondes.

- [x] **TASK-010** — Prompt système Claude Haiku (fichier séparé)
  Files: `lib/claude.ts`, `lib/prompts/soapie-prompt.ts`
  Notes: Prompt système complet du PRD section 6 FR-003. `lib/claude.ts` : client Anthropic, fonction `generateSoapie(transcript: string)` qui retourne le JSON structuré. Parser le JSON retourné par Claude, fallback si JSON invalide.

- [x] **TASK-011** — Référentiel codes AMK post-Avenant 7
  Files: `lib/amk-codes.ts`
  Notes: Objet TypeScript avec tous les codes AMK principaux, leurs valeurs en points, et leurs conditions d'utilisation. Utilisé par le prompt et pour valider les suggestions de Claude.

- [x] **TASK-012** — API route POST /api/generate
  Files: `app/api/generate/route.ts`
  Notes: Reçoit `{ transcript: string }`. Vérifie auth + subscription active (query Supabase). Appelle `generateSoapie()`. Insère dans `usage_logs` (sans le contenu). Retourne le JSON SOAPIE + AMK complet du PRD section 4.

- [x] **TASK-013** — Composant MicButton
  Files: `components/MicButton.tsx`
  Notes: Bouton cercle 80px. États visuels : idle (vert sauge, icône mic), recording (rouge #E05555, animation pulse CSS, icône stop), processing (spinner). `aria-label` dynamique selon l'état. Touch target ≥ 44px.

- [x] **TASK-014** — Composant NoteCard
  Files: `components/NoteCard.tsx`, `components/AmkBadge.tsx`
  Notes: Affiche les 6 sections SOAPIE avec labels colorés en vert sauge. Section AMK séparée avec badge doré (#C4A96A). Justification en texte muted. Scroll vertical si contenu long. Border-radius 12px, shadow légère.

- [x] **TASK-015** — Composant CopyButton
  Files: `components/CopyButton.tsx`
  Notes: Bouton pleine largeur, vert sauge. Copie le texte formaté (format du PRD section 6 FR-004). Feedback visuel : text change en "Copié ✓" + couleur success pendant 1.5s. Utilise `navigator.clipboard.writeText()`.

- [x] **TASK-016** — Orchestration complète dans le dashboard
  Files: `app/(dashboard)/page.tsx`, `hooks/useGenerate.ts`
  Notes: Hook `useGenerate` : prend un audioBlob, appelle `/api/transcribe` puis `/api/generate` en séquence, expose les états et le résultat. Page dashboard : machine à états (idle → recording → processing → result → idle). Gestion de toutes les erreurs avec messages humains (PRD section 12).

---

## Phase 3 — Payments & Subscription Gate
**Objectif :** Le paywall fonctionne. Trial 7 jours, Stripe Checkout, webhook, et blocage si pas d'abonnement actif.
**Demoable :** Un utilisateur peut s'inscrire, utiliser l'app 7 jours, puis être invité à payer — et l'accès est bloqué sans abonnement actif.
**Durée estimée :** 1-2 jours

**Prompt agent session :**
> "Implémente le système de paiement Stripe complet : Stripe Checkout avec trial 7 jours, webhook pour sync subscriptions, middleware de vérification subscription avant /api/generate, portail client Stripe, et UI pour les états trial/active/expired. Suis le PRD section 11 et FR-007."

- [ ] **TASK-017** — API route POST /api/checkout
  Files: `app/api/checkout/route.ts`
  Notes: Crée une Stripe Checkout Session (mode subscription, trial 7 jours, locale fr). Crée ou récupère le Stripe Customer lié au Clerk user. Retourne l'URL de checkout. Stocker `stripe_customer_id` dans `subscriptions`.

- [ ] **TASK-018** — Webhook Stripe
  Files: `app/api/webhooks/stripe/route.ts`
  Notes: Vérifier signature avec `stripe.webhooks.constructEvent`. Gérer : `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`. Mettre à jour table `subscriptions` en conséquence.

- [ ] **TASK-019** — Middleware subscription dans /api/generate
  Files: `app/api/generate/route.ts` (update)
  Notes: Avant d'appeler Claude, vérifier dans Supabase que `subscriptions.status IN ('trialing', 'active')` pour cet utilisateur. Si non : retourner 402 avec `{ error: "Subscription required", checkoutUrl: "/api/checkout" }`.

- [ ] **TASK-020** — UI subscription gate
  Files: `components/SubscriptionGate.tsx`, `app/(dashboard)/page.tsx` (update)
  Notes: Si l'utilisateur n'a pas de subscription active : afficher un modal/card avec CTA "Démarrer l'essai gratuit" → appel `/api/checkout` → redirect Stripe. Si trial actif : afficher "Essai gratuit — X jours restants" en petit texte discret.

- [ ] **TASK-021** — Portail Stripe (settings)
  Files: `app/api/portal/route.ts`, `app/(dashboard)/settings/page.tsx`
  Notes: API route crée une Billing Portal Session Stripe et retourne l'URL. Page settings : email utilisateur, bouton "Gérer mon abonnement" → redirect vers portail Stripe, bouton "Déconnexion" (Clerk signOut).

---

## Phase 4 — PWA & Mobile Polish
**Objectif :** L'app est installable sur iPhone, le micro fonctionne en PWA, l'expérience mobile est parfaite.
**Demoable :** Un kiné peut installer l'icône sur son iPhone et utiliser l'app exactement comme une vraie app native.
**Durée estimée :** 1 jour

**Prompt agent session :**
> "Configure next-pwa (Serwist) pour rendre Kiscribe installable en PWA sur iOS et Android. Crée le manifest.json, les icônes, et le service worker. Vérifie que le micro fonctionne depuis la PWA installée sur iOS Safari. Optimise l'expérience mobile : touch targets, no scroll issues, bottom-safe-area."

- [x] **TASK-022** — Configuration next-pwa (Serwist)
  Files: `next.config.js`, `public/sw.js` (généré)
  Notes: Installer `@serwist/next`. Config dans `next.config.js`. Cache des assets statiques (images, fonts, JS). Message hors-ligne si API indisponible. Ne pas cacher les routes API.

- [x] **TASK-023** — PWA Manifest
  Files: `public/manifest.json`
  Notes: `name: "Kiscribe"`, `short_name: "Kiscribe"`, `display: "standalone"`, `background_color: "#FAFAF8"`, `theme_color: "#5C7A5F"`, `start_url: "/dashboard"`. Icons : 192×192 et 512×512 (créer des icônes SVG → PNG avec le logo Kiscribe).

- [x] **TASK-024** — Icônes PWA
  Files: `public/icons/icon-192.png`, `public/icons/icon-512.png`, `public/icons/apple-touch-icon.png`
  Notes: Icône simple : fond vert sauge `#5C7A5F`, lettre "K" en Instrument Serif blanc, style médical épuré. Apple touch icon 180×180px. `<link rel="apple-touch-icon">` dans le layout.

- [x] **TASK-025** — Meta tags PWA dans le layout
  Files: `app/layout.tsx`
  Notes: `<meta name="apple-mobile-web-app-capable" content="yes">`, `<meta name="apple-mobile-web-app-status-bar-style" content="default">`, `<meta name="theme-color" content="#5C7A5F">`. Viewport : `width=device-width, initial-scale=1, maximum-scale=1`.

- [x] **TASK-026** — Banner "Installer l'app" (iOS)
  Files: `components/InstallBanner.tsx`
  Notes: Bottom sheet affiché à la 2ème visite uniquement (localStorage `kiscribe_install_shown`). Instructions contextuelles : iOS ("Appuie sur Partager → Ajouter à l'écran d'accueil") vs Android. Bouton "Plus tard" dismiss définitif. Ne pas afficher si déjà en mode standalone (`window.matchMedia('(display-mode: standalone)')`).

- [x] **TASK-027** — Optimisations mobile UI
  Files: `app/(dashboard)/page.tsx`, `globals.css`
  Notes: `padding-bottom: env(safe-area-inset-bottom)` sur le wrapper principal. Bouton micro toujours dans la zone facilement atteignable au pouce (bas de l'écran). Vérifier qu'aucun input ne déclenche le zoom iOS (font-size ≥ 16px sur tous les inputs). Tester sur 375px et 390px.

---

## Phase 5 — Landing Page & Launch
**Objectif :** Landing page convertissante en ligne, SEO de base, prêt à envoyer du trafic.
**Demoable :** Envoyer le lien à 10 kinés et avoir un taux de signup > 20%.
**Durée estimée :** 1-2 jours

**Prompt agent session :**
> "Crée la landing page de Kiscribe sur la route `/`. Page one-scroll, mobile-first, qui convertit les kinés libéraux français. Sections : hero fort, problème, solution (3 étapes), prix, CTA final. Design système : vert sauge, blanc cassé, Instrument Serif pour les titres, Inter pour le corps. Suis le PRD section 8 FR-008 et le product-vision.md § Brand Strategy."

- [x] **TASK-028** — Structure et layout landing page
  Files: `app/page.tsx`, `components/landing/Navbar.tsx`
  Notes: Page one-scroll sans sidebar. Navbar : Logo à gauche + "Se connecter" à droite (link vers /sign-in). Pas de nav links. Background `#FAFAF8`. Max-width 640px centré sur mobile, 1024px sur desktop.

- [x] **TASK-029** — Section Hero
  Files: `components/landing/Hero.tsx`
  Notes: Titre H1 `Instrument Serif` 36px : "Tes notes kiné en 2 minutes." Sous-titre Inter 18px gris : "Tu parles, on rédige. Note SOAPIE complète + code AMK en 90 secondes." CTA bouton vert sauge pleine largeur mobile : "Essayer 7 jours gratuits". Pas d'image hero — typographie seule, épuré.

- [x] **TASK-030** — Section Problème
  Files: `components/landing/ProblemSection.tsx`
  Notes: Titre : "2 heures par jour. Non rémunérées." Corps : chiffres concrets — 2h × 5 jours × 48 semaines = 480h/an de paperasse. Ton empathique, pas alarmiste. Background légèrement différent (`#F5F5F0`) pour différencier la section.

- [x] **TASK-031** — Section Comment ça marche (3 étapes)
  Files: `components/landing/HowItWorks.tsx`
  Notes: 3 cards verticales sur mobile : (1) Tu parles — icône micro, (2) On structure — icône document, (3) Tu copies — icône clipboard. Chaque card : icône + titre + 1 phrase. Icônes Lucide React.

- [x] **TASK-032** — Section Pricing
  Files: `components/landing/PricingSection.tsx`
  Notes: Une seule card Solo 49€/mois. Bullet points : "✓ Notes SOAPIE illimitées", "✓ Codes AMK post-Avenant 7", "✓ PWA iPhone & Android", "✓ Essai 7 jours gratuit". CTA : "Commencer l'essai gratuit". Mention discrète : "Aucune CB requise pendant l'essai."

- [x] **TASK-033** — Section CTA final + Footer
  Files: `components/landing/CTASection.tsx`, `components/landing/Footer.tsx`
  Notes: CTA final : "Récupère 2 heures par jour dès demain." + bouton. Footer minimal : CGU (lien vers `/legal/cgu`), Politique de confidentialité (lien vers `/legal/privacy`), "© 2026 Kiscribe". Pas de réseaux sociaux en MVP.

- [x] **TASK-034** — SEO Meta tags
  Files: `app/layout.tsx`, `app/page.tsx`
  Notes: `<title>Kiscribe — Notes kiné en 2 minutes | SOAPIE & codes AMK</title>`. Description : "Kiscribe génère vos notes SOAPIE et codes AMK en 90 secondes de dictée. L'outil IA conçu pour les kinésithérapeutes libéraux français." OG image placeholder. `lang="fr"` sur `<html>`.

- [x] **TASK-035** — Pages légales minimales
  Files: `app/legal/cgu/page.tsx`, `app/legal/privacy/page.tsx`
  Notes: CGU : conditions d'utilisation, disclaimer ("la note générée doit être validée par le praticien avant usage clinique"), limitation de responsabilité. Politique de confidentialité : données collectées (email, usage count), pas de données de santé stockées, RGPD. Templates simples, texte légal en français.

---

## Phase 6 — Polish & Hardening
**Objectif :** L'app est robuste, les edge cases sont gérés, prête pour 50 utilisateurs réels.
**Demoable :** 0 crashes sur 200 utilisations en conditions réelles.
**Durée estimée :** 1 jour

**Prompt agent session :**
> "Ajoute la gestion complète des edge cases du PRD section 12, le rate limiting, les messages d'erreur humains, et les micro-interactions de polish. Vérifie tous les états vides, loading et error de l'interface. Ajoute le disclaimer légal sous chaque note générée."

- [ ] **TASK-036** — Gestion complète des erreurs audio
  Files: `hooks/useAudioRecorder.ts` (update), `components/MicButton.tsx` (update)
  Notes: Permission refusée → message avec guide spécifique iOS/Android. Browser non supporté → message avec lien vers Chrome/Safari. Audio trop court (< 2s) → message "Décris ta séance en quelques phrases". Chaque erreur a un message en français, humain, sans jargon technique.

- [ ] **TASK-037** — Gestion erreurs réseau et API
  Files: `hooks/useGenerate.ts` (update)
  Notes: Timeout Groq → retry 1 fois automatique, puis message utilisateur. Erreur Claude → afficher transcription brute avec message "Structure automatique indisponible — voici ta transcription". Pas de connexion → message hors-ligne avec icône. Tous les messages d'erreur ont un bouton "Réessayer".

- [ ] **TASK-038** — Rate limiting Edge Middleware
  Files: `middleware.ts` (update)
  Notes: 100 requêtes/minute par utilisateur sur les routes `/api/transcribe` et `/api/generate`. Retourner 429 avec header `Retry-After`. Simple compteur en mémoire Vercel Edge ou via Upstash Redis (si nécessaire à l'échelle).

- [ ] **TASK-039** — Disclaimer légal sous la note générée
  Files: `components/NoteCard.tsx` (update)
  Notes: Texte en bas de chaque note, gris muted, taille 12px : "Note générée par IA — à valider par le praticien avant toute utilisation clinique." Non copiable (exclus du clipboard text). Jamais supprimable par l'utilisateur.

- [ ] **TASK-040** — Micro-interactions et polish UI
  Files: `components/MicButton.tsx`, `globals.css`
  Notes: Animation pulse bouton micro en recording (CSS keyframes, scale 1→1.05, 1.5s infinite). Fade-in de la NoteCard (150ms, opacity 0→1). Transition douce entre états du dashboard (200ms). Vérifier que le bouton copier ne déclenche pas de double-tap zoom sur iOS.

- [ ] **TASK-041** — Test Lighthouse PWA
  Files: audit uniquement
  Notes: Lancer Lighthouse sur l'URL de prod. Objectif : PWA score > 90, Performance > 80. Corriger les issues si score insuffisant (manifest, service worker, HTTPS, icons).

- [ ] **TASK-042** — Variables d'environnement prod finales
  Files: Vercel dashboard
  Notes: Vérifier que toutes les variables sont en prod Vercel. Tester le webhook Stripe avec la CLI Stripe (`stripe trigger customer.subscription.created`). Tester le webhook Clerk en prod. Vérifier que le domaine custom `kiscribe.fr` est configuré sur Vercel.

---

## Agent Session Guide

### Comment utiliser ce roadmap avec Claude Code

Chaque phase a un **prompt agent session** en haut. Commence chaque nouvelle session Claude Code en copiant ce prompt. Claude Code lira ce roadmap + le PRD + le product-vision.md pour avoir tout le contexte.

### Règles pour Claude Code
1. **Cocher chaque tâche dès qu'elle est terminée** : changer `- [ ]` en `- [x]`
2. **Ne jamais passer à la phase suivante** si une tâche de la phase en cours n'est pas cochée
3. **Ne jamais modifier le design system** sans explicitement vérifier contre `product-vision.md` § Design Tokens
4. **Ne jamais stocker de données de santé** — c'est une contrainte de sécurité non-négociable
5. **Tester sur 375px avant de passer à la tâche suivante** pour toute tâche UI

### Ordre de démarrage recommandé

```
Session 1 : Phase 1 complète (TASK-001 → TASK-007)
Session 2 : Phase 2 complète (TASK-008 → TASK-016)
Session 3 : Phase 3 complète (TASK-017 → TASK-021)
Session 4 : Phase 4 + début Phase 5 (TASK-022 → TASK-030)
Session 5 : Fin Phase 5 + Phase 6 (TASK-031 → TASK-042)
```

### Checklist launch

Avant d'envoyer le premier lien à un kiné :

- [ ] Dictée → SOAPIE fonctionne en prod sur iPhone Safari
- [ ] PWA installable sur iPhone
- [ ] Stripe Checkout fonctionnel (tester avec carte test Stripe)
- [ ] Webhook Stripe met à jour la subscription en base
- [ ] Erreurs gérées proprement (tester sans connexion, avec micro refusé)
- [ ] CGU et politique de confidentialité en ligne
- [ ] Disclaimer légal visible sous chaque note
- [ ] Domaine `kiscribe.fr` configuré
