import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { generateSoapie } from "@/lib/claude";
import { getAdminClient } from "@/lib/supabase";

const bodySchema = z.object({
  transcript: z.string().min(1, "Transcript is required").max(10_000),
});

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }

  const { transcript } = parsed.data;

  let result;
  try {
    result = await generateSoapie(transcript);
  } catch (err) {
    console.error("generateSoapie error:", err);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }

  // Log usage (sans contenu de santé — seulement durée en mots estimée)
  try {
    const db = getAdminClient();
    const { data: user } = await db
      .from("users")
      .select("id")
      .eq("clerk_user_id", userId)
      .single();

    if (user) {
      await db.from("usage_logs").insert({
        user_id: user.id,
        action: "generate",
        duration_seconds: Math.round(transcript.split(" ").length / 2.5), // estimation ~150 mots/min
      });
    }
  } catch (err) {
    // Non-blocking — on ne bloque pas la réponse si le log échoue
    console.error("Usage log error:", err);
  }

  return NextResponse.json({
    note: result.note,
    amk: result.amk,
    formatted: result.formatted,
  });
}
