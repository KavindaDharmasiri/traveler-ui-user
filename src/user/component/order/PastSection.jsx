import React from 'react'
import PastRentalCard from './PastRentalCard';

export default function PastSection() {
  const past = [
    {
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC_DfL3uHClhPlzyz9rWeZ_rOInN1co-OlPfQXizM60ZoGTyDmN2T1US7j_ED_dGASLOS0w_xX60b-e0SL-2AuvqsqHbI0MOJsCNtN7lEWD78_Kx1765KfZb3lbLMxTmrjssUd27xpSlsYEAGQPm78deVkX0n89jr88qRYPWeQrOONGVanap925sRbA-RyX6fyBj9mPYCvqrslZngHLIWDkuZFyprLCxDvzWHmkUUUQi2F-t2YHLMmt8XrwSgEjRrnsdniF122wVXg9",
      imageAlt: "Two person camping tent set up in a forest",
      title: "Marmot Limestone 4P Tent",
      storeLine: "OutdoorLife • Sept 01 - Sept 05",
      price: "$80.00",
      status: "completed",
    },
    {
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBcYgvoch4at3o4sys-Q2KxJaVnlujfC8cD52a213AZqRj0vx9vkRZXdmn3zDCb6eTPOWEtNqTJ7vvks1BAnRDcWijdm5etOK6rmcClNEBVvS2BUTY3jZdrFs8mYcHyNXvxLzYkotyX2LSbxursZsp_TABjiClihYsb0z35Jt9k7YJCbz5CyYH_fCLMrij1FBMek4wY2BQe9ou_g7dsRsuYs8o5dUFYBM72_KmpurmN18EUIBzVzq3-n1fH0WW4miX7Ys9ZkU4kkajZ",
      imageAlt: "Canon DSLR camera with lens on a wooden table",
      title: "Canon EOS R5 Body",
      storeLine: "LensRentals • Aug 15 - Aug 18",
      price: "$120.00",
      status: "cancelled",
    },
  ];

  return (
    <div className="pb-12" id="past">
      <h2 className="text-[#181811] dark:text-white tracking-tight text-2xl font-bold leading-tight px-4 pb-6 pt-6 border-t border-[#e6e6db] dark:border-[#38382f]">
        Past Rentals
      </h2>

      <div className="flex flex-col gap-4 px-4">
        {past.map((p) => (
          <PastRentalCard key={p.title} {...p} />
        ))}
      </div>
    </div>
  );
}
