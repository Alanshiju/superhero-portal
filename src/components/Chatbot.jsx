
import { useState, useRef, useEffect } from "react";
import { Download, Loader2, Maximize2, X, MessageSquare } from "lucide-react";
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
    downloadMissionBrief
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
    handleSendMessage(inputValue);
    setInputValue("");
  };

  if (variant === "floating") {
    return (
      <div className="w-full max-w-sm bg-white/95 border border-slate-300 dark:bg-slate-950/95 backdrop-blur-xl border border-cyan-500/50 rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.3)] flex flex-col h-[500px] overflow-hidden">
        <div className="bg-blue-800 dark:bg-cyan-900/80 p-3 flex justify-between items-center border-b border-cyan-500/50">
          <div className="flex items-center gap-2">
            <HeroAvatar className="w-8 h-8 shrink-0" />
            <span className="font-bold text-sm text-white font-mono tracking-wider">
              AEGIS COMM-LINK
            </span>
          </div>
          <div className="flex gap-2 items-center">
            {isPhase2 && caseId && (
              <button
                onClick={() => {
                  playClick();
                  downloadMissionBrief();
                }}
                className="p-1 hover:bg-cyan-700 rounded text-cyan-100 transition-colors"
                title="Download Mission Brief"
              >
                <Download className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => {
                playClick();
                navigate("/dispatch");
              }}
              className="p-1 hover:bg-cyan-700 rounded text-cyan-100 transition-colors"
              title="Expand Full Terminal"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            {onClose && (
              <button
                onClick={() => {
                  playClick();
                  onClose();
                }}
                className="p-1 hover:bg-cyan-700 rounded text-cyan-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div
          ref={messageContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm scroll-smooth"
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] p-2 rounded-md shadow-sm text-xs ${
                  msg.sender === "user"
                    ? "bg-blue-700 dark:bg-cyan-700 text-white border border-blue-800 dark:border-cyan-600"
                    : msg.sender === "system"
                      ? "bg-emerald-950 text-emerald-400 border border-emerald-800 w-full text-center font-bold"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-cyan-300 border border-slate-300 dark:border-cyan-900/50"
                }`}
              >
                {msg.sender === "aegis" && (
                  <span className="text-[10px] text-cyan-500 block mb-1 font-bold">
                    AEGIS:
                  </span>
                )}
                {msg.text}
              </div>
            </div>
          ))}
          {isAiTyping && (
            <div className="flex justify-start">
              <div className="text-cyan-500 font-mono text-xs animate-pulse flex items-center gap-2">
                <Loader2 className="w-3 h-3 animate-spin" /> Transmitting...
              </div>
            </div>
          )}
          {isPhase2 && caseId && (
            <div className="flex justify-center mt-4">
              <button 
                onClick={downloadMissionBrief}
                className="w-full mt-2 py-1.5 px-3 bg-cyan-600 hover:bg-cyan-500 text-slate-950 text-xs font-mono font-bold uppercase rounded flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5"/> Download Mission Brief
              </button>
            </div>
          )}
        </div>

        <div className="p-3 bg-slate-100 dark:bg-slate-900 border-t border-slate-300 dark:border-cyan-900/50 flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSend()}
            disabled={isSending}
            className="flex-1 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-slate-950 dark:text-white px-3 py-2 text-sm rounded outline-none focus:border-blue-600 dark:focus:border-cyan-500 font-mono disabled:opacity-50"
            placeholder="Reply..."
          />
          <button
            onClick={() => {
              playClick();
              onSend();
            }}
            onMouseEnter={playHover}
            disabled={isSending}
            className="bg-blue-700 dark:bg-cyan-600 hover:bg-blue-800 dark:hover:bg-cyan-500 text-white px-3 py-2 rounded font-bold transition-all disabled:opacity-50"
          >
            <MessageSquare className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // FULL VARIANT
  return (
    <div className="w-full max-w-3xl mx-auto p-1 bg-gradient-to-b from-slate-300 to-slate-400 dark:from-cyan-900/80 dark:to-slate-900/80 rounded-xl shadow-[0_0_40px_rgba(6,182,212,0.2)] mt-8 backdrop-blur-sm flex flex-col">
      <div className="bg-slate-200/90 dark:bg-slate-950/80 backdrop-blur-md p-4 sm:p-6 rounded-lg flex flex-col h-[650px] transition-colors border border-slate-400 dark:border-slate-800 relative">
        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-400 dark:border-slate-800">
          <HeroAvatar className="w-16 h-16 shrink-0" />
          <div className="flex flex-col">
            <span className="font-bold text-lg text-slate-900 dark:text-white font-mono">
              SECURE UPLINK: AEGIS
            </span>
            <span className="text-xs text-blue-700 dark:text-cyan-400 font-mono tracking-widest animate-pulse">
              ESTABLISHED � ENCRYPTED
            </span>
          </div>

          {isPhase2 && caseId && (
            <button
              onClick={() => {
                playClick();
                downloadMissionBrief();
              }}
              onMouseEnter={playHover}
              className="ml-auto flex items-center gap-2 bg-slate-900 dark:bg-cyan-600/20 border border-transparent dark:border-cyan-500/30 hover:bg-slate-800 dark:hover:bg-cyan-500/40 text-white dark:text-cyan-400 px-4 py-2 rounded text-xs uppercase font-bold tracking-widest transition-colors shadow-lg"
              title="Download Mission Brief"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">
                Download Official Mission Brief
              </span>
            </button>
          )}
        </div>

        <div
          ref={messageContainerRef}
          className="flex-1 overflow-y-auto mb-4 pr-2 space-y-4 font-mono text-sm scroll-smooth"
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] p-3 rounded-md shadow-sm ${
                  msg.sender === "user"
                    ? "bg-blue-600 dark:bg-slate-800 text-white dark:text-cyan-100 border border-blue-700 dark:border-slate-700"
                    : msg.sender === "system"
                      ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 w-full text-center my-4 font-bold tracking-wide"
                      : "bg-white dark:bg-cyan-950/50 text-slate-900 dark:text-cyan-400 border border-slate-300 dark:border-cyan-900/50 shadow-sm"
                }`}
              >
                {msg.sender === "aegis" && (
                  <span className="text-xs text-blue-800 dark:text-cyan-500 font-bold block mb-1 font-bold">
                    AEGIS (VANCE, A.):
                  </span>
                )}
                {msg.text}
              </div>
            </div>
          ))}

          {isAiTyping && (
            <div className="flex justify-start">
              <div className="text-cyan-500 font-mono text-xs animate-pulse flex items-center gap-2">
                <Loader2 className="w-3 h-3 animate-spin" /> Aegis is
                transmitting...
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-4 border-t border-slate-400 dark:border-slate-800 relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSend()}
            disabled={isSending}
            className="flex-1 bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 text-slate-950 dark:text-white px-4 py-3 rounded outline-none focus:border-blue-600 dark:focus:border-cyan-500 transition-colors font-mono disabled:opacity-50"
            placeholder={
              isSending
                ? "Processing..."
                : isPhase2
                  ? "Channel open. Speak to Aegis..."
                  : "Type your response..."
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
            className="bg-blue-600 dark:bg-cyan-600 hover:bg-blue-700 dark:hover:bg-cyan-500 text-white dark:text-slate-950 px-6 py-3 rounded font-bold transition-all disabled:opacity-50 flex items-center justify-center min-w-[100px] font-mono"
          >
            {isSending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}

