import Link from "next/link";
import { FaTachometerAlt, FaImage, FaEnvelope } from "react-icons/fa";

export default function SideDrawer() {
  return (
    <aside className="fixed w-64 bg-gradient-to-b from-[#0f172a] to-[#020617] text-white p-6 shadow-xl min-h-[calc(100vh-64px)]">

      <h2 className="text-xl font-semibold mb-10 tracking-wide text-slate-200">
        Admin Panel
      </h2>

      <nav className="space-y-3">

        <Link
          href="/my-admin/dashboard"
          className="flex items-center gap-3 px-4 py-3 rounded-lg 
          hover:bg-white/10 transition-all duration-300"
        >
          <FaTachometerAlt className="text-blue-400" />
          <span>Dashboard</span>
        </Link>

        <Link
          href="/my-admin/hero-section"
          className="flex items-center gap-3 px-4 py-3 rounded-lg 
          hover:bg-white/10 transition-all duration-300"
        >
          <FaImage className="text-purple-400" />
          <span>Hero Section</span>
        </Link>

        <Link
          href="/my-admin/contactus"
          className="flex items-center gap-3 px-4 py-3 rounded-lg 
          hover:bg-white/10 transition-all duration-300"
        >
          <FaEnvelope className="text-purple-400" />
          <span>Contact Us</span>
        </Link>

        <Link
          href="/my-admin/design_list"
          className="flex items-center gap-3 px-4 py-3 rounded-lg 
          hover:bg-white/10 transition-all duration-300"
        >
          <FaEnvelope className="text-purple-400" />
          <span>Designs</span>
        </Link>

      </nav>
    </aside>
  );
}
