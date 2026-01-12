"use client";

import { useState } from "react";

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(1);

  const faqs = [
    {
      id: 1,
      question: "Is VidsSave free to use?",
      answer: "Yes, VidsSave is completely free to use for all basic features. We offer a premium version with additional capabilities for power users, but the core downloading functionality is available at no cost."
    },
    {
      id: 2,
      question: "Can I extract audio only?",
      answer: "Absolutely! VidsSave allows you to extract audio from videos and save it in MP3, AAC, or WAV format. Simply select the 'Audio Only' option when downloading."
    },
    {
      id: 3,
      question: "Is there a download limit?",
      answer: "Free users can download up to 10 videos per day. Premium subscribers enjoy unlimited downloads with no daily restrictions."
    },
    {
      id: 4,
      question: "Is it safe and private?",
      answer: "Your safety and privacy are our top priorities. We don't store your download history, and all transfers are encrypted. We never share your data with third parties."
    },
    {
      id: 5,
      question: "Does it work on mobile and desktop?",
      answer: "Yes, VidsSave is fully responsive and works on all devices including smartphones, tablets, laptops, and desktop computers. You can also install our mobile app for iOS and Android."
    },
    {
      id: 6,
      question: "Which video platforms are supported?",
      answer: "VidsSave supports all major platforms including YouTube, Vimeo, Dailymotion, Facebook, Instagram, TikTok, and many others. We continuously update our service to support new platforms."
    },
  ];

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to the most common questions about our service.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className={`bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-200 ${
                openId === faq.id 
                  ? "shadow-md border-gray-300" 
                  : "hover:border-gray-300 hover:shadow-sm"
              }`}
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full p-6 text-left flex justify-between items-center transition-colors duration-200 hover:bg-gray-50"
              >
                <h3 className={`text-lg font-semibold pr-8 ${
                  openId === faq.id ? "text-blue-600" : "text-gray-900"
                }`}>
                  {faq.question}
                </h3>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  openId === faq.id 
                    ? "bg-blue-600 text-white" 
                    : "bg-gray-100 text-gray-600"
                }`}>
                  <span className={`transform transition-transform duration-300 ${
                    openId === faq.id ? "rotate-45" : ""
                  }`}>
                    +
                  </span>
                </div>
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openId === faq.id 
                    ? "max-h-96 opacity-100" 
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6 pt-2">
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Still have questions?{" "}
            <a 
              href="/contact" 
              className="text-blue-600 font-semibold hover:text-blue-700 hover:underline transition-colors duration-200"
            >
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}