let audioCtx = null;
let isMuted = JSON.parse(localStorage.getItem("aegis_sfx_muted") || "false");

export function initAudioEngine() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
}

export function resumeAudioContext() {
  initAudioEngine();
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
}

export function toggleMute() {
  isMuted = !isMuted;
  localStorage.setItem("aegis_sfx_muted", JSON.stringify(isMuted));
  return isMuted;
}

export function getIsMuted() {
  return isMuted;
}

export function playBlip() {
  if (isMuted || !audioCtx) return;
  resumeAudioContext();
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(800, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(
      400,
      audioCtx.currentTime + 0.08,
    );
    gain.gain.setValueAtTime(0, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 0.02);
    gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.08);
  } catch (e) {
    console.error(e);
  }
}

export function playClick() {
  if (isMuted || !audioCtx) return;
  resumeAudioContext();
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(480, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(
      880,
      audioCtx.currentTime + 0.09,
    );
    gain.gain.setValueAtTime(0, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.25, audioCtx.currentTime + 0.01);
    gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.09);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.09);
  } catch (e) {
    console.error(e);
  }
}

export function playAlert() {
  if (isMuted || !audioCtx) return;
  resumeAudioContext();
  try {
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc1.type = "square";
    osc1.frequency.setValueAtTime(440, audioCtx.currentTime);
    osc2.type = "square";
    osc2.frequency.setValueAtTime(880, audioCtx.currentTime);

    gain.gain.setValueAtTime(0, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.05);
    gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.22);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(audioCtx.destination);

    osc1.start();
    osc2.start();
    osc1.stop(audioCtx.currentTime + 0.22);
    osc2.stop(audioCtx.currentTime + 0.22);
  } catch (e) {
    console.error(e);
  }
}

export function playHover() {
  if (isMuted || !audioCtx) return;
  resumeAudioContext();
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(320, audioCtx.currentTime);
    gain.gain.setValueAtTime(0, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.12, audioCtx.currentTime + 0.02);
    gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.035);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.035);
  } catch (e) {
    console.error(e);
  }
}

export function playResonance() {
  if (isMuted || !audioCtx) return;
  resumeAudioContext();
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(150, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 0.4);
    gain.gain.setValueAtTime(0, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 0.1);
    gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.4);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.4);
  } catch (e) {
    console.error(e);
  }
}
