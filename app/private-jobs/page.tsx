// app/jobs/private/page.tsx
"use client";

import { useEffect, useState } from "react";
import JobCard from "@/components/JobCard";
import FeaturedJobsSlider from "@/components/FeaturedJobsSlider";
// ❌ JobFilterSidebar removed
import api from "@/app/utils/api";
import PremiumLoader from "@/components/PremiumLoader";

interface Job {
  id: number;
  title: string;
  introduction: string;
  company: string;
  slug: string;
  type: "Government" | "Private";
  location: string;
  department: string;
  totalPosts: number;
  applyMode: string;
  syllabus_link: string;
  general: string;
  obc: string;
  sc: string;
  om: string;
  st1: string;
  st2: string;
  alc: string;
  rba: string;
  ews: string;
  other: string;
  totalMarks: string;

  /* ================== Age limit ================== */
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

export default function PrivateJobsPage() {
  const [pvtJobs, setPvtJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get<Job[]>("/jobs");
        const filtered = res.data.filter((job) => job.type === "Private");
       const sortedJobs = filtered.sort((a, b) => {
         return b.id - a.id;
       });
        setPvtJobs(sortedJobs.sort((a, b) => b.id - a.id));
      } catch (err) {
        alert("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

if (loading) if (loading) return <PremiumLoader />;

  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-4">Latest Private Jobs</h1>
        <p className="text-gray-600 mb-8">
          Find all latest JK Private vacancies with official links, salary,
          eligibility, and last date details.
        </p>

        <FeaturedJobsSlider jobs={pvtJobs} />

        {/* Sidebar removed */}
        <div className="mt-10">
          {pvtJobs.length === 0 ? (
            <div className="bg-white border rounded-xl p-10 text-center shadow">
              <p className="text-xl font-semibold text-gray-700">
                No Private Jobs Available
              </p>
              <p className="text-gray-500 mt-2">
                New vacancies will be added soon. Please check back later.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
              {pvtJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
