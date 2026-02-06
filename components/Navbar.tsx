"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Govt Jobs", href: "/govt-jobs" },
  { name: "Private Jobs", href: "/private-jobs" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
  { name: "Disclaimer", href: "/disclaimer" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top blue strip */}
      <div className="h-1 w-full bg-blue-600"></div>

      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-black tracking-tight text-blue-600"
        >
          JK Career Updates
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-800">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative px-1 hover:text-blue-600 transition after:absolute after:left-0 after:-bottom-2 after:h-[3px] after:w-0 after:bg-blue-600 after:rounded-full after:transition-all hover:after:w-full"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden rounded-lg border border-gray-300 px-3 py-2 text-gray-800 hover:bg-gray-100 transition"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <nav className="flex flex-col px-4 py-4 space-y-2 text-sm font-semibold text-gray-800">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 hover:bg-blue-50 hover:text-blue-600 transition"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
