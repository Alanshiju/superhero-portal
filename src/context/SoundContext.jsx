import React, { createContext, useContext, useState, useEffect } from "react";
import {
  resumeAudioContext,
  toggleMute,
  getIsMuted,
  playBlip,
  playAlert,
  playHover,
  playClick,
  playResonance,
} from "../utils/audio";

const SoundContext = createContext();

export function SoundProvider({ children }) {
  const [sfxEnabled, setSfxEnabled] = useState(!getIsMuted());

  // Listen to window interaction to resume AudioContext
  useEffect(() => {
    const handleInteraction = () => {
      resumeAudioContext();
    };
    window.addEventListener("click", handleInteraction, { once: true });
    window.addEventListener("keydown", handleInteraction, { once: true });
    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };
  }, []);

  const toggleSfx = () => {
    resumeAudioContext();
    const muted = toggleMute();
    setSfxEnabled(!muted);
  };

  const initAudio = () => {
    resumeAudioContext();
  };

  return (
    <SoundContext.Provider
      value={{
        sfxEnabled,
        toggleSfx,
        playHover,
        playMessage: playBlip,
        playAlert,
        playClick,
        playResonance,
        initAudio,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error("useSound must be used within a SoundProvider");
  }
  return context;
}
