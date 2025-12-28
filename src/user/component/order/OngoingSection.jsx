import React from 'react'
import OngoingBadge from './OngoingBadge';
import OngoingRentalCard from './OngoingRentalCard';

export default function OngoingSection() {
  const rentals = [
    {
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAnUjuM7lvZlTc1EM64onf5b6dTlUesOzBVEBcIdnFGbZI09oCs0e2vPB87M5M4qA6DRv1nzC4OjwkS4g_XfVXBasbUsLZkIY8VoWwIZSUxX_zvvUSbghS6opTw8xgGX88SP-hPWevAf_yykxkU0dMa55Q_wowWo1Lqb2b3GVUfa8KSimhZzkAjT_PaoQLSWqIBcpcnJtZatUEa1yq5LVhsia0X_aeGkt9LTXiCVhpCTApAA-mTo1aBXLiu4ErkDwxLVVY5mBt9m636",
      imageAlt: "Close up of a professional hiking backpack in forest green",
      tagText: "Rental",
      brandIcon: "hiking",
      brandName: "Summit Gear Co.",
      title: "Osprey Atmos AG 65",
      orderInfo: "Order #TR-88219 • Placed on Oct 10, 2023",
      statusType: "picked",
      metaItems: [
        { label: "Start Date", icon: "calendar_today", iconColor: "text-primary", value: "Oct 12" },
        { label: "End Date", icon: "event", iconColor: "text-primary", value: "Oct 20" },
        { label: "Period", icon: "schedule", iconColor: "text-primary", value: "8 Days" },
        { label: "Total", icon: "payments", iconColor: "text-primary", value: "$45.00" },
      ],
    },
    {
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDfIMC-m2TrdqbJzseGLLAU1P_NFxYWsEyFDdJ3oY9P_0tJaHV3RMvBEEFvsGKytBXCG2fn0G2AZ1WnGi-EZXK5Myfnbdf6a7k9NVrRnciJQ4UJhjrLqhc7vzdyOmx5V6VjookhFwgnfHREvcCgtpOUrYfSpAIXvhCxjQMSLivsxqisIhQ8RrCvLNSxGB37WeFAKAbUz9hcLgtUWrGGp_m04dNB9hUq6njjJWd7L2CRpp5XC0F4xoovHrZXcEuup9kFMDeO_qJmN5q2",
      imageAlt: "GoPro Hero 10 camera mounted on a helmet",
      tagText: "",
      brandIcon: "photo_camera",
      brandName: "TechRentals",
      title: "GoPro Hero 10 Black",
      orderInfo: "Order #TR-88225 • Placed on Oct 14, 2023",
      statusType: "confirmed",
      metaItems: [
        { label: "Start Date", icon: "calendar_today", iconColor: "text-gray-400", value: "Oct 18" },
        { label: "End Date", icon: "event", iconColor: "text-gray-400", value: "Oct 25" },
        { label: "Period", icon: "schedule", iconColor: "text-gray-400", value: "7 Days" },
        { label: "Total", icon: "payments", iconColor: "text-gray-400", value: "$65.00" },
      ],
    },
  ];

  return (
    <div className="mb-12" id="ongoing">
      <h2 className="text-[#181811] dark:text-white tracking-tight text-2xl font-bold leading-tight px-4 pb-6 pt-2 flex items-center gap-2">
        Ongoing Rentals <OngoingBadge />
      </h2>

      <div className="flex flex-col gap-4 px-4">
        {rentals.map((r) => (
          <OngoingRentalCard key={r.title} {...r} />
        ))}
      </div>
    </div>
  );
}
