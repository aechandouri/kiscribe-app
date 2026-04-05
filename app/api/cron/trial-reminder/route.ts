import { getAdminClient } from "@/lib/supabase";
import { sendTrialEndingEmail } from "@/lib/email";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const db = getAdminClient();

  // Find users whose trial ends in exactly 2 days (±12h window)
  const in2days = new Date();
  in2days.setDate(in2days.getDate() + 2);
  const windowStart = new Date(in2days.getTime() - 12 * 60 * 60 * 1000).toISOString();
  const windowEnd = new Date(in2days.getTime() + 12 * 60 * 60 * 1000).toISOString();

  const { data: users, error } = await db
    .from("users")
    .select("email, trial_ends_at")
    .eq("subscription_status", "trialing")
    .gte("trial_ends_at", windowStart)
    .lte("trial_ends_at", windowEnd);

  if (error) {
    console.error("Cron trial-reminder DB error:", error);
    return new Response("DB error", { status: 500 });
  }

  let sent = 0;
  for (const user of users ?? []) {
    if (!user.email || !user.trial_ends_at) continue;
    try {
      const ms = new Date(user.trial_ends_at).getTime() - Date.now();
      const daysLeft = Math.max(1, Math.ceil(ms / (1000 * 60 * 60 * 24)));
      await sendTrialEndingEmail(user.email, daysLeft);
      sent++;
    } catch (err) {
      console.error(`Trial reminder email error for ${user.email}:`, err);
    }
  }

  return Response.json({ sent, total: users?.length ?? 0 });
}
