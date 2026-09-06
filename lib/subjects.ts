import type { Planet } from "./planetary";

const EXPLICIT: Record<string, Planet | Planet[]> = {
  "Linear Algebra and Calculus": "Mercury",
  "Engineering Physics A": "Jupiter",
  "Engineering Physics B": "Jupiter",
  "Engineering Chemistry": "Venus",
  "Engineering Mechanics": "Mars",
  "Engineering Graphics": "Venus",
  "Basics of Civil & Mechanical Engineering": ["Saturn", "Mars"],
  "Basics of Electrical & Electronics Engineering": ["Mercury", "Rahu"],
  "Life Skills": "Moon",
  "Professional Communication": ["Moon", "Mercury"],
  "Programming in C": ["Mercury", "Rahu"],
  "Engineering Physics Lab": "Jupiter",
  "Engineering Chemistry Lab": "Venus",
  "Civil & Mechanical Workshop": ["Mars", "Saturn"],
  "Electrical & Electronics Workshop": ["Mercury", "Rahu"],
};

const KEYWORDS: Array<[string, Planet | Planet[]]> = [
  ["Data Structures", "Mercury"],
  ["Algorithm", "Mercury"],
  ["Database", "Saturn"],
  ["Operating System", "Saturn"],
  ["Network", ["Mercury", "Rahu"]],
  ["Machine Learning", "Rahu"],
  ["Artificial Intelligence", "Rahu"],
  ["Computation", "Jupiter"],
  ["Digital Electronics", ["Mercury", "Rahu"]],
  ["Signals", "Jupiter"],
  ["Communication System", "Mercury"],
  ["VLSI", "Rahu"],
  ["Microprocessor", "Rahu"],
  ["Electrical Machine", "Mars"],
  ["Power System", "Sun"],
  ["Control System", "Saturn"],
  ["Thermodynamics", "Mars"],
  ["Fluid Mechanics", "Moon"],
  ["Machine Design", ["Mars", "Saturn"]],
  ["Structural", "Saturn"],
  ["Survey", ["Saturn", "Moon"]],
  ["Transportation", "Mercury"],
];

export function getSubjectPlanets(subject: string): Planet[] {
  const explicit = EXPLICIT[subject];
  if (explicit) return Array.isArray(explicit) ? explicit : [explicit];
  const lower = subject.toLowerCase();
  for (const [keyword, planets] of KEYWORDS) {
    if (lower.includes(keyword.toLowerCase())) {
      return Array.isArray(planets) ? planets : [planets];
    }
  }
  return ["Mercury"];
}
