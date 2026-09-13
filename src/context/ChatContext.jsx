
import React, { createContext, useContext, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import html2pdf from "html2pdf.js";
import { toast } from "react-toastify";
import { useSound } from "./SoundContext";

const CHAT_FLOW = [
  { key: "name", question: "I am Aegis. My kinetic sensors detected your signal. What's your name?" },
  { key: "age", question: "Understood, {name}. To calibrate my response, what is your age?" },
  { key: "location", question: "What is your current location or sector?" },
  { key: "email", question: "Where can my emergency units reach you? Please provide your email address." },
  { key: "grievance", question: "So... tell me. How can I help you?" },
];

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [caseId, setCaseId] = useState("");
  const [isPhase2, setIsPhase2] = useState(false);
  const [aiHistory, setAiHistory] = useState([]);
  const [messages, setMessages] = useState([
    { sender: "aegis", text: CHAT_FLOW[0].question },
  ]);

  const { playMessage, playAlert } = useSound();

  // Persistence: Load from localStorage
  useEffect(() => {
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
      } catch (e) {
        console.error("Failed to restore session", e);
      }
    }
  }, []);

  // Persistence: Save to localStorage
  useEffect(() => {
    localStorage.setItem(
      "aegis_chat_state",
      JSON.stringify({ step, formData, messages, isPhase2, caseId, aiHistory })
    );
  }, [step, formData, messages, isPhase2, caseId, aiHistory]);

  const resetChat = () => {
    localStorage.removeItem("aegis_chat_state");
    setStep(0);
    setFormData({});
    setMessages([{ sender: "aegis", text: CHAT_FLOW[0].question }]);
    setIsPhase2(false);
    setCaseId("");
    setAiHistory([]);
    setIsSending(false);
    setIsAiTyping(false);
  };

  const handleSendMessage = async (userMessageText) => {
    if (!userMessageText || isSending) return;

    if (!isPhase2 && CHAT_FLOW[step].key === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userMessageText)) {
        setMessages(prev => [...prev, { sender: "user", text: userMessageText }, { sender: "system", text: "[ERROR] INVALID EMAIL FORMAT. PLEASE PROVIDE A VALID COMMS LINK." }]);
        return;
      }
    }

    playMessage();
    setMessages((prev) => [...prev, { sender: "user", text: userMessageText }]);

    if (!isPhase2) {
      const currentKey = CHAT_FLOW[step].key;
      const updatedData = { ...formData, [currentKey]: userMessageText };
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
      await sendToAI(userMessageText);
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
        }
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

  const downloadMissionBrief = () => {
    toast.info("ENCRYPTED DOSSIER: Compiling PDF Mission Brief...");
    const element = document.getElementById("receipt-pdf");
    if (!element) return;
  
    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: `${caseId || "AEGIS"}-Mission-Brief.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById("receipt-pdf");
          if (clonedElement) {
            clonedElement.style.display = "block";
          }
        }
      },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
    };
  
    html2pdf().set(opt).from(element).save();
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        step,
        formData,
        isSending,
        isAiTyping,
        caseId,
        isPhase2,
        aiHistory,
        handleSendMessage,
        downloadMissionBrief,
        resetChat
      }}
    >
      {children}
      {/* Hidden PDF Container - zero Tailwind classes to prevent oklch parsing */}
      <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
        <div
          id="receipt-pdf"
          style={{
            width: "700px",
            padding: "40px",
            backgroundColor: "#ffffff",
            color: "#0f172a",
            fontFamily: "Courier, monospace",
            boxSizing: "border-box"
          }}
        >
          <div style={{ borderBottom: "2px solid #0f172a", paddingBottom: "16px", marginBottom: "24px" }}>
            <h1 style={{ margin: 0, fontSize: "22px", textTransform: "uppercase", letterSpacing: "2px", color: "#0f172a" }}>
              AEGIS COMMAND // DISPATCH DOSSIER
            </h1>
            <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#475569" }}>
              OFFICIAL CITIZEN DISTRESS TELEMETRY RECEIPT
            </p>
          </div>

          <div style={{ marginBottom: "20px", padding: "12px", backgroundColor: "#f1f5f9", borderLeft: "4px solid #0284c7" }}>
            <p style={{ margin: "3px 0", fontSize: "13px" }}><strong>CASE DESIGNATION:</strong> {caseId || "AEG-TRANSMIT"}</p>
            <p style={{ margin: "3px 0", fontSize: "13px" }}><strong>TIMESTAMP:</strong> {new Date().toLocaleString()}</p>
            <p style={{ margin: "3px 0", fontSize: "13px" }}><strong>GRID STATUS:</strong> INTERCEPTION UNITS DEPLOYED</p>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <h3 style={{ fontSize: "14px", borderBottom: "1px solid #cbd5e1", paddingBottom: "6px", margin: "0 0 10px 0", color: "#0f172a" }}>
              CITIZEN TELEMETRY
            </h3>
            <p style={{ margin: "4px 0", fontSize: "12px" }}><strong>NAME:</strong> {formData?.name || "N/A"}</p>
            <p style={{ margin: "4px 0", fontSize: "12px" }}><strong>AGE:</strong> {formData?.age || "N/A"}</p>
            <p style={{ margin: "4px 0", fontSize: "12px" }}><strong>SECTOR / LOCATION:</strong> {formData?.location || "N/A"}</p>
            <p style={{ margin: "4px 0", fontSize: "12px" }}><strong>COMM FREQUENCY:</strong> {formData?.email || "N/A"}</p>
          </div>

          <div style={{ marginBottom: "24px" }}>
            <h3 style={{ fontSize: "14px", borderBottom: "1px solid #cbd5e1", paddingBottom: "6px", margin: "0 0 10px 0", color: "#0f172a" }}>
              INCIDENT LOG & GRIEVANCE
            </h3>
            <p style={{ margin: "4px 0", fontSize: "12px", lineHeight: "1.6", whiteSpace: "pre-wrap", color: "#1e293b" }}>
              {formData?.grievance || "No specific grievance recorded."}
            </p>
          </div>

          <div style={{ marginTop: "40px", paddingTop: "16px", borderTop: "1px solid #e2e8f0", textAlign: "center", fontSize: "11px", color: "#94a3b8" }}>
            AEGIS_SYS KINETIC PERIMETER � QUANTUM ENCRYPTED TRANSMISSION � END OF BRIEF
          </div>
        </div>
      </div>
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
}

