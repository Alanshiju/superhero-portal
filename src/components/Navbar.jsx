import React from "react";
import { NavLink } from "react-router-dom";
import {
  Shield,
  Sun,
  Moon,
  Radar,
  MessageSquare,
  Map,
  Beaker,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const NAV_LINKS = [
  { path: "/", label: "Base", icon: Shield },
  { path: "/dispatch", label: "Dispatch", icon: MessageSquare },
  { path: "/intel", label: "Intel", icon: Radar },
  { path: "/operations", label: "Operations", icon: Map },
  { path: "/lab", label: "Lab", icon: Beaker },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 dark:bg-slate-950/70 border-b border-cyan-500/20 dark:border-cyan-500/30 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <NavLink
            to="/"
            className="flex-shrink-0 flex items-center gap-2 group"
          >
            <Shield className="h-8 w-8 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="font-mono font-bold text-xl tracking-wider text-slate-900 dark:text-white uppercase">
              Aegis
              <span className="text-cyan-600 dark:text-cyan-400">_Sys</span>
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
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium font-mono uppercase tracking-wide transition-colors ${
                        isActive
                          ? "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/20 font-bold"
                          : "text-slate-600 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 hover:text-cyan-500 dark:hover:text-cyan-400"
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

          {/* Right side: Live connection & Theme Toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/50 dark:bg-slate-800/50 border border-slate-300/50 dark:border-slate-700/50">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs font-mono text-slate-600 dark:text-slate-300">
                SYS_ONLINE
              </span>
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-cyan-400 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors focus:outline-none"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
        <div className="flex justify-around px-2 py-3 space-x-1 sm:px-3 overflow-x-auto">
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 px-3 py-2 rounded-md text-xs font-medium font-mono uppercase tracking-wide transition-colors ${
                    isActive
                      ? "text-cyan-600 dark:text-cyan-400 font-bold"
                      : "text-slate-500 dark:text-slate-400"
                  }`
                }
              >
                <Icon className="h-5 w-5" />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
