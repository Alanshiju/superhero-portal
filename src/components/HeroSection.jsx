export default function HeroSection() {
  return (
    <section className="relative pt-24 pb-12 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-6 tracking-tight">
          AEGIS
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto">
          The Kinetic Guardian. When all shields fall, Aegis stands.
        </p>
        
        {/* Lore & Stats Card */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-10 text-left max-w-3xl mx-auto backdrop-blur-sm">
          <h3 className="text-cyan-400 font-bold text-lg mb-2">Origin Designation:</h3>
          <p className="text-slate-400 mb-4 text-sm leading-relaxed">
            Forged in the heart of a sub-atomic containment breach, Aegis monitors the global electromagnetic spectrum for distress signals. He intercepts threats with real-time quantum calculation and kinetic shielding.
          </p>
          <div className="flex flex-wrap gap-4 text-xs font-mono">
            <span className="bg-cyan-950 text-cyan-400 px-3 py-1 rounded-full border border-cyan-800">
              Kinetic Dispersion: 99.8%
            </span>
            <span className="bg-blue-950 text-blue-400 px-3 py-1 rounded-full border border-blue-800">
              Threat Interception: Instant
            </span>
          </div>
        </div>

        {/* Call to Action triggering the chat */}
        <a 
          href="#dispatch-console" 
          className="inline-block bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
        >
          Request Immediate Assistance
        </a>
      </div>
    </section>
  );
}