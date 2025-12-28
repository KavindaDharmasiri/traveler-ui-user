import React from 'react'

import Breadcrumbs from '../component/order/Breadcrumbs';
import PageTitle from '../component/order/PageTitle';
import SectionTabs from '../component/order/SectionTabs';
import OngoingSection from '../component/order/OngoingSection';
import PastSection from '../component/order/PastSection';

export default function OrderPast() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-[#181811] dark:text-white font-display">
      
          <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-8">
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
              <Breadcrumbs />
              <PageTitle />
              <SectionTabs />
              <OngoingSection/>
              <PastSection />
            </div>
          </div>
        </div>
      
  );
}
