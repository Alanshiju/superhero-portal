
const fs = require("fs");

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  // Primary Containers & Cards
  content = content.replace(/bg-white(\/80)?\s+dark:bg-slate-900\/50\s+backdrop-blur-md\s+(p-\d+)?\s*rounded-xl\s+border\s+border-slate-400\s+dark:border-slate-800\s+shadow-lg/g, 
    "bg-white border-2 border-slate-200 shadow-lg shadow-slate-200/50 dark:bg-slate-900/70 dark:border-slate-800 dark:shadow-none rounded-xl $2");
    
  content = content.replace(/bg-white(\/90)?\s+dark:bg-slate-900\/80\s+border\s+border-slate-400\s+dark:border-slate-800/g,
    "bg-white border-2 border-slate-200 shadow-lg shadow-slate-200/50 dark:bg-slate-900/70 dark:border-slate-800 dark:shadow-none");
    
  // Typography Hierarchy
  // Headings
  content = content.replace(/text-slate-900\s+dark:text-white\s+uppercase/g, "text-slate-950 dark:text-white font-extrabold uppercase");
  content = content.replace(/text-slate-900\s+dark:text-white/g, "text-slate-950 dark:text-white font-extrabold");

  // Body copy
  content = content.replace(/text-slate-800\s+font-medium\s+dark:text-slate-400/g, "text-slate-700 dark:text-slate-300 font-medium");
  content = content.replace(/text-slate-800\s+font-medium\s+dark:text-slate-300/g, "text-slate-700 dark:text-slate-300 font-medium");
  content = content.replace(/text-slate-700\s+dark:text-slate-400/g, "text-slate-700 dark:text-slate-300 font-medium");

  // Metadata / Monospace
  content = content.replace(/text-blue-800\s+dark:text-cyan-400/g, "text-blue-700 dark:text-cyan-400 font-bold font-mono");
  content = content.replace(/text-blue-800\s+dark:text-cyan-600\s+dark:text-blue-600\s+dark:text-cyan-400/g, "text-blue-700 dark:text-cyan-400 font-bold font-mono");

  // Sliders
  content = content.replace(/accent-blue-600\s+dark:accent-cyan-500/g, "bg-slate-200 dark:bg-slate-800 accent-blue-600 dark:accent-cyan-400");
  content = content.replace(/accent-emerald-600\s+dark:accent-emerald-500/g, "bg-slate-200 dark:bg-slate-800 accent-blue-600 dark:accent-cyan-400");
  content = content.replace(/accent-amber-600\s+dark:accent-amber-500/g, "bg-slate-200 dark:bg-slate-800 accent-blue-600 dark:accent-cyan-400");

  fs.writeFileSync(filePath, content, "utf8");
}

["src/pages/Lab.jsx", "src/pages/Intel.jsx", "src/pages/Operations.jsx", "src/pages/Home.jsx", "src/components/HeroSection.jsx"].forEach(fixFile);
console.log("Fixed general UI styling");

