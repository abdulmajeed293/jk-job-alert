import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default:
      "JK Govt Jobs 2026 – JKSSB, JKPSC, Police & Private Jobs | JK Career Updates",
    template: "%s | JK Career Updates",
  },

  description:
    "JK Career Updates provides latest JK Govt Jobs 2026 including JKSSB recruitment, JKPSC notifications, JK Police vacancies and private jobs in Jammu & Kashmir. Get official notifications, syllabus, admit cards and results updates.",

  keywords: [
    "JK Govt Jobs 2026",
    "JKSSB Recruitment 2026",
    "JKPSC Jobs",
    "JK Police Vacancy",
    "Private Jobs in Jammu",
    "Jammu Kashmir Government Jobs",
    "JK Career Updates",
    "JK Jobs Portal",
  ],

  authors: [{ name: "JK Career Updates" }],

  metadataBase: new URL("https://jkcareerupdates.in"),

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  verification: {
    google: "2343EdAFkIBeI6r2GO5DhFAHdlkfbTNrnff0WGIQz9c",
  },

  icons: {
    icon: "/favicon.ico",
  },

  openGraph: {
    title:
      "JK Govt Jobs 2026 – JKSSB, JKPSC, Police & Private Jobs | JK Career Updates",
    description:
      "Latest JKSSB recruitment 2026, JKPSC notifications, JK Police constable vacancy and private jobs in Jammu & Kashmir with official updates.",
    url: "https://jkcareerupdates.in",
    siteName: "JK Career Updates",
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title:
      "JK Govt Jobs 2026 – JKSSB, JKPSC, Police & Private Jobs | JK Career Updates",
    description:
      "Latest government and private jobs in Jammu & Kashmir with official notifications and updates.",
  },

  alternates: {
    canonical: "https://jkcareerupdates.in",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
