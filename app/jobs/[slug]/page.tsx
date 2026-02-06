"use client";

import React, { useEffect, useState } from "react";
import api from "@/app/utils/api"; // Axios instance
import { useParams } from "next/navigation";
import Link from "next/link";




/* ---------------- Type Definitions ---------------- */
interface Job {
  id: number;
  slug: string;
  title: string;
  department: string;
  location: string;
  type: "Government" | "Private";
  applyMode: string;
  totalPosts: number;
  om: string;
  obc: string;
  sc: string;
  st1: string;
  st2: string;
  alc: string;
  rba: string;
  ews: string;
  other: string;
  status?: "active" | "expired";

   /* ================== Age limit ================== */
  omal: string;
  scal: string;
  st1al: string;
  st2al: string;
  rbaal: string;
  alcibal: string;
  ewsal: string; 
  obcal: string; 
  pcpal: string;
  otheral: string;

  totalMarks: string;

  links: {
    apply: string;
    notification: string;
    official: string;
    admitCard: string;
  };
  application: {
    fee: string;
    selection: string;
    salary: string;
  };
  dates: {
    notification: string;
    start: string;
    last: string;
    
    //admitCard: string;
    exam: string;
  };
  eligibility: {
    qualification: string;
    ageLimit: string;
    ageRelaxation: string;
  };
  vacancy: { category: string; posts: number }[];
  exam: {
    syllabus: string[];
    pattern: { subject: string; marks: string }[];
    
  };
}

/* ---------------- Main Component ---------------- */

function formatDate(dateStr: string) {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}


function isJobExpired(job: Job) {
  if (job.status === "expired") return true;

  if (!job.dates?.last) return false;

  const lastDate = new Date(job.dates.last);
  const today = new Date();

  // Ignore time, compare only date
  lastDate.setHours(0,0,0,0);
  today.setHours(0,0,0,0);

  return lastDate < today;
}



export default function JobDetailPage() {
  const params = useParams();
  const slug = params.slug as string; // grab slug from URL

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);







  

  useEffect(() => {
    if (!slug) return;

    const fetchJob = async () => {
      setLoading(true);
      try {
        // ✅ Call backend route for slug
        const res = await api.get<{ job: Job }>(`/jobs/slug/${slug}`);
        setJob(res.data.job);
      } catch (err) {
        console.error(err);
        setJob(null);
        alert("Unable to find the details please try after sometime");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [slug]);

  if (loading)
    return <p className="p-10 text-center text-gray-500">Loading...</p>;
  if (!job)
    return <p className="p-10 text-center text-gray-500">Job not found</p>;

  if (!job)
  return <p className="p-10 text-center text-gray-500">Job not found</p>;

  if (isJobExpired(job)) {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-xl text-center">
        <h2 className="text-2xl font-bold text-red-600">This Job Has Expired</h2>
        <p className="mt-4 text-gray-600">
          The last date to apply for this job has passed.  
          Please check the latest job updates on JK Career Updates.
        </p>
        <Link href="/"
  className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
>
  View Latest Jobs
</Link>

      </div>
    </div>
  );
}



  return (
    <article className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 grid gap-8">

        {/* HERO CARD */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-all duration-300">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">{job.title}</h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">{job.department} • {job.location}</p>

          <div className="mt-5 flex flex-wrap gap-3 text-sm">
            <span className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full font-medium">{job.type}</span>
            <span className="bg-green-100 text-green-800 px-4 py-1 rounded-full font-medium">{job.applyMode}</span>
            <span className="bg-purple-100 text-purple-800 px-4 py-1 rounded-full font-medium">{job.totalPosts} Posts</span>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            {job.links.apply && (
              <a href={job.links.apply} className="flex-1 text-center bg-blue-600 text-white py-3 rounded-xl font-semibold shadow hover:bg-blue-700 transition">
                Apply Online
              </a>
            )}

            {job.links.notification && (
              <a href={job.links.notification} className="flex-1 text-center border border-blue-600 text-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-50 transition">
                Download Notification
              </a>
            )}

          </div>
        </div>

        {/* QUICK STATS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
          <Stat label="Notification Date" value={formatDate(job.dates.notification)} />
          
          <Stat label="Start Date" value={formatDate(job.dates.start)} />
          <Stat label="Last Date" value={formatDate(job.dates.last)} />
          <Stat label="Age Limit" value={job.eligibility.ageLimit} />
          <Stat label="Applicatin Fee" value={job.application.fee} />
         {/* <Stat label="Qualification" value={job.eligibility.qualification} /> */} 
          <Stat label="Salary" value={job.application.salary} />
        {/* <Stat label="Selection" value={job.application.selection} /> */} 
        </div>

        {/* SECTIONS */}
        <Section title="Important Dates">
          <KeyValue items={[
            ["Notification", formatDate(job.dates.notification)],
            ["Application Form Start Date", formatDate(job.dates.start)],
            ["Application Form Last Date", formatDate(job.dates.last)],
           // ["Admit Card", formatDate(job.dates.admitCard)],
           // ["Exam Date", formatDate(job.dates.exam)],
          ]} />
        </Section>

        <Section title="Eligibility">
          <p><b>Qualification:</b> {job.eligibility.qualification}</p>
          <p><b>Age Limit:</b> {job.eligibility.ageLimit}</p>
          <p><b>Age Relaxation:</b> {job.eligibility.ageRelaxation}</p>
        </Section>

        <Section title="Vacancy Details">
  <table className="w-full text-sm border rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition">
    <thead className="bg-gray-100">
      <tr>
        <th className="p-3 text-left">Category</th>
        <th className="p-3 text-right">Posts</th>
      </tr>
    </thead>
    <tbody>
      {/* Use individual fields from job object */}
      <tr className="border-t hover:bg-gray-50 transition">
        <td className="p-3">OM</td>
        <td className="p-3 text-right font-semibold">{job.om}</td>
      </tr>
      <tr className="border-t hover:bg-gray-50 transition">
        <td className="p-3">OBC</td>
        <td className="p-3 text-right font-semibold">{job.obc}</td>
      </tr>
      <tr className="border-t hover:bg-gray-50 transition">
        <td className="p-3">SC</td>
        <td className="p-3 text-right font-semibold">{job.sc}</td>
      </tr>
      <tr className="border-t hover:bg-gray-50 transition">
        <td className="p-3">ST-1</td>
        <td className="p-3 text-right font-semibold">{job.st1}</td>
      </tr>
      <tr className="border-t hover:bg-gray-50 transition">
        <td className="p-3">ST-2</td>
        <td className="p-3 text-right font-semibold">{job.st2}</td>
      </tr>
      <tr className="border-t hover:bg-gray-50 transition">
        <td className="p-3">ALC/IB</td>
        <td className="p-3 text-right font-semibold">{job.alc}</td>
      </tr>
      <tr className="border-t hover:bg-gray-50 transition">
        <td className="p-3">RBA</td>
        <td className="p-3 text-right font-semibold">{job.rba}</td>
      </tr>
      <tr className="border-t hover:bg-gray-50 transition">
        <td className="p-3">EWS</td>
        <td className="p-3 text-right font-semibold">{job.ews}</td>
      </tr>
      <tr className="border-t hover:bg-gray-50 transition">
        <td className="p-3">Others</td>
        <td className="p-3 text-right font-semibold">{job.other}</td>
      </tr>
      <tr className="border-t bg-gray-100 font-bold">
  <td className="p-3">Total Posts</td>
  <td className="p-3 text-right">
    {(
      Number(job.om || 0) +
      Number(job.obc || 0) +
      Number(job.sc || 0) +
      Number(job.st1 || 0) +
      Number(job.st2 || 0) +
      Number(job.alc || 0) +
      Number(job.rba || 0) +
      Number(job.ews || 0) +
      Number(job.other || 0)
    )}
  </td>
</tr>

    </tbody>
  </table>
</Section>





       <Section title="Age Limit">
  <table className="w-full text-sm border rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition">
    <thead className="bg-gray-100">
      <tr>
        <th className="p-3 text-left">Category</th>
        <th className="p-3 text-right">Age</th>
      </tr>
    </thead>
    <tbody>
      {/* Use individual fields form for Age Limits object */}
      <tr className="border-t hover:bg-gray-50 transition">
        <td className="p-3">OM</td>
        <td className="p-3 text-right font-semibold">{job.omal}</td>
      </tr>
      <tr className="border-t hover:bg-gray-50 transition">
        <td className="p-3">OBC</td>
        <td className="p-3 text-right font-semibold">{job.obcal}</td>
      </tr>
      <tr className="border-t hover:bg-gray-50 transition">
        <td className="p-3">SC</td>
        <td className="p-3 text-right font-semibold">{job.scal}</td>
      </tr>
      <tr className="border-t hover:bg-gray-50 transition">
        <td className="p-3">ST-1</td>
        <td className="p-3 text-right font-semibold">{job.st1al}</td>
      </tr>
      <tr className="border-t hover:bg-gray-50 transition">
        <td className="p-3">ST-2</td>
        <td className="p-3 text-right font-semibold">{job.st2al}</td>
      </tr>
      <tr className="border-t hover:bg-gray-50 transition">
        <td className="p-3">ALC/IB</td>
        <td className="p-3 text-right font-semibold">{job.alcibal}</td>
      </tr>
      <tr className="border-t hover:bg-gray-50 transition">
        <td className="p-3">RBA</td>
        <td className="p-3 text-right font-semibold">{job.rbaal}</td>
      </tr>
      <tr className="border-t hover:bg-gray-50 transition">
        <td className="p-3">EWS</td>
        <td className="p-3 text-right font-semibold">{job.ewsal}</td>
      </tr>
      <tr className="border-t hover:bg-gray-50 transition">
        <td className="p-3">Physically Challenged Person </td>
        <td className="p-3 text-right font-semibold">{job.pcpal}</td>
      </tr>
      <tr className="border-t hover:bg-gray-50 transition">
        <td className="p-3">Others</td>
        <td className="p-3 text-right font-semibold">{job.otheral}</td>
      </tr>

    </tbody>
  </table>
</Section>



        <Section title="Application Details">
          <KeyValue items={[
            ["Application Fee", job.application.fee],
            ["Selection Process", job.application.selection],
            ["Salary", job.application.salary],
          ]} />
        </Section>

        <Section title="Exam Details">
          
          <h4 className="font-semibold mt-2">Syllabus: (Please Conform Official Syllabus)</h4>
<ul className="list-disc ml-5 text-sm space-y-1">
  {job.exam.syllabus.map((s, i) => (
    <li key={i}>{s.trim()}</li>
  ))}
</ul>




          <h4 className="font-semibold mt-4">Exam Pattern</h4>
          <div className="w-full h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full mb-3"></div>
          <table className="w-full text-sm border rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition">
            <tbody>

              {job.exam.pattern.map(p => (
                
                <tr key={p.subject} className="border-t hover:bg-gray-50 transition">
                  <td className="p-3">{p.subject}</td>
                  <td className="p-3 text-right">{p.marks}</td>
                </tr>
              ))}
              {/* 🔥 Total row (auto from backend) */}
            <tr className="border-t bg-gray-100 font-bold">
              <td className="p-3 text-left">Total Marks</td>
              <td className="p-3 text-right">{job.totalMarks}</td>
            </tr>

            </tbody>
          </table>

        </Section>

        <Section title="Important Links">
          <div className="flex flex-col gap-2 text-blue-600 font-medium">
{job.links.apply && (
  <a href={job.links.apply}>Apply Online</a>
)}

{job.links.notification && (
  <a href={job.links.notification}>Download Notification</a>
)}

{job.links.official && (
  <a href={job.links.official}>Official Website</a>
)}

{job.links.admitCard && (
  <a href={job.links.admitCard}>Download Admit Card</a>
)}

          </div>
        </Section>

        <p className="text-xs text-gray-400 text-center mt-5">
          Disclaimer: JK Career Updates is not affiliated with any government organization. Always verify details from the official website.
        </p>
      </div>
    </article>
  );
}

/* ---------------- Helper Components ---------------- */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
      <h2 className="text-lg font-bold border-b pb-2 mb-4">{title}</h2>
      {children}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-4 text-center shadow-lg hover:shadow-xl transition-all duration-300">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-semibold text-sm mt-1">{value}</p>
    </div>
  );
}

function KeyValue({ items }: { items: [string, string][] }) {
  return (
    <ul className="bg-white border border-gray-200 rounded-3xl shadow-lg p-4 space-y-2 hover:shadow-xl transition-all duration-300">
      {items.map(([k, v], i) => (
        <li key={i} className="flex justify-between py-1">
          <span className="font-medium">{k}</span>
          <span>{v}</span>
        </li>
      ))}
    </ul>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-4 text-center shadow-lg hover:shadow-xl transition-all duration-300">
      <p className="text-gray-500 text-xs">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}
