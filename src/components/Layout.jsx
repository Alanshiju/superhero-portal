import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300 flex flex-col selection:bg-cyan-500/30">
      <Navbar />
      <main className="flex-1 relative z-10 w-full flex flex-col">
        {children}
      </main>
      <Footer />
    </div>
  );
}
