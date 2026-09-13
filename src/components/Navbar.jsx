import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Shield,
  Sun,
  Moon,
  Radar,
  MessageSquare,
  Map,
  Beaker,
  Volume2,
  VolumeX,
  Zap,
  WifiOff,
  Menu,
  X,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useSound } from "../context/SoundContext";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const NAV_LINKS = [
  { path: "/", label: "Base", icon: Shield },
  { path: "/dispatch", label: "Dispatch", icon: MessageSquare },
  { path: "/intel", label: "Intel", icon: Radar },
  { path: "/operations", label: "Operations", icon: Map },
  { path: "/lab", label: "Lab", icon: Beaker },
];

const INCIDENTS = [
  "[RESOLVED 2m ago] Structural stabilization at Sector 07",
  "[ACTIVE] Monitoring seismic anomaly at Sector 14",
  "[SHIELD DEPLOYED] Transit core preserved.",
  "[DISPATCH] Aegis intercept units en route to Grid 12",
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { sfxEnabled, toggleSfx, initAudio, playHover, playClick, playAlert } =
    useSound();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [beaconStatus, setBeaconStatus] = useState("idle");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // idle, locating, active

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleNavClick = () => {
    initAudio();
    playClick();
  };

  const triggerRapidBeacon = () => {
    playClick();
    if (!navigator.geolocation) {
      toast.error(
        "SENSOR FAULT: Geolocation is not supported by your browser.",
      );
      return;
    }

    setBeaconStatus("locating");
    toast.warn("BEACON ENGAGED: Triangulating GPS coordinates...");

    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = `${position.coords.latitude}, ${position.coords.longitude}`;
          playAlert();
          toast.success(
            "COORDINATES LOCKED: Priority alert dispatched to Aegis Grid.",
          );

          // Flash viewport amber/cyan via body class
          document.body.classList.add(
            "animate-[flashEmergency_2s_ease-in-out_infinite]",
          );

          const templateParams = {
            name: "UNKNOWN CITIZEN (RAPID BEACON)",
            age: "N/A",
            location: coords,
            email: "N/A",
            grievance: "CRITICAL PRIORITY: Rapid Beacon Triangulated.",
            submission_date: new Date().toLocaleString(),
            subject: "CRITICAL PRIORITY: Rapid Beacon Triangulated",
          };

          emailjs
            .send(
              import.meta.env.VITE_SERVICE_ID || "test_service",
              import.meta.env.VITE_TEMPLATE_ID || "test_template",
              templateParams,
              import.meta.env.VITE_PUBLIC_KEY || "test_key",
            )
            .catch(console.error);

          setBeaconStatus("active");

          // Remove flashing after 10s
          setTimeout(() => {
            document.body.classList.remove(
              "animate-[flashEmergency_2s_ease-in-out_infinite]",
            );
          }, 10000);
        },
        (err) => {
          console.error(err);
          setBeaconStatus("idle");
          toast.error(
            "SENSOR FAULT: Location access denied. Manual dispatch required.",
          );
        },
      );
    } catch (err) {
      console.error(err);
      setBeaconStatus("idle");
      toast.error("SENSOR FAULT: Geolocation failed unexpectedly.");
    }
  };

  return (
    <>
      {beaconStatus === "active" && (
        <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center bg-red-900/20 backdrop-blur-sm animate-pulse">
          <div className="bg-red-950 border border-red-500 text-red-50 p-8 rounded-xl shadow-[0_0_50px_rgba(239,68,68,0.5)] text-center max-w-lg">
            <Zap className="w-16 h-16 text-red-500 mx-auto mb-4 animate-bounce" />
            <h2 className="text-2xl font-bold font-mono mb-2">
              EMERGENCY BEACON ACTIVE
            </h2>
            <p className="font-mono text-sm text-red-200">
              Stand by, kinetic dampener dispatching to your exact coordinates.
            </p>
            <button
              onClick={() => setBeaconStatus("idle")}
              className="mt-6 pointer-events-auto bg-slate-900 text-white px-4 py-2 rounded text-xs hover:bg-slate-800"
            >
              DISMISS
            </button>
          </div>
        </div>
      )}

      <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 dark:bg-slate-950/70 border-b border-slate-300 dark:border-cyan-500/30 dark:border-cyan-500/30 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand */}
            <NavLink
              to="/"
              onClick={handleNavClick}
              onMouseEnter={playHover}
              className="flex-shrink-0 flex items-center gap-2 group"
            >
              <Shield className="h-8 w-8 text-blue-700 dark:text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="font-mono font-bold text-xl tracking-wider text-slate-900 dark:text-white uppercase">
                Aegis
                <span className="text-blue-700 dark:text-cyan-400">_Sys</span>
              </span>
            </NavLink>

            {/* Links */}
            <div className="hidden md:flex">
              <div className="ml-10 flex items-baseline space-x-4">
                {NAV_LINKS.map((link) => {
                  const Icon = link.icon;
                  return (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      onClick={handleNavClick}
                      onMouseEnter={playHover}
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium font-mono uppercase tracking-wide transition-colors ${
                          isActive
                            ? "bg-blue-100 dark:bg-cyan-500/10 text-blue-800 dark:text-cyan-400 border border-slate-300 dark:border-cyan-500/30 font-bold"
                            : "text-slate-600 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 hover:text-blue-700 dark:hover:text-cyan-400 dark:hover:text-cyan-400"
                        }`
                      }
                    >
                      <Icon className="h-4 w-4" />
                      {link.label}
                    </NavLink>
                  );
                })}
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden p-2 rounded-full text-slate-700 dark:text-cyan-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors focus:outline-none"
                onClick={() => {
                  playClick();
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }}
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
              <button
                onClick={triggerRapidBeacon}
                onMouseEnter={playHover}
                className="hidden md:flex items-center gap-1 bg-red-600/10 hover:bg-red-600/20 border border-red-500/50 text-red-600 dark:text-red-400 px-3 py-1 rounded text-xs font-bold font-mono tracking-widest transition-colors animate-pulse hover:animate-none"
              >
                <Zap className="w-3 h-3" />
                <span className="hidden sm:inline">
                  {beaconStatus === "locating" ? "LOCATING..." : "RAPID BEACON"}
                </span>
              </button>

              <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/50 dark:bg-slate-800/50 border border-slate-400/50 dark:border-slate-700/50">
                {isOnline ? (
                  <>
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-[10px] font-mono text-slate-600 dark:text-slate-300 tracking-widest">
                      SYS_ONLINE
                    </span>
                  </>
                ) : (
                  <>
                    <WifiOff className="w-3 h-3 text-red-500" />
                    <span className="text-[10px] font-mono text-red-500 tracking-widest">
                      OFFLINE_MODE - QUEUING DISTRESS
                    </span>
                  </>
                )}
              </div>

              <button
                className="hidden md:block p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-cyan-400 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors focus:outline-none"
                onClick={() => {
                  initAudio();
                  toggleSfx();
                  playClick();
                  if (sfxEnabled) {
                    toast.info("ACOUSTIC INTERFACE: Silent protocol engaged.");
                  } else {
                    toast.info(
                      "ACOUSTIC INTERFACE: Audio synthesizers active.",
                    );
                  }
                }}
                onMouseEnter={playHover}
                aria-label="Toggle SFX"
              >
                {sfxEnabled ? (
                  <Volume2 className="h-4 w-4" />
                ) : (
                  <VolumeX className="h-4 w-4" />
                )}
              </button>

              <button
                className="hidden md:block p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-cyan-400 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors focus:outline-none"
                onClick={() => {
                  initAudio();
                  toggleTheme();
                  playClick();
                  toast.info("INTERFACE SHIFT: Display spectrum updated.");
                }}
                onMouseEnter={playHover}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        <div
          className={`md:hidden absolute top-16 left-0 w-full bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-300 dark:border-cyan-500/30 overflow-hidden transition-all duration-300 shadow-2xl ${isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 border-none"}`}
        >
          <div className="flex flex-col px-4 py-6 space-y-3">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => {
                    handleNavClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium font-mono uppercase tracking-wide transition-colors ${
                      isActive
                        ? "bg-blue-100 dark:bg-cyan-500/10 text-blue-800 dark:text-cyan-400 border border-slate-300 dark:border-cyan-500/30 font-bold"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 hover:text-blue-700 dark:hover:text-cyan-400"
                    }`
                  }
                >
                  <Icon className="h-5 w-5" />
                  <span>{link.label}</span>
                </NavLink>
              );
            })}

            <div className="pt-4 mt-2 border-t border-slate-300 dark:border-slate-800 flex flex-col gap-4">
              <div className="flex justify-around items-center mb-2">
                <button
                  onClick={() => {
                    initAudio();
                    toggleSfx();
                    playClick();
                    if (sfxEnabled) {
                      toast.info(
                        "ACOUSTIC INTERFACE: Silent protocol engaged.",
                      );
                    } else {
                      toast.info(
                        "ACOUSTIC INTERFACE: Audio synthesizers active.",
                      );
                    }
                  }}
                  className="flex flex-col items-center gap-2 text-slate-600 dark:text-cyan-400"
                >
                  <div className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-cyan-500/30">
                    {sfxEnabled ? (
                      <Volume2 className="h-5 w-5" />
                    ) : (
                      <VolumeX className="h-5 w-5" />
                    )}
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest">
                    Audio
                  </span>
                </button>
                <button
                  onClick={() => {
                    initAudio();
                    toggleTheme();
                    playClick();
                    toast.info("INTERFACE SHIFT: Display spectrum updated.");
                  }}
                  className="flex flex-col items-center gap-2 text-slate-600 dark:text-cyan-400"
                >
                  <div className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-cyan-500/30">
                    {theme === "dark" ? (
                      <Sun className="h-5 w-5" />
                    ) : (
                      <Moon className="h-5 w-5" />
                    )}
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest">
                    Theme
                  </span>
                </button>
              </div>
              <button
                onClick={() => {
                  triggerRapidBeacon();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex justify-center items-center gap-2 bg-red-600/10 hover:bg-red-600/20 border border-red-500/50 text-red-600 dark:text-red-400 px-4 py-3 rounded text-sm font-bold font-mono tracking-widest transition-colors"
              >
                <Zap className="w-4 h-4" />
                {beaconStatus === "locating" ? "LOCATING..." : "RAPID BEACON"}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Live Incident Ticker */}
      <div className="w-full bg-blue-900 dark:bg-cyan-900/90 text-white dark:text-cyan-100 py-1 overflow-hidden flex whitespace-nowrap border-b border-blue-800/50 dark:border-cyan-500/50 relative z-40 shadow-md">
        <div className="flex animate-[marquee_20s_linear_infinite] gap-8">
          {INCIDENTS.map((inc, i) => (
            <span
              key={i}
              className="font-mono text-xs tracking-wider font-bold shrink-0"
            >
              {inc}
            </span>
          ))}
          {INCIDENTS.map((inc, i) => (
            <span
              key={i + "dup"}
              className="font-mono text-xs tracking-wider font-bold shrink-0"
            >
              {inc}
            </span>
          ))}
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          @keyframes flashEmergency {
            0%, 100% { border-color: rgba(239, 68, 68, 0); box-shadow: none; }
            50% { border-color: rgba(239, 68, 68, 1); box-shadow: inset 0 0 50px rgba(239, 68, 68, 0.5); }
          }
        `}</style>
      </div>
    </>
  );
}
