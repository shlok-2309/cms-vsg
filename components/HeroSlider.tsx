"use client";
import { useEffect, useState } from "react";


// const slides = [
//     {
//         title: "Designing Your Dream Home",
//         desc: "Modern, strong and beautiful house designs made with precision.",
//         img: "/images/home1.jpg",
//     },
//     {
//         title: "Professional Building Planning",
//         desc: "Complete civil engineering solutions for residential projects.",
//         img: "/images/home2.jpg",
//     },
//     {
//         title: "5+ Years of Trusted Experience",
//         desc: "Quality planning and design you can rely on.",
//         img: "/images/home3.jpg",
//     },
// ];

interface HeroData {
    id: number;
    title: string;
    description: string;
    image: string;
    isActive: boolean
}

export default function HeroSlider() {
    const [index, setIndex] = useState(0);
    const [data, setData] = useState<HeroData[]>([]);

    async function getHeroData() {
        const res = await fetch("/api/admin/heroSection");
        const result: HeroData[] = await res.json();
        setData(result.filter((item) => item.isActive));
    }

    useEffect(() => {
        getHeroData();
    }, []);

    // Slider logic (safe + stable)
    useEffect(() => {
        if (data.length === 0) return;

        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % data.length);
        }, 4000);

        return () => clearInterval(timer);
    }, [data]);

    return (
        <section className="relative h-[calc(115vh-80px)] pt-20 overflow-hidden">
            {data.map((s, i) => (
                <div
                    key={s.id}
                    className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${i === index ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <img
                        src={s.image}
                        className="w-full h-full object-cover"
                        alt={s.title}
                    />

                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center text-white px-4">
                        <div className="flex flex-col items-center gap-6">
                            <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
                                {s.title}
                            </h1>

                            <p className="text-lg md:text-xl max-w-2xl drop-shadow-md">
                                {s.description}
                            </p>

                            <a
                                href="#contact"
                                className="bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-3 rounded-lg font-semibold"
                            >
                                Get In Touch
                            </a>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
}
