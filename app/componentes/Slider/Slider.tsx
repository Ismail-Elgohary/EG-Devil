"use client";

import { useState, useEffect } from "react";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tpost } from "@/app/types/type";
import Link from "next/link";

export default function HeroSlider() {
  const [posts, setPosts] = useState<Tpost[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = posts.slice(0, 8);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const prev = () => setCurrentSlide((p) => (p - 1 + slides.length) % slides.length);
  const next = () => setCurrentSlide((p) => (p + 1) % slides.length);

  if (slides.length === 0) {
    return (
      <div className="h-[450px] rounded-2xl flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #e0e7ff 0%, #f0f4ff 100%)" }}>
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 mb-10 md:mb-20 pt-10">
      <div className="relative overflow-hidden rounded-2xl shadow-2xl"
        style={{ background: "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 50%, #f5f3ff 100%)" }}
      >
        <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-300/30 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-300/30 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />

         <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((post: Tpost) => (
            <div
              key={post.id}
              className="min-w-full md:h-[450px] h-[350px] relative flex items-center justify-between px-8 md:px-20 shrink-0"
            >
              <div className="relative z-20 flex flex-col gap-5 max-w-sm">
                <span className="text-indigo-500 text-xs font-bold tracking-[0.2em] uppercase bg-indigo-100 px-3 py-1 rounded-full w-fit">
                  Featured Product
                </span>

                <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 leading-tight">
                  {post.name}
                </h1>

                <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
                  {post.description}
                </p>

                {post.price && (
                  <p className="text-2xl font-black text-indigo-600">${post.price}</p>
                )}

                <Link
                  href={`/products/${post.id}`}
                  className="flex items-center gap-2 w-fit group mt-2
                    bg-indigo-600 hover:bg-indigo-700 active:scale-95
                    text-white font-bold px-6 py-3 rounded-xl
                    shadow-lg shadow-indigo-300/50
                    transition-all duration-200"
                >
                  Details
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-sm group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>

              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[55%] h-full hidden md:flex items-center justify-center pointer-events-none">
                <div className="absolute w-[300px] h-[300px] bg-indigo-400/20 rounded-full blur-[60px]" />
                <img
                  src={post.image}
                  alt={post.name}
                  className="relative z-10 object-contain h-[80%] w-auto drop-shadow-2xl"
                  style={{ animation: "imgPop 0.6s cubic-bezier(0.22,1,0.36,1) both" }}
                />
              </div>
            </div>
          ))}
        </div>

        <button onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30
            w-10 h-10 bg-white/70 hover:bg-white backdrop-blur-sm
            rounded-full flex items-center justify-center
            text-indigo-600 shadow-md transition-all duration-200 hover:scale-110"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <button onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30
            w-10 h-10 bg-white/70 hover:bg-white backdrop-blur-sm
            rounded-full flex items-center justify-center
            text-indigo-600 shadow-md transition-all duration-200 hover:scale-110"
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {slides.map((_: Tpost, index: number) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 rounded-full
                ${currentSlide === index
                  ? "bg-indigo-500 w-6 h-2.5"
                  : "bg-indigo-200 hover:bg-indigo-400 w-2.5 h-2.5"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
