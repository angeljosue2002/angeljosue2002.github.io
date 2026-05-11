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
  step.classList.add("active");
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
  } else {
    setMood(""); // Default happy/normal
  }
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
