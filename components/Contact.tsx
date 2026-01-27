'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setFeedback('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to send message');

      setFeedback('Message sent successfully.');
      setFormData({ name: '', email: '', mobile: '', message: '' });
    } catch {
      setFeedback('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="contact"
      className="bg-[#0B1120] text-white py-20"
    >
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16">

        {/* LEFT – Info */}
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl font-semibold leading-tight mb-6">
            Let’s work together
          </h2>

          <p className="text-gray-400 mb-10 max-w-md">
            Reach out to discuss your project, ask questions, or explore
            collaboration opportunities.
          </p>

          <div className="space-y-6 text-gray-300">
            <InfoItem label="Email" value="yourname@email.com" />
            <InfoItem label="Phone" value="+91 98765 43210" />
            <InfoItem label="Location" value="India" />
          </div>
        </div>

        {/* RIGHT – Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#0F172A] border border-white/10 rounded-2xl p-8 shadow-xl space-y-6"
        >
          <h3 className="text-2xl font-semibold mb-2">
            Contact Us
          </h3>

          <Input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />

          <Input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />

          <Input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
          />

          <textarea
            name="message"
            rows={4}
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full bg-[#020617] border border-white/10 rounded-lg px-4 py-3 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          {feedback && (
            <p className="text-sm text-blue-400">{feedback}</p>
          )}

          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-medium disabled:opacity-60"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
}

/* Reusable Components */

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      required
      className="w-full bg-[#020617] border border-white/10 rounded-lg px-4 py-3 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
    />
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-base font-medium">{value}</p>
    </div>
  );
}
