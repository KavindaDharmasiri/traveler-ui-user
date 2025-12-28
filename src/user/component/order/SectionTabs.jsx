import React, { useEffect, useState } from "react";

export default function SectionTabs() {
  // default active tab
  const [activeTab, setActiveTab] = useState("ongoing");

  // optional: keep active tab in sync when user scrolls to sections
  useEffect(() => {
    const ids = ["ongoing", "past"];

    const observer = new IntersectionObserver(
      (entries) => {
        // pick the most visible intersecting section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) setActiveTab(visible.target.id);
      },
      { threshold: [0.4, 0.6, 0.8] }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (tabId) => (e) => {
    e.preventDefault();
    setActiveTab(tabId);

    document.getElementById(tabId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    // optional: update url hash
    window.history.replaceState(null, "", `#${tabId}`);
  };

  const base =
    "flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 cursor-pointer group transition-all duration-300 ease-in-out";

  const active =
    "border-b-[#217964] text-[#181811] dark:text-white";

  const inactive =
    "border-b-transparent text-[#8c8b5f] hover:text-[#181811] dark:hover:text-white";

  return (
    <div className="pb-6 sticky top-[73px] z-40 bg-[#f8f8f5] dark:bg-background-dark pt-2">
      <div className="flex border-b border-[#e6e6db] dark:border-[#38382f] px-4 gap-8">
        <a
          href="#ongoing"
          onClick={handleClick("ongoing")}
          className={`${base} ${activeTab === "ongoing" ? active : inactive}`}
        >
          <p
            className={`text-sm font-bold leading-normal tracking-[0.015em] transition-colors ${
              activeTab === "ongoing"
                ? "text-[#181811] dark:text-white group-hover:text-[#217964]/80"
                : "text-[#8c8b5f] group-hover:text-[#217964]/80"
            }`}
          >
            Ongoing Orders
          </p>
        </a>

        <a
          href="#past"
          onClick={handleClick("past")}
          className={`${base} ${activeTab === "past" ? active : inactive}`}
        >
          <p
            className={`text-sm font-bold leading-normal tracking-[0.015em] transition-colors ${
              activeTab === "past"
                ? "text-[#181811] dark:text-white group-hover:text-[#217964]/80"
                : "text-[#8c8b5f] group-hover:text-[#217964]/80"
            }`}
          >
            Past Orders
          </p>
        </a>
      </div>
    </div>
  );
}
