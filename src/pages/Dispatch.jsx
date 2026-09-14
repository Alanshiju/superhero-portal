import React from "react";
import Chatbot from "../components/Chatbot";
import {
  ShieldAlert,
  Database,
  User,
  MapPin,
  Mail,
  Hash,
  FileText,
} from "lucide-react";
import { useChatContext } from "../context/ChatContext";

export default function Dispatch() {
  const { formData, caseId, step } = useChatContext();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 zoom-in-95 duration-700 ease-out min-h-[calc(100vh-100px)] flex flex-col p-4 md:p-8 max-w-7xl mx-auto w-full">
      <div className="mb-6 border-b border-slate-300 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-3 mb-2">
          <ShieldAlert className="w-6 h-6 text-amber-500 animate-pulse" />
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white uppercase tracking-tight">
            Terminal Uplink
          </h1>
        </div>
        <p className="text-slate-500 dark:text-slate-400 font-mono text-[10px] tracking-widest uppercase">
          SECURE ENCRYPTED CONNECTION TO AEGIS CORE // DO NOT DISCONNECT
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 h-full">
        {/* Left Sidebar: Live Dossier */}
        <div className="lg:col-span-4 bg-slate-50/80 dark:bg-[#0d1117]/80 backdrop-blur-md border border-slate-300 dark:border-slate-800/80 p-6 rounded-sm flex flex-col">
          <div className="flex items-center gap-2 border-b border-slate-300 dark:border-slate-800/80 pb-3 mb-6">
            <Database className="w-4 h-4 text-sky-500" />
            <h3 className="font-mono font-bold text-xs text-slate-900 dark:text-white uppercase tracking-widest">
              Live Spec-Sheet
            </h3>
          </div>

          <div className="flex-1 space-y-6">
            {/* Status Header */}
            <div className="bg-slate-200/50 dark:bg-slate-900/50 p-4 rounded-sm border border-slate-300 dark:border-slate-800">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                  Case ID
                </span>
                <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-500">
                  {caseId || (step > 0 ? "GENERATING..." : "AWAITING INPUT")}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                  Clearance
                </span>
                <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  CIVILIAN
                </span>
              </div>
            </div>

            {/* Field Entries */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <User
                  className={`w-4 h-4 mt-0.5 ${formData.name ? "text-sky-500" : "text-slate-400 dark:text-slate-600"}`}
                />
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                    Designation
                  </span>
                  <span className="font-mono text-sm text-slate-900 dark:text-slate-300">
                    {formData.name || "[ REDACTED ]"}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Hash
                  className={`w-4 h-4 mt-0.5 ${formData.age ? "text-sky-500" : "text-slate-400 dark:text-slate-600"}`}
                />
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                    Chronological Age
                  </span>
                  <span className="font-mono text-sm text-slate-900 dark:text-slate-300">
                    {formData.age || "[ REDACTED ]"}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin
                  className={`w-4 h-4 mt-0.5 ${formData.location ? "text-sky-500" : "text-slate-400 dark:text-slate-600"}`}
                />
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                    Sector Coordinates
                  </span>
                  <span className="font-mono text-sm text-slate-900 dark:text-slate-300">
                    {formData.location || "[ UNKNOWN ]"}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail
                  className={`w-4 h-4 mt-0.5 ${formData.email ? "text-sky-500" : "text-slate-400 dark:text-slate-600"}`}
                />
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                    Comm Frequency
                  </span>
                  <span className="font-mono text-sm text-slate-900 dark:text-slate-300">
                    {formData.email || "[ PENDING ]"}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FileText
                  className={`w-4 h-4 mt-0.5 ${formData.grievance ? "text-sky-500" : "text-slate-400 dark:text-slate-600"}`}
                />
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                    Incident Details
                  </span>
                  <span className="font-mono text-xs text-slate-900 dark:text-slate-300 line-clamp-3">
                    {formData.grievance || "[ AWAITING TRANSMISSION ]"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Terminal: Chatbot */}
        <div className="lg:col-span-8 bg-slate-50/80 dark:bg-[#0d1117]/80 backdrop-blur-md border border-slate-300 dark:border-slate-800/80 rounded-sm shadow-xl flex flex-col overflow-hidden h-[600px] lg:h-auto">
          {/* We rely on Chatbot variant="full" internally rendering its own header, but we want it to fit perfectly inside this tactical box */}
          <Chatbot variant="full" />
        </div>
      </div>
    </div>
  );
}
