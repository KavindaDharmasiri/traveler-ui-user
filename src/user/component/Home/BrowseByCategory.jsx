import React from 'react'
import CategoryCard from './CategoryCard';
import Icon from './Icon';

export default function BrowseByCategory() {
  const imgs = {
    camping:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCmi0_InCT9NiPIxMG5jK2gvZnRtiEjuBQmQol_ZZtrrM5c5XBkz_rE-HqPPZ25wECrQszuAtXBmq5WjJKle6NKUY11S5B_B6lgdYDEeKdguwpS14ju6D2o2qfJsgoUwkLejvvdz8Mzszxl0Ccy5orw695BUABo0e7px9hO0v4BV7c6pXmUIOkg3fndKSETnka8OIrfTq4ojA6WthEzMyyPd3XH8nkEqJwyFIJp-APG5nX0z2Mmc26_Gxlm3wpwq5YepwN8FBRefIfU",
    photo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCdtPY1F2g5oRC4MbpTj7jqnKF36tLgSVNAq8Txrn6E2gswVcSzBnt6GPEXoV0QXad1oE9N5_sQJoivsEilXsk93xHcX1XvqRyUF7QOB1URvANs9NkoDm_4NLo-DWe6mUmIg41Thk3CAubpGaEC5RVCPYuKTBxPY2K7F1MAU7oXKsM8KOEwDB1dAT6PXzZkNLlzurz3PWbo0CQTgsoQSZOUBje6PetVKrx5dnkzZBOG0R4L6Yg0LnVx14rKM3d9bs8V5L3ssdHwhSwc",
    winter:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC-vwF-EdmVn6_5FF6_8QFynZde7MjsJBmLUDSi-69fTD4jh2PHv2Y8bedrCsKUqp-JnX51NUttkcxArZXuFWDWqlYhtdsLhjYxdv80u3cWcoL5eWuQprwwB9gDNTg8l3myzqAbcJPnTUjxCgxogNLWdtwPHQ4754izXiiAGwWx21MiG-E5Ug5imctOKJCfknqyGBdeDT5VzZ_Y2ugeGSPcUep3VL0yxJNKg74PX1YnSXmHc-8bCtucuchiIrtqs1YRWE4faQ5KhENm",
    luggage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDzTM5M7Ybi1TYUaTm-BRRD9ahsj4vlOLsGwy3dIfHOH321r9jib3L56bcilOrWbGcLUEzSi_z3rS2qTsOOO2IKMLNBYrbCd_OsYFP-7bK4RAGzCSYTRhGESyIKn5Z7xjvrKY_HPdyv5lJ8bGpwWqSO6kluMtP3GzGxhemhQoyCKFKMPevOgBhLPE6hOjgu6p1Lu1ENSbJ2IKVOi20E9lI0ekZ64xXBoJELazserqSC0Kh8CKyqPzVy1UiJRzKF_WXb454dpxJI3zux",
    hiking:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCq-ngWT-J9axVBMwKCDGnv2AAEu12kbX7PvmWcc9OD1cYc_ObUR3w-q_nsMtARSzBSYTT7Uu76CO3sw4gDumMbLh96YqZD_OQ_ULdgNlog8cwK3IXiRTKwW20WGqs9yoBRpqNAZdgX031ZsSPJeN80lbkDVPEqUyH0aXA_YAGmr3TS3wRPq-yzaxfc280EPC_VTvN_HINKNJYuJNJqt3FmwaQDug6isby72FekfZNUpzm-qycoJPTgU-WlY3YmxPfI2QUZYohos3qC",
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-[#121716]">Browse by Category</h2>
        <a className="text-[#217864] font-bold text-sm flex items-center hover:underline" href="#">
          View all <Icon name="arrow_forward" className="text-sm ml-1" />
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-4 h-[500px] md:h-[600px]">
        <CategoryCard
          title="Camping Gear"
          subtitle="Most Popular"
          image={imgs.camping}
          className="col-span-2 row-span-2"
        />
        <CategoryCard title="Photography" image={imgs.photo} className="col-span-1 row-span-1" gradient="from-black/60 to-transparent" />
        <CategoryCard title="Winter Sports" image={imgs.winter} className="col-span-1 row-span-1" gradient="from-black/60 to-transparent" />
        <CategoryCard title="Luggage" image={imgs.luggage} className="col-span-1 row-span-1" gradient="from-black/60 to-transparent" />
        <CategoryCard title="Hiking" image={imgs.hiking} className="col-span-1 row-span-1" gradient="from-black/60 to-transparent" />
      </div>
    </section>
  )
}
