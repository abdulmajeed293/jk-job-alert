"use client";

import { useEffect, useState } from "react";
import JobCard from "@/components/JobCard";
import FeaturedJobsSlider from "@/components/FeaturedJobsSlider";
import api from "@/app/utils/api";

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
  links: { apply: string; notification: string; official: string };
}

export default function GovtJobsPage() {
  const [govtJobs, setGovtJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handler = () => {
      window.dispatchEvent(new Event("filters-change"));
    };

    const fetchJobs = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const department = urlParams.get("department");
        const location = urlParams.get("location");

        const res = await api.get<Job[]>("/jobs", {
          params: {
            type: "Government",
            category: department || undefined,
            search: location || undefined,
          },
        });

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const activeJobs = res.data.filter((job) => {
          if (!job.lastDate) return true;
          const last = new Date(job.lastDate);
          last.setHours(0, 0, 0, 0);
          return last >= today;
        });

        setGovtJobs(activeJobs);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
    window.addEventListener("filters-change", fetchJobs);
    return () => window.removeEventListener("filters-change", fetchJobs);
  }, []);

  if (loading)
    return <p className="text-center p-10 text-gray-500">Loading jobs...</p>;

  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-4">Latest Government Jobs</h1>
        <p className="text-gray-600 mb-8">
          Find all latest JK Government vacancies with official links, salary,
          eligibility, and last date details.
        </p>

        <FeaturedJobsSlider jobs={govtJobs} />

        {/* Sidebar removed – full width jobs now */}
        <div className="mt-10">
          {govtJobs.length === 0 ? (
            <div className="bg-white border rounded-xl p-10 text-center shadow">
              <p className="text-xl font-semibold text-gray-700">
                No Government Jobs Available
              </p>
              <p className="text-gray-500 mt-2">
                New vacancies will be added soon. Please check back later.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
              {govtJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
