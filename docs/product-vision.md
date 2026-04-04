# Kiscribe — Product Vision

> **"Tes notes kiné en 2 minutes. Tu parles, on rédige."**

---

## 1. Vision & Mission

### Vision Statement
Un monde où les kinésithérapeutes passent leur temps à soigner, pas à taper.

### Mission Statement
Kiscribe élimine la paperasse administrative du kiné libéral en transformant sa parole en notes SOAPIE complètes et en suggestions de codes AMK — en moins de 2 minutes par séance.

### Founder's Why
Le problème des kinés n'est pas un manque de compétence — c'est un système administratif qui leur vole 2 heures par jour. Ces 2 heures ne sont pas rémunérées, ne soignent pas, et épuisent des professionnels qui ont choisi ce métier pour être au contact des patients. L'IA existe pour résoudre exactement ce type de problème. Pas de raison que ça n'existe pas encore en France pour eux.

### Core Values
1. **Cliniquement crédible** — Chaque note générée doit pouvoir être signée sans honte. On ne génère pas du remplissage, on génère une vraie note professionnelle.
2. **Respect du temps** — Si ça prend plus de 2 minutes, on a raté. La friction zéro n'est pas un objectif marketing, c'est une contrainte de design.
3. **Transparent sur les limites** — L'outil suggère. Le kiné valide et signe. Jamais l'inverse.
4. **Pensé pour le couloir** — L'interface est conçue pour être utilisée debout, entre deux patients, en 60 secondes de dictée.

---

## 2. User Research

### Primary Persona — Marie, 34 ans

**Qui elle est :**
Kinésithérapeute libérale depuis 6 ans. Cabinet solo dans une maison de santé pluridisciplinaire en périphérie d'une ville moyenne. 13 patients/jour en moyenne, 5 jours/semaine. Utilise Doctolib pour ses rendez-vous, sa carte CPS pour la télétransmission CPAM. iPhone 13. Bonne avec la tech du quotidien, jamais utilisé un outil IA professionnel.

**Sa journée :**
- 8h → 12h30 : patients en continu
- 12h30 → 13h30 : notes de la matinée (à la va-vite, souvent incomplètes)
- 14h → 18h30 : patients en continu
- 19h → 20h : finir les notes du soir avant de pouvoir penser à autre chose

**Ce qu'elle dit :**
> *"Je suis kiné, pas secrétaire. Mais je passe autant de temps à écrire qu'à soigner."*
> *"Depuis l'Avenant 7, je ne suis même plus sûre des codes que j'utilise."*
> *"Si je pouvais juste parler et que ça s'écrive tout seul..."*

**Ses frustrations profondes :**
- 2h/jour de notes non rémunérées → 30 000€/an de temps perdu
- Confusion post-Avenant 7 sur les codes AMK corrects → risque de rejet CPAM
- Sentiment de gâcher ses compétences cliniques sur de l'administratif
- Les logiciels de cabinet (Doctolib, Topaze) sont des outils de gestion, pas d'aide à la documentation
- Culpabilité de bâcler les notes en fin de journée par fatigue

**Ce qu'elle a essayé :**
- Dicter à Siri → transcription brute, non structurée, inutilisable
- Templates Word → encore à remplir, pas d'aide sur les codes
- Rien d'autre — elle ne sait pas qu'une vraie solution existe

### Secondary Persona — Thomas, 41 ans, responsable de cabinet (3 kinés)

Veut standardiser la documentation de son équipe. Pain point supplémentaire : les remplaçants ne documentent pas de la même façon. Valeur potentielle : plan cabinet à 99€/mois pour 3 praticiens.

### Jobs To Be Done

| Quand je... | Je veux... | Afin de... |
|---|---|---|
| Finis une séance | Documenter rapidement | Passer au patient suivant sans retard |
| Suis en fin de journée | Finaliser mes notes | Rentrer chez moi sans culpabilité |
| Dois facturer un acte | Être sûr du bon code AMK | Éviter un rejet CPAM |
| Reçois un nouveau patient | Rédiger le BDK | Être conforme et avoir un dossier solide |

### Alternatives actuelles et leurs lacunes

| Alternative | Ce qu'elle fait | Ce qu'elle ne fait pas |
|---|---|---|
| Doctolib Kiné | Gestion RDV, télétransmission | Génère aucune note |
| Topaze / Vétocom | Billing + dossier patient | Génère aucune note |
| Dictée Siri | Transcription brute | Pas de structure SOAPIE, pas de code AMK |
| PIA / TOHA | Aide au raisonnement clinique | En phase d'étude, pas de workflow post-séance |
| Vocaire | Dictée pour soignants | Early-stage, pas spécifique kiné, pas de codes AMK |
| Word + templates | Structuré mais manuel | 10-12 min par note quand même |

### Key Assumptions To Validate
1. Les kinés acceptent de dicter à voix haute en cabinet (confidentialité, présence patient)
2. La qualité de note générée est suffisante pour être signée sans réécriture majeure
3. 49€/mois est un prix acceptable (= 1 séance remboursée, 40x moins que le temps récupéré)
4. Le copy-paste vers Doctolib est acceptable en MVP (sans intégration directe)

### User Journey Map (MVP)

```
[Fin de séance]
      ↓
Ouvre Kiscribe sur iPhone (icône PWA sur écran d'accueil)
      ↓
Appuie sur le bouton micro — parle 60-90 secondes
"Patient 58 ans, lombalgie chronique L4-L5, séance 4/10,
renfo lombaire sur vélo 10 min, étirements psoas bilatéraux,
massage paravertébral, EVA 6 début → EVA 2 fin,
bonne tolérance, prochaine séance dans 3 jours"
      ↓
Traitement (3-5 secondes)
      ↓
Note SOAPIE complète affichée + code AMK suggéré (ex: AMK 7.5)
avec justification en 1 ligne
      ↓
Kiné lit rapidement, valide mentalement
      ↓
[Copier] → colle dans Doctolib Kiné
      ↓
Séance suivante — 2 minutes maxi
```

---

## 3. Product Strategy

### Product Principles
1. **Mobile-first, pas mobile-friendly** — Chaque décision de design part du téléphone. Desktop est secondaire.
2. **Zéro onboarding requis** — Le kiné doit pouvoir générer sa première note en moins de 3 minutes après inscription.
3. **Confiance avant tout** — La note générée doit être meilleure que ce que le kiné écrirait à la va-vite. Jamais moins bien.
4. **Stateless en MVP** — Aucune donnée de santé stockée côté serveur. Le kiné reste 100% responsable de ses dossiers.
5. **Complémentaire, pas concurrent** — Kiscribe ne remplace pas Doctolib ou Topaze. Il s'insère dans leur workflow existant.

### Market Differentiation
Kiscribe est le seul outil français qui combine :
- Transcription vocale calibrée pour le vocabulaire kiné en français
- Structuration SOAPIE automatique avec les bons termes cliniques
- Suggestion de codes AMK selon la nomenclature NGAP post-Avenant 7
- Interface PWA pensée pour le workflow mobile post-séance

Aucun concurrent direct n'existe sur ce créneau en France à date (avril 2026).

### Magic Moment Design
**Le moment :** Première dictée → première note SOAPIE générée.

**Ce qui doit se passer pour que ça claque :**
- Temps de traitement < 5 secondes après la dictée
- La note doit inclure exactement ce que le kiné a dit, structuré
- Le code AMK doit être celui que le kiné aurait choisi lui-même
- L'interface doit être claire — le kiné ne doit pas chercher le bouton "copier"

**Comment on mesure que le magic moment a fonctionné :**
- Le kiné copie la note dans les 30 secondes qui suivent la génération
- Il revient le lendemain

### MVP Definition

**In scope :**
- Inscription / connexion (Clerk)
- Interface dictée vocale (bouton micro, enregistrement)
- Transcription Groq Whisper
- Génération note SOAPIE via Claude Haiku (prompt spécialisé kiné)
- Suggestion code AMK avec justification courte
- Affichage du résultat + bouton copier
- PWA installable sur iOS/Android
- Paiement Stripe (49€/mois)
- Portail de gestion abonnement

**Explicitly out of scope (MVP) :**
- Intégration directe Doctolib / Topaze / Vétocom (API)
- Stockage des notes côté serveur
- Historique des patients
- BDK (bilan diagnostique kinésithérapique) automatisé
- Multi-praticiens / plan cabinet
- Télétransmission CPAM directe
- Support d'autres professions paramédicales

### Feature Priority (MoSCoW)

**Must have (MVP) :**
- Dictée vocale → note SOAPIE complète en français
- Suggestion code AMK post-Avenant 7
- PWA installable
- Auth + Stripe

**Should have (v1.1) :**
- Historique des dernières notes (session locale)
- Paramètres de profil (type de patientèle dominante pour personnaliser le prompt)
- BDK automatisé

**Could have (v2) :**
- Intégration Doctolib via webhooks
- Plan cabinet multi-praticiens
- Export PDF de la note

**Won't have (MVP) :**
- Stockage HDS
- Télétransmission directe
- Application iOS/Android native

### Core User Flows

**Flow 1 — Onboarding (< 3 min)**
1. Landing page → CTA "Essayer 7 jours gratuits"
2. Clerk signup (email ou Google)
3. Stripe checkout (CB enregistrée, débit après 7 jours)
4. Redirect vers l'app → prompt "Installez l'app sur votre téléphone" (PWA)
5. Première dictée guidée (texte placeholder : "Décrivez votre séance...")

**Flow 2 — Usage quotidien (< 2 min)**
1. Ouvre l'icône PWA
2. Appuie sur le micro
3. Dicte 60-90 secondes
4. Lit la note générée (3-5s de traitement)
5. Copie → colle dans son logiciel

**Flow 3 — Billing**
1. Essai 7 jours gratuit
2. Débit automatique Stripe à J+7
3. Portail Stripe pour annulation / mise à jour CB

### Success Metrics (90 jours)

| Métrique | Objectif |
|---|---|
| Clients payants | 50 |
| MRR | 2 450€ |
| Churn mensuel | < 5% |
| Temps médian 1ère note | < 3 min après inscription |
| NPS | > 50 |
| Notes générées/utilisateur/semaine | > 20 (proxy d'usage quotidien) |

### Risks

| Risque | Probabilité | Impact | Mitigation |
|---|---|---|---|
| Qualité insuffisante de la note générée | Moyen | Élevé | Prompt engineering intensif + test sur 50 scénarios réels avant launch |
| Réticence à dicter en présence du patient | Moyen | Moyen | Onboarding : rassurer sur la confidentialité, suggérer de dicter après que le patient ait quitté la salle |
| Changement réglementaire codes AMK | Faible | Moyen | Prompt mis à jour manuellement, communication proactive |
| Concurrent français qui sort avant | Faible | Élevé | Exécution rapide (4 semaines), focus sur qualité de note |
| Apple bloque le micro sur PWA | Très faible | Élevé | Testé et supporté depuis iOS 14.3 — 99% des iPhones en France |

---

## 4. Brand Strategy

### Positioning Statement
Pour les kinésithérapeutes libéraux qui passent leurs soirées à écrire des notes, Kiscribe est le scribe IA spécialisé qui transforme une dictée de 90 secondes en note SOAPIE complète avec le bon code AMK — pour que tu rentres chez toi à l'heure.

Contrairement aux logiciels de cabinet génériques, Kiscribe est le seul outil conçu spécifiquement pour le workflow post-séance du kiné français, avec une connaissance native de la nomenclature NGAP.

### Brand Personality
- **Précis** — Les mots sont choisis. Les notes générées sont cliniquement correctes.
- **Bienveillant** — On comprend la fatigue de fin de journée. On ne juge pas les notes bâclées du passé.
- **Discret** — Pas de marketing creux. L'outil fait son travail sans faire de bruit.
- **Crédible** — Le kiné doit sentir que l'outil a été pensé par quelqu'un qui connaît son métier.

### Voice & Tone Guide

**DO :**
- "Tes notes en 2 minutes." (direct, court)
- "Parle. On rédige." (impératif simple, promesse claire)
- "Code AMK suggéré : AMK 7.5 — acte de rééducation standard en cabinet." (précis + justifié)
- "Valide, copie, c'est fait." (workflow)

**DON'T :**
- "Notre intelligence artificielle révolutionnaire..." (jargon startup)
- "Boostez votre productivité avec l'IA de demain !" (hype creux)
- "Notre LLM génère des notes conformes aux directives..." (incompréhensible)
- "Transformez votre cabinet !" (trop large, pas concret)

### Messaging Framework

**5 secondes :** "L'outil qui rédige tes notes kiné à ta place."

**30 secondes :** "Tu passes 2 heures par jour à écrire des notes non rémunérées. Kiscribe te rend ce temps. Tu parles 90 secondes après ta séance, l'outil génère ta note SOAPIE complète et te suggère le bon code AMK. Tu copies, tu colles dans Doctolib. C'est tout."

**2 minutes :** "En France, un kiné libéral passe en moyenne 2 heures par jour à rédiger des notes SOAPIE et à chercher les bons codes AMK — des tâches non rémunérées qui ont explosé depuis l'Avenant 7. Kiscribe résout ça avec une dictée de 90 secondes après chaque séance. Tu décris ta séance en langage naturel, l'outil structure automatiquement une note SOAPIE complète en français et suggère le code AMK approprié selon la nomenclature NGAP actuelle. Tu valides, tu copies dans ton logiciel habituel, tu passes au patient suivant. 50 kinés l'utilisent déjà quotidiennement. Essai gratuit 7 jours."

### Competitive Differentiation Narrative
Les outils génériques comme Siri ou ChatGPT transcrivent — ils ne structurent pas en SOAPIE et ne connaissent pas les codes AMK. Les logiciels de cabinet comme Doctolib gèrent les rendez-vous — ils ne génèrent pas de notes. Les outils IA médicaux comme Nabla ciblent les médecins — pas les kinés, pas la nomenclature NGAP, pas en français avec les spécificités françaises. Kiscribe est le seul outil construit de zéro pour le workflow quotidien du kiné libéral français.

### Brand Anti-patterns
- Jamais afficher "IA" ou "intelligence artificielle" de manière prominente — ça fait peur ou c'est suspect
- Jamais promettre une conformité CPAM garantie — c'est le kiné qui valide et signe
- Jamais utiliser un bleu médical générique (trustpilot-blue, CPAM-blue)
- Jamais ressembler à un logiciel de cabinet — on est un outil de productivité, pas un EHR

---

## 5. Design Direction

### Design Philosophy
**"Le cabinet bien tenu."** L'interface doit évoquer un espace médical moderne et soigné — pas une startup tech, pas un hôpital. Chaque pixel doit dire : "cet outil a été pensé par quelqu'un qui comprend ton métier."

Règles absolues :
- L'interface principale = un bouton micro + le résultat. Rien d'autre visible au premier regard.
- Minimum 24px entre les sections
- Jamais de scroll horizontal
- Tout le texte lisible à 40cm de distance (taille min 16px)
- Le bouton d'action principal toujours atteignable au pouce (bottom de l'écran sur mobile)

### Visual Mood
Warm professionnel. Évoque un cabinet soigné, lumineux, humain. Références : Notion santé, Alan (avant leur rebranding), les intérieurs de cabinets de kiné modernes — bois clair, plantes, murs blancs cassés.

### Color Palette

| Rôle | Couleur | Hex |
|---|---|---|
| Background principal | Blanc cassé | `#FAFAF8` |
| Surface / card | Blanc | `#FFFFFF` |
| Primaire (CTA, accents) | Vert sauge | `#5C7A5F` |
| Primaire hover | Vert sauge foncé | `#4A6349` |
| Texte principal | Gris anthracite | `#1A1A1A` |
| Texte secondaire | Gris moyen | `#6B6B6B` |
| Bordure / séparateur | Gris très clair | `#E8E8E4` |
| Accent chaleureux | Sable doré | `#C4A96A` |
| Succès | Vert clair | `#D4EDDA` |
| Erreur | Rouge doux | `#F8D7DA` |
| Bouton micro actif | Rouge dictée | `#E05555` |

### Typography

**Titres / headings :** `Instrument Serif` — serif élégant, chaleureux, médical sans être clinique.
**Corps / UI :** `Inter` — sans-serif parfaitement lisible sur mobile, neutre, universel.
**Code / notes générées :** `Inter` 15px, line-height 1.7 — aéré pour être lu rapidement.

Tailles :
- H1 : 28px / 700
- H2 : 22px / 600
- Body : 16px / 400
- Label / caption : 13px / 500
- Note générée : 15px / 400, line-height 1.7

### Spacing & Layout System
Base unit : 4px. Spacing scale : 4, 8, 12, 16, 24, 32, 48, 64.

- Padding horizontal mobile : 16px
- Padding horizontal desktop : 24px
- Card padding : 20px
- Border radius : 12px (cards), 8px (boutons), 999px (bouton micro)

### Component Philosophy
Minimaliste et fonctionnel. 3 composants principaux en MVP :
1. **Le bouton micro** — grand, centré, impossible à rater. État : idle / recording / processing.
2. **La note card** — affiche la note SOAPIE structurée par sections (S / O / A / P / I / E) + le code AMK en badge distinct.
3. **Le bouton copier** — pleine largeur, en bas de la note card. Feedback visuel immédiat ("Copié ✓").

### Iconography
Lucide React. Stroke-width 1.5. Jamais de fill icons sauf pour les états actifs.

### Accessibility
- Contraste WCAG AA minimum sur tous les textes
- Touch targets minimum 44×44px
- Focus visible sur tous les éléments interactifs
- Texte alternatif sur tous les éléments visuels
- L'enregistrement vocal toujours stoppable avec un second tap

### Motion & Interaction
- Transitions : 200ms ease-out maximum
- Le bouton micro pulse lentement pendant l'enregistrement (animation CSS, pas de JS lourd)
- La note apparaît avec un fade-in subtil (150ms)
- Copier : flash vert + checkmark pendant 1.5 secondes
- Pas d'animations de chargement complexes — un spinner simple suffit

### Design Tokens (CSS Variables + Tailwind)

```css
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
  --spacing-base: 4px;
  --font-serif: 'Instrument Serif', Georgia, serif;
  --font-sans: 'Inter', system-ui, sans-serif;
}
```

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        bg: '#FAFAF8',
        surface: '#FFFFFF',
        primary: { DEFAULT: '#5C7A5F', hover: '#4A6349' },
        text: { DEFAULT: '#1A1A1A', muted: '#6B6B6B' },
        border: '#E8E8E4',
        accent: '#C4A96A',
        recording: '#E05555',
      },
      fontFamily: {
        serif: ['Instrument Serif', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '12px',
        btn: '8px',
        circle: '999px',
      },
    },
  },
}
```
