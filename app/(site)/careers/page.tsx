"use client";

import Contact from "@/components/Contact";
import Image from "next/image";
import { useEffect, useState } from "react";


/*

  job_Title,description,applied_date,year_of_experience,isActive
  "Civil Site Engineer","Oversee on-site construction activities, ensure quality standards, and coordinate with contractors.",2026-02-01T00:00:00,2,true
  "Architectural Designer","Create residential home designs, floor plans, and 3D elevations using modern design tools.",2026-02-01T00:00:00,1,true
  "Interior Design Executive","Design functional and aesthetic interior layouts for residential projects and coordinate with clients.",2026-02-01T00:00:00,3,true


*/

interface Career {
  id: number;
  job_Title: string;
  year_of_experience: number;
  description: string;
  applied_date: string
}

export default function CareersPage() {
  const [jobs, setJobs] = useState<Career[]>([]);

  async function getCareers() {
    const res = await fetch("/api/admin/careers");
    const data = await res.json();
    setJobs(data);
  }

  useEffect(() => {
    getCareers();
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* HERO */}
      <section className="relative h-[70vh] flex items-center justify-center bg-blue-800">
        {/* <Image
          src="/images/career1.jpg"
          alt="Careers at Vidya Shanti Groups"
          fill
          className="object-cover"
          priority
        /> */}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 text-center px-6 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Careers at Vidya Shanti Groups
          </h1>
          <p className="text-gray-200 text-lg">
            Join a team that builds spaces with purpose, quality, and impact.
          </p>
        </div>
      </section>

      {/* JOB LIST */}
      <section className="py-20 px-6 bg-gray-50 text-black">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold text-center">
            Current Openings
          </h2>
          <div className="w-65 h-1 bg-blue-800 mx-auto mt-4 mb-14 rounded-full"></div>

          {/* EMPTY STATE */}
          {jobs.length === 0 && (
            <div className="text-center bg-white border rounded-xl p-10 shadow-sm">
              <h3 className="text-xl font-semibold mb-2">
                No Open Positions at the Moment
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                We’re not hiring right now, but we’re always interested in
                connecting with talented professionals. Please check back soon.
              </p>
            </div>
          )}

          {/* JOB CARDS */}
          <div className="space-y-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {job.job_Title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Experience Required: {job.year_of_experience}+ Years <b>|</b> Apply By: {new Date(job.applied_date).toLocaleDateString()}

                    </p>


                  </div>

                  <button className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition">
                    Apply Now
                  </button>
                </div>

                <p className="text-gray-700 mt-4 leading-relaxed line-clamp-3">
                  {job.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </main>
  );
}
