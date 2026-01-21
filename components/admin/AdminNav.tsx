"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FaTachometerAlt,
  FaUser,
  FaSignOutAlt,
  FaEnvelope,
  FaPalette,
  FaImages,
  FaUsers,
} from "react-icons/fa";

export default function AdminNav() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    localStorage.removeItem("admin_token");
    sessionStorage.removeItem("admin_token");
    router.push("/my-admin/login");
  };

  return (
    <nav className="fixed top-0 h-18 w-full bg-[#101828] text-white z-50 shadow-md">
      <div className="mx-8 py-5 flex justify-between items-center">
        {/* Brand */}
        <a href="/my-admin/dashboard">
          <h1 className="text-lg font-semibold tracking-wide text-blue-600">
            VIDYA SHANTI GROUP
          </h1>
        </a>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6 text-sm font-medium">
          <NavItem href="/my-admin/dashboard" icon={<FaTachometerAlt />} label="Dashboard" />
          <NavItem href="/my-admin/contactus" icon={<FaEnvelope />} label="Contact-US" />
          <NavItem href="/my-admin/design_list" icon={<FaPalette />} label="Designs" />
          <NavItem href="/my-admin/hero-section" icon={<FaImages />} label="Hero Section" />
          <NavItem href="/my-admin/user-list" icon={<FaUsers />} label="UserList" />

          {/* Divider */}
          <span className="mx-3 text-gray-500">|</span>

          <NavItem href="/my-admin/profile" icon={<FaUser />} label="Profile" />

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 hover:text-red-400 transition"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

/* Reusable Nav Item */
function NavItem({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 hover:text-yellow-900 transition"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
