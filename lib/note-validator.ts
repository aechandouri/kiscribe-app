/**
 * Validation déterministe post-génération.
 * S'applique après Claude — indépendante du prompt.
 * Corrige les erreurs systématiques identifiées en review.
 */

// ─── 1. Détection AMK 14 obligatoire ────────────────────────────────────────

// Mots-clés qui imposent AMK 14, quelle que soit la suggestion de Claude
const AMK14_TRIGGERS: RegExp[] = [
  // Post-opératoire
  /post[- ]?op[ée]r/i,
  /post[- ]?chir/i,
  /suite[s]? (d[' e]|op[eé]r)/i,
  /coiffe des rotateurs.{0,60}(op[eé]r|chir|arthroscop|proth[eè]se)/i,
  /(op[eé]r|chir|arthroscop).{0,60}coiffe des rotateurs/i,
  /proth[eè]se (de |totale |partielle )?(hanche|genou|[eé]paule|PTH|PTG|PTE)/i,
  /\bPTH\b|\bPTG\b|\bPTE\b/,
  /ligamentoplastie/i,
  /\bLCA\b.*reconstit/i,
  /reconstit.*\bLCA\b/i,
  /arthroscopie/i,
  /arthroscopique/i,
  /\bostéotomie\b/i,
  /\bténodèse\b/i,
  /\barthroplastie\b/i,
  /fracture.*op[eé]r/i,
  /op[eé]r.*fracture/i,
  /chirurgie (du |rachis|vertébr|discale)/i,
  /disc[e]?ctomie/i,
  /laminectomie/i,
  /arthrodèse/i,

  // Neurologique
  /\bAVC\b/i,
  /accident vasculaire/i,
  /h[eé]miplégie/i,
  /h[eé]mipar[eé]sie/i,
  /paraplégie/i,
  /t[eé]traplégie/i,
  /\bSEP\b/i,
  /scl[eé]rose en plaque/i,
  /\bSLA\b/i,
  /scl[eé]rose lat[eé]rale/i,
  /\bParkinson\b/i,
  /syndrome de Guillain/i,
  /\bneuropath/i,
  /l[eé]sion m[eé]dullaire/i,
  /traumatisme cr[aâ]nien/i,
  /\bTC\b.*s[eé]quelle/i,

  // Respiratoire
  /\bBPCO\b/i,
  /mucoviscidose/i,
  /r[eé][eé]ducation respiratoire/i,
  /kyn[eé]sith[eé]rapie respiratoire/i,
  /\bDRP\b/i,

  // Périnéal
  /p[eé]rin[eé]al/i,
  /pelvi[- ]?p[eé]rin/i,
  /incontinence (urinaire|f[eé]cale)/i,
  /prolapsus/i,

  // Vestibulaire
  /vestibulaire/i,
  /vertiges? (positionnel|paroxystique|bénin)/i,
  /\bVPPB\b/i,
  /manœuvre (d[' e]Epley|de Semont)/i,

  // Oncologique
  /oncolog/i,
  /lymphœd[eè]me/i,
  /post[- ]?cancer/i,
  /chimio/i,
  /radioth[eé]rapie/i,
];

// Mots-clés neuromusculaires → AMK 14 + IFN obligatoire
const IFN_TRIGGERS: RegExp[] = [
  /\bAVC\b/i,
  /accident vasculaire/i,
  /h[eé]miplégie/i,
  /h[eé]mipar[eé]sie/i,
  /paraplégie/i,
  /t[eé]traplégie/i,
  /\bSEP\b/i,
  /scl[eé]rose en plaque/i,
  /\bSLA\b/i,
  /scl[eé]rose lat[eé]rale/i,
  /\bParkinson\b/i,
  /syndrome de Guillain/i,
  /\bneuropath/i,
  /l[eé]sion m[eé]dullaire/i,
  /traumatisme cr[aâ]nien/i,
  /\bTC\b.*s[eé]quelle/i,
];

// Mots-clés qui confirment AMK 7.5 (override si conflit avec AMK 14 détecté par erreur)
const EXPLICIT_AMK75_TRIGGERS: RegExp[] = [
  /lombalgie commune/i,
  /cervicalgie commune/i,
  /entorse bénigne/i,
  /tendinopathie (simple|commune)/i,
  // Coiffe non opérée — évite le faux positif "sans chirurgie" qui contient "chir"
  /coiffe.{0,80}sans (chirurgie|op[eé]r)/i,
  /coiffe.{0,80}non[- ]op[eé]r/i,
  /(sans (chirurgie|opération|post[- ]?op)|non[- ]op[eé]r[eé]e?)\b/i,
];

export function validateAmkCode(transcript: string, suggestedCode: string): {
  code: string;
  justification: string;
  corrected: boolean;
} {
  const needsAmk14 = AMK14_TRIGGERS.some((r) => r.test(transcript));
  const needsIfn   = IFN_TRIGGERS.some((r) => r.test(transcript));
  const forcedAmk75 = EXPLICIT_AMK75_TRIGGERS.some((r) => r.test(transcript));

  if (needsAmk14 && !forcedAmk75) {
    if (needsIfn) {
      const expectedCode = "AMK 14 + IFN";
      if (suggestedCode !== expectedCode) {
        return {
          code: expectedCode,
          justification: "Pathologie neuromusculaire — AMK 14 (acte spécialisé) + IFN (indemnité forfaitaire neurologique) obligatoires selon NGAP.",
          corrected: true,
        };
      }
    } else if (suggestedCode !== "AMK 14") {
      // Générer une justification contextuelle selon ce qui a déclenché AMK 14
      let justification = "Acte de rééducation spécialisée.";
      if (/post[- ]?op[ée]r|arthroscop|proth[eè]se|\bPTH\b|\bPTG\b|ligamentoplastie|discectomie|laminectomie|arthrodèse/i.test(transcript)) {
        justification = "Rééducation post-opératoire — acte spécialisé.";
      } else if (/vestibulaire|VPPB|vertige|Epley|Sémont|Dix-Hallpike/i.test(transcript)) {
        justification = "Rééducation vestibulaire.";
      } else if (/périnéal|pelvi|incontinence|prolapsus/i.test(transcript)) {
        justification = "Rééducation périnéale et pelvi-périnéale.";
      } else if (/respiratoire|BPCO|mucoviscidose/i.test(transcript)) {
        justification = "Rééducation respiratoire spécialisée.";
      } else if (/oncolog|lymphœdème|cancer|chimio|radiothérapie/i.test(transcript)) {
        justification = "Rééducation oncologique.";
      }
      return { code: "AMK 14", justification, corrected: true };
    }
  }

  return {
    code: suggestedCode,
    justification: "",
    corrected: false,
  };
}

// ─── 2. Suppression des méta-commentaires ────────────────────────────────────

// Phrases générées par l'IA qui exposent son raisonnement ou l'absence de données
const META_PATTERNS: RegExp[] = [
  /non (pr[eé]cis[eé]|renseign[eé]|mentionn[eé]|disponible|indiqu[eé]|sp[eé]cifi[eé]) (dans|en|par) (la |le |les )?(transcription|dictée|note|texte)[^.]*\./gi,
  /non (pr[eé]cis[eé]|renseign[eé]|mentionn[eé]|disponible|indiqu[eé]|sp[eé]cifi[eé])\s*[.,]/gi,
  /([Ii]nformation|[Dd]onn[eé]e|[Cc]ette information|[Cc]e point)[^.]*(pas|non) (disponible|pr[eé]cis[eé]|renseign[eé]|mentionn[eé])[^.]*\./gi,
  /\(?[Nn]on renseign[eé][e]?\)?\.?/g,
  /EVA\s+(avant|début|fin|après)\s*\/?\s*(après|fin|début)?\s*:?\s*non (pr[eé]cis[eé]|renseign[eé]|mentionn[eé])[^.]*\./gi,
  /[Ll]a transcription (ne|n') (mentionne|précise|indique|contient|fournit)[^.]*\./gi,
  /[Pp]as de (données|valeurs?|mesures?) (précisées?|renseignées?|disponibles?) (dans|en)[^.]*\./gi,
];

// Patterns dans la justification AMK spécifiquement
const AMK_JUSTIFICATION_CLEANUP: RegExp[] = [
  /\s*\(pas de post[- ]?op[eé]r[^)]*\)/gi,
  /\s*\(pas de pathologie[^)]*\)/gi,
  /\s*sans crit[eè]re[s]? d[' e]AMK\s*14[^.)]*/gi,
  /\s*pas de crit[eè]re[s]?[^.)]*\./gi,
  / — Acte de rééducation standard[^.)]*\.?$/gi,
  /[,\s]*hors conditions?\s+AMK\s*14[^.)]*\.?/gi,
  /[,\s]*ne relevant pas (de l[' ]|d[' ])?AMK\s*14[^.)]*\.?/gi,
  /[,\s]*relevant de la r[eé][eé]ducation m[eé]canique simple[^.)]*\.?/gi,
  /[,\s]*sans ant[eé]c[eé]dent (chirurgical|op[eé]ratoire)[^.)]*\.?/gi,
  /[,\s]*sans (chirurgie|op[eé]ration|post[- ]?op)[^.)]*\.?/gi,
  /[,\s]*non[- ]op[eé]r[eé]e?[^.)]*\.?/gi,
];

export function stripMetaCommentary(text: string): string {
  let cleaned = text;
  for (const pattern of META_PATTERNS) {
    cleaned = cleaned.replace(pattern, "").trim();
  }
  // Nettoyer les doubles espaces/sauts de ligne
  cleaned = cleaned.replace(/\n{3,}/g, "\n\n").replace(/  +/g, " ").trim();
  return cleaned;
}

// ─── 3. Correction orthographique des erreurs LLM fréquentes ────────────────

const ORTHO_FIXES: [RegExp, string][] = [
  [/\bdéscontractur(\w*)/gi, "décontractur$1"],
  [/\btolérence\b/gi, "tolérance"],
  [/\btolérence\b/gi, "tolérance"],
  [/\baxe thérapeutiques\b/gi, "axes thérapeutiques"],
  [/\bobjectifs thérapeutique\b/gi, "objectifs thérapeutiques"],
  [/\bséance de rééducation standard post-opératoire\b/gi, "séance de rééducation post-opératoire"],
  [/adaptés? à la post-opératoire/gi, "adaptés à la phase post-opératoire"],
  [/\bTolerances?\b/g, "Tolérance"],
];

export function fixOrthography(text: string): string {
  let fixed = text;
  for (const [pattern, replacement] of ORTHO_FIXES) {
    fixed = fixed.replace(pattern, replacement);
  }
  return fixed;
}

// ─── 4. Pipeline complet ─────────────────────────────────────────────────────

export interface NoteFields {
  subjective: string;
  objective: string;
  analysis: string;
  plan: string;
  intervention: string;
  evaluation: string;
}

export function validateAndCleanNote(
  note: NoteFields,
  amkCode: string,
  amkJustification: string,
  transcript: string
): {
  note: NoteFields;
  amk: { code: string; justification: string };
} {
  // Nettoyer chaque section
  const cleaned: NoteFields = {
    subjective:   fixOrthography(stripMetaCommentary(note.subjective)),
    objective:    fixOrthography(stripMetaCommentary(note.objective)),
    analysis:     fixOrthography(stripMetaCommentary(note.analysis)),
    plan:         fixOrthography(stripMetaCommentary(note.plan)),
    intervention: fixOrthography(stripMetaCommentary(note.intervention)),
    evaluation:   fixOrthography(stripMetaCommentary(note.evaluation)),
  };

  // Valider le code AMK
  const amkValidation = validateAmkCode(transcript, amkCode);

  let cleanedJustification = fixOrthography(stripMetaCommentary(amkJustification));
  for (const pattern of AMK_JUSTIFICATION_CLEANUP) {
    cleanedJustification = cleanedJustification.replace(pattern, "").trim();
  }
  // Supprimer trailing " —" ou " :"
  cleanedJustification = cleanedJustification.replace(/\s*[—:]\s*$/, "").trim();

  const finalJustification = amkValidation.corrected
    ? amkValidation.justification
    : cleanedJustification;

  return {
    note: cleaned,
    amk: {
      code: amkValidation.code,
      justification: finalJustification,
    },
  };
}
