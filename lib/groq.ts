import Groq from "groq-sdk";

let _client: Groq | null = null;

function getGroqClient(): Groq {
  if (!_client) {
    _client = new Groq({ apiKey: process.env.GROQ_API_KEY });
  }
  return _client;
}

export async function transcribeAudio(audioFile: File): Promise<string> {
  const client = getGroqClient();

  const transcription = await client.audio.transcriptions.create({
    file: audioFile,
    model: "whisper-large-v3",
    language: "fr",
    response_format: "json",
  });

  return transcription.text;
}
