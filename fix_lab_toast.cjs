
const fs = require("fs");
let content = fs.readFileSync("src/pages/Lab.jsx", "utf8");

if (!content.includes("react-toastify")) {
  content = content.replace("import { useSound } from \"../context/SoundContext\";", "import { useSound } from \"../context/SoundContext\";\nimport { toast } from \"react-toastify\";");
  
  content = content.replace(/setStressTestActive\(\(prev\) => !prev\);/, "setStressTestActive((prev) => {\n      if (!prev) toast.warn(\"SIMULATION: High-velocity kinetic bombardment initiated.\");\n      return !prev;\n    });");
  
  fs.writeFileSync("src/pages/Lab.jsx", content, "utf8");
}

