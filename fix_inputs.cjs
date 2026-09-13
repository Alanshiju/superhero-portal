
const fs = require("fs");
let content = fs.readFileSync("src/components/Chatbot.jsx", "utf8");

content = content.replace(/className="flex-1 bg-white dark:bg-slate-800 border border-slate-400 dark:border-slate-700 text-slate-900 dark:text-white px-3 py-2 text-sm rounded outline-none focus:border-blue-600 dark:focus:border-cyan-500 font-mono disabled:opacity-50"/g, 
  "className=\"flex-1 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-slate-950 dark:text-white px-3 py-2 text-sm rounded outline-none focus:border-blue-600 dark:focus:border-cyan-500 font-mono disabled:opacity-50\"");

content = content.replace(/className="flex-1 bg-white dark:bg-slate-900 border border-slate-400 dark:border-slate-700 text-slate-900 dark:text-white px-4 py-3 rounded outline-none focus:border-blue-500 dark:focus:border-blue-600 dark:focus:border-cyan-500 transition-colors font-mono disabled:opacity-50"/g,
  "className=\"flex-1 bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 text-slate-950 dark:text-white px-4 py-3 rounded outline-none focus:border-blue-600 dark:focus:border-cyan-500 transition-colors font-mono disabled:opacity-50\"");

fs.writeFileSync("src/components/Chatbot.jsx", content, "utf8");

