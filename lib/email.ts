import { Resend } from "resend";

let _resend: Resend | null = null;

function getResend(): Resend {
  if (!_resend) {
    if (!process.env.RESEND_API_KEY) throw new Error("RESEND_API_KEY is not set");
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

const FROM = "Kiscribe <contact@kiscribe.fr>";

export async function sendWelcomeEmail(email: string, trialEndsAt: Date) {
  const trialEnd = trialEndsAt.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  await getResend().emails.send({
    from: FROM,
    to: email,
    subject: "Bienvenue sur Kiscribe — votre essai de 7 jours commence",
    html: `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F7F5F0;font-family:'Georgia',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F5F0;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border-radius:12px;overflow:hidden;border:1px solid #E5DFD6;">
        <tr>
          <td style="background:#5C7A5F;padding:32px 40px;text-align:center;">
            <span style="font-size:24px;color:#FFFFFF;font-family:'Georgia',serif;letter-spacing:0.5px;">Kiscribe</span>
          </td>
        </tr>
        <tr>
          <td style="padding:40px;">
            <h1 style="margin:0 0 16px;font-size:22px;color:#2C2C2C;font-family:'Georgia',serif;">Bienvenue, votre essai démarre.</h1>
            <p style="margin:0 0 16px;font-size:15px;color:#555;line-height:1.7;">
              Vous avez <strong>7 jours gratuits</strong> pour tester Kiscribe sans engagement et sans carte bancaire.
              Votre essai se termine le <strong>${trialEnd}</strong>.
            </p>
            <p style="margin:0 0 24px;font-size:15px;color:#555;line-height:1.7;">
              En 45 secondes de dictée, Kiscribe génère votre note SOAPIE complète avec le code AMK correspondant.
            </p>
            <div style="text-align:center;margin:32px 0;">
              <a href="https://kiscribe.fr/dashboard" style="background:#5C7A5F;color:#FFFFFF;text-decoration:none;padding:14px 32px;border-radius:8px;font-size:15px;font-family:sans-serif;">
                Accéder à Kiscribe →
              </a>
            </div>
            <div style="background:#F7F5F0;border-radius:8px;padding:20px;margin-top:8px;">
              <p style="margin:0;font-size:13px;color:#888;line-height:1.7;">
                <strong>Comment ça marche :</strong><br>
                1. Dictez votre séance en 45 secondes<br>
                2. Kiscribe génère la note SOAPIE + code AMK<br>
                3. Vérifiez, copiez, collez dans votre logiciel
              </p>
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 40px;border-top:1px solid #E5DFD6;">
            <p style="margin:0;font-size:12px;color:#AAA;line-height:1.7;font-family:sans-serif;">
              Kiscribe est un outil d'aide à la rédaction. Toute note générée doit être vérifiée et validée par le praticien.<br>
              AC Scaling LTD · <a href="mailto:contact@kiscribe.fr" style="color:#5C7A5F;">contact@kiscribe.fr</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
    `,
  });
}

export async function sendTrialEndingEmail(email: string, daysLeft: number) {
  await getResend().emails.send({
    from: FROM,
    to: email,
    subject: `Votre essai Kiscribe se termine dans ${daysLeft} jour${daysLeft > 1 ? "s" : ""}`,
    html: `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F7F5F0;font-family:'Georgia',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F5F0;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border-radius:12px;overflow:hidden;border:1px solid #E5DFD6;">
        <tr>
          <td style="background:#5C7A5F;padding:32px 40px;text-align:center;">
            <span style="font-size:24px;color:#FFFFFF;font-family:'Georgia',serif;letter-spacing:0.5px;">Kiscribe</span>
          </td>
        </tr>
        <tr>
          <td style="padding:40px;">
            <h1 style="margin:0 0 16px;font-size:22px;color:#2C2C2C;font-family:'Georgia',serif;">
              Plus que ${daysLeft} jour${daysLeft > 1 ? "s" : ""} d'essai.
            </h1>
            <p style="margin:0 0 16px;font-size:15px;color:#555;line-height:1.7;">
              Votre essai gratuit se termine bientôt. Pour continuer à générer vos notes SOAPIE sans interruption,
              activez votre abonnement.
            </p>
            <div style="background:#F7F5F0;border-radius:8px;padding:20px;margin:24px 0;">
              <p style="margin:0 0 8px;font-size:18px;color:#2C2C2C;font-family:'Georgia',serif;"><strong>49 € HT / mois</strong></p>
              <p style="margin:0;font-size:13px;color:#888;">= 1 patient remboursé par mois · Résiliable à tout moment</p>
            </div>
            <div style="text-align:center;margin:32px 0;">
              <a href="https://kiscribe.fr/dashboard" style="background:#5C7A5F;color:#FFFFFF;text-decoration:none;padding:14px 32px;border-radius:8px;font-size:15px;font-family:sans-serif;">
                Activer mon abonnement →
              </a>
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 40px;border-top:1px solid #E5DFD6;">
            <p style="margin:0;font-size:12px;color:#AAA;line-height:1.7;font-family:sans-serif;">
              AC Scaling LTD · <a href="mailto:contact@kiscribe.fr" style="color:#5C7A5F;">contact@kiscribe.fr</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
    `,
  });
}
