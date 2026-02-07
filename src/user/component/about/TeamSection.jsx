import React from 'react'

export default function TeamSection() {
  const team = [
    { name: "Sarah Jenkins", role: "Founder & CEO", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIJb-bnfai6eMQwrB-VkN_TXIE6Iguwh0Ea2v_JQjl4vz9YOQuHB9ojmiQMstdGWZyzvq1SyAhVdcPrc0ZvuA9llmg9DiPwIdYrx8eGB3M8kgAOx8MekQ6w0ncWxJB3vWfySeRV4jVHI_67bk20mqvhlOBn8AQnOTl1mldL-tLVP5fmdGtEOwqqAB1N9AcJplLeZncc-Ha_tiE70pG-3Z2d6ZsQWlZi2o9i_h_MNCFSyqqwosdn89MGyvRmeHGao8TahNO6c9h6kPJ" },
    { name: "David Chen", role: "Head of Product", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDH-m0wMU_o07vSBaU-M8460ptB4f_r9ZukRKGUOqGv9Br0EsV-HxVXIkUgQMt16zMVnDrtkWEVOu9iiuqeOG4H2gqJWsDe6-nWfXk6TMMQa3UAjdyt-euoLbkIMdaqJpTVQb_EQgGUm-SG6wWC3E_EiW4v6EE6XWXjV6-KUJcw9an81rPJveJ6xzjsLPsezcNnts5995xnxHD5e2f6cX5GaJGKI88ZE4sTESm_oHM3HLnsGmpVhuCPrcKS2A8R26QscNYdx553x4eg" },
    { name: "Maria Rodriguez", role: "Community Lead", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDab14wIVVN4DGbZqbKvrNLvRlhEi0twIxkj-g4HWT_zIhnVq7V0z-m2oty_QNknatAz2UL5kj3656-UrvC4qHM-09LT1BXAxRKOIQecDFOGjBw6Lj6JTfVtztbqFKNJGY2L0ESoX7ckjWgfZqICbEDTJuxepa3m7VDnHP9tJFzOJzVZOcG1oJfwrIZGvG97BSCdbm-LaD0IVqOcgft4J_CghI3aPVDBUI3owiR74xWK2bJn7a6m5B50FH8AnSVEI4lO0WtlVPOetwG" },
    { name: "Tom Baker", role: "Operations Manager", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTQTAk4QAHowB9az7umJdksFtIVN2JTtbtPBWQbaPEW7sVcHHzCdF_kxj2bEgIY5EQZjUDaoHFkkUuEA93i4h6LLFR9pfIIaon8TfRdXcY7H13UxFfvKpIhrXYCfsLetz-6PmF9xsh7JTy19474r8WDv0ltTQ-Ephipqx4DYeFYcq4l7I6T5JCReCXyDsjUw726VkeCkUsx-YzJIIjxW_-XZS09C2_154yjud0kZ6tqKwaCjmtJib4PKyrVbGyrl8vw67XWvf5_MV6" },
  ];

  return (
    <section className="py-20 px-8 bg-[#fbfaf9]">
      <div className="max-w-[960px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#121716] mb-4">The Explorers Behind the Screen</h2>
          <p className="text-[#68827c]">Meet the team dedicated to making your next journey possible.</p>
        </div>
        <div className="grid grid-cols-4 gap-x-8 gap-y-12">
          {team.map((member, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className="w-40 h-40 rounded-full overflow-hidden mb-5 border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300">
                <div 
                  className="w-full h-full bg-cover bg-center" 
                  style={{ backgroundImage: `url("${member.img}")` }}
                ></div>
              </div>
              <h3 className="text-lg font-bold text-[#121716]">{member.name}</h3>
              <p className="text-sm text-[#217864] font-medium mb-2">{member.role}</p>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <a className="text-gray-400 hover:text-[#217864]" href="#">
                  <span className="material-symbols-outlined text-lg">mail</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
