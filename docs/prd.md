# Kiscribe — Product Requirements Document

> Stack: Next.js 14 App Router · TypeScript · Tailwind CSS · Supabase · Clerk · Stripe · Groq Whisper · Claude Haiku 4.5 · Vercel · next-pwa

---

## 1. Overview

**Product:** Kiscribe
**One-liner:** Scribe IA pour kinésithérapeutes — dictée de 90 secondes → note SOAPIE complète + code AMK.
**Objective:** Éliminer les 2h/jour de paperasse du kiné libéral français grâce à la transcription vocale IA.
**Differentiation:** Premier outil français spécialisé combinant transcription vocale, structuration SOAPIE automatique, et suggestion de codes AMK post-Avenant 7, en PWA mobile-first.
**Magic Moment:** Le kiné parle 90 secondes après sa séance → voit une note SOAPIE complète apparaître avec le bon code AMK → comprend qu'il vient de récupérer 2h de sa journée.
**Success Criteria (90 jours):** 50 clients payants, 2 450€ MRR, churn < 5%/mois.

---

## 2. Technical Architecture

### Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                    CLIENT (PWA)                      │
│  Next.js App Router · Tailwind · next-pwa            │
│  MediaRecorder API → WebM/Opus audio blob            │
└──────────────────────┬──────────────────────────────┘
                       │ HTTPS POST (FormData)
┌──────────────────────▼──────────────────────────────┐
│              API ROUTES (Vercel Serverless)           │
│                                                      │
│  POST /api/transcribe  →  Groq Whisper API           │
│  POST /api/generate    →  Anthropic Claude Haiku     │
│  POST /api/webhooks/stripe  →  Stripe events         │
└──────────┬───────────────────────┬───────────────────┘
           │                       │
┌──────────▼───────┐   ┌───────────▼──────────────────┐
│    Supabase DB   │   │         External APIs         │
│  users           │   │  Clerk (auth)                 │
│  subscriptions   │   │  Stripe (billing)             │
│  usage_logs      │   │  Groq (whisper transcription) │
│                  │   │  Anthropic (note generation)  │
└──────────────────┘   └──────────────────────────────┘
```

**Principe stateless :** Aucune donnée de santé (note, transcription, contenu de séance) n'est stockée en base. Les API routes reçoivent l'audio, appellent Groq puis Claude, et retournent le résultat directement au client. Rien n'est persisté côté serveur hormis les données utilisateur (email, subscription status, usage count).

### Stack Table

| Couche | Technologie | Justification |
|---|---|---|
| Framework | Next.js 14 App Router | SSR + API routes dans un seul repo |
| Language | TypeScript | Type safety, même DNA que Radar IA |
| Styling | Tailwind CSS | Rapide, cohérent avec le design system |
| PWA | next-pwa (Serwist fork) | Service worker, installabilité iOS/Android |
| Auth | Clerk | SDK Next.js natif, webhooks Stripe facile |
| Database | Supabase (PostgreSQL) | Minimal — users + subs uniquement |
| Payments | Stripe | Abonnements récurrents, portail client |
| Transcription | Groq Whisper API | 10x moins cher qu'OpenAI, français excellent |
| Generation | Anthropic Claude Haiku 4.5 | Rapide, bon marché, qualité suffisante pour structurer |
| Hosting | Vercel | Déploiement immédiat, edge functions |

### Repo Structure

```
kiscribe/
├── app/
│   ├── (auth)/
│   │   ├── sign-in/page.tsx
│   │   └── sign-up/page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx          # Auth guard Clerk
│   │   └── page.tsx            # Interface dictée principale
│   ├── api/
│   │   ├── transcribe/route.ts  # Groq Whisper
│   │   ├── generate/route.ts    # Claude Haiku
│   │   └── webhooks/
│   │       └── stripe/route.ts  # Stripe webhook handler
│   ├── layout.tsx
│   ├── page.tsx                 # Landing page
│   └── globals.css
├── components/
│   ├── ui/                      # Composants de base (Button, Card, Badge)
│   ├── MicButton.tsx            # Bouton micro avec états
│   ├── NoteCard.tsx             # Affichage note SOAPIE
│   ├── AmkBadge.tsx             # Badge code AMK
│   └── CopyButton.tsx           # Bouton copier avec feedback
├── lib/
│   ├── supabase.ts              # Client Supabase
│   ├── stripe.ts                # Client Stripe + helpers
│   ├── groq.ts                  # Client Groq
│   ├── claude.ts                # Client Anthropic + prompt
│   └── amk-codes.ts             # Référentiel codes AMK post-Avenant 7
├── hooks/
│   ├── useAudioRecorder.ts      # MediaRecorder hook
│   └── useGenerate.ts           # Orchestration transcribe + generate
├── types/
│   └── index.ts                 # Types partagés
├── public/
│   ├── manifest.json            # PWA manifest
│   └── icons/                   # PWA icons (192, 512px)
├── next.config.js               # next-pwa config
├── tailwind.config.js
├── middleware.ts                # Clerk auth middleware
└── .env.local                  # Variables d'environnement
```

### Infrastructure

- **Vercel** : hosting + serverless functions (région `cdg1` — Paris, pour latence minimale)
- **Supabase** : projet région `eu-west-3` (Paris)
- **Pas de stockage audio côté serveur** : les blobs audio sont envoyés directement à Groq et jamais persistés

### Security

- Toutes les API routes vérifient l'auth Clerk (`auth()` de `@clerk/nextjs/server`)
- Les API keys (Groq, Anthropic, Stripe) uniquement en variables d'environnement serveur (jamais exposées au client)
- HTTPS only (Vercel enforced)
- Webhook Stripe vérifié avec `stripe.webhooks.constructEvent` + secret webhook
- Rate limiting : 100 requêtes/minute par utilisateur via Vercel Edge Middleware

### Cost Estimate (à 50 utilisateurs actifs)

| Service | Usage estimé | Coût/mois |
|---|---|---|
| Groq Whisper | 50 users × 300 notes × 90s audio | ~$2 |
| Claude Haiku | 50 users × 300 notes | ~$5 |
| Vercel Pro | 1 projet | $20 |
| Supabase | Free tier suffit à 50 users | $0 |
| Clerk | Free tier (< 10k MAU) | $0 |
| Stripe | 2.9% + 0.30€ / transaction | ~$75 |
| **Total** | | **~$102/mois** |
| **Revenue** | 50 × 49€ | **2 450€/mois** |
| **Marge brute** | | **~96%** |

---

## 3. Data Model

### users (géré par Clerk + sync Supabase)

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### subscriptions

```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT UNIQUE NOT NULL,
  stripe_subscription_id TEXT UNIQUE,
  status TEXT NOT NULL, -- 'trialing' | 'active' | 'past_due' | 'canceled'
  plan TEXT NOT NULL DEFAULT 'solo', -- 'solo' | 'cabinet'
  trial_ends_at TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### usage_logs (comptage sans données de santé)

```sql
CREATE TABLE usage_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  action TEXT NOT NULL, -- 'transcribe' | 'generate'
  duration_seconds INTEGER, -- durée audio uniquement
  created_at TIMESTAMPTZ DEFAULT NOW()
  -- AUCUN contenu de la note, AUCUNE transcription stockée
);
```

---

## 4. API Specification

### POST /api/transcribe

Reçoit un blob audio, retourne la transcription texte.

**Auth:** Clerk session required

**Request:**
```
Content-Type: multipart/form-data
Body: audio (File) — WebM/Opus, max 25MB
```

**Response 200:**
```json
{
  "transcript": "Patient 58 ans lombalgie chronique L4-L5 séance 4 renfo lombaire vélo 10 min étirements psoas EVA 6 début EVA 2 fin"
}
```

**Response 400:** `{ "error": "No audio file provided" }`
**Response 401:** `{ "error": "Unauthorized" }`
**Response 429:** `{ "error": "Rate limit exceeded" }`
**Response 500:** `{ "error": "Transcription failed" }`

**Implementation:**
```typescript
// Appel Groq Whisper
const formData = new FormData()
formData.append('file', audioFile, 'audio.webm')
formData.append('model', 'whisper-large-v3')
formData.append('language', 'fr')
formData.append('response_format', 'json')
```

---

### POST /api/generate

Reçoit une transcription, retourne une note SOAPIE structurée + code AMK.

**Auth:** Clerk session required + subscription active

**Request:**
```json
{
  "transcript": "string — texte transcrit de la séance"
}
```

**Response 200:**
```json
{
  "note": {
    "subjective": "string",
    "objective": "string",
    "analysis": "string",
    "plan": "string",
    "intervention": "string",
    "evaluation": "string"
  },
  "amk": {
    "code": "AMK 7.5",
    "justification": "Acte de rééducation standard en cabinet, séance individuelle."
  },
  "formatted": "string — note complète formatée prête à copier"
}
```

**Response 402:** `{ "error": "Subscription required" }`
**Response 500:** `{ "error": "Generation failed" }`

---

### POST /api/webhooks/stripe

Gère les événements Stripe pour mettre à jour les subscriptions.

**Auth:** Stripe webhook signature

**Events handled:**
- `customer.subscription.created` → créer/activer subscription
- `customer.subscription.updated` → mettre à jour status/plan
- `customer.subscription.deleted` → désactiver subscription
- `invoice.payment_failed` → passer subscription en `past_due`

---

## 5. User Stories

### US-001 — Première dictée
**As a** kiné libéral abonné,
**I want** to appuyer sur un bouton, dicter ma séance, et recevoir une note SOAPIE complète,
**So that** je n'ai plus à écrire mes notes à la main.

**Acceptance Criteria:**
- Le bouton micro est visible immédiatement après connexion, sans scroll
- L'enregistrement démarre en < 500ms après tap
- La note apparaît en < 6 secondes après arrêt de l'enregistrement
- La note contient les 6 sections SOAPIE remplies avec le contenu de la dictée
- Un code AMK est suggéré avec une justification d'une ligne

### US-002 — Copier la note
**As a** kiné,
**I want** to copier la note générée en un tap,
**So that** je puisse la coller dans Doctolib en 5 secondes.

**Acceptance Criteria:**
- Bouton "Copier la note" visible sous la note générée
- Le texte copié est formaté lisiblement (sections avec labels)
- Feedback visuel "Copié ✓" pendant 1.5 secondes
- Le texte collé dans Doctolib est propre et sans caractères parasites

### US-003 — Installation PWA
**As a** kiné sur iPhone,
**I want** to installer l'app sur mon écran d'accueil,
**So that** je l'ouvre comme une vraie app sans passer par le browser.

**Acceptance Criteria:**
- Banner "Ajouter à l'écran d'accueil" affiché au 2ème usage
- Icône Kiscribe apparaît sur l'écran d'accueil
- L'app s'ouvre en plein écran sans barre de navigation Safari
- Le micro fonctionne depuis la PWA installée

### US-004 — Essai gratuit
**As a** kiné intéressé,
**I want** to essayer l'outil 7 jours sans CB obligatoire,
**So that** je peux vérifier que ça marche avant de payer.

**Acceptance Criteria:**
- Signup possible sans CB
- Accès complet à l'outil pendant 7 jours
- Email de rappel à J+5 ("Plus que 2 jours d'essai")
- À J+7 : prompt pour entrer la CB, accès bloqué sinon

### US-005 — Gestion abonnement
**As a** kiné abonné,
**I want** to gérer ou annuler mon abonnement,
**So that** je reste en contrôle sans contacter le support.

**Acceptance Criteria:**
- Lien "Gérer mon abonnement" accessible depuis le menu
- Redirige vers le portail Stripe auto-hébergé
- Annulation possible sans friction (pas de "dark pattern")

---

## 6. Functional Requirements

### FR-001 — Enregistrement audio
**Priority:** P0
**Description:** L'utilisateur peut enregistrer sa voix via le bouton micro.

**Acceptance Criteria:**
- Utilise la Web Audio API / MediaRecorder avec codec `audio/webm;codecs=opus`
- Durée max : 5 minutes (au-delà, arrêt automatique + avertissement)
- Indicateur visuel de niveau sonore pendant l'enregistrement (pulse animation)
- Arrêt manuel via second tap sur le bouton
- Arrêt automatique après 3 secondes de silence (configurable, défaut 3s)
- L'audio est envoyé à l'API immédiatement après arrêt

**Edge Cases:**
- Micro refusé par l'OS → afficher guide "Autoriser le micro dans les réglages"
- Browser non supporté → message avec lien vers Chrome/Safari
- Connexion perdue pendant l'enregistrement → stocker blob localement, retry à la reconnexion

---

### FR-002 — Transcription Groq Whisper
**Priority:** P0
**Description:** L'audio est transcrit en texte français par Groq Whisper.

**Acceptance Criteria:**
- Modèle utilisé : `whisper-large-v3`
- Language hint : `fr`
- Temps de transcription < 3 secondes pour 90 secondes d'audio
- La transcription est passée à FR-003 sans être stockée

**Edge Cases:**
- Audio trop court (< 2 secondes) → erreur "Enregistrement trop court"
- Audio inaudible → transcription vide → erreur "Audio non reconnu, réessayez"
- Timeout Groq (> 10s) → retry 1 fois, puis erreur utilisateur

---

### FR-003 — Génération note SOAPIE + code AMK
**Priority:** P0
**Description:** La transcription est structurée en note SOAPIE + suggestion AMK par Claude Haiku.

**System Prompt:**
```
Tu es un assistant spécialisé en kinésithérapie française. Tu reçois la transcription d'un kinésithérapeute décrivant une séance de rééducation.

Ta tâche est de structurer cette description en note SOAPIE complète et de suggérer le code AMK approprié selon la nomenclature NGAP post-Avenant 7 (juillet 2025).

FORMAT DE SORTIE (JSON strict) :
{
  "subjective": "Ce que rapporte le patient : douleurs, évolution, ressenti",
  "objective": "Ce que le kiné a observé et mesuré : amplitudes, tests, évaluations",
  "analysis": "Interprétation clinique du kiné : diagnostic kiné, évolution, problèmes",
  "plan": "Objectifs et programme : fréquence, durée, axes thérapeutiques",
  "intervention": "Actes réalisés lors de cette séance : techniques, durées, paramètres",
  "evaluation": "Résultats de la séance : EVA avant/après, tolérance, progression",
  "amk_code": "ex: AMK 7.5",
  "amk_justification": "Explication courte en 1 phrase du choix de code"
}

RÈGLES AMK (Avenant 7, juillet 2025) :
- AMK 7.5 : acte de rééducation standard en cabinet ou domicile
- AMK 14 : actes spécialisés listés à la nomenclature (respiratoire, neurologique lourd, etc.)
- BDK (= AMK 14) : premier bilan diagnostique kinésithérapique
- IFN : indemnité forfaitaire neurologique — à ajouter si pathologie neuromusculaire
- IFD : indemnité forfaitaire de déplacement — si séance au domicile du patient
- En cas de doute, utiliser AMK 7.5 et signaler l'incertitude dans la justification

IMPORTANT :
- Utilise un vocabulaire clinique kiné professionnel mais lisible
- Si une information manque dans la transcription, note "Non renseigné" dans la section concernée
- Ne jamais inventer des données qui ne sont pas dans la transcription
- La note doit être directement utilisable dans un logiciel de dossier patient
```

**Acceptance Criteria:**
- Temps de génération < 4 secondes
- Les 6 sections SOAPIE sont toujours présentes dans la réponse
- Le code AMK est toujours présent
- Si la transcription est ambiguë, privilégier AMK 7.5 avec note d'incertitude

---

### FR-004 — Affichage et copie de la note
**Priority:** P0
**Description:** La note générée est affichée de façon lisible et copiable en un tap.

**Acceptance Criteria:**
- Les 6 sections SOAPIE sont affichées avec leurs labels (S, O, A, P, I, E)
- Le code AMK est affiché dans un badge distinct, en couleur accent
- La justification AMK est affichée en texte gris sous le badge
- Bouton "Copier la note" en bas, pleine largeur
- Le texte copié inclut les labels de sections et est formaté pour Doctolib
- Feedback "Copié ✓" pendant 1.5 secondes

**Format copié :**
```
[Kiscribe] Note de séance — {date}

S — Subjectif
{contenu}

O — Objectif
{contenu}

A — Analyse
{contenu}

P — Plan
{contenu}

I — Intervention
{contenu}

E — Évaluation
{contenu}

Code AMK : {code} — {justification}
```

---

### FR-005 — PWA (Progressive Web App)
**Priority:** P0
**Description:** L'application est installable sur iOS et Android sans App Store.

**Acceptance Criteria:**
- `manifest.json` configuré avec nom, icônes 192px et 512px, `display: standalone`
- `theme_color: #5C7A5F`
- Service worker via next-pwa (Serwist) pour cache des assets statiques
- Sur iOS Safari : banner "Ajouter à l'écran d'accueil" après 2ème visite
- L'app en PWA installée accède bien au microphone
- Fonctionne hors-ligne pour les assets statiques (message dédié si API indisponible)

---

### FR-006 — Auth (Clerk)
**Priority:** P0
**Description:** Les utilisateurs s'inscrivent et se connectent de façon sécurisée.

**Acceptance Criteria:**
- Signup email/password + Google OAuth
- Session persistante (pas de reconnexion à chaque ouverture PWA)
- Toutes les routes `/dashboard/*` et `/api/*` (sauf webhooks) protégées par Clerk middleware
- Clerk user ID synchronisé vers Supabase au premier login via webhook Clerk

---

### FR-007 — Paiement et abonnement (Stripe)
**Priority:** P0
**Description:** Les utilisateurs peuvent s'abonner et gérer leur abonnement.

**Acceptance Criteria:**
- Trial 7 jours sans CB
- Plan Solo 49€/mois — Stripe price ID configuré
- Après trial : prompt Stripe Checkout pour CB
- Webhook Stripe met à jour `subscriptions` en base
- Middleware vérifie `subscription.status === 'active' || 'trialing'` avant `/api/generate`
- Lien vers portail Stripe dans les settings
- Email automatique Stripe pour paiement échoué

---

### FR-008 — Landing page
**Priority:** P1
**Description:** Page de présentation convertissante pour les kinés.

**Acceptance Criteria:**
- Hero : titre fort + CTA "Essayer 7 jours gratuits" au-dessus de la fold
- Section problème : "2h de notes par jour non rémunérées"
- Section solution : démo du workflow en 3 étapes (Tu parles → On structure → Tu copies)
- Section preuve sociale : témoignages (fictifs pour le MVP, remplacés par vrais dès possible)
- Section pricing : Solo 49€/mois, mention trial gratuit
- CTA final
- Pas de navbar complexe — page one-scroll
- SEO meta tags : title, description, og:image

---

## 7. Non-Functional Requirements

### Performance
- Time to First Contentful Paint (FCP) < 1.5s sur mobile 4G
- Temps total transcription + génération < 6s pour 90s d'audio
- Taille bundle JS < 200KB gzipped (hors react/next)
- Lighthouse PWA score > 90

### Security
- Aucune clé API exposée côté client
- Validation de tous les inputs API avec Zod
- Headers de sécurité via next.config.js (CSP, HSTS, X-Frame-Options)
- Stripe webhook vérifié avec `stripe-signature` header

### Accessibility
- WCAG 2.1 AA
- Tous les boutons interactifs : touch target ≥ 44×44px
- Contraste texte/fond ≥ 4.5:1
- Focus visible sur tous les éléments interactifs
- `aria-label` sur le bouton micro avec état dynamique ("Démarrer l'enregistrement" / "Arrêter")

### Scalability
- Architecture serverless Vercel : scalabilité automatique
- Groq et Anthropic gèrent leur propre scaling
- Supabase peut tenir > 10 000 users sans migration

### Browser Support
- iOS Safari 14.3+ (requis pour MediaRecorder)
- Chrome Android 80+
- Chrome/Firefox/Safari desktop

---

## 8. UI/UX Requirements

### Screen 1 — Landing Page (`/`)

**État initial :**
- Navbar minimaliste : Logo Kiscribe à gauche + "Se connecter" à droite
- Hero full-screen : fond `#FAFAF8`, titre `Instrument Serif` 36px centré, sous-titre Inter 18px, bouton CTA vert sauge pleine largeur sur mobile
- Le bouton micro de démo est un visuel statique (pas fonctionnel sur la landing)

**Sections :**
1. Hero — "Tes notes kiné en 2 minutes. Tu parles, on rédige." + CTA
2. Le problème — "2h de notes par jour. Non rémunérées." — texte + icône horloge
3. Comment ça marche — 3 steps : Dicte / On structure / Tu copies
4. Prix — Card Solo 49€/mois + bullet points + CTA
5. Footer minimal : CGU, Politique de confidentialité, contact

---

### Screen 2 — Interface principale (`/dashboard`)

**État : idle (aucun enregistrement en cours)**
```
┌─────────────────────────────┐
│  Logo              ☰ Menu  │
├─────────────────────────────┤
│                             │
│   Nouvelle séance           │  ← Titre H2
│   Appuie sur le micro       │  ← Subtitle gris
│   et décris ta séance       │
│                             │
│         ┌─────┐             │
│         │  🎤 │             │  ← Bouton micro 80px circle, vert sauge
│         └─────┘             │
│                             │
│   ─────────────────────     │  ← Séparateur
│                             │
│   [Note précédente si dispo]│  ← Optionnel en MVP
│                             │
└─────────────────────────────┘
```

**État : recording (enregistrement en cours)**
- Bouton micro passe en `--color-recording` (#E05555)
- Animation pulse (scale 1 → 1.05, répété)
- Timer d'enregistrement : "0:45" en gris sous le bouton
- Texte change : "Parle... appuie pour terminer"

**État : processing (après arrêt, en attente)**
- Spinner simple centré
- Texte : "Génération en cours..."
- Durée attendue : 3-6 secondes

**État : result (note générée)**
```
┌─────────────────────────────┐
│  ← Nouvelle dictée          │  ← Bouton retour
├─────────────────────────────┤
│  ┌───────────────────────┐  │
│  │ S — Subjectif         │  │  ← Section label vert sauge
│  │ Patient 58 ans,       │  │
│  │ lombalgie chronique...│  │
│  ├───────────────────────┤  │
│  │ O — Objectif          │  │
│  │ ...                   │  │
│  ├───────────────────────┤  │
│  │ [... autres sections] │  │
│  ├───────────────────────┤  │
│  │ AMK 7.5  ─────────── │  │  ← Badge accent doré
│  │ Acte standard cabinet │  │  ← Justification gris
│  └───────────────────────┘  │
│                             │
│  [  Copier la note  ✓  ]   │  ← CTA pleine largeur, vert sauge
└─────────────────────────────┘
```

**État : error**
- Card rouge doux avec icône warning
- Message d'erreur humain (pas technique)
- Bouton "Réessayer"

---

### Screen 3 — Menu / Settings

**Accessible via hamburger ☰ :**
- Email de l'utilisateur (non éditable)
- Lien "Gérer mon abonnement" → portail Stripe
- Lien "Déconnexion"
- Version de l'app

---

### Screen 4 — Onboarding post-signup

**Étape 1 : Confirmation signup**
- "Bienvenue ! Tu as 7 jours d'essai gratuit."
- Bouton "Commencer" → dashboard

**Étape 2 : Prompt PWA (2ème ouverture)**
- Bottom sheet : "Pour une meilleure expérience, installe l'app sur ton téléphone"
- Instructions contextuelles selon l'OS (iOS vs Android)
- Bouton "Plus tard" (dismiss)

---

## 9. Design System

Voir `product-vision.md` § Design Direction pour la palette complète.

```css
/* globals.css */
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&display=swap');

:root {
  --color-bg: #FAFAF8;
  --color-surface: #FFFFFF;
  --color-primary: #5C7A5F;
  --color-primary-hover: #4A6349;
  --color-text: #1A1A1A;
  --color-text-muted: #6B6B6B;
  --color-border: #E8E8E4;
  --color-accent: #C4A96A;
  --color-recording: #E05555;
  --color-success-bg: #D4EDDA;
  --color-error-bg: #F8D7DA;
  --radius-card: 12px;
  --radius-btn: 8px;
  --radius-circle: 999px;
}
```

---

## 10. Auth Implementation (Clerk)

**Setup :**
```bash
npm install @clerk/nextjs
```

**middleware.ts :**
```typescript
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhooks/(.*)',
])

export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) auth().protect()
})

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
}
```

**Sync Clerk → Supabase (webhook Clerk) :**
- Event : `user.created`
- Handler dans `/api/webhooks/clerk/route.ts`
- Insère un row dans `users` avec `clerk_user_id`

**Variables d'environnement :**
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

---

## 11. Payment Integration (Stripe)

**Products à créer dans le dashboard Stripe :**
1. `kiscribe_solo` — 49€/mois, recurring
2. Trial period : 7 jours sur le produit solo

**Flux checkout :**
```typescript
// Création session Stripe
const session = await stripe.checkout.sessions.create({
  customer_email: user.email,
  mode: 'subscription',
  payment_method_types: ['card'],
  line_items: [{ price: process.env.STRIPE_PRICE_SOLO_ID, quantity: 1 }],
  subscription_data: { trial_period_days: 7 },
  success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?success=true`,
  cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
  locale: 'fr',
})
```

**Portail client :**
```typescript
const portalSession = await stripe.billingPortal.sessions.create({
  customer: stripeCustomerId,
  return_url: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
})
```

**Variables d'environnement :**
```
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_SOLO_ID=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

---

## 12. Edge Cases & Error Handling

| Scénario | Comportement attendu |
|---|---|
| Micro refusé par iOS | Message : "Autorise le micro dans Réglages > Safari > Microphone" avec icône |
| Audio < 2 secondes | Message : "Enregistrement trop court. Décris ta séance en quelques phrases." |
| Groq timeout | Retry automatique 1 fois, puis : "Transcription lente, réessaie dans quelques secondes." |
| Claude retourne JSON invalide | Parser défaillant → afficher transcription brute avec message "Structure automatique indisponible" |
| Pas de connexion internet | Message hors-ligne PWA, retry automatique à la reconnexion |
| Trial expiré sans CB | Bloquer `/api/generate`, afficher modal avec lien Stripe Checkout |
| Subscription `past_due` | Laisser accès 48h, puis bloquer avec message de réactivation |
| Audio en langue non-française | Whisper transcrit quand même, la note peut être moins bonne — aucune vérification |

---

## 13. Dependencies & Integrations

```json
{
  "dependencies": {
    "next": "14.x",
    "react": "18.x",
    "typescript": "5.x",
    "@clerk/nextjs": "latest",
    "stripe": "latest",
    "@supabase/supabase-js": "latest",
    "groq-sdk": "latest",
    "@anthropic-ai/sdk": "latest",
    "tailwindcss": "3.x",
    "lucide-react": "latest",
    "zod": "latest",
    "next-pwa": "latest"
  }
}
```

**Variables d'environnement complètes :**
```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_SOLO_ID=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Groq
GROQ_API_KEY=

# Anthropic
ANTHROPIC_API_KEY=

# App
NEXT_PUBLIC_URL=https://kiscribe.fr
```

---

## 14. Out of Scope (MVP)

- Intégration API Doctolib / Topaze / Vétocom (copier-coller suffisant en MVP)
- Stockage des notes côté serveur (mode stateless MVP)
- Historique des patients
- BDK (bilan diagnostique kinésithérapique) automatisé
- Multi-praticiens / plan cabinet
- Télétransmission CPAM directe
- Application iOS/Android native (App Store)
- Dashboard analytics pour l'utilisateur
- Support d'autres professions (orthophonistes, médecins)
- Mode hors-ligne pour la génération (API requise)

---

## 15. Open Questions

1. **Qualité du prompt Claude Haiku** : À tester intensivement sur 50+ scénarios réels avant le launch. Si la qualité est insuffisante, passer à Claude Sonnet (+$0.02/note — marge reste > 95%).
2. **Stop automatique sur silence** : 3 secondes de silence = arrêt auto. Valider ce seuil avec de vrais kinés (ils peuvent chercher leurs mots).
3. **Format de copie** : Le format proposé est optimisé pour Doctolib. Valider avec des utilisateurs Topaze et autres logiciels.
4. **Disclaimer légal** : Ajouter une ligne sous chaque note générée : "Note générée par IA — à valider par le praticien avant signature." Obligatoire pour éviter toute ambiguïté sur la responsabilité.
5. **Nom de domaine** : `kiscribe.fr` à enregistrer dès que possible.
