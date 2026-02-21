"use client";

import { useState, useEffect } from "react";
import api from "@/app/utils/api";
import JobCard from "@/components/JobCard";
import { Job } from "@/types/job";
import Link from "next/link";

// Define type for raw backend job object
interface RawJob {
  id: number;
  title: string;
  introduction: string;
  company: string;
  type: "Government" | "Private";
  location: string;
  department: string;
  slug: string;
  totalPosts: number;
  applyMode: string;
  syllabus_link: string;
  om?: string;
  obc?: string;
  sc?: string;
  st1?: string;
  st2?: string;
  alc?: string;
  rba?: string;
  ews?: string;
  other?: string;
  applyLink?: string;
  notificationLink?: string;
  officialLink?: string;
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

  category_name: string;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("");

  const [latestJobs, setLatestJobs] = useState<Job[]>([]);

  interface Category {
    id: number;
    name: string;
    slug: string;
  }

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get<RawJob[]>("/jobs"); // fetch all jobs
        const allJobs = res.data;

        // Extract unique category names from jobs
        const uniqueCategories = Array.from(
          new Set(allJobs.map((job) => job.category_name)),
        ).map((name, index) => ({
          id: index + 1, // unique id for mapping
          name,
          slug: name.toLowerCase().replace(/\s+/g, "-"), // slug for URL
        }));

        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);
  // Function to fetch jobs (used by button & real-time effect)
  const fetchJobs = async (searchTerm: string) => {
    if (!searchTerm.trim() && !activeCategory) {
      setJobs([]);
      return;
    }

    try {
      setLoading(true);
      const res = await api.get<RawJob[]>("/jobs", {
        params: { search: searchTerm, category: activeCategory },
      });

      const mappedJobs: Job[] = res.data.map((j: RawJob) => ({
        id: j.id,
        title: j.title,
        introduction: j.introduction,
        company: j.company,
        type: j.type,
        location: j.location,
        department: j.department,
        slug: j.slug,
        totalPosts: j.totalPosts,
        applyMode: j.applyMode,
        omal: j.omal,
        totalMarks: j.totalMarks,
        syllabus_link: j.syllabus_link,
        category_name: j.category_name,

        scal: j.scal,
        st1al: j.st1al,
        st2al: j.st2al,
        rbaal: j.rbaal,
        alcibal: j.alcibal,
        ewsal: j.ewsal,
        obcal: j.obcal,
        pcpal: j.pcpal,
        otheral: j.otheral,
        om: j.om || "0",
        obc: j.obc || "0",
        sc: j.sc || "0",
        st1: j.st1 || "0",
        st2: j.st2 || "0",
        alc: j.alc || "0",
        rba: j.rba || "0",
        ews: j.ews || "0",
        other: j.other || "0",
        links: {
          apply: j.applyLink || "",
          notification: j.notificationLink || "",
          official: j.officialLink || "",
        },
      }));

      setJobs(mappedJobs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Real-time search effect (with debounce)
  useEffect(() => {
    const timeout = setTimeout(() => fetchJobs(query), 300); // 300ms debounce
    return () => clearTimeout(timeout);
  }, [query, activeCategory]);
  // Optional: button click triggers same search (debounced)
  const handleSearch = () => {
    fetchJobs(query);
  };

  useEffect(() => {
    const fetchLatestJobs = async () => {
      try {
        const res = await api.get<RawJob[]>("/jobs");

        const mapped = res.data.slice(0, 10).map((j: RawJob) => ({
          id: j.id,
          title: j.title,
          introduction: j.introduction,
          company: j.company,
          type: j.type,
          location: j.location,
          department: j.department,
          slug: j.slug,
          totalPosts: j.totalPosts,
          applyMode: j.applyMode,
          omal: j.omal,
          totalMarks: j.totalMarks,
          syllabus_link: j.syllabus_link,
          scal: j.scal,
          st1al: j.st1al,
          st2al: j.st2al,
          rbaal: j.rbaal,
          alcibal: j.alcibal,
          ewsal: j.ewsal,
          obcal: j.obcal,
          pcpal: j.pcpal,
          otheral: j.otheral,
          om: j.om || "0",
          obc: j.obc || "0",
          sc: j.sc || "0",
          st1: j.st1 || "0",
          st2: j.st2 || "0",
          alc: j.alc || "0",
          rba: j.rba || "0",
          ews: j.ews || "0",
          other: j.other || "0",
          links: {
            apply: j.applyLink || "",
            notification: j.notificationLink || "",
            official: j.officialLink || "",
          },
        }));

        setLatestJobs(mapped);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLatestJobs();
  }, []);

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white border-b">
        <div className="absolute -top-24 -right-24 h-72 w-72 bg-blue-100 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute -bottom-24 -left-24 h-72 w-72 bg-purple-100 rounded-full blur-3xl opacity-60"></div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 text-center">
          <span className="inline-block mb-4 bg-blue-50 text-blue-600 text-xs font-semibold px-4 py-1 rounded-full">
            Jammu & Kashmir Career Updates
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Latest JK Government & Private Jobs
          </h1>

          <p className="mt-5 text-lg text-gray-600 max-w-2xl mx-auto">
            Get daily updates on JKSSB, JKPSC, Police, Army, Private sector
            jobs, syllabus, admit cards, and results.
          </p>

          {/* Search Box */}
          <div className="mt-10 flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto bg-white/80 backdrop-blur border border-gray-200 rounded-2xl p-2 shadow-md">
            <input
              type="text"
              placeholder="Search job title, department, keyword..."
              className="flex-1 bg-transparent px-4 py-3 focus:outline-none text-gray-700 placeholder-gray-400"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition shadow-sm"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      {/* Latest Jobs Vertical Ticker */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Latest Job Updates
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Recently added government and private job notifications
            </p>
          </div>

          {/* Ticker Box */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
            <div className="relative h-56 overflow-hidden">
              <div className="animate-scrollUp space-y-5">
                {latestJobs.map((job) => (
                  <Link
                    key={job.id}
                    href={`/jobs/${job.slug}`}
                    className="flex justify-between items-center border-b border-gray-100 pb-4 last:border-none hover:bg-gray-50 px-3 py-2 rounded-lg transition"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 hover:text-blue-600 transition">
                        {job.title}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {job.company}
                      </p>
                    </div>

                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${
                        job.type === "Government"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {job.type}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      */
      {/* Show search results */}
      {loading && (
        <p className="text-center p-10 text-gray-500">Loading jobs...</p>
      )}
      {!loading && query.trim() !== "" && (
        <>
          {jobs.length > 0 ? (
            <div className="max-w-7xl mx-auto px-4 pb-16">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                {activeCategory ? `${activeCategory} Jobs` : "Search Results"}
              </h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto px-6 py-16 bg-white border border-gray-200 rounded-2xl shadow-lg text-center flex flex-col items-center gap-4">
              {/* Info Icon */}
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-2xl font-bold">
                ℹ️
              </div>

              <p className="text-2xl font-semibold text-gray-800">
                No jobs found
              </p>

              <p className="text-gray-500 text-center">
                Try searching with different keywords, department names, or
                clear the search box to see all jobs.
              </p>

              <button
                onClick={() => setQuery("")}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-700 transition"
              >
                Clear Search
              </button>
            </div>
          )}
        </>
      )}
      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Browse Jobs by Category
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5">
          {categories.map((item) => (
            <Link
              href={`/category/${item.slug}`}
              key={item.id}
              className="group bg-white border border-gray-200/70 rounded-xl p-5 text-center shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer block"
            >
              <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-lg">
                {item.name[0]}
              </div>

              <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition">
                {item.name}
              </h3>

              <p className="text-xs text-gray-500 mt-1">View latest updates</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
