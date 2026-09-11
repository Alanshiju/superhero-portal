import { useState } from 'react';
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
  const [isFinished, setIsFinished] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [emailStatus, setEmailStatus] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const currentKey = CHAT_FLOW[step].key;
    const updatedData = { ...formData, [currentKey]: inputValue };
    
    setFormData(updatedData);
    setInputValue('');

    if (step < CHAT_FLOW.length - 1) {
      setStep(step + 1);
    } else {
      setIsFinished(true);
      sendEmail(updatedData);
    }
  };

  const sendEmail = (data) => {
    setIsSending(true);
    console.log(import.meta.env.VITE_SERVICE_ID, import.meta.env.VITE_TEMPLATE_ID, import.meta.env.VITE_PUBLIC_KEY);
    // Replace these 3 strings with your actual EmailJS keys
    emailjs.send(
      import.meta.env.VITE_SERVICE_ID,
      import.meta.env.VITE_TEMPLATE_ID,
      {
        name: data.name,
        age: data.age,
        location: data.location,
        email: data.email,
        grievance: data.grievance
      },
      import.meta.env.VITE_PUBLIC_KEY
    )
    .then(() => {
      setIsSending(false);
      setEmailStatus('Transmission successful. Dispatch sequence initiated.');
    })
    .catch((error) => {
      console.error('FAILED...', error);
      setIsSending(false);
      setEmailStatus('Error: Signal lost. Please try again.');
    });
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-slate-900 text-cyan-400 rounded-lg shadow-lg font-mono mt-10">
      <div className="h-64 overflow-y-auto mb-4 border border-cyan-800 p-4 rounded bg-slate-950">
        {!isFinished ? (
          <div className="animate-pulse">
            <p className="text-cyan-500 mb-1 text-xs">AEGIS_SYSTEM_PROMPT:</p>
            <p>{CHAT_FLOW[step].question}</p>
          </div>
        ) : (
          <div>
            <p className="text-green-400 mb-2">Data collected. Processing...</p>
            {isSending && <p className="text-yellow-400 animate-pulse">Transmitting to secure server...</p>}
            {emailStatus && <p className="text-blue-400 mt-2">{emailStatus}</p>}
          </div>
        )}
      </div>

      {!isFinished && (
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-slate-800 border border-cyan-800 text-white px-3 py-2 rounded outline-none focus:border-cyan-400 transition-colors"
            placeholder="Type your response..."
            autoFocus
          />
          <button 
            onClick={handleSend}
            className="bg-cyan-600 hover:bg-cyan-500 text-slate-900 px-6 py-2 rounded font-bold transition-colors"
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
}