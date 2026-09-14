import React, { useState } from "react";
import {
  Database,
  Lock,
  Activity,
  Server,
  FileText,
  ShieldAlert,
  Zap,
} from "lucide-react";
import HeroVisual from "../components/HeroVisual";
import { useSound } from "../context/SoundContext";

export default function Intel() {
  const [activeTab, setActiveTab] = useState("genesis"); // genesis, tactical, blueprint
  const { playClick, playHover } = useSound();

  const handleTabSwitch = (tab) => {
    playClick();
    setActiveTab(tab);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 zoom-in-95 duration-700 ease-out max-w-7xl mx-auto px-4 py-8 w-full min-h-[calc(100vh-100px)]">
      <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-8 border-b border-slate-300 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Database className="h-6 w-6 text-sky-600 dark:text-sky-500" />
            <h1 className="text-3xl font-extrabold text-slate-950 dark:text-white uppercase tracking-tight">
              Intel & Archives
            </h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-mono text-[10px] tracking-widest uppercase">
            SECURE DATA REPOSITORY // CLEARANCE LEVEL: KINETIC OMEGA
          </p>
        </div>
      </div>

      <div className="flex gap-1 mb-6 border-b border-slate-300 dark:border-slate-800 pb-px overflow-x-auto scrollbar-hide">
        <button
          onClick={() => handleTabSwitch("genesis")}
          onMouseEnter={playHover}
          className={`px-6 py-2 font-mono text-[10px] font-bold tracking-widest uppercase transition-colors whitespace-nowrap border-b-2 ${
            activeTab === "genesis"
              ? "border-amber-500 text-slate-900 dark:text-amber-500 bg-slate-200/50 dark:bg-amber-500/10"
              : "border-transparent text-slate-600 dark:text-slate-500 hover:text-slate-900 dark:hover:text-sky-400 hover:bg-slate-200/30 dark:hover:bg-slate-800/50"
          }`}
        >
          Genesis Protocol
        </button>
        <button
          onClick={() => handleTabSwitch("tactical")}
          onMouseEnter={playHover}
          className={`px-6 py-2 font-mono text-[10px] font-bold tracking-widest uppercase transition-colors whitespace-nowrap border-b-2 ${
            activeTab === "tactical"
              ? "border-amber-500 text-slate-900 dark:text-amber-500 bg-slate-200/50 dark:bg-amber-500/10"
              : "border-transparent text-slate-600 dark:text-slate-500 hover:text-slate-900 dark:hover:text-sky-400 hover:bg-slate-200/30 dark:hover:bg-slate-800/50"
          }`}
        >
          Tactical Directives
        </button>
        <button
          onClick={() => handleTabSwitch("blueprint")}
          onMouseEnter={playHover}
          className={`px-6 py-2 font-mono text-[10px] font-bold tracking-widest uppercase transition-colors whitespace-nowrap border-b-2 ${
            activeTab === "blueprint"
              ? "border-amber-500 text-slate-900 dark:text-amber-500 bg-slate-200/50 dark:bg-amber-500/10"
              : "border-transparent text-slate-600 dark:text-slate-500 hover:text-slate-900 dark:hover:text-sky-400 hover:bg-slate-200/30 dark:hover:bg-slate-800/50"
          }`}
        >
          Equipment Specs
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Dossier Content */}
        <div className="lg:col-span-7 xl:col-span-8">
          {activeTab === "genesis" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-slate-50/90 dark:bg-[#0d1117]/90 backdrop-blur-md border border-slate-300 dark:border-slate-800/80 p-8 rounded-sm relative overflow-hidden group">
                {/* Classified Stamp */}
                <div className="absolute top-4 right-4 border-2 border-amber-600/50 text-amber-600/50 font-mono text-xl font-bold p-2 rotate-12 opacity-30 select-none">
                  CLASSIFIED // OMEGA
                </div>

                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 font-mono uppercase tracking-widest flex items-center gap-2 border-b border-slate-300 dark:border-slate-800 pb-2">
                  <Activity className="w-5 h-5 text-sky-600 dark:text-sky-500" />
                  The Genesis Incident
                </h2>

                <div className="space-y-4 font-mono text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  <p>
                    <span className="text-amber-600 dark:text-amber-500 font-bold">
                      PROJECT KINETIC-0
                    </span>{" "}
                    was authorized to revolutionize clean energy at the Vance
                    Applied Physics Lab. Dr. Alexander Vance, Lead Quantum
                    Propulsion Engineer, was conducting the final sub-atomic
                    containment test when a cascade failure triggered a runaway
                    reactor breach.
                  </p>
                  <p>
                    Vance chose to manually engage the emergency dampeners from
                    inside the core chamber to save the surrounding sector. The
                    ensuing blast did not destroy him; instead, it bonded his
                    cellular structure with the facility's quantum sensory grid.
                  </p>
                  <p className="bg-slate-200/50 dark:bg-slate-900/50 p-4 border-l-2 border-amber-500 text-slate-900 dark:text-slate-100">
                    His physical form dissolved into a localized electromagnetic
                    field, transforming him into a living, responsive grid of
                    protection. He{" "}
                    <span className="bg-slate-300 dark:bg-slate-800 px-1">
                      is
                    </span>{" "}
                    the system now.
                  </p>
                </div>
              </div>

              <div className="bg-slate-50/90 dark:bg-[#0d1117]/90 backdrop-blur-md border border-slate-300 dark:border-slate-800/80 p-8 rounded-sm">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 font-mono uppercase tracking-widest flex items-center gap-2 border-b border-slate-300 dark:border-slate-800 pb-2">
                  <FileText className="w-5 h-5 text-sky-600 dark:text-sky-500" />
                  Archive Logs
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      id: "CAS-1024",
                      title: "The Narrows Bridge Collapse",
                      date: "2024-03-12",
                      status: "RESOLVED",
                      details:
                        "Structural failure during rush hour. Aegis deployed a localized gravity tether, stabilizing 400 tons of concrete until evacuation.",
                    },
                    {
                      id: "CAS-1089",
                      title: "Sector 03 Cybernetic Overload",
                      date: "2024-07-22",
                      status: "CONTAINED",
                      details:
                        "Rogue EMP surge threatened hospital grid. Aegis acted as a physical conduit, grounding 4 gigawatts of power directly into the bedrock.",
                    },
                  ].map((log) => (
                    <div
                      key={log.id}
                      className="border-l-2 border-sky-500 pl-4 py-2"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-mono font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-sm">
                          {log.id}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                          {log.date}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 ml-auto">
                          {log.status}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white font-mono text-sm uppercase tracking-wide mb-1">
                        {log.title}
                      </h4>
                      <p className="text-xs font-mono text-slate-600 dark:text-slate-400">
                        {log.details}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "tactical" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-slate-50/90 dark:bg-[#0d1117]/90 backdrop-blur-md border border-slate-300 dark:border-slate-800/80 p-8 rounded-sm">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 font-mono uppercase tracking-widest flex items-center gap-2 border-b border-slate-300 dark:border-slate-800 pb-2">
                  <Lock className="w-5 h-5 text-sky-600 dark:text-sky-500" />
                  The Kinetic Codex
                </h2>
                <ul className="space-y-6 font-mono text-xs text-slate-700 dark:text-slate-300">
                  <li className="flex gap-4">
                    <span className="text-amber-600 dark:text-amber-500 font-bold text-sm mt-0.5">
                      01.
                    </span>
                    <div>
                      <strong className="text-slate-900 dark:text-white uppercase tracking-widest block mb-2 border-b border-slate-200 dark:border-slate-800 pb-1">
                        Non-Lethal Kinetic Redirection
                      </strong>
                      Aegis does not strike; he absorbs and redirects. All
                      offensive energy is grounded or dispersed harmlessly into
                      the atmosphere. He refuses to weaponize the grid.
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-amber-600 dark:text-amber-500 font-bold text-sm mt-0.5">
                      02.
                    </span>
                    <div>
                      <strong className="text-slate-900 dark:text-white uppercase tracking-widest block mb-2 border-b border-slate-200 dark:border-slate-800 pb-1">
                        Universal Distress Monitoring
                      </strong>
                      The Kinetic Mesh listens constantly. It prioritizes
                      systemic collapses, structural failures, and civilian
                      peril above all geopolitical conflicts. The grid is
                      politically agnostic.
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-amber-600 dark:text-amber-500 font-bold text-sm mt-0.5">
                      03.
                    </span>
                    <div>
                      <strong className="text-slate-900 dark:text-white uppercase tracking-widest block mb-2 border-b border-slate-200 dark:border-slate-800 pb-1">
                        Infrastructure Safeguarding
                      </strong>
                      Before aiding an individual, the structural integrity of
                      the surrounding sector must be secured to prevent
                      cascading loss of life.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "blueprint" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-slate-50/90 dark:bg-[#0d1117]/90 backdrop-blur-md border border-slate-300 dark:border-slate-800/80 p-8 rounded-sm">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 font-mono uppercase tracking-widest flex items-center gap-2 border-b border-slate-300 dark:border-slate-800 pb-2">
                  <Server className="w-5 h-5 text-sky-600 dark:text-sky-500" />
                  Equipment Specs
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      icon: Zap,
                      title: "Aegis Sub-Dermal Mesh",
                      desc: "A microscopic layer of programmable matter interwoven with Dr. Vance's remaining biological components. It allows him to phase between physical form and pure kinetic energy.",
                    },
                    {
                      icon: Activity,
                      title: "Quantum Chrono-Sensors",
                      desc: "Integrated directly into the ocular visors, these sensors predict structural collapses 0.4 seconds before macro-scale failure, granting Aegis the reaction time needed to deploy shields.",
                    },
                    {
                      icon: ShieldAlert,
                      title: "Phase-Shift Shielding",
                      desc: "By vibrating local air molecules at resonant frequencies, Aegis creates barriers harder than titanium that can dynamically flex to absorb massive shockwaves.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="p-4 bg-slate-100 dark:bg-slate-900/50 rounded-sm border border-slate-300 dark:border-slate-800 hover:border-sky-500/50 dark:hover:border-sky-500/50 transition-colors group flex gap-4 items-start"
                    >
                      <div className="p-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950">
                        <item.icon className="w-4 h-4 text-sky-600 dark:text-sky-500 group-hover:animate-pulse" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white font-mono text-xs uppercase tracking-widest mb-2">
                          {item.title}
                        </h3>
                        <p className="font-mono text-[10px] text-slate-600 dark:text-slate-400">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Visualization Profile */}
        <div className="lg:col-span-5 xl:col-span-4 h-full relative">
          <div className="sticky top-20 bg-slate-50/90 dark:bg-[#0d1117]/90 backdrop-blur-md border border-slate-300 dark:border-slate-800/80 rounded-sm p-4 h-[500px] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-300 dark:border-slate-800 pb-2 mb-4">
              <div className="text-[10px] font-mono font-bold text-sky-600 dark:text-sky-500 animate-pulse tracking-widest uppercase">
                [ RENDER : ACTIVE ]
              </div>
              <div className="text-[10px] font-mono text-slate-500">
                Y: 14.50 // X: -9.80
              </div>
            </div>

            {/* Canvas Area */}
            <div className="flex-1 relative border border-slate-300 dark:border-slate-800 bg-slate-100 dark:bg-black/50 overflow-hidden flex items-center justify-center">
              {/* Technical Measurement Grids */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(90deg, #38bdf8 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />

              <div className="absolute top-2 left-2 text-[8px] font-mono text-sky-600 dark:text-sky-500">
                + MARKER_01
              </div>
              <div className="absolute bottom-2 right-2 text-[8px] font-mono text-sky-600 dark:text-sky-500">
                + MARKER_02
              </div>

              <div className="relative w-full max-w-[200px]">
                <HeroVisual className="w-full" />

                {activeTab === "blueprint" && (
                  <>
                    <div className="absolute top-[25%] left-[50%] -translate-x-1/2 w-4 h-4 rounded-full border border-amber-500 bg-amber-500/20 animate-ping z-30" />
                    <div className="absolute top-[55%] left-[50%] -translate-x-1/2 w-6 h-6 rounded-full border border-sky-500 bg-sky-500/20 animate-ping z-30" />
                  </>
                )}
              </div>
            </div>

            {/* Telemetry Dials */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="bg-slate-100 dark:bg-slate-900 p-2 border border-slate-300 dark:border-slate-800 flex justify-between items-center">
                <span className="text-[10px] font-mono text-slate-500">
                  HOST
                </span>
                <span className="text-[10px] font-mono font-bold text-slate-900 dark:text-white">
                  A. VANCE
                </span>
              </div>
              <div className="bg-slate-100 dark:bg-slate-900 p-2 border border-slate-300 dark:border-slate-800 flex justify-between items-center">
                <span className="text-[10px] font-mono text-slate-500">
                  STATUS
                </span>
                <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-500">
                  ONLINE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
