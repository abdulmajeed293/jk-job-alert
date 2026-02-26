"use client";

import React from "react";

export default function PremiumLoader() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* ================= HERO CARD ================= */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {/* Title */}
          <div className="h-8 shimmer w-3/4 mb-4"></div>

          {/* Subtitle */}
          <div className="h-4 shimmer w-1/3 mb-6"></div>

          {/* Badges */}
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="h-6 w-20 shimmer rounded-full"></div>
            <div className="h-6 w-24 shimmer rounded-full"></div>
            <div className="h-6 w-28 shimmer rounded-full"></div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="h-12 shimmer rounded-lg flex-1"></div>
            <div className="h-12 shimmer rounded-lg flex-1"></div>
          </div>
        </div>

        {/* ================= QUICK INFO GRID ================= */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 mt-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
            >
              <div className="h-3 shimmer mb-3 w-1/2 mx-auto"></div>
              <div className="h-5 shimmer w-3/4 mx-auto"></div>
            </div>
          ))}
        </div>

        {/* ================= CONTENT BLOCKS ================= */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-8"
          >
            {/* Section title */}
            <div className="h-5 shimmer w-48 mb-5"></div>

            {/* Paragraph lines */}
            <div className="space-y-3">
              <div className="h-4 shimmer w-full"></div>
              <div className="h-4 shimmer w-full"></div>
              <div className="h-4 shimmer w-5/6"></div>
              <div className="h-4 shimmer w-4/6"></div>
            </div>
          </div>
        ))}

        {/* ================= EXTRA CARDS (REALISTIC LIST) ================= */}
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
            >
              <div className="h-6 shimmer w-2/3 mb-4"></div>

              <div className="space-y-3 mb-4">
                <div className="h-4 shimmer"></div>
                <div className="h-4 shimmer w-5/6"></div>
              </div>

              <div className="flex gap-3">
                <div className="h-10 shimmer w-24 rounded-lg"></div>
                <div className="h-10 shimmer w-24 rounded-lg"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
