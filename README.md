<img width="1280" height="640" alt="git (1)" src="https://github.com/user-attachments/assets/8920b256-2ba8-4988-b824-5351134eb4bd" />



# Nala Neram 🎯


## Basic Details
### Team Name: Skibidi


### Team Members
- Team Lead: Alan Ashby Chundattu - [Viswajyothi College of Engineering and Technology]
- Member 2: Anet Mary Antony - [Viswajyothi College of Engineering and Technology]


### Project Description
An astrology app that tells you when to study — real math, zero purpose.

### The Problem (that doesn't exist)
Students don't know the astrologically optimal time to study — a problem that doesn't actually exist, which is exactly why this qualifies for a "useless projects" hackathon.

### The Solution (that nobody asked for)
An app that calculates real planetary hours from your exact location's sunrise and sunset just to tell you, with complete sincerity, whether Mercury or Saturn is currently on duty for your engineering syllabus.

## Technical Details
### Technologies/Components Used
For Software:
- HTML5, CSS3, JavaScript (ES6+)
- None — built as a vanilla, framework-free static web app
- None — the planetary-hour/sunrise-sunset math is hand-written in plain JS (no astronomy library), and persistence uses the browser's built-in Web Storage API (localStorage), not a third-party package
- [Lovable]

For Hardware:
- [List main components]
- [List specifications]
- [List tools required]

### Implementation
For Software:
# Installation
git clone <your-repo-url>
cd <your-project-name>
npm install
# Run
npm run dev
### Project Documentation
Overview
Nalla Neram is a web app that calculates the astrologically "optimal" time for KTU engineering students to study a chosen subject, using a real planetary-hour system derived from actual sunrise/sunset data for the student's location. If an exam is too close for the calculation to be useful, the app switches to a playful Malayalam roast instead of a study window. Built in Lovable (React + TypeScript).

Key Features

Scheme → Department → Semester → Subject cascading dropdowns, populated from real KTU department/syllabus data
District → Town location picker (Kerala-specific)
Real sunrise/sunset-based planetary-hour engine (9-graha Vimshottari cycle, not the classical 7-planet Western system)
Exam-date-aware logic: full calculated study verdict if there's runway, a Malayalam troll message + audio if the exam is ≤2 days away
"Sasi" — an in-character astrology chatbot for follow-up questions
"Read All Zodiac Signs' Horoscopes" — intentionally dumb/funny joke horoscopes per sign
Dark/light theme toggle
Daily streak tracking (persisted per browser)

User Flow

User selects Scheme, Department, Semester, and Subject
User selects District and Town
User selects their Exam Date
On submit, the app checks time remaining until the exam
If ≤ 2 days remain: shows the Malayalam troll message ("നീ തീർന്നടാ നീ തീർന്ന്") + plays neethern.mp3
If more time remains: calculates the next planetary hour matching the subject's ruling planet, and shows the date/time verdict + plays ushnam.mp3
User can chat with Sasi or browse zodiac horoscopes at any point
# Screenshots (Add at least 3)
![screenshot-2026-09-06-at-7-41-34-am.avif](https://user30160.na.imgto.link/public/20260906/screenshot-2026-09-06-at-7-41-34-am.avif)Homepage/hero section — logo, dark-mode toggle, "KTU Cosmic Study Scheduler" tagline in Malayalam, zodiac symbol strip, and the start of the selection form (Scheme, Department, Semester, Subject, District, Town).

![screenshot-2026-09-06-at-7-42-12-am.avif](https://user30160.na.imgto.link/public/20260906/screenshot-2026-09-06-at-7-42-12-am.avif)Result screen for a normal case — shows the exact date/time to start studying ("Digital Electronics" under Rahu's hour), a live countdown, retrograde status, and an audio "blessing" playback control.

![screenshot-2026-09-06-at-7-42-49-am.avif](https://user30160.na.imgto.link/public/20260906/screenshot-2026-09-06-at-7-42-49-am.avif)*Add Zodiac horoscope page — 12 sign buttons with purple icon tiles, showing a selected "Leo today" joke horoscope full of Kerala-specific humor (Maggi, KSRTC tickets, attendance percentages).

# Diagrams
![screenshot-2026-09-06-at-8-03-34-am.avif](https://user30160.na.imgto.link/public/20260906/screenshot-2026-09-06-at-8-03-34-am.avif)
The diagram shows Nalla Neram's architecture as four stacked layers, top to bottom:

Student (top) — the user, connects down into the frontend.
Browser frontend (React + TypeScript) — a container holding two UI regions side by side: Input & result UI (the dropdowns and verdict display) and Sasi & horoscope UI (the chat widget and zodiac grid).
Calculation engine (client-side JavaScript) — a container holding two connected regions: Exam / cooked check (the 48-hour threshold test) flows into Planetary hour engine (the sunrise/sunset + graha-cycle math), showing that the cooked check runs first and gates whether the full calculation runs.
Static datasets, Browser storage, and Media assets (bottom row) — three parallel stores the engine reads from and writes to: bundled JSON data (departments, places, subject-planet map), localStorage (theme, streak, preferences), and files (logo, ushnam.mp3, neethern.mp3).

For Hardware:

# Schematic & Circuit
![Circuit](Add your circuit diagram here)
*Add caption explaining connections*

![Schematic](Add your schematic diagram here)
*Add caption explaining the schematic*

# Build Photos
![Components](Add photo of your components here)
*List out all components shown*

![Build](Add photos of build process here)
*Explain the build steps*

![Final](Add photo of final product here)
*Explain the final build*

### Project Demo
# Video
[Add your demo video link here]
*Explain what the video demonstrates*

# Additional Demos
[Add any extra demo materials/links]

## Team Contributions
- Alan Ashby Chundattu: Basic Plot idea and UI UX desing 
- Anet Mary Antony: Audio Solution,
- [Name 3]: [Specific contributions]

---
Made with ❤️ at TinkerHub Useless Projects 

![Static Badge](https://img.shields.io/badge/TinkerHub-24?color=%23000000&link=https%3A%2F%2Fwww.tinkerhub.org%2F)
![Static Badge](https://img.shields.io/badge/UselessProjects--26-26?link=https%3A%2F%2Ftinkerhub.org%2Fevents%2F1M8ORET9A1%2Fuseless-projects-3.0)



