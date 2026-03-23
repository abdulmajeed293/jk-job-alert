// app/govt-jobs/page.tsx
// ✅ NO "use client" at the top — this is a Server Component

import JobCard from "@/components/JobCard";
import FeaturedJobsSlider from "@/components/FeaturedJobsSlider";

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
  updateDate?: string;
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
  links: { apply: string; notification: string; official: string };
}

// ✅ This runs on the SERVER — Google can read all job content
async function getGovtJobs(): Promise<Job[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/jobs?type=Government`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour, then refresh
      },
    );

    if (!res.ok) return [];

    const jobs: Job[] = await res.json();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const activeJobs = jobs.filter((job) => {
      if (!job.lastDate) return true;
      const last = new Date(job.lastDate);
      last.setHours(0, 0, 0, 0);
      return last >= today;
    });

    return activeJobs.sort((a, b) => b.id - a.id);
  } catch (err) {
    console.error("Failed to fetch govt jobs:", err);
    return [];
  }
}

// ✅ SEO Metadata — Google will read this
export const metadata = {
  title: "Latest Government Jobs in J&K 2026 – JKSSB, JKPSC, Police",
  description:
    "Browse all latest Government job vacancies in Jammu & Kashmir including JKSSB, JKPSC, Police, Army and more. Check eligibility, last date, salary and apply online.",
};

export default async function GovtJobsPage() {
  const govtJobs = await getGovtJobs(); // ✅ Fetched on server, not browser

  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-4">
          Latest Government Jobs in J&K 2026
        </h1>
        <p className="text-gray-600 mb-8">
          Find all latest JK Government vacancies including JKSSB, JKPSC,
          Police, Army and more — with official links, salary details,
          eligibility criteria, and last date.
        </p>

        {/* FeaturedJobsSlider needs "use client" — see Step 2 below */}
        <FeaturedJobsSlider jobs={govtJobs} />

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
