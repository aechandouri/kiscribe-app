// Corrections phonétiques post-Whisper pour le vocabulaire kiné français
// Whisper transcrit parfois les termes techniques de façon phonétique incorrecte

const CORRECTIONS: Array<[RegExp, string]> = [
  // Tests cliniques
  [/\bl[''']?asseg\b/gi, "Lasègue"],
  [/\blazer?\b/gi, "Lasègue"],
  [/\bla sait\b/gi, "Lasègue"],
  [/\bjobe\b/gi, "Jobe"],
  [/\bnair\b/gi, "Neer"],
  [/\bnir\b/gi, "Neer"],
  [/\bhawkins kennedy\b/gi, "Hawkins-Kennedy"],
  [/\bking[- ]kennedy\b/gi, "Hawkins-Kennedy"],
  [/\bpatrick\b/gi, "Patrick"],
  [/\bober\b/gi, "Ober"],
  [/\bthomas\b/gi, "Thomas"],
  [/\bgonzalez\b/gi, "Gonzalez"],
  [/\bschober\b/gi, "Schöber"],
  [/\bschoeber\b/gi, "Schöber"],
  [/\bfinkel[sz]tein\b/gi, "Finkelstein"],
  [/\bphalen\b/gi, "Phalen"],
  [/\btinel\b/gi, "Tinel"],
  [/\bvalg[ue]+\b/gi, "valgus"],
  [/\bvar[ue]+\b/gi, "varus"],

  // Anatomie
  [/\bpsoa[sz]\b/gi, "psoas"],
  [/\bpiriformis\b/gi, "piriforme"],
  [/\bsoléaire\b/gi, "soléaire"],
  [/\bdeltoïde\b/gi, "deltoïde"],
  [/\btrapèze\b/gi, "trapèze"],
  [/\bsupra[- ]?spinal\b/gi, "supra-épineux"],
  [/\binfra[- ]?spinal\b/gi, "infra-épineux"],
  [/\bsous[- ]?scapulaire\b/gi, "sous-scapulaire"],
  [/\bcoiffe\b/gi, "coiffe"],
  [/\blca\b/gi, "LCA"],
  [/\blcp\b/gi, "LCP"],
  [/\blcl\b/gi, "LCL"],
  [/\blcm\b/gi, "LCM"],
  [/\bménisque?\b/gi, "ménisque"],

  // Mesures et scores
  [/\beva\b/gi, "EVA"],
  [/\brom\b/gi, "ROM"],
  [/\bimc\b/gi, "IMC"],
  [/\bmmt\b/gi, "MMT"],
  [/\bdn4\b/gi, "DN4"],

  // Pathologies fréquentes
  [/\bépaul[ée] gelée\b/gi, "épaule gelée"],
  [/\bchanelette\b/gi, "charnière"],
  [/\blombo[- ]?sciatique\b/gi, "lombo-sciatique"],
  [/\bhernie discale\b/gi, "hernie discale"],
  [/\bgonarthrose\b/gi, "gonarthrose"],
  [/\bcoxarthrose\b/gi, "coxarthrose"],
  [/\bépicondilit\w+\b/gi, "épicondylite"],
  [/\btrochanterit\w+\b/gi, "tendinite trochantérienne"],

  // Vestibulaire
  [/\bdix[- ]?hallpike\b/gi, "Dix-Hallpike"],
  [/\bepley\b/gi, "Epley"],
  [/\bsemont\b/gi, "Sémont"],
  [/\bbarbecue\b/gi, "Barbecue"],
  [/\bnystagmus\b/gi, "nystagmus"],

  // Techniques
  [/\bkinesio\b/gi, "kinesio-taping"],
  [/\bultrasoun\b/gi, "ultrasons"],
  [/\btens\b/gi, "TENS"],
  [/\bproprio\b/gi, "proprioception"],
  [/\belectrostim\w*\b/gi, "électrostimulation"],
  [/\brenfo\b/gi, "renforcement"],

  // Vertèbres
  [/\bc(\d)\b/g, "C$1"],
  [/\bd(\d)\b/g, "D$1"],
  [/\bl(\d)\b/g, "L$1"],
  [/\bs(\d)\b/g, "S$1"],

  // Bruits phonétiques isolés (lettres seules après un mot médical)
  [/\b(cervicalgie|lombalgie|dorsalgie|névralgie|arthralgie)\s+[a-z]\b/gi, "$1"],

  // Homophones fréquents mal transcrits
  [/\bcôté sein\b/gi, "côté sain"],
  [/\bmembre sein\b/gi, "membre sain"],
  [/\bappui sein\b/gi, "appui sain"],
  [/\bcôté atteins?\b/gi, "côté atteint"],

  // Anglicismes Whisper
  [/\bpersistent\b/gi, "persistant"],
  [/\btreatment\b/gi, "traitement"],
  [/\bpatient['']?s\b/gi, "patient"],

  // Fautes orthographiques courantes générées par Whisper
  [/\bdéscontractur(\w*)\b/gi, "décontractur$1"],
  [/\btolérence\b/gi, "tolérance"],
  [/\bambulence\b/gi, "ambulance"],
];

export function correctTranscription(text: string): string {
  let corrected = text;
  for (const [pattern, replacement] of CORRECTIONS) {
    corrected = corrected.replace(pattern, replacement);
  }
  return corrected;
}
