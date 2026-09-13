
const fs = require("fs");
let content = fs.readFileSync("src/components/Chatbot.jsx", "utf8");

if (!content.includes("react-toastify")) {
  content = content.replace("import html2pdf from \"html2pdf.js\";", "import html2pdf from \"html2pdf.js\";\nimport { toast } from \"react-toastify\";");
  
  // success email submission
  content = content.replace("setCaseId(generatedId);\n      playAlert();", "setCaseId(generatedId);\n      playAlert();\n      toast.success(\"AEGIS DISPATCH: Incident telemetry transmitted to commander inbox.\");");
  
  // failure/error email submission
  content = content.replace("console.error(\"FAILED...\", error);", "console.error(\"FAILED...\", error);\n      toast.error(\"COMM ERROR: Uplink compromised. Distress signal cached locally.\");");
  
  // mission brief download
  content = content.replace("const downloadReceipt = () => {", "const downloadReceipt = () => {\n    toast.info(\"ENCRYPTED DOSSIER: Compiling PDF Mission Brief...\");");
  
  fs.writeFileSync("src/components/Chatbot.jsx", content, "utf8");
}

