import { auth } from "@clerk/nextjs/server";
import { getAdminClient } from "@/lib/supabase";
import { getStripe } from "@/lib/stripe";

export async function POST() {
  const { userId } = await auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const db = getAdminClient();
  const { data: user } = await db
    .from("users")
    .select("stripe_customer_id")
    .eq("clerk_user_id", userId)
    .single();

  if (!user?.stripe_customer_id) {
    return new Response("No Stripe customer found", { status: 404 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000";

  const session = await getStripe().billingPortal.sessions.create({
    customer: user.stripe_customer_id,
    return_url: `${baseUrl}/dashboard`,
  });

  return Response.json({ url: session.url });
}
