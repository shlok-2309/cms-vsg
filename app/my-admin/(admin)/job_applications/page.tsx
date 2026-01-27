"use client";

import { useEffect, useState } from "react";

interface AppliedJob {
  id: number;
  name: string;
  email: string;
  phone: string;
  resume: string;
  job_Title: string;
  year_of_experience: string;
  createdDate: string;
}

export default function AppliedJobsPage() {
  const [applications, setApplications] = useState<AppliedJob[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchApplications() {
    const res = await fetch("/api/admin/job-applications");
    const data = await res.json();
    setApplications(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-6 mt-5">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Applications
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          View all job applications submitted by candidates
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        {loading ? (
          <div className="p-6 text-center text-gray-500">
            Loading applications...
          </div>
        ) : applications.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No applications found
          </div>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="sticky top-0 bg-slate-800 text-white z-10">
              <tr>
                <th className="px-6 py-3 text-left font-medium">Candidate</th>
                <th className="px-6 py-3 text-left font-medium">Email</th>
                <th className="px-6 py-3 text-left font-medium">Job Title</th>
                <th className="px-6 py-3 text-left font-medium">Experience</th>
                <th className="px-6 py-3 text-left font-medium">Phone</th>
                <th className="px-6 py-3 text-left font-medium">Applied On</th>
                <th className="px-6 py-3 text-left font-medium">Resume</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {applications.map((app) => (
                <tr key={app.id} className="odd:bg-white even:bg-slate-200 hover:bg-slate-300">
                  <td className="px-6 py-4">
                    {app.name}
                  </td>

                  <td className="px-6 py-4">
                    {app.email}
                  </td>


                  <td className="px-6 py-4 text-gray-800">
                    {app.job_Title}
                  </td>

                  <td className="px-6 py-4 text-gray-800">
                    {app.year_of_experience} yrs
                  </td>

                  <td className="px-6 py-4 text-gray-800">
                    {app.phone}
                  </td>

                  <td className="px-6 py-4 text-gray-500">
                    {new Date(app.createdDate).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
                    <a
                      href={app.resume}
                      target="_blank"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      View Resume
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
