"use client";

export default function JobFilterSidebar() {
  return (
    <aside className="bg-white border border-gray-200 rounded-2xl shadow-md p-5 space-y-5 sticky top-24">
      
      {/* Header */}
      <h3 className="font-bold text-lg text-gray-900 border-b pb-3">
        🔍 Filter Jobs
      </h3>

      {/* Job Type */}
      {/*<div>
        <p className="font-semibold text-sm mb-3 text-gray-700">
          Job Type
        </p>
        <div className="space-y-2 text-sm text-gray-700">
          <label className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
            <input type="checkbox" className="accent-blue-600" />
            Government
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
            <input type="checkbox" className="accent-blue-600" />
            Private
          </label>
        </div>
      </div>*/}

      {/* Location */}
      <div>
        <p className="font-semibold text-sm mb-2 text-gray-700">
          Location
        </p>
        <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
          <option>All</option>
          <option>Jammu</option>
          <option>Srinagar</option>
        </select>
      </div>

      {/* Department */}
      <div>
        <p className="font-semibold text-sm mb-2 text-gray-700">
          Department
        </p>
        <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          onChange={(e) => {
    const url = new URL(window.location.href);
    if (e.target.value === "All") {
      url.searchParams.delete("company");
    } else {
      url.searchParams.set("company", e.target.value);
    }
    window.history.replaceState({}, "", url.toString());
    window.dispatchEvent(new Event("filters-change"));
  }}>
            <option>All</option>
  <option value="JKSSB">JKSSB</option>
  <option value="JKPSC">JKPSC</option>
  <option value="Police">Police</option>
  <option value="Revenue Dept">Revenue Dept</option>
  <option value="Forest">Forest</option>
        </select>
      </div>

      {/* Button */}
      <button className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2.5 rounded-lg font-semibold shadow-sm">
        Apply Filters
      </button>
    </aside>
  );
}
