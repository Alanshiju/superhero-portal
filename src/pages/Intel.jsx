import React, { useState } from "react";
import {
  Database,
  Lock,
  Fingerprint,
  Activity,
  Server,
  FileText,
  ShieldAlert,
  Zap,
} from "lucide-react";
import HeroAvatar from "../components/HeroAvatar";
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
    <div className="animate-in fade-in slide-in-from-bottom-8 zoom-in-95 duration-700 ease-out max-w-7xl mx-auto px-4 py-12 w-full">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8 border-b border-slate-400 dark:border-slate-800 pb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Database className="h-8 w-8 text-blue-700 dark:text-cyan-400 font-bold font-mono" />
            <h1 className="text-3xl font-bold font-mono text-slate-950 dark:text-white font-extrabold uppercase">
              Intel & Archives
            </h1>
          </div>
          <p className="text-slate-600 dark:text-slate-400 font-mono text-sm max-w-2xl">
            ACCESSING SECURE DATA REPOSITORY... [CLEARANCE LEVEL: KINETIC OMEGA]
          </p>
        </div>
      </div>

      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        <button
          onClick={() => handleTabSwitch("genesis")}
          onMouseEnter={playHover}
          className={`px-6 py-3 rounded font-mono font-bold tracking-widest uppercase transition-colors whitespace-nowrap ${
            activeTab === "genesis"
              ? "bg-cyan-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]"
              : "bg-slate-200 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-800 hover:text-blue-700 dark:text-cyan-500"
          }`}
        >
          Genesis Protocol
        </button>
        <button
          onClick={() => handleTabSwitch("tactical")}
          onMouseEnter={playHover}
          className={`px-6 py-3 rounded font-mono font-bold tracking-widest uppercase transition-colors whitespace-nowrap ${
            activeTab === "tactical"
              ? "bg-cyan-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]"
              : "bg-slate-200 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-800 hover:text-blue-700 dark:text-cyan-500"
          }`}
        >
          Tactical Directives
        </button>
        <button
          onClick={() => handleTabSwitch("blueprint")}
          onMouseEnter={playHover}
          className={`px-6 py-3 rounded font-mono font-bold tracking-widest uppercase transition-colors whitespace-nowrap ${
            activeTab === "blueprint"
              ? "bg-cyan-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]"
              : "bg-slate-200 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-800 hover:text-blue-700 dark:text-cyan-500"
          }`}
        >
          Interactive Blueprint
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Main Content Area */}
        <div className="md:col-span-8">
          {activeTab === "genesis" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white border-2 border-slate-200 shadow-lg shadow-slate-200/50 dark:bg-slate-900/70 dark:border-slate-800 dark:shadow-none rounded-xl p-8 transition-colors">
                <h2 className="text-2xl font-bold text-slate-950 dark:text-white font-extrabold mb-4 font-mono uppercase flex items-center gap-2">
                  <Activity className="w-6 h-6 text-blue-700 dark:text-cyan-500" />{" "}
                  The Genesis Incident
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Project Kinetic-0 was meant to revolutionize clean energy at
                  the Vance Applied Physics Lab. Dr. Alexander Vance, the lead
                  Quantum Propulsion Systems Engineer, was conducting the final
                  sub-atomic containment test when a cascade failure triggered a
                  runaway reactor breach.
                </p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Vance chose to manually engage the emergency dampeners from
                  inside the core chamber to save the city. The ensuing blast
                  did not destroy him; instead, it bonded his cellular structure
                  with the facility's quantum sensory grid. His physical form
                  dissolved into a localized electromagnetic field, transforming
                  him into a living, responsive grid of protection.
                </p>
              </div>

              <div className="bg-white border-2 border-slate-200 shadow-lg shadow-slate-200/50 dark:bg-slate-900/70 dark:border-slate-800 dark:shadow-none rounded-xl p-8 transition-colors">
                <h2 className="text-2xl font-bold text-slate-950 dark:text-white font-extrabold mb-6 font-mono uppercase flex items-center gap-2">
                  <FileText className="w-6 h-6 text-blue-700 dark:text-cyan-500" />{" "}
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
                      className="border-l-2 border-cyan-500 pl-4 py-2"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded">
                          {log.id}
                        </span>
                        <span className="text-xs font-mono text-blue-700 dark:text-cyan-400 font-bold font-mono">
                          {log.date}
                        </span>
                        <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 ml-auto">
                          {log.status}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-950 dark:text-white font-extrabold mb-1">
                        {log.title}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {log.details}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "tactical" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white border-2 border-slate-200 shadow-lg shadow-slate-200/50 dark:bg-slate-900/70 dark:border-slate-800 dark:shadow-none rounded-xl p-8 transition-colors">
                <h2 className="text-2xl font-bold text-slate-950 dark:text-white font-extrabold mb-4 font-mono uppercase flex items-center gap-2">
                  <Lock className="w-6 h-6 text-blue-700 dark:text-cyan-500" />{" "}
                  The Kinetic Codex
                </h2>
                <ul className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
                  <li className="flex gap-4">
                    <span className="text-blue-700 dark:text-cyan-500 font-bold font-mono text-lg mt-1">
                      01.
                    </span>
                    <div>
                      <strong className="text-slate-950 dark:text-white font-extrabold font-mono block mb-1 text-lg">
                        Non-Lethal Kinetic Redirection
                      </strong>
                      Aegis does not strike; he absorbs and redirects. All
                      offensive energy is grounded or dispersed harmlessly into
                      the atmosphere. He refuses to weaponize the grid.
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-blue-700 dark:text-cyan-500 font-bold font-mono text-lg mt-1">
                      02.
                    </span>
                    <div>
                      <strong className="text-slate-950 dark:text-white font-extrabold font-mono block mb-1 text-lg">
                        Universal Distress Monitoring
                      </strong>
                      The Kinetic Mesh listens constantly. It prioritizes
                      systemic collapses, structural failures, and civilian
                      peril above all geopolitical conflicts. The grid is
                      politically agnostic.
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-blue-700 dark:text-cyan-500 font-bold font-mono text-lg mt-1">
                      03.
                    </span>
                    <div>
                      <strong className="text-slate-950 dark:text-white font-extrabold font-mono block mb-1 text-lg">
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
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white border-2 border-slate-200 shadow-lg shadow-slate-200/50 dark:bg-slate-900/70 dark:border-slate-800 dark:shadow-none rounded-xl p-8 transition-colors">
                <h2 className="text-2xl font-bold text-slate-950 dark:text-white font-extrabold mb-4 font-mono uppercase flex items-center gap-2">
                  <Server className="w-6 h-6 text-blue-700 dark:text-cyan-500" />{" "}
                  Equipment & Tech Specs
                </h2>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-200 dark:bg-slate-950/80 rounded border border-slate-100 dark:border-slate-800 hover:border-blue-400 dark:border-cyan-500/50 transition-colors group">
                    <h3 className="font-bold text-cyan-700 dark:text-blue-600 dark:text-cyan-400 font-mono mb-2 flex items-center gap-2">
                      <Zap className="w-4 h-4 group-hover:animate-pulse" />{" "}
                      Aegis Sub-Dermal Mesh
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      A microscopic layer of programmable matter interwoven with
                      Dr. Vance's remaining biological components. It allows him
                      to phase between physical form and pure kinetic energy.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-200 dark:bg-slate-950/80 rounded border border-slate-100 dark:border-slate-800 hover:border-blue-400 dark:border-cyan-500/50 transition-colors group">
                    <h3 className="font-bold text-cyan-700 dark:text-blue-600 dark:text-cyan-400 font-mono mb-2 flex items-center gap-2">
                      <Activity className="w-4 h-4 group-hover:animate-pulse" />{" "}
                      Quantum Chrono-Sensors
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Integrated directly into the ocular visors, these sensors
                      predict structural collapses 0.4 seconds before
                      macro-scale failure, granting Aegis the reaction time
                      needed to deploy shields.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-200 dark:bg-slate-950/80 rounded border border-slate-100 dark:border-slate-800 hover:border-blue-400 dark:border-cyan-500/50 transition-colors group">
                    <h3 className="font-bold text-cyan-700 dark:text-blue-600 dark:text-cyan-400 font-mono mb-2 flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 group-hover:animate-pulse" />{" "}
                      Phase-Shift Shielding
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      By vibrating local air molecules at resonant frequencies,
                      Aegis creates barriers harder than titanium that can
                      dynamically flex to absorb massive shockwaves.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Visualization Profile */}
        <div className="md:col-span-4 space-y-6">
          <div className="relative w-full bg-slate-900/50 backdrop-blur-md rounded-lg border border-slate-700 dark:border-cyan-900/50 overflow-hidden flex flex-col items-center justify-center shadow-lg p-4 group">
            <div className="absolute top-2 left-2 text-xs font-mono text-blue-700 dark:text-cyan-500 animate-pulse z-20">
              [ KINETIC MESH RENDER : ACTIVE ]
            </div>

            <div className="relative w-full max-w-[250px] mx-auto my-8">
              <HeroVisual className="w-full" />

              {/* Hotspots only active when on Blueprint tab */}
              {activeTab === "blueprint" && (
                <>
                  {/* Visor / Chrono-Sensors */}
                  <div className="absolute top-[25%] left-[50%] -translate-x-1/2 w-4 h-4 rounded-full border border-cyan-400 bg-blue-200 dark:bg-cyan-500/20 animate-ping z-30" />

                  {/* Core / Phase-Shift */}
                  <div className="absolute top-[55%] left-[50%] -translate-x-1/2 w-6 h-6 rounded-full border border-cyan-400 bg-blue-200 dark:bg-cyan-500/20 animate-ping z-30" />

                  {/* Shoulders / Sub-dermal mesh */}
                  <div className="absolute top-[40%] left-[20%] w-4 h-4 rounded-full border border-cyan-400 bg-blue-200 dark:bg-cyan-500/20 animate-ping z-30 delay-100" />
                  <div className="absolute top-[40%] right-[20%] w-4 h-4 rounded-full border border-cyan-400 bg-blue-200 dark:bg-cyan-500/20 animate-ping z-30 delay-100" />
                </>
              )}
            </div>

            <div className="absolute bottom-2 right-2 flex items-center gap-1 z-20">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></div>
              <span className="text-[10px] font-mono text-blue-600 dark:text-cyan-400/80">
                SYNC
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900/50 backdrop-blur-sm border border-slate-400 dark:border-slate-800 p-4 rounded-lg">
            <h3 className="font-mono text-sm font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
              <Fingerprint className="w-4 h-4 text-blue-700 dark:text-cyan-500" />{" "}
              Biometric Signature
            </h3>
            <div className="space-y-2 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Designation:</span>
                <span className="text-slate-900 dark:text-blue-600 dark:text-cyan-400">
                  AEGIS_SYS
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Host:</span>
                <span className="text-slate-900 dark:text-blue-600 dark:text-cyan-400">
                  Dr. A. Vance
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="text-emerald-600 dark:text-emerald-400">
                  ACTIVE / OMNIPRESENT
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Core Temp:</span>
                <span className="text-slate-900 dark:text-blue-600 dark:text-cyan-400">
                  0.02K
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
