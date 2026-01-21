"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState({ name: "", email: "" });
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "" });
  const [editProfile, setEditProfile] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  async function getProfile() {
    const res = await fetch("/api/admin/profile");
    const data = await res.json();
    setUser(data);
  }

  async function saveProfile() {
    const res = await fetch("/api/admin/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (res.ok) {
      setMessage({ text: "Profile updated successfully", type: "success" });
      setEditProfile(false);
    } else {
      setMessage({ text: "Failed to update profile", type: "error" });
    }

    // Remove message after 3 seconds
    setTimeout(() => setMessage(null), 3000);
  }

  async function changePassword() {
    if (!passwords.currentPassword || !passwords.newPassword) {
      setMessage({ text: "All fields are required", type: "error" });
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    const res = await fetch("/api/admin/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(passwords),
    });

    if (res.ok) {
      setMessage({ text: "Password changed successfully", type: "success" });
      setPasswords({ currentPassword: "", newPassword: "" });
      setShowPassword(false);
    } else {
      setMessage({ text: "Current password incorrect", type: "error" });
    }

    setTimeout(() => setMessage(null), 3000);
  }

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-20 bg-white shadow-lg rounded-xl p-6">
      <h1 className="text-2xl font-semibold mb-6">Admin Profile</h1>

      {/* MESSAGE */}
      {message && (
        <div
          className={`mb-4 p-3 rounded ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
        >
          {message.text}
        </div>
      )}

      {/* PROFILE INFO */}
      <div className="space-y-3 mb-6">
        <div>
          <label className="text-sm text-gray-500">Name</label>
          <input
            value={user.name}
            disabled={!editProfile}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="w-full p-2 border rounded bg-gray-100 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="text-sm text-gray-500">Email</label>
          <input
            value={user.email}
            disabled={!editProfile}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full p-2 border rounded bg-gray-100 disabled:bg-gray-100"
          />
        </div>
      </div>

      {/* PROFILE ACTIONS */}
      <div className="flex gap-3 mb-6">
        {!editProfile ? (
          <button
            onClick={() => setEditProfile(true)}
            className="px-4 py-2 bg-gray-800 text-white rounded"
          >
            Edit Profile
          </button>
        ) : (
          <button
            onClick={saveProfile}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Save Profile
          </button>
        )}

        <button
          onClick={() => setShowPassword(!showPassword)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Change Password
        </button>
      </div>

      {/* CHANGE PASSWORD */}
      {showPassword && (
        <div className="space-y-3 border-t pt-4">
          <input
            type="password"
            placeholder="Current Password"
            className="w-full p-2 border rounded"
            value={passwords.currentPassword}
            onChange={(e) =>
              setPasswords({ ...passwords, currentPassword: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="New Password"
            className="w-full p-2 border rounded"
            value={passwords.newPassword}
            onChange={(e) =>
              setPasswords({ ...passwords, newPassword: e.target.value })
            }
          />

          <button
            onClick={changePassword}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded"
          >
            Update Password
          </button>
        </div>
      )}
    </div>
  );
}
