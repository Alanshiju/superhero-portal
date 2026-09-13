
const fs = require("fs");

let chatbot = fs.readFileSync("src/components/Chatbot.jsx", "utf8");
chatbot = chatbot.replace("import { Link, useNavigate } from \"react-router-dom\";", "import { useNavigate } from \"react-router-dom\";");
fs.writeFileSync("src/components/Chatbot.jsx", chatbot, "utf8");

let operations = fs.readFileSync("src/pages/Operations.jsx", "utf8");
operations = operations.replace("  Shield,\n", "");
fs.writeFileSync("src/pages/Operations.jsx", operations, "utf8");

