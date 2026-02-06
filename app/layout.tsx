import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "JK Career Updates – Latest Govt & Private Jobs in Jammu & Kashmir",
    template: "%s | JK Career Updates",
  },
  description:
    "JK Career Updates provides latest government and private job notifications, syllabus, admit cards, and results for Jammu & Kashmir.",
  keywords: [
    "JK Career Updates",
    "Jammu Kashmir Jobs",
    "JKSSB Jobs",
    "JKPSC Jobs",
    "Govt Jobs JK",
  ],
  authors: [{ name: "JK Career Updates" }],
  metadataBase: new URL("https://jkcareerupdates.in"), // change later

  robots: {
    index: true,
    follow: true,
  },

   openGraph: {
    title: "JK Career Updates – Latest Govt & Private Jobs in Jammu & Kashmir",
    description:
      "Latest JKSSB, JKPSC, Police, Army and Private jobs in Jammu & Kashmir with official notifications.",
    url: "https://jkcareerupdates.in",
    siteName: "JK Career Updates",
    locale: "en_IN",
    type: "website",
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
