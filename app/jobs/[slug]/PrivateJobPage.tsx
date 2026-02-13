"use client";

import React from "react";

interface Job {
  id: number;
  slug: string;
  title: string;
  introduction: string;
  department?: string;
  company?: string;
  location?: string;
  type: "Government" | "Private";
  applyMode?: string;
  totalPosts?: number;

  /* Vacancy */
  om?: string;
  obc?: string;
  sc?: string;
  st1?: string;
  st2?: string;
  alc?: string;
  rba?: string;
  ews?: string;
  other?: string;

  status?: "active" | "expired";

  /* Age limit */
  omal?: string;
  scal?: string;
  st1al?: string;
  st2al?: string;
  rbaal?: string;
  alcibal?: string;
  ewsal?: string;
  obcal?: string;
  pcpal?: string;
  otheral?: string;

  totalMarks?: string;

  /* Private Job Extra */
  description?: string;
  companyAbout?: string;

  links?: {
    apply?: string;
    notification?: string;
    official?: string;
    admitCard?: string;
  };

  application?: {
    fee?: string;
    selection?: string;
    salary?: string;
  };

  dates?: {
    notification?: string;
    start?: string;
    last?: string;
    exam?: string;
  };

  eligibility?: {
    qualification?: string;
    ageLimit?: string;
    ageRelaxation?: string;
  };

  vacancy?: { category: string; posts: number }[];

  exam?: {
    syllabus?: string[];
    pattern?: { subject: string; marks: string }[];
  };

  syllabus_link?: string;
}

export default function PrivateJobPage({ job }: { job: Job }) {
  return (
    <article className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h1 className="text-2xl font-bold">{job.title}</h1>
          <p className="text-gray-600 mt-1">
            {job.company} • {job.location}
          </p>

          <div className="flex flex-wrap gap-2 mt-3 text-sm">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
              Private Job
            </span>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
              {job.applyMode}
            </span>
            {job.application?.salary && (
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                {job.application.salary}
              </span>
            )}
          </div>

          {job.links?.apply && (
            <a
              href={job.links.apply}
              target="_blank"
              className="block mt-5 text-center bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700"
            >
              Apply Now
            </a>
          )}
        </div>
        {/* INTRODUCTION */}
        {job.introduction && (
          <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-bold mb-4">{job.title} Overview</h2>

            <div
              className="prose max-w-none text-gray-800"
              dangerouslySetInnerHTML={{ __html: job.introduction }}
            />
          </div>
        )}

        {/* Job Description */}
        {job.description && (
          <Section title="Job Description">
            <p className="text-gray-700 whitespace-pre-line">
              {job.description}
            </p>
          </Section>
        )}

        {/* Requirements */}
        {job.eligibility?.qualification && (
          <Section title="Requirements">
            <p>{job.eligibility.qualification}</p>
          </Section>
        )}

        {/* Salary & Benefits */}
        {(job.application?.salary || job.application?.selection) && (
          <Section title="Salary & Benefits">
            {job.application.salary && (
              <p>
                <b>Salary:</b> {job.application.salary}
              </p>
            )}
            {job.application.selection && (
              <p>
                <b>Hiring Process:</b> {job.application.selection}
              </p>
            )}
          </Section>
        )}

        {/* Company Info */}
        {job.companyAbout && (
          <Section title="About Company">
            <p className="text-gray-700">{job.companyAbout}</p>
          </Section>
        )}

        {/* Important Links */}
        <Section title="Apply">
          {job.links?.apply && (
            <a
              href={job.links.apply}
              target="_blank"
              className="text-blue-600 font-semibold"
            >
              Apply on Company Website →
            </a>
          )}
        </Section>

        <p className="text-xs text-gray-400 text-center">
          JK Career Updates is not responsible for private recruiter hiring
          decisions.
        </p>
      </div>
    </article>
  );
}

/* Reusable section */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow">
      <h2 className="font-semibold text-lg border-b pb-2 mb-3">{title}</h2>
      {children}
    </div>
  );
}
