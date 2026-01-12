"use client";

import { X, AlertTriangle } from "lucide-react";
import { useState } from "react";

export default function AdSlot() {
  const [showAd, setShowAd] = useState(true);
  const [showWarning, setShowWarning] = useState(false);

  // This is a placeholder ad component
  // In production, you would integrate with an ad network like Google AdSense
  
  if (!showAd) return null;

  return (
    <div className="w-full">
      {/* Ad Warning */}
      {showWarning && (
        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-2xl">
          <div className="flex">
            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                AdBlock Detected
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  Please consider disabling your ad blocker. Ads help us keep this service free for everyone.
                </p>
                <button
                  onClick={() => setShowWarning(false)}
                  className="mt-2 text-yellow-800 hover:text-yellow-900 font-medium"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ad Placeholder */}
      <div className="relative bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl p-6 text-center border-2 border-dashed border-gray-300">
        {/* Close Button */}
        <button
          onClick={() => setShowAd(false)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-300 hover:bg-gray-400 flex items-center justify-center transition-colors"
          aria-label="Close ad"
        >
          <X className="w-4 h-4 text-gray-700" />
        </button>

        <div className="max-w-md mx-auto">
          {/* Ad Icon */}
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center">
            <span className="text-2xl">📢</span>
          </div>
          
          {/* Ad Content */}
          <h4 className="text-lg font-bold text-gray-900 mb-2">
            Ad Space Available
          </h4>
          <p className="text-gray-600 mb-4">
            This space supports our free service. Interested in advertising?
          </p>
          
          {/* CTA Button */}
          <a
            href="/advertise"
            className="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium rounded-xl hover:shadow-lg transition-all"
          >
            Advertise Here
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>

        {/* Ad Label */}
        <div className="absolute bottom-2 right-2">
          <span className="text-xs text-gray-500 bg-white/80 px-2 py-1 rounded">
            Advertisement
          </span>
        </div>
      </div>

      {/* Ad Disclosure */}
      <div className="mt-4 text-center">
        <button
          onClick={() => setShowWarning(true)}
          className="text-xs text-gray-500 hover:text-gray-700"
        >
          Why do I see ads?
        </button>
      </div>
    </div>
  );
}