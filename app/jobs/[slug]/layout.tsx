export async function generateMetadata({
  params,
}: {
  params: { slug?: string };
}) {
  const rawSlug = params?.slug || "job";
  const title = rawSlug.split("-").join(" ");

  return {
    title: `${title} Recruitment 2026 – Apply Online | JK Career Updates`,
    description: `Apply for ${title} 2026. Check eligibility, age limit, salary, important dates, syllabus and official notification in Jammu & Kashmir.`,
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
