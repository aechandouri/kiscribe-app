import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { InstallBanner } from "@/components/InstallBanner";
import { TrialBanner } from "@/components/TrialBanner";
import { getAdminClient } from "@/lib/supabase";

async function getUserSubscription(userId: string) {
  const db = getAdminClient();
  const { data } = await db
    .from("users")
    .select("subscription_status, trial_ends_at")
    .eq("clerk_user_id", userId)
    .single();
  return data;
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const sub = await getUserSubscription(userId);

  // Block access if subscription is cancelled/inactive (not trialing/active/past_due)
  const blockedStatuses = ["canceled", "incomplete_expired"];
  if (sub && blockedStatuses.includes(sub.subscription_status)) {
    redirect("/sign-up?reason=expired");
  }

  let daysLeft: number | null = null;
  if (sub?.trial_ends_at) {
    const ms = new Date(sub.trial_ends_at).getTime() - Date.now();
    daysLeft = Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--color-bg)" }}>
      {/* Navbar */}
      <nav className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}>
        <span className="font-serif text-xl font-medium" style={{ color: "var(--color-primary)", fontFamily: "var(--font-serif)" }}>
          Kiscribe
        </span>
        <button
          className="p-2 rounded-btn"
          style={{ color: "var(--color-text-muted)" }}
          aria-label="Menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </button>
      </nav>

      {sub && (
        <TrialBanner
          daysLeft={daysLeft}
          status={sub.subscription_status}
        />
      )}

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {children}
      </main>

      <InstallBanner />
    </div>
  );
}
