import Chatbot from '../components/Chatbot';
import { ShieldAlert } from 'lucide-react';

export default function Dispatch() {
  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-red-500/10 rounded-full mb-4 animate-pulse">
          <ShieldAlert className="w-10 h-10 text-red-500" />
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white uppercase font-mono tracking-widest">
          Secure Terminal
        </h1>
        <p className="text-slate-600 dark:text-cyan-500 mt-2 font-mono">
          STATUS: Encrypted connection to Aegis Core established.
        </p>
      </div>

      <div className="w-full max-w-2xl transform transition-all hover:scale-[1.01]">
        <Chatbot />
      </div>
    </div>
  );
}