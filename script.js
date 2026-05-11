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

  // Lana game lifecycle
  if (window.lanaGame) {
    if (id === 10) window.lanaGame.start();
    else window.lanaGame.stop();
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
