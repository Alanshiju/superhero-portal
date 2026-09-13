
const fs = require("fs");

function replaceInFile(filePath, replacements) {
  let content = fs.readFileSync(filePath, "utf8");
  let original = content;
  for (let [pattern, replacement] of replacements) {
    content = content.replace(pattern, replacement);
  }
  if (content !== original) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log("Fixed " + filePath);
  }
}

const files = ["src/pages/Intel.jsx", "src/pages/Operations.jsx", "src/pages/Lab.jsx", "src/pages/Home.jsx", "src/components/ThreatRadar.jsx", "src/components/Footer.jsx"];

files.forEach(f => {
  replaceInFile(f, [
    [/text-cyan-600/g, "text-blue-800 dark:text-cyan-600"],
    [/text-cyan-500/g, "text-blue-700 dark:text-cyan-500"],
    [/bg-cyan-500\/10/g, "bg-blue-100 dark:bg-cyan-500/10"],
    [/bg-cyan-500\/20/g, "bg-blue-200 dark:bg-cyan-500/20"],
    [/border-cyan-500\/20/g, "border-blue-300 dark:border-cyan-500/20"],
    [/border-cyan-500\/30/g, "border-blue-300 dark:border-cyan-500/30"],
    [/border-cyan-500\/50/g, "border-blue-400 dark:border-cyan-500/50"],
    [/bg-cyan-900\/80/g, "bg-blue-900 dark:bg-cyan-900/80"],
    [/text-cyan-400/g, "text-blue-600 dark:text-cyan-400"],
    [/bg-white\/90/g, "bg-white"],
    [/shadow-\\[0_0_15px_rgba\(6,182,212,0\.3\)\\]/g, "shadow-lg border border-slate-300 dark:border-transparent dark:shadow-[0_0_15px_rgba(6,182,212,0.3)]"],
    [/shadow-\\[0_0_30px_rgba\(6,182,212,0\.3\)\\]/g, "shadow-xl border border-slate-300 dark:border-transparent dark:shadow-[0_0_30px_rgba(6,182,212,0.3)]"]
  ]);
});

