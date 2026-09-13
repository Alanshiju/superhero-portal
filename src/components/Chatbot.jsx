import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import html2pdf from "html2pdf.js";
import { Download, Loader2 } from "lucide-react";

const CHAT_FLOW = [
  {
    key: "name",
    question: "I am Aegis. Tell me who you are—what is your name?",
  },
  { key: "age", question: "Understood. How old are you?" },
  { key: "location", question: "What is your current location or sector?" },
  {
    key: "email",
    question: "Where can my team reach you? Please provide your email address.",
  },
  {
    key: "grievance",
    question:
      "The channel is secure. Tell me: what has happened, and how can I help?",
  },
];

const SYSTEM_PROMPT = `You are Aegis, a stoic, protective, and calculating kinetic guardian. 
A distress log has just been secured and intercept units are deploying. 
You have established a direct telepathic/quantum link with the civilian.
Keep responses concise, in-character, reassuring but analytical. Do not break character.
Focus on kinetic shielding, threat assessment, and protecting the civilian.`;

export default function HybridChatbot() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [caseId, setCaseId] = useState("");

  // Phase 1 or Phase 2
  const [isPhase2, setIsPhase2] = useState(false);
  const [aiHistory, setAiHistory] = useState([
    { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
    { role: "model", parts: [{ text: "Understood. I am Aegis." }] },
  ]);

  const [messages, setMessages] = useState([
    { sender: "aegis", text: CHAT_FLOW[0].question },
  ]);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isSending) return;

    const userMessage = inputValue;
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInputValue("");

    if (!isPhase2) {
      // Phase 1: Deterministic
      const currentKey = CHAT_FLOW[step].key;
      const updatedData = { ...formData, [currentKey]: userMessage };
      setFormData(updatedData);

      if (step < CHAT_FLOW.length - 1) {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { sender: "aegis", text: CHAT_FLOW[step + 1].question },
          ]);
          setStep(step + 1);
        }, 600);
      } else {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              sender: "aegis",
              text: "Data collected. Processing secure transmission...",
            },
          ]);
          sendEmail(updatedData);
        }, 600);
      }
    } else {
      // Phase 2: Live AI Handoff
      await sendToAI(userMessage);
    }
  };

  const sendEmail = (data) => {
    setIsSending(true);

    emailjs
      .send(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        data,
        import.meta.env.VITE_PUBLIC_KEY,
      )
      .then(() => {
        const generatedId = `AEG-${Math.floor(1000 + Math.random() * 9000)}`;
        setCaseId(generatedId);

        setMessages((prev) => [
          ...prev,
          {
            sender: "system",
            text: `[SUCCESS] Dispatch sequence initiated. Case ID: ${generatedId}`,
          },
          {
            sender: "aegis",
            text: "Distress log secured. I have established direct telepathic/quantum link. Talk to me while our intercept units deploy.",
          },
        ]);

        setIsPhase2(true);
      })
      .catch((error) => {
        console.error("FAILED...", error);
        setMessages((prev) => [
          ...prev,
          { sender: "system", text: "[ERROR] Signal lost. Dispatch failed." },
        ]);
      })
      .finally(() => setIsSending(false));
  };

  const sendToAI = async (text) => {
    setIsSending(true);

    const newHistory = [...aiHistory, { role: "user", parts: [{ text }] }];
    setAiHistory(newHistory);

    try {
      const apiKey = import.meta.env.VITE_AI_API_KEY;
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: newHistory }),
        },
      );

      if (!response.ok) throw new Error("AI connection failed");

      const data = await response.json();
      const aiText =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Communication disrupted.";

      setAiHistory([
        ...newHistory,
        { role: "model", parts: [{ text: aiText }] },
      ]);
      setMessages((prev) => [...prev, { sender: "aegis", text: aiText }]);
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
    }
  };

  const downloadReceipt = () => {
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

  return (
    <div className="w-full max-w-3xl mx-auto p-1 bg-gradient-to-b from-blue-700 to-cyan-600 dark:from-cyan-900 dark:to-slate-900 rounded-xl shadow-2xl mt-8">
      <div className="bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 rounded-lg flex flex-col h-[600px] transition-colors border border-slate-200 dark:border-slate-800 relative">
        {isPhase2 && caseId && (
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={downloadReceipt}
              className="flex items-center gap-2 bg-slate-900 dark:bg-cyan-600/20 border border-transparent dark:border-cyan-500/30 hover:bg-slate-800 dark:hover:bg-cyan-500/40 text-white dark:text-cyan-400 px-4 py-2 rounded text-xs uppercase font-bold tracking-widest transition-colors shadow-lg"
              title="Download Mission Brief"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Briefing PDF</span>
            </button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto mb-4 pr-2 space-y-4 font-mono text-sm pt-8">
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
                      : "bg-slate-200 dark:bg-cyan-950/50 text-slate-800 dark:text-cyan-400 border border-slate-300 dark:border-cyan-900/50"
                }`}
              >
                {msg.sender === "aegis" && (
                  <span className="text-xs text-blue-800 dark:text-cyan-500 block mb-1 font-bold">
                    AEGIS_SYS:
                  </span>
                )}
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className="flex gap-2 pt-4 border-t border-slate-200 dark:border-slate-800 relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={isSending}
            className="flex-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white px-4 py-3 rounded outline-none focus:border-blue-500 dark:focus:border-cyan-500 transition-colors font-mono disabled:opacity-50"
            placeholder={
              isSending
                ? "Processing..."
                : isPhase2
                  ? "Direct link active..."
                  : "Type your response..."
            }
            autoFocus
          />
          <button
            onClick={handleSend}
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
