import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { DEFAULT_SCHEME, DEPARTMENTS, SCHEMES, SEMESTERS, getSubjects } from "@/data/ktu";
import { KERALA_DISTRICTS, KERALA_PLACES } from "@/data/kerala";
import { getSubjectPlanets } from "@/lib/subjects";
import {
  PLANET_GLYPH,
  getNextOptimalWindow,
  isMercuryRetrograde,
  type OptimalWindow,
} from "@/lib/planetary";
import { generateVerdict } from "@/lib/verdict";
import { loadPrefs, recordCheck, savePrefs } from "@/lib/prefs";
import { AudioCue } from "@/components/AudioCue";
import neetherAsset from "@/assets/neethern.mp3.asset.json";
import ushnamAsset from "@/assets/ushnam.mp3.asset.json";
import logoAsset from "@/assets/logo.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nalla Neram — Your astrologically correct study hour" },
      {
        name: "description",
        content:
          "Pick your KTU branch, semester, subject and town, and Nalla Neram calculates the planetary hour you should actually be studying in.",
      },
      { property: "og:title", content: "Nalla Neram — Your astrologically correct study hour" },
      {
        property: "og:description",
        content:
          "Real sunrise-based planetary hours for KTU students. Find your next optimal study window before the exam.",
      },
    ],
  }),
  component: Home,
});

const COOKED_THRESHOLD_HOURS = 48;

function fmtDateTime(d: Date) {
  return d.toLocaleString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

function fmtDuration(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const d = Math.floor(total / 86400);
  const h = Math.floor((total % 86400) / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return `${d > 0 ? `${d}d ` : ""}${h}h ${m}m ${s}s`;
}

type Result =
  | { cooked: true; msLeft: number }
  | { cooked: false; window: OptimalWindow | null; verdict: string; retrograde: boolean };

function Home() {
  const [scheme, setScheme] = useState(DEFAULT_SCHEME);
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [district, setDistrict] = useState("");
  const [placeQuery, setPlaceQuery] = useState("");
  const [place, setPlace] = useState("");
  const [examDate, setExamDate] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [streak, setStreak] = useState(0);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const p = loadPrefs();
    if (p.scheme) setScheme(p.scheme);
    if (p.department) setDepartment(p.department);
    if (p.semester) setSemester(p.semester);
    if (p.subject) setSubject(p.subject);
    if (p.district) setDistrict(p.district);
    if (p.place) {
      setPlace(p.place);
      setPlaceQuery(p.place);
    }
    setStreak(p.streak ?? 0);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const subjects = useMemo(
    () => (department && semester ? getSubjects(scheme, department, semester) : []),
    [scheme, department, semester],
  );

  const placeMatches = useMemo(() => {
    const list = KERALA_PLACES[district] ?? [];
    const q = placeQuery.trim().toLowerCase();
    if (!q) return list.slice(0, 6);
    return list.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 8);
  }, [district, placeQuery]);

  // "Today" is always computed live — the picker never allows today or any past date.
  const minExamDate = useMemo(() => {
    const t = new Date();
    t.setDate(t.getDate() + 1);
    return t.toISOString().slice(0, 10);
  }, []);

  const ready = department && semester && subject && district && place && examDate;

  const calculate = () => {
    const selected = (KERALA_PLACES[district] ?? []).find((p) => p.name === place);
    if (!selected) return;
    const exam = new Date(`${examDate}T09:00:00`);
    const current = new Date();
    const msLeft = exam.getTime() - current.getTime();

    savePrefs({ scheme, department, semester, subject, district, place });
    setStreak(recordCheck());

    if (msLeft < COOKED_THRESHOLD_HOURS * 3600 * 1000) {
      setResult({ cooked: true, msLeft });
      return;
    }

    const planets = getSubjectPlanets(subject);
    const win = getNextOptimalWindow(selected.lat, selected.lng, current, planets, exam);
    const retrograde = isMercuryRetrograde(win?.start ?? current);
    setResult({
      cooked: false,
      window: win,
      retrograde,
      verdict: win ? generateVerdict(win.planet, subject, win.isActiveNow, retrograde) : "",
    });
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <section className="cosmic-panel relative overflow-hidden rounded-3xl border border-border p-6 sm:p-10">
        <div className="zodiac-ring" aria-hidden="true">
          ♈ ♉ ♊ ♋ ♌ ♍ ♎ ♏ ♐ ♑ ♒ ♓
        </div>
        <div className="relative">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            ☉ ☾ ♂ KTU cosmic study scheduler ☿ ♃ ♀
          </p>
          <h1 className="mt-3">
            <img
              src={logoAsset.url}
              alt="നല്ല നേരം — Nalla Neram"
              className="h-24 w-auto drop-shadow-lg sm:h-32"
            />
          </h1>
          <p className="mt-4 max-w-2xl text-lg font-semibold text-accent">
            വെറുതെ ടെൻഷൻ അടിക്കണ്ട — സൂര്യോദയം നോക്കി, ഗ്രഹങ്ങളെ നോക്കി, നിന്റെ അടുത്ത നല്ല നേരം ഞങ്ങൾ
            കണ്ടുപിടിക്കും.
          </p>
          <p className="mt-2 max-w-2xl text-primary-foreground/80">
            Real sunrise-to-sunset planetary hours, one graha per hour, matched to your subject —
            before the exam bell rings.
          </p>
          {streak > 0 && (
            <p className="mt-4 inline-block rounded-full bg-accent px-3 py-1 text-sm font-semibold text-accent-foreground">
              🔥 Cosmic Focus streak: {streak} day{streak === 1 ? "" : "s"}
            </p>
          )}
        </div>
      </section>

      <section className="mt-8 grid gap-4 rounded-3xl border border-border bg-card p-6 sm:grid-cols-2">
        <Field label="Scheme">
          <select className={selectCls} value={scheme} onChange={(e) => setScheme(e.target.value)}>
            {SCHEMES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>

        <Field label="Department">
          <select
            className={selectCls}
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
              setSubject("");
            }}
          >
            <option value="">Select department</option>
            {DEPARTMENTS.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </Field>

        <Field label="Semester">
          <select
            className={selectCls}
            value={semester}
            onChange={(e) => {
              setSemester(e.target.value);
              setSubject("");
            }}
          >
            <option value="">Select semester</option>
            {SEMESTERS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>

        <Field label="Subject">
          <select
            className={selectCls}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            disabled={subjects.length === 0}
          >
            <option value="">
              {subjects.length ? "Select subject" : "Pick department + semester first"}
            </option>
            {subjects.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>

        <Field label="District">
          <select
            className={selectCls}
            value={district}
            onChange={(e) => {
              setDistrict(e.target.value);
              setPlace("");
              setPlaceQuery("");
            }}
          >
            <option value="">Select district</option>
            {KERALA_DISTRICTS.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </Field>

        <Field label="Town / place">
          <input
            className={selectCls}
            value={placeQuery}
            disabled={!district}
            placeholder={district ? "Start typing your town…" : "Select a district first"}
            onChange={(e) => {
              setPlaceQuery(e.target.value);
              setPlace("");
            }}
          />
          {district && !place && placeMatches.length > 0 && (
            <ul className="mt-1 max-h-44 overflow-y-auto rounded-xl border border-border bg-popover text-sm">
              {placeMatches.map((p) => (
                <li key={p.name}>
                  <button
                    type="button"
                    className="w-full px-3 py-2 text-left hover:bg-secondary"
                    onClick={() => {
                      setPlace(p.name);
                      setPlaceQuery(p.name);
                    }}
                  >
                    {p.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Field>

        <Field label="Exam date (must be after today)">
          <input
            type="date"
            className={selectCls}
            min={minExamDate}
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
          />
        </Field>

        <div className="flex items-end">
          <button
            type="button"
            onClick={calculate}
            disabled={!ready}
            className="w-full rounded-full bg-primary px-6 py-3 text-lg font-bold text-primary-foreground shadow transition-opacity disabled:opacity-50"
          >
            Find my nalla neram ✨
          </button>
        </div>
      </section>

      {result?.cooked && (
        <section className="mt-8 rounded-3xl border-2 border-destructive bg-card p-8 text-center">
          <p className="text-sm text-muted-foreground">
            Exam in {fmtDuration(Math.max(0, result.msLeft))}. Planetary search cancelled — no time
            left to be clever.
          </p>
          <p className="malayalam-shout mt-4 text-4xl text-destructive sm:text-6xl">
            നീ തീർന്നടാ നീ തീർന്ന്
          </p>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            bro you're literally 404 coded rn 😭 no graha is saving this one. lock in or don't, athu
            ninte ishtam. Saturn already filed the report.
          </p>
          <div className="mt-5 flex justify-center">
            <AudioCue src={neetherAsset.url} label="the prophecy" />
          </div>
        </section>
      )}

      {result && !result.cooked && (
        <section className="mt-8 rounded-3xl border border-border bg-card p-8">
          {result.window ? (
            <>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                {result.window.isActiveNow ? "Window open right now" : "Your next optimal window"}
              </p>
              <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
                Start studying {subject} on {fmtDateTime(result.window.start)}
              </h2>
              <p className="mt-2 text-lg">
                Ruled by{" "}
                <span className="font-bold text-primary">
                  {PLANET_GLYPH[result.window.planet]} {result.window.planet}
                </span>{" "}
                · until {fmtDateTime(result.window.end)} ·{" "}
                {result.window.isNight ? "night hour" : "day hour"}
              </p>
              <p className="mt-5 inline-block rounded-2xl bg-accent px-5 py-3 font-mono text-2xl font-bold text-accent-foreground">
                {result.window.isActiveNow
                  ? `${fmtDuration(result.window.end.getTime() - now.getTime())} left in window`
                  : `starts in ${fmtDuration(result.window.start.getTime() - now.getTime())}`}
              </p>
              <p className="mt-4 text-muted-foreground">{result.verdict}</p>
              <p className="mt-2 text-sm">
                Mercury retrograde:{" "}
                <span className="font-semibold">{result.retrograde ? "yes ☿℞" : "no"}</span>
              </p>
              <div className="mt-5">
                <AudioCue src={ushnamAsset.url} label="the blessing" />
              </div>
            </>
          ) : (
            <p>
              No matching planetary hour exists between now and your exam. Statistically impossible,
              spiritually inevitable.
            </p>
          )}
        </section>
      )}
    </div>
  );
}

const selectCls =
  "w-full rounded-xl border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-semibold">{label}</span>
      {children}
    </label>
  );
}
