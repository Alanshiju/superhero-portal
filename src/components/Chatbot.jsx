import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import html2pdf from "html2pdf.js";
import { toast } from "react-toastify";
import { Download, Loader2, Maximize2, X, MessageSquare } from "lucide-react";
import { useSound } from "../context/SoundContext";
import HeroAvatar from "./HeroAvatar";
import { useNavigate } from "react-router-dom";

const CHAT_FLOW = [
  {
    key: "name",
    question:
      "I am Aegis. My kinetic sensors detected your signal. What's your name?",
  },
  {
    key: "age",
    question: "Understood, {name}. To calibrate my response, what is your age?",
  },
  { key: "location", question: "What is your current location or sector?" },
  {
    key: "email",
    question:
      "Where can my emergency units reach you? Please provide your email address.",
  },
  {
    key: "grievance",
    question: "So... tell me. How can I help you?",
  },
];

export default function HybridChatbot({ variant = "full", onClose }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [caseId, setCaseId] = useState("");
  const navigate = useNavigate();

  const { playMessage, playAlert, playHover, playClick } = useSound();

  const [isPhase2, setIsPhase2] = useState(false);
  const [aiHistory, setAiHistory] = useState([]);

  const [messages, setMessages] = useState([
    { sender: "aegis", text: CHAT_FLOW[0].question },
  ]);

  const [isRestored, setIsRestored] = useState(false);

  const messageContainerRef = useRef(null);

  // Persistence: Load from localStorage
  useEffect(() => {
    if (variant === "full") {
      const savedState = localStorage.getItem("aegis_chat_state");
      if (savedState) {
        try {
          const parsed = JSON.parse(savedState);
          setStep(parsed.step);
          setFormData(parsed.formData);
          setMessages(parsed.messages);
          setIsPhase2(parsed.isPhase2);
          setCaseId(parsed.caseId);
          setAiHistory(parsed.aiHistory || []);
          setIsRestored(true);
          setTimeout(() => setIsRestored(false), 5000);
        } catch (e) {
          console.error("Failed to restore session", e);
        }
      }
    }
  }, [variant]);

  // Persistence: Save to localStorage
  useEffect(() => {
    if (variant === "full") {
      localStorage.setItem(
        "aegis_chat_state",
        JSON.stringify({
          step,
          formData,
          messages,
          isPhase2,
          caseId,
          aiHistory,
        }),
      );
    }
  }, [step, formData, messages, isPhase2, caseId, aiHistory, variant]);

  useEffect(() => {
    if (messageContainerRef.current && messages.length > 1) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages, isAiTyping]);

  const handleSend = async () => {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput || isSending) return;

    if (!isPhase2 && CHAT_FLOW[step].key === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedInput)) {
        setMessages(prev => [...prev, { sender: "user", text: trimmedInput }, { sender: "system", text: "[ERROR] INVALID EMAIL FORMAT. PLEASE PROVIDE A VALID COMMS LINK." }]);
        setInputValue("");
        return;
      }
    }

    playMessage();
    const userMessage = trimmedInput;
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInputValue("");

    if (!isPhase2) {
      const currentKey = CHAT_FLOW[step].key;
      const updatedData = { ...formData, [currentKey]: userMessage };
      setFormData(updatedData);

      if (step < CHAT_FLOW.length - 1) {
        setTimeout(() => {
          let nextQ = CHAT_FLOW[step + 1].question;
          if (nextQ.includes("{name}")) {
            nextQ = nextQ.replace("{name}", updatedData.name);
          }
          setMessages((prev) => [...prev, { sender: "aegis", text: nextQ }]);
          setStep(step + 1);
          playMessage();
        }, 600);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: "aegis",
            text: "Data collected. Processing secure transmission...",
          },
        ]);
        playMessage();
        await processGrievance(updatedData);
      }
    } else {
      await sendToAI(userMessage);
    }
  };

  const processGrievance = async (data) => {
    setIsSending(true);

    if (!navigator.onLine) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "system",
          text: "[OFFLINE_MODE] NETWORK UNAVAILABLE. QUEUING DISTRESS TELEMETRY LOCALLY. IT WILL TRANSMIT WHEN CONNECTION RESTORES.",
        },
      ]);
      setIsSending(false);
      return;
    }

    try {
      const templateParams = {
        name: data.name,
        age: data.age,
        location: data.location,
        email: data.email,
        grievance: data.grievance,
        submission_date: new Date().toLocaleString(),
        subject: "Someone Needs Your Help!",
      };

      await emailjs.send(
        import.meta.env.VITE_SERVICE_ID || "test_service",
        import.meta.env.VITE_TEMPLATE_ID || "test_template",
        templateParams,
        import.meta.env.VITE_PUBLIC_KEY || "test_key",
      );

      const generatedId = `AEG-${Math.floor(1000 + Math.random() * 9000)}`;
      setCaseId(generatedId);
      playAlert();
      toast.success("AEGIS DISPATCH: Incident telemetry transmitted to commander inbox.");

      setMessages((prev) => [
        ...prev,
        {
          sender: "system",
          text: `[SUCCESS] Dispatch sequence initiated. Case ID: ${generatedId}`,
        },
      ]);

      setIsPhase2(true);

      const systemPrompt = `System: You are Aegis (Dr. Alexander Vance), the Kinetic Guardian. The citizen ${data.name}, aged ${data.age} at location ${data.location}, has submitted the following critical grievance: '${data.grievance}'. Respond immediately as Aegis. Acknowledge their specific situation with empathy, explain what kinetic countermeasures or emergency units are being dispatched to their coordinates, and provide them with clear, reassuring instructions. Keep it concise, stoic, and in-character.`;

      setAiHistory([{ role: "user", parts: [{ text: systemPrompt }] }]);
      await sendToAI(systemPrompt, true);
    } catch (error) {
      console.error("FAILED...", error);
      toast.error("COMM ERROR: Uplink compromised. Distress signal cached locally.");
      setMessages((prev) => [
        ...prev,
        { sender: "system", text: "[ERROR] Signal lost. Dispatch failed." },
      ]);
      setIsSending(false);
    }
  };

  const sendToAI = async (text, isSystemPrompt = false) => {
    setIsSending(true);
    setIsAiTyping(!isSystemPrompt);

    let currentHistory;
    if (isSystemPrompt) {
      currentHistory = [{ role: "user", parts: [{ text }] }];
    } else {
      currentHistory = [...aiHistory, { role: "user", parts: [{ text }] }];
      setAiHistory(currentHistory);
    }

    try {
      const apiKey = import.meta.env.VITE_AI_API_KEY || "test_ai";
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: currentHistory }),
        },
      );

      if (!response.ok) throw new Error("AI connection failed");

      const data = await response.json();
      const aiText =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Communication disrupted.";

      setAiHistory([
        ...currentHistory,
        { role: "model", parts: [{ text: aiText }] },
      ]);
      setMessages((prev) => [...prev, { sender: "aegis", text: aiText }]);
      playMessage();
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          sender: "system",
          text: "[QUANTUM INTERFERENCE] Re-establishing link...",
        },
      ]);
    } finally {
      setIsSending(false);
      setIsAiTyping(false);
    }
  };

  const downloadReceipt = () => {
    toast.info("ENCRYPTED DOSSIER: Compiling PDF Mission Brief...");
    const element = document.getElementById("receipt-pdf");
    const opt = {
      margin: 1,
      filename: `${caseId}-Mission-Brief.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
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
          <div className="flex gap-2">
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
        </div>

        <div className="p-3 bg-slate-100 dark:bg-slate-900 border-t border-slate-300 dark:border-cyan-900/50 flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={isSending}
            className="flex-1 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-slate-950 dark:text-white px-3 py-2 text-sm rounded outline-none focus:border-blue-600 dark:focus:border-cyan-500 font-mono disabled:opacity-50"
            placeholder="Reply..."
          />
          <button
            onClick={() => {
              playClick();
              handleSend();
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
    <div className="w-full max-w-3xl mx-auto p-1 bg-gradient-to-b from-slate-300 to-slate-400 dark:from-cyan-900/80 dark:to-slate-900/80 dark:from-cyan-900/80 dark:to-slate-900/80 rounded-xl shadow-[0_0_40px_rgba(6,182,212,0.2)] mt-8 backdrop-blur-sm flex flex-col">
      <div className="bg-slate-200/90 dark:bg-slate-950/80 backdrop-blur-md p-4 sm:p-6 rounded-lg flex flex-col h-[650px] transition-colors border border-slate-400 dark:border-slate-800 relative">
        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-400 dark:border-slate-800">
          <HeroAvatar className="w-16 h-16 shrink-0" />
          <div className="flex flex-col">
            <span className="font-bold text-lg text-slate-900 dark:text-white font-mono">
              SECURE UPLINK: AEGIS
            </span>
            <span className="text-xs text-blue-700 dark:text-cyan-400 font-mono tracking-widest animate-pulse">
              ESTABLISHED • ENCRYPTED
            </span>
          </div>

          {isRestored && (
            <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-emerald-900/90 border border-emerald-500 text-emerald-400 px-4 py-1 rounded text-[10px] font-mono tracking-widest uppercase z-10 whitespace-nowrap animate-in fade-in slide-in-from-top-4 duration-500 shadow-lg">
              [SESSION RESTORED - RECONNECTED TO SECURE FREQUENCY]
            </div>
          )}

          {isPhase2 && caseId && (
            <button
              onClick={() => {
                playClick();
                downloadReceipt();
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

          {isSending && isPhase2 && aiHistory.length === 1 && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-cyan-950/50 text-slate-900 dark:text-cyan-400 border border-slate-300 dark:border-cyan-900/50 shadow-sm p-3 rounded-md max-w-[85%] font-mono text-xs flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-cyan-500" />
                AEGIS IS ANALYZING INCIDENT...
              </div>
            </div>
          )}

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
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
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
              handleSend();
            }}
            onMouseEnter={playHover}
            disabled={isSending}
            className="bg-blue-600 dark:bg-cyan-600 hover:bg-blue-700 dark:hover:bg-cyan-500 text-white dark:text-slate-950 px-6 py-3 rounded font-bold transition-all disabled:opacity-50 flex items-center justify-center min-w-[100px] font-mono"
          >
            {isSending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send"}
          </button>
        </div>
      </div>

      {/* HIDDEN PDF TEMPLATE */}
      <div style={{ display: "none" }}>
        <div
          id="receipt-pdf"
          style={{
            padding: "40px",
            fontFamily: "monospace",
            color: "#0f172a",
            backgroundColor: "#ffffff",
          }}
        >
          <div
            style={{
              borderBottom: "2px solid #0f172a",
              paddingBottom: "20px",
              marginBottom: "20px",
            }}
          >
            <h1
              style={{
                margin: 0,
                fontSize: "24px",
                textTransform: "uppercase",
                letterSpacing: "2px",
              }}
            >
              Aegis Command Center
            </h1>
            <h2
              style={{
                margin: "5px 0 0 0",
                fontSize: "14px",
                color: "#64748b",
              }}
            >
              OFFICIAL MISSION BRIEF
            </h2>
          </div>
          <div style={{ marginBottom: "30px" }}>
            <p>
              <strong>CASE ID:</strong> {caseId}
            </p>
            <p>
              <strong>TIMESTAMP:</strong> {new Date().toLocaleString()}
            </p>
            <p>
              <strong>STATUS:</strong> DISPATCHED
            </p>
          </div>
          <div
            style={{
              backgroundColor: "#f1f5f9",
              padding: "20px",
              borderRadius: "4px",
              marginBottom: "30px",
            }}
          >
            <h3
              style={{
                marginTop: 0,
                borderBottom: "1px solid #cbd5e1",
                paddingBottom: "10px",
              }}
            >
              CITIZEN PROFILE
            </h3>
            <p>
              <strong>NAME:</strong> {formData.name || "N/A"}
            </p>
            <p>
              <strong>AGE:</strong> {formData.age || "N/A"}
            </p>
            <p>
              <strong>LOCATION:</strong> {formData.location || "N/A"}
            </p>
            <p>
              <strong>CONTACT:</strong> {formData.email || "N/A"}
            </p>
          </div>
          <div>
            <h3
              style={{
                borderBottom: "1px solid #cbd5e1",
                paddingBottom: "10px",
              }}
            >
              INCIDENT REPORT
            </h3>
            <p style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
              {formData.grievance || "No details provided."}
            </p>
          </div>
          <div
            style={{
              marginTop: "50px",
              fontSize: "12px",
              color: "#94a3b8",
              textAlign: "center",
              borderTop: "1px solid #e2e8f0",
              paddingTop: "20px",
            }}
          >
            Aegis Kinetic Grid System • End of Transmission
          </div>
        </div>
      </div>
    </div>
  );
}
