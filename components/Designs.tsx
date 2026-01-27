'use client'

import React, { useEffect, useState } from 'react'

/*
  title, description, width, height, image, facing, isActive, crby
  "Modern 2BHK House Design", "A sleek and modern 2BHK home design with efficient space planning.", 30, 40, "/images/design1.jpg", "East", true, 1
  "Luxury Villa Elevation", "Premium villa elevation with contemporary architectural style.", 50, 60, "/images/design2.jpg", "West", true, 1
  "Compact Budget Home", "Affordable compact home design ideal for small families.", 25, 35, "/images/design3.jpg", "North", true, 1
  "Duplex House Design", "Spacious duplex house with modern exterior and balcony.", 40, 50, "/images/design4.jpg", "South", true, 1
  "Traditional Indian Home", "Classic Indian-style home with vastu-compliant layout.", 30, 45, "/images/design5.jpg", "East", true, 1
  "Single Floor House Plan", "Simple single-floor house plan with optimal ventilation.", 28, 38, "/images/design6.jpg", "North", true, 1
  "Contemporary Bungalow", "Stylish bungalow design with open spaces and greenery.", 45, 55, "/images/design7.jpg", "West", true, 1
  "Minimalist Home Design", "Clean and minimalist design focusing on functionality.", 32, 42, "/images/design8.jpg", "South", true, 1
  "Corner Plot House Design", "Specially designed home for corner plots with dual access.", 35, 45, "/images/design9.jpg", "East", true, 1
*/

interface DesignData {
  id?: number;
  title: string;
  description: string;
  height: number;
  width: number;
  facing: string;
  image: string;
  isActive: boolean;
}

export default function Designs() {
  const [allData, setAllData] = useState<DesignData[]>([]);
  const [visibleData, setVisibleData] = useState<DesignData[]>([]);
  const [expanded, setExpanded] = useState(false);

  async function getDesignData() {
    const res = await fetch("/api/admin/designs");
    const result: DesignData[] = await res.json();

    const active = result.filter(d => d.isActive);

    setAllData(active);
    setVisibleData(active.slice(0, 6)); // initial 6
  }

  useEffect(() => {
    getDesignData();
  }, []);

  function toggleView() {
    if (expanded) {
      setVisibleData(allData.slice(0, 6));
    } else {
      setVisibleData(allData);
    }
    setExpanded(!expanded);
  }

  return (
    <section id="designs" className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-black">Our Designs</h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {visibleData.map(d => (
            <div
              key={d.id}
              className="rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition"
            >
              <div className="h-52 p-3 flex items-center justify-center bg-gray-50">
                <img
                  src={d.image}
                  alt={d.title}
                  className="w-full h-full object-contain rounded-xl bg-gray-100"
                />
              </div>

              <div className="p-4 pt-0 text-black">
                <h3 className="font-semibold text-lg">{d.title}</h3>

                <p className="text-sm text-gray-500 mt-1">
                  {d.width} x {d.height} • {d.facing}
                </p>

                <p className="text-sm text-gray-600 line-clamp-2">
                  {d.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* VIEW MORE / LESS */}
        {allData.length > 6 && (
          <div className="text-center mt-10">
            <button
              onClick={toggleView}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              {expanded ? "View Less" : "View More Designs"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
