"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

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
      ${scrolled
                    ? "bg-black text-white shadow-lg"
                    : "text-white"}
      `}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo + Name */}
                <a href="/">
                    <div className="flex items-center gap-3">
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
                    </div>
                </a>

                <div className="space-x-8 text-sm font-medium">
                    {["Home", "About", "Designs", "Testimonials", "Contact"].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="hover:text-yellow-900 hover:underline transition"
                        >
                            {item}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
}
