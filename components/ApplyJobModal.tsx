"use client";

import { useState } from "react";

interface ApplyJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
  careerId: number;
}

export default function ApplyJobModal({
  isOpen,
  onClose,
  jobTitle,
  careerId,
}: ApplyJobModalProps) {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.append("careerId", careerId.toString());

    const res = await fetch("/api/apply", {
      method: "POST",
      body: formData,
    });

    setLoading(false);

    if (res.ok) {
      alert("Application submitted successfully!");
      onClose();
    } else {
      alert("Failed to submit application");
    }
  }


  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Apply for {jobTitle}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Fill in the details below to apply
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* <input
            name="job_Title"
            value={jobTitle}
            readOnly
            className="w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-600"
          /> */}

          <input
            name="name"
            required
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 bg-gray-100 text-gray-800 focus:ring-blue-500"
          />

          <input
            name="email"
            type="email"
            required
            placeholder="Email Address"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 text-gray-800"
          />

          <input
            name="phone"
            required
            placeholder="Phone Number"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 text-gray-800"
          />

          <input
            name="year_of_experience"
            required
            placeholder="Years of Experience"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 text-gray-800"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Resume (PDF / DOC)
            </label>
            <input
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              required
              className="w-full text-sm file:mr-4 file:py-2 file:px-4
               file:rounded-md file:border-0
               file:text-sm file:font-semibold
               file:bg-blue-50 file:text-blue-700
               hover:file:bg-blue-100
               text-gray-500
               border rounded-md"
            />
            <p className="text-xs text-gray-500 mt-1">
              Accepted formats: PDF, DOC, DOCX
            </p>
          </div>


          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border rounded-md hover:bg-gray-800 transition bg-black text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700-800 transition"
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
