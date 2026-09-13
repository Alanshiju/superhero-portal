
const fs = require("fs");
let content = fs.readFileSync("src/App.jsx", "utf8");

if (!content.includes("react-toastify")) {
  const imports = `import { ToastContainer } from "react-toastify";\nimport "react-toastify/dist/ReactToastify.css";\n`;
  content = content.replace("import { BrowserRouter", imports + "import { BrowserRouter");
  
  const toastContainer = `
      <ToastContainer 
        position="bottom-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        toastClassName="bg-white border-2 border-slate-300 text-slate-900 font-mono text-xs shadow-xl dark:bg-slate-900 dark:border-cyan-500/40 dark:text-cyan-300 dark:shadow-[0_0_20px_rgba(6,182,212,0.2)] rounded-lg mb-4"
        bodyClassName="p-2"
        progressClassName="bg-blue-600 dark:bg-cyan-500"
      />`;
      
  content = content.replace("</Router>", toastContainer + "\n    </Router>");
  fs.writeFileSync("src/App.jsx", content, "utf8");
}

