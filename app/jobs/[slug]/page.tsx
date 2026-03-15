import JobDetailPage from "./JobDetailClient";

interface Props {
  params: { slug: string };
}

// Your API returns flat array — find job by slug
async function getJob(slug: string) {
  try {
    const res = await fetch(`https://api.jkcareerupdates.in/api/jobs`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const jobs = await res.json();

    // Find the job matching the slug
    const job = Array.isArray(jobs)
      ? jobs.find((j: { slug: string }) => j.slug === slug)
      : null;

    return job || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props) {
  const job = await getJob(params.slug);
  if (!job) return { title: "Job Recruitment 2026 – JK Career Updates" };

  const cleanText = job.introduction?.replace(/<[^>]*>/g, "").slice(0, 160);
  return {
    title: `${job.title} – Apply Online | JK Career Updates`,
    description: cleanText || "Latest JK Recruitment 2026",
    alternates: {
      canonical: `https://www.jkcareerupdates.in/jobs/${params.slug}`,
    },
  };
}

export default async function Page({ params }: Props) {
  const job = await getJob(params.slug);

  return (
    <>
      {job && (
        <div
          style={{
            position: "absolute",
            width: "1px",
            height: "1px",
            overflow: "hidden",
            opacity: 0,
          }}
        >
          <h1>{job.title}</h1>
          <p>
            {job.department} – {job.location}
          </p>
          <p>Organization: {job.company}</p>
          <p>Total Posts: {job.totalPosts}</p>
          <p>Salary: {job.salary}</p>
          <p>Application Fee: {job.fee}</p>
          <p>Last Date: {job.lastDate}</p>
          <p>Start Date: {job.startDate}</p>
          <p>Qualification: {job.qualification}</p>
          <p>Age Limit: {job.ageLimit}</p>
          <p>Selection Process: {job.selection}</p>
          <div dangerouslySetInnerHTML={{ __html: job.introduction || "" }} />
        </div>
      )}
      <JobDetailPage />
    </>
  );
}
