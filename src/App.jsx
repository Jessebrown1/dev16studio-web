import React from "react";
import Navbar from "./components/Navbar/Navbar"; // ✅ correct path
import Hero from "./components/Hero/Hero";
import "./index.css";

function App() {
  return (
    <div className="App">

      {/* ✅ Navbar */}
      <Navbar />

      {/* ✅ Hero Section */}
      <section id="home">
        <Hero
        />
      </section>

      {/* ✅ Other Sections (IMPORTANT for navbar links to work) */}
      <section id="services" style={{ height: "100vh" }}></section>
      <section id="process" style={{ height: "100vh" }}></section>
      <section id="portfolio" style={{ height: "100vh" }}></section>
      <section id="testimonials" style={{ height: "100vh" }}></section>
      <section id="contact" style={{ height: "100vh" }}></section>

    </div>
  );
}

export default App;