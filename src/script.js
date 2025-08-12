function playSoundByKeycode(keyCode) {
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${keyCode}"]`);
  if (!audio || !key) return;

  key.classList.add("playing");

  try {
    audio.currentTime = 0;
    audio.play();
  } catch (err) {
    console.error("Playback failed:", err);
  }
}

function onKeyDown(e) {
  if (e.repeat) return;
  let keyCode = e.keyCode || (e.code && codeToKeyCode(e.code));
  playSoundByKeycode(keyCode);
}

function codeToKeyCode(code) {
  const map = {
    KeyA: 65,
    KeyS: 83,
    KeyD: 68,
    KeyF: 70,
    KeyG: 71,
    KeyH: 72,
    KeyJ: 74,
    KeyK: 75,
    KeyL: 76,
  };
  return map[code];
}

function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("playing");
}

function onPointerDown(e) {
  const keyEl = e.currentTarget;
  const keyCode = keyEl.dataset.key;
  playSoundByKeycode(keyCode);
  keyEl.focus();
}

function setupVolume() {
  const vol = document.getElementById("volume");
  const muteBtn = document.getElementById("mute");
  const audios = Array.from(document.querySelectorAll("audio"));

  function applyVolume() {
    const muted = muteBtn.getAttribute("aria-pressed") === "true";
    const v = muted ? 0 : parseFloat(vol.value);
    audios.forEach((a) => (a.volume = v));
  }

  vol.addEventListener("input", applyVolume);
  muteBtn.addEventListener("click", () => {
    const next = muteBtn.getAttribute("aria-pressed") !== "true";
    muteBtn.setAttribute("aria-pressed", String(next));
    applyVolume();
  });

  applyVolume();
}

function init() {
  const keys = document.querySelectorAll(".key");
  keys.forEach((k) => {
    k.addEventListener("transitionend", removeTransition);
    k.addEventListener("pointerdown", onPointerDown);

    k.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onPointerDown({ currentTarget: k });
      }
    });
  });

  window.addEventListener("keydown", onKeyDown);
  setupVolume();
}

document.addEventListener("DOMContentLoaded", init);
