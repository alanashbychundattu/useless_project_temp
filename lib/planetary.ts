import * as SunCalc from "suncalc";

export type Planet =
  | "Sun"
  | "Moon"
  | "Mars"
  | "Mercury"
  | "Jupiter"
  | "Venus"
  | "Saturn"
  | "Rahu"
  | "Ketu";

/** Vimshottari 9-graha cycle order used to assign rulers to planetary hours. */
export const GRAHA_CYCLE: Planet[] = [
  "Ketu",
  "Venus",
  "Sun",
  "Moon",
  "Mars",
  "Rahu",
  "Jupiter",
  "Saturn",
  "Mercury",
];

/** Weekday (0 = Sunday) -> ruler of Hour 1 of that day. */
export const WEEKDAY_RULER: Planet[] = [
  "Sun",
  "Moon",
  "Mars",
  "Mercury",
  "Jupiter",
  "Venus",
  "Saturn",
];

export const PLANET_GLYPH: Record<Planet, string> = {
  Sun: "☉",
  Moon: "☾",
  Mars: "♂",
  Mercury: "☿",
  Jupiter: "♃",
  Venus: "♀",
  Saturn: "♄",
  Rahu: "☊",
  Ketu: "☋",
};

export type PlanetaryHour = {
  index: number; // 1..24
  planet: Planet;
  start: Date;
  end: Date;
  isNight: boolean;
};

function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(12, 0, 0, 0); // noon anchor keeps suncalc on the right calendar day
  return x;
}

/**
 * Build the 24 planetary hours (12 day + 12 night) for the solar day that begins
 * at the given date's sunrise.
 */
export function getPlanetaryHours(latitude: number, longitude: number, date: Date): PlanetaryHour[] {
  const anchor = startOfDay(date);
  const today = SunCalc.getTimes(anchor, latitude, longitude);
  const tomorrowAnchor = new Date(anchor.getTime() + 24 * 3600 * 1000);
  const tomorrow = SunCalc.getTimes(tomorrowAnchor, latitude, longitude);

  const sunrise = today.sunrise as Date;
  const sunset = today.sunset as Date;
  const nextSunrise = tomorrow.sunrise as Date;
  if (!sunrise || !sunset || !nextSunrise || Number.isNaN(sunrise.getTime())) {
    throw new Error("No sunrise/sunset for this location and date");
  }


  const dayLen = (sunset.getTime() - sunrise.getTime()) / 12;
  const nightLen = (nextSunrise.getTime() - sunset.getTime()) / 12;

  const firstRuler = WEEKDAY_RULER[sunrise.getDay()] as Planet;
  const startIdx = GRAHA_CYCLE.indexOf(firstRuler);

  const hours: PlanetaryHour[] = [];
  for (let i = 0; i < 24; i++) {
    const isNight = i >= 12;
    const start = isNight
      ? new Date(sunset.getTime() + (i - 12) * nightLen)
      : new Date(sunrise.getTime() + i * dayLen);
    const end = new Date(start.getTime() + (isNight ? nightLen : dayLen));
    hours.push({
      index: i + 1,
      planet: GRAHA_CYCLE[(startIdx + i) % GRAHA_CYCLE.length] as Planet,
      start,
      end,
      isNight,
    });
  }
  return hours;
}

export type OptimalWindow = {
  planet: Planet;
  start: Date;
  end: Date;
  isNight: boolean;
  isActiveNow: boolean;
  msUntilStart: number;
  msRemainingInWindow: number;
};

/**
 * Pure, testable core: scan forward from `currentDateTime` for the next planetary
 * hour ruled by one of `subjectPlanets`. If `examDate` is given, the scan spans
 * every day between now and the exam.
 */
export function getNextOptimalWindow(
  latitude: number,
  longitude: number,
  currentDateTime: Date,
  subjectPlanets: Planet[],
  examDate?: Date,
): OptimalWindow | null {
  const now = currentDateTime.getTime();
  const limit = examDate ? examDate.getTime() : now + 3 * 24 * 3600 * 1000;
  const maxDays = Math.min(400, Math.ceil((limit - now) / (24 * 3600 * 1000)) + 2);

  for (let d = -1; d < maxDays; d++) {
    const day = new Date(now + d * 24 * 3600 * 1000);
    let hours: PlanetaryHour[];
    try {
      hours = getPlanetaryHours(latitude, longitude, day);
    } catch {
      continue;
    }
    for (const h of hours) {
      if (h.end.getTime() <= now) continue;
      if (h.start.getTime() > limit) return null;
      if (!subjectPlanets.includes(h.planet)) continue;
      const isActiveNow = h.start.getTime() <= now && h.end.getTime() > now;
      return {
        planet: h.planet,
        start: h.start,
        end: h.end,
        isNight: h.isNight,
        isActiveNow,
        msUntilStart: Math.max(0, h.start.getTime() - now),
        msRemainingInWindow: Math.max(0, h.end.getTime() - now),
      };
    }
  }
  return null;
}

/** Mercury retrograde ranges (hardcoded reference table). */
const MERCURY_RETROGRADE: Array<[string, string]> = [
  ["2026-02-26", "2026-03-20"],
  ["2026-06-29", "2026-07-23"],
  ["2026-10-24", "2026-11-13"],
  ["2027-02-09", "2027-03-03"],
  ["2027-06-10", "2027-07-04"],
  ["2027-10-07", "2027-10-28"],
];

export function isMercuryRetrograde(date: Date): boolean {
  const t = date.getTime();
  return MERCURY_RETROGRADE.some(
    ([a, b]) => t >= new Date(`${a}T00:00:00`).getTime() && t <= new Date(`${b}T23:59:59`).getTime(),
  );
}
