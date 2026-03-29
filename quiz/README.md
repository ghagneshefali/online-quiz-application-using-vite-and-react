# QuizMaster — Vite + React Quiz App

## Setup & Run

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

App will open at **http://localhost:5173**

## File Structure

```
quiz-vite/
├── index.html                        ← Vite entry HTML (root level)
├── vite.config.js                    ← Vite configuration
├── package.json
├── public/
└── src/
    ├── main.jsx                      ← React entry point
    ├── App.jsx                       ← Screen routing
    ├── index.css                     ← Global styles
    ├── components/
    │   ├── WelcomeScreen.jsx
    │   ├── WelcomeScreen.module.css
    │   ├── QuizScreen.jsx
    │   ├── QuizScreen.module.css
    │   ├── ResultScreen.jsx
    │   └── ResultScreen.module.css
    ├── data/
    │   └── questions.js              ← 10 GK questions
    └── hooks/
        └── useTimer.js               ← Custom timer hook
```
