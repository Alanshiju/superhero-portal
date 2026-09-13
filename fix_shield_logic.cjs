
const fs = require("fs");
let content = fs.readFileSync("src/components/ShieldSimulator.jsx", "utf8");

content = content.replace(/Math\.random\(\) \* canvas\.width/g, "Math.random() * canvas._logicalWidth");
content = content.replace(/Math\.random\(\) \* canvas\.height/g, "Math.random() * canvas._logicalHeight");
content = content.replace(/canvas\.width \/ 2/g, "canvas._logicalWidth / 2");
content = content.replace(/canvas\.height \/ 2/g, "canvas._logicalHeight / 2");
content = content.replace(/canvas\.width \+ 50/g, "canvas._logicalWidth + 50");
content = content.replace(/canvas\.height \+ 50/g, "canvas._logicalHeight + 50");
content = content.replace(/ctx\.clearRect\(0, 0, canvas\.width, canvas\.height\)/g, "ctx.clearRect(0, 0, canvas._logicalWidth, canvas._logicalHeight)");
// one exception: ctx.clearRect(0, 0, canvas.width, canvas.height); wait, since ctx is scaled, we clear logical width.

fs.writeFileSync("src/components/ShieldSimulator.jsx", content, "utf8");

