import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import Home from "./pages/Home.tsx";
// import SentimentAnalyzer from "./pages/SentimentAnalyzer.tsx";
import Analysis from "./pages/Analysis.tsx";
import Cbd from "./pages/cbd.tsx";
// import SentimentScale from "./components/SentimentScale.tsx";
import Emotion from "./pages/Emotion.tsx";
import ExtractedText from "./pages/ExtractedText.tsx";
import ProfileReview from "./pages/ProfileReview.tsx";
import Mail from "./pages/Mail.tsx";
import { AnimatedBackground } from "./components/AnimatedBackground.tsx";
import StaticBackground from "./components/StaticBackground.tsx";
import MentalHealthChatbot from "./pages/MentalHealthChatbot.tsx";

function App() {
  return (    
    <Router>
      <Navbar />
      {/* <AnimatedBackground /> */}
      <StaticBackground/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/extracted-text" element={<ExtractedText />} />
        {/* <Route path="/analyze" element={<SentimentAnalyzer />} /> */}
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/cyberbullying-check" element={<Cbd/>} />
        {/* <Route path="/scale" element={<SentimentScale/>} /> */}
        <Route path="/emotion-analysis" element={<Emotion/>} />
        <Route path="/profile-review" element={<ProfileReview/>} />
        <Route path="/send-email" element={<Mail/>} />
        <Route path="/mental-health-support" element={<MentalHealthChatbot/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
