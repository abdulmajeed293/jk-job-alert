import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug?: string };
}): Promise<Metadata> {
  const rawSlug = params?.slug || "job";
  const title = rawSlug.split("-").join(" ");

  const formattedTitle = `${title} Recruitment 2026 – Apply Online, Eligibility & Salary | JK Career Updates`;

  const description = `Apply online for ${title} Recruitment 2026 in Jammu & Kashmir. 
Check eligibility criteria, age limit, salary ₹25,100 – ₹81,100, 
important dates, syllabus, exam pattern and official notification PDF.`;

  const url = `https://jkcareerupdates.in/jobs/${rawSlug}`;

  return {
    title: formattedTitle,
    description: description,

    keywords: [
      `${title} Recruitment 2026`,
      `${title} JKSSB`,
      "JK Govt Jobs 2026",
      "Jammu Kashmir Government Jobs",
      "JKSSB Recruitment 2026",
      "JK Career Updates",
      "Apply Online JK Jobs",
    ],

    alternates: {
      canonical: url,
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      title: formattedTitle,
      description: description,
      url: url,
      siteName: "JK Career Updates",
      locale: "en_IN",
      type: "article",
    },

    twitter: {
      card: "summary_large_image",
      title: formattedTitle,
      description: description,
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
