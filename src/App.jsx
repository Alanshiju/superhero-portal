import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dispatch from "./pages/Dispatch";
import Intel from "./pages/Intel";
import Operations from "./pages/Operations";
import Lab from "./pages/Lab";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import CrisisCalibrator from "./components/CrisisCalibrator";

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
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
