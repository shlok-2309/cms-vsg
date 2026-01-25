"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300
      ${scrolled ? "bg-black text-white shadow-lg" : "text-white"}
      `}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-3">
                    <Image
                        src="/logo.jpg"
                        alt="Vidya Shanti Groups"
                        width={40}
                        height={40}
                        className="rounded"
                    />
                    <h3 className="text-lg font-semibold tracking-wide">
                        Vidya Shanti Groups
                    </h3>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8 text-sm font-medium">
                    {[
                        { name: "Home", href: "/" },
                        { name: "About", href: "//#about" },
                        { name: "Designs", href: "#designs" },
                        { name: "Testimonials", href: "//#testimonials" },
                        { name: "Careers", href: "/career" }, // ✅ NEW
                        { name: "Contact", href: "#contact" },
                    ].map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="hover:text-yellow-400 hover:underline transition"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Mobile Hamburger */}
                <button
                    className="md:hidden focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <div className="space-y-1">
                        <span className="block w-6 h-0.5 bg-white"></span>
                        <span className="block w-6 h-0.5 bg-white"></span>
                        <span className="block w-6 h-0.5 bg-white"></span>
                    </div>
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-black px-6 pb-4 space-y-4 text-sm">
                    {[
                        { name: "Home", href: "#home" },
                        { name: "About", href: "#about" },
                        { name: "Designs", href: "#designs" },
                        { name: "Testimonials", href: "#testimonials" },
                        { name: "Careers", href: "/careers" }, // ✅ NEW
                        { name: "Contact", href: "#contact" },
                    ].map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="block hover:text-yellow-400"
                            onClick={() => setMenuOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}
