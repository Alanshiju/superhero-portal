import { useState, useRef, useEffect } from "react";
import {
  Download,
  Loader2,
  Maximize2,
  X,
  MessageSquare,
  TerminalSquare,
} from "lucide-react";
import { useSound } from "../context/SoundContext";
import { useChatContext } from "../context/ChatContext";
import HeroAvatar from "./HeroAvatar";
import { useNavigate } from "react-router-dom";

export default function HybridChatbot({ variant = "full", onClose }) {
  const {
    messages,
    isSending,
    isAiTyping,
    caseId,
    isPhase2,
    handleSendMessage,
    downloadMissionBrief,
  } = useChatContext();

  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const { playHover, playClick } = useSound();
  const messageContainerRef = useRef(null);

  useEffect(() => {
    if (messageContainerRef.current && messages.length > 1) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages, isAiTyping]);

  const onSend = () => {
    if (!inputValue.trim()) return;
    handleSendMessage(inputValue);
    setInputValue("");
  };

  if (variant === "floating") {
    return (
      <div className="w-full max-w-sm bg-slate-50/95 dark:bg-[#0d1117]/95 backdrop-blur-xl border border-slate-300 dark:border-slate-800 rounded-sm shadow-xl flex flex-col h-[500px] overflow-hidden">
        <div className="bg-slate-200/50 dark:bg-slate-900/50 p-3 flex justify-between items-center border-b border-slate-300 dark:border-slate-800">
          <div className="flex flex-col">
            <span className="font-mono text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-1.5">
              <TerminalSquare className="w-3.5 h-3.5 text-amber-500" />
              SECURE COMM-LINK
            </span>
            <span className="font-mono text-[9px] text-sky-600 dark:text-sky-500 tracking-widest mt-0.5">
              ESTABLISHED ENCRYPTION
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                playClick();
                navigate("/dispatch");
              }}
              onMouseEnter={playHover}
              className="text-slate-500 hover:text-sky-500 transition-colors"
              title="Expand to Full Terminal"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                playClick();
                onClose();
              }}
              onMouseEnter={playHover}
              className="text-slate-500 hover:text-amber-500 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          ref={messageContainerRef}
          className="flex-1 overflow-y-auto p-3 space-y-3 font-mono scroll-smooth bg-transparent"
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] p-2 rounded-sm text-[10px] uppercase tracking-wide leading-relaxed border ${
                  msg.sender === "user"
                    ? "bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/30"
                    : msg.sender === "system"
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 w-full text-center font-bold"
                      : "bg-slate-200/50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-300 border-slate-300 dark:border-slate-800"
                }`}
              >
                {msg.sender === "aegis" && (
                  <span className="text-[9px] text-amber-600 dark:text-amber-500 block mb-1 font-bold">
                    AEGIS:
                  </span>
                )}
                {msg.text}
              </div>
            </div>
          ))}
          {isAiTyping && (
            <div className="flex justify-start">
              <div className="text-amber-500 font-mono text-[9px] animate-pulse flex items-center gap-1.5 uppercase tracking-widest">
                <Loader2 className="w-3 h-3 animate-spin" /> Transmitting...
              </div>
            </div>
          )}
          {isPhase2 && caseId && (
            <div className="flex justify-center mt-4">
              <button
                onClick={downloadMissionBrief}
                className="w-full mt-2 py-2 px-3 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 text-[10px] font-mono font-bold uppercase tracking-widest rounded-sm flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download className="w-3 h-3" /> Download Brief
              </button>
            </div>
          )}
        </div>

        <div className="p-2 bg-slate-100 dark:bg-slate-900/80 border-t border-slate-300 dark:border-slate-800 flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSend()}
            disabled={isSending}
            className="flex-1 bg-white dark:bg-[#0d1117] border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white px-3 py-2 text-[10px] rounded-sm outline-none focus:border-amber-500 transition-colors font-mono uppercase disabled:opacity-50"
            placeholder="AWAITING INPUT..."
          />
          <button
            onClick={() => {
              playClick();
              onSend();
            }}
            onMouseEnter={playHover}
            disabled={isSending}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-3 py-2 rounded-sm font-bold transition-all disabled:opacity-50"
          >
            <MessageSquare className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  // FULL VARIANT
  return (
    <div className="w-full h-full flex flex-col bg-transparent">
      <div
        className="flex-1 overflow-y-auto mb-4 pr-2 space-y-4 font-mono scroll-smooth"
        ref={messageContainerRef}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[75%] p-3 rounded-sm border text-[10px] md:text-xs uppercase tracking-wide leading-relaxed ${
                msg.sender === "user"
                  ? "bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/30"
                  : msg.sender === "system"
                    ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 w-full text-center font-bold tracking-widest my-2"
                    : "bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-300 border-slate-300 dark:border-slate-800"
              }`}
            >
              {msg.sender === "aegis" && (
                <span className="text-[10px] text-amber-600 dark:text-amber-500 block mb-1 font-bold">
                  AEGIS (VANCE, A.):
                </span>
              )}
              {msg.text}
            </div>
          </div>
        ))}

        {isAiTyping && (
          <div className="flex justify-start">
            <div className="text-amber-500 font-mono text-[10px] md:text-xs animate-pulse flex items-center gap-2 uppercase tracking-widest">
              <Loader2 className="w-3.5 h-3.5 animate-spin" /> Aegis is
              transmitting...
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2 pt-4 border-t border-slate-300 dark:border-slate-800 relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSend()}
          disabled={isSending}
          className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white px-4 py-3 rounded-sm outline-none focus:border-amber-500 transition-colors font-mono text-[10px] md:text-xs uppercase disabled:opacity-50"
          placeholder={
            isSending
              ? "PROCESSING..."
              : isPhase2
                ? "CHANNEL OPEN. SPEAK TO AEGIS..."
                : "AWAITING INPUT..."
          }
          autoFocus
        />
        <button
          onClick={() => {
            playClick();
            onSend();
          }}
          onMouseEnter={playHover}
          disabled={isSending}
          className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-6 py-3 rounded-sm font-bold transition-all disabled:opacity-50 flex items-center justify-center min-w-[100px] font-mono text-xs uppercase tracking-widest"
        >
          {isSending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Transmit"
          )}
        </button>
      </div>

      {isPhase2 && caseId && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => {
              playClick();
              downloadMissionBrief();
            }}
            onMouseEnter={playHover}
            className="flex items-center gap-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 dark:hover:bg-slate-800 text-slate-900 dark:text-white px-4 py-2 rounded-sm text-[10px] uppercase font-bold tracking-widest transition-colors"
            title="Download Mission Brief"
          >
            <Download className="w-3 h-3" />
            <span className="hidden sm:inline">Download Protocol</span>
          </button>
        </div>
      )}
    </div>
  );
}
