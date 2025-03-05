import './App.css'
import Navbar from './components/Navbar.tsx'
import Footer from './components/Footer.tsx'
import Home from './pages/Home.tsx'
import Test from './pages/test.tsx'
import Multiply from './pages/multiply.tsx'
import Predict from './pages/Predict.tsx'
import SentimentAnalyzer from './pages/SentimentAnalyzer.tsx'
function App() {
  return (
    <>
    <Navbar/>
    <SentimentAnalyzer/>
    {/* <Navbar />
    <Home/>
    <Footer /> */
    /* <Test/>
    <Multiply/>
    <Predict/> */}
    <Footer/>
    </>

  )
}

export default App
