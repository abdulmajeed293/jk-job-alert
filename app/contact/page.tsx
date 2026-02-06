export const metadata = {
  title: "Contact Us – JK Career Updates",
  description:
    "Contact JK Career Updates for job related queries, corrections, or feedback. We help job seekers in Jammu & Kashmir with reliable job updates.",
};

export default function ContactPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      <p className="text-gray-700 mb-6 leading-relaxed">
        Thank you for visiting JK Career Updates (www.jkcareerupdates.in). We are
        always happy to hear from our visitors. If you have any questions,
        suggestions, corrections, or job-related queries, please feel free to
        contact us. Your feedback helps us improve the quality and accuracy of
        the information we provide.
      </p>

      <p className="text-gray-700 mb-6 leading-relaxed">
        We try our best to respond to all emails within a reasonable time. If you
        find any incorrect or outdated information related to job notifications,
        exam dates, results, or application links, please inform us so we can
        review and update it as soon as possible.
      </p>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-4">
        <p className="text-gray-700">
          <strong>Email:</strong> contact@jkcareerupdates.in
        </p>

        <p className="text-gray-700">
          <strong>Website:</strong> www.jkcareerupdates.in
        </p>

        <p className="text-gray-700 leading-relaxed">
          JK Career Updates is an independent job information portal focused on
          government and private job opportunities in Jammu & Kashmir. We do not
          provide recruitment services, job placements, or application
          processing. We only publish job-related information collected from
          official sources for the benefit of job seekers.
        </p>
      </div>

      <p className="mt-6 text-gray-700 leading-relaxed">
        If you are a government department, private organization, or employer
        and wish to report incorrect information or request content updates,
        please contact us through the email provided above.
      </p>

      <p className="mt-6 text-sm text-gray-500">
        Disclaimer: JK Career Updates is not affiliated with any government
        organization or recruitment board. We only provide informational
        content based on publicly available sources.
      </p>
    </section>
  );
}
