import { MetadataRoute } from "next";

const BASE_URL = "https://www.jkcareerupdates.in";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let jobs: { slug: string; updatedAt?: string }[] = [];

  try {
    const res = await fetch("https://api.jkcareerupdates.in/api/jobs", {
      cache: "no-store",
    });
    const data = await res.json();

    // Your API returns jobs inside array
    jobs = Array.isArray(data) ? data : data.jobs;
  } catch (e) {
    console.error("Failed to load jobs for sitemap");
  }

  const jobUrls = jobs.map((job) => ({
    url: `${BASE_URL}/jobs/${job.slug}`,
    lastModified: job.updatedAt ? new Date(job.updatedAt) : new Date(),
  }));

  return [
    { url: BASE_URL, lastModified: new Date() },

    { url: `${BASE_URL}/govt-jobs`, lastModified: new Date() },
    { url: `${BASE_URL}/private-jobs`, lastModified: new Date() },
    { url: `${BASE_URL}/jobs`, lastModified: new Date() },

    { url: `${BASE_URL}/about`, lastModified: new Date() },
    { url: `${BASE_URL}/contact`, lastModified: new Date() },
    { url: `${BASE_URL}/privacy-policy`, lastModified: new Date() },
    { url: `${BASE_URL}/disclaimer`, lastModified: new Date() },

    ...jobUrls,
  ];
}
