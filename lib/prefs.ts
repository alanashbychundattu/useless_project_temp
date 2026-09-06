export type Prefs = {
  uid: string;
  scheme: string;
  department: string;
  semester: string;
  subject: string;
  district: string;
  place: string;
  streak: number;
  lastCheck: string | null;
};

const KEY = "nalla-neram-prefs";

function uuid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function loadPrefs(): Partial<Prefs> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as Partial<Prefs>) : {};
    if (!parsed.uid) parsed.uid = uuid();
    return parsed;
  } catch {
    return { uid: uuid() };
  }
}

export function savePrefs(p: Partial<Prefs>) {
  if (typeof window === "undefined") return;
  const merged = { ...loadPrefs(), ...p };
  window.localStorage.setItem(KEY, JSON.stringify(merged));
}

/** Cosmic Focus streak: consecutive days the user checked their window. */
export function recordCheck(): number {
  const prefs = loadPrefs();
  const today = new Date().toDateString();
  const last = prefs.lastCheck ?? null;
  let streak = prefs.streak ?? 0;
  if (last === today) return streak;
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  streak = last === yesterday ? streak + 1 : 1;
  savePrefs({ streak, lastCheck: today });
  return streak;
}
