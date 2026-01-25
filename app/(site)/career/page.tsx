import Contact from "@/components/Contact";
import Image from "next/image";

export default function CareersPage() {
  return (
    <main className="min-h-screen ">
      {/* HERO SECTION */}
      <section className="relative h-[70vh] flex items-center justify-center">
        <Image
          src="/images/career1.jpg" // add image in public folder
          alt="Careers at Vidya Shanti Groups"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 "></div>

        <div className="relative z-10 text-center px-6">
          {/* <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Build Your Career With Us
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Join Vidya Shanti Groups and be a part of creating meaningful spaces
            and lasting impact.
          </p> */}
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="py-16 px-6 bg-gray-50 text-black">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Open Positions
          </h2>

          {/* Job Card */}
          <div className=" rounded-xl shadow p-6 mb-6">
            <h3 className="text-xl font-semibold">Site Engineer</h3>
            <p className="text-gray-600 mt-2">
              Experience: 2+ Years · Location: Indore
            </p>

            <button className="mt-4 px-5 py-2 bg-black text-white rounded hover:bg-gray-800 transition">
              Apply Now
            </button>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-semibold">Interior Designer</h3>
            <p className="text-gray-600 mt-2">
              Experience: 1+ Years · Location: Indore
            </p>

            <button className="mt-4 px-5 py-2 bg-black text-white rounded hover:bg-gray-800 transition">
              Apply Now
            </button>
          </div>
        </div>
      </section>

      {/* <Testimonials /> */}

      <Contact></Contact>
    </main>
  );
}
