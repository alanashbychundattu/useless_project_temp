import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SASI_SYSTEM = `You are Sasi, the resident astrologer of "Nalla Neram", an app that tells KTU engineering students the astrologically correct time to study.
Speak with total deadpan confidence about astrology: zodiac signs, planetary hours, grahas, retrogrades and horoscopes. Mix light Malayalam/Manglish slang naturally ("machane", "athu ninte ishtam", "chetta") but keep it readable.
Keep answers under 120 words.
If the user asks about anything clearly outside astrology, horoscopes, or studying, do not attempt an answer. Instead deflect in character with deadpan corporate-speak, e.g. "That feature's on our roadmap for a future update" or "Currently in production planning, machane — check back soon." Never break character, never mention being an AI model.`;

async function callGateway(messages: Array<{ role: string; content: string }>, system: string) {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) throw new Error("AI is not configured");
  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: "google/gemini-3-flash-preview",
      messages: [{ role: "system", content: system }, ...messages],
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`AI request failed (${res.status}): ${text.slice(0, 200)}`);
  }
  const data = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
  return data.choices?.[0]?.message?.content?.trim() ?? "Sasi is meditating. Try again.";
}

export const askSasi = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        messages: z
          .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().max(2000) }))
          .max(20),
      })
      .parse(data),
  )
  .handler(async ({ data }) => ({ reply: await callGateway(data.messages, SASI_SYSTEM) }));

export const getHoroscope = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({ sign: z.string().max(30) }).parse(data))
  .handler(async ({ data }) => {
    const today = new Date().toDateString();
    const reply = await callGateway(
      [
        {
          role: "user",
          content: `Write today's (${today}) horoscope for ${data.sign} for a Kerala KTU engineering student, and make it EXTREMELY dumb and funny — absurd, chaotic, meme-brained, hostel-life specific (canteen, attendance shortage, lab record, KSRTC bus, WhatsApp study group, 3 AM Maggi). Ridiculous but stated with total astrologer confidence. Exactly three short parts, each starting with an emoji and a bold-ish label: Mood, Padippu (studies), Lucky nonsense (a stupidly specific lucky object, hour and warning). Max 110 words. Manglish slang welcome.`,
        },
      ],
      SASI_SYSTEM,
    );
    return { horoscope: reply };
  });
