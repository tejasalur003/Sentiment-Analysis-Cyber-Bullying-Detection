import React from "react";
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import Hero from "../components/Hero/Hero.tsx";
import { AnimatedBackground } from "../components/AnimatedBackground"; 

const Home = () => {
  return (
    <>
      <AnimatedBackground />  
      <Hero />
    </>
  );
};

export default Home;
