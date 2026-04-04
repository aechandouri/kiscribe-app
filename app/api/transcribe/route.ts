import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { transcribeAudio } from "@/lib/groq";
import { correctTranscription } from "@/lib/transcription-corrections";

const MAX_SIZE_BYTES = 25 * 1024 * 1024; // 25MB

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const audioFile = formData.get("audio");

  const fileSchema = z.instanceof(File, { message: "No audio file provided" });
  const parsed = fileSchema.safeParse(audioFile);

  if (!parsed.success) {
    return NextResponse.json({ error: "No audio file provided" }, { status: 400 });
  }

  const file = parsed.data;

  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json({ error: "File too large (max 25MB)" }, { status: 400 });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15_000);

    const raw = await transcribeAudio(file);
    clearTimeout(timeout);
    const transcript = correctTranscription(raw);

    return NextResponse.json({ transcript });
  } catch (err: unknown) {
    const error = err as { status?: number; message?: string };

    if (error?.status === 429) {
      return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
    }

    console.error("Transcription error:", error);
    return NextResponse.json({ error: "Transcription failed" }, { status: 500 });
  }
}
