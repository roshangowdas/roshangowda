/**
 * Web Audio API Tactile Sound Engine
 *
 * Synthesizes zero-latency, realistic mechanical/tactile click sound effects
 * directly in the browser without requiring external audio asset downloads.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;

  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }

  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }

  return audioCtx;
}

/**
 * Plays a tactile, futuristic micro-switch click sound
 * Engineered with a fast frequency transient and filtered mechanical snap
 */
export function playCursorClickSound(volume = 0.14): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Master Gain Node
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(volume, now);
    masterGain.connect(ctx.destination);

    // Layer 1: High transient "tick" tone (Fast pitch drop)
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();

    // Subtle pitch variation (+/- 4%) for organic tactile feel on rapid clicks
    const pitchJitter = 1 + (Math.random() - 0.5) * 0.08;
    const startFreq = 1850 * pitchJitter;

    osc.type = "sine";
    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(340, now + 0.025);

    oscGain.gain.setValueAtTime(1, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

    osc.connect(oscGain);
    oscGain.connect(masterGain);

    // Layer 2: Tactile Mechanical Snap (Bandpass-filtered noise)
    const sampleRate = ctx.sampleRate;
    const bufferSize = Math.floor(sampleRate * 0.012); // 12ms transient
    const noiseBuffer = ctx.createBuffer(1, bufferSize, sampleRate);
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(2600 * pitchJitter, now);
    filter.Q.setValueAtTime(3.2, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.75, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.014);

    whiteNoise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(masterGain);

    osc.start(now);
    osc.stop(now + 0.026);
    whiteNoise.start(now);
    whiteNoise.stop(now + 0.016);
  } catch {
    // Graceful fallback if audio device is unavailable
  }
}

