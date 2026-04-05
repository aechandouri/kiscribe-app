import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/webhooks";
import { getAdminClient } from "@/lib/supabase";
import { getStripe } from "@/lib/stripe";
import { sendWelcomeEmail } from "@/lib/email";

export async function POST(req: Request) {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return new Response("Webhook secret not configured", { status: 500 });
  }

  const headerPayload = await headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Missing svix headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(webhookSecret);
  let event: WebhookEvent;

  try {
    event = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }

  if (event.type === "user.created") {
    const { id, email_addresses } = event.data;
    const primaryEmail = email_addresses?.[0]?.email_address ?? "";

    // Create Stripe customer
    let stripeCustomerId: string | null = null;
    let stripeSubscriptionId: string | null = null;
    let trialEndsAt: string | null = null;

    const priceId = process.env.STRIPE_PRICE_SOLO_ID;
    if (priceId) {
      try {
        const stripe = getStripe();
        const customer = await stripe.customers.create({
          email: primaryEmail,
          metadata: { clerk_user_id: id },
        });
        stripeCustomerId = customer.id;

        const subscription = await stripe.subscriptions.create({
          customer: customer.id,
          items: [{ price: priceId }],
          trial_period_days: 7,
          payment_settings: {
            save_default_payment_method: "on_subscription",
          },
          trial_settings: {
            end_behavior: { missing_payment_method: "cancel" },
          },
        });
        stripeSubscriptionId = subscription.id;
        trialEndsAt = subscription.trial_end
          ? new Date(subscription.trial_end * 1000).toISOString()
          : null;
      } catch (err) {
        console.error("Stripe error during user creation:", err);
      }
    }

    const db = getAdminClient();
    const { error } = await db.from("users").insert({
      clerk_user_id: id,
      email: primaryEmail,
      stripe_customer_id: stripeCustomerId,
      stripe_subscription_id: stripeSubscriptionId,
      subscription_status: stripeSubscriptionId ? "trialing" : "inactive",
      trial_ends_at: trialEndsAt,
    });

    if (error) {
      console.error("Error inserting user:", error);
      return new Response("Database error", { status: 500 });
    }

    if (primaryEmail && trialEndsAt) {
      sendWelcomeEmail(primaryEmail, new Date(trialEndsAt)).catch((err) =>
        console.error("Welcome email error:", err)
      );
    }
  }

  return new Response("OK", { status: 200 });
}
