# DecoBot — Rule-Based AI Learning Platform

> **Batch 2026 · DecodeLabs Industrial Training · Module 01**

---

## 📌 Project Overview

DecoBot is a browser-based, rule-driven AI assistant built as **Project 1** of the DecodeLabs Industrial Training Kit. It demonstrates the core principles of deterministic AI — zero hallucination, full traceability, and explainable logic — through a rich SaaS-style interface.

The project teaches foundational AI concepts (IPO Model, White Box AI, Cosine Similarity, Dictionary O(1) Lookup) by letting users interact with a working chatbot powered entirely by pure JavaScript control flow. No machine learning. No backend. No API keys.

---

## 🐛 Bugs Fixed (v1 → v1.1)

The following bugs were identified and fixed before submission:

| # | Bug | Severity | Fix Applied |
|---|---|---|---|
| 1 | `landingPage` variable used inside `initIntroAnimation()` before it was declared (line 1253 vs 2032) — crashes intro animation | 🔴 Critical | Moved `const landingPage` declaration to top of script |
| 2 | `#statsGrid` referenced in `renderStats()` but element missing from HTML — stat cards never rendered | 🔴 Critical | Added `<div id="statsGrid">` inside dashboard panel |
| 3 | `#calendarHint` referenced in `renderCalendar()` but element missing from HTML — calendar hint text never showed | 🔴 Critical | Added `<p id="calendarHint">` inside calendar panel |
| 4 | Quick Note (📝) and Quick Mood (😊) FAB buttons triggered browser `alert()` popups — breaks UI polish | 🟡 Medium | Replaced both with `showToast()` using the existing toast system |
| 5 | `@media (max-width: 820px)` and `@media (max-width: 540px)` each defined twice — second copies silently overrode parts of the first | 🟡 Medium | Removed the redundant duplicate media query blocks |
| 6 | `.panel`, `.panel-header`, `.badge`, `.eyebrow`, `.panel-copy` each defined twice with conflicting values (e.g. `font-weight: 800` vs `700`, hardcoded vs CSS-variable colors) | 🟢 Code Quality | Removed first duplicate block, kept clean CSS-variable-based definitions |

---

## 🎯 Features

| Feature | Description |
|---|---|
| **Intro Animation** | Robot emoji zooms in with particle burst and letter-reveal title |
| **Landing Page** | Full marketing page — hero, core concepts, specs, features, steps, about |
| **Light / Dark Mode** | Theme toggle stored in localStorage |
| **Welcome Setup** | Name entry modal on first launch — saved to localStorage |
| **Rule-Based Chatbot** | Keyword and sentiment detection using Dictionary O(1) lookup |
| **Smart Reply Engine** | Notes, habits, budget, games, timer, word of day, horoscope, music |
| **Habit Tracker** | Add habits, mark done, track streaks |
| **Budget Tracker** | Set limit, log spending, view remaining balance |
| **Notes** | Save, list, and delete personal notes via chat |
| **Games** | Rock Paper Scissors with score tracking; Trivia Quiz |
| **Word of the Day** | Rotates daily from a curated vocabulary list |
| **Horoscope** | All 12 zodiac signs with personalised message |
| **Music by Mood** | Playlist suggestions based on emotional state |
| **Countdown Timer** | Live countdown ticking inside the chat window |
| **Math Calculator** | Evaluates safe arithmetic expressions from chat |
| **Achievements** | Rule-triggered badge system with confetti burst |
| **Analytics Charts** | Weekly focus trend (line) + Mood mix (doughnut) via Chart.js |
| **Mini Calendar** | Current month with activity days highlighted |
| **Activity Log** | Save sessions with date, minutes, mood, and label |
| **Profile Form** | Name, role, focus, goal, bio — all stored locally |
| **Emoji Picker** | 40-emoji grid injected into chat input |
| **Voice Input** | Web Speech API mic button for hands-free chat |
| **Message Reactions** | 5-emoji reaction row on every chat bubble |
| **Chat Search** | Filter message history in real time |
| **Command Palette** | Ctrl+K or `/` to open fuzzy-search command launcher |
| **PDF Export** | jsPDF activity report download |
| **ZIP Backup** | Full localStorage backup as a downloadable `.zip` |
| **Collapse Dashboard** | Toggle to hide the left panel and go full-chat mode |
| **Live Clock** | Status bar clock updating every second |
| **Scroll to Top** | Floating arrow appears after scrolling 300px |

---

## 🧠 Core AI Concepts Demonstrated

### 1 · IPO Model
Every chatbot response follows **Input → Process → Output**:
- Input: `raw.toLowerCase().trim()`
- Process: Dictionary O(1) keyword lookup
- Output: Reply string + optional side effect (save note, update habit, etc.)

### 2 · White Box AI
Every decision in DecoBot is fully traceable. No probability, no weights, no hidden layers. The rule that fired is always visible.

### 3 · Dictionary O(1) vs If-Elif O(n)
```js
// ❌ Anti-pattern — O(n) linear scan
if (input === 'hello') return '...'
else if (input === 'hi') return '...'
// ... 50 more branches

// ✅ DecoBot approach — O(1) constant time
const responses = { hello: '...', hi: '...', ... }
return responses[input] ?? fallback
```

### 4 · Hybrid Architecture
User input enters the rule engine → keyword/sentiment match → **Instant O(1) response** or **safe fallback**. DecoBot always fires the fastest path first.

### 5 · Continuous Loop
```
while (true) {
  wait for input → apply rules → generate output → repeat
}
```

### 6 · Explainable AI
Every response can be traced: User said X → Rule Y matched → Output Z returned.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Structure** | HTML5 (semantic) — `index.html` |
| **Styling** | CSS3 — custom properties, flexbox, grid, glassmorphism — `assets/css/style.css` |
| **Logic** | Vanilla JavaScript (ES6+) — `assets/js/app.js` |
| **Charts** | Chart.js 4.4.1 (CDN) |
| **PDF Export** | jsPDF 2.5.1 (CDN) |
| **ZIP Backup** | JSZip 3.10.1 (CDN) |
| **Fonts** | Google Fonts — Inter, Poppins |
| **Storage** | localStorage — no backend, no database |
| **Animation** | Canvas API (intro + landing dots), CSS transitions |
| **Voice** | Web Speech API (SpeechRecognition) |

---

## 📂 Project Structure

```
DecoBot/
│
├── index.html          # Main HTML — structure & content
│
├── assets/
│   ├── css/
│   │   └── style.css   # All styles — themes, layout, responsive
│   └── js/
│       └── app.js      # All logic — chatbot, dashboard, animations
│
├── screenshots/        # Project screenshots
│   ├── 01_intro_animation.png
│   ├── ...
│   └── README.md       # Screenshot capture guide
│
├── README.md           # This file
└── BUG_FIX_LOG.md      # Bug documentation
```

---

## 🚀 How to Run

1. Download or unzip the folder
2. Open `index.html` in any modern browser (Chrome recommended)
3. No npm, no install, no server — runs entirely in the browser
4. Click **"Launch App"** to begin the intro animation

---

## 👤 User Flow

```
[Intro Animation — robot zoom + particles]
           ↓
[Landing Page — hero, concepts, features]
           ↓
   [Click "Launch App"]
           ↓
[Welcome Modal — enter your name]
           ↓
[App Dashboard]
  ├── Chat with DecoBot (notes, habits, budget, games…)
  ├── Log activity sessions
  ├── View analytics charts
  ├── Track habits and budget
  ├── Export PDF or ZIP backup
  └── Earn achievements 🏆
```

---

## 📸 Screenshots

See the `/screenshots` folder. Add your own before submission (guide inside).

---

## 👨‍💻 Built By

**DecodeLabs** — Batch 2026 · Industrial Training Kit · Project 1  
Rule-Based AI Chatbot · Pure JavaScript · Zero Hallucination · Local Storage Only
