"use client";
import React, { useEffect, useMemo, useState } from "react";

interface ContactUsData {
  id: number;
  name: string;
  email: string;
  mobile: string;
  message: string;
  createDate: string;
}

const PAGE_SIZE = 10;

export default function Page() {
  const [data, setData] = useState<ContactUsData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  function formatDateTime(dateString: string) {
    return new Date(dateString).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).replace("am", "AM")
      .replace("pm", "PM");
  }

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(data.length / PAGE_SIZE);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return data.slice(start, start + PAGE_SIZE);
  }, [data, currentPage]);


  async function getContactUsData() {
    const res = await fetch("/api/admin/contact");
    const result: ContactUsData[] = await res.json();
    setData(result);
  }

  useEffect(() => {
    getContactUsData();
  }, []);

  return (
    <div className="p-8 rounded-xl shadow-lg">
      <h1 className="text-2xl font-semibold mb-6">Contact Us</h1>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-lg border border-slate-8400">
        <div className="max-h-[500px] overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-800 text-white">
              <tr>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3 text-center">Mobile No.</th>
                <th className="px-5 py-3 text-center">Message</th>
                <th className="px-5 py-3 text-center">Timestamp</th>
              </tr>
            </thead>

            <tbody className="bg-slate-100 divide-y divide-slate-200 text-center">
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-6 text-slate-400 font-medium text-center"
                  >
                    No data found
                  </td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-300">
                    <td className="px-5 py-3 text-black">{item.name}</td>
                    <td className="px-5 py-3 text-black">{item.email}</td>
                    <td className="px-5 py-3 text-black">{item.mobile}</td>
                    <td className="px-5 py-3 text-black">{item.message}</td>
                    <td className="px-5 py-3 text-black"> {formatDateTime(item.createDate)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center px-4 py-3 bg-slate-900">
            <span className="text-sm text-slate-400">
              Page {currentPage} of {totalPages}
            </span>

            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-3 py-1 rounded bg-slate-700 disabled:opacity-40"
              >
                Prev
              </button>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-3 py-1 rounded bg-slate-700 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
