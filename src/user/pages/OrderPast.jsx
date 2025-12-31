import React, { useState } from "react";

import Breadcrumbs from "../component/order/Breadcrumbs";
import PageTitle from "../component/order/PageTitle";
import SectionTabs from "../component/order/SectionTabs";
import OngoingSection from "../component/order/OngoingSection";
import PastSection from "../component/order/PastSection";

export default function OrderPast() {
  const [activeTab, setActiveTab] = useState("ongoing"); // ongoing | past

  return (
    <div className="bg-background-light dark:bg-background-dark text-[#181811] dark:text-white font-display min-h-screen">
      <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-8">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <Breadcrumbs />
          <PageTitle />

          {/* Tabs */}
          <SectionTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Fixed height area for independent scrolling */}
          <div className="h-[calc(100vh-260px)]">
            {/* Ongoing scroll container */}
            <div
              className={`h-full overflow-y-auto pr-2 ${
                activeTab === "ongoing" ? "block" : "hidden"
              }`}
            >
              <OngoingSection />
            </div>

            {/* Past scroll container */}
            <div
              className={`h-full overflow-y-auto pr-2 ${
                activeTab === "past" ? "block" : "hidden"
              }`}
            >
              <PastSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
