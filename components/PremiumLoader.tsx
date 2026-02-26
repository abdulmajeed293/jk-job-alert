"use client";

import React from "react";

export default function PremiumLoader() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-10 animate-pulse">
        {/* HERO CARD SKELETON */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          {/* Title */}
          <div className="h-8 bg-gray-200 rounded-lg w-3/4 mb-4"></div>

          {/* subtitle */}
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-6"></div>

          {/* badges */}
          <div className="flex gap-3 mb-6">
            <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
            <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
            <div className="h-6 w-28 bg-gray-200 rounded-full"></div>
          </div>

          {/* buttons */}
          <div className="flex gap-4">
            <div className="h-12 bg-gray-200 rounded-xl flex-1"></div>
            <div className="h-12 bg-gray-200 rounded-xl flex-1"></div>
          </div>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 mt-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow-lg"
            >
              <div className="h-3 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
            </div>
          ))}
        </div>

        {/* CONTENT SECTIONS */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mt-8"
          >
            <div className="h-5 bg-gray-200 rounded w-48 mb-4"></div>

            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
