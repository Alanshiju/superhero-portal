import { Link } from "react-router-dom";
import HeroAvatar from "./HeroAvatar";
import { useSound } from "../context/SoundContext";

export default function HeroSection() {
  const { playHover, playClick } = useSound();

  return (
    <section className="relative pt-12 pb-12 overflow-hidden flex flex-col items-center">
      <div className="mb-6 w-full flex justify-center">
        <HeroAvatar className="w-24 h-24 md:w-32 md:h-32 shadow-[0_0_20px_rgba(6,182,212,0.5)] rounded-full" />
      </div>
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-600 dark:from-cyan-400 dark:to-blue-600 mb-6 tracking-tight">
          AEGIS
        </h1>
        <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
          The Kinetic Guardian. When all shields fall, Aegis stands.
        </p>

        {/* Lore & Stats Card - Now supports Light Mode */}
        <div className="bg-white/80 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-6 mb-10 text-left max-w-3xl mx-auto backdrop-blur-sm shadow-xl dark:shadow-none">
          <h3 className="text-blue-800 dark:text-cyan-400 font-bold text-lg mb-2">
            Origin Designation: Dr. Alexander Vance (Project Kinetic-0)
          </h3>
          <p className="text-slate-700 dark:text-slate-400 mb-4 text-sm leading-relaxed">
            Exposed to a runaway sub-atomic containment collapse during Project
            Kinetic-0, Dr. Vance's physical form dissolved into a localized
            electromagnetic field. He now manipulates kinetic dispersion
            vectors, absorbs impacts, and senses global distress frequencies as
            "The Kinetic Shield".
          </p>
          <div className="flex flex-wrap gap-4 text-xs font-mono">
            <span className="bg-blue-100 dark:bg-cyan-950 text-blue-800 dark:text-cyan-400 px-3 py-1 rounded-full border border-blue-200 dark:border-cyan-800">
              Kinetic Dispersion: 99.8%
            </span>
            <span className="bg-slate-100 dark:bg-blue-950 text-slate-800 dark:text-blue-400 px-3 py-1 rounded-full border border-slate-300 dark:border-blue-800">
              Threat Interception: Instant
            </span>
          </div>
        </div>

        <Link
          to="/dispatch"
          onMouseEnter={playHover}
          onClick={playClick}
          className="inline-block bg-blue-600 dark:bg-cyan-600 hover:bg-blue-700 dark:hover:bg-cyan-500 text-white dark:text-slate-950 font-bold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-[0_10px_20px_rgba(37,99,235,0.2)] dark:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
        >
          Request Immediate Assistance
        </Link>
      </div>
    </section>
  );
}
