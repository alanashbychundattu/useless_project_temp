import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { getHoroscope } from "@/lib/sasi.functions";

export const Route = createFileRoute("/zodiac")({
  head: () => ({
    meta: [
      { title: "Read all zodiac signs' horoscopes — Nalla Neram" },
      {
        name: "description",
        content:
          "Tap any of the twelve zodiac signs for a fresh, deadpan horoscope written for Kerala engineering students.",
      },
      { property: "og:title", content: "Read all zodiac signs' horoscopes — Nalla Neram" },
      {
        property: "og:description",
        content: "Twelve signs, one astrologer named Sasi, and your exam prospects.",
      },
    ],
  }),
  component: Zodiac,
});

const SIGNS: Array<{ name: string; emoji: string }> = [
  { name: "Aries", emoji: "♈" },
  { name: "Taurus", emoji: "♉" },
  { name: "Gemini", emoji: "♊" },
  { name: "Cancer", emoji: "♋" },
  { name: "Leo", emoji: "♌" },
  { name: "Virgo", emoji: "♍" },
  { name: "Libra", emoji: "♎" },
  { name: "Scorpio", emoji: "♏" },
  { name: "Sagittarius", emoji: "♐" },
  { name: "Capricorn", emoji: "♑" },
  { name: "Aquarius", emoji: "♒" },
  { name: "Pisces", emoji: "♓" },
];

function Zodiac() {
  const fetchHoroscope = useServerFn(getHoroscope);
  const [active, setActive] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);

  const pick = async (sign: string) => {
    setActive(sign);
    setBusy(true);
    setText("");
    try {
      const res = await fetchHoroscope({ data: { sign } });
      setText(res.horoscope);
    } catch {
      setText("The stars timed out. Currently in production planning — check back soon.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-4xl font-extrabold">Read all zodiac signs' horoscopes</h1>
      <p className="mt-3 text-muted-foreground">
        Pick a sign. Sasi writes it fresh, today, for people with lab records due.
      </p>

      <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
        {SIGNS.map((s) => (
          <button
            key={s.name}
            type="button"
            onClick={() => pick(s.name)}
            className={`rounded-2xl border p-4 text-center transition-transform hover:-translate-y-0.5 ${
              active === s.name
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card"
            }`}
          >
            <span className="block text-3xl">{s.emoji}</span>
            <span className="mt-1 block text-xs font-semibold uppercase tracking-wide">
              {s.name}
            </span>
          </button>
        ))}
      </div>

      {active && (
        <article className="mt-8 rounded-3xl border border-border bg-card p-6">
          <h2 className="text-2xl font-bold">{active} today</h2>
          {busy ? (
            <p className="mt-3 text-muted-foreground">Sasi is aligning the charts…</p>
          ) : (
            <div className="mt-3 space-y-3 whitespace-pre-wrap text-muted-foreground">{text}</div>
          )}
        </article>
      )}
    </div>
  );
}
