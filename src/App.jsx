import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dispatch from "./pages/Dispatch";
import Intel from "./pages/Intel";
import Operations from "./pages/Operations";
import Lab from "./pages/Lab";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import CrisisCalibrator from "./components/CrisisCalibrator";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <CrisisCalibrator />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dispatch" element={<Dispatch />} />
          <Route path="/intel" element={<Intel />} />
          <Route path="/operations" element={<Operations />} />
          <Route path="/lab" element={<Lab />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    
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
      />
    </Router>
  );
}

export default App;
