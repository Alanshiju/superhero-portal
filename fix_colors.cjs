
const fs = require("fs");

function replaceInFile(filePath, replacements) {
  let content = fs.readFileSync(filePath, "utf8");
  for (let [pattern, replacement] of replacements) {
    content = content.replace(pattern, replacement);
  }
  fs.writeFileSync(filePath, content, "utf8");
  console.log("Fixed " + filePath);
}

replaceInFile("src/components/Chatbot.jsx", [
  [/bg-slate-200\/95/g, "bg-white/95 border border-slate-300"],
  [/bg-cyan-900\/80/g, "bg-blue-800 dark:bg-cyan-900/80"],
  [/text-cyan-50 font-mono/g, "text-white font-mono"],
  [/bg-cyan-700 text-white border border-cyan-600/g, "bg-blue-700 dark:bg-cyan-700 text-white border border-blue-800 dark:border-cyan-600"],
  [/bg-slate-800 text-cyan-300 border border-cyan-900\/50/g, "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-cyan-300 border border-slate-300 dark:border-cyan-900/50"],
  [/bg-slate-900 border-t border-cyan-900\/50/g, "bg-slate-100 dark:bg-slate-900 border-t border-slate-300 dark:border-cyan-900/50"],
  [/bg-slate-800 border border-slate-700 text-white/g, "bg-white dark:bg-slate-800 border border-slate-400 dark:border-slate-700 text-slate-900 dark:text-white"],
  [/focus:border-cyan-500/g, "focus:border-blue-600 dark:focus:border-cyan-500"],
  [/bg-cyan-600 hover:bg-cyan-500/g, "bg-blue-700 dark:bg-cyan-600 hover:bg-blue-800 dark:hover:bg-cyan-500"],
  [/bg-gradient-to-b from-blue-700 to-cyan-600/g, "bg-gradient-to-b from-slate-300 to-slate-400 dark:from-cyan-900/80 dark:to-slate-900/80"],
  [/text-cyan-600 dark:text-cyan-400/g, "text-blue-700 dark:text-cyan-400"],
  [/bg-slate-200 dark:bg-cyan-950\/50 text-slate-800 dark:text-cyan-400 border border-slate-400 dark:border-cyan-900\/50/g, "bg-white dark:bg-cyan-950/50 text-slate-900 dark:text-cyan-400 border border-slate-300 dark:border-cyan-900/50 shadow-sm"],
  [/text-blue-800 dark:text-cyan-500/g, "text-blue-800 dark:text-cyan-500 font-bold"]
]);

replaceInFile("src/components/Layout.jsx", [
  [/border-cyan-500\/50 shadow-\\[inset_0_0_50px_rgba\\(6,182,212,0\\.3\\)\\]/g, "border-blue-800/20 dark:border-cyan-500/50 shadow-[inset_0_0_50px_rgba(30,58,138,0.1)] dark:shadow-[inset_0_0_50px_rgba(6,182,212,0.3)]"],
  [/bg-slate-950 border-t border-cyan-900/g, "bg-slate-200 dark:bg-slate-950 border-t border-slate-400 dark:border-cyan-900"],
  [/text-cyan-500\/80/g, "text-blue-800 dark:text-cyan-500/80"],
  [/bg-cyan-400/g, "bg-blue-700 dark:bg-cyan-400"]
]);

replaceInFile("src/components/Navbar.jsx", [
  [/border-cyan-500\/20/g, "border-slate-300 dark:border-cyan-500/30"],
  [/text-cyan-600/g, "text-blue-700"],
  [/bg-cyan-500\/10/g, "bg-blue-100 dark:bg-cyan-500/10"],
  [/text-cyan-700/g, "text-blue-800"],
  [/hover:text-cyan-500/g, "hover:text-blue-700 dark:hover:text-cyan-400"],
  [/bg-cyan-900\/90 text-cyan-100/g, "bg-blue-900 dark:bg-cyan-900/90 text-white dark:text-cyan-100"],
  [/border-cyan-500\/50/g, "border-blue-800/50 dark:border-cyan-500/50"]
]);

