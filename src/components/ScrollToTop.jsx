import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSound } from "../context/SoundContext";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const { playResonance } = useSound();

  useEffect(() => {
    window.scrollTo(0, 0);
    playResonance();
  }, [pathname, playResonance]);

  return null;
}
