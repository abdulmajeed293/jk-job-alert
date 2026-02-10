"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top strip */}
      <div className="h-1 w-full bg-blue-600"></div>

      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-black text-blue-600">
          JK Career Updates
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-3 text-sm font-semibold">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-4 py-2 rounded-full transition
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow"
                      : "text-gray-800 hover:bg-blue-50 hover:text-blue-600"
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden rounded-lg border px-3 py-2"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <nav className="flex flex-col px-4 py-4 space-y-2 text-sm font-semibold">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-2 rounded-lg transition
                    ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "hover:bg-blue-50 hover:text-blue-600"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
