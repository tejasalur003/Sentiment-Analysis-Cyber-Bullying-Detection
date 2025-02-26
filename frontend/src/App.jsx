import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home.tsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1>Sentiment Analysis & Cyber Bullying Detection</h1>
    <Home/>
    </>
  )
}

export default App
