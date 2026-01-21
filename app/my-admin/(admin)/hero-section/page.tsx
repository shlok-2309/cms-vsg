"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface HeroData {
  id: number;
  title: string;
  description: string;
  isActive: boolean;
  image: string;
}

export default function Page() {
  const [data, setData] = useState<HeroData[]>([]);
  const [selected, setSelected] = useState<HeroData | null>(null);
  const [form, setForm] = useState({ title: "", description: "", isActive: false });
  const [imageFile, setImageFile] = useState<File | null>(null);


  async function getHeroData() {
    const res = await fetch("/api/admin/heroSection");
    const result: HeroData[] = await res.json();
    setData(result);
  }

  useEffect(() => {
    getHeroData();
  }, []);

  const openEdit = (item: HeroData) => {
    setSelected({ ...item });   // force new object reference
    setForm({
      title: item.title,
      description: item.description,
      isActive: item.isActive,
    });
  };


  const updateHero = async () => {
    if (!selected) return;

    const formData = new FormData();
    formData.append("id", String(selected.id));
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("isActive", String(form.isActive));

    if (imageFile) {
      formData.append("image", imageFile); // ONLY if selected
    }

    await fetch("/api/admin/heroSection", {
      method: "PUT",
      body: formData,
    });

    setSelected(null);
    setImageFile(null);
    getHeroData();
  };



  return (
    <div className="p-8 rounded-xl shadow-lg">
      <h1 className="text-2xl font-semibold mb-6">Hero Section Management</h1>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-lg border border-slate-800">
        <table className="w-full text-sm">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="px-5 py-3">Image</th>
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">Description</th>
              <th className="px-5 py-3 text-center">Status</th>
              <th className="px-5 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 text-black">
            {data.map((item) => (
              <tr key={item.id} className="odd:bg-white even:bg-slate-200 hover:bg-slate-300">
                <td className="px-5 py-3">
                  <div className="w-14 h-10 relative mx-auto">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="rounded-md object-cover"
                    />
                  </div>
                </td>
                <td className="px-5 py-3">{item.title}</td>
                <td className="px-5 py-3">{item.description}</td>
                <td className="px-5 py-3 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${item.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                      }`}
                  >
                    {item.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-5 py-3 text-center">
                  <button
                    onClick={() => openEdit(item)}
                    className="text-blue-400 hover:underline"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-slate-300 rounded-xl w-full max-w-lg overflow-hidden">


            {/* HEADER */}
            <div className="bg-slate-900 h-14 flex items-center px-6">
              <h2 className="text-xl font-semibold text-white">
                Edit Hero
              </h2>
            </div>

            <div className="p-5">

              Images: <input
                type="file"
                accept="image/*"
                className="w-full p-2 mb-3 rounded bg-slate-100 border border-slate-500"
                onChange={(e) =>
                  e.target.files && setImageFile(e.target.files[0])
                }
              />

              Title: <input
                className="w-full p-2 mb-3 rounded bg-slate-100"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Title"
              />

              Description: <textarea
                className="w-full p-2 mb-3 rounded bg-slate-100"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Description"
              />

              <label className="flex items-center gap-2  mb-4">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                />
                Active
              </label>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setSelected(null)}
                  className="px-4 py-2 bg-gray-600 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={updateHero}
                  className="px-4 py-2 bg-blue-600 rounded"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
