import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        {/* Brand */}
        <div>
          <h3 className="text-lg font-bold text-white mb-3">
            JK Career Updates
          </h3>
          <p className="text-gray-400">
            JK Career Updates is a trusted job information portal that provides
            the latest Government and Private job notifications, exam syllabus,
            admit cards, and results for Jammu & Kashmir. We aim to help job
            seekers stay updated with verified recruitment news, application
            deadlines, and career opportunities.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/govt-jobs" className="hover:text-white">
                Govt Jobs
              </Link>
            </li>
            <li>
              <Link href="/private-jobs" className="hover:text-white">
                Private Jobs
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Important Pages */}
        <div>
          <h4 className="font-semibold text-white mb-3">Important</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/disclaimer" className="hover:text-white">
                Disclaimer
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-white mb-3">Contact</h4>
          <p>Email: jkcareerupdates@gmail.com</p>
          <p className="mt-2">Serving Jammu & Kashmir</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4 text-xs text-gray-400 flex flex-col md:flex-row justify-between">
          <p>
            © {new Date().getFullYear()} JK Career Updates. All Rights Reserved.
          </p>
          <p className="mt-2 md:mt-0">
            Disclaimer: JK Career Updates is not affiliated with any government
            organization. Information is collected from official sources.
          </p>
        </div>
      </div>
    </footer>
  );
}
