import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import Home from "./pages/Home.tsx";
import SentimentAnalyzer from "./pages/SentimentAnalyzer.tsx";
import Analysis from "./pages/Analysis.tsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/analyze" element={<SentimentAnalyzer />} /> */}
        <Route path="/analysis" element={<Analysis />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
