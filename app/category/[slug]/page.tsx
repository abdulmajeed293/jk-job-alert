"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/app/utils/api";
import JobCard from "@/components/JobCard";
import { Job } from "@/types/job";

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
  om?: string;
  obc?: string;
  sc?: string;
  st1?: string;
  st2?: string;
  alc?: string;
  rba?: string;
  ews?: string;
  syllabus_link: string;
  applyLink?: string;
  notificationLink?: string;
  officialLink?: string;

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
}

export default function CategoryPage() {
  const { slug } = useParams();

  // Send the slug exactly as in the DB (case-sensitive)
  const category = String(slug);

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryJobs = async () => {
      try {
        const res = await api.get<RawJob[]>("/jobs", {
          params: { category },
        });

        const mapped: Job[] = res.data.map((j) => ({
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
          syllabus_link: j.syllabus_link,
          om: j.om || "0",
          obc: j.obc || "0",
          sc: j.sc || "0",
          st1: j.st1 || "0",
          st2: j.st2 || "0",
          alc: j.alc || "0",
          rba: j.rba || "0",
          ews: j.ews || "0",
          other: j.other || "0",
          totalMarks: j.totalMarks,

          omal: j.omal,
          scal: j.scal,
          st1al: j.st1al,
          st2al: j.st2al,
          rbaal: j.rbaal,
          alcibal: j.alcibal,
          ewsal: j.ewsal,
          obcal: j.obcal,
          pcpal: j.pcpal,
          otheral: j.otheral,
          links: {
            apply: j.applyLink || "",
            notification: j.notificationLink || "",
            official: j.officialLink || "",
          },
        }));

        setJobs(mapped);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryJobs();
  }, [category]);

  const formatCategoryTitle = (slug: string) => {
    const formatted = slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    // If already ends with 'Jobs', don't add again
    if (formatted.toLowerCase().endsWith(" jobs")) {
      return formatted;
    }

    return `${formatted} Jobs`;
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">
        {formatCategoryTitle(category)}
      </h1>

      {loading && <p>Loading...</p>}

      {!loading && jobs.length === 0 && (
        <p>New vacancies will be added soon.</p>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  );
}
