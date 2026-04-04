// Nomenclature AMK post-Avenant 7 (juillet 2025)
// Source : NGAP, Avenant 7 à la convention nationale des masseurs-kinésithérapeutes

export interface AmkCode {
  code: string;
  label: string;
  valeurPoints: number;
  tarifEuros: number; // valeur de la lettre-clé AMK = 0.61€ au 01/07/2025
  description: string;
  conditions: string;
}

// Valeur de la lettre-clé AMK au 01/07/2025
export const VALEUR_AMK = 0.61;

export const AMK_CODES: Record<string, AmkCode> = {
  "AMK 7.5": {
    code: "AMK 7.5",
    label: "Rééducation standard",
    valeurPoints: 7.5,
    tarifEuros: 7.5 * VALEUR_AMK,
    description: "Acte de rééducation et de réadaptation standard",
    conditions:
      "Acte de kinésithérapie en cabinet ou au domicile. S'applique à la majorité des séances de rééducation musculo-squelettique, orthopédique, traumatologique.",
  },
  "AMK 14": {
    code: "AMK 14",
    label: "Acte spécialisé",
    valeurPoints: 14,
    tarifEuros: 14 * VALEUR_AMK,
    description: "Actes spécialisés selon liste nomenclature NGAP",
    conditions:
      "Rééducation respiratoire, neurologique centrale et périphérique lourde, périnéale, vestibulaire, oncologique. Première consultation kiné (BDK inclus).",
  },
  BDK: {
    code: "BDK",
    label: "Bilan diagnostique kinésithérapique",
    valeurPoints: 14,
    tarifEuros: 14 * VALEUR_AMK,
    description: "Premier bilan diagnostique kinésithérapique",
    conditions:
      "Obligatoire pour toute première prise en charge. Coté AMK 14. Doit être réalisé avant la première séance ou lors de la première séance.",
  },
  IFN: {
    code: "IFN",
    label: "Indemnité forfaitaire neurologique",
    valeurPoints: 5,
    tarifEuros: 5 * VALEUR_AMK,
    description: "Supplément pour pathologies neuromusculaires",
    conditions:
      "À ajouter à l'AMK de la séance si le patient présente une pathologie neuromusculaire (SEP, SLA, Parkinson, hémiplégie, paraplégie, etc.).",
  },
  IFD: {
    code: "IFD",
    label: "Indemnité forfaitaire de déplacement",
    valeurPoints: 3.5,
    tarifEuros: 3.5 * VALEUR_AMK,
    description: "Supplément pour séances à domicile",
    conditions:
      "À ajouter si la séance se déroule au domicile du patient (non valide en cabinet ou établissement).",
  },
};

// Codes valides pour la validation des suggestions Claude
export const VALID_AMK_CODES = Object.keys(AMK_CODES);

export function isValidAmkCode(code: string): boolean {
  return VALID_AMK_CODES.includes(code);
}
