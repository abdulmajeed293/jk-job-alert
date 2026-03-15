import JobDetailPage from "./JobDetailClient";

interface Props {
  params: { slug: string };
}

type JobData = {
  title: string;
  department: string;
  location: string;
  company: string;
  totalPosts: number;
  introduction: string;
  application: { salary: string; fee: string; selection: string };
  dates: { last: string; start: string; notification: string };
  eligibility: { qualification: string; ageLimit: string };
} | null;

async function getJob(slug: string): Promise<JobData> {
  try {
    // Try with /job/slug/ route first
    const res = await fetch(
      `https://api.jkcareerupdates.in/api/jobs/slug/${slug}`,
      {
        cache: "no-store", // changed from revalidate to no-store for testing
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!res.ok) return null;

    const data = await res.json();

    // Handle both { job: {...} } and direct object response
    return data.job || data || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props) {
  const job = await getJob(params.slug);

  if (!job) {
    return {
      title: "Job Recruitment 2026 – JK Career Updates",
    };
  }

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
          <p>Salary: {job.application?.salary}</p>
          <p>Application Fee: {job.application?.fee}</p>
          <p>Last Date: {job.dates?.last}</p>
          <p>Start Date: {job.dates?.start}</p>
          <p>Qualification: {job.eligibility?.qualification}</p>
          <p>Age Limit: {job.eligibility?.ageLimit}</p>
          <p>Selection Process: {job.application?.selection}</p>
          <div dangerouslySetInnerHTML={{ __html: job.introduction || "" }} />
        </div>
      )}
      <JobDetailPage />
    </>
  );
}
