import About from "@/components/About";
import Contact from "@/components/Contact";
import Designs from "@/components/Designs";
import HeroSlider from "@/components/HeroSlider";
import Testimonials from "@/components/Testimonials";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="scroll-smooth">

      {/* HERO */}
      <section id="home">
        <HeroSlider />
      </section>

      {/* ABOUT */}
      <About />


      {/* DESIGNS */}
      <Designs />

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* CONTACT */}
      <Contact />
    </div>
  );
}
