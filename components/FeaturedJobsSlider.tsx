"use client";

import { useEffect, useRef } from "react";
import JobCard from "./JobCard";

interface Job {
  id: number;
  title: string;
  company: string;
  type: "Government" | "Private";
  location: string;
  department: string;
  totalPosts: number;
  applyMode: string;
  syllabus_link: string;
  slug: string;
  general: string;
  obc: string;
  om: string;
  sc: string;
  st1: string;
  st2: string;
  alc: string;
  rba: string;
  ews: string;
  other: string;
  lastDate?: string;
  totalMarks: string;
  omal: string;
  scal: string;
  st1al: string;
  st2al: string;
  rbaal: string;
  alcibal: string;
  ewsal: string;
  obcal: string;
  pcpal: string;
  otheral: string;
  links: {
    apply: string;
    notification: string;
    official: string;
  };
}

export default function FeaturedJobsSlider({ jobs }: { jobs: Job[] }) {
  const sliderRef = useRef<HTMLDivElement>(null);

  // Only latest 10 jobs
  const featured = jobs.slice(0, 10);

  // Auto slide
  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    const timer = setInterval(() => {
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: 320, behavior: "smooth" });
      }
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  // Arrow buttons
  const slideLeft = () => {
    sliderRef.current?.scrollBy({ left: -320, behavior: "smooth" });
  };

  const slideRight = () => {
    sliderRef.current?.scrollBy({ left: 320, behavior: "smooth" });
  };

  return (
    <section className="relative bg-white border border-gray-200 rounded-2xl shadow-md p-5 overflow-hidden">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
          🔥 Featured Jobs
        </h2>
        <span className="text-xs md:text-sm text-gray-500">
          Swipe to explore →
        </span>
      </div>

      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={slideLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
        >
          ◀
        </button>

        {/* Slider */}
        <div
          ref={sliderRef}
          className="flex gap-5 overflow-x-auto pb-4 pr-2 scrollbar-hide scroll-smooth"
        >
          {featured.map((job) => (
            <div
              key={job.id}
              className="min-w-[280px] sm:min-w-[300px] max-w-[300px] shrink-0"
            >
              <JobCard job={job} />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={slideRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
        >
          ▶
        </button>

        {/* Gradient edges */}
        <div className="pointer-events-none absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-white via-white/20 to-transparent"></div>
        <div className="pointer-events-none absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-white via-white/20 to-transparent"></div>
      </div>
    </section>
  );
}
