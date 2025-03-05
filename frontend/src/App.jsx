import './App.css'
import Navbar from './components/Navbar.tsx'
import Footer from './components/Footer.tsx'
import Home from './pages/Home.tsx'
import SentimentAnalyzer from './pages/SentimentAnalyzer.tsx'
function App() {
  return (
    <>
    <Navbar/>
    {/* <SentimentAnalyzer/> */}
    <Home/>
    <Footer/>
    </>

  )
}

export default App
