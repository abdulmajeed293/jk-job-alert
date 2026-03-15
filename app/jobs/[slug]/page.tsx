import JobDetailPage from "./JobDetailClient";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props) {
  try {
    const res = await fetch(
      `https://api.jkcareerupdates.in/api/jobs/slug/${params.slug}`,
      { next: { revalidate: 3600 } },
    );
    const data = await res.json();
    const job = data.job;

    const cleanText = job.introduction?.replace(/<[^>]*>/g, "").slice(0, 160);

    return {
      title: `${job.title} – Apply Online | JK Career Updates`,
      description: cleanText || "Latest JK Recruitment 2026",
      alternates: {
        canonical: `https://www.jkcareerupdates.in/jobs/${params.slug}`,
      },
    };
  } catch {
    return {
      title: "Job Recruitment 2026 – JK Career Updates",
    };
  }
}

export default async function Page({ params }: Props) {
  let job: {
    title: string;
    department: string;
    location: string;
    company: string;
    totalPosts: number;
    introduction: string;
    application: { salary: string; fee: string; selection: string };
    dates: { last: string; start: string; notification: string };
    eligibility: { qualification: string; ageLimit: string };
  } | null = null;

  try {
    const res = await fetch(
      `https://api.jkcareerupdates.in/api/jobs/slug/${params.slug}`,
      { next: { revalidate: 3600 } },
    );
    const data = await res.json();
    job = data.job;
  } catch {
    job = null;
  }

  return (
    <>
      {/* Google bot reads this — invisible to users */}
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

      {/* Your existing UI — completely unchanged */}
      <JobDetailPage />
    </>
  );
}
