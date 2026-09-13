# AEGIS_SYS | The Kinetic Guardian

A production-grade, multi-route superhero dispatch portal engineered for the TechAscent Machine Test.

**Developer:** Alan Shiju  
**Institution:** Jyothi Engineering College  
**Program:** B.Tech, Computer Science and Engineering

## 🚀 Overview

AEGIS_SYS is not just a landing page; it is a fully functional, interactive narrative experience. It combines a strict deterministic state-machine for reliable data collection with a live AI handoff for dynamic storytelling. The application architecture prioritizes fault tolerance, complex mathematical rendering, and seamless user experience.

## ⚡ Core Technical Features

- **Hybrid Chatbot Architecture:** Implements a two-phase data collection system. Phase 1 utilizes a hardcoded state machine to securely gather citizen telemetry and instantly dispatch an automated email via EmailJS. Phase 2 transitions seamlessly to a live LLM (Gemini API) for dynamic, in-character crisis management.
- **Real-Time Graphical Computation:** Bypasses standard CSS for raw HTML5 Canvas rendering. Features a global interactive kinetic mesh with cursor-gravity physics and a rotating 3D wireframe shield core built purely with JavaScript vector mathematics.
- **Cryptographic Dossier Generation:** Leverages `html2pdf.js` to compile secure citizen data and a randomized Case ID into a formatted, downloadable PDF Mission Brief.
- **Tactical UI/UX:** Built with React Router DOM for seamless navigation across 5 dedicated operational routes. Features a custom-engineered Light/Dark mode toggle integrated directly with Tailwind CSS v4 class variants.
- **Hardware & Browser APIs:** Utilizes the Geolocation API for the 1-Click Rapid Distress Beacon and the Web Audio API for synthesized, zero-dependency resonance feedback and UI sound effects.

## 🛠️ Technology Stack

- **Frontend Framework:** React (Vite)
- **Styling:** Tailwind CSS v4, Lucide React (Icons)
- **Routing:** React Router DOM
- **APIs & Services:** EmailJS (Automated Dispatch), Gemini (Live Conversational AI)
- **Libraries:** html2pdf.js (Document Generation), react-toastify (UI Notifications)

## ⚙️ Local Installation & Setup

1. Clone the repository:
   ```bash
   git clone [your-github-repo-link]
   Navigate to the project directory and install dependencies:
   ```

Bash
cd aegis-sys
npm install
Create a .env file in the root directory and add the following keys:

Code snippet
VITE_SERVICE_ID=your_emailjs_service_id
VITE_TEMPLATE_ID=your_emailjs_template_id
VITE_PUBLIC_KEY=your_emailjs_public_key
VITE_AI_API_KEY=your_gemini_api_key
Start the development server:

Bash
npm run dev
🛡️ Primary Directive
"When all shields fall, Aegis stands."
