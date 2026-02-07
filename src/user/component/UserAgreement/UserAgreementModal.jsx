import React from 'react';
import { X, Shield, FileText, Users, Lock, Eye, AlertCircle, Phone, Mail, MessageCircle, CheckCircle, CreditCard, Ban } from 'lucide-react';

export default function UserAgreementModal({ isOpen, onAgree, onDecline }) {
  if (!isOpen) return null;

  const sections = [
    { 
      id: 1, 
      title: "Eligibility", 
      icon: Users, 
      content: "To use the Services, you must be at least 18 years old and capable of forming a binding contract. By registering, you represent and warrant that you meet these requirements. You must have a valid government-issued identification, must not have been previously suspended or removed from the Traveler platform, and must maintain a valid payment method on file." 
    },
    { 
      id: 2, 
      title: "Account Registration", 
      icon: FileText, 
      content: "To access certain features of the Platform, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for safeguarding your password. You agree that you will not disclose your password to any third party and that you will take sole responsibility for any activities or actions under your account, whether or not you have authorized such activities or actions." 
    },
    { 
      id: 3, 
      title: "Rental Terms", 
      icon: Shield, 
      content: "Users may borrow items ('Rentals') from other Users ('Owners'). The rental period begins at the time of pickup and ends at the time of return as agreed upon in the booking. Renters must return the item in the same condition as they received it, normal wear and tear accepted. Renters returning items late may be subject to additional fees to cover the delayed return." 
    },
    { 
      id: 4, 
      title: "Fees and Payments", 
      icon: CreditCard, 
      content: "Traveler charges a service fee for facilitating the rental. This fee is calculated as a percentage of the total rental cost and is displayed at checkout. Owners receive payment within 48 hours of a successfully completed rental period. Payments are processed via our third-party payment processor, Stripe." 
    },
    { 
      id: 5, 
      title: "Cancellations", 
      icon: AlertCircle, 
      content: "Cancellations made more than 24 hours before the rental start time are eligible for a full refund. Cancellations made within 24 hours may be subject to a 50 percent fee." 
    },
    { 
      id: 6, 
      title: "Damages and Disputes", 
      icon: Eye, 
      content: "Renters are liable for any damage, loss, or theft of the item during the rental period. Traveler offers a Lender Guarantee that may cover up to $1,000 in damages, subject to investigation. In the event of a dispute, users agree to cooperate with Traveler's support team and provide necessary documentation (photos, receipts, police reports)." 
    },
    { 
      id: 7, 
      title: "Prohibited Items", 
      icon: Ban, 
      content: "The following items are strictly prohibited from being listed or rented on Traveler: Weapons, firearms, and ammunition; Illegal drugs and drug paraphernalia; Hazardous materials or chemicals; Adult-themed products." 
    },
    { 
      id: 8, 
      title: "Liability Disclaimer", 
      icon: Lock, 
      content: "THE SERVICES ARE PROVIDED 'AS IS' AND 'AS AVAILABLE'. TRAVELER DISCLAIMS ALL REPRESENTATIONS AND WARRANTIES, EXPRESS, IMPLIED, OR STATUTORY, NOT EXPRESSLY SET OUT IN THESE TERMS." 
    },
    { 
      id: 9, 
      title: "Termination", 
      icon: X, 
      content: "We may terminate or suspend your account and/or access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms." 
    },
    { 
      id: 10, 
      title: "Contact Us", 
      icon: Phone, 
      content: "If you have any questions about this User Agreement, please contact us at legal@traveler.com or through our Live Chat Support." 
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