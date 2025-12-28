import React from "react";

export default function SectionTabs({ activeTab, setActiveTab }) {
  const base =
    "flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 cursor-pointer transition-all duration-300 ease-in-out";

  const active = "border-b-[#217964] text-[#181811] dark:text-white";
  const inactive =
    "border-b-transparent text-[#8c8b5f] hover:text-[#181811] dark:hover:text-white";

  return (
    <div className="pb-6 sticky top-[73px] z-40 bg-[#f8f8f5] dark:bg-background-dark pt-2">
      <div className="flex border-b border-[#e6e6db] dark:border-[#38382f] px-4 gap-8">
        <button
          type="button"
          onClick={() => setActiveTab("ongoing")}
          className={`${base} ${activeTab === "ongoing" ? active : inactive}`}
        >
          Ongoing Orders
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("past")}
          className={`${base} ${activeTab === "past" ? active : inactive}`}
        >
          Past Orders
        </button>
      </div>
    </div>
  );
}
