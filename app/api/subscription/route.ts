import { auth } from "@clerk/nextjs/server";
import { getAdminClient } from "@/lib/supabase";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const db = getAdminClient();
  const { data } = await db
    .from("users")
    .select("subscription_status, trial_ends_at")
    .eq("clerk_user_id", userId)
    .single();

  if (!data) return Response.json({ subscription_status: "inactive", trial_ends_at: null, daysLeft: null });

  let daysLeft: number | null = null;
  if (data.trial_ends_at) {
    const ms = new Date(data.trial_ends_at).getTime() - Date.now();
    daysLeft = Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
  }

  return Response.json({ ...data, daysLeft });
}
