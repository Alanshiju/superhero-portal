
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { SoundProvider } from "./context/SoundContext.jsx";
import { ChatProvider } from "./context/ChatContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <SoundProvider>
        <ChatProvider>
          <App />
        </ChatProvider>
      </SoundProvider>
    </ThemeProvider>
  </StrictMode>,
);

