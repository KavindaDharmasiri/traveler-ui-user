import React from 'react';
import { X, Shield, FileText, Users, Lock, Eye, AlertCircle, Phone, Mail, MessageCircle, CheckCircle, CreditCard, Ban, Clock, Backpack, BriefcaseBusiness, BadgeAlert, BoxIcon, File, Redo, Scale } from 'lucide-react';

export default function UserAgreementModal({ isOpen, onAgree, onDecline }) {
  if (!isOpen) return null;

  const sections = [
    { 
      id: 1, 
      title: "Eligibility", 
      icon: Users, 
      content: "To use the Services, you must be at least 16 years old and capable of forming a binding contract. By registering, you represent and warrant that you meet these requirements. You must have a valid government-issued identification, must not have been previously suspended or removed from the Travler platform, and must maintain a valid payment method on file." 
    },
    { 
      id: 2, 
      title: "Account Registration", 
      icon: FileText, 
      content: "To access certain features of the Platform, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for safeguarding your password. You agree that you will not disclose your password to any third party and that you will take sole responsibility for any activities or actions under your account, whether or not you have authorized such activities or actions.Travler reserves the right to suspend or terminate accounts that provide false information or violate this agreement"},
    { 
      id: 3, 
      title: "Rental Terms", 
      icon: Shield, 
      content: "Users may borrow items ('Rentals') from other Users ('Owners'). The rental period begins at the time of pickup and ends at the time of return as agreed upon in the booking. Renters must return the item in the same condition as they received it, normal wear and tear accepted. Renters returning items late may be subject to additional fees to cover the delayed return." 
    },
    { 
      id: 4, 
      title: "Platform Role & Disclaimer", 
      icon: Clock, 
      content: "Travler is a technology platform only. We do not own, store, inspect, insure, or transport listed items.Travler is not responsible for: Item condition, quality, safety, legality, or suitability, User behavior, actions, or omissions." 
    },
    { 
      id: 5, 
      title: "Fees and Payments", 
      icon: CreditCard, 
      content: "Travler charges a service fee for facilitating the rental. This fee is calculated as a percentage of the total rental cost and is displayed at checkout. Owners receive payment within 48 hours of a successfully completed rental period. Payments are processed via our third-party payment processor, Stripe. Payments are required to confirm bookings. Travler does not store payment card details. Traveler is not responsible for: Payment processor errors, Bank delays or failures." 
    },
    { 
      id: 6, 
      title: "Renting & Booking Flow", 
      icon: Backpack, 
      content: "A booking is only confirmed after: Provider approval, and successful completion of the required initial payment. Adding items to the Backpack does not guarantee availability." 
    },
    { 
      id: 7, 
      title: "Cancellations,Damages and Disputes", 
      icon: Eye, 
      content: "Tavler shall not be liable for indirect, incidental, or consequential damages. Travler’s total liability shall not exceed the amount paid by you (if any) in the last transaction. Cancellation and refund terms may vary by Provider. Travler is not obligated to issue refunds. Disputes must be resolved directly between Users and Providers. Travler may, at its sole discretion, assist in dispute resolution but is not required to do so." 
    },
    { 
      id: 8, 
      title: "Prohibited Items", 
      icon: Ban, 
      content: "The following items are strictly prohibited from being listed or rented on Travler: Weapons, firearms, and ammunition; Illegal drugs and drug paraphernalia; Hazardous materials or chemicals; Adult-themed products." 
    },
    { 
      id: 9, 
      title: "Prohibited Activities", 
      icon: BadgeAlert, 
      content: "You agree not to: Violate any laws or regulations, Post false, misleading, or fraudulent listings, Abuse, harass, or threaten other Users, Attempt to bypass payments or platform rules, Use Travler for illegal or unsafe activities. Violation may result in immediate suspension,termination or legal actions." 
    },
    { 
      id: 10, 
      title: "Liability Disclaimer", 
      icon: Lock, 
      content: "THE SERVICES ARE PROVIDED 'AS IS' AND 'AS AVAILABLE'. TRAVLER DISCLAIMS ALL REPRESENTATIONS AND WARRANTIES, EXPRESS, IMPLIED, OR STATUTORY, NOT EXPRESSLY SET OUT IN THESE TERMS." 
    },
    { 
      id: 11, 
      title: "Provider Responsibilities", 
      icon: BriefcaseBusiness, 
      content: "Providers agree that: They own or have legal rights to rent the listed items, Items are safe, functional, and accurately described, Listings do not violate any laws or third-party rights, They will honor confirmed bookings. Travler does not verify item ownership or condition and disclaims all liability related to listed items." 
    },
    { 
      id: 12, 
      title: "Pickup, Use & Return of Items", 
      icon: BoxIcon, 
      content: "Users are responsible for inspecting items at pickup. Travler is not responsible for damage, loss, theft, or misuse of items. Renters assume full responsibility once an item is picked up. Any injury, damage, or loss arising from item use is the sole responsibility of the Users involved." 
    },
    { 
      id: 13, 
      title: "Termination", 
      icon: X, 
      content: "We may terminate or suspend your account and/or access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms." 
    },
    { 
      id: 14, 
      title: "Intellectual Property", 
      icon: File, 
      content: "All platform content, branding, and design belong to Travler. You may not copy, distribute, or reuse any content without permission. User-posted content remains owned by Users but grants Traveler a non-exclusive right to display it." 
    },
    { 
      id: 15, 
      title: "Modifications to Agreement", 
      icon: Redo, 
      content: "Travler may update this Agreement at any time. Continued use after changes means acceptance. The latest version will always be available on the platform." 
    },
    { 
      id: 16, 
      title: "Governing Law & Legal Compliance", 
      icon: Scale, 
      content: "This Agreement shall be governed by and interpreted in accordance with the laws of Sri Lanka, without regard to conflict of law principles. Travler complies with all applicable laws of Sri Lanka. If required by lawful request, court order, regulation, or authority under the laws of Sri Lanka, Travler reserves the right to provide necessary user information to Sri Lankan legal or law enforcement authorities without prior notice or consent of the User. Such information will be disclosed only to authorities of Sri Lanka. No user data will be shared with third parties outside this legal requirement. Disclosure will be limited to what is legally required." 
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">User Agreement</h2>
          <p className="text-gray-600 text-sm">Please review and accept our terms to continue</p>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="text-sm text-gray-700 leading-relaxed space-y-4">
            <p className="text-base font-medium">Welcome to Traveler. This document outlines the rules, regulations, and responsibilities for using our peer-to-peer rental marketplace.</p>
            
            <p>This User Agreement ("Agreement") is a contract between you ("you" or "User") and Traveler Inc. ("Traveler", "we", or "us"). You must read, agree with, and accept all of the terms and conditions contained in this Agreement to be a User of our website located at www.traveler.com and all affiliated websites and applications (collectively, the "Site" or "Services").</p>
            
            <p className="font-medium">By accessing or using the Site, you agree to comply with and be bound by these Terms. If you do not agree to these Terms, you have no right to obtain information from or otherwise continue using the Site.</p>
          </div>

          {/* Sections */}
          <div className="space-y-4">
            {sections.map((section) => {
              const IconComponent = section.icon;
              return (
                <div key={section.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-7 h-7 bg-[#217964] text-white text-sm font-bold rounded-full">
                        {section.id}
                      </span>
                      <h3 className="font-bold text-gray-900 text-lg">{section.title}</h3>
                    </div>
                    <IconComponent size={20} className="text-[#217964]" />
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed ml-10">{section.content}</p>
                </div>
              );
            })}
          </div>

          {/* Contact Section */}
          <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg">
              <Phone size={20} className="text-[#217964]" />
              Contact Us
            </h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-3">
                <Mail size={16} />
                <a href="mailto:legal@traveler.com" className="text-[#217964] hover:underline font-medium">
                  legal@traveler.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle size={16} />
                <button className="text-[#217964] hover:underline font-medium">
                  Live Chat Support
                </button>
              </div>
            </div>
          </div>

          <div className="text-center text-gray-600 text-sm space-y-2 py-4">
            <p className="font-bold text-lg text-gray-800">Ready to explore?</p>
            <p>By continuing to use Traveler, you acknowledge that you have read and understood this agreement.</p>
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="border-t border-gray-200 p-6 bg-white rounded-b-xl">
          <div className="flex gap-4 justify-center">
            <button
              onClick={onDecline}
              className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Decline
            </button>
            <button
              onClick={onAgree}
              className="px-8 py-3 bg-[#217964] text-white rounded-lg hover:bg-[#1a5f4e] transition-colors font-medium"
            >
              I Agree
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}