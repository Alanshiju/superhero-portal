
const fs = require("fs");
let content = fs.readFileSync("src/components/KineticMesh.jsx", "utf8");
content = content.replace(/"rgba\\(30, 58, 138, 0\\.5\\)"/g, "\"rgba(30, 58, 138, 0.7)\"");
content = content.replace(/\\(1 - distance \/ mouse\\.radius\\) \\* \\(isDark \\? 1 : 0\\.6\\)/g, "(1 - distance / mouse.radius) * (isDark ? 1 : 0.8)");
content = content.replace(/\\(1 - distance \/ 130\\) \\* \\(isDark \\? 1 : 0\\.4\\)/g, "(1 - distance / 130) * (isDark ? 1 : 0.65)");
fs.writeFileSync("src/components/KineticMesh.jsx", content, "utf8");

