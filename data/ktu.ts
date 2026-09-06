/**
 * KTU syllabus reference data.
 * Shape: { scheme: { department: { semester: [subjects] } } }
 * UI components must read from here — never hardcode subject lists in components,
 * so a richer dataset (e.g. parsed from the official KTU syllabus) can be dropped in later.
 */

export const SCHEMES = ["2019", "2015", "2024"] as const;
export const DEFAULT_SCHEME = "2019";

// Department list sourced from the provided KTU department list image.
export const DEPARTMENTS = [
  "Artificial Intelligence and Data Science",
  "Civil Engineering",
  "Computer Science & Design",
  "Computer Science & Engineering",
  "Electronics & Communication Engineering",
  "Electrical & Electronics Engineering",
  "Information Technology",
  "Mechanical Engineering",
  "Hotel Management & Catering Technology",
  "Management Studies",
  "Science & Humanities",
];

export const SEMESTERS = ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"];

const S1 = [
  "Linear Algebra and Calculus",
  "Engineering Physics A",
  "Engineering Chemistry",
  "Engineering Mechanics",
  "Engineering Graphics",
  "Basics of Civil & Mechanical Engineering",
  "Life Skills",
  "Engineering Physics Lab",
  "Civil & Mechanical Workshop",
];

const S2 = [
  "Vector Calculus, Differential Equations and Transforms",
  "Engineering Physics B",
  "Engineering Chemistry",
  "Basics of Electrical & Electronics Engineering",
  "Programming in C",
  "Professional Communication",
  "Engineering Chemistry Lab",
  "Electrical & Electronics Workshop",
];

const CSE: Record<string, string[]> = {
  S3: [
    "Discrete Mathematical Structures",
    "Data Structures",
    "Logic System Design",
    "Object Oriented Programming using Java",
    "Design & Engineering",
    "Digital Lab",
  ],
  S4: [
    "Graph Theory",
    "Computer Organisation and Architecture",
    "Database Management Systems",
    "Operating Systems",
    "Design and Analysis of Algorithms",
    "Digital Electronics",
  ],
  S5: [
    "Formal Languages and Automata Theory",
    "Computer Networks",
    "System Software",
    "Microprocessors and Microcontrollers",
    "Management of Software Systems",
    "Database Management Systems Lab",
  ],
  S6: [
    "Compiler Design",
    "Computer Graphics and Image Processing",
    "Algorithm Analysis and Design",
    "Industrial Economics",
    "Machine Learning",
    "Network Programming Lab",
  ],
  S7: [
    "Artificial Intelligence",
    "Distributed Computing",
    "Cryptography and Network Security",
    "Cloud Computing",
    "Seminar",
  ],
  S8: ["Cyber Forensics", "Data Mining", "Project Phase II", "Comprehensive Course Viva"],
};

const IT: Record<string, string[]> = {
  S3: ["Discrete Mathematical Structures", "Data Structures", "Digital Electronics", "Object Oriented Programming", "Design & Engineering"],
  S4: ["Database Management Systems", "Operating Systems", "Computer Organisation and Architecture", "Design and Analysis of Algorithms"],
  S5: ["Computer Networks", "Web Technologies", "System Software", "Machine Learning"],
  S6: ["Compiler Design", "Information Security", "Data Mining", "Industrial Economics"],
  S7: ["Artificial Intelligence", "Cloud Computing", "Cryptography and Network Security", "Seminar"],
  S8: ["Distributed Computing", "Internet of Things", "Project Phase II"],
};

const ECE: Record<string, string[]> = {
  S3: ["Solid State Devices", "Network Theory", "Logic Circuit Design", "Signals and Systems", "Design & Engineering"],
  S4: ["Analog Circuits", "Digital Electronics", "Electromagnetic Theory", "Computer Architecture and Microcontrollers"],
  S5: ["Linear Integrated Circuits", "Digital Signal Processing", "Analog and Digital Communication System", "Control Systems"],
  S6: ["Electromagnetics", "VLSI Circuit Design", "Information Theory and Coding", "Microprocessor"],
  S7: ["Microwave and Antenna Engineering", "Optical Communication", "Embedded Systems", "Seminar"],
  S8: ["Wireless Communication", "Communication System Design", "Project Phase II"],
};

const EEE: Record<string, string[]> = {
  S3: ["Circuits and Networks", "Measurements and Instrumentation", "Analog Electronics", "Electrical Machines I"],
  S4: ["Electromagnetic Theory", "Electrical Machines II", "Digital Electronics", "Signals and Systems"],
  S5: ["Power System I", "Control Systems", "Microprocessor and Microcontroller", "Power Electronics"],
  S6: ["Power System II", "Electric Drives", "Industrial Instrumentation", "Industrial Economics"],
  S7: ["High Voltage Engineering", "Power System Protection", "Renewable Power System", "Seminar"],
  S8: ["Electrical System Design", "Advanced Control System", "Project Phase II"],
};

const ME: Record<string, string[]> = {
  S3: ["Mechanics of Solids", "Mechanics of Fluids", "Metallurgy and Material Science", "Manufacturing Process"],
  S4: ["Engineering Thermodynamics", "Fluid Machinery", "Manufacturing Technology", "Machine Tools Lab"],
  S5: ["Machine Design", "Heat and Mass Transfer", "Industrial Engineering", "Advanced Mechanics of Solids"],
  S6: ["Thermodynamics and Heat Engines", "Dynamics of Machinery", "Machine Design II", "Industrial Economics"],
  S7: ["Design of Machine Elements", "Mechatronics", "Refrigeration and Air Conditioning", "Seminar"],
  S8: ["Automobile Engineering", "Computer Aided Design", "Project Phase II"],
};

const CE: Record<string, string[]> = {
  S3: ["Fluid Mechanics", "Surveying and Geomatics", "Civil Engineering Materials", "Mechanics of Solids"],
  S4: ["Structural Analysis I", "Geotechnical Engineering I", "Transportation Engineering I", "Fluid Mechanics II"],
  S5: ["Structural Design I", "Geotechnical Engineering II", "Environmental Engineering", "Hydrology"],
  S6: ["Structural Analysis II", "Transportation Engineering II", "Structural Design II", "Industrial Economics"],
  S7: ["Quantity Surveying and Valuation", "Design of Hydraulic Structures", "Construction Management", "Seminar"],
  S8: ["Structural Dynamics", "Traffic Engineering", "Project Phase II"],
};

const AIDS: Record<string, string[]> = {
  S3: ["Discrete Mathematical Structures", "Data Structures", "Python for Data Science", "Digital Electronics"],
  S4: ["Database Management Systems", "Operating Systems", "Design and Analysis of Algorithms", "Probability and Statistics"],
  S5: ["Machine Learning", "Computer Networks", "Data Analytics", "Artificial Intelligence"],
  S6: ["Deep Learning", "Data Mining", "Big Data Computation", "Industrial Economics"],
  S7: ["Natural Language Processing", "Computer Vision", "Cloud Computing", "Seminar"],
  S8: ["Reinforcement Learning", "Data Visualization", "Project Phase II"],
};

const CSD: Record<string, string[]> = {
  S3: ["Data Structures", "Design Thinking", "Digital Electronics", "Object Oriented Programming"],
  S4: ["Database Management Systems", "Operating Systems", "Human Computer Interaction", "Design and Analysis of Algorithms"],
  S5: ["Computer Networks", "Interaction Design", "Machine Learning", "Game Design"],
  S6: ["Computer Graphics and Image Processing", "User Experience Design", "Data Mining", "Industrial Economics"],
  S7: ["Artificial Intelligence", "Virtual Reality", "Cloud Computing", "Seminar"],
  S8: ["Animation Technologies", "Product Design", "Project Phase II"],
};

const GENERIC: Record<string, string[]> = {
  S3: ["Professional Elective I", "Core Course I", "Design & Engineering"],
  S4: ["Professional Elective II", "Core Course II", "Industrial Economics"],
  S5: ["Professional Elective III", "Core Course III"],
  S6: ["Professional Elective IV", "Core Course IV"],
  S7: ["Professional Elective V", "Seminar"],
  S8: ["Professional Elective VI", "Project Phase II"],
};

function dept(higher: Record<string, string[]>): Record<string, string[]> {
  return { S1, S2, ...higher };
}

const DEPT_MAP: Record<string, Record<string, string[]>> = {
  "Artificial Intelligence and Data Science": dept(AIDS),
  "Civil Engineering": dept(CE),
  "Computer Science & Design": dept(CSD),
  "Computer Science & Engineering": dept(CSE),
  "Electronics & Communication Engineering": dept(ECE),
  "Electrical & Electronics Engineering": dept(EEE),
  "Information Technology": dept(IT),
  "Mechanical Engineering": dept(ME),
  "Hotel Management & Catering Technology": dept(GENERIC),
  "Management Studies": dept(GENERIC),
  "Science & Humanities": dept(GENERIC),
};

export const KTU_SYLLABUS: Record<string, Record<string, Record<string, string[]>>> = {
  "2019": DEPT_MAP,
  "2015": DEPT_MAP,
  "2024": DEPT_MAP,
};

export function getSubjects(scheme: string, department: string, semester: string): string[] {
  return KTU_SYLLABUS[scheme]?.[department]?.[semester] ?? [];
}
