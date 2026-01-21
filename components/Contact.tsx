'use client'
import { useState } from "react";

function Contact() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [message, setMessage] = useState('');

  async function submitMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, mobile, message }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.message || "Something went wrong!");
        return;
      }

      alert("Message sent successfully!");

      // Clear form
      setName("");
      setEmail("");
      setMobile("");
      setMessage("");

    } catch (error) {
      console.error(error);
      alert("Server not reachable!");
    }
  }


  return (
    <section
      id="contact"
      className="bg-gradient-to-br from-[#0F172A] to-[#193b65] text-white py-10"
    >
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">

        {/* RIGHT – Contact Info */}
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>

          <p className="text-gray-300 mb-8">
            Let’s discuss your project and bring your ideas to life.
          </p>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600">
                📧
              </div>
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-gray-300">yourname@email.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600">
                📞
              </div>
              <div>
                <p className="font-semibold">Phone</p>
                <p className="text-gray-300">+91 98765 43210</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600">
                📍
              </div>
              <div>
                <p className="font-semibold">Address</p>
                <p className="text-gray-300">
                  Your Office Address, City, State
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* LEFT – Form */}
        <form
          onSubmit={submitMessage}
          className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl grid gap-5 text-black">
          <h2 className="text-3xl font-bold text-white mb-2">Send Us a Message</h2>

          <input
            className="p-3 rounded-lg bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            className="p-3 rounded-lg bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input

            type="tel"
            className="p-3 rounded-lg bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Mobile No."
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
          <textarea
            className="p-3 rounded-lg bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Send Message
          </button>
        </form>



      </div>
    </section>
  );
}

export default Contact;
