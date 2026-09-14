import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  ShieldAlert,
  Sun,
  Moon,
  Radar,
  Radio,
  Activity,
  Database,
  Beaker,
  Volume2,
  VolumeX,
  Zap,
  WifiOff,
  Menu,
  X,
  Wifi,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useSound } from "../context/SoundContext";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const NAV_LINKS = [
  { path: "/", label: "01 BASE", icon: ShieldAlert },
  { path: "/dispatch", label: "02 DISPATCH", icon: Radio },
  { path: "/intel", label: "03 INTEL", icon: Database },
  { path: "/operations", label: "04 OPS", icon: Activity },
  { path: "/lab", label: "05 LAB", icon: Zap },
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const triggerRapidBeacon = () => {
    initAudio();
    playAlert();
    setBeaconStatus("locating");
    toast.warning("RAPID BEACON INITIATED: Triangulating...", { theme });

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => sendDistress(pos.coords.latitude, pos.coords.longitude),
        () => sendDistress("Unknown", "Unknown"),
      );
    } else {
      sendDistress("Not Supported", "Not Supported");
    }
  };

  const sendDistress = (lat, lng) => {
    const templateParams = {
      from_name: "URGENT - Rapid Beacon",
      message: `Emergency Beacon Activated at: Lat ${lat}, Lng ${lng}`,
      reply_to: "no-reply@aegis-sys.local",
    };

    emailjs
      .send(
        "service_y03krm7",
        "template_yq4w0v6",
        templateParams,
        "n4-J9-3R5LhQvKx12",
      )
      .then(() => {
        setBeaconStatus("active");
        toast.success("AEGIS INTERCEPT DEPLOYED.", { theme });
        setTimeout(() => setBeaconStatus("idle"), 10000);
      })
      .catch((err) => {
        console.error("Beacon failed", err);
        setBeaconStatus("idle");
        toast.error("COMM-LINK FAILED. RELY ON LOCAL SHELTER.", { theme });
      });
  };

  const handleNavClick = () => {
    initAudio();
    playClick();
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-slate-50/90 dark:bg-[#0d1117]/90 backdrop-blur-md border-b border-slate-300 dark:border-slate-800/80 transition-colors">
        <div className="w-full px-4 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Left: Mobile Toggle & Logo */}
            <div className="flex items-center gap-4">
              <button
                className="md:hidden p-2 -ml-2 text-slate-900 dark:text-cyan-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors focus:outline-none"
                onClick={() => {
                  initAudio();
                  playClick();
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }}
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>

              <NavLink
                to="/"
                onClick={handleNavClick}
                onMouseEnter={playHover}
                className="flex items-center gap-2 group"
              >
                <div className="relative flex items-center justify-center w-8 h-8 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 group-hover:border-amber-500 dark:group-hover:border-amber-500 transition-colors">
                  <ShieldAlert className="h-4 w-4 text-slate-900 dark:text-cyan-400 group-hover:text-amber-500 transition-colors" />
                </div>
                <div className="hidden sm:flex flex-col">
                  <span className="text-sm font-extrabold uppercase tracking-tight text-slate-900 dark:text-white leading-none">
                    AEGIS_SYS
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-slate-500 dark:text-slate-400">
                    KINETIC-DEFENSE v2.4
                  </span>
                </div>
              </NavLink>

              {/* Status Indicator */}
              <div className="hidden lg:flex items-center gap-2 ml-4 pl-4 border-l border-slate-300 dark:border-slate-800 h-8">
                {isOnline ? (
                  <>
                    <Wifi className="w-3 h-3 text-sky-500" />
                    <span className="text-[10px] font-mono text-slate-900 font-medium dark:text-sky-400 tracking-widest">
                      SYS_ONLINE // SEC-07
                    </span>
                  </>
                ) : (
                  <>
                    <WifiOff className="w-3 h-3 text-amber-500" />
                    <span className="text-[10px] font-mono font-medium text-amber-500 tracking-widest">
                      OFFLINE_MODE
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Desktop Center: Channel Tabs */}
            <div className="hidden md:flex flex-1 justify-center">
              <div className="flex gap-1 h-14 items-end">
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={handleNavClick}
                    onMouseEnter={playHover}
                    className={({ isActive }) =>
                      `relative px-4 py-2 text-[10px] font-mono font-bold tracking-widest uppercase transition-all flex items-center gap-2 border-b-2 h-10 ${
                        isActive
                          ? "text-slate-900 border-amber-500 dark:text-amber-500 dark:border-amber-500 bg-slate-200/50 dark:bg-amber-500/10"
                          : "text-slate-600 border-transparent dark:text-slate-400 hover:text-slate-900 dark:hover:text-cyan-400 hover:bg-slate-200/30 dark:hover:bg-slate-800/50"
                      }`
                    }
                  >
                    <span>{link.label}</span>
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Right: Tactical Control Cluster */}
            <div className="flex items-center gap-3">
              <button
                onClick={triggerRapidBeacon}
                onMouseEnter={playHover}
                disabled={beaconStatus !== "idle"}
                className={`hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-sm border transition-colors ${
                  beaconStatus === "locating"
                    ? "bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500 animate-pulse"
                    : beaconStatus === "active"
                      ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500"
                      : "bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/50 hover:border-red-500"
                }`}
              >
                <Zap
                  className={`w-3.5 h-3.5 ${beaconStatus === "idle" ? "animate-pulse" : ""}`}
                />
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest">
                  {beaconStatus === "locating"
                    ? "LOCATING..."
                    : beaconStatus === "active"
                      ? "DEPLOYED"
                      : "RAPID BEACON"}
                </span>
              </button>

              <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-sm overflow-hidden h-7">
                <button
                  className="px-2 h-full flex items-center justify-center bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-sky-500 dark:hover:text-sky-400 transition-colors border-r border-slate-300 dark:border-slate-700"
                  onClick={() => {
                    initAudio();
                    toggleSfx();
                    playClick();
                  }}
                  onMouseEnter={playHover}
                  aria-label="Toggle SFX"
                >
                  {sfxEnabled ? (
                    <Volume2 className="h-3.5 w-3.5" />
                  ) : (
                    <VolumeX className="h-3.5 w-3.5 opacity-50" />
                  )}
                </button>

                <button
                  className="px-2 h-full flex items-center justify-center bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-amber-500 transition-colors"
                  onClick={() => {
                    initAudio();
                    toggleTheme();
                    playClick();
                  }}
                  onMouseEnter={playHover}
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <Sun className="h-3.5 w-3.5" />
                  ) : (
                    <Moon className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        <div
          className={`md:hidden absolute top-14 left-0 w-full bg-slate-50/95 dark:bg-[#0d1117]/95 backdrop-blur-xl border-b border-slate-300 dark:border-slate-800 overflow-hidden transition-all duration-300 shadow-2xl ${isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 border-none"}`}
        >
          <div className="flex flex-col px-4 py-4 space-y-1">
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
                    `flex items-center gap-4 px-4 py-3 rounded-sm text-sm font-bold font-mono uppercase tracking-wide transition-colors border-l-2 ${
                      isActive
                        ? "bg-amber-500/10 text-slate-900 dark:text-amber-500 border-amber-500"
                        : "text-slate-600 dark:text-slate-400 border-transparent hover:bg-slate-200/50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-cyan-400"
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </NavLink>
              );
            })}

            <div className="pt-4 mt-2 border-t border-slate-300 dark:border-slate-800 flex flex-col gap-4">
              <button
                onClick={() => {
                  triggerRapidBeacon();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex justify-center items-center gap-2 bg-red-500/10 border border-red-500/50 text-red-600 dark:text-red-400 px-4 py-3 rounded-sm text-sm font-bold font-mono tracking-widest transition-colors"
              >
                <Zap className="w-4 h-4" />
                {beaconStatus === "locating" ? "LOCATING..." : "RAPID BEACON"}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Live Incident Ticker */}
      <div className="w-full bg-slate-900 dark:bg-black text-sky-400 py-1 overflow-hidden flex whitespace-nowrap border-b border-slate-700/50 relative z-40 shadow-sm">
        <div className="flex animate-[marquee_20s_linear_infinite] gap-8">
          {INCIDENTS.map((inc, i) => (
            <span
              key={i}
              className="font-mono text-[10px] uppercase tracking-widest font-bold shrink-0"
            >
              {inc}
            </span>
          ))}
          {INCIDENTS.map((inc, i) => (
            <span
              key={i + "dup"}
              className="font-mono text-[10px] uppercase tracking-widest font-bold shrink-0"
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
        `}</style>
      </div>
    </>
  );
}
