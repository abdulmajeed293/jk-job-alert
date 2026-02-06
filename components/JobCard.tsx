import { Job } from "@/types/job";
import Link from "next/link";

type Props = {
  job: Job;
  
};

export default function JobCard({ job }: Props) {
  return (
    <article
      className="group bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
      itemScope
      itemType="https://schema.org/JobPosting"
    >
      {/* Top */}
      <div>
        {/* Job Title */}
        <h3
          className="text-lg md:text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition line-clamp-2"
          itemProp="title"
        >
          {job.title}
        </h3>

        {/* Company */}
        <p
          className="text-sm text-gray-700 mt-1 font-medium truncate"
          itemProp="hiringOrganization"
        >
          {job.company}
        </p>

        {/* Meta Info */}
        <p className="text-xs text-gray-500 mt-3 flex flex-wrap items-center gap-3">
          <span itemProp="jobLocation" className="flex items-center gap-1">
            📍 {job.location}
          </span>
          <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
          <span itemProp="employmentType" className="flex items-center gap-1">
            💼 {job.type}
          </span>
        </p>

        {/* Soft Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent my-4"></div>
      </div>

      {/* CTA */}
      <Link
        href={`/jobs/${job.slug}`}
        className="mt-2 inline-flex items-center justify-between text-sm font-semibold text-blue-600 hover:text-blue-700"
        itemProp="url"
      >
        View Details
        <span className="ml-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
          →
        </span>
      </Link>
    </article>
  );
}
