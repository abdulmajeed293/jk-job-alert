import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "JK Govt Jobs 2026 – JKSSB, JKPSC, Police & Other Government Vacancies | JK Career Updates",

  description:
    "Check latest JK Govt Jobs 2026 including JKSSB recruitment, JKPSC notifications, JK Police constable vacancy, Army and other Jammu & Kashmir government job updates with apply online links and official notifications.",

  keywords: [
    "JK Govt Jobs 2026",
    "JKSSB Recruitment 2026",
    "JKPSC Jobs 2026",
    "JK Police Vacancy 2026",
    "Jammu Kashmir Government Jobs",
    "JK Government Recruitment",
    "Latest JK Jobs",
  ],

  openGraph: {
    title: "JK Govt Jobs 2026 – JKSSB, JKPSC, Police & Government Vacancies",
    description:
      "Browse latest Jammu & Kashmir Government Jobs including JKSSB, JKPSC and Police recruitment updates with official notifications.",
    url: "https://jkcareerupdates.in/govt-jobs",
    type: "website",
    locale: "en_IN",
  },

  alternates: {
    canonical: "https://jkcareerupdates.in/govt-jobs",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function GovtJobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
