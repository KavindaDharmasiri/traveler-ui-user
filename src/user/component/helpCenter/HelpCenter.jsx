import React from 'react'
import { useState } from 'react';

export default function HelpCenter() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How do I cancel my booking?",
      answer: "You can cancel your booking directly from your account dashboard. Go to 'My Rentals', select the booking you wish to cancel, and click 'Cancel Booking'. Please review our cancellation policy as fees may apply depending on how close to the rental date you cancel."
    },
    {
      question: "What happens if the gear is damaged?",
      answer: "We offer rental insurance options. If damage occurs, please report it immediately through the app with photos of the equipment."
    },
    {
      question: "When will I receive my security deposit back?",
      answer: "Security deposits are typically released within 3-5 business days after the gear has been returned and inspected."
    },
    {
      question: "Can I extend my rental period?",
      answer: "Yes, extensions are possible if the item is not booked by another user. You can request an extension through the 'Active Rentals' tab."
    }
  ];

  return (
    <main className="bg-[#F9F8F3] min-h-screen py-12 md:py-20 px-4 sm:px-6">
      {/* Header Section */}
      <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
        <p className="text-sm md:text-base text-gray-600 px-4">
          Find answers to common questions about your rental experience.
        </p>
      </div>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto mb-16 md:mb-24">
        <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-6 md:mb-8 text-center md:text-left px-2">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3 md:space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl md:rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <button 
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full px-5 md:px-8 py-5 md:py-6 flex justify-between items-center text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 text-sm md:text-base pr-4">
                  {faq.question}
                </span>
                <span className={`transform transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}>
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              {openIndex === index && (
                <div className="px-5 md:px-8 pb-5 md:pb-6 text-gray-600 text-xs md:text-sm leading-relaxed border-t border-gray-50 pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-8 md:mt-10">
          <button className="text-emerald-700 font-semibold text-sm flex items-center justify-center gap-2 mx-auto hover:underline">
            View all FAQs <span>→</span>
          </button>
        </div>
      </section>

      {/* Still Need Help Section */}
      <section className="max-w-6xl mx-auto bg-[#EDF1EB] rounded-[30px] md:rounded-[40px] p-6 md:p-12 lg:p-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Still need help?</h2>
        <p className="text-gray-600 text-sm md:text-base max-w-lg mx-auto mb-8 md:mb-12">
          Our support team is available 24/7 to assist you with any questions or issues.
        </p>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Live Chat */}
          <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl flex flex-col items-center shadow-sm">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" /></svg>
            </div>
            <h3 className="font-bold text-gray-900 text-base md:text-lg mb-2">Live Chat</h3>
            <p className="text-gray-500 text-[10px] md:text-xs mb-6">Get instant answers from our agents.</p>
            <button className="text-emerald-700 font-bold text-sm hover:opacity-80 transition-opacity">Start Chat</button>
          </div>

          {/* Email Support */}
          <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl flex flex-col items-center shadow-sm">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
            </div>
            <h3 className="font-bold text-gray-900 text-base md:text-lg mb-2">Email Support</h3>
            <p className="text-gray-500 text-[10px] md:text-xs mb-6">We typically reply within 24 hours.</p>
            <button className="text-emerald-700 font-bold text-sm hover:opacity-80 transition-opacity">Send Email</button>
          </div>

          {/* Help Center Guides - Hidden on small mobile to keep grid clean, or shown at bottom */}
          <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl flex flex-col items-center shadow-sm sm:col-span-2 lg:col-span-1">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-50 text-orange-500 rounded-lg flex items-center justify-center mb-4 text-lg md:text-xl font-bold">?</div>
            <h3 className="font-bold text-gray-900 text-base md:text-lg mb-2">Help Center</h3>
            <p className="text-gray-500 text-[10px] md:text-xs mb-6">Browse detailed guides and tutorials.</p>
            <button className="text-emerald-700 font-bold text-sm hover:opacity-80 transition-opacity">Visit Guides</button>
          </div>
        </div>
      </section>
    </main>
  )
}

