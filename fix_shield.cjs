
const fs = require("fs");
let content = fs.readFileSync("src/components/ShieldSimulator.jsx", "utf8");

content = content.replace("canvas.width = parent.clientWidth;", "const dpr = window.devicePixelRatio || 1;\n      canvas.width = parent.clientWidth * dpr;");
content = content.replace("canvas.height = 500;", "canvas.height = 500 * dpr;\n      canvas.style.width = \`\${parent.clientWidth}px\`;\n      canvas.style.height = \"500px\";\n      ctx.scale(dpr, dpr);");
// Update particle base positions to use unscaled logic if needed. Since width/height are scaled, Math.random() * canvas.width will be too large if we scaled ctx!
// Actually, if we scale ctx, drawing at x=500 is drawn at 500*dpr. But if canvas.width = 1000*dpr, Math.random() * canvas.width generates up to 2000.
// We should use parent.clientWidth instead of canvas.width for logic.

