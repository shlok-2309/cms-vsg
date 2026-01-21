"use client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

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

const PAGE_SIZE = 10;

export default function Page() {
  const [data, setData] = useState<DesignData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [form, setForm] = useState<DesignData>({
    title: "",
    description: "",
    height: 0,
    width: 0,
    facing: "",
    image: "",
    isActive: true,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  /* ================= FETCH ================= */
  async function getDesignData() {
    const res = await fetch("/api/admin/designs");
    const result = await res.json();
    setData(result);
    setCurrentPage(1); // reset page after refresh
  }

  useEffect(() => {
    getDesignData();
  }, []);

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(data.length / PAGE_SIZE);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return data.slice(start, start + PAGE_SIZE); ``
  }, [data, currentPage]);

  /* ================= MODAL ================= */
  function openAdd() {
    setForm({
      title: "",
      description: "",
      height: 0,
      width: 0,
      facing: "",
      image: "",
      isActive: true,
    });
    setImageFile(null);
    setIsModalOpen(true);
  }

  function openEdit(item: DesignData) {
    setForm(item);
    setImageFile(null);
    setIsModalOpen(true);
  }

  /* ================= SUBMIT ================= */
  async function handleSubmit() {
    const isEdit = Boolean(form.id);
    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("width", String(form.width));
    formData.append("height", String(form.height));
    formData.append("facing", form.facing);
    formData.append("isActive", String(form.isActive));

    if (form.image) formData.append("existingImage", form.image);
    if (imageFile) formData.append("image", imageFile);

    await fetch(
      isEdit ? `/api/admin/designs/${form.id}` : "/api/admin/designs",
      { method: isEdit ? "PUT" : "POST", body: formData }
    );

    setIsModalOpen(false);
    getDesignData();
  }

  return (
    <div className="p-12 rounded-xl shadow-lg ">
      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold text-black">Designs List</h1>
        <button
          onClick={openAdd}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
        >
          + Add Design
        </button>
      </div>

      {/* SCROLLABLE TABLE */}
      <div className="border border-slate-800 rounded-lg overflow-hidden">
        <div className="max-h-[500px] overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-slate-800 text-white z-10">
              <tr>
                <th className="px-5 py-3">Image</th>
                <th className="px-5 py-3">Title</th>
                <th className="px-5 py-3">Size</th>
                <th className="px-5 py-3">Facing</th>
                <th className="px-5 py-3">Description</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Action</th>
              </tr>
            </thead>

            <tbody className="bg-slate-100 divide-y divide-slate-300 text-center">
              {paginatedData.map((item) => (
                <tr key={item.id}
                  className="odd:bg-white even:bg-slate-200 hover:bg-slate-300">
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
                  <td className="px-5 py-3">
                    {item.width} × {item.height}
                  </td>
                  <td className="px-5 py-3">{item.facing}</td>
                  <td className="px-5 py-3 truncate max-w-xs">
                    {item.description}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${item.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                    >
                      {item.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => openEdit(item)}
                      className="text-blue-400 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}

              {paginatedData.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-6 text-gray-400">
                    No data found
                  </td>
                </tr>
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

      {/* MODAL (UNCHANGED UI LOGIC) */}
      {isModalOpen && (
        <div className="fixed inset-0  flex items-center justify-center z-50">
          <div className="bg-slate-300 rounded-xl w-full max-w-lg overflow-hidden">

            {/* HEADER */}
            <div className="bg-slate-900 h-14 flex items-center px-6">
              <h2 className="text-xl font-semibold text-white">
                {form.id ? "Edit Design" : "Add Design"}
              </h2>
            </div>
            <div className="p-5">
              <div className="space-y-3">
                Title: <input
                  className="w-full p-2 rounded bg-slate-100 border border-slate-500"
                  placeholder="Title"
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                />

                Images: <input
                  type="file"
                  accept="image/*"
                  className="w-full p-2 rounded bg-slate-100 border border-slate-500"
                  onChange={(e) =>
                    e.target.files && setImageFile(e.target.files[0])
                  }
                />

                Facing: <input
                  className="w-full p-2 rounded bg-slate-100 border border-slate-500"
                  placeholder="Facing"
                  value={form.facing}
                  onChange={(e) =>
                    setForm({ ...form, facing: e.target.value })
                  }
                />

                Description: <textarea
                  className="w-full p-2 rounded bg-slate-100 border border-slate-500"
                  placeholder="Description"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />

                <div className="flex gap-2">
                  Width: <input
                    type="number"
                    placeholder="Width"
                    className="w-full p-2 rounded bg-slate-100 border border-slate-500"
                    value={form.width}
                    onChange={(e) =>
                      setForm({ ...form, width: +e.target.value })
                    }
                  />
                  Height: <input
                    type="number"
                    placeholder="Height"
                    className="w-full p-2 rounded bg-slate-100 border border-slate-500"
                    value={form.height}
                    onChange={(e) =>
                      setForm({ ...form, height: +e.target.value })
                    }
                  />
                </div>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.isActive}
                    onChange={(e) =>
                      setForm({ ...form, isActive: e.target.checked })
                    }
                  />
                  Active
                </label>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-600 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-600 rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
