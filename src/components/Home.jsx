import Hero from "../components/Hero";
import Services from "../components/Services/Services";
import Portfolio from "../components/Portfolio/Portfolio";
import Contact from "../components/Contact";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import Testimonials from "./Testimonials/Testimonials";

const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <HowItWorks />
      <Portfolio />
      <Testimonials />
      <Contact />
    </>
  );
};

export default Home;