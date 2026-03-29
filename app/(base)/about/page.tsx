"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const stats = [
  { value: "12K+", label: "Happy Customers" },
  { value: "850+", label: "Products" },
  { value: "6", label: "Years of Style" },
  { value: "99%", label: "Satisfaction" },
];

const values = [
  {
    icon: "◈",
    title: "Premium Quality",
    desc: "Every piece is handpicked for craftsmanship, fabric, and fit. We never compromise.",
  },
  {
    icon: "◉",
    title: "Bold Identity",
    desc: "EG-Devil is not just clothing — it's a statement. Wear who you are.",
  },
  {
    icon: "◇",
    title: "Exclusive Drops",
    desc: "Limited collections released monthly. Own something rare.",
  },
  {
    icon: "◎",
    title: "Built to Last",
    desc: "Timeless design over fast fashion. Pieces you'll wear for years.",
  },
];

const team = [
  {
    name: "Ismail Elgohary",
    role: "The Owner",
    image: "../../images/photo_2026-03-29_19-41-55.jpg",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function AboutPage() {
  const heroRef = useInView(0.1);
  const storyRef = useInView(0.1);
  const statsRef = useInView(0.1);
  const valuesRef = useInView(0.1);
  const teamRef = useInView(0.1);

  return (
    <div className="bg-[#0e0e0e] text-white min-h-screen overflow-x-hidden">

      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">

        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600"
            alt="hero"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0e0e0e]/60 via-transparent to-[#0e0e0e]" />
        </div>

        <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-30">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-px bg-white" style={{ height: 24 + i * 4 }} />
          ))}
        </div>
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-30">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-px bg-white" style={{ height: 24 + i * 4 }} />
          ))}
        </div>

        <div
          ref={heroRef.ref}
          className="relative text-center px-6 max-w-4xl mx-auto"
          style={{
            opacity: heroRef.inView ? 1 : 0,
            transform: heroRef.inView ? "translateY(0)" : "translateY(40px)",
            transition: "all 0.9s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <p className="text-xs tracking-[0.4em] text-gray-400 uppercase mb-6">Since 2026</p>
          <h1
            className="text-6xl md:text-8xl font-black leading-none mb-6 tracking-tight"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            EG<span className="text-indigo-400">-</span>Devil
          </h1>
          <div className="w-16 h-px bg-indigo-400 mx-auto mb-6" />
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
            We don't follow trends. We create them. Fashion born from the streets of Egypt,
            worn across the world.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-28 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div
          ref={storyRef.ref}
          style={{
            opacity: storyRef.inView ? 1 : 0,
            transform: storyRef.inView ? "translateX(0)" : "translateX(-50px)",
            transition: "all 0.9s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <p className="text-xs tracking-[0.4em] text-indigo-400 uppercase mb-4">Our Story</p>
          <h2
            className="text-4xl md:text-5xl font-black mb-8 leading-tight"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            <span className="text-indigo-400">Eg-Devil</span>
          </h2>
          <p className="text-gray-400 leading-relaxed mb-5 text-base">
            EG-Devil started in 2026 as a small Cairo-based brand with one mission: give Egyptian
            youth clothing that matches their energy — bold, sharp, and unapologetic.
          </p>
          <p className="text-gray-400 leading-relaxed mb-5 text-base">
            What began as a local streetwear project quickly grew into a full fashion house,
            shipping to over 20 countries. Every collection tells a story rooted in culture,
            identity, and the relentless pursuit of style.
          </p>
          <p className="text-gray-400 leading-relaxed text-base">
            We are not just a brand. We are a movement.
          </p>
        </div>

        <div
          className="relative h-[500px]"
          style={{
            opacity: storyRef.inView ? 1 : 0,
            transform: storyRef.inView ? "translateX(0)" : "translateX(50px)",
            transition: "all 0.9s cubic-bezier(0.22,1,0.36,1) 0.2s",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600"
            alt="story"
            className="absolute top-0 right-0 w-72 h-80 object-cover rounded-2xl"
          />
          <img
            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600"
            alt="story 2"
            className="absolute bottom-0 left-0 w-64 h-72 object-cover rounded-2xl border-4 border-[#0e0e0e]"
          />
          <div className="absolute bottom-8 right-8 bg-indigo-500 text-white text-xs font-black px-4 py-2 rounded-full tracking-widest uppercase">
            Est. 2026
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 py-16">
        <div
          ref={statsRef.ref}
          className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="text-center"
              style={{
                opacity: statsRef.inView ? 1 : 0,
                transform: statsRef.inView ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 0.1}s`,
              }}
            >
              <p
                className="text-4xl md:text-5xl font-black text-indigo-400 mb-2"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                {s.value}
              </p>
              <p className="text-xs tracking-widest text-gray-500 uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-28">
        <div
          ref={valuesRef.ref}
          className="text-center mb-16"
          style={{
            opacity: valuesRef.inView ? 1 : 0,
            transform: valuesRef.inView ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <p className="text-xs tracking-[0.4em] text-indigo-400 uppercase mb-3">What We Stand For</p>
          <h2
            className="text-4xl md:text-5xl font-black"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Our Values
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <div
              key={v.title}
              className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-indigo-500/50 hover:bg-white/8 transition-all duration-300 group"
              style={{
                opacity: valuesRef.inView ? 1 : 0,
                transform: valuesRef.inView ? "translateY(0)" : "translateY(40px)",
                transition: `all 0.6s cubic-bezier(0.22,1,0.36,1) ${0.2 + i * 0.1}s`,
              }}
            >
              <span className="text-3xl text-indigo-400 block mb-4 group-hover:scale-110 transition-transform">
                {v.icon}
              </span>
              <h3 className="text-base font-black mb-2 tracking-wide">{v.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 pb-28">
        <div
          ref={teamRef.ref}
          className="text-center mb-16"
          style={{
            opacity: teamRef.inView ? 1 : 0,
            transform: teamRef.inView ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <p className="text-xs tracking-[0.4em] text-indigo-400 uppercase mb-3">The Owners</p>
          <h2
            className="text-4xl md:text-5xl font-black"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Behind the Brand
          </h2>
        </div>

        <div className="flex justify-center">
          {team.map((member, i) => (
            <div
              key={member.name}
              className="group text-center"
              style={{
                opacity: teamRef.inView ? 1 : 0,
                transform: teamRef.inView ? "translateY(0)" : "translateY(40px)",
                transition: `all 0.6s cubic-bezier(0.22,1,0.36,1) ${0.2 + i * 0.15}s`,
              }}
            >
              <div className="relative w-48 h-48 mx-auto mb-5 rounded-2xl overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/20 transition-all duration-300" />
              </div>
              <h3 className="text-base font-black tracking-wide">{member.name}</h3>
              <p className="text-xs text-indigo-400 tracking-widest uppercase mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative border-t border-white/10 py-28 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 via-transparent to-indigo-900/20" />
        <div className="relative max-w-2xl mx-auto px-6">
          <h2
            className="text-4xl md:text-5xl font-black mb-6 leading-tight"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Ready to Own
            <br />
            <span className="text-indigo-400">Your Style?</span>
          </h2>
          <p className="text-gray-400 mb-10 text-base">
            Browse our latest collections and find pieces that define who you are.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-3 px-10 py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-black rounded-full tracking-widest uppercase text-sm transition-all hover:scale-105 active:scale-95"
          >
            Shop Now →
          </Link>
        </div>
      </section>

    </div>
  );
}
