import Contact from "@/components/Contact";
import Designs from "@/components/Designs";
import HeroSlider from "@/components/HeroSlider";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="scroll-smooth">

      {/* HERO */}
      <section id="home">
        <HeroSlider />
      </section>

      {/* ABOUT */}
      <section id="about" className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold mb-8">About Us</h2>

        <p className="text-gray-600 leading-relaxed mb-5">
          We are a dedicated house design and building planning firm, providing
          professional civil engineering and architectural services for the past
          <span className="font-semibold"> 5+ years</span>. Our work is driven by a
          passion for creating safe, strong, and beautiful living spaces.
        </p>

        <p className="text-gray-600 leading-relaxed mb-5">
          Our services include complete house planning, modern and traditional home
          designs, 2D & 3D layouts, structural drawings, and detailed construction
          guidance. Every project is carefully designed to meet functional needs,
          aesthetic expectations, and budget requirements.
        </p>

        <p className="text-gray-600 leading-relaxed mb-5">
          With a strong understanding of construction standards and practical site
          conditions, we ensure that every design is technically accurate and ready
          for execution. We focus on efficient space planning, proper ventilation,
          natural lighting, and long-lasting structural safety.
        </p>

        <p className="text-gray-600 leading-relaxed">
          Over the years, we have successfully completed many residential and small
          commercial projects, earning the trust of our clients through quality work,
          transparent communication, and timely delivery. Our mission is simple —
          to design buildings that stand strong and serve beautifully for generations.
        </p>
      </section>


      {/* DESIGNS */}
      <Designs />

      {/* TESTIMONIALS */}
      <section id="testimonials" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">What Clients Say</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="p-6 border rounded-xl shadow-sm">
              <p>"Excellent planning and beautiful design!"</p>
              <h4 className="mt-4 font-semibold">Client {i}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <Contact />
    </div>
  );
}
