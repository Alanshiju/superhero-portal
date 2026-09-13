
const fs = require("fs");

function replaceInFile(filePath, replacements) {
  let content = fs.readFileSync(filePath, "utf8");
  for (let [pattern, replacement] of replacements) {
    content = content.replace(pattern, replacement);
  }
  fs.writeFileSync(filePath, content, "utf8");
  console.log("Fixed " + filePath);
}

replaceInFile("src/components/HeroSection.jsx", [
  [/shadow-\\[0_0_20px_rgba\(6,182,212,0\.5\)\\]/g, "shadow-xl border-4 border-slate-200 dark:border-transparent dark:shadow-[0_0_20px_rgba(6,182,212,0.5)]"],
  [/from-blue-700 to-cyan-600/g, "from-blue-900 to-blue-700"],
  [/text-slate-700/g, "text-slate-800 font-medium"],
  [/bg-white\/80/g, "bg-white"]
]);

