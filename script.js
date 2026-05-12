// Allow programmatic focus on step headings for screen reader step announcements
document.querySelectorAll(".step h1").forEach((h1) => h1.setAttribute("tabindex", "-1"));

// Cat & Moods
const cat = document.getElementById("cat");
function setMood(mood) {
  cat.removeAttribute("data-mood");
  if (mood) cat.setAttribute("data-mood", mood);
}

// Step Navigation with Custom Moods per Step
function nextStep(id) {
  document.querySelectorAll(".step").forEach((s) => s.classList.remove("active"));
  const step = document.getElementById("step" + id);
  step.classList.add("active");:root {
  --primary: #ff4d6d;
  --secondary: #ff8fa3;
  --bg-gradient: linear-gradient(135deg, #fff0f3 0%, #ffe5ec 100%);
  --glass: rgba(255, 255, 255, 0.95);
  --shadow: 0 20px 40px rgba(255, 77, 109, 0.15);
  --text-color: #555;
}

/* 1rem = browser default (usually 16px); respects user font-size preferences */
html {
  font-size: 100%;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}

body {
  font-family: "Quicksand", sans-serif;
  background: var(--bg-gradient);
  /* dvh = dynamic viewport height: accounts for mobile browser chrome showing/hiding */
  min-height: 100vh;
  min-height: 100dvh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  /* Top padding leaves room for the cat that sticks above the card */
  padding: 5rem 1rem 2rem;
}

/* ─── Background Big Emojis ───
   position: fixed so they stay pinned to the viewport when the page scrolls */
.bg-element {
  position: fixed;
  opacity: 0.4;
  animation: float 15s infinite ease-in-out;
  z-index: 0;
  pointer-events: none;
}
.bg-1 {
  top: -5%;
  left: 0;
  font-size: clamp(7rem, 20vw, 15rem);
  color: #ffccd5;
  animation-delay: 0s;
}
.bg-2 {
  bottom: 5%;
  right: 0;
  font-size: clamp(6rem, 16vw, 12rem);
  color: #ffb3c1;
  animation-delay: -5s;
}
.bg-3 {
  top: 40%;
  right: 5%;
  font-size: clamp(2.5rem, 6vw, 5rem);
  color: #fff;
  animation-delay: -2s;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    /* decorative transform: keep px for small absolute offset */
    transform: translateY(-30px) rotate(5deg);
  }
}

/* ─── Floating Love Emojis ───
   position: fixed so they float across the visible viewport */
.floating-emoji {
  position: fixed;
  bottom: -3.125rem; /* was -50px */
  font-size: 1.5rem;  /* was 24px */
  animation: floatUp linear forwards;
  pointer-events: none;
  z-index: 1;
  opacity: 0.6;
}

@keyframes floatUp {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.8;
  }
  100% {
    transform: translateY(-110vh) rotate(360deg);
    opacity: 0;
  }
}

/* ─── Main Glass Card ─── */
.card {
  background: var(--glass);
  border-radius: 1.875rem; /* was 30px */
  box-shadow: var(--shadow);
  /* min() keeps it from ever exceeding 92% of screen width or 480px */
  width: min(92%, 30rem);
  padding: clamp(1.25rem, 5vw, 2rem) clamp(1rem, 4vw, 1.5rem);
  text-align: center;
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid rgba(255, 255, 255, 0.8);
  transition: transform 0.3s ease;
}

/* ─── Cat Container ─── */
.cat-container {
  /* clamp(min, preferred, max) — scales smoothly between screen sizes */
  width: clamp(8.125rem, 40vw, 11.25rem);   /* was clamp(130px, 40vw, 180px) */
  height: clamp(7.1875rem, 36vw, 10rem);    /* was clamp(115px, 36vw, 160px) */
  margin: clamp(-3.125rem, -10vw, -4.375rem) auto 0.625rem; /* was clamp(-50px, -10vw, -70px) auto 10px */
  position: relative;
  z-index: 20;
}

.cat-svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 5px 10px rgba(0, 0, 0, 0.1));
  transition: transform 0.3s ease;
  animation: breathe 3s ease-in-out infinite;
}
@keyframes breathe {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}

/* ─── Mood Transitions ─── */
.feature {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease,
    fill 0.3s ease;
}

.cheeks {
  transform-box: fill-box;
  transform-origin: center;
}

.eye-happy,
.eye-wide,
.mouth-open,
.blush-strong {
  opacity: 0;
}
.eye-normal,
.mouth-normal,
.cheeks {
  opacity: 1;
}

.cat[data-mood="cute"] .eye-normal { opacity: 0; }
.cat[data-mood="cute"] .eye-happy { opacity: 1; }
.cat[data-mood="cute"] .cheeks {
  fill: #ff5d8f;
  opacity: 0.8;
  transform: scale(1.2);
}

.cat[data-mood="shocked"] .eye-normal { opacity: 0; }
.cat[data-mood="shocked"] .eye-wide { opacity: 1; }
.cat[data-mood="shocked"] .mouth-normal { opacity: 0; }
.cat[data-mood="shocked"] .mouth-open { opacity: 1; }
.cat[data-mood="shocked"] .cat-svg { animation: bounce 0.4s infinite alternate; }

.cat[data-mood="love"] .heart-bubble {
  opacity: 1;
  transform: scale(1) rotate(15deg);
}
.cat[data-mood="love"] .eye-normal { opacity: 0; }
.cat[data-mood="love"] .eye-happy { opacity: 1; }
.cat[data-mood="love"] .cheeks {
  fill: #ff4d6d;
  opacity: 1;
}

.cat[data-mood="sad"] .tear {
  opacity: 1;
  animation: cry 1.5s infinite;
}

.cat[data-mood="excited"] .cat-svg { animation: dance 0.5s infinite alternate; }

@keyframes dance {
  from { transform: rotate(-5deg); }
  to   { transform: rotate(5deg); }
}
@keyframes bounce {
  /* decorative small offset: keep px */
  to { transform: translateY(-8px); }
}

.tear {
  position: absolute;
  width: 0.5rem;    /* was 8px */
  height: 0.5rem;   /* was 8px */
  background: #4dacff;
  border-radius: 50%;
  top: 4.0625rem;   /* was 65px */
  left: 2.8125rem;  /* was 45px */
  opacity: 0;
  transition: opacity 0.3s;
}
@keyframes cry {
  0%   { transform: translateY(0);     opacity: 1; }
  /* decorative small offset: keep px */
  100% { transform: translateY(20px);  opacity: 0; }
}

.heart-bubble {
  position: absolute;
  top: 0;
  right: 1.25rem;  /* was 20px */
  font-size: 2rem;
  opacity: 0;
  transform: scale(0);
  transition: all 0.3s;
}

/* ─── Typography ─── */
h1 {
  font-family: "Great Vibes", cursive;
  color: var(--primary);
  font-size: clamp(1.75rem, 7vw, 3rem);
  line-height: 1.2;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 0 rgba(255, 255, 255, 0.5);
}

/* Override the inline font-size: 3.5rem on step 8's h1 */
#step8 h1 {
  font-size: clamp(2rem, 8vw, 3.5rem);
}

/* h1 darkened from #ff4d6d to #c9003a: contrast ratio ~5.8:1 on white (WCAG AA pass) */
h1 {
  color: #c9003a;
}
/* tabindex="-1" h1s are only focused programmatically — no visible ring needed */
h1:focus {
  outline: none;
}

/* Step 5 long-form text: left-aligned with comfortable reading size */
.step5-text {
  text-align: left;
  font-size: clamp(0.85rem, 3vw, 0.95rem);
  line-height: 1.7;
  min-height: 0;
}

p {
  color: var(--text-color);
  font-size: clamp(0.875rem, 3.5vw, 1.25rem);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-weight: 600;
  min-height: 4.5em; /* em is correct here: scales with the element's own font-size */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.quote-style {
  font-style: italic;
  color: #ff758c;
  font-weight: 500;
  font-size: 1.1rem;
  margin-top: 0.5rem;
  display: block;
}

/* ─── Buttons ─── */
.btn-group {
  display: flex;
  gap: clamp(0.5rem, 3vw, 0.9375rem); /* was clamp(8px, 3vw, 15px) */
  justify-content: center;
  width: 100%;
  flex-wrap: wrap;
  margin-top: auto;
  padding-bottom: 0.75rem;
}

.btn {
  padding: clamp(0.625rem, 3vw, 0.875rem) clamp(1rem, 5vw, 1.75rem); /* was clamp(10px,…,14px) clamp(16px,…,28px) */
  font-family: inherit;
  font-weight: 700;
  font-size: clamp(0.875rem, 3.5vw, 1.1rem);
  border-radius: 50px;
  border: none;
  cursor: pointer;
  transition:
    transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 100;
  /* 44px minimum touch target (Apple/Google accessibility guidelines) */
  min-height: 2.75rem; /* was 44px */
  /* Prevents 300ms tap delay and accidental double-tap zoom */
  touch-action: manipulation;
}

.btn:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.btn:active {
  transform: scale(0.95);
}

.btn-primary {
  background: linear-gradient(45deg, var(--primary), var(--secondary));
  color: white;
  flex: 1;
  min-width: 7.5rem; /* was 120px */
}

.btn-secondary {
  background: white;
  color: var(--primary);
  border: 2px solid var(--secondary);
  flex: 0;
  min-width: 6.25rem; /* was 100px */
}

/* ─── Steps ─── */
.step {
  display: none;
  width: 100%;
  height: 100%;
  flex-direction: column;
  animation: fadeIn 0.8s ease-out;
}
.step.active {
  display: flex;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    /* decorative small offset: keep px */
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ─── Photo Grid ─── */
.photo-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 0.375rem;      /* was 6px */
  width: 100%;
  max-width: 21.25rem; /* was 340px */
  margin: 0.3rem auto;
}

.photo-item {
  position: relative;
  border-radius: 0.625rem; /* was 10px */
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(255, 77, 109, 0.18);
  border: 2px solid rgba(255, 141, 163, 0.35);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  aspect-ratio: 1;
}

.photo-item:hover {
  transform: scale(1.04);
  box-shadow: 0 5px 14px rgba(255, 77, 109, 0.3);
}

.photo-item.photo-big {
  grid-column: 1 / -1;
  aspect-ratio: 2 / 1;
}

.photo-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.photo-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(255, 77, 109, 0.75));
  color: white;
  font-size: 0.65rem;
  font-weight: 700;
  padding: 0.875rem 0.25rem 0.25rem; /* was 14px 4px 4px */
  text-align: center;
  letter-spacing: 0.3px;
}

/* ─── Song Gallery ─── */
.song-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;     /* was 12px */
  width: 100%;
  margin: 0.5rem 0 1rem;
}

.song-card {
  background: rgba(255, 255, 255, 0.8);
  border: 2px solid rgba(255, 141, 163, 0.35);
  border-radius: 1.125rem; /* was 18px */
  padding: 0.9rem 1rem;
  box-shadow: 0 8px 18px rgba(255, 77, 109, 0.12);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  outline: none;
  user-select: none;
}

.song-card:hover,
.song-card:focus-visible {
  transform: translateY(-2px);
  box-shadow: 0 10px 22px rgba(255, 77, 109, 0.2);
}

.song-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.625rem; /* was 10px */
}

.song-header h2 {
  font-size: clamp(1rem, 3.5vw, 1.2rem);
  color: #ff4d6d;
  margin: 0;
  /* Allow shrink and truncate long titles instead of wrapping awkwardly */
  min-width: 0;
  flex-shrink: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.song-header span {
  font-size: clamp(0.8rem, 3vw, 0.95rem);
  color: #ff8fa3;
  font-weight: 700;
  white-space: nowrap;
}

/* Tap indicator arrow */
.song-header::after {
  content: "▾";
  color: var(--secondary);
  font-size: 1.1rem;
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.song-card.expanded .song-header::after,
.song-card:hover .song-header::after,
.song-card:focus-within .song-header::after {
  transform: rotate(180deg);
}

.song-panel {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  /* decorative small offset: keep px */
  transform: translateY(6px);
  transition: max-height 0.4s ease, opacity 0.3s ease, transform 0.3s ease;
}

/* Expanded via hover (desktop), focus (keyboard), or .expanded class (tap on mobile) */
.song-card:hover .song-panel,
.song-card:focus-within .song-panel,
.song-card.expanded .song-panel {
  max-height: 18.75rem; /* was 300px */
  opacity: 1;
  transform: translateY(0);
  margin-top: 0.6rem;
}

.video-wrapper {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 ratio */
  border-radius: 0.75rem; /* was 12px */
  overflow: hidden;
  box-shadow: 0 6px 14px rgba(255, 77, 109, 0.16);
}

.video-wrapper iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.lyrics {
  margin-top: 0.6rem;
  padding: 0.6rem 0.75rem;
  background: rgba(255, 240, 243, 0.8);
  border-radius: 0.75rem; /* was 12px */
  max-height: 6.875rem; /* was 110px */
  overflow: auto;
  color: #666;
  font-size: 0.95rem;
  line-height: 1.5;
}

/* ─── Sparkles ─── */
.sparkle {
  position: fixed;
  width: 0.625rem;  /* was 10px */
  height: 0.625rem; /* was 10px */
  background-color: var(--primary);
  top: -0.625rem;   /* was -10px */
  z-index: 9999;
  animation: fall linear forwards;
  pointer-events: none;
}
@keyframes fall {
  to {
    transform: translateY(110vh) rotate(720deg);
  }
}

/* ─── Lana Runner Game ─── */
.game-intro {
  text-align: center;
  font-size: clamp(0.85rem, 3vw, 1rem);
  color: var(--text-color);
  margin-bottom: 0.75rem;
  min-height: 0;
}

.game-container {
  position: relative;
  /* Extend horizontally to the card's edge (negate card horizontal padding) */
  margin-left: calc(-1 * clamp(1rem, 4vw, 1.5rem));
  margin-right: calc(-1 * clamp(1rem, 4vw, 1.5rem));
  width: auto;
  max-width: none;
  border-radius: 1rem;
  overflow: hidden;
  border: 2px solid rgba(255, 141, 163, 0.45);
  box-shadow: 0 8px 20px rgba(255, 77, 109, 0.15);
  background: linear-gradient(180deg, #fff5f8 0%, #ffe5ec 100%);
  margin-bottom: 0.75rem;
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;
}

#lanaCanvas {
  display: block;
  width: 100%;
  height: auto;
  /* Portrait-friendly default — JS adapts drawing to whatever CSS size we give it */
  aspect-ratio: 3 / 2;
  /* Floor for very old browsers that don't support aspect-ratio */
  min-height: 13rem;
  cursor: pointer;
  image-rendering: auto;
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;
}

/* ─── Game responsive overrides ─── */
/* Wider aspect ratio on tablets/desktop where vertical space is plentiful */
@media (min-width: 600px) {
  #lanaCanvas {
    aspect-ratio: 5 / 2;
    min-height: 0;
  }
}

.game-hud {
  position: absolute;
  top: 0.5rem;
  right: 0.625rem;
  left: 0.625rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  font-family: "Quicksand", sans-serif;
  font-weight: 700;
  font-size: clamp(0.75rem, 2.5vw, 0.95rem);
  color: var(--primary);
  pointer-events: none;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.9);
}

.game-score-label,
.game-best-label {
  opacity: 0.75;
  margin-right: 0.25rem;
}

.game-score,
.game-best {
  font-size: 1.1em;
  color: var(--primary);
}

.game-best-label {
  margin-left: auto;
}

.game-overlay {
  position: absolute;
  inset: 0;
  background: rgba(255, 240, 243, 0.92);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem;
  text-align: center;
  transition: opacity 0.3s ease;
}

.game-overlay.hidden {
  opacity: 0;
  pointer-events: none;
}

.game-msg {
  font-family: "Quicksand", sans-serif;
  font-size: clamp(0.875rem, 3.5vw, 1.1rem);
  color: var(--text-color);
  font-weight: 600;
  margin: 0;
  min-height: 0;
  max-width: 90%;
}

#lanaStartBtn {
  min-width: 0;
  width: auto;
  padding-left: clamp(1.25rem, 5vw, 2rem);
  padding-right: clamp(1.25rem, 5vw, 2rem);
}

.game-hint {
  font-family: "Quicksand", sans-serif;
  font-size: clamp(0.7rem, 2.5vw, 0.85rem);
  color: var(--secondary);
  text-align: center;
  margin: 0 0 0.75rem 0;
  min-height: 0;
  font-weight: 600;
  opacity: 0.8;
}

#step10 kbd {
  font-family: "Quicksand", sans-serif;
  font-size: 0.85em;
  padding: 0.1em 0.4em;
  background: white;
  border: 1px solid var(--secondary);
  border-radius: 0.3rem;
  color: var(--primary);
  font-weight: 700;
  box-shadow: 0 1px 0 rgba(255, 141, 163, 0.4);
}

/* ─── Extras Hub ─── */
.extras-intro, .step-intro {
  font-size: clamp(0.85rem, 3vw, 1rem);
  color: var(--text-color);
  margin-bottom: 0.75rem;
  min-height: 0;
  font-weight: 500;
}

.extras-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: clamp(0.5rem, 2vw, 0.875rem);
  width: 100%;
  margin-bottom: 1rem;
}

.extras-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: clamp(0.75rem, 3vw, 1.1rem) clamp(0.5rem, 2vw, 0.75rem);
  background: rgba(255, 255, 255, 0.85);
  border: 2px solid rgba(255, 141, 163, 0.4);
  border-radius: 1rem;
  cursor: pointer;
  font-family: "Quicksand", sans-serif;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  box-shadow: 0 4px 12px rgba(255, 77, 109, 0.1);
  min-height: 4.5rem;
  touch-action: manipulation;
}
.extras-tile:hover, .extras-tile:focus-visible {
  transform: translateY(-3px);
  box-shadow: 0 8px 18px rgba(255, 77, 109, 0.22);
  background: white;
  outline: none;
}
.extras-tile:active { transform: scale(0.97); }

.extras-tile-icon {
  font-size: clamp(1.5rem, 6vw, 2rem);
  line-height: 1;
}
.extras-tile-label {
  font-size: clamp(0.7rem, 2.5vw, 0.85rem);
  font-weight: 700;
  color: var(--primary);
  text-align: center;
  line-height: 1.2;
}

.extras-actions {
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
}

/* ─── Settings Modal ─── */
.settings-modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}
.settings-modal.open {
  display: flex;
}
.settings-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(255, 200, 215, 0.5);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}
.settings-card {
  position: relative;
  background: var(--glass);
  border-radius: 1.5rem;
  padding: 1.5rem 1.25rem;
  width: min(92%, 22rem);
  box-shadow: 0 20px 40px rgba(255, 77, 109, 0.25);
  border: 2px solid rgba(255, 255, 255, 0.8);
  font-family: "Quicksand", sans-serif;
}
.settings-close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: none;
  background: var(--secondary);
  color: white;
  font-weight: 700;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
}
.settings-title {
  font-family: "Great Vibes", cursive;
  color: #c9003a;
  font-size: 2rem;
  margin-bottom: 0.75rem;
  text-align: center;
}
.settings-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem 0;
  border-bottom: 1px solid rgba(255, 141, 163, 0.25);
  color: var(--text-color);
  font-weight: 600;
  font-size: 0.95rem;
}
.settings-row:last-child {
  border-bottom: none;
}
.settings-row input[type="checkbox"] {
  width: 1.5rem;
  height: 1.5rem;
  accent-color: var(--primary);
  cursor: pointer;
}
.settings-row select {
  padding: 0.35rem 0.5rem;
  border-radius: 0.5rem;
  border: 1.5px solid var(--secondary);
  background: white;
  color: var(--primary);
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
}

/* ════════════════════════════════════════
   MINI-GAMES (steps 12–15)
   ════════════════════════════════════════ */

/* ─── Game 1: Memory Match ─── */
.memory-grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 0.5rem;
  width: 100%;
  max-width: 22rem;
  margin: 0.25rem auto 0.75rem;
  aspect-ratio: 4 / 3;
  perspective: 600px;
}

.memory-card {
  position: relative;
  aspect-ratio: 1;
  border-radius: 0.75rem;
  cursor: pointer;
  transform-style: preserve-3d;
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 4px 10px rgba(255, 77, 109, 0.18);
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}
.memory-card.flipped,
.memory-card.matched {
  transform: rotateY(180deg);
}
.memory-card.matched {
  box-shadow: 0 0 0 2px var(--primary), 0 4px 12px rgba(255, 77, 109, 0.3);
  animation: memoryPop 0.5s ease;
}
@keyframes memoryPop {
  0%   { transform: rotateY(180deg) scale(1); }
  50%  { transform: rotateY(180deg) scale(1.08); }
  100% { transform: rotateY(180deg) scale(1); }
}
.memory-face {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border: 2px solid rgba(255, 141, 163, 0.5);
  user-select: none;
}
.memory-back {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  font-size: clamp(1.25rem, 5vw, 1.75rem);
  font-weight: 700;
}
.memory-front {
  background: #fff;
  font-size: clamp(1.5rem, 7vw, 2.25rem);
  transform: rotateY(180deg);
}
.memory-status {
  text-align: center;
  font-size: clamp(0.85rem, 3vw, 1rem);
  color: var(--text-color);
  font-weight: 700;
  margin: 0.25rem 0 0.6rem;
  min-height: 1.5rem;
}
.memory-status .memory-win {
  color: var(--primary);
}
.memory-restart {
  display: inline-block;
  margin-left: 0.5rem;
  padding: 0.3rem 0.85rem;
  border: none;
  border-radius: 999px;
  background: linear-gradient(45deg, var(--primary), var(--secondary));
  color: white;
  font-family: inherit;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  box-shadow: 0 3px 8px rgba(255, 77, 109, 0.25);
}

/* ─── Game 2: Atrapa Corazones ─── */
#catchCanvas {
  aspect-ratio: 3 / 2;
  width: 100%;
  height: auto;
  display: block;
  touch-action: none;
  cursor: pointer;
  background: linear-gradient(180deg, #fff5f8 0%, #ffe5ec 100%);
  min-height: 13rem;
}

/* ─── Game 3: Bubble Pop ─── */
#bubbleCanvas {
  aspect-ratio: 3 / 2;
  width: 100%;
  height: auto;
  display: block;
  touch-action: none;
  cursor: crosshair;
  background: linear-gradient(180deg, #fff5f8 0%, #ffe5ec 100%);
  min-height: 13rem;
}

/* Game 2/3 shared HUD tweaks for spans */
#catchScore, #catchLives, #bubbleScore, #bubbleTime {
  color: var(--primary);
  font-size: 1.05em;
}

/* ─── Game 4: Alimenta a Lana ─── */
.feed-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 0.5rem;
  width: 100%;
  max-width: 22rem;
  margin: 0 auto;
}
.feed-cat-area {
  position: relative;
  width: clamp(7rem, 30vw, 9rem);
  height: clamp(7rem, 30vw, 9rem);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #fff 0%, #ffe5ec 100%);
  box-shadow: 0 8px 20px rgba(255, 77, 109, 0.18);
  border: 3px solid rgba(255, 141, 163, 0.45);
  transition: transform 0.3s ease;
}
.feed-cat-area.bounce {
  animation: feedBounce 0.5s ease;
}
@keyframes feedBounce {
  0%   { transform: scale(1); }
  40%  { transform: scale(1.12) rotate(-3deg); }
  70%  { transform: scale(0.96) rotate(2deg); }
  100% { transform: scale(1); }
}
.feed-cat-face {
  font-size: clamp(3rem, 14vw, 4.5rem);
  line-height: 1;
  user-select: none;
}
.feed-cat-hearts {
  position: absolute;
  top: -0.5rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.5rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}
.feed-cat-area[data-mood="enamorada"] .feed-cat-hearts {
  opacity: 1;
  animation: feedHearts 1.6s ease-in-out infinite;
}
@keyframes feedHearts {
  0%, 100% { transform: translateX(-50%) translateY(0) rotate(-8deg); }
  50%      { transform: translateX(-50%) translateY(-6px) rotate(8deg); }
}
.feed-mood-label {
  font-family: "Quicksand", sans-serif;
  font-weight: 700;
  color: var(--primary);
  font-size: clamp(0.85rem, 3vw, 1rem);
  text-align: center;
  margin: 0;
}
.feed-bar-wrap {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.feed-bar-label {
  display: flex;
  justify-content: space-between;
  font-size: clamp(0.75rem, 2.5vw, 0.9rem);
  font-weight: 700;
  color: var(--text-color);
}
.feed-bar-label span:last-child {
  color: var(--primary);
}
.feed-bar-track {
  width: 100%;
  height: 0.85rem;
  background: rgba(255, 141, 163, 0.2);
  border-radius: 999px;
  overflow: hidden;
  border: 1.5px solid rgba(255, 141, 163, 0.4);
}
.feed-bar-fill {
  height: 100%;
  width: 30%;
  background: linear-gradient(90deg, var(--secondary), var(--primary));
  border-radius: 999px;
  transition: width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 0 8px rgba(255, 77, 109, 0.3) inset;
}
.feed-snack-btn {
  position: relative;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 999px;
  font-family: inherit;
  font-weight: 700;
  font-size: clamp(0.95rem, 3.5vw, 1.1rem);
  color: white;
  background: linear-gradient(45deg, var(--primary), var(--secondary));
  cursor: pointer;
  box-shadow: 0 6px 14px rgba(255, 77, 109, 0.3);
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease;
  min-height: 2.75rem;
  touch-action: manipulation;
  overflow: hidden;
}
.feed-snack-btn:hover:not(:disabled) {
  transform: scale(1.05);
}
.feed-snack-btn:active:not(:disabled) {
  transform: scale(0.95);
}
.feed-snack-btn:disabled {
  background: linear-gradient(45deg, #ccc, #bbb);
  cursor: not-allowed;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
}
.feed-snack-cooldown {
  font-size: 0.85em;
  margin-left: 0.4rem;
  opacity: 0.85;
}
.feed-particle {
  position: absolute;
  pointer-events: none;
  font-size: 1.4rem;
  animation: feedParticle 1s ease-out forwards;
  z-index: 5;
}
@keyframes feedParticle {
  0%   { transform: translate(0, 0) scale(0.6); opacity: 0; }
  20%  { opacity: 1; }
  100% { transform: translate(var(--fx, 0), var(--fy, -50px)) scale(1.2) rotate(15deg); opacity: 0; }
}

/* === CONTENT_CSS_MARKER === */
/* ─── Content (Storytelling) Features ─── */

/* Feature 1: Mensaje del día */
.daily-msg-box {
  background: rgba(255, 255, 255, 0.85);
  border: 2px solid rgba(255, 141, 163, 0.4);
  border-radius: 1rem;
  padding: clamp(1rem, 4vw, 1.5rem);
  box-shadow: 0 6px 16px rgba(255, 77, 109, 0.12);
  font-family: "Quicksand", sans-serif;
  font-weight: 600;
  color: var(--text-color);
  font-size: clamp(0.95rem, 3.5vw, 1.15rem);
  line-height: 1.6;
  text-align: center;
  min-height: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem 0 1rem;
  transition: opacity 0.45s ease, transform 0.45s ease;
  opacity: 0;
  transform: translateY(6px);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}
.daily-msg-box.visible {
  opacity: 1;
  transform: translateY(0);
}
#dailyDate {
  font-family: "Great Vibes", cursive;
  color: #c9003a;
  font-size: clamp(1.4rem, 5vw, 2rem);
  font-weight: 400;
  min-height: 0;
  margin-bottom: 0.25rem;
}

/* Feature 2: Razón al azar */
.reason-text {
  font-family: "Quicksand", sans-serif;
  font-weight: 700;
  color: var(--primary);
  font-size: clamp(1.1rem, 4.5vw, 1.4rem);
  line-height: 1.5;
  text-align: center;
  padding: clamp(1rem, 4vw, 1.5rem);
  min-height: 7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem 0 0.75rem;
  background: rgba(255, 255, 255, 0.7);
  border: 2px dashed rgba(255, 141, 163, 0.5);
  border-radius: 1rem;
  transition: opacity 0.35s ease, transform 0.35s ease;
}
.reason-text.fading {
  opacity: 0;
  transform: translateY(8px);
}
.reason-counter {
  display: block;
  font-family: "Quicksand", sans-serif;
  font-weight: 500;
  font-size: 0.75rem;
  color: var(--secondary);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 0.4rem;
  opacity: 0.8;
}

/* Feature 3: Carta tipeada */
.letter-container {
  background: linear-gradient(180deg, #fffaf0 0%, #fff5f8 100%);
  border: 2px dashed rgba(255, 141, 163, 0.55);
  border-radius: 1rem;
  padding: clamp(1rem, 4vw, 1.75rem);
  box-shadow: 0 10px 24px rgba(255, 77, 109, 0.14), inset 0 0 0 1px rgba(255, 255, 255, 0.6);
  font-family: "Quicksand", sans-serif;
  font-weight: 500;
  color: #5a3a44;
  font-size: clamp(0.9rem, 3.5vw, 1.05rem);
  line-height: 1.7;
  letter-spacing: 0.015em;
  text-align: left;
  min-height: 14rem;
  margin: 0.5rem 0 1rem;
  white-space: pre-wrap;
  position: relative;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  transition: box-shadow 0.3s ease;
}
.letter-container:hover {
  box-shadow: 0 14px 30px rgba(255, 77, 109, 0.2), inset 0 0 0 1px rgba(255, 255, 255, 0.6);
}
.letter-container::before,
.letter-container::after {
  content: "🌸";
  position: absolute;
  font-size: 1.2rem;
  opacity: 0.65;
  pointer-events: none;
}
.letter-container::before {
  top: 0.4rem;
  left: 0.5rem;
}
.letter-container::after {
  bottom: 0.4rem;
  right: 0.5rem;
}
.letter-cursor {
  display: inline-block;
  width: 1ch;
  color: var(--primary);
  font-weight: 700;
  animation: letterBlink 1s steps(2, start) infinite;
}
.letter-skip-hint {
  display: block;
  font-size: 0.7rem;
  color: var(--secondary);
  font-weight: 600;
  text-align: center;
  margin-top: 0.5rem;
  opacity: 0.75;
  letter-spacing: 0.05em;
}
.letter-rose {
  display: block;
  text-align: center;
  font-size: 1.75rem;
  margin-top: 0.5rem;
  animation: roseBloom 0.8s ease-out;
}
@keyframes letterBlink {
  to { opacity: 0; }
}
@keyframes roseBloom {
  from { opacity: 0; transform: scale(0.4) rotate(-15deg); }
  to   { opacity: 1; transform: scale(1) rotate(0); }
}

/* Feature 4: Aventura */
.adventure-container {
  background: rgba(255, 255, 255, 0.85);
  border: 2px solid rgba(255, 141, 163, 0.4);
  border-radius: 1rem;
  padding: clamp(1rem, 4vw, 1.5rem);
  box-shadow: 0 6px 16px rgba(255, 77, 109, 0.12);
  font-family: "Quicksand", sans-serif;
  margin: 0.5rem 0 0.75rem;
  min-height: 16rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.adventure-container.fading {
  opacity: 0;
  transform: translateY(8px);
}
.adventure-chapter {
  font-family: "Quicksand", sans-serif;
  font-weight: 700;
  font-size: 0.75rem;
  color: var(--secondary);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  text-align: center;
  opacity: 0.85;
}
.adventure-text {
  font-family: "Quicksand", sans-serif;
  font-weight: 500;
  color: var(--text-color);
  font-size: clamp(0.95rem, 3.5vw, 1.1rem);
  line-height: 1.6;
  text-align: center;
  padding: 0.25rem 0.5rem;
}
.adventure-choices {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.25rem;
}
.adventure-choice {
  width: 100%;
  min-width: 0;
  text-align: center;
  flex: 0 0 auto;
}
.adventure-ending {
  font-family: "Great Vibes", cursive;
  color: #c9003a;
  font-size: clamp(1.5rem, 5vw, 2rem);
  text-align: center;
  margin-top: 0.5rem;
  line-height: 1.2;
}
/* === END CONTENT_CSS_MARKER === */

/* ════════════════════════════════════════
   TEMPORAL WIDGETS (step 20)
   ════════════════════════════════════════ */
.widget-box {
  background: rgba(255, 255, 255, 0.85);
  border: 2px solid rgba(255, 141, 163, 0.4);
  border-radius: 1rem;
  padding: 1rem;
  margin-bottom: 0.875rem;
  box-shadow: 0 4px 12px rgba(255, 77, 109, 0.1);
  font-family: "Quicksand", sans-serif;
  color: var(--text-color);
  text-align: center;
}
.widget-box .widget-label {
  font-size: clamp(0.75rem, 2.5vw, 0.875rem);
  color: var(--secondary);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.4rem;
}
.widget-box .widget-value {
  font-size: clamp(1rem, 4vw, 1.25rem);
  color: var(--primary);
  font-weight: 700;
  line-height: 1.4;
}
.widget-box .widget-emoji {
  font-size: 1.4rem;
  margin-right: 0.25rem;
}
.widget-calendar table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 0.25rem;
}
.widget-calendar th,
.widget-calendar td {
  padding: 0.3rem 0;
  font-size: clamp(0.7rem, 2.5vw, 0.85rem);
  text-align: center;
}
.widget-calendar th {
  color: var(--secondary);
  font-weight: 700;
}
.widget-calendar td {
  color: var(--text-color);
  position: relative;
}
.widget-calendar td.today {
  background: var(--primary);
  color: white;
  border-radius: 50%;
  font-weight: 700;
}
.widget-calendar td.special {
  color: var(--primary);
  font-weight: 700;
}
.widget-calendar td.special::after {
  content: "💖";
  position: absolute;
  font-size: 0.6em;
  top: -2px;
  right: 2px;
  pointer-events: none;
}
.widget-calendar td.today.special::after {
  filter: drop-shadow(0 0 1px white);
}
.widget-calendar .cal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-weight: 700;
  color: var(--primary);
  font-size: clamp(0.9rem, 3vw, 1.05rem);
}
.widget-calendar .cal-nav {
  background: none;
  border: none;
  color: var(--primary);
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  min-width: 2rem;
  min-height: 2rem;
  border-radius: 50%;
  transition: background 0.2s ease;
}
.widget-calendar .cal-nav:hover,
.widget-calendar .cal-nav:focus-visible {
  background: rgba(255, 141, 163, 0.18);
  outline: none;
}
.widget-calendar .cal-title {
  text-align: center;
  flex: 1;
}

/* ════════════════════════════════════════
   DARK MODE
   ════════════════════════════════════════ */
body.dark-mode {
  --bg-gradient: linear-gradient(135deg, #2b1b35 0%, #4a2440 100%);
  --glass: rgba(40, 25, 50, 0.92);
  --text-color: #e9d8e3;
  --shadow: 0 20px 40px rgba(0, 0, 0, 0.45);
}
body.dark-mode .card {
  border-color: rgba(255, 141, 163, 0.35);
}
body.dark-mode h1 {
  color: #ff8fa3;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.4);
}
body.dark-mode p,
body.dark-mode .step-intro,
body.dark-mode .extras-intro,
body.dark-mode .game-intro,
body.dark-mode .game-msg {
  color: #e9d8e3;
}
body.dark-mode kbd,
body.dark-mode #step10 kbd {
  background: #3a2545;
  color: #ff8fa3;
  border-color: rgba(255, 141, 163, 0.5);
}
body.dark-mode .extras-tile,
body.dark-mode .song-card,
body.dark-mode .widget-box {
  background: rgba(50, 30, 60, 0.75);
  border-color: rgba(255, 141, 163, 0.3);
  color: #e9d8e3;
}
body.dark-mode .extras-tile-label {
  color: #ff8fa3;
}
body.dark-mode .song-header h2 {
  color: #ff8fa3;
}
body.dark-mode .lyrics {
  background: rgba(60, 35, 70, 0.75);
  color: #d6c5d0;
}
body.dark-mode .game-overlay {
  background: rgba(40, 25, 50, 0.92);
}
body.dark-mode .game-container {
  background: linear-gradient(180deg, #3a2545 0%, #2b1b35 100%);
}
body.dark-mode #lanaCanvas,
body.dark-mode #catchCanvas,
body.dark-mode #bubbleCanvas {
  background: linear-gradient(180deg, #3a2545 0%, #2b1b35 100%);
}
body.dark-mode .settings-card {
  background: rgba(50, 30, 60, 0.96);
  border-color: rgba(255, 141, 163, 0.35);
}
body.dark-mode .settings-row {
  color: #e9d8e3;
  border-bottom-color: rgba(255, 141, 163, 0.2);
}
body.dark-mode .settings-row select {
  background: #3a2545;
  color: #ff8fa3;
  border-color: rgba(255, 141, 163, 0.5);
}
body.dark-mode .settings-title {
  color: #ff8fa3;
}
body.dark-mode .widget-calendar td {
  color: #e9d8e3;
}
body.dark-mode .widget-calendar th,
body.dark-mode .widget-box .widget-label {
  color: #ff8fa3;
}

/* ════════════════════════════════════════
   CUSTOM HEART CURSOR
   ════════════════════════════════════════ */
body.custom-cursor,
body.custom-cursor * {
  cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 32 32'><path d='M16 28 C 4 20, 2 12, 8 7 C 12 3, 16 7, 16 11 C 16 7, 20 3, 24 7 C 30 12, 28 20, 16 28 Z' fill='%23ff4d6d' stroke='white' stroke-width='1.5'/></svg>") 14 14, auto;
}
body.custom-cursor .btn,
body.custom-cursor button,
body.custom-cursor .extras-tile,
body.custom-cursor .song-card,
body.custom-cursor a {
  cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'><path d='M16 29 C 3 21, 1 12, 7 6 C 12 1, 16 6, 16 11 C 16 6, 20 1, 25 6 C 31 12, 29 21, 16 29 Z' fill='%23ff8fa3' stroke='white' stroke-width='2'/></svg>") 16 16, pointer;
}

/* ════════════════════════════════════════
   LANA OUTFITS
   ════════════════════════════════════════ */
.cat-container.cat-outfit-crown::before,
.cat-container.cat-outfit-glasses::before,
.cat-container.cat-outfit-party::before {
  position: absolute;
  pointer-events: none;
  z-index: 25;
  line-height: 1;
  text-align: center;
  width: 100%;
  filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.18));
}
.cat-container.cat-outfit-crown::before {
  content: "👑";
  top: -8%;
  left: 0;
  font-size: clamp(1.6rem, 7vw, 2.25rem);
  transform: translateY(-10%);
}
.cat-container.cat-outfit-glasses::before {
  content: "🕶️";
  top: 36%;
  left: 0;
  font-size: clamp(1.3rem, 5.5vw, 1.85rem);
  transform: translateY(-50%);
}
.cat-container.cat-outfit-party::before {
  content: "🥳";
  top: -10%;
  left: 0;
  font-size: clamp(1.5rem, 6vw, 2rem);
}

/* ════════════════════════════════════════
   SEASONAL THEMES
   ════════════════════════════════════════ */
body.season-winter:not(.dark-mode) {
  --bg-gradient: linear-gradient(135deg, #eaf4ff 0%, #f5e9ff 100%);
}
body.season-spring:not(.dark-mode) {
  --bg-gradient: linear-gradient(135deg, #fff0f3 0%, #ffe5ec 100%);
}
body.season-summer:not(.dark-mode) {
  --bg-gradient: linear-gradient(135deg, #fff7e0 0%, #ffe5ec 100%);
}
body.season-autumn:not(.dark-mode) {
  --bg-gradient: linear-gradient(135deg, #fff0e0 0%, #ffe5d0 100%);
}
.season-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 1;
}
.season-flake {
  position: absolute;
  top: -2rem;
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  opacity: 0.55;
  animation: seasonFall linear infinite;
}
@keyframes seasonFall {
  0% {
    transform: translateY(-3rem) translateX(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.65;
  }
  100% {
    transform: translateY(110vh) translateX(var(--drift, 2rem)) rotate(360deg);
    opacity: 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  .season-overlay {
    display: none;
  }
}

/* ════════════════════════════════════════
   BIRTHDAY / ANNIVERSARY TOAST
   ════════════════════════════════════════ */
.celebrate-toast {
  position: fixed;
  top: 1.5rem;
  left: 50%;
  transform: translateX(-50%) translateY(-150%);
  background: linear-gradient(45deg, var(--primary), var(--secondary));
  color: white;
  padding: 0.85rem 1.25rem;
  border-radius: 999px;
  font-family: "Quicksand", sans-serif;
  font-weight: 700;
  font-size: clamp(0.9rem, 3vw, 1.05rem);
  box-shadow: 0 8px 20px rgba(255, 77, 109, 0.35);
  z-index: 2000;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  max-width: min(92%, 24rem);
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease;
  opacity: 0;
}
.celebrate-toast.show {
  transform: translateX(-50%) translateY(0);
  opacity: 1;
}
.celebrate-toast button {
  background: rgba(255, 255, 255, 0.25);
  color: white;
  border: none;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  font-weight: 700;
  font-family: inherit;
  font-size: 0.85rem;
  margin-left: 0.25rem;
}

/* Responsive tweaks for the hub */
@media (min-width: 480px) {
  .extras-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (min-width: 640px) {
  .extras-grid { grid-template-columns: repeat(4, 1fr); }
}
@media (min-width: 768px) {
  .extras-grid { grid-template-columns: repeat(5, 1fr); }
}

/* ════════════════════════════════════════
   RESPONSIVE BREAKPOINTS
   Media query breakpoint values must remain in px (spec requirement)
   ════════════════════════════════════════ */

/* Tablets: 2-column song grid */
@media (min-width: 520px) {
  .song-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* ── Very small phones (< 380px, e.g. iPhone SE 1st gen, Galaxy S5) ── */
@media (max-width: 380px) {
  body {
    padding: 4rem 0.5rem 1.5rem;
  }
  .card {
    border-radius: 1.375rem; /* was 22px */
  }
  .cat-container {
    width: 7.1875rem;  /* was 115px */
    height: 6.375rem;  /* was 102px */
    margin: -2.625rem auto 0.5rem; /* was -42px auto 8px */
  }
  p {
    min-height: 3em;
  }
  .bg-1 { font-size: 6rem; }
  .bg-2 { font-size: 5rem; }
  .bg-3 { font-size: 2.5rem; }
  .game-hud {
    font-size: 0.7rem;
    top: 0.35rem;
    right: 0.45rem;
    left: 0.45rem;
    gap: 0.3rem;
  }
  /* Tighter photo captions on very narrow screens */
  .photo-caption {
    padding: 0.625rem 0.1875rem 0.1875rem;
    font-size: 0.6rem;
    letter-spacing: 0.2px;
  }
  /* Slightly tighter step 5 line-height to keep card from overflowing */
  .step5-text {
    line-height: 1.55;
  }
}

/* ── Landscape phones (short viewport, e.g. iPhone in landscape) ── */
@media (orientation: landscape) and (max-height: 500px) {
  body {
    /* Bumped from 2.5rem so the cat (negative-margin ~50-70px) isn't clipped */
    padding: 3.5rem 1rem 1rem;
    align-items: flex-start;
  }
  .cat-container {
    width: 5.3125rem;  /* was 85px */
    height: 4.75rem;   /* was 76px */
    margin: -1.625rem auto 0.25rem; /* was -26px auto 4px */
  }
  .card {
    padding: 0.75rem 1rem;
  }
  h1 {
    font-size: clamp(1.2rem, 5vw, 1.75rem);
    margin-bottom: 0.2rem;
  }
  p {
    font-size: 0.85rem;
    margin-bottom: 0.6rem;
    min-height: 0;
  }
  .btn {
    padding: 0.5rem 0.875rem; /* was 8px 14px */
    font-size: 0.85rem;
    min-height: 2.75rem; /* keep 44px minimum touch target even in landscape */
  }
  .btn-group {
    padding-bottom: 0.25rem;
  }
  .bg-1 { font-size: 4rem; }
  .bg-2 { font-size: 3.5rem; }
  .bg-3 { font-size: 2rem; }
  /* Force 2-col song grid in landscape to reduce vertical space */
  .song-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .game-intro,
  .game-hint { display: none; }
  /* Landscape: cancel mobile edge-bleed and restore wide aspect ratio */
  .game-container {
    margin-left: 0;
    margin-right: 0;
  }
  #lanaCanvas {
    aspect-ratio: 600 / 240;
    min-height: 0;
  }
}

/* ── Reduced motion: respect vestibular disorder preferences (WCAG 2.3.3) ── */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* ── Large tablets and desktops (≥ 768px) ── */
@media (min-width: 768px) {
  body {
    padding: 6rem 2rem 3rem;
  }
  .card {
    padding: 2.5rem 2rem;
    max-width: 32.5rem; /* was 520px */
  }
  h1 {
    font-size: clamp(2.5rem, 4vw, 3rem);
  }
  p {
    font-size: 1.25rem;
  }
  .btn {
    font-size: 1.1rem;
    padding: 0.875rem 1.75rem; /* was 14px 28px */
  }
  /* On desktop don't bleed to card edge — give visible breathing room */
  .game-container {
    margin-left: 0;
    margin-right: 0;
  }
}

  // Move focus to the new heading so screen readers announce the step change
  step.querySelector("h1")?.focus();

  // Reset transform
  const catSvg = cat.querySelector("svg");
  catSvg.style.transform = "none";

  // Mood Mapping
  if (id === 2) {
    setMood("cute"); // Smiling eyes
    catSvg.style.transform = "rotate(-5deg)";
  } else if (id === 3) {
    setMood("love"); // Heart bubble
  } else if (id === 4) {
    setMood("shocked"); // Wide eyes because "you are my world"
  } else if (id === 5) {
    setMood("cute"); // Laugh/smile -> simple cute
    catSvg.style.transform = "translateY(5px)";
  } else if (id === 6) {
    setMood("shocked"); // A bit serious/nervous (reusing shocked for wide eyes)
    catSvg.style.transform = "none";
  } else if (id === 7) {
    setMood("default"); // Earnest
    catSvg.style.transform = "translateY(8px)"; // Peeking up
  } else if (id === 9) {
    setMood("love");
    catSvg.style.transform = "none";
  } else if (id === 11) {
    setMood("love"); // hub: hearty cat
  } else if (id >= 12 && id <= 20) {
    setMood("cute"); // extras: cute by default
  } else {
    setMood(""); // Default happy/normal
  }

  // Lana game lifecycle
  if (window.lanaGame) {
    if (id === 10) window.lanaGame.start();
    else window.lanaGame.stop();
  }

  // Mini-games lifecycle
  if (window.memoryGame) { id === 12 ? window.memoryGame.start() : window.memoryGame.stop(); }
  if (window.catchGame)  { id === 13 ? window.catchGame.start()  : window.catchGame.stop(); }
  if (window.bubbleGame) { id === 14 ? window.bubbleGame.start() : window.bubbleGame.stop(); }
  if (window.feedGame)   { id === 15 ? window.feedGame.start()   : window.feedGame.stop(); }

  // Content lifecycle
  if (window.dailyMessage) { id === 16 ? window.dailyMessage.start() : window.dailyMessage.stop(); }
  if (window.randomReason) { id === 17 ? window.randomReason.start() : window.randomReason.stop(); }
  if (window.letterTyper)  { id === 18 ? window.letterTyper.start()  : window.letterTyper.stop();  }
  if (window.adventure)    { id === 19 ? window.adventure.start()    : window.adventure.stop();    }
}

// No Button Dodge Logic
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
let noCount = 0;
const noTexts = ["¿No? 😢", "¿Estás segura?", "Por favor 🥺", "¡No lo hagas!", "¡Piensa otra vez!", "¡Rompecorazones! 💔"];

function dodgeBtn(e) {
  if (e.type === "touchstart") e.preventDefault();

  const vp = window.visualViewport || window;
  const vpW = vp.width || window.innerWidth;
  const vpH = vp.height || window.innerHeight;
  const margin = 20;
  const maxX = vpW - noBtn.offsetWidth - margin;
  const maxY = vpH - noBtn.offsetHeight - margin;

  noBtn.style.position = "fixed";
  noBtn.style.left = Math.max(margin, Math.random() * maxX) + "px";
  noBtn.style.top  = Math.max(margin, Math.random() * maxY) + "px";

  noBtn.innerText = noTexts[noCount % noTexts.length];
  noCount++;

  setMood("sad");
  setTimeout(() => setMood(""), 1500);
}

noBtn.addEventListener("mouseover",  dodgeBtn, { passive: true  });
noBtn.addEventListener("touchstart", dodgeBtn, { passive: false });
noBtn.addEventListener("click",      dodgeBtn, { passive: true  });

// Success
function acceptLove() {
  nextStep(8);
  setMood("excited"); // Dancing
  setMood("love"); // Also hearts
  // Combine via CSS? Just use Excited which has dance, and logic add hearts
  cat.setAttribute("data-mood", "love"); // Keep love hearts
  cat.querySelector("svg").style.animation = "dance 0.6s infinite alternate";

  yesBtn.style.transform = "scale(1)";
  startSparkles();
  for (let i = 0; i < 15; i++) createFloatingEmoji(true);
}

// Background
function createFloatingEmoji(isInstant = false) {
  const emojis = ["❤️", "💖", "💕", "🌹", "✨", "🥰", "💌", "😍"];
  const el = document.createElement("div");
  el.innerText = emojis[Math.floor(Math.random() * emojis.length)];
  el.classList.add("floating-emoji");
  el.style.left = Math.random() * 100 + "vw";

  const duration = Math.random() * 5 + 5;
  el.style.animationDuration = duration + "s";
  el.style.fontSize = Math.random() * 20 + 20 + "px";

  if (isInstant) {
    el.style.animationDelay = -(Math.random() * duration) + "s";
    el.style.opacity = 0.6;
  }

  document.body.appendChild(el);
  setTimeout(() => el.remove(), duration * 1000);
}

// Respect prefers-reduced-motion: skip continuous animations for vestibular sensitivity
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!prefersReducedMotion) {
  setInterval(() => createFloatingEmoji(false), 600);
  for (let i = 0; i < 15; i++) createFloatingEmoji(true);
}

// Sparkles
function startSparkles() {
  const colors = ["#ff4d6d", "#ffb3c1", "#ffffff", "#ffd700"];
  for (let i = 0; i < 80; i++) {
    setTimeout(() => {
      const spark = document.createElement("div");
      spark.classList.add("sparkle");
      spark.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      spark.style.left = Math.random() * 100 + "vw";
      spark.style.animationDuration = Math.random() * 2 + 3 + "s";
      document.body.appendChild(spark);
      setTimeout(() => spark.remove(), 5000);
    }, Math.random() * 300);
  }
}

// Song gallery
const songCards = document.querySelectorAll(".song-card");
songCards.forEach((card) => {
  const iframe = card.querySelector("iframe");
  if (!iframe) return;

  const stopVideo = () => {
    iframe.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: "stopVideo", args: "" }),
      "*"
    );
  };

  // Click/tap toggle — critical for mobile where hover doesn't exist
  card.addEventListener("click", (e) => {
    if (e.target.closest(".song-panel")) return; // let video interactions through
    const opening = !card.classList.contains("expanded");
    // Collapse all other cards
    songCards.forEach((c) => {
      if (c !== card) c.classList.remove("expanded");
    });
    card.classList.toggle("expanded", opening);
    card.setAttribute("aria-expanded", String(opening));
    if (!opening) stopVideo();
  });

  card.addEventListener("mouseleave", stopVideo);
  card.addEventListener("focusout", (e) => {
    if (!card.contains(e.relatedTarget)) stopVideo();
  });
});

// Lana the Cat — endless runner mini-game (Canvas 2D, vanilla JS)
(function () {
  const LOGICAL_W = 600;
  const LOGICAL_H = 240;
  const GROUND_Y = 200;
  const GRAVITY = 1500;
  const JUMP_V = -560;
  const CAT_X = 72; // ~12% of 600
  const CAT_W = 56;
  const CAT_H = 56;
  const BEST_KEY = "lanaBestScore";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // DOM refs — resolved lazily so the module survives if step10 mounts late
  let canvas, ctx, scoreEl, bestEl, overlay, overlayMsg, startBtn, step10;
  let rafId = null;
  let lastTs = 0;
  let state = "idle"; // idle | running | gameover
  let cat, obstacles, score, scoreAcc, best, speed, spawnTimer, spawnInterval, sparkles, bobTimer, frameBob;
  let lastObstacleType = null;
  // Approx total airtime of a single jump in seconds: 2 * |JUMP_V| / GRAVITY
  const JUMP_DURATION = (2 * Math.abs(JUMP_V)) / GRAVITY; // ~0.747s
  let resizeObserver = null;
  let listenersBound = false;

  function resolveDom() {
    canvas = document.getElementById("lanaCanvas");
    scoreEl = document.getElementById("lanaScore");
    bestEl = document.getElementById("lanaBest");
    overlay = document.getElementById("lanaOverlay");
    overlayMsg = document.getElementById("lanaOverlayMsg");
    startBtn = document.getElementById("lanaStartBtn");
    step10 = document.getElementById("step10");
    if (canvas) ctx = canvas.getContext("2d");
    return !!(canvas && ctx && overlay && startBtn);
  }

  function setupDPR() {
    if (!canvas || !ctx) return;
    const rect = canvas.getBoundingClientRect();
    const cssW = rect.width || LOGICAL_W;
    const cssH = rect.height || LOGICAL_H;
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const newW = Math.max(1, Math.round(cssW * dpr));
    const newH = Math.max(1, Math.round(cssH * dpr));
    if (canvas.width !== newW) canvas.width = newW;
    if (canvas.height !== newH) canvas.height = newH;
    // Non-uniform scale: maps the logical 600x240 coord system onto whatever
    // CSS aspect ratio the canvas was rendered at. All physics/drawing code
    // continues to read in logical units regardless of device size.
    const sx = newW / LOGICAL_W;
    const sy = newH / LOGICAL_H;
    ctx.setTransform(sx, 0, 0, sy, 0, 0);
    // When resized while idle/gameover, repaint immediately so the cat is
    // visible at the new size (the rAF loop is only running while playing).
    if (state !== "running" && cat) {
      render(0);
    }
  }

  function loadBest() {
    const v = parseInt(localStorage.getItem(BEST_KEY) || "0", 10);
    return Number.isFinite(v) ? v : 0;
  }

  function resetState() {
    cat = { x: CAT_X, y: GROUND_Y - CAT_H, vy: 0, onGround: true };
    obstacles = [];
    score = 0;
    scoreAcc = 0;
    speed = 240;
    spawnTimer = 0;
    spawnInterval = 1.6;
    sparkles = [];
    bobTimer = 0;
    frameBob = 0;
    lastObstacleType = null;
    if (!reducedMotion) {
      for (let i = 0; i < 6; i++) {
        sparkles.push({
          x: Math.random() * LOGICAL_W,
          y: 20 + Math.random() * 120,
          s: 0.6 + Math.random() * 1.2,
          a: 0.15 + Math.random() * 0.25,
        });
      }
    }
  }

  function updateScoreUI() {
    if (scoreEl) scoreEl.textContent = String(score);
    if (bestEl) bestEl.textContent = String(best);
  }

  // --- Drawing helpers ---
  function drawBackground(dt) {
    // Subtle pink gradient (transparent-ish so the CSS bg shows through)
    const g = ctx.createLinearGradient(0, 0, 0, LOGICAL_H);
    g.addColorStop(0, "rgba(255, 245, 248, 0.6)");
    g.addColorStop(1, "rgba(255, 229, 236, 0.6)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, LOGICAL_W, LOGICAL_H);

    // Drifting sparkles
    if (!reducedMotion && state !== "gameover") {
      for (const sp of sparkles) {
        sp.x -= (speed * 0.15) * dt;
        if (sp.x < -10) {
          sp.x = LOGICAL_W + 10;
          sp.y = 20 + Math.random() * 120;
        }
      }
    }
    for (const sp of sparkles) {
      ctx.globalAlpha = sp.a;
      ctx.fillStyle = "#ff8fa3";
      ctx.beginPath();
      ctx.arc(sp.x, sp.y, sp.s, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Ground line
    ctx.fillStyle = "#ff8fa3";
    ctx.fillRect(0, GROUND_Y, LOGICAL_W, 4);
  }

  function drawCat(c) {
    const cx = c.x + CAT_W / 2;
    const cy = c.y + CAT_H / 2 + frameBob;

    // Body — white ellipse
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#ffaec9";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.ellipse(cx, cy + 8, 22, 16, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Tail
    ctx.beginPath();
    ctx.moveTo(cx - 18, cy + 6);
    ctx.quadraticCurveTo(cx - 32, cy - 4, cx - 26, cy - 14);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#ffffff";
    ctx.stroke();
    ctx.lineWidth = 1.2;
    ctx.strokeStyle = "#ffaec9";

    // Head
    ctx.beginPath();
    ctx.arc(cx + 6, cy - 8, 14, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.stroke();

    // Ears (triangles) with pink inner
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.moveTo(cx - 4, cy - 18);
    ctx.lineTo(cx - 1, cy - 28);
    ctx.lineTo(cx + 4, cy - 19);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx + 10, cy - 19);
    ctx.lineTo(cx + 14, cy - 28);
    ctx.lineTo(cx + 18, cy - 18);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    // Inner pink
    ctx.fillStyle = "#ffccd5";
    ctx.beginPath();
    ctx.moveTo(cx - 3, cy - 20);
    ctx.lineTo(cx - 1, cy - 25);
    ctx.lineTo(cx + 2, cy - 20);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(cx + 11, cy - 20);
    ctx.lineTo(cx + 14, cy - 25);
    ctx.lineTo(cx + 17, cy - 20);
    ctx.closePath();
    ctx.fill();

    // Cheeks
    ctx.fillStyle = "#ffaec9";
    ctx.beginPath();
    ctx.arc(cx, cy - 5, 1.8, 0, Math.PI * 2);
    ctx.arc(cx + 13, cy - 5, 1.8, 0, Math.PI * 2);
    ctx.fill();

    // Eyes
    ctx.fillStyle = "#222";
    ctx.beginPath();
    ctx.arc(cx + 2, cy - 9, 1.4, 0, Math.PI * 2);
    ctx.arc(cx + 11, cy - 9, 1.4, 0, Math.PI * 2);
    ctx.fill();

    // Mouth
    ctx.strokeStyle = "#a33";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx + 6, cy - 3, 2, 0, Math.PI);
    ctx.stroke();
  }

  function drawRose(o) {
    const x = o.x;
    const y = o.y;
    // Stem
    ctx.strokeStyle = "#3aa55c";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x + o.w / 2, y + o.h);
    ctx.lineTo(x + o.w / 2, y + 18);
    ctx.stroke();
    // Leaf
    ctx.fillStyle = "#3aa55c";
    ctx.beginPath();
    ctx.ellipse(x + o.w / 2 - 6, y + o.h - 14, 5, 2.5, -0.4, 0, Math.PI * 2);
    ctx.fill();
    // Petals
    ctx.fillStyle = "#ff8fa3";
    ctx.beginPath();
    ctx.arc(x + o.w / 2 - 5, y + 12, 6, 0, Math.PI * 2);
    ctx.arc(x + o.w / 2 + 5, y + 12, 6, 0, Math.PI * 2);
    ctx.arc(x + o.w / 2, y + 7, 6, 0, Math.PI * 2);
    ctx.fill();
    // Center
    ctx.fillStyle = "#ff4d6d";
    ctx.beginPath();
    ctx.arc(x + o.w / 2, y + 12, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawHeart(o) {
    const x = o.x;
    const y = o.y;
    const s = o.w / 22; // scale
    ctx.fillStyle = "#ff4d6d";
    ctx.beginPath();
    ctx.moveTo(x + 11 * s, y + 6 * s);
    ctx.bezierCurveTo(x + 11 * s, y + 2 * s, x + 4 * s, y, x + 4 * s, y + 7 * s);
    ctx.bezierCurveTo(x + 4 * s, y + 12 * s, x + 11 * s, y + 17 * s, x + 11 * s, y + 18 * s);
    ctx.bezierCurveTo(x + 11 * s, y + 17 * s, x + 18 * s, y + 12 * s, x + 18 * s, y + 7 * s);
    ctx.bezierCurveTo(x + 18 * s, y, x + 11 * s, y + 2 * s, x + 11 * s, y + 6 * s);
    ctx.fill();
    // Crack (broken)
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x + 11 * s, y + 3 * s);
    ctx.lineTo(x + 9 * s, y + 7 * s);
    ctx.lineTo(x + 13 * s, y + 10 * s);
    ctx.lineTo(x + 10 * s, y + 14 * s);
    ctx.stroke();
  }

  // --- Spawning ---
  // Minimum horizontal distance (logical units) the player needs between two
  // hazards so the cat can complete a full jump arc and recover between them.
  // safetyPad gives extra finger-reaction-time slack on touch input.
  function minSpawnGap() {
    const safetyPad = 80;
    return speed * JUMP_DURATION + safetyPad;
  }

  // Returns true when there's enough room on the right edge to drop a new
  // obstacle without trapping the player between two impossible-to-clear ones.
  function canSpawn() {
    if (!obstacles.length) return true;
    let rightmost = -Infinity;
    for (const o of obstacles) {
      const rEdge = o.x + o.w;
      if (rEdge > rightmost) rightmost = rEdge;
    }
    return (LOGICAL_W - rightmost) >= minSpawnGap();
  }

  function spawnObstacle() {
    // Reroll heart-after-heart so mid-air hearts can never chain into an
    // unjumpable wall. After a mid-air heart we force a ground obstacle next.
    let r = Math.random();
    let pickHeart = r >= 0.55;
    if (pickHeart && lastObstacleType === "heart-air") {
      pickHeart = false; // force a ground rose/low-heart after a floater
    }

    if (!pickHeart) {
      // Rose — single, ground-level. Doubled-rose removed: it produced
      // walls that were sometimes wider than a single jump could clear.
      obstacles.push({ type: "rose", x: LOGICAL_W + 10, y: GROUND_Y - 50, w: 26, h: 50 });
      lastObstacleType = "rose";
      return;
    }

    // Heart: choose between a low/ground heart (must jump) and a mid-air
    // heart (DON'T jump here — walk under it).
    const floating = Math.random() < 0.45;
    const w = 22, h = 20;
    if (floating) {
      // Raised so the cat at rest (top y = 144) walks safely UNDER it.
      // Heart occupies y ~ 80..100, well above the cat's standing head.
      // It only becomes a hazard while the cat is mid-jump.
      obstacles.push({ type: "heart", x: LOGICAL_W + 10, y: GROUND_Y - 120, w, h });
      lastObstacleType = "heart-air";
    } else {
      obstacles.push({ type: "heart", x: LOGICAL_W + 10, y: GROUND_Y - h, w, h });
      lastObstacleType = "heart-ground";
    }
  }

  // --- Collision ---
  function collides(c, o) {
    // Generous inset gives the player reaction slack — especially for
    // higher-latency touch input on mobile. 8u on each side ~= 14% of the cat.
    const pad = 8;
    const ax = c.x + pad, ay = c.y + pad, aw = CAT_W - pad * 2, ah = CAT_H - pad * 2;
    return ax < o.x + o.w && ax + aw > o.x && ay < o.y + o.h && ay + ah > o.y;
  }

  // --- Main loop ---
  function tick(ts) {
    if (state !== "running") return;
    if (!lastTs) lastTs = ts;
    let dt = (ts - lastTs) / 1000;
    if (dt > 0.05) dt = 0.05; // cap
    lastTs = ts;

    // Physics
    cat.vy += GRAVITY * dt;
    cat.y += cat.vy * dt;
    if (cat.y >= GROUND_Y - CAT_H) {
      cat.y = GROUND_Y - CAT_H;
      cat.vy = 0;
      cat.onGround = true;
    } else {
      cat.onGround = false;
    }

    // Run-cycle bob
    if (cat.onGround && !reducedMotion) {
      bobTimer += dt;
      if (bobTimer >= 0.15) {
        bobTimer = 0;
        frameBob = frameBob === 0 ? -2 : 0;
      }
    } else {
      frameBob = 0;
    }

    // Speed ramps with score — gentler than before so reaction time stays
    // human-friendly on touch input. Cap at 460 u/s (was 520) and step
    // +25 every 120 points (was +30 every 100).
    speed = Math.min(460, 240 + Math.floor(score / 120) * 25);
    spawnInterval = Math.max(0.95, 1.7 - Math.floor(score / 120) * 0.06);

    // Move obstacles
    for (const o of obstacles) o.x -= speed * dt;
    obstacles = obstacles.filter((o) => o.x + o.w > -20);

    // Spawn — gated by canSpawn() so we never drop a hazard so close to the
    // previous one that the player can't physically complete a jump arc
    // between them. If the gate blocks, we hold spawnTimer at the threshold
    // and try again next frame.
    spawnTimer += dt;
    if (spawnTimer >= spawnInterval) {
      if (canSpawn()) {
        spawnTimer = 0;
        spawnObstacle();
      } else {
        // Keep the timer pinned just past threshold so it re-checks every
        // frame until the rightmost obstacle clears the safety zone.
        spawnTimer = spawnInterval;
      }
    }

    // Score (~20/s)
    scoreAcc += dt * 1000;
    while (scoreAcc >= 50) {
      scoreAcc -= 50;
      score += 1;
    }
    updateScoreUI();

    // Collisions
    for (const o of obstacles) {
      if (collides(cat, o)) {
        gameOver();
        break;
      }
    }

    // Draw
    render(dt);

    rafId = requestAnimationFrame(tick);
  }

  function render(dt) {
    ctx.clearRect(0, 0, LOGICAL_W, LOGICAL_H);
    drawBackground(dt);
    for (const o of obstacles) {
      if (o.type === "rose") drawRose(o);
      else drawHeart(o);
    }
    drawCat(cat);
  }

  function jump() {
    if (state === "idle") {
      beginRun();
      return;
    }
    if (state !== "running") return;
    if (cat.onGround) {
      cat.vy = JUMP_V;
      cat.onGround = false;
    }
  }

  function beginRun() {
    resetState();
    state = "running";
    lastTs = 0;
    if (overlay) overlay.classList.add("hidden");
    updateScoreUI();
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(tick);
  }

  function gameOver() {
    state = "gameover";
    cancelAnimationFrame(rafId);
    rafId = null;
    const newRecord = score > best;
    if (newRecord) {
      best = score;
      try { localStorage.setItem(BEST_KEY, String(best)); } catch (_) {}
    }
    updateScoreUI();
    if (overlayMsg) {
      const head = newRecord ? "💕 ¡Récord! 🎉" : "💔 ¡Lana tropezó!";
      overlayMsg.innerHTML = `${head}<br><small>Puntos: ${score} · Mejor: ${best}</small>`;
    }
    if (startBtn) startBtn.textContent = "Otra vez 🔁";
    if (overlay) overlay.classList.remove("hidden");
  }

  // --- Input ---
  function onKey(e) {
    if (!step10 || !step10.classList.contains("active")) return;
    if (e.code === "Space" || e.code === "ArrowUp") {
      e.preventDefault();
      jump();
    }
  }
  function onCanvasPointer(e) {
    if (e.cancelable) e.preventDefault();
    jump();
  }
  function onStartClick() {
    beginRun();
  }

  function bindListeners() {
    if (listenersBound || !canvas) return;
    window.addEventListener("keydown", onKey);
    canvas.addEventListener("mousedown", onCanvasPointer);
    canvas.addEventListener("touchstart", onCanvasPointer, { passive: false });
    startBtn.addEventListener("click", onStartClick);
    listenersBound = true;
  }
  function unbindListeners() {
    if (!listenersBound) return;
    window.removeEventListener("keydown", onKey);
    canvas?.removeEventListener("mousedown", onCanvasPointer);
    canvas?.removeEventListener("touchstart", onCanvasPointer);
    startBtn?.removeEventListener("click", onStartClick);
    listenersBound = false;
  }

  // --- Public API ---
  function start() {
    if (!resolveDom()) return; // step 10 DOM not present yet
    setupDPR();
    if (!resizeObserver && "ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(() => setupDPR());
      resizeObserver.observe(canvas);
    }
    best = loadBest();
    resetState();
    state = "idle";
    bindListeners();
    if (overlayMsg) overlayMsg.innerHTML = "Ayuda a Lana a esquivar las rosas espinosas 🌹 y los corazones rotos 💔";
    if (startBtn) startBtn.textContent = "Jugar 🎮";
    if (overlay) overlay.classList.remove("hidden");
    updateScoreUI();
    // Render once so the idle frame shows the cat & ground
    render(0);
  }

  function stop() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
    state = "idle";
    unbindListeners();
    if (resizeObserver) {
      try { resizeObserver.disconnect(); } catch (_) {}
      resizeObserver = null;
    }
  }

  function reset() {
    stop();
    start();
  }

  window.lanaGame = { start, stop, reset };

  // If step 10 is already active at load (rare), boot immediately
  document.addEventListener("DOMContentLoaded", () => {
    const s10 = document.getElementById("step10");
    if (s10 && s10.classList.contains("active")) start();
  });
})();

// ─── Settings Modal & Share Button ───
(function() {
  const modal = document.getElementById("settingsModal");
  const openBtn = document.getElementById("openSettings");
  const closeBtn = document.getElementById("closeSettings");
  const backdrop = document.getElementById("settingsBackdrop");
  const shareBtn = document.getElementById("shareBtn");

  function openModal() {
    if (!modal) return;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }

  openBtn?.addEventListener("click", openModal);
  closeBtn?.addEventListener("click", closeModal);
  backdrop?.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal?.classList.contains("open")) closeModal();
  });

  shareBtn?.addEventListener("click", async () => {
    const shareData = {
      title: "Para mi mandarinita 💖",
      text: "Una sorpresa hecha con amor",
      url: location.href
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(location.href);
        const orig = shareBtn.textContent;
        shareBtn.textContent = "¡Copiado! 📋";
        setTimeout(() => (shareBtn.textContent = orig), 1500);
      }
    } catch (_) { /* user cancelled */ }
  });
})();

// ════════════════════════════════════════════════════════
// MINI-GAMES (steps 12–15)
// Each game is its own IIFE exposing window.<name>.{start, stop}
// ════════════════════════════════════════════════════════

const _gamesReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ─── Game 1: Memory Match (step 12) ───────────────────────
(function () {
  const PAIRS = ["💖", "🌹", "🐱", "🎮", "✨", "🍰"];
  let grid, statusEl, step12;
  let cards = [];      // {el, value, flipped, matched}
  let first = null, second = null;
  let lock = false;
  let moves = 0;
  let matchedCount = 0;
  let mounted = false;

  function resolveDom() {
    grid = document.getElementById("memoryGrid");
    step12 = document.getElementById("step12");
    if (!grid) return false;
    // status line lives just below the grid; create lazily once
    statusEl = step12.querySelector(".memory-status");
    if (!statusEl) {
      statusEl = document.createElement("p");
      statusEl.className = "memory-status";
      grid.insertAdjacentElement("afterend", statusEl);
    }
    return true;
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function updateStatus() {
    if (!statusEl) return;
    if (matchedCount === PAIRS.length) {
      statusEl.innerHTML = `<span class="memory-win">¡Lo lograste! 🎉 con ${moves} movimientos</span><button type="button" class="memory-restart">Otra vez 🔁</button>`;
      statusEl.querySelector(".memory-restart")?.addEventListener("click", build);
    } else {
      statusEl.textContent = `Movimientos: ${moves}`;
    }
  }

  function onCardClick(card) {
    if (lock || card.flipped || card.matched) return;
    card.flipped = true;
    card.el.classList.add("flipped");
    if (!first) {
      first = card;
      return;
    }
    second = card;
    moves++;
    updateStatus();
    if (first.value === second.value) {
      first.matched = second.matched = true;
      first.el.classList.add("matched");
      second.el.classList.add("matched");
      matchedCount++;
      first = second = null;
      updateStatus();
    } else {
      lock = true;
      const a = first, b = second;
      first = second = null;
      setTimeout(() => {
        a.flipped = b.flipped = false;
        a.el.classList.remove("flipped");
        b.el.classList.remove("flipped");
        lock = false;
      }, 800);
    }
  }

  function build() {
    if (!resolveDom()) return;
    grid.innerHTML = "";
    cards = [];
    first = second = null;
    lock = false;
    moves = 0;
    matchedCount = 0;
    const deck = shuffle([...PAIRS, ...PAIRS]);
    for (const value of deck) {
      const el = document.createElement("button");
      el.type = "button";
      el.className = "memory-card";
      el.setAttribute("aria-label", "Carta de memoria");
      el.innerHTML = `<span class="memory-face memory-back">?</span><span class="memory-face memory-front">${value}</span>`;
      const card = { el, value, flipped: false, matched: false };
      el.addEventListener("click", () => onCardClick(card));
      grid.appendChild(el);
      cards.push(card);
    }
    updateStatus();
  }

  function start() {
    if (!resolveDom()) return;
    build();
    mounted = true;
  }
  function stop() {
    // Nothing continuous to clean up; reset on next entry.
    mounted = false;
  }

  window.memoryGame = { start, stop };
})();

// ─── Game 2: Atrapa Corazones (step 13) ───────────────────
(function () {
  const LOGICAL_W = 600;
  const LOGICAL_H = 400;
  const BEST_KEY = "catchBestScore";

  let canvas, ctx, scoreEl, livesEl, overlay, overlayMsg, startBtn, step13;
  let rafId = null, lastTs = 0;
  let state = "idle"; // idle | running | gameover
  let basketX = 300, items = [], score = 0, lives = 3, spawnTimer = 0, spawnInterval = 0.9, speedMul = 1, best = 0;
  let listenersBound = false, resizeObserver = null;

  function resolveDom() {
    canvas = document.getElementById("catchCanvas");
    scoreEl = document.getElementById("catchScore");
    livesEl = document.getElementById("catchLives");
    overlay = document.getElementById("catchOverlay");
    overlayMsg = document.getElementById("catchOverlayMsg");
    startBtn = document.getElementById("catchStartBtn");
    step13 = document.getElementById("step13");
    if (canvas) ctx = canvas.getContext("2d");
    return !!(canvas && ctx && overlay && startBtn);
  }

  function setupDPR() {
    if (!canvas || !ctx) return;
    const rect = canvas.getBoundingClientRect();
    const cssW = rect.width || LOGICAL_W;
    const cssH = rect.height || LOGICAL_H;
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const newW = Math.max(1, Math.round(cssW * dpr));
    const newH = Math.max(1, Math.round(cssH * dpr));
    if (canvas.width !== newW) canvas.width = newW;
    if (canvas.height !== newH) canvas.height = newH;
    ctx.setTransform(newW / LOGICAL_W, 0, 0, newH / LOGICAL_H, 0, 0);
    if (state !== "running") render();
  }

  function loadBest() {
    const v = parseInt(localStorage.getItem(BEST_KEY) || "0", 10);
    return Number.isFinite(v) ? v : 0;
  }

  function resetState() {
    basketX = LOGICAL_W / 2;
    items = [];
    score = 0;
    lives = 3;
    spawnTimer = 0;
    spawnInterval = 0.9;
    speedMul = 1;
  }

  function updateHUD() {
    if (scoreEl) scoreEl.textContent = String(score);
    if (livesEl) livesEl.textContent = String(lives);
  }

  function spawnItem() {
    const isGood = Math.random() < 0.78;
    items.push({
      x: 30 + Math.random() * (LOGICAL_W - 60),
      y: -30,
      vy: (140 + Math.random() * 90) * speedMul,
      type: isGood ? "heart" : "broken",
      size: 28,
      rot: (Math.random() - 0.5) * 0.5,
    });
  }

  function drawBasket() {
    const w = 96, h = 38;
    const x = basketX - w / 2;
    const y = LOGICAL_H - h - 10;
    // Body
    ctx.fillStyle = "#ff4d6d";
    ctx.beginPath();
    ctx.moveTo(x, y + 4);
    ctx.lineTo(x + w, y + 4);
    ctx.lineTo(x + w - 8, y + h);
    ctx.lineTo(x + 8, y + h);
    ctx.closePath();
    ctx.fill();
    // Rim
    ctx.fillStyle = "#ff8fa3";
    ctx.fillRect(x - 4, y, w + 8, 8);
    // Weave lines
    ctx.strokeStyle = "rgba(255,255,255,0.35)";
    ctx.lineWidth = 1.2;
    for (let i = 1; i < 5; i++) {
      const lx = x + (w * i) / 5;
      ctx.beginPath();
      ctx.moveTo(lx, y + 4);
      ctx.lineTo(lx - 3, y + h);
      ctx.stroke();
    }
  }

  function drawItem(o) {
    ctx.save();
    ctx.translate(o.x, o.y);
    ctx.rotate(o.rot);
    ctx.font = `${o.size}px serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(o.type === "heart" ? "💕" : "💔", 0, 0);
    ctx.restore();
  }

  function render() {
    if (!ctx) return;
    // Background
    ctx.clearRect(0, 0, LOGICAL_W, LOGICAL_H);
    const g = ctx.createLinearGradient(0, 0, 0, LOGICAL_H);
    g.addColorStop(0, "rgba(255, 245, 248, 0.5)");
    g.addColorStop(1, "rgba(255, 229, 236, 0.5)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, LOGICAL_W, LOGICAL_H);
    for (const o of items) drawItem(o);
    drawBasket();
  }

  function tick(ts) {
    if (state !== "running") return;
    if (!lastTs) lastTs = ts;
    let dt = (ts - lastTs) / 1000;
    if (dt > 0.05) dt = 0.05;
    lastTs = ts;

    speedMul = Math.min(2.2, 1 + score * 0.02);
    spawnInterval = Math.max(0.45, 0.95 - score * 0.015);

    spawnTimer += dt;
    if (spawnTimer >= spawnInterval) {
      spawnTimer = 0;
      spawnItem();
    }

    for (const o of items) {
      o.y += o.vy * dt;
      o.rot += dt * 0.6;
    }
    // Catch/miss
    const basketTop = LOGICAL_H - 48 - 10;
    const basketHalf = 48;
    for (let i = items.length - 1; i >= 0; i--) {
      const o = items[i];
      if (o.y >= basketTop && o.y <= basketTop + 38 && Math.abs(o.x - basketX) < basketHalf) {
        if (o.type === "heart") score += 1;
        else { lives -= 1; if (lives <= 0) { gameOver(); return; } }
        items.splice(i, 1);
      } else if (o.y > LOGICAL_H + 40) {
        // Off the bottom: missed hearts don't penalize, broken ones go free
        items.splice(i, 1);
      }
    }

    updateHUD();
    render();
    rafId = requestAnimationFrame(tick);
  }

  function begin() {
    resetState();
    state = "running";
    lastTs = 0;
    if (overlay) overlay.classList.add("hidden");
    updateHUD();
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(tick);
  }

  function gameOver() {
    state = "gameover";
    cancelAnimationFrame(rafId);
    rafId = null;
    const newRecord = score > best;
    if (newRecord) {
      best = score;
      try { localStorage.setItem(BEST_KEY, String(best)); } catch (_) {}
    }
    if (overlayMsg) {
      const head = newRecord ? "¡Récord! 🎉" : "💔 ¡Se acabó!";
      overlayMsg.innerHTML = `${head}<br><small>Puntos: ${score} · Mejor: ${best}</small>`;
    }
    if (startBtn) startBtn.textContent = "Otra vez 🔁";
    if (overlay) overlay.classList.remove("hidden");
  }

  function pointerToLogicalX(clientX) {
    const rect = canvas.getBoundingClientRect();
    const ratio = (clientX - rect.left) / rect.width;
    return Math.max(40, Math.min(LOGICAL_W - 40, ratio * LOGICAL_W));
  }

  function onMove(e) {
    if (state !== "running") return;
    if (e.touches && e.touches[0]) {
      if (e.cancelable) e.preventDefault();
      basketX = pointerToLogicalX(e.touches[0].clientX);
    } else {
      basketX = pointerToLogicalX(e.clientX);
    }
  }
  function onKey(e) {
    if (!step13 || !step13.classList.contains("active")) return;
    if (e.code === "Space") {
      e.preventDefault();
      if (state !== "running") begin();
    } else if (state === "running") {
      if (e.code === "ArrowLeft") basketX = Math.max(40, basketX - 30);
      else if (e.code === "ArrowRight") basketX = Math.min(LOGICAL_W - 40, basketX + 30);
    }
  }
  function onStart() { begin(); }

  function bindListeners() {
    if (listenersBound || !canvas) return;
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("touchmove", onMove, { passive: false });
    canvas.addEventListener("touchstart", onMove, { passive: false });
    window.addEventListener("keydown", onKey);
    startBtn.addEventListener("click", onStart);
    listenersBound = true;
  }
  function unbindListeners() {
    if (!listenersBound) return;
    canvas?.removeEventListener("mousemove", onMove);
    canvas?.removeEventListener("touchmove", onMove);
    canvas?.removeEventListener("touchstart", onMove);
    window.removeEventListener("keydown", onKey);
    startBtn?.removeEventListener("click", onStart);
    listenersBound = false;
  }

  function start() {
    if (!resolveDom()) return;
    setupDPR();
    if (!resizeObserver && "ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(() => setupDPR());
      resizeObserver.observe(canvas);
    }
    best = loadBest();
    resetState();
    state = "idle";
    bindListeners();
    if (overlayMsg) overlayMsg.innerHTML = `Atrapa los 💕 y esquiva los 💔<br><small>Mejor: ${best}</small>`;
    if (startBtn) startBtn.textContent = "Jugar 🎮";
    if (overlay) overlay.classList.remove("hidden");
    updateHUD();
    render();
  }
  function stop() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
    state = "idle";
    unbindListeners();
    if (resizeObserver) { try { resizeObserver.disconnect(); } catch (_) {} resizeObserver = null; }
  }

  window.catchGame = { start, stop };
})();

// ─── Game 3: Bubble Pop (step 14) ─────────────────────────
(function () {
  const LOGICAL_W = 600;
  const LOGICAL_H = 400;
  const GAME_DURATION = 30;
  const BEST_KEY = "bubbleBestScore";

  let canvas, ctx, scoreEl, timeEl, overlay, overlayMsg, startBtn, step14;
  let rafId = null, lastTs = 0;
  let state = "idle";
  let bubbles = [], sparks = [], score = 0, timeLeft = 30, spawnTimer = 0, spawnInterval = 0.6, best = 0;
  let listenersBound = false, resizeObserver = null;

  function resolveDom() {
    canvas = document.getElementById("bubbleCanvas");
    scoreEl = document.getElementById("bubbleScore");
    timeEl = document.getElementById("bubbleTime");
    overlay = document.getElementById("bubbleOverlay");
    overlayMsg = document.getElementById("bubbleOverlayMsg");
    startBtn = document.getElementById("bubbleStartBtn");
    step14 = document.getElementById("step14");
    if (canvas) ctx = canvas.getContext("2d");
    return !!(canvas && ctx && overlay && startBtn);
  }

  function setupDPR() {
    if (!canvas || !ctx) return;
    const rect = canvas.getBoundingClientRect();
    const cssW = rect.width || LOGICAL_W;
    const cssH = rect.height || LOGICAL_H;
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const newW = Math.max(1, Math.round(cssW * dpr));
    const newH = Math.max(1, Math.round(cssH * dpr));
    if (canvas.width !== newW) canvas.width = newW;
    if (canvas.height !== newH) canvas.height = newH;
    ctx.setTransform(newW / LOGICAL_W, 0, 0, newH / LOGICAL_H, 0, 0);
    if (state !== "running") render();
  }

  function loadBest() {
    const v = parseInt(localStorage.getItem(BEST_KEY) || "0", 10);
    return Number.isFinite(v) ? v : 0;
  }

  function resetState() {
    bubbles = [];
    sparks = [];
    score = 0;
    timeLeft = GAME_DURATION;
    spawnTimer = 0;
    spawnInterval = 0.5;
  }

  function spawnBubble() {
    const r = 24 + Math.random() * 16;
    const isGood = Math.random() < 0.8;
    bubbles.push({
      x: r + Math.random() * (LOGICAL_W - r * 2),
      y: LOGICAL_H + r,
      r,
      vy: -(40 + Math.random() * 50),
      sway: Math.random() * Math.PI * 2,
      swaySpeed: 1 + Math.random() * 1.5,
      type: isGood ? "heart" : "skull",
    });
  }

  function drawBubble(b) {
    ctx.save();
    // Bubble body
    const grad = ctx.createRadialGradient(b.x - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.1, b.x, b.y, b.r);
    grad.addColorStop(0, "rgba(255, 255, 255, 0.85)");
    grad.addColorStop(0.6, "rgba(255, 200, 215, 0.45)");
    grad.addColorStop(1, "rgba(255, 141, 163, 0.55)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fill();
    // Highlight
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.beginPath();
    ctx.arc(b.x - b.r * 0.35, b.y - b.r * 0.35, b.r * 0.18, 0, Math.PI * 2);
    ctx.fill();
    // Icon inside
    ctx.font = `${Math.floor(b.r * 1.1)}px serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(b.type === "heart" ? "💕" : "💀", b.x, b.y);
    ctx.restore();
  }

  function drawSparks() {
    for (const s of sparks) {
      ctx.globalAlpha = s.life;
      ctx.fillStyle = s.color;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function render() {
    if (!ctx) return;
    ctx.clearRect(0, 0, LOGICAL_W, LOGICAL_H);
    const g = ctx.createLinearGradient(0, 0, 0, LOGICAL_H);
    g.addColorStop(0, "rgba(255, 245, 248, 0.5)");
    g.addColorStop(1, "rgba(255, 229, 236, 0.5)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, LOGICAL_W, LOGICAL_H);
    for (const b of bubbles) drawBubble(b);
    drawSparks();
  }

  function tick(ts) {
    if (state !== "running") return;
    if (!lastTs) lastTs = ts;
    let dt = (ts - lastTs) / 1000;
    if (dt > 0.05) dt = 0.05;
    lastTs = ts;

    timeLeft -= dt;
    if (timeEl) timeEl.textContent = String(Math.max(0, Math.ceil(timeLeft)));
    if (timeLeft <= 0) { gameOver(); return; }

    spawnTimer += dt;
    if (spawnTimer >= spawnInterval) {
      spawnTimer = 0;
      spawnBubble();
    }

    for (const b of bubbles) {
      b.sway += b.swaySpeed * dt;
      b.y += b.vy * dt;
      b.x += Math.sin(b.sway) * 18 * dt;
    }
    bubbles = bubbles.filter((b) => b.y + b.r > -20);

    for (const s of sparks) {
      s.x += s.vx * dt;
      s.y += s.vy * dt;
      s.life -= dt * 1.6;
    }
    sparks = sparks.filter((s) => s.life > 0);

    if (scoreEl) scoreEl.textContent = String(score);
    render();
    rafId = requestAnimationFrame(tick);
  }

  function spawnPopSparkle(x, y, good) {
    if (_gamesReducedMotion) return;
    const color = good ? "#ff4d6d" : "#888";
    for (let i = 0; i < 8; i++) {
      const a = Math.random() * Math.PI * 2;
      const sp = 60 + Math.random() * 80;
      sparks.push({
        x, y,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp,
        r: 2 + Math.random() * 2,
        life: 1,
        color,
      });
    }
  }

  function handleTap(clientX, clientY) {
    if (state !== "running") return;
    const rect = canvas.getBoundingClientRect();
    const lx = ((clientX - rect.left) / rect.width) * LOGICAL_W;
    const ly = ((clientY - rect.top) / rect.height) * LOGICAL_H;
    // Topmost (latest) bubble wins
    for (let i = bubbles.length - 1; i >= 0; i--) {
      const b = bubbles[i];
      const dx = lx - b.x, dy = ly - b.y;
      if (dx * dx + dy * dy <= b.r * b.r) {
        const good = b.type === "heart";
        score += good ? 1 : -2;
        spawnPopSparkle(b.x, b.y, good);
        bubbles.splice(i, 1);
        return;
      }
    }
  }

  function begin() {
    resetState();
    state = "running";
    lastTs = 0;
    if (overlay) overlay.classList.add("hidden");
    if (scoreEl) scoreEl.textContent = "0";
    if (timeEl) timeEl.textContent = String(GAME_DURATION);
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(tick);
  }

  function gameOver() {
    state = "gameover";
    cancelAnimationFrame(rafId);
    rafId = null;
    const newRecord = score > best;
    if (newRecord) {
      best = score;
      try { localStorage.setItem(BEST_KEY, String(best)); } catch (_) {}
    }
    if (overlayMsg) {
      const head = newRecord ? "¡Récord! 🎉" : "⏰ ¡Tiempo!";
      overlayMsg.innerHTML = `${head}<br><small>Puntos: ${score} · Mejor: ${best}</small>`;
    }
    if (startBtn) startBtn.textContent = "Otra vez 🔁";
    if (overlay) overlay.classList.remove("hidden");
  }

  function onPointer(e) {
    if (e.cancelable) e.preventDefault();
    if (e.touches && e.touches[0]) handleTap(e.touches[0].clientX, e.touches[0].clientY);
    else handleTap(e.clientX, e.clientY);
  }
  function onKey(e) {
    if (!step14 || !step14.classList.contains("active")) return;
    if (e.code === "Space") {
      e.preventDefault();
      if (state !== "running") begin();
    }
  }
  function onStart() { begin(); }

  function bindListeners() {
    if (listenersBound || !canvas) return;
    canvas.addEventListener("mousedown", onPointer);
    canvas.addEventListener("touchstart", onPointer, { passive: false });
    window.addEventListener("keydown", onKey);
    startBtn.addEventListener("click", onStart);
    listenersBound = true;
  }
  function unbindListeners() {
    if (!listenersBound) return;
    canvas?.removeEventListener("mousedown", onPointer);
    canvas?.removeEventListener("touchstart", onPointer);
    window.removeEventListener("keydown", onKey);
    startBtn?.removeEventListener("click", onStart);
    listenersBound = false;
  }

  function start() {
    if (!resolveDom()) return;
    setupDPR();
    if (!resizeObserver && "ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(() => setupDPR());
      resizeObserver.observe(canvas);
    }
    best = loadBest();
    resetState();
    state = "idle";
    bindListeners();
    if (overlayMsg) overlayMsg.innerHTML = `Pincha las burbujas 💕 (evita las 💀)<br><small>30 segundos · Mejor: ${best}</small>`;
    if (startBtn) startBtn.textContent = "Jugar 🎮";
    if (overlay) overlay.classList.remove("hidden");
    if (scoreEl) scoreEl.textContent = "0";
    if (timeEl) timeEl.textContent = String(GAME_DURATION);
    render();
  }
  function stop() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
    state = "idle";
    unbindListeners();
    if (resizeObserver) { try { resizeObserver.disconnect(); } catch (_) {} resizeObserver = null; }
  }

  window.bubbleGame = { start, stop };
})();

// ─── Game 4: Alimenta a Lana (step 15) ────────────────────
(function () {
  const KEY = "lanaFeedHappiness";
  const COOLDOWN_MS = 2000;
  const DECAY_MS = 2000;

  let container, step15;
  let catArea, faceEl, moodLabel, barFill, barValue, snackBtn, cdSpan;
  let happiness = 30;
  let decayInterval = null;
  let cooldownEnd = 0;
  let cdRaf = null;
  let mounted = false;

  function loadSaved() {
    const v = parseInt(localStorage.getItem(KEY) || "30", 10);
    return Number.isFinite(v) ? Math.max(0, Math.min(100, v)) : 30;
  }
  function save() {
    try { localStorage.setItem(KEY, String(Math.round(happiness))); } catch (_) {}
  }

  function moodFor(h) {
    if (h <= 25) return { face: "😿", label: "hambrienta", mood: "hambrienta" };
    if (h <= 50) return { face: "😺", label: "tranquila", mood: "neutral" };
    if (h <= 75) return { face: "😻", label: "contenta", mood: "contenta" };
    return { face: "🥰", label: "enamorada", mood: "enamorada" };
  }

  function refresh() {
    if (!faceEl) return;
    const m = moodFor(happiness);
    faceEl.textContent = m.face;
    moodLabel.textContent = `Lana está ${m.label}`;
    catArea.setAttribute("data-mood", m.mood);
    const v = Math.round(happiness);
    barFill.style.width = `${v}%`;
    barValue.textContent = `${v}/100`;
  }

  function spawnParticle() {
    if (_gamesReducedMotion) return;
    const el = document.createElement("span");
    el.className = "feed-particle";
    el.textContent = ["💕", "💖", "✨"][Math.floor(Math.random() * 3)];
    const fx = (Math.random() - 0.5) * 80;
    const fy = -40 - Math.random() * 50;
    el.style.setProperty("--fx", `${fx}px`);
    el.style.setProperty("--fy", `${fy}px`);
    el.style.left = `${40 + Math.random() * 20}%`;
    el.style.top = "40%";
    catArea.appendChild(el);
    setTimeout(() => el.remove(), 1000);
  }

  function tickCooldown() {
    const remaining = cooldownEnd - Date.now();
    if (remaining <= 0) {
      snackBtn.disabled = false;
      snackBtn.innerHTML = "🍰 Galleta";
      cdRaf = null;
      return;
    }
    snackBtn.innerHTML = `🍰 Galleta <span class="feed-snack-cooldown">${(remaining / 1000).toFixed(1)}s</span>`;
    cdRaf = requestAnimationFrame(tickCooldown);
  }

  function feed() {
    if (Date.now() < cooldownEnd) return;
    const gain = 5 + Math.floor(Math.random() * 8); // 5..12
    happiness = Math.min(100, happiness + gain);
    save();
    refresh();
    catArea.classList.remove("bounce");
    // force reflow to restart animation
    void catArea.offsetWidth;
    catArea.classList.add("bounce");
    for (let i = 0; i < 5; i++) setTimeout(spawnParticle, i * 60);
    cooldownEnd = Date.now() + COOLDOWN_MS;
    snackBtn.disabled = true;
    if (cdRaf) cancelAnimationFrame(cdRaf);
    tickCooldown();
  }

  function build() {
    container.innerHTML = "";
    catArea = document.createElement("div");
    catArea.className = "feed-cat-area";
    catArea.innerHTML = `
      <span class="feed-cat-hearts" aria-hidden="true">💕💖💕</span>
      <span class="feed-cat-face">😺</span>
    `;
    container.appendChild(catArea);
    faceEl = catArea.querySelector(".feed-cat-face");

    moodLabel = document.createElement("p");
    moodLabel.className = "feed-mood-label";
    container.appendChild(moodLabel);

    const wrap = document.createElement("div");
    wrap.className = "feed-bar-wrap";
    wrap.innerHTML = `
      <div class="feed-bar-label"><span>Felicidad</span><span class="feed-bar-value">0/100</span></div>
      <div class="feed-bar-track"><div class="feed-bar-fill"></div></div>
    `;
    container.appendChild(wrap);
    barFill = wrap.querySelector(".feed-bar-fill");
    barValue = wrap.querySelector(".feed-bar-value");

    snackBtn = document.createElement("button");
    snackBtn.type = "button";
    snackBtn.className = "feed-snack-btn";
    snackBtn.innerHTML = "🍰 Galleta";
    snackBtn.addEventListener("click", feed);
    container.appendChild(snackBtn);
  }

  function resolveDom() {
    container = document.getElementById("feedContainer");
    step15 = document.getElementById("step15");
    return !!container;
  }

  function start() {
    if (!resolveDom()) return;
    if (!mounted) { build(); mounted = true; }
    happiness = loadSaved();
    refresh();
    // Decay loop
    if (decayInterval) clearInterval(decayInterval);
    decayInterval = setInterval(() => {
      if (happiness > 0) {
        happiness = Math.max(0, happiness - 1);
        save();
        refresh();
      }
    }, DECAY_MS);
  }
  function stop() {
    if (decayInterval) { clearInterval(decayInterval); decayInterval = null; }
    if (cdRaf) { cancelAnimationFrame(cdRaf); cdRaf = null; }
  }

  window.feedGame = { start, stop };
})();

// === CONTENT_JS_MARKER ===
// ─── Content (Storytelling) Modules ───

// Feature 1: Mensaje del día (step 16)
(function () {
  const MESSAGES = [
    "Hoy te amo más que ayer 💕",
    "Tu sonrisa rompe mi código de tipos 😅",
    "Eres mi favorita en Mondstadt 🌬️",
    "Voy a quererte hasta que se me agote la batería 🔋",
    "Eres la 'mandarinita' más dulce que existe 🍊",
    "Cada mensaje tuyo me alegra el día completo 💌",
    "Contigo, hasta los lunes saben a domingo ☀️",
    "Si fueras un personaje, serías 5 estrellas garantizado ⭐",
    "Tu risa es mi banda sonora favorita 🎶",
    "Eres prueba de que la suerte existe 🍀",
    "Te quiero en pixeles, en HD y en la vida real 📺",
    "Mi corazón hace lag cada vez que te veo 💗",
    "Eres la primary key de mi base de datos 🔑",
    "Te elegiría en cada timeline posible ✨",
    "Tus abrazos tienen 100% de uptime 🤗",
    "Eres mi build favorito en Genshin y en la vida 🌍",
    "Tu nombre es mi shortcut mental ⌨️",
    "Contigo todo es co-op, nunca solo 🎮",
    "Eres el commit más importante de mi historia 💾",
    "Me haces feliz sin esfuerzo, mandarinita 🍊",
    "Tu voz es mi notificación favorita 🔔",
    "Eres mi safe space en cualquier servidor 🛡️",
    "Te amo en latencia cero ⚡",
    "Mi cariño por ti no tiene cooldown 💞",
    "Eres el loot raro que nunca esperé encontrar 🎁",
    "Contigo aprendo a quererme mejor 💗",
    "Eres mi domingo por la tarde favorito ☕",
    "Tu mirada me hace stack overflow de feliz 💕",
    "Eres mi achievement principal 🏆",
    "Te quiero más que a mi ping bajo 📶",
    "Eres la razón de mi mejor sonrisa 😊",
    "Me caes increíble, todos los días 💖",
    "Eres mi café de la mañana sin café ☕",
    "Tu existencia ya me alegra el día 🌸",
    "Eres mi spawn point favorito 🌟",
    "Cuando estás cerca, todo se siente bonito 🌷",
    "Eres el patch note que mejoró mi vida 🔧",
    "Tu paciencia es legendaria, te amo por eso 💗",
    "Eres mi favorita en cualquier reroll 🎲",
    "Te quiero más que a un crit perfecto 💥",
    "Eres mi save game favorito 💾",
    "Contigo todo tiene más color 🎨",
    "Eres la canción que escucho en repeat 🎵",
    "Te amo aunque me ganes en todos los juegos 🎮",
    "Eres mi co-op de toda la vida 👫",
    "Me das ganas de ser mejor cada día 🌱",
    "Eres más bonita que un cielo en Sumeru 🌅",
    "Tu olor a mandarinita me cura 🍊",
    "Eres mi inventario más preciado 🎒",
    "Contigo gano aunque pierda 🏅",
    "Eres mi sunrise y mi sunset 🌄",
    "Te amo en formato vertical y horizontal 📱",
    "Eres el render principal de mi corazón 💖",
    "Cada día contigo es DLC gratis 🎮",
    "Eres mi favorita en este universo y en los paralelos 🌌",
    "Tu cariño es mi armadura más fuerte 🛡️",
    "Eres mi mañana, mi tarde y mi noche 🌙",
    "Te quiero en .txt, .png y en persona 📄",
    "Eres mi lugar seguro 🏡",
    "Contigo el tiempo se siente diferente, más bonito ⏳",
    "Eres mi razón favorita para abrir los ojos 👀",
    "Te amo con bug-free certainty 💯",
    "Eres la mandarinita de mi corazón para siempre 🍊💕",
    "Mi día empieza cuando pienso en ti 🌅",
    "Eres mi power-up favorito 🍄",
    "Contigo cada partida vale la pena 🎮",
  ];

  let dailyDateEl, dailyMsgEl;

  function dayOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = (date - start) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
    return Math.floor(diff / 86400000);
  }

  function formatDate(d) {
    const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    return `${dias[d.getDay()]}, ${d.getDate()} de ${meses[d.getMonth()]}`;
  }

  function resolveDom() {
    dailyDateEl = document.getElementById("dailyDate");
    dailyMsgEl = document.getElementById("dailyMsg");
    return !!(dailyDateEl && dailyMsgEl);
  }

  function start() {
    if (!resolveDom()) return;
    const now = new Date();
    const idx = dayOfYear(now) % MESSAGES.length;
    dailyDateEl.textContent = formatDate(now);
    dailyMsgEl.textContent = MESSAGES[idx];
    dailyMsgEl.classList.remove("visible");
    // Force reflow so the fade-in transition replays each time
    // eslint-disable-next-line no-unused-expressions
    void dailyMsgEl.offsetWidth;
    requestAnimationFrame(() => {
      dailyMsgEl.classList.add("visible");
    });
  }

  function stop() {
    if (!resolveDom()) return;
    dailyMsgEl.classList.remove("visible");
  }

  window.dailyMessage = { start, stop };
})();

// Feature 2: Razón al azar (step 17)
(function () {
  const REASONS = [
    "Porque cuando ríes, mi día se ilumina 🌞",
    "Porque te aguantas mis bromas malas 😂",
    "Porque eres mi compañera en Genshin y en la vida 🌍",
    "Porque tu nariz se arruga cuando piensas 🥺",
    "Porque me haces sentir en casa donde quiera que estemos 🏡",
    "Porque tu paciencia conmigo es infinita 💗",
    "Porque me robaste el corazón en silencio 💔→💖",
    "Porque tu sonrisa cura cualquier mal día ✨",
    "Porque hueles a mandarinita y eso me encanta 🍊",
    "Porque cantas aunque no te sepas la letra 🎤",
    "Porque tus mensajes me alegran a media noche 💌",
    "Porque sabes calmarme con una sola mirada 👀",
    "Porque me apoyas incluso cuando me equivoco 🤝",
    "Porque tu voz me trae paz 🕊️",
    "Porque me haces sentir suficiente tal como soy 💗",
    "Porque eres mi mejor compañera de aventuras 🗺️",
    "Porque me quieres con todo y mis manías 🤍",
    "Porque tu cariño no tiene horarios 🌙",
    "Porque te emocionan las cosas pequeñas 🌸",
    "Porque me haces reír hasta cuando estoy serio 😄",
    "Porque tus abrazos son mi lugar favorito 🤗",
    "Porque crees en mí cuando ni yo lo hago 💪",
    "Porque me eliges, otra vez, todos los días 💝",
    "Porque haces mejor cualquier momento 🌟",
    "Porque tu corazón es enorme y bonito 💖",
    "Porque me cuidas sin que tenga que pedirlo 🌷",
    "Porque eres más fuerte de lo que crees 🦋",
    "Porque tienes la ternura de Lana y la valentía de un dragón 🐉",
    "Porque pierdo la noción del tiempo contigo ⏳",
    "Porque tus 'buenos días' me hacen el día 🌅",
    "Porque tu manera de quererme es única ✨",
    "Porque tu risa es la melodía más bonita 🎶",
    "Porque me haces sentir orgulloso solo de estar a tu lado 🌟",
    "Porque eres mi calma en medio del ruido 🌊",
    "Porque amas con el alma entera 💞",
    "Porque tus ojos cuentan historias bonitas 👁️",
    "Porque pones empeño en todo lo que haces 🌱",
    "Porque me enseñas a amar mejor 💕",
    "Porque incluso enojada eres adorable 😤💗",
    "Porque me das paz en el caos 🌷",
    "Porque tu existencia me hace afortunado 🍀",
    "Porque sabes consolarme sin palabras 🤍",
    "Porque tu ternura es mi droga favorita 🥺",
    "Porque haces que ame los días normales 📅",
    "Porque jugar contigo siempre se siente como ganar 🎮",
    "Porque conmigo eres tú y eso lo es todo 🌸",
    "Porque tus besos son mejores que cualquier loot 💋",
    "Porque tu manera de pensar me inspira 💡",
    "Porque te preocupas por los detalles 🌹",
    "Porque mi corazón te eligió primero ❤️",
    "Porque tu existencia hace mejor a este mundo 🌍",
    "Porque me prometo amarte un poquito más cada día 💗",
    "Porque cuando duermes pareces un angelito 👼",
    "Porque eres mi razón y mi destino 💝",
  ];

  let reasonTextEl, reasonBtnEl;
  let lastIdx = -1;
  let count = 0;
  let bound = false;
  let fadeTimeout = null;

  function resolveDom() {
    reasonTextEl = document.getElementById("reasonText");
    reasonBtnEl = document.getElementById("reasonBtn");
    return !!(reasonTextEl && reasonBtnEl);
  }

  function pickNext() {
    if (REASONS.length <= 1) return 0;
    let idx = Math.floor(Math.random() * REASONS.length);
    while (idx === lastIdx) idx = Math.floor(Math.random() * REASONS.length);
    lastIdx = idx;
    return idx;
  }

  function showReason() {
    if (!reasonTextEl) return;
    const idx = pickNext();
    count++;
    reasonTextEl.classList.add("fading");
    if (fadeTimeout) clearTimeout(fadeTimeout);
    fadeTimeout = setTimeout(() => {
      reasonTextEl.innerHTML =
        `<div><span class="reason-counter">Razón N° ${count}</span>${REASONS[idx]}</div>`;
      reasonTextEl.classList.remove("fading");
      fadeTimeout = null;
    }, 320);
  }

  function onClick() {
    showReason();
  }

  function start() {
    if (!resolveDom()) return;
    count = 0;
    lastIdx = -1;
    if (fadeTimeout) { clearTimeout(fadeTimeout); fadeTimeout = null; }
    reasonTextEl.classList.remove("fading");
    reasonTextEl.innerHTML = "<div>Toca el botón para descubrir una razón 💕</div>";
    if (!bound) {
      reasonBtnEl.addEventListener("click", onClick);
      bound = true;
    }
  }

  function stop() {
    if (fadeTimeout) { clearTimeout(fadeTimeout); fadeTimeout = null; }
    if (!resolveDom()) return;
    if (bound) {
      reasonBtnEl.removeEventListener("click", onClick);
      bound = false;
    }
  }

  window.randomReason = { start, stop };
})();

// Feature 3: Carta tipeada (step 18)
(function () {
  const LETTER = [
    "Mandarinita 🍊,",
    "sé que a veces no encuentro las palabras correctas,",
    "pero hoy quiero intentarlo.",
    "",
    "Eres la primera persona en quien pienso al despertar",
    "y la última a la que sonrío antes de dormir.",
    "",
    "Cada partida, cada risa, cada mensaje tuyo...",
    "es la razón por la que mi mundo gira más bonito.",
    "",
    "Gracias por elegirme,",
    "por aguantarme,",
    "por amarme tal como soy.",
    "",
    "Te amo más de lo que las palabras pueden cargar.",
    "",
    "Tuyo siempre,",
    "Tu novio 💕",
  ].join("\n");

  const CLOSING = "\n\nCon todo mi corazón, para siempre.";
  const PUNCT = new Set([".", ",", ";", ":", "!", "?", "…"]);
  const CHAR_DELAY = 30;
  const PUNCT_DELAY = 200;

  let letterEl, replayBtnEl;
  let timeoutId = null;
  let typing = false;
  let charIdx = 0;
  let bound = false;

  function resolveDom() {
    letterEl = document.getElementById("letterContainer");
    replayBtnEl = document.getElementById("letterReplayBtn");
    return !!(letterEl && replayBtnEl);
  }

  function clearTimer() {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function render(text, withCursor) {
    if (!letterEl) return;
    const cursor = withCursor ? '<span class="letter-cursor" aria-hidden="true">|</span>' : "";
    letterEl.innerHTML = escapeHtml(text) + cursor;
  }

  function finalize() {
    typing = false;
    const fullText = LETTER + CLOSING;
    letterEl.innerHTML =
      escapeHtml(fullText) +
      '<span class="letter-rose" aria-hidden="true">🌹</span>' +
      '<span class="letter-skip-hint">Toca la carta o pulsa Repetir ✨</span>';
  }

  function tick() {
    if (!typing) return;
    if (charIdx >= LETTER.length) {
      finalize();
      return;
    }
    const ch = LETTER.charAt(charIdx);
    charIdx++;
    render(LETTER.slice(0, charIdx), true);
    const delay = PUNCT.has(ch) ? PUNCT_DELAY : CHAR_DELAY;
    timeoutId = setTimeout(tick, delay);
  }

  function skipToEnd() {
    if (!typing) return;
    clearTimer();
    charIdx = LETTER.length;
    finalize();
  }

  function startTyping() {
    if (!letterEl) return;
    clearTimer();
    typing = true;
    charIdx = 0;
    render("", true);
    timeoutId = setTimeout(tick, CHAR_DELAY);
  }

  function onLetterClick() {
    if (typing) {
      skipToEnd();
    } else {
      startTyping();
    }
  }
  function onReplayClick() {
    startTyping();
  }
  function onLetterKey(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onLetterClick();
    }
  }

  function start() {
    if (!resolveDom()) return;
    letterEl.setAttribute("role", "button");
    letterEl.setAttribute("tabindex", "0");
    letterEl.setAttribute("aria-label", "Carta de amor — toca para completar la animación");
    if (!bound) {
      letterEl.addEventListener("click", onLetterClick);
      letterEl.addEventListener("keydown", onLetterKey);
      replayBtnEl.addEventListener("click", onReplayClick);
      bound = true;
    }
    startTyping();
  }

  function stop() {
    clearTimer();
    typing = false;
    if (bound && letterEl && replayBtnEl) {
      letterEl.removeEventListener("click", onLetterClick);
      letterEl.removeEventListener("keydown", onLetterKey);
      replayBtnEl.removeEventListener("click", onReplayClick);
      bound = false;
    }
  }

  window.letterTyper = { start, stop };
})();

// Feature 4: Aventura — Choose Your Own Adventure (step 19)
(function () {
  const STORY = {
    start: {
      text: "Lana te invita a una aventura por un mundo mágico. Sus ojitos brillan: '¿Por dónde empezamos, mandarinita?' 🐱✨",
      choices: [
        { label: "Bosque de cerezos 🌸", next: "A" },
        { label: "Castillo flotante 🏰", next: "B" },
        { label: "Playa de cristales 🌊", next: "C" },
      ],
    },
    A: {
      text: "Caminas entre cerezos en flor. Pétalos rosados caen a tu alrededor como si el bosque celebrara tu llegada. 🌸",
      choices: [
        { label: "Recoger un pétalo 🌸", next: "endForest" },
        { label: "Bailar bajo el árbol 💃", next: "endDance" },
        { label: "Seguir a una luciérnaga 🌟", next: "endExtra2" },
      ],
    },
    B: {
      text: "Subes por escaleras hechas de luz. El viento susurra tu nombre y el castillo te recibe con campanas de cristal. 🏰",
      choices: [
        { label: "Sentarte en el trono 👑", next: "endCrown" },
        { label: "Mirar las estrellas ✨", next: "endStars" },
      ],
    },
    C: {
      text: "Llegas a una playa donde la arena es cristal y el mar canta tu nombre en olas suaves. 🌊",
      choices: [
        { label: "Tocar el mar 🐚", next: "endOcean" },
        { label: "Caminar hacia el horizonte 🌅", next: "endHorizon" },
        { label: "Hacer un castillo de arena 🏖️", next: "endExtra1" },
      ],
    },
    endForest: {
      ending: true,
      text: "Recoges el pétalo y se transforma en una llave dorada. Lana ronronea: 'Es la llave de mi corazón, y ya era tuya.'",
    },
    endDance: {
      ending: true,
      text: "Bailas con Lana bajo una lluvia de pétalos. El bosque entero late al ritmo de tu risa. Mientras tú existas, yo bailo.",
    },
    endCrown: {
      ending: true,
      text: "Te sientas en el trono y una corona de flores aparece sobre tu cabeza. Eres la reina de mi mundo, ayer, hoy y siempre.",
    },
    endStars: {
      ending: true,
      text: "Las estrellas se inclinan hacia ti y forman tu nombre en el cielo. Cada una promete cuidarte mientras yo no esté.",
    },
    endOcean: {
      ending: true,
      text: "El mar te entrega una perla con forma de corazón. 'Es la suma de todas mis emociones por ti', dice Lana.",
    },
    endHorizon: {
      ending: true,
      text: "Caminas hacia el horizonte y el sol pinta el cielo del color de tus mejillas. Te seguiría hasta el fin del mundo.",
    },
    endExtra1: {
      ending: true,
      text: "Construyes un castillo de arena y al alba se vuelve real. 'Mira', dice Lana, 'también puedes crear mundos con tus manos.'",
    },
    endExtra2: {
      ending: true,
      text: "La luciérnaga se posa en tu hombro y susurra: 'Donde tú estés, habrá luz.' Y el bosque entero se ilumina contigo.",
    },
  };

  const TOTAL_CHAPTERS = 3; // start -> mid -> ending

  let containerEl, restartBtnEl;
  let bound = false;
  let depth = 1;
  let fadeTimeout = null;

  function resolveDom() {
    containerEl = document.getElementById("adventureContainer");
    restartBtnEl = document.getElementById("adventureRestartBtn");
    return !!(containerEl && restartBtnEl);
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function renderNode(key) {
    const node = STORY[key];
    if (!node || !containerEl) return;

    containerEl.classList.add("fading");
    if (fadeTimeout) clearTimeout(fadeTimeout);

    fadeTimeout = setTimeout(() => {
      let html = "";

      if (node.ending) {
        html += `<div class="adventure-chapter">Final ${depth} / ${TOTAL_CHAPTERS}</div>`;
        html += `<div class="adventure-text">${escapeHtml(node.text)}</div>`;
        html += `<div class="adventure-ending">Te amo, mandarinita 💕</div>`;
        html += `<div class="adventure-choices">`;
        html += `<button type="button" class="btn btn-secondary adventure-choice" data-next="start">Volver al inicio 🔁</button>`;
        html += `</div>`;
      } else {
        html += `<div class="adventure-chapter">Capítulo ${depth} / ${TOTAL_CHAPTERS}</div>`;
        html += `<div class="adventure-text">${escapeHtml(node.text)}</div>`;
        html += `<div class="adventure-choices">`;
        for (const c of node.choices) {
          html += `<button type="button" class="btn btn-secondary adventure-choice" data-next="${escapeHtml(c.next)}">${escapeHtml(c.label)}</button>`;
        }
        html += `</div>`;
      }

      containerEl.innerHTML = html;
      containerEl.classList.remove("fading");

      containerEl.querySelectorAll(".adventure-choice").forEach((btn) => {
        btn.addEventListener("click", onChoiceClick);
      });
      fadeTimeout = null;
    }, 360);
  }

  function onChoiceClick(e) {
    const nextKey = e.currentTarget.getAttribute("data-next");
    if (!nextKey) return;
    if (nextKey === "start") {
      depth = 1;
    } else {
      depth = Math.min(TOTAL_CHAPTERS, depth + 1);
    }
    renderNode(nextKey);
  }

  function onRestart() {
    depth = 1;
    renderNode("start");
  }

  function start() {
    if (!resolveDom()) return;
    depth = 1;
    if (!bound) {
      restartBtnEl.addEventListener("click", onRestart);
      bound = true;
    }
    renderNode("start");
  }

  function stop() {
    if (fadeTimeout) { clearTimeout(fadeTimeout); fadeTimeout = null; }
    if (!resolveDom()) return;
    if (bound) {
      restartBtnEl.removeEventListener("click", onRestart);
      bound = false;
    }
    containerEl.innerHTML = "";
    depth = 1;
  }

  window.adventure = { start, stop };
})();

// ─── Widgets + Theme + Outfits + Seasonal/Birthday modes ───
// All key dates live here so they are easy to tweak later.
const DATES = {
  relationshipStart: "2025-10-08", // 8 de octubre del 2025 — nos hicimos novios
  herBirthday:       "2006-09-26", // 26 de septiembre — su cumple
  anniversary:       "2025-10-08", // mismo día que nos hicimos novios
  startedTalking:    "2025-09-25", // 25 de septiembre del 2025 — empezamos a hablar
  valentines:        { month: 2,  day: 14 }, // 14 feb
  christmas:         { month: 12, day: 25 }, // 25 dic
};

const widgetsPrefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ─── Widgets temporales (Step 20) ───
(function () {
  let timeInterval = null;
  let countdownInterval = null;
  let calendarOffset = 0; // months from current month for navigation

  function parseDate(str) {
    const [y, m, d] = str.split("-").map(Number);
    return new Date(y, m - 1, d);
  }

  function diffSince(startDate, now) {
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();
    let hours = now.getHours() - startDate.getHours();
    let minutes = now.getMinutes() - startDate.getMinutes();

    if (minutes < 0) { minutes += 60; hours -= 1; }
    if (hours < 0)   { hours   += 24; days  -= 1; }
    if (days < 0) {
      // borrow days from the previous month
      const prev = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prev.getDate();
      months -= 1;
    }
    if (months < 0) { months += 12; years -= 1; }

    return { years, months, days, hours, minutes };
  }

  function renderTimeTogether() {
    const box = document.getElementById("timeTogetherBox");
    if (!box) return;
    const start = parseDate(DATES.relationshipStart);
    const now = new Date();
    const d = diffSince(start, now);
    box.innerHTML = `
      <div class="widget-label">💖 Tiempo juntos</div>
      <div class="widget-value">
        Llevamos ${d.years} año${d.years === 1 ? "" : "s"},
        ${d.months} mes${d.months === 1 ? "" : "es"},
        ${d.days} día${d.days === 1 ? "" : "s"},<br>
        ${d.hours} hora${d.hours === 1 ? "" : "s"} y
        ${d.minutes} minuto${d.minutes === 1 ? "" : "s"} juntos 💕
      </div>
    `;
  }

  function nextSpecialDate(now) {
    const year = now.getFullYear();
    const candidates = [];
    const bday = parseDate(DATES.herBirthday);
    const anniv = parseDate(DATES.anniversary);
    const talk = parseDate(DATES.startedTalking);
    candidates.push({ name: "tu cumple",           emoji: "🎂", month: bday.getMonth() + 1,  day: bday.getDate() });
    candidates.push({ name: "nuestro aniversario", emoji: "💍", month: anniv.getMonth() + 1, day: anniv.getDate() });
    candidates.push({ name: "el día que empezamos a hablar", emoji: "💌", month: talk.getMonth() + 1, day: talk.getDate() });
    candidates.push({ name: "San Valentín",        emoji: "💝", month: DATES.valentines.month, day: DATES.valentines.day });
    candidates.push({ name: "Navidad",             emoji: "🎄", month: DATES.christmas.month,  day: DATES.christmas.day });

    let best = null;
    for (const c of candidates) {
      let target = new Date(year, c.month - 1, c.day, 0, 0, 0, 0);
      if (target.getTime() < now.getTime()) {
        target = new Date(year + 1, c.month - 1, c.day, 0, 0, 0, 0);
      }
      const delta = target.getTime() - now.getTime();
      if (!best || delta < best.delta) best = { ...c, target, delta };
    }
    return best;
  }

  function renderCountdown() {
    const box = document.getElementById("countdownBox");
    if (!box) return;
    const now = new Date();
    const ev = nextSpecialDate(now);
    if (!ev) return;
    const totalSec = Math.max(0, Math.floor(ev.delta / 1000));
    const days = Math.floor(totalSec / 86400);
    const hours = Math.floor((totalSec % 86400) / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    const seconds = totalSec % 60;
    box.innerHTML = `
      <div class="widget-label">${ev.emoji} Próxima fecha — ${ev.name}</div>
      <div class="widget-value">
        Faltan <strong>${days}</strong> día${days === 1 ? "" : "s"},
        <strong>${hours}</strong> h,
        <strong>${minutes}</strong> min,
        <strong>${seconds}</strong> s
      </div>
    `;
  }

  function specialDaysFor(year, month0) {
    const set = new Set();
    const bday = parseDate(DATES.herBirthday);
    const anniv = parseDate(DATES.anniversary);
    const talk = parseDate(DATES.startedTalking);
    if (bday.getMonth()  === month0) set.add(bday.getDate());
    if (anniv.getMonth() === month0) set.add(anniv.getDate());
    if (talk.getMonth()  === month0) set.add(talk.getDate());
    if (DATES.valentines.month - 1 === month0) set.add(DATES.valentines.day);
    if (DATES.christmas.month  - 1 === month0) set.add(DATES.christmas.day);
    return set;
  }

  function renderCalendar() {
    const box = document.getElementById("calendarBox");
    if (!box) return;
    const now = new Date();
    const viewDate = new Date(now.getFullYear(), now.getMonth() + calendarOffset, 1);
    const year = viewDate.getFullYear();
    const month0 = viewDate.getMonth();
    const monthNames = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    const daysInMonth = new Date(year, month0 + 1, 0).getDate();
    // Adjust so Monday = 0 ... Sunday = 6 (Spanish layout L M X J V S D)
    const jsFirstDay = new Date(year, month0, 1).getDay(); // 0 = Sunday
    const firstDay = (jsFirstDay + 6) % 7;

    const special = specialDaysFor(year, month0);
    const isCurrentMonth = (year === now.getFullYear() && month0 === now.getMonth());
    const todayDate = now.getDate();

    const cellArr = [];
    for (let i = 0; i < firstDay; i++) cellArr.push("<td></td>");
    for (let d = 1; d <= daysInMonth; d++) {
      const classes = [];
      if (isCurrentMonth && d === todayDate) classes.push("today");
      if (special.has(d)) classes.push("special");
      const cls = classes.length ? ` class="${classes.join(" ")}"` : "";
      cellArr.push(`<td${cls}>${d}</td>`);
    }
    while (cellArr.length % 7 !== 0) cellArr.push("<td></td>");

    let rows = "";
    for (let i = 0; i < cellArr.length; i += 7) {
      rows += "<tr>" + cellArr.slice(i, i + 7).join("") + "</tr>";
    }

    box.innerHTML = `
      <div class="cal-header">
        <button class="cal-nav" type="button" data-cal-dir="-1" aria-label="Mes anterior">‹</button>
        <span class="cal-title">${monthNames[month0]} ${year}</span>
        <button class="cal-nav" type="button" data-cal-dir="1" aria-label="Mes siguiente">›</button>
      </div>
      <table>
        <thead><tr>
          <th>L</th><th>M</th><th>X</th><th>J</th><th>V</th><th>S</th><th>D</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
    `;

    box.querySelectorAll(".cal-nav").forEach((btn) => {
      btn.addEventListener("click", () => {
        const dir = parseInt(btn.dataset.calDir, 10) || 0;
        calendarOffset += dir;
        renderCalendar();
      });
    });
  }

  function start() {
    renderTimeTogether();
    renderCountdown();
    renderCalendar();
    if (timeInterval) clearInterval(timeInterval);
    if (countdownInterval) clearInterval(countdownInterval);
    timeInterval = setInterval(renderTimeTogether, 60 * 1000);
    countdownInterval = setInterval(renderCountdown, 1000);
  }

  function stop() {
    if (timeInterval) { clearInterval(timeInterval); timeInterval = null; }
    if (countdownInterval) { clearInterval(countdownInterval); countdownInterval = null; }
  }

  window.widgets = { start, stop };
})();

// ─── Theme + Settings (dark mode, music, cursor, outfit) ───
(function () {
  const LS = {
    dark:    "darkMode",
    music:   "musicOn",
    cursor:  "heartCursor",
    outfit:  "lanaOutfit",
  };

  const darkToggle   = document.getElementById("toggleDarkMode");
  const musicToggle  = document.getElementById("toggleMusic");
  const cursorToggle = document.getElementById("toggleCursor");
  const outfitSelect = document.getElementById("selectOutfit");
  const catContainer = document.getElementById("cat");

  // ─── Dark mode ───
  function applyDarkMode(on) {
    document.body.classList.toggle("dark-mode", on);
  }
  function setDarkMode(on, persist = true) {
    applyDarkMode(on);
    if (persist) {
      try { localStorage.setItem(LS.dark, on ? "1" : "0"); } catch (_) {}
    }
    if (darkToggle) darkToggle.checked = on;
  }

  // ─── Heart cursor ───
  function applyCursor(on) {
    document.body.classList.toggle("custom-cursor", on);
  }
  function setCursor(on, persist = true) {
    applyCursor(on);
    if (persist) {
      try { localStorage.setItem(LS.cursor, on ? "1" : "0"); } catch (_) {}
    }
    if (cursorToggle) cursorToggle.checked = on;
  }

  // ─── Lana outfit ───
  const OUTFITS = ["default", "crown", "glasses", "party"];
  function applyOutfit(name) {
    if (!catContainer) return;
    OUTFITS.forEach((o) => catContainer.classList.remove("cat-outfit-" + o));
    if (OUTFITS.includes(name)) {
      catContainer.classList.add("cat-outfit-" + name);
    }
  }
  function setOutfit(name, persist = true) {
    if (!OUTFITS.includes(name)) name = "default";
    applyOutfit(name);
    if (persist) {
      try { localStorage.setItem(LS.outfit, name); } catch (_) {}
    }
    if (outfitSelect) outfitSelect.value = name;
  }

  // ─── Background music (Web Audio synth pad) ───
  let audioCtx = null;
  let masterGain = null;
  let oscNodes = [];
  let musicPlaying = false;

  function startMusic() {
    if (musicPlaying) return;
    if (widgetsPrefersReducedMotion) return; // honor reduced motion preference
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      audioCtx = audioCtx || new Ctx();
      if (audioCtx.state === "suspended") audioCtx.resume();
      masterGain = audioCtx.createGain();
      masterGain.gain.value = 0.0;
      masterGain.connect(audioCtx.destination);
      // gentle C-E-G chord (C4=261.63, E4=329.63, G4=392.00)
      const freqs = [261.63, 329.63, 392.0];
      oscNodes = freqs.map((f, i) => {
        const osc = audioCtx.createOscillator();
        osc.type = "sine";
        osc.frequency.value = f;
        const g = audioCtx.createGain();
        g.gain.value = 0.05;
        osc.connect(g).connect(masterGain);
        // gentle LFO for breathing pad effect
        const lfo = audioCtx.createOscillator();
        lfo.frequency.value = 0.1 + i * 0.05;
        const lfoGain = audioCtx.createGain();
        lfoGain.gain.value = 0.02;
        lfo.connect(lfoGain).connect(g.gain);
        lfo.start();
        osc.start();
        return { osc, lfo };
      });
      const now = audioCtx.currentTime;
      masterGain.gain.cancelScheduledValues(now);
      masterGain.gain.setValueAtTime(0.0, now);
      masterGain.gain.linearRampToValueAtTime(0.15, now + 1.5);
      musicPlaying = true;
    } catch (_) { /* ignore */ }
  }

  function stopMusic() {
    if (!musicPlaying || !audioCtx || !masterGain) {
      musicPlaying = false;
      return;
    }
    try {
      const now = audioCtx.currentTime;
      masterGain.gain.cancelScheduledValues(now);
      masterGain.gain.setValueAtTime(masterGain.gain.value, now);
      masterGain.gain.linearRampToValueAtTime(0.0, now + 0.8);
      const toStop = oscNodes.slice();
      setTimeout(() => {
        try {
          toStop.forEach(({ osc, lfo }) => { osc.stop(); lfo.stop(); });
        } catch (_) {}
      }, 900);
      oscNodes = [];
    } catch (_) {}
    musicPlaying = false;
  }

  function setMusic(on, persist = true) {
    if (on) startMusic(); else stopMusic();
    if (persist) {
      try { localStorage.setItem(LS.music, on ? "1" : "0"); } catch (_) {}
    }
    if (musicToggle) musicToggle.checked = on;
  }

  // ─── Wire up controls ───
  darkToggle?.addEventListener("change", (e) => setDarkMode(!!e.target.checked));
  cursorToggle?.addEventListener("change", (e) => setCursor(!!e.target.checked));
  outfitSelect?.addEventListener("change", (e) => setOutfit(e.target.value));
  musicToggle?.addEventListener("change", (e) => {
    // Checkbox click counts as user gesture for AudioContext.
    setMusic(!!e.target.checked);
  });

  // ─── Load persisted prefs on boot ───
  function loadPrefs() {
    try {
      const dark = localStorage.getItem(LS.dark) === "1";
      setDarkMode(dark, false);
    } catch (_) {}
    try {
      const cur = localStorage.getItem(LS.cursor) === "1";
      setCursor(cur, false);
    } catch (_) {}
    try {
      const o = localStorage.getItem(LS.outfit) || "default";
      setOutfit(o, false);
    } catch (_) {}
    try {
      const m = localStorage.getItem(LS.music) === "1";
      if (musicToggle) musicToggle.checked = m;
      if (m && !widgetsPrefersReducedMotion) {
        const tryStart = () => {
          startMusic();
          if (musicPlaying) {
            document.removeEventListener("click", tryStart);
            document.removeEventListener("keydown", tryStart);
            document.removeEventListener("touchstart", tryStart);
          }
        };
        startMusic();
        if (!musicPlaying) {
          document.addEventListener("click", tryStart);
          document.addEventListener("keydown", tryStart);
          document.addEventListener("touchstart", tryStart);
        }
      }
    } catch (_) {}
  }
  loadPrefs();

  window.themeSettings = { setDarkMode, setCursor, setOutfit, setMusic };
})();

// ─── Seasonal theme ───
(function () {
  const month = new Date().getMonth() + 1; // 1..12
  let seasonClass = "season-spring";
  let emoji = "🌸";
  if (month === 12 || month <= 2)     { seasonClass = "season-winter"; emoji = "❄️"; }
  else if (month >= 3 && month <= 5)  { seasonClass = "season-spring"; emoji = "🌸"; }
  else if (month >= 6 && month <= 8)  { seasonClass = "season-summer"; emoji = "☀️"; }
  else                                { seasonClass = "season-autumn"; emoji = "🍂"; }
  document.body.classList.add(seasonClass);

  if (widgetsPrefersReducedMotion) return;

  const overlay = document.createElement("div");
  overlay.className = "season-overlay";
  overlay.setAttribute("aria-hidden", "true");
  const COUNT = 10;
  for (let i = 0; i < COUNT; i++) {
    const f = document.createElement("span");
    f.className = "season-flake";
    f.textContent = emoji;
    f.style.left = (Math.random() * 100) + "vw";
    const duration = 12 + Math.random() * 14;
    f.style.animationDuration = duration + "s";
    f.style.animationDelay = (-Math.random() * duration) + "s";
    f.style.setProperty("--drift", ((Math.random() * 6) - 3) + "rem");
    f.style.fontSize = (0.9 + Math.random() * 1.2) + "rem";
    overlay.appendChild(f);
  }
  document.body.appendChild(overlay);
})();

// ─── Birthday / Anniversary mode ───
(function () {
  function todayMatches(dateStr) {
    const [, m, day] = dateStr.split("-").map(Number);
    const now = new Date();
    return (now.getMonth() + 1) === m && now.getDate() === day;
  }

  function showToast(text, durationMs = 5000) {
    const t = document.createElement("div");
    t.className = "celebrate-toast";
    t.setAttribute("role", "status");
    const span = document.createElement("span");
    span.textContent = text;
    t.appendChild(span);
    const close = document.createElement("button");
    close.type = "button";
    close.setAttribute("aria-label", "Cerrar");
    close.textContent = "✕";
    close.addEventListener("click", () => {
      t.classList.remove("show");
      setTimeout(() => t.remove(), 500);
    });
    t.appendChild(close);
    document.body.appendChild(t);
    requestAnimationFrame(() => t.classList.add("show"));
    setTimeout(() => {
      if (t.isConnected) {
        t.classList.remove("show");
        setTimeout(() => t.remove(), 500);
      }
    }, durationMs);
  }

  function celebrate(text, withConfetti, sessionKey) {
    if (sessionStorage.getItem(sessionKey) === "1") return;
    try { sessionStorage.setItem(sessionKey, "1"); } catch (_) {}
    showToast(text, 5500);
    if (withConfetti && typeof startSparkles === "function") {
      try { startSparkles(); } catch (_) {}
    }
    try {
      const catEl = document.getElementById("cat");
      if (catEl) {
        const prev = catEl.getAttribute("data-mood");
        catEl.setAttribute("data-mood", "excited");
        setTimeout(() => {
          if (prev) catEl.setAttribute("data-mood", prev);
          else catEl.removeAttribute("data-mood");
        }, 4000);
      }
    } catch (_) {}
  }

  const isBirthday    = todayMatches(DATES.herBirthday);
  const isAnniversary = todayMatches(DATES.anniversary);

  setTimeout(() => {
    if (isBirthday) {
      celebrate("🎂 ¡Feliz cumple, Mandarinita! 💖", true, "birthdayShown");
    } else if (isAnniversary) {
      celebrate("💍✨ Hoy es un día muy especial para nosotros 💖", true, "anniversaryShown");
    }
  }, 400);
})();

// ─── Wire widgets lifecycle into nextStep ───
(function () {
  if (typeof nextStep !== "function") return;
  const originalNextStep = nextStep;
  window.nextStep = function (id) {
    originalNextStep(id);
    if (window.widgets) {
      if (id === 20) window.widgets.start();
      else window.widgets.stop();
    }
  };
})();
