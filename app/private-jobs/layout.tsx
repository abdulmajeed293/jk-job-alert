import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Private Jobs in Jammu & Kashmir 2026 – IT, Banking, Hospital & Company Jobs | JK Career Updates",

  description:
    "Explore latest private jobs in Jammu & Kashmir 2026 including IT company jobs, hospital vacancies, banking jobs, factory jobs and office recruitment in Jammu and Srinagar with apply links and salary details.",

  keywords: [
    "Private Jobs in Jammu",
    "Private Jobs in Srinagar",
    "JK Private Jobs 2026",
    "Company Jobs in Jammu and Kashmir",
    "Hospital Jobs in JK",
    "IT Jobs in Jammu",
    "Bank Jobs in Srinagar",
  ],

  openGraph: {
    title:
      "Private Jobs in Jammu & Kashmir 2026 – Company & Hospital Vacancies",
    description:
      "Find latest private jobs in Jammu & Kashmir including IT, banking, hospital and company recruitment updates with apply links.",
    url: "https://jkcareerupdates.in/private-jobs",
    type: "website",
    locale: "en_IN",
  },

  alternates: {
    canonical: "https://jkcareerupdates.in/private-jobs",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivateJobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
