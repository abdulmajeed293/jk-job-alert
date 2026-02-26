"use client";

import { useEffect, useState } from "react";
import JobCard from "@/components/JobCard";
import FeaturedJobsSlider from "@/components/FeaturedJobsSlider";
import api from "@/app/utils/api";

interface Job {
  id: number;
  title: string;
  introduction: string;
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
    return (
      <section className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-10 animate-pulse">
          {/* Heading skeleton */}
          <div className="h-8 bg-gray-200 rounded w-72 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-96 mb-10"></div>

          {/* Featured slider skeleton */}
          <div className="bg-white rounded-xl border border-gray-200 shadow p-6 mb-10">
            <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
            <div className="flex gap-4 overflow-hidden">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="min-w-[300px] h-40 bg-gray-200 rounded-xl"
                ></div>
              ))}
            </div>
          </div>

          {/* Job cards skeleton grid */}
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-xl shadow p-5"
              >
                <div className="h-5 bg-gray-200 rounded mb-3"></div>

                <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>

                <div className="flex gap-2 mt-4">
                  <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                  <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                </div>

                <div className="h-10 bg-gray-200 rounded-lg mt-5"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );

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
