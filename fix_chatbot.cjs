
const fs = require("fs");
let content = fs.readFileSync("src/components/Chatbot.jsx", "utf8");

// Strict validation inside handleSend
const handleSendReplacement = `
  const handleSend = async () => {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput || isSending) return;

    if (!isPhase2 && CHAT_FLOW[step].key === "email") {
      const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
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
`;

content = content.replace(/const handleSend = async \(\) => \{[\s\S]*?else \{\s*await sendToAI\(userMessage\);\s*\}\s*\};/, handleSendReplacement.trim());

// Email JS fallback
content = content.replace(/import\.meta\.env\.VITE_SERVICE_ID/g, "import.meta.env.VITE_SERVICE_ID || \"test_service\"");
content = content.replace(/import\.meta\.env\.VITE_TEMPLATE_ID/g, "import.meta.env.VITE_TEMPLATE_ID || \"test_template\"");
content = content.replace(/import\.meta\.env\.VITE_PUBLIC_KEY/g, "import.meta.env.VITE_PUBLIC_KEY || \"test_key\"");
content = content.replace(/import\.meta\.env\.VITE_AI_API_KEY/g, "import.meta.env.VITE_AI_API_KEY || \"test_ai\"");

// Fix PDF background styling 
content = content.replace(/id="receipt-pdf"[\s\S]*?backgroundColor: "#ffffff",\s*\}\\}/, "id=\"receipt-pdf\"\n          style={{\n            padding: \"40px\",\n            fontFamily: \"monospace\",\n            color: \"#000000\",\n            backgroundColor: \"#ffffff\",\n          }}");

fs.writeFileSync("src/components/Chatbot.jsx", content, "utf8");

