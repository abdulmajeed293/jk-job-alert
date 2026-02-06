"use client";

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
  slug: string;
  links: {
    apply: string;
    notification: string;
    official: string;
  };
}

export default function FeaturedJobsSlider({ jobs }: { jobs: Job[] }) {
  return (
    <section className="relative bg-white border border-gray-200 rounded-2xl shadow-md p-5 overflow-hidden">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
          🔥 Featured Jobs
        </h2>
        <span className="text-xs md:text-sm text-gray-500">Swipe to explore →</span>
      </div>

      <div className="relative">
        <div className="flex gap-5 overflow-x-auto pb-4 pr-2 scrollbar-hide scroll-smooth">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="min-w-[280px] sm:min-w-[300px] max-w-[300px] shrink-0"
            >
              <JobCard job={job} />
            </div>
          ))}
        </div>

        {/* Gradient edges */}
        <div className="pointer-events-none absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-white via-white/20 to-transparent"></div>
        <div className="pointer-events-none absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-white via-white/20 to-transparent"></div>
      </div>
    </section>
  );
}
