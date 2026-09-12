import { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';

const CHAT_FLOW = [
  { key: 'name', question: "I am Aegis. Tell me who you are—what is your name?" },
  { key: 'age', question: "Understood. How old are you?" },
  { key: 'location', question: "What is your current location or sector?" },
  { key: 'email', question: "Where can my team reach you? Please provide your email address." },
  { key: 'grievance', question: "The channel is secure. Tell me: what has happened, and how can I help?" }
];

export default function Chatbot() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  
  // New state to hold the entire conversation history
  const [messages, setMessages] = useState([
    { sender: 'aegis', text: CHAT_FLOW[0].question }
  ]);
  
  // Reference to auto-scroll to the bottom
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim() || isSending) return;

    const currentKey = CHAT_FLOW[step].key;
    const updatedData = { ...formData, [currentKey]: inputValue };
    
    // Add user's message to the chat
    setMessages(prev => [...prev, { sender: 'user', text: inputValue }]);
    setFormData(updatedData);
    setInputValue('');

    if (step < CHAT_FLOW.length - 1) {
      // Simulate Aegis "typing" with a tiny delay
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'aegis', text: CHAT_FLOW[step + 1].question }]);
        setStep(step + 1);
      }, 600);
    } else {
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'aegis', text: "Data collected. Processing secure transmission..." }]);
        sendEmail(updatedData);
      }, 600);
    }
  };

  const sendEmail = (data) => {
    setIsSending(true);
    
    emailjs.send(
      import.meta.env.VITE_SERVICE_ID, 
      import.meta.env.VITE_TEMPLATE_ID,
      data,
      import.meta.env.VITE_PUBLIC_KEY
    )
    .then(() => {
      setMessages(prev => [...prev, { 
        sender: 'system', 
        text: `[SUCCESS] Dispatch sequence initiated. Aegis team en route. Case ID: AEG-${Math.floor(1000 + Math.random() * 9000)}` 
      }]);
    })
    .catch((error) => {
      console.error('FAILED...', error);
      setMessages(prev => [...prev, { sender: 'system', text: "[ERROR] Signal lost. Please refresh and try again." }]);
    })
    .finally(() => setIsSending(false));
  };

  return (
    <div className="max-w-xl mx-auto p-1 bg-gradient-to-b from-cyan-900 to-slate-900 rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.15)] mt-10">
      <div className="bg-slate-950 p-4 rounded-lg flex flex-col h-96">
        
        {/* Chat History Window */}
        <div className="flex-1 overflow-y-auto mb-4 pr-2 space-y-4 font-mono text-sm">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-md ${
                msg.sender === 'user' 
                  ? 'bg-slate-800 text-cyan-100 border border-slate-700' 
                  : msg.sender === 'system'
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800 w-full text-center mt-4'
                  : 'bg-cyan-950/50 text-cyan-400 border border-cyan-900/50'
              }`}>
                {msg.sender === 'aegis' && <span className="text-xs text-cyan-600 block mb-1">AEGIS_SYS:</span>}
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="flex gap-2 pt-2 border-t border-slate-800">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={isSending}
            className="flex-1 bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded outline-none focus:border-cyan-500 transition-colors font-mono disabled:opacity-50"
            placeholder={isSending ? "Transmitting..." : "Type your response..."}
            autoFocus
          />
          <button 
            onClick={handleSend}
            disabled={isSending}
            className="bg-cyan-600 hover:bg-cyan-500 text-slate-950 px-6 py-3 rounded font-bold transition-all hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}