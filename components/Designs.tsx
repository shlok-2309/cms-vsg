'use client'

import React, { useEffect, useState } from 'react'

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
