export async function generateMetadata({
  params,
}: {
  params: { slug?: string };
}) {
  const rawSlug = params?.slug || "job";
  const title = rawSlug.split("-").join(" ");

  return {
    title: `${title} – Apply Online | JK Job Alert`,
    description:
      "Check eligibility, salary, syllabus, exam date and apply online for this JK government job.",
  };
}

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
