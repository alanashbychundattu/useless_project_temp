import type { Planet } from "./planetary";

const PLANET_TONE: Record<Planet, string> = {
  Sun: "authority and ego — you will feel briefly brilliant",
  Moon: "memory and mood — good for rote, bad for logic",
  Mars: "raw aggression — attack the hardest problem set first",
  Mercury: "pure syllabus energy — the planet of last-minute cramming",
  Jupiter: "deep understanding, which you will not use",
  Venus: "aesthetics — your notes will look great, content optional",
  Saturn: "discipline and suffering — the only real teacher",
  Rahu: "obsession and rabbit holes — beware the YouTube tangent",
  Ketu: "detachment — you may transcend the exam entirely",
};

export function generateVerdict(
  planet: Planet,
  subject: string,
  inWindowNow: boolean,
  retrograde: boolean,
): string {
  const tone = PLANET_TONE[planet];
  const head = inWindowNow
    ? `The window for ${subject} is open right now. ${planet} rules this hour: ${tone}.`
    : `${planet} governs your next ${subject} window: ${tone}.`;
  const tail = retrograde
    ? " Mercury is retrograde, so expect syntax errors in your handwriting."
    : " The cosmos has cleared your calendar. Your attention span has not.";
  return head + tail;
}
